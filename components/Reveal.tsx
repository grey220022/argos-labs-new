"use client";

import { useEffect, useRef, type HTMLAttributes } from "react";
import { animate, stagger } from "animejs";

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type Props = HTMLAttributes<HTMLDivElement> & {
  gap?: number;
  threshold?: number;
};

export default function Reveal({
  children,
  className,
  gap = 60,
  threshold = 0.15,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return;

    const items = Array.from(el.children) as HTMLElement[];
    if (!items.length) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        animate(items, {
          opacity: [0, 1],
          translateY: [32, 0],
          duration: 500,
          ease: "outQuad",
          delay: stagger(gap),
        });
        obs.disconnect();
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [gap, threshold]);

  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
}
