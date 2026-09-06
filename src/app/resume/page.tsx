import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import PdfDownloadButton from "@/components/common/PdfDownloadButton";
import { createPageMetadata } from "../site-config";

import {
  FaArrowLeft,
  FaBriefcase,
  FaCode,
  FaEnvelope,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";

export const metadata: Metadata = createPageMetadata({
  title: "Resume - Frontend Web Developer",
  description:
    "View and download the professional resume of Tamim Hasan, a frontend web developer skilled in Next.js, React, TypeScript, JavaScript, Node.js, Express.js, and MongoDB.",
  path: "/resume",
});

type Skill = {
  category: string;
  items: string;
};

type Project = {
  name: string;
  type: string;
  description: string;
  technologies: string;
  demo?: string;
};

type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
};

const skills: Skill[] = [
  {
    category: "Frontend Development",
    items:
      "Next.js, React.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, DaisyUI, HeroUI",
  },
  {
    category: "Backend Development",
    items: "Node.js, Express.js, MongoDB, REST API",
  },
  {
    category: "Development Tools",
    items:
      "GitHub, Git, Vercel, Netlify, Visual Studio Code, Vite, Antigravity",
  },
  {
    category: "Design & UI Tools",
    items:
      "Figma, Canva, Adobe Photoshop, Responsive Design, UI/UX Implementation",
  },
  {
    category: "Professional Skills",
    items:
      "Problem-solving, teamwork, communication, public speaking, self-learning, and continuous improvement",
  },
];

const experiences: Experience[] = [
  {
    role: "Frontend Web Developer",
    company: "IONIC Corporation",
    location: "Dhaka, Bangladesh",
    period: "Professional Experience",
    description: [
      "Develop responsive and modern web interfaces using React.js, Next.js, TypeScript, JavaScript, and Tailwind CSS.",
      "Convert UI designs and project requirements into reusable and maintainable frontend components.",
      "Work with REST APIs and integrate frontend applications with backend services.",
      "Identify and resolve frontend bugs, responsive issues, and user interface inconsistencies.",
      "Use Git and GitHub for source control and collaborative development workflows.",
    ],
  },
];

const projects: Project[] = [
  {
    name: "Bank Loan Calculator",
    type: "Frontend Web Application",
    description:
      "An interactive financial application where users can calculate estimated monthly loan payments using loan amount, interest rate, and payment duration.",
    technologies:
      "React.js, Material UI, Emotion, Styled Components, Chart.js, Tailwind CSS",
    demo: "https://bank-loan-calculator.vercel.app",
  },
  {
    name: "Tile Gallery",
    type: "Full-Stack Web Application",
    description:
      "A full-stack tile discovery platform featuring tile browsing, favorites, authentication, personal profiles, and collection management.",
    technologies:
      "React.js, Node.js, Express.js, MongoDB, Tailwind CSS",
  },
];

const courses = [
  {
    title: "Programming Hero Level 1",
    meta: "Batch 13 — Running",
  },
  {
    title: "Programming Hero 14 Day Bootcamp",
    meta: "Completed",
  },
  {
    title: "Presentation and Public Speaking",
    meta: "10 Minute School — Completed",
  },
];

