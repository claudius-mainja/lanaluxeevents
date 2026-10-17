# Plan — Redesign Lana Luxe Events on the Square Fish Events structure

## Objective
Rebuild the Lana Luxe Events website (`C:\Users\claud\OneDrive\Desktop\lanaluxeevents`)
so it **looks, animates and is structured like https://squarefishevents.co.uk/**, while
using **Lana Luxe Events' own content, images and pages** (https://lanaluxeevents.co.za/).

Requirements from the user:
1. Copy Square Fish's design, animations and structure.
2. Keep Lana's text, images and pages.
3. All pages and features must remain functional.
4. Rewrite the copy to be SEO / AIO / AEO / GEO heavy for the markets served.
5. Use background images so the site reads as visual.
6. Use root `logo.png` as the logo and root `logo-bg.png` as the favicon.
7. Be mobile-first / mobile-responsive.

## Locked decisions (confirmed with the user)
- **Palette:** Square Fish's near-black canvas `#0F0F0F` + white text, with **Lana pink**
  (`#F8388B` bright / `#E81084` hot / `#B80B68` deep) as the accent. Keep navy/gold/WhatsApp
  green as secondary tokens.
- **Typography:** keep **DM Serif Display** (headings) + **Manrope** (body/UI). No Poppins.
- **Missing-data sections:** rebuild from real, computed data only (no invented clients,
  testimonials, ratings, awards, case studies or stats).
- **Hero:** scroll-parallax image collage (3 floating cards + large Ken-Burns image), **no video**;
  collapses to a static stack on mobile.
- **Copy language:** rewrite English only; leave the 10 draft locales as-is (they stay noindex).
- **Delivery:** full redesign in one pass, verifying after each phase.

## Reference: what Square Fish actually does (extracted)
- Fonts: Poppins. Colours: `#0F0F0F` near-black, white, accent cyan `#1fd7df`.
- Sticky header: transparent at top → `rgba(0,0,0,.9)` + `backdrop-filter: blur(8px)` on scroll.
- Hero: `.sfe-hero-wrap` height `155vh` containing a `position: sticky; top:0; height:100vh`
  stage; absolute floating cards (`,sfe-card-1/2/3`) + a main media block; on `≤767px` the cards
  are hidden and the media becomes a normal static block (no sticky).
- Logo ticker: infinite marquee `transform: translateX(0 → -50%)`, 30s linear, pause on hover,
  edge gradient masks.
- Big centered statement headings with a coloured accent `<span>`.
- "What we do" service cards (image + title + body + "Learn more →") with an anchor tab row.
- Content carousel with prev/next arrows and mask-image edges.
- Stats band (4 figures), numbered 1·2·3 process, contact form, testimonial carousel, dark footer.

## Reference: confirmed facts from the Lana site (must be preserved)
- Routes on the live site: `/`, `/services`, `/collection`, `/about`, `/gallery`, `/contact`
  (SPA, React Router 7; in-page anchors: `#kids-combo`, `#baby-shower-backdrop`, `#bubble-house`,
  `#bubble-house-garland`, `#soft-play`, `#balloon-decor`, `#jumping-castle`, `#add-ons`).
  Our repo already covers these plus SEO category/area pages — keep all of them.
- Contact: email `hello@lanaluxeevents.co.za`; phone `+27 76 126 5694`; WhatsApp
  `+27 64 544 0804` → `https://wa.me/27645440804`; location "Johannesburg & Pretoria, South Africa".
  **No street address exists** — do not invent one.
- Social (verified in the live JS — populate `socialLinks`):
  Instagram `https://instagram.com/lanaluxeevents`, Facebook `https://www.facebook.com/Lanaluxeevents/`.
