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

/*
 * =========================================================
 * ICON MAPPING
 * =========================================================
 */

const getHomeFooterIcon = (
  icon: HomeFooterIcon,
) => {
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

/*
 * =========================================================
 * HOME FOOTER
 * =========================================================
 */

export default function HomeFooter() {
  const currentYear = new Date().getFullYear();

  /*
   * =======================================================
   * BACK TO TOP
   * =======================================================
   */

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/[0.07] bg-[#020617] text-white">

      {/* ===================================================
          BACKGROUND SYSTEM
      ==================================================== */}

      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.12),transparent_32%),radial-gradient(circle_at_85%_80%,rgba(6,182,212,0.10),transparent_30%),linear-gradient(135deg,#020617_0%,#030712_45%,#020617_100%)]" />

      {/* Top glow */}

      <div className="absolute -left-40 -top-40 -z-20 h-[480px] w-[480px] rounded-full bg-blue-600/[0.10] blur-[150px]" />

      {/* Bottom glow */}

      <div className="absolute -bottom-56 -right-40 -z-20 h-[560px] w-[560px] rounded-full bg-cyan-400/[0.08] blur-[170px]" />

      {/* Center glow */}

      <div className="absolute left-1/2 top-1/2 -z-20 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.035] blur-[150px]" />

      {/* Grid */}

      <div className="absolute inset-0 -z-10 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.45)_1px,transparent_1px)] [background-size:56px_56px]" />

      {/* ===================================================
          MAIN CONTAINER
      ==================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 sm:pt-20 lg:px-10">

        {/* =================================================
            PREMIUM IDENTITY HERO
        ================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 28,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="relative mb-12 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-[0_25px_100px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8 lg:p-10"
        >

          {/* Hero inner glow */}

          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/[0.08] blur-[100px]" />

          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-blue-500/[0.07] blur-[100px]" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            {/* Identity */}

            <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center">

              {/* Monogram */}

              <div className="relative shrink-0">

                <div className="absolute inset-0 rounded-2xl bg-cyan-400/20 blur-xl" />

                <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-cyan-300/[0.10] via-blue-500/[0.08] to-indigo-500/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:h-24 sm:w-24">

                  <span className="bg-gradient-to-br from-white via-cyan-100 to-cyan-400 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
                    TH
                  </span>

                </div>

              </div>

              {/* Details */}

              <div className="min-w-0">

                {/* Availability */}

                <div className="mb-2 flex items-center gap-2">

                  <span className="relative flex h-2 w-2">

                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />

                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />

                  </span>

                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-300 sm:text-xs">
                    Available for opportunities
                  </span>

                </div>

                {/* Name */}

                <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">

                  Tamim{" "}

                  <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                    Hasan
                  </span>

                </h2>

                {/* Role */}

                <p className="mt-2 text-sm font-semibold text-slate-300 sm:text-base">
                  Frontend Web Developer
                  <span className="mx-2 text-slate-700">
                    •
                  </span>
                  Next.js & TypeScript
                </p>

                {/* Description */}

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                  I build modern, responsive, high-performance
                  web experiences with a strong focus on clean
                  interfaces, thoughtful interactions, and
                  maintainable frontend architecture.
                </p>

              </div>

            </div>

            {/* CTA */}

            <div className="shrink-0">

              <Link
                href="/resume"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-300/20 bg-gradient-to-r from-cyan-400/[0.10] to-blue-500/[0.10] px-5 py-3 text-sm font-bold text-cyan-100 shadow-[0_10px_35px_rgba(34,211,238,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:bg-cyan-300/[0.13] hover:shadow-[0_15px_45px_rgba(34,211,238,0.10)] sm:w-auto"
              >
                View Resume

                <FaFileLines className="transition-transform duration-300 group-hover:translate-x-1" />

              </Link>

            </div>

          </div>

          {/* Tech line */}

          <div className="relative mt-8 flex flex-wrap gap-2 border-t border-white/[0.06] pt-6">

            {[
              "React",
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
              "Framer Motion",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-[10px] font-semibold text-slate-500 transition-colors hover:border-cyan-300/15 hover:text-cyan-300"
              >
                {tech}
              </span>
            ))}

          </div>

        </motion.section>

        {/* =================================================
            LINK AREA
        ================================================== */}

        <div className="grid gap-6 md:grid-cols-2">

          {(homeFooterData as HomeFooterSection[]).map(
            (section, sectionIndex) => (

              <motion.section
                key={section.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.55,
                  delay: sectionIndex * 0.1,
                }}
                className="rounded-3xl border border-white/[0.07] bg-white/[0.02] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.14)] backdrop-blur-xl sm:p-6"
              >

                {/* Section Header */}

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-300/10 bg-cyan-300/[0.05]">

                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />

                  </div>

                  <div className="min-w-0">

                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-cyan-300">
                      Explore
                    </p>

                    <h3 className="mt-0.5 text-base font-bold text-white">
                      {section.title}
                    </h3>

                  </div>

                  <div className="ml-auto h-px flex-1 bg-gradient-to-r from-cyan-400/20 to-transparent" />

                </div>

                {/* Links */}

                <div className="grid gap-3 sm:grid-cols-2">

                  {section.items.map((item) => {

                    const isExternal =
                      Boolean(item.external);

                    const content = (
                      <>
                        {/* Hover glow */}

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-400/[0.04] via-transparent to-blue-500/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                        {/* Bottom line */}

                        <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent transition-all duration-500 group-hover:w-full" />

                        {/* Icon */}

                        <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-cyan-300 transition-all duration-300 group-hover:scale-105 group-hover:border-cyan-300/20 group-hover:bg-cyan-300/[0.07] group-hover:text-cyan-200 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.08)]">

                          {getHomeFooterIcon(
                            item.icon,
                          )}

                        </span>

                        {/* Text */}

                        <span className="relative min-w-0 flex-1">

                          <span className="block text-sm font-bold text-slate-300 transition-colors duration-300 group-hover:text-cyan-100">
                            {item.label}
                          </span>

                          {item.value && (
                            <span className="mt-1 block truncate text-[11px] leading-5 text-slate-600 transition-colors duration-300 group-hover:text-slate-500">
                              {item.value}
                            </span>
                          )}

                        </span>

                        {/* Arrow */}

                        <span className="relative shrink-0 text-slate-700 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-cyan-300">
                          →
                        </span>

                      </>
                    );

                    if (isExternal) {
                      return (
                        <a
                          key={item.id}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex min-w-0 items-center gap-3 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-white/[0.045] hover:shadow-[0_15px_40px_rgba(34,211,238,0.05)]"
                        >
                          {content}
                        </a>
                      );
                    }

                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        className="group relative flex min-w-0 items-center gap-3 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-white/[0.045] hover:shadow-[0_15px_40px_rgba(34,211,238,0.05)]"
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

        {/* =================================================
            SIGNATURE BAR
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.5,
            delay: 0.15,
          }}
          className="mt-7 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.018]"
        >

          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">

            {/* Identity */}

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-300/10 bg-gradient-to-br from-cyan-300/[0.08] to-blue-500/[0.06]">

                <span className="text-xs font-black text-cyan-300">
                  TH
                </span>

              </div>

              <div>

                <p className="text-xs font-bold text-slate-300">
                  Tamim Hasan
                </p>

                <p className="mt-0.5 text-[10px] text-slate-600">
                  Frontend Web Developer
                </p>

              </div>

            </div>

            {/* Built with */}

            <p className="text-center text-[10px] font-medium text-slate-600 sm:text-left">
              Designed & developed with
              <span className="mx-1 text-cyan-400">
                Next.js
              </span>
              &
              <span className="mx-1 text-blue-400">
                TypeScript
              </span>
            </p>

            {/* Back to top */}

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-cyan-300/[0.06] hover:text-cyan-200 sm:w-auto"
            >

              Back to Top

              <FaArrowUp className="transition-transform duration-300 group-hover:-translate-y-1" />

            </button>

          </div>

        </motion.div>

        {/* =================================================
            COPYRIGHT
        ================================================== */}

        <div className="mt-7 flex flex-col items-center justify-between gap-2 border-t border-white/[0.06] pt-6 text-center sm:flex-row sm:text-left">

          <div>

            <p className="text-xs text-slate-500 sm:text-sm">
              © {currentYear} Tamim Hasan. All rights reserved.
            </p>

            <p className="mt-1 text-[10px] text-slate-700">
              Building digital experiences with passion,
              precision, and modern web technologies.
            </p>

          </div>

          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700">
            Tamim Hasan
          </p>

        </div>

      </div>

    </footer>
  );
}