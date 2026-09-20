import { randomUUID } from "crypto";
import { getDb } from "@/lib/db";
import { ContentSection, readLegacySection, sourceKeyFor } from "@/lib/content-config";

let schemaPromise: Promise<void> | null = null;

export async function ensureContentSchema() {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      const sql = getDb();
      await sql`
        CREATE TABLE IF NOT EXISTS portfolio_content (
          id UUID PRIMARY KEY,
          section TEXT NOT NULL,
          source_key TEXT NOT NULL,
          data JSONB NOT NULL DEFAULT '{}'::jsonb,
          sort_order INTEGER NOT NULL DEFAULT 0,
          visible BOOLEAN NOT NULL DEFAULT TRUE,
          featured BOOLEAN NOT NULL DEFAULT FALSE,
          status TEXT NOT NULL DEFAULT 'published',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          UNIQUE(section, source_key)
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS portfolio_content_migrations (
          section TEXT PRIMARY KEY,
          migrated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          migrated_count INTEGER NOT NULL DEFAULT 0
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS idx_portfolio_content_section_order ON portfolio_content(section, sort_order, created_at)`;
      await sql`CREATE INDEX IF NOT EXISTS idx_portfolio_content_visible ON portfolio_content(section, visible)`;
    })();
  }
  return schemaPromise;
}

export async function seedLegacySectionIfNeeded(section: ContentSection) {
  await ensureContentSchema();
  const sql = getDb();
  const marker = await sql`SELECT section FROM portfolio_content_migrations WHERE section = ${section} LIMIT 1`;
  if (marker.length) return false;

  const countResult = await sql`SELECT COUNT(*)::int AS count FROM portfolio_content WHERE section = ${section}`;
  if (Number(countResult[0]?.count || 0) > 0) {
    await sql`INSERT INTO portfolio_content_migrations (section, migrated_count) VALUES (${section}, ${Number(countResult[0]?.count || 0)}) ON CONFLICT (section) DO NOTHING`;
    return false;
  }

  const items = await readLegacySection(section);
  for (let index = 0; index < items.length; index += 1) {
    const item = items[index];
    const sourceKey = sourceKeyFor(item, index);
    await sql`
      INSERT INTO portfolio_content (id, section, source_key, data, sort_order, visible, featured, status)
      VALUES (${randomUUID()}, ${section}, ${sourceKey}, ${JSON.stringify(item)}::jsonb, ${index}, ${item.visible !== false}, ${item.featured === true}, 'published')
      ON CONFLICT (section, source_key) DO NOTHING
    `;
  }
  await sql`INSERT INTO portfolio_content_migrations (section, migrated_count) VALUES (${section}, ${items.length}) ON CONFLICT (section) DO NOTHING`;
  return items.length > 0;
}

export async function listContent(section: ContentSection, admin = false) {
  await seedLegacySectionIfNeeded(section);
  const sql = getDb();
  const rows = admin
    ? await sql`SELECT * FROM portfolio_content WHERE section = ${section} ORDER BY sort_order ASC, created_at ASC`
    : await sql`SELECT * FROM portfolio_content WHERE section = ${section} AND visible = TRUE AND status <> 'draft' ORDER BY sort_order ASC, created_at ASC`;

  return rows.map((row) => ({
    id: String(row.id),
    sourceKey: String(row.source_key),
    data: (row.data || {}) as Record<string, unknown>,
    sortOrder: Number(row.sort_order || 0),
    visible: Boolean(row.visible),
    featured: Boolean(row.featured),
    status: String(row.status || "published"),
    createdAt: new Date(String(row.created_at)).toISOString(),
    updatedAt: new Date(String(row.updated_at)).toISOString(),
  }));
}
