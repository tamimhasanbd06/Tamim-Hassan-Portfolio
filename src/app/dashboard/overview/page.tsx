import Link from "next/link";
import {
  FaArrowLeft,
  FaBriefcase,
  FaCode,
  FaLayerGroup,
  FaTools,
  FaChartBar,
  FaProjectDiagram,
  FaDatabase,
} from "react-icons/fa";

import OverviewClient from "@/components/dashboard/OverviewClient";
import skills from "../../../../public/MySkills.json";
import tech from "../../../../public/Main/My-Tech-Stack.json";
import projects from "../../../../public/Main/Project-Gallery.json";
import toolkit from "../../../../public/Main/Developer-Toolkit.json";

export default function OverviewPage() {
  const categories = [...new Set(projects.map((p) => p.type))];

  const techCats = [...new Set(tech.map((t) => t.category))];

  const toolCats = [...new Set(toolkit.map((t) => t.category))];

  const stats = [
    {
      label: "Total Skills",
      value: skills.length,
      icon: FaLayerGroup,
      description: "Core capabilities",
      accent: "cyan",
    },
    {
      label: "Technologies",
      value: tech.length,
      icon: FaCode,
      description: "Technology stack",
      accent: "blue",
    },
    {
      label: "Projects",
      value: projects.length,
      icon: FaBriefcase,
      description: "Portfolio projects",
      accent: "indigo",
    },
    {
      label: "Categories",
      value: categories.length,
      icon: FaProjectDiagram,
      description: "Project categories",
      accent: "violet",
    },
  ];

  const getTechCount = (category: string) =>
    tech.filter((item) => item.category === category).length;

  const getProjectCount = (category: string) =>
    projects.filter((item) => item.type === category).length;

  const getToolCount = (category: string) =>
    toolkit.filter((item) => item.category === category).length;

  const maxTechCount = Math.max(
    ...techCats.map(getTechCount),
    1
  );

  const maxProjectCount = Math.max(
    ...categories.map(getProjectCount),
    1
  );

  const maxToolCount = Math.max(
    ...toolCats.map(getToolCount),
    1
  );

  return (
    <div className="relative space-y-8 pb-4">
      {/* =========================================================
          PAGE HEADER
      ========================================================== */}
      <header className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-br from-cyan-300/[0.055] via-white/[0.02] to-blue-500/[0.035] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.18)] sm:p-8">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyan-400/[0.08] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-blue-500/[0.06] blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.045] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-200">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]" />
              Portfolio Overview
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Portfolio at a glance
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              A live overview of your portfolio ecosystem, including
              skills, technologies, projects, categories, and developer
              tools.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-xs font-medium text-slate-400">
                {skills.length} Skills
              </span>

              <span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-xs font-medium text-slate-400">
                {tech.length} Technologies
              </span>

              <span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-xs font-medium text-slate-400">
                {projects.length} Projects
              </span>

              <span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-xs font-medium text-slate-400">
                {toolkit.length} Tools
              </span>
            </div>
          </div>

          <Link
            href="/home"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-cyan-300/15 bg-cyan-300/[0.045] px-4 py-2.5 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-cyan-300/30 hover:bg-cyan-300/[0.09] hover:text-cyan-200 hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]"
          >
            <FaArrowLeft className="text-cyan-300 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Portfolio
          </Link>
        </div>
      </header>

      {/* =========================================================
          STAT CARDS
      ========================================================== */}
      <section>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/15 hover:bg-white/[0.04] hover:shadow-[0_15px_50px_rgba(0,0,0,0.18)]"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-cyan-300/[0.055] blur-2xl transition-all duration-500 group-hover:bg-cyan-300/[0.10]" />

                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {stat.label}
                    </p>

                    <p className="mt-3 text-3xl font-black tracking-tight text-white">
                      {stat.value}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {stat.description}
                    </p>
                  </div>

                  <div className="rounded-xl border border-cyan-300/10 bg-cyan-300/[0.055] p-3 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="text-cyan-300" size={19} />
                  </div>
                </div>

                <div className="relative mt-5 h-1 overflow-hidden rounded-full bg-white/[0.045]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-300/60 via-blue-400/60 to-indigo-400/60"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(
                          18,
                          (stat.value /
                            Math.max(
                              skills.length,
                              tech.length,
                              projects.length,
                              toolkit.length,
                              1
                            )) *
                            100
                        )
                      )}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          EXISTING CLIENT CONTENT
      ========================================================== */}
      <OverviewClient />

      {/* =========================================================
          MAIN ANALYTICS
      ========================================================== */}
      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
              Analytics
            </p>

            <h2 className="mt-1 text-2xl font-black text-white">
              Portfolio distribution
            </h2>
          </div>

          <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            Live JSON data
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {/* =====================================================
              TECHNOLOGY GRAPH
          ====================================================== */}
          <section className="dash-card overflow-hidden p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-cyan-300/10 bg-cyan-300/[0.055] p-2.5">
                    <FaChartBar className="text-cyan-300" />
                  </div>

                  <h2 className="text-lg font-bold text-white">
                    Technology distribution
                  </h2>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  Technologies grouped by category.
                </p>
              </div>

              <span className="rounded-full border border-cyan-300/10 bg-cyan-300/[0.04] px-2.5 py-1 text-xs font-semibold text-cyan-200">
                {tech.length} total
              </span>
            </div>

            <div className="mt-7 space-y-5">
              {techCats.map((cat) => {
                const count = getTechCount(cat);

                const width = Math.max(
                  8,
                  Math.round(
                    (count / maxTechCount) * 100
                  )
                );

                return (
                  <div key={cat} className="group">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="capitalize text-slate-300">
                        {cat}
                      </span>

                      <span className="font-bold text-cyan-300">
                        {count}
                      </span>
                    </div>

                    <div className="relative h-3 overflow-hidden rounded-full bg-white/[0.045]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-300/80 via-blue-400/75 to-indigo-400/75 transition-all duration-700 group-hover:brightness-125"
                        style={{
                          width: `${width}%`,
                        }}
                      />

                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-white/10"
                        style={{
                          width: `${Math.min(
                            width,
                            20
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* =====================================================
              PROJECT GRAPH
          ====================================================== */}
          <section className="dash-card overflow-hidden p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-blue-300/10 bg-blue-300/[0.055] p-2.5">
                    <FaBriefcase className="text-blue-300" />
                  </div>

                  <h2 className="text-lg font-bold text-white">
                    Project categories
                  </h2>
                </div>

                <p className="mt-2 text-sm text-slate-500">
                  Project distribution across categories.
                </p>
              </div>

              <span className="rounded-full border border-blue-300/10 bg-blue-300/[0.04] px-2.5 py-1 text-xs font-semibold text-blue-200">
                {projects.length} total
              </span>
            </div>

            <div className="mt-7 space-y-4">
              {categories.map((cat) => {
                const count = getProjectCount(cat);

                const width = Math.max(
                  10,
                  Math.round(
                    (count / maxProjectCount) * 100
                  )
                );

                return (
                  <div
                    key={cat}
                    className="rounded-xl border border-white/[0.055] bg-white/[0.018] p-3.5 transition-all duration-300 hover:border-blue-300/15 hover:bg-white/[0.035]"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-300">
                        {cat}
                      </span>

                      <span className="text-sm font-bold text-blue-300">
                        {count}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/[0.045]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-300/75 to-indigo-400/75 transition-all duration-700"
                        style={{
                          width: `${width}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </section>

      {/* =========================================================
          TOOLKIT ANALYTICS
      ========================================================== */}
      <section className="dash-card overflow-hidden p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-indigo-300/10 bg-indigo-300/[0.055] p-2.5">
                <FaTools className="text-indigo-300" />
              </div>

              <h2 className="text-lg font-bold text-white">
                Developer toolkit
              </h2>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              {toolkit.length} tools distributed across{" "}
              {toolCats.length} categories.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-xs text-slate-400">
            <FaDatabase className="text-indigo-300" />
            {toolkit.length} tools
          </div>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {toolCats.map((cat) => {
            const count = getToolCount(cat);

            const percentage = Math.round(
              (count / toolkit.length) * 100
            );

            const width = Math.max(
              8,
              Math.round(
                (count / maxToolCount) * 100
              )
            );

            return (
              <div
                key={cat}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.018] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300/15 hover:bg-white/[0.035]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold capitalize text-slate-300">
                      {cat}
                    </p>

                    <p className="mt-2 text-2xl font-black text-white">
                      {count}
                    </p>
                  </div>

                  <span className="rounded-lg bg-indigo-300/[0.07] px-2 py-1 text-[11px] font-bold text-indigo-200">
                    {percentage}%
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.045]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-300/70 to-blue-400/70 transition-all duration-700 group-hover:brightness-125"
                    style={{
                      width: `${width}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          SKILLS + TECH STACK
      ========================================================== */}
      <section className="grid gap-5 xl:grid-cols-2">
        {/* Skills */}
        <section className="dash-card overflow-hidden p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-cyan-300/10 bg-cyan-300/[0.055] p-2.5">
                  <FaLayerGroup className="text-cyan-300" />
                </div>

                <h2 className="text-lg font-bold text-white">
                  Skills & tech stack
                </h2>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Core technologies used throughout the portfolio.
              </p>
            </div>

            <span className="text-2xl font-black text-cyan-300">
              {
                tech.filter(
                  (t) => t.category === "skills"
                ).length
              }
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {tech
              .filter(
                (t) => t.category === "skills"
              )
              .map((t) => (
                <span
                  key={t.id}
                  className="group rounded-full border border-cyan-300/10 bg-cyan-300/[0.035] px-3 py-1.5 text-sm text-slate-300 transition-all duration-300 hover:border-cyan-300/25 hover:bg-cyan-300/[0.075] hover:text-cyan-200"
                >
                  <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cyan-300/70 transition-all group-hover:bg-cyan-300" />
                  {t.name}
                </span>
              ))}
          </div>
        </section>

        {/* Toolkit Preview */}
        <section className="dash-card overflow-hidden p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-indigo-300/10 bg-indigo-300/[0.055] p-2.5">
                  <FaTools className="text-indigo-300" />
                </div>

                <h2 className="text-lg font-bold text-white">
                  Toolkit overview
                </h2>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Quick view of your development workflow tools.
              </p>
            </div>

            <span className="text-2xl font-black text-indigo-300">
              {toolkit.length}
            </span>
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {toolkit.slice(0, 8).map((tool) => (
              <div
                key={tool.id}
                className="rounded-xl border border-white/[0.055] bg-white/[0.018] p-3 transition-all duration-300 hover:border-indigo-300/15 hover:bg-white/[0.035]"
              >
                <p className="truncate text-sm font-semibold text-slate-200">
                  {tool.name}
                </p>

                <p className="mt-1 text-[11px] capitalize text-slate-500">
                  {tool.category}
                </p>
              </div>
            ))}
          </div>

          {toolkit.length > 8 ? (
            <p className="mt-4 text-center text-xs text-slate-500">
              +{toolkit.length - 8} more tools
            </p>
          ) : null}
        </section>
      </section>

      {/* =========================================================
          PORTFOLIO SUMMARY
      ========================================================== */}
      <section className="relative overflow-hidden rounded-3xl border border-cyan-300/10 bg-gradient-to-r from-cyan-300/[0.045] via-blue-400/[0.025] to-indigo-400/[0.045] p-6 sm:p-7">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-300/[0.07] blur-3xl" />

        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
              Portfolio Summary
            </p>

            <h2 className="mt-2 text-2xl font-black text-white">
              Everything in one overview
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Your portfolio currently contains{" "}
              <span className="font-semibold text-cyan-200">
                {skills.length} skills
              </span>
              ,{" "}
              <span className="font-semibold text-blue-200">
                {tech.length} technologies
              </span>
              ,{" "}
              <span className="font-semibold text-indigo-200">
                {projects.length} projects
              </span>
              , and{" "}
              <span className="font-semibold text-violet-200">
                {toolkit.length} developer tools
              </span>
              .
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="rounded-xl border border-white/[0.06] bg-black/10 px-4 py-3 text-center">
              <p className="text-lg font-black text-cyan-300">
                {skills.length}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Skills
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-black/10 px-4 py-3 text-center">
              <p className="text-lg font-black text-blue-300">
                {tech.length}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Tech
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-black/10 px-4 py-3 text-center">
              <p className="text-lg font-black text-indigo-300">
                {projects.length}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Projects
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-black/10 px-4 py-3 text-center">
              <p className="text-lg font-black text-violet-300">
                {toolkit.length}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Tools
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          BOTTOM NAVIGATION
      ========================================================== */}
      <div className="flex justify-center pt-1">
        <Link
          href="/home"
          className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-5 py-2.5 text-sm font-semibold text-slate-300 transition-all duration-300 hover:border-cyan-300/20 hover:bg-cyan-300/[0.04] hover:text-cyan-200"
        >
          <FaArrowLeft className="text-cyan-300 transition-transform duration-300 group-hover:-translate-x-1" />

          Return to Portfolio
        </Link>
      </div>
    </div>
  );
}