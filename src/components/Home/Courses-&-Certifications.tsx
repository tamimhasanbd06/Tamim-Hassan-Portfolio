
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

import coursesData from "../../../public/Courses-&-Certifications.json";

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
  Completed:
    "border-emerald-400/30 bg-emerald-400/[0.08] text-emerald-300",
  "In Progress":
    "border-cyan-400/30 bg-cyan-400/[0.08] text-cyan-300",
  "Not Started":
    "border-slate-400/20 bg-slate-400/[0.06] text-slate-300",
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
      initial={{
        opacity: 0,
        y: reduceMotion ? 0 : 28,
        scale: reduceMotion ? 1 : 0.985,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -7,
            }
      }
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        delay: reduceMotion ? 0 : index * 0.07,
        ease: "easeOut",
      }}
      className="
        group
        relative
        flex
        h-full
        min-w-0
        flex-col
        overflow-hidden
        rounded-[1.35rem]
        border
        border-white/[0.09]
        bg-white/[0.025]
        p-3.5
        shadow-[0_12px_40px_rgba(0,0,0,0.12)]
        backdrop-blur-md
        transition-all
        duration-500
        hover:border-cyan-400/30
        hover:bg-white/[0.04]
        hover:shadow-[0_20px_60px_rgba(6,182,212,0.10)]
        min-[400px]:rounded-[1.5rem]
        min-[400px]:p-4
        sm:p-5
        lg:p-6
      "
    >
      {/* Subtle card accent */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-8
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-cyan-400/60
          to-transparent
          opacity-50
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      {/* Soft hover glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-48
          w-48
          rounded-full
          bg-cyan-400/[0.045]
          blur-[70px]
          transition-transform
          duration-700
          group-hover:scale-125
        "
      />

      {/* Card header */}
      <div className="relative flex items-start justify-between gap-2.5 min-[400px]:gap-3">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-cyan-400/20
            bg-cyan-400/[0.07]
            text-base
            text-cyan-300
            shadow-[0_8px_25px_rgba(34,211,238,0.06)]
            transition-all
            duration-300
            group-hover:scale-105
            group-hover:border-cyan-400/35
            group-hover:bg-cyan-400/[0.10]
            min-[400px]:h-11
            min-[400px]:w-11
            min-[400px]:rounded-2xl
            min-[400px]:text-lg
            sm:h-12
            sm:w-12
          "
        >
          <FaAward aria-hidden="true" />
        </div>

        <span
          className={`
            max-w-[58%]
            rounded-full
            border
            px-2
            py-1
            text-[8px]
            font-bold
            uppercase
            leading-none
            tracking-[1px]
            whitespace-nowrap
            ${statusStyles[course.status]}
            min-[400px]:px-2.5
            min-[400px]:py-1.5
            min-[400px]:text-[9px]
            min-[400px]:tracking-[1.2px]
            sm:px-3
            sm:text-[10px]
            sm:tracking-[1.5px]
          `}
        >
          {course.status}
        </span>
      </div>

      {/* Card content */}
      <div className="relative mt-5 flex flex-1 flex-col min-[400px]:mt-6">
        <p
          className="
            text-[8px]
            font-extrabold
            uppercase
            tracking-[1.8px]
            text-cyan-300
            min-[400px]:text-[9px]
            min-[400px]:tracking-[2px]
            sm:text-[10px]
            sm:tracking-[2.4px]
          "
        >
          {course.provider}
        </p>

        <h3
          className="
            mt-2
            text-[17px]
            font-extrabold
            leading-[1.3]
            tracking-[-0.02em]
            text-white
            min-[400px]:text-[18px]
            sm:text-xl
            lg:text-[21px]
          "
        >
          {course.title}
        </h3>

        {course.batch && (
          <p
            className="
              mt-2
              text-[10px]
              font-medium
              leading-5
              tracking-wide
              text-slate-500
              min-[400px]:text-[11px]
              sm:text-xs
            "
          >
            {course.batch}
          </p>
        )}

        {(startDate || endDate) && (
          <div
            className="
              mt-5
              grid
              grid-cols-2
              gap-2
              min-[400px]:mt-6
              min-[400px]:gap-2.5
              sm:gap-3
            "
          >
            {startDate && (
              <div
                className="
                  min-w-0
                  rounded-xl
                  border
                  border-white/[0.07]
                  bg-white/[0.018]
                  p-2.5
                  transition-all
                  duration-300
                  group-hover:border-cyan-400/[0.16]
                  group-hover:bg-cyan-400/[0.018]
                  min-[400px]:rounded-2xl
                  min-[400px]:p-3
                "
              >
                <span
                  className="
                    flex
                    items-center
                    gap-1
                    text-[7px]
                    font-bold
                    uppercase
                    tracking-[0.9px]
                    text-slate-500
                    min-[400px]:gap-1.5
                    min-[400px]:text-[8px]
                    sm:text-[9px]
                    sm:tracking-wider
                  "
                >
                  <FaCalendarAlt aria-hidden="true" />
                  Start
                </span>

                <span
                  className="
                    mt-1
                    block
                    truncate
                    text-[9px]
                    font-semibold
                    text-slate-200
                    min-[400px]:mt-1.5
                    min-[400px]:text-[10px]
                    sm:text-xs
                  "
                >
                  {startDate}
                </span>
              </div>
            )}

            {endDate && (
              <div
                className="
                  min-w-0
                  rounded-xl
                  border
                  border-white/[0.07]
                  bg-white/[0.018]
                  p-2.5
                  transition-all
                  duration-300
                  group-hover:border-cyan-400/[0.16]
                  group-hover:bg-cyan-400/[0.018]
                  min-[400px]:rounded-2xl
                  min-[400px]:p-3
                "
              >
                <span
                  className="
                    flex
                    items-center
                    gap-1
                    text-[7px]
                    font-bold
                    uppercase
                    tracking-[0.9px]
                    text-slate-500
                    min-[400px]:gap-1.5
                    min-[400px]:text-[8px]
                    sm:text-[9px]
                    sm:tracking-wider
                  "
                >
                  <FaCalendarAlt aria-hidden="true" />
                  End
                </span>

                <span
                  className="
                    mt-1
                    block
                    truncate
                    text-[9px]
                    font-semibold
                    text-slate-200
                    min-[400px]:mt-1.5
                    min-[400px]:text-[10px]
                    sm:text-xs
                  "
                >
                  {endDate}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Certificate button */}
        <button
          type="button"
          onClick={() => onCertificateOpen(course)}
          className={`
            mt-5
            flex
            min-h-10
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            px-3
            py-2.5
            text-[11px]
            font-bold
            tracking-wide
            transition-all
            duration-300
            hover:-translate-y-0.5
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-cyan-300
            min-[400px]:mt-6
            min-[400px]:min-h-11
            min-[400px]:rounded-2xl
            min-[400px]:px-4
            min-[400px]:text-xs
            sm:text-sm
            ${
              hasCertificate
                ? "bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-white shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/25"
                : "border border-white/10 bg-white/[0.035] text-slate-300 hover:border-cyan-400/25 hover:bg-cyan-400/[0.06] hover:text-cyan-200"
            }
          `}
        >
          {hasCertificate ? (
            <FaAward aria-hidden="true" />
          ) : (
            <FaInfoCircle aria-hidden="true" />
          )}

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

  const hasCertificate = Boolean(
    course.certificateImage && course.certificatePdf,
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
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
      className="
        fixed
        inset-0
        z-[300]
        flex
        items-center
        justify-center
        bg-black/90
        p-2
        backdrop-blur-xl
        min-[400px]:p-3
        sm:p-6
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: reduceMotion ? 0 : 24,
          scale: reduceMotion ? 1 : 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: reduceMotion ? 0 : 16,
          scale: reduceMotion ? 1 : 0.98,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.24,
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-modal-title"
        className="
          relative
          flex
          max-h-[94vh]
          w-full
          max-w-6xl
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-cyan-400/25
          bg-[var(--bg-card)]
          shadow-[0_30px_120px_rgba(0,0,0,0.8)]
          min-[400px]:rounded-3xl
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            border-b
            border-white/10
            px-3
            py-3
            min-[400px]:px-4
            min-[400px]:py-4
            sm:px-6
          "
        >
          <div className="min-w-0">
            <p
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[1.5px]
                text-cyan-300
                min-[400px]:text-[9px]
                sm:tracking-[2px]
              "
            >
              {hasCertificate
                ? "Certificate Preview"
                : "Certificate Status"}
            </p>

            <h3
              id="certificate-modal-title"
              className="
                mt-1
                truncate
                text-xs
                font-bold
                text-white
                min-[400px]:text-sm
                sm:text-lg
              "
            >
              {course.title}
            </h3>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close certificate preview"
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/5
              text-sm
              text-slate-400
              transition
              hover:border-cyan-400/30
              hover:text-white
              min-[400px]:h-10
              min-[400px]:w-10
            "
          >
            <FaTimes aria-hidden="true" />
          </button>
        </div>

        {hasCertificate ? (
          <>
            <div
              className="
                flex
                min-h-0
                flex-1
                items-center
                justify-center
                overflow-auto
                bg-black/50
                p-2
                min-[400px]:p-3
                sm:p-6
              "
            >
              <Image
                src={course.certificateImage}
                alt={`${course.title} certificate`}
                width={1426}
                height={1102}
                preload
                className="
                  h-auto
                  max-h-[68vh]
                  w-auto
                  max-w-full
                  rounded-lg
                  object-contain
                  shadow-2xl
                  min-[400px]:rounded-xl
                "
              />
            </div>

            <div
              className="
                border-t
                border-white/10
                p-3
                min-[400px]:p-4
                sm:p-5
              "
            >
              <a
                href={course.certificatePdf}
                download
                className="
                  mx-auto
                  flex
                  min-h-11
                  w-full
                  max-w-sm
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  via-cyan-500
                  to-cyan-400
                  px-4
                  py-2.5
                  text-xs
                  font-bold
                  text-white
                  shadow-lg
                  shadow-cyan-500/20
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-cyan-500/40
                  min-[400px]:rounded-2xl
                  sm:text-sm
                "
              >
                <FaDownload aria-hidden="true" />
                Download Certificate
              </a>
            </div>
          </>
        ) : (
          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              px-4
              py-12
              text-center
              min-[400px]:px-6
              min-[400px]:py-14
              sm:px-10
              sm:py-20
            "
          >
            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                border
                border-cyan-400/20
                bg-cyan-400/10
                text-2xl
                text-cyan-300
                shadow-[0_0_45px_rgba(34,211,238,0.15)]
                min-[400px]:h-20
                min-[400px]:w-20
                min-[400px]:rounded-3xl
                min-[400px]:text-3xl
              "
            >
              <FaInfoCircle aria-hidden="true" />
            </div>

            <p
              className="
                mt-5
                text-lg
                font-black
                text-white
                min-[400px]:mt-6
                min-[400px]:text-xl
                sm:text-2xl
              "
            >
              No Certificate Available For This Course
            </p>

            <p
              className="
                mt-3
                max-w-md
                text-xs
                leading-6
                text-slate-400
                min-[400px]:text-sm
              "
            >
              This course is still in progress, so a certificate has not been
              issued yet.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="
                mt-6
                min-h-11
                rounded-xl
                border
                border-cyan-400/30
                bg-cyan-400/10
                px-6
                py-2.5
                text-xs
                font-bold
                text-cyan-200
                transition
                hover:-translate-y-0.5
                hover:bg-cyan-400/15
                min-[400px]:mt-7
                min-[400px]:rounded-2xl
                min-[400px]:text-sm
              "
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

    window.requestAnimationFrame(() => {
      certificateTriggerRef.current?.focus();
    });
  };

  const openCertificate = (course: Course) => {
    certificateTriggerRef.current =
      document.activeElement as HTMLElement | null;

    setSelectedCourse(course);
  };

  return (
    <section
      id="courses"
      className="
        relative
        w-full
        overflow-hidden
        px-3
        py-14
        text-white
        min-[400px]:px-4
        min-[400px]:py-16
        sm:px-6
        sm:py-20
        lg:px-8
        lg:py-24
      "
    >
      <div className="relative mx-auto w-full max-w-7xl">
        {/* Heading */}
        <header className="mb-9 text-center min-[400px]:mb-10 sm:mb-12 lg:mb-14">
          <div
            className="
              mb-3
              inline-flex
              items-center
              gap-1.5
              rounded-full
              border
              border-cyan-400/20
              bg-cyan-400/[0.045]
              px-3
              py-1.5
              text-[8px]
              font-bold
              uppercase
              tracking-[1.6px]
              text-cyan-300
              min-[400px]:gap-2
              min-[400px]:px-4
              min-[400px]:text-[9px]
              min-[400px]:tracking-[2px]
              sm:text-xs
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)]" />
            Learning Journey
          </div>

          <h2
            className="
              text-[27px]
              font-black
              leading-[1.08]
              tracking-[-0.035em]
              text-white
              min-[400px]:text-3xl
              sm:text-4xl
              lg:text-5xl
              xl:text-[3.4rem]
            "
          >
            Courses &amp;{" "}
            <span
              className="
                bg-gradient-to-r
                from-cyan-300
                via-sky-400
                to-blue-500
                bg-clip-text
                text-transparent
              "
            >
              Certifications
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-[290px]
              text-[11px]
              leading-6
              text-slate-500
              min-[400px]:mt-4
              min-[400px]:max-w-md
              min-[400px]:text-xs
              sm:max-w-2xl
              sm:text-sm
              sm:leading-7
              lg:text-base
            "
          >
            Courses I have completed and the programs I am currently pursuing.
          </p>

          {/* Minimal divider */}
          <div className="mx-auto mt-6 h-px w-14 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent min-[400px]:mt-7 sm:mt-8" />
        </header>

        {/* Course Grid */}
        <div
          className="
            grid
            grid-cols-1
            gap-3.5
            min-[400px]:gap-4
            sm:grid-cols-2
            sm:gap-5
            lg:grid-cols-3
            lg:gap-6
          "
        >
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
          <CertificateModal
            course={selectedCourse}
            onClose={closeCertificate}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
