import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { ensurePostSchema, getDb } from "@/lib/db";
import { isUuid } from "@/lib/content-security";
import { isAdminRequest } from "@/lib/admin-auth";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    await ensurePostSchema();
    const { id: postId } = await context.params;
    if (!isUuid(postId)) return NextResponse.json({ success: false, message: "Post not found." }, { status: 404 });
    const body = await request.json();
    const name = String(body.name || "").trim();
    const message = String(body.message || "").trim();
    const parentCommentId = body.parentCommentId ? String(body.parentCommentId) : null;
    const replyToPost = body.replyToPost === true;

    if (!name || !message) {
      return NextResponse.json({ success: false, message: "Name and comment are required." }, { status: 400 });
    }
    if (name.length > 100 || message.length > 2000) {
      return NextResponse.json({ success: false, message: "Comment is too long." }, { status: 400 });
    }

    if (parentCommentId && !isUuid(parentCommentId)) {
      return NextResponse.json({ success: false, message: "Invalid reply reference." }, { status: 400 });
    }

    const sql = getDb();
    const activePost = await sql`
      SELECT id FROM posts
      WHERE id = ${postId} AND (expires_at IS NULL OR expires_at > NOW())
      LIMIT 1
    `;

    if (activePost.length === 0) {
      return NextResponse.json({ success: false, message: "Post not found or expired." }, { status: 404 });
    }

    if (parentCommentId) {
      const parent = await sql`SELECT id FROM post_comments WHERE id=${parentCommentId} AND post_id=${postId}`;
      if (!parent.length) return NextResponse.json({ success: false, message: "Referenced comment not found." }, { status: 404 });
    }

    await sql`
      INSERT INTO post_comments (id, post_id, name, message, parent_comment_id, reply_to_post, sender_role)
      VALUES (${randomUUID()}, ${postId}, ${name}, ${message}, ${parentCommentId}, ${replyToPost}, ${isAdminRequest(request) ? "admin" : "visitor"})
    `;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("COMMENT ERROR:", error);
    return NextResponse.json({ success: false, message: "Could not add comment." }, { status: 500 });
  }
}
