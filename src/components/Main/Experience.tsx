"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
  FaCheckCircle,
  FaCopy,
  FaGlobe,
  FaPhoneAlt,
  FaUserTie,
} from "react-icons/fa";

type ExperienceItem = {
  id: number;
  jobTitle: string;
  company: string;
  customerCare: string;
  website: string;
  employmentType: string;
  status: "Running" | "End" | "Running or End";
  startingDate: string;
  endDate: string;
  description: string;
  technologies: string[];
};

type ExperienceResponse = {
  experience: ExperienceItem[];
};

const Experience = () => {
  const reduceMotion = useReducedMotion();

  const [experienceData, setExperienceData] = useState<
    ExperienceItem[]
  >([]);

  const [copiedNumber, setCopiedNumber] =
    useState<string | null>(null);

  useEffect(() => {
    const loadExperience = async () => {
      try {
        const response = await fetch("/Main/Experience.json");

        if (!response.ok) {
          throw new Error(
            "Failed to load experience data",
          );
        }

        const data: ExperienceResponse =
          await response.json();

        setExperienceData(data.experience);
      } catch (error) {
        console.error(
          "Failed to load experience data:",
          error,
        );
      }
    };

    void loadExperience();
  }, []);

  const handleCopyNumber = async (
    number: string,
  ) => {
    try {
      await navigator.clipboard.writeText(number);

      setCopiedNumber(number);

      setTimeout(() => {
        setCopiedNumber(null);
      }, 2000);
    } catch (error) {
      console.error(
        "Failed to copy customer care number:",
        error,
      );
    }
  };

  const formatDate = (date: string) => {
    if (!date) {
      return "";
    }

    const parsedDate = new Date(
      `${date}T00:00:00`,
    );

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    );
  };

  const getStatusStyles = (
    status: ExperienceItem["status"],
  ) => {
    if (status === "Running") {
      return {
        text: "Running",
        className:
          "border-green-400/20 bg-green-400/10 text-green-300",
      };
    }

    if (status === "End") {
      return {
        text: "End",
        className:
          "border-red-400/20 bg-red-400/10 text-red-300",
      };
    }

    return {
      text: "Running or End",
      className:
        "border-yellow-400/20 bg-yellow-400/10 text-yellow-300",
    };
  };

  return (
    <section className="relative w-full overflow-hidden bg-black px-4 py-14 text-white sm:px-6 lg:px-10">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[var(--bg-card)] to-black" />

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:60px_60px]" />

      {/* Background Glows */}
      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-cyan-400/10 blur-[130px]" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Section Title */}
        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-cyan-400">
            My career
          </p>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            Professional{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h1>
        </div>

        {/* Timeline */}
        <div className="relative pl-8 sm:pl-14">
          {/* Timeline Line */}
          <div className="absolute bottom-0 left-[7px] top-0 w-[2px] bg-gradient-to-b from-cyan-400 via-blue-500 to-transparent sm:left-[11px]" />

          {experienceData.map(
            (experience, index) => {
              const statusInfo =
                getStatusStyles(
                  experience.status,
                );

              return (
                <motion.article
                  key={experience.id}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -8,
                        }
                  }
                  transition={{
                    duration: 0.55,
                    delay: index * 0.15,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  className="relative"
                >
                  {/* Timeline Glow */}
                  <div className="absolute -left-[42px] top-11 h-16 w-16 rounded-full bg-cyan-400/10 blur-2xl sm:-left-[62px]" />

                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] top-12 z-20 h-4 w-4 rounded-full border-[3px] border-cyan-400 bg-[var(--bg-gradient-via)] shadow-[0_0_24px_rgba(34,211,238,0.9)] sm:-left-[53px] sm:h-6 sm:w-6" />

                  {/* Experience Card */}
                  <div className="group relative overflow-hidden rounded-[28px] border border-slate-800 bg-[var(--bg-card)]/95 px-5 py-6 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_30px_90px_rgba(0,100,255,0.14)] sm:px-8 sm:py-8 lg:px-10">
                    {/* Card Gradient */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/[0.035] via-transparent to-cyan-400/[0.025]" />

                    {/* Top Glow */}
                    <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-cyan-400/5 blur-[90px] transition-colors duration-500 group-hover:bg-cyan-400/10" />

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-4">
                          {/* Briefcase Icon */}
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-gradient-to-br from-blue-500/15 to-cyan-400/10 text-lg text-cyan-300 shadow-[0_0_30px_rgba(59,130,246,0.12)]">
                            <FaBriefcase />
                          </div>

                          <div>
                            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[2px] text-cyan-400/70">
                              {experience.status ===
                              "Running"
                                ? "Current position"
                                : "Previous position"}
                            </p>

                            <h2 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-200 sm:text-2xl md:text-3xl">
                              {experience.jobTitle}
                            </h2>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div
                          className={`flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold ${statusInfo.className}`}
                        >
                          <FaCheckCircle />

                          {statusInfo.text}
                        </div>
                      </div>

                      {/* Employment Information */}
                      <div className="mt-7 grid grid-cols-1 gap-x-16 gap-y-5 sm:grid-cols-2">
                        {/* Company */}
                        <div className="flex items-center gap-3">
                          <FaBuilding className="shrink-0 text-sm text-cyan-400" />

                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs text-gray-600">
                              Company:
                            </span>

                            <strong className="text-sm font-medium text-gray-300">
                              {experience.company}
                            </strong>
                          </div>
                        </div>

                        {/* Customer Care */}
                        <div className="flex items-start gap-3">
                          <FaPhoneAlt className="mt-1 shrink-0 text-sm text-cyan-400" />

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs text-gray-600">
                                Customer Care:
                              </span>

                              <a
                                href={`tel:${experience.customerCare}`}
                                className="text-sm font-medium text-cyan-300 transition-colors duration-300 hover:text-cyan-200"
                              >
                                {
                                  experience.customerCare
                                }
                              </a>

                              {/* Copy Button */}
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopyNumber(
                                    experience.customerCare,
                                  )
                                }
                                aria-label="Copy customer care number"
                                title="Copy customer care number"
                                className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/5 text-cyan-300 transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-200 active:scale-95"
                              >
                                {copiedNumber ===
                                experience.customerCare ? (
                                  <FaCheckCircle className="text-green-400" />
                                ) : (
                                  <FaCopy />
                                )}
                              </button>

                              {copiedNumber ===
                                experience.customerCare && (
                                <span className="text-[10px] font-semibold text-green-400">
                                  Copied!
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Company Website */}
                        <div className="flex items-start gap-3">
                          <FaGlobe className="mt-1 shrink-0 text-sm text-cyan-400" />

                          <div className="flex min-w-0 flex-col gap-1">
                            <span className="text-xs text-gray-600">
                              Website:
                            </span>

                            <a
                              href={experience.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-fit text-sm font-medium text-cyan-300 transition-colors duration-300 hover:text-cyan-200 hover:underline"
                            >
                              Ionic Corporation Website
                            </a>
                          </div>
                        </div>

                        {/* Employment */}
                        <div className="flex items-center gap-3">
                          <FaUserTie className="shrink-0 text-sm text-blue-400" />

                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs text-gray-600">
                              Employment:
                            </span>

                            <strong className="text-sm font-medium text-gray-300">
                              {
                                experience.employmentType
                              }
                            </strong>
                          </div>
                        </div>

                        {/* Starting Date */}
                        <div className="flex items-center gap-3">
                          <FaCalendarAlt className="shrink-0 text-sm text-green-400" />

                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs text-gray-600">
                              Starting Date:
                            </span>

                            <strong className="text-sm font-medium text-gray-300">
                              {formatDate(
                                experience.startingDate,
                              )}
                            </strong>
                          </div>
                        </div>

                        {/* End Date */}
                        <div className="flex items-center gap-3">
                          <FaCalendarAlt className="shrink-0 text-sm text-cyan-400" />

                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs text-gray-600">
                              End Date:
                            </span>

                            <strong className="text-sm font-medium text-green-300">
                              {experience.endDate
                                ? formatDate(
                                    experience.endDate,
                                  )
                                : "Present"}
                            </strong>
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="my-7 h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

                      {/* Description */}
                      <p className="text-sm leading-7 text-gray-400 sm:text-base">
                        {experience.description}
                      </p>

                      {/* Focus Areas */}
                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        {[
                          "Responsive Interfaces",
                          "Accessible UX",
                          "Clean Architecture",
                        ].map((focus) => (
                          <div
                            key={focus}
                            className="rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-center text-xs font-semibold text-slate-300 transition group-hover:border-cyan-400/20 group-hover:text-cyan-200"
                          >
                            {focus}
                          </div>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {experience.technologies.map(
                          (technology) => (
                            <span
                              key={technology}
                              className="rounded-full border border-blue-400/15 bg-blue-400/5 px-3 py-1.5 text-[10px] font-semibold text-blue-200 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-200"
                            >
                              {technology}
                            </span>
                          ),
                        )}
                      </div>
                    </div>

                    {/* Bottom Hover Line */}
                    <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent transition-all duration-700 group-hover:w-full" />
                  </div>
                </motion.article>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;



