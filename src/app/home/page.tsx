import Navbar from "./Navbar";
import Banner from "./Banner";
import About from "./About";
import Skill from "./Skill";
import Projects from "./Projects";
import Experience from "./Experience";
import Education from "./Education";
import Contact from "./Contact";
import Footer from "./Footer";
import { createPageMetadata } from "../site-config";

export const metadata = createPageMetadata({
  title: "Web Developer Portfolio",
  description:
    "Explore Tamim Hasan's frontend web developer portfolio, projects, upcoming apps, Next.js and TypeScript skills, education, experience, and contact details.",
  path: "/home",
});

export default function HomePage() {
  return (
    <main className="min-h-screen w-full overflow-x-clip bg-black">
      <Navbar />

      <section id="home" className="scroll-mt-16">
        <Banner />
      </section>

      <section id="about" className="scroll-mt-16">
        <About />
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

      <section id="contact" className="scroll-mt-16">
        <Contact />
      </section>

      <Footer />
    </main>
  );
}
