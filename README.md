# Sturgis Options

A curated, single‑page rentals guide for Sturgis Rally week with voting and comments, backed by a small Node/Express + Postgres API.
Built to practice shipping a complete, user-facing feature loop (UI → API → SQL) with reliability basics (health check, env config, constraints).

## Features

- Filterable rental cards (all/closest/largest/best value)
- Per‑property up/down votes
- Per‑property comments
- Lightbox image viewing

## Tech Stack

- Node.js + Express (`server.js`)
- Postgres (votes + comments)
- Vanilla HTML/CSS/JS

## Project Structure

- `index.html` – marketing + UI shell
- `styles.css` – site styling
- `app.js` – client‑side rendering and API calls
- `server.js` – API + static file hosting
- `db/schema.sql` – database schema
- `assets/` – images

## Setup

1. Install dependencies

   ```powershell
   npm install
   ```

   ```bash
   npm install
   ```

2. Create a Postgres database (example name: `sturgis`).

3. Load the schema

   ```powershell
   psql "postgresql://<user>:<pass>@localhost:5432/sturgis" -f db/schema.sql
   ```

   ```bash
   psql "postgresql://<user>:<pass>@localhost:5432/sturgis" -f db/schema.sql
   ```

4. Configure environment
   - Copy `.env.example` to `.env` and update the connection string.
   - Do not commit `.env`.
   - Use `.env.example` as a template.
   - Required env var:
     - `DATABASE_URL` – Postgres connection string

5. Start the server

   ```powershell
   npm start
   ```

   ```bash
   npm start
   ```

6. Open the app
   - Visit `http://localhost:3000`

## Screenshots / Demo

![Sturgis App](assets/sturgis-App-screenshot.png)

## Deployed Link

- Not deployed yet. Add the live URL here when available.

## Production Notes

- Input validation: Basic server-side validation is in place; expand to shared schema validation if you expose this publicly.
- Rate limiting: Planned (recommended `express-rate-limit` or a reverse proxy limit).
- Error handling/logging: Use structured logs and a central error handler; add request IDs in production.

## API Endpoints

- `GET /api/health`
- `GET /api/properties/:id/votes`
- `POST /api/properties/:id/votes` – body: `{ "vote": "up" | "down" | null }`, header: `X-Visitor-Id`
- `GET /api/properties/:id/comments`
- `POST /api/properties/:id/comments` – body: `{ "name": "", "message": "" }`

## Notes

- Votes are keyed by `property_id` + `visitor_id`.
- Comments are limited to 500 chars (name to 32 chars).
