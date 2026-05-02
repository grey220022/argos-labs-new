"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function BackgroundGrid() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;

    const anim = animate(el, {
      opacity: [0.45, 1, 0.45],
      duration: 4800,
      ease: "inOutSine",
      loop: true,
    });

    const onVis = () => {
      if (document.hidden) anim.pause();
      else anim.resume();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      document.removeEventListener("visibilitychange", onVis);
      anim.pause();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-[0.45]"
      style={{
        backgroundImage:
          "radial-gradient(circle at center, rgba(246,244,242,0.07) 1px, transparent 1.5px)",
        backgroundSize: "32px 32px",
      }}
    />
  );
}
