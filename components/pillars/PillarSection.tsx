import { type ReactNode } from "react";
import { type PillarKey } from "../PillarCard";

type Props = {
  pillar: PillarKey;
  id: string;
  eyebrow: string;
  heading: string;
  subheading?: string;
  children: ReactNode;
};

export default function PillarSection({
  pillar,
  id,
  eyebrow,
  heading,
  subheading,
  children,
}: Props) {
  return (
    <section
      id={id}
      data-pillar={pillar}
      aria-labelledby={`${id}-heading`}
      className="relative mt-32 scroll-mt-24 sm:mt-40"
    >
      <div className="flex items-center gap-3">
        <span
          data-eyebrow-dot
          aria-hidden
          className="h-2 w-2 rounded-full bg-[var(--accent)] transition-all duration-300 ease-out"
        />
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
          {eyebrow}
        </p>
      </div>

      <h2
        id={`${id}-heading`}
        className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-[60px]"
      >
        {heading}
      </h2>

      {subheading && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-3 sm:text-lg">
          {subheading}
        </p>
      )}

      <div className="mt-12">{children}</div>
    </section>
  );
}
