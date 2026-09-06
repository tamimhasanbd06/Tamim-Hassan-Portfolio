import LockBanner from "@/components/lock/LockBanner";
import LookSkills from "@/components/lock/LookSkills";
import LockedContact from "@/components/lock/LockedContact";
import Library from "@/components/lock/Library";
import { createPageMetadata } from "./site-config";
import Courses from "@/components/lock/Courses";
import AiTools from "@/components/lock/AiTools";
import ProductivitySection from "@/components/lock/ProductivitySection";
import FloatingNavigator from "@/components/navigation/FloatingNavigator";

const lockSections = [
  { label: "Lock Banner", id: "lock-hero" },
  { label: "Skills", id: "lock-skills" },
  { label: "Social", id: "lock-social" },
  { label: "Libraries", id: "libraries" },
  { label: "Certificates", id: "courses" },
  { label: "AI Tools", id: "ai-tools" },
  { label: "Developer Tools", id: "developer-tools" },
];

export const metadata = createPageMetadata({
  title: "Tamim Hasan Portfolio | Frontend Web Developer",
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

      <Library/>

      <Courses/>

<AiTools/>

<ProductivitySection/>

      <FloatingNavigator sections={lockSections} homeHref="/home" />

    </main>
  );
}
