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
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        expires_at TIMESTAMPTZ
      )`;
      await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS link_url TEXT`;
      await sql`ALTER TABLE posts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()`;
      await sql`CREATE TABLE IF NOT EXISTS post_likes (
        id UUID PRIMARY KEY, post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
        visitor_id TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), UNIQUE(post_id, visitor_id)
      )`;
      await sql`CREATE TABLE IF NOT EXISTS post_comments (
        id UUID PRIMARY KEY, post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
        name VARCHAR(100) NOT NULL, message TEXT NOT NULL, parent_comment_id UUID REFERENCES post_comments(id) ON DELETE SET NULL,
        reply_to_post BOOLEAN NOT NULL DEFAULT FALSE, sender_role VARCHAR(20) NOT NULL DEFAULT 'visitor',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`;
      await sql`ALTER TABLE post_comments ADD COLUMN IF NOT EXISTS parent_comment_id UUID REFERENCES post_comments(id) ON DELETE SET NULL`;
      await sql`ALTER TABLE post_comments ADD COLUMN IF NOT EXISTS reply_to_post BOOLEAN NOT NULL DEFAULT FALSE`;
      await sql`ALTER TABLE post_comments ADD COLUMN IF NOT EXISTS sender_role VARCHAR(20) NOT NULL DEFAULT 'visitor'`;
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
      await sql`CREATE TABLE IF NOT EXISTS message_replies (
        id UUID PRIMARY KEY,
        message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
        parent_reply_id UUID REFERENCES message_replies(id) ON DELETE SET NULL,
        role VARCHAR(20) NOT NULL CHECK (role IN ('admin','visitor')),
        body TEXT NOT NULL DEFAULT '',
        image_url TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )`;
      await sql`CREATE INDEX IF NOT EXISTS idx_message_replies_message ON message_replies(message_id, created_at ASC)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_posts_expires_at ON posts(expires_at)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_messages_expires_at ON messages(expires_at)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_messages_visitor_id ON messages(visitor_id)`;
    })().catch((error: unknown) => {
      // A transient database failure should not poison schema initialization for
      // the lifetime of a warm serverless process.
      schemaPromise = null;
      throw error;
    });
  }
  return schemaPromise;
}

export async function cleanupExpiredMessages() {
  await ensurePostSchema();
  const sql = getDb();
  await sql`DELETE FROM messages WHERE is_saved = FALSE AND expires_at <= NOW()`;
}
