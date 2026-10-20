"use client";

import { useEffect, useRef } from "react";

type LiveChannel = "posts" | "messages";

/** Subscribe to database-backed invalidation events and refresh after tab/network resume. */
export function useLiveUpdates(channel: LiveChannel, refresh: () => void) {
  const refreshRef = useRef(refresh);
  useEffect(() => { refreshRef.current = refresh; }, [refresh]);
  useEffect(() => {
    let source: EventSource | null = null;
    let closed = false;
    const connect = () => {
      if (closed || typeof EventSource === "undefined") return;
      source?.close();
      source = new EventSource(`/api/events?channel=${channel}`);
      source.addEventListener("ready", () => refreshRef.current());
      source.addEventListener("change", () => refreshRef.current());
      source.onerror = () => {
        // EventSource retries automatically; normal API polling remains a fallback.
      };
    };
    const resume = () => {
      if (document.visibilityState === "visible") refreshRef.current();
    };
    connect();
    document.addEventListener("visibilitychange", resume);
    window.addEventListener("online", resume);
    return () => {
      closed = true;
      source?.close();
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("online", resume);
    };
  }, [channel]);
}
