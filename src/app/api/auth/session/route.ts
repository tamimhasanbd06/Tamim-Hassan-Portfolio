import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, clearAdminCookie, isAdminRequest } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const authenticated = isAdminRequest(request);
  const response = NextResponse.json({ authenticated }, { headers: { "Cache-Control": "no-store" } });
  if (!authenticated && request.cookies.has(ADMIN_COOKIE_NAME)) clearAdminCookie(response);
  return response;
}
