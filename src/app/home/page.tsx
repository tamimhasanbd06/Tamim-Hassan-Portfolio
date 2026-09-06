import Navbar from "@/components/home/Navbar";
import Banner from "@/components/home/Banner";
import Introduction from "@/components/home/Introduction";
import About from "@/components/home/About";
import Skill from "@/components/home/Skill";
import Projects from "@/components/home/Projects";
import Experience from "@/components/home/Experience";
import Education from "@/components/home/Education";
import FAQ from "@/components/home/FAQ";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";
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
