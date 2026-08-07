---
version: alpha
name: Terminal Glass — Responsive Portfolio
description: A fully responsive, dual-theme evolution of Vercel Minimal for a full-stack/mobile developer portfolio — the same restrained black/white product language, scaled fluidly across mobile, tablet, and desktop, with a frosted "terminal glass" surface layer as its signature and every color token doubled for light/dark.
breakpoints:
  mobile: "0–599px"
  tablet: "600–1023px"
  desktop: "1024–1439px"
  wide: "1440px+"
container:
  max-width: 1200px
  mobile-margin: 20px
  tablet-margin: 40px
  desktop-margin: 64px
  content-columns:
    mobile: 1
    tablet: 6
    desktop: 12
themes:
  light:
    primary: "#171717"
    secondary: "#6B7280"
    tertiary: "#FFFFFF"
    neutral: "#F5F5F7"
    surface: "#FFFFFF"
    on-surface: "#171717"
    border: "#E5E7EB"
    error: "#DC2626"
    accent: "#3B82F6"
    glass-surface: "rgba(255,255,255,0.55)"
    glass-border: "rgba(255,255,255,0.8)"
    glass-highlight: "rgba(255,255,255,0.9)"
    glass-shadow: "rgba(23,23,23,0.10)"
    backdrop-blur: 20px
    scrim: "rgba(245,245,247,0.6)"
  dark:
    primary: "#F5F5F5"
    secondary: "#9CA3AF"
    tertiary: "#0A0A0A"
    neutral: "#0A0A0A"
    surface: "#141414"
    on-surface: "#F5F5F5"
    border: "#262626"
    error: "#F87171"
    accent: "#60A5FA"
    glass-surface: "rgba(255,255,255,0.06)"
    glass-border: "rgba(255,255,255,0.14)"
    glass-highlight: "rgba(255,255,255,0.22)"
    glass-shadow: "rgba(0,0,0,0.45)"
    backdrop-blur: 24px
    scrim: "rgba(10,10,10,0.6)"
typography:
  display-face: Geist
  body-face: Geist
  mono-face: Geist Mono
  headline-display:
    fontFamily: Geist
    fontWeight: 600
    letterSpacing: -1.4px
    fontSize:
      mobile: 28px
      tablet: 38px
      desktop: 52px
    lineHeight:
      mobile: 32px
      tablet: 42px
      desktop: 56px
  headline-lg:
    fontFamily: Geist
    fontWeight: 500
    letterSpacing: -0.4px
    fontSize: { mobile: 21px, tablet: 26px, desktop: 32px }
    lineHeight: { mobile: 26px, tablet: 32px, desktop: 38px }
  headline-md:
    fontFamily: Geist
    fontWeight: 500
    letterSpacing: -0.3px
    fontSize: { mobile: 18px, tablet: 20px, desktop: 24px }
    lineHeight: { mobile: 24px, tablet: 27px, desktop: 32px }
  headline-sm:
    fontFamily: Geist
    fontWeight: 500
    letterSpacing: 0px
    fontSize: { mobile: 16px, tablet: 17px, desktop: 18px }
    lineHeight: { mobile: 20px, tablet: 22px, desktop: 24px }
  body-lg:
    fontFamily: Geist
    fontWeight: 400
    fontSize: { mobile: 16px, tablet: 17px, desktop: 18px }
    lineHeight: { mobile: 24px, tablet: 26px, desktop: 28px }
  body-md:
    fontFamily: Geist
    fontWeight: 400
    fontSize: { mobile: 14px, tablet: 15px, desktop: 16px }
    lineHeight: { mobile: 21px, tablet: 22px, desktop: 24px }
  body-sm:
    fontFamily: Geist
    fontWeight: 400
    fontSize: 13px
    lineHeight: 18px
  label-lg:
    fontFamily: Geist
    fontWeight: 500
    fontSize: 13px
    lineHeight: 18px
  label-sm:
    fontFamily: Geist
    fontWeight: 500
    fontSize: 11px
    lineHeight: 14px
    letterSpacing: 0.2px
  mono-tag:
    fontFamily: Geist Mono
    fontWeight: 500
    fontSize: 12px
    lineHeight: 16px
  mono-caption:
    fontFamily: Geist Mono
    fontWeight: 400
    fontSize: 11px
    lineHeight: 15px
