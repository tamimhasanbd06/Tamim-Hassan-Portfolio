
"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import {
  ExternalLink,
  FileText,
  Home,
  LayoutDashboard,
  MessageCircle,
  RefreshCw,
  Reply,
  Send,
  Sparkles,
  X,
} from "lucide-react";

import EmptyState from "@/components/common/EmptyState";
import AdminAvatar from "@/components/common/AdminAvatar";
import { useLiveUpdates } from "@/lib/use-live-updates";

type Post = {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  linkUrl: string | null;
  createdAt: string;
  comments: Array<{ id: string; name: string; message: string; role?: "admin" | "visitor"; parentCommentId: string | null; replyToPost: boolean; createdAt: string }>;
};

export default function PublicPostsPage() {
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
  const [commentName, setCommentName] = useState("");
  const [commentDraft, setCommentDraft] = useState("");
  const [commentBusy, setCommentBusy] = useState(false);
  const [commentNotice, setCommentNotice] = useState("");
  const [replyTarget, setReplyTarget] = useState<{ postId: string; commentId: string | null } | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/posts", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not load posts.");
      }

      setPosts(
        Array.isArray(data.posts) ? data.posts : [],
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
  useLiveUpdates("posts", () => { void load(); });

  async function submitComment(event: FormEvent<HTMLFormElement>, post: Post) {
    event.preventDefault();
    if (!commentName.trim() || !commentDraft.trim()) { setCommentNotice("Enter your name and a comment."); return; }
    setCommentBusy(true); setCommentNotice("");
    try {
      const response = await fetch(`/api/posts/${post.id}/comments`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: commentName, message: commentDraft, parentCommentId: replyTarget?.postId === post.id ? replyTarget.commentId : null, replyToPost: replyTarget?.postId === post.id && replyTarget.commentId === null }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not send your reply.");
      setCommentDraft(""); setReplyTarget(null); setCommentNotice("Your comment was added.");
      await load();
    } catch (cause) { setCommentNotice(cause instanceof Error ? cause.message : "Could not send your reply."); }
    finally { setCommentBusy(false); }
  }

  function jumpToComment(id: string) {
    document.getElementById(`post-comment-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <main className="portfolio-unified portfolio-posts relative isolate min-h-screen min-h-dvh w-full text-white">
      {/* =========================================================
          CV-STYLE BACKGROUND DECORATION
      ========================================================== */}


      {/* =========================================================
          PAGE CONTENT
      ========================================================== */}

      <div className="relative z-10 mx-auto w-full max-w-2xl px-4 py-7 sm:px-6 sm:py-10">
        {/* =======================================================
            PAGE NAVIGATION
        ======================================================== */}

        <nav aria-label="Page navigation" className="mb-6">
          <div className="flex flex-wrap items-center gap-2.5">
            {isAdminView ? (
              <>
                <Link
                  href="/home"
                  className="ui-button-secondary group inline-flex items-center gap-2"
                >
                  <Home
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                  />

                  <span>Back to Home</span>
                </Link>

                <Link
                  href="/message?from=admin"
                  className="ui-button-secondary group inline-flex items-center gap-2"
                >
                  <MessageCircle
                    size={16}
                    className="transition-transform duration-300 group-hover:scale-105"
                  />

                  <span>Message Me</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/home"
                  className="ui-button-secondary group inline-flex items-center gap-2"
                >
                  <Home
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                  />

                  <span>Back to Home</span>
                </Link>

                <Link
                  href="/message"
                  className="ui-button-primary group inline-flex items-center gap-2 shadow-[0_8px_30px_rgba(6,182,212,0.18)]"
                >
                  <MessageCircle
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                  />

                  <span>Message Me</span>
                </Link>

                <Link
                  href="/dashboard/overview"
                  className="ui-button-secondary group inline-flex items-center gap-2"
                >
                  <LayoutDashboard
                    size={15}
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                  />

                  <span>Go to Dashboard</span>
                </Link>
              </>
            )}
          </div>
        </nav>

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

              {/* Gradient title matching the primary button */}

              <h1 className="mt-2 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 bg-clip-text text-[29px] font-black tracking-tight text-transparent sm:text-[34px]">
                Latest updates
              </h1>

              <p className="mt-1.5 max-w-xl text-xs leading-5 text-slate-500 sm:text-sm">
                Explore the latest updates, announcements,
                projects, and thoughts from my portfolio.
              </p>
            </div>
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
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

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
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(0,174,255,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(0,174,255,0.22)]"
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
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(0,174,255,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(0,174,255,0.22)]"
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

                {/* Post content */}

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

                  {/* Post title */}

                  {post.title ? (
                    <h2 className="mt-3 text-xl font-black tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-50 sm:text-[22px]">
                      {post.title}
                    </h2>
                  ) : null}

                  {/* Post body */}

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

                {/* Post image */}

                {post.imageUrl ? (
                  <div className="relative overflow-hidden border-t border-white/[0.06] bg-black">
                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-70" />

                    <button type="button" onClick={() => setLightbox(post.imageUrl)} className="block w-full cursor-zoom-in" aria-label="Open full-size post image">
                      <img src={post.imageUrl} alt={post.title ? `${post.title} attachment` : "Post attachment"} loading="lazy" className="message-natural-image mx-auto max-h-[34rem]" />
                    </button>
                  </div>
                ) : null}

                <section className="border-t border-white/[0.06] px-5 py-4 sm:px-6" aria-label={`Comments on ${post.title || "post"}`}>
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-cyan-100">Comments <span className="text-xs font-normal text-slate-500">({post.comments?.length ?? 0})</span></h3>
                    <button type="button" onClick={() => { setReplyTarget({ postId: post.id, commentId: null }); setCommentNotice(""); }} className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 hover:text-white"><Reply size={14} /> Reply to post</button>
                  </div>
                  <div className="space-y-3" aria-live="polite">
                    {(post.comments ?? []).map((comment) => {
                      const parent = comment.parentCommentId ? post.comments?.find((item) => item.id === comment.parentCommentId) : null;
                      return <article id={`post-comment-${comment.id}`} key={comment.id} className={`rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 ${parent ? "ml-4 border-l-2 border-l-cyan-400/40 sm:ml-8" : ""}`}>
                        <div className="flex items-center justify-between gap-2"><div className="flex items-center gap-2">{comment.role === "admin" && <AdminAvatar size={22} alt="Admin" />}<strong className="text-xs font-semibold text-slate-200">{comment.name}{comment.role === "admin" && <span className="ml-2 text-[10px] uppercase tracking-wider text-cyan-300">Admin</span>}</strong></div><time className="text-[10px] text-slate-500" dateTime={comment.createdAt}>{new Date(comment.createdAt).toLocaleString()}</time></div>
                        {parent || comment.replyToPost ? <button type="button" onClick={() => parent && jumpToComment(parent.id)} className="my-2 block max-w-full border-l-2 border-cyan-400/50 pl-2 text-left text-xs text-slate-400 hover:text-cyan-100"><span className="block font-semibold text-cyan-200">Replying to {parent?.name ?? "post"}</span><span className="line-clamp-2">{parent?.message ?? post.title ?? post.content}</span></button> : null}
                        <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-slate-300">{comment.message}</p>
                        <button type="button" onClick={() => { setReplyTarget({ postId: post.id, commentId: comment.id }); setCommentNotice(""); }} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 hover:text-white"><Reply size={13} /> Reply</button>
                      </article>;
                    })}
                    {!post.comments?.length ? <p className="text-xs text-slate-500">No comments yet. Start the conversation.</p> : null}
                  </div>
                  {replyTarget?.postId === post.id ? <div className="mt-3 flex items-start justify-between gap-3 rounded-lg border-l-2 border-cyan-400 bg-white/[0.035] px-3 py-2"><p className="min-w-0 text-xs text-slate-300"><span className="block font-semibold text-cyan-200">Replying to {replyTarget.commentId ? post.comments?.find((item) => item.id === replyTarget.commentId)?.name ?? "comment" : "post"}</span>{replyTarget.commentId ? post.comments?.find((item) => item.id === replyTarget.commentId)?.message : post.title || post.content}</p><button type="button" onClick={() => setReplyTarget(null)} aria-label="Cancel reply" className="text-slate-400 hover:text-white"><X size={15} /></button></div> : null}
                  <form onSubmit={(event) => void submitComment(event, post)} className="mt-3 grid gap-2 sm:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)_auto]">
                    <label className="sr-only" htmlFor={`post-comment-name-${post.id}`}>Your name</label><input id={`post-comment-name-${post.id}`} value={commentName} onChange={(event) => setCommentName(event.target.value)} maxLength={100} placeholder="Your name" required className="min-w-0 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-slate-500" />
                    <label className="sr-only" htmlFor={`post-comment-body-${post.id}`}>Write a comment</label><input id={`post-comment-body-${post.id}`} value={commentDraft} onChange={(event) => setCommentDraft(event.target.value)} maxLength={2000} placeholder="Write a comment…" required className="min-w-0 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-slate-500" />
                    <button type="submit" disabled={commentBusy} className="ui-button-primary min-h-10 px-3"><Send size={14} />{commentBusy ? "Sending…" : "Send"}</button>
                  </form>
                  {commentNotice ? <p role="status" className="mt-2 text-xs text-cyan-200">{commentNotice}</p> : null}
                </section>
              </article>
            ))}
          </div>
        )}

        {/* =======================================================
            BOTTOM DECORATION
        ======================================================== */}

        {!loading && !error && posts.length > 0 ? (
          <div className="mt-9 flex items-center justify-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-700">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400/20" />

            <span>Latest Updates</span>

            <span className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400/20" />
          </div>
        ) : null}
      </div>
      {lightbox ? <div role="dialog" aria-modal="true" aria-label="Full-size post image" className="fixed inset-0 z-[500] grid place-items-center bg-black/90 p-4" onClick={() => setLightbox(null)} onKeyDown={(event) => { if (event.key === "Escape") setLightbox(null); }}><button type="button" autoFocus onClick={() => setLightbox(null)} aria-label="Close image" className="absolute right-4 top-4 rounded-full bg-black/60 p-3 text-white"><X /></button><img src={lightbox} alt="Full-size post attachment" className="max-h-[90vh] max-w-full object-contain" /></div> : null}
    </main>
  );
}
