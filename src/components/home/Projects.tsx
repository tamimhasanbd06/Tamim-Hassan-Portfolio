"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaCheck,
  FaExternalLinkAlt,
  FaEye,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

type ProjectType = "React" | "Next.js";
type ProjectFilter = "All" | ProjectType;

type Project = {
  id: number;
  name: string;
  type: ProjectType;
  image: string;
  description: string;
  longDescription: string;
  live: string;
  technologies: string[];
  features: string[];
  featured?: boolean;
};

type ProjectCardProps = {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
};

const filters: ProjectFilter[] = ["All", "Next.js", "React"];
const INITIAL_PROJECT_COUNT = 3;

function ProjectCard({
  project,
  index,
  onOpen,
}: ProjectCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: reduceMotion ? 0 : 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={reduceMotion ? undefined : { y: -9 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: reduceMotion ? 0 : 0.5, delay: index * 0.06 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-colors duration-500 hover:border-cyan-400/30 hover:shadow-[0_30px_80px_rgba(0,100,255,0.15)]"
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open details for ${project.name}`}
        className="relative block h-52 w-full overflow-hidden bg-[#071426] text-left sm:h-56"
      >
        <span className="absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-2 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-yellow-400" />
          <span className="h-2 w-2 rounded-full bg-green-400" />
        </span>

        <span className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/60 font-mono text-xs font-bold text-cyan-300 backdrop-blur-md">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={`${project.name} website preview`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <span className="absolute inset-0 bg-gradient-to-t from-[#030713] via-transparent to-transparent" />

        <span className="absolute inset-0 z-10 flex items-center justify-center bg-black/45 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          <span className="flex items-center gap-2 rounded-full border border-cyan-300/25 bg-[#03101d]/90 px-4 py-2 text-xs font-bold text-cyan-200 backdrop-blur-xl">
            <FaEye aria-hidden="true" />
            View Details
          </span>
        </span>

        {project.featured && (
          <span className="absolute bottom-4 left-4 z-20 rounded-full border border-cyan-400/20 bg-black/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[2px] text-cyan-300 backdrop-blur-md">
            Featured
          </span>
        )}

        <span className="absolute bottom-4 right-4 z-20 rounded-full border border-white/10 bg-black/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[1px] text-blue-300 backdrop-blur-md">
          {project.type}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-300 sm:text-2xl">
          {project.name}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-400">
          {project.description}
        </p>

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

        <div className="mt-auto flex pt-6">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/20"
          >
            <FaExternalLinkAlt aria-hidden="true" />
            <span>Live Website</span>
          </a>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent transition-all duration-700 group-hover:w-full" />
    </motion.article>
  );
}

type ProjectModalProps = {
  project: Project;
  onClose: () => void;
};

function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <div
      className="fixed inset-0 z-[250] flex items-center justify-center bg-black/85 p-3 backdrop-blur-lg sm:p-6"
      onMouseDown={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
        className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-cyan-400/20 bg-[#06101d] shadow-[0_30px_120px_rgba(0,0,0,0.75)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-3 top-3 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/70 text-gray-300 backdrop-blur-xl transition hover:border-cyan-400/30 hover:text-white sm:right-5 sm:top-5"
        >
          <FaTimes aria-hidden="true" />
        </button>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-64 overflow-hidden bg-[#020814] sm:min-h-80 lg:min-h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={`${project.name} full project preview`}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06101d] via-black/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#06101d]" />
          </div>

          <div className="p-5 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[1.5px] text-blue-200">
                {project.type}
              </span>
              {project.featured && (
                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[1.5px] text-cyan-200">
                  Featured
                </span>
              )}
            </div>

            <h2
              id="project-modal-title"
              className="mt-5 pr-10 text-3xl font-black text-white sm:text-4xl"
            >
              {project.name}
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-400 sm:text-base">
              {project.longDescription}
            </p>

            <div className="mt-7">
              <h3 className="text-xs font-black uppercase tracking-[2px] text-cyan-300">
                Key features
              </h3>
              <ul className="mt-4 space-y-3">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm leading-6 text-gray-300"
                  >
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-[9px] text-cyan-300">
                      <FaCheck aria-hidden="true" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold text-gray-300"
                >
                  {technology}
                </span>
              ))}
            </div>

            <div className="mt-8 flex">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-1"
              >
                <FaExternalLinkAlt aria-hidden="true" />
                Open Live Site
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadProjects = async () => {
      setIsLoading(true);
      setLoadError(null);

      try {
        const response = await fetch("/data/projects.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Project data could not be loaded.");
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Project data has an invalid format.");
        }

        setProjects(data as Project[]);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setLoadError(
          error instanceof Error
            ? error.message
            : "Project data could not be loaded.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadProjects();

    return () => controller.abort();
  }, [reloadKey]);

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [selectedProject]);

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
  }, [filter, projects, search]);

  const visibleProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_PROJECT_COUNT);

  const resetFilters = () => {
    setSearch("");
    setFilter("All");
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
              Selected work
            </span>
          </div>

          <h2 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            Project{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Gallery
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Explore practical projects, then select any project image to
            open its complete details, features, technology, and links.
          </p>
        </div>

        <div className="mx-auto mb-10 max-w-4xl">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <label htmlFor="project-search" className="sr-only">
                  Search projects
                </label>
                <input
                  id="project-search"
                  type="search"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setShowAll(false);
                  }}
                  placeholder="Search projects or technologies..."
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-5 py-4 pl-12 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/10"
                />
                <FaSearch className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-sm text-gray-500" />
              </div>

              <div className="flex gap-2 overflow-x-auto">
                {filters.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setFilter(option);
                      setShowAll(false);
                    }}
                    className={`shrink-0 rounded-xl px-4 py-3 text-xs font-semibold transition-all duration-300 ${
                      filter === option
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
                        : "border border-white/10 bg-white/5 text-gray-400 hover:border-cyan-400/30 hover:text-white"
                    }`}
                  >
                    {option === "All" ? "All Projects" : option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {!isLoading && !loadError && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[2px] text-gray-500">
              {filteredProjects.length}{" "}
              {filteredProjects.length === 1 ? "project" : "projects"}
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
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" aria-label="Loading projects">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="h-[510px] animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]"
              />
            ))}
          </div>
        ) : loadError ? (
          <div className="rounded-3xl border border-red-400/20 bg-red-400/5 px-6 py-20 text-center">
            <p className="text-xl font-bold text-white">
              Unable to load projects
            </p>
            <p className="mt-3 text-sm text-gray-500">{loadError}</p>
            <button
              type="button"
              onClick={() => setReloadKey((value) => value + 1)}
              className="mt-6 rounded-xl bg-blue-500/20 px-6 py-3 text-sm font-semibold text-blue-300 transition hover:bg-blue-500/30"
            >
              Try Again
            </button>
          </div>
        ) : visibleProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpen={setSelectedProject}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-20 text-center">
            <p className="text-xl font-bold text-white">No projects found</p>
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

        {!isLoading &&
          !loadError &&
          filteredProjects.length > INITIAL_PROJECT_COUNT && (
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((value) => !value)}
                className="rounded-xl border border-cyan-400/30 bg-cyan-400/5 px-8 py-3 text-sm font-semibold text-cyan-300 transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-400/10"
              >
                {showAll
                  ? "Show Less"
                  : `View All ${filteredProjects.length} Projects`}
              </button>
            </div>
          )}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}


