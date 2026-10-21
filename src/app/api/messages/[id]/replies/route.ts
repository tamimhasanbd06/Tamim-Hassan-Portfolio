import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { cleanText, isUuid, validateImageValue } from "@/lib/content-security";
import { ensurePostSchema, getDb } from "@/lib/db";
import { RATE_LIMITS, enforceRateLimit } from "@/lib/rate-limit";
import { VISITOR_COOKIE, readVisitorId } from "@/lib/visitor";

type Context = { params: Promise<{ id: string }> };

async function access(request: NextRequest, id: string) {
  const sql = getDb();
  const admin = isAdminRequest(request);
  const visitor = readVisitorId(request, VISITOR_COOKIE) ?? "";
  const records = admin
    ? await sql`SELECT id FROM messages WHERE id=${id} AND (expires_at > NOW() OR is_saved=TRUE)`
    : await sql`SELECT id FROM messages WHERE id=${id} AND visitor_id=${visitor} AND (expires_at > NOW() OR is_saved=TRUE)`;
  return { sql, admin, allowed: !!records.length };
}

export async function GET(request: NextRequest, context: Context) {
  try {
    const { id } = await context.params;
    if (!isUuid(id)) return NextResponse.json({ message: "Not found" }, { status: 404 });
    await ensurePostSchema();
    const { sql, allowed } = await access(request, id);
    if (!allowed) return NextResponse.json({ message: "Not found" }, { status: 404 });
    const rows = await sql`SELECT id, parent_reply_id, role, body, image_url, created_at FROM message_replies WHERE message_id=${id} ORDER BY created_at ASC,id ASC LIMIT 500`;
    return NextResponse.json({ replies: rows.map(r => ({ id: String(r.id), parentReplyId: r.parent_reply_id ? String(r.parent_reply_id) : null, role: r.role, body: r.body, imageUrl: r.image_url, createdAt: r.created_at })) });
  } catch (error) {
    console.error("REPLY GET", error);
    return NextResponse.json({ message: "Could not load replies" }, { status: 500 });
  }
}

export async function POST(request: NextRequest, context: Context) {
  try {
    const { id } = await context.params;
    if (!isUuid(id)) return NextResponse.json({ message: "Not found" }, { status: 404 });
    await ensurePostSchema();
    const limited = enforceRateLimit(request, RATE_LIMITS.messageReply, id);
    if (limited) return limited;
    const { sql, admin, allowed } = await access(request, id);
    if (!allowed) return NextResponse.json({ message: "Not found" }, { status: 404 });
    const payload = await request.json();
    const body = cleanText(payload.body, 5000);
    const imageUrl = payload.imageUrl ? validateImageValue(payload.imageUrl) : null;
    if (payload.imageUrl && !imageUrl) return NextResponse.json({ message: "Invalid image attachment" }, { status: 400 });
    if (!body && !imageUrl) return NextResponse.json({ message: "Text or an image is required" }, { status: 400 });
    const parentReplyId: string | null = payload.parentReplyId || null;
    if (parentReplyId) {
      if (!isUuid(parentReplyId)) return NextResponse.json({ message: "Invalid reply reference" }, { status: 400 });
      const target = await sql`SELECT id FROM message_replies WHERE id=${parentReplyId} AND message_id=${id}`;
      if (!target.length) return NextResponse.json({ message: "Referenced reply not found" }, { status: 404 });
    }
    const count = await sql`SELECT COUNT(*)::integer AS total FROM message_replies WHERE message_id=${id}`;
    if (Number(count[0].total) >= 500) return NextResponse.json({ message: "Reply limit reached" }, { status: 409 });
    const replyId = randomUUID();
    await sql`INSERT INTO message_replies (id,message_id,parent_reply_id,role,body,image_url) VALUES (${replyId},${id},${parentReplyId},${admin ? "admin" : "visitor"},${body},${imageUrl})`;
    if (admin) await sql`UPDATE messages SET status='replied',updated_at=NOW() WHERE id=${id}`;
    return NextResponse.json({ success: true, id: replyId }, { status: 201 });
  } catch (error) {
    console.error("REPLY POST", error);
    return NextResponse.json({ message: "Could not save reply" }, { status: 500 });
  }
}
