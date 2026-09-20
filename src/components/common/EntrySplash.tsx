"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const SPLASH_DURATION_MS = 5800;
const SESSION_KEY = "tamim-portfolio-intro-seen";

export default function EntrySplash() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let hasSeenIntro = false;

    try {
      hasSeenIntro = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Storage can be unavailable in strict privacy modes. In that case,
      // show the intro normally for this visit.
    }

    if (hasSeenIntro) return;

    setVisible(true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      document.body.style.overflow = previousOverflow;
      setVisible(false);

      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // The intro still works even when sessionStorage is unavailable.
      }
    }, SPLASH_DURATION_MS);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);


  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="entry-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.15 : 0.7, ease: "easeInOut" }}
          className="entry-splash"
          role="status"
          aria-live="polite"
          aria-label="Welcome to Tamim Hasan portfolio"
        >
          <div className="entry-splash__ambient" aria-hidden="true" />
          <div className="entry-splash__grid" aria-hidden="true" />

          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="entry-splash__content"
          >
            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.15, ease: "easeOut" }}
              className="entry-splash__logo-wrap"
            >
              <div className="entry-splash__orbit" aria-hidden="true" />
              <div className="entry-splash__logo">
                <Image
                  src="/assets/brand/tamim-hassan-logo.png"
                  alt="Tamim Hasan portfolio logo"
                  fill
                  priority
                  sizes="112px"
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.p
              initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="entry-splash__greeting"
            >
              Assalamu Alaikum
            </motion.p>

            <motion.h1
              initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 1.05 }}
              className="entry-splash__title"
            >
              Welcome to <span>Tamim Hasan&apos;s Portfolio</span>
            </motion.h1>

            <motion.p
              initial={reduceMotion ? undefined : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.55 }}
              className="entry-splash__message"
            >
              Thank you for stopping by. Explore my work, skills, and development journey.
            </motion.p>

            <motion.div
              initial={reduceMotion ? undefined : { opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: reduceMotion ? 0.1 : 3.5, delay: 1.8, ease: "easeInOut" }}
              className="entry-splash__progress"
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
