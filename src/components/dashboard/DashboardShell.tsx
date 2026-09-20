"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { BarChart3, BookOpen, BriefcaseBusiness, ChevronRight, Code2, Cpu, FolderKanban, GraduationCap, LogOut, Menu, MessageCircleQuestion, PanelsTopLeft, Sparkles, Wrench, X } from "lucide-react";

const nav = [
  ["/dashboard/overview", "Overview", BarChart3],
  ["/dashboard/posts", "My Posts", BookOpen],
  ["/dashboard/projects", "Projects", FolderKanban],
  ["/dashboard/skills", "Skills", Code2],
  ["/dashboard/education", "Education", GraduationCap],
  ["/dashboard/experience", "Experience", BriefcaseBusiness],
  ["/dashboard/courses", "Courses & Certifications", Sparkles],
  ["/dashboard/ai-stack", "AI Stack", Cpu],
  ["/dashboard/developer-toolkit", "Developer Toolkit", Wrench],
  ["/dashboard/my-toolkit", "My Toolkit", PanelsTopLeft],
  ["/dashboard/website-process", "How I Build Websites", ChevronRight],
  ["/dashboard/contact", "Contact", MessageCircleQuestion],
  ["/dashboard/questions", "Have Questions?", MessageCircleQuestion],
  ["/dashboard/services", "Services", Wrench],
  ["/dashboard/what-i-can-do", "What I Can Do", Code2],
  ["/dashboard/tech-stack", "Tech Stack", Cpu],
  ["/dashboard/get-in-touch", "Get In Touch", MessageCircleQuestion],
] as const;

export default function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  async function logout() { await fetch("/api/auth/logout", { method: "POST" }); router.replace("/login"); router.refresh(); }
  return (
    <div className="min-h-screen bg-[#010711] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,.08),transparent_30%),linear-gradient(180deg,#01030a,#020817_45%,#010711)]" />
      <button onClick={() => setOpen(true)} className="fixed left-4 top-4 z-40 rounded-xl border border-white/10 bg-slate-950/80 p-2.5 lg:hidden" aria-label="Open dashboard menu"><Menu className="h-5 w-5" /></button>
      {open && <button className="fixed inset-0 z-40 bg-black/70 lg:hidden" onClick={() => setOpen(false)} aria-label="Close dashboard menu" />}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-white/10 bg-[#030a18]/95 p-4 backdrop-blur-xl transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-5 flex items-center justify-between px-2 py-2"><div><p className="text-xs font-bold uppercase tracking-[.25em] text-cyan-300">Tamim Hasan</p><h1 className="mt-1 text-xl font-black">Dashboard</h1></div><button className="lg:hidden" onClick={() => setOpen(false)}><X /></button></div>
        <nav className="space-y-1 overflow-y-auto pb-24">
          {nav.map(([href, label, Icon]) => {
            const active = pathname === href;
            return <Link key={href} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${active ? "border border-cyan-400/20 bg-cyan-400/10 text-cyan-200" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}><Icon className="h-4 w-4" />{label}</Link>;
          })}
        </nav>
        <button onClick={logout} className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-200"><LogOut className="h-4 w-4" />Logout</button>
      </aside>
      <main className="min-h-screen px-4 pb-16 pt-20 sm:px-6 lg:ml-72 lg:px-8 lg:pt-8">{children}</main>
    </div>
  );
}
