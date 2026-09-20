"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Braces, Download, Grid2X2, Plus, RefreshCw, Search, Trash2, Upload, X } from "lucide-react";
import MainLoader from "@/components/common/MainLoader";

type Row = {
  id: string;
  sourceKey: string;
  data: Record<string, unknown>;
  sortOrder: number;
  visible: boolean;
  featured: boolean;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

type SortMode = "order" | "az" | "newest" | "updated";
type StatusFilter = "all" | "published" | "draft" | "inactive";

function pretty(value: unknown) {
  return typeof value === "string" ? value : JSON.stringify(value, null, 2);
}

function parseValue(value: string, original: unknown) {
  if (Array.isArray(original) || (original && typeof original === "object")) {
    try { return JSON.parse(value); } catch { return value; }
  }
  if (typeof original === "number") {
    const n = Number(value);
    return Number.isFinite(n) ? n : value;
  }
  if (typeof original === "boolean") return value === "true";
  return value;
}

function rowTitle(row: Row) {
  const data = row.data;
  return String(data.name || data.title || data.institution || data.company || data.label || data.question || row.sourceKey);
}

function rowDescription(row: Row) {
  const data = row.data;
  return String(data.description || data.summary || data.full || data.subtitle || data.category || row.sourceKey);
}

export default function SectionManager({ section, label }: { section: string; label: string }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Row | null>(null);
  const [draft, setDraft] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [jsonMode, setJsonMode] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("order");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  async function load() {
    setLoading(true); setError("");
    try {
      const response = await fetch(`/api/content/${section}?admin=1`, { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Load failed");
      setRows(data.items || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Load failed");
    } finally { setLoading(false); }
  }

  useEffect(() => { void load(); }, [section]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = rows.filter((row) => {
      const matchesQuery = !q || JSON.stringify(row.data).toLowerCase().includes(q) || row.sourceKey.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || row.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
    return [...result].sort((a, b) => {
      if (sortMode === "az") return rowTitle(a).localeCompare(rowTitle(b));
      if (sortMode === "newest") return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      if (sortMode === "updated") return new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime();
      return a.sortOrder - b.sortOrder;
    });
  }, [rows, query, sortMode, statusFilter]);

  function openCreate() {
    const row: Row = { id: "", sourceKey: "", data: { name: "", description: "" }, sortOrder: rows.length, visible: true, featured: false, status: "published" };
    setEditing(row); setDraft({ ...row.data });
  }

  function openEdit(row: Row) {
    setEditing(row);
    setDraft(structuredClone(row.data));
  }

  async function save() {
    if (!editing) return;
    setSaving(true); setNotice("");
    try {
      const url = editing.id ? `/api/content/${section}/${editing.id}` : `/api/content/${section}`;
      const response = await fetch(url, {
        method: editing.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: draft, sourceKey: editing.sourceKey || undefined, sortOrder: editing.sortOrder, visible: editing.visible, featured: editing.featured, status: editing.status }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Save failed");
      setEditing(null); setNotice(editing.id ? `${label} updated successfully.` : `${label} created successfully.`);
      await load();
    } catch (e) { setNotice(e instanceof Error ? e.message : "Save failed"); }
    finally { setSaving(false); }
  }

  async function remove(row: Row) {
    if (!window.confirm(`Delete this ${label} record? This action cannot be undone.`)) return;
    const response = await fetch(`/api/content/${section}/${row.id}`, { method: "DELETE" });
    const data = await response.json();
    if (!response.ok) { setNotice(data.message || "Delete failed"); return; }
    setNotice(`${label} deleted successfully.`); await load();
  }

  async function deleteAll() {
    if (!rows.length) return;
    const typed = window.prompt(`This will permanently delete ALL ${rows.length} ${label} records. Type DELETE ALL to continue.`);
    if (typed !== "DELETE ALL") return;
    const response = await fetch(`/api/content/${section}/bulk`, { method: "DELETE" });
    const data = await response.json();
    if (!response.ok) { setNotice(data.message || "Delete all failed"); return; }
    setNotice(`Deleted ${data.deleted || rows.length} ${label} records.`); await load();
  }

  async function importFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const format = file.name.toLowerCase().endsWith(".csv") ? "csv" : "json";
    const content = await file.text();
    const response = await fetch(`/api/content/${section}/import`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ format, content }) });
    const data = await response.json();
    setNotice(response.ok ? `Imported ${data.imported}. Duplicates: ${data.duplicates}. Invalid: ${data.invalid}.` : data.message || "Import failed");
    if (response.ok) await load();
    event.target.value = "";
  }

  if (loading) return <MainLoader />;

  return (
    <section className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.3em] text-cyan-300">Content Management</p>
          <h2 className="mt-2 text-3xl font-black text-white">{label}</h2>
          <p className="mt-2 text-sm text-slate-400">Live API/database records. Changes are persisted before the UI refreshes.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setJsonMode((v) => !v)} className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm text-cyan-200">{jsonMode ? <Grid2X2 className="mr-2 inline h-4 w-4" /> : <Braces className="mr-2 inline h-4 w-4" />}{jsonMode ? "Cards" : "JSON"}</button>
          <label className="cursor-pointer rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm"><Upload className="mr-2 inline h-4 w-4" />Import<input type="file" accept=".json,.csv" className="hidden" onChange={importFile} /></label>
          <a href={`/api/content/${section}/export?format=json`} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm"><Download className="mr-2 inline h-4 w-4" />Export</a>
          <button onClick={deleteAll} className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm text-red-200"><Trash2 className="mr-2 inline h-4 w-4" />Delete All</button>
          <button onClick={openCreate} className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-sm font-bold"><Plus className="mr-2 inline h-4 w-4" />Add</button>
        </div>
      </div>

      {notice && <div className="mt-5 rounded-xl border border-cyan-400/15 bg-cyan-400/5 px-4 py-3 text-sm text-cyan-100">{notice}</div>}
      {error ? <div className="mt-6 rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-red-200">{error}<button onClick={load} className="ml-3"><RefreshCw className="inline h-4 w-4" /> Retry</button></div> : (
        <>
          <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_190px_170px]">
            <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" /><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder={`Search ${label.toLowerCase()}...`} className="w-full rounded-xl border border-white/10 bg-white/[.035] py-3 pl-10 pr-4 outline-none focus:border-cyan-400/40" /></div>
            <select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value as StatusFilter)} className="rounded-xl border border-white/10 bg-[#071020] px-3 py-3"><option value="all">All statuses</option><option value="published">Published</option><option value="draft">Draft</option><option value="inactive">Inactive</option></select>
            <select value={sortMode} onChange={(e)=>setSortMode(e.target.value as SortMode)} className="rounded-xl border border-white/10 bg-[#071020] px-3 py-3"><option value="order">Custom order</option><option value="az">Alphabetical</option><option value="newest">Newest</option><option value="updated">Recently updated</option></select>
          </div>

          {jsonMode ? (
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/25">
              <div className="border-b border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-[.25em] text-cyan-300">Live database/API view</div>
              <pre className="max-h-[70vh] overflow-auto p-5 text-xs leading-6 text-slate-300">{JSON.stringify(filtered, null, 2)}</pre>
            </div>
          ) : filtered.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-white/10 p-10 text-center text-slate-400">No records found. <button onClick={openCreate} className="ml-2 text-cyan-300">Add one</button></div>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((row) => (
                <article key={row.id} onClick={()=>openEdit(row)} className="group cursor-pointer rounded-2xl border border-white/10 bg-gradient-to-br from-white/[.05] to-cyan-400/[.025] p-5 transition hover:-translate-y-0.5 hover:border-cyan-400/30 hover:shadow-[0_18px_60px_rgba(6,182,212,.08)]">
                  <div className="flex items-start justify-between gap-4"><div className="min-w-0"><p className="truncate text-lg font-bold text-white">{rowTitle(row)}</p><p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{rowDescription(row)}</p></div><span className={`rounded-full border px-2.5 py-1 text-[] font-bold uppercase ${row.status === "published" ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-200" : "border-amber-400/20 bg-amber-400/10 text-amber-200"}`}>{row.status}</span></div>
                  <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-500"><span>Order {row.sortOrder}</span><span>•</span><span>{row.visible ? "Visible" : "Hidden"}</span>{row.featured && <><span>•</span><span className="text-cyan-300">Featured</span></>}</div>
                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4"><span className="text-xs text-slate-500">Click card to edit</span><button onClick={(event)=>{event.stopPropagation();void remove(row);}} className="rounded-lg border border-red-400/20 px-3 py-1.5 text-red-200"><Trash2 className="inline h-4 w-4" /></button></div>
                </article>
              ))}
            </div>
          )}
        </>
      )}

      {editing && <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"><div className="mx-auto my-8 max-w-3xl rounded-2xl border border-white/10 bg-[#071020] p-5 shadow-2xl"><div className="flex items-center justify-between"><h3 className="text-xl font-black">{editing.id ? "Edit" : "Create"} {label}</h3><button onClick={()=>setEditing(null)}><X /></button></div><div className="mt-5 grid gap-4 sm:grid-cols-2">{Object.entries(draft).map(([key,value])=><label key={key} className={typeof value === "string" && String(value).length > 120 ? "sm:col-span-2" : ""}><span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">{key}</span>{typeof value === "boolean" ? <select value={String(value)} onChange={(e)=>setDraft((d)=>({...d,[key]:e.target.value === "true"}))} className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5"><option value="true">True</option><option value="false">False</option></select> : <textarea rows={Array.isArray(value) || (value && typeof value === "object") || String(value).length > 120 ? 4 : 1} value={pretty(value)} onChange={(e)=>setDraft((d)=>({...d,[key]:parseValue(e.target.value,value)}))} className="w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2.5 outline-none focus:border-cyan-400/40" />}</label>)}</div><button onClick={()=>setDraft((d)=>({...d,[`field_${Object.keys(d).length+1}`]:""}))} className="mt-4 text-sm text-cyan-300">+ Add field</button><div className="mt-6 grid gap-3 sm:grid-cols-4"><input type="number" value={editing.sortOrder} onChange={(e)=>setEditing({...editing,sortOrder:Number(e.target.value)})} className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2" /><select value={editing.status} onChange={(e)=>setEditing({...editing,status:e.target.value})} className="rounded-xl border border-white/10 bg-slate-950 px-3 py-2"><option value="published">Published</option><option value="draft">Draft</option><option value="inactive">Inactive</option></select><label className="flex items-center gap-2"><input type="checkbox" checked={editing.visible} onChange={(e)=>setEditing({...editing,visible:e.target.checked})} />Visible</label><label className="flex items-center gap-2"><input type="checkbox" checked={editing.featured} onChange={(e)=>setEditing({...editing,featured:e.target.checked})} />Featured</label></div><div className="mt-6 flex justify-end gap-3"><button onClick={()=>setEditing(null)} className="rounded-xl border border-white/10 px-4 py-2">Cancel</button><button disabled={saving} onClick={save} className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2 font-bold disabled:opacity-50">{saving ? "Saving..." : "Save Changes"}</button></div></div></div>}
    </section>
  );
}
