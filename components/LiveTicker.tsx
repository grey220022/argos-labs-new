"use client";

import { useEffect, useRef, useState } from "react";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const BUILD = "a3f2e9c";
const REGIONS = 4;
const SPARK_WIDTH = 36;
const SPARK_HEIGHT = 10;
const SPARK_SAMPLES = 16;

export default function LiveTicker() {
  const [latency, setLatency] = useState(14);
  const [history, setHistory] = useState<number[]>(() =>
    new Array(SPARK_SAMPLES).fill(14)
  );
  const [atFooter, setAtFooter] = useState(false);
  const sparkRef = useRef<SVGPolylineElement>(null);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const obs = new IntersectionObserver(
      ([entry]) => setAtFooter(entry.isIntersecting),
      { rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(footer);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (reduced()) return;

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      if (now - last >= 1000) {
        setLatency((prev) => {
          const drift = (Math.random() - 0.5) * 6;
          const next = Math.round(prev + drift);
          const clamped = Math.max(8, Math.min(22, next));
          setHistory((h) => {
            const trimmed = h.length >= SPARK_SAMPLES ? h.slice(1) : h.slice();
            trimmed.push(clamped);
            return trimmed;
          });
          return clamped;
        });
        last = now;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  // Map latency history to polyline points, normalized within [min,max] window.
  const points = (() => {
    const min = Math.min(...history);
    const max = Math.max(...history);
    const range = max - min || 1;
    const stepX = SPARK_WIDTH / (history.length - 1 || 1);
    return history
      .map((v, i) => {
        const x = (i * stepX).toFixed(2);
        const y = (
          SPARK_HEIGHT - ((v - min) / range) * (SPARK_HEIGHT - 1) - 0.5
        ).toFixed(2);
        return `${x},${y}`;
      })
      .join(" ");
  })();

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed bottom-4 right-4 z-20 hidden select-none items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-fg-5 tabular-nums transition-opacity duration-300 sm:flex ${
        atFooter ? "opacity-0" : "opacity-100"
      }`}
    >
      <span aria-hidden className="live-dot inline-block size-1.5 rounded-full" />
      <span>LIVE</span>
      <span aria-hidden className="text-fg-7">·</span>
      <span>build {BUILD}</span>
      <span aria-hidden className="text-fg-7">·</span>
      <span className="inline-flex items-center gap-1.5">
        <span>{String(latency).padStart(2, "0")}ms</span>
        <svg
          width={SPARK_WIDTH}
          height={SPARK_HEIGHT}
          viewBox={`0 0 ${SPARK_WIDTH} ${SPARK_HEIGHT}`}
          className="overflow-visible"
        >
          <polyline
            ref={sparkRef}
            points={points}
            fill="none"
            stroke="var(--color-brand)"
            strokeWidth={1}
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity={0.7}
          />
        </svg>
      </span>
      <span aria-hidden className="text-fg-7">·</span>
      <span>{REGIONS} regions running</span>
    </div>
  );
}
