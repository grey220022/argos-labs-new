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
    tagline: "Multi-cloud compute for AI workloads.",
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
];

export default function PillarGrid() {
  return (
    <section id="pillars" className="mt-24 sm:mt-32" aria-labelledby="pillars-heading">
      <h2
        id="pillars-heading"
        className="max-w-2xl font-display text-3xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl"
      >
        Three services. Built to ship. Engineered to scale.
      </h2>

      <Reveal
        gap={80}
        className="mt-12 grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3"
      >
        {pillars.map((p) => (
          <PillarCard key={p.pillar} {...p} />
        ))}
      </Reveal>
    </section>
  );
}
