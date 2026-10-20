# Argos Labs — Current site content

Updated 2026-10-20. This replaces the original extraction as the current content guide. Historical source material remains available in Git history.

## Positioning

All-in-One AI Execution Platform. We help enterprises build with AI.

Three service lines: **Agents · Cloud · Growth**.

## Routes and sections

- `/`: hero and three-service graphic, partner wall, service cards, Agents, Cloud, Growth, closing banner and footer.
- `/cloud`: AI/fintech cloud engineering, providers, model gateway, engineering capabilities, service comparison, billing/support and infrastructure metrics.
- Metadata routes: `/sitemap.xml`, `/robots.txt`, `/opengraph-image`.
- No additional product pages or translated routes currently exist.

## Content rules

- Describe only capabilities supported by the existing site.
- Keep model-token billing, cloud infrastructure and ordinary financial services.
- Partner counts derive from the actual list in `components/LogoWall.tsx`.
- Do not infer customer totals for a narrower audience from a historical mixed-audience total.
- Keep public text, metadata, social artwork and public assets aligned.

## Contact and assets

- Email: `contact@argoslabs.io`.
- Headquarters: Station F, 5 Parv. Alan Turing, 75013 Paris.
- Logo kit: `public/press/argos-labs-logo-kit.zip`.
- Current partner assets: `public/images/`, referenced by the partner/provider lists.
- Hero video: local mobile video with existing desktop CDN source.
- Fonts and visual rules: see `DESIGN.md` and the implementation in `app/layout.tsx`.
