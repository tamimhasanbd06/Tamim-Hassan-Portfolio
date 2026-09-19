"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
          router.replace("/my-post");
          return;
        }

        setChecking(false);
      })
      .catch(() => {
        if (active) setChecking(false);
      });

    return () => {
      active = false;
    };
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      router.replace("/my-post");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Login failed."
      );
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020817] px-4 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(6,182,212,0.16),_transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(37,99,235,0.18),_transparent_50%)]" />

        <div className="relative rounded-2xl border border-cyan-400/20 bg-slate-950/70 px-6 py-4 text-sm text-cyan-300 shadow-[0_0_40px_rgba(6,182,212,0.08)] backdrop-blur-xl">
          Checking session...
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020817] px-4 py-20 text-white sm:px-6">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(37,99,235,0.24),_transparent_45%),radial-gradient(ellipse_at_bottom_right,_rgba(6,182,212,0.18),_transparent_45%)]" />

      {/* Grid texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(34,211,238,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.35)_1px,transparent_1px)] [background-size:48px_48px]" />

      {/* Glow effects */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-cyan-400/15 blur-[160px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[150px]" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-[2rem] border border-cyan-300/15 bg-[#061329]/75 p-6 shadow-[0_0_80px_rgba(8,145,178,0.10)] backdrop-blur-2xl sm:p-8">
        {/* Top gradient line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        <div className="mb-7 text-center">
          {/* Lock Icon */}
          <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-blue-500/20 to-cyan-400/10 text-cyan-300 shadow-[0_0_35px_rgba(6,182,212,0.12)]">
            <div className="absolute inset-0 rounded-2xl bg-cyan-400/5 blur-xl" />

            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="relative"
            >
              <rect x="4" y="10" width="16" height="11" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
          </div>

          <p className="text-xs font-semibold uppercase tracking-[4px] text-cyan-300">
            Private Access
          </p>

          <h1 className="mt-3 bg-gradient-to-r from-blue-200 via-cyan-300 to-blue-400 bg-clip-text text-3xl font-black tracking-tight text-transparent">
            Admin Login
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            This page is only for managing My Posts. Use the credentials
            configured in the server environment.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="admin-email"
              className="text-sm font-medium text-slate-300"
            >
              Email
            </label>

            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="Enter admin email"
              className="mt-2 w-full rounded-xl border border-blue-300/15 bg-blue-950/30 px-4 py-3 text-white outline-none transition-all placeholder:text-slate-600 focus:border-cyan-400/60 focus:bg-blue-900/30 focus:ring-2 focus:ring-cyan-400/10"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="admin-password"
              className="text-sm font-medium text-slate-300"
            >
              Password
            </label>

            <div className="relative mt-2">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                placeholder="Enter admin password"
                className="w-full rounded-xl border border-blue-300/15 bg-blue-950/30 px-4 py-3 pr-12 text-white outline-none transition-all placeholder:text-slate-600 focus:border-cyan-400/60 focus:bg-blue-900/30 focus:ring-2 focus:ring-cyan-400/10"
              />

              {/* Eye Button */}
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-cyan-400/10 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
              >
                {showPassword ? (
                  /* Eye Off */
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                    <path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c5 0 8.5 4 9.5 6a17 17 0 0 1-3.1 3.8" />
                    <path d="M6.6 6.6C4.4 8 3 10 2.5 10.5c1 2 4.5 6 9.5 6 1 0 2-.2 2.9-.5" />
                  </svg>
                ) : (
                  /* Eye */
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-5 py-3 font-semibold text-white shadow-[0_0_30px_rgba(37,99,235,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <span className="relative">
              {loading ? "Signing in..." : "Login"}
            </span>
          </button>
        </form>

        {/* Footer */}
        <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-600">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/60" />
          <span>Secure admin access</span>
        </div>
      </div>
    </main>
  );
}