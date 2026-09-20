"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type PortfolioRunnerProps = { onRetry: () => void };
type RunnerState = { playerY: number; obstacleX: number; score: number; highScore: number; running: boolean; paused: boolean };

const INITIAL_STATE: RunnerState = { playerY: 0, obstacleX: 100, score: 0, highScore: 0, running: false, paused: false };

/** A small original offline activity; it never gates the portfolio. */
export default function PortfolioRunner({ onRetry }: PortfolioRunnerProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const [game, setGame] = useState<RunnerState>(INITIAL_STATE);
  const gameRef = useRef<RunnerState>(INITIAL_STATE);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const sync = useCallback((next: RunnerState) => { gameRef.current = next; setGame(next); }, []);
  const jump = useCallback(() => {
    const current = gameRef.current;
    if (reduceMotion || current.paused || current.playerY > 1) return;
    sync({ ...current, playerY: 42, running: true });
  }, [reduceMotion, sync]);
  const restart = useCallback(() => { lastTimeRef.current = null; sync({ ...INITIAL_STATE, highScore: gameRef.current.highScore, running: true }); }, [sync]);
  const togglePause = useCallback(() => { const current = gameRef.current; if (current.running) sync({ ...current, paused: !current.paused }); }, [sync]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === " " || event.key === "ArrowUp") { event.preventDefault(); jump(); }
      if (event.key.toLowerCase() === "p") togglePause();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [jump, togglePause]);

  useEffect(() => {
    if (reduceMotion || !game.running || game.paused) return;
    const tick = (timestamp: number) => {
      const previous = lastTimeRef.current ?? timestamp;
      const delta = Math.min(timestamp - previous, 48);
      lastTimeRef.current = timestamp;
      const current = gameRef.current;
      if (!current.running || current.paused) return;
      const playerY = Math.max(0, current.playerY - delta * 0.12);
      let obstacleX = current.obstacleX - delta * 0.035;
      let score = current.score + delta * 0.012;
      let running = true;
      if (obstacleX < -10) obstacleX = 108;
      if (obstacleX > 11 && obstacleX < 27 && playerY < 18) running = false;
      if (!running) score = Math.floor(score);
      sync({ playerY, obstacleX, score, highScore: Math.max(current.highScore, Math.floor(score)), running, paused: current.paused });
      frameRef.current = window.requestAnimationFrame(tick);
    };
    frameRef.current = window.requestAnimationFrame(tick);
    return () => { if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current); frameRef.current = null; };
  }, [game.paused, game.running, reduceMotion, sync]);

  const status = reduceMotion ? "Reduced motion is enabled — the game is paused." : game.running ? game.paused ? "Paused" : "Tap the arena or press Space to jump" : game.score > 0 ? "Signal lost — run ended. Restart when ready." : "Tap the arena or press Space to begin";
  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-cyan-400/20 bg-white/[0.035] p-5 text-center shadow-[0_25px_70px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-7">
      <p className="text-[] font-black uppercase tracking-[0.2em] text-cyan-300">Connection timeout</p>
      <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">Keep the signal moving</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">The live GitHub request is taking longer than expected. This small offline runner is optional; your portfolio content remains available.</p>
      <button type="button" onClick={jump} disabled={reduceMotion} aria-label="Jump in the offline runner game" className="relative mt-6 h-40 w-full overflow-hidden rounded-2xl border border-white/10 bg-[#020817] text-left disabled:cursor-not-allowed sm:h-48">
        <span className="absolute inset-x-0 bottom-8 h-px bg-cyan-300/40" /><span className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-cyan-500/10 to-transparent" />
        <span aria-hidden="true" className="absolute bottom-8 left-[18%] h-7 w-7 rounded-lg border border-cyan-200/70 bg-cyan-400/20 shadow-[0_0_18px_rgba(34,211,238,0.45)] transition-transform duration-75" style={{ transform: `translateY(-${game.playerY}px)` }} />
        <span aria-hidden="true" className="absolute bottom-8 h-10 w-4 rounded-t-md border border-blue-300/70 bg-blue-400/30" style={{ left: `${game.obstacleX}%` }} />
        <span className="absolute left-4 top-4 text-xs font-bold text-slate-300">Score {Math.floor(game.score)}</span><span className="absolute right-4 top-4 text-xs font-bold text-slate-500">Best {game.highScore}</span>
      </button>
      <p className="mt-3 text-xs text-slate-500">{status} Use P to pause.</p>
      <div className="mt-5 flex flex-col justify-center gap-3 min-[]:flex-row">
        <button type="button" onClick={restart} disabled={reduceMotion} className="min-h-11 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.05] px-5 text-sm font-semibold text-cyan-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50">Restart runner</button>
        <button type="button" onClick={togglePause} disabled={!game.running || reduceMotion} className="min-h-11 rounded-xl border border-white/10 bg-white/[0.03] px-5 text-sm font-semibold text-slate-300 transition hover:border-cyan-400/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-50">{game.paused ? "Resume" : "Pause"}</button>
        <button type="button" onClick={onRetry} className="min-h-11 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.05] px-5 text-sm font-semibold text-cyan-300 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white">Retry GitHub</button>
      </div>
    </div>
  );
}
