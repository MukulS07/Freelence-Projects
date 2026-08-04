# Agency Website — SAKAZUKI-inspired build

A multi-page marketing site for an AI-powered content & marketing agency serving café, food & beverage brands, styled from the uploaded SAKAZUKI design system.

## Brand & content decisions

- Name shown as "Our Agency Name" placeholder everywhere (single constant, easy to swap later).
- Tagline: "AI-Powered Content & Social Growth for Cafés, Food & Beverage Brands".
- All copy in "we" voice, no individual names.
- Pricing tables keep package names and inclusions but show "Contact for pricing" instead of ₹ figures.
- Portfolio uses AI-generated on-brand visuals (café, drinks, product-film stills, growth mockups) as placeholders.

## Routes

| Route | Content |
|---|---|
| `/` | Hero (logo, tagline, sub-line, "Book a Free Content Audit"), What We Do (4 service cards linking to /pricing), Our Process (3 steps), Why Us (bullet block), closing CTA |
| `/work` | Three categories: Brand Work, AI Product Content, Live Client Results — brand-only captions |
| `/pricing` | Social Media Management, Video Editing, Graphic Design tables + highlighted "Full Growth Package" bundle |
| `/contact` | "Let's Grow Your Café's Presence" + form (name, brand, Instagram handle, message) |

Shared header nav and footer (services list, contact links, socials) live in `__root.tsx`. Each route gets its own `head()` with unique title/description/og tags.

## Visual system (matched to sakazuki.io)

Ported into `src/styles.css` as oklch tokens:

- Warm greige canvas `#e1d6ce`, near-black text, deep red accent `#af0121`, black and cream alternating section blocks.
- Section rhythm: warm dark hero → greige → black → red → black footer, so scrolling alternates light/dark exactly like the reference.
- Display type: large geometric grotesk, all-caps, tight tracking, headlines that span the full viewport width. Body: humanist sans in ~440px columns. Micro-labels in wide-tracked small uppercase. Fonts loaded via `<link>` in the root head (Hagrid is licensed — using close free grotesk alternates).
- Oversized standalone numerals (01, 02, 03) as section counters.
- Chevron/triangle (▽) motif as the recurring brand device: top-center scroll indicator, letter-replacement inside headlines (e.g. "SERV▽CES"), rows of small red chevrons as section-break rules, and the footer wallpaper of scattered rotated wordmarks + solid red triangles.

## Persistent fixed overlay layer (as on the reference)

Sits above all scrolling content, recolors per section:

- Top nav: text links (WORK · PRICING · PROCESS · CONTACT) left, outlined pill CTA right.
- Center-top chevron scroll indicator, static position.
- Bottom-left social dock: (IG) (X) (WA) parenthesised text buttons.
- Bottom-center live ticking clock widget, `INDIA, HH:MM:SS`, updating every second.
- Bottom-right outlined pill CTA "AUDIT »»»»" with the animated chevron chain.

## Motion

- Lenis smooth inertial scroll, global.
- Chromatic-aberration / RGB-split glitch wipe at the hero → statement boundary, fired once on that crossing.
- Scroll-into-view reveals: opacity 0→1 + translateY 30px, once, line-by-line staggered within blocks.
- Pinned/sticky section headlines (work categories, pricing) while content scrolls beneath.
- Parallax: oversized cropped wordmarks and background imagery move at a different rate than foreground text.
- Numbered-pillar stagger — icon, eyebrow label, headline, then body resolve in sequence.
- Infinite chevron marquee (`»»»»`) inside CTA buttons, idle-looping.
- Scrollspy nav state — active link recolors to the current section's accent.
- Ambient slow drift/rotation on the footer wordmark + triangle pattern.
- Color-block section transitions as backgrounds flip greige / black / red on scroll.
- All motion respects `prefers-reduced-motion`.


## Technical notes

- TanStack Start file routes: `index.tsx`, `work.tsx`, `pricing.tsx`, `contact.tsx`; shared chrome in `__root.tsx`.
- New deps: `lenis` for smooth scroll, `motion` for reveals.
- Placeholder imagery generated into `src/assets/` and imported directly; captions written so real work can be swapped in without layout changes.
- Contact form is frontend-only for now (validates and shows a success toast); wiring it to real email/database delivery needs Lovable Cloud and can be a follow-up.

## Out of scope for this pass

- Real prices, real client screenshots, final logo, backend form delivery.
