import { NextRequest, NextResponse } from "next/server";
import { credentialsAreValid } from "@/lib/admin-auth";
import { createOtpChallenge } from "@/lib/admin-otp";

function clientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email || "");
    const password = String(body.password || "");
    if (!credentialsAreValid(email, password)) {
      return NextResponse.json({ success: false, message: "Please sign in again." }, { status: 401 });
    }
    const challenge = await createOtpChallenge(email, clientIp(request));
    if (!challenge.ok) {
      const response = NextResponse.json({ success: false, message: challenge.message }, { status: challenge.status });
      response.headers.set("Retry-After", String(challenge.retryAfter));
      return response;
    }
    return NextResponse.json({ success: true, challengeId: challenge.challengeId, expiresIn: challenge.expiresIn });
  } catch (error) {
    console.error("RESEND OTP ERROR:", error);
    return NextResponse.json({ success: false, message: "Could not resend OTP." }, { status: 500 });
  }
}
