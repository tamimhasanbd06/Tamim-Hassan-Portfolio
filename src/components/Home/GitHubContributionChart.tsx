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

  if (failed) {
    return (
      <div
        className="
          flex
          min-h-[260px]

          flex-col

          items-center
          justify-center

          rounded-[24px]

          border
          border-dashed
          border-white/[0.08]

          bg-black/25

          px-6
          py-10

          text-center
        "
      >
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center

            rounded-2xl

            border
            border-cyan-400/15

            bg-cyan-400/[0.05]

            text-cyan-300

            shadow-[0_0_35px_rgba(34,211,238,0.05)]
          "
        >
          <FiGithub size={22} />
        </div>

        <h4
          className="
            mt-5

            text-base
            font-black

            text-white
          "
        >
          Activity Matrix Offline
        </h4>

        <p
          className="
            mt-2

            max-w-md

            text-xs
            leading-6

            text-slate-600
          "
        >
          The external GitHub contribution visualization is temporarily
          unavailable.
        </p>

        <div
          className="
            mt-6

            flex
            flex-col
            gap-3

            sm:flex-row
          "
        >
          <button
            type="button"
            onClick={retry}
            className="
              inline-flex
              min-h-11

              items-center
              justify-center
              gap-2

              rounded-xl

              border
              border-white/[0.08]

              bg-white/[0.03]

              px-5
              py-2.5

              text-[9px]
              font-black

              uppercase
              tracking-[0.14em]

              text-slate-400

              transition-all
              duration-300

              hover:border-cyan-400/20
              hover:text-cyan-300
            "
          >
            <FiRefreshCw size={13} />

            Retry Matrix
          </button>

          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              min-h-11

              items-center
              justify-center
              gap-2

              rounded-xl

              border
              border-cyan-400/15

              bg-cyan-400/[0.05]

              px-5
              py-2.5

              text-[9px]
              font-black

              uppercase
              tracking-[0.14em]

              text-cyan-300

              transition-all
              duration-300

              hover:border-cyan-300/30
              hover:bg-cyan-400/[0.08]
              hover:text-white
            "
          >
            Open GitHub

            <FiExternalLink size={13} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        relative

        overflow-hidden

        rounded-[24px]

        border
        border-white/[0.07]

        bg-[#05080b]

        shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]
      "
    >
      {/* =====================================================
          TOP STATUS BAR
      ====================================================== */}

      <div
        className="
          flex
          flex-col
          gap-3

          border-b
          border-white/[0.05]

          bg-white/[0.015]

          px-4
          py-3

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan-400/70" />

            <span className="h-2 w-2 rounded-full bg-blue-400/50" />

            <span className="h-2 w-2 rounded-full bg-slate-500/40" />
          </div>

          <div
            className="
              h-4
              w-px

              bg-white/[0.06]
            "
          />

          <div
            className="
              flex
              items-center
              gap-2

              font-mono
              text-[9px]

              uppercase
              tracking-[0.14em]

              text-slate-600
            "
          >
            <FiActivity className="text-cyan-400/60" />

            contribution.matrix
          </div>
        </div>

        <div
          className="
            flex
            items-center
            gap-2

            text-[8px]
            font-black

            uppercase
            tracking-[0.12em]

            text-emerald-300/60
          "
        >
          <span
            className="
              relative
              flex
              h-1.5
              w-1.5
            "
          >
            <span
              className="
                absolute
                inline-flex
                h-full
                w-full

                animate-ping

                rounded-full

                bg-emerald-400

                opacity-50
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

      {/* =====================================================
          MOBILE SWIPE INFO
      ====================================================== */}

      <div
        className="
          flex
          items-center
          justify-between

          border-b
          border-white/[0.04]

          px-4
          py-2.5

          md:hidden
        "
      >
        <span
          className="
            text-[9px]
            text-slate-700
          "
        >
          Swipe horizontally to explore timeline
        </span>

        <FiArrowUpRight
          className="
            rotate-45

            text-cyan-400/40
          "
          size={13}
        />
      </div>

      {/* =====================================================
          CALENDAR AREA
      ====================================================== */}

      <div
        className="
          relative

          overflow-x-auto

          px-3
          py-6

          [-webkit-overflow-scrolling:touch]

          sm:px-5
          sm:py-7
        "
      >
        {/* grid layer */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            inset-0

            opacity-[0.35]

            [background-image:linear-gradient(rgba(34,211,238,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.025)_1px,transparent_1px)]

            [background-size:32px_32px]
          "
        />

        {/* glow */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            left-1/2
            top-1/2

            h-28
            w-2/3

            -translate-x-1/2
            -translate-y-1/2

            rounded-full

            bg-cyan-500/[0.04]

            blur-[80px]
          "
        />

        {/* scan line */}

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
            via-cyan-400/[0.08]
            to-transparent
          "
        />

        <div
          className="
            relative

            min-w-[760px]

            rounded-2xl

            border
            border-white/[0.04]

            bg-black/20

            p-3

            md:min-w-0

            sm:p-4
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

              w-full

              max-w-none

              object-contain

              brightness-[1.15]
              contrast-[1.08]

              drop-shadow-[0_0_8px_rgba(0,223,253,0.06)]
            "
          />
        </div>
      </div>

      {/* =====================================================
          LEGEND
      ====================================================== */}

      <div
        className="
          flex
          flex-col
          gap-3

          border-t
          border-white/[0.05]

          bg-black/20

          px-4
          py-3

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div
          className="
            flex
            flex-wrap
            items-center
            gap-3
          "
        >
          <span
            className="
              text-[8px]
              font-bold

              uppercase
              tracking-[0.12em]

              text-slate-700
            "
          >
            Activity Level
          </span>

          <div className="flex items-center gap-1.5">
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

                bg-cyan-950
              "
            />

            <span
              className="
                h-2.5
                w-2.5

                rounded-[3px]

                bg-cyan-800
              "
            />

            <span
              className="
                h-2.5
                w-2.5

                rounded-[3px]

                bg-cyan-500
              "
            />

            <span
              className="
                h-2.5
                w-2.5

                rounded-[3px]

                bg-cyan-300

                shadow-[0_0_8px_rgba(103,232,249,0.5)]
              "
            />
          </div>

          <span
            className="
              text-[8px]

              text-slate-700
            "
          >
            Low → High
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div
            className="
              flex
              items-center
              gap-1.5

              text-[8px]
              font-bold

              uppercase
              tracking-[0.12em]

              text-slate-700
            "
          >
            <FiZap className="text-cyan-400/50" />

            Public Activity
          </div>

          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-1.5

              text-[8px]
              font-black

              uppercase
              tracking-[0.12em]

              text-cyan-300/60

              transition-colors
              duration-300

              hover:text-cyan-300
            "
          >
            Profile

            <FiExternalLink size={10} />
          </a>
        </div>
      </div>
    </div>
  );
}