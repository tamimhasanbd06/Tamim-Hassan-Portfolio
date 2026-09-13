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

import {
  FaAws,
  FaDocker,
  FaGithub,
  FaNodeJs,
  FaPython,
} from "react-icons/fa";

import {
  SiFastapi,
  SiGit,
  SiNginx,
  SiNestjs,
  SiPostgresql,
  SiVite,
} from "react-icons/si";

import {
  FiArrowDown,
  FiArrowUp,
  FiArrowUpRight,
  FiCode,
  FiDatabase,
  FiGlobe,
  FiLayers,
  FiLoader,
  FiServer,
  FiTerminal,
  FiTriangle,
} from "react-icons/fi";

import {
  VscCode,
  VscExtensions,
} from "react-icons/vsc";

/* ========================================================================= */
/*                                Types                                      */
/* ========================================================================= */

type ToolData = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  category: string;
  icon: string;
  featured?: boolean;
};

type ToolItem = ToolData & {
  iconComponent: IconType;
};

/* ========================================================================= */
/*                              Icon Mapping                                 */
/* ========================================================================= */

const iconMap: Record<string, IconType> = {
  github: FaGithub,
  git: SiGit,

  terminal: FiTerminal,

  nodejs: FaNodeJs,
  python: FaPython,

  aws: FaAws,
  docker: FaDocker,

  nginx: SiNginx,

  postgresql: SiPostgresql,

  fastapi: SiFastapi,
  nestjs: SiNestjs,

  vite: SiVite,

  vscode: VscCode,
  code: VscCode,
  extensions: VscExtensions,

  deployment: FiTriangle,

  server: FiServer,
  database: FiDatabase,
  globe: FiGlobe,
  layers: FiLayers,

  default: FiCode,
};

/* ========================================================================= */
/*                         Safe Icon Resolver                                */
/* ========================================================================= */

function getToolIcon(
  iconName: string,
): IconType {
  return (
    iconMap[iconName] ??
    iconMap.default
  );
}

/* ========================================================================= */
/*                         Category Icon Mapping                             */
/* ========================================================================= */

const categoryIcons: Record<
  string,
  IconType
> = {
  Development: FiCode,
  Backend: FiServer,
  DevOps: FiLayers,
  Database: FiDatabase,
  Deployment: FiGlobe,
  Tools: VscCode,

  default: FiCode,
};

/* ========================================================================= */
/*                     Safe Category Icon Resolver                           */
/* ========================================================================= */

function getCategoryIcon(
  category: string,
): IconType {
  return (
    categoryIcons[category] ??
    categoryIcons.default
  );
}

/* ========================================================================= */
/*                           Productivity Section                            */
/* ========================================================================= */

