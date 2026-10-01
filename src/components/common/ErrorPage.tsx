"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home, LogIn, RefreshCw, RotateCcw } from "lucide-react";
import { getErrorPresentation, type ErrorAction, type SupportedErrorStatus } from "@/lib/error-config";

type ErrorPageProps = {
  statusCode?: SupportedErrorStatus;
  title?: string;
  message?: string;
  referenceId?: string;
  retryAfterSeconds?: number;
  onRetry?: () => void;
  reviewHref?: string;
};

const actionLabels: Record<ErrorAction, string> = {
  home: "Go Home",
  back: "Go Back",
  retry: "Try Again",
  login: "Sign In",
  review: "Review Information",
};

export default function ErrorPage({ statusCode = 500, title, message, referenceId, retryAfterSeconds, onRetry, reviewHref }: ErrorPageProps) {
  const config = getErrorPresentation(statusCode);

  const renderAction = (action: ErrorAction, primary = false) => {
    const className = primary ? "ui-button-primary min-w-40" : "ui-button-secondary min-w-40";
    const icon = action === "home" ? <Home size={17} /> : action === "login" ? <LogIn size={17} /> : action === "retry" ? <RefreshCw size={17} /> : action === "review" ? <RotateCcw size={17} /> : <ArrowLeft size={17} />;

    if (action === "home") return <Link className={className} href="/home">{icon}{actionLabels[action]}</Link>;
    if (action === "login") return <Link className={className} href="/login">{icon}{actionLabels[action]}</Link>;
    if (action === "review" && reviewHref) return <Link className={className} href={reviewHref}>{icon}{actionLabels[action]}</Link>;

    if (action === "back" || action === "review") {
      return <button className={className} type="button" onClick={() => { if (window.history.length > 1) window.history.back(); else window.location.assign("/home"); }}>{icon}{actionLabels[action]}</button>;
    }

    return <button className={className} type="button" onClick={() => onRetry ? onRetry() : window.location.reload()} disabled={retryAfterSeconds !== undefined && retryAfterSeconds > 0}>{icon}{retryAfterSeconds && retryAfterSeconds > 0 ? `Try again in ${retryAfterSeconds}s` : actionLabels[action]}</button>;
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-16 text-white sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/55 via-[var(--bg-card)]/25 to-black/45" />
      <div className="pointer-events-none absolute -left-40 top-[-100px] h-[480px] w-[480px] rounded-full bg-blue-600/15 blur-[160px]" />
      <div className="pointer-events-none absolute -bottom-52 right-[-140px] h-[550px] w-[550px] rounded-full bg-cyan-400/10 blur-[180px]" />
      <section className="relative z-10 mx-auto w-full max-w-4xl text-center" aria-labelledby="error-title">
        <Link href="/home" aria-label="Go to Tamim Hasan portfolio" className="group mx-auto mb-8 block w-fit">
          <div className="relative h-20 w-20 sm:h-24 sm:w-24">
            <div className="absolute inset-0 rounded-full bg-cyan-400/25 blur-2xl transition group-hover:bg-cyan-400/40" />
            <div className="relative h-full w-full overflow-hidden rounded-full border border-cyan-400/25 bg-[var(--bg-gradient-via)] shadow-[0_0_50px_rgba(34,211,238,0.15)]">
              <Image src="/assets/brand/tamim-hassan-logo.png" alt="Tamim Hasan web developer logo" fill priority sizes="96px" className="object-cover" />
            </div>
          </div>
        </Link>
        <div className="mx-auto mb-6 w-fit rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-300 sm:text-xs">{config.eyebrow}</div>
        <p aria-hidden="true" className="bg-gradient-to-b from-white via-cyan-200 to-blue-500 bg-clip-text text-7xl font-black tracking-[-0.07em] text-transparent drop-shadow-[0_0_40px_rgba(34,211,238,0.2)] sm:text-9xl">{statusCode}</p>
        <h1 id="error-title" className="mx-auto mt-4 max-w-3xl text-2xl font-black tracking-tight text-white sm:text-4xl">{title ?? config.title}</h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">{message ?? config.message}</p>
        {referenceId ? <p className="mt-3 text-xs text-slate-500">Reference ID: {referenceId}</p> : null}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {renderAction(config.primaryAction, true)}
          {config.secondaryAction ? renderAction(config.secondaryAction) : null}
        </div>
      </section>
    </main>
  );
}
