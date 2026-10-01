"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import {
  ArrowLeft,
  ExternalLink,
  FileText,
  Home,
  LayoutDashboard,
  MessageCircle,
  RefreshCw,
  Sparkles,
} from "lucide-react";

import EmptyState from "@/components/common/EmptyState";

type Post = {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  linkUrl: string | null;
  createdAt: string;
};

export default function PublicPostsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * Admin navigation context.
   *
   * Admin Dashboard:
   * /my-post?from=admin
   *
   * Public:
   * /my-post
   */
  const isAdminView = searchParams.get("from") === "admin";

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/posts", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not load posts.",
        );
      }

      setPosts(
        Array.isArray(data.posts)
          ? data.posts
          : [],
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not load posts.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  /**
   * Admin → Dashboard
   *
   * replace() prevents the user from being returned
   * to /my-post?from=admin through the browser history.
   */
  function backToDashboard() {
    router.replace("/dashboard/overview");
  }

  /**
   * Message navigation.
   *
   * If the admin is viewing My Posts from the dashboard,
   * keep the admin context when opening Message Me.
   */
  const messageHref = isAdminView
    ? "/message?from=admin"
    : "/message";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#010409] text-white">
      {/* =========================================================
          BACKGROUND DECORATION
      ========================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        {/* Cyan glow */}
        <div className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-cyan-400/[0.055] blur-[120px]" />

        {/* Blue glow */}
        <div className="absolute -right-48 top-[25%] h-[500px] w-[500px] rounded-full bg-blue-600/[0.055] blur-[130px]" />

        {/* Indigo glow */}
        <div className="absolute bottom-[-180px] left-[45%] h-[450px] w-[450px] rounded-full bg-indigo-500/[0.045] blur-[130px]" />

        {/* Top radial atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,210,255,0.045),transparent_38%)]" />

        {/* Very subtle grid */}
        <div className="absolute inset-0 opacity-[0.018] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:70px_70px]" />
      </div>

      {/* =========================================================
          PAGE CONTENT
      ========================================================== */}

      <div className="relative z-10 mx-auto w-full max-w-2xl px-4 py-7 sm:px-6 sm:py-10">
        {/* =======================================================
            PAGE NAVIGATION
        ======================================================== */}

        <div className="mb-6 flex flex-wrap items-center gap-2.5">
          {isAdminView ? (
            /* ===================================================
               ADMIN → DASHBOARD
            ==================================================== */
            <button
              type="button"
              onClick={backToDashboard}
              className="
                ui-button-primary
                group
                inline-flex
                items-center
                gap-2
                shadow-[0_8px_30px_rgba(6,182,212,0.18)]
              "
            >
              <ArrowLeft
                size={16}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />

              <span>Back to Dashboard</span>

              <LayoutDashboard
                size={15}
                className="opacity-75"
              />
            </button>
          ) : (
            /* ===================================================
               PUBLIC → PORTFOLIO
            ==================================================== */
            <Link
              href="/home"
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-xl
                border
                border-cyan-400/[0.12]
                bg-[#020810]/80
                px-3.5
                py-2
                text-sm
                font-medium
                text-slate-400
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-cyan-400/30
                hover:bg-cyan-400/[0.045]
                hover:text-cyan-300
              "
            >
              <ArrowLeft
                size={16}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />

              Back to portfolio
            </Link>
          )}
        </div>

        {/* =======================================================
            ADMIN CONTEXT
        ======================================================== */}

        {isAdminView ? (
          <div className="mb-4 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-400/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />

            Admin workspace
          </div>
        ) : null}

        {/* =======================================================
            PAGE HEADER
        ======================================================== */}

        <header className="mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            {/* Title area */}

            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]" />

                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                  My Posts
                </p>

                <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/15 bg-cyan-400/[0.045] px-2 py-0.5 text-[9px] font-semibold text-cyan-200">
                  <Sparkles size={9} />
                  UPDATES
                </span>
              </div>

              <h1 className="mt-2 text-[29px] font-black tracking-tight text-white sm:text-[34px]">
                Latest updates
              </h1>

              <p className="mt-1.5 max-w-xl text-xs leading-5 text-slate-500 sm:text-sm">
                Explore the latest updates, announcements,
                projects, and thoughts from my portfolio.
              </p>
            </div>

            {/* Message button */}

            <Link
              href={messageHref}
              className="
                group
                inline-flex
                shrink-0
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-cyan-400/[0.16]
                bg-[#030a12]
                px-4
                py-2.5
                text-xs
                font-bold
                text-cyan-200
                transition-all
                duration-300
                hover:border-cyan-400/35
                hover:bg-cyan-400/[0.055]
                hover:text-cyan-100
                hover:shadow-[0_0_25px_rgba(0,210,255,0.08)]
              "
            >
              <MessageCircle
                size={16}
                className="transition-transform duration-300 group-hover:scale-105"
              />

              Message Me
            </Link>
          </div>

          {/* Header divider */}

          <div className="mt-5 h-px bg-gradient-to-r from-cyan-400/25 via-blue-500/10 to-transparent" />
        </header>

        {/* =======================================================
            LOADING STATE
        ======================================================== */}

        {loading ? (
          <div
            className="relative flex min-h-[250px] flex-col items-center justify-center overflow-hidden rounded-[22px] border border-cyan-400/[0.10] bg-[#02070e]/85 p-8 text-center shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
            aria-live="polite"
          >
            {/* Top accent */}

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

            {/* Glow */}

            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/[0.035] blur-3xl" />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.05]">
                <RefreshCw
                  className="animate-spin text-cyan-300"
                  size={24}
                />
              </div>
            </div>

            <p className="relative mt-4 text-sm font-semibold text-slate-400">
              Loading posts...
            </p>

            <p className="relative mt-1 text-[11px] text-slate-600">
              Please wait while the latest updates are loaded.
            </p>
          </div>
        ) : error ? (
          /* =====================================================
             ERROR STATE
          ====================================================== */

          <div className="relative overflow-hidden rounded-[22px] border border-cyan-400/[0.10] bg-[#02070e]/85 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

            <EmptyState
              icon={<RefreshCw size={24} />}
              title="Unable to load posts"
              description="The posts service did not respond successfully. You can retry without leaving this page."
              action={
                <button
                  type="button"
                  onClick={() => void load()}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-cyan-400
                    via-sky-400
                    to-blue-600
                    px-4
                    py-2.5
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_10px_30px_rgba(0,174,255,0.14)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-[0_14px_35px_rgba(0,174,255,0.22)]
                  "
                >
                  <RefreshCw size={17} />
                  Try Again
                </button>
              }
            />
          </div>
        ) : posts.length === 0 ? (
          /* =====================================================
             EMPTY STATE
          ====================================================== */

          <div className="relative overflow-hidden rounded-[22px] border border-cyan-400/[0.10] bg-[#02070e]/85 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

            <EmptyState
              icon={<FileText size={25} />}
              title="No Posts Available"
              description="There are currently no posts available. New posts will appear here when they are published."
              action={
                <Link
                  href="/home"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-cyan-400
                    via-sky-400
                    to-blue-600
                    px-4
                    py-2.5
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_10px_30px_rgba(0,174,255,0.14)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-[0_14px_35px_rgba(0,174,255,0.22)]
                  "
                >
                  <Home size={17} />
                  Go Home
                </Link>
              }
            />
          </div>
        ) : (
          /* =====================================================
             POSTS
          ====================================================== */

          <div className="space-y-4">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group relative overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#02070e]/85 shadow-[0_18px_60px_rgba(0,0,0,0.30)] backdrop-blur-2xl transition-all duration-300 hover:border-cyan-400/[0.16] hover:bg-[#030a12]"
              >
                {/* Top gradient accent */}

                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Left cyan accent */}

                <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-cyan-400 via-blue-500/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Content */}

                <div className="p-5 sm:p-6">
                  {/* Post metadata */}

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/[0.11] bg-cyan-400/[0.035] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-cyan-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

                      Update
                    </span>

                    <time className="text-[10px] font-medium text-slate-600">
                      {new Date(
                        post.createdAt,
                      ).toLocaleString()}
                    </time>
                  </div>

                  {/* Title */}

                  {post.title ? (
                    <h2 className="mt-3 text-xl font-black tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-50 sm:text-[22px]">
                      {post.title}
                    </h2>
                  ) : null}

                  {/* Content */}

                  {post.content ? (
                    <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-slate-300">
                      {post.content}
                    </p>
                  ) : null}

                  {/* External link */}

                  {post.linkUrl ? (
                    <a
                      href={post.linkUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group/link mt-4 inline-flex items-center gap-2 rounded-lg border border-blue-400/[0.10] bg-blue-400/[0.025] px-3 py-2 text-xs font-bold text-blue-300 transition-all duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/[0.045] hover:text-cyan-200"
                    >
                      <ExternalLink
                        size={14}
                        className="transition-transform duration-300 group-hover/link:translate-x-0.5"
                      />

                      Open link
                    </a>
                  ) : null}
                </div>

                {/* Image */}

                {post.imageUrl ? (
                  <div className="relative overflow-hidden border-t border-white/[0.06] bg-black">
                    {/* Image glow */}

                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-70" />

                    <img
                      src={post.imageUrl}
                      alt={
                        post.title
                          ? `${post.title} attachment`
                          : "Post attachment"
                      }
                      loading="lazy"
                      className="max-h-[34rem] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                    />
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        )}

        {/* =======================================================
            BOTTOM DECORATION
        ======================================================== */}

        {!loading &&
        !error &&
        posts.length > 0 ? (
          <div className="mt-9 flex items-center justify-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-700">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400/20" />

            <span>Latest Updates</span>

            <span className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400/20" />
          </div>
        ) : null}
      </div>
    </main>
  );
}