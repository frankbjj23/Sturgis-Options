const properties = [];

const container = document.getElementById("property-cards");
const chips = document.querySelectorAll(".chip");

const API_BASE = (() => {
  if (window.location.origin === "null") {
    return "http://localhost:3000";
  }
  if (["localhost", "127.0.0.1"].includes(window.location.hostname)) {
    return "";
  }
  return "https://sturgis-api.onrender.com";
})();
const visitorId = (() => {
  const key = "sturgis_visitor_id";
  const stored = localStorage.getItem(key);
  if (stored) {
    return stored;
  }
  const id =
    (window.crypto && window.crypto.randomUUID && window.crypto.randomUUID()) ||
    `visitor-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
  localStorage.setItem(key, id);
  return id;
})();

const toShortDate = (iso) =>
  new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

const apiFetch = async (path, options = {}) => {
  const headers = {
    "x-visitor-id": visitorId,
    ...options.headers,
  };
  const hasBody = options.body !== undefined;
  if (hasBody) {
    headers["Content-Type"] = "application/json";
  }
  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
};


const renderCards = (items) => {
  container.innerHTML = "";
  if (items.length === 0) {
    const empty = document.createElement("div");
    empty.className = "card";
    empty.innerHTML = `
      <div class="card-body">
        <h2 class="card-title is-empty">Listings coming soon</h2>
        <p class="card-subtitle is-empty">New properties will be posted shortly.</p>
      </div>
    `;
    container.appendChild(empty);
    revealCards();
    return;
  }
  items.forEach((property) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="card-header">
        <img src="${property.image}" alt="${property.name}" loading="lazy" />
        <div class="badge-stack">
          <span class="badge">${property.distance}</span>
          <span class="badge">${property.sleeps}</span>
          <span class="badge">${property.price}</span>
        </div>
      </div>
      <div class="card-body">
        <h2 class="card-title">${property.name}</h2>
        <p class="card-subtitle">${property.provider}</p>
        <div class="detail-grid">
          <div class="detail"><span>Bedrooms</span>${property.beds}</div>
          <div class="detail"><span>Bathrooms</span>${property.baths}</div>
          <div class="detail"><span>Distance</span>${property.distance}</div>
          <div class="detail"><span>Price</span>${property.price}</div>
        </div>
        <p class="notes">${property.notes}</p>
        <div class="card-actions">
          <a class="cta" href="${property.link}" target="_blank" rel="noreferrer">View Listing</a>
          <div>
            <div class="vote-box" data-votes="${property.id}">
              <button class="vote-btn" data-vote="up">👍 <span>0</span></button>
              <button class="vote-btn" data-vote="down">👎 <span>0</span></button>
            </div>
            <div class="vote-meta">Votes are shared across visitors.</div>
          </div>
        </div>
        <div class="comments" data-comments="${property.id}">
          <h3>Comments</h3>
          <div class="comment-list"></div>
          <form class="comment-form">
            <input type="text" name="name" placeholder="Name (optional)" maxlength="32" />
            <textarea name="message" rows="3" placeholder="Share your thoughts..." required></textarea>
            <button type="submit">Post Comment</button>
          </form>
        </div>
      </div>
    `;
    container.appendChild(card);
    hydrateVotes(property.id);
    hydrateComments(property.id);
  });

  revealCards();
};

const hydrateVotes = (id) => {
  const wrapper = container.querySelector(`[data-votes="${id}"]`);
  const upBtn = wrapper.querySelector('[data-vote="up"]');
  const downBtn = wrapper.querySelector('[data-vote="down"]');
  const meta = wrapper.parentElement.querySelector(".vote-meta");
  let data = { up: 0, down: 0, choice: null };

  const updateDisplay = () => {
    upBtn.querySelector("span").textContent = data.up;
    downBtn.querySelector("span").textContent = data.down;
    upBtn.classList.toggle("is-active", data.choice === "up");
    downBtn.classList.toggle("is-active", data.choice === "down");
  };

  const loadVotes = async () => {
    try {
      const payload = await apiFetch(`/api/properties/${id}/votes`);
      data = {
        up: payload.up,
        down: payload.down,
        choice: payload.userVote,
      };
      updateDisplay();
    } catch (err) {
      meta.textContent = "Votes unavailable right now.";
    }
  };

  const handleVote = async (choice) => {
    const nextVote = data.choice === choice ? null : choice;
    try {
      const payload = await apiFetch(`/api/properties/${id}/votes`, {
        method: "POST",
        body: JSON.stringify({ vote: nextVote }),
      });
      data = {
        up: payload.up,
        down: payload.down,
        choice: payload.userVote,
      };
      updateDisplay();
    } catch (err) {
      meta.textContent = "Vote failed. Try again.";
    }
  };

  upBtn.addEventListener("click", () => handleVote("up"));
  downBtn.addEventListener("click", () => handleVote("down"));

  updateDisplay();
  loadVotes();
};

const hydrateComments = (id) => {
  const wrapper = container.querySelector(`[data-comments="${id}"]`);
  const list = wrapper.querySelector(".comment-list");
  const form = wrapper.querySelector(".comment-form");
  const comments = [];

  const render = () => {
    list.innerHTML = "";
    if (comments.length === 0) {
      const empty = document.createElement("div");
      empty.className = "comment";
      empty.textContent = "Be the first to comment on this property.";
      list.appendChild(empty);
      return;
    }
    comments.forEach((comment) => {
      const item = document.createElement("div");
      item.className = "comment";
      item.textContent = comment.message;
      const meta = document.createElement("small");
      const createdAt = comment.created_at || comment.date;
      meta.textContent = `${comment.name || "Anonymous"} - ${toShortDate(
        createdAt
      )}`;
      item.appendChild(meta);
      list.appendChild(item);
    });
  };

  const loadComments = async () => {
    try {
      const payload = await apiFetch(`/api/properties/${id}/comments`);
      comments.length = 0;
      payload.forEach((comment) => comments.push(comment));
      render();
    } catch (err) {
      const empty = document.createElement("div");
      empty.className = "comment";
      empty.textContent = "Comments unavailable right now.";
      list.innerHTML = "";
      list.appendChild(empty);
    }
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name").toString().trim();
    const message = formData.get("message").toString().trim();
    if (!message) {
      return;
    }
    try {
      const payload = await apiFetch(`/api/properties/${id}/comments`, {
        method: "POST",
        body: JSON.stringify({ name, message }),
      });
      comments.unshift(payload);
      form.reset();
      render();
    } catch (err) {
      form.reset();
    }
  });

  render();
  loadComments();
};

const revealCards = () => {
  const cards = document.querySelectorAll(".card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  cards.forEach((card) => observer.observe(card));
};

const applyFilter = (filter) => {
  let items = [...properties];
  if (filter === "closest") {
    items.sort((a, b) => a.score.distance - b.score.distance);
  } else if (filter === "largest") {
    items.sort((a, b) => b.score.capacity - a.score.capacity);
  } else if (filter === "value") {
    items.sort((a, b) => b.score.value - a.score.value);
  }
  renderCards(items);
};

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((btn) => btn.classList.remove("is-active"));
    chip.classList.add("is-active");
    applyFilter(chip.dataset.filter);
  });
});

renderCards(properties);
