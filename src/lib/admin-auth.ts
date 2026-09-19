import { createHmac, timingSafeEqual } from "crypto";
import type { NextRequest, NextResponse } from "next/server";

export const ADMIN_COOKIE_NAME = "tamim_post_admin";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getAuthSecret() {
  const secret = process.env.POST_AUTH_SECRET;
  if (!secret) {
    throw new Error("POST_AUTH_SECRET is missing.");
  }
  return secret;
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function sign(payload: string) {
  return createHmac("sha256", getAuthSecret()).update(payload).digest("hex");
}

export function credentialsAreValid(email: string, password: string) {
  const expectedEmail = process.env.POST_ADMIN_EMAIL || "";
  const expectedPassword = process.env.POST_ADMIN_PASSWORD || "";

  if (!expectedEmail || !expectedPassword) {
    throw new Error("POST_ADMIN_EMAIL or POST_ADMIN_PASSWORD is missing.");
  }

  return safeEqual(email.trim().toLowerCase(), expectedEmail.trim().toLowerCase()) && safeEqual(password, expectedPassword);
}

export function createAdminSessionToken() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const payload = `admin:${expiresAt}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSessionToken(token?: string | null) {
  if (!token) return false;

  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return false;

  const payload = token.slice(0, lastDot);
  const signature = token.slice(lastDot + 1);
  const [role, expiresRaw] = payload.split(":");
  const expiresAt = Number(expiresRaw);

  if (role !== "admin" || !Number.isFinite(expiresAt)) return false;
  if (expiresAt <= Math.floor(Date.now() / 1000)) return false;

  return safeEqual(signature, sign(payload));
}

export function isAdminRequest(request: NextRequest) {
  return verifyAdminSessionToken(request.cookies.get(ADMIN_COOKIE_NAME)?.value);
}

export function setAdminCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export function clearAdminCookie(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
