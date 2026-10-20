# Antigravity Agent Handoff — Portfolio Upgrade

## Mission

Continue the uploaded MASTER_PROMPT_ORIGINAL.txt and finish all 19 requirements. The included ZIP is **not verified production-ready**. Do not report completion merely because code exists. Inspect the repository first. Preserve the Next.js 16 + React 19 + TypeScript + Neon PostgreSQL design and all existing routes, assets and permissions.

## Sources and architecture

- Authoritative user requirements: `MASTER_PROMPT_ORIGINAL.txt` (verbatim copy of the user-supplied prompt).
- Entry: `src/app/layout.tsx`; landing `src/app/page.tsx`, portfolio `/home`, public `/my-post`, `/message`, admin `/dashboard/*`.
- Database: Neon Postgres via `@neondatabase/serverless`, `src/lib/db.ts`, migration reference `database/schema.sql`.
- Authentication: `src/lib/admin-auth.ts`; auth APIs in `src/app/api/auth`; Admin dashboard guard and session checks.
- Post APIs `src/app/api/posts`, message APIs `src/app/api/messages`.
- No public user account login currently exists; visitors have ownership-scoped HttpOnly visitor cookies. Do not invent an ordinary User role without migrating the access model.

## Implemented or partially implemented in this supplied snapshot

1. 24h signed Admin cookie with server-side timestamp check and no refresh extension (`src/lib/admin-auth.ts`), dashboard session checks (from prior partial project).
2. Shared Admin Back component (`src/components/common/AdminBackButton.tsx`) navigates safely to admin dashboard. Only registered Admin session sees it.
3. Unified translucent surfaces and button/accessibility CSS (prior partial project), not a complete redesign of all routes.
4. Posts/messages polling at 8s in some views; **not** WebSockets and not guaranteed instant.
5. NEW `message_replies` database table created on schema bootstrap and documented in `database/schema.sql`.
6. NEW `GET/POST /api/messages/:id/replies`: conversation-scoped server authorization; admin or matching visitor cookie; validate text, image and referenced reply in the same conversation, max 500 replies; store role and parent relationship.
7. NEW `MessageThread` component embedded in visitor `/message` and admin `MessagesManager`: 5s polling, focus refresh, quote/reply, click to referenced reply, text/image upload, natural-size image preview/lightbox, retry messaging.
8. CSS for reply bubbles, input and natural image aspect ratio.

**Critical caveats:** legacy `admin_reply` field still exists and its old UI is visible alongside new thread. Both mechanisms need deliberate migration/unification. Live DB tests for replies were not available. New reply records are not WebSocket-pushed: visible after polling. Logo currently absent from each Admin reply bubble: must use the existing project-approved admin asset or establish one with the user. No claim of complete feature delivery is justified yet.

## Unverified/remaining work mapped to original tasks

| Task | Current status / necessary next action |
|---|---|
| 1 Background cleanup | Partial scoped CSS. Audit all routes and components, remove opaque section paints without hiding accessible controls. |
| 2 Premium page background | Partial shared theme wrapper. Verify every page and contrast. |
| 3 Admin Back | Implemented simple safe dashboard fallback. Verify all routes and exclude root dashboard; optional validated internal history handling. |
| 4 Exactly 24h session | Logic implemented. Test tampered/expired cookie, refresh/browser restart, multiple tabs, protected API 401, no sliding expiry. |
| 5 Reusable 3D ActionButton | Partial CSS only. Centralize and replace action buttons across components. |
| 6 Full UI/UX | Needs systematic page-by-page visual QA and revisions. |
| 7 Welcome Page | Route identity should be confirmed (`/` vs `/home`); inspect/redesign and preserve all interactions. |
| 8 Realtime posts/messages | Polling only. Implement authenticated SSE/WebSocket or robust framework-native live synchronization, reconnection/missed-event resync/dedupe. Test two simultaneous browsers. |
| 9 Admin logo in messages | Missing; render existing approved admin logo or fallback in Admin replies, never on visitor replies. |
| 10 WhatsApp-style specific reply | Implemented database-backed threaded replies within messages; integrate legacy reply, add post-specific quoting/reply if required; verify with live DB. |
| 11 Dynamic image frame | Implemented natural sizing for new thread plus visitor message; audit remaining image bubbles and full-size views. |
| 12 Library and Tools consistency | Needs inspection and shared grid/card components. |
| 13 Footer redesign | Not comprehensively done; preserve links/social assets. |
| 14 Accent-colored heading words | Existing gradient CSS, but targeted highlighted word/phrase reusable component still missing. |
| 15 Useful improvements | Partial loading/error/retry/attachment checks; add unread counts, search, status/reconnect as appropriate. |
| 16 Responsiveness | Cannot confirm without browser on 320px/375px/768px/1024px/1440px. |
| 17 Preserve functionality | Existing architecture retained; regression tests mandatory. |
| 18 Production validation | NOT run successfully here: dependency installation incomplete; Node environment is 22 while repo requires Node 24. |
| 19 Final ZIP | Supplied ZIP is an intermediate handoff, not validated final release. |

