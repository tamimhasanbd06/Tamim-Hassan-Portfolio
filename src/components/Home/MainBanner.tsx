"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const LockBanner = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="lock-hero"
      className="
        theme-section
        relative
        min-h-[100dvh]
        w-full
        overflow-hidden
        bg-transparent
      "
    >
      {/* =========================================================
          FUTURISTIC AMBIENT EFFECTS
      ========================================================== */}

      {/* Top-right ambient glow */}
      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 30, 0],
                y: [0, -20, 0],
                scale: [1, 1.08, 1],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -right-32
          -top-32
          h-80
          w-80
          rounded-full
          bg-cyan-400/[0.06]
          blur-[110px]
          sm:h-[30rem]
          sm:w-[30rem]
        "
      />

      {/* Bottom-left ambient glow */}
      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -25, 0],
                y: [0, 25, 0],
                scale: [1, 1.1, 1],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -bottom-40
          -left-40
          h-96
          w-96
          rounded-full
          bg-blue-500/[0.055]
          blur-[120px]
          sm:h-[34rem]
          sm:w-[34rem]
        "
      />

      {/* =========================================================
          FUTURISTIC GRID
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
          [background-image:linear-gradient(rgba(34,211,238,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.5)_1px,transparent_1px)]
          [background-size:70px_70px]
          [mask-image:linear-gradient(to_bottom,black,transparent_75%)]
        "
      />

      {/* =========================================================
          FLOATING NEON ORBS
      ========================================================== */}

      {/* Left orb */}
      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -18, 0],
                opacity: [0.3, 0.7, 0.3],
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
          left-[8%]
          top-[20%]
          h-2
          w-2
          rounded-full
          bg-cyan-300
          shadow-[0_0_20px_rgba(34,211,238,0.9)]
        "
      />

      {/* Right orb */}
      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, 20, 0],
                opacity: [0.2, 0.8, 0.2],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="
          pointer-events-none
          absolute
          right-[9%]
          top-[32%]
          h-1.5
          w-1.5
          rounded-full
          bg-blue-400
          shadow-[0_0_18px_rgba(59,130,246,0.9)]
        "
      />

      {/* Center orb */}
      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.4, 1],
                opacity: [0.25, 0.8, 0.25],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          bottom-[25%]
          left-[45%]
          h-1.5
          w-1.5
          rounded-full
          bg-cyan-300
          shadow-[0_0_16px_rgba(34,211,238,0.9)]
        "
      />

      {/* =========================================================
          MAIN CONTENT
      ========================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[100dvh]
          w-full
          max-w-7xl
          items-center
          px-3
          py-14
          min-[360px]:px-4
          min-[400px]:px-5
          sm:px-8
          sm:py-20
          md:px-12
          lg:px-16
          xl:px-20
          2xl:max-w-[1440px]
        "
      >
        <div
          className="
            grid
            w-full
            grid-cols-1
            items-center
            gap-12
            min-[400px]:gap-14
            sm:gap-16
            lg:grid-cols-[0.95fr_1.05fr]
            lg:gap-16
            xl:gap-20
          "
        >
          {/* =====================================================
              LEFT CONTENT
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              ease: "easeOut",
            }}
            className="
              relative
              z-20
              flex
              min-w-0
              flex-col
              items-start
              text-left
            "
          >
            {/* Developer Badge */}
            <div
              className="
                mb-6
                flex
                max-w-full
                items-center
                gap-2
                rounded-full
                border
                border-cyan-400/30
                bg-cyan-400/[0.04]
                px-3
                py-2
                shadow-[0_0_30px_rgba(34,211,238,0.05)]
                backdrop-blur-xl
                min-[360px]:px-4
                sm:px-5
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  shrink-0
                  animate-pulse
                  rounded-full
                  bg-cyan-300
                  shadow-[0_0_12px_rgba(103,232,249,0.9)]
                  sm:h-2
                  sm:w-2
                "
              />

              <span
                className="
                  truncate
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[2px]
                  text-cyan-300
                  min-[360px]:text-[10px]
                  sm:text-xs
                  sm:tracking-[3px]
                "
              >
                Elite Frontend Developer
              </span>
            </div>

            {/* Heading */}
            <h1
              className="
                max-w-3xl
                text-left
                text-[clamp(2.15rem,10vw,5.5rem)]
                font-black
                leading-[0.98]
                tracking-[-0.04em]
                sm:text-[clamp(3rem,7vw,5.5rem)]
              "
            >
              <span className="text-white">
                Crafting
              </span>

              <br />

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
                Next-Level
              </span>

              <br />

              <span className="text-white">
                Digital{" "}
              </span>

              <span
                className="
                  bg-gradient-to-r
                  from-blue-400
                  to-cyan-300
                  bg-clip-text
                  text-transparent
                "
              >
                Experiences
              </span>
            </h1>

            {/* Accent Line */}
            <div
              className="
                mt-6
                flex
                items-center
                gap-2
                sm:mt-7
                sm:gap-3
              "
            >
              <span
                className="
                  h-px
                  w-8
                  bg-gradient-to-r
                  from-cyan-400
                  to-transparent
                  sm:w-12
                "
              />

              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-cyan-300
                  shadow-[0_0_12px_rgba(103,232,249,0.9)]
                "
              />

              <span
                className="
                  h-px
                  w-12
                  bg-gradient-to-r
                  from-cyan-400/60
                  to-transparent
                  sm:w-20
                "
              />
            </div>

            {/* Description */}
            <p
              className="
                mt-5
                max-w-xl
                text-sm
                leading-7
                text-white/60
                sm:mt-6
                sm:text-base
                md:text-lg
                md:leading-8
              "
            >
              <span className="font-semibold text-cyan-300">
                Transforming creative concepts
              </span>{" "}
              into high-performance web solutions with precision,
              innovation, and modern frontend engineering.
            </p>

            {/* =================================================
                BUTTONS
            ================================================== */}

            <div
              className="
                mt-7
                flex
                w-full
                flex-col
                gap-3
                sm:mt-8
                sm:w-auto
                sm:flex-row
                sm:gap-4
              "
            >
              {/* Go Home */}
              <Link
                href="/home"
                className="
                  group
                  relative
                  flex
                  min-h-12
                  w-full
                  items-center
                  justify-center
                  gap-3
                  overflow-hidden
                  rounded-xl
                  border
                  border-cyan-300/30
                  bg-gradient-to-r
                  from-blue-600
                  to-cyan-500
                  px-6
                  py-3.5
                  font-semibold
                  text-white
                  shadow-[0_0_30px_rgba(6,182,212,0.18)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-cyan-200/60
                  hover:shadow-[0_0_45px_rgba(6,182,212,0.35)]
                  sm:w-auto
                  sm:px-8
                "
              >
                <span
                  className="
                    absolute
                    inset-0
                    -translate-x-full
                    bg-gradient-to-r
                    from-transparent
                    via-white/20
                    to-transparent
                    transition-transform
                    duration-700
                    group-hover:translate-x-full
                  "
                />

                <span className="relative z-10">
                  Go to Home
                </span>

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="
                    relative
                    z-10
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-1
                  "
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              {/* Resume */}
              <Link
                href="/resume"
                className="
                  group
                  flex
                  min-h-12
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  border
                  border-cyan-400/30
                  bg-white/[0.025]
                  px-6
                  py-3.5
                  font-semibold
                  text-cyan-300
                  shadow-[inset_0_0_25px_rgba(34,211,238,0.02)]
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-cyan-300/70
                  hover:bg-cyan-400/[0.06]
                  hover:shadow-[0_0_35px_rgba(34,211,238,0.12)]
                  sm:w-auto
                  sm:px-8
                "
              >
                My Resume

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            {/* Tech Indicators */}
            <div
              className="
                mt-7
                flex
                flex-wrap
                items-center
                gap-2
                text-[9px]
                uppercase
                tracking-[1.5px]
                text-white/30
                sm:mt-8
                sm:text-xs
                sm:tracking-[2px]
              "
            >
              <span>React</span>

              <span className="text-cyan-400/50">
                •
              </span>

              <span>Next.js</span>

              <span className="text-cyan-400/50">
                •
              </span>

              <span>TypeScript</span>

              <span className="text-cyan-400/50">
                •
              </span>

              <span>Tailwind</span>
            </div>
          </motion.div>

          {/* =====================================================
              RIGHT IMAGE / FUTURISTIC FRAME
          ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : 50,
              scale: reduceMotion ? 1 : 0.94,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              delay: 0.15,
              ease: "easeOut",
            }}
            className="
              relative
              flex
              min-w-0
              justify-center
              lg:justify-end
            "
          >
            <motion.div
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -8,
                      scale: 1.015,
                    }
              }
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 18,
              }}
              className="
                relative
                w-full
                max-w-[560px]
              "
            >
              {/* Outer Neon Aura */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  -inset-5
                  rounded-[2.5rem]
                  bg-cyan-400/[0.04]
                  blur-[50px]
                  sm:-inset-8
                  sm:rounded-[3rem]
                  sm:blur-[60px]
                "
              />

              {/* =================================================
                  ROTATING FUTURISTIC RING
              ================================================== */}

              <motion.div
                aria-hidden="true"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        rotate: 360,
                      }
                }
                transition={{
                  duration: 28,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  -inset-2
                  rounded-[2.3rem]
                  border
                  border-cyan-400/20
                  border-t-cyan-300/70
                  border-r-blue-400/40
                  sm:-inset-3
                  sm:rounded-[2.8rem]
                "
              />

              {/* Second Ring */}
              <motion.div
                aria-hidden="true"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        rotate: -360,
                      }
                }
                transition={{
                  duration: 36,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  -inset-4
                  rounded-[2.7rem]
                  border
                  border-blue-400/10
                  border-b-cyan-400/40
                  sm:-inset-6
                  sm:rounded-[3.2rem]
                "
              />

              {/* =================================================
                  GLASS IMAGE FRAME
              ================================================== */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[1.5rem]
                  border
                  border-cyan-300/20
                  bg-white/[0.025]
                  p-1.5
                  shadow-[0_0_60px_rgba(6,182,212,0.08)]
                  backdrop-blur-xl
                  min-[400px]:rounded-[1.8rem]
                  min-[400px]:p-2
                  sm:rounded-[2.5rem]
                  sm:p-3
                "
              >
                {/* Scan Line */}
                <motion.div
                  aria-hidden="true"
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          x: ["-100%", "200%"],
                        }
                  }
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="
                    pointer-events-none
                    absolute
                    left-0
                    top-0
                    z-20
                    h-px
                    w-1/2
                    bg-gradient-to-r
                    from-transparent
                    via-cyan-300
                    to-transparent
                    opacity-60
                  "
                />

                {/* Image */}
                <Image
                  src="/assets/images/LockBannerImage.png"
                  alt="Tamim Hasan frontend developer"
                  width={520}
                  height={650}
                  priority
                  sizes="
                    (max-width: 400px) 92vw,
                    (max-width: 640px) 88vw,
                    (max-width: 1024px) 78vw,
                    (max-width: 1440px) 48vw,
                    520px
                  "
                  className="
                    relative
                    z-10
                    h-auto
                    w-full
                    rounded-[1.25rem]
                    object-cover
                    object-center
                    min-[400px]:rounded-[1.5rem]
                    sm:rounded-[2rem]
                  "
                />

                {/* Image Bottom Gradient */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    z-20
                    h-24
                    bg-gradient-to-t
                    from-[#020508]/70
                    to-transparent
                    sm:h-32
                  "
                />
              </div>

              {/* =================================================
                  CODE CARD
                  TOP-LEFT
                  STATIC
              ================================================== */}

              <div
                className="
                  absolute
                  left-0
                  top-4
                  z-30
                  hidden
                  w-40
                  rounded-2xl
                  border
                  border-cyan-400/20
                  bg-[#03101a]/75
                  p-3
                  shadow-[0_0_35px_rgba(34,211,238,0.08)]
                  backdrop-blur-xl
                  sm:block
                  sm:left-1
                  sm:top-6
                  sm:w-44
                  sm:p-4
                  lg:-left-8
                  lg:top-8
                "
              >
                {/* Window Controls */}
                <div className="mb-3 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-400/70" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400/70" />
                  <span className="h-2 w-2 rounded-full bg-green-400/70" />
                </div>

                {/* Code */}
                <div className="space-y-1 font-mono text-[8px] leading-relaxed sm:text-[9px]">
                  <p className="text-blue-300">
                    const developer
                  </p>

                  <p className="pl-2 text-white/40">
                    = {"{"}
                  </p>

                  <p className="pl-4 text-cyan-300">
                    build:{" "}
                    <span className="text-white/60">
                      "modern"
                    </span>
                  </p>

                  <p className="pl-4 text-cyan-300">
                    stack:{" "}
                    <span className="text-white/60">
                      "next"
                    </span>
                  </p>

                  <p className="pl-2 text-white/40">
                    {"}"}
                  </p>
                </div>
              </div>

              {/* =================================================
                  BUILD / CODE / DEPLOY CARD
              ================================================== */}

              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, 7, 0],
                      }
                }
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="
                  absolute
                  -bottom-4
                  left-0
                  z-30
                  hidden
                  rounded-2xl
                  border
                  border-blue-400/20
                  bg-[#03101a]/80
                  px-4
                  py-3
                  shadow-[0_0_35px_rgba(37,99,235,0.08)]
                  backdrop-blur-xl
                  sm:block
                  sm:-bottom-5
                  sm:left-1
                  sm:px-5
                  sm:py-4
                  lg:-left-8
                "
              >
                <div className="mb-3 flex items-end gap-1">
                  <span className="h-3 w-1 rounded-full bg-cyan-400/50" />
                  <span className="h-5 w-1 rounded-full bg-cyan-400/70" />
                  <span className="h-8 w-1 rounded-full bg-cyan-300" />
                  <span className="h-4 w-1 rounded-full bg-blue-400/70" />
                  <span className="h-10 w-1 rounded-full bg-blue-400" />
                  <span className="h-6 w-1 rounded-full bg-cyan-300/80" />
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-1.5
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[1.5px]
                    text-white/40
                    sm:gap-2
                    sm:text-[9px]
                    sm:tracking-[2px]
                  "
                >
                  <span>Build</span>

                  <span className="text-cyan-400/60">
                    /
                  </span>

                  <span>Code</span>

                  <span className="text-cyan-400/60">
                    /
                  </span>

                  <span>Deploy</span>
                </div>
              </motion.div>

              {/* =================================================
                  TECH FLOATING BADGE
                  MOVED: LEFT → RIGHT
                  STATIC — NO ROTATION / NO SHAKING
              ================================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  right-0
                  top-1/2
                  z-30
                  -translate-y-1/2
                  rounded-xl
                  border
                  border-cyan-400/20
                  bg-[#03101a]/75
                  px-2
                  py-3
                  shadow-[0_0_30px_rgba(34,211,238,0.08)]
                  backdrop-blur-xl
                  min-[360px]:right-0
                  min-[360px]:px-2.5
                  sm:right-1
                  sm:rounded-2xl
                  sm:px-3
                  sm:py-4
                  lg:-right-7
                "
              >
                <div
                  className="
                    space-y-2
                    text-center
                    font-bold
                    min-[360px]:space-y-2.5
                    sm:space-y-3
                  "
                >
                  <div
                    className="
                      text-[11px]
                      text-cyan-300
                      min-[360px]:text-xs
                      sm:text-sm
                    "
                  >
                    ⚛
                  </div>

                  <div
                    className="
                      text-[9px]
                      text-blue-400
                      min-[360px]:text-[10px]
                      sm:text-xs
                    "
                  >
                    N
                  </div>

                  <div
                    className="
                      text-[9px]
                      text-sky-300
                      min-[360px]:text-[10px]
                      sm:text-xs
                    "
                  >
                    TS
                  </div>

                  <div
                    className="
                      text-[9px]
                      text-cyan-200
                      min-[360px]:text-[10px]
                      sm:text-xs
                    "
                  >
                    ≋
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LockBanner;