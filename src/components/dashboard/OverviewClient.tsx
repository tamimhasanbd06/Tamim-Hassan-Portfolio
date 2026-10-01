"use client";

import { useCallback, useEffect, useState } from "react";
import { Mail, RefreshCw, ScrollText } from "lucide-react";

export default function OverviewClient() {
  const [posts, setPosts] = useState<number | null>(null);
  const [messages, setMessages] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [postResponse, messageResponse] = await Promise.all([
        fetch("/api/posts", { cache: "no-store" }),
        fetch("/api/messages", { cache: "no-store" }),
      ]);
      const [postData, messageData] = await Promise.all([postResponse.json(), messageResponse.json()]);
      if (!postResponse.ok || !messageResponse.ok) throw new Error("Live dashboard metrics are temporarily unavailable.");
      setPosts(Array.isArray(postData.posts) ? postData.posts.length : 0);
      setMessages(Array.isArray(messageData.messages) ? messageData.messages.length : 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Live dashboard metrics are temporarily unavailable.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    const handler = () => void load();
    window.addEventListener("dashboard-refresh", handler);
    return () => window.removeEventListener("dashboard-refresh", handler);
  }, [load]);

  if (error) {
    return <div className="dash-card flex flex-wrap items-center justify-between gap-4 p-5"><p className="text-sm text-amber-200">{error}</p><button type="button" onClick={() => void load()} className="ui-button-secondary"><RefreshCw size={16} />Retry</button></div>;
  }

  const cards = [
    { label: "Total Posts", value: posts, icon: ScrollText, className: "text-cyan-300" },
    { label: "Total Messages", value: messages, icon: Mail, className: "text-blue-300" },
  ];

  return <div className="grid gap-4 sm:grid-cols-2" aria-busy={loading}>{cards.map(({ label, value, icon: Icon, className }) => <div key={label} className="dash-card p-5"><div className="flex items-center justify-between"><span className="text-sm text-slate-400">{label}</span><Icon className={className} size={20} /></div><p className="mt-3 text-3xl font-black">{loading ? "—" : value ?? 0}</p></div>)}</div>;
}
