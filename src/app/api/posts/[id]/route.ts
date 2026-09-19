import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { ensurePostSchema, getDb } from "@/lib/db";

type RouteContext = { params: Promise<{ id: string }> };

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
