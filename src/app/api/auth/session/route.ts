import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  return NextResponse.json({ authenticated: isAdminRequest(request) });
}
