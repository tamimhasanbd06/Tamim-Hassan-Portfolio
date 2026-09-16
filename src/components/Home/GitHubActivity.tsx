"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FiChevronRight,
  FiGitBranch,
  FiGithub,
  FiStar,
  FiUsers,
  FiUserPlus,
  FiBookOpen,
  FiCode,
} from "react-icons/fi";

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
   GITHUB API
========================================================= */

async function fetchGitHub<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${GITHUB_API}${endpoint}`, {
    headers: {
      Accept: "application/vnd.github+json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
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

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

/* =========================================================
   COMPONENT
========================================================= */

export default function GitHubActivity() {
  const reduceMotion = useReducedMotion();

  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<
    GitHubRepository[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contributionUnavailable, setContributionUnavailable] =
    useState(false);

  /* =======================================================
     LOAD GITHUB DATA
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadGitHubData() {
      try {
        setLoading(true);
        setError(null);

        const [profile, repos] = await Promise.all([
          fetchGitHub<GitHubUser>(
            `/users/${GITHUB_USERNAME}`
          ),

          fetchGitHub<GitHubRepository[]>(
            `/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=100`
          ),
        ]);

        if (cancelled) return;

        setUser(profile);

        setRepositories(
          repos.filter((repository) => !repository.private)
        );
      } catch (err) {
        if (cancelled) return;

        console.error(
          "Failed to load GitHub data:",
          err
        );

        setError(
          "Unable to load GitHub activity right now."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadGitHubData();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =======================================================
     TOTAL STARS
  ======================================================= */

  const totalStars = useMemo(
    () =>
      repositories.reduce(
        (total, repository) =>
          total + repository.stargazers_count,
        0
      ),
    [repositories]
  );

  /* =======================================================
     TOTAL FORKS
  ======================================================= */

  const totalForks = useMemo(
    () =>
      repositories.reduce(
        (total, repository) =>
          total + repository.forks_count,
        0
      ),
    [repositories]
  );

  /* =======================================================
     LOADING STATE
  ======================================================= */

  if (loading) {
    return (
      <section
        id="github"
        aria-label="GitHub Activity"
        className="
          relative
          w-full
          overflow-hidden
          bg-gradient-to-b
          from-black
          via-[var(--bg-card)]
          to-black
          px-4
          py-20
          text-white
          sm:px-6
          sm:py-24
          lg:px-8
        "
      >
        {/* Background Glow */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-[600px]
            w-[900px]
            -translate-x-1/2
            rounded-full
            bg-cyan-500/[0.055]
            blur-[150px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.055]
            [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]
            [background-size:55px_55px]
          "
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="animate-pulse space-y-8">
            <div className="mx-auto h-8 w-52 rounded-full bg-white/10" />

            <div className="mx-auto h-4 w-80 max-w-full rounded bg-white/10" />

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {Array.from({ length: 4 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="
                      h-32
                      rounded-3xl
                      border
                      border-white/10
                      bg-white/[0.025]
                    "
                  />
                )
              )}
            </div>

            <div
              className="
                h-72
                rounded-3xl
                border
                border-white/10
                bg-white/[0.025]
              "
            />
          </div>
        </div>
      </section>
    );
  }

  /* =======================================================
     ERROR STATE
  ======================================================= */

  if (error || !user) {
    return (
      <section
        id="github"
        aria-label="GitHub Activity"
        className="
          relative
          w-full
          overflow-hidden
          bg-gradient-to-b
          from-black
          via-[var(--bg-card)]
          to-black
          px-4
          py-20
          text-white
          sm:px-6
          sm:py-24
          lg:px-8
        "
      >
        {/* Glow */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-[500px]
            w-[800px]
            -translate-x-1/2
            rounded-full
            bg-cyan-500/[0.04]
            blur-[150px]
          "
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div
            className="
              rounded-3xl
              border
              border-cyan-400/15
              bg-white/[0.025]
              p-8
              text-center
              shadow-[0_25px_70px_rgba(34,211,238,0.05)]
            "
          >
            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-cyan-400/20
                bg-cyan-400/[0.06]
                text-cyan-300
              "
            >
              <FiGithub size={26} />
            </div>

            <h2 className="mt-5 text-2xl font-black">
              GitHub Activity
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
              {error ??
                "GitHub profile data is unavailable."}
            </p>

            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-6
                inline-flex
                items-center
                gap-2.5
                rounded-full
                border
                border-cyan-400/20
                bg-cyan-400/[0.05]
                px-6
                py-3
                text-[10px]
                font-black
                uppercase
                tracking-[0.16em]
                text-cyan-300
                transition-all
                duration-300
                hover:border-cyan-400/40
                hover:bg-cyan-400/[0.1]
                hover:text-white
              "
            >
              <FiGithub size={17} />
              Visit GitHub
            </a>
          </div>
        </div>
      </section>
    );
  }

  /* =======================================================
     MAIN UI
  ======================================================= */

  return (
    <section
      id="github"
      aria-labelledby="github-heading"
      className="
        relative
        w-full
        overflow-hidden
        bg-gradient-to-b
        from-black
        via-[var(--bg-card)]
        to-black
        px-4
        py-20
        text-white
        sm:px-6
        sm:py-24
        lg:px-8
      "
    >
      {/* ===================================================
          BACKGROUND GLOW
      =================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-[600px]
          w-[900px]
          -translate-x-1/2
          rounded-full
          bg-cyan-500/[0.055]
          blur-[150px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          h-[500px]
          w-[800px]
          -translate-x-1/2
          rounded-full
          bg-blue-500/[0.045]
          blur-[150px]
        "
      />

      {/* ===================================================
          GRID BACKGROUND
      =================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.055]
          [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]
          [background-size:55px_55px]
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge */}

          <div
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-cyan-400/20
              bg-cyan-400/[0.05]
              px-4
              py-2
            "
          >
            <span
              className="
                h-2
                w-2
                rounded-full
                bg-cyan-400
                shadow-[0_0_14px_rgba(34,211,238,0.8)]
              "
            />

            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.22em]
                text-cyan-300
                sm:text-xs
              "
            >
              Open Source & Development
            </span>
          </div>

          {/* Heading */}

          <h2
            id="github-heading"
            className="
              text-3xl
              font-black
              tracking-tight
              sm:text-4xl
              lg:text-5xl
            "
          >
            GitHub{" "}

            <span
              className="
                bg-gradient-to-r
                from-blue-400
                via-cyan-300
                to-sky-400
                bg-clip-text
                text-transparent
              "
            >
              Activity
            </span>
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-slate-400
              sm:text-base
            "
          >
            Explore my public repositories, development
            work, and open-source presence on GitHub.
          </p>
        </motion.div>

        {/* =================================================
            PROFILE CARD
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            mt-14
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-white/[0.025]
            p-5
            shadow-[0_25px_70px_rgba(0,0,0,0.2)]
            transition-all
            duration-300
            hover:border-cyan-400/20
            hover:bg-white/[0.04]
            md:p-7
          "
        >
          <div
            className="
              flex
              flex-col
              gap-6
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            {/* User */}

            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div
                  className="
                    absolute
                    -inset-1
                    rounded-2xl
                    bg-cyan-400/10
                    blur-md
                  "
                />

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.avatar_url}
                  alt={`${user.login} GitHub avatar`}
                  width={72}
                  height={72}
                  loading="lazy"
                  className="
                    relative
                    h-[72px]
                    w-[72px]
                    rounded-2xl
                    border
                    border-cyan-400/15
                    object-cover
                  "
                />
              </div>

              <div>
                <h3 className="text-xl font-black">
                  {user.name || user.login}
                </h3>

                <p className="mt-1 text-sm text-cyan-300/70">
                  @{user.login}
                </p>

                {user.bio && (
                  <p
                    className="
                      mt-2
                      max-w-xl
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >
                    {user.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Profile Button */}

            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                shrink-0
                items-center
                justify-center
                gap-2.5
                rounded-full
                border
                border-cyan-400/20
                bg-cyan-400/[0.05]
                px-6
                py-3
                text-[10px]
                font-black
                uppercase
                tracking-[0.16em]
                text-cyan-300
                transition-all
                duration-300
                hover:border-cyan-400/40
                hover:bg-cyan-400/[0.1]
                hover:text-white
              "
            >
              <FiGithub size={17} />
              View Profile
            </a>
          </div>
        </motion.div>

        {/* =================================================
            STATISTICS
        ================================================= */}

        <div
          className="
            mt-6
            grid
            grid-cols-2
            gap-4
            md:grid-cols-4
          "
        >
          {/* Repositories */}

          <motion.div
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.5,
              delay: 0.02,
            }}
            className="
              group
              rounded-3xl
              border
              border-white/10
              bg-white/[0.025]
              p-5
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-cyan-400/25
              hover:bg-white/[0.045]
            "
          >
            <div
              className="
                mb-4
                inline-flex
                rounded-2xl
                border
                border-cyan-400/15
                bg-cyan-400/[0.06]
                p-3
                text-cyan-300
                transition-all
                duration-300
                group-hover:border-cyan-300/35
                group-hover:bg-cyan-400/10
              "
            >
              <FiBookOpen size={19} />
            </div>

            <p className="text-2xl font-black">
              {formatNumber(user.public_repos)}
            </p>

            <p className="mt-1 text-[11px] text-slate-500">
              Public Repositories
            </p>
          </motion.div>

          {/* Followers */}

          <motion.div
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.5,
              delay: 0.07,
            }}
            className="
              group
              rounded-3xl
              border
              border-white/10
              bg-white/[0.025]
              p-5
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-cyan-400/25
              hover:bg-white/[0.045]
            "
          >
            <div
              className="
                mb-4
                inline-flex
                rounded-2xl
                border
                border-cyan-400/15
                bg-cyan-400/[0.06]
                p-3
                text-cyan-300
                transition-all
                duration-300
                group-hover:border-cyan-300/35
                group-hover:bg-cyan-400/10
              "
            >
              <FiUsers size={19} />
            </div>

            <p className="text-2xl font-black">
              {formatNumber(user.followers)}
            </p>

            <p className="mt-1 text-[11px] text-slate-500">
              Followers
            </p>
          </motion.div>

          {/* Following */}

          <motion.div
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.5,
              delay: 0.12,
            }}
            className="
              group
              rounded-3xl
              border
              border-white/10
              bg-white/[0.025]
              p-5
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-cyan-400/25
              hover:bg-white/[0.045]
            "
          >
            <div
              className="
                mb-4
                inline-flex
                rounded-2xl
                border
                border-cyan-400/15
                bg-cyan-400/[0.06]
                p-3
                text-cyan-300
                transition-all
                duration-300
                group-hover:border-cyan-300/35
                group-hover:bg-cyan-400/10
              "
            >
              <FiUserPlus size={19} />
            </div>

            <p className="text-2xl font-black">
              {formatNumber(user.following)}
            </p>

            <p className="mt-1 text-[11px] text-slate-500">
              Following
            </p>
          </motion.div>

          {/* Stars */}

          <motion.div
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.5,
              delay: 0.17,
            }}
            className="
              group
              rounded-3xl
              border
              border-white/10
              bg-white/[0.025]
              p-5
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-cyan-400/25
              hover:bg-white/[0.045]
            "
          >
            <div
              className="
                mb-4
                inline-flex
                rounded-2xl
                border
                border-cyan-400/15
                bg-cyan-400/[0.06]
                p-3
                text-cyan-300
                transition-all
                duration-300
                group-hover:border-cyan-300/35
                group-hover:bg-cyan-400/10
              "
            >
              <FiStar size={19} />
            </div>

            <p className="text-2xl font-black">
              {formatNumber(totalStars)}
            </p>

            <p className="mt-1 text-[11px] text-slate-500">
              Stars · Loaded Repos
            </p>
          </motion.div>
        </div>

        {/* =================================================
            REPOSITORIES
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            mt-8
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-white/[0.025]
            p-5
            shadow-[0_25px_70px_rgba(0,0,0,0.2)]
            md:p-7
          "
        >
          {/* Repository Header */}

          <div
            className="
              mb-6
              flex
              flex-col
              gap-4
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <div className="flex items-center gap-2">
                <FiCode
                  className="text-cyan-300"
                  size={17}
                />

                <h3 className="text-xl font-black">
                  Recent Repositories
                </h3>
              </div>

              <p className="mt-2 text-sm text-slate-500">
              The six most recently updated public repositories from GitHub.
              </p>
            </div>

            <div
              className="
                flex
                items-center
                gap-4
                text-xs
                text-slate-500
              "
            >
              <span className="inline-flex items-center gap-1.5">
                <FiStar
                  className="text-cyan-300"
                  size={16}
                />
                {formatNumber(totalStars)}
              </span>

              <span className="inline-flex items-center gap-1.5">
                <FiGitBranch
                  className="text-cyan-300"
                  size={16}
                />
                {formatNumber(totalForks)}
              </span>
            </div>
          </div>

          {/* Repository Cards */}

          {repositories.length === 0 ? (
            <div
              className="
                rounded-2xl
                border
                border-dashed
                border-white/10
                bg-black/20
                p-8
                text-center
              "
            >
              <p className="text-sm text-slate-500">
                No public repositories were found.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {repositories.slice(0, 6).map(
                (repository, index) => (
                  <motion.a
                    key={repository.id}
                    href={repository.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{
                      opacity: 0,
                      y: reduceMotion ? 0 : 18,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.1,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.04,
                    }}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -4,
                          }
                    }
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.02]
                      p-5
                      transition-all
                      duration-300
                      hover:border-cyan-400/25
                      hover:bg-white/[0.045]
                    "
                  >
                    {/* Card Glow */}

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        -right-16
                        -top-16
                        h-32
                        w-32
                        rounded-full
                        bg-cyan-400/10
                        opacity-0
                        blur-3xl
                        transition-opacity
                        duration-500
                        group-hover:opacity-100
                      "
                    />

                    <div className="relative z-10">
                      {/* Top */}

                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-4
                        "
                      >
                        <div className="min-w-0">
                          <h4
                            className="
                              truncate
                              font-black
                              text-white
                              transition-colors
                              group-hover:text-cyan-300
                            "
                          >
                            {repository.name}
                          </h4>
                        </div>

                        <span
                          className="
                            shrink-0
                            rounded-full
                            border
                            border-cyan-400/10
                            bg-cyan-400/[0.045]
                            px-2.5
                            py-1
                            text-[8px]
                            font-bold
                            uppercase
                            tracking-[0.14em]
                            text-cyan-300/80
                          "
                        >
                          Public
                        </span>
                      </div>

                      {/* Description */}

                      <p
                        className="
                          mt-3
                          min-h-10
                          text-sm
                          leading-6
                          text-slate-500
                        "
                      >
                        {repository.description ||
                          "No description provided for this repository."}
                      </p>

                      {/* Meta */}

                      <div
                        className="
                          mt-5
                          flex
                          flex-wrap
                          items-center
                          gap-x-4
                          gap-y-2
                          text-[10px]
                          text-slate-600
                        "
                      >
                        {repository.language && (
                          <span
                            className="
                              rounded-full
                              border
                              border-cyan-400/10
                              bg-cyan-400/[0.045]
                              px-2.5
                              py-1
                              font-bold
                              uppercase
                              tracking-wider
                              text-cyan-300/70
                            "
                          >
                            {repository.language}
                          </span>
                        )}

                        <span className="inline-flex items-center gap-1.5">
                          <FiStar
                            className="text-cyan-300/70"
                            size={14}
                          />

                          {formatNumber(
                            repository.stargazers_count
                          )}
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <FiGitBranch
                            className="text-cyan-300/70"
                            size={14}
                          />

                          {formatNumber(
                            repository.forks_count
                          )}
                        </span>

                        <span>
                          Updated{" "}
                          {formatDate(
                            repository.updated_at
                          )}
                        </span>
                      </div>

                      {/* Bottom */}

                      <div
                        className="
                          mt-5
                          flex
                          items-center
                          justify-between
                          border-t
                          border-white/[0.06]
                          pt-4
                        "
                      >
                        <span
                          className="
                            text-[8px]
                            font-bold
                            uppercase
                            tracking-[0.15em]
                            text-slate-600
                          "
                        >
                          View Repository
                        </span>

                        <FiChevronRight
                          className="
                            text-slate-700
                            transition-all
                            duration-300
                            group-hover:translate-x-1
                            group-hover:text-cyan-300
                          "
                          size={16}
                        />
                      </div>
                    </div>
                  </motion.a>
                )
              )}
            </div>
          )}

          {/* =================================================
              EXPLORE ALL
          ================================================= */}

          <div className="mt-8 flex justify-center">
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                inline-flex
                items-center
                gap-2.5
                rounded-full
                border
                border-cyan-400/20
                bg-cyan-400/[0.05]
                px-6
                py-3
                text-[10px]
                font-black
                uppercase
                tracking-[0.16em]
                text-cyan-300
                shadow-[0_0_30px_rgba(34,211,238,0.05)]
                transition-all
                duration-300
                hover:border-cyan-400/40
                hover:bg-cyan-400/[0.1]
                hover:text-white
                hover:shadow-[0_0_35px_rgba(34,211,238,0.1)]
              "
            >
              <FiGithub size={17} />

              <span>
                Explore All Repositories
              </span>

              <FiChevronRight
                size={15}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-5 shadow-[0_25px_70px_rgba(0,0,0,0.2)] md:p-7"
        >
          <div className="mb-6 flex items-center gap-2">
            <FiGithub className="text-cyan-300" size={17} />
            <div>
              <h3 className="text-xl font-black">GitHub Contributions</h3>
              <p className="mt-1 text-sm text-slate-500">Live public contribution activity from GitHub.</p>
            </div>
          </div>
          {contributionUnavailable ? (
            <p className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-6 text-center text-sm text-slate-500">
              Contribution activity is unavailable right now. Visit the GitHub
              profile to view the latest public activity.
            </p>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`https://ghchart.rshah.org/00dffd/${user.login}`}
              alt={`${user.login}'s GitHub contribution chart`}
              className="w-full rounded-2xl border border-white/[0.06] bg-black/20 p-3 object-contain brightness-110"
              loading="lazy"
              onError={() => setContributionUnavailable(true)}
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}


