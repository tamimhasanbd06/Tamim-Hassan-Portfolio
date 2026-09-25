
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaJsSquare, FaPython } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
} from "react-icons/si";

import skillsData from "../../../public/MySkills.json";

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
      className="
        relative isolate w-full
        overflow-hidden

        px-3
        py-12

        min-[360px]:px-4
        min-[400px]:py-14

        sm:px-6
        sm:py-16

        md:px-8
        md:py-20

        lg:px-10
        lg:py-24

        xl:px-12
        xl:py-28

        2xl:py-32

        text-white
      "
    >
      {/* =====================================================
          COMPLETELY TRANSPARENT BACKGROUND
          
          No background
          No gradient
          No decorative section glow
          No background animation
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1800px]
        "
      >
        {/* ===================================================
            SECTION HEADING
        ==================================================== */}

        <motion.div
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
            amount: 0.5,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto
            mb-10
            max-w-3xl
            text-center

            sm:mb-14
            md:mb-16
            lg:mb-20
          "
        >
          {/* Small Label */}

          <span
            className="
              mb-3
              inline-block

              text-[10px]
              font-semibold
              uppercase
              tracking-[0.3em]

              text-cyan-300/70

              min-[400px]:text-xs

              sm:mb-4
            "
          >
            Technologies I Work With
          </span>

          {/* Main Title */}

          <h1
            className="
              text-3xl
              font-black
              tracking-tight

              min-[360px]:text-4xl
              min-[400px]:text-[2.75rem]

              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              xl:text-8xl
            "
          >
            My{" "}
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
              Skills
            </span>
          </h1>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-4
              max-w-xl
              px-3

              text-xs
              leading-relaxed
              text-white/50

              min-[400px]:text-sm

              sm:mt-5
              sm:text-base

              md:text-lg
            "
          >
            Technologies and tools I use to build modern,
            scalable and high-performance digital experiences.
          </p>
        </motion.div>

        {/* ===================================================
            SKILLS GRID
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-1
            place-items-center

            gap-4

            min-[400px]:gap-5

            sm:grid-cols-2
            sm:gap-6

            md:gap-7

            lg:grid-cols-4
            lg:gap-8

            xl:gap-10

            2xl:gap-12
          "
        >
          {skills.map((skill, index) => (
            <motion.article
              key={skill.name}
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 30,
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
                      y: -10,
                      scale: 1.025,
                    }
              }
              whileTap={{
                scale: 0.98,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                delay: reduceMotion ? 0 : index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                group
                relative

                w-full
                max-w-[300px]

                min-[300px]:min-h-[250px]
                min-[360px]:min-h-[270px]
                min-[400px]:min-h-[285px]

                sm:min-h-[300px]

                md:min-h-[320px]

                lg:min-h-[300px]

                xl:min-h-[330px]

                2xl:min-h-[350px]

                overflow-hidden

                rounded-2xl
                sm:rounded-3xl

                border
                border-white/[0.08]

                bg-white/[0.025]

                backdrop-blur-xl

                shadow-[0_20px_70px_rgba(0,0,0,0.25)]

                transition-all
                duration-500

                hover:border-cyan-300/40

                hover:bg-white/[0.045]

                hover:shadow-[0_25px_90px_rgba(34,211,238,0.14)]

                active:scale-[0.98]

                focus-within:border-cyan-300/40
              "
            >
              {/* =================================================
                  CARD HOVER GLOW
              ================================================== */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute
                  -right-16
                  -top-16

                  h-32
                  w-32

                  rounded-full

                  bg-cyan-400/0

                  blur-3xl

                  transition-all
                  duration-700

                  group-hover:scale-150
                  group-hover:bg-cyan-400/15
                "
              />

              <div
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute
                  -bottom-16
                  -left-16

                  h-32
                  w-32

                  rounded-full

                  bg-blue-500/0

                  blur-3xl

                  transition-all
                  duration-700

                  group-hover:scale-150
                  group-hover:bg-blue-500/10
                "
              />

              {/* =================================================
                  TOP ACCENT
              ================================================== */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute
                  left-1/2
                  top-0

                  h-px
                  w-0

                  -translate-x-1/2

                  bg-gradient-to-r
                  from-transparent
                  via-cyan-300
                  to-transparent

                  opacity-0

                  shadow-[0_0_15px_rgba(34,211,238,0.7)]

                  transition-all
                  duration-500

                  group-hover:w-2/3
                  group-hover:opacity-100
                "
              />

              {/* =================================================
                  CARD CONTENT
              ================================================== */}

              <div
                className="
                  relative
                  z-10

                  flex
                  h-full
                  flex-col

                  items-center
                  justify-center

                  px-5
                  py-8

                  text-center

                  sm:px-6
                  sm:py-10

                  lg:px-7
                "
              >
                {/* =================================================
                    ICON
                ================================================== */}

                <div
                  className="
                    relative

                    mb-5

                    flex
                    h-16
                    w-16

                    items-center
                    justify-center

                    rounded-2xl

                    border
                    border-cyan-300/10

                    bg-cyan-300/[0.04]

                    text-4xl
                    text-cyan-300

                    shadow-[0_0_35px_rgba(34,211,238,0.08)]

                    transition-all
                    duration-500

                    group-hover:scale-110

                    group-hover:border-cyan-300/30

                    group-hover:bg-cyan-300/[0.08]

                    group-hover:text-cyan-200

                    group-hover:shadow-[0_0_45px_rgba(34,211,238,0.25)]

                    min-[400px]:h-[72px]
                    min-[400px]:w-[72px]
                    min-[400px]:text-5xl

                    sm:mb-6
                    sm:h-20
                    sm:w-20
                    sm:rounded-3xl
                    sm:text-5xl
                  "
                >
                  {/* Icon Glow */}

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none

                      absolute
                      inset-[-4px]

                      rounded-[inherit]

                      border
                      border-cyan-300/0

                      opacity-0

                      transition-all
                      duration-500

                      group-hover:inset-[-8px]
                      group-hover:border-cyan-300/20
                      group-hover:opacity-100

                      group-hover:shadow-[0_0_30px_rgba(34,211,238,0.22)]
                    "
                  />

                  <span
                    className="
                      relative
                      z-10

                      transition-all
                      duration-500

                      group-hover:drop-shadow-[0_0_12px_rgba(103,232,249,0.8)]
                    "
                  >
                    {getSkillIcon(skill.icon)}
                  </span>
                </div>

                {/* =================================================
                    NAME
                ================================================== */}

                <h2
                  className="
                    text-lg
                    font-bold
                    tracking-tight
                    text-white

                    min-[360px]:text-xl

                    min-[400px]:text-2xl

                    sm:text-2xl

                    md:text-[1.65rem]

                    transition-colors
                    duration-300

                    group-hover:text-cyan-100
                  "
                >
                  {skill.name}
                </h2>

                {/* =================================================
                    DIVIDER
                ================================================== */}

                <div
                  aria-hidden="true"
                  className="
                    my-3

                    h-px
                    w-8

                    bg-cyan-300/30

                    transition-all
                    duration-500

                    group-hover:w-14
                    group-hover:bg-cyan-300/70

                    sm:my-4
                  "
                />

                {/* =================================================
                    DESCRIPTION
                ================================================== */}

                <p
                  className="
                    max-w-[230px]

                    text-[11px]
                    leading-relaxed

                    text-white/45

                    min-[360px]:text-xs

                    min-[400px]:text-sm

                    sm:text-sm

                    md:text-[15px]

                    transition-colors
                    duration-300

                    group-hover:text-white/65
                  "
                >
                  {skill.full}
                </p>
              </div>

              {/* =================================================
                  BOTTOM ACCENT
              ================================================== */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute
                  bottom-0
                  left-1/2

                  h-px
                  w-0

                  -translate-x-1/2

                  bg-gradient-to-r
                  from-transparent
                  via-cyan-300
                  to-transparent

                  opacity-0

                  shadow-[0_0_15px_rgba(34,211,238,0.7)]

                  transition-all
                  duration-500

                  group-hover:w-1/2
                  group-hover:opacity-100
                "
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LookSkills;
