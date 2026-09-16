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
import Achievements from "@/components/Main/Achievements";
import OpenSource from "@/components/Main/OpenSource";

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

      <section id="achievements" className="scroll-mt-16">
        <Achievements />
      </section>

      <section id="opensource" className="scroll-mt-16">
        <OpenSource />
      </section>

      <section id="faq" className="scroll-mt-16">
        <FAQ />
      </section>

      <section id="contact" className="scroll-mt-16">
        <Contact />
      </section>

      <Footer />

      <FloatingNavigator />
    </main>
  );
}


