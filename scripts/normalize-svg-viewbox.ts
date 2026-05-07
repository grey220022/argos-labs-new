// Normalize SVG viewBoxes to crop tight to actual visible content.
// Uses svg-path-bbox for accurate cubic-bezier math, handles <g transform="translate/scale">.
//
// Usage:
//   bun run scripts/normalize-svg-viewbox.ts             (dry-run, prints findings)
//   bun run scripts/normalize-svg-viewbox.ts --write     (writes back to files)

import { readFileSync, writeFileSync } from "node:fs";
import { svgPathBbox } from "svg-path-bbox";

const FILES = [
  "aws-lockup.svg",
  "googlecloud-lockup.svg",
  "azure-lockup.svg",
  "alibabacloud-lockup.svg",
  "tencent-cloud.svg",
  "ovhcloud-lockup.svg",
];

type Box = [number, number, number, number]; // [minX, minY, maxX, maxY]

const EMPTY: Box = [Infinity, Infinity, -Infinity, -Infinity];

function unionBox(a: Box, b: Box): Box {
  return [
    Math.min(a[0], b[0]),
    Math.min(a[1], b[1]),
    Math.max(a[2], b[2]),
    Math.max(a[3], b[3]),
  ];
}

type Transform = { tx: number; ty: number; sx: number; sy: number };

const IDENTITY: Transform = { tx: 0, ty: 0, sx: 1, sy: 1 };

function compose(parent: Transform, child: Transform): Transform {
  // Apply child after parent: result = parent ∘ child
  return {
    sx: parent.sx * child.sx,
    sy: parent.sy * child.sy,
    tx: parent.tx + parent.sx * child.tx,
    ty: parent.ty + parent.sy * child.ty,
  };
}

function applyTransform(b: Box, t: Transform): Box {
  const [x0, y0, x1, y1] = b;
  const tx0 = x0 * t.sx + t.tx;
  const ty0 = y0 * t.sy + t.ty;
  const tx1 = x1 * t.sx + t.tx;
  const ty1 = y1 * t.sy + t.ty;
  return [
    Math.min(tx0, tx1),
    Math.min(ty0, ty1),
    Math.max(tx0, tx1),
    Math.max(ty0, ty1),
  ];
}

function parseTransform(attr: string | null): Transform {
  if (!attr) return IDENTITY;
  let t: Transform = { ...IDENTITY };
  // Walk through transforms left-to-right (SVG composes left-applied-first)
  const opRe =
    /(matrix|translate|scale)\s*\(\s*([-\d.eE+\s,]+)\s*\)/g;
  let m: RegExpExecArray | null;
  while ((m = opRe.exec(attr))) {
    const op = m[1];
    const args = m[2]
      .trim()
      .split(/[\s,]+/)
      .map(Number);
    if (op === "translate") {
      t = compose(t, { tx: args[0] || 0, ty: args[1] || 0, sx: 1, sy: 1 });
    } else if (op === "scale") {
      const sx = args[0] || 1;
      const sy = args[1] !== undefined ? args[1] : sx;
      t = compose(t, { tx: 0, ty: 0, sx, sy });
    } else if (op === "matrix" && args.length === 6) {
      // matrix(a,b,c,d,e,f) — we only support no-rotation/no-skew (b=c=0)
      const [a, b, c, d, e, f] = args;
      if (Math.abs(b) < 1e-6 && Math.abs(c) < 1e-6) {
        t = compose(t, { tx: e, ty: f, sx: a, sy: d });
      } else {
        // Skew/rotation present — bbox math gets hairy; skip with warning
        console.warn(
          `WARN: matrix(${args.join(",")}) has rotation/skew; bbox approximation may be loose`
        );
        t = compose(t, { tx: e, ty: f, sx: a, sy: d });
      }
    }
  }
  return t;
}

function bboxFromPathD(d: string): Box | null {
  try {
    const [x0, y0, x1, y1] = svgPathBbox(d);
    if (
      Number.isFinite(x0) &&
      Number.isFinite(y0) &&
      Number.isFinite(x1) &&
      Number.isFinite(y1)
    ) {
      return [x0, y0, x1, y1];
    }
  } catch {
    /* skip */
  }
  return null;
}

function bboxFromCircle(cx: number, cy: number, r: number): Box {
  return [cx - r, cy - r, cx + r, cy + r];
}

function bboxFromRect(x: number, y: number, w: number, h: number): Box {
  return [x, y, x + w, y + h];
}

function bboxFromPolyPoints(points: string): Box | null {
  const nums = points
    .trim()
    .split(/[\s,]+/)
    .map(Number)
    .filter((n) => !Number.isNaN(n));
  if (nums.length < 2) return null;
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i + 1 < nums.length; i += 2) {
    xs.push(nums[i]);
    ys.push(nums[i + 1]);
  }
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
}

