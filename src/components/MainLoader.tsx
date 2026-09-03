"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function MainLoader() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      role="status"
      aria-live="polite"
      aria-label="Loading the next page"
      className="fixed inset-0 z-[9999] flex min-h-[100svh] items-center justify-center bg-black/80 px-4 backdrop-blur-md"
    >
      <motion.div
        initial={{ y: reduceMotion ? 0 : 14, scale: reduceMotion ? 1 : 0.96 }}
        animate={{ y: 0, scale: 1 }}
        className="relative flex flex-col items-center gap-5"
      >
        <div className="absolute -inset-16 rounded-full bg-cyan-400/10 blur-[55px]" />

        <div className="relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
          <div className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-cyan-300 border-r-blue-500" />

          <div className="absolute inset-2 animate-[spin_1.8s_linear_infinite_reverse] rounded-full border border-transparent border-b-indigo-400 border-l-cyan-500/70" />

          <div className="relative h-20 w-20 overflow-hidden rounded-full border border-white/15 bg-[#020817] shadow-[0_0_35px_rgba(34,211,238,0.2)] sm:h-24 sm:w-24">
            <Image
              src="/tamim-hassan-logo.png"
              alt="Tamim Hasan portfolio logo"
              fill
              preload
              sizes="96px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="relative text-center">
          <p className="text-sm font-bold tracking-[0.16em] text-white">
            Tamim Hasan
          </p>

          <p className="mt-2 animate-pulse text-[11px] font-medium uppercase tracking-[0.24em] text-cyan-300">
            Please wait...
          </p>
        </div>

        <div className="relative flex items-center gap-2" aria-hidden="true">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              animate={reduceMotion ? undefined : { opacity: [0.25, 1, 0.25], y: [0, -4, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: dot * 0.16 }}
              className="h-1.5 w-1.5 rounded-full bg-cyan-300"
            />
          ))}
        </div>

        <span className="sr-only">Loading the next page</span>
      </motion.div>
    </motion.div>
  );
}
