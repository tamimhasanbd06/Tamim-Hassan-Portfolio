"use client";

import type { IconType } from "react-icons";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaArrowRight,
  FaBolt,
  FaCalculator,
  FaCheck,
  FaCompass,
  FaExternalLinkAlt,
  FaGithub,
  FaImages,
  FaLayerGroup,
  FaMusic,
  FaSearch,
  FaStar,
  FaStickyNote,
  FaTachometerAlt,
  FaTimes,
  FaVideo,
} from "react-icons/fa";

type AppCategory = "Utility" | "Productivity" | "Network" | "Media";
type AppFilter = "All" | AppCategory;

type AppItem = {
  id: number;
  name: string;
  slug: string;
  category: AppCategory;
  icon: string;
  accent: string;
  status: string;
  featured: boolean;
  tagline: string;
  description: string;
  platform: string;
  version: string;
  highlights: string[];
  tags: string[];
  liveUrl: string | null;
  repositoryUrl: string;
};

type AccentStyle = {
  gradient: string;
  glow: string;
  text: string;
  soft: string;
  border: string;
  button: string;
};

const categories: AppFilter[] = [
  "All",
  "Utility",
  "Productivity",
  "Network",
  "Media",
];

const iconMap: Record<string, IconType> = {
  calculator: FaCalculator,
  notes: FaStickyNote,
  compass: FaCompass,
  speed: FaTachometerAlt,
  video: FaVideo,
  audio: FaMusic,
  gallery: FaImages,
};

const accentStyles: Record<string, AccentStyle> = {
  cyan: {
    gradient: "from-blue-500 via-cyan-400 to-teal-300",
    glow: "bg-cyan-400/25",
    text: "text-cyan-300",
    soft: "bg-cyan-400/10",
    border: "group-hover:border-cyan-400/50",
    button: "from-blue-600 via-cyan-500 to-teal-400 shadow-cyan-500/25",
  },
  violet: {
    gradient: "from-violet-600 via-fuchsia-500 to-pink-400",
    glow: "bg-violet-500/25",
    text: "text-violet-300",
    soft: "bg-violet-400/10",
    border: "group-hover:border-violet-400/50",
    button: "from-violet-600 via-fuchsia-500 to-pink-500 shadow-violet-500/25",
  },
  emerald: {
    gradient: "from-emerald-500 via-teal-400 to-cyan-300",
    glow: "bg-emerald-400/25",
    text: "text-emerald-300",
    soft: "bg-emerald-400/10",
    border: "group-hover:border-emerald-400/50",
    button: "from-emerald-600 via-teal-500 to-cyan-400 shadow-emerald-500/25",
  },
  blue: {
    gradient: "from-indigo-600 via-blue-500 to-cyan-400",
    glow: "bg-blue-500/25",
    text: "text-blue-300",
    soft: "bg-blue-400/10",
    border: "group-hover:border-blue-400/50",
    button: "from-indigo-600 via-blue-500 to-cyan-400 shadow-blue-500/25",
  },
  pink: {
    gradient: "from-pink-600 via-fuchsia-500 to-violet-400",
    glow: "bg-pink-500/25",
    text: "text-pink-300",
    soft: "bg-pink-400/10",
    border: "group-hover:border-pink-400/50",
    button: "from-pink-600 via-fuchsia-500 to-violet-500 shadow-pink-500/25",
  },
  orange: {
    gradient: "from-orange-500 via-rose-500 to-pink-400",
    glow: "bg-orange-500/25",
    text: "text-orange-300",
    soft: "bg-orange-400/10",
    border: "group-hover:border-orange-400/50",
    button: "from-orange-600 via-rose-500 to-pink-500 shadow-orange-500/25",
  },
  indigo: {
    gradient: "from-indigo-600 via-violet-500 to-cyan-400",
    glow: "bg-indigo-500/25",
    text: "text-indigo-300",
    soft: "bg-indigo-400/10",
    border: "group-hover:border-indigo-400/50",
    button: "from-indigo-600 via-violet-500 to-cyan-400 shadow-indigo-500/25",
  },
};

