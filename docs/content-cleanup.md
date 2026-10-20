# AI services content cleanup

## Plan (15 phases)

Each row is a testable checkpoint. Commit groups keep related changes bisectable:
A = `docs: plan AI services content cleanup`, B = `fix: focus site on three AI service lines`,
C = `test: verify AI services content and navigation`.
The E2E column describes expected/simulated outcomes, **not executed results**.
Actual verification is recorded separately below.

| Phase | Description | Deliverable | Git commit | Playwright E2E outline / simulated expected result |
|---|---|---|---|---|
| 1 | Establish clean upstream baseline | Branch and route inventory | A | `/` and `/cloud` are the only product pages |
| 2 | Inventory public content | Text, assets, metadata scope | A | Include folded partner content and SVG labels |
| 3 | Update homepage navigation | Three service anchors | B | Every hero link resolves to an existing section |
| 4 | Update service cards | Three cards and responsive grid | B | Three desktop columns, stacked mobile cards |
| 5 | Update hero graphic | Three balanced service arcs | B | SVG exposes three service labels |
| 6 | Remove retired product code | Deleted unused section and styles | B | No retired product markup or selectors |
| 7 | Clean partner data | Relevant partner list and exact overflow count | B | Expand/collapse reveals the correct remaining logos |
| 8 | Remove retired public assets | Deleted unused industry logos | B | Old asset URLs return 404; remaining logos load |
| 9 | Rewrite Cloud hero | AI/cloud copy and metadata | B | Correct heading and description after direct navigation |
| 10 | Rewrite Cloud expertise | Existing AI engineering capabilities | B | LLM token and ordinary payment content remain |
| 11 | Correct customer proof | Remove mixed-audience count | B | No relabeled customer count; remaining metrics fit |
| 12 | Update social sharing | Clean description and OG artwork | B | No retired service in metadata or generated image |
| 13 | Align content guidance | Current INFO and design decision | B | Site continues using existing dark visual identity |
| 14 | Verify routes and responsive behavior | Reusable E2E suite and screenshots | C | Mobile/desktop navigation, assets, reduced motion, no overflow |
| 15 | Validate and publish review | Build/lint/types results and PR | C | Production server passes E2E; review contains actual results |

## Scope and decisions

- Existing production routes: `/`, `/cloud`; metadata routes: sitemap, robots, OG image.
- No separate retired product route exists. Remove its broken anchor entry; do not invent redirects.
- Preserve AI model tokens, authentication/security primitives, SVG circles, ordinary fintech and bank payments.
- Remove the mixed-audience customer total instead of implying it counts only AI customers.
- Preserve the existing fonts, dark palette and remaining service colors. Text cards use three columns on wide screens.
- Alternative layouts considered: a wider lead Agents card, or three full-width editorial rows. Use the existing card language for minimal change.
- This avoids generic redesign by retaining the site's typography, graphic and service-specific visual identity.
- Protected environment/auth/migration files are outside this change.
- GPTDAO remains: its [official description](https://gptdao.ai/category/) identifies a generative-AI community, not a wallet/trading service. A name substring alone is not grounds to remove an AI partner.
- The 2026-05-02 historical decision in `DESIGN.md` retains the former positioning for provenance; it is not published by the website. Regression test fixtures intentionally name removed content.
- The press archive contains only the two Argos wordmark SVGs. The hero poster depicts architecture and plants.

## Actual verification

Executed on 2026-10-20:

- `bun run lint`: passed. Excluded local third-party `reference-animejs` downloads
  from linting; these are ignored research artifacts, not application source.
- `bun x tsc --noEmit`: passed.
- `bun run build`: passed; `/`, `/cloud`, sitemap and robots statically generated.
  The existing OG edge route remains dynamic (Next.js emits its existing notice).
- `PLAYWRIGHT_CHANNEL=chrome bun run test:e2e`: **8 passed (14.8s)** against the
  production build, using installed Google Chrome with desktop and iPhone 13
  viewport emulation. This is not a claim of testing physical iOS Safari.
- First browser run: 6 passed, 2 desktop timeouts while waiting for the existing
  external background video to finish loading. Tests now wait for DOM readiness
  and assert page/interaction readiness explicitly; all 8 then passed.
- Verified three service links/cards/SVG sectors, all remaining 14 partner assets,
  mobile keyboard expansion/collapse, client-side Cloud navigation, retained model
  token billing and ordinary bank payment copy, no horizontal overflow, page-error
  collection, metadata/SSR text, generated OG image response, sitemap and 404s for
  both nonexistent retired routes plus all 12 removed public logos.
- Inspected desktop service-card and mobile homepage/Cloud screenshots. Screenshots
  are local ignored outputs under `test-results/`; generated test code is committed.
- Production source scan: no retired business terms in `app`, `components`, `lib`,
  `public` or `INFO.md`. The historical design decision and test fixtures are
  intentional non-published exceptions.
- No production database, protected file, deployment setting or primary-branch
  history was changed. Publish via the review branch and PR.
