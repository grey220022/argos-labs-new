import PillarCard, { type PillarKey } from "./PillarCard";
import Reveal from "./Reveal";

type Pillar = {
  pillar: PillarKey;
  name: string;
  tagline: string;
  bullets: readonly string[];
  href: string;
};

const pillars: readonly Pillar[] = [
  {
    pillar: "agents",
    name: "Agents",
    tagline: "Production-ready AI agents for long-running, tool-using work.",
    bullets: [
      "Persistent state across multi-step tasks",
      "Native tool use, code execution, browser control",
      "Failure recovery and observable state machines",
    ],
    href: "#agents",
  },
  {
    pillar: "cloud",
    name: "Cloud",
    tagline: "Multi-cloud compute for AI, Web3, and fintech.",
    bullets: [
      "GPU + CPU autoscale, multi-region",
      "Pay-per-execution pricing, no idle cost",
      "Edge inference and warm-pool readiness",
    ],
    href: "/cloud",
  },
  {
    pillar: "growth",
    name: "Growth",
    tagline: "Global growth as a managed service.",
    bullets: [
      "Strategy and market consulting",
      "Paid acquisition, performance marketing, ad-buying",
      "Hands-on execution and BD across regions",
    ],
    href: "#growth",
  },
  {
    pillar: "chain",
    name: "Payment",
    tagline: "On-chain rails for mainstream consumer reach.",
    bullets: [
      "Soll Protocol — smart wallet SDK on Solana",
      "Sollpay — phone- and email-only consumer wallet",
      "Zero-knowledge proof security, no seed phrases",
    ],
    href: "#chain",
  },
];

export default function PillarGrid() {
  return (
    <section id="pillars" className="mt-24 sm:mt-32" aria-labelledby="pillars-heading">
      <h2
        id="pillars-heading"
        className="max-w-2xl font-display text-3xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl"
      >
        Four products. Zero integration tax.
      </h2>
      <p className="mt-4 max-w-2xl text-base text-fg-3 sm:text-lg">
        And the best global growth service in the pack.
      </p>

      <Reveal
        gap={80}
        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6"
      >
        {pillars.map((p) => (
          <PillarCard key={p.pillar} {...p} />
        ))}
      </Reveal>
    </section>
  );
}
