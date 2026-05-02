import PillarSection from "./PillarSection";
import Reveal from "../Reveal";

const metrics = [
  { value: "12 ms", label: "p50 inference" },
  { value: "8", label: "regions live" },
  { value: "$0", label: "idle cost" },
];

const features = [
  {
    title: "Autoscale",
    body: "GPU and CPU pools that warm up before your traffic does.",
  },
  {
    title: "Multi-region",
    body: "Deploy once, run from the closest edge. No DevOps required.",
  },
  {
    title: "Pay-per-execution",
    body: "Billed per token and per second. Stops billing when your job stops.",
  },
];

export default function CloudSection() {
  return (
    <PillarSection
      pillar="cloud"
      id="cloud"
      eyebrow="Cloud"
      heading="The compute substrate underneath every agent."
      subheading="Purpose-built for AI workloads — warm pools, multi-tenant GPUs, edge inference. Same API as Agents; works with anything else, too."
    >
      <Reveal gap={60} className="grid grid-cols-3 gap-3 sm:gap-6">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-fg-7 bg-bg-2 p-5 sm:p-6"
          >
            <p className="font-display text-3xl font-semibold tracking-tight text-[var(--accent)] sm:text-5xl">
              {m.value}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-4 sm:text-xs">
              {m.label}
            </p>
          </div>
        ))}
      </Reveal>

      <Reveal
        gap={60}
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8"
      >
        {features.map((f) => (
          <div key={f.title}>
            <h3 className="font-display text-lg font-semibold text-fg sm:text-xl">
              {f.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-3 sm:text-base">
              {f.body}
            </p>
          </div>
        ))}
      </Reveal>

      <a
        href="mailto:contact@argoslabs.io?subject=Cloud%20pricing"
        className="mt-12 inline-flex h-12 items-center rounded-md border border-[var(--accent)] px-5 font-display font-medium text-[var(--accent)] transition-colors duration-150 hover:bg-[var(--accent)] hover:text-bg"
      >
        See pricing →
      </a>
    </PillarSection>
  );
}
