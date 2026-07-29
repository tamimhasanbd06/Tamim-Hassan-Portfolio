"use client";

import { useMemo, useState } from "react";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaSearch,
} from "react-icons/fa";

type ProjectType = "React" | "Next.js";
type ProjectFilter = "All" | ProjectType;

type Project = {
  id: number;
  name: string;
  type: ProjectType;
  image: string;
  description: string;
  live: string;
  code: string;
  technologies: string[];
  featured?: boolean;
};

type ProjectCardProps = {
  project: Project;
  index: number;
};

const projects: Project[] = [
  {
    id: 1,
    name: "DigiTools",
    type: "React",
    image: "https://s2.imgbb.ws/file/storage-sv2/Ds3SZ.png",
    description:
      "An AI tool subscription platform designed to improve productivity, creativity, and access to modern AI services.",
    live: "https://digi-tools-xi.vercel.app/",
    code: "https://github.com/tamimhasanbd06/DigiTools",
    technologies: ["React", "Tailwind CSS", "API"],
    featured: true,
  },
  {
    id: 2,
    name: "Bank Loan Calculator",
    type: "React",
    image: "https://s1.imgbb.ws/file/storage-sv1/Kv3Xp.png",
    description:
      "A financial platform where users can explore loan options, calculate payments, and plan repayments.",
    live: "https://bank-loan-calculator.vercel.app/",
    code: "https://github.com/tamimhasanbd06/Bank-Loan-Calculator",
    technologies: ["React", "JavaScript", "Finance"],
  },
  {
    id: 3,
    name: "Keen Keeper",
    type: "React",
    image: "https://s2.imgbb.ws/file/storage-sv2/KzGFS.png",
    description:
      "A modern communication platform supporting private text, audio, and video conversations.",
    live: "https://keen-keeper-tawny.vercel.app/",
    code: "https://github.com/tamimhasanbd06/Keen-Keeper",
    technologies: ["React", "Communication", "UI"],
    featured: true,
  },
  {
    id: 4,
    name: "Tile Gallery",
    type: "Next.js",
    image: "https://s1.imgbb.ws/file/storage-sv1/Y07yV.png",
    description:
      "A modern tile storefront that makes browsing products and discovering interior design options simple.",
    live: "https://tile-gallery-azure.vercel.app/",
    code: "https://github.com/tamimhasanbd06/Tamim-Hassan-Portfolio",
    technologies: ["Next.js", "TypeScript", "E-commerce"],
  },
];

const filters: ProjectFilter[] = [
  "All",
  "Next.js",
  "React",
];

const INITIAL_PROJECT_COUNT = 3;

