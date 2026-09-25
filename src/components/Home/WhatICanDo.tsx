"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaLaptopCode,
  FaServer,
  FaPaintBrush,
  FaTools,
} from "react-icons/fa";

import TypewriterText from "@/components/common/TypewriterText";

type SkillCategory = {
  category: string;
  items: string;
};

const iconMap: Record<string, React.ReactNode> = {
  "Frontend Development": (
    <FaLaptopCode className="text-[clamp(1.7rem,5vw,2.5rem)] text-cyan-300" />
  ),

  "Backend Development": (
    <FaServer className="text-[clamp(1.7rem,5vw,2.5rem)] text-blue-400" />
  ),

  "Design & UI Tools": (
    <FaPaintBrush className="text-[clamp(1.7rem,5vw,2.5rem)] text-purple-400" />
  ),

  "Development Tools": (
    <FaTools className="text-[clamp(1.7rem,5vw,2.5rem)] text-indigo-400" />
  ),
};

const accentMap: Record<
  string,
  {
    border: string;
    glow: string;
    line: string;
    iconBg: string;
  }
> = {
  "Frontend Development": {
    border: "border-cyan-400/25 hover:border-cyan-300/60",
    glow: "group-hover:shadow-[0_0_55px_rgba(34,211,238,0.16)]",
    line: "from-transparent via-cyan-300 to-transparent",
    iconBg: "bg-cyan-400/[0.06]",
  },

  "Backend Development": {
    border: "border-blue-400/25 hover:border-blue-300/60",
    glow: "group-hover:shadow-[0_0_55px_rgba(59,130,246,0.16)]",
    line: "from-transparent via-blue-400 to-transparent",
    iconBg: "bg-blue-400/[0.06]",
  },

  "Design & UI Tools": {
    border: "border-purple-400/25 hover:border-purple-300/60",
    glow: "group-hover:shadow-[0_0_55px_rgba(168,85,247,0.16)]",
    line: "from-transparent via-purple-400 to-transparent",
    iconBg: "bg-purple-400/[0.06]",
  },

  "Development Tools": {
    border: "border-indigo-400/25 hover:border-indigo-300/60",
    glow: "group-hover:shadow-[0_0_55px_rgba(99,102,241,0.16)]",
    line: "from-transparent via-indigo-400 to-transparent",
    iconBg: "bg-indigo-400/[0.06]",
  },
};