function AppCard({
  app,
  index,
  onExplore,
}: {
  app: AppItem;
  index: number;
  onExplore: (app: AppItem) => void;
}) {
  const accent = accentStyles[app.accent] ?? accentStyles.cyan;
  const Icon = iconMap[app.icon] ?? FaLayerGroup;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.25) }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#050b14]/95 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-[#081222] hover:shadow-[0_30px_70px_rgba(0,0,0,0.6)] sm:p-7 ${accent.border} ${
        app.featured ? "lg:col-span-2" : ""
      }`}
    >
      {/* Decorative Blur and Accent Line */}
      <div className={`pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl transition-all duration-700 group-hover:scale-125 ${accent.glow}`} />
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accent.gradient}`} />

      <div>
        <div className="relative flex items-start justify-between gap-4">
          <div className={`rounded-2xl bg-gradient-to-br p-px ${accent.gradient}`}>
            <div className="flex h-16 w-16 items-center justify-center rounded-[15px] bg-[#02060c] text-2xl text-white shadow-inner sm:h-18 sm:w-18 sm:text-[28px]">
              <Icon aria-hidden="true" />
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="font-mono text-[11px] font-bold tracking-[1.5px] text-white/30">
              APP {String(index + 1).padStart(2, "0")}
            </span>
            <span className={`inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[1.2px] ${accent.soft} ${accent.text}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
              {app.status}
            </span>
          </div>
        </div>

        <div className="relative mt-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[11px] font-bold uppercase tracking-[1.8px] ${accent.text}`}>
              {app.category}
            </span>
            {app.featured && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[1px] text-amber-300 border border-amber-400/20">
                <FaStar aria-hidden="true" className="text-[9px]" /> Featured
              </span>
            )}
          </div>

          <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-[26px]">
            {app.name}
          </h2>
          <p className="mt-1.5 text-xs font-medium text-slate-400">{app.tagline}</p>
          <p className="mt-3.5 text-sm leading-relaxed text-slate-400 line-clamp-3">{app.description}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {app.tags.slice(0, app.featured ? 4 : 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 text-[11px] font-medium text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2 pt-4 border-t border-white/[0.06]">
        <button
          type="button"
          onClick={() => onExplore(app)}
          className={`group/button flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 ${accent.button}`}
        >
          Explore App
          <FaArrowRight aria-hidden="true" className="transition-transform duration-300 group-hover/button:translate-x-1" />
        </button>

        <a
          href={app.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-bold text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
        >
          <FaGithub aria-hidden="true" />
          GitHub
        </a>
      </div>
    </motion.article>
  );
}

function AppDetails({ app, onClose }: { app: AppItem; onClose: () => void }) {
  const accent = accentStyles[app.accent] ?? accentStyles.cyan;
  const Icon = iconMap[app.icon] ?? FaLayerGroup;

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="app-details-title"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[32px] border border-white/10 bg-[#060e1b] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.8)] sm:p-8"
      >
        <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accent.gradient}`} />
        <div className={`pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl ${accent.glow}`} />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close app details"
          className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-slate-400 transition hover:border-white/20 hover:text-white"
        >
          <FaTimes aria-hidden="true" />
        </button>

        <div className="flex flex-col gap-5 pr-10 sm:flex-row sm:items-center">
          <div className={`w-fit rounded-2xl bg-gradient-to-br p-px ${accent.gradient}`}>
            <div className="flex h-20 w-20 items-center justify-center rounded-[15px] bg-[#02060c] text-3xl text-white">
              <Icon aria-hidden="true" />
            </div>
          </div>

          <div>
            <p className={`text-xs font-bold uppercase tracking-[2px] ${accent.text}`}>
              {app.category} · {app.status}
            </p>
            <h2 id="app-details-title" className="mt-1 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {app.name}
            </h2>
            <p className="mt-1 text-xs font-medium text-slate-400">{app.tagline}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            ["Platform", app.platform],
            ["Version", app.version],
            ["Stage", app.status],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-3.5 text-center">
              <span className="block text-[10px] font-bold uppercase tracking-[1px] text-slate-500">
                {label}
              </span>
              <strong className="mt-1 block text-xs sm:text-sm font-bold text-white">{value}</strong>
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm leading-relaxed text-slate-300">
          {app.description}
        </p>

        <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {app.highlights.map((highlight) => (
            <div
              key={highlight}
              className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs font-medium text-slate-300"
            >
              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] ${accent.soft} ${accent.text}`}>
                <FaCheck aria-hidden="true" />
              </span>
              {highlight}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {app.liveUrl ? (
            <a
              href={app.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 ${accent.button}`}
            >
              <FaExternalLinkAlt aria-hidden="true" /> Live Preview
            </a>
          ) : (
            <a
              href={`mailto:tamimhasanbd06@gmail.com?subject=${encodeURIComponent(`Interested in ${app.name}`)}`}
              className={`flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 ${accent.button}`}
            >
              <FaBolt aria-hidden="true" /> Discuss This App
            </a>
          )}

          <a
            href={app.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06]"
          >
            <FaGithub aria-hidden="true" /> Visit GitHub
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MyApps() {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<AppFilter>("All");
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadApps() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const response = await fetch("/myapps.json", { signal: controller.signal });
        if (!response.ok) throw new Error("The app collection could not be loaded.");
        const data: unknown = await response.json();
        if (!Array.isArray(data)) throw new Error("The app data format is invalid.");
        setApps(data as AppItem[]);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setLoadError(error instanceof Error ? error.message : "Something went wrong.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    loadApps();
    return () => controller.abort();
  }, [reloadKey]);

  useEffect(() => {
    if (!selectedApp) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedApp(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedApp]);

  const filteredApps = useMemo(() => {
    const query = search.trim().toLowerCase();
    return apps.filter((app) => {
      const matchesCategory = filter === "All" || app.category === filter;
      const searchableText = [
        app.name,
        app.tagline,
        app.description,
        app.category,
        ...app.tags,
        ...app.highlights,
      ]
        .join(" ")
        .toLowerCase();
      return matchesCategory && searchableText.includes(query);
    });
  }, [apps, filter, search]);

  const categoryCount = new Set(apps.map((app) => app.category)).size;

  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-4 pb-24 pt-12 sm:px-6 lg:px-12">
      {/* Background Gradients & Grid Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(37,99,235,0.12),transparent_35%),radial-gradient(circle_at_85%_30%,rgba(6,182,212,0.1),transparent_35%),linear-gradient(180deg,#02060c_0%,#000000_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:60px_60px]" />

      <div className="relative mx-auto w-full max-w-[1400px]">
        {/* Header Section */}
        <div className="grid items-end gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[2px] text-cyan-300">
              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              Tamim&apos;s Digital Product Studio
            </div>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Small tools.{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                Big usefulness.
              </span>
            </h1>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-slate-400">
              A growing collection of focused apps designed by Tamim Hasan to make everyday digital tasks faster, clearer, and more enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3 backdrop-blur-xl">
            {[
              [String(apps.length || 7).padStart(2, "0"), "Apps"],
              [String(categoryCount || 4).padStart(2, "0"), "Categories"],
              ["100%", "Actions"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-xl border border-white/[0.05] bg-black/20 p-3.5 text-center">
                <strong className="block text-xl font-extrabold text-white">{value}</strong>
                <span className="mt-1 block text-[10px] font-bold uppercase tracking-[1px] text-slate-500">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="sticky top-6 z-40 mt-10 rounded-2xl border border-white/[0.08] bg-[#040812]/90 p-3 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <div className="relative flex-1">
              <label htmlFor="app-search" className="sr-only">Search apps</label>
              <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-500" />
              <input
                id="app-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search apps, tools, or features..."
                className="min-h-11 w-full rounded-xl border border-white/[0.08] bg-black/40 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
              />
            </div>

            <div className="flex gap-1.5 overflow-x-auto pb-1 xl:pb-0 scrollbar-none">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  className={`min-h-10 shrink-0 rounded-lg px-3.5 py-2 text-xs font-bold transition-all duration-300 ${
                    filter === category
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20"
                      : "border border-white/[0.06] bg-white/[0.02] text-slate-400 hover:border-cyan-400/25 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* App Count & Reset Controls */}
        {!isLoading && !loadError && (
          <div className="mb-4 mt-6 flex items-center justify-between gap-4">
            <p className="text-xs font-bold uppercase tracking-[1.5px] text-slate-500">
              Showing {filteredApps.length} {filteredApps.length === 1 ? "app" : "apps"}
            </p>
            {(search || filter !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setFilter("All");
                }}
                className="text-xs font-bold text-cyan-300 transition hover:text-cyan-200"
              >
                Reset filters
              </button>
            )}
          </div>
        )}

        {/* Dynamic Display Layout */}
        {isLoading ? (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3" aria-label="Loading apps">
            {Array.from({ length: 7 }, (_, index) => (
              <div key={index} className="h-[400px] animate-pulse rounded-[28px] border border-white/[0.06] bg-white/[0.02]" />
            ))}
          </div>
        ) : loadError ? (
          <div className="mt-6 rounded-3xl border border-red-500/20 bg-red-500/[0.03] p-12 text-center">
            <h2 className="text-xl font-bold text-white">The app collection could not load</h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">{loadError}</p>
            <button
              type="button"
              onClick={() => setReloadKey((value) => value + 1)}
              className="mt-5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-xs font-bold text-white"
            >
              Try Again
            </button>
          </div>
        ) : filteredApps.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredApps.map((app, index) => (
                <AppCard key={app.id} app={app} index={index} onExplore={setSelectedApp} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-12 text-center">
            <h2 className="text-xl font-bold text-white">No matching apps</h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-400">Try a different keyword or category.</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilter("All");
              }}
              className="mt-5 rounded-xl bg-cyan-400/10 px-5 py-2.5 text-xs font-bold text-cyan-300 border border-cyan-400/20"
            >
              Show all apps
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedApp && <AppDetails app={selectedApp} onClose={() => setSelectedApp(null)} />}
      </AnimatePresence>
    </section>
  );
}