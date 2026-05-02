"use client";

import { useEffect, useRef } from "react";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Parsed = {
  prefix: string;
  target: number;
  suffix: string;
  decimals: number;
};

// "100+" → { prefix:"", target:100, suffix:"+", decimals:0 }
// "99.99%" → { prefix:"", target:99.99, suffix:"%", decimals:2 }
// "12 ms" → { prefix:"", target:12, suffix:" ms", decimals:0 }
// "$0" → { prefix:"$", target:0, suffix:"", decimals:0 }
function parseValue(value: string): Parsed | null {
  const match = value.match(/^(\D*?)(-?\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, num, suffix] = match;
  const decimals = (num.split(".")[1] || "").length;
  return { prefix, target: parseFloat(num), suffix, decimals };
}

function format(v: number, decimals: number): string {
  return v.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

type Props = {
  value: string;
  duration?: number;
  className?: string;
};

export default function Counter({
  value,
  duration = 900,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  // SSR ships the terminal value verbatim. Client hydrates, then ramps if
  // the metric is below the fold at mount; otherwise leaves it at terminal.
  // Updates happen via direct DOM mutation (textContent) to avoid React
  // re-rendering the component on every animation frame.
  useEffect(() => {
    const parsed = parseValue(value);
    if (!parsed || reduced()) return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const inViewAtMount =
      rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
    if (inViewAtMount) return;

    // Switch to 0 so the first paint after intersection starts low.
    el.textContent = `${parsed.prefix}${format(0, parsed.decimals)}${parsed.suffix}`;

    let raf = 0;
    let started = false;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        obs.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t); // outExpo
          const cur = parsed.target * eased;
          if (ref.current) {
            ref.current.textContent = `${parsed.prefix}${format(cur, parsed.decimals)}${parsed.suffix}`;
          }
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span
      ref={ref}
      className={`tabular-nums ${className ?? ""}`}
      aria-label={value}
    >
      {value}
    </span>
  );
}
