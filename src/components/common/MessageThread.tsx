"use client";

import { useCallback, useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { ImagePlus, Reply, Send, X } from "lucide-react";
import AdminAvatar from "@/components/common/AdminAvatar";
import { useLiveUpdates } from "@/lib/use-live-updates";
import ImageLightbox from "@/components/common/ImageLightbox";

type ReplyItem = {
  id: string;
  parentReplyId: string | null;
  role: "admin" | "visitor";
  body: string;
  imageUrl: string | null;
  createdAt: string;
};

async function readImage(file: File) {
  if (!["image/png", "image/jpeg", "image/webp", "image/gif"].includes(file.type)) throw new Error("Use PNG, JPG, WEBP, or GIF.");
  if (file.size > 1_500_000) throw new Error("Image must be 1.5 MB or smaller.");
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read image."));
    reader.readAsDataURL(file);
  });
}

export default function MessageThread({ messageId, isAdmin = false }: { messageId: string; isAdmin?: boolean }) {
  const [items, setItems] = useState<ReplyItem[]>([]);
  const [selected, setSelected] = useState<ReplyItem | null>(null);
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const load = useCallback(async () => {
    try {
      const response = await fetch(`/api/messages/${messageId}/replies`, { cache: "no-store" });
      if (!response.ok) throw new Error("Replies could not be loaded.");
      const data = await response.json();
      setItems(Array.isArray(data.replies) ? data.replies : []);
      setError("");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Replies could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, [messageId]);

  useEffect(() => {
    void load();
  }, [load]);
  useLiveUpdates("messages", () => { void load(); });

  const byId = useMemo(() => new Map(items.map((item) => [item.id, item])), [items]);

  async function attach(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try { setImageUrl(await readImage(file)); setError(""); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "Invalid image."); }
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!body.trim() && !imageUrl) { setError("Write a reply or attach an image."); return; }
    setSending(true); setError("");
    try {
      const response = await fetch(`/api/messages/${messageId}/replies`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body, imageUrl: imageUrl || null, parentReplyId: selected?.id ?? null }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Reply could not be sent.");
      setBody(""); setImageUrl(""); setSelected(null);
      await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Reply could not be sent."); }
    finally { setSending(false); }
  }

  function jumpTo(id: string) {
    document.getElementById(`message-reply-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <section className="thread-panel mt-4" aria-label={isAdmin ? "Admin conversation replies" : "Your conversation replies"}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold text-cyan-100">Conversation</h3>
        <span className="text-xs text-slate-500">{items.length} {items.length === 1 ? "reply" : "replies"}</span>
      </div>
      {loading ? <p className="py-3 text-xs text-slate-500" role="status">Loading conversation…</p> : null}
      <div className="space-y-3" aria-live="polite">
        {items.map((item) => {
          const parent = item.parentReplyId ? byId.get(item.parentReplyId) : null;
          const admin = item.role === "admin";
          return (
            <article id={`message-reply-${item.id}`} key={item.id} className={`flex items-start gap-2 ${admin ? "flex-row" : "flex-row-reverse"}`}>
              {admin ? <AdminAvatar size={30} alt="Administrator" /> : <span aria-label="Visitor" className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-xs text-slate-300">You</span>}
              <div className={`min-w-0 max-w-[88%] rounded-xl border px-3 py-2 ${admin ? "border-cyan-400/15 bg-cyan-400/[0.055]" : "border-white/10 bg-white/[0.035]"}`}>
                <div className="mb-1 flex items-center justify-between gap-3">
                  <strong className="text-[10px] font-bold uppercase tracking-wider text-cyan-200">{admin ? "Tamim" : "You"}</strong>
                  <time className="text-[10px] text-slate-500" dateTime={item.createdAt}>{new Date(item.createdAt).toLocaleString()}</time>
                </div>
                {parent ? <button type="button" onClick={() => jumpTo(parent.id)} className="mb-2 block w-full border-l-2 border-cyan-400/60 pl-2 text-left text-xs text-slate-400 hover:text-cyan-100"><span className="block font-semibold text-cyan-200">Replying to {parent.role === "admin" ? "Tamim" : "You"}</span><span className="line-clamp-2">{parent.body || "Image"}</span></button> : null}
                {item.body ? <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-200">{item.body}</p> : null}
                {item.imageUrl ? <div className="mt-2"><ImageLightbox src={item.imageUrl} alt="Reply attachment" /></div> : null}
                <button type="button" onClick={() => { setSelected(item); setError(""); }} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-cyan-300 hover:text-white"><Reply size={13} /> Reply</button>
              </div>
            </article>
          );
        })}
      </div>
      {error ? <p role="alert" className="mt-3 text-xs text-rose-300">{error}</p> : null}
      <form onSubmit={submit} className="mt-3 space-y-2">
        {selected ? <div className="flex items-start justify-between gap-3 rounded-lg border-l-2 border-cyan-400 bg-white/[0.035] px-3 py-2"><p className="min-w-0 text-xs text-slate-300"><span className="block font-semibold text-cyan-200">Replying to {selected.role === "admin" ? "Tamim" : "You"}</span><span className="line-clamp-2">{selected.body || "Image attachment"}</span></p><button type="button" onClick={() => setSelected(null)} aria-label="Cancel reply" className="text-slate-400 hover:text-white"><X size={16} /></button></div> : null}
        {imageUrl ? <div className="flex items-start gap-2"><img src={imageUrl} alt="Reply preview" className="message-natural-image max-h-36 rounded-lg" /><button type="button" onClick={() => setImageUrl("")} aria-label="Remove reply image"><X size={16} /></button></div> : null}
        <div className="flex flex-wrap items-end gap-2">
          <label className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-lg border border-white/10 text-cyan-200 hover:bg-white/5" aria-label="Attach image"><ImagePlus size={17} /><input type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="sr-only" onChange={attach} /></label>
          <label className="sr-only" htmlFor={`reply-body-${messageId}`}>Write a reply</label>
          <textarea id={`reply-body-${messageId}`} value={body} onChange={(event) => setBody(event.target.value)} maxLength={5000} rows={1} placeholder="Write a reply…" className="min-h-10 min-w-[8rem] flex-1 resize-y rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-white placeholder:text-slate-500" />
          <button type="submit" disabled={sending} className="ui-button-primary min-h-10 px-3" aria-label={sending ? "Sending reply" : "Send reply"}><Send size={15} />{sending ? "Sending" : "Send"}</button>
        </div>
      </form>
    </section>
  );
}
