"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import PdfDownloadButton from "@/components/common/PdfDownloadButton";
import {
  FaArrowLeft,
  FaBriefcase,
  FaEnvelope,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
  FaQrcode,
  FaFilePdf,
  FaTimes,
  FaSearchPlus,
  FaExclamationTriangle,
} from "react-icons/fa";

export interface CVPersonalInfo {
  name: string;
  highlightedName: string;
  title: string;
  summary: string;
  status: string;
  image: string;
  imageAlt: string;
  location: string;
  phone: string;
  email: string;
}

export interface CVDownload {
  source: string;
  filename: string;
  label: string;
}

export interface CVProfile {
  title: string;
  paragraphs: string[];
}

export interface CVProject {
  name: string;
  type: string;
  description: string;
  features: string[];
  technologies: string;
  demo?: string;
}

export interface CVEducation {
  title: string;
  institution: string;
  location: string;
  current?: boolean;
}

export interface CVSkill {
  category: string;
  items: string;
}

export interface CVCourse {
  title: string;
  meta: string;
}

export interface CVPersonalDetail {
  label: string;
  value: string;
}

export interface CVReference {
  name: string;
  role: string;
  company: string;
  location: string;
  phone: string;
  email: string;
}

export interface CVQrCode {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  accent?: string;
}

export interface CVData {
  personalInfo: CVPersonalInfo;
  download: CVDownload;
  profile: CVProfile;
  projects: CVProject[];
  education: CVEducation[];
  skills: CVSkill[];
  courses: CVCourse[];
  personalInformation: CVPersonalDetail[];
  reference: CVReference;
  qrCodes: CVQrCode[];
  footer: string;
}

