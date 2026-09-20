

"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaLaptopCode, FaServer, FaPaintBrush, FaTools } from "react-icons/fa";
import TypewriterText from "@/components/common/TypewriterText";

type SkillCategory = {
  category: string;
  items: string;
};

const iconMap: Record<string, React.ReactNode> = {
  "Frontend Development": <FaLaptopCode className="text-3xl text-cyan-400" />,
  "Backend Development": <FaServer className="text-3xl text-blue-400" />,
  "Design & UI Tools": <FaPaintBrush className="text-3xl text-purple-400" />,
  "Development Tools": <FaTools className="text-3xl text-indigo-400" />
};

export default function WhatICanDo() {
  const [capabilities, setCapabilities] = useState<SkillCategory[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/api/content/what-i-can-do", { cache: "no-store" });
        if (!response.ok) throw new Error("Failed to load capabilities");
        const payload: { items?: Array<{ data: SkillCategory }> } = await response.json();
        setCapabilities((payload.items || []).map((row) => row.data));
      } catch (error) {
        console.error("Error loading capabilities:", error);
      }
    };
    loadData();
  }, []);

  return (
    <section className="theme-section relative w-full overflow-hidden px-4 py-20 sm:px-6 md:px-10 lg:px-16">
      
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
            <span className="text-xs font-bold uppercase tracking-[] text-blue-300">
              My Capabilities
            </span>
          </div>
          <h2 className="text-4xl font-black text-white sm:text-5xl">
            <TypewriterText text="What I Can" />{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Do
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col items-center rounded-3xl border border-white/10 bg-[var(--bg-card)]/40 p-8 text-center backdrop-blur-xl transition hover:border-cyan-400/30 hover:bg-[var(--bg-card)]"
            >
              <div className="mb-6 rounded-2xl border border-white/5 bg-white/5 p-4 transition-transform group-hover:scale-110">
                {iconMap[skill.category] || <FaLaptopCode className="text-3xl text-cyan-400" />}
              </div>
              <h3 className="mb-4 text-lg font-bold text-white">
                {skill.category}
              </h3>
              <p className="text-sm leading-6 text-gray-400">
                {skill.items.split(", ").map(item => item.trim()).join(" • ")}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
