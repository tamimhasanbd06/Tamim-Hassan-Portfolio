# Tamim Hasan Portfolio

A responsive Next.js 16 and TypeScript portfolio for Md. Tamim Hasan.

## Included

- Responsive layouts from approximately 300px phones to 2000px+ displays
- Stable 64px navigation that becomes sticky with a glass shadow after scrolling
- Mobile app-style navigation and touch targets
- Home, portfolio, CV, resume, and custom 404 pages
- Skills and projects loaded from separate JSON data files
- Searchable project gallery with image-click detail modal
- Real client-side PDF downloads for the CV and resume
- Installable Progressive Web App manifest, icons, service worker, and install prompt
- Route-specific metadata, Open Graph, X cards, JSON-LD, sitemap, and robots
- Accessibility improvements and reduced-motion support

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production validation

```bash
npm run lint
npm run build
npm start
```

## Site URL

For correct canonical links, sitemap entries, and social metadata, create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://your-real-domain.com
```

The default fallback is `https://tamim-hassan-portfolio.vercel.app`.

## Installable app

The browser install option appears after the deployed site is served over HTTPS. On iPhone or iPad, use Share and then **Add to Home Screen**.

## PDF files

The downloadable documents are stored at:

- `public/Tamim-Hasan-CV.pdf`
- `public/Tamim-Hasan-Resume.pdf`

## Portfolio data

Update Skills and Projects without editing the card components:

- `public/data/skills.json`
- `public/data/projects.json`
- `public/myapps.json`
