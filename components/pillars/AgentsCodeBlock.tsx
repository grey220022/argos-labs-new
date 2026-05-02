"use client";

import { useEffect, useMemo, useRef } from "react";

const KEYWORDS = ["import", "from", "const", "new", "await", "return"];

type CharSpan = { ch: string; tinted: boolean };

// Pre-tokenize the source into per-character spans, marking keyword chars
// as "tinted" so the rendered output keeps the same syntax-highlight scheme
// as the prior tint() function — but at character granularity.
function precompute(src: string): CharSpan[] {
  const re = new RegExp(`\\b(${KEYWORDS.join("|")})\\b`, "g");
  const out: CharSpan[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    for (const ch of src.slice(last, m.index)) out.push({ ch, tinted: false });
    for (const ch of m[0]) out.push({ ch, tinted: true });
    last = m.index + m[0].length;
  }
  for (const ch of src.slice(last)) out.push({ ch, tinted: false });
  return out;
}

type Props = { code: string; className?: string };

const PER_CHAR_MS = 6; // typing speed
const FAST_FWD_PER_CHAR_MS = 2; // hold-down skip if user wants to scrub past

export default function AgentsCodeBlock({ code, className }: Props) {
  const codeRef = useRef<HTMLElement>(null);
  const chars = useMemo(() => precompute(code), [code]);

  useEffect(() => {
    const el = codeRef.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const items = Array.from(
      el.querySelectorAll<HTMLElement>("[data-typed-char]")
    );
    const caret = el.querySelector<HTMLElement>(".agent-caret");
    if (!items.length) return;

    if (reduced) {
      items.forEach((s) => {
        s.style.opacity = "1";
      });
      return;
    }

    let raf = 0;
    let started = false;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        obs.disconnect();

        const total = items.length;
        const start = performance.now();
        let lastIdx = 0;

        const tick = (now: number) => {
          const elapsed = now - start;
          const speed =
            elapsed > 1500 ? FAST_FWD_PER_CHAR_MS : PER_CHAR_MS;
          const idx = Math.min(total, Math.floor(elapsed / speed));
          for (let i = lastIdx; i < idx; i++) {
            items[i].style.opacity = "1";
          }
          if (caret && idx > lastIdx && idx > 0) {
            // Track the typing position with the blinking caret.
            items[idx - 1].after(caret);
          }
          lastIdx = idx;
          if (idx < total) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [code]);

  return (
    <pre className={className}>
      <code ref={codeRef}>
        {chars.map((c, i) => (
          <span
            key={i}
            data-typed-char
            className={c.tinted ? "text-[var(--accent)]" : undefined}
            style={{ opacity: 0 }}
          >
            {c.ch}
          </span>
        ))}
        <span aria-hidden className="agent-caret" />
      </code>
    </pre>
  );
}
