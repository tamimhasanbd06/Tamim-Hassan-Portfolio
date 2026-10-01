import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { ensurePostSchema, getDb } from "@/lib/db";

type RouteContext = { params: Promise<{ id: string; commentId: string }> };

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ success: false, message: "Admin login required." }, { status: 401 });
    }

    await ensurePostSchema();
    const { id, commentId } = await context.params;
    const sql = getDb();
    const deleted = await sql`
      DELETE FROM post_comments
      WHERE id = ${commentId} AND post_id = ${id}
      RETURNING id
    `;

    if (deleted.length === 0) {
      return NextResponse.json({ success: false, message: "Comment not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE COMMENT ERROR:", error);
    return NextResponse.json({ success: false, message: "Could not delete comment." }, { status: 500 });
  }
}