## Environment/setup and repeatable tests

1. Install Node **24.x** (repo `package.json` engines). From extracted root: `node -v`, `npm ci`, `npm run lint`, `npx tsc --noEmit`, `npm test`, `npm run build`.
2. For database-backed integration run use a throwaway **Neon/PostgreSQL test database**, never production; set `DATABASE_URL`, `POST_AUTH_SECRET` (high-entropy), `POST_ADMIN_EMAIL`, `POST_ADMIN_PASSWORD`, `CRON_SECRET`, `NEXT_PUBLIC_SITE_URL` in `.env.local`. Never commit these values.
3. Apply/verify `database/schema.sql` migration on test DB; alternatively `ensurePostSchema()` auto-creates schema when APIs run. Verify foreign keys/indexes.
4. `npm run dev`; log in with real test Admin credentials; open a second/incognito browser as a visitor. Send, edit, save, delete and reply to messages; add nested quoted replies; verify persistence after refresh, proper ordering, no duplicates, attachment open, access isolation. Ensure second visitor cannot retrieve or reply to first visitor's message (403/404 as implemented).
5. Assert Admin-only APIs reject unauthenticated and expired sessions. Change or forge cookie; expect rejected. Test after 24h via deterministic unit tests or controlled fake clock against `verifyAdminSessionToken` (do not adjust production clock).
6. Test Admin Back button on all routes and absence for visitors/dashboard; test browser back and direct-link access.
7. Test posts create/edit/delete, comment/like, image upload and link handling, post expiry, cron cleanup; ensure new updates become visible in both browsers without manual refresh. Polling currently delays up to 8s/5s; require realtime if truly WhatsApp-like behavior is needed.
8. Test reply quote of an ID from another conversation is rejected. Attempt invalid image type, >1.5MB images, oversized body, non-UUID ID, unauthorized parent ID, missing/expired message and malformed JSON; confirm correct 4xx responses instead of 500 when appropriate.
9. Perform responsive QA at 320, 375, 430, 768, 1024, 1440, 1920px plus Android/iOS where available. Check horizontal overflow, focus visibility, text contrast, menu functionality, hover/tap, image ratios, keyboard tab order, lightbox closing, reduced motion. Screenshots for `/`, `/home`, `/login`, `/message`, `/my-post`, `/dashboard/overview`, `/dashboard/messages`, `/dashboard/posts`, `/resume`, `/cv`.
10. `npm run build` on Node24 before production. Inspect browser console and server logs; verify env configuration on target deployment; verify mobile and keyboard UX manually.

## Expected final Antigravity deliverables

- Change log grouped by user tasks 1–19, list of files changed/created, migrations and DB rollout plan.
- Test matrix: test name, steps, expected result, actual result, pass/fail/not-run, and evidence.
- Outstanding issues and reproducible steps, including security and regressions.
- `README.md` updated with deployment commands, nonsecret example env, and setup.
- New **verified** final project ZIP excluding `.env*` secrets, `node_modules`, `.next`, logs, caches and private data.
- Never use the supplied final-completion Bengali statement until every requirement and test genuinely passes.
