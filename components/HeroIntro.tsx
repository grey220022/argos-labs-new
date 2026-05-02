"use client";

import { useEffect } from "react";
import { heroTimeline } from "@/lib/motion";

export default function HeroIntro() {
  useEffect(() => {
    heroTimeline({
      brand: '[data-hero="brand"]',
      h1: '[data-hero="h1"]',
      pillars: '[data-hero="pillars"]',
      cta: '[data-hero="cta"]',
    });
  }, []);

  return null;
}
