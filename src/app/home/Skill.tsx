"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

import { IoLogoHtml5 } from "react-icons/io";

import {
  FaCode,
  FaCss3Alt,
  FaGithub,
  FaJsSquare,
  FaPython,
  FaReact,
  FaRobot,
} from "react-icons/fa";

import { LiaNode } from "react-icons/lia";
import { RiNextjsFill } from "react-icons/ri";

import {
  SiExpress,
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
  icon: ReactNode;
};

type FilterOption = {
  value: FilterValue;
  label: string;
};

const skills: SkillItem[] = [
  {
    id: 1,
    name: "HTML",
    description: "Semantic web structure",
    category: "skills",
    icon: <IoLogoHtml5 />,
  },
  {
    id: 2,
    name: "CSS",
    description: "Responsive web styling",
    category: "skills",
    icon: <FaCss3Alt />,
  },
  {
    id: 3,
    name: "JavaScript",
    description: "Modern web programming",
    category: "skills",
    icon: <FaJsSquare />,
  },
  {
    id: 4,
    name: "TypeScript",
    description: "Type-safe JavaScript",
    category: "skills",
    icon: <SiTypescript />,
  },
  {
    id: 5,
    name: "React",
    description: "Component-based interfaces",
    category: "skills",
    icon: <FaReact />,
  },
  {
    id: 6,
    name: "Next.js",
    description: "Full-stack React framework",
    category: "skills",
    icon: <RiNextjsFill />,
  },
  {
    id: 7,
    name: "Python",
    description: "Programming and automation",
    category: "skills",
    icon: <FaPython />,
  },
  {
    id: 8,
    name: "R Language",
    description: "Statistics and data analysis",
    category: "skills",
    icon: (
      <span className="font-black text-cyan-300">
        R
      </span>
    ),
  },
  {
    id: 9,
    name: "Node.js",
    description: "Server-side JavaScript",
    category: "skills",
    icon: <LiaNode />,
  },
  {
    id: 10,
    name: "Express",
    description: "Backend APIs and services",
    category: "skills",
    icon: <SiExpress />,
  },
  {
    id: 11,
    name: "MongoDB",
    description: "NoSQL database",
    category: "skills",
    icon: <SiMongodb />,
  },
  {
    id: 12,
    name: "Tailwind CSS",
    description: "Utility-first styling",
    category: "skills",
    icon: <SiTailwindcss />,
  },
  {
    id: 13,
    name: "VS Code",
    description: "Professional code editor",
    category: "tools",
    icon: <FaCode />,
  },
  {
    id: 14,
    name: "Vite",
    description: "Fast frontend build tool",
    category: "tools",
    icon: <TbBrandVite />,
  },
  {
    id: 15,
    name: "GitHub",
    description: "Version control platform",
    category: "tools",
    icon: <FaGithub />,
  },
  {
    id: 16,
    name: "Vercel",
    description: "Modern web deployment",
    category: "tools",
    icon: <SiVercel />,
  },
  {
    id: 17,
    name: "Netlify",
    description: "Frontend hosting platform",
    category: "tools",
    icon: <SiNetlify />,
  },
  {
    id: 18,
    name: "Cursor",
    description: "AI-powered code editor",
    category: "tools",
    icon: <FaCode />,
  },
  {
    id: 19,
    name: "Windsurf",
    description: "AI development environment",
    category: "tools",
    icon: <TbWind />,
  },
  {
    id: 20,
    name: "Antigravity",
    description: "AI development tool",
    category: "tools",
    icon: <FaCode />,
  },
  {
    id: 21,
    name: "ChatGPT",
    description: "AI research assistant",
    category: "ai",
    icon: <FaRobot />,
  },
  {
    id: 22,
    name: "Gemini",
    description: "Google AI assistant",
    category: "ai",
    icon: <SiGoogle />,
  },
  {
    id: 23,
    name: "Claude",
    description: "AI reasoning assistant",
    category: "ai",
    icon: <FaRobot />,
  },
  {
    id: 24,
    name: "DeepSeek",
    description: "AI reasoning assistant",
    category: "ai",
    icon: <FaRobot />,
  },
  {
    id: 25,
    name: "Codex",
    description: "AI software engineer",
    category: "ai",
    icon: <FaRobot />,
  },
  {
    id: 26,
    name: "Hermes AI",
    description: "Open language model",
    category: "ai",
    icon: <FaRobot />,
  },
  {
    id: 27,
    name: "Hugging Face",
    description: "AI models and tools",
    category: "ai",
    icon: <FaRobot />,
  },
];

