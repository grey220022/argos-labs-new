# Argos Labs — 原站点提取信息

源站：https://www.argoslabs.io/  · 抓取时间 2026-05-02

---

## 1. 站点元信息

| 字段 | 值 |
|---|---|
| `<title>` | `Argos Labs` |
| `<meta description>` | `Argos Labs, leading the way in lifestyle` |
| `<html lang>` | `en` |
| `og:title` | `Argos Labs` |
| `og:description` | `Argos Labs, leading the way in lifestyle` |
| `og:image` | `https://www.argoslabs.io//og.png` ← 双斜杠拼错，**实际 404，原站此资源缺失** |
| `og:image:size` | 1200 × 630 |
| `og:locale` | `en`，alternate `zh` / `fr`（实际页面 404，未上线） |
| `twitter:card` | `summary_large_image` |
| `twitter:creator` | `@Sollpay` |
| `manifest` | `/site.webmanifest`（已下载，name 字段是空的） |
| `favicon` | `/favicon.ico`、`/favicon-16x16.png`、`/apple-touch-icon.png`、`/android-chrome-192x192.png`、`/android-chrome-512x512.png` |
| 框架 | Next.js（App Router），Tailwind v4，背景视频 |
| `<meta robots>` | `noindex` ← 原站不希望被搜索引擎抓 |

---

## 2. 顶部导航

只有一个：

| 文案 | 链接 |
|---|---|
| **Contact** | `mailto:contact@argoslabs.io` |

Logo 链接到 `/`。

---

## 3. 页面区块（按出现顺序）

### 3.1 Hero — 全屏视频背景

- 背景视频：`/videos/landing.mp4`（已下载，7.6 MB）
- 主标题：**Accelerating AI, Blockchain, and Fintech to**
- 副标题：**Onboard the Next Billion Users Onchain**
- CTA：`Contact` → `mailto:contact@argoslabs.io`

### 3.2 Backed By — Logo 墙

- 标题（注意原站拼写）：**BAcked by Investors and Partners**
- 10 个机构 logo（详见 §6）

### 3.3 三大支柱

- 大标题：
  > **Beyond features — Empowering**
  > **Empowering daily life with AI, fintech and blockchain**
  > **Where Smart Gets Smarter**
- 三张视频卡片（按顺序）：

| 卡片 | 标题 | 副文案 | 视频 |
|---|---|---|---|
| 1 | Artificial Intelligence | Powering Trust Through Technology | `/videos/ai.mp4`（11.2 MB） |
| 2 | Blockchain | Reimagining the Future of Finance | `/videos/blockchain.mp4`（5.9 MB） |
| 3 | Fintech | （无副文案） | `/videos/fintech.mp4`（5.5 MB） |

### 3.4 Soll Protocol（B2B）

- 上标：**A Zero-knowledge Powered**
- 标题：**Smart Wallet Infrastructure on Solana**
- 副标题：**Soll Protocol:** / **Web3 Access Made Easy**
- 标签：**For Business**
- 小标题：**B2B solution behind Sollpay**
- 正文：
  > Soll protocol offered as a simple SDK that lets any platform integrate non-custodial wallets using just a phone number or email.
  >
  > With built-in zero-knowledge (ZK) proof security and smart wallet infrastructure, businesses can onboard users to Web3 effortlessly—no private keys, no complexity.
  >
  > Enable secure, seamless crypto access in your app with the Soll Protocol.
- 无独立 CTA（共用 Contact）

### 3.5 Sollpay（B2C）

- 标签：**For Consumer**
- 小标题：**Sollpay - The Smart Wallet for Everyone**
- 正文：
  > Sollpay is a non-custodial smart wallet that lets anyone buy, trade, and stake crypto using just a phone number or email address — no seed phrases, no private keys, no hassle.
  >
  > Powered by Solana, zero-knowledge (ZK) proof security, and abstract wallet technology, Sollpay offers a fast, secure, and easy way to access the world of Web3.
  >
  > Start your crypto journey in seconds with Sollpay — the wallet that feels like magic.
- CTA：**Explorer Sollpay**（注意原站拼错，应为 Explore）→ `https://sollpay.com/?ref=https://www.argoslabs.io/`

### 3.6 团队背景

- 标题：**Our Team Background**
- 内容：与 §3.2 同一组机构 logo 墙复用（HTML 中所有 logo `alt="team1"`，alt 文本未做差异化）

### 3.7 收尾大字 banner

- **We go beyond features — we build real-world impact**

---

## 4. Footer

| 字段 | 内容 |
|---|---|
| 联系按钮 | Contact → `mailto:contact@argoslabs.io` |
| 地址 | Station F, 5 Parv. Alan Turing, 75013 Paris |
| 版权 | © Argos Lab 2025 / ©2025 Argos Lab. All rights reserved. |

无社交媒体链接（Twitter creator 元标签写了 `@Sollpay` 但页面没暴露）。

---

## 5. 全部链接清单

