"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaCodeBranch, FaStar, FaCode } from "react-icons/fa";

export default function OpenSource() {
  const reduceMotion = useReducedMotion();
  const githubUsername = "tamimhasanbd06";
  const githubProfileUrl = `https://github.com/${githubUsername}`;

  return (
    <section className="relative w-full overflow-hidden bg-black px-4 py-20 sm:px-6 md:px-10 lg:px-16">
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)]/30 to-black" />
      
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-400/20 bg-gray-400/10 px-4 py-2">
            <FaGithub className="text-gray-300" />
            <span className="text-xs font-bold uppercase tracking-[2px] text-gray-300">
              Open Source
            </span>
          </div>
          <h2 className="text-4xl font-black text-white sm:text-5xl">
            GitHub <span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">Contributions</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-gray-400">
            Passionate about building projects and contributing to the developer community.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-10 lg:flex-row">
          <motion.div
            initial={{ opacity: 0, x: reduceMotion ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="flex w-full max-w-md flex-col items-center rounded-3xl border border-white/10 bg-[var(--bg-card)]/50 p-8 text-center backdrop-blur-xl"
          >
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-gray-800 to-black shadow-xl border border-white/10">
              <FaGithub className="text-5xl text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">@{githubUsername}</h3>
            
            <div className="mt-8 flex w-full justify-between rounded-2xl bg-black/40 p-4 border border-white/5">
              <div className="flex flex-col items-center">
                <FaCodeBranch className="mb-2 text-xl text-cyan-400" />
                <span className="text-sm font-semibold text-gray-400">Repositories</span>
              </div>
              <div className="flex flex-col items-center">
                <FaStar className="mb-2 text-xl text-yellow-400" />
                <span className="text-sm font-semibold text-gray-400">Stars</span>
              </div>
              <div className="flex flex-col items-center">
                <FaCode className="mb-2 text-xl text-blue-400" />
                <span className="text-sm font-semibold text-gray-400">Commits</span>
              </div>
            </div>

            <a
              href={githubProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/20"
            >
              Visit GitHub Profile
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: reduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[var(--bg-card)]/30 backdrop-blur-xl p-4 sm:p-6"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://ghchart.rshah.org/00dffd/${githubUsername}`}
              alt={`${githubUsername}'s GitHub Contribution Chart`}
              className="w-full object-contain filter drop-shadow-[0_0_15px_rgba(0,223,253,0.3)] brightness-110"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
