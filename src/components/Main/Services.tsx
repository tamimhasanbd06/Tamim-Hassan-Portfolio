"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaLaptopCode, FaMobileAlt, FaServer, FaPaintBrush } from "react-icons/fa";

type Service = { title: string; description: string; icon: "frontend" | "responsive" | "backend" | "design" };

const icons = {
  frontend: <FaLaptopCode className="text-3xl text-cyan-400" />,
  responsive: <FaMobileAlt className="text-3xl text-blue-400" />,
  backend: <FaServer className="text-3xl text-indigo-400" />,
  design: <FaPaintBrush className="text-3xl text-purple-400" />,
};

export default function Services() {
  const reduceMotion = useReducedMotion();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch("/api/content/services", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Failed to load services")))
      .then((data) => setServices((data.items || []).map((row: { data: Service }) => row.data)))
      .catch((error: unknown) => console.error("Error loading services:", error));
  }, []);

  return (
    <section className="theme-section relative w-full overflow-hidden px-4 py-20 sm:px-6 md:px-10 lg:px-16">
      
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
            <span className="text-xs font-bold uppercase tracking-[] text-cyan-300">
              My Services
            </span>
          </div>
          <h2 className="text-4xl font-black text-white sm:text-5xl">
            What I <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Offer</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col sm:flex-row items-start gap-6 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition hover:border-cyan-400/30 hover:bg-white/[0.06]"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/5 transition-transform group-hover:scale-110">
                {icons[service.icon]}
              </div>
              <div>
                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-cyan-300">
                  {service.title}
                </h3>
                <p className="text-sm leading-6 text-gray-400">
                  {service.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
