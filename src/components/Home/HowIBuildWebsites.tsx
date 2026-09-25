"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { IconType } from "react-icons";

import {
  FiArrowRight,
  FiCheck,
  FiChevronDown,
  FiCode,
  FiCompass,
  FiGlobe,
  FiLayout,
  FiRefreshCw,
  FiSearch,
  FiZap,
} from "react-icons/fi";

import buildData from "../../../public/HowIBuildWebsites.json";

/* =========================================================
   TYPES
========================================================= */

type BuildStep = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  technologies: string[];
  highlights: string[];
};

type BuildData = {
  section: {
    badge: string;
    title: string;
    highlightedTitle: string;
    description: string;
  };

  steps: BuildStep[];
};

/* =========================================================
   JSON DATA
========================================================= */

const data = buildData as BuildData;

/* =========================================================
   ICON MAP
========================================================= */

const iconMap: Record<string, IconType> = {
  search: FiSearch,
  compass: FiCompass,
  layout: FiLayout,
  code: FiCode,
  refresh: FiRefreshCw,
  globe: FiGlobe,
  zap: FiZap,
};

/* =========================================================
   ICON HELPER
========================================================= */

function getIcon(
  iconName: string,
  fallback: IconType = FiCode
): IconType {
  return iconMap[iconName] ?? fallback;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function HowIBuildWebsites() {
  const reduceMotion = useReducedMotion();

  /* =======================================================
     STATES
  ======================================================= */

  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

  /* =======================================================
     RESPONSIVE VISIBLE COUNT
  ======================================================= */

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setVisibleCount(2);
      } else if (width < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(4);
      }
    };

    updateVisibleCount();

    window.addEventListener("resize", updateVisibleCount);

    return () => {
      window.removeEventListener("resize", updateVisibleCount);
    };
  }, []);

  /* =======================================================
     STEPS DATA
  ======================================================= */

  const steps = useMemo(() => data.steps ?? [], []);

  /* =======================================================
     VISIBLE STEPS
  ======================================================= */

  const visibleSteps = useMemo(() => {
    if (showAll) {
      return steps;
    }

    return steps.slice(0, visibleCount);
  }, [steps, showAll, visibleCount]);

  const hasMoreSteps = steps.length > visibleCount;

  /* =======================================================
     ESC KEY
  ======================================================= */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveStep(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* =======================================================
     CARD CLICK
  ======================================================= */

  const handleStepClick = (id: string) => {
    setActiveStep((current) =>
      current === id ? null : id
    );
  };

  /* =======================================================
     SEE MORE / SHOW LESS
  ======================================================= */

  const handleSeeMore = () => {
    setShowAll((current) => !current);
    setActiveStep(null);
  };

  return (
    <section
      id="how-i-build-websites"
      className="
        relative
        w-full
        overflow-hidden
        px-3
        py-14
        text-white
        min-[360px]:px-4
        min-[360px]:py-16
        min-[480px]:px-5
        sm:px-6
        sm:py-20
        md:py-24
        lg:px-8
        lg:py-28
        xl:py-32
        2xl:py-36
      "
    >
      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[2000px]
        "
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

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
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto
            w-full
            max-w-3xl
            text-center
          "
        >
          {/* Badge */}

          <div
            className="
              mb-4
              inline-flex
              max-w-full
              items-center
              gap-2
              rounded-full
              border
              border-cyan-400/20
              bg-cyan-400/[0.035]
              px-3
              py-1.5
              sm:mb-5
              sm:px-4
              sm:py-2
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                shrink-0
                rounded-full
                bg-cyan-400
                shadow-[0_0_14px_rgba(34,211,238,0.8)]
                sm:h-2
                sm:w-2
              "
            />

            <span
              className="
                truncate
                text-[8px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-cyan-300
                min-[400px]:text-[9px]
                sm:text-xs
                sm:tracking-[0.22em]
              "
            >
              {data.section.badge}
            </span>
          </div>

          {/* Heading */}

          <h2
            className="
              px-1
              text-[clamp(1.75rem,7vw,3.2rem)]
              font-black
              leading-[1.05]
              tracking-[-0.035em]
              sm:text-4xl
              lg:text-5xl
              xl:text-[3.4rem]
              2xl:text-[3.8rem]
            "
          >
            {data.section.title}{" "}
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
              {data.section.highlightedTitle}
            </span>
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              px-2
              text-[12px]
              leading-6
              text-slate-400
              min-[400px]:text-[13px]
              sm:mt-5
              sm:text-sm
              sm:leading-7
              lg:text-base
            "
          >
            {data.section.description}
          </p>
        </motion.div>

        {/* =====================================================
            PROCESS CARDS
        ===================================================== */}

        <div
          className="
            mx-auto
            mt-10
            grid
            w-full
            max-w-[1800px]
            grid-cols-1
            gap-4
            min-[480px]:gap-5
            sm:mt-12
            sm:grid-cols-2
            sm:gap-5
            lg:mt-14
            lg:grid-cols-4
            lg:gap-5
            xl:gap-6
            2xl:gap-7
          "
        >
          {visibleSteps.map((step, index) => {
            const Icon = getIcon(step.icon);

            const isActive =
              activeStep === step.id;

            return (
              <motion.article
                key={step.id}
                layout={!reduceMotion}
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
                  amount: 0.1,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.045,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -6,
                      }
                }
                className={`
                  group
                  relative
                  w-full
                  overflow-hidden
                  rounded-[1.35rem]
                  border
                  transition-all
                  duration-300
                  min-[480px]:rounded-3xl
                  ${
                    isActive
                      ? "border-cyan-300/40 bg-cyan-400/[0.065] shadow-[0_25px_70px_rgba(34,211,238,0.10)]"
                      : "border-white/[0.085] bg-white/[0.018] hover:border-cyan-400/25 hover:bg-white/[0.035]"
                  }
                `}
              >
                {/* =================================================
                    CARD GLOW
                ================================================= */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    h-36
                    w-36
                    rounded-full
                    bg-cyan-400/10
                    opacity-0
                    blur-3xl
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -bottom-20
                    -left-20
                    h-40
                    w-40
                    rounded-full
                    bg-blue-500/[0.07]
                    opacity-0
                    blur-3xl
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />

                {/* =================================================
                    CARD HEADER
                ================================================= */}

                <button
                  type="button"
                  onClick={() =>
                    handleStepClick(step.id)
                  }
                  aria-expanded={isActive}
                  className="
                    relative
                    z-10
                    w-full
                    p-4
                    text-left
                    min-[360px]:p-5
                    sm:p-6
                    xl:p-7
                  "
                >
                  {/* Icon + Number */}

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-3
                      sm:gap-4
                    "
                  >
                    <div
                      className={`
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        text-lg
                        transition-all
                        duration-300
                        min-[360px]:h-12
                        min-[360px]:w-12
                        sm:rounded-2xl
                        sm:text-xl
                        ${
                          isActive
                            ? "border-cyan-300/45 bg-cyan-400/15 text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.16)]"
                            : "border-cyan-400/15 bg-cyan-400/[0.06] text-cyan-300 group-hover:border-cyan-300/35 group-hover:bg-cyan-400/10"
                        }
                      `}
                    >
                      <Icon />
                    </div>

                    <span
                      className="
                        shrink-0
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.025]
                        px-2
                        py-1.5
                        text-[8px]
                        font-black
                        tracking-[0.14em]
                        text-slate-500
                        min-[360px]:px-2.5
                        sm:text-[9px]
                        sm:tracking-[0.16em]
                      "
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Title */}

                  <div
                    className="
                      mt-4
                      flex
                      items-start
                      justify-between
                      gap-2
                      min-[360px]:mt-5
                      sm:gap-3
                    "
                  >
                    <div className="min-w-0">
                      <h3
                        className="
                          text-[16px]
                          font-black
                          leading-tight
                          tracking-tight
                          text-white
                          min-[360px]:text-lg
                        "
                      >
                        {step.title}
                      </h3>

                      <p
                        className="
                          mt-1.5
                          text-[10px]
                          font-medium
                          leading-5
                          text-cyan-300/70
                          min-[360px]:text-[11px]
                        "
                      >
                        {step.subtitle}
                      </p>
                    </div>

                    <FiChevronDown
                      className={`
                        mt-0.5
                        shrink-0
                        text-base
                        text-slate-600
                        transition-transform
                        duration-300
                        sm:text-lg
                        ${
                          isActive
                            ? "rotate-180 text-cyan-300"
                            : "group-hover:text-cyan-300"
                        }
                      `}
                    />
                  </div>

                  {/* Description */}

                  <p
                    className="
                      mt-3
                      line-clamp-3
                      text-[11px]
                      leading-5
                      text-slate-400
                      min-[360px]:mt-4
                      min-[360px]:text-[12px]
                      min-[360px]:leading-6
                    "
                  >
                    {step.description}
                  </p>

                  {/* Technologies */}

                  <div
                    className="
                      mt-4
                      flex
                      flex-wrap
                      gap-1.5
                      sm:mt-5
                      sm:gap-2
                    "
                  >
                    {step.technologies.map(
                      (technology) => (
                        <span
                          key={technology}
                          className="
                            max-w-full
                            rounded-full
                            border
                            border-cyan-400/10
                            bg-cyan-400/[0.045]
                            px-2
                            py-1
                            text-[7px]
                            font-bold
                            uppercase
                            tracking-[0.08em]
                            text-cyan-300/80
                            sm:px-2.5
                            sm:text-[8px]
                            sm:tracking-wider
                          "
                        >
                          {technology}
                        </span>
                      )
                    )}
                  </div>

                  {/* Bottom */}

                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      justify-between
                      border-t
                      border-white/[0.06]
                      pt-3.5
                      sm:mt-5
                      sm:pt-4
                    "
                  >
                    <span
                      className="
                        text-[7px]
                        font-bold
                        uppercase
                        tracking-[0.12em]
                        text-slate-600
                        min-[360px]:text-[8px]
                        sm:tracking-[0.15em]
                      "
                    >
                      {isActive
                        ? "Details Open"
                        : "Click To Explore"}
                    </span>

                    <FiArrowRight
                      className={`
                        text-xs
                        transition-all
                        duration-300
                        sm:text-sm
                        ${
                          isActive
                            ? "translate-x-1 text-cyan-300"
                            : "text-slate-700 group-hover:translate-x-1 group-hover:text-cyan-300"
                        }
                      `}
                    />
                  </div>
                </button>

                {/* =================================================
                    EXPANDED DETAILS
                ================================================= */}

                <motion.div
                  initial={false}
                  animate={{
                    height: isActive ? "auto" : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    relative
                    z-10
                    overflow-hidden
                  "
                >
                  <div
                    className="
                      border-t
                      border-white/[0.07]
                      px-4
                      pb-5
                      pt-4
                      min-[360px]:px-5
                      min-[360px]:pb-6
                      min-[360px]:pt-5
                      sm:px-6
                      xl:px-7
                    "
                  >
                    {/* What I Do */}

                    <div
                      className="
                        rounded-xl
                        border
                        border-white/[0.06]
                        bg-black/15
                        p-3.5
                        min-[360px]:rounded-2xl
                        min-[360px]:p-4
                      "
                    >
                      <div
                        className="
                          mb-2.5
                          flex
                          items-center
                          gap-2
                          min-[360px]:mb-3
                        "
                      >
                        <FiZap
                          className="text-cyan-300"
                          size={14}
                        />

                        <span
                          className="
                            text-[8px]
                            font-black
                            uppercase
                            tracking-[0.14em]
                            text-slate-400
                            min-[360px]:text-[9px]
                            min-[360px]:tracking-[0.16em]
                          "
                        >
                          What I Do
                        </span>
                      </div>

                      <p
                        className="
                          text-[10px]
                          leading-5
                          text-slate-500
                          min-[360px]:text-[11px]
                          min-[360px]:leading-6
                        "
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Key Actions */}

                    <div className="mt-4 min-[360px]:mt-5">
                      <div
                        className="
                          mb-2.5
                          flex
                          items-center
                          gap-2
                          min-[360px]:mb-3
                        "
                      >
                        <FiCheck
                          className="text-cyan-300"
                          size={14}
                        />

                        <span
                          className="
                            text-[8px]
                            font-black
                            uppercase
                            tracking-[0.14em]
                            text-slate-400
                            min-[360px]:text-[9px]
                            min-[360px]:tracking-[0.16em]
                          "
                        >
                          Key Actions
                        </span>
                      </div>

                      <div className="space-y-2">
                        {step.highlights.map(
                          (highlight) => (
                            <div
                              key={highlight}
                              className="
                                flex
                                items-start
                                gap-2.5
                              "
                            >
                              <span
                                className="
                                  mt-1.5
                                  h-1.5
                                  w-1.5
                                  shrink-0
                                  rounded-full
                                  bg-cyan-400
                                  shadow-[0_0_8px_rgba(34,211,238,0.5)]
                                "
                              />

                              <span
                                className="
                                  text-[10px]
                                  leading-5
                                  text-slate-500
                                  min-[360px]:text-[11px]
                                "
                              >
                                {highlight}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Technologies */}

                    <div className="mt-4 min-[360px]:mt-5">
                      <div
                        className="
                          mb-2.5
                          flex
                          items-center
                          gap-2
                          min-[360px]:mb-3
                        "
                      >
                        <FiCode
                          className="text-cyan-300"
                          size={14}
                        />

                        <span
                          className="
                            text-[8px]
                            font-black
                            uppercase
                            tracking-[0.14em]
                            text-slate-400
                            min-[360px]:text-[9px]
                            min-[360px]:tracking-[0.16em]
                          "
                        >
                          Technologies
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {step.technologies.map(
                          (technology) => (
                            <span
                              key={technology}
                              className="
                                rounded-lg
                                border
                                border-white/[0.07]
                                bg-white/[0.025]
                                px-2
                                py-1.5
                                text-[8px]
                                font-medium
                                text-slate-500
                                min-[360px]:px-2.5
                                min-[360px]:text-[9px]
                              "
                            >
                              {technology}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* =================================================
                    ACTIVE LINE
                ================================================= */}

                <motion.div
                  initial={false}
                  animate={{
                    scaleX: isActive ? 1 : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="
                    absolute
                    bottom-0
                    left-4
                    right-4
                    h-px
                    origin-left
                    bg-gradient-to-r
                    from-transparent
                    via-cyan-400
                    to-transparent
                    min-[360px]:left-6
                    min-[360px]:right-6
                  "
                />
              </motion.article>
            );
          })}
        </div>

        {/* =====================================================
            SEE MORE / SHOW LESS
        ===================================================== */}

        {hasMoreSteps && (
          <motion.div
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.45,
            }}
            className="
              mt-8
              flex
              justify-center
              px-2
              sm:mt-10
            "
          >
            <button
              type="button"
              onClick={handleSeeMore}
              className="
                group
                inline-flex
                max-w-full
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-cyan-400/20
                bg-cyan-400/[0.04]
                px-5
                py-2.5
                text-[9px]
                font-black
                uppercase
                tracking-[0.14em]
                text-cyan-300
                shadow-[0_0_30px_rgba(34,211,238,0.04)]
                transition-all
                duration-300
                hover:border-cyan-400/40
                hover:bg-cyan-400/[0.09]
                hover:text-white
                hover:shadow-[0_0_35px_rgba(34,211,238,0.1)]
                min-[400px]:gap-2.5
                min-[400px]:px-6
                min-[400px]:py-3
                sm:text-[10px]
                sm:tracking-[0.16em]
              "
            >
              <span>
                {showAll
                  ? "Show Less"
                  : "See More"}
              </span>

              <FiChevronDown
                size={15}
                className={`
                  transition-transform
                  duration-300
                  ${
                    showAll
                      ? "rotate-180"
                      : "group-hover:translate-y-0.5"
                  }
                `}
              />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}