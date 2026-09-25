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
            "/Main/Developer-Toolkit.json",
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
            "Developer-Toolkit.json must contain an array.",
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

    setShowAll(false);

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
      {/* =================================================================== */}
      {/* Container                                                           */}
      {/* =================================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[2000px]
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
              items-center
              gap-2
              rounded-full
              border
              border-cyan-400/20
              bg-cyan-400/[0.035]
              px-3
              py-1.5
              shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]
              min-[400px]:px-4
              min-[400px]:py-2
              sm:mb-5
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-cyan-400
                shadow-[0_0_12px_rgba(34,211,238,0.75)]
                sm:h-2
                sm:w-2
              "
            />

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-cyan-300
                min-[400px]:text-[10px]
                sm:text-xs
                sm:tracking-[0.22em]
              "
            >
              Developer Toolkit
            </span>
          </div>

          {/* Heading */}

          <h2
            className="
              text-[1.75rem]
              font-black
              leading-[1.1]
              tracking-[-0.04em]
              text-white
              min-[400px]:text-3xl
              sm:text-4xl
              md:text-[2.75rem]
              lg:text-5xl
              xl:text-[3.5rem]
              2xl:text-[4rem]
            "
          >
            Tools That Power{" "}
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
              My Workflow
            </span>
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-4
              max-w-[680px]
              text-[11px]
              leading-6
              text-slate-500
              min-[400px]:text-xs
              sm:mt-5
              sm:text-sm
              sm:leading-7
              lg:text-base
              xl:max-w-2xl
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
              mt-12
              flex
              min-h-[190px]
              w-full
              max-w-xl
              flex-col
              items-center
              justify-center
              rounded-[24px]
              border
              border-white/[0.08]
              bg-white/[0.02]
              px-5
              py-8
              sm:mt-14
              sm:min-h-[220px]
              sm:rounded-3xl
            "
          >
            <FiLoader
              className="
                animate-spin
                text-2xl
                text-cyan-300
                sm:text-3xl
              "
            />

            <p
              className="
                mt-4
                text-[9px]
                font-bold
                uppercase
                tracking-[0.15em]
                text-slate-600
                sm:text-[10px]
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
                mt-12
                w-full
                max-w-xl
                rounded-[24px]
                border
                border-red-400/15
                bg-red-400/[0.025]
                p-6
                text-center
                sm:mt-14
                sm:rounded-3xl
                sm:p-8
              "
            >
              <FiCode
                className="
                  mx-auto
                  text-2xl
                  text-red-300
                  sm:text-3xl
                "
              />

              <h3
                className="
                  mt-4
                  text-sm
                  font-bold
                  text-white
                  sm:text-base
                "
              >
                Unable to load developer
                tools
              </h3>

              <p
                className="
                  mt-2
                  text-[10px]
                  leading-5
                  text-slate-600
                  sm:text-xs
                  sm:leading-6
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
                  mt-9
                  grid
                  w-full
                  max-w-4xl
                  grid-cols-2
                  gap-2.5
                  min-[400px]:gap-3
                  sm:mt-10
                  sm:grid-cols-4
                  sm:gap-4
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
                        group
                        rounded-2xl
                        border
                        border-white/[0.07]
                        bg-white/[0.018]
                        px-3
                        py-3.5
                        text-center
                        transition-all
                        duration-300
                        hover:border-cyan-400/20
                        hover:bg-cyan-400/[0.025]
                        min-[400px]:px-4
                        sm:rounded-[20px]
                        sm:py-4
                      "
                    >
                      <div
                        className="
                          text-lg
                          font-black
                          tracking-tight
                          text-cyan-300
                          sm:text-2xl
                          lg:text-3xl
                        "
                      >
                        {
                          stat.value
                        }
                      </div>

                      <div
                        className="
                          mt-1
                          text-[8px]
                          font-bold
                          uppercase
                          tracking-[0.13em]
                          text-slate-600
                          min-[400px]:text-[9px]
                          sm:tracking-[0.16em]
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
                  mt-9
                  flex
                  w-full
                  gap-2
                  overflow-x-auto
                  px-1
                  pb-2
                  scrollbar-none
                  sm:mt-12
                  sm:flex-wrap
                  sm:justify-center
                  sm:overflow-visible
                  sm:pb-0
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
                          shrink-0
                          items-center
                          gap-1.5
                          rounded-full
                          border
                          px-3
                          py-2
                          text-[8px]
                          font-bold
                          uppercase
                          tracking-[0.1em]
                          transition-all
                          duration-300
                          min-[400px]:px-3.5
                          min-[400px]:text-[9px]
                          sm:px-4
                          sm:py-2.5
                          sm:text-[10px]
                          ${
                            isSelected
                              ? "border-cyan-300/35 bg-cyan-400/10 text-cyan-200 shadow-[0_0_25px_rgba(34,211,238,0.06)]"
                              : "border-white/[0.08] bg-white/[0.018] text-slate-600 hover:border-cyan-400/20 hover:bg-cyan-400/[0.035] hover:text-cyan-300"
                          }
                        `}
                      >
                        <CategoryIcon
                          className="
                            text-xs
                            sm:text-sm
                          "
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
                  mt-8
                  grid
                  grid-cols-1
                  gap-3.5
                  min-[500px]:grid-cols-2
                  min-[500px]:gap-4
                  sm:mt-10
                  lg:grid-cols-3
                  lg:gap-5
                  xl:grid-cols-4
                  2xl:gap-6
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
                                y: -6,
                              }
                        }
                        className={`
                          group
                          relative
                          overflow-hidden
                          rounded-[22px]
                          border
                          p-4
                          transition-all
                          duration-300
                          min-[400px]:rounded-[24px]
                          min-[400px]:p-5
                          sm:p-5
                          lg:p-6
                          ${
                            isActive
                              ? "border-cyan-300/35 bg-cyan-400/[0.045] shadow-[0_20px_60px_rgba(34,211,238,0.07)]"
                              : "border-white/[0.075] bg-white/[0.018] hover:border-cyan-400/20 hover:bg-white/[0.03]"
                          }
                        `}
                      >
                        {/* Top Highlight */}

                        <div
                          aria-hidden="true"
                          className="
                            pointer-events-none
                            absolute
                            inset-x-5
                            top-0
                            h-px
                            bg-gradient-to-r
                            from-transparent
                            via-cyan-400/30
                            to-transparent
                            opacity-0
                            transition-opacity
                            duration-300
                            group-hover:opacity-100
                          "
                        />

                        <div
                          className="
                            relative
                            z-10
                          "
                        >
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
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-[15px]
                                border
                                transition-all
                                duration-300
                                min-[400px]:h-12
                                min-[400px]:w-12
                                min-[400px]:rounded-2xl
                                sm:h-12
                                sm:w-12
                                ${
                                  isActive
                                    ? "border-cyan-300/40 bg-cyan-400/10 text-cyan-200"
                                    : "border-cyan-400/10 bg-cyan-400/[0.035] text-cyan-300 group-hover:border-cyan-300/30 group-hover:bg-cyan-400/[0.07] group-hover:text-cyan-100"
                                }
                              `}
                            >
                              <Icon
                                className="
                                  text-lg
                                  sm:text-xl
                                "
                              />
                            </motion.button>

                            {/* Category */}

                            <span
                              className="
                                inline-flex
                                max-w-[50%]
                                items-center
                                gap-1
                                rounded-full
                                border
                                border-white/[0.07]
                                bg-white/[0.018]
                                px-2
                                py-1
                                text-[7px]
                                font-bold
                                uppercase
                                tracking-[0.08em]
                                text-slate-600
                                min-[400px]:px-2.5
                                min-[400px]:py-1.5
                                min-[400px]:text-[8px]
                                sm:text-[9px]
                              "
                            >
                              <CategoryIcon />

                              <span className="truncate">
                                {
                                  tool.category
                                }
                              </span>
                            </span>
                          </div>

                          {/* Title */}

                          <div
                            className="
                              mt-4
                              flex
                              items-center
                              justify-between
                              gap-3
                              min-[400px]:mt-5
                            "
                          >
                            <h3
                              className="
                                min-w-0
                                truncate
                                text-sm
                                font-extrabold
                                tracking-tight
                                text-white
                                min-[400px]:text-base
                              "
                            >
                              {
                                tool.name
                              }
                            </h3>

                            <FiArrowUpRight
                              className="
                                shrink-0
                                text-base
                                text-slate-700
                                transition-all
                                duration-300
                                group-hover:-translate-y-0.5
                                group-hover:translate-x-0.5
                                group-hover:text-cyan-300
                                sm:text-lg
                              "
                            />
                          </div>

                          {/* Description */}

                          <p
                            className="
                              mt-2.5
                              min-h-[84px]
                              text-[11px]
                              leading-5
                              text-slate-500
                              min-[400px]:mt-3
                              min-[400px]:text-xs
                              min-[400px]:leading-6
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
                              bg-white/[0.06]
                            "
                          />

                          {/* Tags */}

                          <div
                            className="
                              flex
                              min-h-[26px]
                              flex-wrap
                              gap-1.5
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
                                    border-cyan-400/[0.08]
                                    bg-cyan-400/[0.025]
                                    px-2
                                    py-1
                                    text-[7px]
                                    font-bold
                                    uppercase
                                    tracking-[0.08em]
                                    text-cyan-300/60
                                    transition-all
                                    duration-300
                                    group-hover:border-cyan-400/15
                                    group-hover:text-cyan-300/80
                                    min-[400px]:text-[8px]
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
                              gap-2
                            "
                          >
                            <div
                              className="
                                flex
                                min-w-0
                                items-center
                                gap-1.5
                                text-[7px]
                                font-bold
                                uppercase
                                tracking-[0.1em]
                                text-slate-700
                                min-[400px]:text-[8px]
                              "
                            >
                              <span
                                className="
                                  h-1.5
                                  w-1.5
                                  shrink-0
                                  rounded-full
                                  bg-emerald-400/70
                                  shadow-[0_0_8px_rgba(52,211,153,0.45)]
                                "
                              />

                              <span className="truncate">
                                Active
                                Workflow
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                handleToolClick(
                                  tool.id,
                                )
                              }
                              className="
                                shrink-0
                                text-[7px]
                                font-bold
                                uppercase
                                tracking-[0.1em]
                                text-cyan-400/50
                                transition-colors
                                duration-300
                                hover:text-cyan-300
                                min-[400px]:text-[8px]
                              "
                            >
                              {isActive
                                ? "Selected"
                                : "Explore"}
                            </button>
                          </div>

                          {/* Active Indicator */}

                          <motion.div
                            initial={
                              false
                            }
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
                              left-4
                              right-4
                              h-px
                              origin-left
                              bg-gradient-to-r
                              from-transparent
                              via-cyan-400
                              to-transparent
                              min-[400px]:left-5
                              min-[400px]:right-5
                            "
                          />
                        </div>
                      </motion.article>
                    );
                  },
                )}
              </motion.div>

              {/* =========================================================== */}
              {/* See More / Show Less                                        */}
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
                      bg-cyan-400/[0.03]
                      px-5
                      py-2.5
                      text-[8px]
                      font-black
                      uppercase
                      tracking-[0.14em]
                      text-cyan-300/80
                      transition-all
                      duration-300
                      hover:border-cyan-400/30
                      hover:bg-cyan-400/[0.07]
                      hover:text-cyan-200
                      min-[400px]:px-6
                      min-[400px]:py-3
                      min-[400px]:text-[9px]
                      sm:text-[10px]
                    "
                  >
                    {showAll
                      ? "Show Less"
                      : "See More"}

                    {showAll ? (
                      <FiArrowUp
                        size={14}
                        className="
                          transition-transform
                          duration-300
                          group-hover:-translate-y-0.5
                        "
                      />
                    ) : (
                      <FiArrowDown
                        size={14}
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
                    mt-8
                    rounded-[24px]
                    border
                    border-white/[0.07]
                    bg-white/[0.018]
                    p-10
                    text-center
                    sm:mt-10
                    sm:rounded-3xl
                    sm:p-12
                  "
                >
                  <FiCode
                    className="
                      mx-auto
                      text-2xl
                      text-slate-700
                      sm:text-3xl
                    "
                  />

                  <p
                    className="
                      mt-4
                      text-xs
                      text-slate-600
                      sm:text-sm
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