"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

type PostComment = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

type Post = {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  expiresAt: string | null;
  likesCount: number;
  commentsCount: number;
  likedByMe: boolean;
  comments: PostComment[];
};

type DurationOption =
  | "1-hour"
  | "6-hours"
  | "12-hours"
  | "1-day"
  | "3-days"
  | "7-days"
  | "30-days"
  | "never";

type IconProps = {
  size?: number;
  fill?: string;
};

function HeartIcon({ size = 20, fill = "none" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CommentIcon({ size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 8.7 3.9a8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon({ size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SendIcon({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m22 2-7 20-4-9-9-4 20-7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 2 11 13"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrashIcon({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 21a8 8 0 0 0-16 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle
        cx="12"
        cy="7"
        r="4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function ClockIcon({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon({ size = 18 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M16 3v4M8 3v4M3 10h18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon({ size = 20 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m6 6 12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function remainingTime(expiresAt: string | null) {
  if (!expiresAt) return "No expiration";

  const difference = new Date(expiresAt).getTime() - Date.now();

  if (difference <= 0) return "Expired";

  const minutes = Math.floor(difference / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d ${hours % 24}h remaining`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m remaining`;
  }

  return `${minutes}m remaining`;
}

export default function MyPostPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [expiredCount, setExpiredCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [showCreatePost, setShowCreatePost] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [duration, setDuration] =
    useState<DurationOption>("7-days");

  const [commentNames, setCommentNames] = useState<
    Record<string, string>
  >({});
  const [commentTexts, setCommentTexts] = useState<
    Record<string, string>
  >({});
  const [showComments, setShowComments] = useState<
    Record<string, boolean>
  >({});

  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const [, setTimerTick] = useState(0);

  const loadPosts = useCallback(async () => {
    try {
      setError("");

      const response = await fetch("/api/posts", {
        cache: "no-store",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to load posts.");
      }

      setPosts(data.posts || []);
      setAuthenticated(Boolean(data.authenticated));
      setExpiredCount(data.expiredCount || 0);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load posts."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimerTick((value) => value + 1);
    }, 30000);

    return () => window.clearInterval(timer);
  }, []);

  const createPost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    try {
      setActionLoading(true);
      setError("");
      setNotice("");

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          imageUrl: imageUrl.trim(),
          duration,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to create post.");
      }

      setTitle("");
      setContent("");
      setImageUrl("");
      setDuration("7-days");
      setShowCreatePost(false);
      setNotice("Post published successfully.");

      await loadPosts();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to create post."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const deletePost = async (postId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) return;

    try {
      setActionLoading(true);
      setError("");
      setNotice("");

      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to delete post.");
      }

      setNotice("Post deleted successfully.");
      await loadPosts();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete post."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const toggleLike = async (postId: string) => {
    try {
      const response = await fetch(
        `/api/posts/${postId}/like`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to update like.");
      }

      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                likesCount:
                  typeof data.likesCount === "number"
                    ? data.likesCount
                    : post.likesCount,
                likedByMe:
                  typeof data.likedByMe === "boolean"
                    ? data.likedByMe
                    : !post.likedByMe,
              }
            : post
        )
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update like."
      );
    }
  };

  const addComment = async (postId: string) => {
    const name = commentNames[postId]?.trim();
    const message = commentTexts[postId]?.trim();

    if (!name || !message) {
      setError("Name and comment are required.");
      return;
    }

    try {
      setActionLoading(true);
      setError("");

      const response = await fetch(
        `/api/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name,
            message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to add comment."
        );
      }

      setCommentNames((current) => ({
        ...current,
        [postId]: "",
      }));

      setCommentTexts((current) => ({
        ...current,
        [postId]: "",
      }));

      await loadPosts();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to add comment."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const deleteComment = async (
    postId: string,
    commentId: string
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmed) return;

    try {
      setActionLoading(true);
      setError("");

      const response = await fetch(
        `/api/posts/${postId}/comments/${commentId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Failed to delete comment."
        );
      }

      await loadPosts();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to delete comment."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const logout = async () => {
    try {
      setActionLoading(true);
      setError("");

      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);

        throw new Error(
          data?.error || "Failed to log out."
        );
      }

      setAuthenticated(false);
      setShowCreatePost(false);
      setNotice("You have been logged out.");

      await loadPosts();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to log out."
      );
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020817] text-white">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="absolute right-[-10%] top-[10%] h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute bottom-[-15%] left-[25%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.7) 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
                Personal Dashboard
              </div>

              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                <span className="bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
                  My Posts
                </span>
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                Create, manage and interact with your posts from one
                premium dashboard.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {authenticated && (
                <button
                  type="button"
                  onClick={() => {
                    setShowCreatePost(true);
                    setError("");
                    setNotice("");
                  }}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all duration-300 hover:-translate-y-1 hover:from-blue-500 hover:to-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.28)]"
                >
                  <PlusIcon size={19} />
                  Create Post
                </button>
              )}

              {authenticated && (
                <button
                  type="button"
                  onClick={logout}
                  disabled={actionLoading}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/25 bg-blue-500/10 px-5 py-3 text-sm font-bold text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-gradient-to-r hover:from-blue-600/80 hover:to-cyan-500/80 hover:text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.18)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {actionLoading ? "Logging out..." : "Logout"}
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Notifications */}
        {(error || notice) && (
          <div className="mb-6 space-y-3">
            {error && (
              <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-4 text-sm text-red-200 shadow-lg">
                {error}
              </div>
            )}

            {notice && (
              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-4 text-sm text-cyan-100 shadow-lg">
                {notice}
              </div>
            )}
          </div>
        )}

        {/* Stats */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-cyan-400/[0.045]">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Total Posts
              </span>

              <div className="rounded-xl border border-cyan-400/15 bg-cyan-400/10 p-2 text-cyan-300">
                <CalendarIcon size={18} />
              </div>
            </div>

            <p className="text-3xl font-black text-white">
              {posts.length}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Active posts
            </p>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-cyan-400/[0.045]">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Total Likes
              </span>

              <div className="rounded-xl border border-cyan-400/15 bg-cyan-400/10 p-2 text-cyan-300">
                <HeartIcon size={18} />
              </div>
            </div>

            <p className="text-3xl font-black text-white">
              {posts.reduce(
                (total, post) => total + post.likesCount,
                0
              )}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Across all posts
            </p>
          </div>

          <div className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-cyan-400/[0.045]">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Comments
              </span>

              <div className="rounded-xl border border-cyan-400/15 bg-cyan-400/10 p-2 text-cyan-300">
                <CommentIcon size={18} />
              </div>
            </div>

            <p className="text-3xl font-black text-white">
              {posts.reduce(
                (total, post) => total + post.commentsCount,
                0
              )}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Community interactions
            </p>
          </div>
        </section>

        {/* Expired Notice */}
        {expiredCount > 0 && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-amber-400/15 bg-amber-400/5 px-5 py-4 text-sm text-amber-200">
            <ClockIcon size={18} />
            <span>
              {expiredCount} expired{" "}
              {expiredCount === 1 ? "post" : "posts"} are not shown.
            </span>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-16 text-center shadow-2xl backdrop-blur-xl">
            <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-2 border-cyan-400/20 border-t-cyan-400" />

            <p className="text-sm font-semibold text-slate-300">
              Loading posts...
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Please wait while your dashboard is being prepared.
            </p>
          </div>
        ) : posts.length === 0 ? (
          /* Empty State */
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] px-6 py-20 text-center shadow-2xl backdrop-blur-xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
              <PlusIcon size={30} />
            </div>

            <h2 className="text-2xl font-black text-white">
              No posts yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-400">
              Start sharing your thoughts, updates and ideas with
              your audience.
            </p>

            {authenticated && (
              <button
                type="button"
                onClick={() => setShowCreatePost(true)}
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]"
              >
                <PlusIcon size={18} />
                Create Your First Post
              </button>
            )}
          </div>
        ) : (
          /* Posts */
          <section className="space-y-6">
            {posts.map((post) => {
              const commentsVisible = Boolean(
                showComments[post.id]
              );

              return (
                <article
                  key={post.id}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/20 hover:bg-white/[0.045]"
                >
                  {/* Post Header */}
                  <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h2 className="break-words text-xl font-black tracking-tight text-white sm:text-2xl">
                          {post.title}
                        </h2>

                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                          <span className="inline-flex items-center gap-1.5">
                            <CalendarIcon size={14} />
                            {formatDate(post.createdAt)}
                          </span>

                          <span className="inline-flex items-center gap-1.5 text-cyan-400/80">
                            <ClockIcon size={14} />
                            {remainingTime(post.expiresAt)}
                          </span>
                        </div>
                      </div>

                      {authenticated && (
                        <button
                          type="button"
                          onClick={() => deletePost(post.id)}
                          disabled={actionLoading}
                          aria-label="Delete post"
                          className="shrink-0 rounded-xl border border-red-400/10 bg-red-500/5 p-2.5 text-red-300 transition-all hover:border-red-400/25 hover:bg-red-500/10 hover:text-red-200 disabled:opacity-50"
                        >
                          <TrashIcon size={17} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-5 sm:p-6">
                    <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-300 sm:text-base">
                      {post.content}
                    </p>

                    {post.imageUrl && (
                      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="max-h-[550px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                        />
                      </div>
                    )}

                    {/* Engagement */}
                    <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
                      <button
                        type="button"
                        onClick={() => toggleLike(post.id)}
                        className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
                          post.likedByMe
                            ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.08)]"
                            : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-cyan-300"
                        }`}
                      >
                        <HeartIcon
                          size={18}
                          fill={
                            post.likedByMe
                              ? "currentColor"
                              : "none"
                          }
                        />
                        <span>{post.likesCount}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setShowComments((current) => ({
                            ...current,
                            [post.id]: !current[post.id],
                          }))
                        }
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-2.5 text-sm font-semibold text-slate-300 transition-all hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-cyan-300"
                      >
                        <CommentIcon size={18} />
                        <span>{post.commentsCount}</span>
                        <span className="hidden sm:inline">
                          Comments
                        </span>
                      </button>
                    </div>

                    {/* Comments */}
                    {commentsVisible && (
                      <div className="mt-6 rounded-2xl border border-white/10 bg-black/10 p-4 sm:p-5">
                        <div className="mb-5 flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-bold text-white">
                              Comments
                            </h3>

                            <p className="mt-1 text-xs text-slate-500">
                              Join the conversation.
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setShowComments((current) => ({
                                ...current,
                                [post.id]: false,
                              }))
                            }
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
                            aria-label="Close comments"
                          >
                            <CloseIcon size={17} />
                          </button>
                        </div>

                        {post.comments.length > 0 ? (
                          <div className="space-y-3">
                            {post.comments.map((comment) => (
                              <div
                                key={comment.id}
                                className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex min-w-0 items-center gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/30 to-cyan-500/20 text-cyan-300">
                                      <UserIcon size={17} />
                                    </div>

                                    <div className="min-w-0">
                                      <p className="truncate text-sm font-bold text-white">
                                        {comment.name}
                                      </p>

                                      <p className="mt-0.5 text-[11px] text-slate-500">
                                        {formatDate(
                                          comment.createdAt
                                        )}
                                      </p>
                                    </div>
                                  </div>

                                  {authenticated && (
                                    <button
                                      type="button"
                                      onClick={() =>
                                        deleteComment(
                                          post.id,
                                          comment.id
                                        )
                                      }
                                      disabled={actionLoading}
                                      className="rounded-lg p-2 text-red-300/70 transition hover:bg-red-500/10 hover:text-red-200 disabled:opacity-50"
                                      aria-label="Delete comment"
                                    >
                                      <TrashIcon size={15} />
                                    </button>
                                  )}
                                </div>

                                <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6 text-slate-300">
                                  {comment.message}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="rounded-2xl border border-dashed border-white/10 px-5 py-8 text-center">
                            <CommentIcon
                              size={24}
                            />

                            <p className="mt-3 text-sm font-semibold text-slate-300">
                              No comments yet
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              Be the first to leave a comment.
                            </p>
                          </div>
                        )}

                        {/* Comment Form */}
                        <div className="mt-5 border-t border-white/10 pt-5">
                          <div className="grid gap-3 sm:grid-cols-[180px_1fr_auto]">
                            <input
                              type="text"
                              value={
                                commentNames[post.id] || ""
                              }
                              onChange={(event) =>
                                setCommentNames((current) => ({
                                  ...current,
                                  [post.id]:
                                    event.target.value,
                                }))
                              }
                              placeholder="Your name"
                              className="h-11 rounded-xl border border-white/10 bg-white/[0.035] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40 focus:bg-cyan-400/[0.03] focus:ring-2 focus:ring-cyan-400/10"
                            />

                            <input
                              type="text"
                              value={
                                commentTexts[post.id] || ""
                              }
                              onChange={(event) =>
                                setCommentTexts((current) => ({
                                  ...current,
                                  [post.id]:
                                    event.target.value,
                                }))
                              }
                              onKeyDown={(event) => {
                                if (
                                  event.key === "Enter" &&
                                  !event.shiftKey
                                ) {
                                  event.preventDefault();
                                  addComment(post.id);
                                }
                              }}
                              placeholder="Write a comment..."
                              className="h-11 rounded-xl border border-white/10 bg-white/[0.035] px-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40 focus:bg-cyan-400/[0.03] focus:ring-2 focus:ring-cyan-400/10"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                addComment(post.id)
                              }
                              disabled={actionLoading}
                              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 text-sm font-bold text-white transition-all hover:from-blue-500 hover:to-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <SendIcon size={16} />
                              <span className="hidden sm:inline">
                                Send
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </section>
        )}

        {/* Footer */}
        <footer className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Tamim Hasan. All rights
            reserved.
          </p>
        </footer>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#00040c]/80 p-4 backdrop-blur-md">
          <div
            className="absolute inset-0"
            onClick={() => {
              if (!actionLoading) {
                setShowCreatePost(false);
              }
            }}
          />

          <div className="relative my-8 w-full max-w-2xl overflow-hidden rounded-3xl border border-cyan-400/15 bg-[#061329]/95 shadow-[0_0_80px_rgba(6,182,212,0.12)] backdrop-blur-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 p-6 sm:p-7">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">
                  <PlusIcon size={13} />
                  New Post
                </div>

                <h2 className="text-2xl font-black text-white">
                  Create a new post
                </h2>

                <p className="mt-1.5 text-sm text-slate-500">
                  Share something valuable with your audience.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!actionLoading) {
                    setShowCreatePost(false);
                  }
                }}
                className="rounded-xl border border-white/10 bg-white/[0.035] p-2.5 text-slate-400 transition hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-white"
              >
                <CloseIcon size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form
              onSubmit={createPost}
              className="space-y-5 p-6 sm:p-7"
            >
              <div>
                <label
                  htmlFor="post-title"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
                >
                  Title
                </label>

                <input
                  id="post-title"
                  type="text"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="Enter your post title"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40 focus:bg-cyan-400/[0.03] focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>

              <div>
                <label
                  htmlFor="post-content"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
                >
                  Content
                </label>

                <textarea
                  id="post-content"
                  value={content}
                  onChange={(event) =>
                    setContent(event.target.value)
                  }
                  placeholder="Write your post content..."
                  rows={7}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40 focus:bg-cyan-400/[0.03] focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>

              <div>
                <label
                  htmlFor="post-image"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
                >
                  Image URL
                </label>

                <input
                  id="post-image"
                  type="url"
                  value={imageUrl}
                  onChange={(event) =>
                    setImageUrl(event.target.value)
                  }
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40 focus:bg-cyan-400/[0.03] focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>

              <div>
                <label
                  htmlFor="post-duration"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
                >
                  Visibility Duration
                </label>

                <select
                  id="post-duration"
                  value={duration}
                  onChange={(event) =>
                    setDuration(
                      event.target.value as DurationOption
                    )
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#08162d] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
                >
                  <option value="1-hour">1 Hour</option>
                  <option value="6-hours">6 Hours</option>
                  <option value="12-hours">12 Hours</option>
                  <option value="1-day">1 Day</option>
                  <option value="3-days">3 Days</option>
                  <option value="7-days">7 Days</option>
                  <option value="30-days">30 Days</option>
                  <option value="never">Never Expires</option>
                </select>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    if (!actionLoading) {
                      setShowCreatePost(false);
                    }
                  }}
                  className="rounded-xl border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-bold text-slate-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-[0_0_25px_rgba(6,182,212,0.12)] transition-all hover:from-blue-500 hover:to-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.2)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <PlusIcon size={18} />
                  {actionLoading
                    ? "Publishing..."
                    : "Publish Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}