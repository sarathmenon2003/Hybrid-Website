---
name: HYBRID Electro Mechanical L.L.C
description: Precision architectural bento and industrial MEP contracting showcase inspired by BAU CARGO
colors:
  brand-indigo: "#4b53a4"
  brand-indigo-deep: "#383f85"
  brand-indigo-soft: "#e6e8f6"
  whatsapp-green: "#126b38"
  ink-black: "#0d0f18"
  ink-secondary: "#383d52"
  ink-muted: "#585e74"
  bg-white: "#ffffff"
  bg-soft: "#f4f5fa"
  line-subtle: "#e1e4f0"
  error-crimson: "#b91c1c"
typography:
  display:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "13.25rem"
    fontWeight: 900
    lineHeight: 0.84
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "2.35rem"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Plus Jakarta Sans, system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.06em"
rounded:
  sm: "10px"
  md: "16px"
  card: "24px"
  pill: "9999px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2.25rem"
  xl: "4.75rem"
components:
  button-primary:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.bg-white}"
    rounded: "{rounded.pill}"
    padding: "0.78rem 0.9rem 0.78rem 1.35rem"
  button-primary-hover:
    backgroundColor: "{colors.brand-indigo}"
    textColor: "{colors.bg-white}"
  button-outline:
    backgroundColor: "{colors.bg-white}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.pill}"
    padding: "0.78rem 1.35rem"
  button-ghost-light:
    backgroundColor: "transparent"
    textColor: "{colors.bg-white}"
    rounded: "{rounded.pill}"
    padding: "0.82rem 1.45rem"
  card-bento:
    backgroundColor: "{colors.bg-soft}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.card}"
    padding: "2rem"
  banner-indigo:
    backgroundColor: "{colors.brand-indigo}"
    textColor: "{colors.bg-white}"
    rounded: "{rounded.card}"
    padding: "2.75rem 3rem"
  input-field:
    backgroundColor: "{colors.bg-white}"
    textColor: "{colors.ink-black}"
    rounded: "{rounded.sm}"
    padding: "0.85rem 1rem"
---

# Design System: HYBRID Electro Mechanical L.L.C

## Overview

**Creative North Star: "The Architectural Cutout Bento"**

HYBRID Electro Mechanical L.L.C's visual system translates heavy UAE electromechanical contracting—low-voltage switchgear, structured cabling, high-rise manifold piping, and chilled-water HVAC plants—into a crisp, high-contrast architectural bento showcase inspired by the BAU CARGO editorial layout. Rather than burying engineering capability inside dark industrial clichés or generic stock-photo cards, the system treats real MEP machinery and field crews as sculptural, transparent-background cutouts staged directly over cool architectural grey (`#f4f5fa`), stark studio white (`#ffffff`), and authoritative HYBRID royal indigo (`#4b53a4`) slabs.

Every section alternates between airy geometric blueprint-pattern backdrops and solid rounded bento containers (`24px` radius). Oversized lowercase display typography (`Archivo 900`) anchors the top of the page like an architectural supergraphic, while structured scope matrices, tabular numeric counters, and pill-shaped action controls with circular `↗` badges guide developers, main contractors, and facility managers directly toward tender inquiries.

**Key Characteristics:**
- Edge-to-edge lowercase display supergraphics paired with frameless 3D industrial MEP cutouts.
- High-contrast tonal layering across Studio White (`#ffffff`), Cool Architectural Grey (`#f4f5fa`), Royal Indigo (`#4b53a4`), and Deep Obsidian (`#0d0f18`).
- Split-column service bento cards where transparent-background technician cutouts anchor flush to the bottom-right corner.
- Subtle isometric geometric lattice (`Pattern.png`) integrated at low opacity (`4.5%` on light surfaces, `12%` screen-blended on indigo/dark banners).
- Pill CTAs (`9999px` radius) with nested circular `↗` icon badges that rotate `45deg` on hover.

## Colors

The palette is a disciplined four-anchor architectural system—Studio White, Cool Architectural Grey, HYBRID Royal Indigo, and Deep Obsidian Ink—augmented only by semantic WhatsApp utility green and validation crimson.

### Primary
- **HYBRID Royal Indigo** (`#4b53a4`): Primary brand anchor extracted directly from the HYBRID corporate profile. Used for full-bleed rounded authority banners (About Us and Proven Track Record stats band), primary interactive hover states, sector pills, and technical scope labels.
- **Deep Indigo Press** (`#383f85`): Darkened interactive active/hover shade supporting Royal Indigo elements.
- **Indigo Tint Wash** (`#e6e8f6`): Soft structural tint used for pill badges and icon focus states.

