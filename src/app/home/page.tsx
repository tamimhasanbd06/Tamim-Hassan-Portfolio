
import Navbar from "@/components/Main/Navbar";
import Banner from "@/components/Main/Banner";
import Introduction from "@/components/Main/Introduction";
import About from "@/components/Main/About-My";
import Skill from "@/components/Main/My-Tech-Stack";
import Projects from "@/components/Main/Project-Gallery";
import Experience from "@/components/Main/Experience";
import Education from "@/components/Main/My-Education";
import FAQ from "@/components/Main/Have-Questions";
import Contact from "@/components/Main/Contact-Me";
import Footer from "@/components/Main/Footer";
import FloatingNavigator from "@/components/navigation/FloatingNavigator";
import { createPageMetadata } from "../site-config";
import Services from "@/components/Main/Services";

export const metadata = createPageMetadata({
  title: "Web Developer Portfolio",
  description:
    "Explore Tamim Hasan's frontend web developer portfolio, projects, Next.js and TypeScript skills, education, experience, FAQ, and contact details.",
  path: "/home",
});

export default function HomePage() {
  return (
    <main className="portfolio-surface portfolio-home relative isolate min-h-screen min-h-dvh w-full overflow-x-clip bg-[var(--bg-primary)] text-white">

      {/* SAME BACKGROUND AS THE CV PAGE */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        {/* Blue and cyan radial gradients */}
        <div
          className="
            absolute inset-0
            bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.10),transparent_35%)]
          "
        />

        {/* Blue ambient glow */}
        <div
          className="
            absolute
            -left-40 top-0
            h-[480px] w-[480px]
            rounded-full
            bg-blue-600/10
            blur-[160px]
          "
        />

        {/* Cyan ambient glow */}
        <div
          className="
            absolute
            -bottom-52 right-[-120px]
            h-[520px] w-[520px]
            rounded-full
            bg-cyan-400/10
            blur-[170px]
          "
        />
      </div>

      {/* PAGE CONTENT */}
      <div className="relative z-10 min-h-screen min-h-dvh w-full">
        <Navbar />

        <section id="home" className="scroll-mt-16">
          <Banner />
        </section>

        <section id="introduction" className="scroll-mt-16">
          <Introduction />
        </section>

        <section id="about" className="scroll-mt-16">
          <About />
        </section>

        <section id="services" className="scroll-mt-16">
          <Services />
        </section>

        <section id="skills" className="scroll-mt-16">
          <Skill />
        </section>

        <section id="projects" className="scroll-mt-16">
          <Projects />
        </section>

        <section id="experience" className="scroll-mt-16">
          <Experience />
        </section>

        <section id="education" className="scroll-mt-16">
          <Education />
        </section>

        <section id="faq" className="scroll-mt-16">
          <FAQ />
        </section>

        <section id="contact" className="scroll-mt-16">
          <Contact />
        </section>

        <Footer />

        <FloatingNavigator />
      </div>
    </main>
  );
}
