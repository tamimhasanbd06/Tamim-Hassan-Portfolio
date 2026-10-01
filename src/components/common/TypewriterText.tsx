"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type TypewriterTextProps = {
  text: string;
  className?: string;
  delay?: number;
};

/** A deliberately restrained text reveal for prominent, short section labels. */
export default function TypewriterText({
  text,
  className,
  delay = 140,
}: TypewriterTextProps) {
  const reduceMotion = useReducedMotion();
  const [visibleText, setVisibleText] = useState(reduceMotion ? text : "");

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    let index = 0;
    const startTimer = window.setTimeout(() => {
      const timer = window.setInterval(() => {
        index += 1;
        setVisibleText(text.slice(0, index));
        if (index >= text.length) window.clearInterval(timer);
      }, 36);
    }, delay);

    return () => window.clearTimeout(startTimer);
  }, [delay, reduceMotion, text]);

  return <span className={className}>{reduceMotion ? text : visibleText}</span>;
}
