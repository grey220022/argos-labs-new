"use client";

import { useEffect, useRef } from "react";

// Hover-trace overlay: an SVG stroke that draws around the parent's perimeter.
// Two trigger modes:
//   - Pointer devices: CSS `group-hover` transition (instant, free)
//   - Touch devices  : IntersectionObserver fires once when the card enters
//                      view (parent gets `data-trace-fire`, animation plays)
// Drop inside any positioned element marked `group relative`.

type Props = {
  /** Border-radius (px) for the trace rect. Default 11.5 matches rounded-xl. */
  rx?: number;
};

export default function HoverTrace({ rx = 11.5 }: Props) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const card = svg.parentElement;
    if (!card) return;

    // Only activate IO trigger on devices that don't support hover (touch-only).
    // Desktop keeps the pure-CSS hover transition that the rect already has.
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let played = false;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played) return;
        played = true;
        obs.disconnect();
        card.setAttribute("data-trace-fire", "1");
      },
      { threshold: 0.4, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(card);
    return () => obs.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
    >
      <rect
        x="0.75"
        y="0.75"
        width="calc(100% - 1.5px)"
        height="calc(100% - 1.5px)"
        rx={rx}
        ry={rx}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={1.5}
        pathLength={1}
        strokeDasharray={1}
        vectorEffect="non-scaling-stroke"
        className="hover-trace-rect [stroke-dashoffset:1] motion-safe:transition-[stroke-dashoffset] motion-safe:duration-[750ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[stroke-dashoffset:0] motion-reduce:[stroke-dashoffset:0]"
      />
    </svg>
  );
}
