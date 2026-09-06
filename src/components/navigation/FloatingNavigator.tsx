"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaArrowUp,
  FaChevronRight,
  FaHome,
} from "react-icons/fa";

export type SectionItem = {
  label: string;
  id: string;
};

const homeSections: SectionItem[] = [
  { label: "Home", id: "home" },
  { label: "Introduction", id: "introduction" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

type FloatingNavigatorProps = {
  sections?: SectionItem[];
  homeHref?: string;
};

export default function FloatingNavigator({
  sections = homeSections,
  homeHref,
}: FloatingNavigatorProps) {
  const topSectionId = sections[0]?.id ?? "home";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] =
    useState("home");

  const hoverTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const clearHoverTimer = () => {
    if (!hoverTimerRef.current) return;

    clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = null;
  };

  const startHoverTimer = () => {
    clearHoverTimer();

    hoverTimerRef.current = setTimeout(() => {
      setIsMenuOpen(true);
      hoverTimerRef.current = null;
    }, 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    window.history.replaceState(
      null,
      "",
      `#${topSectionId}`,
    );

    setActiveSection(topSectionId);
    setIsMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    const section =
      document.getElementById(id);

    if (!section) return;

    const navbarOffset = 64;

    const targetPosition =
      section.getBoundingClientRect().top +
      window.scrollY -
      navbarOffset;

    window.scrollTo({
      top: Math.max(targetPosition, 0),
      behavior: "smooth",
    });

    window.history.replaceState(
      null,
      "",
      `#${id}`,
    );

    setActiveSection(id);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    let animationFrame: number | null = null;

    const updateActiveSection = () => {
      setIsVisible(window.scrollY > 48);

      const currentPosition =
        window.scrollY + 140;

      let detectedSection = topSectionId;

      sections.forEach((section) => {
        const element =
          document.getElementById(
            section.id,
          );

        if (
          element &&
          element.offsetTop <=
            currentPosition
        ) {
          detectedSection = section.id;
        }
      });

      setActiveSection(detectedSection);
    };

    const handleScroll = () => {
      if (animationFrame !== null) return;

      animationFrame =
        window.requestAnimationFrame(() => {
          updateActiveSection();
          animationFrame = null;
        });
    };

    updateActiveSection();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      if (animationFrame !== null) {
        window.cancelAnimationFrame(
          animationFrame,
        );
      }
    };
  }, [sections, topSectionId]);

  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent,
    ) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsMenuOpen(false);
      }
    };

    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    document.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );

      document.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, []);

  useEffect(() => {
    return () => {
      clearHoverTimer();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={wrapperRef}
      className="
        fixed
        bottom-5
        left-5
        z-[300]
        flex
        items-end
        gap-3
        sm:bottom-6
        sm:left-6
      "
    >
      {/* Side menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              x: -20,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: -20,
              scale: 0.96,
            }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute
              bottom-0
              left-[68px]
              w-[225px]
              overflow-hidden
              rounded-2xl
              border
              border-white/10
              bg-[#06111f]/95
              shadow-[0_20px_70px_rgba(0,0,0,0.65)]
              backdrop-blur-2xl
              sm:w-[245px]
            "
          >
            {/* Menu heading */}
            <div
              className="
                border-b
                border-white/10
                px-4
                py-3
              "
            >
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-cyan-300
                "
              >
                Page Navigation
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-500
                "
              >
                Jump to any section
              </p>
            </div>

            {/* Menu items */}
            <div
              className="
                max-h-[390px]
                overflow-y-auto
                p-2
              "
            >
              {homeHref && (
                <Link
                  href={homeHref}
                  onClick={() => setIsMenuOpen(false)}
                  className="group relative mb-1 flex w-full items-center justify-between rounded-xl bg-blue-500/10 px-3 py-2.5 text-left text-sm font-semibold text-blue-200 transition-all duration-200 hover:bg-cyan-400/10 hover:text-cyan-100"
                >
                  <span className="flex items-center gap-2.5">
                    <FaHome className="text-xs text-cyan-300" />
                    Go to Home
                  </span>
                  <FaChevronRight className="text-[9px] text-cyan-400" />
                </Link>
              )}

              {sections.map(
                (section, index) => {
                  const isActive =
                    activeSection ===
                    section.id;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() =>
                        scrollToSection(
                          section.id,
                        )
                      }
                      className={`
                        group
                        relative
                        flex
                        w-full
                        items-center
                        justify-between
                        rounded-xl
                        px-3
                        py-2.5
                        text-left
                        text-sm
                        transition-all
                        duration-200

                        ${
                          isActive
                            ? "bg-cyan-400/10 text-cyan-200"
                            : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                        }
                      `}
                    >
                      <span>
                        {section.label}
                      </span>

                      <span
                        className={`
                          text-[9px]
                          font-black
                          tracking-wider
                          ${
                            isActive
                              ? "text-cyan-300"
                              : "text-slate-700"
                          }
                        `}
                      >
                        {String(
                          index + 1,
                        ).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      {isActive && (
                        <span
                          className="
                            absolute
                            bottom-0
                            left-3
                            right-3
                            h-px
                            bg-gradient-to-r
                            from-blue-500
                            via-cyan-300
                            to-transparent
                          "
                        />
                      )}
                    </button>
                  );
                },
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating arrow button */}
      <motion.button
        type="button"
        onClick={scrollToTop}
        onMouseEnter={startHoverTimer}
        onMouseLeave={clearHoverTimer}
        whileHover={{
          y: -4,
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.94,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 18,
        }}
        aria-label="Scroll to top. Hover for two seconds to open page navigation."
        title="Click: Back to top | Hover 2 seconds: Navigation"
        className="
          group
          relative
          flex
          h-14
          w-14
          items-center
          justify-center
          overflow-hidden
          rounded-2xl
          border
          border-cyan-400/30
          bg-[#071426]/95
          text-cyan-300
          shadow-[0_12px_40px_rgba(0,0,0,0.55)]
          backdrop-blur-xl
          transition-colors
          duration-300
          hover:border-cyan-300/60
          hover:bg-cyan-400/10
          hover:text-cyan-100
        "
      >
        {/* Background glow */}
        <span
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-br
            from-blue-500/10
            to-cyan-400/10
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        />

        {/* Arrow */}
        <motion.span
          animate={{
            y: [0, -3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            relative
            z-10
            text-lg
          "
        >
          <FaArrowUp />
        </motion.span>

        {/* Small menu hint */}
        <span
          className="
            absolute
            bottom-1
            right-1
            z-10
            flex
            h-4
            w-4
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-black/50
            text-[7px]
            text-slate-500
            transition-colors
            duration-300
            group-hover:text-cyan-300
          "
        >
          <FaChevronRight />
        </span>
      </motion.button>
    </div>
  );
}

