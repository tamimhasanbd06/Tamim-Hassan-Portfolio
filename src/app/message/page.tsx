"use client";

import Link from "next/link";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  ArrowLeft,
  ExternalLink,
  ImagePlus,
  Inbox,
  Link2,
  Pencil,
  RefreshCw,
  Send,
  X,
  Sparkles,
  MessageCircle,
  LayoutDashboard,
} from "lucide-react";

import EmptyState from "@/components/common/EmptyState";

type OwnMessage = {
  id: string;
  message: string;
  imageUrl: string | null;
  linkUrl: string | null;
  adminReply: string | null;
  createdAt: string;
  isSaved: boolean;
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

    reader.onload = () => {
      resolve(String(reader.result));
    };

    reader.onerror = () => {
      reject(new Error("Could not read image."));
    };

    reader.readAsDataURL(file);
  });
}

export default function MessagePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * Admin navigation context.
   *
   * Dashboard sidebar opens this page as:
   *
   * /message?from=admin
   *
   * Normal public visitors open:
   *
   * /message
   *
   * Therefore the Admin button is only rendered
   * when the page was opened from the dashboard.
   */
  const isAdminView = searchParams.get("from") === "admin";

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  const [mine, setMine] = useState<OwnMessage[]>([]);
  const [editing, setEditing] = useState<string | null>(null);

  const [loadingMessages, setLoadingMessages] =
    useState(true);

  const [loadError, setLoadError] = useState("");

  const load = useCallback(async () => {
    setLoadingMessages(true);
    setLoadError("");

    try {
      const response = await fetch("/api/messages", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not load your messages.",
        );
      }

      setMine(
        Array.isArray(data.messages)
          ? data.messages
          : [],
      );
    } catch (err) {
      setLoadError(
        err instanceof Error
          ? err.message
          : "Could not load your messages.",
      );
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  /**
   * Admin → Dashboard
   *
   * replace() is intentional here.
   *
   * It prevents the user from being sent back to
   * /message?from=admin again by pressing browser back.
   */
  function backToDashboard() {
    router.replace("/dashboard/overview");
  }

  async function fileChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      const preview = await imageFromFile(file);

      setImageUrl(preview);
      setNotice("");
    } catch (err) {
      setNotice(
        err instanceof Error
          ? err.message
          : "Invalid image.",
      );
    }
  }

  async function submit(event: FormEvent) {
    event.preventDefault();

    if (!message.trim() && !imageUrl) {
      setNotice(
        "Write a message or attach an image before sending.",
      );
      return;
    }

    setBusy(true);
    setNotice("");

    try {
      const response = await fetch(
        editing
          ? `/api/messages/${editing}`
          : "/api/messages",
        {
          method: editing ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            message,
            imageUrl,
            linkUrl,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not send message.",
        );
      }

      setMessage("");
      setImageUrl("");
      setLinkUrl("");
      setEditing(null);

      setNotice(
        editing
          ? "Message updated successfully."
          : "Message sent successfully.",
      );

      await load();
    } catch (err) {
      setNotice(
        err instanceof Error
          ? err.message
          : "Could not send message.",
      );
    } finally {
      setBusy(false);
    }
  }

  function startEditing(item: OwnMessage) {
    setEditing(item.id);
    setMessage(item.message);
    setImageUrl(item.imageUrl || "");
    setLinkUrl(item.linkUrl || "");
    setNotice("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelEditing() {
    setEditing(null);
    setMessage("");
    setImageUrl("");
    setLinkUrl("");
    setNotice("");
  }

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
            NAVIGATION
        ======================================================== */}

        <div className="flex flex-wrap items-center gap-2.5">
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
            ADMIN CONTEXT INDICATOR
        ======================================================== */}

        {isAdminView ? (
          <div className="mt-3 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-400/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />

            Admin workspace
          </div>
        ) : null}

        {/* =======================================================
            MAIN MESSAGE CARD
        ======================================================== */}

        <section className="relative mt-5 overflow-hidden rounded-[22px] border border-cyan-400/[0.12] bg-[#02070e]/90 shadow-[0_25px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          {/* Top gradient line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />

          {/* Soft card glow */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-cyan-400/[0.035] blur-3xl" />

          {/* =====================================================
              HEADER
          ====================================================== */}

          <div className="relative border-b border-white/[0.055] px-5 py-5 sm:px-6">
            <div className="flex items-start gap-3.5">
              {/* Icon */}
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/[0.12] to-blue-500/[0.08] text-cyan-300 shadow-[0_0_30px_rgba(0,210,255,0.07)]">
                <div className="absolute inset-0 rounded-xl bg-cyan-400/[0.025] blur-md" />

                {editing ? (
                  <Pencil
                    size={18}
                    className="relative"
                  />
                ) : (
                  <MessageCircle
                    size={19}
                    className="relative"
                  />
                )}
              </div>

              {/* Header text */}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                    {editing
                      ? "Edit Message"
                      : "Message Me"}
                  </p>

                  <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/15 bg-cyan-400/[0.055] px-2 py-0.5 text-[9px] font-semibold text-cyan-200">
                    <Sparkles size={9} />
                    PRIVATE
                  </span>
                </div>

                <h1 className="mt-1 text-[23px] font-black tracking-tight text-white sm:text-[26px]">
                  {editing
                    ? "Update your message"
                    : "Send a private message"}
                </h1>

                <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                  Your message is visible to the portfolio
                  administrator.
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              FORM
          ====================================================== */}

          <form
            onSubmit={submit}
            className="relative space-y-4 px-5 py-5 sm:px-6 sm:py-6"
          >
            {/* NAME */}

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Your name
              </span>

              <input
                type="text"
                maxLength={100}
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter your name"
                required
                className="w-full rounded-xl border border-white/[0.08] bg-[#030a12] px-3.5 py-2.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-slate-600 hover:border-cyan-400/[0.16] focus:border-cyan-400/35 focus:bg-[#04101a] focus:ring-2 focus:ring-cyan-400/[0.07]"
              />
            </label>

            {/* MESSAGE */}

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Message
              </span>

              <textarea
                value={message}
                onChange={(e) =>
                  setMessage(e.target.value)
                }
                placeholder="Write your message..."
                className="min-h-[120px] w-full resize-y rounded-xl border border-white/[0.08] bg-[#030a12] px-3.5 py-3 text-sm leading-6 text-white outline-none transition-all duration-300 placeholder:text-slate-600 hover:border-cyan-400/[0.16] focus:border-cyan-400/35 focus:bg-[#04101a] focus:ring-2 focus:ring-cyan-400/[0.07]"
              />
            </label>

            {/* IMAGE PREVIEW */}

            {imageUrl ? (
              <div className="group relative overflow-hidden rounded-xl border border-cyan-400/[0.12] bg-black">
                <img
                  src={imageUrl}
                  alt="Attachment preview"
                  className="max-h-64 w-full object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />

                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  aria-label="Remove attachment"
                  className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/65 text-slate-300 backdrop-blur-md transition-all duration-200 hover:border-red-400/20 hover:bg-red-500/20 hover:text-red-300"
                >
                  <X size={15} />
                </button>
              </div>
            ) : null}

            {/* IMAGE + LINK */}

            <div className="grid gap-2.5 sm:grid-cols-[auto_1fr]">
              <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-cyan-400/[0.13] bg-[#030a12] px-4 py-2.5 text-xs font-bold text-cyan-200 transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/[0.055] hover:text-cyan-100">
                <ImagePlus size={16} />

                Add Image

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  className="hidden"
                  onChange={fileChange}
                />
              </label>

              <label className="relative block">
                <span className="sr-only">
                  Optional link
                </span>

                <Link2
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500/50"
                />

                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) =>
                    setLinkUrl(e.target.value)
                  }
                  placeholder="Optional https:// link"
                  className="w-full rounded-xl border border-white/[0.08] bg-[#030a12] py-2.5 pl-9 pr-3.5 text-xs text-white outline-none transition-all duration-300 placeholder:text-slate-600 hover:border-cyan-400/[0.16] focus:border-cyan-400/35 focus:bg-[#04101a] focus:ring-2 focus:ring-cyan-400/[0.07]"
                />
              </label>
            </div>

            {/* NOTICE */}

            {notice ? (
              <div className="rounded-xl border border-cyan-400/[0.12] bg-cyan-400/[0.035] px-3.5 py-2.5 text-xs leading-5 text-cyan-200">
                {notice}
              </div>
            ) : null}

            {/* =================================================
                BUTTONS
            ================================================== */}

            <div className="flex flex-col gap-2.5 sm:flex-row">
              {/* Primary */}
              <button
                type="submit"
                disabled={busy}
                className="group relative inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_10px_30px_rgba(0,174,255,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(0,174,255,0.22)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {/* Button shine */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <Send
                  size={16}
                  className="relative transition-transform duration-300 group-hover:translate-x-0.5"
                />

                <span className="relative">
                  {busy
                    ? editing
                      ? "Updating..."
                      : "Sending..."
                    : editing
                      ? "Update Message"
                      : "Send Message"}
                </span>
              </button>

              {/* Cancel */}
              {editing ? (
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.025] px-5 py-2.5 text-sm font-semibold text-slate-400 transition-all duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/[0.035] hover:text-cyan-200"
                >
                  <X size={16} />
                  Cancel
                </button>
              ) : null}
            </div>

            <p className="text-center text-[10px] text-slate-600">
              Unsaved messages expire after 24 hours.
            </p>
          </form>
        </section>

        {/* =======================================================
            RECENT MESSAGES
        ======================================================== */}

        <section
          className="mt-8"
          aria-labelledby="recent-messages-title"
        >
          {/* Section heading */}

          <div className="mb-3.5 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                Inbox
              </p>

              <h2
                id="recent-messages-title"
                className="mt-1 text-xl font-black tracking-tight text-white"
              >
                Your recent messages
              </h2>
            </div>

            {!loadingMessages &&
            !loadError &&
            mine.length > 0 ? (
              <span className="rounded-full border border-cyan-400/[0.12] bg-cyan-400/[0.035] px-2.5 py-1 text-[10px] font-bold text-cyan-300">
                {mine.length}{" "}
                {mine.length === 1
                  ? "message"
                  : "messages"}
              </span>
            ) : null}
          </div>

          {/* LOADING */}

          {loadingMessages ? (
            <div className="flex min-h-[135px] items-center justify-center gap-2.5 rounded-2xl border border-white/[0.07] bg-[#02070e]/75 p-6 text-xs text-slate-500 backdrop-blur-xl">
              <RefreshCw
                size={17}
                className="animate-spin text-cyan-400"
              />

              Loading messages...
            </div>
          ) : loadError ? (
            <EmptyState
              icon={
                <RefreshCw size={22} />
              }
              title="Unable to load messages"
              description={loadError}
              action={
                <button
                  type="button"
                  onClick={() => void load()}
                  className="ui-button-primary"
                >
                  <RefreshCw size={16} />
                  Try Again
                </button>
              }
            />
          ) : mine.length === 0 ? (
            <EmptyState
              icon={<Inbox size={23} />}
              title="No Messages Yet"
              description="Your messages and replies will appear here after you contact the portfolio owner."
            />
          ) : (
            <div className="space-y-3">
              {mine.slice(0, 5).map((item) => (
                <article
                  key={item.id}
                  className={`group relative overflow-hidden rounded-2xl border bg-[#02070e]/80 p-4 backdrop-blur-xl transition-all duration-300 ${
                    editing === item.id
                      ? "border-cyan-400/30 shadow-[0_0_35px_rgba(0,210,255,0.07)]"
                      : "border-white/[0.07] hover:border-cyan-400/[0.16] hover:bg-[#030a12]"
                  }`}
                >
                  {/* Left accent */}
                  <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-cyan-400 via-blue-500/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Date / status */}

                  <div className="flex items-start justify-between gap-3">
                    <time className="text-[10px] font-medium text-slate-600">
                      {new Date(
                        item.createdAt,
                      ).toLocaleString()}
                    </time>

                    {item.isSaved ? (
                      <span className="rounded-full border border-cyan-400/[0.12] bg-cyan-400/[0.035] px-2 py-0.5 text-[9px] font-bold text-cyan-300/80">
                        SAVED
                      </span>
                    ) : (
                      <span className="rounded-full border border-amber-300/[0.12] bg-amber-300/[0.035] px-2 py-0.5 text-[9px] font-bold text-amber-200/70">
                        UNSAVED
                      </span>
                    )}
                  </div>

                  {/* Message */}

                  <p className="mt-2.5 break-words text-sm leading-6 text-slate-300">
                    {item.message ||
                      "Attachment message"}
                  </p>

                  {/* Image */}

                  {item.imageUrl ? (
                    <div className="mt-3 overflow-hidden rounded-xl border border-white/[0.06] bg-black">
                      <img
                        src={item.imageUrl}
                        alt="Message attachment"
                        className="max-h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                      />
                    </div>
                  ) : null}

                  {/* Actions */}

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                    {!item.isSaved ? (
                      <button
                        type="button"
                        onClick={() =>
                          startEditing(item)
                        }
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-cyan-300 transition-colors hover:text-cyan-100"
                      >
                        <Pencil size={13} />

                        Edit your message
                      </button>
                    ) : null}

                    {item.linkUrl ? (
                      <a
                        href={item.linkUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-400 transition-colors hover:text-blue-300"
                      >
                        <ExternalLink size={13} />

                        Open link
                      </a>
                    ) : null}
                  </div>

                  {/* ADMIN REPLY */}

                  {item.adminReply ? (
                    <div className="mt-4 overflow-hidden rounded-xl border border-cyan-400/[0.11] bg-gradient-to-br from-cyan-400/[0.055] via-blue-500/[0.025] to-transparent p-3.5">
                      <div className="mb-1.5 flex items-center gap-1.5">
                        <MessageCircle
                          size={13}
                          className="text-cyan-300"
                        />

                        <strong className="text-[10px] font-black uppercase tracking-[0.14em] text-cyan-200">
                          Reply
                        </strong>
                      </div>

                      <p className="text-xs leading-5 text-slate-300">
                        {item.adminReply}
                      </p>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </section>

        {/* =======================================================
            FOOTER DECORATION
        ======================================================== */}

        <div className="mt-8 flex items-center justify-center gap-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-700">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-400/20" />

          <span>Private communication</span>

          <span className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-400/20" />
        </div>
      </div>
    </main>
  );
}