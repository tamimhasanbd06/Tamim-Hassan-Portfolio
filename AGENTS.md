<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:portfolio-workflow-rules -->
# Portfolio permanent workflow: Inspect → Implement → Verify → Review Diff → Commit → Push → Confirm

## Design system (source of truth)
- Theme tokens live in `src/app/globals.css` `:root`
  (`--bg-primary`, `--bg-gradient-from/via`, `--bg-card`, `--accent-cyan/blue`,
  `--text-primary/secondary/muted`, `--border-subtle`, `--glass-surface`).
- Type scale tokens: `--type-display/h2/h3/body/body-lg/meta/micro` (same file).
  Never add a new body size below 14px (`text-sm`) or an interactive label
  below 10px. Decorative 8/9px labels are lifted to a 10px floor by a
  `globals.css` rule — do not reintroduce smaller text.
- Buttons: `ui-button-primary/secondary/ghost/danger` in `globals.css`, or
  `ActionButton` (`src/components/ui/ActionButton.tsx`, variants
  primary/secondary/outline/ghost/glow/danger). Back-to-Top buttons are removed
  project-wide — do not re-add them.
- Page backdrop: rendered exactly once in `src/app/layout.tsx` via
  `<PageBackground />`. Pages must NOT paint their own page background and must
  not carry `overflow-x-clip`/`overflow-hidden` on page-root `<main>`
  (the shared `.theme-content` wrapper clips instead).

## Before changing assets
- Project screenshots come from `public/Main/Project-Gallery.json` (`image` field).
  Verify the file/URL exists before touching image code. `next.config.ts` allows
  `https://ghchart.rshah.org` in `img-src` (CSP) — keep it if the contribution
  chart stays. Never invent asset URLs.

## Checks (run for every completed batch)
- `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`
  (or `npm run verify` for all four). Never claim green without running them.
- Typecheck covers test files (`scripts/*.test.ts` import from
  `../src/...`, matching `admin-auth.test.ts` convention).

## Git rules
- Branch: `main` → `origin` (`tamimhasanbd06/Tamim-Hassan-Portfolio`).
  Never force-push, reset-hard, or discard unrelated work.
- Never stage/commit `.env*`, credentials, secrets, `node_modules`, `.next`.
- One focused commit per logical batch, then `git fetch` + push + verify
  `git rev-parse HEAD` == `git rev-parse origin/main`.
- Report: commit hash, files, check results, push status. Browser checks only
  count if a browser was actually used — otherwise say so explicitly.
<!-- END:portfolio-workflow-rules -->
