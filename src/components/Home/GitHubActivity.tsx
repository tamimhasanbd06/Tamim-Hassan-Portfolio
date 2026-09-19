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
  FiUserPlus,
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
const GITHUB_API = "https://api.github.com";

/* =========================================================
   API
========================================================= */

async function fetchGitHub<T>(endpoint: string): Promise<T | null> {
  try {
    const response = await fetch(`${GITHUB_API}${endpoint}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },

      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      console.error(
        `[GitHubActivity] Request failed with status ${response.status}`,
      );

      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error("[GitHubActivity] Request failed:", error);

    return null;
  }
}

/* =========================================================
   HELPERS
========================================================= */

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: value >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

/* =========================================================
   STAT CARD
========================================================= */

type StatCardProps = {
  icon: ReactNode;
  value: string;
  label: string;
  description: string;
};

function StatCard({
  icon,
  value,
  label,
  description,
}: StatCardProps) {
  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-white/[0.07]
        bg-white/[0.025]
        p-4

        transition-all
        duration-500

        hover:-translate-y-1
        hover:border-cyan-400/20
        hover:bg-white/[0.04]

        sm:p-5
      "
    >
      {/* glow */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-10
          -top-10
          h-28
          w-28
          rounded-full
          bg-cyan-400/10
          opacity-0
          blur-3xl

          transition-opacity
          duration-500

          group-hover:opacity-100
        "
      />

      {/* corner */}

      <div
        aria-hidden="true"
        className="
          absolute
          right-3
          top-3
          h-2
          w-2
          rounded-full
          border
          border-cyan-300/20
          bg-cyan-300/10
        "
      />

      <div className="relative z-10">
        <div
          className="
            mb-5
            flex
            h-11
            w-11
            items-center
            justify-center

            rounded-2xl
            border
            border-cyan-400/15
            bg-cyan-400/[0.055]

            text-cyan-300

            shadow-[0_0_30px_rgba(34,211,238,0.04)]

            transition-all
            duration-300

            group-hover:border-cyan-300/30
            group-hover:bg-cyan-400/10
          "
        >
          {icon}
        </div>

        <p
          className="
            text-2xl
            font-black
            tracking-[-0.04em]
            text-white

            sm:text-3xl
          "
        >
          {value}
        </p>

        <p
          className="
            mt-1
            text-[10px]
            font-black
            uppercase
            tracking-[0.16em]
            text-slate-400
          "
        >
          {label}
        </p>

        <p
          className="
            mt-2
            hidden
            text-[11px]
            leading-5
            text-slate-600

            sm:block
          "
        >
          {description}
        </p>
      </div>
    </article>
  );
}

/* =========================================================
   FALLBACK
========================================================= */

function GitHubFallback() {
  return (
    <section
      id="github"
      className="
        relative
        overflow-hidden
        bg-black
        px-4
        py-20
        text-white
      "
    >
      <div className="mx-auto max-w-7xl">
        <div
          className="
            rounded-[32px]
            border
            border-white/10
            bg-white/[0.025]
            p-8
            text-center
            backdrop-blur-xl

            sm:p-12
          "
        >
          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              border
              border-cyan-400/15
              bg-cyan-400/[0.06]
              text-2xl
              text-cyan-300
            "
          >
            <FiGithub />
          </div>

          <h2 className="mt-6 text-2xl font-black sm:text-3xl">
            GitHub Network Offline
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-lg
              text-sm
              leading-7
              text-slate-500
            "
          >
            GitHub data is temporarily unavailable. You can still open my
            public GitHub profile directly.
          </p>

          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-7
              inline-flex
              min-h-11
              items-center
              justify-center
              gap-2

              rounded-full
              border
              border-cyan-400/20

              bg-cyan-400/[0.06]

              px-6
              py-3

              text-[10px]
              font-black
              uppercase
              tracking-[0.15em]
              text-cyan-300

              transition-all
              duration-300

              hover:border-cyan-300/40
              hover:bg-cyan-400/10
              hover:text-white
            "
          >
            <FiGithub size={16} />

            Open GitHub

            <FiArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MAIN SERVER COMPONENT
========================================================= */

export default async function GitHubActivity() {
  const [user, reposResponse] = await Promise.all([
    fetchGitHub<GitHubUser>(`/users/${GITHUB_USERNAME}`),

    fetchGitHub<GitHubRepository[]>(
      `/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=100`,
    ),
  ]);

  if (!user) {
    return <GitHubFallback />;
  }

  const repositories = (reposResponse ?? []).filter(
    (repo) => !repo.private,
  );

  const totalStars = repositories.reduce(
    (total, repo) => total + repo.stargazers_count,
    0,
  );

  const totalForks = repositories.reduce(
    (total, repo) => total + repo.forks_count,
    0,
  );

  const recentRepositories = repositories.slice(0, 6);

  return (
    <section
      id="github"
      aria-labelledby="github-heading"
      className="
        theme-section
        relative
        overflow-hidden

        bg-[#030507]

        px-4
        py-20

        text-white

        sm:px-6
        sm:py-24

        lg:px-8
        lg:py-28
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0

          [background-image:linear-gradient(rgba(34,211,238,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.035)_1px,transparent_1px)]

          [background-size:64px_64px]

          [mask-image:linear-gradient(to_bottom,black,transparent_92%)]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[-200px]

          h-[600px]
          w-[900px]

          -translate-x-1/2

          rounded-full

          bg-cyan-500/[0.07]

          blur-[170px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-40
          top-1/2

          h-[400px]
          w-[400px]

          rounded-full

          bg-blue-500/[0.04]

          blur-[150px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-0

          h-[420px]
          w-[420px]

          rounded-full

          bg-cyan-400/[0.04]

          blur-[150px]
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <header
          className="
            mx-auto
            max-w-4xl
            text-center
          "
        >
          <div
            className="
              inline-flex
              items-center
              gap-3

              rounded-full

              border
              border-cyan-400/15

              bg-cyan-400/[0.04]

              px-4
              py-2

              shadow-[0_0_30px_rgba(34,211,238,0.04)]
            "
          >
            <span className="relative flex h-2 w-2">
              <span
                className="
                  absolute
                  inline-flex
                  h-full
                  w-full
                  animate-ping
                  rounded-full
                  bg-cyan-400
                  opacity-50
                "
              />

              <span
                className="
                  relative
                  inline-flex
                  h-2
                  w-2
                  rounded-full
                  bg-cyan-300
                "
              />
            </span>

            <span
              className="
                text-[9px]
                font-black
                uppercase
                tracking-[0.24em]
                text-cyan-300

                sm:text-[10px]
              "
            >
              Developer Network / Live
            </span>
          </div>

          <h2
            id="github-heading"
            className="
              mt-6

              text-4xl
              font-black

              tracking-[-0.05em]

              sm:text-5xl
              lg:text-6xl
            "
          >
            GitHub{" "}
            <span
              className="
                bg-gradient-to-r
                from-blue-400
                via-cyan-300
                to-emerald-300

                bg-clip-text
                text-transparent
              "
            >
              Command Center
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl

              text-sm
              leading-7
              text-slate-500

              sm:text-base
            "
          >
            A live developer dashboard showcasing repositories, code activity,
            open-source work and contribution history.
          </p>
        </header>

        {/* =====================================================
            PROFILE CONSOLE
        ====================================================== */}

        <div
          className="
            relative
            mt-12

            overflow-hidden

            rounded-[30px]

            border
            border-white/[0.07]

            bg-white/[0.025]

            shadow-[0_30px_100px_rgba(0,0,0,0.45)]

            backdrop-blur-xl

            sm:mt-16
          "
        >
          {/* top terminal bar */}

          <div
            className="
              flex
              items-center
              justify-between

              border-b
              border-white/[0.06]

              bg-black/30

              px-4
              py-3

              sm:px-6
            "
          >
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            </div>

            <div
              className="
                flex
                items-center
                gap-2

                text-[9px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-slate-600
              "
            >
              <FiTerminal size={12} />

              github.profile
            </div>
          </div>

          {/* profile body */}

          <div
            className="
              grid
              gap-6

              p-5

              sm:p-7

              lg:grid-cols-[1fr_auto]
              lg:items-center

              lg:p-8
            "
          >
            <div
              className="
                flex
                min-w-0
                flex-col
                gap-5

                sm:flex-row
                sm:items-center
              "
            >
              <div className="relative mx-auto shrink-0 sm:mx-0">
                <div
                  className="
                    absolute
                    -inset-2

                    rounded-[24px]

                    bg-gradient-to-br
                    from-cyan-400/30
                    to-blue-500/10

                    blur-xl
                  "
                />

                {/* eslint-disable-next-line @next/next/no-img-element */}

                <img
                  src={user.avatar_url}
                  alt={`${user.login} GitHub avatar`}
                  width={92}
                  height={92}
                  className="
                    relative

                    h-[84px]
                    w-[84px]

                    rounded-[22px]

                    border
                    border-cyan-300/20

                    object-cover

                    shadow-[0_0_35px_rgba(34,211,238,0.12)]

                    sm:h-[92px]
                    sm:w-[92px]
                  "
                />

                <span
                  className="
                    absolute
                    -bottom-1
                    -right-1

                    h-4
                    w-4

                    rounded-full

                    border-[3px]
                    border-[#070a0d]

                    bg-emerald-400

                    shadow-[0_0_14px_rgba(52,211,153,0.7)]
                  "
                />
              </div>

              <div className="min-w-0 text-center sm:text-left">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <h3
                    className="
                      truncate

                      text-xl
                      font-black

                      tracking-tight

                      text-white

                      sm:text-2xl
                    "
                  >
                    {user.name || user.login}
                  </h3>

                  <span
                    className="
                      rounded-full

                      border
                      border-cyan-400/10

                      bg-cyan-400/[0.04]

                      px-2.5
                      py-1

                      text-[8px]
                      font-black
                      uppercase
                      tracking-wider
                      text-cyan-300/80
                    "
                  >
                    Developer
                  </span>
                </div>

                <p
                  className="
                    mt-1

                    font-mono
                    text-xs

                    text-cyan-300/70
                  "
                >
                  github.com/{user.login}
                </p>

                {user.bio && (
                  <p
                    className="
                      mx-auto
                      mt-3
                      max-w-2xl

                      text-sm
                      leading-6
                      text-slate-500

                      sm:mx-0
                    "
                  >
                    {user.bio}
                  </p>
                )}
              </div>
            </div>

            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group

                inline-flex
                min-h-12

                items-center
                justify-center
                gap-2.5

                rounded-2xl

                border
                border-cyan-400/15

                bg-gradient-to-r
                from-cyan-400/[0.07]
                to-blue-500/[0.05]

                px-5
                py-3

                text-[10px]
                font-black
                uppercase
                tracking-[0.15em]

                text-cyan-300

                transition-all
                duration-300

                hover:border-cyan-300/30
                hover:text-white

                sm:px-6
              "
            >
              <FiGithub size={17} />

              Open Profile

              <FiArrowUpRight
                size={14}
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

        {/* =====================================================
            STATS
        ====================================================== */}

        <div
          className="
            mt-4

            grid
            grid-cols-2
            gap-3

            sm:gap-4

            lg:grid-cols-4
          "
        >
          <StatCard
            icon={<FiBookOpen size={19} />}
            value={formatNumber(user.public_repos)}
            label="Repositories"
            description="Public repositories available on GitHub."
          />

          <StatCard
            icon={<FiUsers size={19} />}
            value={formatNumber(user.followers)}
            label="Followers"
            description="Developers following this GitHub profile."
          />

          <StatCard
            icon={<FiUserPlus size={19} />}
            value={formatNumber(user.following)}
            label="Following"
            description="Developers and projects currently followed."
          />

          <StatCard
            icon={<FiStar size={19} />}
            value={formatNumber(totalStars)}
            label="Stars"
            description="Stars collected across loaded repositories."
          />
        </div>

        {/* =====================================================
            REPOSITORY PANEL
        ====================================================== */}

        <div
          className="
            mt-8

            overflow-hidden

            rounded-[30px]

            border
            border-white/[0.07]

            bg-white/[0.022]

            shadow-[0_30px_100px_rgba(0,0,0,0.25)]
          "
        >
          {/* panel header */}

          <div
            className="
              flex
              flex-col
              gap-4

              border-b
              border-white/[0.06]

              bg-black/20

              px-5
              py-5

              sm:flex-row
              sm:items-center
              sm:justify-between

              sm:px-7
            "
          >
            <div className="flex items-start gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center

                  rounded-xl

                  border
                  border-cyan-400/15

                  bg-cyan-400/[0.055]

                  text-cyan-300
                "
              >
                <FiLayers size={18} />
              </div>

              <div>
                <h3
                  className="
                    text-lg
                    font-black

                    tracking-tight

                    sm:text-xl
                  "
                >
                  Repository Network
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    leading-5
                    text-slate-600
                  "
                >
                  Latest public codebases and active development projects.
                </p>
              </div>
            </div>

            <div
              className="
                flex
                items-center
                gap-4

                text-[10px]
                font-bold
                text-slate-500
              "
            >
              <span className="inline-flex items-center gap-1.5">
                <FiStar className="text-cyan-300" />

                {formatNumber(totalStars)}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <FiGitBranch className="text-cyan-300" />

                {formatNumber(totalForks)}
              </span>

              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5

                  text-emerald-400/80
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                Live
              </span>
            </div>
          </div>

          {/* repository grid */}

          <div className="p-4 sm:p-6">
            {recentRepositories.length === 0 ? (
              <div
                className="
                  rounded-2xl

                  border
                  border-dashed
                  border-white/10

                  bg-black/20

                  p-8

                  text-center

                  text-sm
                  text-slate-600
                "
              >
                No public repositories were found.
              </div>
            ) : (
              <div
                className="
                  grid
                  gap-3

                  md:grid-cols-2

                  lg:gap-4
                "
              >
                {recentRepositories.map((repository, index) => (
                  <a
                    key={repository.id}
                    href={repository.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group

                      relative

                      flex
                      min-h-[210px]
                      flex-col

                      overflow-hidden

                      rounded-[22px]

                      border
                      border-white/[0.06]

                      bg-black/20

                      p-5

                      transition-all
                      duration-500

                      hover:-translate-y-1
                      hover:border-cyan-400/20
                      hover:bg-white/[0.035]
                    "
                  >
                    <div
                      aria-hidden="true"
                      className="
                        absolute
                        -right-20
                        -top-20

                        h-40
                        w-40

                        rounded-full

                        bg-cyan-400/[0.08]

                        opacity-0

                        blur-3xl

                        transition-opacity
                        duration-500

                        group-hover:opacity-100
                      "
                    />

                    <div className="relative z-10 flex h-full flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p
                            className="
                              mb-2

                              font-mono
                              text-[9px]

                              uppercase
                              tracking-[0.16em]

                              text-slate-700
                            "
                          >
                            Repository / {String(index + 1).padStart(2, "0")}
                          </p>

                          <h4
                            className="
                              truncate

                              text-base
                              font-black

                              text-white

                              transition-colors
                              duration-300

                              group-hover:text-cyan-300
                            "
                          >
                            {repository.name}
                          </h4>
                        </div>

                        <span
                          className="
                            shrink-0

                            rounded-lg

                            border
                            border-cyan-400/10

                            bg-cyan-400/[0.045]

                            px-2.5
                            py-1

                            text-[8px]
                            font-black
                            uppercase
                            tracking-[0.14em]

                            text-cyan-300/70
                          "
                        >
                          Public
                        </span>
                      </div>

                      <p
                        className="
                          mt-4

                          line-clamp-2

                          text-sm
                          leading-6

                          text-slate-600
                        "
                      >
                        {repository.description ||
                          "No repository description is available."}
                      </p>

                      <div
                        className="
                          mt-5

                          flex
                          flex-wrap
                          items-center
                          gap-2
                        "
                      >
                        {repository.language && (
                          <span
                            className="
                              rounded-lg

                              border
                              border-cyan-400/10

                              bg-cyan-400/[0.04]

                              px-2.5
                              py-1

                              text-[9px]
                              font-bold

                              text-cyan-300/70
                            "
                          >
                            {repository.language}
                          </span>
                        )}

                        <span
                          className="
                            inline-flex
                            items-center
                            gap-1.5

                            rounded-lg

                            border
                            border-white/[0.05]

                            bg-white/[0.02]

                            px-2.5
                            py-1

                            text-[9px]

                            text-slate-600
                          "
                        >
                          <FiStar size={11} />

                          {repository.stargazers_count}
                        </span>

                        <span
                          className="
                            inline-flex
                            items-center
                            gap-1.5

                            rounded-lg

                            border
                            border-white/[0.05]

                            bg-white/[0.02]

                            px-2.5
                            py-1

                            text-[9px]

                            text-slate-600
                          "
                        >
                          <FiGitBranch size={11} />

                          {repository.forks_count}
                        </span>
                      </div>

                      <div
                        className="
                          mt-auto

                          flex
                          items-center
                          justify-between

                          border-t
                          border-white/[0.05]

                          pt-4
                        "
                      >
                        <span
                          className="
                            font-mono
                            text-[9px]
                            text-slate-700
                          "
                        >
                          updated {formatDate(repository.updated_at)}
                        </span>

                        <span
                          className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center

                            rounded-lg

                            border
                            border-white/[0.06]

                            bg-white/[0.025]

                            text-slate-600

                            transition-all
                            duration-300

                            group-hover:border-cyan-400/20
                            group-hover:text-cyan-300
                          "
                        >
                          <FiArrowUpRight size={14} />
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}

            <div className="mt-7 flex justify-center">
              <a
                href={`${user.html_url}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group

                  inline-flex
                  min-h-11

                  items-center
                  justify-center
                  gap-2

                  rounded-full

                  border
                  border-white/[0.08]

                  bg-white/[0.025]

                  px-6
                  py-3

                  text-[9px]
                  font-black

                  uppercase
                  tracking-[0.15em]

                  text-slate-400

                  transition-all
                  duration-300

                  hover:border-cyan-400/20
                  hover:bg-cyan-400/[0.05]
                  hover:text-cyan-300
                "
              >
                <FiGithub size={15} />

                Explore Repository Network

                <FiArrowUpRight
                  size={13}
                  className="
                    transition-transform
                    duration-300

                    group-hover:translate-x-0.5
                  "
                />
              </a>
            </div>
          </div>
        </div>

        {/* =====================================================
            CONTRIBUTION MATRIX
        ====================================================== */}

        <section
          aria-labelledby="github-contributions-heading"
          className="
            relative

            mt-8

            overflow-hidden

            rounded-[30px]

            border
            border-white/[0.07]

            bg-white/[0.022]

            shadow-[0_30px_100px_rgba(0,0,0,0.28)]
          "
        >
          {/* calendar top */}

          <div
            className="
              flex
              flex-col
              gap-5

              border-b
              border-white/[0.06]

              bg-black/25

              px-5
              py-5

              sm:flex-row
              sm:items-center
              sm:justify-between

              sm:px-7
            "
          >
            <div className="flex items-start gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0

                  items-center
                  justify-center

                  rounded-xl

                  border
                  border-cyan-400/15

                  bg-cyan-400/[0.055]

                  text-cyan-300
                "
              >
                <FiActivity size={18} />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3
                    id="github-contributions-heading"
                    className="
                      text-lg
                      font-black

                      tracking-tight

                      sm:text-xl
                    "
                  >
                    Developer Activity Matrix
                  </h3>

                  <span
                    className="
                      rounded-full

                      border
                      border-emerald-400/10

                      bg-emerald-400/[0.045]

                      px-2.5
                      py-1

                      text-[8px]
                      font-black

                      uppercase
                      tracking-wider

                      text-emerald-300/80
                    "
                  >
                    Live
                  </span>
                </div>

                <p
                  className="
                    mt-1

                    text-xs
                    leading-5

                    text-slate-600
                  "
                >
                  GitHub contribution frequency and development consistency.
                </p>
              </div>
            </div>

            <div
              className="
                flex
                items-center
                gap-2

                font-mono
                text-[9px]
                uppercase
                tracking-[0.12em]

                text-slate-700
              "
            >
              <FiCommand />

              contribution.timeline
            </div>
          </div>

          <div className="p-4 sm:p-6">
            <GitHubContributionChart
              username={user.login}
              profileUrl={user.html_url}
            />
          </div>
        </section>

        {/* bottom status */}

        <div
          className="
            mt-6

            flex
            flex-col
            items-center
            justify-between
            gap-3

            border-t
            border-white/[0.04]

            pt-6

            text-center

            sm:flex-row
            sm:text-left
          "
        >
          <div
            className="
              flex
              items-center
              gap-2

              text-[9px]
              font-bold

              uppercase
              tracking-[0.14em]

              text-slate-700
            "
          >
            <FiZap className="text-cyan-400/60" />

            GitHub data cached for performance
          </div>

          <span
            className="
              font-mono
              text-[9px]

              text-slate-800
            "
          >
            github://{user.login}/activity
          </span>
        </div>
      </div>
    </section>
  );
}