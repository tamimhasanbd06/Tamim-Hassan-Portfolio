"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ActionButton from "../ui/ActionButton";

import {
  FaArrowUp,
  FaEnvelope,
  FaFacebookF,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";

import {
  FaFileLines,
  FaIdCard,
  FaRightToBracket,
} from "react-icons/fa6";

import homeFooterData from "../../../public/Main/Home Footer.json";

type HomeFooterIcon =
  | "whatsapp"
  | "github"
  | "facebook"
  | "resume"
  | "cv"
  | "login";

type HomeFooterItem = {
  id: number;
  label: string;
  value?: string;
  href: string;
  icon: HomeFooterIcon;
  external?: boolean;
};

type HomeFooterSection = {
  title: string;
  items: HomeFooterItem[];
};

/*
 * JSON cannot contain JSX.
 * Therefore icons are stored as string keys
 * inside "Home Footer.json" and converted to React icons here.
 */
const getHomeFooterIcon = (icon: HomeFooterIcon) => {
  switch (icon) {
    case "whatsapp":
      return <FaWhatsapp />;

    case "github":
      return <FaGithub />;

    case "facebook":
      return <FaFacebookF />;

    case "resume":
      return <FaFileLines />;

    case "cv":
      return <FaIdCard />;

    case "login":
      return <FaRightToBracket />;

    default:
      return null;
  }
};

export default function HomeFooter() {
  const currentYear = new Date().getFullYear();

  /*
   * =========================================================
   * BACK TO TOP
   * =========================================================
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
   * "Start a Conversation" points to the first contact entry
   * (WhatsApp) from the home footer content.
   */
  const contactSection = (homeFooterData as HomeFooterSection[]).find(
    (section) => section.title === "Contact",
  );
  const conversationHref =
    contactSection?.items[0]?.href ?? "/resume";
  const conversationExternal =
    contactSection?.items[0]?.external ?? false;

  return (
    <footer className="relative overflow-hidden border-t border-white/10 text-white">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:55px_55px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20 lg:px-10">

        {/* ===================================================
            FOOTER INTRO
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mb-12 flex flex-col items-center justify-between gap-6 border-b border-white/10 pb-10 text-center md:flex-row md:text-left"
        >
          <div>
            <div className="mb-3 flex items-center justify-center gap-2 md:justify-start">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-300 sm:text-xs">
                Available for opportunities
              </span>
            </div>

            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
              Tamim{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                Hasan
              </span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-gray-400">
              Frontend Web Developer focused on building
              modern, responsive, high-performance web
              experiences with Next.js and TypeScript.
            </p>
          </div>

          <a
            href={conversationHref}
            target={conversationExternal ? "_blank" : undefined}
            rel={conversationExternal ? "noopener noreferrer" : undefined}
            className="group flex shrink-0 items-center gap-3 rounded-full border border-cyan-400/25 bg-cyan-400/[0.07] px-6 py-3 text-sm font-bold text-cyan-200 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-cyan-400/[0.12]"
          >
            Start a Conversation

            <FaEnvelope className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        {/* ===================================================
            FOOTER COLUMNS
        ==================================================== */}

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {(homeFooterData as HomeFooterSection[]).map(
            (section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{
                  opacity: 0,
                  y: 35,
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
                  duration: 0.55,
                  delay: sectionIndex * 0.1,
                }}
              >

                {/* Section Header */}

                <div className="mb-5 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />

                  <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
                    {section.title}
                  </h3>

                  <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/20 to-transparent" />
                </div>

                {/* Section Items */}

                <div className="space-y-2.5">
                  {section.items.map((item) => {
                    const linkInner = (
                      <>
                        {/* Icon */}

                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm text-cyan-300 transition-all duration-300 group-hover:scale-105 group-hover:border-cyan-400/20 group-hover:bg-cyan-400/10">
                          {getHomeFooterIcon(item.icon)}
                        </span>

                        {/* Text */}

                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-gray-300 transition group-hover:text-cyan-200">
                            {item.label}
                          </span>

                          {item.value && (
                            <span className="mt-0.5 block truncate text-[11px] text-gray-600 transition group-hover:text-gray-500">
                              {item.value}
                            </span>
                          )}
                        </span>
                      </>
                    );

                    const linkClassName =
                      "flex min-w-0 flex-1 items-center gap-3";

                    return (
                      <div
                        key={item.id}
                        className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.035] p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/25 hover:bg-white/[0.06]"
                      >

                        {/* Hover Line */}

                        <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 group-hover:w-full" />

                        {/* Main Link */}

                        {item.external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkClassName}
                          >
                            {linkInner}
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            className={linkClassName}
                          >
                            {linkInner}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ),
          )}
        </div>

        {/* ===================================================
            BOTTOM FOOTER
        ==================================================== */}

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-7 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-xs text-gray-500 sm:text-sm">
              © {currentYear} Tamim Hasan. All
              rights reserved.
            </p>

            <p className="mt-1 text-[11px] text-gray-700">
              Designed and developed with Next.js
              and TypeScript.
            </p>
          </div>

          <ActionButton
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className=""
          >
            Back to Top
            <FaArrowUp className="transition-transform group-hover:-translate-y-1" />
          </ActionButton>
        </div>
      </div>
    </footer>
  );
}
