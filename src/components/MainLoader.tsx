"use client";

import Image from "next/image";

export default function MainLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading the next page"
      className="fixed inset-0 z-[9999] flex min-h-[100svh] items-center justify-center bg-black/80 px-4 backdrop-blur-md"
    >
      <div className="relative flex flex-col items-center gap-5">
        <div className="absolute -inset-16 rounded-full bg-cyan-400/10 blur-[55px]" />

        <div className="relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
          <div className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-cyan-300 border-r-blue-500" />

          <div className="absolute inset-2 animate-[spin_1.8s_linear_infinite_reverse] rounded-full border border-transparent border-b-indigo-400 border-l-cyan-500/70" />

          <div className="relative h-20 w-20 overflow-hidden rounded-full border border-white/15 bg-[#020817] shadow-[0_0_35px_rgba(34,211,238,0.2)] sm:h-24 sm:w-24">
            <Image
              src="/tamim-hassan-logo.png"
              alt="Tamim Hassan portfolio logo"
              fill
              priority
              sizes="96px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="relative text-center">
          <p className="text-sm font-bold tracking-[0.16em] text-white">
            Tamim Hassan
          </p>

          <p className="mt-2 animate-pulse text-[11px] font-medium uppercase tracking-[0.24em] text-cyan-300">
            Please wait...
          </p>
        </div>

        <span className="sr-only">Loading the next page</span>
      </div>
    </div>
  );
}

