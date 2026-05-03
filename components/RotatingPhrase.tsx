"use client";

import { useEffect, useRef } from "react";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Props = {
  phrases: readonly string[];
  className?: string;
  /** ms per char while typing in */
  typeMs?: number;
  /** ms per char while erasing — faster than typing feels right */
  eraseMs?: number;
  /** ms to hold a fully-typed phrase before erasing */
  holdMs?: number;
  /** ms gap between erase end and next type start */
  gapMs?: number;
  /** ms to wait after mount before starting (let CharStagger settle first) */
  startDelay?: number;
};

// Typewriter loop: types phrase[i] → holds → erases → types phrase[i+1] → repeat.
// SSR ships phrases[0] verbatim so search engines / no-JS clients see real content.
// Marked `data-no-split` so CharStagger leaves this element alone.
export default function RotatingPhrase({
  phrases,
  className = "",
  typeMs = 55,
  eraseMs = 30,
  holdMs = 1800,
  gapMs = 240,
  startDelay = 1400,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || phrases.length === 0) return;

    if (reduced()) {
      el.textContent = phrases[0];
      return;
    }

    let raf = 0;
    let cancelled = false;
    let phraseIndex = 0;

    const wait = (ms: number, then: () => void) => {
      const start = performance.now();
      const tick = (now: number) => {
        if (cancelled) return;
        if (now - start >= ms) then();
        else raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const type = (text: string, then: () => void) => {
      let lastI = -1;
      const start = performance.now();
      const tick = (now: number) => {
        if (cancelled) return;
        const i = Math.min(text.length, Math.floor((now - start) / typeMs));
        if (i !== lastI) {
          lastI = i;
          if (ref.current) ref.current.textContent = text.slice(0, i);
        }
        if (i < text.length) raf = requestAnimationFrame(tick);
        else then();
      };
      raf = requestAnimationFrame(tick);
    };

    const erase = (then: () => void) => {
      const fullText = ref.current?.textContent ?? "";
      const fromLen = fullText.length;
      let lastErased = -1;
      const start = performance.now();
      const tick = (now: number) => {
        if (cancelled) return;
        const erased = Math.min(fromLen, Math.floor((now - start) / eraseMs));
        if (erased !== lastErased) {
          lastErased = erased;
          if (ref.current) {
            ref.current.textContent = fullText.slice(0, fromLen - erased);
          }
        }
        if (erased < fromLen) raf = requestAnimationFrame(tick);
        else then();
      };
      raf = requestAnimationFrame(tick);
    };

    const cycle = () => {
      if (cancelled) return;
      wait(holdMs, () => {
        erase(() => {
          wait(gapMs, () => {
            phraseIndex = (phraseIndex + 1) % phrases.length;
            type(phrases[phraseIndex], cycle);
          });
        });
      });
    };

    wait(startDelay, cycle);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [phrases, typeMs, eraseMs, holdMs, gapMs, startDelay]);

  return (
    <span
      ref={ref}
      data-no-split
      className={className}
      aria-live="polite"
    >
      {phrases[0]}
    </span>
  );
}
