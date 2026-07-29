import type { ReactNode } from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

type ContactItem = {
  name: string;
  icon: ReactNode;
  link: string;
  color: string;
  glow: string;
};

const contacts: ContactItem[] = [
  {
    name: "Facebook",
    icon: <FaFacebook />,
    link: "https://www.facebook.com/tamimhasanbd06",
    color: "hover:text-blue-400",
    glow: "hover:shadow-blue-500/40",
  },
  {
    name: "GitHub",
    icon: <FaGithub />,
    link: "https://github.com/tamimhasanbd06",
    color: "hover:text-white",
    glow: "hover:shadow-white/20",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin />,
    link: "https://www.linkedin.com/in/tamim-hasan-th018836/",
    color: "hover:text-cyan-300",
    glow: "hover:shadow-cyan-400/40",
  },
  {
    name: "Email",
    icon: <FaEnvelope />,
    link: "mailto:tamimhasanbd06@gmail.com",
    color: "hover:text-pink-300",
    glow: "hover:shadow-pink-500/30",
  },
];

const Lockedcontact = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-[#000814] overflow-hidden px-4 sm:px-6 lg:px-12 py-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#000814] to-black" />

      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-40 sm:w-72 h-40 sm:h-72 bg-blue-500/20 blur-3xl rounded-full animate-pulse" />

      <div className="absolute bottom-10 right-5 sm:right-20 w-52 sm:w-96 h-52 sm:h-96 bg-cyan-400/10 blur-3xl rounded-full animate-pulse" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl">
        {/* Title */}
        <h1 className="text-center text-white font-extrabold mb-10 sm:mb-14 text-3xl sm:text-5xl md:text-6xl">
          Get In <span className="text-cyan-300">Touch</span>
        </h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
          {contacts.map((item) => (
            <a
              key={item.name}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${item.name}`}
              className={`
                group relative flex flex-col items-center justify-center
                h-32 sm:h-40 md:h-44
                rounded-2xl sm:rounded-3xl
                bg-white/5 backdrop-blur-xl
                border border-white/10
                shadow-xl
                transition-all duration-300
                active:scale-95 sm:hover:scale-110
                hover:border-cyan-400/40
                ${item.glow}
              `}
            >
              {/* Glow Layer */}
              <div className="absolute -inset-4 sm:-inset-6 bg-blue-500/10 blur-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition" />

              {/* Icon */}
              <div
                className={`text-3xl sm:text-4xl mb-2 sm:mb-3 text-cyan-300 transition ${item.color}`}
              >
                {item.icon}
              </div>

              {/* Name */}
              <p className="text-white/80 font-semibold text-sm sm:text-base tracking-wide">
                {item.name}
              </p>
            </a>
          ))}
        </div>

        {/* Footer */}
        <p className="text-center text-white/40 mt-10 sm:mt-16 text-xs sm:text-sm">
          Designed with modern neon UI theme ⚡
        </p>
      </div>
    </section>
  );
};

export default Lockedcontact;
