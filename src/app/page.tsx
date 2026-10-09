import LockBanner from "@/components/Home/MainBanner";
import LookSkills from "@/components/Home/MySkills";
import LockedContact from "@/components/Home/Get-In-Touch";
import Library from "@/components/Home/My-Toolkit";
import { createPageMetadata } from "./site-config";
import Courses from "@/components/Home/Courses-&-Certifications";
import AiTools from "@/components/Home/AI-Stack";
import ProductivitySection from "@/components/Home/Developer-Toolkit";
import FloatingNavigator from "@/components/navigation/FloatingNavigator";
import DevelopmentJourney from "@/components/Home/DevelopmentJourney";
import HowIBuildWebsites from "@/components/Home/HowIBuildWebsites";
import GitHubActivity from "@/components/Home/GitHubActivity";
import WhatICanDo from "@/components/Home/WhatICanDo";
import HomeFooter from "@/components/Home/HomeFooter";

const lockSections = [
  { label: "Banner", id: "lock-hero" },
  { label: "Skills", id: "lock-skills" },
  { label: "Social", id: "lock-social" },
  { label: "Libraries", id: "libraries" },
  { label: "Certificates", id: "courses" },
  { label: "AI Tools", id: "ai-tools" },
  { label: "Productivity", id: "developer-tools" },
  { label: "Development Journey", id: "development-journey" },
  { label: "How I Build Websites", id: "how-i-build-websites" },
  { label: "GitHub", id: "github" },
];

export const metadata = createPageMetadata({
  title: "Tamim Hasan Portfolio | Frontend Web Developer",
  description:
    "Discover Tamim Hasan's frontend web developer portfolio, core skills, contact information, CV, resume, and modern web development work.",
  path: "/",
});

export default function LockPage() {
  return (
    <main className="relative isolate min-h-screen min-h-dvh w-full overflow-x-clip bg-[var(--bg-primary)] text-white">
      {/* =====================================================
          GLOBAL REFERENCE BACKGROUND
          Dark Navy + Blue + Cyan Ambient Glow
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        {/* Base radial gradients */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.10),transparent_35%)]
          "
        />

        {/* Top-left blue ambient glow */}
        <div
          className="
            absolute -left-40 top-0
            h-[480px] w-[480px]
            rounded-full
            bg-blue-600/10
            blur-[160px]
          "
        />

        {/* Bottom-right cyan ambient glow */}
        <div
          className="
            absolute -bottom-52 right-[-120px]
            h-[520px] w-[520px]
            rounded-full
            bg-cyan-400/10
            blur-[170px]
          "
        />
      </div>

      {/* =====================================================
          PAGE CONTENT
          All sections remain above the shared background
      ====================================================== */}

      <div className="relative z-10 min-h-screen min-h-dvh w-full">
        {/* =====================================================
            HERO
        ====================================================== */}

        <LockBanner />

        {/* =====================================================
            WHAT I CAN DO
        ====================================================== */}

        <WhatICanDo />

        {/* =====================================================
            SKILLS
        ====================================================== */}

        <LookSkills />

        {/* =====================================================
            SOCIAL / CONTACT
        ====================================================== */}

        <LockedContact />

        {/* =====================================================
            TOOLKIT / LIBRARIES
        ====================================================== */}

        <Library />

        {/* =====================================================
            COURSES & CERTIFICATIONS
        ====================================================== */}

        <Courses />

        {/* =====================================================
            AI TOOLS
        ====================================================== */}

        <AiTools />

        {/* =====================================================
            DEVELOPER PRODUCTIVITY
        ====================================================== */}

        <ProductivitySection />

        {/* =====================================================
            DEVELOPMENT JOURNEY
        ====================================================== */}

        <DevelopmentJourney />

        {/* =====================================================
            HOW I BUILD WEBSITES
        ====================================================== */}

        <HowIBuildWebsites />

        {/* =====================================================
            GITHUB ACTIVITY
        ====================================================== */}

        <GitHubActivity />

        {/* =====================================================
            HOME FOOTER
        ====================================================== */}

        <HomeFooter />

        {/* =====================================================
            FLOATING NAVIGATOR
        ====================================================== */}

        <FloatingNavigator
          sections={lockSections}
          homeHref="/home"
        />
      </div>
    </main>
  );
}
