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

type DurationOption = "1-hour" | "6-hours" | "12-hours" | "1-day" | "3-days" | "7-days" | "30-days" | "never";
type IconProps = { size?: number; fill?: string };

const HeartIcon = ({ size = 20, fill = "none" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21.2l7.8-7.7 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z" />
  </svg>
);
const CommentIcon = ({ size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
  </svg>
);
const PlusIcon = ({ size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
);
const SendIcon = ({ size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
);
const TrashIcon = ({ size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v5M14 11v5" /></svg>
);
const UserIcon = ({ size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
);
const ClockIcon = ({ size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
const CalendarIcon = ({ size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>
);
const CloseIcon = ({ size = 20 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
);

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-BD", { dateStyle: "medium", timeStyle: "short" }).format(new Date(date));
}

function remainingTime(expiresAt: string | null) {
  if (!expiresAt) return "No expiry";
  const difference = new Date(expiresAt).getTime() - Date.now();
  if (difference <= 0) return "Expired";
  const days = Math.floor(difference / 86_400_000);
  const hours = Math.floor((difference / 3_600_000) % 24);
  const minutes = Math.floor((difference / 60_000) % 60);
  if (days > 0) return `${days}d ${hours}h remaining`;
  if (hours > 0) return `${hours}h ${minutes}m remaining`;
  return `${Math.max(minutes, 1)}m remaining`;
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
  const [duration, setDuration] = useState<DurationOption>("7-days");
  const [commentNames, setCommentNames] = useState<Record<string, string>>({});
  const [commentTexts, setCommentTexts] = useState<Record<string, string>>({});
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [, setTimerTick] = useState(0);

  const loadPosts = useCallback(async () => {
    try {
      setError("");
      const response = await fetch("/api/posts", { cache: "no-store", credentials: "include" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not load posts.");
      setPosts(data.posts || []);
      setAuthenticated(Boolean(data.authenticated));
      setExpiredCount(Number(data.expiredCount || 0));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not load posts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPosts();
  }, [loadPosts]);

  useEffect(() => {
    const timer = window.setInterval(() => setTimerTick((tick) => tick + 1), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  async function createPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setActionLoading(true);
      setError("");
      setNotice("");
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, content, imageUrl, duration }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not create post.");
      setTitle("");
      setContent("");
      setImageUrl("");
      setDuration("7-days");
      setShowCreatePost(false);
      setNotice("Post published successfully.");
      await loadPosts();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not create post.");
    } finally {
      setActionLoading(false);
    }
  }

  async function deletePost(postId: string) {
    if (!window.confirm("Delete this post permanently?")) return;
    try {
      const response = await fetch(`/api/posts/${postId}`, { method: "DELETE", credentials: "include" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not delete post.");
      setNotice("Post deleted successfully.");
      await loadPosts();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not delete post.");
    }
  }

  async function toggleLike(postId: string) {
    try {
      const response = await fetch(`/api/posts/${postId}/like`, { method: "POST", credentials: "include" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not update like.");
      setPosts((current) => current.map((post) => post.id === postId ? { ...post, likedByMe: Boolean(data.liked), likesCount: Number(data.likesCount) } : post));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not update like.");
    }
  }

  async function addComment(postId: string) {
    const name = commentNames[postId]?.trim();
    const message = commentTexts[postId]?.trim();
    if (!name || !message) {
      setError("Name and comment are required.");
      return;
    }

    try {
      setError("");
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not add comment.");
      setCommentTexts((current) => ({ ...current, [postId]: "" }));
      setShowComments((current) => ({ ...current, [postId]: true }));
      await loadPosts();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not add comment.");
    }
  }

  async function deleteComment(postId: string, commentId: string) {
    if (!window.confirm("Delete this comment?")) return;
    try {
      const response = await fetch(`/api/posts/${postId}/comments/${commentId}`, { method: "DELETE", credentials: "include" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not delete comment.");
      await loadPosts();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not delete comment.");
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setAuthenticated(false);
    setShowCreatePost(false);
    setNotice("Logged out. Public view is active.");
    await loadPosts();
  }

  if (loading) {
    return <main className="flex min-h-screen items-center justify-center px-4"><div className="rounded-2xl border border-cyan-400/20 bg-slate-950/60 px-6 py-4 text-sm text-cyan-300 backdrop-blur-xl">Loading posts...</div></main>;
  }

  return (
    <main className="relative min-h-screen px-4 py-24 sm:px-6">
      <div className="mx-auto w-full max-w-4xl">
        <section className="mb-10">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="mb-2 text-sm font-medium text-cyan-400">Tamim Hasan</p>
              <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">My Posts</h1>
              <p className="mt-3 max-w-xl leading-7 text-slate-400">আমার সাম্প্রতিক পোস্ট, আপডেট এবং development journey এখানে দেখতে পারবেন। পোস্টে Like ও Comment করতে পারবেন।</p>
            </div>

            {authenticated && (
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => setShowCreatePost(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-1">
                  <PlusIcon size={18} /> Create Post
                </button>
                <button type="button" onClick={logout} className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/10">Logout</button>
              </div>
            )}
          </div>

          {error && <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">{error}</div>}
          {notice && <div className="mt-5 rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-300">{notice}</div>}

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"><p className="text-2xl font-bold text-white">{posts.length}</p><p className="text-sm text-slate-400">Active Posts</p></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"><p className="text-2xl font-bold text-white">{posts.reduce((sum, post) => sum + post.likesCount, 0)}</p><p className="text-sm text-slate-400">Total Likes</p></div>
            <div className="col-span-2 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:col-span-1"><p className="text-2xl font-bold text-white">{posts.reduce((sum, post) => sum + post.commentsCount, 0)}</p><p className="text-sm text-slate-400">Comments</p></div>
          </div>
        </section>

        {posts.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-slate-950/50 p-10 text-center backdrop-blur-xl">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400"><CommentIcon size={26} /></div>
            <h2 className="text-xl font-semibold text-white">No active posts</h2>
            <p className="mt-2 text-slate-400">নতুন post publish হলে এখানে দেখা যাবে।</p>
          </div>
        )}

        <section className="space-y-6">
          {posts.map((post) => (
            <article key={post.id} className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/55 shadow-2xl backdrop-blur-xl">
              <div className="p-5 sm:p-6">
                <div className="flex justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400"><UserIcon size={22} /></div>
                    <div>
                      <p className="font-semibold text-white">Tamim Hasan</p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><CalendarIcon size={13} />{formatDate(post.createdAt)}</span>
                        <span className="flex items-center gap-1 text-cyan-400"><ClockIcon size={13} />{remainingTime(post.expiresAt)}</span>
                      </div>
                    </div>
                  </div>

                  {authenticated && (
                    <button type="button" onClick={() => deletePost(post.id)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-red-500/10 hover:text-red-400" aria-label="Delete post"><TrashIcon size={17} /></button>
                  )}
                </div>

                <h2 className="mt-5 text-xl font-bold text-white sm:text-2xl">{post.title}</h2>
                <p className="mt-3 whitespace-pre-wrap text-[15px] leading-7 text-slate-300 sm:text-base">{post.content}</p>
              </div>

              {post.imageUrl && <div className="border-y border-white/10 bg-black/20"><img src={post.imageUrl} alt={post.title} className="max-h-[600px] w-full object-cover" /></div>}

              <div className="flex items-center justify-between px-5 py-3 text-sm text-slate-400">
                <span>{post.likesCount} {post.likesCount === 1 ? "Like" : "Likes"}</span>
                <button type="button" onClick={() => setShowComments((current) => ({ ...current, [post.id]: !current[post.id] }))} className="transition hover:text-white">{post.commentsCount} {post.commentsCount === 1 ? "Comment" : "Comments"}</button>
              </div>

              <div className="grid grid-cols-2 border-y border-white/10">
                <button type="button" onClick={() => toggleLike(post.id)} className={`flex items-center justify-center gap-2 py-3 text-sm font-medium transition ${post.likedByMe ? "bg-pink-500/5 text-pink-400" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
                  <HeartIcon size={19} fill={post.likedByMe ? "currentColor" : "none"} />{post.likedByMe ? "Liked" : "Like"}
                </button>
                <button type="button" onClick={() => setShowComments((current) => ({ ...current, [post.id]: true }))} className="flex items-center justify-center gap-2 border-l border-white/10 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"><CommentIcon size={19} />Comment</button>
              </div>

              {showComments[post.id] && (
                <div className="p-5 sm:p-6">
                  <div className="space-y-4">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-slate-400"><UserIcon size={17} /></div>
                        <div className="flex-1 rounded-2xl bg-white/5 px-4 py-3">
                          <div className="flex justify-between gap-3">
                            <div><p className="text-sm font-semibold text-white">{comment.name}</p><p className="text-[11px] text-slate-500">{formatDate(comment.createdAt)}</p></div>
                            {authenticated && <button type="button" onClick={() => deleteComment(post.id, comment.id)} className="text-slate-600 transition hover:text-red-400" aria-label="Delete comment"><CloseIcon size={15} /></button>}
                          </div>
                          <p className="mt-2 text-sm leading-6 text-slate-300">{comment.message}</p>
                        </div>
                      </div>
                    ))}
                    {post.comments.length === 0 && <p className="py-3 text-center text-sm text-slate-500">No comments yet. Be the first to comment.</p>}
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <input type="text" value={commentNames[post.id] || ""} onChange={(event) => setCommentNames((current) => ({ ...current, [post.id]: event.target.value }))} placeholder="Your name" maxLength={100} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-500/50" />
                    <div className="mt-3 flex gap-2">
                      <textarea value={commentTexts[post.id] || ""} onChange={(event) => setCommentTexts((current) => ({ ...current, [post.id]: event.target.value }))} placeholder="Write a comment..." maxLength={2000} rows={2} className="flex-1 resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-500/50" />
                      <button type="button" onClick={() => addComment(post.id)} className="flex h-11 w-11 self-end items-center justify-center rounded-xl bg-cyan-500 text-slate-950 transition hover:bg-cyan-400" aria-label="Send comment"><SendIcon size={18} /></button>
                    </div>
                  </div>
                </div>
              )}
            </article>
          ))}
        </section>

        {authenticated && expiredCount > 0 && <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center text-sm text-slate-500">{expiredCount} expired {expiredCount === 1 ? "post" : "posts"} hidden from visitors.</div>}
      </div>

      {authenticated && showCreatePost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-[#06101d] shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#06101d]/95 p-5 backdrop-blur-xl">
              <div><h2 className="text-xl font-bold text-white">Create New Post</h2><p className="mt-1 text-xs text-slate-500">Only the authenticated admin can publish posts.</p></div>
              <button type="button" onClick={() => setShowCreatePost(false)} className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white" aria-label="Close"><CloseIcon size={19} /></button>
            </div>

            <form onSubmit={createPost} className="space-y-5 p-5 sm:p-6">
              <div><label className="text-sm font-medium text-slate-300">Post Title</label><input value={title} onChange={(event) => setTitle(event.target.value)} required maxLength={200} placeholder="Enter post title" className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-500/60" /></div>
              <div><label className="text-sm font-medium text-slate-300">Post Content</label><textarea value={content} onChange={(event) => setContent(event.target.value)} required rows={7} placeholder="What's on your mind?" className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 leading-7 text-white outline-none placeholder:text-slate-600 focus:border-cyan-500/60" /></div>
              <div><label className="text-sm font-medium text-slate-300">Image URL <span className="font-normal text-slate-600">(optional)</span></label><input type="url" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} placeholder="https://example.com/image.jpg" className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-500/60" /></div>
              <div><label className="text-sm font-medium text-slate-300">Post Duration</label><select value={duration} onChange={(event) => setDuration(event.target.value as DurationOption)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1726] px-4 py-3 text-white outline-none focus:border-cyan-500/60"><option value="1-hour">1 Hour</option><option value="6-hours">6 Hours</option><option value="12-hours">12 Hours</option><option value="1-day">1 Day</option><option value="3-days">3 Days</option><option value="7-days">7 Days</option><option value="30-days">30 Days</option><option value="never">Keep Forever</option></select><p className="mt-2 text-xs leading-5 text-slate-500">সময় শেষ হলে post automatically public list থেকে hide হবে।</p></div>
              <div className="flex flex-col-reverse justify-end gap-3 pt-3 sm:flex-row"><button type="button" onClick={() => setShowCreatePost(false)} className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5">Cancel</button><button type="submit" disabled={actionLoading} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"><SendIcon size={17} />{actionLoading ? "Publishing..." : "Publish Post"}</button></div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
