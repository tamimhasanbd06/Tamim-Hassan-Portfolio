"use client";

import { useEffect, useState } from "react";
import { FaDownload, FaTimes } from "react-icons/fa";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

export default function PwaInstaller() {
  const [promptEvent, setPromptEvent] =
    useState<InstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSHelp, setShowIOSHelp] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in window.navigator &&
        Boolean(
          (window.navigator as Navigator & {
            standalone?: boolean;
          }).standalone,
        ));

    const initializeDeviceState = window.setTimeout(() => {
      setIsStandalone(standalone);
      setIsIOS(
        /iPad|iPhone|iPod/.test(window.navigator.userAgent),
      );
    }, 0);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // The portfolio remains fully functional without offline caching.
      });
    }

    const handleInstallPrompt = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as InstallPromptEvent);
    };

    const handleInstalled = () => {
      setIsStandalone(true);
      setPromptEvent(null);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleInstallPrompt,
    );
    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.clearTimeout(initializeDeviceState);
      window.removeEventListener(
        "beforeinstallprompt",
        handleInstallPrompt,
      );
      window.removeEventListener(
        "appinstalled",
        handleInstalled,
      );
    };
  }, []);

  if (isStandalone || dismissed || (!promptEvent && !isIOS)) {
    return null;
  }

  const installApp = async () => {
    if (promptEvent) {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;
      if (choice.outcome === "accepted") {
        setPromptEvent(null);
      }
      return;
    }

    if (isIOS) {
      setShowIOSHelp(true);
    }
  };

  return (
    <aside className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-3 right-3 z-[150] mx-auto max-w-sm rounded-2xl border border-cyan-400/20 bg-[#04101d]/95 p-3 text-white shadow-[0_20px_70px_rgba(0,0,0,0.65)] backdrop-blur-xl min-[420px]:left-auto min-[420px]:right-4">
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss install suggestion"
        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition hover:bg-white/10 hover:text-white"
      >
        <FaTimes aria-hidden="true" />
      </button>

      <div className="flex items-center gap-3 pr-8">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
          <FaDownload aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold">Install Portfolio App</p>
          <p className="mt-0.5 text-xs leading-5 text-slate-400">
            Open this portfolio like a mobile application.
          </p>
        </div>
      </div>

      {showIOSHelp ? (
        <p className="mt-3 rounded-xl bg-white/5 px-3 py-2 text-xs leading-5 text-slate-300">
          On iPhone or iPad, tap the browser Share button and
          choose <strong>Add to Home Screen</strong>.
        </p>
      ) : (
        <button
          type="button"
          onClick={installApp}
          className="mt-3 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
        >
          Install App
        </button>
      )}
    </aside>
  );
}
