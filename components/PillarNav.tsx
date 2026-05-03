"use client";

import { useEffect, useState } from "react";

type Pillar = { id: string; name: string };

type Props = {
  pillars: readonly Pillar[];
  intervalMs?: number;
};

export default function PillarNav({ pillars, intervalMs = 1300 }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % pillars.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [paused, pillars.length, intervalMs]);

  return (
    <nav
      data-hero="pillars"
      className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-xl text-fg-2 sm:text-2xl"
      aria-label="Pillars"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {pillars.map((p, i) => {
        const isActive = !paused && active === i;
        return (
          <span
            key={p.id}
            className="inline-flex items-center gap-x-3 whitespace-nowrap"
          >
            <a
              href={`#${p.id}`}
              data-pillar={p.id}
              data-cycle-active={isActive ? "true" : undefined}
              className="text-fg-2 transition-colors duration-300 ease-[cubic-bezier(0,0,0.2,1)] hover:text-[var(--accent)] data-[cycle-active=true]:text-[var(--accent)]"
            >
              {p.name}
            </a>
            {i < pillars.length - 1 && (
              <span aria-hidden className="text-fg-5">
                ·
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
