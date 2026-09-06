"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { IconType } from "react-icons";

import { FaGithub, FaNodeJs } from "react-icons/fa";

import {
  FiCode,
  FiTerminal,
  FiTriangle,
} from "react-icons/fi";

import {
  VscCode,
  VscExtensions,
} from "react-icons/vsc";

type ToolItem = {
  name: string;
  description: string;
  tags: string[];
  icon: IconType;
};

const tools: ToolItem[] = [
  {
    name: "GitHub",
    description:
      "I use GitHub to manage source code, maintain clean version history, and collaborate efficiently with development teams.",
    tags: ["Git", "Collaboration"],
    icon: FaGithub,
  },
  {
    name: "Terminal",
    description:
      "The terminal helps me work efficiently with Git, package managers, development scripts, builds, and automation.",
    tags: ["CLI", "Productivity"],
    icon: FiTerminal,
  },
  {
    name: "Node.js",
    description:
      "Node.js allows me to work beyond the frontend and build APIs, backend services, integrations, and full-stack applications.",
    tags: ["Backend", "API"],
    icon: FaNodeJs,
  },
  {
    name: "Deployment",
    description:
      "I use modern deployment workflows to move applications from development to production reliably and efficiently.",
    tags: ["Deployment", "Production"],
    icon: FiTriangle,
  },
  {
    name: "Extensions",
    description:
      "I use carefully selected VS Code extensions for formatting, debugging, code quality, productivity, and a cleaner workflow.",
    tags: ["Workflow", "Quality"],
    icon: VscExtensions,
  },
];

function getCardPosition(index: number) {
  switch (index) {
    case 0:
      return "left-[88px] top-1/2 -translate-y-1/2";

    case 1:
      return "left-[70px] top-[70px]";

    case 2:
      return "right-[70px] top-[70px]";

    case 3:
      return "right-[70px] bottom-[70px]";

    case 4:
      return "left-[70px] bottom-[70px]";

    default:
      return "left-[88px] top-1/2 -translate-y-1/2";
  }
}

