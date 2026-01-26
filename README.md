# Sturgis Options

A curated, single‑page rentals guide for Sturgis Rally week with voting and comments, backed by a small Node/Express + Postgres API.

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

2. Create a Postgres database (example name: `sturgis`).

3. Load the schema
   ```powershell
   psql "postgresql://<user>:<pass>@localhost:5432/sturgis" -f db/schema.sql
   ```

4. Configure environment
   - Copy `.env.example` to `.env` and update the connection string.
   - Required env var:
     - `DATABASE_URL` – Postgres connection string

5. Start the server
   ```powershell
   npm start
   ```

6. Open the app
   - Visit `http://localhost:3000`

## API Endpoints
- `GET /api/health`
- `GET /api/properties/:id/votes`
- `POST /api/properties/:id/votes` – body: `{ "vote": "up" | "down" | null }`, header: `X-Visitor-Id`
- `GET /api/properties/:id/comments`
- `POST /api/properties/:id/comments` – body: `{ "name": "", "message": "" }`

## Notes
- Votes are keyed by `property_id` + `visitor_id`.
- Comments are limited to 500 chars (name to 32 chars).

## License
Private project.