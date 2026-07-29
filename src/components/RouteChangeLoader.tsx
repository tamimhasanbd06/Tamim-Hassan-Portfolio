"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import MainLoader from "./MainLoader";

const MINIMUM_VISIBLE_TIME = 420;

export default function RouteChangeLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const startedAt = useRef(0);

  useEffect(() => {
    const handleInternalNavigation = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");

      if (
        !anchor ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      const href = anchor.getAttribute("href");

      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      const destination = new URL(anchor.href, window.location.href);

      if (
        destination.origin !== window.location.origin ||
        (destination.pathname === window.location.pathname &&
          destination.search === window.location.search)
      ) {
        return;
      }

      startedAt.current = Date.now();
      setLoading(true);
    };

    const handleHistoryNavigation = () => {
      startedAt.current = Date.now();
      setLoading(true);
    };

    document.addEventListener(
      "click",
      handleInternalNavigation,
      true,
    );
    window.addEventListener(
      "popstate",
      handleHistoryNavigation,
    );

    return () => {
      document.removeEventListener(
        "click",
        handleInternalNavigation,
        true,
      );
      window.removeEventListener(
        "popstate",
        handleHistoryNavigation,
      );
    };
  }, []);

  useEffect(() => {
    if (!loading) return;

    const elapsed = Date.now() - startedAt.current;
    const remaining = Math.max(
      MINIMUM_VISIBLE_TIME - elapsed,
      120,
    );

    const timer = window.setTimeout(() => {
      setLoading(false);
    }, remaining);

    return () => window.clearTimeout(timer);
  }, [pathname, loading]);

  return loading ? <MainLoader /> : null;
}
