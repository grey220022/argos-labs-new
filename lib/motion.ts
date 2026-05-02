import { animate, createTimeline, stagger } from "animejs";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function fadeUp(target: string, delay = 0) {
  if (reduced()) {
    return animate(target, { opacity: [0, 1], duration: 200 });
  }
  return animate(target, {
    translateY: [40, 0],
    opacity: [0, 1],
    duration: 500,
    ease: "outQuad",
    delay,
  });
}

export function staggerCards(target: string, gap = 60) {
  if (reduced()) {
    return animate(target, { opacity: [0, 1], duration: 200 });
  }
  return animate(target, {
    translateY: [40, 0],
    opacity: [0, 1],
    duration: 500,
    ease: "outQuad",
    delay: stagger(gap),
  });
}

export type HeroSelectors = {
  brand: string;
  h1: string;
  pillars: string;
  cta: string;
};

export function heroTimeline(sel: HeroSelectors) {
  if (reduced()) {
    return animate(`${sel.brand}, ${sel.h1}, ${sel.pillars}, ${sel.cta}`, {
      opacity: [0, 1],
      duration: 200,
    });
  }
  const tl = createTimeline({
    defaults: { ease: "outCubic", duration: 600 },
  });
  return tl
    .add(sel.brand, { opacity: [0, 1], translateY: [12, 0] })
    .add(sel.h1, { opacity: [0, 1], translateY: [24, 0] }, "-=350")
    .add(sel.pillars, { opacity: [0, 1], translateY: [16, 0] }, "-=400")
    .add(sel.cta, { opacity: [0, 1], scale: [0.96, 1] }, "-=300");
}

export function glowPulse(target: string) {
  if (reduced()) return;
  return animate(target, {
    opacity: [0.55, 1, 0.55],
    duration: 2400,
    ease: "inOutSine",
    loop: true,
  });
}
