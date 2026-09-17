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
    <main className="min-h-screen w-full overflow-x-clip">
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


