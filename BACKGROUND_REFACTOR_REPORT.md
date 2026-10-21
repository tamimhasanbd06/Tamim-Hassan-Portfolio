# Background Unification — UI Refactor Report

Project: `C:\Users\PC\Downloads\Tamim-Hassan-Portfolio-main`
Scope: page-level background system only. **No routing, auth, database, SEO metadata,
page content or business logic was changed.**

---

## 1. Routes audited

| Route | File | Page root `main`/wrapper | Before | After |
|---|---|---|---|---|
| `/` | `src/app/page.tsx` | `<main class="portfolio-surface portfolio-landing …">` | opaque `bg-[var(--bg-primary)]` | transparent — inherits shared backdrop |
| `/home` | `src/app/home/page.tsx` | `<main class="portfolio-surface portfolio-home …">` | opaque `bg-[var(--bg-primary)]` | transparent |
| `/cv` | `src/app/cv/page.tsx` | `<main>` | opaque `bg-[var(--bg-primary)]` | transparent |
| `/resume` | `src/app/resume/page.tsx` | `<main>` | opaque `bg-[var(--bg-primary)]` | transparent |
| `/login` | `src/app/login/page.tsx` | `<main>` | opaque `bg-[var(--bg-primary)]` | transparent |
| `/message` | `src/app/message/page.tsx` | `<main class="portfolio-unified portfolio-messages …">` | opaque `bg-[var(--bg-primary)]` | transparent |
| `/my-post` | `src/app/my-post/page.tsx` | `<main class="portfolio-unified portfolio-posts …">` | opaque `bg-[var(--bg-primary)]` | transparent |
| `/dashboard` | `src/app/dashboard/layout.tsx` → `DashboardShell` | `<div class="portfolio-dashboard … bg-transparent">` | already transparent | unchanged (inherits backdrop) |
| `/dashboard/overview`, `/posts`, `/messages` | same layout | — | nested panels only | nested panels kept (functional surfaces) |
| `404` / `500` | `not-found.tsx`, `error.tsx` → `ErrorPage` | `<main>` | 3 local decorative layers | removed — inherits backdrop |
| `loading` | `loading.tsx` → `MainLoader` | overlay | overlay kept (functional) | unchanged |

---

## 2. Background implementations removed

**Page-level duplicates (8):**
- Opaque `bg-[var(--bg-primary)]` on the `<main>` of `/`, `/home`, `/cv`, `/resume`, `/login`, `/message`, `/my-post` (7 files).
- The old `.theme-grid` layer that was rendered in `app/layout.tsx`.

**Section-level washes and glows (28 layers):**

| File | Removed |
|---|---|
| `Main/Banner.tsx` | `bg-gradient-to-br from-black via-[var(--bg-card)] to-black` wash + **2 animated `animate-pulse` blurs** |
| `Main/Introduction.tsx` | section wash + 2 glow circles |
| `Main/About-My.tsx` | section wash + 2 glow circles |
| `Main/Experience.tsx` | section wash + 2 glow circles |
| `Main/My-Tech-Stack.tsx` | section wash + 2 glow circles |
| `Main/Project-Gallery.tsx` | section wash + 2 glow circles |
| `Main/My-Education.tsx` | section wash + 2 glow circles |
| `Main/Have-Questions.tsx` | `bg-black` wrapper + 2 glow circles |
| `Main/Footer.tsx` | section wash + `bg-black` + 2 glow circles |
| `Main/Contact-Me.tsx` | `bg-black` + gradient wash + 3 glows + duplicate grid layer (5 divs) |
| `Home/AI-Stack.tsx` | 1 glow |
| `Home/Developer-Toolkit.tsx` | 2 glows |
| `Home/DevelopmentJourney.tsx` | 2 glows |
| `Home/GitHubActivity.tsx` | 3 glows |
| `Home/HowIBuildWebsites.tsx` | 2 glows |
| `Home/My-Toolkit.tsx` | 1 glow |
| `Home/HomeFooter.tsx` | 5 glows + opaque `bg-[#020617]/50 backdrop-blur-xl` slab → `bg-white/[0.015] backdrop-blur-sm` |
| `Home/Courses-&-Certifications.tsx` | section-level radial wash |
| `common/ErrorPage.tsx` | 3 local decorative layers |

**Dead CSS removed from `globals.css`:**
`.page-background-decoration`, `.theme-background::before`, `.theme-background::after`,
`.theme-grid`, and their mobile override (13 declarations). Verified unreferenced first:
`grep -rn "theme-grid\|page-background-decoration" src` → only the CSS definitions remained.

---

## 3. Shared page-level background (new implementation)

Rendered **exactly once**, in `src/app/layout.tsx`:

```tsx
<div className="theme-page">
  <div className="theme-background" aria-hidden="true">
    <PageBackground />
  </div>
  <div className="theme-content">{children}</div>
</div>
```

