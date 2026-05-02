import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  id?: string;
};

export default function SectionEyebrow({ children, id }: Props) {
  return (
    <div className="flex items-center gap-3">
      <span
        data-eyebrow-dot
        aria-hidden
        className="h-2 w-2 rounded-full bg-[var(--accent)] transition-all duration-300 ease-out"
      />
      <p
        id={id}
        className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--accent)]"
      >
        {children}
      </p>
    </div>
  );
}