export default function CVPage() {
  const [data, setData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<{ src: string; title: string } | null>(null);

  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const loadCVData = async () => {
      try {
        const res = await fetch("/Main/CV.json");
        if (!res.ok) {
          throw new Error(`Failed to load CV data (HTTP ${res.status})`);
        }
        const jsonData: CVData = await res.json();
        if (isMounted) {
          setData(jsonData);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to load CV data:", err);
          setError("Failed to load CV data. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadCVData();
    return () => {
      isMounted = false;
    };
  }, [reloadTrigger]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setReloadTrigger((prev) => prev + 1);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
      {/* Background */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.10),transparent_35%)]" />
      <div className="fixed -left-40 top-0 h-[480px] w-[480px] rounded-full bg-blue-600/10 blur-[160px]" />
      <div className="fixed -bottom-52 right-[-120px] h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-[170px]" />

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Page controls */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/home"
            className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-gray-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
          >
            <FaArrowLeft />
            Back to Portfolio
          </Link>

          {data?.download ? (
            <PdfDownloadButton
              source={data.download.source}
              filename={data.download.filename}
              label={data.download.label}
              className="group flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/30"
            />
          ) : (
            <PdfDownloadButton
              source="/assets/documents/Tamim-Hasan-CV.pdf"
              filename="Tamim-Hasan-CV.pdf"
              label="Download My CV"
              className="group flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/30"
            />
          )}
        </div>

        {loading ? (
          <div className="flex min-h-[500px] flex-col items-center justify-center rounded-[30px] border border-white/10 bg-[#07101d]/90 p-12 text-center backdrop-blur-xl">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-400/20 border-t-cyan-400" />
            <p className="mt-4 text-sm font-medium text-gray-400">Loading CV data...</p>
          </div>
        ) : error ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[30px] border border-red-500/20 bg-[#07101d]/90 p-8 text-center backdrop-blur-xl">
            <FaExclamationTriangle className="text-4xl text-amber-400" />
            <h3 className="mt-4 text-lg font-bold text-white">Unable to Load CV</h3>
            <p className="mt-2 text-sm text-gray-400">{error}</p>
            <button
              onClick={handleRetry}
              className="mt-6 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-6 py-2.5 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
            >
              Retry
            </button>
          </div>
        ) : data ? (
          /* CV container */
          <article className="overflow-hidden rounded-[30px] border border-white/10 bg-[#07101d]/90 shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            {/* CV header */}
            <header className="relative overflow-hidden border-b border-white/10 px-6 py-10 sm:px-10 lg:px-14">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/15 blur-[100px]" />
              <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-cyan-400/10 blur-[100px]" />

              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    {data.personalInfo.status}
                  </div>

                  <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                    {data.personalInfo.name}{" "}
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                      {data.personalInfo.highlightedName}
                    </span>
                  </h1>

                  <p className="mt-3 text-lg font-semibold text-cyan-300 sm:text-xl">
                    {data.personalInfo.title}
                  </p>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-gray-400">
                    {data.personalInfo.summary}
                  </p>
                </div>

                {/* Contact details */}
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="relative mb-5 h-24 w-24 overflow-hidden rounded-2xl border border-cyan-400/25 bg-[#020817] shadow-[0_16px_45px_rgba(6,182,212,0.18)] lg:ml-auto">
                    <Image
                      src={data.personalInfo.image}
                      alt={data.personalInfo.imageAlt}
                      fill
                      priority
                      sizes="96px"
                      className="object-cover object-top"
                    />
                  </div>

                  <p className="flex items-start gap-3">
                    <FaMapMarkerAlt className="mt-1 shrink-0 text-pink-400" />
                    <span>{data.personalInfo.location}</span>
                  </p>

                  <a
                    href={`tel:${data.personalInfo.phone.replace(/[^+\d]/g, "")}`}
                    className="flex items-center gap-3 transition hover:text-cyan-300"
                  >
                    <FaPhoneAlt className="text-emerald-400" />
                    {data.personalInfo.phone}
                  </a>

                  <a
                    href={`mailto:${data.personalInfo.email}`}
                    className="flex items-center gap-3 transition hover:text-cyan-300"
                  >
                    <FaEnvelope className="text-blue-400" />
                    {data.personalInfo.email}
                  </a>
                </div>
              </div>
            </header>

            {/* Main content */}
            <div className="grid gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_300px] lg:px-14">
              {/* Left column */}
              <div className="space-y-10">
                {/* Professional summary */}
                {data.profile && (
                  <CVSection icon={<FaUser />} title={data.profile.title}>
                    {data.profile.paragraphs.map((para, idx) => (
                      <p key={idx} className={idx > 0 ? "mt-4 leading-7 text-gray-400" : "leading-7 text-gray-400"}>
                        {para}
                      </p>
                    ))}
                  </CVSection>
                )}

                {/* Projects */}
                {data.projects && data.projects.length > 0 && (
                  <CVSection icon={<FaBriefcase />} title="Personal Projects">
                    <div className="space-y-5">
                      {data.projects.map((project) => (
                        <article
                          key={project.name}
                          className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition-all duration-300 hover:border-cyan-400/25 hover:bg-white/[0.055]"
                        >
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <h3 className="text-lg font-bold transition group-hover:text-cyan-200">
                                {project.name}
                              </h3>
                              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
                                {project.type}
                              </p>
                            </div>

                            {project.demo && (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-fit items-center gap-2 text-sm font-semibold text-blue-400 transition hover:text-cyan-300"
                              >
                                Live Demo
                                <FaExternalLinkAlt className="text-xs" />
                              </a>
                            )}
                          </div>

                          <p className="mt-4 text-sm leading-6 text-gray-400">
                            {project.description}
                          </p>

                          {project.features && project.features.length > 0 && (
                            <div className="mt-5">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300">
                                Key Features
                              </h4>
                              <ul className="mt-3 space-y-2">
                                {project.features.map((feature) => (
                                  <li
                                    key={feature}
                                    className="flex gap-3 text-sm text-gray-400"
                                  >
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <p className="mt-5 text-xs leading-6 text-gray-500">
                            <span className="font-bold text-gray-300">
                              Technologies:
                            </span>{" "}
                            {project.technologies}
                          </p>
                        </article>
                      ))}
                    </div>
                  </CVSection>
                )}

                {/* Education */}
                {data.education && data.education.length > 0 && (
                  <CVSection
                    icon={<FaGraduationCap />}
                    title="Educational Qualification"
                  >
                    <div className="space-y-4">
                      {data.education.map((edu) => (
                        <EducationRow
                          key={edu.title}
                          title={edu.title}
                          institution={edu.institution}
                          location={edu.location}
                          current={edu.current}
                        />
                      ))}
                    </div>
                  </CVSection>
                )}
              </div>

              {/* Right column */}
              <aside className="space-y-8">
                {/* Skills */}
                {data.skills && data.skills.length > 0 && (
                  <SideSection title="Technical Skills">
                    <div className="space-y-5">
                      {data.skills.map((skill) => (
                        <div key={skill.category}>
                          <h3 className="text-sm font-bold text-cyan-300">
                            {skill.category}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-gray-400">
                            {skill.items}
                          </p>
                        </div>
                      ))}
                    </div>
                  </SideSection>
                )}

                {/* Courses */}
                {data.courses && data.courses.length > 0 && (
                  <SideSection title="Courses">
                    <ul className="space-y-5 text-sm leading-6 text-gray-400">
                      {data.courses.map((course) => (
                        <li key={course.title}>
                          <span className="font-bold text-gray-200">
                            {course.title}
                          </span>
                          <br />
                          <span className="text-gray-500">
                            {course.meta}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </SideSection>
                )}

                {/* Personal information */}
                {data.personalInformation && data.personalInformation.length > 0 && (
                  <SideSection title="Personal Information">
                    <dl className="space-y-4">
                      {data.personalInformation.map((item) => (
                        <div key={item.label}>
                          <dt className="text-xs font-bold uppercase tracking-wider text-gray-600">
                            {item.label}
                          </dt>
                          <dd className="mt-1 text-sm leading-6 text-gray-300">
                            {item.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </SideSection>
                )}

                {/* Reference */}
                {data.reference && (
                  <SideSection title="Reference">
                    <p className="font-bold text-white">
                      {data.reference.name}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                      {data.reference.role}
                      <br />
                      {data.reference.company}
                      <br />
                      {data.reference.location}
                    </p>
                    <a
                      href={`tel:${data.reference.phone.replace(/[^+\d]/g, "")}`}
                      className="mt-4 flex items-center gap-2 text-sm text-blue-400 transition hover:text-cyan-300"
                    >
                      <FaPhoneAlt className="text-xs" />
                      {data.reference.phone}
                    </a>
                    <a
                      href={`mailto:${data.reference.email}`}
                      className="mt-2 flex items-start gap-2 break-all text-sm text-blue-400 transition hover:text-cyan-300"
                    >
                      <FaEnvelope className="mt-1 shrink-0 text-xs" />
                      {data.reference.email}
                    </a>
                  </SideSection>
                )}
              </aside>
            </div>

            {/* =========================================================
                QR CODES SECTION (Portfolio URL & CV PDF QR Codes)
            ========================================================== */}
            {data.qrCodes && data.qrCodes.length > 0 && (
              <div className="mx-6 mb-10 grid gap-6 sm:mx-10 md:grid-cols-2 lg:mx-14">
                {data.qrCodes.map((qr) => {
                  const isBlue = qr.accent === "blue";
                  return (
                    <div
                      key={qr.id}
                      className={`flex flex-col items-center justify-between gap-4 rounded-2xl border p-6 backdrop-blur-md sm:flex-row ${
                        isBlue
                          ? "border-blue-400/20 bg-blue-950/20"
                          : "border-cyan-400/20 bg-cyan-950/20"
                      }`}
                    >
                      <div className="space-y-1.5 text-center sm:text-left">
                        <div
                          className={`flex items-center justify-center gap-2 text-sm font-bold sm:justify-start ${
                            isBlue ? "text-blue-300" : "text-cyan-300"
                          }`}
                        >
                          {isBlue ? <FaFilePdf /> : <FaQrcode />}
                          <h3>{qr.title}</h3>
                        </div>
                        <p className="max-w-[200px] text-xs text-gray-400">
                          {qr.description}
                        </p>
                      </div>
                      <div
                        onClick={() =>
                          setModalImage({
                            src: qr.image,
                            title: qr.title,
                          })
                        }
                        className={`group relative shrink-0 cursor-pointer rounded-xl border bg-[#030712] p-2.5 shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300 hover:scale-105 ${
                          isBlue
                            ? "border-blue-400/30 hover:border-blue-400"
                            : "border-cyan-400/30 hover:border-cyan-400"
                        }`}
                        title="Click to enlarge"
                      >
                        <div
                          className={`absolute -inset-0.5 rounded-xl blur transition duration-300 ${
                            isBlue
                              ? "bg-gradient-to-r from-blue-600 to-cyan-500 opacity-30 group-hover:opacity-75"
                              : "bg-gradient-to-r from-blue-500 to-cyan-400 opacity-30 group-hover:opacity-75"
                          }`}
                        />
                        <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg bg-white p-1">
                          <Image
                            src={qr.image}
                            alt={qr.alt}
                            fill
                            sizes="96px"
                            className="object-contain p-1 transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/40 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                            <FaSearchPlus /> Zoom
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom message */}
            {data.footer && (
              <footer className="border-t border-white/10 px-6 py-6 text-center sm:px-10">
                <p className="text-xs leading-6 text-gray-600">
                  {data.footer}
                </p>
              </footer>
            )}
          </article>
        ) : null}
      </div>

      {/* =========================================================
          QR CODE LIGHTBOX MODAL (Popup Viewer)
      ========================================================== */}
      {modalImage && (
        <div
          onClick={() => setModalImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm space-y-4 rounded-3xl border border-cyan-400/30 bg-[#07101d] p-6 text-center shadow-[0_0_50px_rgba(6,182,212,0.3)]"
          >
            {/* Close Button */}
            <button
              onClick={() => setModalImage(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-gray-300 transition hover:bg-cyan-500 hover:text-white"
            >
              <FaTimes />
            </button>

            <h3 className="text-lg font-bold text-cyan-300">{modalImage.title}</h3>

            <div className="relative flex h-72 w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-inner">
              <Image
                src={modalImage.src}
                alt={modalImage.title}
                fill
                sizes="300px"
                className="object-contain p-2"
              />
            </div>

            <p className="text-xs text-gray-400">
              Scan with your phone camera to open or download.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}

type CVSectionProps = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
};

function CVSection({
  icon,
  title,
  children,
}: CVSectionProps) {
  return (
    <section>
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
          {icon}
        </span>

        <h2 className="text-xl font-black">
          {title}
        </h2>

        <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/30 to-transparent" />
      </div>

      {children}
    </section>
  );
}

type SideSectionProps = {
  title: string;
  children: ReactNode;
};

function SideSection({
  title,
  children,
}: SideSectionProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <h2 className="border-b border-white/10 pb-3 text-sm font-black uppercase tracking-[0.18em] text-cyan-300">
        {title}
      </h2>

      <div className="mt-4">{children}</div>
    </section>
  );
}

type EducationRowProps = {
  title: string;
  institution: string;
  location: string;
  current?: boolean;
};

function EducationRow({
  title,
  institution,
  location,
  current = false,
}: EducationRowProps) {
  const isRunning = current;
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-bold text-white">
          {title}
        </h3>

        {isRunning && (
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
            Current
          </span>
        )}
      </div>

      <p className="mt-2 text-sm font-medium text-cyan-300">
        {institution}
      </p>

      <p className="mt-1 text-sm text-gray-500">
        {location}
      </p>
    </article>
  );
}