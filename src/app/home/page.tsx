import Navbar from "@/components/Home/Navbar";
import Banner from "@/components/Home/Banner";
import Introduction from "@/components/Home/Introduction";
import About from "@/components/Home/About-My";
import Skill from "@/components/Home/My-Tech-Stack";
import Projects from "@/components/Home/Project-Gallery";
import Experience from "@/components/Home/Experience";
import Education from "@/components/Home/My-Education";
import FAQ from "@/components/home/Have-Questions";
import Contact from "@/components/Home/Contact-Me";
import Footer from "@/components/Home/Footer";
import FloatingNavigator from "@/components/navigation/FloatingNavigator";
import { createPageMetadata } from "../site-config";

export const metadata = createPageMetadata({
  title: "Web Developer Portfolio",
  description:
    "Explore Tamim Hasan's frontend web developer portfolio, projects, Next.js and TypeScript skills, education, experience, FAQ, and contact details.",
  path: "/home",
});

export default function HomePage() {
  return (
    <main className="min-h-screen w-full overflow-x-clip bg-black">
      <Navbar />

      <section
        id="home"
        className="scroll-mt-16"
      >
        <Banner />
      </section>

      <section
        id="introduction"
        className="scroll-mt-16"
      >
        <Introduction />
      </section>

      <section
        id="about"
        className="scroll-mt-16"
      >
        <About />
      </section>

      <section
        id="skills"
        className="scroll-mt-16"
      >
        <Skill />
      </section>

      <section
        id="projects"
        className="scroll-mt-16"
      >
        <Projects />
      </section>

      <section
        id="experience"
        className="scroll-mt-16"
      >
        <Experience />
      </section>

      <section
        id="education"
        className="scroll-mt-16"
      >
        <Education />
      </section>

      <section
        id="faq"
        className="scroll-mt-16"
      >
        <FAQ />
      </section>

      <section
        id="contact"
        className="scroll-mt-16"
      >
        <Contact />
      </section>

      <Footer />

      <FloatingNavigator />
    </main>
  );
}
