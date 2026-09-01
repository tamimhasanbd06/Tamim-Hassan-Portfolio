import LockBanner from "@/components/LockBanner";
import LookSkills from "@/components/LookSkills";
import Lockedcontact from "@/components/Lockedcontact";
import Library from "@/components/Library";
import { createPageMetadata } from "./site-config";
import Courses from "@/components/Courses";
import AiTools from "@/components/aitools";

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

      <Lockedcontact />

      <Library/>

      <Courses/>

<AiTools/>

    </main>
  );
}
