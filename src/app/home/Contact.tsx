"use client";

import {
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "framer-motion";

import {
  FaCheck,
  FaCopy,
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
  FaPhone,
  FaTimes,
  FaWhatsapp,
} from "react-icons/fa";

import { BsTelegram } from "react-icons/bs";

const PHONE_NUMBER = "+8801883650010";
const WHATSAPP_NUMBER = "8801883650010";
const EMAIL_ADDRESS = "tamimhasanbd06@gmail.com";

type ContactCategory = "Contact" | "Social";
type ContactAction = "phone" | "whatsapp" | "email" | "link" | "copy";

type ContactItem = {
  id: number;
  category: ContactCategory;
  label: string;
  value: string;
  copyText: string;
  href?: string;
  icon: ReactNode;
  action: ContactAction;
  accent: string;
};

const contactData: ContactItem[] = [
  {
    id: 1,
    category: "Contact",
    label: "Phone",
    value: "+880 1883-650010",
    copyText: PHONE_NUMBER,
    href: `tel:${PHONE_NUMBER}`,
    icon: <FaPhone />,
    action: "phone",
    accent: "from-blue-500 to-cyan-400",
  },
  {
    id: 2,
    category: "Contact",
    label: "WhatsApp",
    value: "+880 1883-650010",
    copyText: PHONE_NUMBER,
    icon: <FaWhatsapp />,
    action: "whatsapp",
    accent: "from-emerald-500 to-green-400",
  },
  {
    id: 3,
    category: "Contact",
    label: "Email",
    value: EMAIL_ADDRESS,
    copyText: EMAIL_ADDRESS,
    icon: <FaEnvelope />,
    action: "email",
    accent: "from-purple-500 to-pink-400",
  },
  {
    id: 4,
    category: "Social",
    label: "LinkedIn",
    value: "Professional Profile",
    copyText: "https://www.linkedin.com/in/tamim-hasan-th018836/",
    href: "https://www.linkedin.com/in/tamim-hasan-th018836/",
    icon: <FaLinkedin />,
    action: "link",
    accent: "from-blue-600 to-cyan-400",
  },
  {
    id: 5,
    category: "Social",
    label: "Facebook",
    value: "Tamim Hasan",
    copyText: "https://www.facebook.com/tamimhasanbd06",
    href: "https://www.facebook.com/tamimhasanbd06",
    icon: <FaFacebook />,
    action: "link",
    accent: "from-blue-500 to-indigo-400",
  },
  {
    id: 6,
    category: "Social",
    label: "GitHub",
    value: "tamimhasanbd06",
    copyText: "https://github.com/tamimhasanbd06",
    href: "https://github.com/tamimhasanbd06",
    icon: <FaGithub />,
    action: "link",
    accent: "from-slate-500 to-cyan-400",
  },
  {
    id: 7,
    category: "Social",
    label: "Telegram",
    value: "@tamimhasan",
    copyText: "https://t.me/tamimhasan",
    href: "https://t.me/tamimhasan",
    icon: <BsTelegram />,
    action: "link",
    accent: "from-sky-500 to-cyan-300",
  },
];

const initialMessage =
  "Hello Tamim Hasan, I would like to discuss a web development project with you.";

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState<ContactItem | null>(null);
  const [subject, setSubject] = useState(
    "Web development project inquiry",
  );
  const [message, setMessage] = useState(initialMessage);

  useEffect(() => {
    if (!modal) return;

    const previousOverflow = document.body.style.overflow;

    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModal(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeWithEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeWithEscape);
    };
  }, [modal]);

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
    event?: MouseEvent<HTMLButtonElement>,
  ) => {
    event?.stopPropagation();

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

  const openExternalLink = (href: string) => {
    const newWindow = window.open(
      href,
      "_blank",
      "noopener,noreferrer",
    );

    if (!newWindow) {
      window.location.assign(href);
    }
  };

  const handleItemClick = (item: ContactItem) => {
    if (item.action === "phone" && item.href) {
      window.location.assign(item.href);
      return;
    }

    if (
      item.action === "whatsapp" ||
      item.action === "email"
    ) {
      setModal(item);
      return;
    }

    if (item.action === "link" && item.href) {
      openExternalLink(item.href);
      return;
    }

    if (item.action === "copy") {
      void handleCopy(item.copyText, item.id);
    }
  };

  const handleSend = () => {
    const cleanMessage = message.trim();

    if (!cleanMessage) {
      showToast("Please write your message");
      return;
    }

    if (modal?.action === "whatsapp") {
      const whatsappUrl =
        `https://wa.me/${WHATSAPP_NUMBER}` +
        `?text=${encodeURIComponent(cleanMessage)}`;

      openExternalLink(whatsappUrl);
      setModal(null);
      showToast("Opening WhatsApp...");
      return;
    }

    if (modal?.action === "email") {
      const emailSubject =
        subject.trim() || "Portfolio inquiry";

      const emailUrl =
        `mailto:${EMAIL_ADDRESS}` +
        `?subject=${encodeURIComponent(emailSubject)}` +
        `&body=${encodeURIComponent(cleanMessage)}`;

      setModal(null);
      showToast("Opening your email app...");
      window.location.assign(emailUrl);
    }
  };

  const closeModal = () => {
    setModal(null);
    setMessage(initialMessage);
    setSubject("Web development project inquiry");
  };

  const renderCards = (category: ContactCategory) => {
    const categoryItems = contactData.filter(
      (item) => item.category === category,
    );

    return (
      <div className="w-full">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.9)]" />

          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300/80 sm:text-sm">
            {category}
          </h2>

          <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/25 to-transparent" />
        </div>

        <div className="flex flex-col gap-3">
          {categoryItems.map((item, index) => (
            <motion.article
              key={item.id}
              onClick={() => handleItemClick(item)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleItemClick(item);
                }
              }}
              role="button"
              tabIndex={0}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={reduceMotion ? undefined : { y: -6, scale: 1.012 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: reduceMotion ? 0 : 0.42, delay: index * 0.05 }}
              className="group relative flex cursor-pointer items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-3.5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/35 hover:bg-white/[0.075] hover:shadow-[0_16px_50px_rgba(6,182,212,0.08)] focus:outline-none focus:ring-2 focus:ring-cyan-400/40 active:scale-[0.985] sm:p-4"
            >
              <div
                className={`absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r transition-all duration-500 group-hover:w-full ${item.accent}`}
              />

              <div className="absolute -left-16 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-cyan-400/0 blur-3xl transition group-hover:bg-cyan-400/10" />

              <div className="relative flex min-w-0 items-center gap-3 sm:gap-4">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] text-xl text-cyan-300 shadow-inner transition-all duration-300 group-hover:scale-105 group-hover:border-cyan-400/25 group-hover:text-white sm:h-14 sm:w-14 sm:text-2xl">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-20 ${item.accent}`}
                  />

                  <span className="relative drop-shadow-[0_0_9px_rgba(34,211,238,0.65)]">
                    {item.icon}
                  </span>
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white transition group-hover:text-cyan-200 sm:text-base">
                    {item.label}
                  </h3>

                  <p className="mt-1 truncate text-xs text-gray-500 transition group-hover:text-gray-400 sm:text-sm">
                    {item.value}
                  </p>
                </div>
              </div>

              <div className="relative ml-3 flex items-center gap-2">
                <span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-500 transition group-hover:border-cyan-400/20 group-hover:text-cyan-300 sm:block">
                  {item.action === "phone"
                    ? "Call"
                    : item.action === "whatsapp" ||
                        item.action === "email"
                      ? "Message"
                      : item.action === "copy"
                        ? "Copy ID"
                        : "Open"}
                </span>

                <button
                  type="button"
                  onClick={(event) =>
                    void handleCopy(
                      item.copyText,
                      item.id,
                      event,
                    )
                  }
                  aria-label={`Copy ${item.label}`}
                  title={`Copy ${item.label}`}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-sm text-gray-500 transition-all hover:border-cyan-400/35 hover:bg-cyan-400/10 hover:text-cyan-300 active:scale-90 sm:h-11 sm:w-11"
                >
                  {copiedId === item.id ? (
                    <FaCheck className="text-emerald-400" />
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
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-black px-4 py-20 text-white sm:px-6 sm:py-24"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#020817] to-black" />

      <div className="absolute -left-40 top-[-100px] h-[480px] w-[480px] rounded-full bg-blue-600/15 blur-[150px]" />

      <div className="absolute -bottom-52 right-[-120px] h-[560px] w-[560px] rounded-full bg-cyan-400/10 blur-[170px]" />

      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[130px]" />

      <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:55px_55px]" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Heading */}
        <header className="mb-10 text-center sm:mb-14">
          <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-300 sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>

            Available for work
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
            Contact{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Me
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
            Let&apos;s discuss your next project. Call me, send a
            WhatsApp message, write an email, or connect with me
            online.
          </p>
        </header>

        {/* Original two-column layout */}
        <div className="grid w-full grid-cols-1 gap-9 md:grid-cols-2 md:gap-8 lg:gap-12">
          {renderCards("Contact")}
          {renderCards("Social")}
        </div>

        <div className="mt-12 flex items-center justify-center gap-4 text-center">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400/30" />

          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/30 sm:text-xs">
            Open to meaningful opportunities
          </p>

          <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400/30" />
        </div>
      </div>

      {/* Message modal */}
      {modal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 backdrop-blur-md"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#070d18] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.75)] sm:p-7"
          >
            <div
              className={`absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r ${modal.accent}`}
            />

            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-cyan-400/10 blur-[80px]" />

            <div className="relative flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-xl text-cyan-300">
                  {modal.icon}
                </div>

                <div>
                  <h3
                    id="contact-modal-title"
                    className="text-lg font-bold text-white"
                  >
                    Send via {modal.label}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    To: {modal.value}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-500 transition hover:bg-white/10 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>

            {modal.action === "email" && (
              <div className="relative mt-6">
                <label
                  htmlFor="email-subject"
                  className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400"
                >
                  Subject
                </label>

                <input
                  id="email-subject"
                  value={subject}
                  onChange={(event) =>
                    setSubject(event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/5"
                  placeholder="Email subject"
                />
              </div>
            )}

            <div className="relative mt-5">
              <label
                htmlFor="contact-message"
                className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400"
              >
                Your message
              </label>

              <textarea
                id="contact-message"
                value={message}
                onChange={(event) =>
                  setMessage(event.target.value)
                }
                rows={5}
                className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/5"
                placeholder="Write your message..."
              />
            </div>

            <div className="relative mt-6 flex gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] py-3 text-sm font-semibold text-gray-400 transition hover:bg-white/[0.08] hover:text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSend}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 ${modal.accent}`}
              >
                <FaPaperPlane />

                {modal.action === "whatsapp"
                  ? "Open WhatsApp"
                  : "Open Email"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      <div
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 z-[120] flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-cyan-400/20 bg-[#07111f]/95 px-5 py-3 text-xs font-semibold text-cyan-100 shadow-[0_15px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 sm:text-sm ${
          toast
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-5 opacity-0"
        }`}
      >
        <FaCheck className="text-emerald-400" />
        {toast}
      </div>
    </section>
  );
}