function ProjectCard({
  project,
  index,
}: ProjectCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-[0_30px_80px_rgba(0,100,255,0.15)]">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-[#071426] sm:h-56">
        {/* Browser Controls */}
        <div className="absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-2 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-yellow-400" />
          <span className="h-2 w-2 rounded-full bg-green-400" />
        </div>

        {/* Project Number */}
        <div className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/60 font-mono text-xs font-bold text-cyan-300 backdrop-blur-md">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={`${project.name} website preview`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#030713] via-transparent to-transparent" />

        {/* Featured */}
        {project.featured && (
          <span className="absolute bottom-4 left-4 z-20 rounded-full border border-cyan-400/20 bg-black/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[2px] text-cyan-300 backdrop-blur-md">
            Featured
          </span>
        )}

        {/* Type */}
        <span className="absolute bottom-4 right-4 z-20 rounded-full border border-white/10 bg-black/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[1px] text-blue-300 backdrop-blur-md">
          {project.type}
        </span>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-300 sm:text-2xl">
          {project.name}
        </h2>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-400">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-blue-400/15 bg-blue-400/5 px-3 py-1 text-[10px] font-semibold text-blue-200"
            >
              {technology}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-auto flex gap-3 pt-6">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/20"
          >
            <FaExternalLinkAlt />

            <span>Live Website</span>
          </a>

          <a
            href={project.code}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.name} source code`}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-bold text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-200"
          >
            <FaGithub className="text-base" />

            <span className="hidden sm:inline">Code</span>
          </a>
        </div>
      </div>

      {/* Hover Line */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent transition-all duration-700 group-hover:w-full" />
    </article>
  );
}

export default function Projects() {
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] =
    useState<ProjectFilter>("All");
  const [showAll, setShowAll] = useState<boolean>(false);

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesFilter =
        filter === "All" || project.type === filter;

      const matchesSearch =
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some((technology) =>
          technology.toLowerCase().includes(query),
        );

      return matchesFilter && matchesSearch;
    });
  }, [search, filter]);

  const visibleProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_PROJECT_COUNT);

  const handleFilterChange = (
    selectedFilter: ProjectFilter,
  ) => {
    setFilter(selectedFilter);
    setShowAll(false);
  };

  const handleSearchChange = (
    value: string,
  ) => {
    setSearch(value);
    setShowAll(false);
  };

  const resetFilters = () => {
    setSearch("");
    setFilter("All");
    setShowAll(false);
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black px-4 py-20 text-white sm:px-6 md:px-10 lg:px-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#000814] to-black" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:60px_60px]" />

      {/* Glows */}
      <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-blue-500/20 blur-[130px]" />

      <div className="absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-cyan-400/10 blur-[150px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-2 min-[360px]:gap-3 min-[360px]:px-4">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />

            <span className="text-[10px] font-semibold uppercase tracking-[1px] text-cyan-300 min-[360px]:text-xs min-[360px]:tracking-[3px]">
              Selected work
            </span>
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            Project{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Gallery
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            A collection of practical projects built to improve my skills,
            solve real problems, and create useful digital experiences.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mx-auto mb-10 max-w-4xl">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row">
              {/* Search */}
              <div className="relative flex-1">
                <label
                  htmlFor="project-search"
                  className="sr-only"
                >
                  Search projects
                </label>

                <input
                  id="project-search"
                  type="search"
                  value={search}
                  onChange={(event) =>
                    handleSearchChange(event.target.value)
                  }
                  placeholder="Search projects or technologies..."
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-5 py-4 pl-12 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
                />

                <FaSearch className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-sm text-gray-500" />
              </div>

              {/* Filters */}
              <div className="flex gap-2 overflow-x-auto">
                {filters.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      handleFilterChange(option)
                    }
                    className={`
                      shrink-0 rounded-xl px-4 py-3
                      text-xs font-semibold
                      transition-all duration-300
                      ${
                        filter === option
                          ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
                          : "border border-white/10 bg-white/5 text-gray-400 hover:border-cyan-400/30 hover:text-white"
                      }
                    `}
                  >
                    {option === "All"
                      ? "All Projects"
                      : option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[2px] text-gray-500">
            {filteredProjects.length}{" "}
            {filteredProjects.length === 1
              ? "project"
              : "projects"}
          </p>

          {(search || filter !== "All") && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-medium text-cyan-300 transition hover:text-cyan-200"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Projects */}
        {visibleProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-20 text-center">
            <p className="text-xl font-bold text-white">
              No projects found
            </p>

            <p className="mt-3 text-sm text-gray-500">
              Try searching with a different project name or technology.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-xl bg-blue-500/20 px-6 py-3 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/30"
            >
              View all projects
            </button>
          </div>
        )}

        {/* Show More */}
        {filteredProjects.length > INITIAL_PROJECT_COUNT && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() =>
                setShowAll((currentValue) => !currentValue)
              }
              className="rounded-xl border border-cyan-400/30 bg-cyan-400/5 px-8 py-3 text-sm font-semibold text-cyan-300 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-400/10"
            >
              {showAll
                ? "Show Less"
                : `View All ${filteredProjects.length} Projects`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