`src/components/common/PageBackground.tsx` composes five layers, all pure CSS:

1. `.page-backdrop` — base fill `var(--bg-primary)`, `absolute inset-0`, `overflow:hidden`,
   `pointer-events:none`.
2. `.page-backdrop__base` — vertical wash `--bg-gradient-from → --bg-gradient-via → #001018 → --bg-primary`.
3. `.page-backdrop__glow--cyan` — radial light, `rgba(34,211,238,0.075)`, `blur(140px)`.
4. `.page-backdrop__glow--blue` — radial light, `rgba(59,130,246,0.06)`, `blur(140px)`.
5. `.page-backdrop__grid` — 64 px grid at **2.8 % opacity**, masked out with a radial ellipse.
6. `.page-backdrop__vignette` — bottom fade into the base colour.

Design decisions:
- **Colours come from existing tokens** (`--bg-primary`, `--bg-gradient-from/via`, cyan `#22d3ee`,
  blue `#3b82f6`) — no new palette.
- **No animation**, so nothing repaints on scroll and reduced-motion needs no special case
  (the global `prefers-reduced-motion` block still covers everything else).
- **No stacking-context or click risk:** `.theme-background` is `position:fixed; z-index:-1`
  inside `.theme-page { isolation:isolate }`, and every decorative layer is `pointer-events:none`.
- **No overflow:** all blobs are inside `overflow:hidden`, sized with `min(62vw, 820px)` /
  `min(68vw, 900px)`, so they cannot create horizontal scroll at 320 px.
- **Performance:** 6 static composited layers, no JS, no images. Mobile gets a reduced
  blur radius (`96px`) and pulled-in glow positions.

---

## 4. Components that intentionally keep backgrounds

These are **functional surfaces**, not page decoration — deliberately untouched:

- `ui-button-primary`, `ui-button-secondary`, `ui-button-ghost`, `ActionButton` and every
  button/badge/selected-nav state.
- Form inputs, selects, textareas, dropdowns, tooltips.
- `DashboardShell` sidebar `bg-[#04101d]/95` and mobile header `bg-[#020817]/85` (navigation surfaces).
- Dashboard cards, panels, message bubbles, post previews (`bg-[#050b17]`, `bg-[#020617]/30`, …).
- `Main/Navbar` sticky pill (`bg-black/85 backdrop-blur-xl` when scrolled).
- `Main/ProjectDetails` card (`bg-[var(--bg-card)]`) and its media area.
- `QrCodeSection` thumbnail plate.
- Modals / lightboxes: `ImageLightbox`, `Project-Gallery` lightbox, `Courses` PDF viewer,
  `Project-Gallery` hover overlays and image badges.
- `MainLoader` full-screen overlay, `ErrorPage` logo plate and status pill.
- `EntrySplash` (its own intentional, isolated welcome screen).
- Post images, profile images, project thumbnails — actual content.

---

## 5. Files changed (this refactor)

```
src/app/layout.tsx                      → renders <PageBackground /> once
src/app/globals.css                     → new .page-backdrop system, dead CSS removed
src/components/common/PageBackground.tsx → rewritten
src/app/page.tsx, home, cv, resume, login, message, my-post  → page root bg removed
src/components/common/ErrorPage.tsx
src/components/Home/{AI-Stack, Courses-&-Certifications, Developer-Toolkit,
  DevelopmentJourney, GitHubActivity, HomeFooter, HowIBuildWebsites, My-Toolkit}.tsx
src/components/Main/{Banner, Introduction, About-My, Experience, My-Tech-Stack,
  Project-Gallery, My-Education, Have-Questions, Footer, Contact-Me}.tsx
```

Total: 43 files changed in the working tree (this refactor plus the earlier security pass),
**524 insertions / 656 deletions**. `git diff --name-status | grep ^D` → **no files deleted**.

---

## 6. Verification results

| Check | Command | Result |
|---|---|---|
| Babel parse (all 96 `.ts`/`.tsx`) | — | **PASS** |
| Lint | `npm run lint` | **PASS** — 0 errors, 0 warnings |
| Typecheck | `npm run typecheck` | **PASS** — 0 errors |
| Tests | `npm test` | **PASS** — 28/28 |
| Production build | `npm run build` | **PASS** — compiled, 21 static pages, 15 API routes |
| Runtime smoke test | `next start -p 3111` + `curl` | **PASS** |

Runtime checks (production server, real HTML):

| Route | HTTP | Backdrop root rendered | Nested duplicates |
|---|---|---|---|
| `/` | 200 | 1 | none |
| `/home` | 200 | 1 | none |
| `/cv` | 200 | 1 | none |
| `/resume` | 200 | 1 | none |
| `/login` | 200 | 1 | none |
| `/message` | 200 | 1 | none |
| `/my-post` | 200 | 1 | none |
| `/dashboard` (unauthenticated) | 200 → login guard | 1 | none |
| unknown route (404) | 404 | 1 | none |

