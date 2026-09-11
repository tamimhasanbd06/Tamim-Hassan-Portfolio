"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { IconType } from "react-icons";

import { FaReact } from "react-icons/fa";

import { SiNextdotjs } from "react-icons/si";

import {
  FiArrowRight,
  FiBookOpen,
  FiCheck,
  FiChevronDown,
  FiCloud,
  FiCode,
  FiDatabase,
  FiFlag,
  FiServer,
  FiTarget,
  FiTool,
} from "react-icons/fi";

import journeyData from "../../../public/look/developer-journey.json";

/* =========================================================
   TYPES
========================================================= */

type JourneyItem = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  technologies: string[];
  highlights: string[];
};

type DeveloperJourneyData = {
  section: {
    badge: string;
    title: string;
    highlightedTitle: string;
    description: string;
  };

  journey: JourneyItem[];
};

/* =========================================================
   JSON DATA
========================================================= */

const data = journeyData as DeveloperJourneyData;

/* =========================================================
   ICON MAP
========================================================= */

const iconMap: Record<string, IconType> = {
  /* Journey icons */
  flag: FiFlag,
  book: FiBookOpen,
  react: FaReact,
  nextjs: SiNextdotjs,
  server: FiServer,
  database: FiDatabase,
  cloud: FiCloud,
  target: FiTarget,

  /* Other */
  code: FiCode,
  tool: FiTool,
  check: FiCheck,
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

export default function DevelopmentJourney() {
  const reduceMotion = useReducedMotion();

  /* =======================================================
     STATES
  ======================================================= */

  const [activeJourney, setActiveJourney] = useState<string | null>(
    null
  );

  const [showAll, setShowAll] = useState(false);

  /* =======================================================
     JOURNEY DATA
  ======================================================= */

  const journey = useMemo(() => {
    return data.journey ?? [];
  }, []);

  /* =======================================================
     VISIBLE JOURNEY
  ======================================================= */

  const visibleJourney = useMemo(() => {
    if (showAll) {
      return journey;
    }

    return journey.slice(0, 3);
  }, [journey, showAll]);

  const hasMoreJourney = journey.length > 3;

  /* =======================================================
     ESC KEY
  ======================================================= */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveJourney(null);
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

  const handleJourneyClick = (id: string) => {
    setActiveJourney((current) =>
      current === id ? null : id
    );
  };

  /* =======================================================
     SEE MORE / SHOW LESS
  ======================================================= */

  const handleSeeMore = () => {
    setShowAll((current) => !current);
    setActiveJourney(null);
  };

  return (
    <section
      id="development-journey"
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
      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[600px]
          w-[900px]
          -translate-x-1/2
          rounded-full
          bg-cyan-500/[0.055]
          blur-[150px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          h-[500px]
          w-[800px]
          -translate-x-1/2
          rounded-full
          bg-blue-500/[0.045]
          blur-[150px]
        "
      />

      {/* =====================================================
          GRID BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.055]
          [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]
          [background-size:55px_55px]
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ===================================================
            CONTENT SECTION
        =================================================== */}

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
            amount: 0.25,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}

          <div
            className="
              mb-5
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
              {data.section.badge}
            </span>
          </div>

          {/* Heading */}

          <h2
            className="
              text-3xl
              font-black
              tracking-tight
              sm:text-4xl
              lg:text-5xl
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
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-slate-400
              sm:text-base
            "
          >
            {data.section.description}
          </p>
        </motion.div>

        {/* ===================================================
            JOURNEY CARDS
        =================================================== */}

        <div
          className="
            mx-auto
            mt-14
            grid
            max-w-6xl
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {visibleJourney.map((item, index) => {
            const Icon = getIcon(item.icon);

            const isActive =
              activeJourney === item.id;

            return (
              <motion.article
                key={item.id}
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
                  amount: 0.12,
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
                  overflow-hidden
                  rounded-3xl
                  border
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? `
                        border-cyan-300/40
                        bg-cyan-400/[0.075]
                        shadow-[0_25px_70px_rgba(34,211,238,0.12)]
                      `
                      : `
                        border-white/10
                        bg-white/[0.025]
                        hover:border-cyan-400/25
                        hover:bg-white/[0.045]
                      `
                  }
                `}
              >
                {/* Card Glow */}

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-44
                    w-44
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
                    -bottom-24
                    -left-24
                    h-44
                    w-44
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
                    CLICKABLE CARD
                ================================================= */}

                <button
                  type="button"
                  onClick={() =>
                    handleJourneyClick(item.id)
                  }
                  aria-expanded={isActive}
                  className="
                    relative
                    z-10
                    w-full
                    p-5
                    text-left
                    sm:p-6
                  "
                >
                  {/* Icon / Number */}

                  <div className="flex items-start justify-between gap-4">

                    <div
                      className={`
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        text-xl
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? `
                              border-cyan-300/45
                              bg-cyan-400/15
                              text-cyan-200
                              shadow-[0_0_30px_rgba(34,211,238,0.16)]
                            `
                            : `
                              border-cyan-400/15
                              bg-cyan-400/[0.06]
                              text-cyan-300
                              group-hover:border-cyan-300/35
                              group-hover:bg-cyan-400/10
                            `
                        }
                      `}
                    >
                      <Icon />
                    </div>

                    <span
                      className="
                        rounded-full
                        border
                        border-white/10
                        bg-white/[0.025]
                        px-2.5
                        py-1.5
                        text-[9px]
                        font-black
                        tracking-[0.16em]
                        text-slate-500
                      "
                    >
                      {item.number}
                    </span>
                  </div>

                  {/* Title */}

                  <div className="mt-5 flex items-start justify-between gap-3">
                    <div>

                      <h3
                        className="
                          text-lg
                          font-black
                          tracking-tight
                          text-white
                        "
                      >
                        {item.title}
                      </h3>

                      <p
                        className="
                          mt-1.5
                          text-[11px]
                          font-medium
                          leading-5
                          text-cyan-300/70
                        "
                      >
                        {item.subtitle}
                      </p>

                    </div>

                    <FiChevronDown
                      className={`
                        mt-1
                        shrink-0
                        text-lg
                        text-slate-600
                        transition-transform
                        duration-300
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
                      mt-4
                      line-clamp-3
                      text-[12px]
                      leading-6
                      text-slate-400
                    "
                  >
                    {item.description}
                  </p>

                  {/* Technologies */}

                  <div className="mt-5 flex flex-wrap gap-2">

                    {item.technologies
                      .slice(0, 3)
                      .map((technology) => (
                        <span
                          key={technology}
                          className="
                            rounded-full
                            border
                            border-cyan-400/10
                            bg-cyan-400/[0.045]
                            px-2.5
                            py-1
                            text-[8px]
                            font-bold
                            uppercase
                            tracking-wider
                            text-cyan-300/80
                          "
                        >
                          {technology}
                        </span>
                      ))}

                    {item.technologies.length > 3 && (
                      <span
                        className="
                          rounded-full
                          border
                          border-white/10
                          bg-white/[0.025]
                          px-2.5
                          py-1
                          text-[8px]
                          font-bold
                          text-slate-600
                        "
                      >
                        +{item.technologies.length - 3}
                      </span>
                    )}

                  </div>

                  {/* Action */}

                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      justify-between
                      border-t
                      border-white/[0.06]
                      pt-4
                    "
                  >
                    <span
                      className="
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.15em]
                        text-slate-600
                      "
                    >
                      {isActive
                        ? "Details Open"
                        : "Click To Explore"}
                    </span>

                    <FiArrowRight
                      className={`
                        text-sm
                        transition-all
                        duration-300
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
                    DETAILS
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
                      px-5
                      pb-6
                      pt-5
                      sm:px-6
                    "
                  >

                    {/* What I Learned */}

                    <div
                      className="
                        rounded-2xl
                        border
                        border-white/[0.06]
                        bg-black/20
                        p-4
                      "
                    >
                      <div className="mb-3 flex items-center gap-2">

                        <FiCode
                          className="text-cyan-300"
                          size={14}
                        />

                        <span
                          className="
                            text-[9px]
                            font-black
                            uppercase
                            tracking-[0.16em]
                            text-slate-400
                          "
                        >
                          What I Learned
                        </span>

                      </div>

                      <p
                        className="
                          text-[11px]
                          leading-6
                          text-slate-500
                        "
                      >
                        {item.description}
                      </p>
                    </div>

                    {/* Key Progress */}

                    <div className="mt-4">

                      <div className="mb-3 flex items-center gap-2">

                        <FiCheck
                          className="text-cyan-300"
                          size={14}
                        />

                        <span
                          className="
                            text-[9px]
                            font-black
                            uppercase
                            tracking-[0.16em]
                            text-slate-400
                          "
                        >
                          Key Progress
                        </span>

                      </div>

                      <div className="space-y-2.5">

                        {item.highlights.map(
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
                                  text-[11px]
                                  leading-5
                                  text-slate-500
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

                    <div className="mt-5">

                      <div className="mb-3 flex items-center gap-2">

                        <FiTool
                          className="text-cyan-300"
                          size={14}
                        />

                        <span
                          className="
                            text-[9px]
                            font-black
                            uppercase
                            tracking-[0.16em]
                            text-slate-400
                          "
                        >
                          Technologies
                        </span>

                      </div>

                      <div className="flex flex-wrap gap-2">

                        {item.technologies.map(
                          (technology) => (
                            <span
                              key={technology}
                              className="
                                rounded-lg
                                border
                                border-white/[0.07]
                                bg-white/[0.025]
                                px-2.5
                                py-1.5
                                text-[9px]
                                font-medium
                                text-slate-500
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

                {/* Active Line */}

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
                    left-6
                    right-6
                    h-px
                    origin-left
                    bg-gradient-to-r
                    from-transparent
                    via-cyan-400
                    to-transparent
                  "
                />

              </motion.article>
            );
          })}
        </div>

        {/* ===================================================
            SEE MORE / SHOW LESS
        =================================================== */}

        {hasMoreJourney && (
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
            className="mt-10 flex justify-center"
          >
            <button
              type="button"
              onClick={handleSeeMore}
              className="
                group
                inline-flex
                items-center
                gap-2.5
                rounded-full
                border
                border-cyan-400/20
                bg-cyan-400/[0.05]
                px-6
                py-3
                text-[10px]
                font-black
                uppercase
                tracking-[0.16em]
                text-cyan-300
                shadow-[0_0_30px_rgba(34,211,238,0.05)]
                transition-all
                duration-300
                hover:border-cyan-400/40
                hover:bg-cyan-400/[0.1]
                hover:text-white
                hover:shadow-[0_0_35px_rgba(34,211,238,0.1)]
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