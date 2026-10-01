import { neon } from "@neondatabase/serverless";

let schemaPromise: Promise<void> | null = null;

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error("DATABASE_URL is missing. Connect a Neon database in Vercel and pull the environment variables locally.");
  return neon(databaseUrl);
}

export async function ensurePostSchema() {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      const sql = getDb();
      await sql`CREATE TABLE IF NOT EXISTS posts (
        id UUID PRIMARY KEY,
        title TEXT NOT NULL DEFAULT '',
        content TEXT NOT NULL,
        image_url TEXT,
        link_url TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        expires_at TIMESTAMPTZ
      )`;
      await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS link_url TEXT`;
      await sql`CREATE TABLE IF NOT EXISTS post_likes (
        id UUID PRIMARY KEY, post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
        visitor_id TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), UNIQUE(post_id, visitor_id)
      )`;
      await sql`CREATE TABLE IF NOT EXISTS post_comments (
        id UUID PRIMARY KEY, post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
        name VARCHAR(100) NOT NULL, message TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`;
      await sql`CREATE TABLE IF NOT EXISTS messages (
        id UUID PRIMARY KEY,
        visitor_id TEXT NOT NULL,
        sender_name VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        image_url TEXT,
        link_url TEXT,
        is_saved BOOLEAN NOT NULL DEFAULT FALSE,
        status VARCHAR(30) NOT NULL DEFAULT 'new',
        admin_reply TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '24 hours')
      )`;
      await sql`CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_posts_expires_at ON posts(expires_at)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_messages_expires_at ON messages(expires_at)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_messages_visitor_id ON messages(visitor_id)`;
    })();
  }
  return schemaPromise;
}

export async function cleanupExpiredMessages() {
  await ensurePostSchema();
  const sql = getDb();
  await sql`DELETE FROM messages WHERE is_saved = FALSE AND expires_at <= NOW()`;
}
