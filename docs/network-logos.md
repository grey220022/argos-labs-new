# Network logo additions

Request: add Alibaba, MiniMax, Z.ai, Shanghai Jiao Tong University, Beihang
University, Renmin University of China, Seoul National University, MIT,
ByteDance, TikTok and OVH to the existing homepage logo wall.

Alibaba uses the existing Alibaba Cloud wordmark; OVH uses OVHcloud. Keep the
current “Our network.” heading, monochrome tiles and mobile disclosure.

## 15-phase plan

These phases form one reviewable content commit, `feat: expand homepage network logos`.
Each phase produces a checkable artifact. The checks below are plans, not test results.

| Phase | Description | Deliverable | Git commit | Playwright E2E outline |
|---|---|---|---|---|
| 1 | Inspect the current wall | Existing 14-logo inventory | Shared content commit | Locate the network section |
| 2 | Resolve brand names | Canonical names and Alibaba/OVH mappings | Shared content commit | Check accessible image names |
| 3 | Review design constraints | Preserve the current tile treatment | Shared content commit | Compare desktop layout |
| 4 | Source MiniMax and Z.ai | Local official brand assets | Shared content commit | Request both images |
| 5 | Source ByteDance and TikTok | Local official brand assets | Shared content commit | Request both images |
| 6 | Source Chinese universities | Three local official university marks | Shared content commit | Request all three images |
| 7 | Source SNU and MIT | Two local official university marks | Shared content commit | Request both images |
| 8 | Reuse cloud brand assets | Alibaba Cloud and OVHcloud entries | Shared content commit | Check both render |
| 9 | Check asset integrity | Dimensions and passive image formats | Shared content commit | Verify images decode |
| 10 | Populate the wall | All 25 logo entries with descriptive alt text | Shared content commit | Count images and new names |
| 11 | Balance visual sizing | Readable wordmarks and university seals | Shared content commit | Capture desktop tiles |
| 12 | Preserve mobile behavior | Correct expanded count and keyboard toggle | Shared content commit | Expand and collapse with keyboard |
| 13 | Verify responsive layout | No clipping or horizontal overflow | Shared content commit | Inspect 1440, 768 and 390 px |
| 14 | Run project checks | Lint, build and relevant E2E results | Shared content commit | Run the existing content suite |
| 15 | Record provenance and preview | Source ledger, actual results, local preview | Shared content commit | Load the updated production build |

## Design review

Selected: keep the existing monochrome network wall. Alternatives for a later
design change are original brand colors or separate company/university groups.
The selected treatment avoids generic decorative effects by giving recognizable
marks consistent space and retaining the existing page typography and rhythm.

## Asset sources

Alibaba Cloud and OVHcloud reuse repository assets; official identity references:
[Alibaba Cloud](https://www.alibabacloud.com/) and
[OVHcloud](https://www.ovhcloud.com/en/).

New assets were retrieved on 2026-10-20 from official websites. Original artwork
is retained; raster assets are served through Next/Image. Z.ai preserves its
original black background and white letter instead of receiving the white filter.

| Brand | Local asset under `public/images/network/` | Official source |
|---|---|---|
| MiniMax | `minimax.webp`, 349×128 | [Official transparent white logo](https://www.minimax.io/assets/logo/minimax-horizontal-white.webp), [brand page](https://www.minimax.io/brand-vi) |
| Z.ai | `zai.svg`, 160×160 | [Official documentation](https://docs.z.ai/guides/overview/quick-start), [documentation logo](https://mintcdn.com/zhipu-32152247/B_E8wI-eiNa1QlPV/logo/light.svg) |
| Shanghai Jiao Tong University | `sjtu.svg`, 75×75 | [Official seal](https://www.sjtu.edu.cn/resource/assets/img/svg/Min-logo-pic.svg) |
| Beihang University | `beihang.png`, 316×68 | [Official university logo](https://www.buaa.edu.cn/images/logo.png) |
| Renmin University of China | `renmin.png`, 240×48 | [Official university logo](https://en.ruc.edu.cn/att/26.files/images/RUC_Logo.png) |
| Seoul National University | `snu.png`, 156×66 | [Official university logo](https://en.snu.ac.kr/_skin/eng/layout/image/snu-logo_lg.png) |
| MIT | `mit.svg`, 867×200 | [Official homepage](https://www.mit.edu/), unchanged header inline SVG |
| ByteDance | `bytedance.svg`, 256×44 | [Official homepage](https://www.bytedance.com/en/), decoded header image SVG |
| TikTok | `tiktok.png`, 10001×4167 | [Official design resources](https://developers.tiktok.com/docs/en/getting-started-design-guidelines), [logo pack](https://sf16-va.tiktokcdn.com/obj/eden-va2/uvzhqeh7nuhd/tt4d/logo-pack.zip) |

TikTok archive member: `Dev Portal Logo Pack/TikTok Logo Pack/TikTok – Logo – PNG [RGB]/Horizontal/TikTok-logo-RGB-Horizontal-white-simplified.png`.
All nine additions have an alpha channel. All four new SVGs were checked for
scripts, event handlers, embedded foreign content and external references; none
were present. Z.ai uses a local clip-path.

## Verification

Actual checks completed on 2026-10-20:

- `bun run lint` and `git diff --check`: passed.
- `bun run build`: passed, including TypeScript and static-page generation.
- Full Playwright suite: 10 passed, covering desktop and mobile.
- After the final MiniMax sizing adjustment: production build passed again and
  both homepage E2E cases passed.
- Screenshots inspected at 1440, 768 and 390 px. All 25 images decoded; no
  horizontal overflow or image clipping was detected at any of these widths.
- Mobile initially shows 7 logos; “Show 18 more” exposes all 25. Keyboard
  activation, `aria-expanded`, `aria-controls` and collapse behavior passed.
- New SVGs contain no active content or remote references. Downloaded raster
  artwork remains unmodified; Next/Image generates the delivered image sizes.

Local production preview: `http://127.0.0.1:3107/#trusted-by`.
