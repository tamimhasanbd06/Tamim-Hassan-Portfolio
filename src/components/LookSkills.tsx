import type { ReactNode } from "react";
import { FaJsSquare, FaPython } from "react-icons/fa";
import { SiNextdotjs, SiTypescript } from "react-icons/si";

type Skill = {
  name: string;
  full: string;
  icon: ReactNode;
};

const skills: Skill[] = [
  {
    name: "JavaScript",
    full: "JavaScript Programming Language",
    icon: <FaJsSquare />,
  },
  {
    name: "TypeScript",
    full: "Type-safe JavaScript at scale",
    icon: <SiTypescript />,
  },
  {
    name: "Next.js",
    full: "Production-ready React framework",
    icon: <SiNextdotjs />,
  },
  {
    name: "Python",
    full: "Powerful language for modern development",
    icon: <FaPython />,
  },
];

const LookSkills = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#000814] to-black" />

      {/* Glow */}
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-40 sm:w-72 h-40 sm:h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />

      <div className="absolute bottom-10 right-5 sm:right-20 w-52 sm:w-96 h-52 sm:h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 lg:py-24">
        {/* Title */}
        <h1 className="text-center font-extrabold mb-12 sm:mb-16 text-3xl sm:text-5xl md:text-7xl">
          My <span className="text-cyan-300">Skills</span>
        </h1>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 place-items-center">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="
                relative w-full max-w-[260px]
                h-72 sm:h-80 md:h-[340px]
                flex flex-col items-center justify-center text-center

                rounded-2xl sm:rounded-3xl
                bg-white/5 backdrop-blur-xl
                border border-white/10 shadow-2xl

                transition-all duration-300
                active:scale-95 sm:hover:scale-110
                hover:border-cyan-400/40
              "
            >
              {/* Glow */}
              <div className="absolute -inset-4 sm:-inset-6 bg-blue-500/20 blur-3xl rounded-3xl opacity-70" />

              {/* Icon */}
              <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-5 z-10 text-cyan-300">
                {skill.icon}
              </div>

              {/* Name */}
              <h2 className="text-xl sm:text-2xl font-bold z-10">
                {skill.name}
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-white/60 px-4 mt-2 z-10">
                {skill.full}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LookSkills;