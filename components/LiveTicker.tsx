"use client";

import { useEffect, useState } from "react";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const BUILD = "a3f2e9c";
const REGIONS = 4;

export default function LiveTicker() {
  const [latency, setLatency] = useState(14);

  useEffect(() => {
    if (reduced()) return;

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      if (now - last >= 1000) {
        setLatency((prev) => {
          const drift = (Math.random() - 0.5) * 6;
          const next = Math.round(prev + drift);
          return Math.max(8, Math.min(22, next));
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

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-4 right-4 z-20 select-none font-mono text-[10px] tracking-[0.18em] text-fg-5 tabular-nums"
    >
      build {BUILD} · {String(latency).padStart(2, "0")}ms · {REGIONS} regions running
    </div>
  );
}
