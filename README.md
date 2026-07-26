# Alphora Labs Web

Multibagg-style blue SaaS research shell for Alphora Labs.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Env

| Key | Description |
|-----|-------------|
| `NEXT_PUBLIC_API_URL` | Flask API origin (no `/api` suffix) |

Defaults to the Railway production API if unset.

## Routes

- `/ask` — Ask AI (home)
- `/discover` — Markets + filters
- `/watchlist` — Saved assets
- `/portfolio` — Baskets
- `/community` — Feed / new / detail
- `/coin/[id]` — Coin detail + chart
- `/search` — Search results
- `/login` `/register` `/verify-email` — Auth

Press `⌘K` / `Ctrl+K` for the search command palette.
