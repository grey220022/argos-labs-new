# Hero motion refinement

Intent: make the existing architectural scene move smoothly by default, keep the actual frame on pause and resume from the same position. Keep React responsible for UI state; a video ref invokes browser media playback only. No document selectors or manual DOM mutations.

## Fifteen phases

| Phase | Description and deliverable | Commit | Playwright outline |
|---|---|---|---|
| 1 | Inspect selected hero component | motion fix | Locate hero media |
| 2 | Inspect source video properties | motion fix | Media loads |
| 3 | Document behavior | motion fix | Default playback advances |
| 4 | Preserve current design | motion fix | Hero frame unchanged |
| 5 | Produce 60fps loop | motion fix | Loop duration and readiness |
| 6 | Preserve video element | motion fix | Same node after pause |
| 7 | Add media ref | motion fix | Pause freezes current time |
| 8 | Resume from current frame | motion fix | Resume time advances |
| 9 | Reflect playback events | motion fix | Button matches playing state |
| 10 | Handle failed playback | motion fix | Play button allows retry |
| 11 | Honor reduced motion | motion fix | Static poster and paused media |
| 12 | Keep keyboard operation | motion fix | Enter toggles playback |
| 13 | Build and lint | motion fix | Production server loads |
| 14 | Browser verification | motion fix | Desktop/mobile media checks |
| 15 | Refresh local preview | motion fix | Preview displays final build |

Actual results are recorded after checks; no simulated results are claimed.

## Actual verification

- ESLint and production build (including TypeScript) passed.
- Desktop/mobile Playwright: 2/2 passed, checking time advances, pause freezes the same frame, keyboard resume advances from the paused time, and reduced motion pauses/hides video while keeping the image.
- Source TASTE lint: 0 FAIL / 0 WARN. Browser inspector at 1440/768/390: 0 FAIL / 1 WARN. The warning is absence of a native video poster attribute; intentional because the existing priority-loaded Next Image underlay remains visible until decoded frames fade in, including on playback errors. No blank placeholder is shown.
- Opened all seven final screenshots. No layout changes or clipping seen.
- Output media: 854×480, 60fps, 23.93s, 623KB. Motion-compensated interpolation from the existing 24fps film, concatenated with its reverse. This is smoother playback, not a resolution increase.

ROUND 1
Seen in one second: the original architectural scene beside the AI headline.
Idea (one sentence): preserve the board design while making its existing scene move continuously.
Live thing: real playback, frame-preserving pause and resume.
Layout words by section: hero=board / services=fields / brief=selector / network=marks / paris=photo-strip.
Scores: design 7 · usability 8 · creativity 6 · content 7 → overall 7.1.
Caps applied: original composition and content unchanged; no new originality claimed.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. desktop-fold: original source remains 480p; interpolation improves motion, not fine detail. A future original HD render would improve sharpness.
2. tablet-fold: film is cropped to a tall panel, as before; main architectural subject remains visible.
3. mobile-fold: media occupies a separate row; preserve this readable layout rather than adding scroll or pointer effects.

Alternatives: a slower one-way original loop, or a static image with a subtle zoom. The selected forward/reverse loop avoids the hard reset without adding decorative UI. No new third-party imagery or sample content added.