rounded:
  none: 0px
  sm: 6px
  md: 14px
  lg: 20px
  pill: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 20px
  xl: 32px
  gutter: { mobile: 16px, tablet: 24px, desktop: 32px }
  section: { mobile: 56px, tablet: 88px, desktop: 128px }
components:
  button-primary:
    backgroundColor: "{theme.primary}"
    textColor: "{theme.tertiary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.pill}"
    padding: 12px 20px
    height: 44px
  button-glass:
    backgroundColor: "{theme.glass-surface}"
    border: "1px solid {theme.glass-border}"
    backdropFilter: "blur({theme.backdrop-blur}) saturate(160%)"
    textColor: "{theme.on-surface}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.pill}"
    padding: 12px 20px
    height: 44px
  card-glass:
    backgroundColor: "{theme.glass-surface}"
    border: "1px solid {theme.glass-border}"
    backdropFilter: "blur({theme.backdrop-blur}) saturate(160%)"
    boxShadow: "0 8px 32px {theme.glass-shadow}"
    textColor: "{theme.on-surface}"
    rounded: "{rounded.lg}"
    padding: { mobile: 16px, tablet: 20px, desktop: 24px }
  card-solid:
    backgroundColor: "{theme.surface}"
    border: "1px solid {theme.border}"
    textColor: "{theme.on-surface}"
    rounded: "{rounded.md}"
    padding: { mobile: 16px, tablet: 20px, desktop: 24px }
  nav-glass:
    backgroundColor: "{theme.glass-surface}"
    border: "1px solid {theme.glass-border}"
    backdropFilter: "blur({theme.backdrop-blur}) saturate(180%)"
    boxShadow: "0 12px 40px {theme.glass-shadow}"
    rounded: { mobile: "{rounded.pill}", desktop: "{rounded.lg}" }
    height: { mobile: 56px, desktop: 64px }
    placement:
      mobile: "fixed bottom, floating pill dock, 20px inset, icon-only"
      tablet: "fixed bottom, floating pill dock, icon + label"
      desktop: "fixed top, full-width glass bar, icon + label + inline links"
  input:
    backgroundColor: "{theme.glass-surface}"
    border: "1px solid {theme.glass-border}"
    backdropFilter: "blur({theme.backdrop-blur})"
    textColor: "{theme.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.sm}"
    padding: 12px 14px
    height: 44px
  chip-tech:
    backgroundColor: "{theme.glass-surface}"
    border: "1px solid {theme.glass-border}"
    textColor: "{theme.on-surface}"
    typography: "{typography.mono-tag}"
    rounded: "{rounded.pill}"
    padding: 6px 12px
  status-dot:
    online: "#22C55E"
    size: 8px
    rounded: "{rounded.pill}"
  project-grid:
    columns: { mobile: 1, tablet: 2, desktop: 3 }
    gap: "{spacing.gutter}"
---

# Terminal Glass — Responsive Portfolio

## Overview

This system keeps Vercel Minimal's core discipline — near-monochrome palette, Geist type, restrained shape language — and extends it across the full device range instead of one fixed size. Every dimension that matters (type scale, spacing, container margins, nav placement, grid columns) is defined per breakpoint rather than as a single number, so the same token file drives a phone, a tablet, and a widescreen desktop without a redesign at any of them.

Two things layer on top of that responsive base: any surface can be **glass** (frosted, translucent, blurred) instead of flat, and every color exists as a **light/dark pair** so the whole page can flip theme without touching layout.

Glass is reserved for things that float above content — the primary nav, the hero status card, project cards over a background gradient, tech-stack chips. Static content — long-form text, section backgrounds — stays flat, exactly as Vercel Minimal intended, so frosted surfaces read as a deliberate layer rather than a filter over everything.

## Responsive Strategy

