import { neon } from "@neondatabase/serverless";

let schemaPromise: Promise<void> | null = null;

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is missing. Connect a Neon database in Vercel and pull the environment variables locally."
    );
  }

  return neon(databaseUrl);
}

export async function ensurePostSchema() {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      const sql = getDb();

      await sql`
        CREATE TABLE IF NOT EXISTS posts (
          id UUID PRIMARY KEY,
          title TEXT NOT NULL,
          content TEXT NOT NULL,
          image_url TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          expires_at TIMESTAMPTZ
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS post_likes (
          id UUID PRIMARY KEY,
          post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
          visitor_id TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          UNIQUE(post_id, visitor_id)
        )
      `;

      await sql`
        CREATE TABLE IF NOT EXISTS post_comments (
          id UUID PRIMARY KEY,
          post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
          name VARCHAR(100) NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;

      await sql`CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_posts_expires_at ON posts(expires_at)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_post_likes_post_id ON post_likes(post_id)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_post_comments_post_id ON post_comments(post_id)`;
    })();
  }

  return schemaPromise;
}
