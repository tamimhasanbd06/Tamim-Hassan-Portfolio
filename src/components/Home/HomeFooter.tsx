
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import {
  FaFacebookF,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";

import {
  FaArrowUp,
  FaFileLines,
  FaIdCard,
  FaRightToBracket,
} from "react-icons/fa6";

import homeFooterData from "../../../public/Main/Home Footer.json";

type HomeFooterIcon =
  | "whatsapp"
  | "github"
  | "facebook"
  | "resume"
  | "cv"
  | "login";

type HomeFooterItem = {
  id: number;
  label: string;
  value?: string;
  href: string;
  icon: HomeFooterIcon;
  external?: boolean;
};

type HomeFooterSection = {
  title: string;
  items: HomeFooterItem[];
};

const getHomeFooterIcon = (icon: HomeFooterIcon) => {
  switch (icon) {
    case "whatsapp":
      return <FaWhatsapp />;

    case "github":
      return <FaGithub />;

    case "facebook":
      return <FaFacebookF />;

    case "resume":
      return <FaFileLines />;

    case "cv":
      return <FaIdCard />;

    case "login":
      return <FaRightToBracket />;

    default:
      return null;
  }
};

export default function HomeFooter() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/[0.07] bg-[#020617]/50 text-white backdrop-blur-xl">

      {/* Background glow effects */}

      <div className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[420px] w-[420px] rounded-full bg-blue-600/[0.10] blur-[150px]" />

      <div className="pointer-events-none absolute -bottom-48 -right-40 -z-10 h-[480px] w-[480px] rounded-full bg-cyan-400/[0.08] blur-[160px]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.04] blur-[140px]" />

      {/* Main container */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-7 pt-14 sm:px-6 sm:pb-9 sm:pt-20 lg:px-10 lg:pt-24">

        {/* Profile / Hero section */}

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="group relative mb-10 overflow-hidden rounded-[1.75rem] border border-white/[0.09] bg-white/[0.025] shadow-[0_25px_100px_rgba(0,0,0,0.20)] backdrop-blur-2xl sm:mb-12 sm:rounded-[2rem]"
        >
          {/* Decorative accents */}

          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-cyan-400/[0.07] blur-[100px] transition-opacity duration-500 group-hover:bg-cyan-400/[0.10]" />

          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-blue-500/[0.06] blur-[100px]" />

          <div className="relative p-5 sm:p-8 lg:p-10">

            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

              {/* Profile identity */}

              <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">

                {/* Monogram */}

                <div className="relative mx-auto shrink-0 sm:mx-0">

                  <div className="absolute -inset-2 rounded-[1.5rem] bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-indigo-500/20 opacity-70 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex h-20 w-20 items-center justify-center rounded-[1.35rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/[0.12] via-blue-500/[0.08] to-indigo-500/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:h-24 sm:w-24">

                    <span className="bg-gradient-to-br from-white via-cyan-100 to-cyan-400 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
                      TH
                    </span>

                  </div>

                  <span
                    className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-[3px] border-[#07101f] bg-emerald-400"
                    aria-label="Available for opportunities"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-950" />
                  </span>

                </div>

                {/* Profile details */}

                <div className="min-w-0 text-center sm:text-left">

                  <div className="mb-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">

                    <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-300 sm:text-[10px]">

                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />

                      Available for opportunities

                    </span>

                  </div>

                  <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">

                    Tamim{" "}

                    <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                      Hasan
                    </span>

                  </h2>

                  <p className="mt-3 text-sm font-semibold text-slate-300 sm:text-base">

                    Frontend Web Developer

                    <span className="mx-2 text-slate-600">/</span>

                    <span className="text-cyan-300">
                      Next.js & TypeScript
                    </span>

                  </p>

                  <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:mx-0">

                    I build modern, responsive, high-performance web
                    experiences with a focus on clean interfaces,
                    meaningful interactions, and maintainable frontend
                    architecture.

                  </p>

                </div>

              </div>

              {/* Resume CTA */}

              <div className="flex shrink-0 flex-col items-stretch gap-3 sm:flex-row lg:flex-col">

                <Link
                  href="/resume"
                  className="ui-button-primary"
                >
                  <FaFileLines className="text-base" />

                  View Resume

                  <span className="transition-transform duration-300 group-hover/cta:translate-x-1">
                    →
                  </span>

                </Link>

              </div>

            </div>

            {/* Technology tags */}

            <div className="mt-8 border-t border-white/[0.07] pt-6">

              <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500">
                Technologies I work with
              </p>

              <div className="flex flex-wrap justify-center gap-2 sm:justify-start">

                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "Framer Motion",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[10px] font-semibold text-slate-400 transition-all duration-300 hover:border-cyan-300/20 hover:bg-cyan-300/[0.05] hover:text-cyan-200 sm:text-[11px]"
                  >
                    {tech}
                  </span>
                ))}

              </div>

            </div>

          </div>
        </motion.section>

        {/* Footer navigation */}

        <div className="grid gap-5 md:grid-cols-2 md:gap-6">

          {(homeFooterData as HomeFooterSection[]).map(
            (section, sectionIndex) => (

              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: sectionIndex * 0.1,
                }}
                className="group/section relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.018] p-5 transition-colors duration-300 hover:border-white/[0.11] hover:bg-white/[0.025] sm:rounded-3xl sm:p-6"
              >

                {/* Section header */}

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300/15 bg-gradient-to-br from-cyan-300/[0.09] to-blue-500/[0.05]">

                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />

                  </div>

                  <div className="min-w-0">

                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-cyan-300">
                      Explore
                    </p>

                    <h3 className="mt-1 text-base font-bold text-white sm:text-lg">
                      {section.title}
                    </h3>

                  </div>

                  <div className="ml-auto h-px min-w-5 flex-1 bg-gradient-to-r from-cyan-400/20 to-transparent" />

                </div>

                {/* Navigation links */}

                <div className="grid gap-3 sm:grid-cols-2">

                  {section.items.map((item) => {

                    const isExternal = Boolean(item.external);

                    const content = (
                      <>
                        {/* Hover background */}

                        <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/[0.045] via-transparent to-blue-500/[0.045] opacity-0 transition-opacity duration-300 group-hover/link:opacity-100" />

                        {/* Bottom accent */}

                        <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent transition-all duration-500 group-hover/link:w-full" />

                        {/* Icon */}

                        <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-lg text-cyan-300 transition-all duration-300 group-hover/link:scale-105 group-hover/link:border-cyan-300/20 group-hover/link:bg-cyan-300/[0.07] group-hover/link:text-cyan-200">

                          {getHomeFooterIcon(item.icon)}

                        </span>

                        {/* Link information */}

                        <span className="relative min-w-0 flex-1">

                          <span className="block truncate text-sm font-bold text-slate-300 transition-colors duration-300 group-hover/link:text-cyan-100">
                            {item.label}
                          </span>

                          {item.value && (
                            <span className="mt-1 block truncate text-[11px] leading-5 text-slate-500 transition-colors duration-300 group-hover/link:text-slate-400">
                              {item.value}
                            </span>
                          )}

                        </span>

                        {/* Arrow */}

                        <span className="relative shrink-0 text-sm text-slate-600 transition-all duration-300 group-hover/link:translate-x-1 group-hover/link:text-cyan-300">
                          →
                        </span>
                      </>
                    );

                    const linkClassName =
                      "group/link relative flex min-w-0 items-center gap-3 overflow-hidden rounded-xl border border-white/[0.065] bg-white/[0.02] p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/20 hover:bg-white/[0.04] hover:shadow-[0_10px_30px_rgba(34,211,238,0.035)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60";

                    if (isExternal) {
                      return (
                        <a
                          key={item.id}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClassName}
                        >
                          {content}
                        </a>
                      );
                    }

                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={linkClassName}
                      >
                        {content}
                      </Link>
                    );
                  })}

                </div>

              </motion.section>
            ),
          )}

        </div>

        {/* Footer signature */}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.018] sm:mt-7"
        >

          <div className="flex flex-col gap-5 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">

            {/* Identity */}

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-300/15 bg-gradient-to-br from-cyan-300/[0.09] to-blue-500/[0.06]">

                <span className="text-xs font-black text-cyan-300">
                  TH
                </span>

              </div>

              <div>

                <p className="text-xs font-bold text-slate-200">
                  Tamim Hasan
                </p>

                <p className="mt-1 text-[10px] text-slate-500">
                  Frontend Web Developer
                </p>

              </div>

            </div>

            {/* Built with */}

            <p className="text-center text-[10px] font-medium leading-6 text-slate-500 sm:text-left">

              Designed & developed with

              <span className="mx-1.5 font-semibold text-cyan-300">
                Next.js
              </span>

              &

              <span className="mx-1.5 font-semibold text-blue-300">
                TypeScript
              </span>

            </p>

            {/* Back to top */}

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="group/top inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-xs font-semibold text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/20 hover:bg-cyan-300/[0.05] hover:text-cyan-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 sm:w-auto"
            >

              Back to Top

              <FaArrowUp className="transition-transform duration-300 group-hover/top:-translate-y-1" />

            </button>

          </div>

        </motion.div>

        {/* Copyright */}

        <div className="mt-6 flex flex-col items-center gap-3 border-t border-white/[0.065] pt-6 text-center sm:mt-7 sm:flex-row sm:justify-between sm:text-left">

          <div>

            <p className="text-xs text-slate-400">
              © {currentYear} Tamim Hasan. All rights reserved.
            </p>

            <p className="mt-1.5 max-w-xl text-[10px] leading-5 text-slate-600">
              Building digital experiences with passion,
              precision, and modern web technologies.
            </p>

          </div>

          <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-slate-600">
            Crafted with purpose
          </p>

        </div>

      </div>

    </footer>
  );
}
