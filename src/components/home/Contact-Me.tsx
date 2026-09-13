"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import {
  FaCheck,
  FaCopy,
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaPhone,
  FaWhatsapp,
} from "react-icons/fa";

import { BsTelegram } from "react-icons/bs";

import contactData from "../../../public/data/contact.json";

type ContactCategory =
  | "Contact"
  | "Social Profiles"
  | "Web Development";

type ContactIcon =
  | "phone"
  | "whatsapp"
  | "email"
  | "linkedin"
  | "facebook"
  | "telegram"
  | "github"
  | "vercel"
  | "netlify";

type ContactItem = {
  id: number;
  category: ContactCategory;
  label: string;
  value: string;
  copyText: string;
  href: string;
  icon: ContactIcon;
  accent: string;
};

const getContactIcon = (icon: ContactIcon) => {
  switch (icon) {
    case "phone":
      return <FaPhone />;

    case "whatsapp":
      return <FaWhatsapp />;

    case "email":
      return <FaEnvelope />;

    case "linkedin":
      return <FaLinkedin />;

    case "facebook":
      return <FaFacebook />;

    case "telegram":
      return <BsTelegram />;

    case "github":
      return <FaGithub />;

    case "vercel":
      return (
        <span className="text-xs font-black">
          ▲
        </span>
      );

    case "netlify":
      return (
        <span className="text-xs font-black">
          ◆
        </span>
      );

    default:
      return null;
  }
};

