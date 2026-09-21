---
name: vitrine-page-from-figma
description: Use when rebuilding a page of the Seeklon marketing site from the Figma file "Seeklon — Site vitrine · Desktop + Mobile" (home, pricing, about…), or when re-syncing an existing rebuilt page with that file. Covers reading the Figma reliably, what to copy and what to fix, and how to verify the result. Not for the older pages under app/[locale]/(site)/**.
---

# Rebuilding a page from the Figma

File key `VCTpYrKvOIAdcRtH8EK63S`. Pages: `0:1` foundations, `3:36` desktop (home `3:37`,
pricing `25:994`, about `25:1288`), `14:2` mobile (home `7:244`, pricing `25:453`,
about `25:689`).

Read [vitrine-design-system](../vitrine-design-system/SKILL.md) first: the tokens below are
already decided, and a new page should add nothing to them without a reason.

## Reading the Figma

- `get_metadata` lists only the first page of the document. To enumerate pages, run a
  read-only `use_figma` script: `figma.root.children.map(p => ({id: p.id, name: p.name}))`.
- The most useful dump is a `use_figma` walk returning, per node: type, name, absolute box
  relative to the frame, and for `TEXT` the characters plus
  `getStyledTextSegments(['fontName','fontSize','lineHeight','letterSpacing','fills'])`.
  Guard against empty text nodes (`segments[0]` can be undefined) and skip the `Ciel*`,
  `Halo*`, `Voile*` background layers.
- `get_screenshot` at full node size, then slice the PNG locally, is the fastest way to see
  a long page; full-page screenshots of the built site misrepresent nothing now that the
  sky is a static image.
- Images: `download_assets` returns the raw fills. They are low resolution (1120×630);
  crop them for mobile rather than shrinking the whole screen.

## What to copy, what to fix

Copy: copy, hierarchy, sizes, colours, the order of sections, and the intent of each block.

Fix rather than reproduce — these were all real defects in the file:

- overlapping layers (the journey heading over the intro, FAQ answers over questions);
- long empty stretches on mobile (≈1800px after the journey), leftover annotation layers;
- greys that fail contrast over the sky, and light blues on the deep blue;
- headings whose weight changes from page to page for no reason;
- a label repeated immediately above the element it labels;
- a seam where two background frames meet.

Note every deviation and report it; do not silently redesign.

## Building

1. Put the page in `app/[locale]/(figma)/<route>/page.tsx`; the group layout already gives
   the sky, nav and footer. End with `<ClosingCta />`.
2. Sections are server components in `components/<page>/`; only what needs state is
   `'use client'` (nav, journey, `Reveal`).
3. All copy goes to `messages/fr.json` and `messages/en.json` in one namespace per page,
   arrays for repeated blocks, `t.raw` to read them.
4. Reuse the shared pieces before writing new ones: `Reveal`, `.sheen`, the card and button
   patterns, the table/summary pair for comparisons.
5. Add `Metadata.<page>Title` / `<page>Description` and keep them consistent with the copy
   actually on the page.

## Verifying

Drive a real browser (Playwright with the local Chromium) against `next start`, not `dev`:

- one viewport screenshot per scroll step at 390, 820, 1366×625 and 1440×900, in both
  locales;
- contrast measured on the rendered pixels under each text box;
- the interactions of the page (tabs, carousel, menu, locale switch) asserted, including
  after a resize across the pinning breakpoint;
- `prefers-reduced-motion` and a run with WebGL disabled;
- `npx next build`, then the impeccable detector over the changed files.

## Reporting back

Say what deviates from the Figma and why, what is still placeholder (prices, testimonials,
screenshots), and what needs the user's facts before it can go live.
