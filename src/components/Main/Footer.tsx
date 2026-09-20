
"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";

import {
  FaArrowUp,
  FaCheck,
  FaCopy,
  FaEnvelope,
  FaFacebookF,
  FaFacebookMessenger,
  FaGithub,
  FaLinkedinIn,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

import {
  FaInstagram,
  FaTiktok,
  FaThreads,
  FaXTwitter,
} from "react-icons/fa6";

import { BsTelegram } from "react-icons/bs";

import footerData from "../../../public/Main/Footer.json";

type FooterIcon =
  | "phone"
  | "email"
  | "whatsapp"
  | "messenger"
  | "linkedin"
  | "facebook"
  | "telegram"
  | "tiktok"
  | "x"
  | "instagram"
  | "threads"
  | "github"
  | "vercel"
  | "netlify"
  | "01"
  | "02"
  | "03"
  | "04"
  | "05"
  | "06"
  | "07"
  | "08";

type FooterItem = {
  id: number;
  label: string;
  value?: string;
  href: string;
  copyText?: string;
  icon: FooterIcon;
  external?: boolean;
};

type FooterSection = {
  title: string;
  items: FooterItem[];
};

/*
 * JSON cannot contain JSX.
 * Therefore icons are stored as string keys
 * inside footer.json and converted to React icons here.
 */
const getFooterIcon = (icon: FooterIcon) => {
  switch (icon) {
    case "phone":
      return <FaPhoneAlt />;

    case "email":
      return <FaEnvelope />;

    case "whatsapp":
      return <FaWhatsapp />;

    case "messenger":
      return <FaFacebookMessenger />;

    case "linkedin":
      return <FaLinkedinIn />;

    case "facebook":
      return <FaFacebookF />;

    case "telegram":
      return <BsTelegram />;

    case "tiktok":
      return <FaTiktok />;

    case "x":
      return <FaXTwitter />;

    case "instagram":
      return <FaInstagram />;

    case "threads":
      return <FaThreads />;

    case "github":
      return <FaGithub />;

    case "vercel":
      return (
        <span className="text-sm font-black">
          ▲
        </span>
      );

    case "netlify":
      return (
        <span className="text-sm font-black">
          ◆
        </span>
      );

    /*
     * Quick Links
     */
    case "01":
    case "02":
    case "03":
    case "04":
    case "05":
    case "06":
    case "07":
    case "08":
      return (
        <span className="text-xs font-black">
          {icon}
        </span>
      );

    default:
      return null;
  }
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [copiedId, setCopiedId] =
    useState<number | null>(null);

  const [toast, setToast] = useState("");
  const [welcomeEmail, setWelcomeEmail] = useState("");
  const [welcomeConsent, setWelcomeConsent] = useState(false);
  const [welcomeStatus, setWelcomeStatus] = useState("");
  const [welcomeLoading, setWelcomeLoading] = useState(false);

  /*
   * =========================================================
   * TOAST
   * =========================================================
   */
  const showToast = (text: string) => {
    setToast(text);

    window.setTimeout(() => {
      setToast("");
    }, 2200);
  };

  /*
   * =========================================================
   * FALLBACK COPY
   * =========================================================
   */
  const fallbackCopy = (text: string) => {
    const textarea =
      document.createElement("textarea");

    textarea.value = text;

    textarea.style.position = "fixed";
    textarea.style.left = "-";
    textarea.style.top = "0";
    textarea.style.opacity = "0";

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();

    document.execCommand("copy");

    textarea.remove();
  };

  /*
   * =========================================================
   * COPY HANDLER
   * =========================================================
   */
  const handleCopy = async (
    text: string,
    id: number,
  ) => {
    try {
      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {
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
      showToast(
        "Unable to copy automatically",
      );
    }
  };

  /*
   * =========================================================
   * BACK TO TOP
   * =========================================================
   */
  const submitWelcomeEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWelcomeStatus("");
    if (!welcomeConsent) { setWelcomeStatus("Please confirm email consent first."); return; }
    setWelcomeLoading(true);
    try {
      const response = await fetch("/api/welcome", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: welcomeEmail, consent: true }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Could not send welcome email.");
      setWelcomeStatus(data.alreadySent ? "Welcome email was already sent to this address." : "Welcome email sent successfully.");
      setWelcomeEmail("");
      setWelcomeConsent(false);
    } catch (error) { setWelcomeStatus(error instanceof Error ? error.message : "Could not send welcome email."); }
    finally { setWelcomeLoading(false); }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
   * =========================================================
   * EMAIL
   * =========================================================
   */
  const emailItem = (
    footerData as FooterSection[]
  )
    .find(
      (section) =>
        section.title === "Contact",
    )
    ?.items.find(
      (item) =>
        item.label === "Email",
    );

  const emailAddress =
    emailItem?.value ??
    "tamimhasanbd06@gmail.com";

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black text-white">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="absolute inset-0 bg-gradient-to-br from-black via-[var(--bg-card)] to-black" />

      <div className="absolute -left-40 top-[-] h-[] w-[] rounded-full bg-blue-600/15 blur-[]" />

      <div className="absolute -bottom-52 right-[-] h-[] w-[] rounded-full bg-cyan-400/10 blur-[]" />

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

              <span className="text-[] font-bold uppercase tracking-[0.28em] text-emerald-300 sm:text-xs">
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
              Web developer focused on building
              fast, modern, responsive, and
              meaningful digital experiences.
            </p>
          </div>

          <a
            href={`mailto:${emailAddress}?subject=${encodeURIComponent(
              "Web development project inquiry",
            )}`}
            className="group flex shrink-0 items-center gap-3 rounded-full border border-cyan-400/25 bg-cyan-400/[0.07] px-6 py-3 text-sm font-bold text-cyan-200 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-cyan-400/[0.12]"
          >
            Start a Conversation

            <FaEnvelope className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        <form onSubmit={submitWelcomeEmail} className="mb-10 rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.04] p-5 sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h3 className="font-bold text-white">Get a welcome email</h3>
              <p className="mt-1 text-sm text-gray-400">Enter your email voluntarily. The site never reads your browser or Gmail account.</p>
              <input type="email" required value={welcomeEmail} onChange={(event)=>setWelcomeEmail(event.target.value)} placeholder="you@example.com" className="mt-4 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-cyan-400/50" />
              <label className="mt-3 flex items-start gap-2 text-xs leading-5 text-gray-400"><input type="checkbox" checked={welcomeConsent} onChange={(event)=>setWelcomeConsent(event.target.checked)} className="mt-1" />I explicitly consent to receiving one welcome email at this address.</label>
              {welcomeStatus && <p className="mt-3 text-xs text-cyan-200">{welcomeStatus}</p>}
            </div>
            <button disabled={welcomeLoading || !welcomeConsent} className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-bold text-white disabled:opacity-50">{welcomeLoading ? "Sending..." : "Send Welcome Email"}</button>
          </div>
        </form>

        {/* ===================================================
            FOOTER COLUMNS
        ==================================================== */}

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {(footerData as FooterSection[]).map(
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
                  delay:
                    sectionIndex * 0.1,
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
                  {section.items.map(
                    (item) => (
                      <div
                        key={item.id}
                        className="group relative flex items-center justify-between overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.035] p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/25 hover:bg-white/[0.06]"
                      >

                        {/* Hover Line */}

                        <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 group-hover:w-full" />

                        {/* Main Link */}

                        <a
                          href={item.href}
                          target={
                            item.external
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            item.external
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="flex min-w-0 flex-1 items-center gap-3"
                        >

                          {/* Icon */}

                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm text-cyan-300 transition-all duration-300 group-hover:scale-105 group-hover:border-cyan-400/20 group-hover:bg-cyan-400/10">
                            {getFooterIcon(
                              item.icon,
                            )}
                          </span>

                          {/* Text */}

                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-gray-300 transition group-hover:text-cyan-200">
                              {item.label}
                            </span>

                            {item.value && (
                              <span className="mt-0.5 block truncate text-[] text-gray-600 transition group-hover:text-gray-500">
                                {item.value}
                              </span>
                            )}
                          </span>
                        </a>

                        {/* Copy Button */}

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
                            {copiedId ===
                            item.id ? (
                              <motion.span
                                initial={{
                                  scale: 0.5,
                                }}
                                animate={{
                                  scale: 1,
                                }}
                              >
                                <FaCheck className="text-emerald-400" />
                              </motion.span>
                            ) : (
                              <FaCopy />
                            )}
                          </button>
                        )}
                      </div>
                    ),
                  )}
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

            <p className="mt-1 text-[] text-gray-700">
              Designed and developed with Next.js
              and TypeScript.
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

      {/* =====================================================
          COPY NOTIFICATION
      ====================================================== */}

      <div
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 z-[120] flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-cyan-400/20 bg-[var(--bg-card)]/95 px-5 py-3 text-xs font-semibold text-cyan-100 shadow-2xl backdrop-blur-xl transition-all duration-300 sm:text-sm ${
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




