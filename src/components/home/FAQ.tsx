"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: "What services do you provide?",
    answer:
      "I build responsive and modern web applications using technologies like Next.js, React, TypeScript, JavaScript, Tailwind CSS, Node.js, Express.js, and MongoDB.",
  },
  {
    question: "Do you build responsive websites?",
    answer:
      "Yes. I build responsive websites that work properly across mobile, tablet, laptop, and desktop devices.",
  },
  {
    question: "Do you work with Next.js and React?",
    answer:
      "Yes. Next.js and React are two of the main technologies I use for building modern frontend applications.",
  },
  {
    question: "Can you integrate APIs into a website?",
    answer:
      "Yes. I can integrate REST APIs and connect frontend applications with backend services.",
  },
  {
    question: "Do you work with backend technologies?",
    answer:
      "Yes. I have experience working with Node.js, Express.js, MongoDB, and API-based backend development.",
  },
  {
    question: "Are you available for new opportunities?",
    answer:
      "Yes. I am open to meaningful development opportunities, collaborations, practical projects, and learning opportunities.",
  },
  {
    question: "Can you convert a design into a real website?",
    answer:
      "Yes. I can convert UI designs and project requirements into responsive and reusable web interfaces.",
  },
  {
    question: "How can I contact you?",
    answer:
      "You can contact me through the Contact section of this portfolio using phone, email, WhatsApp, LinkedIn, or other available social links.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] =
    useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex((current) =>
      current === index ? null : index,
    );
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-black px-4 py-20 text-white sm:px-6 lg:px-8"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#020817] to-black" />

        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-[150px]" />

        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:55px_55px]" />
      </div>

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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2">
            <FaQuestionCircle className="text-sm text-cyan-300" />

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300 sm:text-xs">
              Frequently Asked Questions
            </span>
          </div>

          <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            Have{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Questions?
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            Here are some common questions about my
            skills, development work, technologies,
            and availability.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.article
                key={item.question}
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
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <div className="flex items-center gap-4">
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

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
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

