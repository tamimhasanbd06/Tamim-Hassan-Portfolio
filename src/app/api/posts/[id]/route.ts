import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { ensurePostSchema, getDb } from "@/lib/db";

type RouteContext = { params: Promise<{ id: string }> };
type PostStatus = "draft" | "published";

function isPostStatus(value: unknown): value is PostStatus {
  return value === "draft" || value === "published";
}

function parseTags(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => String(item).trim())
    .filter(Boolean)
    .slice(0, 20);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ success: false, message: "Admin login required." }, { status: 401 });
    }

    await ensurePostSchema();
    const { id } = await context.params;
    const body = await request.json();
    const title = String(body.title || "").trim();
    const content = String(body.content || "").trim();
    const imageUrl = String(body.imageUrl || "").trim();
    const status = isPostStatus(body.status) ? body.status : "published";
    const featured = body.featured === true;
    const tags = parseTags(body.tags);

    if (!title || !content) {
      return NextResponse.json({ success: false, message: "Title and content are required." }, { status: 400 });
    }
    if (title.length > 200) {
      return NextResponse.json({ success: false, message: "Title cannot exceed 200 characters." }, { status: 400 });
    }

    const sql = getDb();
    const updated = await sql`
      UPDATE posts
      SET title = ${title},
          content = ${content},
          image_url = ${imageUrl || null},
          status = ${status},
          featured = ${featured},
          tags = ${tags}
      WHERE id = ${id}
      RETURNING id
    `;

    if (updated.length === 0) {
      return NextResponse.json({ success: false, message: "Post not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("UPDATE POST ERROR:", error);
    return NextResponse.json({ success: false, message: "Could not update post." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ success: false, message: "Admin login required." }, { status: 401 });
    }

    await ensurePostSchema();
    const { id } = await context.params;
    const sql = getDb();
    const deleted = await sql`DELETE FROM posts WHERE id = ${id} RETURNING id`;

    if (deleted.length === 0) {
      return NextResponse.json({ success: false, message: "Post not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE POST ERROR:", error);
    return NextResponse.json({ success: false, message: "Could not delete post." }, { status: 500 });
  }
}
