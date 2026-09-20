"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MainLoader from "@/components/common/MainLoader";

type OverviewData = {
  counts: Record<string, number>;
  postStats: { total: number; drafts: number; published: number; featured: number };
  recentPosts: Array<{ id: string; title: string; status: string; featured: boolean; createdAt: string }>;
  recentProjects: Array<{ id: string; title: string; featured: boolean; updatedAt: string }>;
};

const labels: Record<string, string> = {
  posts: "Posts",
  projects: "Projects",
  skills: "Skills",
  education: "Education",
  experience: "Experience",
  courses: "Courses",
  certifications: "Certifications",
  "ai-stack": "AI Stack",
  "developer-toolkit": "Developer Tools",
  "my-toolkit": "Toolkit Items",
  "website-process": "Website Steps",
};

export default function OverviewPage() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    try {
      const response = await fetch("/api/dashboard/overview", { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.message || "Unable to load dashboard.");
      setData(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load dashboard.");
    }
  }

  useEffect(() => { void load(); }, []);

  if (!data && !error) return <MainLoader />;

  return (
    <section className="mx-auto max-w-7xl">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[.3em] text-cyan-300">Portfolio Management</p>
        <h2 className="mt-2 text-3xl font-black sm:text-4xl">Overview</h2>
        <p className="mt-2 text-slate-400">Manage the existing portfolio from one place without changing the public design.</p>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-5 text-red-200">
          {error}
          <button onClick={load} className="ml-4 rounded-lg border border-red-300/20 px-3 py-1">Retry</button>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Object.entries(data?.counts || {})
              .filter(([key]) => labels[key])
              .map(([key, value]) => (
                <div key={key} className="rounded-2xl border border-white/10 bg-white/[.035] p-5 shadow-[0_12px_40px_rgba(0,0,0,.2)]">
                  <p className="text-sm text-slate-400">{labels[key]}</p>
                  <p className="mt-2 text-3xl font-black text-cyan-200">{value}</p>
                </div>
              ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-4">
            {[
              ["Published Posts", data?.postStats.published ?? 0],
              ["Draft Posts", data?.postStats.drafts ?? 0],
              ["Featured Posts", data?.postStats.featured ?? 0],
              ["Total Posts", data?.postStats.total ?? 0],
            ].map(([label, value]) => (
              <div key={String(label)} className="rounded-2xl border border-white/10 bg-[#071020]/70 p-4">
                <p className="text-xs uppercase tracking-wider text-slate-500">{label}</p>
                <p className="mt-2 text-2xl font-black">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[.025] p-5">
              <h3 className="font-bold">Content Distribution</h3>
              <p className="mt-1 text-xs text-slate-500">Real record counts from the current API/database state.</p>
              <div className="mt-5 space-y-3">
                {Object.entries(data?.counts || {}).filter(([key]) => ["posts","projects","skills","education","experience","courses"].includes(key)).map(([key,value]) => {
                  const max = Math.max(1, ...Object.values(data?.counts || {}));
                  return <div key={key}><div className="mb-1 flex justify-between text-xs"><span className="text-slate-400">{labels[key] || key}</span><span className="text-cyan-200">{value}</span></div><div className="h-2 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400" style={{width:`${Math.max(4,(value/max)*100)}%`}} /></div></div>
                })}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[.025] p-5">
              <h3 className="font-bold">Posts Status</h3>
              <p className="mt-1 text-xs text-slate-500">Published, draft and featured posts from the posts table.</p>
              <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
                <div className="grid h-44 w-44 place-items-center rounded-full" style={{background:`conic-gradient(#22d3ee 0 ${data?.postStats.total ? (data.postStats.published/data.postStats.total)*100 : 0}%, #3b82f6 0 100%)`}}><div className="grid h-28 w-28 place-items-center rounded-full bg-[#071020] text-center"><div><p className="text-3xl font-black">{data?.postStats.total ?? 0}</p><p className="text-[] uppercase tracking-wider text-slate-500">Total posts</p></div></div></div>
                <div className="space-y-3 text-sm"><p><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-cyan-400" />Published <strong className="ml-2 text-white">{data?.postStats.published ?? 0}</strong></p><p><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-blue-500" />Draft <strong className="ml-2 text-white">{data?.postStats.drafts ?? 0}</strong></p><p><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full border border-cyan-300" />Featured <strong className="ml-2 text-white">{data?.postStats.featured ?? 0}</strong></p></div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[.025] p-5">
              <div className="flex items-center justify-between"><h3 className="font-bold">Recent Posts</h3><Link href="/dashboard/posts" className="text-sm text-cyan-300">Manage</Link></div>
              <div className="mt-4 space-y-3">
                {(data?.recentPosts || []).length ? data?.recentPosts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/10 px-4 py-3">
                    <div className="min-w-0"><p className="truncate font-semibold">{post.title}</p><p className="mt-1 text-xs text-slate-500">{post.status}{post.featured ? " · Featured" : ""}</p></div>
                    <span className="text-xs text-slate-600">{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                )) : <p className="py-6 text-center text-sm text-slate-500">No posts found.</p>}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[.025] p-5">
              <div className="flex items-center justify-between"><h3 className="font-bold">Recent Projects</h3><Link href="/dashboard/projects" className="text-sm text-cyan-300">Manage</Link></div>
              <div className="mt-4 space-y-3">
                {(data?.recentProjects || []).length ? data?.recentProjects.map((project) => (
                  <div key={project.id} className="rounded-xl border border-white/10 bg-black/10 px-4 py-3">
                    <p className="truncate font-semibold">{project.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{project.featured ? "Featured project" : "Project"}</p>
                  </div>
                )) : <p className="py-6 text-center text-sm text-slate-500">No projects found.</p>}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
