"use client";

import Image from "next/image";
import Link from "next/link";

const LockBanner = () => {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#000814] to-black" />

      {/* Glow effects */}
      <div className="absolute left-10 top-20 h-72 w-72 animate-pulse rounded-full bg-blue-500/20 blur-3xl" />

      <div className="absolute bottom-10 right-20 h-96 w-96 animate-pulse rounded-full bg-cyan-400/10 blur-3xl" />

      {/* Content wrapper */}
      <div className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-7xl items-center px-4 py-12 min-[360px]:px-5 sm:px-10 sm:py-16 md:px-16 lg:px-24 2xl:max-w-[1440px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left content */}
          <div className="flex flex-col justify-start text-left">
            <span className="mb-6 w-fit rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-[10px] uppercase tracking-[2px] text-cyan-300 min-[360px]:px-5 min-[360px]:text-xs min-[360px]:tracking-[3px] sm:text-sm">
              Elite Frontend Developer
            </span>

            <h1 className="mb-6 text-left text-[clamp(2.1rem,11vw,3.75rem)] font-extrabold leading-[1.08] md:text-6xl 2xl:text-7xl">
              <span className="text-white">
                Crafting{" "}
              </span>

              <span className="text-cyan-300">
                Next-Level
              </span>

              <br />

              <span className="text-white">
                Digital{" "}
              </span>

              <span className="text-blue-400">
                Experiences
              </span>
            </h1>

            <p className="mb-10 text-left text-base leading-relaxed text-white/80 md:text-xl">
              <span className="font-semibold text-blue-300">
                Transforming creative concepts
              </span>{" "}
              into high-performance web solutions with
              precision, innovation, and modern frontend
              engineering.
            </p>

            {/* Buttons */}
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <Link
                href="/home"
                className="flex min-h-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-cyan-500/30 min-[360px]:px-8 min-[360px]:py-4"
              >
                Go to Home
              </Link>

              <Link
                href="/resume"
                className="group flex min-h-12 items-center justify-center gap-3 rounded-xl border border-cyan-400/40 bg-cyan-400/5 px-6 py-3.5 font-semibold text-cyan-300 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/70 hover:bg-cyan-400/10 min-[360px]:px-8 min-[360px]:py-4"
              >
                My Resume

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
            </div>
          </div>

          {/* Right image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[520px]">
              <div className="absolute -inset-6 rounded-3xl bg-blue-500/20 blur-3xl" />

              <Image
                src="/LockBannerImage.png"
                alt="Tamim Hassan frontend developer"
                width={520}
                height={650}
                priority
                sizes="(max-width: 1024px) 100vw, 520px"
                className="relative h-auto w-full rounded-3xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LockBanner;