| 类型 | URL | 文案 |
|---|---|---|
| mailto | `mailto:contact@argoslabs.io` | Contact（出现在导航 / Hero / Footer） |
| 内链 | `/` | Logo |
| 外链 | `https://sollpay.com/?ref=https://www.argoslabs.io/` | Explorer Sollpay |

---

## 6. 资源清单（全部已本地化到 `./`）

### 视频 `videos/`
- `landing.mp4` — Hero 背景 · 7.6 MB
- `ai.mp4` — AI 卡片 · 11.2 MB
- `blockchain.mp4` — Blockchain 卡片 · 5.9 MB
- `fintech.mp4` — Fintech 卡片 · 5.5 MB

### Logo `images/`（合作机构）
| 文件 | 机构 |
|---|---|
| stationf.png | Station F |
| shift.png | Shift |
| hec.png | HEC Paris |
| alstom.png | Alstom |
| ledger.png | Ledger |
| arts-et-metiers.png | Arts et Métiers |
| quantstamp.png | Quantstamp |
| nyu.png | NYU |
| PSL.png | PSL（Paris Sciences et Lettres） |
| polytechnique.png | École Polytechnique |

### 字体 `fonts/`（**Matter 系列，商用字体，注意版权**）
| 文件 | 字重 |
|---|---|
| `debd5e0bf0ba5bf0-s.p.ttf` | matter 300 (Light) |
| `e2e63e84307592e3-s.p.ttf` | matter 400 (Regular) |
| `6008137984dbd1df-s.p.ttf` | matter 500 (Medium) |
| `c79a8fccc9a080f1-s.p.ttf` | matter 600 (SemiBold) |
| `db8f7776298f72f4-s.p.ttf` | matter 700 (Bold) |
| `5839f0c4c6e77d4e-s.p.ttf` | matter 900 (Black) |
| `a34f9d1faa5f3315-s.p.woff2` | Inter（Latin 子集） |

> ⚠️ Matter 是 [Displaay Type Foundry](https://displaay.net/typeface/matter/) 出品的付费字体。复刻站点前请购买授权或换字（推荐替代：Inter、Geist、General Sans）。

### Favicon / PWA `meta/`
- `favicon.ico`、`favicon-16x16.png`、`apple-touch-icon.png`
- `android-chrome-192x192.png`、`android-chrome-512x512.png`
- `site.webmanifest`（name/short_name 都是空字符串，theme/background `#ffffff`）

### 原始素材 `raw/`
- `index.html` — 主页 SSR 完整 HTML（425 KB）
- `styles.css` — 主 CSS bundle（25 KB，Tailwind v4 编译产物）
- `text.txt` — 提取后的纯正文
- `zh.html` / `fr.html` — 404 占位（说明这两个语言版本只在 og 元数据中预留、未实际上线）

---

## 7. 设计 token（从 CSS 解析）

```css
--background: oklch(1 0 0)              /* 纯白 */
--foreground: oklch(.129 .042 264.695)  /* 接近 #0a0e1a 深蓝黑 */
--primary:    oklch(.19 .01 248.54)     /* 深蓝灰 */
--accent:     oklch(.968 .007 247.896)  /* 极浅冷灰 */
--secondary:  oklch(.968 .007 247.896)  /* 与 accent 相同 */
--muted:      oklch(.968 .007 247.896)
--border:     black
--ring:       oklch(.704 .04 256.788)
--font-family-matter:
  "matter", "matter Fallback",
  system-ui, -apple-system, BlinkMacSystemFont,
  Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
  Open Sans, Helvetica Neue, sans-serif
```

观察：
- 配色基本就是**白底 + 接近黑的深色文字** + 视频本身的色彩主导画面，没有品牌强色。
- 标题字号节奏：`text-[28px] sm:text-[40px]` 三大支柱卡片标题、`text-[30px] sm:text-[58px]` 收尾大字、`text-2xl sm:text-[32px]` 子区块标题。
- 字重以 `font-medium` (500) 为主，强调时不重，体现"安静的奢侈"调性。
- 标题层级**只用 `<h4>` 和 `<h5>`**——没有 h1/h2/h3，SEO 上是个槽点；复刻时建议规范化层级。

---

## 8. 复刻时建议修正的原站问题

1. `og:image` URL 双斜杠 → 404（`https://www.argoslabs.io//og.png`）
2. `Backed` 拼成 `BAcked`
3. `Explore` 拼成 `Explorer`
4. 所有 logo `alt="team1"`，无障碍 + SEO 双失分
5. 标题层级缺 `<h1>`/`<h2>`/`<h3>`，全用 `<h4>`/`<h5>`
6. `<meta robots="noindex">`（原站不希望被搜索引擎收录，复刻时应去掉）
7. `site.webmanifest` 的 `name`/`short_name` 是空字符串
8. zh/fr 元数据预留但路由未实现
9. Matter 字体直接打包入仓库，可能侵权（如未购授权）
