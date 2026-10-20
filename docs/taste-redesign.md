# TASTE redesign — 2026-10-20

Installed using `npx skills add Leonxlnx/taste-skill`; pinned by skills-lock.json. Skill source lives locally in .agents/skills/design-taste-frontend. Direction: The well-kept board (dense-tiles), seed 1745902674, no redraws. Scope: homepage and shared footer/frame, preserving Cloud route and all content-cleanup regressions.

## Plan: exactly 15 phases

Each phase delivers reviewable code or a repository artifact. Commit groups are A (plan), B (implementation), C (verification); checks below are planned E2E outlines, not simulated passes.

| Phase | Description / deliverable | Git commit | Playwright E2E outline |
|---|---|---|---|
| 1 | Inventory existing routes and brand | A | Load home and Cloud |
| 2 | Record current screenshots and measured issues | A | Capture desktop, tablet, phone |
| 3 | Draw and choose composition | A | Check first-screen hierarchy |
| 4 | Inventory claims and content | A | Retired terms absent |
| 5 | Write copy deck and interaction intent | A | Check headings and mail target |
| 6 | Record tokens and brand exceptions | B | Check computed sizes and contrast |
| 7 | Build navigation and hero board | B | Follow all three service links |
| 8 | Build service narratives | B | Verify sections and Cloud route |
| 9 | Add service selector | B | Keyboard selection updates email |
| 10 | Restyle partner wall | B | Expand/collapse all 14 logos |
| 11 | Add location pictures and credits | B | Load images and credit links |
| 12 | Finish shared footer and responsive frame | B | No overflow at 390/768/1440 |
| 13 | Add reduced-motion-safe transitions | B | All content visible with motion off |
| 14 | Run browser inspector and visual critique | C | Three-width screenshots, fix findings |
| 15 | Build, regression tests, local preview | C | Home/Cloud/metadata/assets checks |

## Subject inventory and claims

Argos Labs; Station F; 5 Parvis Alan Turing; Paris 75013; Agents/Cloud/Growth; persistent agent state; explicit runtime budgets; multi-cloud engineering; model-token billing; international go-to-market; 30–90-day execution; existing fourteen partner marks. These are existing site statements, not newly verified performance promises. Avoid adding customer totals, endorsements or benchmark claims. Location pictures show the public campus, not Argos staff or owned facilities.

## Argument and copy deck

Idea: three execution disciplines fit together like a well-kept working board, anchored in the team's actual Paris location. Main action: select a need and send an email brief. The live thing is a real service selector, not a simulated product demo.

- Hero: “AI, put to work.” Enterprise AI agents, cloud infrastructure and international growth. “Explore our services”. Existing architectural film is decorative, not a product recording.
- Services: “Three ways forward.” Agents: persistent state, connected tools, observable runs. Cloud: autoscaling, multi-region deployment, usage billing. Growth: strategy, paid acquisition, execution, business development.
- Brief: “Where do we start?” Native radio choices update capability summary and a real prefilled email.
- Proof: “Our network.” Preserve existing fourteen marks without adding relationship claims.
- Location: “Built from Paris.” Station F address; independently credited public campus photographs.
- Footer: contact, LinkedIn, downloadable press kit.

## Design choices

Keep DINish, black ground and dark-only experience. New homepage uses neutral white actions and flat charcoal panels; no new hue. Existing Cloud hues retained. Board gaps 8px, equal margins 24px (16px phone), square surfaces, body 18px/16px, headings 64px/40px/32px. Larger headings distinguish topics without micro-labels. Shared footer uses readable text. Remove global decorative grid, fabricated ticker and progress chrome. Use existing reveal mechanism through lib/motion with 250ms travel and SSR-visible fallback.

Alternatives: a more corporate version could use fewer location images and denser capability lists; a more editorial version could give Station F photography a full-width opening. The chosen board makes the three services accessible in one scan.

Self-critique: this avoids generic template styling through a joined service composition, useful choice-to-email interaction and attributable imagery of the actual location. It still needs original Argos work examples to make the proof more specific.

## Verification

Before inspector: 14 FAIL, 4 WARN. Actual final checks and visual critique will be recorded here after implementation. No simulated results are reported as real tests.