export default function ProductivitySection() {
  const reduceMotion = useReducedMotion();

  const [isOrbitHovered, setIsOrbitHovered] =
    useState(false);

  const [activeTool, setActiveTool] =
    useState<number | null>(null);

  return (
    <section
      id="developer-tools"
      className="
        relative
        w-full
        overflow-hidden
        bg-gradient-to-b
        from-black
        via-[#020817]
        to-black
        px-4
        py-20
        text-white
        sm:px-6
        sm:py-24
        lg:px-8
      "
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[650px]
          w-[650px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-500/[0.06]
          blur-[170px]
        "
      />

      {/* Background grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.06]
          [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]
          [background-size:55px_55px]
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 22,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <div
            className="
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-cyan-400/20
              bg-cyan-400/[0.05]
              px-4
              py-2
            "
          >
            <span
              className="
                h-2
                w-2
                rounded-full
                bg-cyan-400
                shadow-[0_0_14px_rgba(34,211,238,0.8)]
              "
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-cyan-300
                sm:text-xs
              "
            >
              For Recruiters
            </span>
          </div>

          <h2
            className="
              text-3xl
              font-black
              tracking-tight
              sm:text-4xl
              lg:text-5xl
            "
          >
            Tools That Power{" "}
            <span
              className="
                bg-gradient-to-r
                from-blue-400
                via-cyan-300
                to-sky-400
                bg-clip-text
                text-transparent
              "
            >
              My Productivity
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-slate-400
              sm:text-base
            "
          >
            These are some of the tools I use to write cleaner code,
            collaborate effectively, solve problems faster, and build
            maintainable applications.
          </p>
        </motion.div>

        {/* Desktop orbit */}
        <div
          className="
            relative
            mx-auto
            mt-16
            hidden
            h-[720px]
            max-w-[1000px]
            items-center
            justify-center
            overflow-visible
            md:flex
          "
        >
          {/* Floating wrapper */}
          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    y: [0, -6, 0, 6, 0],
                  }
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              relative
              flex
              h-[620px]
              w-[620px]
              items-center
              justify-center
              overflow-visible
            "
          >
            {/* Outer ring */}
            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[500px]
                w-[500px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-cyan-400/10
              "
            />

            {/* Dashed ring */}
            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[430px]
                w-[430px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-dashed
                border-blue-400/15
              "
            />

            {/* Inner ring */}
            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[275px]
                w-[275px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-cyan-400/[0.08]
              "
            />

            {/* Orbit */}
            <motion.div
              onMouseEnter={() =>
                setIsOrbitHovered(true)
              }
              onMouseLeave={() => {
                setIsOrbitHovered(false);
                setActiveTool(null);
              }}
              animate={
                reduceMotion
                  ? { rotate: 0 }
                  : isOrbitHovered
                    ? undefined
                    : { rotate: 360 }
              }
              transition={{
                duration: 36,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                left-1/2
                top-1/2
                h-[500px]
                w-[500px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                overflow-visible
              "
            >
              {tools.map((tool, index) => {
                const Icon = tool.icon;

                const angle =
                  (360 / tools.length) * index;

                const radians =
                  (angle * Math.PI) / 180;

                const radius = 250;

                const x =
                  Math.cos(radians) * radius;

                const y =
                  Math.sin(radians) * radius;

                const isActive =
                  activeTool === index;

                return (
                  <motion.div
                    key={tool.name}
                    style={{
                      left: "50%",
                      top: "50%",
                      x,
                      y,
                    }}
                    className="
                      absolute
                      z-30
                      -ml-8
                      -mt-8
                      overflow-visible
                    "
                    animate={
                      reduceMotion
                        ? { rotate: 0 }
                        : isOrbitHovered
                          ? undefined
                          : { rotate: -360 }
                    }
                    transition={{
                      duration: 36,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    onMouseEnter={() => {
                      setActiveTool(index);
                      setIsOrbitHovered(true);
                    }}
                    onMouseLeave={() => {
                      setActiveTool(null);
                      setIsOrbitHovered(false);
                    }}
                  >
                    {/* Tool icon */}
                    <motion.div
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              scale: 1.1,
                              y: -4,
                            }
                      }
                      whileTap={{
                        scale: 0.97,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 180,
                        damping: 22,
                        mass: 0.8,
                      }}
                      className="
                        group
                        relative
                        flex
                        h-16
                        w-16
                        cursor-pointer
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-cyan-400/25
                        bg-[#071426]/95
                        text-2xl
                        text-cyan-300
                        shadow-[0_0_30px_rgba(34,211,238,0.12)]
                        backdrop-blur-xl
                        transition-colors
                        duration-300
                        hover:border-cyan-300/60
                        hover:bg-cyan-400/10
                        hover:text-cyan-100
                      "
                    >
                      <Icon />

                      <span
                        className="
                          pointer-events-none
                          absolute
                          inset-[-10px]
                          -z-10
                          rounded-[22px]
                          bg-cyan-400/15
                          opacity-0
                          blur-xl
                          transition-opacity
                          duration-500
                          group-hover:opacity-100
                        "
                      />
                    </motion.div>

                    {/* Tool name */}
                    <span
                      className="
                        absolute
                        left-1/2
                        top-[76px]
                        -translate-x-1/2
                        whitespace-nowrap
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        text-slate-500
                      "
                    >
                      {tool.name}
                    </span>

                    {/* Hover card */}
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 0.94,
                        x: isActive ? 0 : 6,
                        y: isActive ? 0 : 6,
                        filter: isActive
                          ? "blur(0px)"
                          : "blur(5px)",
                        pointerEvents: isActive
                          ? "auto"
                          : "none",
                      }}
                      transition={{
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`
                        absolute
                        z-[100]
                        w-[280px]
                        rounded-2xl
                        border
                        border-cyan-400/20
                        bg-[#06111f]/95
                        p-4
                        shadow-[0_25px_70px_rgba(0,0,0,0.75)]
                        backdrop-blur-2xl
                        ${getCardPosition(index)}
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-cyan-400/20
                            bg-cyan-400/10
                            text-lg
                            text-cyan-300
                          "
                        >
                          <Icon />
                        </span>

                        <div>
                          <h3 className="text-sm font-bold text-white">
                            {tool.name}
                          </h3>

                          <p
                            className="
                              mt-1.5
                              text-[11px]
                              leading-5
                              text-slate-400
                            "
                          >
                            {tool.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {tool.tags.map((tag) => (
                          <span
                            key={tag}
                            className="
                              rounded-full
                              border
                              border-cyan-400/10
                              bg-cyan-400/[0.06]
                              px-2.5
                              py-1
                              text-[8px]
                              font-bold
                              uppercase
                              tracking-[0.12em]
                              text-cyan-300
                            "
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Center glow */}
            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : {
                      scale: [1, 1.08, 1],
                      opacity: [0.5, 0.75, 0.5],
                    }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-64
                w-64
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-blue-500/20
                blur-[80px]
              "
            />

            {/* Center VS Code icon */}
            <motion.div
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      scale: 1.05,
                    }
              }
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 22,
              }}
              className="
                relative
                z-40
                flex
                h-44
                w-44
                items-center
                justify-center
                rounded-full
                border
                border-cyan-400/35
                bg-gradient-to-br
                from-[#071426]
                via-[#041020]
                to-[#02101e]
                shadow-[0_0_90px_rgba(14,165,233,0.22)]
                backdrop-blur-2xl
              "
            >
              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.04, 1],
                        rotate: [
                          0,
                          1,
                          0,
                          -1,
                          0,
                        ],
                      }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  text-[76px]
                  text-sky-400
                  drop-shadow-[0_0_22px_rgba(56,189,248,0.45)]
                "
              >
                <VscCode />
              </motion.div>

              <span
                className="
                  absolute
                  right-8
                  top-7
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-emerald-400
                  shadow-[0_0_13px_rgba(52,211,153,0.9)]
                "
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile */}
        <div className="mt-14 md:hidden">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-10 flex justify-center"
          >
            <motion.div
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, -5, 0],
                    }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                flex
                h-32
                w-32
                items-center
                justify-center
                rounded-full
                border
                border-cyan-400/30
                bg-[#071426]
                shadow-[0_0_50px_rgba(14,165,233,0.16)]
              "
            >
              <VscCode className="text-[64px] text-sky-400" />
            </motion.div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {tools.map((tool, index) => {
              const Icon = tool.icon;

              return (
                <motion.article
                  key={tool.name}
                  initial={{
                    opacity: 0,
                    y: 22,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -4,
                        }
                  }
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.035]
                    p-5
                    transition-colors
                    duration-300
                    hover:border-cyan-400/25
                    hover:bg-cyan-400/[0.04]
                  "
                >
                  <span
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-cyan-400/20
                      bg-cyan-400/10
                      text-xl
                      text-cyan-300
                    "
                  >
                    <Icon />
                  </span>

                  <h3 className="mt-4 font-bold text-white">
                    {tool.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {tool.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {tool.tags.map((tag) => (
                      <span
                        key={tag}
                        className="
                          rounded-full
                          border
                          border-cyan-400/10
                          bg-cyan-400/[0.06]
                          px-2.5
                          py-1
                          text-[9px]
                          font-bold
                          uppercase
                          text-cyan-300
                        "
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Recruiter message */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto
            mt-10
            max-w-3xl
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            p-6
            text-center
            sm:p-7
          "
        >
          <FiCode className="mx-auto text-2xl text-cyan-300" />

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-sm
              leading-7
              text-slate-400
              sm:text-base
            "
          >
            I use development tools not simply to write more code,
            but to solve problems clearly, maintain quality,
            collaborate efficiently, and deliver dependable web
            experiences.
          </p>

          <p
            className="
              mt-4
              text-xs
              font-bold
              uppercase
              tracking-[0.18em]
              text-cyan-300
            "
          >
            Tools support the workflow. Problem solving drives it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

