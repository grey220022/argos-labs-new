# Site copy refresh

Scope: all rendered English copy on `/` and `/cloud`, shared footer, service brief, navigation/control labels, page metadata and social card. Preserve layout, service names and licensed image attribution. Existing unused legacy components are not published pages. User requested copy optimization; this pass does not publish automatically.

## Plan: 15 phases

| Phase | Description / deliverable | Git commit | Playwright E2E outline |
|---|---|---|---|
| 1 | Inventory rendered pages and shared copy | copy refresh | Load both routes |
| 2 | Define enterprise audience and tone | copy refresh | First screen names services |
| 3 | Review claim evidence in existing content | copy refresh | No unsupported guarantees |
| 4 | Draft homepage argument | copy refresh | Services have clear headings |
| 5 | Refine hero and navigation | copy refresh | Anchor links resolve |
| 6 | Refine Agents description | copy refresh | Agent capabilities visible |
| 7 | Refine Cloud overview | copy refresh | Cloud detail link works |
| 8 | Refine Growth description | copy refresh | Scope and duration readable |
| 9 | Refine interactive brief and email template | copy refresh | All choices produce correct emails |
| 10 | Refine network, location and footer | copy refresh | Credits, contact and kit remain available |
| 11 | Rewrite Cloud page claims and comparisons | copy refresh | Billing, model access and payment content remain |
| 12 | Align search and social copy | copy refresh | Title, description and OG render |
| 13 | Review narrow-screen line lengths | copy refresh | Headings fit at 390/768/1440 |
| 14 | Build and run regression checks | copy refresh | Both routes, controls, metadata and media |
| 15 | Record results and refresh preview | copy refresh | Local preview shows final copy |

## Editorial direction

Audience: enterprise teams evaluating AI implementation and cloud operations, plus businesses seeking international growth support. Offer: three service lines with a practical starting point. Next step: discuss the reader's workload, workflow or target market by email.

Use clear verbs, sentence case and short headings. Explain what the team does before describing benefits. Prefer concrete capabilities to broad “all-in-one platform” positioning. Keep existing capability claims without inventing evidence, customer counts or outcomes. Remove unsupported savings percentages, universal coverage promises and ambiguous service guarantees. Explain billing and support as scoped service terms.

## Homepage copy deck

- AI, put to work. We build AI agents, run cloud infrastructure and help businesses enter new markets.
- Three services. One team. From automating a workflow to running it in production and reaching a new market.
- Agents: Turn a workflow into a working agent. Connect tools, retain context and set clear limits on each task.
- Cloud: Cloud for AI. Managed by engineers. Deployment, scaling, usage and billing.
- Growth: Take your product to new markets. Positioning, acquisition, execution and partnerships.
- Contact: Tell us your goal. Select a service to prepare a short email brief. Emails ask for useful project context; no implied form submission or guaranteed response time.
- Location: Based in Paris. Exact Station F address and plainly attributed campus photos.

Alternatives: a more technical voice could lead with tooling and infrastructure choices; a more commercial voice could lead with market and cost objectives. This pass balances readable benefits with concrete service descriptions.

Self-critique: this avoids generic promotional copy by naming what gets built, operated and delivered. Without approved customer outcomes, the site should present capabilities rather than promise results.

## Delivered changes

| Surface | Previous framing | Revised framing |
|---|---|---|
| Search / sharing | All-in-One AI Execution Platform | AI Agents, Cloud & Growth |
| Homepage lead | One team to move your business forward | We build AI agents, run cloud infrastructure and help businesses enter new markets |
| Agents | More capable hands | Turn workflows into AI agents; retain context, use tools, review runs |
| Cloud | Moves with your AI; stops billing when your job stops | Managed by engineers; usage and billing terms explained |
| Growth | Good technology. A wider world. | Take your product to new markets; positioning, campaigns, sprints and partnerships |
| Contact | We’ll take it from there | Select a service and prepare an editable email draft |
| Cloud conversion | Start Free Trial | Talk to an architect |
| Cloud evidence | Unqualified savings / uptime / provider-count metrics | Existing workload capabilities and scoped support options |

Model names are stable families, not unverified versions. Cloud now has its own Open Graph and Twitter copy. Existing service routes, partner assets, social destinations and license/source URLs are preserved. No customer results or commercial terms were invented.

## Actual validation

- Production build and TypeScript passed after the final copy edits.
- ESLint and `git diff --check` passed.
- Final built version: 10/10 desktop/mobile Playwright tests passed in 10.0s. A temporary ignored Playwright config reused the running preview; test definitions are the repository suite.
- Homepage TASTE inspector at 1440/768/390: 0 FAIL, 1 WARN. The existing `no-poster` warning is intentional: a priority-loaded Next Image underlay serves the poster role, remains visible until decoded frames fade in and handles the reduced-motion fallback. No video implementation was changed in this copy pass.
- Cloud headings fit within two lines with no horizontal overflow at all three widths. The two overlong tablet headings were shortened to “AI operations” and “Cloud coordination”; narrow-card descriptions were trimmed further.
- Opened every final homepage screenshot, Cloud screenshots and the revised social card. Copy preserves legibility without changing the layout.

ROUND 3 (final copy review)
Seen in one second: the AI headline, followed by a concrete description of the three services.
Idea (one sentence): explain what Argos builds, operates and helps take to market, then ask for useful project context.
Live thing: service choice prepares a relevant, editable email draft; video controls remain functional.
Layout words by section: hero=board / services=fields / brief=selector / network=marks / location=photo-strip / footer=contact.
Scores: design 7 · usability 8 · creativity 6 · content 7.5 → overall 7.15.
Caps applied: originality remains limited by the existing general service positioning; this is an editorial pass, not a new design concept.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. desktop-page-01: the services headline still wraps across two lines. It remains readable; shortening it further would remove the one-team positioning.
2. tablet-copy: the existing Cloud three-column layout makes body paragraphs narrow. Descriptions were trimmed to the essential capabilities; a later layout pass could change this composition.
3. desktop-page-02: campus imagery establishes location but not client outcomes. Approved case studies would strengthen proof; none were fabricated.

No new imagery was introduced. Attribution and licenses remain recorded in docs/taste-redesign.md and public/images/station-f/credits.json.