export default function WhatICanDo() {
  const [capabilities, setCapabilities] = useState<SkillCategory[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/WhatICanDo.json");

        if (!response.ok) {
          throw new Error("Failed to load capabilities");
        }

        const data: SkillCategory[] = await response.json();

        setCapabilities(data);
      } catch (error) {
        console.error("Error loading capabilities:", error);
      }
    };

    loadData();
  }, []);

  return (
    <section
      id="what-i-can-do"
      className="
        theme-section
        relative
        isolate
        w-full
        overflow-hidden
        bg-transparent
        px-3
        py-20
        min-[300px]:px-3
        min-[360px]:px-4
        sm:px-6
        md:px-8
        lg:px-12
        xl:px-16
        2xl:px-20
      "
    >
      {/* =========================================================
          SUBTLE DECORATIVE AMBIENCE
          IMPORTANT:
          This is NOT a static background.
          It remains transparent and only adds ambient glow.
      ========================================================== */}

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-180px]
          top-[-160px]
          -z-10
          h-[320px]
          w-[320px]
          rounded-full
          bg-cyan-400/[0.045]
          blur-[110px]
          sm:h-[480px]
          sm:w-[480px]
          sm:bg-cyan-400/[0.055]
        "
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 25, 0],
                y: [0, 18, 0],
                scale: [1, 1.08, 1],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-180px]
          top-[20%]
          -z-10
          h-[340px]
          w-[340px]
          rounded-full
          bg-blue-500/[0.035]
          blur-[120px]
          sm:h-[500px]
          sm:w-[500px]
          sm:bg-blue-500/[0.045]
        "
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -25, 0],
                y: [0, -20, 0],
                scale: [1, 1.1, 1],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =========================================================
          FLOATING PARTICLES
      ========================================================== */}

      <motion.span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[10%]
          top-[22%]
          h-1
          w-1
          rounded-full
          bg-cyan-300
          shadow-[0_0_15px_rgba(103,232,249,0.9)]
        "
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -18, 0],
                opacity: [0.25, 0.8, 0.25],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[12%]
          top-[35%]
          h-1.5
          w-1.5
          rounded-full
          bg-blue-400
          shadow-[0_0_18px_rgba(59,130,246,0.8)]
        "
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, 20, 0],
                opacity: [0.2, 0.75, 0.2],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* =========================================================
          MAIN CONTAINER
      ========================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1800px]
        "
      >
        {/* =======================================================
            HEADER
        ======================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 25,
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
            duration: reduceMotion ? 0 : 0.7,
          }}
          className="
            mx-auto
            mb-12
            flex
            w-full
            max-w-4xl
            flex-col
            items-center
            text-center
            sm:mb-16
            lg:mb-20
          "
        >
          {/* Badge */}

          <div
            className="
              mb-5
              inline-flex
              max-w-full
              items-center
              gap-2
              rounded-full
              border
              border-cyan-400/25
              bg-cyan-400/[0.035]
              px-3
              py-2
              shadow-[0_0_30px_rgba(34,211,238,0.04)]
              backdrop-blur-xl
              sm:mb-6
              sm:px-5
              sm:py-2.5
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                shrink-0
                rounded-full
                bg-cyan-300
                shadow-[0_0_12px_rgba(103,232,249,0.9)]
                sm:h-2
                sm:w-2
              "
            />

            <span
              className="
                whitespace-nowrap
                text-[8px]
                font-bold
                uppercase
                tracking-[1.5px]
                text-cyan-300
                min-[360px]:text-[9px]
                sm:text-xs
                sm:tracking-[3px]
              "
            >
              My Capabilities
            </span>
          </div>

          {/* Heading */}

          <h2
            className="
              text-center
              text-[clamp(2rem,8vw,4.8rem)]
              font-black
              leading-[0.95]
              tracking-[-0.045em]
              text-white
            "
          >
            <TypewriterText text="What I Can" />{" "}
            <span
              className="
                bg-gradient-to-r
                from-cyan-300
                via-sky-400
                to-blue-500
                bg-clip-text
                text-transparent
              "
            >
              Do
            </span>
          </h2>

          {/* Futuristic divider */}

          <div
            className="
              mt-6
              flex
              w-full
              max-w-[220px]
              items-center
              justify-center
              gap-2
              sm:mt-8
              sm:max-w-[300px]
              sm:gap-3
            "
          >
            <span
              className="
                h-px
                flex-1
                bg-gradient-to-r
                from-transparent
                to-cyan-400/70
              "
            />

            <span
              className="
                h-1.5
                w-1.5
                shrink-0
                rounded-full
                bg-cyan-300
                shadow-[0_0_14px_rgba(103,232,249,0.9)]
                sm:h-2
                sm:w-2
              "
            />

            <span
              className="
                h-px
                flex-1
                bg-gradient-to-l
                from-transparent
                to-cyan-400/70
              "
            />
          </div>

          <p
            className="
              mt-5
              max-w-2xl
              px-2
              text-[11px]
              leading-5
              text-white/40
              min-[360px]:text-xs
              sm:mt-6
              sm:text-sm
              sm:leading-6
            "
          >
            Modern frontend engineering, scalable development, creative UI
            systems, and professional development workflows.
          </p>
        </motion.div>

        {/* =======================================================
            CARDS GRID
        ======================================================== */}

        <div
          className="
            grid
            w-full
            grid-cols-1
            gap-4
            min-[480px]:gap-5
            sm:grid-cols-2
            sm:gap-6
            lg:grid-cols-4
            lg:gap-5
            xl:gap-6
            2xl:gap-7
          "
        >
          {capabilities.map((skill, index) => {
            const accent =
              accentMap[skill.category] ?? accentMap["Frontend Development"];

            return (
              <motion.div
                key={skill.category}
                initial={{
                  opacity: 0,
                  y: reduceMotion ? 0 : 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.6,
                  delay: reduceMotion ? 0 : index * 0.08,
                  ease: "easeOut",
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -8,
                      }
                }
                className={`
                  group
                  relative
                  min-w-0
                  overflow-hidden
                  rounded-[1.4rem]
                  border
                  ${accent.border}
                  bg-white/[0.018]
                  px-5
                  py-7
                  text-center
                  backdrop-blur-xl
                  transition-all
                  duration-500
                  ${accent.glow}
                  min-[360px]:rounded-[1.6rem]
                  min-[360px]:px-6
                  sm:px-6
                  sm:py-8
                  lg:px-5
                  lg:py-7
                  xl:px-7
                  xl:py-9
                  2xl:px-8
                  2xl:py-10
                `}
              >
                {/* Card top glow */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-0
                    h-px
                    w-2/3
                    -translate-x-1/2
                    bg-gradient-to-r
                    from-transparent
                    via-cyan-300/60
                    to-transparent
                    opacity-70
                  "
                />

                {/* Corner glow */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-40
                    w-40
                    rounded-full
                    bg-cyan-400/[0.04]
                    blur-3xl
                    transition-all
                    duration-500
                    group-hover:bg-cyan-400/[0.09]
                  "
                />

                {/* =================================================
                    ICON
                ================================================== */}

                <div
                  className={`
                    relative
                    mx-auto
                    mb-6
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/10
                    ${accent.iconBg}
                    shadow-[inset_0_0_25px_rgba(255,255,255,0.015)]
                    transition-all
                    duration-500
                    group-hover:scale-110
                    group-hover:border-white/20
                    sm:h-20
                    sm:w-20
                    sm:rounded-3xl
                  `}
                >
                  {/* Icon ring */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -inset-1
                      rounded-[inherit]
                      border
                      border-white/[0.035]
                    "
                  />

                  {iconMap[skill.category] || (
                    <FaLaptopCode className="text-3xl text-cyan-300" />
                  )}
                </div>

                {/* =================================================
                    TITLE
                ================================================== */}

                <h3
                  className="
                    mx-auto
                    min-h-[48px]
                    max-w-[240px]
                    text-[15px]
                    font-bold
                    leading-6
                    text-white
                    sm:text-base
                    lg:text-[15px]
                    xl:text-base
                    2xl:text-lg
                  "
                >
                  {skill.category}
                </h3>

                {/* Accent line */}

                <div className="mx-auto my-5 flex items-center justify-center">
                  <span
                    className={`
                      h-[2px]
                      w-12
                      rounded-full
                      bg-gradient-to-r
                      ${accent.line}
                      shadow-[0_0_10px_rgba(34,211,238,0.25)]
                      transition-all
                      duration-500
                      group-hover:w-20
                    `}
                  />
                </div>

                {/* =================================================
                    SKILLS
                ================================================== */}

                <p
                  className="
                    mx-auto
                    max-w-[280px]
                    text-[11px]
                    font-medium
                    leading-6
                    tracking-wide
                    text-white/45
                    min-[360px]:text-xs
                    sm:text-[11px]
                    lg:text-[10px]
                    xl:text-xs
                    2xl:text-sm
                  "
                >
                  {skill.items
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean)
                    .map((item, itemIndex, array) => (
                      <span key={`${skill.category}-${item}`}>
                        {item}

                        {itemIndex < array.length - 1 && (
                          <span className="mx-1.5 text-cyan-400/60">
                            •
                          </span>
                        )}
                      </span>
                    ))}
                </p>

                {/* =================================================
                    BOTTOM LIGHT
                ================================================== */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    bottom-0
                    left-1/2
                    h-px
                    w-1/2
                    -translate-x-1/2
                    bg-gradient-to-r
                    from-transparent
                    via-cyan-400/40
                    to-transparent
                    opacity-40
                    transition-all
                    duration-500
                    group-hover:w-3/4
                    group-hover:opacity-80
                  "
                />
              </motion.div>
            );
          })}
        </div>

        {/* =======================================================
            BOTTOM STATUS
        ======================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          className="
            mx-auto
            mt-10
            flex
            max-w-2xl
            items-center
            justify-center
            gap-3
            text-center
            sm:mt-14
          "
        >
          <span
            className="
              h-1.5
              w-1.5
              shrink-0
              rounded-full
              bg-cyan-300
              shadow-[0_0_10px_rgba(103,232,249,0.8)]
            "
          />

          <span
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[2px]
              text-white/25
              sm:text-[10px]
              sm:tracking-[3px]
            "
          >
            Design • Develop • Deploy
          </span>

          <span
            className="
              h-1.5
              w-1.5
              shrink-0
              rounded-full
              bg-blue-400
              shadow-[0_0_10px_rgba(59,130,246,0.8)]
            "
          />
        </motion.div>
      </div>
    </section>
  );
}