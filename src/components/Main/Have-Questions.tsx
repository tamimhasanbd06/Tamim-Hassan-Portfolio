"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

import faqItems from "../../../public/Main/Have-Questions.json";

type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-black px-4 py-20 text-white sm:px-6 lg:px-8"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Main Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[var(--bg-card)] to-black" />

        {/* Blue Glow */}
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-600/10 blur-[140px]" />

        {/* Cyan Glow */}
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-[150px]" />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:55px_55px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Heading */}
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
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2">
            <FaQuestionCircle className="text-sm text-cyan-300" />

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300 sm:text-xs">
              Frequently Asked Questions
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            Have{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Questions?
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Here are some common questions about my skills,
            development work, technologies, and availability.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {(faqItems as FAQItem[]).map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.article
                key={`${item.question}-${index}`}
                initial={{
                  opacity: 0,
                  y: 20,
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
                  duration: 0.45,
                  delay: index * 0.05,
                }}
                className={`
                  group overflow-hidden rounded-2xl border
                  backdrop-blur-xl
                  transition-all duration-300
                  ${
                    isOpen
                      ? "border-cyan-400/25 bg-cyan-400/[0.05] shadow-[0_18px_55px_rgba(6,182,212,0.08)]"
                      : "border-white/10 bg-white/[0.035] hover:border-cyan-400/20 hover:bg-white/[0.05]"
                  }
                `}
              >
                {/* Question Button */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                >
                  {/* Question Content */}
                  <div className="flex min-w-0 items-center gap-4">
                    {/* Number */}
                    <span
                      className={`
                        flex h-9 w-9 shrink-0 items-center
                        justify-center rounded-xl border
                        text-xs font-black
                        transition-all duration-300
                        ${
                          isOpen
                            ? "border-cyan-400/25 bg-cyan-400/10 text-cyan-300"
                            : "border-white/10 bg-white/[0.04] text-gray-500 group-hover:text-cyan-300"
                        }
                      `}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Question */}
                    <h3
                      className={`
                        text-sm font-bold transition
                        sm:text-base
                        ${
                          isOpen
                            ? "text-cyan-200"
                            : "text-white"
                        }
                      `}
                    >
                      {item.question}
                    </h3>
                  </div>

                  {/* Arrow */}
                  <motion.span
                    animate={{
                      rotate: isOpen ? 180 : 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className={`
                      flex h-8 w-8 shrink-0 items-center
                      justify-center rounded-lg border
                      transition
                      ${
                        isOpen
                          ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                          : "border-white/10 bg-white/[0.03] text-gray-500"
                      }
                    `}
                  >
                    <FaChevronDown className="text-xs" />
                  </motion.span>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        height: {
                          duration: 0.35,
                        },
                        opacity: {
                          duration: 0.25,
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/[0.07] px-5 py-5 sm:px-6">
                        <p className="pl-[52px] text-sm leading-7 text-gray-400">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}


