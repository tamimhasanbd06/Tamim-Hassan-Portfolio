# Dashboard implementation

This project extends the existing Next.js + Neon/PostgreSQL architecture rather than introducing a second backend.

## Authentication flow

`/login` validates the existing admin credentials, creates a server-side OTP challenge, emails a 6-digit code, and only creates the signed admin session after successful server-side OTP verification. OTPs expire after exactly 5 minutes, are HMAC-hashed, single-use and rate-limited.

## Environment variables

Copy `.env.example` to `.env.local` and supply:

- `DATABASE_URL`
- `POST_AUTH_SECRET`
- `POST_ADMIN_EMAIL`
- `POST_ADMIN_PASSWORD`
- `RESEND_API_KEY`
- `MAIL_FROM`

## Data migration behavior

The `portfolio_content` table is the runtime source of truth for managed dynamic sections. Each legacy JSON section can be migrated once; `portfolio_content_migrations` records that migration so a later database delete does not cause accidental re-seeding. Legacy JSON files are retained as migration backups until production verification is complete.

## Main routes

- `/login`
- `/dashboard/overview`
- `/dashboard/posts`
- `/dashboard/projects`
- `/dashboard/skills`
- `/dashboard/education`
- `/dashboard/experience`
- `/dashboard/courses`
- `/dashboard/ai-stack`
- `/dashboard/developer-toolkit`
- `/dashboard/my-toolkit`
- `/dashboard/website-process`
- `/dashboard/contact`

Legacy `/my-post` redirects to `/dashboard/posts`.

## APIs

- `POST /api/auth/login`
- `POST /api/auth/verify-otp`
- `POST /api/auth/resend-otp`
- `POST /api/auth/logout`
- `GET /api/auth/session`
- `GET/POST /api/content/[section]`
- `PUT/DELETE /api/content/[section]/[id]`
- `DELETE /api/content/[section]/bulk`
- `POST /api/content/[section]/import`
- `GET /api/content/[section]/export?format=json|csv`
- `GET /api/dashboard/overview`
- Existing `/api/posts` APIs are reused.
- `POST /api/welcome` sends one consented visitor welcome email.

See `IMPLEMENTATION_REPORT.md` for verification and deployment notes.
