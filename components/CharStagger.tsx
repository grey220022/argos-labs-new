"use client";

import { useEffect } from "react";
import { animate, stagger } from "animejs";
import { splitWordsAndChars } from "@/lib/text-split";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Props = {
  /** CSS selector of the heading element to split. */
  selector: string;
  /** ms before the stagger sequence starts. */
  startDelay?: number;
  /** ms between consecutive char reveals. */
  perChar?: number;
  /** ms duration of each char's fade-up. */
  charDuration?: number;
};

export default function CharStagger({
  selector,
  startDelay = 0,
  perChar = 22,
  charDuration = 420,
}: Props) {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(selector);
    if (!el) return;

    if (reduced()) {
      el.style.opacity = "1";
      return;
    }

    splitWordsAndChars(el);

    const charSel = `${selector} [data-char]`;
    animate(charSel, {
      opacity: [0, 1],
      translateY: [18, 0],
      duration: charDuration,
      ease: "outCubic",
      delay: stagger(perChar, { start: startDelay }),
    });
  }, [selector, startDelay, perChar, charDuration]);

  return null;
}