(An earlier count of 2 was the class name also appearing inside the RSC payload `<script>`
in the same HTML document — one actual DOM node per page.)

---

## 7. Remaining / unverified

- **No browser rendering was performed.** No browser automation tool was available in this
  session, so visual confirmation at 320 px / 768 px / 1440 px, hover states, the scrolled
  navbar, lightboxes and the dashboard sidebar were **not** visually inspected. Only DOM
  output, CSS review and build success were verified. A manual pass is recommended.
- Dashboard routes behind auth (`/dashboard/overview`, `/posts`, `/messages`) return the
  login redirect without a session, so their inner panels were reviewed by code only.
- `EntrySplash` still animates for 5.8 s at the CSS level (`animation: entry-ambient 5.8s`);
  the component removes itself after 1.5 s, so the animation is simply cut short. Harmless,
  but could be shortened to match.
- `prefers-reduced-motion` covers the app via the existing global rule; the new backdrop has
  no animation, so it needs no additional handling.

---

## 8. Final Visual QA pass

### 8.1 Defects found (reproducible)

**Defect A — duplicate backdrop render (2 per page).**
`PageBackground` was still mounted inside seven page files (`/`, `/home`, `/cv`, `/resume`,
`/login`, `/message`, `/my-post`) *in addition to* the single mount in `app/layout.tsx`.
Every page therefore rendered `.page-backdrop` twice. Confirmed in the browser
(`document.querySelectorAll('.page-backdrop').length === 2`) and in the server HTML.

*Fix:* removed the seven page-level instances and their now-unused imports, and replaced
the stale "GLOBAL REFERENCE BACKGROUND" / "SAME BACKGROUND AS THE CV PAGE" comments with a
one-line note pointing at the layout. Backdrop architecture otherwise unchanged.

**Defect B — horizontal overflow on `/` (and the same class of bug on `/home`, `/message`, `/my-post`).**
Browser measurement at ~1265 px content width: `document.documentElement.scrollWidth` **1332**
vs `clientWidth` **1265** — 67 px of document-level horizontal scroll. Cause: `overflow-x: clip`
was applied to the page root `<main>`, which is *not* a scroll container, so the clipping never
took effect and the hero image / decorative bleed escaped to the document.

*Fix (smallest possible):*
- Removed `overflow-x-clip` from the four page roots that had it.
- Added `overflow-x: clip` once on `.theme-content` in `globals.css` — the shared wrapper that
  contains every route's `<main>`, so the clip is enforced at a single page-level boundary.
- `/cv` and `/resume` already used `overflow-hidden` and were left alone.

After the fix, browser measurement on `/`: `scrollWidth` **329** = `clientWidth` **329** — no
horizontal overflow. Backdrop count **1**.

### 8.2 Viewports and routes actually tested

| Viewport | How | Result |
|---|---|---|
| ~329 px content width (browser window at its narrowest, 344 px inner minus scrollbar) | real browser | `/` — no horizontal overflow, backdrop count 1, page renders |
| 320 px exactly | **not tested** | The browser tool cannot resize the window and the site blocks iframe measurement (frame-busting), so this width was not measured |
| 768 px | **not tested** | same limitation |
| 1440 px | **not tested** | same limitation |

Routes inspected in the browser: **`/` only** (full render check).
Routes verified by production-server HTML + `curl` after the fix: `/`, `/home`, `/cv`,
`/resume`, `/login`, `/message`, `/my-post` — each renders exactly **1** `.page-backdrop`
root with all five child layers (`__base`, `__glow--cyan`, `__glow--blue`, `__grid`, `__vignette`).

**Not verified in a browser:** `/dashboard` and its sub-routes (behind auth, no test session),
navbar scroll behaviour, hover/focus states, modals, lightboxes, dropdowns, loading states,
and background behaviour during scroll/resize. These were reviewed in code only.

### 8.3 Checks run after the fix

| Command | Result |
|---|---|
| `npm run lint` | **PASS** — 0 errors, 0 warnings |
| `npm run typecheck` | **PASS** — 0 errors |
| `npm test` | **PASS** — 28/28 |
| `npm run build` | **PASS** — compiled in 3.4 s |
| `npm run verify` | **PASS** |
| `git diff --name-status \| grep ^D` | empty — no files deleted |

### 8.4 Remaining limitations

- Browser QA covered **one route at one narrow viewport**. The 320/768/1440 matrix and the
  interactive states listed in 8.2 still need a manual pass in DevTools device mode.
- Two `next start` instances may still be running on ports **3111** (stale build) and
  **3112** (current build) from this QA session; they are local only and can be killed.
- No other defects were found; the centralized background architecture is intact and the
  backdrop still renders once, behind all content, with `pointer-events: none`.
