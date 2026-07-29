import LockBanner from "@/components/LockBanner";
import LookSkills from "@/components/LookSkills";
import Lockedcontact from "@/components/Lockedcontact";
import { createPageMetadata } from "./site-config";

export const metadata = createPageMetadata({
  title: "Tamim Hassan Portfolio | Frontend Web Developer",
  description:
    "Discover Tamim Hassan's frontend web developer portfolio, core skills, contact information, CV, resume, and modern web development work.",
  path: "/",
});

export default function LockPage() {
  return (
    <main className="min-h-screen w-full overflow-x-clip bg-black">
      <LockBanner />

      <LookSkills />

      <Lockedcontact />
    </main>
  );
}
