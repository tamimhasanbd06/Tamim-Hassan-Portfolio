# Dashboard + Posts + Messaging implementation

Implemented in the existing Next.js/Neon architecture:

- Login redirect to `/dashboard/overview` and protected dashboard root redirect.
- Responsive dashboard shell/sidebar with Overview, Posts, My Messages, Back to Home/Main, Refresh and Logout.
- Overview metrics from the existing portfolio JSON plus live post/message counts.
- Theme-consistent technology and project category visualizations.
- Dashboard post management with create, edit, delete, text, validated image upload/preview/removal and validated links. Video posting is not exposed.
- Public `/my-post` feed without admin controls.
- Private dashboard visitor inbox with status, save/unsave, reply and delete.
- Public `/message` composer with name, text, image, link, message history/replies and owner-only editing for unsaved messages.
- Server-side ownership checks using an HttpOnly visitor cookie.
- Saved messages persist until manual deletion; unsaved messages expire after 24 hours.
- Expired-message cleanup runs on message API access and an hourly Vercel cron endpoint protected by `CRON_SECRET`.
- Input cleanup, http(s) URL validation, image MIME/data validation and 1.5 MB server-side image size limit.
- Introduction and Contact links to the public messaging page.
- Footer quick links extended with Resume, CV and Login; existing WhatsApp/Facebook/GitHub links are reused.
- Existing Neon database is extended with `posts.link_url` and a `messages` table; no second backend/database was introduced.

## Deployment note

Set the existing auth/database environment variables plus `CRON_SECRET` in production. Vercel cron is configured in `vercel.json` to call `/api/messages/cleanup` hourly.

## Validation in this workspace

- TypeScript/TSX syntax transpilation check: passed for all `src` files.
- Full `npm install`, `npm run lint`, `npm test`, and `npm run build` could not complete because package installation in the sandbox timed out and left dependencies unavailable. Do not treat those checks as passed until dependencies are installed in a normal project environment.
