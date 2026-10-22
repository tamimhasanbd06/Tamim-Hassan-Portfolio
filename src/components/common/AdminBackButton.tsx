"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function AdminBackButton() {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [previousRoute, setPreviousRoute] = useState<string | null>(null);
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("tamim-admin-previous-route");
      const safe = stored?.startsWith("/") && !stored.startsWith("//") && stored !== pathname && stored !== "/login";
      setPreviousRoute(safe ? stored : null);
      if (pathname !== "/login") sessionStorage.setItem("tamim-admin-previous-route", pathname);
    } catch {
      setPreviousRoute(null);
    }
    let alive = true;
    fetch("/api/auth/session", { cache: "no-store" })
      .then(r => r.json()).then(data => { if (alive) setAuthorized(Boolean(data.authenticated)); })
      .catch(() => { if (alive) setAuthorized(false); });
    return () => { alive = false; };
  }, [pathname]);
  // The Home page ("/") uses its own floating HomeDashboardButton (fixed at
  // top:20px left:10px), so the shared in-flow button must stay hidden there
  // to avoid showing two "Back to Dashboard" buttons.
  if (!authorized || pathname === "/" || pathname === "/dashboard" || pathname === "/dashboard/overview" || pathname === "/login") return null;
  return <div className="admin-back-holder"><button type="button" className="ui-button-secondary admin-back-action" onClick={() => router.push(previousRoute ?? "/dashboard/overview")}><ArrowLeft size={18} /> {previousRoute ? "Back" : "Back to Dashboard"}</button></div>;
}
