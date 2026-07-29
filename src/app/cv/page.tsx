import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import PdfDownloadButton from "@/components/PdfDownloadButton";
import { createPageMetadata } from "../site-config";

import {
  FaArrowLeft,
  FaBriefcase,
  FaEnvelope,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";

export const metadata: Metadata = createPageMetadata({
  title: "CV - Frontend Web Developer",
  description:
    "View and download the professional CV of Md. Tamim Hasan, a frontend web developer skilled in Next.js, React, TypeScript, and JavaScript.",
  path: "/cv",
});

type Skill = {
  category: string;
  items: string;
};

type Project = {
  name: string;
  type: string;
  description: string;
  features: string[];
  technologies: string;
  demo?: string;
};

const skills: Skill[] = [
  {
    category: "Front-End",
    items:
      "Next.js, React.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, DaisyUI, HeroUI",
  },
  {
    category: "Back-End",
    items: "Node.js, Express.js, MongoDB",
  },
  {
    category: "Development Tools",
    items:
      "GitHub, Vercel, Visual Studio Code, Antigravity",
  },
  {
    category: "Soft Skills",
    items:
      "Public speaking, communication, problem-solving, teamwork, and continuous learning",
  },
];

const projects: Project[] = [
  {
    name: "Bank Loan Calculator",
    type: "Frontend Web Application",
    description:
      "An interactive loan calculation platform where users can enter a loan amount, interest rate, and payment term to calculate estimated monthly payments instantly.",
    features: [
      "Calculate monthly loan payments instantly",
      "Interactive controls for loan amounts and payment terms",
      "Responsive financial data visualization",
      "Modern and accessible user interface",
    ],
    technologies:
      "React.js, Material UI, Emotion, Styled Components, Chart.js, and Tailwind CSS",
    demo: "https://bank-loan-calculator.vercel.app",
  },
  {
    name: "Tile Gallery",
    type: "Full-Stack Web Application",
    description:
      "A tile discovery and collection platform where users can browse different tiles, view complete information, save favorites, and manage personal collections.",
    features: [
      "Detailed tile browsing functionality",
      "Favorite and like functionality",
      "Personal user profiles and collections",
      "Email and password authentication",
      "Google authentication",
    ],
    technologies:
      "React.js, Node.js, Express.js, MongoDB, and Tailwind CSS",
  },
];

const personalInformation = [
  {
    label: "Full Name",
    value: "Md. Tamim Hasan",
  },
  {
    label: "Father’s Name",
    value: "Md. Abdul Wahab",
  },
  {
    label: "Date of Birth",
    value: "6 June 2010",
  },
  {
    label: "Religion",
    value: "Islam (Sunni)",
  },
  {
    label: "Marital Status",
    value: "Unmarried",
  },
  {
    label: "Gender",
    value: "Male",
  },
  {
    label: "Present and Permanent Address",
    value:
      "Musapur, Bandar, Narayanganj, Dhaka, Bangladesh",
  },
  {
    label: "Contact Number",
    value: "+880 1883-650010",
  },
];

export default function CVPage() {
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

          <PdfDownloadButton
            source="/Tamim-Hassan-CV.pdf"
            filename="Tamim-Hassan-CV.pdf"
            label="Download My CV"
            className="group flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/30"
          />
        </div>

        {/* CV container */}
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

                  Open to opportunities
                </div>

                <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                  Md. Tamim{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    Hasan
                  </span>
                </h1>

                <p className="mt-3 text-lg font-semibold text-cyan-300 sm:text-xl">
                  Frontend Developer
                </p>

                <p className="mt-4 max-w-xl text-sm leading-7 text-gray-400">
                  Building responsive, accessible, and
                  high-performance web applications with modern
                  frontend technologies.
                </p>
              </div>

              {/* Contact details */}
              <div className="space-y-3 text-sm text-gray-400">
                <p className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 shrink-0 text-pink-400" />

                  <span>
                    Bandar, Narayanganj, Dhaka,
                    Bangladesh
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

          {/* Main content */}
          <div className="grid gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[1fr_300px] lg:px-14">
            {/* Left column */}
            <div className="space-y-10">
              {/* Professional summary */}
              <CVSection
                icon={<FaUser />}
                title="Professional Summary"
              >
                <p className="leading-7 text-gray-400">
                  Motivated frontend developer focused on
                  creating responsive, accessible, and
                  high-performance web applications.
                  Experienced in building practical projects
                  using React, Next.js, TypeScript,
                  JavaScript, Tailwind CSS, Express.js, and
                  MongoDB.
                </p>

                <p className="mt-4 leading-7 text-gray-400">
                  I am passionate about modern web development
                  and continuously improving my technical
                  knowledge. I am eager to contribute my
                  skills, learn from experienced development
                  teams, and grow through real-world projects.
                </p>
              </CVSection>

              {/* Projects */}
              <CVSection
                icon={<FaBriefcase />}
                title="Personal Projects"
              >
                <div className="space-y-5">
                  {projects.map((project) => (
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

              {/* Education */}
              <CVSection
                icon={<FaGraduationCap />}
                title="Educational Qualification"
              >
                <div className="space-y-4">
                  <EducationRow
                    title="Alim (Qawmi) — Kafia Level, Class 12"
                    institution="Jaharpur Al-Fatah Darul Ulum Qawmi Madrasa"
                    location="Jaharpur, Barpara, Bandar, Narayanganj"
                  />

                  <EducationRow
                    title="Secondary Education — Class 9"
                    institution="Cauliflower English High School"
                    location="Farmgate, Dhaka, near Holy Cross"
                    current
                  />
                </div>
              </CVSection>
            </div>

            {/* Right column */}
            <aside className="space-y-8">
              {/* Skills */}
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

              {/* Courses */}
              <SideSection title="Courses">
                <ul className="space-y-5 text-sm leading-6 text-gray-400">
                  <li>
                    <span className="font-bold text-gray-200">
                      Programming Hero Level 1
                    </span>

                    <br />

                    <span className="text-gray-500">
                      Batch 13 — Running
                    </span>
                  </li>

                  <li>
                    <span className="font-bold text-gray-200">
                      Presentation and Public Speaking
                    </span>

                    <br />

                    <span className="text-gray-500">
                      10 Minute School, Online
                    </span>
                  </li>
                </ul>
              </SideSection>

              {/* Personal information */}
              <SideSection title="Personal Information">
                <dl className="space-y-4">
                  {personalInformation.map((item) => (
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

              {/* Reference */}
              <SideSection title="Reference">
                <p className="font-bold text-white">
                  Md. Shofiqul Islam
                </p>

                <p className="mt-1 text-sm leading-6 text-gray-400">
                  MERN Stack Developer
                  <br />
                  IONIC Corporation
                  <br />
                  Jurain, Dhaka, Bangladesh
                </p>

                <a
                  href="tel:+8801917369303"
                  className="mt-4 flex items-center gap-2 text-sm text-blue-400 transition hover:text-cyan-300"
                >
                  <FaPhoneAlt className="text-xs" />
                  +880 1917-369303
                </a>

                <a
                  href="mailto:shofiq69303@gmail.com"
                  className="mt-2 flex items-start gap-2 break-all text-sm text-blue-400 transition hover:text-cyan-300"
                >
                  <FaEnvelope className="mt-1 shrink-0 text-xs" />
                  shofiq69303@gmail.com
                </a>
              </SideSection>
            </aside>
          </div>

          {/* Bottom message */}
          <footer className="border-t border-white/10 px-6 py-6 text-center sm:px-10">
            <p className="text-xs leading-6 text-gray-600">
              I confirm that the information provided above
              is accurate to the best of my knowledge.
            </p>
          </footer>
        </article>
      </div>
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
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-bold text-white">
          {title}
        </h3>

        {current && (
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
