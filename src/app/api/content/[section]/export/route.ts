import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { isContentSection } from "@/lib/content-config";
import { listContent } from "@/lib/content-db";

type RouteContext = { params: Promise<{ section: string }> };

function csvEscape(value: unknown) {
  const text = typeof value === "string" ? value : JSON.stringify(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

export async function GET(request: NextRequest, context: RouteContext) {
  if (!isAdminRequest(request)) return NextResponse.json({ success: false, message: "Admin login required." }, { status: 401 });
  const { section } = await context.params;
  if (!isContentSection(section)) return NextResponse.json({ success: false, message: "Unknown content section." }, { status: 404 });
  const rows = await listContent(section, true);
  const data: Array<Record<string, unknown>> = rows.map((row) => row.data);
  const format = request.nextUrl.searchParams.get("format") === "csv" ? "csv" : "json";
  if (format === "json") {
    return new NextResponse(JSON.stringify(data, null, 2), { headers: { "Content-Type": "application/json; charset=utf-8", "Content-Disposition": `attachment; filename="${section}.json"` } });
  }
  const keys = Array.from(new Set(data.flatMap((item) => Object.keys(item))));
  const csv = [keys.map(csvEscape).join(","), ...data.map((item) => keys.map((key) => csvEscape(item[key])).join(","))].join("\n");
  return new NextResponse(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="${section}.csv"` } });
}
