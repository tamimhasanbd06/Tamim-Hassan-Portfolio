"use client";

import type { IconType } from "react-icons";
import { motion, useReducedMotion } from "framer-motion";

import {
  SiGoogle,
  SiGithub,
  SiVercel,
} from "react-icons/si";

import {
  FiCpu,
  FiTerminal,
  FiZap,
  FiStar,
  FiCode,
  FiCpu as FiOpenai,
} from "react-icons/fi";

import aiData from "../../../public/AI-Stack.json";

type AiItem = {
  name: string;
  icon: string;
};

const iconMap: Record<string, IconType> = {
  SiOpenai: FiOpenai,
  SiGoogle,
  SiGithub,
  SiVercel,
  FiCpu,
  FiTerminal,
  FiZap,
  FiStar,
  FiCode,
};

const aiTools = aiData as AiItem[];

function AiCard({ item }: { item: AiItem }) {
  const Icon = iconMap[item.icon] ?? FiCpu;
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -10,
              scale: 1.055,
              rotate: 0.6,
            }
      }
      whileTap={{ scale: 0.97 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
      }}
      className={`
        group
        flex
        min-w-[90px]
        max-w-[140px]
        flex-col
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-white/10
        bg-white/[0.035]
        px-3
        py-4
        backdrop-blur-md
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-cyan-400/40
        hover:bg-cyan-400/[0.06]
        min-[380px]:min-w-[105px]
        sm:min-w-[125px]
        sm:gap-3
        sm:rounded-2xl
        sm:px-4
        sm:py-5
        2xl:min-w-[140px]
      `}
    >
      <div
        className={`
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-lg
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
          sm:h-12
          sm:w-12
          sm:rounded-xl
        `}
      >
        <Icon className="text-[22px] sm:text-[27px]" />
      </div>

      <p
        className={`
          whitespace-nowrap
          text-center
          text-[11px]
          font-medium
          tracking-wide
          text-slate-300
          transition-colors
          duration-300
          group-hover:text-white
          min-[380px]:text-xs
          sm:text-sm
        `}
      >
        {item.name}
      </p>
    </motion.div>
  );
}

export default function AiTools() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="ai-tools"
      className={`
        relative
        w-full
        overflow-hidden
        bg-transparent
        py-12
        min-[380px]:py-14
        sm:py-20
        2xl:py-28
      `}
    >
      {/* Background glow adjusted for clean transparent scaling */}
      <div
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[200px]
          w-[300px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-500/5
          blur-[80px]
          sm:h-[300px]
          sm:w-[700px]
          sm:blur-[120px]
          2xl:h-[450px]
          2xl:w-[1000px]
        `}
      />

      <div className="relative z-10 mx-auto max-w-[2000px] px-2 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
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
            amount: 0.7,
          }}
          className="mb-8 px-2 text-center sm:mb-10 sm:px-6 lg:px-8"
        >
          <div
            className={`
              mb-2.5
              inline-flex
              items-center
              gap-1.5
              rounded-full
              border
              border-cyan-400/20
              bg-cyan-400/5
              px-3
              py-1
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.15em]
              text-cyan-300
              min-[380px]:text-xs
              min-[380px]:tracking-[0.2em]
              sm:mb-3
              sm:gap-2
              sm:px-4
              sm:py-1.5
            `}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            AI Stack
          </div>

          <h2
            className={`
              text-2xl
              font-bold
              tracking-tight
              text-white
              min-[380px]:text-3xl
              sm:text-4xl
              lg:text-5xl
              2xl:text-6xl
            `}
          >
            AI Models &amp;{" "}
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
              Assistants I Use
            </span>
          </h2>

          <p
            className={`
              mx-auto
              mt-3
              max-w-xl
              text-xs
              leading-6
              text-slate-400
              min-[380px]:text-sm
              sm:mt-4
              sm:max-w-2xl
              sm:text-base
              sm:leading-7
              2xl:max-w-3xl
              2xl:text-lg
            `}
          >
            The artificial intelligence tools, models, and coding assistants I
            leverage to accelerate development and boost productivity.
          </p>
        </motion.div>

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
              w-8
              bg-gradient-to-r
              from-transparent
              to-transparent
              min-[380px]:w-12
              sm:w-28
              2xl:w-40
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
              w-8
              bg-gradient-to-l
              from-transparent
              to-transparent
              min-[380px]:w-12
              sm:w-28
              2xl:w-40
            `}
          />

          <div className="ai-track flex w-max gap-3 px-1 min-[380px]:gap-4 sm:gap-5 sm:px-2">
            {/* First copy */}
            <div className="flex shrink-0 gap-3 min-[380px]:gap-4 sm:gap-5">
              {aiTools.map((item) => (
                <AiCard
                  key={`first-${item.name}`}
                  item={item}
                />
              ))}
            </div>

            {/* Duplicate copy for seamless animation */}
            <div
              aria-hidden="true"
              className="flex shrink-0 gap-3 min-[380px]:gap-4 sm:gap-5"
            >
              {aiTools.map((item) => (
                <AiCard
                  key={`second-${item.name}`}
                  item={item}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ai-track {
          animation: ai-marquee 32s linear infinite;
          will-change: transform;
        }

        .ai-track:hover {
          animation-play-state: paused;
        }

        @keyframes ai-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(calc(-50% - 6px));
          }
        }

        @media (min-width: 640px) {
          @keyframes ai-marquee {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(calc(-50% - 10px));
            }
          }
        }

        @media (max-width: 640px) {
          .ai-track {
            animation-duration: 20s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ai-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}