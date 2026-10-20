
"use client";

import Image from "next/image";
import { ActionButton } from "@/components/ui/ActionButton";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const LockBanner = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="lock-hero"
      className="theme-section relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* Glow effects */}
      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 28, 0],
                y: [0, -18, 0],
                scale: [1, 1.08, 1],
              }
        }
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-10 top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
      />

      <motion.div
        aria-hidden="true"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -34, 0],
                y: [0, 22, 0],
                scale: [1, 1.12, 1],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 right-20 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl"
      />

      {/* Content wrapper */}
      <div className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-7xl items-center px-4 py-12 min-[360px]:px-5 sm:px-10 sm:py-16 md:px-16 lg:px-24 2xl:max-w-[1440px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left content */}
          <motion.div
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : -52,
            }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.75,
              ease: "easeOut",
            }}
            className="flex flex-col justify-start text-left"
          >
            <span className="mb-6 w-fit rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-[10px] uppercase tracking-[2px] text-cyan-300 min-[360px]:px-5 min-[360px]:text-xs min-[360px]:tracking-[3px] sm:text-sm">
              Elite Frontend Developer
            </span>

            <h1 className="mb-6 text-left text-[clamp(2.1rem,11vw,3.75rem)] font-extrabold leading-[1.08] md:text-6xl 2xl:text-7xl">
              <span className="text-white">Crafting{" "}</span>

              <span className="text-cyan-300">Next-Level</span>

              <br />

              <span className="text-white">Digital{" "}</span>

              <span className="text-blue-400">Experiences</span>
            </h1>

            <p className="mb-10 text-left text-base leading-relaxed text-white/80 md:text-xl">
              <span className="font-semibold text-blue-300">
                Transforming creative concepts
              </span>{" "}
              into high-performance web solutions with
              precision, innovation, and modern frontend
              engineering.
            </p>

            {/* Buttons */}
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <ActionButton
                href="/home"
                size="lg"
                className="w-full min-[360px]:w-auto min-[360px]:px-8"
              >
                Go to Home
              </ActionButton>

              <ActionButton
                href="/resume"
                variant="outline"
                size="lg"
                rightIcon={<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
                className="group w-full min-[360px]:w-auto min-[360px]:px-8"
              >
                My Resume
              </ActionButton>
            </div>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : 52,
              scale: reduceMotion ? 1 : 0.96,
            }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              whileHover={
                reduceMotion ? undefined : { y: -9, scale: 1.015 }
              }
              transition={{
                type: "spring",
                stiffness: 210,
                damping: 18,
              }}
              className="relative w-full max-w-[520px]"
            >
              <div className="absolute -inset-6 rounded-3xl bg-blue-500/20 blur-3xl" />

              <Image
                src="/assets/images/LockBannerImage.png"
                alt="Tamim Hasan frontend developer"
                width={520}
                height={650}
                priority
                sizes="(max-width: 1024px) 100vw, 520px"
                className="relative h-auto w-full rounded-3xl object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LockBanner;
