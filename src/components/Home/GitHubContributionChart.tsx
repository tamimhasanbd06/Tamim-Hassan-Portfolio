"use client";

import { useState } from "react";

import {
  FiActivity,
  FiArrowUpRight,
  FiExternalLink,
  FiGithub,
  FiRefreshCw,
  FiZap,
} from "react-icons/fi";

type GitHubContributionChartProps = {
  username: string;
  profileUrl: string;
};

export default function GitHubContributionChart({
  username,
  profileUrl,
}: GitHubContributionChartProps) {
  const [failed, setFailed] = useState(false);
  const [imageKey, setImageKey] = useState(0);

  const retry = () => {
    setFailed(false);
    setImageKey((current) => current + 1);
  };

  /* =======================================================
     FAILED STATE
  ======================================================= */

  if (failed) {
    return (
      <div
        className="
          relative
          flex
          min-h-[240px]
          w-full
          flex-col
          items-center
          justify-center
          overflow-hidden
          rounded-2xl
          border
          border-dashed
          border-white/[0.08]
          bg-white/[0.012]
          px-4
          py-10
          text-center
          min-[400px]:min-h-[260px]
          min-[400px]:rounded-3xl
          min-[400px]:px-6
          sm:min-h-[280px]
        "
      >
        {/* Subtle glow */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-40
            w-40
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-cyan-400/[0.035]
            blur-[70px]
          "
        />

        {/* Icon */}

        <div
          className="
            relative
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            border
            border-cyan-400/[0.12]
            bg-cyan-400/[0.035]
            text-cyan-300/80
            shadow-[0_0_30px_rgba(34,211,238,0.04)]
            min-[400px]:h-14
            min-[400px]:w-14
            min-[400px]:rounded-2xl
          "
        >
          <FiGithub size={22} />
        </div>

        {/* Heading */}

        <h4
          className="
            relative
            mt-5
            text-sm
            font-bold
            tracking-tight
            text-white
            min-[400px]:text-base
          "
        >
          Activity Matrix Offline
        </h4>

        {/* Description */}

        <p
          className="
            relative
            mt-2
            max-w-md
            text-[10px]
            leading-5
            text-white/30
            min-[400px]:text-xs
            min-[400px]:leading-6
          "
        >
          The external GitHub contribution visualization is temporarily
          unavailable.
        </p>

        {/* Actions */}

        <div
          className="
            relative
            mt-6
            flex
            w-full
            flex-col
            gap-2.5
            min-[420px]:w-auto
            min-[420px]:flex-row
            min-[420px]:gap-3
          "
        >
          <button
            type="button"
            onClick={retry}
            className="
              inline-flex
              min-h-10
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-white/[0.08]
              bg-white/[0.025]
              px-4
              py-2.5
              text-[9px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-white/45
              transition-all
              duration-300
              hover:border-cyan-400/20
              hover:bg-cyan-400/[0.025]
              hover:text-cyan-300
              active:scale-[0.98]
              sm:px-5
            "
          >
            <FiRefreshCw
              size={13}
              className="transition-transform duration-500 group-hover:rotate-180"
            />

            Retry Matrix
          </button>

          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              min-h-10
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-cyan-400/[0.12]
              bg-cyan-400/[0.035]
              px-4
              py-2.5
              text-[9px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-cyan-300/80
              transition-all
              duration-300
              hover:border-cyan-300/25
              hover:bg-cyan-400/[0.07]
              hover:text-white
              active:scale-[0.98]
              sm:px-5
            "
          >
            Open GitHub

            <FiExternalLink size={13} />
          </a>
        </div>
      </div>
    );
  }

  /* =======================================================
     MAIN CHART
  ======================================================= */

  return (
    <div
      className="
        relative
        w-full
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.07]
        bg-white/[0.012]
        shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]
        min-[400px]:rounded-3xl
      "
    >
      {/* ===================================================
          TOP STATUS BAR
      =================================================== */}

      <div
        className="
          flex
          flex-col
          gap-3
          border-b
          border-white/[0.055]
          bg-white/[0.012]
          px-3
          py-3
          min-[400px]:px-4
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-5
          sm:py-3.5
          lg:px-6
        "
      >
        {/* Left */}

        <div className="flex min-w-0 items-center gap-2.5">
          {/* Window dots */}

          <div className="flex shrink-0 items-center gap-1.5">
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-cyan-300/60
                sm:h-2
                sm:w-2
              "
            />

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-blue-300/40
                sm:h-2
                sm:w-2
              "
            />

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-white/15
                sm:h-2
                sm:w-2
              "
            />
          </div>

          <div
            className="
              h-3.5
              w-px
              shrink-0
              bg-white/[0.07]
              sm:h-4
            "
          />

          <div
            className="
              flex
              min-w-0
              items-center
              gap-1.5
              font-mono
              text-[8px]
              uppercase
              tracking-[0.13em]
              text-white/25
              sm:text-[9px]
              sm:tracking-[0.14em]
            "
          >
            <FiActivity className="h-3 w-3 shrink-0 text-cyan-300/60" />

            <span className="truncate">contribution.matrix</span>
          </div>
        </div>

        {/* Right Status */}

        <div
          className="
            flex
            items-center
            gap-2
            text-[8px]
            font-bold
            uppercase
            tracking-[0.12em]
            text-emerald-300/60
          "
        >
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="
                absolute
                inline-flex
                h-full
                w-full
                animate-ping
                rounded-full
                bg-emerald-400
                opacity-40
              "
            />

            <span
              className="
                relative
                inline-flex
                h-1.5
                w-1.5
                rounded-full
                bg-emerald-400
              "
            />
          </span>

          Data Stream Active
        </div>
      </div>

      {/* ===================================================
          MOBILE SWIPE INFO
      =================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-white/[0.04]
          px-3
          py-2
          md:hidden
          min-[400px]:px-4
        "
      >
        <span
          className="
            text-[8px]
            text-white/20
            min-[400px]:text-[9px]
          "
        >
          Swipe horizontally to explore timeline
        </span>

        <FiArrowUpRight
          className="
            rotate-45
            text-cyan-300/35
          "
          size={12}
        />
      </div>

      {/* ===================================================
          CALENDAR AREA
      =================================================== */}

      <div
        className="
          relative
          overflow-x-auto
          px-2.5
          py-4
          [-webkit-overflow-scrolling:touch]
          min-[400px]:px-3
          min-[400px]:py-5
          sm:px-5
          sm:py-6
          lg:px-6
          lg:py-7
        "
      >
        {/* Very subtle grid */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-30
            [background-image:linear-gradient(rgba(34,211,238,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.018)_1px,transparent_1px)]
            [background-size:32px_32px]
          "
        />

        {/* Center glow */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-32
            w-2/3
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-cyan-400/[0.025]
            blur-[80px]
          "
        />

        {/* Soft horizontal line */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-0
            right-0
            top-1/2
            h-px
            bg-gradient-to-r
            from-transparent
            via-cyan-300/[0.045]
            to-transparent
          "
        />

        {/* Chart shell */}

        <div
          className="
            relative
            min-w-[720px]
            overflow-hidden
            rounded-xl
            border
            border-white/[0.055]
            bg-black/[0.12]
            p-2.5
            shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]
            min-[400px]:rounded-2xl
            min-[400px]:p-3
            sm:min-w-[760px]
            sm:p-4
            md:min-w-0
          "
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}

          <img
            key={imageKey}
            src={`https://ghchart.rshah.org/00dffd/${username}`}
            alt={`${username}'s GitHub contribution calendar`}
            loading="lazy"
            onError={() => setFailed(true)}
            className="
              mx-auto
              block
              h-auto
              w-full
              max-w-none
              object-contain
              brightness-[1.08]
              contrast-[1.04]
              drop-shadow-[0_0_8px_rgba(0,223,253,0.04)]
            "
          />
        </div>
      </div>

      {/* ===================================================
          LEGEND
      =================================================== */}

      <div
        className="
          flex
          flex-col
          gap-3
          border-t
          border-white/[0.055]
          bg-white/[0.008]
          px-3
          py-3
          min-[400px]:px-4
          sm:flex-row
          sm:items-center
          sm:justify-between
          sm:px-5
          sm:py-3.5
          lg:px-6
        "
      >
        {/* Activity levels */}

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-2.5
            min-[400px]:gap-3
          "
        >
          <span
            className="
              text-[8px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-white/22
            "
          >
            Activity Level
          </span>

          <div className="flex items-center gap-1">
            <span
              className="
                h-2.5
                w-2.5
                rounded-[3px]
                border
                border-white/[0.04]
                bg-white/[0.035]
              "
            />

            <span
              className="
                h-2.5
                w-2.5
                rounded-[3px]
                bg-cyan-950/80
              "
            />

            <span
              className="
                h-2.5
                w-2.5
                rounded-[3px]
                bg-cyan-800/80
              "
            />

            <span
              className="
                h-2.5
                w-2.5
                rounded-[3px]
                bg-cyan-500/90
              "
            />

            <span
              className="
                h-2.5
                w-2.5
                rounded-[3px]
                bg-cyan-300
                shadow-[0_0_8px_rgba(103,232,249,0.4)]
              "
            />
          </div>

          <span
            className="
              text-[8px]
              text-white/20
            "
          >
            Low → High
          </span>
        </div>

        {/* Right controls */}

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-4
          "
        >
          {/* Public Activity */}

          <div
            className="
              flex
              items-center
              gap-1.5
              text-[8px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-white/20
            "
          >
            <FiZap className="h-3 w-3 text-cyan-300/45" />

            Public Activity
          </div>

          {/* Profile */}

          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              inline-flex
              items-center
              gap-1.5
              text-[8px]
              font-bold
              uppercase
              tracking-[0.12em]
              text-cyan-300/55
              transition-colors
              duration-300
              hover:text-cyan-300
            "
          >
            Profile

            <FiExternalLink
              size={10}
              className="
                transition-transform
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </a>
        </div>
      </div>
    </div>
  );
}