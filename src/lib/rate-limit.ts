/**
 * Lightweight in-memory rate limiter for public write endpoints.
 *
 * Scope and limits: this is a per-instance (per serverless warm process) sliding
 * window. It is intentionally dependency-free and cheap. It is NOT a distributed
 * limiter — on Vercel, N concurrent instances each allow the full quota. It stops
 * the realistic attack (a single client hammering one endpoint in a loop) and
 * keeps anonymous visitors from flooding the Neon database with rows and
 * 1.5 MB base64 image payloads.
 *
 * For a hard global quota, back this with Upstash Redis or a `rate_limits`
 * table in Neon; the call sites do not need to change.
 */

type Bucket = { hits: number[]; };

const buckets = new Map<string, Bucket>();
const MAX_TRACKED_KEYS = 5_000;

export type RateLimitRule = {
  /** Human readable identifier, used as part of the bucket key. */
  name: string;
  /** Maximum number of requests allowed inside the window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
};

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  limit: number;
  /** Seconds until the oldest hit leaves the window. Sent as `Retry-After`. */
  retryAfterSeconds: number;
};

/** Predefined rules for the public write surface. */
export const RATE_LIMITS = {
  /** Posting a visitor message. Generous enough for a real conversation. */
  messageCreate: { name: "message:create", limit: 5, windowMs: 10 * 60_000 },
  /** Replying inside a message thread. */
  messageReply: { name: "message:reply", limit: 20, windowMs: 10 * 60_000 },
  /** Commenting on a post. */
  postComment: { name: "post:comment", limit: 10, windowMs: 10 * 60_000 },
  /** Toggling a like. */
  postLike: { name: "post:like", limit: 60, windowMs: 5 * 60_000 },
  /** Admin login attempts, to slow down credential guessing. */
  loginAttempt: { name: "auth:login", limit: 8, windowMs: 10 * 60_000 },
} as const satisfies Record<string, RateLimitRule>;

/**
 * Resolve the caller's IP in a way that cannot be trivially spoofed.
 *
 * Vercel (and most managed proxies) append the real peer address as the LAST
 * entry of `x-forwarded-for`, and overwrite `x-real-ip`. A client can send its
 * own `x-forwarded-for` header, but it can only PREPEND entries — so the first
 * entry is attacker-controlled and the last one is not. We therefore read the
 * last entry, which makes header spoofing useless as a rate-limit bypass.
 */
function clientKey(request: Request) {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",").map((part) => part.trim()).filter(Boolean);
    const last = parts[parts.length - 1];
    if (last) return last;
  }

  return "unknown";
}

function prune(now: number) {
  if (buckets.size <= MAX_TRACKED_KEYS) return;
  for (const [key, bucket] of buckets) {
    if (!bucket.hits.some((hit) => now - hit < 60 * 60_000)) buckets.delete(key);
    if (buckets.size <= MAX_TRACKED_KEYS) return;
  }
}

/**
 * Record a request against a rule. Call this once per incoming write request.
 */
export function checkRateLimit(
  request: Request,
  rule: RateLimitRule,
  scope = "",
): RateLimitResult {
  const now = Date.now();
  const key = `${rule.name}:${scope}:${clientKey(request)}`;
  const bucket = buckets.get(key) ?? { hits: [] };

  const recent = bucket.hits.filter((hit) => now - hit < rule.windowMs);
  const ok = recent.length < rule.limit;

  if (ok) recent.push(now);
  buckets.set(key, { hits: recent });
  prune(now);

  const oldest = recent[0] ?? now;
  return {
    ok,
    remaining: Math.max(0, rule.limit - recent.length),
    limit: rule.limit,
    retryAfterSeconds: ok
      ? 0
      : Math.max(1, Math.ceil((rule.windowMs - (now - oldest)) / 1000)),
  };
}

/** Standard rate-limit response headers, safe to attach to any response. */
export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  const headers: Record<string, string> = {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
  };
  if (!result.ok) headers["Retry-After"] = String(result.retryAfterSeconds);
  return headers;
}

/**
 * Convenience wrapper: returns a 429 `Response` when the caller is over the
 * limit, or `null` when the request may proceed.
 *
 * Usage:
 *   const limited = enforceRateLimit(request, RATE_LIMITS.postLike, postId);
 *   if (limited) return limited;
 */
export function enforceRateLimit(
  request: Request,
  rule: RateLimitRule,
  scope = "",
): Response | null {
  const result = checkRateLimit(request, rule, scope);
  if (result.ok) return null;

  return Response.json(
    {
      success: false,
      message: `Too many requests. Please try again in ${result.retryAfterSeconds} second${
        result.retryAfterSeconds === 1 ? "" : "s"
      }.`,
      retryAfterSeconds: result.retryAfterSeconds,
    },
    { status: 429, headers: rateLimitHeaders(result) },
  );
}
