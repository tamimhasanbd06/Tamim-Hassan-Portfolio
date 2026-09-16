"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaExternalLinkAlt, FaEye } from "react-icons/fa";

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

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch("/Main/Project-Gallery.json");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        // Get featured projects or just the first 3
        const featured = data.filter((p: Project) => p.featured);
        setProjects(featured.length > 0 ? featured.slice(0, 3) : data.slice(0, 3));
      } catch (error) {
        console.error("Error loading featured projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProjects();
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-black px-4 py-24 sm:px-6 md:px-10 lg:px-16">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[var(--bg-card)]/50 to-black" />
      
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
            <span className="text-xs font-bold uppercase tracking-[2px] text-cyan-300">
              Featured Work
            </span>
          </div>
          <h2 className="text-4xl font-black text-white sm:text-5xl">
            Latest{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[450px] animate-pulse rounded-3xl border border-white/10 bg-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] transition-all hover:border-cyan-400/30 hover:bg-white/[0.06]"
              >
                <div className="relative h-48 w-full overflow-hidden sm:h-56">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
                  
                  <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-cyan-300 backdrop-blur-md">
                    {project.type}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300">
                    {project.name}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-400">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-blue-400/15 bg-blue-400/5 px-2.5 py-1 text-[10px] font-semibold text-blue-200"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-gray-300">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="mt-auto pt-6">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600/80 to-cyan-500/80 px-4 py-3 text-xs font-bold text-white transition hover:from-blue-600 hover:to-cyan-500"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
