"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaJsSquare, FaPython } from "react-icons/fa";
import { SiNextdotjs, SiTypescript } from "react-icons/si";

import skillsData from "../../../public/look/skills.json";

type SkillIcon =
  | "javascript"
  | "typescript"
  | "nextjs"
  | "python";

type Skill = {
  name: string;
  full: string;
  icon: SkillIcon;
};

const getSkillIcon = (icon: SkillIcon) => {
  switch (icon) {
    case "javascript":
      return <FaJsSquare />;

    case "typescript":
      return <SiTypescript />;

    case "nextjs":
      return <SiNextdotjs />;

    case "python":
      return <FaPython />;

    default:
      return null;
  }
};

const LookSkills = () => {
  const reduceMotion = useReducedMotion();

  const skills = skillsData as Skill[];

  return (
    <section
      id="lock-skills"
      className="relative min-h-screen w-full overflow-hidden text-white"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#000814] to-black" />

      {/* Glow */}
      <div className="absolute top-10 left-5 h-40 w-40 animate-pulse rounded-full bg-blue-500/20 blur-3xl sm:top-20 sm:left-10 sm:h-72 sm:w-72" />

      <div className="absolute right-5 bottom-10 h-52 w-52 animate-pulse rounded-full bg-cyan-400/10 blur-3xl sm:right-20 sm:h-96 sm:w-96" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
        {/* Title */}
        <motion.h1
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.7,
          }}
          className="mb-12 text-center text-3xl font-extrabold sm:mb-16 sm:text-5xl md:text-7xl"
        >
          My <span className="text-cyan-300">Skills</span>
        </motion.h1>

        {/* Grid */}
        <div className="grid grid-cols-1 place-items-center gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 32,
                scale: reduceMotion ? 1 : 0.96,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -12,
                      rotateX: 3,
                      scale: 1.035,
                    }
              }
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.5,
                delay: index * 0.07,
                ease: "easeOut",
              }}
              className="
                relative flex h-72 w-full max-w-[260px]
                flex-col items-center justify-center text-center

                rounded-2xl bg-white/5
                backdrop-blur-xl
                border border-white/10
                shadow-2xl

                transition-all duration-300
                active:scale-95
                sm:h-80 sm:rounded-3xl
                sm:hover:scale-110
                md:h-[340px]

                hover:border-cyan-400/40
              "
            >
              {/* Glow */}
              <div className="absolute -inset-4 rounded-3xl bg-blue-500/20 blur-3xl opacity-70 sm:-inset-6" />

              {/* Icon */}
              <div className="z-10 mb-3 text-4xl text-cyan-300 sm:mb-5 sm:text-5xl md:text-6xl">
                {getSkillIcon(skill.icon)}
              </div>

              {/* Name */}
              <h2 className="z-10 text-xl font-bold sm:text-2xl">
                {skill.name}
              </h2>

              {/* Description */}
              <p className="z-10 mt-2 px-4 text-xs text-white/60 sm:text-sm">
                {skill.full}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LookSkills;

