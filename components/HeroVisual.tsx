"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Mobile / low-end browsers (incl. WeChat X5) get a lighter timeline:
// arc draw + slow rotation + center pulse — but no 88-particle drift.
const isLowMotionViewport = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 699px)").matches;

const SIZE = 520;
const C = SIZE / 2;
const R_OUTER = 240;
const R_TICK_INNER = 222;
const R_LABEL = 200;
const R_RING_1 = 170;
const R_RING_2 = 130;
const R_RING_3 = 90;
const R_CENTER = 6;

type Point = { x: number; y: number };

const polar = (deg: number, r: number): Point => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: C + r * Math.cos(rad), y: C + r * Math.sin(rad) };
};

const arcPath = (start: number, end: number, r: number) => {
  const a = polar(start, r);
  const b = polar(end, r);
  const largeArc = end - start > 180 ? 1 : 0;
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
};

type Pillar = {
  id: "agents" | "cloud" | "growth" | "chain";
  hue: string;
  label: string;
  start: number;
  end: number;
  labelAngle: number;
};

const PILLARS: readonly Pillar[] = [
  { id: "agents", hue: "var(--color-hue-agents)", label: "AGENTS", start: -40, end: 40, labelAngle: 0 },
  { id: "cloud", hue: "var(--color-hue-cloud)", label: "CLOUD", start: 50, end: 130, labelAngle: 90 },
  { id: "growth", hue: "var(--color-hue-growth)", label: "GROWTH", start: 140, end: 220, labelAngle: 180 },
  { id: "chain", hue: "var(--color-hue-chain)", label: "CHAIN", start: 230, end: 310, labelAngle: 270 },
];

// Deterministic PRNG so SSR and client agree on particle positions.
const seeded = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

const PARTICLES_PER_Q = 22;

type Particle = { startX: number; startY: number; delay: number };

const PARTICLES: Record<Pillar["id"], Particle[]> = (() => {
  const out: Record<string, Particle[]> = {};
  PILLARS.forEach((p, idx) => {
    const rng = seeded(idx * 7919 + 31);
    const arr: Particle[] = [];
    for (let i = 0; i < PARTICLES_PER_Q; i++) {
      const angle = p.start + rng() * (p.end - p.start);
      const radius = 55 + rng() * 105;
      const pos = polar(angle, radius);
      arr.push({
        startX: Number(pos.x.toFixed(2)),
        startY: Number(pos.y.toFixed(2)),
        delay: Math.round(rng() * 2800),
      });
    }
    out[p.id] = arr;
  });
  return out as Record<Pillar["id"], Particle[]>;
})();

const TICKS_PER_Q = 16;

type Tick = { x1: number; y1: number; x2: number; y2: number };

const TICKS: Record<Pillar["id"], Tick[]> = (() => {
  const out: Record<string, Tick[]> = {};
  PILLARS.forEach((p) => {
    const arr: Tick[] = [];
    for (let i = 0; i <= TICKS_PER_Q; i++) {
      const angle = p.start + ((p.end - p.start) * i) / TICKS_PER_Q;
      const o = polar(angle, R_OUTER);
      const inn = polar(angle, R_TICK_INNER);
      arr.push({
        x1: Number(o.x.toFixed(2)),
        y1: Number(o.y.toFixed(2)),
        x2: Number(inn.x.toFixed(2)),
        y2: Number(inn.y.toFixed(2)),
      });
    }
    out[p.id] = arr;
  });
  return out as Record<Pillar["id"], Tick[]>;
})();

type Anim = ReturnType<typeof animate>;