### Secondary
- **Direct WhatsApp Emerald** (`#126b38`): High-contrast semantic utility green (`6.75:1` contrast with white text) reserved exclusively for the sticky floating WhatsApp conversion pill.

### Neutral
- **Deep Obsidian Ink** (`#0d0f18`): Primary headline, display banner, primary pill button fill, and high-impact conversion banner surface.
- **Slate Charcoal** (`#383d52`): Secondary body copy and engineering scope descriptions on both white and `#f4f5fa` surfaces.
- **Muted Blueprint Slate** (`#585e74`): Metadata captions, form labels, and footer copyright text (maintains `>= 5.8:1` WCAG AA contrast on `#f4f5fa`).
- **Studio White** (`#ffffff`): Root page canvas, form input backgrounds, card corner action buttons, and high-contrast text on indigo/obsidian banners.
- **Cool Architectural Grey** (`#f4f5fa`): Primary bento card surface for services, values, execution lifecycle steps, project sector cards, and contact panels.
- **Hairline Divider Grey** (`#e1e4f0`): `1px` structural border token for cards, input strokes, and specification table rows.
- **Validation Crimson** (`#b91c1c`): Semantic form validation error border and inline message color.

### Named Rules
**The Four-Surface Discipline Rule.** Every section and card surface must resolve to one of four canonical fills: Studio White (`#ffffff`), Cool Architectural Grey (`#f4f5fa`), HYBRID Royal Indigo (`#4b53a4`), or Deep Obsidian Ink (`#0d0f18`). Never introduce off-palette pastel cards or multi-stop decorative gradients.

**The Subtle Lattice Rule.** The geometric brand pattern (`assets/pattern.png`) is applied at `4.5%` opacity (`mix-blend-mode: multiply`) on light sections and `10%–12%` opacity (`mix-blend-mode: screen`) on indigo and obsidian banners—never behind dense form inputs or at full opacity.

## Typography

**Display Font:** `Archivo` (`700`, `800`, `900`, with `system-ui, -apple-system, sans-serif` fallback)
**Body Font:** `Plus Jakarta Sans` (`400`, `500`, `600`, `700`, with `system-ui, -apple-system, sans-serif` fallback)

**Character:** Heavy, tightly tracked grotesque display headlines (`Archivo`) project structural engineering authority, while clean geometric humanist prose (`Plus Jakarta Sans`) keeps technical MEP submittals, scope matrices, and contact forms effortless to scan.

### Hierarchy
- **Display Supergraphic** (`900`, `clamp(3.5rem, 14.6vw, 13.25rem)`, `0.84` line-height, `-0.045em` tracking, lowercase): Full-width edge-to-edge `"hybrid mep"` hero banner spanning `100%` of the container width.
- **Section Headline / H1–H2** (`800`, `2.35rem`–`3.25rem` desktop / `1.55rem`–`2rem` mobile, `1.04`–`1.08` line-height, `-0.03em` tracking): Major section headers and banner anchors.
- **Bento Card Title / H3** (`700`, `1.45rem`, `1.2` line-height, `-0.02em` tracking): Service division titles and project sector headings.
- **Sub-Card Title / H4** (`700`, `1.0625rem`, `1.3` line-height): Core value titles and turnkey lifecycle step headings.
- **Body Copy** (`400`–`500`, `1rem` / `16px`, `1.65` line-height, `60ch–68ch` max measure): Narratives, service summaries, and technical descriptions.
- **Technical Scope Label** (`700`, `0.75rem`, `0.06em` tracking, uppercase): Sector badges, engineering discipline labels (`Electrical & ELV`, `HVAC & Mechanical`, `Plumbing`), and address metadata keys.

### Named Rules
**The Tabular Counter Rule.** All numerical statistics (`200+`, `30+`, `5+`, `98%`) and telephone/P.O. Box strings must set `font-variant-numeric: tabular-nums` so animated counters and contact figures never jitter horizontally.

## Layout

The layout is governed by a `1320px` max-width container (`width: min(100% - 3rem, 1320px)` on desktop, `calc(100% - 2rem)` on mobile) with a `1.5rem` (`24px`) bento grid gap and `4.75rem` (`76px`) vertical section rhythm.

