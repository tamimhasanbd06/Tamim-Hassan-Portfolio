"use client";

import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";

import {
  FaArrowUp,
  FaCheck,
  FaCopy,
  FaEnvelope,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

import { BsTelegram } from "react-icons/bs";

type FooterItem = {
  id: number;
  label: string;
  value?: string;
  href: string;
  copyText?: string;
  icon: ReactNode;
  external?: boolean;
};

type FooterSection = {
  title: string;
  items: FooterItem[];
};

const PHONE_NUMBER = "+8801883650010";
const EMAIL_ADDRESS = "tamimhasanbd06@gmail.com";

const footerData: FooterSection[] = [
  {
    title: "Contact",
    items: [
      {
        id: 1,
        label: "Phone",
        value: "+880 1883-650010",
        href: `tel:${PHONE_NUMBER}`,
        copyText: PHONE_NUMBER,
        icon: <FaPhoneAlt />,
      },
      {
        id: 2,
        label: "Email",
        value: EMAIL_ADDRESS,
        href: `mailto:${EMAIL_ADDRESS}`,
        copyText: EMAIL_ADDRESS,
        icon: <FaEnvelope />,
      },
      {
        id: 3,
        label: "WhatsApp",
        value: "Send a message",
        href: `https://wa.me/8801883650010?text=${encodeURIComponent(
          "Hello Tamim Hassan, I would like to discuss a web development project with you.",
        )}`,
        copyText: PHONE_NUMBER,
        icon: <FaWhatsapp />,
        external: true,
      },
    ],
  },
  {
    title: "Social Profiles",
    items: [
      {
        id: 4,
        label: "LinkedIn",
        value: "Professional profile",
        href: "https://www.linkedin.com/in/tamim-hasan-th018836/",
        copyText:
          "https://www.linkedin.com/in/tamim-hasan-th018836/",
        icon: <FaLinkedinIn />,
        external: true,
      },
      {
        id: 5,
        label: "GitHub",
        value: "View my repositories",
        href: "https://github.com/tamimhasanbd06",
        copyText: "https://github.com/tamimhasanbd06",
        icon: <FaGithub />,
        external: true,
      },
      {
        id: 6,
        label: "Facebook",
        value: "Connect with me",
        href: "https://www.facebook.com/tamimhasanbd06",
        copyText:
          "https://www.facebook.com/tamimhasanbd06",
        icon: <FaFacebookF />,
        external: true,
      },
      {
        id: 7,
        label: "Telegram",
        value: "@tamimhasan",
        href: "https://t.me/tamimhasan",
        copyText: "https://t.me/tamimhasan",
        icon: <BsTelegram />,
        external: true,
      },
    ],
  },
  {
    title: "Quick Links",
    items: [
      {
        id: 8,
        label: "Home",
        href: "#home",
        icon: <span className="text-xs font-black">01</span>,
      },
      {
        id: 9,
        label: "About Me",
        href: "#about",
        icon: <span className="text-xs font-black">02</span>,
      },
      {
        id: 10,
        label: "Skills",
        href: "#skills",
        icon: <span className="text-xs font-black">03</span>,
      },
      {
        id: 11,
        label: "Projects",
        href: "#projects",
        icon: <span className="text-xs font-black">04</span>,
      },
      {
        id: 12,
        label: "Experience",
        href: "#experience",
        icon: <span className="text-xs font-black">05</span>,
      },
      {
        id: 13,
        label: "Education",
        href: "#education",
        icon: <span className="text-xs font-black">06</span>,
      },
      {
        id: 14,
        label: "Contact",
        href: "#contact",
        icon: <span className="text-xs font-black">07</span>,
      },
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [toast, setToast] = useState("");

  const showToast = (text: string) => {
    setToast(text);

    window.setTimeout(() => {
      setToast("");
    }, 2200);
  };

  const fallbackCopy = (text: string) => {
    const textarea = document.createElement("textarea");

    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  };

  const handleCopy = async (
    text: string,
    id: number,
  ) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        fallbackCopy(text);
      }

      setCopiedId(id);
      showToast("Copied successfully");

      window.setTimeout(() => {
        setCopiedId(null);
      }, 1800);
    } catch {
      showToast("Unable to copy automatically");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#020817] to-black" />

      <div className="absolute -left-40 top-[-160px] h-[480px] w-[480px] rounded-full bg-blue-600/15 blur-[160px]" />

      <div className="absolute -bottom-52 right-[-150px] h-[520px] w-[520px] rounded-full bg-cyan-400/10 blur-[170px]" />

      <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:55px_55px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20 lg:px-10">
        {/* Footer introduction */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
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
                Hassan
              </span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-gray-400">
              Web developer focused on building fast, modern, responsive,
              and meaningful digital experiences.
            </p>
          </div>

          <a
            href={`mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
              "Web development project inquiry",
            )}`}
            className="group flex shrink-0 items-center gap-3 rounded-full border border-cyan-400/25 bg-cyan-400/[0.07] px-6 py-3 text-sm font-bold text-cyan-200 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-cyan-400/[0.12]"
          >
            Start a Conversation
            <FaEnvelope className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        {/* Footer columns */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {footerData.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay: sectionIndex * 0.1,
              }}
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />

                <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
                  {section.title}
                </h3>

                <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/20 to-transparent" />
              </div>

              <div className="space-y-2.5">
                {section.items.map((item) => (
                  <div
                    key={item.id}
                    className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.035] p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/25 hover:bg-white/[0.06]"
                  >
                    <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 group-hover:w-full" />

                    <a
                      href={item.href}
                      target={
                        item.external ? "_blank" : undefined
                      }
                      rel={
                        item.external
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex min-w-0 flex-1 items-center gap-3"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm text-cyan-300 transition-all duration-300 group-hover:scale-105 group-hover:border-cyan-400/20 group-hover:bg-cyan-400/10">
                        {item.icon}
                      </span>

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
                    </a>

                    {item.copyText && (
                      <button
                        type="button"
                        onClick={() =>
                          void handleCopy(
                            item.copyText!,
                            item.id,
                          )
                        }
                        aria-label={`Copy ${item.label}`}
                        title={`Copy ${item.label}`}
                        className="ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-xs text-gray-600 transition hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
                      >
                        {copiedId === item.id ? (
                          <motion.span
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                          >
                            <FaCheck className="text-emerald-400" />
                          </motion.span>
                        ) : (
                          <FaCopy />
                        )}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom footer */}
        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-7 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-xs text-gray-500 sm:text-sm">
              © {currentYear} Tamim Hassan. All rights reserved.
            </p>

            <p className="mt-1 text-[11px] text-gray-700">
              Designed and developed with Next.js and TypeScript.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-gray-400 transition hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-300"
          >
            Back to Top

            <FaArrowUp className="transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>

      {/* Copy notification */}
      <div
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 z-[120] flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-cyan-400/20 bg-[#07111f]/95 px-5 py-3 text-xs font-semibold text-cyan-100 shadow-2xl backdrop-blur-xl transition-all duration-300 sm:text-sm ${
          toast
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-5 opacity-0"
        }`}
      >
        <FaCheck className="text-emerald-400" />
        {toast}
      </div>
    </footer>
  );
}
