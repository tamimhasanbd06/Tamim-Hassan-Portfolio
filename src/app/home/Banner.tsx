"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaFileAlt,
  FaPaperPlane,
} from "react-icons/fa";

export default function Banner() {
  const scrollToContact = () => {
    const contactSection =
      document.getElementById("contact");

    if (!contactSection) return;

    const navbarHeight = 64;

    const position =
      contactSection.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight;

    window.scrollTo({
      top: position,
      behavior: "smooth",
    });

    window.history.replaceState(
      null,
      "",
      "#contact",
    );
  };

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] w-full flex-col overflow-hidden bg-black xl:flex-row">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#000814] to-black" />

      {/* Background glows */}
      <div className="absolute left-10 top-20 h-72 w-72 animate-pulse rounded-full bg-blue-500/20 blur-3xl" />

      <div className="absolute bottom-10 right-20 h-96 w-96 animate-pulse rounded-full bg-cyan-400/10 blur-3xl" />

      {/* Left side */}
      <motion.div
        initial={{
          opacity: 0,
          x: -60,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
        className="relative z-10 flex w-full flex-col items-center justify-center px-4 py-10 text-center min-[360px]:px-5 sm:px-8 sm:py-12 md:px-12 xl:w-[45%] xl:items-start xl:px-16 xl:text-left 2xl:px-20"
      >
        {/* Glass background */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xl" />

        <div className="relative z-10 flex w-full flex-col items-center xl:items-start">
          {/* Logo */}
          <div className="mb-6 flex w-full justify-center xl:justify-start">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className="relative w-20 min-[360px]:w-24 sm:w-28 md:w-32 xl:w-24"
            >
              <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-xl" />

              <div className="relative aspect-square w-full overflow-hidden rounded-full border border-white/20 bg-[#020617] shadow-2xl shadow-blue-500/20">
                <Image
                  src="/tamim-hassan-logo.png"
                  alt="Tamim Hassan web developer logo"
                  fill
                  priority
                  sizes="(max-width: 640px) 96px, 128px"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Developer label */}
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.25,
            }}
            className="mb-4 flex items-center justify-center gap-2 min-[360px]:gap-3 xl:justify-start"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>

            <p className="text-[10px] font-semibold uppercase tracking-[2px] text-cyan-300 min-[360px]:text-xs min-[360px]:tracking-[3px] sm:text-sm">
              Tamim Hassan • Web Developer
            </p>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.35,
            }}
            className="mb-4 w-full text-[clamp(2rem,10vw,3rem)] font-extrabold leading-[1.08] text-white md:text-5xl xl:text-6xl 2xl:text-7xl"
          >
            Make Your <br />

            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Dream Website
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.45,
            }}
            className="max-w-full text-sm leading-relaxed text-gray-400 sm:text-base md:text-lg xl:max-w-md"
          >
            I build modern, fast, and visually engaging websites with reliable
            performance, responsive layouts, and smooth user experiences.
          </motion.p>

          {/* Technology list */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.55,
            }}
            className="mt-7 flex flex-wrap items-center justify-center gap-2 min-[360px]:gap-3 xl:justify-start"
          >
            {[
              "Next.js",
              "TypeScript",
              "React",
              "Python",
            ].map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-2 text-[11px] font-medium text-cyan-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 min-[360px]:px-4 min-[360px]:text-xs"
              >
                {technology}
              </span>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.65,
            }}
            className="mt-8 flex w-full flex-col gap-4 sm:w-auto sm:flex-row"
          >
            {/* My CV button */}
            <Link
              href="/cv"
              className="group flex min-h-12 items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-cyan-500/30 min-[360px]:px-8 min-[360px]:py-4"
            >
              <FaFileAlt className="text-sm" />

              <span>My CV</span>

              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Contact button */}
            <button
              type="button"
              onClick={scrollToContact}
              className="group flex min-h-12 items-center justify-center gap-3 rounded-xl border border-cyan-400/40 bg-cyan-400/5 px-6 py-3.5 font-semibold text-cyan-300 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:bg-cyan-400/10 min-[360px]:px-8 min-[360px]:py-4"
            >
              <FaPaperPlane className="text-sm transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />

              Contact Me
            </button>
          </motion.div>

          {/* CV helper text */}
          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.6,
              delay: 0.85,
            }}
            className="mt-4 text-xs text-gray-600"
          >
            View my skills, education, projects, and professional information.
          </motion.p>
        </div>
      </motion.div>

      {/* Right side */}
      <motion.div
        initial={{
          opacity: 0,
          x: 60,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.9,
          ease: "easeOut",
        }}
        className="relative z-10 w-full xl:w-[55%]"
      >
        <Image
          src="/tamim-hassan-lock-banner.png"
          alt="Tamim Hassan professional web development workspace"
          width={1024}
          height={1536}
          priority
          sizes="(max-width: 1280px) 100vw, 55vw"
          className="h-[min(66svh,440px)] w-full object-cover object-center sm:h-[500px] md:h-[560px] xl:h-[calc(100svh-4rem)] xl:min-h-[680px]"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black" />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,200,255,0.15),transparent_60%)]" />

        <div className="pointer-events-none absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent xl:block" />
      </motion.div>
    </section>
  );
}