export default function ProductivitySection() {
  const reduceMotion =
    useReducedMotion();

  /* ----------------------------------------------------------------------- */
  /*                              State                                      */
  /* ----------------------------------------------------------------------- */

  const [tools, setTools] =
    useState<ToolItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [activeTool, setActiveTool] =
    useState<string | null>(null);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState<
    "All" | string
  >("All");

  /*
   * IMPORTANT
   *
   * false = only first 4 cards
   * true  = show all cards
   */
  const [showAll, setShowAll] =
    useState(false);

  /* ----------------------------------------------------------------------- */
  /*                         Load JSON Data                                  */
  /* ----------------------------------------------------------------------- */

  useEffect(() => {
    let cancelled = false;

    const loadTools = async () => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await fetch(
            "/data/ProductivitySection.json",
            {
              cache: "no-store",
            },
          );

        if (!response.ok) {
          throw new Error(
            `Failed to load productivity data (${response.status})`,
          );
        }

        const data: unknown =
          await response.json();

        if (!Array.isArray(data)) {
          throw new Error(
            "ProductivitySection.json must contain an array.",
          );
        }

        const normalizedTools: ToolItem[] =
          data
            .filter(
              (
                item,
              ): item is ToolData =>
                typeof item ===
                  "object" &&
                item !== null &&
                "id" in item &&
                "name" in item &&
                "description" in item &&
                "tags" in item &&
                "category" in item &&
                "icon" in item,
            )
            .map(
              (item) => ({
                ...item,
                id: String(
                  item.id,
                ),
                name: String(
                  item.name,
                ),
                description:
                  String(
                    item.description,
                  ),
                category:
                  String(
                    item.category,
                  ),
                icon: String(
                  item.icon,
                ),
                tags: Array.isArray(
                  item.tags,
                )
                  ? item.tags.map(
                      String,
                    )
                  : [],
                iconComponent:
                  getToolIcon(
                    String(
                      item.icon,
                    ),
                  ),
              }),
            );

        if (!cancelled) {
          setTools(
            normalizedTools,
          );
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong while loading the tools.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadTools();

    return () => {
      cancelled = true;
    };
  }, []);

  /* ----------------------------------------------------------------------- */
  /*                            Escape Key                                   */
  /* ----------------------------------------------------------------------- */

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key === "Escape"
      ) {
        setActiveTool(null);
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

  /* ----------------------------------------------------------------------- */
  /*                            Categories                                   */
  /* ----------------------------------------------------------------------- */

  const categories =
    useMemo(() => {
      return [
        "All",
        ...Array.from(
          new Set(
            tools.map(
              (tool) =>
                tool.category,
            ),
          ),
        ),
      ];
    }, [tools]);

  /* ----------------------------------------------------------------------- */
  /*                              Filtering                                  */
  /* ----------------------------------------------------------------------- */

  const filteredTools =
    useMemo(() => {
      if (
        selectedCategory ===
        "All"
      ) {
        return tools;
      }

      return tools.filter(
        (tool) =>
          tool.category ===
          selectedCategory,
      );
    }, [
      tools,
      selectedCategory,
    ]);

  /* ----------------------------------------------------------------------- */
  /*                       Visible Tools                                     */
  /* ----------------------------------------------------------------------- */

  /*
   * First 4 cards are shown initially.
   * After See More, all cards appear.
   *
   * If there are 4 or fewer cards,
   * See More will not appear.
   */

  const visibleTools =
    useMemo(() => {
      if (showAll) {
        return filteredTools;
      }

      return filteredTools.slice(
        0,
        4,
      );
    }, [
      filteredTools,
      showAll,
    ]);

  const hasMoreTools =
    filteredTools.length > 4;

  /* ----------------------------------------------------------------------- */
  /*                           Statistics                                    */
  /* ----------------------------------------------------------------------- */

  const categoryCount =
    useMemo(() => {
      return new Set(
        tools.map(
          (tool) =>
            tool.category,
        ),
      ).size;
    }, [tools]);

  const featuredCount =
    useMemo(() => {
      return tools.filter(
        (tool) =>
          tool.featured,
      ).length;
    }, [tools]);

  /* ----------------------------------------------------------------------- */
  /*                         Tool Selection                                  */
  /* ----------------------------------------------------------------------- */

  const handleToolClick = (
    toolId: string,
  ) => {
    setActiveTool(
      (current) =>
        current === toolId
          ? null
          : toolId,
    );
  };

  /* ----------------------------------------------------------------------- */
  /*                         Category Change                                 */
  /* ----------------------------------------------------------------------- */

  const handleCategoryChange = (
    category: string,
  ) => {
    setSelectedCategory(
      category,
    );

    /*
     * Reset See More whenever
     * category changes.
     */
    setShowAll(false);

    /*
     * Close active card.
     */
    setActiveTool(null);
  };

  /* ----------------------------------------------------------------------- */
  /*                         See More Toggle                                 */
  /* ----------------------------------------------------------------------- */

  const handleSeeMore = () => {
    setShowAll(
      (current) => !current,
    );

    setActiveTool(null);
  };

  /* ========================================================================= */
  /*                                Render                                    */
  /* ========================================================================= */

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
      {/* =================================================================== */}
      {/* Background                                                          */}
      {/* =================================================================== */}

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

      {/* =================================================================== */}
      {/* Container                                                           */}
      {/* =================================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
        "
      >
        {/* ================================================================= */}
        {/* Header                                                            */}
        {/* ================================================================= */}

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
            max-w-3xl
            text-center
          "
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
              Developer Toolkit
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
              My Workflow
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
            A focused collection of
            technologies and
            development tools I use
            to design, build, deploy,
            and maintain modern web
            applications.
          </p>
        </motion.div>

        {/* ================================================================= */}
        {/* Loading State                                                     */}
        {/* ================================================================= */}

        {loading && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="
              mx-auto
              mt-14
              flex
              min-h-[220px]
              max-w-xl
              flex-col
              items-center
              justify-center
              rounded-3xl
              border
              border-white/10
              bg-white/[0.025]
              backdrop-blur-xl
            "
          >
            <FiLoader
              className="
                animate-spin
                text-3xl
                text-cyan-300
              "
            />

            <p
              className="
                mt-4
                text-xs
                font-bold
                uppercase
                tracking-[0.16em]
                text-slate-500
              "
            >
              Loading developer tools
            </p>
          </motion.div>
        )}

        {/* ================================================================= */}
        {/* Error State                                                       */}
        {/* ================================================================= */}

        {!loading &&
          error && (
            <div
              className="
                mx-auto
                mt-14
                max-w-xl
                rounded-3xl
                border
                border-red-400/20
                bg-red-400/[0.04]
                p-8
                text-center
              "
            >
              <FiCode
                className="
                  mx-auto
                  text-3xl
                  text-red-300
                "
              />

              <h3
                className="
                  mt-4
                  text-base
                  font-bold
                  text-white
                "
              >
                Unable to load developer tools
              </h3>

              <p
                className="
                  mt-2
                  text-xs
                  leading-6
                  text-slate-500
                "
              >
                {error}
              </p>
            </div>
          )}

        {/* ================================================================= */}
        {/* Main Content                                                      */}
        {/* ================================================================= */}

        {!loading &&
          !error &&
          tools.length > 0 && (
            <>
              {/* =========================================================== */}
              {/* Statistics                                                   */}
              {/* =========================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: reduceMotion
                    ? 0
                    : 18,
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
                  duration: 0.6,
                  delay: 0.1,
                }}
                className="
                  mx-auto
                  mt-10
                  grid
                  max-w-3xl
                  grid-cols-2
                  gap-3
                  sm:grid-cols-4
                "
              >
                {[
                  {
                    value:
                      tools.length,
                    label:
                      "Technologies",
                  },
                  {
                    value:
                      categoryCount,
                    label:
                      "Categories",
                  },
                  {
                    value:
                      featuredCount,
                    label:
                      "Core Tools",
                  },
                  {
                    value:
                      "100%",
                    label:
                      "Workflow",
                  },
                ].map(
                  (
                    stat,
                    index,
                  ) => (
                    <div
                      key={
                        index
                      }
                      className="
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.025]
                        px-4
                        py-4
                        text-center
                        backdrop-blur-xl
                      "
                    >
                      <div
                        className="
                          text-xl
                          font-black
                          text-cyan-300
                          sm:text-2xl
                        "
                      >
                        {
                          stat.value
                        }
                      </div>

                      <div
                        className="
                          mt-1
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.16em]
                          text-slate-500
                        "
                      >
                        {
                          stat.label
                        }
                      </div>
                    </div>
                  ),
                )}
              </motion.div>

              {/* =========================================================== */}
              {/* Category Filter                                              */}
              {/* =========================================================== */}

              <div
                className="
                  mt-12
                  flex
                  flex-wrap
                  justify-center
                  gap-2
                "
              >
                {categories.map(
                  (category) => {
                    const isSelected =
                      selectedCategory ===
                      category;

                    const CategoryIcon =
                      category ===
                      "All"
                        ? FiCode
                        : getCategoryIcon(
                            category,
                          );

                    return (
                      <button
                        key={
                          category
                        }
                        type="button"
                        onClick={() =>
                          handleCategoryChange(
                            category,
                          )
                        }
                        className={`
                          inline-flex
                          items-center
                          gap-2
                          rounded-full
                          border
                          px-3.5
                          py-2
                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.12em]
                          transition-all
                          duration-300
                          ${
                            isSelected
                              ? "border-cyan-300/40 bg-cyan-400/10 text-cyan-200 shadow-[0_0_25px_rgba(34,211,238,0.08)]"
                              : "border-white/10 bg-white/[0.025] text-slate-500 hover:border-cyan-400/25 hover:bg-cyan-400/[0.05] hover:text-cyan-300"
                          }
                        `}
                      >
                        <CategoryIcon
                          className="text-sm"
                        />

                        {category}
                      </button>
                    );
                  },
                )}
              </div>

              {/* =========================================================== */}
              {/* Cards Grid                                                   */}
              {/* =========================================================== */}

              <motion.div
                layout
                className="
                  mt-10
                  grid
                  gap-5
                  sm:grid-cols-2
                  lg:grid-cols-3
                  xl:grid-cols-4
                "
              >
                {visibleTools.map(
                  (
                    tool,
                    index,
                  ) => {
                    const Icon =
                      tool.iconComponent;

                    const isActive =
                      activeTool ===
                      tool.id;

                    const CategoryIcon =
                      getCategoryIcon(
                        tool.category,
                      );

                    return (
                      <motion.article
                        layout
                        key={
                          tool.id
                        }
                        initial={{
                          opacity: 0,
                          y: reduceMotion
                            ? 0
                            : 24,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.5,
                          delay:
                            index *
                            0.045,
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
                          rounded-3xl
                          border
                          p-5
                          transition-all
                          duration-300
                          ${
                            isActive
                              ? "border-cyan-300/45 bg-cyan-400/[0.075] shadow-[0_25px_70px_rgba(34,211,238,0.13)]"
                              : "border-white/10 bg-white/[0.035] hover:border-cyan-400/25 hover:bg-white/[0.05] hover:shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
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
                            h-40
                            w-40
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
                            bg-blue-500/[0.06]
                            opacity-0
                            blur-3xl
                            transition-opacity
                            duration-500
                            group-hover:opacity-100
                          "
                        />

                        <div className="relative z-10">

                          {/* Top Row */}

                          <div
                            className="
                              flex
                              items-start
                              justify-between
                              gap-3
                            "
                          >
                            {/* Icon */}

                            <motion.button
                              type="button"
                              onClick={() =>
                                handleToolClick(
                                  tool.id,
                                )
                              }
                              aria-label={`Focus ${tool.name}`}
                              aria-pressed={
                                isActive
                              }
                              whileTap={
                                reduceMotion
                                  ? undefined
                                  : {
                                      scale: 0.94,
                                    }
                              }
                              className={`
                                relative
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
                                    ? "border-cyan-300/50 bg-cyan-400/15 text-cyan-200 shadow-[0_0_35px_rgba(34,211,238,0.2)]"
                                    : "border-cyan-400/15 bg-cyan-400/[0.06] text-cyan-300 group-hover:border-cyan-300/35 group-hover:bg-cyan-400/10 group-hover:text-cyan-100"
                                }
                              `}
                            >
                              <Icon />

                              <span
                                aria-hidden="true"
                                className="
                                  pointer-events-none
                                  absolute
                                  inset-[-8px]
                                  rounded-[20px]
                                  bg-cyan-400/10
                                  opacity-0
                                  blur-xl
                                  transition-opacity
                                  duration-500
                                  group-hover:opacity-100
                                "
                              />
                            </motion.button>

                            {/* Category */}

                            <span
                              className="
                                inline-flex
                                items-center
                                gap-1.5
                                rounded-full
                                border
                                border-white/10
                                bg-white/[0.025]
                                px-2.5
                                py-1.5
                                text-[8px]
                                font-bold
                                uppercase
                                tracking-[0.1em]
                                text-slate-500
                              "
                            >
                              <CategoryIcon />

                              {
                                tool.category
                              }
                            </span>
                          </div>

                          {/* Title */}

                          <div
                            className="
                              mt-5
                              flex
                              items-center
                              justify-between
                              gap-3
                            "
                          >
                            <h3
                              className="
                                text-base
                                font-black
                                tracking-tight
                                text-white
                              "
                            >
                              {
                                tool.name
                              }
                            </h3>

                            <FiArrowUpRight
                              className="
                                text-lg
                                text-slate-700
                                transition-all
                                duration-300
                                group-hover:-translate-y-0.5
                                group-hover:translate-x-0.5
                                group-hover:text-cyan-300
                              "
                            />
                          </div>

                          {/* Description */}

                          <p
                            className="
                              mt-3
                              min-h-[88px]
                              text-[12px]
                              leading-6
                              text-slate-400
                            "
                          >
                            {
                              tool.description
                            }
                          </p>

                          {/* Divider */}

                          <div
                            className="
                              my-4
                              h-px
                              bg-gradient-to-r
                              from-transparent
                              via-white/10
                              to-transparent
                            "
                          />

                          {/* Tags */}

                          <div
                            className="
                              flex
                              flex-wrap
                              gap-2
                            "
                          >
                            {tool.tags.map(
                              (
                                tag,
                              ) => (
                                <span
                                  key={
                                    tag
                                  }
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
                                    tracking-widest
                                    text-cyan-300/80
                                    transition-colors
                                    duration-300
                                    group-hover:border-cyan-400/20
                                    group-hover:text-cyan-300
                                  "
                                >
                                  {
                                    tag
                                  }
                                </span>
                              ),
                            )}
                          </div>

                          {/* Bottom */}

                          <div
                            className="
                              mt-5
                              flex
                              items-center
                              justify-between
                            "
                          >
                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                text-[8px]
                                font-bold
                                uppercase
                                tracking-[0.13em]
                                text-slate-600
                              "
                            >
                              <span
                                className="
                                  h-1.5
                                  w-1.5
                                  rounded-full
                                  bg-emerald-400/80
                                  shadow-[0_0_9px_rgba(52,211,153,0.6)]
                                "
                              />

                              Active Workflow
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                handleToolClick(
                                  tool.id,
                                )
                              }
                              className="
                                text-[8px]
                                font-bold
                                uppercase
                                tracking-[0.13em]
                                text-cyan-400/60
                                transition-colors
                                duration-300
                                hover:text-cyan-300
                              "
                            >
                              {isActive
                                ? "Selected"
                                : "Explore"}
                            </button>
                          </div>

                          {/* Active Line */}

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
                            "
                          />
                        </div>
                      </motion.article>
                    );
                  },
                )}
              </motion.div>

              {/* =========================================================== */}
              {/* SEE MORE / SHOW LESS                                        */}
              {/* =========================================================== */}

              {hasMoreTools && (
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
                    mt-10
                    flex
                    justify-center
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
                    {showAll
                      ? "Show Less"
                      : "See More"}

                    {showAll ? (
                      <FiArrowUp
                        size={15}
                        className="
                          transition-transform
                          duration-300
                          group-hover:-translate-y-0.5
                        "
                      />
                    ) : (
                      <FiArrowDown
                        size={15}
                        className="
                          transition-transform
                          duration-300
                          group-hover:translate-y-0.5
                        "
                      />
                    )}
                  </button>
                </motion.div>
              )}

              {/* =========================================================== */}
              {/* Empty State                                                  */}
              {/* =========================================================== */}

              {filteredTools.length ===
                0 && (
                <div
                  className="
                    mt-10
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    p-12
                    text-center
                  "
                >
                  <FiCode
                    className="
                      mx-auto
                      text-3xl
                      text-slate-600
                    "
                  />

                  <p
                    className="
                      mt-4
                      text-sm
                      text-slate-500
                    "
                  >
                    No tools found in
                    this category.
                  </p>
                </div>
              )}
            </>
          )}
      </div>
    </section>
  );
}