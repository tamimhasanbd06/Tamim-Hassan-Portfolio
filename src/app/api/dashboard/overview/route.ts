import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { CONTENT_SECTIONS, type ContentSection } from "@/lib/content-config";
import { listContent } from "@/lib/content-db";
import { ensurePostSchema, getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ success: false, message: "Admin login required." }, { status: 401 });
    }

    const counts: Record<string, number> = {};
    const sectionRows: Record<string, Awaited<ReturnType<typeof listContent>>> = {};

    for (const section of Object.keys(CONTENT_SECTIONS) as ContentSection[]) {
      const rows = await listContent(section, true);
      counts[section] = rows.length;
      sectionRows[section] = rows;
    }

    const courseRows = sectionRows.courses || [];
    counts.certifications = courseRows.filter((row) => {
      const image = row.data.certificateImage;
      const pdf = row.data.certificatePdf;
      return Boolean(image || pdf);
    }).length;

    await ensurePostSchema();
    const sql = getDb();
    const [postStats] = await sql`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE status = 'draft')::int AS drafts,
        COUNT(*) FILTER (WHERE status = 'published')::int AS published,
        COUNT(*) FILTER (WHERE featured = TRUE)::int AS featured
      FROM posts
    `;

    counts.posts = Number(postStats?.total || 0);

    const recentPosts = await sql`
      SELECT id, title, status, featured, created_at
      FROM posts
      ORDER BY created_at DESC
      LIMIT 5
    `;

    const recentProjects = (sectionRows.projects || [])
      .slice(-5)
      .reverse()
      .map((row) => ({
        id: row.id,
        title: String(row.data.name || row.data.title || row.sourceKey),
        featured: row.featured || row.data.featured === true,
        updatedAt: row.updatedAt,
      }));

    return NextResponse.json({
      success: true,
      counts,
      postStats: {
        total: Number(postStats?.total || 0),
        drafts: Number(postStats?.drafts || 0),
        published: Number(postStats?.published || 0),
        featured: Number(postStats?.featured || 0),
      },
      recentPosts: recentPosts.map((post) => ({
        id: String(post.id),
        title: String(post.title),
        status: String(post.status || "published"),
        featured: Boolean(post.featured),
        createdAt: new Date(String(post.created_at)).toISOString(),
      })),
      recentProjects,
    });
  } catch (error) {
    console.error("DASHBOARD OVERVIEW ERROR:", error);
    return NextResponse.json({ success: false, message: "Could not load dashboard overview." }, { status: 500 });
  }
}
