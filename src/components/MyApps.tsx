"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  FaCalculator,
  FaCheck,
  FaCompass,
  FaExternalLinkAlt,
  FaGithub,
  FaImages,
  FaMusic,
  FaSearch,
  FaStickyNote,
  FaTachometerAlt,
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
  description: string;
  highlights: string[];
  live: string | null;
  code: string | null;
};

type AccentStyle = {
  gradient: string;
  glow: string;
  text: string;
  border: string;
  soft: string;
};

const iconMap: Record<string, ReactNode> = {
  calculator: <FaCalculator />,
  notes: <FaStickyNote />,
  compass: <FaCompass />,
  speed: <FaTachometerAlt />,
  video: <FaVideo />,
  audio: <FaMusic />,
  gallery: <FaImages />,
};

const accentStyles: Record<string, AccentStyle> = {
  cyan: {
    gradient: "from-blue-500 via-cyan-400 to-cyan-200",
    glow: "bg-cyan-400/20",
    text: "text-cyan-300",
    border: "group-hover:border-cyan-400/40",
    soft: "bg-cyan-400/10",
  },
  violet: {
    gradient: "from-violet-600 via-indigo-500 to-blue-400",
    glow: "bg-violet-500/20",
    text: "text-violet-300",
    border: "group-hover:border-violet-400/40",
    soft: "bg-violet-400/10",
  },
  emerald: {
    gradient: "from-emerald-500 via-teal-400 to-cyan-300",
    glow: "bg-emerald-400/20",
    text: "text-emerald-300",
    border: "group-hover:border-emerald-400/40",
    soft: "bg-emerald-400/10",
  },
  blue: {
    gradient: "from-indigo-600 via-blue-500 to-cyan-400",
    glow: "bg-blue-500/20",
    text: "text-blue-300",
    border: "group-hover:border-blue-400/40",
    soft: "bg-blue-400/10",
  },
  pink: {
    gradient: "from-pink-600 via-fuchsia-500 to-violet-400",
    glow: "bg-pink-500/20",
    text: "text-pink-300",
    border: "group-hover:border-pink-400/40",
    soft: "bg-pink-400/10",
  },
  orange: {
    gradient: "from-orange-500 via-rose-500 to-pink-400",
    glow: "bg-orange-500/20",
    text: "text-orange-300",
    border: "group-hover:border-orange-400/40",
    soft: "bg-orange-400/10",
  },
  indigo: {
    gradient: "from-indigo-600 via-violet-500 to-cyan-400",
    glow: "bg-indigo-500/20",
    text: "text-indigo-300",
    border: "group-hover:border-indigo-400/40",
    soft: "bg-indigo-400/10",
  },
};

const categories: AppFilter[] = [
  "All",
  "Utility",
  "Productivity",
  "Network",
  "Media",
];

function AppAction({
  href,
  label,
  primary = false,
}: {
  href: string | null;
  label: "Live Site" | "Source Code";
  primary?: boolean;
}) {
  const Icon = label === "Live Site" ? FaExternalLinkAlt : FaGithub;
  const className = primary
    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/10"
    : "border border-white/10 bg-white/[0.05] text-gray-300";

  if (!href) {
    return (
      <button
        type="button"
        disabled
        title={`${label} will be available after release`}
        className={`flex min-h-12 flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-bold opacity-40 ${className}`}
      >
        <Icon aria-hidden="true" />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-bold transition duration-300 hover:-translate-y-1 ${className}`}
    >
      <Icon aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}

function AppCard({ app, index }: { app: AppItem; index: number }) {
  const accent = accentStyles[app.accent] ?? accentStyles.cyan;

  return (
    <article
      className={`group relative flex min-h-[430px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#07101d]/90 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:shadow-[0_32px_90px_rgba(0,100,255,0.16)] sm:p-6 ${accent.border}`}
    >
      <div className={`absolute -right-16 -top-20 h-48 w-48 rounded-full blur-3xl transition duration-500 group-hover:scale-125 ${accent.glow}`} />
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accent.gradient}`} />

      <div className="relative flex items-start justify-between gap-4">
        <div className={`rounded-2xl bg-gradient-to-br p-px ${accent.gradient}`}>
          <div className="flex h-16 w-16 items-center justify-center rounded-[15px] bg-[#030914] text-3xl text-white shadow-inner">
            {iconMap[app.icon] ?? <FaCalculator />}
          </div>
        </div>

        <div className="text-right">
          <span className="block font-mono text-xs font-black text-white/20">
            APP / {String(index + 1).padStart(2, "0")}
          </span>
          <span className={`mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[1.4px] ${accent.soft} ${accent.text}`}>
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
            {app.status}
          </span>
        </div>
      </div>

      <div className="relative mt-7 flex flex-1 flex-col">
        <p className={`text-[10px] font-black uppercase tracking-[2px] ${accent.text}`}>
          {app.category}
        </p>

        <h2 className="mt-2 text-2xl font-black tracking-tight text-white transition group-hover:text-cyan-100">
          {app.name}
        </h2>

        <p className="mt-4 text-sm leading-7 text-slate-400">
          {app.description}
        </p>

        <ul className="mt-5 space-y-2.5">
          {app.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-3 text-xs leading-5 text-slate-500"
            >
              <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[7px] ${accent.soft} ${accent.text}`}>
                <FaCheck aria-hidden="true" />
              </span>
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex gap-2 pt-7">
          <AppAction href={app.live} label="Live Site" primary />
          <AppAction href={app.code} label="Source Code" />
        </div>
      </div>
    </article>
  );
}

