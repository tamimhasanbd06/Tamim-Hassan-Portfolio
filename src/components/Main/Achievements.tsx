"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaAward, FaExternalLinkAlt } from "react-icons/fa";

type Achievement = {
  title: string;
  provider: string;
  date: string;
  link: string;
  image: string;
};

export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        const response = await fetch("/Courses-&-Certifications.json");
        if (!response.ok) throw new Error("Failed to load");
        const data = await response.json();
        setAchievements(data);
      } catch (error) {
        console.error("Error loading achievements:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadAchievements();
  }, []);

  if (isLoading) {
    return null;
  }

  if (achievements.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden bg-black px-4 py-20 sm:px-6 md:px-10 lg:px-16">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[var(--bg-card)]/50 to-black" />
      
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
            <span className="text-xs font-bold uppercase tracking-[2px] text-cyan-300">
              Honors & Awards
            </span>
          </div>
          <h2 className="text-4xl font-black text-white sm:text-5xl">
            My <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Achievements</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:border-cyan-400/30 hover:bg-white/[0.06]"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-2xl text-cyan-400 transition-transform group-hover:scale-110">
                <FaAward />
              </div>
              <h3 className="mb-2 text-xl font-bold text-white group-hover:text-cyan-300">
                {item.title}
              </h3>
              <p className="text-sm text-cyan-200/70">{item.provider}</p>
              <p className="mt-2 text-xs text-gray-500">{item.date}</p>
              
              {item.link && (
                <div className="mt-auto pt-6">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
                  >
                    View Certificate <FaExternalLinkAlt className="text-[10px]" />
                  </a>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
