import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { ensurePostSchema, getDb } from "@/lib/db";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    await ensurePostSchema();
    const { id: postId } = await context.params;
    const body = await request.json();
    const name = String(body.name || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !message) {
      return NextResponse.json({ success: false, message: "Name and comment are required." }, { status: 400 });
    }
    if (name.length > 100 || message.length > 2000) {
      return NextResponse.json({ success: false, message: "Comment is too long." }, { status: 400 });
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

    await sql`
      INSERT INTO post_comments (id, post_id, name, message)
      VALUES (${randomUUID()}, ${postId}, ${name}, ${message})
    `;

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("COMMENT ERROR:", error);
    return NextResponse.json({ success: false, message: "Could not add comment." }, { status: 500 });
  }
}
