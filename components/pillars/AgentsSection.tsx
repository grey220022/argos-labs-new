import PillarSection from "./PillarSection";
import Reveal from "../Reveal";
import AgentsCodeBlock from "./AgentsCodeBlock";

const features = [
  {
    title: "Persistent state",
    body: "Long-running tasks survive process restarts. Agents pick up exactly where they left off.",
  },
  {
    title: "Native tool use",
    body: "Shell, code execution, browsers, internal APIs. Sandboxed by default, audited per call.",
  },
  {
    title: "Observable",
    body: "Every step logged, every decision traceable. Replay any failure deterministically.",
  },
];

const codeSample = `import { Agent } from "@argos/agents";

const research = new Agent({
  model: "argos-lg",
  tools: ["browser", "shell", "search"],
  budget: { tokens: 100_000, time: "10m" },
});

await research.run(\`
  Find the top 3 design system docs sites
  in 2025 and compare token strategies.
\`);`;

export default function AgentsSection() {
  return (
    <PillarSection
      pillar="agents"
      id="agents"
      eyebrow="Agents"
      heading="AI agents that ship work, not promises."
      subheading="Persistent, tool-using agents that run for minutes or hours and recover from their own failures. Built for production traffic, not demos."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <AgentsCodeBlock
          code={codeSample}
          className="overflow-x-auto rounded-xl border border-fg-7 bg-bg-2 p-4 font-mono text-[11px] leading-[1.55] text-fg-2 sm:p-6 sm:text-[13px] sm:leading-[1.6]"
        />

        <Reveal gap={70} className="flex flex-col gap-6">
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
      </div>

      <a
        href="mailto:contact@argoslabs.io?subject=Agents%20demo"
        className="mt-12 inline-flex h-12 items-center rounded-md border border-[var(--accent)] px-5 font-display font-medium text-[var(--accent)] transition-colors duration-150 hover:bg-[var(--accent)] hover:text-bg"
      >
        See it in action →
      </a>
    </PillarSection>
  );
}
