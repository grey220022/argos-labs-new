<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Argos Labs — Project Rules

## Stack
- Next.js 16+ App Router · TypeScript strict · Tailwind v4 · Bun 1.0+
- Animation: anime.js v4, wrapped in `lib/motion.ts` (never import `animejs` directly in components)
- Self-hosted fonts in `public/fonts/`: DINish VF + JetBrains Mono. Major Mono Display via `next/font/google`.

## Read These Before Editing

| File | When |
|---|---|
| `DESIGN.md` | Before any UI / visual / motion work. Non-negotiable. |
| `INFO.md` | When working on copy / content / section structure (original site extraction). |
| `reference-animejs/INFO.md` | When extending the design system — token reference, not a template to copy. |

## Design System
Always read `DESIGN.md` before making any visual or UI decisions. All font choices, colors, spacing, motion, and aesthetic direction are defined there. Do not deviate without an entry in the Decisions Log. In `/qa` and `/design-review`, flag any code that doesn't match `DESIGN.md`.

## Hard Rules
- **Dark-only at launch.** No light mode v1.
- **Pillar hues stay in their section.** Cross-pollination = brand drift.
- **Motion JS budget ≤ 35KB gzip.** Heavy animation gated to `IntersectionObserver`.
- **Honor `prefers-reduced-motion`.** All `lib/motion.ts` presets check it.
- **SSR ships terminal state.** anime.js only enhances post-hydration; never block LCP.
- **No verbatim copy from animejs.com creative content.** Tokens fine, compositions/illustrations off-limits.

## Forbidden Visual Patterns (auto-flag in review)
Purple gradients · 3-column icon-circle grids · centered-everything heroes · gradient CTAs · cursor-tracking blobs · parallax tilt cards · glassmorphism · system-ui or Inter as primary font · Berkeley Mono / Matter (paid).

## Dev Server Discipline (inherited from monorepo conventions)
Single Next.js dev instance only. Before `bun run dev`, kill stale: `pkill -9 -f "next-server|next dev|next/dist"`. See parent repo conventions for keep-marker workflow at `/tmp/ksana-keep-dev` (note: argos-labs uses its own marker `/tmp/argos-keep-dev`).
