import LockBanner from "@/components/lock/MainBanner";
import LookSkills from "@/components/lock/MySkills";
import LockedContact from "@/components/lock/Get-In-Touch";
import Library from "@/components/lock/My-Toolkit";
import { createPageMetadata } from "./site-config";
import Courses from "@/components/lock/Courses-&-Certifications";
import AiTools from "@/components/lock/AI-Stack";
import ProductivitySection from "@/components/lock/Developer-Toolkit";
import FloatingNavigator from "@/components/navigation/FloatingNavigator";
import DevelopmentJourney from "@/components/lock/DevelopmentJourney";
import HowIBuildWebsites from "@/components/lock/HowIBuildWebsites";

const lockSections = [
  {
    label: "Banner",
    id: "lock-hero",
  },
  {
    label: "Skills",
    id: "lock-skills",
  },
  {
    label: "Social",
    id: "lock-social",
  },
  {
    label: "Libraries",
    id: "libraries",
  },
  {
    label: "Certificates",
    id: "courses",
  },
  {
    label: "AI Tools",
    id: "ai-tools",
  },
  {
    label: "Productivity",
    id: "developer-tools",
  },
  {
    label: "Development Journey",
    id: "development-journey",
  },
  {
    label: "How I Build Websites",
    id: "how-i-build-websites",
  },
];

export const metadata = createPageMetadata({
  title:
    "Tamim Hasan Portfolio | Frontend Web Developer",
  description:
    "Discover Tamim Hasan's frontend web developer portfolio, core skills, contact information, CV, resume, and modern web development work.",
  path: "/",
});

export default function LockPage() {
  return (
    <main className="min-h-screen w-full overflow-x-clip bg-black">
      <LockBanner />

      <LookSkills />

      <LockedContact />

      <Library />

      <Courses />

      <AiTools />

      <ProductivitySection />

      <DevelopmentJourney />

      <HowIBuildWebsites />

      <FloatingNavigator
        sections={lockSections}
        homeHref="/home"
      />
    </main>
  );
}