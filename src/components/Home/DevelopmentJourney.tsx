"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

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

import journeyData from "../../../public/DevelopmentJourney.json";

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

const data =
  journeyData as DeveloperJourneyData;

/* =========================================================
   ICON MAP
========================================================= */

const iconMap: Record<
  string,
  IconType
> = {
  /* Journey */
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
  fallback: IconType = FiCode,
): IconType {
  return (
    iconMap[iconName] ??
    fallback
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export default function DevelopmentJourney() {
  const reduceMotion =
    useReducedMotion();

  /* =======================================================
     STATES
  ======================================================= */

  const [
    activeJourney,
    setActiveJourney,
  ] = useState<string | null>(
    null,
  );

  const [showAll, setShowAll] =
    useState(false);

  const [
    visibleCount,
    setVisibleCount,
  ] = useState(4);

  /* =======================================================
     RESPONSIVE CARD COUNT
  ======================================================= */

  useEffect(() => {
    const updateVisibleCount =
      () => {
        const width =
          window.innerWidth;

        if (width < 640) {
          /*
           * Small mobile
           */
          setVisibleCount(2);
        } else if (
          width < 1024
        ) {
          /*
           * Tablet
           */
          setVisibleCount(2);
        } else {
          /*
           * Desktop
           */
          setVisibleCount(4);
        }
      };

    updateVisibleCount();

    window.addEventListener(
      "resize",
      updateVisibleCount,
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateVisibleCount,
      );
    };
  }, []);

  /* =======================================================
     JOURNEY DATA
  ======================================================= */

  const journey = useMemo(() => {
    return data.journey ?? [];
  }, []);

  /* =======================================================
     VISIBLE JOURNEY
  ======================================================= */

  const visibleJourney =
    useMemo(() => {
      if (showAll) {
        return journey;
      }

      return journey.slice(
        0,
        visibleCount,
      );
    }, [
      journey,
      showAll,
      visibleCount,
    ]);

  /*
   * Important:
   * Determines whether See More button
   * should be visible.
   */
  const hasMoreJourney =
    journey.length >
    visibleCount;

  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setActiveJourney(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, []);

  /* =======================================================
     CARD CLICK
  ======================================================= */

  const handleJourneyClick = (
    id: string,
  ) => {
    setActiveJourney(
      (current) =>
        current === id
          ? null
          : id,
    );
  };

  /* =======================================================
     SEE MORE
  ======================================================= */

  const handleSeeMore = () => {
    setShowAll(
      (current) => !current,
    );

    setActiveJourney(null);
  };

  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <section
      id="development-journey"
      className="
        relative
        w-full
        overflow-hidden
        px-3
        py-14
        text-white

        min-[400px]:px-4
        min-[400px]:py-16

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
        {/* ===================================================
            HEADER
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion
              ? 0
              : 24,
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
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="
            mx-auto
            max-w-4xl
            text-center
          "
        >
          {/* =================================================
              BADGE
          ================================================= */}

          <div
            className="
              mb-4
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-cyan-400/15
              bg-cyan-400/[0.035]
              px-3
              py-1.5

              min-[400px]:px-4
              min-[400px]:py-2
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-cyan-400
                shadow-[0_0_14px_rgba(34,211,238,0.8)]

                min-[400px]:h-2
                min-[400px]:w-2
              "
            />

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-cyan-300

                min-[400px]:text-[10px]

                sm:text-xs
              "
            >
              {data.section.badge}
            </span>
          </div>

          {/* =================================================
              TITLE
          ================================================= */}

          <h2
            className="
              text-3xl
              font-black
              tracking-[-0.04em]
              text-white

              min-[400px]:text-4xl

              sm:text-5xl

              lg:text-6xl

              xl:text-7xl
            "
          >
            {data.section.title}{" "}

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
              {
                data.section
                  .highlightedTitle
              }
            </span>
          </h2>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-xs
              leading-6
              text-slate-500

              min-[400px]:text-sm
              min-[400px]:leading-7

              sm:text-base
            "
          >
            {
              data.section
                .description
            }
          </p>
        </motion.div>

        {/* ===================================================
            JOURNEY GRID
        =================================================== */}

        <div
          className="
            mx-auto
            mt-8
            grid
            w-full
            max-w-[1800px]
            grid-cols-1
            gap-3

            min-[400px]:mt-10
            min-[400px]:gap-4

            sm:mt-12
            sm:grid-cols-2
            sm:gap-5

            lg:mt-14
            lg:grid-cols-4

            xl:gap-6

            2xl:gap-7
          "
        >
          {visibleJourney.map(
            (item, index) => {
              const Icon = getIcon(
                item.icon,
              );

              const isActive =
                activeJourney ===
                item.id;

              return (
                <motion.article
                  key={item.id}
                  layout={
                    !reduceMotion
                  }
                  initial={{
                    opacity: 0,
                    y: reduceMotion
                      ? 0
                      : 25,
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
                    delay:
                      index * 0.045,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -7,
                        }
                  }
                  className={`
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    transition-all
                    duration-300

                    min-[400px]:rounded-3xl

                    ${
                      isActive
                        ? `
                          border-cyan-300/35
                          bg-cyan-400/[0.045]
                          shadow-[0_20px_60px_rgba(34,211,238,0.08)]
                        `
                        : `
                          border-white/[0.07]
                          bg-white/[0.018]
                          hover:border-cyan-400/25
                          hover:bg-white/[0.03]
                          hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]
                        `
                    }
                  `}
                >
                  {/* =================================================
                      TOP ACCENT
                  ================================================= */}

                  <motion.div
                    initial={false}
                    animate={{
                      scaleX:
                        isActive
                          ? 1
                          : 0,
                      opacity:
                        isActive
                          ? 1
                          : 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="
                      absolute
                      left-0
                      right-0
                      top-0
                      h-px
                      origin-center
                      bg-gradient-to-r
                      from-transparent
                      via-cyan-400
                      to-transparent
                    "
                  />

                  {/* =================================================
                      HOVER LIGHT
                  ================================================= */}

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
                      bg-cyan-400/[0.06]
                      opacity-0
                      blur-3xl
                      transition-opacity
                      duration-500
                      group-hover:opacity-100
                    "
                  />

                  {/* =================================================
                      CARD BUTTON
                  ================================================= */}

                  <button
                    type="button"
                    onClick={() =>
                      handleJourneyClick(
                        item.id,
                      )
                    }
                    aria-expanded={
                      isActive
                    }
                    className="
                      relative
                      z-10
                      w-full
                      p-4
                      text-left

                      min-[400px]:p-5

                      sm:p-6
                    "
                  >
                    {/* =================================================
                        ICON + NUMBER
                    ================================================= */}

                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-3
                      "
                    >
                      {/* Icon */}

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

                          min-[400px]:h-12
                          min-[400px]:w-12
                          min-[400px]:rounded-2xl

                          ${
                            isActive
                              ? `
                                border-cyan-300/40
                                bg-cyan-400/10
                                text-cyan-200
                                shadow-[0_0_25px_rgba(34,211,238,0.12)]
                              `
                              : `
                                border-cyan-400/10
                                bg-cyan-400/[0.045]
                                text-cyan-300
                                group-hover:border-cyan-300/30
                                group-hover:bg-cyan-400/[0.08]
                                group-hover:scale-105
                              `
                          }
                        `}
                      >
                        <Icon />
                      </div>

                      {/* Number */}

                      <span
                        className="
                          rounded-full
                          border
                          border-white/[0.07]
                          bg-white/[0.02]
                          px-2
                          py-1
                          text-[8px]
                          font-black
                          tracking-[0.15em]
                          text-slate-600

                          min-[400px]:px-2.5
                          min-[400px]:py-1.5
                          min-[400px]:text-[9px]
                        "
                      >
                        {item.number}
                      </span>
                    </div>

                    {/* =================================================
                        TITLE
                    ================================================= */}

                    <div
                      className="
                        mt-4
                        flex
                        items-start
                        justify-between
                        gap-3

                        min-[400px]:mt-5
                      "
                    >
                      <div className="min-w-0">
                        <h3
                          className="
                            text-base
                            font-black
                            tracking-tight
                            text-white

                            min-[400px]:text-lg
                          "
                        >
                          {item.title}
                        </h3>

                        <p
                          className="
                            mt-1
                            text-[10px]
                            font-medium
                            leading-5
                            text-cyan-300/65

                            min-[400px]:text-[11px]
                          "
                        >
                          {
                            item.subtitle
                          }
                        </p>
                      </div>

                      <FiChevronDown
                        className={`
                          mt-0.5
                          shrink-0
                          text-base
                          text-slate-600
                          transition-all
                          duration-300

                          min-[400px]:text-lg

                          ${
                            isActive
                              ? "rotate-180 text-cyan-300"
                              : "group-hover:text-cyan-300"
                          }
                        `}
                      />
                    </div>

                    {/* =================================================
                        DESCRIPTION
                    ================================================= */}

                    <p
                      className="
                        mt-3
                        line-clamp-3
                        text-[11px]
                        leading-6
                        text-slate-500

                        min-[400px]:mt-4
                        min-[400px]:text-[12px]
                      "
                    >
                      {
                        item.description
                      }
                    </p>

                    {/* =================================================
                        TECHNOLOGIES
                    ================================================= */}

                    <div
                      className="
                        mt-4
                        flex
                        flex-wrap
                        gap-1.5

                        min-[400px]:mt-5
                        min-[400px]:gap-2
                      "
                    >
                      {item.technologies
                        .slice(0, 3)
                        .map(
                          (
                            technology,
                          ) => (
                            <span
                              key={
                                technology
                              }
                              className="
                                rounded-full
                                border
                                border-cyan-400/10
                                bg-cyan-400/[0.035]
                                px-2
                                py-1
                                text-[7px]
                                font-bold
                                uppercase
                                tracking-wider
                                text-cyan-300/70

                                min-[400px]:px-2.5
                                min-[400px]:text-[8px]
                              "
                            >
                              {
                                technology
                              }
                            </span>
                          ),
                        )}

                      {item
                        .technologies
                        .length >
                        3 && (
                        <span
                          className="
                            rounded-full
                            border
                            border-white/[0.07]
                            bg-white/[0.02]
                            px-2
                            py-1
                            text-[7px]
                            font-bold
                            text-slate-600

                            min-[400px]:px-2.5
                            min-[400px]:text-[8px]
                          "
                        >
                          +
                          {item
                            .technologies
                            .length -
                            3}
                        </span>
                      )}
                    </div>

                    {/* =================================================
                        ACTION
                    ================================================= */}

                    <div
                      className="
                        mt-4
                        flex
                        items-center
                        justify-between
                        border-t
                        border-white/[0.05]
                        pt-3

                        min-[400px]:mt-5
                        min-[400px]:pt-4
                      "
                    >
                      <span
                        className="
                          text-[7px]
                          font-bold
                          uppercase
                          tracking-[0.15em]
                          text-slate-600

                          min-[400px]:text-[8px]
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

                          min-[400px]:text-sm

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
                      height:
                        isActive
                          ? "auto"
                          : 0,
                      opacity:
                        isActive
                          ? 1
                          : 0,
                    }}
                    transition={{
                      duration:
                        reduceMotion
                          ? 0
                          : 0.3,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
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
                        border-white/[0.06]
                        px-4
                        pb-5
                        pt-4

                        min-[400px]:px-5
                        min-[400px]:pb-6
                        min-[400px]:pt-5

                        sm:px-6
                      "
                    >
                      {/* =================================================
                          WHAT I LEARNED
                      ================================================= */}

                      <div
                        className="
                          rounded-xl
                          border
                          border-white/[0.05]
                          bg-black/[0.12]
                          p-3.5

                          min-[400px]:rounded-2xl
                          min-[400px]:p-4
                        "
                      >
                        <div
                          className="
                            mb-2.5
                            flex
                            items-center
                            gap-2

                            min-[400px]:mb-3
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
                              tracking-[0.16em]
                              text-slate-500
                            "
                          >
                            What I Learned
                          </span>
                        </div>

                        <p
                          className="
                            text-[10px]
                            leading-6
                            text-slate-500

                            min-[400px]:text-[11px]
                          "
                        >
                          {
                            item.description
                          }
                        </p>
                      </div>

                      {/* =================================================
                          KEY PROGRESS
                      ================================================= */}

                      <div className="mt-4">
                        <div
                          className="
                            mb-3
                            flex
                            items-center
                            gap-2
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
                              tracking-[0.16em]
                              text-slate-500
                            "
                          >
                            Key Progress
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          {item.highlights.map(
                            (
                              highlight,
                            ) => (
                              <div
                                key={
                                  highlight
                                }
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

                                    min-[400px]:text-[11px]
                                  "
                                >
                                  {
                                    highlight
                                  }
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>

                      {/* =================================================
                          TECHNOLOGIES
                      ================================================= */}

                      <div className="mt-5">
                        <div
                          className="
                            mb-3
                            flex
                            items-center
                            gap-2
                          "
                        >
                          <FiTool
                            className="text-cyan-300"
                            size={14}
                          />

                          <span
                            className="
                              text-[8px]
                              font-black
                              uppercase
                              tracking-[0.16em]
                              text-slate-500
                            "
                          >
                            Technologies
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {item.technologies.map(
                            (
                              technology,
                            ) => (
                              <span
                                key={
                                  technology
                                }
                                className="
                                  rounded-lg
                                  border
                                  border-white/[0.06]
                                  bg-white/[0.02]
                                  px-2
                                  py-1.5
                                  text-[8px]
                                  font-medium
                                  text-slate-500

                                  min-[400px]:px-2.5
                                  min-[400px]:text-[9px]
                                "
                              >
                                {
                                  technology
                                }
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* =================================================
                      ACTIVE BOTTOM LINE
                  ================================================= */}

                  <motion.div
                    initial={false}
                    animate={{
                      scaleX:
                        isActive
                          ? 1
                          : 0,
                      opacity:
                        isActive
                          ? 1
                          : 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="
                      absolute
                      bottom-0
                      left-5
                      right-5
                      h-px
                      origin-left
                      bg-gradient-to-r
                      from-transparent
                      via-cyan-400
                      to-transparent

                      sm:left-6
                      sm:right-6
                    "
                  />
                </motion.article>
              );
            },
          )}
        </div>

        {/* ===================================================
            SEE MORE / SHOW LESS
        =================================================== */}

        {hasMoreJourney && (
          <motion.div
            initial={{
              opacity: 0,
              y: reduceMotion
                ? 0
                : 15,
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

              sm:mt-10
            "
          >
            <button
              type="button"
              onClick={
                handleSeeMore
              }
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-cyan-400/15
                bg-cyan-400/[0.035]
                px-5
                py-2.5
                text-[9px]
                font-black
                uppercase
                tracking-[0.16em]
                text-cyan-300
                transition-all
                duration-300

                min-[400px]:gap-2.5
                min-[400px]:px-6
                min-[400px]:py-3
                min-[400px]:text-[10px]

                hover:border-cyan-400/35
                hover:bg-cyan-400/[0.07]
                hover:text-white
              "
            >
              <span>
                {showAll
                  ? "Show Less"
                  : "See More"}
              </span>

              <FiChevronDown
                size={14}
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