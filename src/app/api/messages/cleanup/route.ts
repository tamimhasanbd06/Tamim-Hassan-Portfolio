import { NextRequest, NextResponse } from "next/server";
import { cleanupExpiredMessages } from "@/lib/db";

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return NextResponse.json({ success: false, message: "Cleanup service unavailable." }, { status: 503 });
  if (request.headers.get("authorization") !== `Bearer ${secret}`) return NextResponse.json({ success: false }, { status: 401 });

  try {
    await cleanupExpiredMessages();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("MESSAGE CLEANUP ERROR:", error);
    return NextResponse.json({ success: false, message: "Cleanup service unavailable." }, { status: 503 });
  }
}
