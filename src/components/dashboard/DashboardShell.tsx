
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  RefreshCw,
  ScrollText,
  Send,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";

type NavigationItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const dashboardItems: NavigationItem[] = [
  {
    href: "/dashboard/overview",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/posts",
    label: "Posts",
    icon: ScrollText,
  },
  {
    href: "/dashboard/messages",
    label: "My Messages",
    icon: Mail,
  },
];

const portfolioItems: NavigationItem[] = [
  {
    href: "/message",
    label: "Message Me",
    icon: MessageCircle,
  },
  {
    href: "/my-post",
    label: "My Posts",
    icon: Send,
  },
  {
    href: "/resume",
    label: "Resume",
    icon: FileText,
  },
  {
    href: "/cv",
    label: "CV",
    icon: FileText,
  },
];

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  /**
   * Add admin context to portfolio pages.
   */
  const getAdminHref = (href: string) => {
    return `${href}?from=admin`;
  };

  /**
   * Check whether a navigation item is active.
   */
  const isActive = (href: string) => {
    if (href === "/dashboard/overview") {
      return pathname === "/dashboard/overview";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  /**
   * Logout admin.
   */
  async function logout() {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Logout failed. Please try again.");
      }

      setOpen(false);

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Dashboard logout failed:", error);

      setLoggingOut(false);
    }
  }

  /**
   * Perform a real browser reload.
   */
  function refresh() {
    if (refreshing) return;

    setRefreshing(true);
    window.location.reload();
  }

  /**
   * Sidebar navigation item.
   */
  const renderNavItem = (
    item: NavigationItem,
    adminContext = false
  ) => {
    const Icon = item.icon;
    const active = isActive(item.href);

    const href = adminContext
      ? getAdminHref(item.href)
      : item.href;

    return (
      <Link
        key={item.href}
        href={href}
        onClick={() => setOpen(false)}
        aria-current={active ? "page" : undefined}
        className={
          active
            ? "ui-button-primary w-full justify-start shadow-[0_8px_30px_rgba(6,182,212,0.18)]"
            : "dash-nav w-full"
        }
      >
        <Icon size={18} />
        <span>{item.label}</span>
      </Link>
    );
  };

  /**
   * Sidebar.
   * No close button is rendered inside the sidebar.
   */
  const renderSidebar = () => (
    <aside
      className="
        flex h-full w-72 flex-col
        overflow-y-auto
        border-r border-white/10
        bg-[#04101d]/95
        p-4
        backdrop-blur-xl
      "
      aria-label="Dashboard navigation"
    >
      {/* Header */}

      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">
          Portfolio Admin
        </p>

        <h2 className="mt-1 text-lg font-bold text-white">
          Dashboard
        </h2>
      </div>

      {/* Quick Access */}

      <div className="mb-6">
        <p className="mb-2 px-2 text-[9px] font-bold uppercase tracking-[0.25em] text-white/30">
          Quick Access
        </p>

        <div className="grid gap-2">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="dash-nav w-full"
          >
            <Home size={18} />
            <span>Back to Main</span>
          </Link>

          <Link
            href="/home"
            onClick={() => setOpen(false)}
            className="dash-nav w-full"
          >
            <Home size={18} />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Dashboard Navigation */}

      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2 px-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/30">
            Dashboard
          </p>
        </div>

        <nav
          className="grid gap-2"
          aria-label="Dashboard pages"
        >
          {dashboardItems.map((item) => (
            <div key={item.href}>
              {renderNavItem(item)}
            </div>
          ))}
        </nav>
      </div>

      {/* Portfolio Navigation */}

      <div>
        <div className="mb-2 flex items-center gap-2 px-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />

          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/30">
            Portfolio
          </p>
        </div>

        <nav
          className="grid gap-2"
          aria-label="Portfolio pages"
        >
          {portfolioItems.map((item) => (
            <div key={item.href}>
              {renderNavItem(item, true)}
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Actions */}

      <div className="mt-auto grid gap-2 pt-6">
        {/* Refresh */}

        <button
          type="button"
          onClick={refresh}
          disabled={refreshing}
          className="
            dash-nav w-full
            text-left
            transition-all duration-300
            disabled:cursor-wait
            disabled:opacity-70
          "
          title="Reload the current page"
        >
          <RefreshCw
            size={18}
            className={refreshing ? "animate-spin" : ""}
          />

          <span>
            {refreshing ? "Refreshing..." : "Refresh"}
          </span>
        </button>

        {/* Logout */}

        <button
          type="button"
          onClick={logout}
          disabled={loggingOut}
          className="
            ui-button-primary
            w-full justify-start
            shadow-[0_8px_30px_rgba(6,182,212,0.18)]
            transition-all duration-300
            hover:shadow-[0_10px_35px_rgba(6,182,212,0.28)]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
          title="Log out of the admin dashboard"
        >
          <LogOut
            size={18}
            className={loggingOut ? "animate-pulse" : ""}
          />

          <span>
            {loggingOut ? "Logging out..." : "Logout"}
          </span>
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-transparent text-white">
      {/* Desktop Sidebar: Always Visible */}

      <div className="fixed left-0 top-0 z-40 hidden h-screen lg:block">
        {renderSidebar()}
      </div>

      {/* Mobile / Tablet Sidebar Overlay */}

      {open && (
        <div
          className="
            fixed inset-0 z-50
            bg-black/60
            backdrop-blur-sm
            lg:hidden
          "
          onClick={() => setOpen(false)}
          role="presentation"
        >
          {/* Sidebar: Clicking inside does not close it */}

          <div
            className="h-full w-72 max-w-[85vw]"
            onClick={(event) => event.stopPropagation()}
          >
            {renderSidebar()}
          </div>
        </div>
      )}

      {/* Main Content */}

      <div className="lg:pl-72">
        {/* Mobile / Tablet Header */}

        <header
          className="
            sticky top-0 z-30
            flex h-16 items-center
            border-b border-white/10
            bg-[#020817]/85
            px-4
            backdrop-blur-xl
            lg:hidden
          "
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="ui-button-ghost min-h-0 p-2"
            aria-label="Open navigation"
            aria-expanded={open}
            aria-controls="dashboard-sidebar"
          >
            <Menu size={21} />
          </button>

          <span className="ml-3 font-semibold">
            Dashboard
          </span>
        </header>

        {/* Page Content */}

        <main
          className="
            mx-auto w-full max-w-7xl
            p-4
            sm:p-6
            lg:p-8
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}
