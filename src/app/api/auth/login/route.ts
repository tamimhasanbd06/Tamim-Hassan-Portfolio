import { NextRequest, NextResponse } from "next/server";
import { createAdminSessionToken, credentialsAreValid, setAdminCookie } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email || "");
    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password are required." }, { status: 400 });
    }

    if (!credentialsAreValid(email, password)) {
      return NextResponse.json({ success: false, message: "Invalid email or password." }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    setAdminCookie(response, createAdminSessionToken());
    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json({ success: false, message: "Login is not configured correctly." }, { status: 500 });
  }
}
