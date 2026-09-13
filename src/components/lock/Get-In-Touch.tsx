"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

import contactData from "../../../public/look/lockedcontact.json";

type ContactIcon =
  | "whatsapp"
  | "facebook"
  | "github"
  | "linkedin"
  | "email";

type ContactItem = {
  name: string;
  icon: ContactIcon;
  link: string;
  color: string;
  glow: string;
};

const getContactIcon = (icon: ContactIcon) => {
  switch (icon) {
    case "whatsapp":
      return <FaWhatsapp />;

    case "facebook":
      return <FaFacebook />;

    case "github":
      return <FaGithub />;

    case "linkedin":
      return <FaLinkedin />;

    case "email":
      return <FaEnvelope />;

    default:
      return null;
  }
};

const Lockedcontact = () => {
  const reduceMotion = useReducedMotion();

  const contacts = contactData as ContactItem[];

  return (
    <section
      id="lock-social"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#000814] px-4 py-16 sm:px-6 sm:py-16 lg:px-12"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#000814] to-black" />

      <div className="absolute top-10 left-5 h-40 w-40 animate-pulse rounded-full bg-blue-500/20 blur-3xl sm:top-20 sm:left-10 sm:h-72 sm:w-72" />

      <div className="absolute right-5 bottom-10 h-52 w-52 animate-pulse rounded-full bg-cyan-400/10 blur-3xl sm:right-20 sm:h-96 sm:w-96" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl">
        {/* Title */}
        <motion.h1
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="mb-10 text-center text-3xl font-extrabold text-white sm:mb-14 sm:text-5xl md:text-6xl"
        >
          Get In <span className="text-cyan-300">Touch</span>
        </motion.h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {contacts.map((item, index) => (
            <motion.a
              key={item.name}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${item.name}`}
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -10,
                      scale: 1.035,
                    }
              }
              whileTap={{
                scale: 0.97,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.48,
                delay: index * 0.06,
              }}
              className={`
                group relative flex h-32
                flex-col items-center justify-center
                rounded-2xl bg-white/5
                backdrop-blur-xl
                border border-white/10
                shadow-xl
                transition-all duration-300
                active:scale-95
                sm:h-40 sm:rounded-3xl
                sm:hover:scale-110
                md:h-44
                hover:border-cyan-400/40
                ${item.glow}
              `}
            >
              {/* Glow Layer */}
              <div className="absolute -inset-4 rounded-3xl bg-blue-500/10 opacity-0 blur-2xl transition group-hover:opacity-100 sm:-inset-6" />

              {/* Icon */}
              <div
                className={`
                  z-10 mb-2 text-3xl text-cyan-300
                  transition sm:mb-3 sm:text-4xl
                  ${item.color}
                `}
              >
                {getContactIcon(item.icon)}
              </div>

              {/* Name */}
              <p className="z-10 text-sm font-semibold tracking-wide text-white/80 sm:text-base">
                {item.name}
              </p>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <p className="mt-10 text-center text-xs text-white/40 sm:mt-16 sm:text-sm">
          Designed with modern neon UI theme ⚡
        </p>
      </div>
    </section>
  );
};

export default Lockedcontact;