export default function ResumePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
      {/* =========================
          BACKGROUND
      ========================== */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.10),transparent_35%)]" />

      <div className="fixed -left-40 top-0 h-[480px] w-[480px] rounded-full bg-blue-600/10 blur-[160px]" />

      <div className="fixed -bottom-52 right-[-120px] h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-[170px]" />

      {/* =========================
          PAGE CONTAINER
      ========================== */}
      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* =========================
            PAGE CONTROLS
        ========================== */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/home"
            className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-gray-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
          >
            <FaArrowLeft />
            Back to Portfolio
          </Link>

          <PdfDownloadButton
            source="/assets/documents/Tamim-Hasan-Resume.pdf"
            filename="Tamim-Hasan-Resume.pdf"
            label="Download My Resume"
            className="group flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/30"
          />
        </div>

        {/* =========================
            RESUME CONTAINER
        ========================== */}
        <article className="overflow-hidden rounded-[30px] border border-white/10 bg-[#07101d]/90 shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          {/* =========================
              HEADER
          ========================== */}
          <header className="relative overflow-hidden border-b border-white/10 px-6 py-10 sm:px-10 lg:px-14">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/15 blur-[100px]" />

            <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-cyan-400/10 blur-[100px]" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              {/* LEFT */}
              <div>
                <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />

                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>

                  Open to opportunities
                </div>

                <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                  Tamim{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    Hasan
                  </span>
                </h1>

                <p className="mt-3 text-lg font-semibold text-cyan-300 sm:text-xl">
                  Frontend Web Developer
                </p>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400">
                  Frontend developer focused on building responsive,
                  accessible, scalable, and high-performance web
                  applications with modern JavaScript technologies.
                </p>
              </div>

              {/* RIGHT / CONTACT */}
              <div className="space-y-3 text-sm text-gray-400">
                <div className="relative mb-5 h-24 w-24 overflow-hidden rounded-2xl border border-cyan-400/25 bg-[#020817] shadow-[0_16px_45px_rgba(6,182,212,0.18)] lg:ml-auto">
                  <Image
                    src="/assets/images/me.jpg"
                    alt="Tamim Hasan, frontend web developer"
                    fill
                    priority
                    sizes="96px"
                    className="object-cover object-top"
                  />
                </div>

                <p className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 shrink-0 text-pink-400" />

                  <span>
                    Bandar, Narayanganj, Dhaka, Bangladesh
                  </span>
                </p>

                <a
                  href="tel:+8801883650010"
                  className="flex items-center gap-3 transition hover:text-cyan-300"
                >
                  <FaPhoneAlt className="text-emerald-400" />

                  +880 1883-650010
                </a>

                <a
                  href="mailto:tamimhasanbd06@gmail.com"
                  className="flex items-center gap-3 transition hover:text-cyan-300"
                >
                  <FaEnvelope className="text-blue-400" />

                  tamimhasanbd06@gmail.com
                </a>
              </div>
            </div>
          </header>

          {/* =========================
              MAIN CONTENT
          ========================== */}
          <div className="grid gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_300px] lg:px-14">
            {/* =========================
                LEFT COLUMN
            ========================== */}
            <div className="space-y-10">
              {/* PROFILE */}
              <ResumeSection
                icon={<FaUser />}
                title="Professional Profile"
              >
                <p className="leading-7 text-gray-400">
                  Motivated frontend web developer with practical
                  experience building modern web interfaces and
                  full-stack applications. I work primarily with
                  Next.js, React.js, TypeScript, JavaScript, and
                  Tailwind CSS while also having backend knowledge
                  in Node.js, Express.js, and MongoDB.
                </p>

                <p className="mt-4 leading-7 text-gray-400">
                  I enjoy transforming project requirements and
                  designs into clean, reusable, responsive, and
                  maintainable applications. I continuously improve
                  my development skills by working on practical
                  projects and exploring modern web technologies.
                </p>
              </ResumeSection>

              {/* EXPERIENCE */}
              <ResumeSection
                icon={<FaBriefcase />}
                title="Professional Experience"
              >
                <div className="space-y-5">
                  {experiences.map((experience) => (
                    <article
                      key={`${experience.role}-${experience.company}`}
                      className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition-all duration-300 hover:border-cyan-400/25 hover:bg-white/[0.055]"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-white transition group-hover:text-cyan-200">
                            {experience.role}
                          </h3>

                          <p className="mt-1 font-semibold text-cyan-300">
                            {experience.company}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            {experience.location}
                          </p>
                        </div>

                        <span className="w-fit rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-300">
                          {experience.period}
                        </span>
                      </div>

                      <ul className="mt-5 space-y-3">
                        {experience.description.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-sm leading-6 text-gray-400"
                          >
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />

                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </ResumeSection>

              {/* PROJECTS */}
              <ResumeSection
                icon={<FaCode />}
                title="Featured Projects"
              >
                <div className="space-y-5">
                  {projects.map((project) => (
                    <article
                      key={project.name}
                      className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:bg-white/[0.055]"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-white transition group-hover:text-cyan-200">
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

                      <p className="mt-4 text-sm leading-7 text-gray-400">
                        {project.description}
                      </p>

                      <p className="mt-5 text-xs leading-6 text-gray-500">
                        <span className="font-bold text-gray-300">
                          Technologies:
                        </span>{" "}
                        {project.technologies}
                      </p>
                    </article>
                  ))}
                </div>
              </ResumeSection>

              {/* EDUCATION */}
              <ResumeSection
                icon={<FaGraduationCap />}
                title="Education"
              >
                <div className="space-y-4">
                  <EducationRow
                    title="Alim (Qawmi) — Kafiya Jamaat"
                    institution="Jaharpur Al-Fatah Darul Ulum Qawmi Madrasa"
                    location="Jaharpur, Barpara, Bandar, Narayanganj"
                    status="Ended"
                  />

                  <EducationRow
                    title="Secondary Education — Class 9"
                    institution="Cauliflower English High School"
                    location="Farmgate, Dhaka, near Holy Cross"
                    status="Running"
                  />
                </div>
              </ResumeSection>
            </div>

            {/* =========================
                RIGHT COLUMN
            ========================== */}
            <aside className="space-y-8">
              {/* SKILLS */}
              <SideSection title="Technical Skills">
                <div className="space-y-5">
                  {skills.map((skill) => (
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

              {/* COURSES */}
              <SideSection title="Courses & Training">
                <ul className="space-y-5">
                  {courses.map((course) => (
                    <li key={course.title}>
                      <p className="text-sm font-bold leading-6 text-gray-200">
                        {course.title}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {course.meta}
                      </p>
                    </li>
                  ))}
                </ul>
              </SideSection>

              {/* CAREER FOCUS */}
              <SideSection title="Career Focus">
                <p className="text-sm leading-7 text-gray-400">
                  Seeking opportunities where I can contribute to
                  real-world frontend and full-stack projects while
                  improving my technical knowledge and professional
                  development skills.
                </p>
              </SideSection>

              {/* AVAILABILITY */}
              <SideSection title="Availability">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>

                  <span className="text-sm font-semibold text-emerald-300">
                    Open to Opportunities
                  </span>
                </div>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Available for frontend development opportunities,
                  practical projects, collaboration, and learning
                  opportunities.
                </p>
              </SideSection>

              {/* CONTACT */}
              <SideSection title="Contact">
                <div className="space-y-4">
                  <a
                    href="tel:+8801883650010"
                    className="flex items-start gap-3 text-sm text-gray-400 transition hover:text-cyan-300"
                  >
                    <FaPhoneAlt className="mt-1 shrink-0 text-emerald-400" />

                    <span>+880 1883-650010</span>
                  </a>

                  <a
                    href="mailto:tamimhasanbd06@gmail.com"
                    className="flex items-start gap-3 break-all text-sm text-gray-400 transition hover:text-cyan-300"
                  >
                    <FaEnvelope className="mt-1 shrink-0 text-blue-400" />

                    <span>tamimhasanbd06@gmail.com</span>
                  </a>

                  <p className="flex items-start gap-3 text-sm leading-6 text-gray-400">
                    <FaMapMarkerAlt className="mt-1 shrink-0 text-pink-400" />

                    <span>
                      Bandar, Narayanganj, Dhaka, Bangladesh
                    </span>
                  </p>
                </div>
              </SideSection>
            </aside>
          </div>

          {/* =========================
              FOOTER
          ========================== */}
          <footer className="border-t border-white/10 px-6 py-6 text-center sm:px-10">
            <p className="text-xs leading-6 text-gray-600">
              Thank you for reviewing my professional resume.
            </p>
          </footer>
        </article>
      </div>
    </main>
  );
}

/* =========================================================
   MAIN SECTION
========================================================= */

type ResumeSectionProps = {
  icon: ReactNode;
  title: string;
  children: ReactNode;
};

function ResumeSection({
  icon,
  title,
  children,
}: ResumeSectionProps) {
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

/* =========================================================
   SIDE SECTION
========================================================= */

type SideSectionProps = {
  title: string;
  children: ReactNode;
};

function SideSection({
  title,
  children,
}: SideSectionProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition-all duration-300 hover:border-cyan-400/20 hover:bg-white/[0.05]">
      <h2 className="border-b border-white/10 pb-3 text-sm font-black uppercase tracking-[0.18em] text-cyan-300">
        {title}
      </h2>

      <div className="mt-4">
        {children}
      </div>
    </section>
  );
}

/* =========================================================
   EDUCATION ROW
========================================================= */

type EducationRowProps = {
  title: string;
  institution: string;
  location: string;
  status: "Ended" | "Running";
};

function EducationRow({
  title,
  institution,
  location,
  status,
}: EducationRowProps) {
  const isRunning = status === "Running";

  return (
    <article className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:bg-white/[0.055]">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-bold text-white transition group-hover:text-cyan-200">
          {title}
        </h3>

        <span
          className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
            isRunning
              ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
              : "border-blue-400/20 bg-blue-400/10 text-blue-300"
          }`}
        >
          {status}
        </span>
      </div>

      <p className="mt-2 text-sm font-medium text-cyan-300">
        {institution}
      </p>

      <p className="mt-1 text-sm text-gray-500">
        {location}
      </p>

      {!isRunning && (
        <p className="mt-3 text-sm leading-6 text-gray-400">
          I studied up to Kafiya Jamaat.
        </p>
      )}
    </article>
  );
}