export default function MyApps() {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<AppFilter>("All");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadApps = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const response = await fetch("/myapps.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("App data could not be loaded.");
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("App data has an invalid format.");
        }

        setApps(data as AppItem[]);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setLoadError(
          error instanceof Error
            ? error.message
            : "App data could not be loaded.",
        );
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    loadApps();

    return () => controller.abort();
  }, [reloadKey]);

  const filteredApps = useMemo(() => {
    const query = search.trim().toLowerCase();

    return apps.filter((app) => {
      const matchesCategory = filter === "All" || app.category === filter;
      const matchesSearch =
        app.name.toLowerCase().includes(query) ||
        app.description.toLowerCase().includes(query) ||
        app.highlights.some((highlight) =>
          highlight.toLowerCase().includes(query),
        );

      return matchesCategory && matchesSearch;
    });
  }, [apps, filter, search]);

  const releasedApps = apps.filter((app) => app.live).length;

  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-4 pb-24 pt-16 sm:px-6 sm:pt-20 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(37,99,235,0.15),transparent_28%),radial-gradient(circle_at_90%_35%,rgba(6,182,212,0.12),transparent_30%),linear-gradient(135deg,#000000_0%,#020817_50%,#000000_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[2px] text-cyan-300 sm:text-xs sm:tracking-[3px]">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.9)]" />
              Tamim&apos;s Product Laboratory
            </div>

            <h1 className="mt-7 text-5xl font-black leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Useful ideas.
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
                Built as apps.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              A dedicated collection of utility, productivity, network, and
              media products designed around clarity, speed, and responsive
              user experiences.
            </p>
          </div>

          <div className="grid w-full grid-cols-3 gap-2 lg:w-[340px]">
            {[
              [String(apps.length || 7).padStart(2, "0"), "Products"],
              [String(releasedApps).padStart(2, "0"), "Released"],
              ["04", "Categories"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-4 text-center backdrop-blur-xl"
              >
                <strong className="block text-xl font-black text-white sm:text-2xl">
                  {value}
                </strong>
                <span className="mt-1 block text-[9px] font-bold uppercase tracking-[1px] text-slate-600">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 rounded-3xl border border-white/10 bg-[#07101d]/70 p-3 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <label htmlFor="app-search" className="sr-only">
                Search apps
              </label>
              <FaSearch className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-sm text-slate-600" />
              <input
                id="app-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search the product laboratory..."
                className="min-h-12 w-full rounded-2xl border border-white/10 bg-black/35 py-3 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-cyan-400/35 focus:ring-2 focus:ring-cyan-400/10"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  className={`min-h-11 shrink-0 rounded-xl px-4 py-2 text-xs font-bold transition duration-300 ${
                    filter === category
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
                      : "border border-white/10 bg-white/[0.04] text-slate-500 hover:border-cyan-400/25 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {!isLoading && !loadError && (
          <div className="mb-6 mt-8 flex items-center justify-between gap-4">
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-slate-600 sm:text-xs">
              {filteredApps.length} {filteredApps.length === 1 ? "product" : "products"}
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

        {isLoading ? (
          <div className="mt-8 grid grid-cols-1 gap-5 min-[440px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" aria-label="Loading apps">
            {Array.from({ length: 7 }, (_, index) => (
              <div
                key={index}
                className="h-[430px] animate-pulse rounded-[28px] border border-white/10 bg-white/[0.04]"
              />
            ))}
          </div>
        ) : loadError ? (
          <div className="mt-8 rounded-3xl border border-red-400/20 bg-red-400/5 px-6 py-20 text-center">
            <h2 className="text-2xl font-black text-white">
              The app collection could not load
            </h2>
            <p className="mt-3 text-sm text-slate-500">{loadError}</p>
            <button
              type="button"
              onClick={() => setReloadKey((value) => value + 1)}
              className="mt-6 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white"
            >
              Try Again
            </button>
          </div>
        ) : filteredApps.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 min-[440px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {filteredApps.map((app, index) => (
              <AppCard key={app.id} app={app} index={index} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-20 text-center">
            <h2 className="text-2xl font-black text-white">No apps found</h2>
            <p className="mt-3 text-sm text-slate-500">
              Try a different search term or category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilter("All");
              }}
              className="mt-6 rounded-xl bg-blue-500/20 px-6 py-3 text-sm font-bold text-blue-300"
            >
              View all apps
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
