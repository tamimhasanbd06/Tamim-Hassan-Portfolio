"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  LogIn,
  Mail,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  Fingerprint,
  LayoutDashboard,
} from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  /*
   * =========================================================
   * SESSION CHECK
   * =========================================================
   */

  useEffect(() => {
    let active = true;

    fetch("/api/auth/session", {
      cache: "no-store",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (!active) return;

        if (data.authenticated) {
          router.replace("/dashboard/overview");
          return;
        }

        setChecking(false);
      })
      .catch(() => {
        if (active) {
          setChecking(false);
        }
      });

    return () => {
      active = false;
    };
  }, [router]);

  /*
   * =========================================================
   * LOGIN
   * =========================================================
   */

  async function submit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed.",
        );
      }

      router.replace("/dashboard/overview");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Login failed.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#020617] px-4 py-10 text-white sm:px-6 lg:px-8">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(circle_at_15%_15%,rgba(37,99,235,0.13),transparent_30%),radial-gradient(circle_at_85%_85%,rgba(6,182,212,0.10),transparent_32%),linear-gradient(135deg,#020617_0%,#030712_50%,#020617_100%)]" />

      {/* Blue glow */}

      <div className="pointer-events-none absolute -left-48 -top-48 -z-20 h-[520px] w-[520px] rounded-full bg-blue-600/[0.10] blur-[150px]" />

      {/* Cyan glow */}

      <div className="pointer-events-none absolute -bottom-56 -right-48 -z-20 h-[560px] w-[560px] rounded-full bg-cyan-400/[0.08] blur-[160px]" />

      {/* Center glow */}

      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-20 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.035] blur-[140px]" />

      {/* Grid */}

      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.45)_1px,transparent_1px)] [background-size:56px_56px]" />

      {/* =====================================================
          MAIN WRAPPER
      ====================================================== */}

      <div className="relative w-full max-w-md">
        {/* ===================================================
            BACK TO PORTFOLIO
        ==================================================== */}

        <div className="mb-5 flex items-center justify-between">
          <Link
            href="/home"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-2 text-xs font-semibold text-slate-400 backdrop-blur-xl transition-all duration-300 hover:border-cyan-300/20 hover:bg-cyan-300/[0.05] hover:text-cyan-200"
          >
            <ArrowLeft
              size={15}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to Portfolio
          </Link>

          <div className="hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            Secure Portal
          </div>
        </div>

        {/* ===================================================
            LOGIN CARD
        ==================================================== */}

        <section className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          {/* Card glow */}

          <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-cyan-400/[0.07] blur-[100px]" />

          <div className="pointer-events-none absolute -bottom-32 -left-24 h-64 w-64 rounded-full bg-blue-500/[0.07] blur-[100px]" />

          {/* Top accent */}

          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />

          <div className="relative p-6 sm:p-8">
            {/* =================================================
                BRAND / ICON
            ================================================== */}

            <div className="mb-7 flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/15 bg-gradient-to-br from-cyan-300/[0.10] via-blue-500/[0.08] to-indigo-500/[0.10] shadow-[0_0_35px_rgba(34,211,238,0.06)]">
                <LockKeyhole
                  size={25}
                  className="text-cyan-200"
                />
              </div>

              <div className="rounded-full border border-emerald-300/10 bg-emerald-300/[0.045] px-3 py-1.5">
                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />

                  Protected
                </span>
              </div>
            </div>

            {/* =================================================
                TITLE
            ================================================== */}

            <div className="mb-7">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles
                  size={14}
                  className="text-cyan-300"
                />

                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-cyan-300">
                  Admin Access
                </p>
              </div>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                Welcome back
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Sign in to access the{" "}
                <span className="font-semibold text-slate-300">
                  Tamim Hasan Portfolio
                </span>{" "}
                administration dashboard.
              </p>
            </div>

            {/* =================================================
                ADMIN INFORMATION
            ================================================== */}

            <div className="mb-6 rounded-2xl border border-cyan-300/[0.08] bg-cyan-300/[0.025] p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-300/10 bg-cyan-300/[0.06]">
                  <LayoutDashboard
                    size={16}
                    className="text-cyan-300"
                  />
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-200">
                    Portfolio Administration
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-slate-500">
                    Manage portfolio content, posts,
                    visitor messages, and dashboard
                    activity from this secure area.
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                SESSION CHECK
            ================================================== */}

            {checking ? (
              <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-300/20 border-t-cyan-300" />

                <div>
                  <p className="text-sm font-semibold text-slate-300">
                    Checking session
                  </p>

                  <p className="mt-0.5 text-[11px] text-slate-600">
                    Verifying your current access...
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={submit}
                className="space-y-5"
              >
                {/* =================================================
                    EMAIL
                ================================================== */}

                <label className="block">
                  <span className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                      Email Address
                    </span>

                    <span className="text-[10px] text-slate-700">
                      Admin
                    </span>
                  </span>

                  <div className="group relative">
                    <Mail
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 transition-colors duration-300 group-focus-within:text-cyan-300"
                    />

                    <input
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="admin@example.com"
                      className="h-12 w-full rounded-xl border border-white/[0.08] bg-black/[0.16] pl-11 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-700 focus:border-cyan-300/25 focus:bg-cyan-300/[0.025] focus:ring-4 focus:ring-cyan-300/[0.04]"
                    />
                  </div>
                </label>

                {/* =================================================
                    PASSWORD
                ================================================== */}

                <label className="block">
                  <span className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                      Password
                    </span>

                    <span className="flex items-center gap-1 text-[10px] text-slate-700">
                      <Fingerprint size={11} />

                      Protected
                    </span>
                  </span>

                  <div className="group relative">
                    <LockKeyhole
                      size={17}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 transition-colors duration-300 group-focus-within:text-cyan-300"
                    />

                    <input
                      type={
                        show ? "text" : "password"
                      }
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Enter your password"
                      className="h-12 w-full rounded-xl border border-white/[0.08] bg-black/[0.16] pl-11 pr-12 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-700 focus:border-cyan-300/25 focus:bg-cyan-300/[0.025] focus:ring-4 focus:ring-cyan-300/[0.04]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShow((value) => !value)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-600 transition-colors hover:bg-white/[0.05] hover:text-cyan-300"
                      aria-label={
                        show
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {show ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>
                  </div>
                </label>

                {/* =================================================
                    ERROR
                ================================================== */}

                {error ? (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -6,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="rounded-2xl border border-rose-300/15 bg-rose-300/[0.045] p-4"
                  >
                    <div className="flex gap-3">
                      <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.6)]" />

                      <div>
                        <p className="text-xs font-bold text-rose-200">
                          Authentication failed
                        </p>

                        <p className="mt-1 text-xs leading-5 text-rose-300/70">
                          {error}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : null}

                {/* =================================================
                    LOGIN BUTTON
                ================================================== */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-cyan-300/20 bg-gradient-to-r from-cyan-400/[0.14] via-blue-500/[0.16] to-indigo-500/[0.14] text-sm font-bold text-cyan-100 shadow-[0_10px_35px_rgba(34,211,238,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/35 hover:shadow-[0_15px_45px_rgba(34,211,238,0.12)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {/* Button glow */}

                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-200/20 border-t-cyan-200" />

                      <span className="relative">
                        Authenticating...
                      </span>
                    </>
                  ) : (
                    <>
                      <LogIn
                        size={17}
                        className="relative transition-transform duration-300 group-hover:translate-x-0.5"
                      />

                      <span className="relative">
                        Sign In to Dashboard
                      </span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* =================================================
                SECURITY NOTE
            ================================================== */}

            <div className="mt-6 flex items-start gap-3 border-t border-white/[0.06] pt-5">
              <ShieldCheck
                size={17}
                className="mt-0.5 shrink-0 text-cyan-400/70"
              />

              <p className="text-[10px] leading-5 text-slate-600">
                This is a private administrator area.
                Access is restricted to authorized
                portfolio administrators. Please keep
                your credentials secure.
              </p>
            </div>
          </div>

          {/* =================================================
              CARD FOOTER
          ================================================== */}

          <div className="border-t border-white/[0.06] bg-black/[0.12] px-6 py-4 sm:px-8">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-medium text-slate-700">
                Tamim Hasan Portfolio
              </p>

              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/70" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700">
                  Admin Portal
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            BOTTOM BRAND
        ==================================================== */}

        <div className="mt-6 text-center">
          <p className="text-[10px] leading-5 text-slate-700">
            © {new Date().getFullYear()} Tamim Hasan.
            All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}