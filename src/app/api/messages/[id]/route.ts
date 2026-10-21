import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { cleanText, isUuid, validateHttpUrl, validateImageValue } from "@/lib/content-security";
import { cleanupExpiredMessages, getDb } from "@/lib/db";
import { VISITOR_COOKIE, readVisitorId } from "@/lib/visitor";

type C = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, c: C) {
  try {
    const { id } = await c.params;
    if (!isUuid(id)) {
      return NextResponse.json({ success: false, message: "Message not found." }, { status: 404 });
    }
    await cleanupExpiredMessages();

    const body = await request.json();
    const sql = getDb();
    const admin = isAdminRequest(request);

    if (admin) {
      const isSaved = Boolean(body.isSaved);
      const status = cleanText(body.status, 30) || "new";
      const reply = cleanText(body.adminReply, 5000);
      const rows = await sql`
        UPDATE messages
        SET is_saved=${isSaved}, status=${status}, admin_reply=${reply || null}, updated_at=NOW(),
            expires_at=CASE
              WHEN ${isSaved} THEN expires_at
              WHEN is_saved=TRUE THEN NOW()+INTERVAL '24 hours'
              ELSE expires_at
            END
        WHERE id=${id} RETURNING id`;
      if (!rows.length) {
        return NextResponse.json({ success: false, message: "Message not found." }, { status: 404 });
      }
      return NextResponse.json({ success: true });
    }

    // A visitor may only edit their own unsaved, unexpired message.
    const visitor = readVisitorId(request, VISITOR_COOKIE);
    if (!visitor) {
      return NextResponse.json(
        { success: false, message: "Message ownership could not be verified." },
        { status: 403 },
      );
    }

    const message = cleanText(body.message, 5000);
    const imageUrl = body.imageUrl ? validateImageValue(body.imageUrl) : null;
    const linkUrl = body.linkUrl ? validateHttpUrl(body.linkUrl) : null;
    if (body.imageUrl && !imageUrl) {
      return NextResponse.json({ success: false, message: "Invalid image." }, { status: 400 });
    }
    if (body.linkUrl && !linkUrl) {
      return NextResponse.json({ success: false, message: "Invalid link." }, { status: 400 });
    }

    const rows = await sql`
      UPDATE messages
      SET message=${message}, image_url=${imageUrl}, link_url=${linkUrl}, updated_at=NOW()
      WHERE id=${id} AND visitor_id=${visitor} AND is_saved=FALSE AND expires_at>NOW()
      RETURNING id`;
    if (!rows.length) {
      return NextResponse.json(
        { success: false, message: "Message not found or cannot be edited." },
        { status: 403 },
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Could not update message." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, c: C) {
  try {
    if (!isAdminRequest(request)) {
      return NextResponse.json({ success: false, message: "Admin login required." }, { status: 401 });
    }
    const { id } = await c.params;
    if (!isUuid(id)) {
      return NextResponse.json({ success: false, message: "Message not found." }, { status: 404 });
    }
    await cleanupExpiredMessages();
    const sql = getDb();
    const rows = await sql`DELETE FROM messages WHERE id=${id} RETURNING id`;
    if (!rows.length) {
      return NextResponse.json({ success: false, message: "Message not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Could not delete message." }, { status: 500 });
  }
}