export default function HeroVisual() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (reduced()) return;

    const anims: Anim[] = [];
    let started = false;

    const start = () => {
      if (started) return;
      started = true;

      // 1. Arc draw-on (stagger 4 quadrants)
      anims.push(
        animate(svg.querySelectorAll("[data-arc]"), {
          strokeDashoffset: [1, 0],
          duration: 900,
          delay: stagger(140),
          ease: "outCubic",
        })
      );

      // 2. Slow rotation of arc group only (labels stay fixed)
      const arcGroup = svg.querySelector<SVGGElement>("[data-arc-group]");
      if (arcGroup) {
        anims.push(
          animate(arcGroup, {
            rotate: 360,
            duration: 90000,
            ease: "linear",
            loop: true,
          })
        );
      }

      // 3. Center pulse
      const center = svg.querySelector<SVGCircleElement>("[data-center]");
      if (center) {
        anims.push(
          animate(center, {
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.18, 1],
            duration: 2400,
            ease: "inOutSine",
            loop: true,
          })
        );
      }

      // 4. Particle drift (each fades in at start position, drifts toward center, fades out)
      // Skipped on small viewports — 88 looping anime.js timelines are the heaviest piece
      // and stutter on WeChat X5 / low-end Android. Static SVG circles still render.
      if (isLowMotionViewport()) return;
      const particles = svg.querySelectorAll<SVGCircleElement>("[data-particle]");
      particles.forEach((node) => {
        const sx = parseFloat(node.dataset.startx ?? "0");
        const sy = parseFloat(node.dataset.starty ?? "0");
        const delay = parseFloat(node.dataset.delay ?? "0");
        anims.push(
          animate(node, {
            cx: [sx, C],
            cy: [sy, C],
            opacity: [
              { to: 0, duration: 0 },
              { to: 0.55, duration: 700 },
              { to: 0.55, duration: 1100 },
              { to: 0, duration: 800 },
            ],
            ease: "linear",
            loop: true,
            delay,
          })
        );
      });
    };

    // Pause loops when tab hidden
    const onVis = () => {
      if (document.hidden) anims.forEach((a) => a.pause());
      else if (started) anims.forEach((a) => a.resume());
    };
    document.addEventListener("visibilitychange", onVis);

    // Only start animating once the SVG is in view
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
      },
      { threshold: 0.1 }
    );
    obs.observe(svg);

    return () => {
      obs.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      anims.forEach((a) => a.pause());
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label="Argos Labs four-pillar visualization"
      className="block h-auto w-full max-w-[520px]"
    >
      <defs>
        <filter id="argos-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3.5" />
          <feComposite in2="SourceGraphic" operator="atop" />
        </filter>
      </defs>

      {/* Concentric reference rings */}
      <g data-rings>
        {[R_RING_1, R_RING_2, R_RING_3].map((r, i) => (
          <circle
            key={r}
            cx={C}
            cy={C}
            r={r}
            fill="none"
            stroke="var(--color-fg-7)"
            strokeWidth={1}
            opacity={0.55 - i * 0.1}
          />
        ))}
      </g>

      {/* Arc group — rotates slowly */}
      <g data-arc-group style={{ transformOrigin: `${C}px ${C}px` }}>
        {PILLARS.map((p) => (
          <g key={p.id}>
            <path
              data-arc={p.id}
              d={arcPath(p.start, p.end, R_OUTER)}
              fill="none"
              stroke={p.hue}
              strokeWidth={2}
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1}
            />
            {TICKS[p.id].map((t, i) => (
              <line
                key={i}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke={p.hue}
                strokeWidth={1}
                opacity={0.4}
              />
            ))}
          </g>
        ))}
      </g>

      {/* Pillar labels — do NOT rotate */}
      <g data-labels>
        {PILLARS.map((p) => {
          const pos = polar(p.labelAngle, R_LABEL);
          return (
            <text
              key={p.id}
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={p.hue}
              opacity={0.9}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
              }}
            >
              {p.label}
            </text>
          );
        })}
      </g>

      {/* Particle field — pillar-tinted dots drifting inward */}
      <g data-particle-field>
        {PILLARS.flatMap((p) =>
          PARTICLES[p.id].map((pt, i) => (
            <circle
              key={`${p.id}-${i}`}
              data-particle={p.id}
              data-startx={pt.startX}
              data-starty={pt.startY}
              data-delay={pt.delay}
              cx={pt.startX}
              cy={pt.startY}
              r={1.4}
              fill={p.hue}
              opacity={0}
            />
          ))
        )}
      </g>

      {/* Center "Argos eye" */}
      <circle
        data-center
        cx={C}
        cy={C}
        r={R_CENTER}
        fill="var(--color-brand)"
        filter="url(#argos-glow)"
        opacity={0.9}
        style={{ transformOrigin: `${C}px ${C}px` }}
      />
    </svg>
  );
}
