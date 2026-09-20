import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { isContentSection, sourceKeyFor } from "@/lib/content-config";
import { ensureContentSchema } from "@/lib/content-db";
import { getDb } from "@/lib/db";

type RouteContext = { params: Promise<{ section: string }> };

function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (char === '"') {
      if (quoted && text[i + 1] === '"') { value += '"'; i += 1; }
      else quoted = !quoted;
    } else if (char === "," && !quoted) { row.push(value); value = ""; }
    else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && text[i + 1] === "\n") i += 1;
      row.push(value); value = "";
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
    } else value += char;
  }
  row.push(value);
  if (row.some((cell) => cell.trim())) rows.push(row);
  if (rows.length < 2) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((cells) => Object.fromEntries(headers.map((h, idx) => [h, cells[idx] ?? ""])));
}

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    if (!isAdminRequest(request)) return NextResponse.json({ success: false, message: "Admin login required." }, { status: 401 });
    const { section } = await context.params;
    if (!isContentSection(section)) return NextResponse.json({ success: false, message: "Unknown content section." }, { status: 404 });
    const body = await request.json();
    const format = body.format === "csv" ? "csv" : "json";
    const raw = String(body.content || "");
    let records: unknown;
    try { records = format === "csv" ? parseCsv(raw) : JSON.parse(raw); }
    catch { return NextResponse.json({ success: false, message: `Invalid ${format.toUpperCase()} file.` }, { status: 400 }); }
    if (!Array.isArray(records)) return NextResponse.json({ success: false, message: "Import data must contain an array of records." }, { status: 400 });

    const valid = records.filter((record): record is Record<string, unknown> => Boolean(record) && typeof record === "object" && !Array.isArray(record));
    const invalidCount = records.length - valid.length;
    await ensureContentSchema();
    const sql = getDb();
    let imported = 0;
    let duplicates = 0;
    for (let index = 0; index < valid.length; index += 1) {
      const item = valid[index];
      const sourceKey = sourceKeyFor(item, index);
      const result = await sql`
        INSERT INTO portfolio_content (id, section, source_key, data, sort_order, visible, featured, status)
        VALUES (${randomUUID()}, ${section}, ${sourceKey}, ${JSON.stringify(item)}::jsonb, ${index}, ${item.visible !== false}, ${item.featured === true}, ${"published"})
        ON CONFLICT (section, source_key) DO NOTHING
        RETURNING id
      `;
      if (result.length) imported += 1; else duplicates += 1;
    }
    return NextResponse.json({ success: true, total: records.length, valid: valid.length, invalid: invalidCount, duplicates, imported });
  } catch (error) {
    console.error("CONTENT IMPORT ERROR:", error);
    return NextResponse.json({ success: false, message: "Could not import content." }, { status: 500 });
  }
}
