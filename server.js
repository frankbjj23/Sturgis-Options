const express = require("express");
const path = require("path");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use((req, res, next) => {
  const origin = req.get("origin");
  res.setHeader("Access-Control-Allow-Origin", origin || "*");
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Visitor-Id");
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
});

app.use(express.json({ limit: "64kb" }));
app.use(express.static(__dirname));

const getVisitorId = (req) => req.get("x-visitor-id") || null;

const countVotes = async (propertyId) => {
  const result = await pool.query(
    "select vote, count(*)::int as count from votes where property_id = $1 group by vote",
    [propertyId]
  );
  const counts = { up: 0, down: 0 };
  result.rows.forEach((row) => {
    counts[row.vote] = row.count;
  });
  return counts;
};

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("select 1");
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: "db_unreachable" });
  }
});

app.get("/api/properties/:id/votes", async (req, res) => {
  const propertyId = req.params.id;
  const visitorId = getVisitorId(req);
  try {
    const countsPromise = countVotes(propertyId);
    const userVotePromise = visitorId
      ? pool.query(
          "select vote from votes where property_id = $1 and visitor_id = $2",
          [propertyId, visitorId]
        )
      : Promise.resolve({ rows: [] });
    const [counts, userVoteResult] = await Promise.all([
      countsPromise,
      userVotePromise,
    ]);
    const userVote = userVoteResult.rows[0]?.vote || null;
    res.json({ up: counts.up, down: counts.down, userVote });
  } catch (err) {
    res.status(500).json({ error: "vote_fetch_failed" });
  }
});

app.post("/api/properties/:id/votes", async (req, res) => {
  const propertyId = req.params.id;
  const visitorId = getVisitorId(req);
  const vote = req.body?.vote ?? null;

  if (!visitorId) {
    res.status(400).json({ error: "visitor_id_required" });
    return;
  }

  if (vote !== "up" && vote !== "down" && vote !== null) {
    res.status(400).json({ error: "invalid_vote" });
    return;
  }

  try {
    if (vote === null) {
      await pool.query(
        "delete from votes where property_id = $1 and visitor_id = $2",
        [propertyId, visitorId]
      );
    } else {
      await pool.query(
        "insert into votes (property_id, visitor_id, vote) values ($1, $2, $3) " +
          "on conflict (property_id, visitor_id) do update set vote = excluded.vote",
        [propertyId, visitorId, vote]
      );
    }

    const counts = await countVotes(propertyId);
    res.json({ up: counts.up, down: counts.down, userVote: vote });
  } catch (err) {
    res.status(500).json({ error: "vote_update_failed" });
  }
});

app.get("/api/properties/:id/comments", async (req, res) => {
  const propertyId = req.params.id;
  try {
    const result = await pool.query(
      "select id, name, message, created_at from comments where property_id = $1 order by created_at desc limit 100",
      [propertyId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "comment_fetch_failed" });
  }
});

app.post("/api/properties/:id/comments", async (req, res) => {
  const propertyId = req.params.id;
  const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
  const message =
    typeof req.body?.message === "string" ? req.body.message.trim() : "";

  if (!message) {
    res.status(400).json({ error: "message_required" });
    return;
  }

  const safeName = name ? name.slice(0, 32) : null;
  const safeMessage = message.slice(0, 500);

  try {
    const result = await pool.query(
      "insert into comments (property_id, name, message) values ($1, $2, $3) returning id, name, message, created_at",
      [propertyId, safeName, safeMessage]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "comment_create_failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
