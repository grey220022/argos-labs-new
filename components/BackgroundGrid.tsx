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

    // Layer A — base grid breathes (existing behavior)
    const breathe = animate(el, {
      opacity: [0.45, 1, 0.45],
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

      // Schedule next: 3.5–6.5s
      const next = 3500 + Math.random() * 3000;
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
            "radial-gradient(circle at center, rgba(246,244,242,0.07) 1px, transparent 1.5px)",
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