const filterOptions: FilterOption[] = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "skills",
    label: "Development",
  },
  {
    value: "tools",
    label: "Tools",
  },
  {
    value: "ai",
    label: "AI",
  },
];

export default function Skill() {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<FilterValue>("all");
  const [showAll, setShowAll] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(10);

  useEffect(() => {
    const updateLimit = () => {
      const width = window.innerWidth;

      if (width >= 1280) {
        setLimit(15);
      } else if (width >= 1024) {
        setLimit(12);
      } else if (width >= 768) {
        setLimit(9);
      } else {
        setLimit(6);
      }
    };

    updateLimit();

    window.addEventListener("resize", updateLimit);

    return () => {
      window.removeEventListener("resize", updateLimit);
    };
  }, []);

  const filteredSkills = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return skills.filter((skill) => {
      const matchesCategory =
        filter === "all" || skill.category === filter;

      const matchesSearch =
        skill.name.toLowerCase().includes(normalizedSearch) ||
        skill.description.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [filter, search]);

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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#000814] to-black" />

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:60px_60px]" />

      {/* Background Glows */}
      <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-blue-500/20 blur-[130px]" />

      <div className="absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-cyan-400/10 blur-[150px]" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-2 min-[360px]:gap-3 min-[360px]:px-4">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />

            <span className="text-[10px] font-semibold uppercase tracking-[1px] text-cyan-300 min-[360px]:text-xs min-[360px]:tracking-[3px]">
              Technologies and tools
            </span>
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            My{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Technologies, development tools, and AI assistants I use to
            design, build, and improve modern digital products.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mx-auto mb-10 max-w-4xl">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl sm:p-5">
            <div className="flex flex-col gap-4">
              {/* Search Input */}
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

                <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-500">
                  ⌕
                </span>
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setFilter(option.value);
                      setShowAll(false);
                    }}
                    className={`
                      shrink-0 rounded-xl px-4 py-2.5
                      text-xs font-semibold
                      transition-all duration-300
                      ${
                        filter === option.value
                          ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
                          : "border border-white/10 bg-white/5 text-gray-400 hover:border-cyan-400/30 hover:text-white"
                      }
                    `}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Result Information */}
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

        {/* Skills Grid */}
        {visibleSkills.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 min-[380px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {visibleSkills.map((skill) => (
              <article
                key={skill.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-cyan-400/[0.04] hover:shadow-[0_20px_50px_rgba(0,100,255,0.12)] min-[380px]:p-5"
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-400/0 transition-all duration-500 group-hover:from-blue-500/5 group-hover:to-cyan-400/5" />

                <div className="relative z-10 flex flex-col items-center">
                  {/* Icon */}
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/5 text-3xl text-cyan-300 transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10 group-hover:text-cyan-200">
                    {skill.icon}
                  </div>

                  {/* Name */}
                  <h2 className="text-sm font-bold text-white sm:text-base">
                    {skill.name}
                  </h2>

                  {/* Description */}
                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    {skill.description}
                  </p>

                  {/* Category */}
                  <span className="mt-4 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[1px] text-gray-500">
                    {skill.category === "skills"
                      ? "Development"
                      : skill.category === "ai"
                        ? "AI"
                        : "Tool"}
                  </span>
                </div>

                {/* Hover Line */}
                <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 group-hover:w-full" />
              </article>
            ))}
          </div>
        ) : (
          /* Empty Search State */
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

        {/* Show More */}
        {filteredSkills.length > limit && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() =>
                setShowAll((currentValue) => !currentValue)
              }
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
