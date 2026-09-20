import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { isContentSection } from "@/lib/content-config";
import { ensureContentSchema } from "@/lib/content-db";
import { getDb } from "@/lib/db";

type RouteContext = { params: Promise<{ section: string; id: string }> };

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    if (!isAdminRequest(request)) return NextResponse.json({ success: false, message: "Admin login required." }, { status: 401 });
    const { section, id } = await context.params;
    if (!isContentSection(section)) return NextResponse.json({ success: false, message: "Unknown content section." }, { status: 404 });
    await ensureContentSchema();
    const body = await request.json();
    if (!body?.data || typeof body.data !== "object" || Array.isArray(body.data)) {
      return NextResponse.json({ success: false, message: "A valid data object is required." }, { status: 400 });
    }
    const sql = getDb();
    const result = await sql`
      UPDATE portfolio_content
      SET data = ${JSON.stringify(body.data)}::jsonb,
          source_key = ${String(body.sourceKey || id)},
          sort_order = ${Number.isFinite(Number(body.sortOrder)) ? Number(body.sortOrder) : 0},
          visible = ${body.visible !== false},
          featured = ${body.featured === true},
          status = ${typeof body.status === "string" && body.status.trim() ? body.status.trim() : "published"},
          updated_at = NOW()
      WHERE id = ${id} AND section = ${section}
      RETURNING id
    `;
    if (!result.length) return NextResponse.json({ success: false, message: "Record not found." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CONTENT UPDATE ERROR:", error);
    return NextResponse.json({ success: false, message: "Could not update content." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    if (!isAdminRequest(request)) return NextResponse.json({ success: false, message: "Admin login required." }, { status: 401 });
    const { section, id } = await context.params;
    if (!isContentSection(section)) return NextResponse.json({ success: false, message: "Unknown content section." }, { status: 404 });
    await ensureContentSchema();
    const sql = getDb();
    const result = await sql`DELETE FROM portfolio_content WHERE id = ${id} AND section = ${section} RETURNING id`;
    if (!result.length) return NextResponse.json({ success: false, message: "Record not found." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CONTENT DELETE ERROR:", error);
    return NextResponse.json({ success: false, message: "Could not delete content." }, { status: 500 });
  }
}