- All 11 live images already exist in `public/images` (hero-356dc1e4, bubble-house-d2867f88,
  wedding-decor-f31b2122, wedding-monogram-fa7cdc3a, wedding-blush-tent-d4cbf6bc, baby-shower-0149995b,
  white-dome-jumping-castle-a20183f0, balloon-decor-c3cfebc6, kids-combo-17d5ff46, kids-flyer-b1f4c16d,
  birthday-83332712.png, image-889e3f06.png) plus 9 stock hire-item images.
- Prices (ZAR cents) are already encoded in `src/content/catalogue.ts` and `eventservices.ts` — do not change.

## Assets
- `logo.png` — 1536×1024, **RGBA (transparent)** → header/footer logo and og:image source.
- `logo-bg.png` — 1536×1024, **RGB (solid bg)** → favicon source.
- `sharp` 0.35.5 is already a devDependency → use it to generate icons.

---

## Work plan

### Phase 1 — Design system (`src/app/globals.css`)
- Replace the light palette with dark tokens: `--color-canvas:#0F0F0F`,
  `--color-canvas-2:#171717`, `--color-ink:#FFFFFF`, `--color-ink-muted:#A3A3A3`,
  `--color-line: rgba(255,255,255,.12)`; keep pink accent tokens and navy/gold/wa-green.
- Invert base styles: dark `body`, white headings, light body text, pink focus ring.
- Add motion primitives: `@keyframes lle-marquee` (translateX 0→-50%), `.marquee-track`,
  edge mask utility, `.sticky-hero` / `.sticky-hero__stage`, `.blur-header` state,
  `.media-card` (radius 22px + soft shadow), `.accent-span`.
- Ensure every animation is disabled under `prefers-reduced-motion` and `html[data-motion="reduced"]`.
- Keep `container-content`, fluid type scale, `arch-frame`, `hairline`, dialogs, `.reveal`.

### Phase 2 — Shell: header, footer, logo, favicon
- `src/lib/fonts.ts` — unchanged (DM Serif + Manrope).
- Logo: add a small `Logo` component rendering `logo.png` via `next/image` in the header/footer
  (transparent, height-constrained, width auto).
- Favicon: add `scripts/generate-icons.mjs` (sharp) producing `src/app/icon.png` (512) and
  `src/app/apple-icon.png` (180) from `logo-bg.png`, and an og image (1200×630) compositing the
  logo on the dark canvas → `public/og/lana-luxe-events.png`. Replace `src/app/icon.svg`.
- `src/components/layout/Header.tsx` — transparent-over-hero → blurred dark on scroll (client
  scroll listener, reduced-motion safe), logo left, nav right, pink "Get a Quote →" CTA.
- `src/components/layout/MobileNav.tsx` — full-screen dark menu with logo + CTA.
- `src/components/layout/Footer.tsx` — dark SF-style footer, logo, blurb, nav columns, legal,
  social icons (real URLs), Blacklemur credit retained.
- `src/content/site.ts` — populate `socialLinks` with the two verified URLs.
- `src/app/[locale]/layout.tsx` — `themeColor:#0F0F0F`, icons metadata, keep providers/analytics.

### Phase 3 — Homepage rebuilt to SF's order (`src/app/[locale]/page.tsx`)
Order: **Hero collage → photo marquee → statement band → category grid → live search/filter →
stats strip → "setups we deliver" carousel → trust cards → gallery → 4-step process →
service areas → FAQ → event services → enquiry form → footer.**

New components (`src/components/sections/`):
- `HeroCollage.tsx` — headline + lead + CTA, then a tall sticky stage with 3 floating image cards
  and a large Ken-Burns hero image; static stacked on mobile.
- `PhotoMarquee.tsx` — infinite marquee of real gallery photos (pause on hover, masked edges).
- `StatementBand.tsx` — centred dark statement with a pink accent `<span>`.
- `CategoryGrid.tsx` — the 6 real categories as SF-style "what we do" cards + anchor tab row,
  each linking to its category page.
- `StatsStrip.tsx` — computed real figures (hire options count, category count, area count,
  language count) read from content modules.
