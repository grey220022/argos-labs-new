# Design System — Argos Labs

> **Read this before touching any UI.** Every visual decision in this repo defers here. Disagreements go in §Decisions Log, not in the code.

---

## Product Context

- **What this is**: All-in-One AI Execution Platform. Marketing site (single-page, anchored sections) introducing three equal-weight pillars: **Agents · Cloud · Growth**.
- **Who it's for**: Enterprise decision makers (CTO / Head of AI / procurement). Trust + execution capability are the two signals to project. Not developer-first, not consumer-first.
- **Space**: AI infra holding. Adjacent peers: Anthropic (tone), Vercel (motion), Linear (typography), Stripe (trust ladder). Not adjacent: most "AI startup with purple gradient" sites.
- **Project type**: Marketing site (Next.js 16 App Router + Tailwind v4, per project conventions). Future: separate dashboard / docs subdomains using the same tokens.

---

## Memorable Thing

> **"The platform behind execution."**

Every pixel serves this. Agents that ship work, infra that doesn't blink, growth that lands. The site itself should *feel* like running infrastructure—a low-pulse background grid, a build hash ticking in the corner, headings that compose themselves on scroll. If a design choice doesn't reinforce "this thing actually runs", drop it.

---

## Aesthetic Direction

- **Direction**: Industrial / Refined Tech. Pure-black canvas, type-driven, motion as proof-of-craft.
- **Decoration level**: Minimal. No illustrations, no patterns, no gradient backgrounds. Typography + restrained motion does the work.
- **Mood**: Calm authority. The page reads like a serious workshop, not a product launch banner.
- **Reference**: animejs.com — for the design *language* only (ease-out motion grammar, type density). The original token base was warm-dark; we flipped to pure black 2026-05-03 (see Decisions Log). Do **not** copy distinctive creative content; treat it as a token library.

---

## Color

### Approach
**Restrained-with-pillar-family**. Most surfaces are pure-black + neutral-grey. Color appears only to mark a pillar's territory. Three pillars, three hues, one pure-black base.

### Base (always present)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#000000` | Page background. Pure black. |
| `--bg-2 ~ bg-7` | `#0a0a0a` → `#383838` | Surfaces, cards, dividers (7 neutral ramp steps) |
| `--fg` | `#fafafa` | Primary text. Near-white, slight off for less harshness. |
| `--fg-2 ~ fg-8` | `#d4d4d4` → `#2a2a2a` | Muted text → near-invisible labels |

### Brand primary
**Indigo `#7c85ff`** (`--brand`). Used for: focus rings, primary CTA, hero accent character, top-of-fold ambient glow, default link color in editorial sections.

### Pillar hues (1 hex each, 8-step ramp generated)

| Pillar | Token | -1 (peak) | Where it appears |
|---|---|---|---|
| Agents | `--hue-agents` | `#7c85ff` (Indigo) | Pillar card border, section heading underline, in-section link, hover glow |
| Cloud | `--hue-cloud` | `#26f2d5` (Cyan) | Same scope, scoped to its section only |
| Growth | `--hue-growth` | `#ff7d36` (Corail) | Same |

> **Rule**: Outside its own section, a pillar hue is forbidden. No "agent indigo" appearing on a Growth card. Cross-pollination = brand drift.

### 8-step ramps
Each hue follows the animejs-derived ramp: `-1` (most saturated) → `-8` (collapses into `--bg`). Use `-1` for accents, `-3` for hover states, `-5/-6` for muted dividers, `-8` for tinted surfaces. See `reference-animejs/INFO.md §2.2` for the full table.

### Semantic
| Token | Value |
|---|---|
| `--success` | `#8dff55` (green-1) |
| `--warning` | `#ffcc2a` (yellow-1) |
| `--error` | `#ff4b4b` (red-1) |
| `--info` | `#4d9cff` (king-1) |

