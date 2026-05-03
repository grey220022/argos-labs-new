"use client";

import { useEffect } from "react";

// Single global listener: any element marked `data-cta` triggers a brief
// haptic vibration on press. Pairs with the `[data-cta]:active` CSS rule
// (defined in globals.css) for the visual scale-down. Skipped when:
//   - prefers-reduced-motion is on
//   - navigator.vibrate is unavailable (iOS Safari, desktop)
export default function CTAFeedback() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof navigator === "undefined") return;
    if (typeof navigator.vibrate !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handler = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const cta = target.closest("[data-cta]");
      if (!cta) return;
      // 8ms is below the perceptual threshold for "buzz" — feels like a click,
      // not a phone alert.
      try {
        navigator.vibrate(8);
      } catch {
        // Some browsers throw when vibrate isn't user-initiated; ignore.
      }
    };

    document.addEventListener("pointerdown", handler, { passive: true });
    return () => document.removeEventListener("pointerdown", handler);
  }, []);

  return null;
}