- **Hero First-Fold Architecture:** Full-width `"hybrid mep"` display supergraphic at the top, followed by an asymmetric 2-column split (`minmax(340px, 0.92fr) minmax(0, 1.08fr)`) pairing the headline and dual pill CTAs on the left with the frameless 3D modular plant cutout (`assets/hero-plant-cutout.png`) on the right. Tightened vertical spacing ensures the `#4b53a4` About Us banner enters the bottom of the first desktop viewport (`1440x900`).
- **About Us Composition:** A full-width 3-column `#4b53a4` banner (`0.95fr 1.35fr auto`) above a 2-column detail grid (`0.95fr 1.25fr`) pairing the overhead engineering team photo (`assets/about-team-table.png`) with a 2x2 Core Values bento panel.
- **Services 2x2 Cutout Bento:** Four equal-height `#f4f5fa` bento cards (`repeat(2, minmax(0, 1fr))`), each internally split into a 2-column layout (`minmax(0, 1.08fr) minmax(195px, 0.92fr)`) so scope lists and the corner `↗` button occupy the left column while the transparent-background technician cutout anchors flush bottom-right.
- **Projects Feature + Horizontal Track:** A fixed 380px portrait feature card (`assets/projects-worker-back.png`) on the left paired with a smooth CSS `scroll-snap-type: x mandatory` horizontal carousel of `#f4f5fa` sector scope cards on the right.
- **Responsive Breakpoints:** At `<= 1080px`, multi-column hero, about, projects, and contact grids collapse to single-column stacks while the lifecycle and stats bands shift to 2x2 grids. At `<= 768px`, all bento grids collapse to `1fr`, navigation condenses into an accessible mobile drawer, and the floating WhatsApp pill condenses to a circular icon button.

## Elevation & Depth

Depth is achieved primarily through **crisp tonal surface contrast** (`#f4f5fa` bento cards with `1px solid #e1e4f0` borders against `#ffffff` canvas) and **directional alpha drop-shadows on 3D cutouts**, rather than heavy box shadows on containers.

### Shadow Vocabulary
- **Cutout Stage Shadow** (`filter: drop-shadow(-10px 12px 22px rgba(13, 15, 24, 0.12))`): Applied directly to transparent PNG cutouts (`hero-plant-cutout.png`, `contact-handshake.png`, and the 4 service cutouts) so the equipment and technicians cast realistic depth onto their bento card surfaces.
- **Card Hover Lift** (`box-shadow: 0 20px 40px -24px rgba(13, 15, 24, 0.12)`): Applied to `.service-cutout-card` on hover alongside a `-3px` vertical translation and subtle `#4b53a4` border highlight.
- **Floating Utility Shadow** (`box-shadow: 0 12px 28px rgba(13, 15, 24, 0.22)`): Neutral obsidian elevation supporting the fixed bottom-right WhatsApp pill.

### Named Rules
**The Flat-At-Rest Bento Rule.** Bento cards (`#f4f5fa`) sit flat at rest with a `1px solid #e1e4f0` border; ambient box-shadows appear only on interactive hover or on fixed viewport overlays.

## Shapes

The form language pairs generous architectural bento radii (`24px` desktop, `22px` mobile) with razor-sharp `9999px` pill controls and frameless silhouette cutouts that break out of rectangular photography conventions.

- **Bento Card Radius (`24px`):** Applied consistently to `.about-banner`, `.about-photo-card`, `.about-pillars-panel`, `.service-cutout-card`, `.stats-band`, `.projects-feature-card`, `.project-card`, `.contact-cta-banner`, `.contact-info-panel`, and `.contact-form-panel`.
- **Lifecycle Sub-Tile Radius (`16px`):** Used for the four `.cycle-step-card` tiles inside the Turnkey Execution Lifecycle strip.
- **Input & Control Radius (`10px`):** Applied to text inputs, textareas, and the mobile menu button.
- **Pill Controls (`9999px`):** Applied to all primary/secondary CTAs, phase filter chips, sector badges, and the floating WhatsApp trigger.

## Components

