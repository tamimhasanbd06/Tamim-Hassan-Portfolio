"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
  FaBookOpen,
  FaChevronDown,
  FaChevronUp,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTimes,
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
  image: string;
  current: boolean;
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
    image: "/unnamed(5).jpg",
    current: true,
    accent: "from-cyan-400 via-blue-500 to-indigo-500",
  },
  {
    id: 2,
    institution: "Johorpur Al-Fatah Darul Uloom Qawmi Madrasa",
    degree: "Class 12 — Kafia, Arabic",
    department: "Kitab Department",
    duration: "Class 1 to Present",
    address: "Johorpur, Barpara, Bandar, Narayanganj, Dhaka",
    contact: "+880 1789-105420",
    description:
      "This institution has played an important role in building my academic foundation, discipline, Islamic knowledge, and understanding of Arabic studies.",
    image: "/Picture-2026-04-10 14.3h8.28.jpg",
    current: true,
    accent: "from-blue-500 via-indigo-500 to-purple-500",
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);

  const [showAll, setShowAll] = useState(false);
  const [selectedEducation, setSelectedEducation] =
    useState<EducationItem | null>(null);

  const visibleEducation = showAll
    ? educationData
    : educationData.slice(0, 1);

  useEffect(() => {
    if (!selectedEducation) return;

    const previousOverflow = document.body.style.overflow;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedEducation(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedEducation]);

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

      <div className="relative z-10 mx-auto w-full max-w-6xl">
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
        <div className="relative mx-auto max-w-5xl">
          <div className="absolute bottom-0 left-[20px] top-0 hidden w-px bg-gradient-to-b from-cyan-400/70 via-blue-500/30 to-transparent sm:block" />

          <div className="space-y-7 sm:pl-14">
            {visibleEducation.map((education) => (
              <article
                key={education.id}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.065] hover:shadow-[0_25px_70px_rgba(6,182,212,0.08)] sm:p-7 lg:p-8"
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

                <div className="relative grid items-center gap-7 lg:grid-cols-[1fr_310px]">
                  {/* Information */}
                  <div>
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300 sm:text-xs">
                        <FaGraduationCap />
                        {education.duration}
                      </div>

                      {education.current && (
                        <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-300 sm:text-xs">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />

                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                          </span>

                          Current
                        </div>
                      )}
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
                          Studying in the{" "}
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

                        <span className="pt-1">
                          {education.address}
                        </span>
                      </div>

                      {education.contact && (
                        <div className="flex items-center gap-3 text-sm text-gray-400">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-emerald-400/15 bg-emerald-500/10 text-emerald-300">
                            <FaPhoneAlt />
                          </span>

                          <a
                            href={`tel:${education.contact.replace(
                              /[\s-]/g,
                              "",
                            )}`}
                            className="font-mono transition hover:text-emerald-300"
                          >
                            {education.contact}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Institution image */}
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedEducation(education)
                    }
                    aria-label={`Preview ${education.institution}`}
                    className="relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left shadow-2xl transition hover:border-cyan-400/40"
                  >
                    <Image
                      src={education.image}
                      alt={education.institution}
                      fill
                      sizes="(max-width: 1024px) 100vw, 310px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                      <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-md">
                        View image
                      </span>

                      <span className="text-xs text-cyan-200/70">
                        Click to preview
                      </span>
                    </div>
                  </button>
                </div>
              </article>
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

      {/* Image preview */}
      {selectedEducation && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedEducation(null);
            }
          }}
        >
          <div className="relative w-full max-w-5xl">
            <button
              type="button"
              onClick={() => setSelectedEducation(null)}
              aria-label="Close image preview"
              className="absolute -top-14 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition hover:border-cyan-400/30 hover:text-cyan-300"
            >
              <FaTimes />
            </button>

            <div className="relative h-[65vh] overflow-hidden rounded-3xl border border-white/10 bg-[#060b14] p-2 shadow-[0_0_80px_rgba(59,130,246,0.2)] sm:h-[75vh]">
              <Image
                src={selectedEducation.image}
                alt={selectedEducation.institution}
                fill
                sizes="100vw"
                className="object-contain p-2"
                priority
              />
            </div>

            <p className="mt-4 text-center text-sm font-medium text-gray-400">
              {selectedEducation.institution}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}