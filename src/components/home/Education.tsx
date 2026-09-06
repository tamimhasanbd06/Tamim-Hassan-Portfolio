"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import {
  FaBookOpen,
  FaChevronDown,
  FaChevronUp,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

type EducationItem = {
  id: number;
  institution: string;
  degree: string;
  department: string;
  duration: string;
  address: string;
  contact?: string;
  description: string;
  status: "Running" | "End";
  accent: string;
};

const educationData: EducationItem[] = [
  {
    id: 1,
    institution: "Cauliflower English High School",
    degree: "Class 9",
    department: "Secondary Education",
    duration: "Currently Studying",
    address: "Farmgate, Dhaka, near Holy Cross",
    description:
      "I am currently studying in Class 9 while developing my academic knowledge, communication skills, creativity, and interest in modern technology.",
    status: "Running",
    accent: "from-cyan-400 via-blue-500 to-indigo-500",
  },
  {
    id: 2,
    institution: "Johorpur Al-Fatah Darul Uloom Qawmi Madrasa",
    degree: "Kafia Jamaat",
    department: "Kitab Department",
    duration: "Completed through Kafia Jamaat",
    address: "Johorpur, Barpara, Bandar, Narayanganj, Dhaka",
    contact: "+880 1789-105420",
    description:
      "I studied here through Kafia Jamaat, building a strong foundation in discipline, Islamic knowledge, and Arabic studies.",
    status: "End",
    accent: "from-blue-500 via-indigo-500 to-purple-500",
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const [showAll, setShowAll] = useState(false);

  const visibleEducation = showAll
    ? educationData
    : educationData.slice(0, 1);

  const handleShowLess = () => {
    setShowAll(false);

    window.setTimeout(() => {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full scroll-mt-20 overflow-hidden bg-black px-4 py-20 text-white sm:px-6 sm:py-24"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#020817] to-black" />

      <div className="absolute -left-40 top-0 h-[450px] w-[450px] rounded-full bg-blue-600/15 blur-[150px]" />

      <div className="absolute -bottom-48 right-[-120px] h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-[170px]" />

      <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:55px_55px]" />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* Header */}
        <header className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-300 sm:text-xs">
            <FaGraduationCap />
            Academic Background
          </div>

          <h2 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            My{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Education
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
            My educational journey combines academic studies, Islamic
            education, personal growth, and a strong interest in technology.
          </p>
        </header>

        {/* Timeline */}
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute bottom-0 left-[20px] top-0 hidden w-px bg-gradient-to-b from-cyan-400/70 via-blue-500/30 to-transparent sm:block" />

          <div className="space-y-7 sm:pl-14">
            {visibleEducation.map((education, index) => (
              <motion.article
                key={education.id}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={reduceMotion ? undefined : { y: -7 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: reduceMotion ? 0 : 0.5, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.065] hover:shadow-[0_25px_70px_rgba(6,182,212,0.08)] sm:p-8"
              >
                {/* Timeline marker */}
                <div className="absolute -left-[46px] top-9 hidden h-6 w-6 items-center justify-center rounded-full border-2 border-cyan-400 bg-black shadow-[0_0_20px_rgba(34,211,238,0.65)] sm:flex">
                  <span className="h-2 w-2 rounded-full bg-cyan-300" />
                </div>

                <div
                  className={`absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r ${education.accent}`}
                />

                <div className="absolute -right-24 -top-24 h-60 w-60 rounded-full bg-blue-500/10 blur-[90px] transition group-hover:bg-cyan-500/15" />

                <div
                  className={`absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r transition-all duration-700 group-hover:w-full ${education.accent}`}
                />

                <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  {/* Left content info */}
                  <div className="flex-1">
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300 sm:text-xs">
                        <FaGraduationCap />
                        {education.duration}
                      </div>

                      <div className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] sm:text-xs ${
                        education.status === "Running"
                          ? "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-300"
                          : "border-blue-400/20 bg-blue-400/[0.07] text-blue-300"
                      }`}>
                        {education.status === "Running" && (
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                          </span>
                        )}
                        {education.status}
                      </div>
                    </div>

                    <h3 className="text-2xl font-black tracking-tight text-white transition group-hover:text-cyan-200 sm:text-3xl">
                      {education.degree}
                    </h3>

                    <h4 className="mt-2 text-base font-semibold text-gray-300 sm:text-lg">
                      {education.institution}
                    </h4>

                    <div className="mt-6 space-y-4">
                      <div className="flex items-start gap-3 text-sm leading-7 text-gray-400">
                        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-400/15 bg-blue-500/10 text-blue-300">
                          <FaBookOpen />
                        </span>
                        <p>
                          {education.status === "Running" ? "Studying" : "Studied"} in the{" "}
                          <span className="font-semibold text-blue-300">
                            {education.department}
                          </span>
                          . {education.description}
                        </p>
                      </div>

                      <div className="flex items-start gap-3 text-sm leading-6 text-gray-400">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-pink-400/15 bg-pink-500/10 text-pink-300">
                          <FaMapMarkerAlt />
                        </span>
                        <span className="pt-1">{education.address}</span>
                      </div>

                      {education.contact && (
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-400/15 bg-emerald-500/10 text-emerald-300">
                            <FaPhoneAlt />
                          </span>
                          <a
                            href={`tel:${education.contact.replace(/[\s-]/g, "")}`}
                            className="font-mono transition hover:text-emerald-300"
                          >
                            {education.contact}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Big replacement Education Icon container instead of image */}
                  <div className="flex shrink-0 items-center justify-center pt-2 sm:pt-0">
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-blue-600/15 via-cyan-500/10 to-indigo-600/15 text-cyan-300 shadow-[0_0_30px_rgba(6,182,212,0.12)] transition duration-500 group-hover:scale-105 group-hover:border-cyan-400/40 group-hover:text-cyan-200 sm:h-28 sm:w-28">
                      <FaGraduationCap className="text-4xl sm:text-5xl" />
                      <span className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Show more and show less */}
        {educationData.length > 1 && (
          <div className="mt-10 flex justify-center">
            {!showAll ? (
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="group flex items-center gap-3 rounded-full border border-cyan-400/25 bg-cyan-400/[0.07] px-6 py-3 text-sm font-bold text-cyan-200 shadow-[0_12px_40px_rgba(6,182,212,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-cyan-400/[0.12] hover:shadow-[0_15px_45px_rgba(6,182,212,0.15)]"
              >
                Show More Education
                <FaChevronDown className="transition-transform duration-300 group-hover:translate-y-1" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleShowLess}
                className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-6 py-3 text-sm font-bold text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-400/[0.08] hover:text-cyan-200"
              >
                Show Less
                <FaChevronUp className="transition-transform duration-300 group-hover:-translate-y-1" />
              </button>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-14 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400/30" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/30 sm:text-xs">
            Always learning
          </p>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400/30" />
        </div>
      </div>
    </section>
  );
}


