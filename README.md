# Tamim Hasan Portfolio

A responsive Next.js 16 and TypeScript portfolio for Md. Tamim Hasan. The project includes the public landing and portfolio pages, downloadable CV/resume, a public post feed and visitor message inbox, an Admin dashboard, and a Neon PostgreSQL backend.

## Requirements

- Node.js 24.x (see `engines` in `package.json`)
- npm 11 or a compatible npm release
- A Neon PostgreSQL database for posts and messages

## Install and run locally

```bash
npm ci
Copy-Item .env.example .env.local
# Fill in the server credentials described below.
npm run dev
```

Open <http://localhost:3000>. The root route `/` is the welcome/landing experience; `/home` is the full portfolio. The first visit may show the welcome animation; it can be skipped on subsequent page visits in the same tab session.

## Environment variables

Set these in `.env.local` for local development and in the deployment provider's encrypted environment settings for production. Do not commit `.env`, `.env.local`, passwords, or database URLs.

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | For posts/messages | Neon PostgreSQL connection string. |
| `POST_ADMIN_EMAIL` | For Admin login | Admin login email, checked server-side. |
| `POST_ADMIN_PASSWORD` | For Admin login | Strong unique Admin password, checked server-side. |
| `POST_AUTH_SECRET` | For Admin login | At least 64 random characters for signed session cookies. |
| `CRON_SECRET` | For scheduled cleanup | Long random value used to authorize the Vercel cleanup endpoint. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Public canonical site origin, for example `https://portfolio.example.com`. |

Generate secrets with `openssl rand -hex 32` (run separately for each secret). `.env.example` contains placeholders only. Admin sessions use a signed, HttpOnly cookie with a fixed 24-hour expiry; refreshing or using the site does not extend it. Protected pages and APIs validate the session on the server.

The database schema is created/updated by the server on first API use. `database/schema.sql` is also provided for manual review or applying the DDL in Neon. It includes `message_replies` and post-comment reply columns. Use a staging database to verify schema changes before production rollout.

## Project structure

```text
src/app/                 App Router pages, metadata, and API routes
src/components/Home/     Landing/welcome page sections
src/components/Main/     Full portfolio page sections
src/components/dashboard Admin dashboard UI
src/components/common/  Shared loading, error, session, and message UI
src/lib/                 Database, auth, validation, and live-update helpers
public/                  JSON portfolio content and static assets
database/schema.sql      Database setup and migration-safe DDL
scripts/                 JSON synchronization utility and tests
```

## Content customization

- Skills: `public/MySkills.json` and `public/Main/My-Tech-Stack.json`
- Projects: `public/Main/Project-Gallery.json`
- Libraries: `public/My-Toolkit.json`
- Productivity tools: `public/Main/Developer-Toolkit.json`
- AI tools: `public/AI-Stack.json`
- Courses/certifications: `public/Courses-&-Certifications.json`
- Intro, education, contact, FAQ, and footer copy: matching JSON files under `public/Main/`
- Shared colors, background, focus states, and action styles: `src/app/globals.css`
- Site title, canonical URL, keywords, and contact metadata: `src/app/site-config.ts`

Posts and messages are stored in Neon, not browser storage. Visitors can reply to individual messages and comments; message replies are private to the message owner and Admin. Images are validated on the server and limited to 1.5 MB per upload. Message and post images keep their natural proportions and can be opened full-size.

## Live updates

Post and message changes are broadcast through short-lived Server-Sent Events streams. The stream checks a database snapshot and sends an invalidation event; the client reloads data through the existing authorization-checked API. Streams reconnect automatically, and clients refresh when a tab becomes visible or the network returns. This works with the current Neon HTTP driver and serverless deployment model. It is near-real-time database synchronization (normally within a few seconds), not a persistent WebSocket connection. A connected Neon database is required to verify cross-browser behavior.

## Commands

```bash
npm run dev        # Local development
npm run lint       # ESLint
npm run typecheck  # TypeScript, no emit
npm test           # Existing JSON synchronization test suite
npm run build      # Optimized production build
npm start          # Serve a production build locally
npm run verify     # Lint, typecheck, tests, then production build
```

## Deployment

1. Import the project into Vercel and configure the required environment variables above.
2. Connect a Neon PostgreSQL database and use a staging branch/database to verify the schema and messaging flows.
3. Set `NEXT_PUBLIC_SITE_URL` to the deployed HTTPS origin.
4. Use Node.js 24.x and run `npm ci`, `npm run verify` before deployment.
5. Deploy with Vercel. The hourly cron in `vercel.json` calls `/api/messages/cleanup`; configure `CRON_SECRET` for that endpoint.
6. After deployment, verify Admin login/logout and expiry, public visitor ownership, message and post replies, attachment validation, and live updates from two separate browser sessions.

For a non-Vercel host, configure the same environment values and run `npm run build` followed by `npm start`. Configure an equivalent scheduled request to `/api/messages/cleanup` with the `CRON_SECRET` authorization header if message cleanup is needed there.

## Security hardening (this pass)

- **Rate limiting** — `src/lib/rate-limit.ts` adds a dependency-free sliding-window limiter.
  Public writes are capped per client IP: messages 5 / 10 min, thread replies 20 / 10 min,
  post comments 10 / 10 min, likes 60 / 5 min, and admin login 8 / 10 min. Over-limit calls
  receive `429` with a `Retry-After` header, which the existing `error-config.ts` 429 UI renders.
  This is a per-instance limiter: on Vercel each warm instance keeps its own counter, so it
  stops loop attacks but is not a global quota. Back it with Redis or a Neon table if a hard
  global limit is needed; the call sites do not change.
- **Signed visitor cookies** — visitor identity used to be a raw UUID in an HttpOnly cookie,
  which could be rewritten to read another visitor's messages. Values are now `uuid.signature`,
  HMAC-signed with `POST_AUTH_SECRET` and verified on every read (`src/lib/visitor.ts`).
  Rotating `POST_AUTH_SECRET` signs existing visitors out of their message history, which is safe.
- **Security headers** — `next.config.ts` now sends CSP, `X-Frame-Options: DENY`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, HSTS, and disables
  the `X-Powered-By` header. `script-src` still allows `'unsafe-inline'` because Next.js needs
  it for its inline bootstrap; moving to nonces requires middleware.
- **Service worker fixed** — `public/sw.js` precached `/data/*.json` and `/library/*.json`,
  none of which exist. `cache.addAll()` is atomic, so the install always failed and the PWA
  never worked. The shell now lists real paths, entries are cached individually, API/auth/dashboard
  responses are excluded from caching, and `public/offline.html` backs navigation fallbacks.
- **Faster entry** — the blocking intro splash dropped from 5.8 s to 1.5 s.
- **Shared background** — the ambient gradient block is now one `PageBackground` component
  instead of eight copies.

Before deploying, rotate `DATABASE_URL` credentials, `POST_ADMIN_PASSWORD`, and
`POST_AUTH_SECRET` if they were ever committed, shared, or stored in a plain `.env` file.

## Verification notes

`npm test` currently covers the JSON synchronization utility. Full database-backed integration checks require a disposable Neon/PostgreSQL database and test Admin credentials. Browser/device review at 320px through large desktop widths also requires a running application. Do not use production credentials for local tests, and do not treat a successful static build as proof of live database or cross-browser behavior.