- **Breakpoints:** mobile (0–599), tablet (600–1023), desktop (1024–1439), wide (1440+). Wide reuses desktop tokens with a capped `container.max-width: 1200px` and extra whitespace on either side — nothing scales past that width, it just gets more breathing room.
- **Fluid within, stepped between:** type sizes and spacing jump at breakpoints rather than scaling continuously (no `clamp()`-driven fluid type here) — this keeps the type scale predictable and matches Vercel Minimal's original stepped-scale approach, just with three steps instead of one.
- **Container, not viewport:** all layout math (margins, columns) is driven by `container.max-width`, so on wide screens content stays centered and readable instead of stretching edge to edge.
- **Grid, not stacked-forever:** `project-grid` goes 1 → 2 → 3 columns across mobile → tablet → desktop. Mobile isn't a cut-down desktop; it's the 1-column base case the grid naturally collapses to.

## Theming

Two token sets — `light` and `dark` — share identical structure, so a theme switch is a token swap, independent of breakpoint.

- **Light:** near-white background, charcoal ink — Vercel Minimal's original daytime feel. Glass surfaces use `rgba(255,255,255,…)` at low-to-mid opacity with a soft shadow; contrast comes from the border and shadow, not the fill.
- **Dark:** near-black background, off-white ink. Glass surfaces drop to very low opacity (0.06–0.22) — on dark, glass is defined almost entirely by its border and highlight, or it disappears into the background.
- **Accent (`#3B82F6` / `#60A5FA`):** new to this system — Vercel Minimal was accent-free, but a portfolio needs one live color for links, active nav state, and status dots. One blue across both themes, lightened for dark, so it never competes with the black/white base.
- Every component references `{theme.*}` tokens, never a literal hex — that's what makes light/dark a data swap instead of a rebuild, at any screen size.

## Typography

Geist stays the primary voice, unchanged in spirit from Vercel Minimal, now with a size defined per breakpoint (see `typography` block — each role carries `mobile`/`tablet`/`desktop` values). Headline-display grows from 28px on mobile to 52px on desktop, letting the hero carry real weight on a large screen without overwhelming a phone.

One face is added: **Geist Mono**, used only for `mono-tag` (tech-stack chips: `TypeScript`, `FastAPI`, `React Native`) and `mono-caption` (small metadata). This is the full-stack signal — narrow enough to never become the loud voice of the page, and it doesn't need to scale by breakpoint since it's always a small supporting label.

## Layout

Single-column on mobile, expanding to a wider canvas with a project grid from tablet up. Margins and section spacing grow with the breakpoint rather than staying fixed.

**Mobile (0–599):**
```
┌─────────────────────────┐
│  ☀/🌙                    │  ← transparent top bar
│   Joseph Uwimana          │  ← headline-display, 28px
│   Full-Stack & Mobile     │
│  ┌─────────────────────┐ │
│  │ ● Available  [TS][RN]│ │  ← card-glass, 1 col
│  └─────────────────────┘ │
│  Selected Work            │
│  ┌─────────────────────┐ │
│  │  Paibill               │ │  ← project-grid: 1 col
│  └─────────────────────┘ │
│  ┌─────────────────────┐ │
│  │  TapLink                │ │
│  └─────────────────────┘ │
│   ╭──────────────────╮   │
│   │ 🏠  💼  🧰  ✉    │   │  ← nav-glass: floating bottom dock
│   ╰──────────────────╯   │
└─────────────────────────┘
```

**Desktop (1024+):**
```
┌──────────────────────────────────────────────────────────┐
│ ╭──────────────────────────────────────────────────────╮ │
│ │ Joseph.dev   Work  Stack  About  Contact    ☀/🌙       │ │ ← nav-glass: fixed top bar
│ ╰──────────────────────────────────────────────────────╯ │
│                                                            │
│   Joseph Uwimana                    ┌───────────────────┐ │
│   Full-Stack & Mobile Developer     │ ● Available        │ │
│   headline-display, 52px            │ [TS][RN][FastAPI]  │ │ ← card-glass, side by side
│                                      └───────────────────┘ │
│                                                            │
│   Selected Work                                            │
│   ┌───────────┐  ┌───────────┐  ┌───────────┐            │
│   │  Paibill    │  │  TapLink    │  │  Reby       │       │ ← project-grid: 3 col
│   └───────────┘  └───────────┘  └───────────┘            │
└──────────────────────────────────────────────────────────┘
```

