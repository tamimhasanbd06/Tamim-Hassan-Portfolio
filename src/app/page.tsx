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
    <main className="relative min-h-[100dvh] w-full overflow-x-clip bg-[#020508]">

      {/* =========================================
          PREMIUM DARK NAVY / CYAN BACKGROUND
          ========================================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background: `
            radial-gradient(
              circle at 10% 12%,
              rgba(12, 35, 75, 0.42) 0%,
              rgba(7, 24, 52, 0.24) 18%,
              rgba(2, 8, 16, 0) 42%
            ),

            radial-gradient(
              circle at 48% 20%,
              rgba(7, 27, 48, 0.30) 0%,
              rgba(3, 12, 22, 0.12) 28%,
              rgba(2, 5, 8, 0) 58%
            ),

            radial-gradient(
              circle at 84% 62%,
              rgba(0, 48, 53, 0.30) 0%,
              rgba(0, 30, 34, 0.16) 20%,
              rgba(0, 8, 12, 0) 48%
            ),

            radial-gradient(
              circle at 18% 88%,
              rgba(5, 25, 45, 0.28) 0%,
              rgba(2, 8, 15, 0) 44%
            ),

            linear-gradient(
              180deg,
              #020508 0%,
              #020812 38%,
              #02060d 72%,
              #000000 100%
            )
          `,
        }}
      />

      {/* Main Content */}
      <LockBanner />

      <WhatICanDo />

      <LookSkills />

      <LockedContact />

      <Library />

      <Courses />

      <AiTools />

      <ProductivitySection />

      <DevelopmentJourney />

      <HowIBuildWebsites />

      {/* GitHub Activity */}
      <GitHubActivity />

      <FloatingNavigator
        sections={lockSections}
        homeHref="/home"
      />
    </main>
  );
}