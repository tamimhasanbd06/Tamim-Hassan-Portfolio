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
  X,
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
   *
   * Example:
   * /resume
   * becomes
   * /resume?from=admin
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
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      router.replace("/login");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  }

  /**
   * Refresh dashboard data.
   */
  function refresh() {
    if (refreshing) return;

    setRefreshing(true);

    router.refresh();

    window.dispatchEvent(new Event("dashboard-refresh"));

    window.setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }

  /**
   * Sidebar navigation item.
   *
   * Active item:
   * ui-button-primary
   *
   * Inactive item:
   * dash-nav
   */
  const renderNavItem = (
    item: NavigationItem,
    adminContext: boolean = false
  ) => {
    const Icon = item.icon;
    const active = isActive(item.href);

    const href = adminContext
      ? getAdminHref(item.href)
      : item.href;

    return (
      <Link
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
   * Sidebar
   */
  const renderSidebar = () => (
    <aside
      className="
        flex h-full w-72 flex-col
        border-r border-white/10
        bg-[#04101d]/95
        p-4
        backdrop-blur-xl
      "
      aria-label="Dashboard navigation"
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">
            Portfolio Admin
          </p>

          <h2 className="mt-1 text-lg font-bold text-white">
            Dashboard
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="ui-button-ghost min-h-0 p-2 lg:hidden"
          aria-label="Close navigation"
        >
          <X size={20} />
        </button>
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

      {/* Dashboard */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2 px-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/30">
            Dashboard
          </p>
        </div>

        <nav className="grid gap-2">
          {dashboardItems.map((item) => (
            <div key={item.href}>
              {renderNavItem(item)}
            </div>
          ))}
        </nav>
      </div>

      {/* Portfolio */}
      <div>
        <div className="mb-2 flex items-center gap-2 px-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />

          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/30">
            Portfolio
          </p>
        </div>

        <nav className="grid gap-2">
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
            dash-nav w-full text-left
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
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
            dash-nav w-full text-left
            text-rose-200
            hover:border-rose-400/20
            hover:bg-rose-400/[0.06]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <LogOut size={18} />

          <span>
            {loggingOut ? "Logging out..." : "Logout"}
          </span>
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-transparent text-white">
      {/* Desktop Sidebar */}
      <div className="fixed left-0 top-0 z-40 hidden h-screen lg:block">
        {renderSidebar()}
      </div>

      {/* Mobile Sidebar */}
      {open ? (
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
          <div
            className="h-full w-72"
            onClick={(event) => event.stopPropagation()}
          >
            {renderSidebar()}
          </div>
        </div>
      ) : null}

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Mobile Header */}
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
          >
            <Menu size={21} />
          </button>

          <span className="ml-3 font-semibold">
            Dashboard
          </span>
        </header>

        {/* Page */}
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