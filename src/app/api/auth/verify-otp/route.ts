import { NextRequest, NextResponse } from "next/server";
import { createAdminSessionToken, setAdminCookie } from "@/lib/admin-auth";
import { verifyOtpChallenge } from "@/lib/admin-otp";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const challengeId = String(body.challengeId || "");
    const otp = String(body.otp || "").trim();
    if (!challengeId || !otp) return NextResponse.json({ success: false, message: "OTP is required." }, { status: 400 });

    const result = await verifyOtpChallenge(challengeId, otp);
    if (!result.ok) return NextResponse.json({ success: false, message: result.message }, { status: result.status });

    const response = NextResponse.json({ success: true });
    setAdminCookie(response, createAdminSessionToken());
    return response;
  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);
    return NextResponse.json({ success: false, message: "Could not verify OTP." }, { status: 500 });
  }
}
