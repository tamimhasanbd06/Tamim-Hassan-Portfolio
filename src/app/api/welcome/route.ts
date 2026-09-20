import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const consent = body.consent === true;
    if (!consent) return NextResponse.json({ success: false, message: "Explicit email consent is required." }, { status: 400 });
    if (!EMAIL_RE.test(email) || email.length > 254) return NextResponse.json({ success: false, message: "Enter a valid email address." }, { status: 400 });

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.MAIL_FROM;
    if (!apiKey || !from) return NextResponse.json({ success: false, message: "Welcome email is not configured." }, { status: 503 });

    const sql = getDb();
    await sql`
      CREATE TABLE IF NOT EXISTS visitor_welcome_emails (
        email TEXT PRIMARY KEY,
        consented_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        sent_at TIMESTAMPTZ
      )
    `;
    const existing = await sql`SELECT sent_at FROM visitor_welcome_emails WHERE email = ${email} LIMIT 1`;
    if (existing[0]?.sent_at) return NextResponse.json({ success: true, alreadySent: true });

    await sql`
      INSERT INTO visitor_welcome_emails (email, consented_at)
      VALUES (${email}, NOW())
      ON CONFLICT (email) DO UPDATE SET consented_at = EXCLUDED.consented_at
    `;

    const mailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [email],
        subject: "Welcome to Tamim Hasan's portfolio",
        html: `<div style="font-family:Arial,sans-serif;line-height:1.65;color:#0f172a"><h2>Welcome!</h2><p>Thanks for visiting Tamim Hasan's portfolio and choosing to receive this welcome message.</p><p>This portfolio highlights web development projects, skills, tools, experience, and the process used to build modern digital products.</p><p>You can return to the portfolio any time to explore the latest work and updates.</p><p>Best regards,<br/>Tamim Hasan</p></div>`,
      }),
    });
    if (!mailResponse.ok) throw new Error(`Mail provider returned ${mailResponse.status}`);
    await sql`UPDATE visitor_welcome_emails SET sent_at = NOW() WHERE email = ${email}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("WELCOME EMAIL ERROR:", error);
    return NextResponse.json({ success: false, message: "Could not send the welcome email." }, { status: 500 });
  }
}
