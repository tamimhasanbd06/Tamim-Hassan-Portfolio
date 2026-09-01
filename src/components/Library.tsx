"use client";

import type { IconType } from "react-icons";

import {
  SiMui,
  SiFramer,
  SiTailwindcss,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiRedux,
  SiBootstrap,
} from "react-icons/si";

import {
  FiBox,
  FiShield,
  FiGrid,
  FiZap,
} from "react-icons/fi";
import libraryData from "../../public/library/library-data.json";

type LibraryItem = {
  name: string;
  icon: string;
};

const iconMap: Record<string, IconType> = {
  SiMui,
  SiFramer,
  SiTailwindcss,
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiRedux,
  SiBootstrap,
  FiBox,
  FiShield,
  FiGrid,
  FiZap,
};

const libraries = libraryData as LibraryItem[];

function LibraryCard({ item }: { item: LibraryItem }) {
  const Icon = iconMap[item.icon] ?? FiBox;

  return (
    <div
      className={`
        group
        flex
        min-w-[110px]
        flex-col
        items-center
        justify-center
        gap-3
        rounded-2xl
        border
        border-white/10
        bg-white/[0.035]
        px-4
        py-5
        backdrop-blur-md
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-cyan-400/40
        hover:bg-cyan-400/[0.06]
        sm:min-w-[125px]
      `}
    >
      <div
        className={`
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-xl
          border
          border-cyan-400/10
          bg-cyan-400/[0.06]
          text-cyan-300
          transition-all
          duration-300
          group-hover:scale-110
          group-hover:border-cyan-400/30
          group-hover:bg-cyan-400/10
          group-hover:text-cyan-200
        `}
      >
        <Icon className="text-[27px]" />
      </div>

      <p
        className={`
          whitespace-nowrap
          text-center
          text-xs
          font-medium
          tracking-wide
          text-slate-300
          transition-colors
          duration-300
          group-hover:text-white
          sm:text-sm
        `}
      >
        {item.name}
      </p>
    </div>
  );
}

export default function Library() {
  return (
    <section
      id="libraries"
      className={`
        relative
        w-full
        overflow-hidden
        bg-[#020814]
        py-16
        sm:py-20
      `}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[300px]
          w-[700px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-500/5
          blur-[120px]
        `}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10 px-4 text-center sm:px-6 lg:px-8">
          <div
            className={`
              mb-3
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-cyan-400/20
              bg-cyan-400/5
              px-4
              py-1.5
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-cyan-300
            `}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            My Toolkit
          </div>

          <h2
            className={`
              text-3xl
              font-bold
              tracking-tight
              text-white
              sm:text-4xl
              lg:text-5xl
            `}
          >
            Libraries I{" "}
            <span
              className={`
                bg-gradient-to-r
                from-cyan-300
                via-sky-400
                to-blue-500
                bg-clip-text
                text-transparent
              `}
            >
              Work With
            </span>
          </h2>

          <p
            className={`
              mx-auto
              mt-4
              max-w-2xl
              text-sm
              leading-7
              text-slate-400
              sm:text-base
            `}
          >
            Some of the libraries, frameworks and tools I regularly use to
            build modern, scalable and interactive web applications.
          </p>
        </div>

        {/* Slider */}
        <div className="relative w-full overflow-hidden">
          {/* Left gradient */}
          <div
            aria-hidden="true"
            className={`
              pointer-events-none
              absolute
              left-0
              top-0
              z-20
              h-full
              w-16
              bg-gradient-to-r
              from-[#020814]
              to-transparent
              sm:w-28
            `}
          />

          {/* Right gradient */}
          <div
            aria-hidden="true"
            className={`
              pointer-events-none
              absolute
              right-0
              top-0
              z-20
              h-full
              w-16
              bg-gradient-to-l
              from-[#020814]
              to-transparent
              sm:w-28
            `}
          />

          <div className="library-track flex w-max gap-5 px-2">
            {/* First copy */}
            <div className="flex shrink-0 gap-5">
              {libraries.map((item) => (
                <LibraryCard
                  key={`first-${item.name}`}
                  item={item}
                />
              ))}
            </div>

            {/* Duplicate copy for seamless animation */}
            <div
              aria-hidden="true"
              className="flex shrink-0 gap-5"
            >
              {libraries.map((item) => (
                <LibraryCard
                  key={`second-${item.name}`}
                  item={item}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .library-track {
          animation: library-marquee 32s linear infinite;
          will-change: transform;
        }

        .library-track:hover {
          animation-play-state: paused;
        }

        @keyframes library-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(calc(-50% - 10px));
          }
        }

        @media (max-width: 640px) {
          .library-track {
            animation-duration: 24s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .library-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}