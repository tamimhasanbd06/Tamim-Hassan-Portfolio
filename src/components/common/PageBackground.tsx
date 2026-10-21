/**
 * One shared, page-level ambient background for the entire portfolio.
 *
 * Rendered exactly once, in `src/app/layout.tsx`, behind every route:
 * public pages, CV/resume, login, messages, posts and the dashboard.
 *
 * Design rules:
 * - Deep theme base colour from the existing token palette, never a new palette.
 * - Two low-opacity radial lights (cyan top-left, blue bottom-right) at very low
 *   alpha, so content stays the focus.
 * - An extremely subtle grid that fades out at the edges.
 * - No animation, so no reduced-motion handling is needed and nothing repaints.
 * - Purely decorative: `aria-hidden`, `pointer-events-none`, `fixed`, and the
 *   parent `.theme-background` sits at `z-index: -1` inside an isolated stacking
 *   context, so it can never cover content or swallow clicks.
 *
 * Pages must NOT render their own background; they inherit this one.
 */
export default function PageBackground() {
  return (
    <div className="page-backdrop" aria-hidden="true">
      {/* Base vertical wash: keeps the theme's navy-to-ink gradient */}
      <div className="page-backdrop__base" />

      {/* Ambient radial lighting — very low alpha, large and soft */}
      <div className="page-backdrop__glow page-backdrop__glow--cyan" />
      <div className="page-backdrop__glow page-backdrop__glow--blue" />

      {/* Extremely subtle texture, masked out at the edges */}
      <div className="page-backdrop__grid" />

      {/* Bottom vignette so long pages do not end on a hard edge */}
      <div className="page-backdrop__vignette" />
    </div>
  );
}
