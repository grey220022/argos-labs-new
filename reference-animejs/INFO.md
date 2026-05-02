# animejs.com — 设计系统参考

源站：https://animejs.com/  · 抓取时间 2026-05-02
**本文件用作 argos-labs 重做时的设计语言参考。仅迁移 token / 模式 / 节奏，不复制其原创创意内容。**

---

## 0. 用法说明

✅ 可借鉴（功能性，可放心用）：色阶系统、间距尺度、字号节奏、缓动曲线、动效时序、断点、布局比例、阴影/发光语言。
✅ 工具：anime.js 库本身 MIT，直接 `bun add animejs`。
⚠️ 字体看授权（见 §6）。
🚫 不要搬：anime.js 的 logo、英雄区演示动画的具体视觉、原创插画。

---

## 1. 整体调性

- **暖色深底**：背景不是纯黑，是带暖意的 `#252423`（油墨黑 / "warm black"）；前景 `#f6f4f2`（带米色的暖白）。整站观感像旧印刷品的负片。
- **小巧紧凑的交互**：transition 时长以 100–250ms 为主（最短到 50ms），动效快、不拖沓。
- **ease-out 主导**：原生 CSS 缓动几乎全是 `ease-out`；只有一条共享的 `cubic-bezier(.5, 0, .5, 1)`（对称 ease-in-out，等于 `easeInOutSine` 近似）。
- **JS 驱动的复杂动效用 anime.js 本身**：CSS `@keyframes` 几乎没用——意味着大动画都跑在 anime.js timeline 里，不是 CSS。
- **饱和高亮 + 发光**：`drop-shadow(0 0 3–6px <accent>)` + 深色底，制造小面积"霓虹"质感；mix-blend-mode 仅用 `plus-lighter`。

---

## 2. 配色 token（按角色组）

### 2.1 中性
```
--hex-bg-1..7   #252423 → #444342   背景由深到浅 7 阶
--hex-fg-1..8   #f6f4f2 → #2c2a28   前景由亮到暗 8 阶
--hex-black-*   #252423 系列（与 bg 接近，专门给"几乎纯黑"用）
--hex-white-*   #f6f4f2 系列（同理）
```

### 2.2 16 套强调色 × 8 阶亮度

每套都按 `-1`（最饱和最亮）→ `-8`（最暗，接近背景）的节奏排列。

| 色系 | -1（霓虹） | -3（中度） | -8（融入背景） |
|---|---|---|---|
| citrus（柠绿） | #f9f640 | #85842f | #2c2b23 |
| corail（珊瑚） | #ff7d36 | #884c2b | #2d2723 |
| cyan（青） | #26f2d5 | #248273 | #242b28 |
| green | #8dff55 | #548839 | #282c24 |
| indigo | #7c85ff | #4b4f87 | #28262b |
| king（皇家蓝） | #4d9cff | #365a87 | #25282b |
| lavender（薰衣草） | #a369ff | #5e4287 | #29252b |
| lime | #b7ff54 | #678838 | #292c23 |
| magenta | #e962bf | #7e3f69 | #2c2528 |
| orange | #ffa828 | #885f24 | #2d2822 |
| pink | #ff718b | #884651 | #2d2525 |
| purple | #c06ddf | #6b4479 | #2b2529 |
| red | #ff4b4b | #883534 | #2d2423 |
| sega（青蓝） | #33b3f1 | #2a6481 | #24282a |
| sky | #05dbe9 | #17767c | #232a2a |
| turquoise | #00ffaa | #148760 | #232c27 |
| yellow | #ffcc2a | #887025 | #2d2922 |

**节奏特征**：每套色到 `-8` 阶都收敛到接近 `--hex-bg-1`（暖黑），所以高亮色铺到极暗时和背景"同根同源"——这是整站观感统一的关键。

### 2.3 argos-labs 推荐挑色策略

可参考的做法：选 **2 个强调色**（推荐 cyan + corail，或 indigo + orange，互补 + 一冷一暖），按 1→8 阶生成自己的 token，背景延续 `#252423` 系或换成自己的暖黑。

---

## 3. 间距 / 圆角 / 字号

```
--margin-xxxs  .25rem    4px
--margin-xxs   .5rem     8px
--margin-xs    .75rem   12px
--margin-s     1rem     16px
--margin-m     1.5rem   24px
--margin-l     4rem     64px      ← 跳跃较大，没有 32/48
```

```
--br-xs        2px
--br-s         4px
--br-m         8px
--br-l        12px
```

```
--text-xxs   .75rem
--text-xs    .875rem
--text-s     1rem
--text-m     1rem ~ 1.125rem      （带响应式提升）
--text-l     1.25rem
--text-xl    1.5rem ~ 1.75rem
--text-xxl   2rem ~ 2.5rem
--text-xxxl  2.5rem ~ 3.25rem
--text-xxxxl 2.5rem ~ 4rem        （桌面 64px 大标题）
```

**字距（letter-spacing）**：标题用紧字距 `-.025em ~ -.04em`，小写英文标签用宽字距 `+.06em ~ +.075em`。这是品牌质感的关键之一。

**行高**：超大字 `0.8 ~ 0.95em`（紧凑、像海报标题），正文 `1.3 ~ 1.5em`。

---

## 4. 动效时序与缓动

```
极短（聚焦/激活反馈）   50ms      color, background-color
短（hover/click）        100ms     color, opacity, background
默认（小变换/transform） 125ms     transform / opacity / filter
中（高度/折叠）          250ms     height
长（出场动画）           500ms     transform
```

**只有一个缓动函数被命名复用**：`cubic-bezier(.5, 0, .5, 1)`（对称型 ease-in-out，类似 anime.js 的 `easeInOutSine`）。其他大量直接用 `ease-out`（CSS 原生）。

