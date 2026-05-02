"use client";

import { useEffect, useRef } from "react";

// Top-of-viewport scroll progress bar. Fixed 1px line that fills brand color
// as the user scrolls. Direct DOM mutation keeps it cheap (no React re-renders).
export default function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    let raf = 0;
    let pending = false;

    const update = () => {
      pending = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) {
        fill.style.transform = "scaleX(0)";
        return;
      }
      const ratio = Math.max(0, Math.min(1, window.scrollY / max));
      fill.style.transform = `scaleX(${ratio})`;
    };

    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-30 h-px bg-fg-7"
    >
      <div
        ref={fillRef}
        className="h-full w-full origin-left bg-brand transition-transform duration-75 ease-linear"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
