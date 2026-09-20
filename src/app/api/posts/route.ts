import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { ensurePostSchema, getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

type DurationOption =
  | "1-hour"
  | "6-hours"
  | "12-hours"
  | "1-day"
  | "3-days"
  | "7-days"
  | "30-days"
  | "never";

type PostStatus = "draft" | "published";

const durationMs: Record<Exclude<DurationOption, "never">, number> = {
  "1-hour": 60 * 60 * 1000,
  "6-hours": 6 * 60 * 60 * 1000,
  "12-hours": 12 * 60 * 60 * 1000,
  "1-day": 24 * 60 * 60 * 1000,
  "3-days": 3 * 24 * 60 * 60 * 1000,
  "7-days": 7 * 24 * 60 * 60 * 1000,
  "30-days": 30 * 24 * 60 * 60 * 1000,
};

function isDuration(value: unknown): value is DurationOption {
  return ["1-hour", "6-hours", "12-hours", "1-day", "3-days", "7-days", "30-days", "never"].includes(String(value));
}

function isPostStatus(value: unknown): value is PostStatus {
  return value === "draft" || value === "published";
}

function expiryFor(duration: DurationOption) {
  if (duration === "never") return null;
  return new Date(Date.now() + durationMs[duration]).toISOString();
}

function parseTags(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => String(item).trim())
    .filter(Boolean)
    .slice(0, 20);
}

export async function GET(request: NextRequest) {
  try {
    await ensurePostSchema();
    const sql = getDb();
    const visitorId = request.cookies.get("tamim_post_visitor")?.value || "";
    const admin = isAdminRequest(request);

    const posts = admin
      ? await sql`
          SELECT
            p.id,
            p.title,
            p.content,
            p.image_url,
            p.status,
            p.featured,
            p.tags,
            p.created_at,
            p.expires_at,
            COUNT(DISTINCT pl.id)::int AS likes_count,
            COUNT(DISTINCT pc.id)::int AS comments_count,
            EXISTS (
              SELECT 1 FROM post_likes mine
              WHERE mine.post_id = p.id AND mine.visitor_id = ${visitorId}
            ) AS liked_by_me
          FROM posts p
          LEFT JOIN post_likes pl ON pl.post_id = p.id
          LEFT JOIN post_comments pc ON pc.post_id = p.id
          GROUP BY p.id
          ORDER BY p.created_at DESC
        `
      : await sql`
          SELECT
            p.id,
            p.title,
            p.content,
            p.image_url,
            p.status,
            p.featured,
            p.tags,
            p.created_at,
            p.expires_at,
            COUNT(DISTINCT pl.id)::int AS likes_count,
            COUNT(DISTINCT pc.id)::int AS comments_count,
            EXISTS (
              SELECT 1 FROM post_likes mine
              WHERE mine.post_id = p.id AND mine.visitor_id = ${visitorId}
            ) AS liked_by_me
          FROM posts p
          LEFT JOIN post_likes pl ON pl.post_id = p.id
          LEFT JOIN post_comments pc ON pc.post_id = p.id
          WHERE p.status = 'published'
            AND (p.expires_at IS NULL OR p.expires_at > NOW())
          GROUP BY p.id
          ORDER BY p.created_at DESC
        `;

    const comments = admin
      ? await sql`
          SELECT pc.id, pc.post_id, pc.name, pc.message, pc.created_at
          FROM post_comments pc
          ORDER BY pc.created_at ASC
        `
      : await sql`
          SELECT pc.id, pc.post_id, pc.name, pc.message, pc.created_at
          FROM post_comments pc
          INNER JOIN posts p ON p.id = pc.post_id
          WHERE p.status = 'published'
            AND (p.expires_at IS NULL OR p.expires_at > NOW())
          ORDER BY pc.created_at ASC
        `;

    const expiredResult = admin
      ? await sql`SELECT COUNT(*)::int AS count FROM posts WHERE expires_at IS NOT NULL AND expires_at <= NOW()`
      : [{ count: 0 }];

    const commentsByPost = new Map<
      string,
      Array<{ id: string; name: string; message: string; createdAt: string }>
    >();

    for (const comment of comments) {
      const postId = String(comment.post_id);
      const list = commentsByPost.get(postId) || [];
      list.push({
        id: String(comment.id),
        name: String(comment.name),
        message: String(comment.message),
        createdAt: new Date(String(comment.created_at)).toISOString(),
      });
      commentsByPost.set(postId, list);
    }

    return NextResponse.json({
      success: true,
      authenticated: admin,
      expiredCount: Number(expiredResult[0]?.count || 0),
      posts: posts.map((post) => ({
        id: String(post.id),
        title: String(post.title),
        content: String(post.content),
        imageUrl: post.image_url ? String(post.image_url) : null,
        status: String(post.status || "published"),
        featured: Boolean(post.featured),
        tags: Array.isArray(post.tags) ? post.tags.map(String) : [],
        createdAt: new Date(String(post.created_at)).toISOString(),
        expiresAt: post.expires_at ? new Date(String(post.expires_at)).toISOString() : null,
        likesCount: Number(post.likes_count || 0),
        commentsCount: Number(post.comments_count || 0),
        likedByMe: Boolean(post.liked_by_me),
        comments: commentsByPost.get(String(post.id)) || [],
      })),
    });
  } catch (error) {
    console.error("GET POSTS ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Could not load posts. Check DATABASE_URL and the Vercel database connection.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ success: false, message: "Admin login required." }, { status: 401 });
    }

    await ensurePostSchema();
    const body = await request.json();
    const title = String(body.title || "").trim();
    const content = String(body.content || "").trim();
    const imageUrl = String(body.imageUrl || "").trim();
    const duration = body.duration;
    const status = isPostStatus(body.status) ? body.status : "published";
    const featured = body.featured === true;
    const tags = parseTags(body.tags);

    if (!title || !content) {
      return NextResponse.json({ success: false, message: "Title and content are required." }, { status: 400 });
    }
    if (title.length > 200) {
      return NextResponse.json({ success: false, message: "Title cannot exceed 200 characters." }, { status: 400 });
    }
    if (!isDuration(duration)) {
      return NextResponse.json({ success: false, message: "Invalid post duration." }, { status: 400 });
    }

    const sql = getDb();
    const result = await sql`
      INSERT INTO posts (id, title, content, image_url, status, featured, tags, expires_at)
      VALUES (
        ${randomUUID()},
        ${title},
        ${content},
        ${imageUrl || null},
        ${status},
        ${featured},
        ${tags},
        ${expiryFor(duration)}
      )
      RETURNING id
    `;

    return NextResponse.json({ success: true, id: String(result[0].id) }, { status: 201 });
  } catch (error) {
    console.error("CREATE POST ERROR:", error);
    return NextResponse.json({ success: false, message: "Could not create post." }, { status: 500 });
  }
}
