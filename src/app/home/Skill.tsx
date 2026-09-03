"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { IoLogoHtml5 } from "react-icons/io";
import {
  FaCode,
  FaCss3Alt,
  FaGithub,
  FaJsSquare,
  FaImage,
  FaPalette,
  FaPenNib,
  FaPython,
  FaReact,
  FaRobot,
  FaSearch,
} from "react-icons/fa";
import { LiaNode } from "react-icons/lia";
import { RiNextjsFill } from "react-icons/ri";
import {
  SiExpress,
  SiFigma,
  SiFramer,
  SiGoogle,
  SiMongodb,
  SiNetlify,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { TbBrandVite, TbWind } from "react-icons/tb";

type Category = "skills" | "tools" | "ai";
type FilterValue = "all" | Category;

type SkillItem = {
  id: number;
  name: string;
  description: string;
  category: Category;
  icon: string;
};

const iconMap: Record<string, ReactNode> = {
  html: <IoLogoHtml5 />,
  css: <FaCss3Alt />,
  javascript: <FaJsSquare />,
  typescript: <SiTypescript />,
  react: <FaReact />,
  nextjs: <RiNextjsFill />,
  python: <FaPython />,
  r: <span className="font-black text-cyan-300">R</span>,
  nodejs: <LiaNode />,
  express: <SiExpress />,
  mongodb: <SiMongodb />,
  tailwind: <SiTailwindcss />,
  code: <FaCode />,
  vite: <TbBrandVite />,
  github: <FaGithub />,
  vercel: <SiVercel />,
  netlify: <SiNetlify />,
  windsurf: <TbWind />,
  figma: <SiFigma />,
  framer: <SiFramer />,
  palette: <FaPalette />,
  image: <FaImage />,
  pen: <FaPenNib />,
  robot: <FaRobot />,
  google: <SiGoogle />,
};

const filterOptions: Array<{
  value: FilterValue;
  label: string;
}> = [
  { value: "all", label: "All" },
  { value: "skills", label: "Development" },
  { value: "tools", label: "Tools" },
  { value: "ai", label: "AI" },
];

export default function Skill() {
  const reduceMotion = useReducedMotion();
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterValue>("all");
  const [showAll, setShowAll] = useState(false);
  const [limit, setLimit] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadSkills = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const response = await fetch("/data/skills.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Skills data could not be loaded.");
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Skills data has an invalid format.");
        }

        setSkills(data as SkillItem[]);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setLoadError(
          error instanceof Error
            ? error.message
            : "Skills data could not be loaded.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadSkills();

    return () => controller.abort();
  }, [reloadKey]);

  useEffect(() => {
    const updateLimit = () => {
      const width = window.innerWidth;

      if (width >= 1280) setLimit(15);
      else if (width >= 1024) setLimit(12);
      else if (width >= 768) setLimit(9);
      else setLimit(6);
    };

    updateLimit();
    window.addEventListener("resize", updateLimit);

    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  const filteredSkills = useMemo(() => {
    const query = search.trim().toLowerCase();

    return skills.filter((skill) => {
      const matchesCategory =
        filter === "all" || skill.category === filter;
      const matchesSearch =
        skill.name.toLowerCase().includes(query) ||
        skill.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [filter, search, skills]);

  const visibleSkills = showAll
    ? filteredSkills
    : filteredSkills.slice(0, limit);

  const resetFilters = () => {
    setSearch("");
    setFilter("all");
    setShowAll(false);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black px-4 py-20 text-white sm:px-6 md:px-10 lg:px-16">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#000814] to-black" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:60px_60px]" />
      <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-blue-500/20 blur-[130px]" />
      <div className="absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-cyan-400/10 blur-[150px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-2 min-[360px]:gap-3 min-[360px]:px-4">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
            <span className="text-[10px] font-semibold uppercase tracking-[1px] text-cyan-300 min-[360px]:text-xs min-[360px]:tracking-[3px]">
              Technologies and tools
            </span>
          </div>

          <h2 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            My{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Technologies, development tools, and AI assistants I use to
            design, build, and improve modern digital products.
          </p>
        </div>

        <div className="mx-auto mb-10 max-w-4xl">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl sm:p-5">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <label htmlFor="skill-search" className="sr-only">
                  Search technologies
                </label>
                <input
                  id="skill-search"
                  type="search"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setShowAll(false);
                  }}
                  placeholder="Search technologies..."
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-5 py-4 pr-12 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
                />
                <FaSearch className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-sm text-gray-500" />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setFilter(option.value);
                      setShowAll(false);
                    }}
                    className={`shrink-0 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-300 ${
                      filter === option.value
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
                        : "border border-white/10 bg-white/5 text-gray-400 hover:border-cyan-400/30 hover:text-white"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {!isLoading && !loadError && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[2px] text-gray-500">
              {filteredSkills.length}{" "}
              {filteredSkills.length === 1 ? "result" : "results"}
            </p>

            {(search || filter !== "all") && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-medium text-cyan-300 transition hover:text-cyan-200"
              >
                Reset filters
              </button>
            )}
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 min-[380px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" aria-label="Loading skills">
            {Array.from({ length: 10 }, (_, index) => (
              <div
                key={index}
                className="h-48 animate-pulse rounded-2xl border border-white/10 bg-white/[0.04]"
              />
            ))}
          </div>
        ) : loadError ? (
          <div className="rounded-2xl border border-red-400/20 bg-red-400/5 px-6 py-16 text-center">
            <p className="text-lg font-semibold text-white">
              Unable to load technologies
            </p>
            <p className="mt-2 text-sm text-gray-500">{loadError}</p>
            <button
              type="button"
              onClick={() => setReloadKey((value) => value + 1)}
              className="mt-6 rounded-xl bg-blue-500/20 px-5 py-2.5 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/30"
            >
              Try Again
            </button>
          </div>
        ) : visibleSkills.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 min-[380px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {visibleSkills.map((skill, index) => (
              <motion.article
                key={skill.id}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={reduceMotion ? undefined : { y: -8, scale: 1.025 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: reduceMotion ? 0 : 0.4, delay: (index % 10) * 0.035 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-cyan-400/[0.04] hover:shadow-[0_20px_50px_rgba(0,100,255,0.12)] min-[380px]:p-5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-400/0 transition-all duration-500 group-hover:from-blue-500/5 group-hover:to-cyan-400/5" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/5 text-3xl text-cyan-300 transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10 group-hover:text-cyan-200">
                    {iconMap[skill.icon] ?? <FaCode />}
                  </div>
                  <h3 className="text-sm font-bold text-white sm:text-base">
                    {skill.name}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    {skill.description}
                  </p>
                  <span className="mt-4 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[1px] text-gray-500">
                    {skill.category === "skills"
                      ? "Development"
                      : skill.category === "ai"
                        ? "AI"
                        : "Tool"}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 group-hover:w-full" />
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
            <p className="text-lg font-semibold text-white">
              No technologies found
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Try searching with a different keyword.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-xl bg-blue-500/20 px-5 py-2.5 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/30"
            >
              Reset filters
            </button>
          </div>
        )}

        {!isLoading &&
          !loadError &&
          filteredSkills.length > limit && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((value) => !value)}
                className="rounded-xl border border-cyan-400/30 bg-cyan-400/5 px-7 py-3 text-sm font-semibold text-cyan-300 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-400/10"
              >
                {showAll
                  ? "Show Less"
                  : `Show All ${filteredSkills.length} Technologies`}
              </button>
            </div>
          )}
      </div>
    </section>
  );
}
