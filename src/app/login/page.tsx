"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import MainLoader from "@/components/common/MainLoader";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const otpMode = Boolean(challengeId);
  const timerLabel = useMemo(() => {
    const m = Math.floor(secondsLeft / 60);
    const s = String(secondsLeft % 60).padStart(2, "0");
    return `${m}:${s}`;
  }, [secondsLeft]);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/session", { cache: "no-store", credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (!active) return;
        if (d.authenticated) router.replace("/dashboard/overview");
        else setChecking(false);
      })
      .catch(() => active && setChecking(false));
    return () => { active = false; };
  }, [router]);

  useEffect(() => {
    if (!expiresAt) return;
    const tick = () => setSecondsLeft(Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000)));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [expiresAt]);

  async function requestOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed.");
      setChallengeId(String(data.challengeId));
      setExpiresAt(Date.now() + Number(data.expiresIn || 300) * 1000);
      setOtp("");
      setNotice("A 6-digit verification code was sent to the configured admin email.");
    } catch (e) { setError(e instanceof Error ? e.message : "Login failed."); }
    finally { setLoading(false); }
  }

  async function verifyOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (secondsLeft <= 0) { setError("OTP expired. Please request a new OTP."); return; }
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
        body: JSON.stringify({ challengeId, otp }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "OTP verification failed.");
      router.replace("/dashboard/overview"); router.refresh();
    } catch (e) { setError(e instanceof Error ? e.message : "OTP verification failed."); }
    finally { setLoading(false); }
  }

  async function resendOtp() {
    setLoading(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/auth/resend-otp", {
        method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not resend OTP.");
      setChallengeId(String(data.challengeId));
      setExpiresAt(Date.now() + Number(data.expiresIn || 300) * 1000);
      setOtp("");
      setNotice("A new OTP was sent. The new code expires in 5 minutes.");
    } catch (e) { setError(e instanceof Error ? e.message : "Could not resend OTP."); }
    finally { setLoading(false); }
  }

  if (checking) return <main className="flex min-h-screen items-center justify-center bg-[#020817]"><MainLoader /></main>;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020817] px-4 py-16 text-white sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(37,99,235,0.25),_transparent_45%),radial-gradient(ellipse_at_bottom_right,_rgba(6,182,212,0.18),_transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(34,211,238,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,.35)_1px,transparent_1px)] [background-size:48px_48px]" />
      <section className="relative z-10 w-full max-w-md rounded-[2rem] border border-cyan-300/15 bg-[#061329]/80 p-6 shadow-[0_0_80px_rgba(8,145,178,.12)] backdrop-blur-2xl sm:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-blue-500/20 to-cyan-400/10 text-2xl text-cyan-300">{otpMode ? "#" : "🔒"}</div>
          <p className="text-xs font-semibold uppercase tracking-[] text-cyan-300">Private Access</p>
          <h1 className="mt-3 bg-gradient-to-r from-blue-200 via-cyan-300 to-blue-400 bg-clip-text text-3xl font-black text-transparent">{otpMode ? "Verify OTP" : "Admin Login"}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">{otpMode ? "Enter the 6-digit code sent to your admin email. It is valid for exactly 5 minutes." : "Sign in with the existing admin credentials. A secure email OTP is required before dashboard access."}</p>
        </div>

        {error && <div className="mt-5 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}
        {notice && <div className="mt-5 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">{notice}</div>}

        {!otpMode ? (
          <form onSubmit={requestOtp} className="mt-6 space-y-5">
            <label className="block text-sm font-medium text-slate-300">Email
              <input type="email" autoComplete="username" value={email} onChange={(e)=>setEmail(e.target.value)} required placeholder="Enter admin email" className="mt-2 w-full rounded-xl border border-blue-300/15 bg-blue-950/30 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/60" />
            </label>
            <label className="block text-sm font-medium text-slate-300">Password
              <div className="relative mt-2">
                <input type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={(e)=>setPassword(e.target.value)} required placeholder="Enter admin password" className="w-full rounded-xl border border-blue-300/15 bg-blue-950/30 px-4 py-3 pr-20 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/60" />
                <button type="button" onClick={()=>setShowPassword(v=>!v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-cyan-300">{showPassword ? "Hide" : "Show"}</button>
              </div>
            </label>
            <button disabled={loading} className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-5 py-3 font-semibold disabled:opacity-60">{loading ? "Sending OTP..." : "Continue with OTP"}</button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="mt-6 space-y-5">
            <label className="block text-sm font-medium text-slate-300">Verification code
              <input inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={otp} onChange={(e)=>setOtp(e.target.value.replace(/\D/g, "").slice(0,6))} required placeholder="000000" className="mt-2 w-full rounded-xl border border-blue-300/15 bg-blue-950/30 px-4 py-4 text-center text-3xl font-black tracking-[.45em] text-white outline-none placeholder:text-slate-700 focus:border-cyan-400/60" />
            </label>
            <div className={`rounded-xl border px-4 py-3 text-center text-sm ${secondsLeft > 0 ? "border-cyan-400/20 bg-cyan-400/5 text-cyan-200" : "border-red-400/20 bg-red-500/10 text-red-300"}`}>{secondsLeft > 0 ? `Code expires in ${timerLabel}` : "OTP expired. Please request a new OTP."}</div>
            <button disabled={loading || otp.length !== 6 || secondsLeft <= 0} className="w-full rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-5 py-3 font-semibold disabled:opacity-50">{loading ? "Verifying..." : "Verify & Open Dashboard"}</button>
            <div className="flex items-center justify-between gap-3 text-sm">
              <button type="button" onClick={()=>{setChallengeId("");setOtp("");setError("");setNotice("");}} className="text-slate-400 hover:text-white">Back to login</button>
              <button type="button" disabled={loading} onClick={resendOtp} className="font-semibold text-cyan-300 disabled:opacity-50">Resend OTP</button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}
