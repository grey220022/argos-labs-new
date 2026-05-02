import Link from "next/link";

export type PillarKey = "agents" | "cloud" | "growth" | "chain";

type Props = {
  pillar: PillarKey;
  name: string;
  tagline: string;
  bullets: readonly string[];
  href: string;
};

export default function PillarCard({
  pillar,
  name,
  tagline,
  bullets,
  href,
}: Props) {
  return (
    <article
      data-pillar={pillar}
      className="group relative flex flex-col rounded-xl border border-fg-7 bg-bg-2 p-6 transition-[border-color,box-shadow,transform] duration-200 hover:border-[var(--accent)] hover:shadow-[0_0_32px_-6px_var(--accent)] sm:p-8"
    >
      <h3 className="font-display text-2xl font-semibold leading-[1.1] tracking-tight text-fg sm:text-[32px]">
        {name}
      </h3>

      <p className="mt-3 max-w-md text-base leading-relaxed text-fg-3 sm:text-lg">
        {tagline}
      </p>

      <ul className="mt-6 space-y-2 text-sm text-fg-2 sm:text-base">
        {bullets.map((b) => (
          <li key={b} className="flex gap-3">
            <span
              aria-hidden
              className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]"
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className="mt-8 inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)] transition-transform duration-150 hover:translate-x-1"
      >
        Learn more <span aria-hidden>→</span>
      </Link>
    </article>
  );
}
