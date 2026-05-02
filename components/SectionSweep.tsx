"use client";

import { useEffect, useRef } from "react";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Drop as the first child of any positioned (`relative`) section. When the
// section enters viewport, a 1px accent line sweeps left-to-right across the
// section's top edge, then fades. Plays once per page load.
export default function SectionSweep() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const section = el.parentElement;
    if (!section) return;
    if (reduced()) return;

    let played = false;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played) return;
        played = true;
        obs.disconnect();
        // Restart the keyframe animation by removing/adding the class
        el.classList.remove("section-sweep-run");
        // Force reflow so the animation restarts cleanly
        void el.offsetWidth;
        el.classList.add("section-sweep-run");
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden"
    >
      <span className="section-sweep block h-full w-full" />
    </span>
  );
}
