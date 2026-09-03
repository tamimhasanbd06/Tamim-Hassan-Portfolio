"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  FaAward,
  FaCalendarAlt,
  FaDownload,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";
import coursesData from "../../public/library/courses-data.json";

type CourseStatus = "Completed" | "Not Started" | "In Progress";

type Course = {
  id: string;
  title: string;
  provider: string;
  batch: string;
  status: CourseStatus;
  startDate: string;
  endDate: string;
  certificateImage: string;
  certificatePdf: string;
};

const courses = coursesData as Course[];

const statusStyles: Record<CourseStatus, string> = {
  Completed: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.15)]",
  "In Progress": "border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.15)]",
  "Not Started": "border-slate-400/20 bg-slate-400/10 text-slate-300",
};

function formatDate(value: string) {
  if (!value) return "";

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function CourseCard({
  course,
  index,
  onCertificateOpen,
}: {
  course: Course;
  index: number;
  onCertificateOpen: (course: Course) => void;
}) {
  const reduceMotion = useReducedMotion();
  const hasCertificate = Boolean(
    course.certificateImage && course.certificatePdf,
  );
  const startDate = formatDate(course.startDate);
  const endDate = formatDate(course.endDate);

  return (
    <motion.article
      initial={{ opacity: 0, y: reduceMotion ? 0 : 34, scale: reduceMotion ? 1 : 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={reduceMotion ? undefined : { y: -9 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0 : 0.52, delay: index * 0.08, ease: "easeOut" }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0a1527]/90 to-[#040a14]/95 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-colors duration-500 hover:border-cyan-400/40 hover:shadow-[0_30px_70px_rgba(6,182,212,0.15)]"
    >
      <div className="pointer-events-none absolute -right-20 -top-24 h-52 w-52 rounded-full bg-cyan-400/10 blur-[80px] transition duration-500 group-hover:scale-125" />
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-300 to-transparent" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/10 text-xl text-cyan-300 shadow-inner transition-transform duration-300 group-hover:scale-110">
          <FaAward aria-hidden="true" />
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[1.5px] backdrop-blur-md ${statusStyles[course.status]}`}
        >
          {course.status}
        </span>
      </div>

      <div className="relative mt-6 flex flex-1 flex-col">
        <p className="text-[11px] font-black uppercase tracking-[2.5px] text-cyan-300">
          {course.provider}
        </p>
        <h3 className="mt-2 text-xl font-black leading-snug text-white sm:text-2xl">
          {course.title}
        </h3>

        {course.batch && (
          <p className="mt-2 text-xs font-semibold tracking-wide text-slate-400">
            {course.batch}
          </p>
        )}

        {(startDate || endDate) && (
          <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-slate-400">
            {startDate && (
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3 transition-colors group-hover:border-cyan-400/20 group-hover:bg-cyan-400/[0.02]">
                <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-500">
                  <FaCalendarAlt aria-hidden="true" /> Start
                </span>
                <span className="mt-1.5 block font-semibold text-slate-200">
                  {startDate}
                </span>
              </div>
            )}
            {endDate && (
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3 transition-colors group-hover:border-cyan-400/20 group-hover:bg-cyan-400/[0.02]">
                <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-500">
                  <FaCalendarAlt aria-hidden="true" /> End
                </span>
                <span className="mt-1.5 block font-semibold text-slate-200">
                  {endDate}
                </span>
              </div>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={() => onCertificateOpen(course)}
          className={`mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-cyan-300 ${
            hasCertificate
              ? "bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
              : "border border-white/10 bg-white/5 text-slate-300 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-200"
          }`}
        >
          {hasCertificate ? <FaAward aria-hidden="true" /> : <FaInfoCircle aria-hidden="true" />}
          {hasCertificate ? "View Certificate" : "Certificate Status"}
        </button>
      </div>
    </motion.article>
  );
}

function CertificateModal({
  course,
  onClose,
}: {
  course: Course;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const hasCertificate = Boolean(course.certificateImage && course.certificatePdf);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 p-3 backdrop-blur-xl sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: reduceMotion ? 0 : 24, scale: reduceMotion ? 1 : 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: reduceMotion ? 0 : 16, scale: reduceMotion ? 1 : 0.98 }}
        transition={{ duration: reduceMotion ? 0 : 0.24 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-modal-title"
        className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-cyan-400/30 bg-[#06101d] shadow-[0_30px_120px_rgba(0,0,0,0.8)]"
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="text-[9px] font-bold uppercase tracking-[2px] text-cyan-300">
              {hasCertificate ? "Certificate Preview" : "Certificate Status"}
            </p>
            <h3
              id="certificate-modal-title"
              className="truncate text-sm font-bold text-white sm:text-lg"
            >
              {course.title}
            </h3>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close certificate preview"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition hover:border-cyan-400/30 hover:text-white"
          >
            <FaTimes aria-hidden="true" />
          </button>
        </div>

        {hasCertificate ? (
          <>
            <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-black/50 p-3 sm:p-6">
              <Image
                src={course.certificateImage}
                alt={`${course.title} certificate`}
                width={1426}
                height={1102}
                preload
                className="h-auto max-h-[70vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
              />
            </div>

            <div className="border-t border-white/10 p-4 sm:p-5">
              <a
                href={course.certificatePdf}
                download
                className="mx-auto flex min-h-12 w-full max-w-sm items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-cyan-500/40"
              >
                <FaDownload aria-hidden="true" />
                Download Certificate
              </a>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-14 text-center sm:px-10 sm:py-20">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-cyan-400/20 bg-cyan-400/10 text-3xl text-cyan-300 shadow-[0_0_45px_rgba(34,211,238,0.15)]">
              <FaInfoCircle aria-hidden="true" />
            </div>
            <p className="mt-6 text-xl font-black text-white sm:text-2xl">
              No Certificate Available For This Course
            </p>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
              This course is still in progress, so a certificate has not been issued yet.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-7 min-h-12 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-7 py-3 text-sm font-bold text-cyan-200 transition hover:-translate-y-0.5 hover:bg-cyan-400/15"
            >
              Close
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const certificateTriggerRef = useRef<HTMLElement | null>(null);

  const closeCertificate = () => {
    setSelectedCourse(null);
    window.requestAnimationFrame(() => certificateTriggerRef.current?.focus());
  };

  const openCertificate = (course: Course) => {
    certificateTriggerRef.current = document.activeElement as HTMLElement | null;
    setSelectedCourse(course);
  };

  return (
    <section
      id="courses"
      className="relative w-full overflow-hidden bg-black px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(37,99,235,0.13),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(6,182,212,0.1),transparent_30%)]" />

      <div className="relative mx-auto w-full max-w-7xl">
        <header className="mb-12 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            Learning Journey
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Courses &amp;{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Courses I have completed and the programs I am currently pursuing.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              index={index}
              onCertificateOpen={openCertificate}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCourse && (
          <CertificateModal course={selectedCourse} onClose={closeCertificate} />
        )}
      </AnimatePresence>
    </section>
  );
}
