import PillarSection from "./PillarSection";
import Reveal from "../Reveal";

type Product = {
  name: string;
  audience: string;
  tagline: string;
  bullets: readonly string[];
  cta: { label: string; href: string };
};

const products: readonly Product[] = [
  {
    name: "Soll Protocol",
    audience: "For Business",
    tagline: "Smart wallet infrastructure on Solana, dropped into any platform as an SDK.",
    bullets: [
      "Phone- or email-only onboarding",
      "Zero-knowledge proof security, no seed phrases",
      "Non-custodial — users always own their keys",
    ],
    cta: { label: "Read the SDK docs", href: "#" },
  },
  {
    name: "Sollpay",
    audience: "For Consumer",
    tagline: "The smart wallet for people who'd never touch crypto.",
    bullets: [
      "Buy, trade, stake with a phone number or email",
      "Powered by Solana, ZK proofs, abstract wallets",
      "Account recovery without losing the wallet",
    ],
    cta: { label: "Try Sollpay", href: "https://sollpay.com/" },
  },
];

export default function BlockChainSection() {
  return (
    <PillarSection
      pillar="chain"
      id="chain"
      eyebrow="BlockChain"
      heading="On-chain rails for mainstream consumer reach."
      subheading="Two products, one philosophy: crypto without the friction. Built on Solana, secured with zero-knowledge proofs."
    >
      <Reveal
        gap={120}
        className="grid grid-cols-1 gap-6 lg:grid-cols-2"
      >
        {products.map((p) => (
          <div
            key={p.name}
            className="flex flex-col rounded-xl border border-fg-7 bg-bg-2 p-6 sm:p-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              {p.audience}
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-fg sm:text-[32px]">
              {p.name}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-fg-3 sm:text-lg">
              {p.tagline}
            </p>
            <ul className="mt-6 space-y-2 text-sm text-fg-2 sm:text-base">
              {p.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]"
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <a
              href={p.cta.href}
              {...(p.cta.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="mt-8 inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)] transition-transform duration-150 hover:translate-x-1"
            >
              {p.cta.label} <span aria-hidden>→</span>
            </a>
          </div>
        ))}
      </Reveal>
    </PillarSection>
  );
}
