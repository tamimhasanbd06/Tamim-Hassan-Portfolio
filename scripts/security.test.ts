import test from "node:test";
import assert from "node:assert";

import {
  RATE_LIMITS,
  checkRateLimit,
  enforceRateLimit,
  rateLimitHeaders,
} from "../src/lib/rate-limit.ts";
import { signVisitorId, verifyVisitorId } from "../src/lib/visitor.ts";

process.env.POST_AUTH_SECRET ??= "test-secret-".padEnd(64, "x");

function fakeRequest(ip = "203.0.113.7") {
  return new Request("https://example.com/api/test", {
    method: "POST",
    headers: { "x-forwarded-for": ip },
  });
}

test("Rate limit test suite", async (t) => {
  await t.test("allows requests under the limit and blocks the next one", () => {
    const rule = { name: "unit:basic", limit: 3, windowMs: 60_000 };
    for (let i = 0; i < 3; i += 1) {
      assert.strictEqual(checkRateLimit(fakeRequest(), rule).ok, true, `request ${i + 1} should pass`);
    }
    const blocked = checkRateLimit(fakeRequest(), rule);
    assert.strictEqual(blocked.ok, false);
    assert.ok(blocked.retryAfterSeconds >= 1);
    assert.strictEqual(blocked.remaining, 0);
  });

  await t.test("keeps separate buckets per client IP", () => {
    const rule = { name: "unit:per-ip", limit: 1, windowMs: 60_000 };
    assert.strictEqual(checkRateLimit(fakeRequest("198.51.100.1"), rule).ok, true);
    assert.strictEqual(checkRateLimit(fakeRequest("198.51.100.1"), rule).ok, false);
    assert.strictEqual(checkRateLimit(fakeRequest("198.51.100.2"), rule).ok, true);
  });

  await t.test("keeps separate buckets per scope", () => {
    const rule = { name: "unit:scope", limit: 1, windowMs: 60_000 };
    assert.strictEqual(checkRateLimit(fakeRequest(), rule, "post-a").ok, true);
    assert.strictEqual(checkRateLimit(fakeRequest(), rule, "post-a").ok, false);
    assert.strictEqual(checkRateLimit(fakeRequest(), rule, "post-b").ok, true);
  });

  await t.test("ignores an attacker-prepended x-forwarded-for entry", () => {
    const rule = { name: "unit:spoof", limit: 1, windowMs: 60_000 };
    const withFakePrefix = (fake: string) =>
      new Request("https://example.com/api/test", {
        method: "POST",
        // A client can prepend entries; the proxy appends the real peer last.
        headers: { "x-forwarded-for": `${fake}, 203.0.113.9` },
      });

    assert.strictEqual(checkRateLimit(withFakePrefix("1.1.1.1"), rule).ok, true);
    // Rotating the attacker-controlled prefix must NOT grant a fresh bucket.
    assert.strictEqual(checkRateLimit(withFakePrefix("8.8.8.8"), rule).ok, false);
    assert.strictEqual(checkRateLimit(withFakePrefix("9.9.9.9"), rule).ok, false);
  });

  await t.test("x-real-ip takes precedence over x-forwarded-for", () => {
    const rule = { name: "unit:realip", limit: 1, windowMs: 60_000 };
    const make = (forwarded: string) =>
      new Request("https://example.com/api/test", {
        method: "POST",
        headers: { "x-real-ip": "203.0.113.50", "x-forwarded-for": forwarded },
      });

    assert.strictEqual(checkRateLimit(make("1.1.1.1"), rule).ok, true);
    assert.strictEqual(checkRateLimit(make("8.8.8.8"), rule).ok, false);
  });

  await t.test("enforceRateLimit returns a 429 response with Retry-After", async () => {
    const rule = { name: "unit:429", limit: 1, windowMs: 30_000 };
    assert.strictEqual(enforceRateLimit(fakeRequest(), rule), null);
    const response = enforceRateLimit(fakeRequest(), rule);
    assert.ok(response instanceof Response);
    assert.strictEqual(response.status, 429);
    assert.ok(Number(response.headers.get("Retry-After")) >= 1);

    const body = await response.json();
    assert.strictEqual(body.success, false);
    assert.match(body.message, /try again/i);
    assert.ok(typeof body.retryAfterSeconds === "number");
  });

  await t.test("rateLimitHeaders exposes the standard fields", () => {
    const headers = rateLimitHeaders({ ok: false, remaining: 0, limit: 5, retryAfterSeconds: 42 });
    assert.strictEqual(headers["X-RateLimit-Limit"], "5");
    assert.strictEqual(headers["X-RateLimit-Remaining"], "0");
    assert.strictEqual(headers["Retry-After"], "42");
  });

  await t.test("every configured public write rule is present and sane", () => {
    const rules = Object.entries(RATE_LIMITS) as Array<[string, { name: string; limit: number; windowMs: number }]>;
    for (const [key, rule] of rules) {
      assert.ok(rule.limit > 0, `${key} needs a positive limit`);
      assert.ok(rule.windowMs > 0, `${key} needs a positive window`);
      assert.ok(rule.name.length > 0, `${key} needs a name`);
    }
    // Login must be stricter than ordinary writes to slow credential guessing.
    // Compare rates per minute, not raw counts, since the windows differ.
    const perMinute = (rule: { limit: number; windowMs: number }) =>
      rule.limit / (rule.windowMs / 60_000);
    assert.ok(
      perMinute(RATE_LIMITS.loginAttempt) < perMinute(RATE_LIMITS.messageReply),
      "login attempts per minute must be lower than conversation reply writes per minute",
    );
  });
});

test("Signed visitor cookie test suite", async (t) => {
  const id = "3f2504e0-4f89-41d3-9a0c-0305e82c3301";

  await t.test("round-trips a signed visitor id", () => {
    const signed = signVisitorId(id);
    assert.notStrictEqual(signed, id);
    assert.strictEqual(verifyVisitorId(signed), id);
  });

  await t.test("rejects an unsigned raw id", () => {
    assert.strictEqual(verifyVisitorId(id), null);
  });

  await t.test("rejects a tampered signature", () => {
    const signed = signVisitorId(id);
    const tampered = `${signed.slice(0, -1)}${signed.endsWith("0") ? "1" : "0"}`;
    assert.strictEqual(verifyVisitorId(tampered), null);
  });

  await t.test("rejects swapping the id while keeping another signature", () => {
    const other = "9c858901-8a57-4791-81fe-4c455b099bc9";
    const [otherId, otherSignature] = signVisitorId(other).split(".");
    assert.strictEqual(verifyVisitorId(`${id}.${otherSignature}`), null);
    assert.strictEqual(verifyVisitorId(`${otherId}.${signVisitorId(id).split(".")[1]}`), null);
  });

  await t.test("rejects malformed and empty values", () => {
    assert.strictEqual(verifyVisitorId(undefined), null);
    assert.strictEqual(verifyVisitorId(null), null);
    assert.strictEqual(verifyVisitorId(""), null);
    assert.strictEqual(verifyVisitorId("no-dot-here"), null);
    assert.strictEqual(verifyVisitorId("not-a-uuid.deadbeef"), null);
  });
});