// Walk SVG by finding tag opens/closes; track <g transform=...> stack.
function computeBbox(svg: string): Box {
  let total: Box = [...EMPTY];
  const stack: Transform[] = [IDENTITY];

  // Tokenize: every match is either <g [attrs]>, </g>, or self-closing primitive
  const tagRe =
    /<\s*(\/?)\s*(g|path|circle|rect|polygon|polyline|line|ellipse)\b([^>]*)\/?\s*>/g;

  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(svg))) {
    const close = m[1] === "/";
    const tag = m[2];
    const attrs = m[3];

    if (tag === "g") {
      if (close) {
        stack.pop();
      } else {
        const tAttr = attrs.match(/transform=["']([^"']+)["']/);
        const t = parseTransform(tAttr ? tAttr[1] : null);
        stack.push(compose(stack[stack.length - 1], t));
      }
      continue;
    }

    // Primitive
    const local = parseTransform(
      (attrs.match(/transform=["']([^"']+)["']/) ?? [null, null])[1]
    );
    const t = compose(stack[stack.length - 1], local);

    let local_box: Box | null = null;

    if (tag === "path") {
      const dm = attrs.match(/\bd=["']([^"']+)["']/);
      if (dm) local_box = bboxFromPathD(dm[1]);
    } else if (tag === "circle") {
      const cx = +(attrs.match(/\bcx=["']([^"']+)["']/)?.[1] ?? "0");
      const cy = +(attrs.match(/\bcy=["']([^"']+)["']/)?.[1] ?? "0");
      const r = +(attrs.match(/\br=["']([^"']+)["']/)?.[1] ?? "0");
      local_box = bboxFromCircle(cx, cy, r);
    } else if (tag === "rect") {
      const x = +(attrs.match(/\bx=["']([^"']+)["']/)?.[1] ?? "0");
      const y = +(attrs.match(/\by=["']([^"']+)["']/)?.[1] ?? "0");
      const w = +(attrs.match(/\bwidth=["']([^"']+)["']/)?.[1] ?? "0");
      const h = +(attrs.match(/\bheight=["']([^"']+)["']/)?.[1] ?? "0");
      local_box = bboxFromRect(x, y, w, h);
    } else if (tag === "ellipse") {
      const cx = +(attrs.match(/\bcx=["']([^"']+)["']/)?.[1] ?? "0");
      const cy = +(attrs.match(/\bcy=["']([^"']+)["']/)?.[1] ?? "0");
      const rx = +(attrs.match(/\brx=["']([^"']+)["']/)?.[1] ?? "0");
      const ry = +(attrs.match(/\bry=["']([^"']+)["']/)?.[1] ?? "0");
      local_box = [cx - rx, cy - ry, cx + rx, cy + ry];
    } else if (tag === "polygon" || tag === "polyline") {
      const pts = attrs.match(/\bpoints=["']([^"']+)["']/)?.[1];
      if (pts) local_box = bboxFromPolyPoints(pts);
    } else if (tag === "line") {
      const x1 = +(attrs.match(/\bx1=["']([^"']+)["']/)?.[1] ?? "0");
      const y1 = +(attrs.match(/\by1=["']([^"']+)["']/)?.[1] ?? "0");
      const x2 = +(attrs.match(/\bx2=["']([^"']+)["']/)?.[1] ?? "0");
      const y2 = +(attrs.match(/\by2=["']([^"']+)["']/)?.[1] ?? "0");
      local_box = [
        Math.min(x1, x2),
        Math.min(y1, y2),
        Math.max(x1, x2),
        Math.max(y1, y2),
      ];
    }

    if (local_box) {
      total = unionBox(total, applyTransform(local_box, t));
    }
  }

  return total;
}

function fmt(n: number): string {
  return Math.abs(n) < 0.05 ? n.toFixed(2) : n.toFixed(2);
}

function main() {
  const write = process.argv.includes("--write");
  console.log(`Mode: ${write ? "WRITE" : "DRY-RUN"}\n`);

  for (const f of FILES) {
    const path = `public/images/${f}`;
    const svg = readFileSync(path, "utf-8");
    const oldVb = svg.match(/viewBox=["']([^"']+)["']/)?.[1] ?? "(none)";

    const bb = computeBbox(svg);
    if (!Number.isFinite(bb[0])) {
      console.log(`${f}: SKIP (no extractable primitives)`);
      continue;
    }
    const [x0, y0, x1, y1] = bb;
    const w = x1 - x0;
    const h = y1 - y0;
    const newVb = `${fmt(x0)} ${fmt(y0)} ${fmt(w)} ${fmt(h)}`;

    // Compare to old viewBox (parse 4 numbers)
    const oldNums = oldVb.split(/[\s,]+/).map(Number);
    const oldW = oldNums[2] ?? NaN;
    const oldH = oldNums[3] ?? NaN;
    const padPctW = ((oldW - w) / oldW) * 100;
    const padPctH = ((oldH - h) / oldH) * 100;

    console.log(
      `${f.padEnd(34)} OLD: ${oldVb.padEnd(28)} → NEW: ${newVb.padEnd(28)}  pad: ${padPctW.toFixed(1)}%w / ${padPctH.toFixed(1)}%h`
    );

    if (write) {
      const updated = svg.replace(
        /viewBox=["']([^"']+)["']/,
        `viewBox="${newVb}"`
      );
      writeFileSync(path, updated);
    }
  }
}

main();
