"use client";

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  ImagePlus,
  Link2,
  Pencil,
  RefreshCw,
  Send,
  Sparkles,
  Trash2,
  X,
  Zap,
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

const empty = {
  title: "",
  content: "",
  imageUrl: "",
  linkUrl: "",
};

async function imageFromFile(file: File) {
  if (
    ![
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/gif",
    ].includes(file.type)
  ) {
    throw new Error("Use PNG, JPG, WEBP, or GIF.");
  }

  if (file.size > 1_500_000) {
    throw new Error("Image must be 1.5 MB or smaller.");
  }

  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result));

    reader.onerror = () =>
      reject(new Error("Could not read image."));

    reader.readAsDataURL(file);
  });
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return date.toLocaleString();
}

export default function PostsManager() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const response = await fetch("/api/posts", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not load posts."
        );
      }

      setPosts(
        Array.isArray(data.posts) ? data.posts : []
      );
    } catch (err) {
      setLoadError(
        err instanceof Error
          ? err.message
          : "Could not load posts."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();

    const handler = () => void load();

    window.addEventListener(
      "dashboard-refresh",
      handler
    );

    return () =>
      window.removeEventListener(
        "dashboard-refresh",
        handler
      );
  }, [load]);

  const stats = useMemo(() => {
    const withImages = posts.filter(
      (post) => Boolean(post.imageUrl)
    ).length;

    const withLinks = posts.filter(
      (post) => Boolean(post.linkUrl)
    ).length;

    return {
      total: posts.length,
      withImages,
      withLinks,
    };
  }, [posts]);

  const characterCount = form.content.length;

  async function fileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const data = await imageFromFile(file);

      setForm((value) => ({
        ...value,
        imageUrl: data,
      }));

      setNotice("");
    } catch (err) {
      setNotice(
        err instanceof Error
          ? err.message
          : "Invalid image"
      );
    }

    event.target.value = "";
  }

  async function submit(event: FormEvent) {
    event.preventDefault();

    if (busy) return;

    if (
      !form.title.trim() &&
      !form.content.trim() &&
      !form.imageUrl &&
      !form.linkUrl
    ) {
      setNotice(
        "Add text, an image, or a link before publishing."
      );

      return;
    }

    setBusy(true);
    setNotice("");

    try {
      const response = await fetch(
        editing
          ? `/api/posts/${editing}`
          : "/api/posts",
        {
          method: editing ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            duration: "never",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not save post."
        );
      }

      setForm(empty);
      setEditing(null);

      setNotice(
        editing
          ? "Post updated successfully."
          : "Post published successfully."
      );

      await load();
    } catch (err) {
      setNotice(
        err instanceof Error
          ? err.message
          : "Could not save post."
      );
    } finally {
      setBusy(false);
    }
  }

  function edit(post: Post) {
    setEditing(post.id);

    setForm({
      title: post.title || "",
      content: post.content || "",
      imageUrl: post.imageUrl || "",
      linkUrl: post.linkUrl || "",
    });

    setNotice("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelEditing() {
    setEditing(null);
    setForm(empty);
    setNotice("");
  }

  async function remove(id: string) {
    if (
      !window.confirm(
        "Delete this post permanently?"
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `/api/posts/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not delete post."
        );
      }

      if (editing === id) {
        cancelEditing();
      }

      setNotice("Post deleted successfully.");

      await load();
    } catch (err) {
      setNotice(
        err instanceof Error
          ? err.message
          : "Could not delete post."
      );
    }
  }

  return (
    <div className="space-y-7 pb-4">
      {/* =========================================================
          HEADER
      ========================================================== */}
      <header className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-br from-cyan-300/[0.055] via-white/[0.02] to-blue-500/[0.035] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.18)] sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyan-400/[0.08] blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-blue-500/[0.06] blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.045] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-200">
              <Sparkles size={13} />
              Content Workspace
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Create & manage posts
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Share updates, ideas, project progress, images,
              and useful links from one simple workspace.
            </p>

            {/* Quick Stats */}
            <div className="mt-6 flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-xs text-slate-400">
                <FileText
                  size={13}
                  className="text-cyan-300"
                />
                {stats.total} posts
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-xs text-slate-400">
                <ImagePlus
                  size={13}
                  className="text-blue-300"
                />
                {stats.withImages} with images
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-xs text-slate-400">
                <Link2
                  size={13}
                  className="text-indigo-300"
                />
                {stats.withLinks} with links
              </div>
            </div>
          </div>

          <Link
            href="/home"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-cyan-300/15 bg-cyan-300/[0.045] px-4 py-2.5 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-cyan-300/30 hover:bg-cyan-300/[0.09] hover:text-cyan-200 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]"
          >
            <ArrowLeft
              size={17}
              className="text-cyan-300 transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to Portfolio
          </Link>
        </div>
      </header>

      {/* =========================================================
          PRODUCTIVITY STRIP
      ========================================================== */}
      <section className="grid gap-3 sm:grid-cols-3">
        <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all hover:border-cyan-300/15 hover:bg-white/[0.035]">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-cyan-300/[0.07] p-2.5">
              <Zap
                size={17}
                className="text-cyan-300"
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Fast publishing
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-200">
                Simple composer
              </p>
            </div>
          </div>
        </div>

        <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all hover:border-blue-300/15 hover:bg-white/[0.035]">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-300/[0.07] p-2.5">
              <BarChart3
                size={17}
                className="text-blue-300"
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Content library
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-200">
                {stats.total} published
              </p>
            </div>
          </div>
        </div>

        <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all hover:border-indigo-300/15 hover:bg-white/[0.035]">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-300/[0.07] p-2.5">
              <Clock3
                size={17}
                className="text-indigo-300"
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Publishing mode
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-200">
                Always available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          COMPOSER
      ========================================================== */}
      <section className="dash-card overflow-hidden">
        {/* Composer Header */}
        <div className="border-b border-white/[0.06] bg-white/[0.018] px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-cyan-300/[0.07] p-2">
                  <Send
                    size={16}
                    className="text-cyan-300"
                  />
                </div>

                <h2 className="text-base font-bold text-white">
                  {editing
                    ? "Edit post"
                    : "Create a new post"}
                </h2>
              </div>

              <p className="mt-1 text-xs text-slate-500">
                Add anything you want to share.
              </p>
            </div>

            {editing ? (
              <span className="rounded-full border border-amber-300/10 bg-amber-300/[0.05] px-3 py-1 text-[11px] font-semibold text-amber-200">
                Editing
              </span>
            ) : (
              <span className="hidden rounded-full border border-cyan-300/10 bg-cyan-300/[0.04] px-3 py-1 text-[11px] font-semibold text-cyan-200 sm:inline-flex">
                Ready to publish
              </span>
            )}
          </div>
        </div>

        <form
          onSubmit={submit}
          className="p-5 sm:p-6"
        >
          {/* Title */}
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              Title
            </span>

            <input
              className="dash-input"
              placeholder="Give your post a short title..."
              value={form.title}
              maxLength={200}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
            />
          </label>

          {/* Content */}
          <label className="mt-5 block">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Content
              </span>

              <span className="text-[11px] text-slate-600">
                {characterCount} characters
              </span>
            </div>

            <textarea
              className="dash-input min-h-40 resize-y leading-7"
              placeholder="Write your post here..."
              value={form.content}
              onChange={(e) =>
                setForm({
                  ...form,
                  content: e.target.value,
                })
              }
            />
          </label>

          {/* Image Preview */}
          {form.imageUrl ? (
            <div className="relative mt-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-black/20">
              <div className="absolute left-3 top-3 z-10 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                Image Preview
              </div>

              <img
                src={form.imageUrl}
                alt="Post preview"
                className="max-h-[28rem] w-full object-cover"
              />

              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    imageUrl: "",
                  })
                }
                className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/70 p-2 text-white backdrop-blur-md transition hover:bg-black/90 hover:text-cyan-200"
                aria-label="Remove image"
              >
                <X size={17} />
              </button>
            </div>
          ) : null}

          {/* Link */}
          <label className="relative mt-5 block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500">
              External link
            </span>

            <Link2
              className="absolute left-3 top-[2.65rem] text-slate-500"
              size={17}
            />

            <input
              type="url"
              className="dash-input pl-10"
              placeholder="https://example.com"
              value={form.linkUrl}
              onChange={(e) =>
                setForm({
                  ...form,
                  linkUrl: e.target.value,
                })
              }
            />
          </label>

          {/* Actions */}
          <div className="mt-5 flex flex-col gap-3 border-t border-white/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <label className="dash-button cursor-pointer">
                <ImagePlus size={17} />
                Add Image

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  className="hidden"
                  onChange={fileChange}
                />
              </label>

              {form.imageUrl ? (
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      imageUrl: "",
                    })
                  }
                  className="ui-button-ghost"
                >
                  <X size={16} />
                  Remove Image
                </button>
              ) : null}

              {editing ? (
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="ui-button-ghost"
                >
                  <X size={16} />
                  Cancel
                </button>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={busy}
              className="ui-button-primary w-full justify-center sm:w-auto"
            >
              {busy ? (
                <>
                  <RefreshCw
                    size={17}
                    className="animate-spin"
                  />

                  Saving...
                </>
              ) : (
                <>
                  <Send size={17} />

                  {editing ? "Update Post" : "Publish Post"}
                </>
              )}
            </button>
          </div>

          {/* Notice */}
          {notice ? (
            <div
              className={`mt-4 flex items-start gap-2 rounded-xl border px-3.5 py-3 text-sm ${
                notice.toLowerCase().includes("success")
                  ? "border-cyan-300/10 bg-cyan-300/[0.04] text-cyan-200"
                  : "border-amber-300/10 bg-amber-300/[0.04] text-amber-200"
              }`}
              aria-live="polite"
            >
              <CheckCircle2
                size={17}
                className="mt-0.5 shrink-0"
              />

              <span>{notice}</span>
            </div>
          ) : null}
        </form>
      </section>

      {/* =========================================================
          POSTS SECTION HEADER
      ========================================================== */}
      <section aria-label="Published posts">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
              Content Library
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              Published posts
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage everything you've published from here.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void load()}
            disabled={loading}
            className="ui-button-ghost w-fit"
          >
            <RefreshCw
              size={16}
              className={
                loading ? "animate-spin" : ""
              }
            />

            Refresh
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="dash-card flex min-h-52 items-center justify-center gap-3 p-8 text-slate-400">
            <RefreshCw
              className="animate-spin text-cyan-300"
              size={20}
            />

            Loading posts...
          </div>
        ) : loadError ? (
          <EmptyState
            icon={<RefreshCw size={24} />}
            title="Unable to load posts"
            description={loadError}
            action={
              <button
                type="button"
                onClick={() => void load()}
                className="ui-button-primary"
              >
                <RefreshCw size={17} />
                Try Again
              </button>
            }
          />
        ) : posts.length === 0 ? (
          <EmptyState
            icon={<FileText size={25} />}
            title="No Posts Yet"
            description="Your published posts will appear here. Start with the composer above."
          />
        ) : (
          <div className="grid gap-5 xl:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.022] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/15 hover:bg-white/[0.035] hover:shadow-[0_18px_60px_rgba(0,0,0,0.2)]"
              >
                {/* Image */}
                {post.imageUrl ? (
                  <div className="relative overflow-hidden border-b border-white/[0.07] bg-black/20">
                    <img
                      src={post.imageUrl}
                      alt="Post image"
                      loading="lazy"
                      className="max-h-[28rem] w-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
                    />

                    <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                      Image Post
                    </div>
                  </div>
                ) : null}

                <div className="p-5">
                  {/* Post Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      {post.title ? (
                        <h3 className="break-words text-xl font-bold tracking-tight text-white">
                          {post.title}
                        </h3>
                      ) : (
                        <span className="text-sm font-medium text-slate-500">
                          Untitled post
                        </span>
                      )}

                      <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                        <Clock3 size={13} />

                        <time>
                          {formatDate(
                            post.createdAt
                          )}
                        </time>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 gap-1.5">
                      <button
                        type="button"
                        onClick={() => edit(post)}
                        className="ui-button-ghost min-h-0 rounded-lg p-2"
                        aria-label="Edit post"
                        title="Edit post"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          void remove(post.id)
                        }
                        className="ui-button-danger min-h-0 rounded-lg p-2"
                        aria-label="Delete post"
                        title="Delete post"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  {post.content ? (
                    <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-slate-300">
                      {post.content}
                    </p>
                  ) : null}

                  {/* Link */}
                  {post.linkUrl ? (
                    <a
                      href={post.linkUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 flex min-w-0 items-center gap-2 rounded-xl border border-blue-300/10 bg-blue-300/[0.035] px-3.5 py-3 text-sm font-semibold text-blue-300 transition-all hover:border-cyan-300/20 hover:bg-cyan-300/[0.05] hover:text-cyan-200"
                    >
                      <ExternalLink
                        size={16}
                        className="shrink-0"
                      />

                      <span className="truncate">
                        {post.linkUrl}
                      </span>
                    </a>
                  ) : null}

                  {/* Footer */}
                  <div className="mt-5 flex items-center justify-between border-t border-white/[0.055] pt-4">
                    <div className="flex items-center gap-2">
                      {post.imageUrl ? (
                        <span className="rounded-full border border-white/[0.06] bg-white/[0.025] px-2.5 py-1 text-[10px] text-slate-500">
                          Image
                        </span>
                      ) : null}

                      {post.linkUrl ? (
                        <span className="rounded-full border border-white/[0.06] bg-white/[0.025] px-2.5 py-1 text-[10px] text-slate-500">
                          Link
                        </span>
                      ) : null}

                      {!post.imageUrl &&
                      !post.linkUrl ? (
                        <span className="rounded-full border border-white/[0.06] bg-white/[0.025] px-2.5 py-1 text-[10px] text-slate-500">
                          Text
                        </span>
                      ) : null}
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-cyan-300/70">
                      <CheckCircle2 size={13} />
                      Published
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* =========================================================
          BOTTOM NAVIGATION
      ========================================================== */}
      <div className="flex justify-center border-t border-white/[0.05] pt-7">
        <Link
          href="/home"
          className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all duration-300 hover:border-cyan-300/20 hover:bg-cyan-300/[0.04] hover:text-cyan-200"
        >
          <ArrowLeft
            size={17}
            className="text-cyan-300 transition-transform duration-300 group-hover:-translate-x-1"
          />

          Return to Portfolio
        </Link>
      </div>
    </div>
  );
}