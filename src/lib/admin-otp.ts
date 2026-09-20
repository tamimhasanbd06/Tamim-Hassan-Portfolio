import { createHmac, randomInt, randomUUID, timingSafeEqual } from "crypto";
import { getDb } from "@/lib/db";

const OTP_TTL_SECONDS = 5 * 60;
const OTP_MAX_ATTEMPTS = 5;
const OTP_RESEND_COOLDOWN_SECONDS = 30;
const OTP_WINDOW_MINUTES = 15;
const OTP_MAX_SENDS_PER_WINDOW = 5;

function authSecret() {
  const secret = process.env.POST_AUTH_SECRET;
  if (!secret) throw new Error("POST_AUTH_SECRET is missing.");
  return secret;
}

function hashOtp(challengeId: string, otp: string) {
  return createHmac("sha256", authSecret())
    .update(`${challengeId}:${otp}`)
    .digest("hex");
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function ensureOtpSchema() {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS admin_otp_challenges (
      id UUID PRIMARY KEY,
      email TEXT NOT NULL,
      otp_hash TEXT NOT NULL,
      request_ip TEXT NOT NULL DEFAULT '',
      attempts INTEGER NOT NULL DEFAULT 0,
      expires_at TIMESTAMPTZ NOT NULL,
      consumed_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_admin_otp_email_created ON admin_otp_challenges(email, created_at DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_admin_otp_ip_created ON admin_otp_challenges(request_ip, created_at DESC)`;
}

function generateOtp() {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

async function sendOtpEmail(email: string, otp: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  if (!apiKey || !from) {
    throw new Error("RESEND_API_KEY or MAIL_FROM is missing.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: "Your portfolio admin verification code",
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a">
          <h2>Admin verification code</h2>
          <p>Use this one-time code to finish signing in to your portfolio dashboard:</p>
          <p style="font-size:;font-weight:700;letter-spacing:;margin: 0">${otp}</p>
          <p>This code expires in exactly 5 minutes and becomes invalid after successful use.</p>
          <p>If you did not request this login, ignore this email and review your admin credentials.</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OTP email failed (${response.status}): ${text.slice(0, 200)}`);
  }
}

export async function createOtpChallenge(email: string, requestIp: string) {
  await ensureOtpSchema();
  const sql = getDb();
  const normalizedEmail = email.trim().toLowerCase();

  const recent = await sql`
    SELECT
      COUNT(*)::int AS total,
      MAX(created_at) AS latest
    FROM admin_otp_challenges
    WHERE (email = ${normalizedEmail} OR request_ip = ${requestIp})
      AND created_at > NOW() - INTERVAL '15 minutes'
  `;
  const total = Number(recent[0]?.total || 0);
  const latest = recent[0]?.latest ? new Date(String(recent[0].latest)).getTime() : 0;
  const sinceLatestSeconds = latest ? (Date.now() - latest) / 1000 : Number.POSITIVE_INFINITY;

  if (sinceLatestSeconds < OTP_RESEND_COOLDOWN_SECONDS) {
    const retryAfter = Math.max(1, Math.ceil(OTP_RESEND_COOLDOWN_SECONDS - sinceLatestSeconds));
    return { ok: false as const, status: 429, message: `Please wait ${retryAfter}s before requesting another code.`, retryAfter };
  }
  if (total >= OTP_MAX_SENDS_PER_WINDOW) {
    return { ok: false as const, status: 429, message: "Too many verification codes requested. Please try again later.", retryAfter: OTP_WINDOW_MINUTES * 60 };
  }

  const challengeId = randomUUID();
  const otp = generateOtp();
  const otpHash = hashOtp(challengeId, otp);
  const expiresAt = new Date(Date.now() + OTP_TTL_SECONDS * 1000);

  await sql`
    INSERT INTO admin_otp_challenges (id, email, otp_hash, request_ip, expires_at)
    VALUES (${challengeId}, ${normalizedEmail}, ${otpHash}, ${requestIp}, ${expiresAt.toISOString()})
  `;

  try {
    await sendOtpEmail(normalizedEmail, otp);
  } catch (error) {
    await sql`DELETE FROM admin_otp_challenges WHERE id = ${challengeId}`;
    throw error;
  }

  return { ok: true as const, challengeId, expiresIn: OTP_TTL_SECONDS };
}

export async function verifyOtpChallenge(challengeId: string, otp: string) {
  await ensureOtpSchema();
  const sql = getDb();
  const rows = await sql`
    SELECT id, otp_hash, attempts, expires_at, consumed_at
    FROM admin_otp_challenges
    WHERE id = ${challengeId}
    LIMIT 1
  `;
  const row = rows[0];
  if (!row) return { ok: false as const, status: 400, message: "Verification session not found. Please sign in again." };
  if (row.consumed_at) return { ok: false as const, status: 400, message: "This verification code has already been used." };
  if (new Date(String(row.expires_at)).getTime() <= Date.now()) {
    return { ok: false as const, status: 410, message: "OTP expired. Please request a new OTP." };
  }
  if (Number(row.attempts || 0) >= OTP_MAX_ATTEMPTS) {
    return { ok: false as const, status: 429, message: "Too many incorrect attempts. Please request a new OTP." };
  }

  const valid = /^\d{6}$/.test(otp) && safeEqual(String(row.otp_hash), hashOtp(challengeId, otp));
  if (!valid) {
    await sql`UPDATE admin_otp_challenges SET attempts = attempts + 1 WHERE id = ${challengeId}`;
    return { ok: false as const, status: 400, message: "Invalid OTP." };
  }

  const consumed = await sql`
    UPDATE admin_otp_challenges
    SET consumed_at = NOW()
    WHERE id = ${challengeId} AND consumed_at IS NULL AND expires_at > NOW()
    RETURNING id
  `;
  if (!consumed.length) {
    return { ok: false as const, status: 409, message: "This verification code is no longer valid." };
  }
  return { ok: true as const };
}
