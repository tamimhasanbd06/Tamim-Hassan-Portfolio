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

  useEffect(() => {
    let active = true;

    fetch("/api/auth/session", { cache: "no-store", credentials: "include" })
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
      setError(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 text-white">
        <div className="rounded-2xl border border-cyan-400/20 bg-slate-950/60 px-6 py-4 text-sm text-cyan-300 backdrop-blur-xl">
          Checking session...
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20 text-white sm:px-6">
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-cyan-400/10 blur-[140px]" />

      <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/10 bg-slate-950/65 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="4" y="10" width="16" height="11" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
          </div>

          <p className="text-xs font-semibold uppercase tracking-[3px] text-cyan-300">Private Access</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight">Admin Login</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            This page is only for managing My Posts. Use the credentials configured in the server environment.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="admin-email" className="text-sm font-medium text-slate-300">Email</label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="Enter admin email"
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-500/60"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="text-sm font-medium text-slate-300">Password</label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              placeholder="Enter admin password"
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-500/60"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}
