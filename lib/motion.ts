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
  lead?: string;
  pillars: string;
  cta: string;
};

export function heroTimeline(sel: HeroSelectors) {
  if (reduced()) {
    const targets = [sel.brand, sel.h1, sel.lead, sel.pillars, sel.cta]
      .filter(Boolean)
      .join(", ");
    return animate(targets, { opacity: [0, 1], duration: 200 });
  }
  const tl = createTimeline({
    defaults: { ease: "outCubic", duration: 600 },
  });
  tl.add(sel.brand, { opacity: [0, 1], translateY: [12, 0] }).add(
    sel.h1,
    {
      opacity: [0, 1],
      translateY: [18, 0],
      duration: 420,
      delay: stagger(22),
    },
    "-=350"
  );
  if (sel.lead) {
    tl.add(sel.lead, { opacity: [0, 1], translateY: [12, 0] }, "-=200");
  }
  return tl
    .add(
      sel.pillars,
      { opacity: [0, 1], translateY: [16, 0] },
      sel.lead ? "-=350" : "-=200"
    )
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


export function revealItems(items: HTMLElement[], gap = 60) {
  if (reduced()) return;
  return animate(items, { opacity: [0.7, 1], translateY: [16, 0], duration: 250, ease: "outQuad", delay: stagger(gap) });
}
