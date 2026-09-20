import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { isContentSection, sourceKeyFor } from "@/lib/content-config";
import { ensureContentSchema, listContent } from "@/lib/content-db";
import { getDb } from "@/lib/db";

type RouteContext = { params: Promise<{ section: string }> };

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { section } = await context.params;
    if (!isContentSection(section)) {
      return NextResponse.json({ success: false, message: "Unknown content section." }, { status: 404 });
    }
    const wantsAdmin = request.nextUrl.searchParams.get("admin") === "1";
    if (wantsAdmin && !isAdminRequest(request)) {
      return NextResponse.json({ success: false, message: "Admin login required." }, { status: 401 });
    }
    const items = await listContent(section, wantsAdmin);
    return NextResponse.json({ success: true, section, items });
  } catch (error) {
    console.error("CONTENT LIST ERROR:", error);
    return NextResponse.json({ success: false, message: "Could not load content." }, { status: 500 });
  }
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ success: false, message: "Admin login required." }, { status: 401 });
    }
    const { section } = await context.params;
    if (!isContentSection(section)) {
      return NextResponse.json({ success: false, message: "Unknown content section." }, { status: 404 });
    }
    await ensureContentSchema();
    const body = await request.json();
    const data = body?.data;
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return NextResponse.json({ success: false, message: "A valid data object is required." }, { status: 400 });
    }
    const sortOrder = Number.isFinite(Number(body.sortOrder)) ? Number(body.sortOrder) : 0;
    const visible = body.visible !== false;
    const featured = body.featured === true;
    const status = typeof body.status === "string" && body.status.trim() ? body.status.trim() : "published";
    const sourceKey = String(body.sourceKey || sourceKeyFor(data, Date.now())).trim();
    const sql = getDb();
    const id = randomUUID();
    await sql`
      INSERT INTO portfolio_content (id, section, source_key, data, sort_order, visible, featured, status)
      VALUES (${id}, ${section}, ${sourceKey}, ${JSON.stringify(data)}::jsonb, ${sortOrder}, ${visible}, ${featured}, ${status})
    `;
    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    console.error("CONTENT CREATE ERROR:", error);
    return NextResponse.json({ success: false, message: "Could not create content. Check for duplicate IDs/names." }, { status: 500 });
  }
}
