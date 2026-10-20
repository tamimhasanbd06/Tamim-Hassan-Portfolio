"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Checks the server-authoritative HttpOnly session, including after tab changes. */
export default function AdminSessionGuard() {
  const router = useRouter();
  useEffect(() => {
    let active = true;
    let hadAdminSession = false;
    let redirecting = false;
    const verify = async () => {
      try {
        const response = await fetch("/api/auth/session", { cache: "no-store", credentials: "same-origin" });
        const data = await response.json();
        if (!active) return;
        if (response.ok && data.authenticated) {
          hadAdminSession = true;
          redirecting = false;
          return;
        }
        if (hadAdminSession && !redirecting) {
          redirecting = true;
          router.replace("/login");
          router.refresh();
        }
      } catch { /* Temporary connection errors must not trigger false logout. */ }
    };
    void verify();
    const interval = window.setInterval(() => void verify(), 10000);
    const onVisible = () => { if (document.visibilityState === "visible") void verify(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => { active = false; window.clearInterval(interval); document.removeEventListener("visibilitychange", onVisible); };
  }, [router]);
  return null;
}
