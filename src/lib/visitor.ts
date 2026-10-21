import { createHmac, randomUUID, timingSafeEqual } from "crypto";

/**
 * Signed visitor cookies.
 *
 * The visitor identity used to be a raw, unsigned UUID in an HttpOnly cookie.
 * HttpOnly stops script access but not tampering: a visitor could rewrite their
 * own cookie to another visitor's UUID and read that visitor's messages. The
 * value is now `uuid.signature`, signed with the same server secret as the
 * admin session, and every read is verified.
 */

export const VISITOR_COOKIE = "tamim_message_visitor";
export const POST_VISITOR_COOKIE = "tamim_post_visitor";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function secret() {
  const value = process.env.POST_AUTH_SECRET;
  if (!value) throw new Error("POST_AUTH_SECRET is missing.");
  return value;
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(`visitor:${value}`).digest("hex").slice(0, 32);
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Build a signed cookie value for a visitor id. */
export function signVisitorId(id: string) {
  return `${id}.${sign(id)}`;
}

/**
 * Verify a signed cookie value and return the visitor id, or null when the
 * value is missing, malformed, or has been tampered with.
 */
export function verifyVisitorId(raw: string | undefined | null): string | null {
  if (!raw) return null;
  const lastDot = raw.lastIndexOf(".");
  if (lastDot === -1) return null;
  const id = raw.slice(0, lastDot);
  const signature = raw.slice(lastDot + 1);
  if (!UUID_RE.test(id)) return null;
  if (!safeEqual(signature, sign(id))) return null;
  return id;
}

/** Read and verify the visitor cookie from a request. */
export function readVisitorId(
  request: { cookies: { get(name: string): { value: string } | undefined } },
  cookieName: string,
): string | null {
  return verifyVisitorId(request.cookies.get(cookieName)?.value);
}

/** Read the visitor id, minting and signing a new one when absent or invalid. */
export function resolveVisitorId(
  request: { cookies: { get(name: string): { value: string } | undefined } },
  cookieName: string,
): string {
  return readVisitorId(request, cookieName) ?? randomUUID();
}

export function visitorCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  };
}
