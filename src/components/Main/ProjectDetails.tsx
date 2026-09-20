"use client";

import { useEffect, useState } from "react";
import { FaCheck, FaExternalLinkAlt } from "react-icons/fa";

type ProjectType = "React" | "Next.js";

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

type ProjectDetailsProps = {
  projectId?: number; // Optional: If provided, fetches specific project. Else fetches first featured.
};

export default function ProjectDetails({ projectId }: ProjectDetailsProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const response = await fetch("/api/content/projects", { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to load");
        const payload: { items?: Array<{ data: Project }> } = await response.json();
        const data: Project[] = (payload.items || []).map((row) => row.data);
        
        if (data && data.length > 0) {
          if (projectId !== undefined) {
            const found = data.find(p => p.id === projectId);
            setProject(found || data[0]);
          } else {
            const featured = data.find(p => p.featured);
            setProject(featured || data[0]);
          }
        }
      } catch (error) {
        console.error("Error loading project details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProject();
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="w-full animate-pulse rounded-3xl border border-white/10 bg-white/5 p-10 h-96" />
    );
  }

  if (!project) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden rounded-3xl border border-cyan-400/20 bg-[var(--bg-card)] shadow-[0_30px_120px_rgba(0,0,0,0.4)]">
      <div className="grid lg:grid-cols-[1fr_1fr]">
        <div className="relative min-h-64 overflow-hidden bg-[var(--bg-primary)] sm:min-h-80 lg:min-h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={`${project.name} preview`}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[var(--bg-card)]" />
        </div>

        <div className="p-6 sm:p-8 lg:p-12">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-[] font-bold uppercase tracking-[1.] text-blue-200">
              {project.type}
            </span>
            {project.featured && (
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[] font-bold uppercase tracking-[1.] text-cyan-200">
                Featured
              </span>
            )}
          </div>

          <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
            {project.name}
          </h2>

          <p className="mt-5 text-sm leading-7 text-gray-400 sm:text-base">
            {project.longDescription}
          </p>

          <div className="mt-7">
            <h3 className="text-xs font-black uppercase tracking-[] text-cyan-300">
              Key Features
            </h3>
            <ul className="mt-4 space-y-3">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm leading-6 text-gray-300">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-[] text-cyan-300">
                    <FaCheck />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[] font-semibold text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8 flex">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-1 sm:w-auto"
            >
              <FaExternalLinkAlt /> Open Live Site
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
