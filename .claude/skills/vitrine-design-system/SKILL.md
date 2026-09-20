---
name: vitrine-design-system
description: Use when building, editing or reviewing any page of the Seeklon marketing site rebuilt from the Figma file "Seeklon — Site vitrine" (app/[locale]/(figma)/**, components/home/**, components/pricing/**). Holds the exact tokens (colours, type scale, spacing rhythm), the shared shell (sky, nav, footer), the component patterns, the motion and contrast rules, and the i18n conventions. Not for the older pages under app/[locale]/(site)/**, which keep their previous design.
---

# Site vitrine — design system

The pages rebuilt from Figma (home, pricing, contact, about, blog) share one shell, one
set of tokens and one rhythm (see **Page rhythm** below). Match
them exactly rather than inventing new values; anything not listed here is a decision to
make deliberately, and to add here afterwards.

## Shell

`app/[locale]/(figma)/layout.tsx` wraps every rebuilt page:

- wrapper: `home` class + font variables + `relative isolate overflow-x-clip`, fallback
  background `linear-gradient(180deg,#E7F0FE_0%,#D8E6FB_55%,#CFE0FA_100%)`;
- `<SkyBackground />` (procedural sky, see below), `<HomeNav />`, `<main>`, `<HomeFooter />`.

A page provides only its sections and ends with `<ClosingCta />`, which carries
`data-sky-deep` and the `--deep-full` custom property. Put new rebuilt pages in this group;
`overflow-x-clip` (never `overflow-hidden`) keeps `position: sticky` working.

## Colours

| Token | Value | Use |
|---|---|---|
| `ink` | `#0B0B0C` | headings, body on light |
| `ink-soft` | `#4F4E49` | secondary paragraphs (≥16px) |
| `ink-faint` | `#57554F` | captions, counters, hints (12–15px) |
| `azure` | `#0C6DF8` | accent, primary buttons, active bars |
| `azure-deep` | `#0A56C4` | small blue text, hover of primary buttons |
| `azure-mist` | `#B4D5FF` | avatars, soft blue surfaces |
| rules | `#DDDBD5`, `#D6D8DE` | dividers inside cards and panels |
| deep sky | `#0E62E6` → `#0C5AD9` → `#0A52CC` | closing section, then footer |
| surfaces | `bg-white/85` cards, `bg-white/75` journey panel, `bg-white/95` nav | |

`ink-soft` and `ink-faint` are darker than the Figma greys on purpose: the Figma values
(`#5C5B57`, `#8A877F`) fall under 4.5:1 over the sky. Do not restore them.

## Type

- Family: **Host Grotesk** (variable 300–800, self-hosted, `font-grotesk`). Accent word
  only: **Genoid Bold** (`font-genoid`) — free *demo* build, a commercial licence is
  required before launch.
- Display: `clamp(4rem,2.6rem+6.1vw,8rem)` hero, `clamp(2.25rem,0.9rem+5.9vw,6rem)` section,
  `clamp(2.25rem,1.2rem+3.4vw,4rem)` sub-section, `font-medium`, tracking `-0.045em`/`-0.05em`,
  leading `0.98`–`1.04`.
- Body: 16px mobile / 19px desktop, leading `1.6`, `ink-soft`. Secondary: 15px. Captions:
  12px mobile / 14px desktop, `ink-faint`.
- French typography: no-break space (` `) before `?`, `!`, `:`, `;` and inside `«  »`.

## Spacing

- Page gutters: `px-6 md:px-10 xl:px-20`, content `max-w-[1440px] mx-auto`; the journey
  panel uses `max-w-[1344px] px-8` so it never touches the edges at 1280.
- Section top padding: `pt-24` (96px) mobile, `md:pt-[180px]`–`[200px]` desktop. Vary it:
  a large gap before a major section, a tighter one inside a group.
- Cards: radius 20px, padding `p-6 md:p-9`; panels radius 24–28px.
- Buttons: height 52–54px, radius 10px, `px-7`–`px-8`.
- Mobile copy is left-aligned (`md:text-center` only from `md`): centred multi-line
  paragraphs are hard to read at phone width.

## Sky

`components/home/SkyBackground.tsx` renders three layers once — the sky (`uLayer` 0), the
far clouds (1) and the near clouds (2) — and places them in the document. The two cloud
layers are 128% wide and drift with a CSS `transform` (54s and 96s, alternate), which the
compositor animates on its own. Rules that matter:

- **No parallax.** The user rejected clouds moving at a different speed from the text —
  adding the scroll offset inside the shader is what keeps the sky anchored. Verified by
  screenshotting the same document band at two scroll positions with motion reduced: the
  pixels must be identical.
- **Never animate the sky from JavaScript.** A fixed canvas redrawn per frame was tried:
  it trails the scroll by a frame, and that lag reads as the background sliding on its
  own. Movement belongs to the compositor; the render is one-off and budget-capped.
- The sky deepens with page position (pale hero → bluer, larger cumulus lower down), then
  blends into `#0E62E6` between `data-sky-deep` and `--deep-full` px below it, and turns
  transparent past that point: from there the blue is plain CSS on the section and footer,
  so white copy never depends on WebGL.
- Cloud alpha is capped over the deep blue so white text keeps ≥4.5:1.
- Without WebGL (or on software renderers), the CSS gradients stay — never make copy
  legibility depend on the canvas.

## Components and classes

- `HomeNav`: fixed pill, full nav from `lg`, burger below, compact `Démo` button on mobile,
  active link `bg-[#EEF4FF]` + `aria-current="page"`.
- `Reveal`: adds `data-reveal`/`data-visible` for the blur-and-rise entrance. Use it below
  the fold only — above the fold, prefer a CSS `animation` so nothing flashes.
- `.accent-shine` (blue accent word) sweeps only on hover, slowly: on arrival it read as
  a flash and nobody could tell what had happened. `.accent-shine-soft` (white closing
  headline) still sweeps once when the section comes into view, over 2.6s. `.sheen` does the same on
  a filled button (needs `relative overflow-hidden`).
- Journey (`components/home/Journey.tsx`): one native horizontal scroller at every width —
  `swipe` on phones (finger, snap), `panel` from `lg` (tabs, arrows, and the wheel). The
  tabs follow `scrollLeft`, they are not a separate state.
- Over the panel, one notch of the wheel moves one slide, smoothly, and the page takes the
  wheel back at either end. Two rules keep it from feeling stuck: every event the panel
  takes starts a visible movement (no accumulating thresholds, nothing swallowed), and it
  refuses the wheel unless the panel has settled within a fifth of the window from its
  centre and the page has been still for 120ms — otherwise it stops a scroll the reader
  aimed elsewhere, just because the panel slid under a still cursor on its way past.
  Snapping is lifted during the gesture; a leftover `scroll-snap-type: mandatory` pulls
  every small move straight back and nothing appears to happen.
- `ImageZoom` opens a product capture in a native `<dialog>`; an off-screen slide passes
  `focusable={false}` so its button leaves the tab order.
- Blog: the index opens on a section headline, then the latest post as one full-width
  card (title left, excerpt and link right, like the beta plan on Tarifs), then the rest
  in two columns — typographic cards with meta, title, excerpt and the read link pinned to
  the bottom behind a rule. No thumbnails, the posts have no artwork of their own.
- Article: an 860px column with the body in a white card; the
  `typography` plugin is retuned in `globals.css` under `.home .prose`, the markdown's
  leading `# ` is stripped at render (the page already has the `h1`), apostrophes are
  swapped for the curly one, and GFM tables are wrapped in `not-prose` so they scroll
  sideways on a phone. `frenchSpacing` (`lib/typography.ts`) puts the no-break space back
  before French high punctuation — without it a title breaks in front of its colon.

## Motion

- Easing `cubic-bezier(0.16,1,0.3,1)`; 150–200ms for hovers, 700ms for slide transitions,
  0.9–2.1s for the authored sweeps.
- Every transition that moves something must be behind `motion-safe:` — in Tailwind, the
  `pin:`/`lg:` variants come later in the sheet and would otherwise override
  `motion-reduce:transition-none`.
- One authored moment per surface. No looping animation that costs a frame on scroll.

## i18n

- Copy lives in `messages/fr.json` / `messages/en.json`, namespaces `Home`, `Pricing`,
  `Contact`, `About` and `Blog`; both locales are updated in the same change. Article text
  itself lives in `content/blog/<locale>/*.md`, not in the message files.
- Lists (features, table rows, FAQ) are arrays read with `t.raw(...)` and typed at the call
  site.
- Headings are split into `line1` / `line2` keys rather than `<br>`.

## Page rhythm

Every rebuilt page follows the same beats, and a new one that skips them reads like
another site: hero (`pt-[136px] md:pt-[180px]`, two-line title, `md:text-center`) → first
section at `mt-12 md:mt-20` → each following section at `pt-24 md:pt-[150px]` (180–220px
on the longer pages) → the deep-blue `ClosingCta`, which every page needs or the footer's
blue arrives with no transition. Each section opens with its own headline at
`clamp(2.25rem,1.2rem+3.4vw,4rem)` wrapped in `Reveal`, then its content at
`mt-8 md:mt-12`. Content sits on large white surfaces (`rounded-[24px] bg-white/85`),
not small boxes.

## What every page owes

- `pageMetadata` (`lib/metadata.ts`): canonical, the alternates that **exist**, Open Graph
  and Twitter, plus an image from `public/og`. The share images are generated by a script
  that screenshots the site's own sky and sets the title in Host Grotesk + Genoid — never
  a gradient that imitates the sky.
- One origin: `SITE_URL` (`lib/site.ts`, `NEXT_PUBLIC_SITE_URL`). robots, sitemap and every
  canonical read it.
- A `ClosingCta`, or the footer's blue arrives with no transition.
- Structured data where it is free: `Article` on posts, `FAQPage` on the pricing FAQ,
  `Organization` on the home page.
- Forms: a consent line linking to `/privacy`, `_subject`/`_language`/`_gotcha` hidden
  fields, `role="status"` plus focus on success.

## Before calling a page done

1. `npx next build` — no warning.
2. `.claude/skills/impeccable/scripts/impeccable detect --json <changed paths>`.
3. Measure contrast over the *rendered* sky (screenshot the page with the text hidden and
   sample the pixels under each text box), not against a flat colour: the sky varies.
4. Check 360×740, 390×844, 820×1180, 1280×600, 1366×625 and 1440×900 — the short laptop
   heights are where the pinned panel breaks.
5. French and English, and `prefers-reduced-motion`.

## Known debts

- Genoid is the demo build (personal use) — buy the licence before launch.
- Product screenshots are 1120px wide and soft; Remotion renders are planned.
- Testimonials are placeholders (`[Prénom Nom]`) with a visible note.
- Pricing shows the free beta; the Brise / Tempête / Cyclone packs have no price yet.