### Buttons
Tactile pill buttons with nested circular directional badges that rotate `45deg` on hover.
- **Shape:** Full pill (`border-radius: 9999px`).
- **Primary (`btn-pill-dark`):** Deep Obsidian Ink (`#0d0f18`) fill, Studio White (`#ffffff`) text, `0.78rem 0.9rem 0.78rem 1.35rem` padding, with a `28px` white circular `↗` badge on the right.
- **Hover / Focus:** Background shifts to HYBRID Royal Indigo (`#4b53a4`), button lifts `translateY(-2px)`, and the inner `↗` circle rotates `45deg` (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Secondary / Outline (`btn-pill-outline`):** Studio White (`#ffffff`) fill with `1.5px solid #0d0f18` border; shifts to `#f4f5fa` fill and `#4b53a4` border/text on hover.
- **Ghost Light (`btn-pill-ghost-light`):** Transparent fill with `1.5px solid rgba(255, 255, 255, 0.42)` border for `#4b53a4` banners; fills with `#ffffff` on hover.

### Chips
Interactive filter pills and sector classification tags.
- **Style:** Pill shape (`9999px` radius), `0.55rem 1.1rem` padding, `1px solid #e1e4f0` border on `#ffffff` background (`0.85rem`, `600` weight).
- **State:** Active `.cycle-pill.is-active` fills with `#0d0f18` and `#ffffff` text; static `.project-sector-pill` uses `#4b53a4` fill with uppercase `0.75rem` white text.

### Cards / Containers
Split-column cutout bento cards and flat engineering specification cards.
- **Corner Style:** Generous architectural curve (`24px` radius).
- **Background:** Cool Architectural Grey (`#f4f5fa`) for bento cards; HYBRID Royal Indigo (`#4b53a4`) for authority bands; Deep Obsidian (`#0d0f18`) for the conversion CTA banner.
- **Shadow Strategy:** Flat at rest with `1px solid #e1e4f0` border; subtle lift (`0 20px 40px -24px rgba(13, 15, 24, 0.12)`) on `.service-cutout-card:hover`.
- **Internal Padding:** `2rem` (`32px`) on standard bento cards; `2.75rem 3rem` on full-width banners; `2rem 2rem 0 2rem` on `.service-cutout-card` so cutouts sit flush against the bottom edge.

### Inputs / Fields
Clean architectural inquiry controls inside the `#f4f5fa` contact panel.
- **Style:** `1px solid #e1e4f0` stroke, Studio White (`#ffffff`) background, `10px` radius, `0.85rem 1rem` padding.
- **Focus:** Border shifts to `#4b53a4` with a `3px` soft indigo ring (`box-shadow: 0 0 0 3px rgba(75, 83, 164, 0.16)`).
- **Error:** `aria-invalid="true"` shifts border to Validation Crimson (`#b91c1c`) and reveals `.field-error` (`0.8125rem`, `#b91c1c`).

### Navigation
Sticky translucent architectural header bar (`78px` min-height) with responsive mobile drawer.
- **Style:** `background-color: rgba(255, 255, 255, 0.92)` with `backdrop-filter: blur(12px)` and `1px solid #e1e4f0` bottom border. Links use `Plus Jakarta Sans` (`0.9375rem`, `500` weight, `#383d52`), shifting to `#4b53a4` on hover, paired with a compact `.btn-pill-dark` Contact Us CTA on the right.

### Service Cutout Bento Card (Signature Component)
A 2-column `#f4f5fa` bento card (`24px` radius) that pairs a frameless dual-tone `28px` vector icon, division title, scope bullet list, and `42px` circular white `↗` action button in the left column with a bottom-right-anchored transparent PNG cutout of HYBRID field technicians and MEP equipment (`max-height: 295px`) in the right column.

## Do's and Don'ts

### Do:
- **Do** preserve transparent backgrounds on all cutout assets (`hero-plant-cutout.png`, the 4 service division cutouts, and `contact-handshake.png`) so they sit directly on `#ffffff`, `#f4f5fa`, or `#0d0f18` surfaces without rectangular photo boxes.
- **Do** keep every bento card on `#f4f5fa` with a `24px` border-radius (`22px` on mobile) and a `1px solid #e1e4f0` border.
- **Do** use each of the 8 project photographs exactly once in its designated section role with zero repetition across the page.
- **Do** maintain `font-variant-numeric: tabular-nums` on all stat counters (`200+`, `30+`, `5+`, `98%`) and contact phone numbers.

### Don't:
- **Don't** nest white cards inside `#f4f5fa` bento cards (such as boxed inner diagram canvases or boxed icon tiles); place scope matrices and icons directly on the card surface.
- **Don't** draw decorative SVG illustrations that imitate buildings, houses, or machinery; use real photography cutouts for physical subjects and restrict SVGs to crisp `28px–40px` functional engineering symbols and directional arrows.
- **Don't** use colored glow shadows (`rgba(31, 168, 85, ...)` or indigo neon glows) on buttons or floating controls; use neutral obsidian shadows (`rgba(13, 15, 24, 0.22)`).
- **Don't** allow the hero section to push the `#4b53a4` About Us banner completely below the `900px` desktop fold.
