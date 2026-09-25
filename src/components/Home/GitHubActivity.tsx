import type { ReactNode } from "react";

import {
  FiActivity,
  FiArrowUpRight,
  FiBookOpen,
  FiCode,
  FiCommand,
  FiGitBranch,
  FiGithub,
  FiLayers,
  FiStar,
  FiTerminal,
  FiUsers,
  FiZap,
} from "react-icons/fi";

import GitHubContributionChart from "./GitHubContributionChart";

/* =========================================================
   TYPES
========================================================= */

type GitHubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

type GitHubRepository = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  private: boolean;
};

/* =========================================================
   CONFIG
========================================================= */

const GITHUB_USERNAME = "tamimhasanbd06";

/* =========================================================
   API
========================================================= */

async function fetchGitHub<T>(endpoint: string): Promise<T> {
  const response = await fetch(`https://api.github.com${endpoint}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

/* =========================================================
   HELPERS
========================================================= */

function formatNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }

  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }

  return value.toString();
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  label,
  value,
  accent = "cyan",
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
  accent?: "cyan" | "blue" | "violet" | "emerald";
}) {
  const accentStyles = {
    cyan: {
      icon: "text-cyan-300",
      iconBg: "bg-cyan-400/[0.08]",
      border: "border-cyan-400/[0.12]",
      hoverBorder: "group-hover:border-cyan-400/25",
      glow: "bg-cyan-400/10",
      line: "bg-cyan-300",
    },

    blue: {
      icon: "text-blue-300",
      iconBg: "bg-blue-400/[0.08]",
      border: "border-blue-400/[0.12]",
      hoverBorder: "group-hover:border-blue-400/25",
      glow: "bg-blue-400/10",
      line: "bg-blue-300",
    },

    violet: {
      icon: "text-violet-300",
      iconBg: "bg-violet-400/[0.08]",
      border: "border-violet-400/[0.12]",
      hoverBorder: "group-hover:border-violet-400/25",
      glow: "bg-violet-400/10",
      line: "bg-violet-300",
    },

    emerald: {
      icon: "text-emerald-300",
      iconBg: "bg-emerald-400/[0.08]",
      border: "border-emerald-400/[0.12]",
      hoverBorder: "group-hover:border-emerald-400/25",
      glow: "bg-emerald-400/10",
      line: "bg-emerald-300",
    },
  };

  const style = accentStyles[accent];

  return (
    <div
      className={`
        group
        relative
        min-w-0
        overflow-hidden
        rounded-xl
        border
        ${style.border}
        ${style.hoverBorder}
        bg-white/[0.018]
        px-3
        py-3.5
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:bg-white/[0.035]
        min-[400px]:rounded-2xl
        min-[400px]:px-4
        min-[400px]:py-4
        sm:px-5
        sm:py-5
      `}
    >
      {/* Accent line */}

      <div
        className={`
          absolute
          left-0
          top-0
          h-px
          w-0
          ${style.line}
          opacity-70
          transition-all
          duration-500
          group-hover:w-full
        `}
      />

      {/* Soft internal glow */}

      <div
        className={`
          pointer-events-none
          absolute
          -right-8
          -top-8
          h-20
          w-20
          rounded-full
          ${style.glow}
          opacity-30
          blur-3xl
          transition-all
          duration-500
          group-hover:scale-150
          group-hover:opacity-50
        `}
      />

      <div className="relative flex min-w-0 items-center gap-3">
        <div
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            ${style.iconBg}
            ${style.icon}
            transition-transform
            duration-300
            group-hover:scale-105
            min-[400px]:h-10
            min-[400px]:w-10
            min-[400px]:rounded-xl
          `}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p
            className="
              truncate
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-white/30
              min-[400px]:text-[9px]
              sm:text-[10px]
            "
          >
            {label}
          </p>

          <p
            className="
              mt-0.5
              truncate
              text-base
              font-bold
              tracking-tight
              text-white
              min-[400px]:text-lg
            "
          >
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   FALLBACK
========================================================= */

function GitHubFallback() {
  return (
    <section
      id="github"
      aria-labelledby="github-heading"
      className="
        mx-auto
        w-full
        min-w-[300px]
        max-w-[2000px]
        overflow-hidden
        px-3
        py-12
        sm:px-6
        sm:py-20
        lg:px-8
        lg:py-24
        xl:px-10
        2xl:px-12
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-5xl
          rounded-2xl
          border
          border-white/[0.08]
          bg-white/[0.02]
          p-6
          text-center
          sm:rounded-3xl
          sm:p-10
        "
      >
        <FiGithub className="mx-auto h-8 w-8 text-white/40" />

        <h2
          id="github-heading"
          className="
            mt-4
            text-xl
            font-bold
            tracking-tight
            text-white
            sm:text-2xl
          "
        >
          GitHub Activity
        </h2>

        <p
          className="
            mx-auto
            mt-2
            max-w-md
            text-xs
            leading-6
            text-white/40
            sm:text-sm
          "
        >
          GitHub activity is currently unavailable. Please try again later.
        </p>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default async function GitHubActivity() {
  let user: GitHubUser;
  let repositories: GitHubRepository[];

  try {
    [user, repositories] = await Promise.all([
      fetchGitHub<GitHubUser>(`/users/${GITHUB_USERNAME}`),

      fetchGitHub<GitHubRepository[]>(
        `/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
      ),
    ]);
  } catch {
    return <GitHubFallback />;
  }

  /* =======================================================
     DATA
  ======================================================= */

  const publicRepositories = repositories.filter(
    (repository) => !repository.private
  );

  const totalStars = publicRepositories.reduce(
    (total, repository) => total + repository.stargazers_count,
    0
  );

  const totalForks = publicRepositories.reduce(
    (total, repository) => total + repository.forks_count,
    0
  );

  const recentRepositories = publicRepositories
    .slice()
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() -
        new Date(a.updated_at).getTime()
    )
    .slice(0, 6);

  /* =======================================================
     UI
  ======================================================= */

  return (
    <section
      id="github"
      aria-labelledby="github-heading"
      className="
        relative
        mx-auto
        w-full
        min-w-[300px]
        max-w-[2000px]
        overflow-hidden
        px-3
        py-12
        text-white
        min-[400px]:px-4
        min-[400px]:py-14
        sm:px-6
        sm:py-20
        md:px-8
        md:py-24
        lg:px-10
        lg:py-28
        xl:px-12
        2xl:px-16
        2xl:py-32
      "
    >
      {/* ===================================================
          CONTENT
      =================================================== */}

      <div className="mx-auto w-full max-w-[1440px]">
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            mb-7
            flex
            flex-col
            gap-5
            min-[500px]:mb-9
            sm:mb-10
            md:mb-12
            md:flex-row
            md:items-end
            md:justify-between
            lg:mb-14
          "
        >
          <div className="min-w-0">
            {/* Badge */}

            <div
              className="
                mb-3
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-cyan-400/[0.12]
                bg-cyan-400/[0.035]
                px-2.5
                py-1.5
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-cyan-300/70
                min-[400px]:px-3
                min-[400px]:text-[9px]
                sm:text-[10px]
              "
            >
              <FiActivity className="h-3 w-3" />

              <span>Open Source Activity</span>
            </div>

            {/* Title */}

            <h2
              id="github-heading"
              className="
                max-w-3xl
                text-[1.75rem]
                font-bold
                leading-[1.05]
                tracking-[-0.045em]
                text-white
                min-[400px]:text-3xl
                sm:text-4xl
                md:text-5xl
                lg:text-[3.4rem]
                xl:text-[3.75rem]
              "
            >
              GitHub Activity
            </h2>

            {/* Description */}

            <p
              className="
                mt-3
                max-w-2xl
                text-[11px]
                leading-5
                text-white/40
                min-[400px]:text-xs
                min-[400px]:leading-6
                sm:mt-4
                sm:text-sm
                sm:leading-7
                lg:text-[15px]
              "
            >
              A live snapshot of my open-source work, repositories,
              contributions, and development activity.
            </p>
          </div>

          {/* GitHub Button */}

          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="
              group
              inline-flex
              w-fit
              shrink-0
              items-center
              gap-2
              rounded-xl
              border
              border-white/[0.09]
              bg-white/[0.025]
              px-3.5
              py-2.5
              text-[11px]
              font-semibold
              text-white/60
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-cyan-400/25
              hover:bg-cyan-400/[0.035]
              hover:text-white
              min-[400px]:px-4
              min-[400px]:py-3
              sm:text-xs
              md:text-sm
            "
          >
            <FiGithub className="h-4 w-4" />

            <span>View GitHub</span>

            <FiArrowUpRight
              className="
                h-3.5
                w-3.5
                transition-transform
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </a>
        </div>

        {/* =================================================
            PROFILE
        ================================================= */}

        <div
          className="
            group
            overflow-hidden
            rounded-2xl
            border
            border-white/[0.075]
            bg-white/[0.018]
            transition-colors
            duration-300
            hover:border-white/[0.11]
            sm:rounded-3xl
          "
        >
          <div
            className="
              flex
              flex-col
              gap-5
              p-4
              min-[400px]:p-5
              sm:p-6
              md:flex-row
              md:items-center
              md:justify-between
              lg:p-7
              xl:p-8
            "
          >
            {/* Profile */}

            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <div
                className="
                  relative
                  h-11
                  w-11
                  shrink-0
                  overflow-hidden
                  rounded-xl
                  border
                  border-white/[0.1]
                  bg-white/[0.04]
                  shadow-lg
                  min-[400px]:h-12
                  min-[400px]:w-12
                  sm:h-14
                  sm:w-14
                  sm:rounded-2xl
                "
              >
                <img
                  src={user.avatar_url}
                  alt={user.name || user.login}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />
              </div>

              <div className="min-w-0">
                <div className="flex min-w-0 items-center gap-2">
                  <h3
                    className="
                      truncate
                      text-sm
                      font-bold
                      text-white
                      min-[400px]:text-base
                      sm:text-lg
                    "
                  >
                    {user.name || user.login}
                  </h3>

                  <span
                    className="
                      hidden
                      rounded-full
                      border
                      border-cyan-400/[0.12]
                      bg-cyan-400/[0.04]
                      px-2
                      py-0.5
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-wider
                      text-cyan-300/65
                      min-[500px]:inline-flex
                    "
                  >
                    Developer
                  </span>
                </div>

                <p
                  className="
                    mt-0.5
                    truncate
                    text-[11px]
                    text-white/30
                    sm:text-xs
                  "
                >
                  @{user.login}
                </p>

                {user.bio && (
                  <p
                    className="
                      mt-1.5
                      line-clamp-1
                      max-w-xl
                      text-[10px]
                      text-white/35
                      sm:text-xs
                    "
                  >
                    {user.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Meta */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-x-4
                gap-y-2
                border-t
                border-white/[0.06]
                pt-4
                text-[9px]
                text-white/30
                sm:gap-x-5
                sm:text-[10px]
                md:border-l
                md:border-t-0
                md:pl-5
                md:pt-0
                lg:pl-7
              "
            >
              <div className="flex items-center gap-1.5">
                <FiTerminal className="h-3.5 w-3.5 text-cyan-300/60" />

                <span>github.com</span>
              </div>

              <div className="flex items-center gap-1.5">
                <FiCommand className="h-3.5 w-3.5 text-blue-300/60" />

                <span>Public Profile</span>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            STATS
        ================================================= */}

        <div
          className="
            mt-3
            grid
            grid-cols-2
            gap-2
            min-[400px]:mt-4
            min-[400px]:gap-3
            sm:gap-4
            md:grid-cols-4
            lg:mt-5
          "
        >
          <StatCard
            icon={<FiBookOpen className="h-4 w-4" />}
            label="Repositories"
            value={formatNumber(publicRepositories.length)}
            accent="cyan"
          />

          <StatCard
            icon={<FiStar className="h-4 w-4" />}
            label="Stars"
            value={formatNumber(totalStars)}
            accent="blue"
          />

          <StatCard
            icon={<FiGitBranch className="h-4 w-4" />}
            label="Forks"
            value={formatNumber(totalForks)}
            accent="violet"
          />

          <StatCard
            icon={<FiUsers className="h-4 w-4" />}
            label="Followers"
            value={formatNumber(user.followers)}
            accent="emerald"
          />
        </div>

        {/* =================================================
            REPOSITORY PANEL
        ================================================= */}

        <div
          className="
            mt-3
            overflow-hidden
            rounded-2xl
            border
            border-white/[0.075]
            bg-white/[0.018]
            sm:mt-4
            sm:rounded-3xl
            lg:mt-5
          "
        >
          {/* Panel Header */}

          <div
            className="
              flex
              flex-col
              gap-3
              border-b
              border-white/[0.06]
              p-4
              min-[400px]:p-5
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:p-6
              lg:p-7
            "
          >
            <div>
              <div className="flex items-center gap-2">
                <FiLayers className="h-4 w-4 text-cyan-300/65" />

                <h3
                  className="
                    text-sm
                    font-bold
                    text-white
                    sm:text-base
                  "
                >
                  Recent Repositories
                </h3>
              </div>

              <p
                className="
                  mt-1
                  text-[10px]
                  text-white/30
                  sm:text-xs
                "
              >
                Recently updated public repositories
              </p>
            </div>

            <a
              href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
              target="_blank"
              rel="noreferrer"
              className="
                group
                inline-flex
                w-fit
                items-center
                gap-1.5
                text-[10px]
                font-semibold
                text-white/35
                transition-colors
                hover:text-cyan-300
                sm:text-xs
              "
            >
              <span>All repositories</span>

              <FiArrowUpRight
                className="
                  h-3
                  w-3
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </a>
          </div>

          {/* Repository Grid */}

          <div
            className="
              grid
              grid-cols-1
              divide-y
              divide-white/[0.05]
              md:grid-cols-2
              md:divide-x
              md:divide-y-0
            "
          >
            {recentRepositories.map((repository) => (
              <a
                key={repository.id}
                href={repository.html_url}
                target="_blank"
                rel="noreferrer"
                className="
                  group
                  relative
                  min-w-0
                  p-4
                  transition-all
                  duration-300
                  hover:bg-white/[0.025]
                  min-[400px]:p-5
                  sm:p-6
                  lg:p-7
                "
              >
                {/* Repository top */}

                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex min-w-0 items-center gap-2">
                      <div
                        className="
                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          bg-cyan-400/[0.05]
                          text-cyan-300/60
                          transition-all
                          duration-300
                          group-hover:bg-cyan-400/[0.09]
                          group-hover:text-cyan-300
                        "
                      >
                        <FiCode className="h-3.5 w-3.5" />
                      </div>

                      <h4
                        className="
                          truncate
                          text-sm
                          font-semibold
                          text-white
                          transition-colors
                          group-hover:text-cyan-200
                          sm:text-[15px]
                        "
                      >
                        {repository.name}
                      </h4>
                    </div>

                    <p
                      className="
                        mt-3
                        line-clamp-2
                        text-[11px]
                        leading-5
                        text-white/35
                        sm:text-xs
                        sm:leading-6
                      "
                    >
                      {repository.description ||
                        "No description available for this repository."}
                    </p>
                  </div>

                  <FiArrowUpRight
                    className="
                      h-3.5
                      w-3.5
                      shrink-0
                      text-white/15
                      transition-all
                      duration-300
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                      group-hover:text-cyan-300
                    "
                  />
                </div>

                {/* Repository meta */}

                <div
                  className="
                    mt-5
                    flex
                    flex-wrap
                    items-center
                    gap-x-4
                    gap-y-2
                    text-[9px]
                    text-white/30
                    sm:text-[10px]
                    md:text-xs
                  "
                >
                  {repository.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="
                          h-1.5
                          w-1.5
                          rounded-full
                          bg-cyan-300/70
                          shadow-[0_0_8px_rgba(103,232,249,0.35)]
                        "
                      />

                      {repository.language}
                    </span>
                  )}

                  <span className="flex items-center gap-1">
                    <FiStar className="h-3 w-3" />

                    {formatNumber(repository.stargazers_count)}
                  </span>

                  <span className="flex items-center gap-1">
                    <FiGitBranch className="h-3 w-3" />

                    {formatNumber(repository.forks_count)}
                  </span>
                </div>

                {/* Updated */}

                <p
                  className="
                    mt-3
                    text-[9px]
                    text-white/20
                    sm:text-[10px]
                  "
                >
                  Updated {formatDate(repository.updated_at)}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* =================================================
            CONTRIBUTION PANEL
        ================================================= */}

        <div
          className="
            mt-3
            overflow-hidden
            rounded-2xl
            border
            border-white/[0.075]
            bg-white/[0.018]
            sm:mt-4
            sm:rounded-3xl
            lg:mt-5
          "
        >
          {/* Contribution Header */}

          <div
            className="
              flex
              flex-col
              gap-3
              border-b
              border-white/[0.06]
              p-4
              min-[400px]:p-5
              sm:flex-row
              sm:items-center
              sm:justify-between
              sm:p-6
              lg:p-7
            "
          >
            <div>
              <div className="flex items-center gap-2">
                <FiZap className="h-4 w-4 text-cyan-300/65" />

                <h3
                  className="
                    text-sm
                    font-bold
                    text-white
                    sm:text-base
                  "
                >
                  Contribution Activity
                </h3>
              </div>

              <p
                className="
                  mt-1
                  text-[10px]
                  text-white/30
                  sm:text-xs
                "
              >
                GitHub contribution history
              </p>
            </div>

            {/* Legend */}

            <div
              className="
                flex
                items-center
                gap-2
                text-[8px]
                text-white/25
                sm:text-[10px]
              "
            >
              <span>Less</span>

              <div className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-[2px] bg-white/[0.055]" />

                <span className="h-2.5 w-2.5 rounded-[2px] bg-cyan-400/20" />

                <span className="h-2.5 w-2.5 rounded-[2px] bg-cyan-400/40" />

                <span className="h-2.5 w-2.5 rounded-[2px] bg-cyan-400/60" />

                <span className="h-2.5 w-2.5 rounded-[2px] bg-cyan-400/90" />
              </div>

              <span>More</span>
            </div>
          </div>

          {/* Chart */}

          <div
            className="
              overflow-x-auto
              overscroll-x-contain
              p-3
              min-[400px]:p-4
              sm:p-6
              lg:p-7
              xl:p-8
            "
          >
            <div className="min-w-[680px]">
              <GitHubContributionChart
                username={GITHUB_USERNAME}
              />
            </div>
          </div>
        </div>

        {/* =================================================
            BOTTOM STATUS
        ================================================= */}

        <div
          className="
            mt-3
            flex
            flex-col
            gap-3
            rounded-xl
            border
            border-white/[0.06]
            bg-white/[0.012]
            px-3
            py-3
            text-[8px]
            text-white/25
            min-[400px]:px-4
            sm:mt-4
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:rounded-2xl
            sm:px-5
            sm:py-3.5
            sm:text-[10px]
            lg:px-6
          "
        >
          {/* Status */}

          <div className="flex items-center gap-2">
            <span
              className="
                h-1.5
                w-1.5
                shrink-0
                rounded-full
                bg-emerald-400
                shadow-[0_0_10px_rgba(52,211,153,0.45)]
              "
            />

            <span>GitHub data synchronized</span>
          </div>

          {/* Meta */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-4
              gap-y-1.5
            "
          >
            <span className="flex items-center gap-1.5">
              <FiUsers className="h-3 w-3" />

              {formatNumber(user.following)} following
            </span>

            <span className="flex items-center gap-1.5">
              <FiCode className="h-3 w-3" />

              {formatNumber(publicRepositories.length)} public repos
            </span>

            <span className="hidden items-center gap-1.5 sm:flex">
              <FiActivity className="h-3 w-3" />

              Updated hourly
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}