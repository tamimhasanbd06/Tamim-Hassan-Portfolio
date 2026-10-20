import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createAdminSessionToken, verifyAdminSessionToken } from "../src/lib/admin-auth.ts";

const originalSecret = process.env.POST_AUTH_SECRET;
const testSecret = "test-only-secret-with-more-than-sixty-four-characters-for-session-tests-0123456789";

before(() => { process.env.POST_AUTH_SECRET = testSecret; });
after(() => {
  if (originalSecret === undefined) delete process.env.POST_AUTH_SECRET;
  else process.env.POST_AUTH_SECRET = originalSecret;
});

test("Admin session tokens are signed and expire at the fixed 24-hour deadline", () => {
  const realNow = Date.now;
  const start = 1_800_000_000_000;
  try {
    Date.now = () => start;
    const token = createAdminSessionToken();
    assert.equal(verifyAdminSessionToken(token), true);
    Date.now = () => start + 86_399_000;
    assert.equal(verifyAdminSessionToken(token), true);
    Date.now = () => start + 86_400_000;
    assert.equal(verifyAdminSessionToken(token), false);
  } finally {
    Date.now = realNow;
  }
});

test("Admin session verification rejects tampered and legacy tokens", () => {
  const token = createAdminSessionToken();
  assert.equal(verifyAdminSessionToken(`${token.slice(0, -1)}x`), false);
  assert.equal(verifyAdminSessionToken("admin-v1:1800000000.invalid"), false);
  assert.equal(verifyAdminSessionToken("not-a-token"), false);
});
