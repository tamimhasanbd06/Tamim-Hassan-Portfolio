import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { isContentSection } from "@/lib/content-config";
import { ensureContentSchema } from "@/lib/content-db";
import { getDb } from "@/lib/db";

type RouteContext = { params: Promise<{ section: string }> };

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    if (!isAdminRequest(request)) return NextResponse.json({ success: false, message: "Admin login required." }, { status: 401 });
    const { section } = await context.params;
    if (!isContentSection(section)) return NextResponse.json({ success: false, message: "Unknown content section." }, { status: 404 });
    await ensureContentSchema();
    const sql = getDb();
    const result = await sql`DELETE FROM portfolio_content WHERE section = ${section} RETURNING id`;
    return NextResponse.json({ success: true, deleted: result.length });
  } catch (error) {
    console.error("CONTENT BULK DELETE ERROR:", error);
    return NextResponse.json({ success: false, message: "Could not delete records." }, { status: 500 });
  }
}