### Dark mode strategy
**Dark is the default and only mode at launch.** No light mode v1. (If/when added: invert `bg`/`fg`, drop hue saturation 15%, raise borders to oklch lightness +10%. Don't ship a half-baked light mode—worse than none.)

---

## Typography

### Stack

| Role | Family | Source | License |
|---|---|---|---|
| Display + body | **DINish** (variable: `wdth`, `wght`, `slnt`) | `public/fonts/DINish-VF.woff2` (162 KB) | SIL OFL ✅ |
| Code + small caps + tickers | **JetBrains Mono** | `public/fonts/JetBrainsMono-{Regular,Medium}.woff2` | Apache 2.0 ✅ |
| Decorative numbers (counters, version, timestamps) | **Major Mono Display** | Google Fonts CDN | OFL ✅ |

> **Forbidden**: Inter, Roboto, Helvetica, Space Grotesk, system-ui as primary, Berkeley Mono (paid), Matter (paid). DINish replaces both Inter (body) and Matter (display).

### Default variable axes
```css
font-family: var(--font-din);
font-variation-settings: "wdth" 120, "wght" 450, "slnt" 0;
```

`wdth: 120` = slightly wider than default — gives DINish a "tabular industrial" feel that matches the brand. Headings: bump `wght` to 600–700 and tighten with `letter-spacing`.

### Scale (rem, base 16px)

| Token | rem | px | Use |
|---|---|---|---|
| `--text-xxs` | 0.75 | 12 | Footnotes, ticker, version labels |
| `--text-xs` | 0.875 | 14 | Captions, micro-labels |
| `--text-s` | 1 | 16 | Body |
| `--text-m` | 1.125 | 18 | Lead paragraph |
| `--text-l` | 1.25 | 20 | Card titles |
| `--text-xl` | 1.5 → 1.75 | 24 → 28 | Section sub-headings |
| `--text-xxl` | 2 → 2.5 | 32 → 40 | Section headings (mobile → desktop) |
| `--text-xxxl` | 2.5 → 3.25 | 40 → 52 | Pillar card headings |
| `--text-xxxxl` | 2.5 → 4 | 40 → 64 | Hero H1 |

Responsive jumps via `clamp()` between 699/899/1199 breakpoints.

### Letter-spacing

| Context | Value |
|---|---|
| Hero H1 / large display | `-0.025em` to `-0.04em` (tight) |
| Section headings | `-0.0125em` |
| Body | `0` |
| Small-caps tags ("FOR ENTERPRISE") | `+0.06em` to `+0.075em` |

### Line-height

| Context | Value |
|---|---|
| Large display (≥40px) | `0.9 ~ 0.95` |
| Headings (20–32px) | `1.1 ~ 1.25` |
| Body | `1.5` |
| Tabular data | `1.3` |

---

## Spacing

- **Base unit**: 4px (`0.25rem`)
- **Density**: Comfortable, with deliberate large jumps
- **Scale** (no 32/48 — the gap creates rhythm):

| Token | rem | px |
|---|---|---|
| `--sp-1` | 0.25 | 4 |
| `--sp-2` | 0.5 | 8 |
| `--sp-3` | 0.75 | 12 |
| `--sp-4` | 1 | 16 |
| `--sp-5` | 1.5 | 24 |
| `--sp-7` | 4 | 64 |

> Skipping `--sp-6` (32px) is intentional. Forces the layout to either tighten in or jump to a section break. Defeats "everything looks the same" rhythm.

---

## Layout

- **Approach**: Hybrid. Marketing sections = creative-editorial (asymmetry, off-grid alignment); product/data sections (when they appear in docs/dashboard) = strict 12-col grid.
- **Max content width**: 1500px
- **Header height**: 3.5rem (mobile) / 4.5rem (desktop) — *spec only; v1 launches with no header. Pillar nav lives in-hero, see PillarNav.tsx.*
- **Breakpoints** (`max-width`): 699px / 899px / 1199px

### Border radius

| Token | Value | Use |
|---|---|---|
| `--r-xs` | 2px | Inline pills, version badges |
| `--r-s` | 4px | Inputs, small buttons |
| `--r-m` | 8px | Cards, modals |
| `--r-l` | 12px | Hero containers, large surfaces |
| `--r-full` | 9999px | Avatars, dot indicators |

### Z-index ladder
`-1` background grid · `0–3` flow · `10` sticky header · `100–106` overlays · `999` modal · `9999` toast.

### Homepage section order (locked)
```
1. Hero (warm-dark, brand primary indigo accent)
2. Logo wall — Backed By (trust before pitch)
3. Three service cards (single column on smaller screens; three columns on desktop)
4. Pillar deep-dives (3 long sections, each in its hue)
   - Agents: product-style (feature, code snippet, demo CTA)
   - Cloud: product-style
   - Growth: services-style (consulting · ad-buying · execution · BD; case metric, "Get a quote" CTA)
5. "We go beyond features" closing banner (typography-only, full-bleed)
6. Footer
```

---

## Motion

### Approach
**Anime.js timeline-driven, intentional, performance-budgeted.** Motion is the brand's proof-of-craft signal—but every animation is editorialized into a timeline; nothing free-runs.

### Library
```bash
bun add animejs
```
Wrap in `lib/motion.ts`. Expose four presets: `fadeUp`, `staggerCards`, `heroTimeline`, `glowPulse`. App code never imports `animejs` directly.

### Tokens

| Token | Value | Use |
|---|---|---|
| `--dur-1` | 100ms | Hover color/bg flips |
| `--dur-2` | 250ms | **Default** (transforms, opacity, filters) |
| `--dur-3` | 500ms | Card entrance, height transitions |
| `--dur-4` | 1200ms | Hero timeline span |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Default, all enter motion |
| `--ease-inout` | `cubic-bezier(0.5, 0, 0.5, 1)` | Symmetric — for stateful toggles |

> Default duration is **250ms**, deliberately slower than animejs.com's default (125ms). Enterprise audience reads sub-200ms motion as twitchy.

### Three motion roles (only)

1. **Signature** — fires once per session, hero only. SVG path-draws wordmark, character split-stagger on H1, pillar names light up sequentially via timeline. Total budget: 1.6s.
2. **Pulse** — always on, low intensity. Background dot grid (5–8% opacity) breathes; footer build hash tickers each second; live metric counters. Never blocks attention.
3. **Reveal** — every section. `IntersectionObserver`-gated stagger fade-up + spring on scroll-into-view. 60ms stagger between siblings, 600ms total per section.

### Forbidden motion patterns
- Cursor-tracking blob / mouse parallax tilt cards / gradient noise canvas (reads "2023 design blog demo")
- More than 3 elements animating simultaneously above the fold
- Any animation that delays LCP — anime.js only enhances post-hydration; SSR ships terminal state
- Decorative loops with no end state (anything `infinite` other than `--pulse-grid`)

### Accessibility & performance
- All motion respects `prefers-reduced-motion: reduce` → falls back to instant 200ms opacity-only fade
- Heavy animation gated to `IntersectionObserver` + `requestAnimationFrame`
- **JS budget for motion: ≤ 35KB gzip** (anime.js core ~17KB + our wrapper)
- First contentful paint = static; motion layers on after hydration

---

## Implementation Notes

### Tailwind v4 token bridge
```css
/* app/globals.css */
@theme {
  --color-bg: #252423;
  --color-fg: #f6f4f2;
  --color-brand: #7c85ff;
  --color-hue-agents: #7c85ff;
  --color-hue-cloud:  #26f2d5;
  --color-hue-growth: #ff7d36;

  --font-display: "DINish", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-5: 1.5rem;
  --spacing-7: 4rem;

  --radius-xs: 2px;
  --radius-s: 4px;
  --radius-m: 8px;
  --radius-l: 12px;

  --duration-1: 100ms;
  --duration-2: 250ms;
  --duration-3: 500ms;
  --duration-4: 1200ms;
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-inout: cubic-bezier(0.5, 0, 0.5, 1);
}
```

### Font loading
Self-host DINish + JetBrains Mono in `public/fonts/`. Use `next/font/local` with `display: "swap"`. Preload only DINish (display = body) — don't preload mono.

### Pillar section pattern
Each pillar section is wrapped in a CSS scope where its hue replaces `--accent`:
```tsx
<section data-pillar="agents" style={{ "--accent": "var(--color-hue-agents)" } as React.CSSProperties}>
```
Inside the section: borders, hovers, links all reference `var(--accent)`. Outside: `--accent` falls back to `--brand` (Indigo).

---

## Anti-Patterns (failing /design-review will flag these)

1. Purple gradient anywhere on the site
2. Three-column icon-circle feature grid
3. Centered-everything hero with symmetric whitespace
4. Gradient buttons as primary CTA
5. Stock-photo-style hero illustration
6. system-ui or Inter as primary font
7. Cursor-tracking effects, parallax tilts, glassmorphism
8. Cross-pollination of pillar hues outside their section
9. Animation longer than 1.6s above the fold
10. Light mode shipped half-finished

---

## Decisions Log

| Date | Decision | Rationale |
|---|---|---|
| 2026-05-02 | Created via `/design-consultation`. | Initial system. Audience pivot from B2B+B2C dual to enterprise decision makers; product pivot from "AI/Blockchain/Fintech" framing to "All-in-One AI Execution Platform" with four pillars (Agents · Cloud · Growth · BlockChain). |
| 2026-05-02 | Indigo `#7c85ff` chosen as brand primary. | Trust + intelligence read; pulls Agents (the lead pillar) up; legible on warm dark; non-overlapping with the other three pillar hues. |
| 2026-05-02 | Animejs.com adopted as design *language* reference, not visual template. | Pixel-cloning a third-party site for argos-labs raises trade-dress and IP concerns. Tokens (color ramps, type scale, motion timings) are functional and free to adopt; specific creative compositions are not. |
| 2026-05-02 | Default motion duration 250ms (slower than reference's 125ms). | Enterprise audience reads sub-200ms as twitchy; 250ms is calm without being sleepy. |
| 2026-05-02 | Spacing scale skips 32/48px deliberately. | Forces layouts to either tighten or jump to a break; eliminates the "every section feels the same" rhythm trap. |
| 2026-05-02 | Dark-only at launch. | Half-baked light modes are worse than none. Revisit when there's a real consumer surface. |
| 2026-05-02 | Anime.js wrapped behind `lib/motion.ts` with 4 presets. | App code never touches anime.js directly; motion changes happen in one file. |
| 2026-05-03 | Base palette flipped from warm-dark to pure-black neutral. `--bg` `#252423` → `#000000`; `--bg-2..7` and `--fg-*` rebuilt as neutral grays (`#0a0a0a → #383838`, `#fafafa → #2a2a2a`). | Stakeholder request for "纯黑色" canvas. Full ramp recalibration (option B) so cards/dividers/text don't visually clash with the new base. Pillar hues unchanged — they still own their sections. |
| 2026-05-08 | Hero video background added on `/` (desktop only, `hidden md:block`). | Stakeholder add-on. Acknowledged as an exception to "no decoration / no patterns / no gradient backgrounds" rule for the hero only. Mobile keeps pure-black per the original aesthetic to preserve LCP and text readability. |
| 2026-05-08 | OpenGraph + Twitter card metadata added; OG image generated at build time via `app/opengraph-image.tsx` + `next/og`; `app/robots.ts` and `app/sitemap.ts` added. `themeColor` updated `#252423` → `#000000` to match base palette flip. | Audit findings. Marketing site SEO / social-share hygiene. |

| 2026-10-20 | Consolidated the site into Agents, Cloud and Growth; three evenly spaced hero sectors and three desktop service cards. | Requested business-content cleanup. Retain existing fonts, dark palette and service hues; remove retired assets and mixed-audience customer totals. |

| 2026-10-20 | TASTE homepage board replaces the locked homepage sequence, neon cards, circular illustration and global ornamental grid/ticker. DINish and black ground retained; homepage actions use white, surfaces charcoal, square corners, 8px gaps and equal 16/24px margins. Body 16/18px; no micro-labels. | User requested TASTE redesign. Override prior homepage palette/layout/motion details with neutral hierarchy, actual campus photographs and a service-to-email selector. Cloud route keeps its scoped hues. Shared reveals use 250ms, 16px travel with terminal SSR state and no reduced-motion travel. |