**实操建议**：argos-labs 的 token 只暴露 4 档：
```css
--ease: cubic-bezier(.5, 0, .5, 1);
--ease-out: cubic-bezier(0, 0, .2, 1);
--dur-fast: .1s;
--dur-base: .125s;
--dur-mid:  .25s;
--dur-slow: .5s;
```

复杂动效全部走 anime.js（详见 §7）。

---

## 5. 布局结构

- **断点**（max-width）：`699px`（手机/平板分界）、`899px`、`1199px`
- **最大内容宽度**：`1500px`
- **header 高度**：`3.5rem`（移动）/ `4.5rem`（桌面）
- **z-index 层级**：`-1`（背景层）、`0–3`（流内）、`10`（粘性元素）、`100–106`（顶栏/侧栏组）、`999`（弹窗）、`9999`（toast/调试）
- **box-shadow 主语言**：薄边 `0 0 0 1px <accent>` + 极淡投影 `0 1px 3px rgba(0,0,0,.03)`，大量用 `inset` 阴影做"内嵌"质感。
- **滤镜语言**：`blur(5–10px)` 用于背景虚化层；`drop-shadow(0 0 3–6px <accent>)` 给前景元素打"霓虹光晕"。

---

## 6. 字体

| 字体 | 用途 | 文件 | 授权 |
|---|---|---|---|
| **DINish** | 正文 + 标题（变量字体，wdth/wght/slnt 三轴） | `fonts/DINish-VF.woff2`（162 KB） | ✅ SIL OFL，免费商用，可直接打包 |
| **Berkeley Mono** | 代码块 + 装饰性等宽 | `fonts/BerkeleyMono-{Regular,Italic}.woff2` | ❌ **付费**（US Graphics Co.），不能直接打包 |
| **Digital-7 Mono Italic** | 装饰性数字（计时器/计数器风格） | `fonts/Digital-7MonoItalic.woff2`（4.5 KB） | ⚠️ 个人免费、商用需确认 |

**argos-labs 推荐字体栈**：
- 标题/正文：**DINish**（直接复刻原站手感，免费）或 **Inter / Geist**（更现代）
- 等宽：**JetBrains Mono** / **Geist Mono** / **IBM Plex Mono**（替代 Berkeley Mono）
- 装饰数字：**Major Mono Display** / **Audiowide**（替代 Digital-7）

CSS 变量用法：
```css
--font-body: "DINish", Helvetica Neue, Arial, sans-serif;
--font-code: "JetBrains Mono", monospace;
font-variation-settings: "wdth" 120, "wght" 450, "slnt" 0;  /* 默认略宽、中等粗 */
```

---

## 7. 动效驱动方式

原站几乎所有复杂动画跑在 **anime.js 自身**（毕竟是它的官网，做活广告）：
- 滚动联动 / 时间轴编排 / SVG morph / stagger（错峰） / 弹性物理感
- CSS `@keyframes` 在主样式表里几乎为零

**argos-labs 复用方案**：
```bash
bun add animejs
```
```ts
import { animate, createTimeline, stagger } from 'animejs';

// 卡片入场（参考节奏）
animate('.card', {
  translateY: [40, 0],
  opacity: [0, 1],
  duration: 500,
  easing: 'easeOutCubic',
  delay: stagger(60),
});

// 时间轴编排（参考英雄区）
const tl = createTimeline({ defaults: { ease: 'inOutSine', duration: 600 } });
tl.add('.brand', { scale: [0.94, 1], opacity: [0, 1] })
  .add('.tagline', { y: [20, 0], opacity: [0, 1] }, '-=300');
```

时长用 §4 的 token，缓动名优先 `easeOutCubic / easeOutQuad / inOutSine` 这三档。

---

## 8. 已下载资源清单（`reference-animejs/`）

```
raw/
  index.html       SPA 静态外壳（49 KB，内容全靠 JS 渲染）
  styles.css       主样式表（104 KB，未压缩单行）
js/
  scripts.js       主脚本（1 MB，含 anime.js 自身）
fonts/
  DINish-VF.woff2              ← 直接可用
  BerkeleyMono-{Regular,Italic}.woff2   ← 仅参考，需自购或换字
  Digital-7MonoItalic.woff2    ← 装饰用，确认授权
images/
  anime-js-logo-v4.svg   ← ❌ 仅作 logo 尺寸 / 留白参考，不要使用
meta/
  favicon.png
  og-image.png           ← ❌ anime.js 品牌图，不要使用
```

---

## 9. 落地清单（开 argos-labs 重做时直接照做）

1. **CSS token 文件**：复制 §2.2 的 16 套色阶到 `app/globals.css` 的 `:root`，按 §3 的 `--margin-* / --br-* / --text-*` 命名约定建立尺度。
2. **字体**：装 DINish（OFL）+ JetBrains Mono；写 `@font-face` 时用 `font-display: swap`。
3. **动效层**：`bun add animejs`，封装 `lib/motion.ts` 暴露 `fadeUp / staggerCards / heroTimeline` 三个预设。
4. **缓动 / 时长 token**：§4 的 4 档时长 + 2 个缓动写到 CSS 变量。
5. **布局骨架**：max-width 1500、header 4.5rem、断点 699/899/1199。
6. **品牌区分**：argos-labs 配色挑 2 个强调色（建议 cyan + corail，或换成与 Soll Protocol 既有蓝相关的 indigo + orange），保留暖黑底。
7. **每个区块的视觉创意**：用 §7 的动效语言 + argos-labs 自己的素材（AI / 区块链 / 金融主题）原创，不复刻 anime.js 的演示视觉。
