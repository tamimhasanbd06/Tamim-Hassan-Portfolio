"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  Clock3,
  ExternalLink,
  ImageIcon,
  Inbox,
  Link2,
  MessageSquare,
  RefreshCw,
  Reply,
  Save,
  Send,
  Sparkles,
  Trash2,
  UserRound,
  X,
  Zap,
} from "lucide-react";

import EmptyState from "@/components/common/EmptyState";

type Message = {
  id: string;
  senderName: string;
  message: string;
  imageUrl: string | null;
  linkUrl: string | null;
  isSaved: boolean;
  status: string;
  adminReply: string | null;
  createdAt: string;
  expiresAt: string;
};

export default function MessagesManager() {
  const [items, setItems] = useState<Message[]>([]);
  const [reply, setReply] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const response = await fetch("/api/messages", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not load messages."
        );
      }

      setItems(
        Array.isArray(data.messages)
          ? data.messages
          : []
      );
    } catch (err) {
      setLoadError(
        err instanceof Error
          ? err.message
          : "Could not load messages."
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
    const saved = items.filter(
      (item) => item.isSaved
    ).length;

    const replied = items.filter(
      (item) =>
        item.status.toLowerCase() === "replied" ||
        Boolean(item.adminReply)
    ).length;

    const withImages = items.filter(
      (item) => Boolean(item.imageUrl)
    ).length;

    const withLinks = items.filter(
      (item) => Boolean(item.linkUrl)
    ).length;

    return {
      total: items.length,
      saved,
      replied,
      withImages,
      withLinks,
      unsaved: items.length - saved,
    };
  }, [items]);

  async function patch(
    id: string,
    payload: Record<string, unknown>
  ) {
    setBusyId(id);

    try {
      const response = await fetch(
        `/api/messages/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Could not update message."
        );
      }

      await load();
    } finally {
      setBusyId(null);
    }
  }

  async function toggleSave(message: Message) {
    try {
      await patch(message.id, {
        isSaved: !message.isSaved,
        status: message.status,
        adminReply: message.adminReply || "",
      });

      setNotice(
        !message.isSaved
          ? "Message saved successfully."
          : "Message returned to 24-hour expiry."
      );
    } catch (err) {
      setNotice(
        err instanceof Error
          ? err.message
          : "Update failed."
      );
    }
  }

  async function sendReply(message: Message) {
    const replyText =
      reply[message.id] ??
      message.adminReply ??
      "";

    if (!replyText.trim()) {
      setNotice(
        "Write a reply before saving it."
      );

      return;
    }

    try {
      await patch(message.id, {
        isSaved: message.isSaved,
        status: "replied",
        adminReply: replyText,
      });

      setNotice("Reply saved successfully.");

      setReply((current) => {
        const next = { ...current };
        delete next[message.id];
        return next;
      });
    } catch (err) {
      setNotice(
        err instanceof Error
          ? err.message
          : "Reply failed."
      );
    }
  }

  async function remove(id: string) {
    if (
      !window.confirm(
        "Delete this message permanently?"
      )
    ) {
      return;
    }

    setBusyId(id);

    try {
      const response = await fetch(
        `/api/messages/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Could not delete message."
        );
      }

      setNotice("Message deleted successfully.");

      await load();
    } catch (err) {
      setNotice(
        err instanceof Error
          ? err.message
          : "Delete failed."
      );
    } finally {
      setBusyId(null);
    }
  }

  function formatDate(value: string) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Unknown date";
    }

    return date.toLocaleString();
  }

  function getStatusClass(status: string) {
    const normalized = status.toLowerCase();

    if (normalized === "replied") {
      return "border-cyan-300/10 bg-cyan-300/[0.06] text-cyan-200";
    }

    if (
      normalized === "read" ||
      normalized === "viewed"
    ) {
      return "border-blue-300/10 bg-blue-300/[0.06] text-blue-200";
    }

    return "border-white/[0.07] bg-white/[0.035] text-slate-400";
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
              <Inbox size={13} />

              Message Center
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Visitor inbox
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Manage visitor messages, save important
              conversations, and reply from one focused
              workspace.
            </p>

            {/* Header Stats */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-xs text-slate-400">
                <MessageSquare
                  size={13}
                  className="text-cyan-300"
                />

                {stats.total} messages
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-xs text-slate-400">
                <Bookmark
                  size={13}
                  className="text-blue-300"
                />

                {stats.saved} saved
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-xs text-slate-400">
                <Reply
                  size={13}
                  className="text-indigo-300"
                />

                {stats.replied} replied
              </span>
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
          PRODUCTIVITY STATS
      ========================================================== */}
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total */}
        <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/15 hover:bg-white/[0.035]">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-cyan-300/[0.07] p-2.5">
              <Inbox
                size={18}
                className="text-cyan-300"
              />
            </div>

            <span className="text-2xl font-black text-white">
              {stats.total}
            </span>
          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Total Messages
          </p>

          <p className="mt-1 text-xs text-slate-600">
            Current inbox
          </p>
        </div>

        {/* Saved */}
        <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300/15 hover:bg-white/[0.035]">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-blue-300/[0.07] p-2.5">
              <Bookmark
                size={18}
                className="text-blue-300"
              />
            </div>

            <span className="text-2xl font-black text-white">
              {stats.saved}
            </span>
          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Saved
          </p>

          <p className="mt-1 text-xs text-slate-600">
            Permanently retained
          </p>
        </div>

        {/* Replied */}
        <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300/15 hover:bg-white/[0.035]">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-indigo-300/[0.07] p-2.5">
              <Reply
                size={18}
                className="text-indigo-300"
              />
            </div>

            <span className="text-2xl font-black text-white">
              {stats.replied}
            </span>
          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Replied
          </p>

          <p className="mt-1 text-xs text-slate-600">
            Conversations answered
          </p>
        </div>

        {/* Unsaved */}
        <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300/15 hover:bg-white/[0.035]">
          <div className="flex items-center justify-between">
            <div className="rounded-xl bg-amber-300/[0.07] p-2.5">
              <Clock3
                size={18}
                className="text-amber-300"
              />
            </div>

            <span className="text-2xl font-black text-white">
              {stats.unsaved}
            </span>
          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Unsaved
          </p>

          <p className="mt-1 text-xs text-slate-600">
            Subject to expiry
          </p>
        </div>
      </section>

      {/* =========================================================
          QUICK STATUS BAR
      ========================================================== */}
      <section className="flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.018] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-300/[0.06] p-2.5">
            <Zap
              size={17}
              className="text-cyan-300"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-200">
              Inbox workspace
            </p>

            <p className="text-xs text-slate-500">
              Keep important conversations saved before
              they expire.
            </p>
          </div>
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

          Refresh Inbox
        </button>
      </section>

      {/* =========================================================
          NOTICE
      ========================================================== */}
      {notice ? (
        <div
          className="flex items-start gap-3 rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.04] px-4 py-3 text-sm text-cyan-200"
          aria-live="polite"
        >
          <CheckCircle2
            size={18}
            className="mt-0.5 shrink-0"
          />

          <span>{notice}</span>

          <button
            type="button"
            onClick={() => setNotice("")}
            className="ml-auto rounded-lg p-1 text-cyan-300/70 transition hover:bg-white/[0.05] hover:text-cyan-200"
            aria-label="Dismiss notification"
          >
            <X size={15} />
          </button>
        </div>
      ) : null}

      {/* =========================================================
          MESSAGES
      ========================================================== */}
      <section aria-label="Visitor messages">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
              Inbox
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              Visitor messages
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review, save, reply to, or remove messages.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px]">
            <span className="rounded-full border border-white/[0.06] bg-white/[0.025] px-2.5 py-1 text-slate-500">
              {stats.withImages} attachments
            </span>

            <span className="rounded-full border border-white/[0.06] bg-white/[0.025] px-2.5 py-1 text-slate-500">
              {stats.withLinks} links
            </span>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="dash-card flex min-h-52 items-center justify-center gap-3 p-8 text-slate-400">
            <RefreshCw
              className="animate-spin text-cyan-300"
              size={20}
            />

            Loading messages...
          </div>
        ) : loadError ? (
          <EmptyState
            icon={<RefreshCw size={24} />}
            title="Unable to load messages"
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
        ) : items.length === 0 ? (
          <EmptyState
            icon={<Inbox size={25} />}
            title="No Messages Yet"
            description="You don’t have any visitor messages right now. New messages will appear here when someone contacts you."
          />
        ) : (
          <div className="space-y-5">
            {items.map((message) => {
              const isBusy =
                busyId === message.id;

              const currentReply =
                reply[message.id] ??
                message.adminReply ??
                "";

              return (
                <article
                  key={message.id}
                  className={`group overflow-hidden rounded-2xl border bg-white/[0.022] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.035] ${
                    message.isSaved
                      ? "border-cyan-300/15 shadow-[0_10px_45px_rgba(34,211,238,0.035)]"
                      : "border-white/[0.07] hover:border-cyan-300/10"
                  }`}
                >
                  {/* Saved Accent */}
                  {message.isSaved ? (
                    <div className="h-0.5 bg-gradient-to-r from-cyan-300/70 via-blue-400/50 to-transparent" />
                  ) : null}

                  <div className="p-5 sm:p-6">
                    {/* =================================================
                        MESSAGE HEADER
                    ================================================== */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex min-w-0 gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-300/10 bg-cyan-300/[0.055]">
                          <UserRound
                            size={19}
                            className="text-cyan-300"
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="truncate text-base font-bold text-white">
                              {message.senderName}
                            </h3>

                            <span
                              className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${
                                message.isSaved
                                  ? "border-cyan-300/10 bg-cyan-300/[0.06] text-cyan-200"
                                  : "border-white/[0.07] bg-white/[0.035] text-slate-500"
                              }`}
                            >
                              {message.isSaved
                                ? "Saved"
                                : "Unsaved"}
                            </span>

                            <span
                              className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold capitalize ${getStatusClass(
                                message.status
                              )}`}
                            >
                              {message.status}
                            </span>
                          </div>

                          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                            <Clock3 size={13} />

                            <time>
                              {formatDate(
                                message.createdAt
                              )}
                            </time>

                            {!message.isSaved ? (
                              <>
                                <span className="text-slate-700">
                                  •
                                </span>

                                <span>
                                  Expires automatically
                                </span>
                              </>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex shrink-0 gap-2">
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() =>
                            void toggleSave(message)
                          }
                          className={`ui-button-ghost min-h-0 p-2.5 ${
                            message.isSaved
                              ? "border-cyan-300/15 bg-cyan-300/[0.05] text-cyan-200"
                              : ""
                          }`}
                          aria-label={
                            message.isSaved
                              ? "Unsave message"
                              : "Save message"
                          }
                          title={
                            message.isSaved
                              ? "Unsave message"
                              : "Save message"
                          }
                        >
                          {message.isSaved ? (
                            <Bookmark size={17} />
                          ) : (
                            <Save size={17} />
                          )}
                        </button>

                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() =>
                            void remove(message.id)
                          }
                          className="ui-button-danger min-h-0 p-2.5"
                          aria-label="Delete message"
                          title="Delete message"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>

                    {/* =================================================
                        MESSAGE BODY
                    ================================================== */}
                    <div className="mt-5 rounded-2xl border border-white/[0.055] bg-black/[0.08] p-4 sm:p-5">
                      {message.message ? (
                        <p className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-300">
                          {message.message}
                        </p>
                      ) : (
                        <p className="text-sm italic text-slate-600">
                          No text content.
                        </p>
                      )}
                    </div>

                    {/* =================================================
                        ATTACHMENT
                    ================================================== */}
                    {message.imageUrl ? (
                      <div className="mt-4 overflow-hidden rounded-2xl border border-white/[0.07] bg-black/20">
                        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
                          <ImageIcon
                            size={15}
                            className="text-blue-300"
                          />

                          <span className="text-xs font-semibold text-slate-400">
                            Visitor attachment
                          </span>
                        </div>

                        <img
                          src={message.imageUrl}
                          alt="Visitor attachment"
                          loading="lazy"
                          className="max-h-[32rem] w-full object-cover"
                        />
                      </div>
                    ) : null}

                    {/* =================================================
                        LINK
                    ================================================== */}
                    {message.linkUrl ? (
                      <a
                        href={message.linkUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 flex min-w-0 items-center gap-3 rounded-2xl border border-blue-300/10 bg-blue-300/[0.035] px-4 py-3.5 transition-all duration-300 hover:border-cyan-300/20 hover:bg-cyan-300/[0.045]"
                      >
                        <div className="rounded-lg bg-blue-300/[0.08] p-2">
                          <Link2
                            size={15}
                            className="text-blue-300"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                            External Link
                          </p>

                          <p className="mt-0.5 truncate text-sm font-medium text-blue-300">
                            {message.linkUrl}
                          </p>
                        </div>

                        <ExternalLink
                          size={16}
                          className="shrink-0 text-slate-500 transition group-hover:text-cyan-300"
                        />
                      </a>
                    ) : null}

                    {/* =================================================
                        REPLY WORKSPACE
                    ================================================== */}
                    <div className="mt-6 border-t border-white/[0.06] pt-5">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="rounded-lg bg-cyan-300/[0.06] p-2">
                              <Reply
                                size={15}
                                className="text-cyan-300"
                              />
                            </div>

                            <h4 className="text-sm font-bold text-slate-200">
                              Reply to visitor
                            </h4>
                          </div>

                          <p className="mt-1 text-xs text-slate-600">
                            Write a response and save it to
                            this conversation.
                          </p>
                        </div>

                        {message.adminReply ? (
                          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-cyan-300/10 bg-cyan-300/[0.045] px-2.5 py-1 text-[10px] font-semibold text-cyan-200">
                            <CheckCircle2 size={12} />
                            Reply saved
                          </span>
                        ) : null}
                      </div>

                      <textarea
                        className="dash-input mt-4 min-h-28 resize-y leading-6"
                        value={currentReply}
                        onChange={(e) =>
                          setReply({
                            ...reply,
                            [message.id]:
                              e.target.value,
                          })
                        }
                        placeholder="Write a thoughtful reply for this visitor..."
                        disabled={isBusy}
                      />

                      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-[11px] text-slate-600">
                          {currentReply.length} characters
                        </span>

                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() =>
                            void sendReply(message)
                          }
                          className="ui-button-primary w-full justify-center sm:w-auto"
                        >
                          {isBusy ? (
                            <>
                              <RefreshCw
                                size={16}
                                className="animate-spin"
                              />

                              Saving...
                            </>
                          ) : (
                            <>
                              <Send size={16} />

                              Save Reply
                            </>
                          )}
                        </button>
                      </div>

                      {/* Existing reply */}
                      {message.adminReply ? (
                        <div className="mt-4 rounded-2xl border border-cyan-300/10 bg-cyan-300/[0.025] p-4">
                          <div className="mb-2 flex items-center gap-2">
                            <Sparkles
                              size={14}
                              className="text-cyan-300"
                            />

                            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-200">
                              Saved reply
                            </span>
                          </div>

                          <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-300">
                            {message.adminReply}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
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