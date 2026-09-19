# My Posts - Vercel Server Storage Setup

The My Posts feature does not use localStorage or sessionStorage. Posts, likes, and comments are stored in a Neon Postgres database connected through Vercel.

## 1. Connect a database in Vercel

Open your Vercel project, go to Storage / Marketplace, add Neon Postgres, and connect it to this project.

## 2. Pull environment variables locally

```bash
vercel env pull .env.local
```

Or create `.env.local` from `.env.example` and provide:

```env
DATABASE_URL=postgresql://...
POST_ADMIN_EMAIL=your-admin-email@example.com
POST_ADMIN_PASSWORD=your-private-password
POST_AUTH_SECRET=a-long-random-secret
```

Generate an auth secret with:

```bash
openssl rand -hex 32
```

Do not commit `.env.local`.

## 3. Install dependencies

```bash
npm install
```

## 4. Database tables

The server automatically creates the required tables on the first My Posts API request. You can also run `database/schema.sql` manually in the Neon SQL editor.

## 5. Routes

- `/my-post` - public posts. Everyone can view, like, and comment.
- `/login` - hidden admin login. It is not linked in navigation and is disallowed in robots.txt.
- After successful admin login, `/my-post` unlocks Create Post, Delete Post, Delete Comment, expired-post count, and Logout controls.

## Security notes

- Admin email/password are read only from server environment variables.
- The browser receives an HTTP-only signed admin session cookie, not the password.
- Visitor like identity uses an HTTP-only cookie; no browser storage is used.
- Admin session lifetime is 7 days.
