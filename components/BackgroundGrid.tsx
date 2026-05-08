"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const GRID = 32; // matches background-size

export default function BackgroundGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const flashLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const flashLayer = flashLayerRef.current;
    if (!el || reduced()) return;

    // Mobile: no hero video, so grid carries more visual weight
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const breatheLow = isMobile ? 0.6 : 0.45;
    const flickerMin = isMobile ? 2000 : 3500;
    const flickerRange = isMobile ? 1500 : 3000;

    // Layer A — base grid breathes
    const breathe = animate(el, {
      opacity: [breatheLow, 1, breatheLow],
      duration: 4800,
      ease: "inOutSine",
      loop: true,
    });

    // Layer B — sparse single-dot flickers, suggesting "something is happening"
    let timer: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    const spawn = () => {
      if (cancelled || !flashLayer) return;
      const cols = Math.ceil(window.innerWidth / GRID);
      const rows = Math.ceil(window.innerHeight / GRID);
      const cx = Math.floor(Math.random() * cols) * GRID + GRID / 2;
      const cy = Math.floor(Math.random() * rows) * GRID + GRID / 2;

      const dot = document.createElement("span");
      dot.style.cssText = `
        position: absolute;
        left: ${cx}px;
        top: ${cy}px;
        width: 6px;
        height: 6px;
        margin-left: -3px;
        margin-top: -3px;
        border-radius: 9999px;
        background: var(--color-brand);
        box-shadow: 0 0 16px 2px var(--color-brand);
        opacity: 0;
        will-change: opacity, transform;
        pointer-events: none;
      `;
      flashLayer.appendChild(dot);

      animate(dot, {
        opacity: [
          { to: 0.55, duration: 200, ease: "outQuad" },
          { to: 0, duration: 700, ease: "inQuad" },
        ],
        scale: [
          { to: 1, duration: 0 },
          { to: 1.6, duration: 900, ease: "outQuad" },
        ],
      });

      // Clean up after ~1s
      setTimeout(() => {
        if (dot.parentNode) dot.parentNode.removeChild(dot);
      }, 1100);

      // Mobile: 2–3.5s. Desktop: 3.5–6.5s.
      const next = flickerMin + Math.random() * flickerRange;
      timer = setTimeout(spawn, next);
    };

    // Initial delay so flicker doesn't fire during hero intro
    timer = setTimeout(spawn, 2400);

    const onVis = () => {
      if (document.hidden) breathe.pause();
      else breathe.resume();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVis);
      breathe.pause();
      // Remove any orphan dots
      if (flashLayer) flashLayer.innerHTML = "";
    };
  }, []);

  return (
    <>
      <div
        ref={ref}
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.45]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, var(--grid-dot) 1px, transparent 1.5px)",
          backgroundSize: `${GRID}px ${GRID}px`,
        }}
      />
      <div
        ref={flashLayerRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      />
    </>
  );
}
