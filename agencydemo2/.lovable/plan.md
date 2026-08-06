## Goal

A 5-page creative agency website with the look and motion feel of spotcreates.com — big editorial type, warm off-white canvas, floating blob shapes, marquee client strip, scroll-reveal case studies. All copy stays as bracketed placeholders like `[Your Agency Name]` so you can find-and-replace later.

## Visual direction (from the reference)

- Canvas: warm off-white `#FAF8F3`, ink near-black `#111111`, one saturated accent (soft yellow/amber gradient like the reference's yellow band). Deep charcoal section for the About band.
- Type: oversized geometric sans headings (Space Grotesk-ish), clean sans body. Headlines run 8–14vw on hero.
- Corners mostly sharp; images in soft rounded rectangles.
- Playful "Spot Ball" motif: 4–5 floating colored circles/blobs that drift and parallax as you scroll.

## Pages

```text
/           Home
/work       Work index (case study grid)
/services   Services detail
/about      About / team
/contact    Contact form + details
```

**Home**
1. Hero — split headline "[Your Tagline Line One] / [Your Tagline Line Two]" with two drifting blobs, character-by-character reveal.
2. Featured work — 3 large project cards, alternating offset, image zoom on hover, scroll parallax.
3. Client marquee — infinite horizontal ticker of `[Client 1] • [Client 2] • …`, reverses direction on scroll direction change.
4. Services — 3 columns (Strategy / Creative / Marketing) with circular illustration, staggered fade-up.
5. Dark About band — full-bleed image, "[Headline]. [Second Line]." plus 2 paragraphs of `[Your about copy]`, CTA to /about.
6. Footer — big CTA "[Let's work together]", email/socials placeholders.

**Work** — filterable grid of 6 placeholder case cards ([Project Name], [Category], [Year]).
**Services** — three long detail sections, each with numbered list of `[Deliverable]` items.
**About** — story, values grid, team grid of 6 `[Name] / [Role]` cards, timeline "Since [Year]".
**Contact** — form (name, email, company, message — front-end only, shows success toast; no backend yet), plus `[your@email.com]`, `[Phone]`, `[Address]`.

## Animation system (level 4)

- Motion for React (`motion`) for all reveals: scroll-triggered fade + rise, staggered children.
- Hero headline: word-mask reveal on load.
- Floating blobs: continuous slow drift loops + `useScroll` parallax offset.
- Images: scale-1.05 on hover, clip-path reveal on scroll into view.
- Marquee: CSS keyframe infinite scroll, pauses on hover.
- Custom cursor: small blob that scales up over links/images.
- Sticky section headings and a thin scroll-progress bar in the header.
- All motion respects `prefers-reduced-motion`.

## Placeholder convention

Every editable string is bracketed: `[Your Agency Name]`, `[Your Tagline]`, `[Project Name]`, `[Client 1]`, `[Your Name]`, `[Role]`, `[your@email.com]`. Images use generated abstract gradient/texture art so the layout reads as finished, and I'll list each file so you can swap them.

## Technical notes

- Routes as five files under `src/routes/`; shared header/footer/cursor in `__root.tsx`.
- Design tokens (colors, radii, gradients, shadows) added to `src/styles.css` — no hardcoded color classes in components.
- Fonts loaded via `<link>` in the root head.
- Components split: `Hero`, `WorkCard`, `Marquee`, `ServiceCard`, `Blobs`, `Cursor`, `SiteHeader`, `SiteFooter`, `Reveal` wrapper.
- Per-route `head()` metadata with unique titles/descriptions.
- Adds one dependency: `motion`.
- Contact form is presentational only — say the word if you want submissions stored/emailed via Lovable Cloud and I'll add it.
