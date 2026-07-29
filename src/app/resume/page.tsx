import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import PdfDownloadButton from "@/components/PdfDownloadButton";
import { createPageMetadata } from "../site-config";

import {
  FaArrowLeft,
  FaEnvelope,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

export const metadata: Metadata = createPageMetadata({
  title: "Resume - Frontend Web Developer",
  description:
    "View and download the professional resume of Md. Tamim Hasan, highlighting frontend development skills, projects, education, and courses.",
  path: "/resume",
});

const skills = [
  {
    title: "Front-End",
    value:
      "Next.js, React.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, DaisyUI, HeroUI",
  },
  {
    title: "Back-End",
    value: "Node.js, Express.js, MongoDB",
  },
  {
    title: "Tools",
    value:
      "GitHub, Vercel, Visual Studio Code, Antigravity",
  },
  {
    title: "Soft Skills",
    value:
      "Public speaking, communication, problem-solving, teamwork, and continuous learning",
  },
];

const projects = [
  {
    name: "Bank Loan Calculator",
    type: "Frontend Web Application",
    description:
      "An interactive online loan calculation platform that allows users to calculate estimated monthly payments based on loan amount, interest rate, and payment duration.",
    features: [
      "Calculate monthly loan payments instantly",
      "Interactive controls for loan amount and payment term",
      "Responsive financial data visualization",
      "Modern and accessible user interface",
    ],
    technologies:
      "React.js, Material UI, Emotion, Styled Components, Chart.js, Tailwind CSS",
    link: "https://bank-loan-calculator.vercel.app",
  },
  {
    name: "Tile Gallery",
    type: "Full-Stack Web Application",
    description:
      "A tile discovery and collection platform where users can browse different tiles, view complete details, save favorites, and manage personal collections.",
    features: [
      "Browse tiles and view detailed information",
      "Like and save favorite tiles",
      "Create and manage personal user profiles",
      "Manage personal tile collections",
      "Email-password and Google authentication",
    ],
    technologies:
      "React.js, Node.js, Express.js, MongoDB, Tailwind CSS",
  },
];

const personalInformation = [
  ["Full Name", "Md. Tamim Hasan"],
  ["Father’s Name", "Md. Abdul Wahab"],
  ["Date of Birth", "6 June 2010"],
  ["Religion", "Islam (Sunni)"],
  ["Marital Status", "Unmarried"],
  ["Gender", "Male"],
  [
    "Address",
    "Musapur, Bandar, Narayanganj, Dhaka, Bangladesh",
  ],
  ["Contact", "+880 1883-650010"],
];

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-[#07101d] px-3 py-6 text-[#182235] sm:px-6 sm:py-10 print:bg-white print:p-0">
      {/* Page controls */}
      <div className="mx-auto mb-6 flex max-w-[1100px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <Link
          href="/home"
          className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-gray-300 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
        >
          <FaArrowLeft />
          Back to Portfolio
        </Link>

        <PdfDownloadButton
          source="/Tamim-Hassan-Resume.pdf"
          filename="Tamim-Hassan-Resume.pdf"
          label="Download Resume"
          className="group flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-1 hover:shadow-cyan-500/30"
        />
      </div>

      {/* Resume document */}
      <article className="mx-auto max-w-[1100px] overflow-hidden bg-white shadow-[0_30px_100px_rgba(0,0,0,0.5)] print:max-w-none print:shadow-none">
        {/* Resume header */}
        <header className="relative overflow-hidden bg-[#071426] px-6 py-9 text-white sm:px-10 lg:px-12">
          <div className="absolute right-0 top-0 h-full w-2 bg-gradient-to-b from-blue-500 to-cyan-400" />

          <div className="absolute -right-24 -top-32 h-72 w-72 rounded-full bg-blue-500/20 blur-[90px]" />

          <div className="relative grid gap-7 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.26em] text-cyan-300">
                Professional Resume
              </p>

              <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                Md. Tamim Hasan
              </h1>

              <p className="mt-3 text-lg font-bold uppercase tracking-[0.18em] text-blue-300">
                Frontend Developer
              </p>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-300">
                Frontend developer focused on building
                responsive, accessible, modern, and
                high-performance web applications.
              </p>
            </div>

            <div className="space-y-3 text-sm text-gray-300">
              <ContactLink
                href="https://maps.google.com/?q=Bandar,Narayanganj,Dhaka,Bangladesh"
                icon={<FaMapMarkerAlt />}
                external
              >
                Bandar, Narayanganj, Dhaka, Bangladesh
              </ContactLink>

              <ContactLink
                href="tel:+8801883650010"
                icon={<FaPhoneAlt />}
              >
                +880 1883-650010
              </ContactLink>

              <ContactLink
                href="mailto:tamimhasanbd06@gmail.com"
                icon={<FaEnvelope />}
              >
                tamimhasanbd06@gmail.com
              </ContactLink>
            </div>
          </div>
        </header>

        {/* Resume body */}
        <div className="grid lg:grid-cols-[1fr_310px]">
          {/* Main column */}
          <div className="space-y-9 px-6 py-9 sm:px-10 lg:px-12">
            {/* Professional summary */}
            <ResumeSection title="Professional Summary">
              <p className="text-sm leading-7 text-slate-600">
                I am a motivated and passionate frontend
                developer specializing in creating dynamic,
                responsive, and user-friendly web
                applications. I have practical experience
                building projects with React, Next.js,
                TypeScript, JavaScript, Tailwind CSS,
                Express.js, and MongoDB.
              </p>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Through my personal projects and Programming
                Hero learning journey, I have developed
                knowledge of responsive interface design,
                authentication, API integration, database
                management, and modern frontend development
                practices. I am eager to contribute my skills
                to a professional team and continue growing
                through real-world development work.
              </p>
            </ResumeSection>

            {/* Skills */}
            <ResumeSection title="Technical Skills">
              <div className="overflow-hidden rounded-xl border border-slate-200">
                {skills.map((skill, index) => (
                  <div
                    key={skill.title}
                    className={`grid gap-2 px-4 py-3 sm:grid-cols-[125px_1fr] ${
                      index !== skills.length - 1
                        ? "border-b border-slate-200"
                        : ""
                    } ${
                      index % 2 === 0
                        ? "bg-slate-50"
                        : "bg-white"
                    }`}
                  >
                    <h3 className="text-sm font-bold text-blue-600">
                      {skill.title}
                    </h3>

                    <p className="text-sm leading-6 text-slate-600">
                      {skill.value}
                    </p>
                  </div>
                ))}
              </div>
            </ResumeSection>

            {/* Projects */}
            <ResumeSection title="Personal Projects">
              <div className="space-y-7">
                {projects.map((project) => (
                  <article key={project.name}>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-black text-[#071426]">
                          {project.name}
                        </h3>

                        <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-blue-600">
                          {project.type}
                        </p>
                      </div>

                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-fit items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-xs font-bold text-blue-600 transition hover:bg-blue-100"
                        >
                          Live Demo
                          <FaExternalLinkAlt />
                        </a>
                      )}
                    </div>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {project.description}
                    </p>

                    <h4 className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-slate-700">
                      Key Features
                    </h4>

                    <ul className="mt-2 space-y-1.5">
                      {project.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm leading-6 text-slate-600"
                        >
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-4 text-xs leading-6 text-slate-500">
                      <span className="font-bold text-slate-700">
                        Technologies:
                      </span>{" "}
                      {project.technologies}
                    </p>
                  </article>
                ))}
              </div>
            </ResumeSection>

            {/* Education */}
            <ResumeSection title="Educational Qualification">
              <div className="space-y-5">
                <EducationItem
                  title="Alim (Qawmi) — Kafia Level"
                  level="Class 12"
                  institution="Jaharpur Al-Fatah Darul Ulum Qawmi Madrasa"
                  location="Jaharpur, Barpara, Bandar, Narayanganj"
                  current
                />

                <EducationItem
                  title="Secondary Education"
                  level="Class 9"
                  institution="Cauliflower English High School"
                  location="Farmgate, Dhaka, near Holy Cross"
                  current
                />
              </div>
            </ResumeSection>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8 bg-[#f3f7fc] px-6 py-9 sm:px-10 lg:px-7">
            {/* Courses */}
            <SidebarSection title="Courses">
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-black text-[#071426]">
                    Programming Hero Level 1
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-blue-600">
                    Batch 13 — Currently Running
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-black text-[#071426]">
                    Presentation and Public Speaking
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    10 Minute School — Online
                  </p>
                </div>
              </div>
            </SidebarSection>

            {/* Personal details */}
            <SidebarSection title="Personal Information">
              <dl className="space-y-4">
                {personalInformation.map(
                  ([label, value]) => (
                    <div key={label}>
                      <dt className="text-[10px] font-black uppercase tracking-[0.14em] text-blue-600">
                        {label}
                      </dt>

                      <dd className="mt-1 text-sm leading-6 text-slate-600">
                        {value}
                      </dd>
                    </div>
                  ),
                )}
              </dl>
            </SidebarSection>

            {/* Reference */}
            <SidebarSection title="Reference">
              <h3 className="font-black text-[#071426]">
                Md. Shofiqul Islam
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                MERN Stack Developer
                <br />
                IONIC Corporation
                <br />
                Jurain, Dhaka, Bangladesh
              </p>

              <div className="mt-5 space-y-2">
                <a
                  href="tel:+8801917369303"
                  className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-cyan-600"
                >
                  <FaPhoneAlt className="text-xs" />
                  +880 1917-369303
                </a>

                <a
                  href="mailto:shofiq69303@gmail.com"
                  className="flex items-start gap-2 break-all text-sm font-semibold text-blue-600 hover:text-cyan-600"
                >
                  <FaEnvelope className="mt-1 shrink-0 text-xs" />
                  shofiq69303@gmail.com
                </a>
              </div>
            </SidebarSection>
          </aside>
        </div>

        {/* Confirmation */}
        <footer className="border-t border-slate-200 px-6 py-5 text-center">
          <p className="text-xs leading-6 text-slate-500">
            I confirm that the information provided in this
            resume is accurate to the best of my knowledge.
          </p>
        </footer>
      </article>
    </main>
  );
}

type ContactLinkProps = {
  href: string;
  icon: ReactNode;
  external?: boolean;
  children: ReactNode;
};

function ContactLink({
  href,
  icon,
  external = false,
  children,
}: ContactLinkProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-start gap-3 transition hover:text-cyan-300"
    >
      <span className="mt-1 shrink-0 text-cyan-400">
        {icon}
      </span>

      <span>{children}</span>
    </a>
  );
}

type ResumeSectionProps = {
  title: string;
  children: ReactNode;
};

function ResumeSection({
  title,
  children,
}: ResumeSectionProps) {
  return (
    <section>
      <div className="mb-5 flex items-center gap-4">
        <h2 className="shrink-0 text-base font-black uppercase tracking-[0.1em] text-[#071426] sm:text-lg">
          {title}
        </h2>

        <div className="h-[2px] flex-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
      </div>

      {children}
    </section>
  );
}

type SidebarSectionProps = {
  title: string;
  children: ReactNode;
};

function SidebarSection({
  title,
  children,
}: SidebarSectionProps) {
  return (
    <section>
      <h2 className="border-b-2 border-blue-500 pb-2 text-sm font-black uppercase tracking-[0.13em] text-[#071426]">
        {title}
      </h2>

      <div className="mt-4">{children}</div>
    </section>
  );
}

type EducationItemProps = {
  title: string;
  level: string;
  institution: string;
  location: string;
  current?: boolean;
};

function EducationItem({
  title,
  level,
  institution,
  location,
  current = false,
}: EducationItemProps) {
  return (
    <article className="relative border-l-2 border-blue-500 pl-5">
      <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-blue-500 bg-white" />

      <div className="flex flex-wrap items-center gap-3">
        <h3 className="font-black text-[#071426]">
          {title}
        </h3>

        {current && (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-600">
            Current
          </span>
        )}
      </div>

      <p className="mt-1 text-sm font-bold text-blue-600">
        {level}
      </p>

      <p className="mt-2 text-sm font-semibold text-slate-700">
        {institution}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        {location}
      </p>
    </article>
  );
}
