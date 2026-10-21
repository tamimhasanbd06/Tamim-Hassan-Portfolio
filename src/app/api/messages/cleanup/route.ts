import { NextRequest, NextResponse } from "next/server";
import { cleanupExpiredMessages } from "@/lib/db";

/**
 * Scheduled message cleanup.
 *
 * This route is intentionally authorized by the **existing** `POST_AUTH_SECRET`
 * rather than a dedicated cron secret, so the project needs only its original
 * four environment variables (DATABASE_URL, POST_AUTH_SECRET,
 * POST_ADMIN_EMAIL, POST_ADMIN_PASSWORD).
 *
 * Callers must present either:
 *   - `Authorization: Bearer <POST_AUTH_SECRET>`, or
 *   - `?token=<POST_AUTH_SECRET>` (Vercel Cron cannot set headers).
 *
 * The secret is never reflected back in a response.
 *
 * Note: expired messages are also pruned opportunistically on every message API
 * access (`GET`/`POST /api/messages`, `PATCH`/`DELETE /api/messages/[id]`), so a
 * missed schedule degrades cleanup latency but never correctness.
 */
function isAuthorized(request: NextRequest, secret: string) {
  const header = request.headers.get("authorization");
  if (header && header === `Bearer ${secret}`) return true;

  // Vercel Cron only issues a GET without custom headers.
  const queryToken = request.nextUrl.searchParams.get("token");
  return Boolean(queryToken) && queryToken === secret;
}

export async function GET(request: NextRequest) {
  const secret = process.env.POST_AUTH_SECRET;
  if (!secret) {
    return NextResponse.json({ success: false, message: "Cleanup service unavailable." }, { status: 503 });
  }

  if (!isAuthorized(request, secret)) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  try {
    await cleanupExpiredMessages();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("MESSAGE CLEANUP ERROR:", error);
    return NextResponse.json({ success: false, message: "Cleanup service unavailable." }, { status: 503 });
  }
}
