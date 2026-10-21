import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { cleanName, cleanText, validateHttpUrl, validateImageValue } from "@/lib/content-security";
import { cleanupExpiredMessages, getDb } from "@/lib/db";
import { RATE_LIMITS, enforceRateLimit } from "@/lib/rate-limit";
import { VISITOR_COOKIE, readVisitorId, visitorCookieOptions } from "@/lib/visitor";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    await cleanupExpiredMessages();
    const sql = getDb();
    const admin = isAdminRequest(request);
    const existing = readVisitorId(request, VISITOR_COOKIE);
    const visitor = existing ?? randomUUID();

    const rows = admin
      ? await sql`SELECT * FROM messages ORDER BY created_at DESC`
      : await sql`SELECT * FROM messages WHERE visitor_id=${visitor} ORDER BY created_at DESC`;

    const response = NextResponse.json({
      success: true,
      authenticated: admin,
      messages: rows.map((m) => ({
        id: String(m.id),
        senderName: String(m.sender_name),
        message: String(m.message),
        imageUrl: m.image_url ? String(m.image_url) : null,
        linkUrl: m.link_url ? String(m.link_url) : null,
        isSaved: Boolean(m.is_saved),
        status: String(m.status),
        adminReply: m.admin_reply ? String(m.admin_reply) : null,
        createdAt: new Date(String(m.created_at)).toISOString(),
        updatedAt: new Date(String(m.updated_at)).toISOString(),
        expiresAt: new Date(String(m.expires_at)).toISOString(),
      })),
    });

    if (!existing) {
      response.cookies.set(VISITOR_COOKIE, visitor, visitorCookieOptions(60 * 60 * 24 * 365));
    }
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Could not load messages." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const limited = enforceRateLimit(request, RATE_LIMITS.messageCreate);
    if (limited) return limited;

    await cleanupExpiredMessages();
    const body = await request.json();
    const name = cleanName(body.name);
    const message = cleanText(body.message, 5000);
    const imageUrl = body.imageUrl ? validateImageValue(body.imageUrl) : null;
    const linkUrl = body.linkUrl ? validateHttpUrl(body.linkUrl) : null;

    if (!name) return NextResponse.json({ success: false, message: "Name is required." }, { status: 400 });
    if (!message && !imageUrl && !linkUrl) {
      return NextResponse.json({ success: false, message: "Add a message, image, or link." }, { status: 400 });
    }
    if (body.imageUrl && !imageUrl) {
      return NextResponse.json({ success: false, message: "Invalid image or image is too large." }, { status: 400 });
    }
    if (body.linkUrl && !linkUrl) {
      return NextResponse.json({ success: false, message: "Enter a valid http(s) link." }, { status: 400 });
    }

    const visitor = readVisitorId(request, VISITOR_COOKIE) ?? randomUUID();
    const id = randomUUID();
    const sql = getDb();
    await sql`INSERT INTO messages (id,visitor_id,sender_name,message,image_url,link_url) VALUES (${id},${visitor},${name},${message},${imageUrl},${linkUrl})`;

    const response = NextResponse.json({ success: true, id }, { status: 201 });
    response.cookies.set(VISITOR_COOKIE, visitor, visitorCookieOptions(60 * 60 * 24 * 365));
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Could not send message." }, { status: 500 });
  }
}
