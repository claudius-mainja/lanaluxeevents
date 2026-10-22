# Lana Luxe Events — website

Marketing website for Lana Luxe Events (soft play, jumping castles, party fun, packages, bubble house, gifts). Built with Next.js 16 (App Router), next-intl and Tailwind CSS v4. English is the default locale and is served from the root (`/`); draft locales are available under their prefixes (`/af`, `/zu`, …) and fall back to English for any untranslated copy.

## Quick start

```bash
npm ci
npm run dev                # http://localhost:3000
```

For local configuration, copy `.env.example` to `.env.local` and fill in the values.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (fully static where possible) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm run test:e2e` | Playwright end-to-end suite (chromium + mobile) |
| `npm run test:a11y` | Accessibility subset of the Playwright suite |

The Playwright config starts (or reuses) a production server on port 3000, so run `npm run build` before testing.

## Environment variables

Copy `.env.example` to `.env.local`. All variables are public (`NEXT_PUBLIC_`); there are no secrets in this project.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used for metadata, sitemap and structured data |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp enquiry destination (digits only) |
| `NEXT_PUBLIC_PHONE_NUMBER` | Displayed phone number |
| `NEXT_PUBLIC_EMAIL` | Displayed contact email |
| `NEXT_PUBLIC_GA4_ID` | GA4 measurement ID — optional, blank disables the tag |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID — optional, blank disables the tag |
| `NEXT_PUBLIC_NOINDEX` | `"true"` noindexes the whole deployment (staging protection) |

## Analytics and cookie consent

Third-party analytics (GA4, Meta Pixel) load **only** when both are true:

1. the corresponding ID is configured in the environment, and
2. the visitor has accepted via the cookie banner (`lle:consent` in `localStorage`).

The banner appears on first visit, can be revisited from **Cookie settings** in the footer, and both choices (accept/decline) are honoured equally. Declining leaves the site fully usable; the typed event layer (`src/lib/analytics.ts`) no-ops when no tags are loaded. The policy page is at `/cookies` (`src/app/[locale]/cookies/page.tsx`).

## Structure

```
src/
  app/[locale]/       pages (home, collection, category pages, gifts, gallery,
                      about, services, contact, faqs, service-areas, privacy,
                      hire-terms, cookies)
  components/         layout, sections, ui, catalogue, cookies, quote, seo
  content/            typed content: catalogue, gifts, areas, images, nav, site
  i18n/               routing + navigation wrappers
  lib/                seo, format, motion, consent, analytics helpers
  messages/en.json    all copy (other locales fall back to English)
public/               images, brand assets, og image
tests/                Playwright: smoke, responsive, consent, a11y
```

Brand assets in `public/brand/` are pre-generated. `scripts/generate-brand.mjs` documents how they were produced from the original logo files; those source files are no longer in the repo.

## Deployment

The build is a standard Next.js production build — any host that can run Node.js works, and the usual Next.js platforms need no special configuration.

**Vercel / Netlify**: import the repository and let the platform detect Next.js. Use `npm run build` as the build command; do not configure a static export/publish directory. Set the environment variables above in the project settings (the site URL must match the deployment domain).

**Any Node host (VPS, cPanel with Node, etc.)**:

```bash
npm ci
npm run build
npm run start            # serves on PORT (default 3000)
```

Point a reverse proxy (nginx/Apache) at the Node process, or use the platform's process manager. Keep `NEXT_PUBLIC_SITE_URL` set to the public domain so metadata and the sitemap resolve correctly.

## Notes for maintainers

- Copy lives in `src/messages/en.json`; keep page headings/metadata in sync when adding pages, and add new routes to `src/app/sitemap.ts`.
- Motion is transform/opacity only and respects both `prefers-reduced-motion` and the manual accessibility toggle (`data-motion="reduced"`). Do not add animation libraries.
- The skip link must remain the first tab stop — the consent banner renders at the end of `<body>` for this reason.
- Enquiry flow: the form builds a WhatsApp message client-side; nothing is submitted to a server.
