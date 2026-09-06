"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type SectionId =
  | "home"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "education"
  | "faq"
  | "contact";

type NavigationItem = {
  name: string;
  sectionId: SectionId;
};

const navigationItems: NavigationItem[] = [
  { name: "Home", sectionId: "home" },
  { name: "About", sectionId: "about" },
  { name: "Skills", sectionId: "skills" },
  { name: "Projects", sectionId: "projects" },
  { name: "Experience", sectionId: "experience" },
  { name: "Education", sectionId: "education" },
  { name: "FAQ", sectionId: "faq" },
  { name: "Contact", sectionId: "contact" },
];

export default function Navbar() {
  const router = useRouter();

  const navbarRef = useRef<HTMLElement>(null);

  const logoClickTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] =
    useState<SectionId>("home");

  useEffect(() => {
    let animationFrame: number | null = null;

    const updateNavbar = () => {
      setScrolled(window.scrollY > 20);

      const navbarHeight =
        navbarRef.current?.offsetHeight ?? 64;

      const currentPosition =
        window.scrollY + navbarHeight + 120;

      let detectedSection: SectionId = "home";

      navigationItems.forEach((item) => {
        const section = document.getElementById(
          item.sectionId,
        );

        if (
          section &&
          section.offsetTop <= currentPosition
        ) {
          detectedSection = item.sectionId;
        }
      });

      const reachedBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 20;

      if (reachedBottom) {
        detectedSection = "contact";
      }

      setActiveSection(detectedSection);
    };

    const handleScroll = () => {
      if (animationFrame !== null) return;

      animationFrame =
        window.requestAnimationFrame(() => {
          updateNavbar();
          animationFrame = null;
        });
    };

    updateNavbar();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      handleScroll,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      window.removeEventListener(
        "resize",
        handleScroll,
      );

      if (animationFrame !== null) {
        window.cancelAnimationFrame(
          animationFrame,
        );
      }
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (
      event: MouseEvent,
    ) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(
          event.target as Node,
        )
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setIsOpen(false);
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
      if (logoClickTimerRef.current) {
        clearTimeout(
          logoClickTimerRef.current,
        );

        logoClickTimerRef.current = null;
      }
    };
  }, []);

  const scrollToSection = (
    sectionId: SectionId,
  ) => {
    const section =
      document.getElementById(sectionId);

    if (!section) return;

    const navbarHeight =
      navbarRef.current?.offsetHeight ?? 64;

    const position =
      section.getBoundingClientRect().top +
      window.scrollY -
      navbarHeight;

    window.scrollTo({
      top: Math.max(position, 0),
      behavior: "smooth",
    });

    window.history.replaceState(
      null,
      "",
      `#${sectionId}`,
    );

    setActiveSection(sectionId);
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    if (logoClickTimerRef.current) {
      clearTimeout(
        logoClickTimerRef.current,
      );
    }

    logoClickTimerRef.current =
      setTimeout(() => {
        router.push("/");

        logoClickTimerRef.current = null;
      }, 250);
  };

  const handleLogoDoubleClick = () => {
    if (logoClickTimerRef.current) {
      clearTimeout(
        logoClickTimerRef.current,
      );

      logoClickTimerRef.current = null;
    }

    scrollToSection("home");
  };

  return (
    <nav
      ref={navbarRef}
      className={`
        sticky top-0 z-[100]
        h-16 w-full
        border-b
        transition-[background-color,border-color,box-shadow,backdrop-filter]
        duration-300
        ${
          scrolled
            ? "border-cyan-400/15 bg-black/85 shadow-[0_14px_45px_rgba(0,0,0,0.55)] backdrop-blur-xl"
            : "border-white/[0.07] bg-black shadow-none"
        }
      `}
    >
      {/* Scroll glow line */}
      <div
        className={`
          pointer-events-none
          absolute bottom-0 left-1/2
          h-px -translate-x-1/2
          bg-gradient-to-r
          from-transparent via-cyan-400 to-transparent
          transition-all duration-500
          ${
            scrolled
              ? "w-full opacity-60"
              : "w-0 opacity-0"
          }
        `}
      />

      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          type="button"
          onClick={handleLogoClick}
          onDoubleClick={handleLogoDoubleClick}
          aria-label="Go to landing page. Double click to go to home section."
          title="Click: Landing Page | Double Click: Home"
          className="group flex shrink-0 items-center gap-3"
        >
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-cyan-400/20 bg-gradient-to-br from-blue-600/20 to-cyan-400/10 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-cyan-400/40 group-hover:bg-cyan-400/10">
            <span className="text-sm font-black text-cyan-200">
              TH
            </span>

            <span className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-blue-500 to-cyan-300" />
          </span>

          <span className="hidden text-left sm:block">
            <span className="block text-sm font-black text-white lg:text-base">
              Tamim{" "}
              <span className="text-cyan-300">
                Hasan
              </span>
            </span>

            <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-600">
              Web Developer
            </span>
          </span>
        </button>

        {/* Desktop navigation */}
        <ul className="hidden h-full items-center gap-0.5 lg:flex lg:gap-1">
          {navigationItems.map((item) => {
            const isActive =
              activeSection ===
              item.sectionId;

            return (
              <li
                key={item.sectionId}
                className="flex h-full items-center"
              >
                <a
                  href={`#${item.sectionId}`}
                  onClick={(event) => {
                    event.preventDefault();

                    scrollToSection(
                      item.sectionId,
                    );
                  }}
                  aria-current={
                    isActive
                      ? "page"
                      : undefined
                  }
                  className={`
                    group relative flex h-10
                    items-center rounded-full
                    px-3 text-xs font-semibold
                    transition-all duration-300
                    lg:px-4 lg:text-sm
                    ${
                      isActive
                        ? "bg-cyan-400/10 text-cyan-200"
                        : "text-gray-400 hover:bg-white/[0.05] hover:text-white"
                    }
                  `}
                >
                  {item.name}

                  <span
                    className={`
                      absolute bottom-0 left-1/2
                      h-[2px] -translate-x-1/2
                      rounded-full
                      bg-gradient-to-r
                      from-blue-500 to-cyan-300
                      transition-all duration-300
                      ${
                        isActive
                          ? "w-5 opacity-100"
                          : "w-0 opacity-0 group-hover:w-3 group-hover:opacity-60"
                      }
                    `}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() =>
            setIsOpen(
              (current) => !current,
            )
          }
          aria-label={
            isOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          className="relative flex h-11 w-11 touch-manipulation items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/10 lg:hidden"
        >
          <span className="relative h-5 w-5">
            {/* Top line */}
            <span
              className={`
                absolute left-0 h-[2px]
                w-5 rounded-full bg-white
                transition-all duration-300
                ${
                  isOpen
                    ? "top-[9px] rotate-45"
                    : "top-[2px]"
                }
              `}
            />

            {/* Middle line */}
            <span
              className={`
                absolute left-0 top-[9px]
                h-[2px] rounded-full bg-white
                transition-all duration-300
                ${
                  isOpen
                    ? "w-0 opacity-0"
                    : "w-4 opacity-100"
                }
              `}
            />

            {/* Bottom line */}
            <span
              className={`
                absolute left-0 h-[2px]
                w-5 rounded-full bg-white
                transition-all duration-300
                ${
                  isOpen
                    ? "top-[9px] -rotate-45"
                    : "top-[16px]"
                }
              `}
            />
          </span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-navigation"
        className={`
          absolute left-0 top-full
          w-full overflow-hidden
          border-b border-white/10
          bg-[#02060e]/95
          shadow-2xl
          backdrop-blur-2xl
          transition-all duration-300
          lg:hidden
          ${
            isOpen
              ? "visible max-h-[600px] translate-y-0 opacity-100"
              : "invisible max-h-0 -translate-y-2 opacity-0"
          }
        `}
      >
        <ul className="grid grid-cols-2 gap-2 p-3 min-[360px]:p-4 sm:px-6">
          {navigationItems.map(
            (item, index) => {
              const isActive =
                activeSection ===
                item.sectionId;

              const isLastOddItem =
                navigationItems.length %
                  2 !==
                  0 &&
                index ===
                  navigationItems.length -
                    1;

              return (
                <li
                  key={item.sectionId}
                  className={
                    isLastOddItem
                      ? "col-span-2"
                      : ""
                  }
                >
                  <a
                    href={`#${item.sectionId}`}
                    onClick={(event) => {
                      event.preventDefault();

                      scrollToSection(
                        item.sectionId,
                      );
                    }}
                    aria-current={
                      isActive
                        ? "page"
                        : undefined
                    }
                    className={`
                      relative flex h-12
                      items-center justify-between
                      overflow-hidden rounded-xl
                      border px-4
                      text-sm font-semibold
                      transition-all duration-300
                      ${
                        isActive
                          ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
                          : "border-white/[0.07] bg-white/[0.035] text-gray-400 hover:border-white/10 hover:bg-white/[0.06] hover:text-white"
                      }
                    `}
                  >
                    <span>
                      {item.name}
                    </span>

                    <span
                      className={
                        isActive
                          ? "text-[10px] font-black text-cyan-300"
                          : "text-[10px] font-black text-gray-700"
                      }
                    >
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    {isActive && (
                      <span className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-blue-500 via-cyan-300 to-transparent" />
                    )}
                  </a>
                </li>
              );
            },
          )}
        </ul>
      </div>
    </nav>
  );
}

