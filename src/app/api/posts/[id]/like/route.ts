import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { ensurePostSchema, getDb } from "@/lib/db";
import { isUuid } from "@/lib/content-security";
import { RATE_LIMITS, enforceRateLimit } from "@/lib/rate-limit";
import { POST_VISITOR_COOKIE, readVisitorId, signVisitorId, visitorCookieOptions } from "@/lib/visitor";

type RouteContext = { params: Promise<{ id: string }> };

const VISITOR_COOKIE = POST_VISITOR_COOKIE;

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { id: postId } = await context.params;
    if (!isUuid(postId)) return NextResponse.json({ success: false, message: "Post not found." }, { status: 404 });
    const limited = enforceRateLimit(request, RATE_LIMITS.postLike, postId);
    if (limited) return limited;
    await ensurePostSchema();
    const sql = getDb();

    const activePost = await sql`
      SELECT id FROM posts
      WHERE id = ${postId} AND (expires_at IS NULL OR expires_at > NOW())
      LIMIT 1
    `;

    if (activePost.length === 0) {
      return NextResponse.json({ success: false, message: "Post not found or expired." }, { status: 404 });
    }

    const signed = readVisitorId(request, VISITOR_COOKIE);
    const needsCookie = !signed;
    const visitorId = signed ?? randomUUID();
    const signedValue = needsCookie ? signVisitorId(visitorId) : "";

    const existing = await sql`
      SELECT id FROM post_likes
      WHERE post_id = ${postId} AND visitor_id = ${visitorId}
      LIMIT 1
    `;

    let liked = false;
    if (existing.length > 0) {
      await sql`DELETE FROM post_likes WHERE post_id = ${postId} AND visitor_id = ${visitorId}`;
    } else {
      await sql`
        INSERT INTO post_likes (id, post_id, visitor_id)
        VALUES (${randomUUID()}, ${postId}, ${visitorId})
        ON CONFLICT (post_id, visitor_id) DO NOTHING
      `;
      liked = true;
    }

    const count = await sql`SELECT COUNT(*)::int AS count FROM post_likes WHERE post_id = ${postId}`;
    const response = NextResponse.json({ success: true, liked, likesCount: Number(count[0]?.count || 0) });

    if (needsCookie) {
      response.cookies.set(VISITOR_COOKIE, signedValue, visitorCookieOptions(60 * 60 * 24 * 365 * 2));
    }

    return response;
  } catch (error) {
    console.error("LIKE ERROR:", error);
    return NextResponse.json({ success: false, message: "Could not update like." }, { status: 500 });
  }
}