export default function Contact() {
  const reduceMotion = useReducedMotion();

  const [copiedId, setCopiedId] =
    useState<number | null>(null);

  const [toast, setToast] = useState("");

  const showToast = (text: string) => {
    setToast(text);

    window.setTimeout(() => {
      setToast("");
    }, 2200);
  };

  const fallbackCopy = (text: string) => {
    const textarea =
      document.createElement("textarea");

    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "0";
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
      showToast("Unable to copy");
    }
  };

  /*
   * Always open external links in a separate tab.
   * The current portfolio tab will not navigate away.
   */
  const openInNewTab = (href: string) => {
    window.open(
      href,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const renderCards = (
    category: ContactCategory,
  ) => {
    const items = (
      contactData as ContactItem[]
    ).filter(
      (item) =>
        item.category === category,
    );

    return (
      <div className="w-full">
        {/* Category Header */}
        <div className="mb-4 flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.9)]" />

          <h2 className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.26em] text-cyan-300/80 sm:text-xs">
            {category}
          </h2>

          <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/25 to-transparent" />
        </div>

        {/* Contact Cards */}
        <div className="flex flex-col gap-2.5">
          {items.map((item, index) => (
            <motion.article
              key={item.id}
              role="link"
              tabIndex={0}
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 16,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -3,
                      scale: 1.008,
                    }
              }
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration:
                  reduceMotion ? 0 : 0.35,
                delay: index * 0.04,
              }}
              onClick={() =>
                openInNewTab(item.href)
              }
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  event.preventDefault();

                  openInNewTab(item.href);
                }
              }}
              className="
                group relative flex
                cursor-pointer
                items-center
                justify-between
                overflow-hidden
                rounded-xl
                border border-white/[0.08]
                bg-white/[0.035]
                px-3 py-2.5
                backdrop-blur-xl
                transition-all duration-300
                hover:border-cyan-400/30
                hover:bg-white/[0.06]
                hover:shadow-[0_10px_35px_rgba(6,182,212,0.08)]
                focus:outline-none
                focus:ring-2
                focus:ring-cyan-400/30
                active:scale-[0.99]
                sm:px-3.5
                sm:py-3
              "
            >
              {/* Bottom Gradient */}
              <div
                className={`
                  absolute
                  bottom-0
                  left-0
                  h-[1.5px]
                  w-0
                  bg-gradient-to-r
                  transition-all
                  duration-500
                  group-hover:w-full
                  ${item.accent}
                `}
              />

              {/* Glow */}
              <div className="absolute -left-10 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full bg-cyan-400/0 blur-3xl transition-all duration-500 group-hover:bg-cyan-400/[0.08]" />

              {/* Left Content */}
              <div className="relative flex min-w-0 items-center gap-2.5 sm:gap-3">
                {/* Icon */}
                <div
                  className="
                    relative flex
                    h-10 w-10
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-lg
                    border border-white/[0.08]
                    bg-white/[0.045]
                    text-base
                    text-cyan-300
                    transition-all
                    duration-300
                    group-hover:scale-105
                    group-hover:border-cyan-400/25
                    group-hover:text-white
                    sm:h-11
                    sm:w-11
                    sm:text-lg
                  "
                >
                  {/* Icon Background */}
                  <div
                    className={`
                      absolute inset-0
                      bg-gradient-to-br
                      opacity-0
                      transition-opacity
                      duration-300
                      group-hover:opacity-20
                      ${item.accent}
                    `}
                  />

                  <span className="relative drop-shadow-[0_0_7px_rgba(34,211,238,0.6)]">
                    {getContactIcon(item.icon)}
                  </span>
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <h3 className="text-[13px] font-bold leading-tight text-white transition-colors group-hover:text-cyan-200 sm:text-sm">
                    {item.label}
                  </h3>

                  <p className="mt-0.5 max-w-[180px] truncate text-[10px] leading-5 text-gray-500 transition-colors group-hover:text-gray-400 sm:max-w-[220px] sm:text-xs">
                    {item.value}
                  </p>
                </div>
              </div>

              {/* Right Actions */}
              <div className="relative ml-2 flex items-center gap-1.5 sm:gap-2">
                {/* Open Badge */}
                <span
                  className="
                    hidden
                    rounded-full
                    border border-white/[0.08]
                    bg-white/[0.03]
                    px-2.5
                    py-1
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-gray-500
                    transition-all
                    group-hover:border-cyan-400/20
                    group-hover:text-cyan-300
                    sm:block
                  "
                >
                  Open
                </span>

                {/* Copy Button */}
                <button
                  type="button"
                  aria-label={`Copy ${item.label}`}
                  title={`Copy ${item.label}`}
                  onClick={(event) => {
                    event.stopPropagation();

                    void handleCopy(
                      item.copyText,
                      item.id,
                    );
                  }}
                  className="
                    flex
                    h-8 w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border border-white/[0.08]
                    bg-white/[0.035]
                    text-[11px]
                    text-gray-500
                    transition-all
                    hover:border-cyan-400/30
                    hover:bg-cyan-400/[0.08]
                    hover:text-cyan-300
                    active:scale-90
                    sm:h-9
                    sm:w-9
                    sm:text-xs
                  "
                >
                  {copiedId === item.id ? (
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
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section
      id="contact"
      className="
        relative flex
        min-h-screen
        w-full
        items-center
        overflow-hidden
        bg-black
        px-4 py-16
        text-white
        sm:px-6
        sm:py-20
      "
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#020817] to-black" />

      {/* Blue Glow */}
      <div className="absolute -left-40 -top-24 h-[420px] w-[420px] rounded-full bg-blue-600/15 blur-[150px]" />

      {/* Cyan Glow */}
      <div className="absolute -bottom-52 -right-32 h-[500px] w-[500px] rounded-full bg-cyan-400/10 blur-[170px]" />

      {/* Center Glow */}
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[130px]" />

      {/* Grid */}
      <div
        className="
          absolute inset-0
          opacity-[0.022]
          [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)]
          [background-size:55px_55px]
        "
      />

      {/* Main Container */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Header */}
        <header className="mb-8 text-center sm:mb-11">
          {/* Status Badge */}
          <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.05] px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.28em] text-cyan-300 sm:text-[10px]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />

              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>

            Available for work
          </div>

          {/* Title */}
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            Contact{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Me
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-3 max-w-xl text-xs leading-6 text-gray-400 sm:text-sm sm:leading-7">
            Let&apos;s discuss your next
            project. Call me, send a
            WhatsApp message, write an
            email, or connect with me
            online.
          </p>
        </header>

        {/* Categories */}
        <div className="grid w-full grid-cols-1 gap-7 md:grid-cols-2 md:gap-7 lg:grid-cols-3 lg:gap-7">
          {renderCards("Contact")}

          {renderCards("Social Profiles")}

          {renderCards("Web Development")}
        </div>

        {/* Bottom Text */}
        <div className="mt-9 flex items-center justify-center gap-3 text-center">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-400/30" />

          <p className="text-[9px] font-semibold uppercase tracking-[0.32em] text-white/25 sm:text-[10px]">
            Open to meaningful opportunities
          </p>

          <div className="h-px w-10 bg-gradient-to-l from-transparent to-cyan-400/30" />
        </div>
      </div>

      {/* Toast */}
      <div
        aria-live="polite"
        className={`
          fixed
          bottom-5
          left-1/2
          z-[120]
          flex
          -translate-x-1/2
          items-center
          gap-2
          whitespace-nowrap
          rounded-full
          border border-cyan-400/20
          bg-[#07111f]/95
          px-4
          py-2.5
          text-[11px]
          font-semibold
          text-cyan-100
          shadow-[0_15px_50px_rgba(0,0,0,0.5)]
          backdrop-blur-xl
          transition-all
          duration-300
          sm:text-xs
          ${
            toast
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-5 opacity-0"
          }
        `}
      >
        <FaCheck className="text-emerald-400" />

        {toast}
      </div>
    </section>
  );
}