- `SetupShowcase.tsx` — carousel of real setup photos with captions + link to related hire
  (replaces SF's case studies; replaces testimonials which we can't source).
- Restyle existing `ProofPoints`, `Gallery`, `ProcessSteps`, `CoverageAreas`, `FaqSection`,
  `EventServicesIntro`, `CtaBand` for the dark theme.
- Keep `CatalogueBrowser` as the live search/filter (the SF "logo/value" slot).

### Phase 4 — All other pages restyled (functionality preserved)
Apply the dark SF treatment and section styling to: `/collection`, `/soft-play-hire`,
`/jumping-castle-hire`, `/party-fun-hire`, `/bubble-house-hire`, `/party-hire-packages`,
`/gallery`, `/about`, `/services`, `/contact`, `/faqs`, `/service-areas` + `[area]`,
`/privacy`, `/hire-terms`, 404. Preserve CatalogueBrowser, PackageTiers, Gallery viewer,
QuoteForm, StickyCta (→ floating WhatsApp button, SF-style), accessibility menu, breadcrumbs.

### Phase 5 — Content: SEO / AIO / AEO / GEO rewrite (`src/messages/en.json`)
- Answer-first copy (each section opens with a direct, quotable answer sentence).
- Natural location coverage: Johannesburg, Pretoria, Sandton/Sandton City, Bryanston, Randburg,
  Midrand, Centurion, Germiston, northern suburbs — for local/GEO intent.
- Question-formatted headings; expand FAQs to cover more "people also ask" intents.
- Rewrite `meta.*` titles/descriptions front-loading keyword + location, within length limits.
- Reuse the source site's own lines where apt ("Party hire that looks as good as it plays",
  "We respond to all inquiries within 24 hours", "What We Hire", "Signature investment packages").
- **Do not change** approved prices, inclusions, contacts, areas or the WhatsApp-handoff flow.

### Phase 6 — Structured data + machine-readable
- `src/components/seo/JsonLd.tsx`: add `sameAs` (real socials) to Organization; add `HowTo`
  for the enquiry process; emit `FAQPage` on more pages; keep BreadcrumbList/ItemList/Service.
- Add `public/llms.txt` summarising the business, services, areas and contact (AIO).
- Verify `robots.ts`, `sitemap.ts`, hreflang alternates. **No fabricated address/ratings/awards.**

### Phase 7 — Mobile-first + verification
- Build every new component mobile-first (test at 360px): hero stacks, marquee slows, grids
  single-column, floating WhatsApp CTA.
- Run `npm run typecheck`, `npm run lint`, `npm run build` after each phase; confirm the build
  stays green (currently 247 pages, no MISSING_MESSAGE).
- Re-check keyboard focus, reduced-motion, and that no content is hidden from crawlers.

---

## Honesty / do-not-fabricate guardrails
No invented testimonials, client logos, review counts, star ratings, awards, founding dates,
event totals, "brands worked with", or street address. Only real, computed or source-sourced facts.

## Files expected to change (high level)
- `src/app/globals.css`
- `src/app/[locale]/layout.tsx`, `src/app/[locale]/page.tsx`, and the pages in Phase 4
- `src/components/layout/{Header,MobileNav,Footer}.tsx`
- `src/components/sections/*` (new + restyled)
- `src/components/seo/JsonLd.tsx`
- `src/content/site.ts` (socials), maybe a `src/content/stats.ts` helper
- `src/messages/en.json`
- `public/llms.txt`, `public/og/lana-luxe-events.png`, `src/app/icon.png`, `src/app/apple-icon.png`
- `scripts/generate-icons.mjs`

## Open questions / assumptions
- Assumes DM Serif + Manrope remain acceptable on the dark canvas (confirmed).
- Assumes no video asset will be supplied (confirmed — image collage).
- No street address exists, so local structured data uses `areaServed` only.
