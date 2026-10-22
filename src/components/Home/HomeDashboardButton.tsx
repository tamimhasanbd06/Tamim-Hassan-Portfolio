"use client";

import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ActionButton } from "@/components/ui/ActionButton";

/**
 * Fixed "Back to Dashboard" shortcut on the Home page (`/`).
 *
 * - Always fixed at `top: 20px`, `left: 10px`, above ordinary content.
 * - Rendered through a portal so no ancestor's transform / filter / overflow
 *   can turn the fixed positioning into absolute positioning.
 * - Matches the Back-to-Top button: ActionButton `primary` / `md` — same
 *   padding, typography, radius, shadow, hover lift and focus ring.
 * - Skips render until the admin session is confirmed, so it never flashes
 *   for public visitors.
 */
export default function HomeDashboardButton() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    setMounted(true);
    let alive = true;
    fetch("/api/auth/session", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        if (alive) setAuthorized(Boolean(data.authenticated));
      })
      .catch(() => {
        if (alive) setAuthorized(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const goToDashboard = () => {
    router.push("/dashboard/overview");
  };

  if (!mounted || !authorized) return null;

  return createPortal(
    <ActionButton
      type="button"
      onClick={goToDashboard}
      aria-label="Back to Dashboard"
      className="group fixed left-[10px] top-[20px] z-[250] max-w-[calc(100vw-20px)]"
      leftIcon={
        <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
      }
    >
      Back to Dashboard
    </ActionButton>,
    document.body,
  );
}