Tablet sits between the two: nav is still a floating bottom dock (but wider, with labels next to icons) and the project grid runs 2 columns — treat it as its own state, not just "small desktop" or "big phone."

Background is never flat color directly behind glass elements at any size — a subtle radial gradient or blurred mesh (two soft primary-tinted blobs, 5–8% opacity) sits behind the hero, nav, and project cards, scaled to cover whatever the current viewport is, so `backdrop-filter: blur()` always has something to refract.

## Elevation & Depth

Two elevation languages, used for different content regardless of breakpoint:

- **Flat (inherited from Vercel Minimal):** long-form text, about section, solid section backgrounds. 1px border, no shadow, no blur.
- **Glass (signature, responsive):** nav, hero status card, project cards, chips — anything that should float above the page. Three stacked layers: `backdrop-filter: blur({theme.backdrop-blur}) saturate(160–180%)`, a translucent fill, and a 1px semi-transparent border that catches light on the top edge. The saturate boost keeps blur from looking washed-out — without it, glass reads muddy, especially in dark mode.

Never mix flat and glass on the same element at any size — a card is either fully flat or fully glass.

## Shapes

Pills remain the dominant interactive shape (buttons, chips, `rounded.pill`) at every breakpoint. The nav is the one component whose shape actually changes with size: pill-shaped floating dock on mobile/tablet, softened to `rounded.lg` as a full-width bar on desktop, since a pill-shaped nav spanning 1200px of container width reads as an odd shape rather than a compact control. Cards stay 14–20px rounded across all sizes — glass reads better with a rounder edge, since the blur already softens the visual boundary.

## Components

- **`button-primary` / `button-glass`:** unchanged across breakpoints — solid or frosted pill, same proportions everywhere, sized by content rather than viewport.
- **`card-glass` / `card-solid`:** padding steps up with breakpoint (16 → 20 → 24px) so cards don't feel cramped at desktop scale, but radius and elevation stay constant.
- **`nav-glass`:** the signature element, and the one place responsiveness changes both form and placement — bottom floating icon dock on mobile, wider bottom dock with labels on tablet, fixed full-width top bar with inline links on desktop. Same glass materials throughout (blur, translucent fill, light-catching border); only geometry and placement adapt.
- **`chip-tech`:** identical at every size — a small glass pill never needs to grow, it just wraps to more chips per row as space increases.
- **`project-grid`:** 1/2/3 columns across mobile/tablet/desktop, gap tied to `spacing.gutter` so grid spacing grows in step with everything else.
- **`status-dot`:** 8px filled circle, `#22C55E` in both themes — a deliberate exception to theme-pairing, since "available" should read the same color regardless of theme or size.

## Do's and Don'ts

- Do define every size-sensitive token (type, spacing, nav placement, grid columns) per breakpoint rather than picking one number and hoping it scales.
- Do let the nav change shape and placement across breakpoints — a bottom-fixed pill dock is a mobile-native pattern; forcing it onto a 1440px desktop would look like an unstyled mobile web view, not a considered desktop layout.
- Do keep glass reserved for floating/overlapping surfaces at every size — never apply it to full-page backgrounds or long text blocks, mobile or desktop.
- Do put a soft gradient or blurred shape behind every glass element, sized to the current viewport, so blur always has something to refract.
- Do keep both theme token sets structurally identical so switching is a data swap, independent of the active breakpoint.
- Don't treat tablet as "just a smaller desktop" — it gets its own nav and grid state (2-column, labeled dock), not an in-between guess.
- Don't combine flat and glass styling on one component at any size.
- Don't let glass fill opacity exceed ~0.6 in light mode or ~0.22 in dark mode — past that it reads as a solid gray box instead of translucent.
- Don't drop the 1px border on a glass surface — without the light-catching edge, blur alone looks like a rendering glitch rather than a material, at any screen size.
