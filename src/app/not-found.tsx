import Image from "next/image";
import Link from "next/link";

import {
  FaArrowLeft,
  FaFileAlt,
  FaHome,
  FaSearch,
} from "react-icons/fa";

export default function NotFoundPage() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black px-4 py-16 text-white sm:px-6">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#000814] to-black" />

      {/* Glow effects */}
      <div className="absolute -left-40 top-[-100px] h-[480px] w-[480px] animate-pulse rounded-full bg-blue-600/20 blur-[160px]" />

      <div className="absolute -bottom-52 right-[-140px] h-[550px] w-[550px] animate-pulse rounded-full bg-cyan-400/10 blur-[180px]" />

      <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[150px]" />

      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:55px_55px]" />

      {/* Top line */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

      <section className="relative z-10 mx-auto w-full max-w-4xl text-center">
        {/* Logo */}
        <Link
          href="/home"
          aria-label="Go to Tamim Hassan portfolio"
          className="group mx-auto mb-8 block w-fit"
        >
          <div className="relative h-20 w-20 sm:h-24 sm:w-24">
            <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-2xl transition group-hover:bg-cyan-400/45" />

            <div className="relative h-full w-full overflow-hidden rounded-full border border-cyan-400/25 bg-[#020817] shadow-[0_0_50px_rgba(34,211,238,0.15)]">
              <Image
                src="/tamim-hassan-logo.png"
                alt="Tamim Hassan web developer logo"
                fill
                priority
                sizes="96px"
                className="object-cover"
              />
            </div>
          </div>
        </Link>

        {/* Status badge */}
        <div className="mx-auto mb-7 flex w-fit items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-300 sm:text-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-70" />

            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>

          Page Not Found
        </div>

        {/* 404 number */}
        <div className="relative mx-auto w-fit">
          <p
            aria-hidden="true"
            className="absolute inset-0 translate-x-2 translate-y-2 text-8xl font-black tracking-[-0.08em] text-blue-600/20 blur-sm sm:text-[150px] md:text-[190px]"
          >
            404
          </p>

          <h1 className="relative bg-gradient-to-b from-white via-cyan-200 to-blue-500 bg-clip-text text-8xl font-black tracking-[-0.08em] text-transparent drop-shadow-[0_0_40px_rgba(34,211,238,0.2)] sm:text-[150px] md:text-[190px]">
            404
          </h1>

          {/* Decorative orbit */}
          <div className="absolute -right-5 top-5 h-4 w-4 rounded-full border border-cyan-400 bg-cyan-400/20 shadow-[0_0_20px_rgba(34,211,238,0.8)] sm:-right-8 sm:top-9" />

          <div className="absolute -left-5 bottom-8 h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_18px_rgba(59,130,246,0.8)] sm:-left-8" />
        </div>

        {/* Message */}
        <div className="mx-auto -mt-2 max-w-2xl sm:-mt-5">
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl">
            This Page Is Lost in{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Digital Space
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
            The page you are looking for may have been moved,
            deleted, renamed, or never existed. Let&apos;s get
            you back to the main portfolio.
          </p>
        </div>

        {/* Information panel */}
        <div className="mx-auto mt-8 flex max-w-xl items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left backdrop-blur-xl sm:p-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
            <FaSearch />
          </span>

          <div>
            <h3 className="text-sm font-bold text-white">
              Unable to find this destination
            </h3>

            <p className="mt-1 text-xs leading-6 text-gray-500 sm:text-sm">
              Check the web address for spelling mistakes, or
              use one of the options below to continue
              exploring the website.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/home"
            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-cyan-500/30 sm:w-auto"
          >
            <FaHome />

            Go to Home

            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <Link
            href="/resume"
            className="group flex w-full items-center justify-center gap-3 rounded-xl border border-cyan-400/35 bg-cyan-400/[0.06] px-8 py-4 font-bold text-cyan-300 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:bg-cyan-400/10 sm:w-auto"
          >
            <FaFileAlt />
            View My Resume
          </Link>
        </div>

        {/* Back link */}
        <Link
          href="/"
          className="group mx-auto mt-8 flex w-fit items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-cyan-300"
        >
          <FaArrowLeft className="text-xs transition-transform group-hover:-translate-x-1" />
          Return to entrance page
        </Link>

        {/* Bottom decoration */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400/30" />

          <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/20 sm:text-[10px]">
            Tamim Hassan Portfolio
          </p>

          <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400/30" />
        </div>
      </section>
    </main>
  );
}