"use client";

import { useEffect } from "react";
import { heroTimeline } from "@/lib/motion";
import { splitWordsAndChars } from "@/lib/text-split";

export default function HeroIntro() {
  useEffect(() => {
    const h1Sel = '[data-hero="h1"]';
    const el = document.querySelector<HTMLElement>(h1Sel);
    if (el) splitWordsAndChars(el);

    heroTimeline({
      brand: '[data-hero="brand"]',
      h1: `${h1Sel} [data-char]`,
      pillars: '[data-hero="pillars"]',
      cta: '[data-hero="cta"]',
    });
  }, []);

  return null;
}
