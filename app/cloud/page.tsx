import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionEyebrow from "@/components/SectionEyebrow";
import HoverTrace from "@/components/HoverTrace";
import CharStagger from "@/components/CharStagger";
import SectionSweep from "@/components/SectionSweep";
import RotatingPhrase from "@/components/RotatingPhrase";
import Footer from "@/components/Footer";

const title = "Argos Cloud — Cloud Engineering for AI and Fintech";
const description =
  "Plan, deploy and operate GPU infrastructure and model gateways across clouds, with support for architecture, migration and cost management.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: "website",
    url: "/cloud",
    siteName: "Argos Labs",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

type Provider = {
  name: string;
  file: string;
  w: number;
  h: number;
  boost?: boolean;
};

const providers: readonly Provider[] = [
  { name: "AWS", file: "aws.svg", w: 301, h: 180 },
  { name: "Google Cloud", file: "googlecloud-wordmark.svg", w: 112, h: 53 },
  { name: "Microsoft Azure", file: "azure-wordmark.svg", w: 112, h: 31 },
  { name: "Alibaba Cloud", file: "alibabacloud-wordmark.svg", w: 106, h: 15 },
  { name: "Tencent Cloud", file: "tencent-cloud.svg", w: 719, h: 564, boost: true },
];

const models = [
  "GPT",
  "Claude",
  "Gemini",
  "Llama",
  "DeepSeek",
] as const;

const reasons = [
  {
    title: "Cost-aware architecture",
    body: "Size GPU capacity and assess spot or reserved options around your workload, usage and reliability needs.",
  },
  {
    title: "AI operations",
    body: "Run GPU workloads and model gateways with support for inference, routing, caching and cost management.",
  },
  {
    title: "Cloud coordination",
    body: "Work with one team to coordinate architecture, deployment and operations across your cloud providers.",
  },
] as const;

const compare = [
  {
    label: "Cost management",
    direct: "Your team reviews usage and rates",
    argos: "Engineers review capacity and spend",
  },
  {
    label: "Architecture",
    direct: "Your team designs and maintains it",
    argos: "Architecture design and review support",
  },
  {
    label: "Coordination",
    direct: "Your team coordinates providers",
    argos: "One team coordinates cloud engineering",
  },
  {
    label: "Billing",
    direct: "Managed through each provider",
    argos: "Consolidated billing options",
  },
  {
    label: "Support",
    direct: "Covered by your provider plans",
    argos: "Engineering support scoped to your needs",
  },
  {
    label: "Migration",
    direct: "Your team plans and runs the move",
    argos: "Architecture and cutover support",
  },
] as const;

const promises = [
  {
    title: "Billing that fits",
    body: "Discuss prepaid, postpaid or hybrid billing. Agree on payment cycles and capacity commitments before deployment.",
  },
  {
    title: "Payment options",
    body: "Credit card, wire, SEPA, SWIFT. We can review USD or EUR settlement and consolidated invoicing with your finance team.",
  },
  {
    title: "Engineering support",
    body: "Set support hours, escalation paths and communication channels around your operations, with access to engineers who understand your setup.",
  },
  {
    title: "Migration support",
    body: "Plan your target architecture, migration steps and cutover with an architect. Review capacity and costs as your workloads evolve.",
  },
] as const;

const workloads = [
  { value: "Compute", label: "GPU infrastructure" },
  { value: "Models", label: "LLM gateways" },
] as const;

export default function CloudPage() {
  return (
    <>
      <main
        data-pillar="cloud"
        className="relative mx-auto max-w-[1500px] px-6 py-16 sm:px-12 sm:py-24 lg:px-24"
      >
        {/* Back to Argos Labs — sits above the hero eyebrow as a quiet anchor */}
        <Link
          href="/"
          className="mono-link group/back inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-4 transition-colors duration-150 hover:text-fg sm:text-xs"
        >
          <span
            aria-hidden
            className="transition-transform duration-150 group-hover/back:-translate-x-0.5"
          >
            ←
          </span>
          Argos Labs
        </Link>

        {/* 1. Hero */}
        <section aria-labelledby="cloud-hero" className="pt-8 sm:pt-12">
          <h1
            id="cloud-hero"
            data-cloud-h1
            className="font-display text-2xl font-semibold leading-[1] tracking-tight text-fg sm:text-4xl sm:leading-[0.95] md:text-5xl lg:text-[64px]"
          >
            <span className="block">
              Your{" "}
              <span className="text-[var(--accent)]">
                cloud engineering team
              </span>
            </span>
            <span className="block">
              for{" "}
              <span className="text-[var(--accent)]">
                <RotatingPhrase
                  phrases={["AI", "agents", "models", "fintech"]}
                />
              </span>
              .
            </span>
          </h1>
          <CharStagger selector="[data-cloud-h1]" />

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-fg-3 sm:text-lg">
            Plan, deploy and operate the infrastructure behind your AI workloads.
          </p>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-3 sm:text-lg">
            <strong className="font-semibold text-fg">GPU compute</strong> and{" "}
            <strong className="font-semibold text-fg">LLM gateways</strong>{" "}
            across the clouds that fit your stack.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              data-cta
              href="mailto:contact@argoslabs.io?subject=Argos%20Cloud%20project"
              className="inline-flex h-12 items-center rounded-md bg-[var(--accent)] px-5 font-display font-medium text-bg shadow-[0_0_28px_-6px_var(--accent)] transition-transform duration-100 hover:scale-[1.02]"
            >
              Talk to an architect
            </a>
            <a
              data-cta
              href="#cloud-models"
              className="cta-rotating-border inline-flex h-12 items-center rounded-md px-5 font-display font-medium text-fg transition-colors duration-100 hover:text-[var(--accent)]"
            >
              Explore the model gateway
            </a>
          </div>
        </section>

        {/* 2. Provider wall */}
        <section
          aria-labelledby="cloud-providers"
          className="relative mt-32 sm:mt-40"
        >
          <SectionSweep />
          <SectionEyebrow id="cloud-providers">Cloud providers we work with</SectionEyebrow>

          {/* Marquee logo wall — track is rendered twice for seamless loop.
              Pauses on hover (desktop). On mobile, scrolls at the same
              cadence; logos are slightly smaller so the cycle feels right. */}
          <div className="marquee-mask group/wall mt-12 overflow-hidden">
            <div className="marquee-track flex w-max items-center gap-10 sm:gap-14 lg:gap-16">
              {[...providers, ...providers].map((p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  aria-hidden={i >= providers.length}
                  className="group/logo relative flex shrink-0 items-center justify-center"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-3 rounded-md bg-[var(--accent)]/0 blur-2xl transition-colors duration-[350ms] ease-[cubic-bezier(0,0,0.2,1)] group-hover/logo:bg-[var(--accent)]/25"
                  />
                  <Image
                    src={`/images/${p.file}`}
                    alt={i < providers.length ? p.name : ""}
                    width={p.w}
                    height={p.h}
                    className={`relative w-auto select-none brightness-0 invert opacity-60 transition duration-[350ms] ease-[cubic-bezier(0,0,0.2,1)] group-hover/wall:opacity-40 group-hover/logo:invert-0 group-hover/logo:brightness-100 group-hover/logo:scale-105 group-hover/logo:!opacity-100 ${
                      p.boost ? "h-14 sm:h-20" : "h-10 sm:h-14"
                    }`}
                    sizes="(max-width: 640px) 96px, 140px"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2.5 Model gateway */}
        <section
          aria-labelledby="cloud-models"
          className="relative mt-32 sm:mt-40"
        >
          <SectionSweep />
          <SectionEyebrow>Model gateway</SectionEyebrow>

          <h2
            id="cloud-models"
            className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl"
          >
            Connect models. Control usage.
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-3 sm:text-lg">
            Connect models from OpenAI, Anthropic, Google, Meta and DeepSeek
            through a shared gateway. Manage routing, token usage and access
            in one place, with custom model options for specialized workloads.
          </p>

          <Reveal
            gap={30}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-x-8 sm:gap-y-4"
          >
            {models.map((m) => (
              <span
                key={m}
                className="rounded-full border border-fg-7 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-2 transition-colors duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)] sm:text-xs"
              >
                {m}
              </span>
            ))}
          </Reveal>

          <Reveal
            gap={60}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8"
          >
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                Model choice
              </p>
              <p className="mt-3 text-sm leading-relaxed text-fg-3 sm:text-base">
                Choose hosted or open-weight models to suit your workload.
                Confirm the models, deployment regions and capacity you need
                with our team.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                Token usage
              </p>
              <p className="mt-3 text-sm leading-relaxed text-fg-3 sm:text-base">
                Use routing, semantic caching and request batching to manage
                token consumption. Review model usage and billing across your
                projects.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                Custom models
              </p>
              <p className="mt-3 text-sm leading-relaxed text-fg-3 sm:text-base">
                Explore fine-tuning, distillation or domain-specific models
                when standard models fall short. Plan dedicated hosting and
                gateway billing around your requirements.
              </p>
              <a
                href="mailto:contact@argoslabs.io?subject=Argos%20Cloud%20custom%20model"
                className="mono-link group/dcv mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]"
              >
                Discuss a custom model
                <span
                  aria-hidden
                  className="transition-transform duration-150 group-hover/dcv:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>
          </Reveal>
        </section>

        {/* 3. Why Argos Cloud */}
        <section
          aria-labelledby="cloud-why"
          className="relative mt-32 sm:mt-40"
        >
          <SectionSweep />
          <SectionEyebrow>Cloud engineering</SectionEyebrow>

          <h2
            id="cloud-why"
            className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-[60px]"
          >
            Built for your workload.
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-3 sm:text-lg">
            Work with one team from architecture to operations. We align cloud
            choices, capacity and costs with the way your applications run.
          </p>

          <Reveal
            gap={60}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8"
          >
            {reasons.map((r, i) => (
              <article
                key={r.title}
                className="group relative rounded-xl border border-fg-7 bg-bg-2 p-6 transition-[box-shadow] duration-200 hover:shadow-[0_0_32px_-6px_var(--accent)] sm:p-8"
              >
                <HoverTrace />
                <p className="relative font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  0{i + 1}
                </p>
                <h3 className="relative mt-4 font-display text-xl font-semibold leading-[1.15] tracking-tight text-fg sm:text-2xl">
                  {r.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-fg-3 sm:text-base">
                  {r.body}
                </p>
              </article>
            ))}
          </Reveal>

          {/* Comparison: going direct vs. through Argos.
              <sm: stacked card per row (label · direct · argos vertically).
              >=sm: 3-col grid table. */}
          <Reveal
            gap={40}
            className="mt-16 overflow-hidden rounded-xl border border-fg-7"
            role="table"
            aria-label="Managing cloud providers directly or with Argos Cloud"
          >
            {/* Header — only visible on >=sm where the grid layout makes sense */}
            <div
              role="row"
              className="hidden border-b border-fg-7 bg-bg-2 px-5 py-4 sm:grid sm:grid-cols-[1fr_1fr_1.4fr] sm:items-center sm:gap-x-8 sm:px-8"
            >
              <p role="columnheader" className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-4 sm:text-xs">
                Responsibility
              </p>
              <p role="columnheader" className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-4 sm:text-xs">
                Managed by your team
              </p>
              <p role="columnheader" className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)] sm:text-xs">
                With Argos Cloud
              </p>
            </div>
            {compare.map((row) => (
              <div
                key={row.label}
                role="row"
                className="px-5 py-5 [&:not(:last-child)]:border-b [&:not(:last-child)]:border-fg-7 sm:grid sm:grid-cols-[1fr_1fr_1.4fr] sm:items-center sm:gap-x-8 sm:px-8 sm:py-4"
              >
                <p
                  role="rowheader"
                  className="font-display text-sm font-medium text-fg sm:text-base"
                >
                  {row.label}
                </p>
                {/* Stacked rows on mobile show inline labels; grid drops them on sm+ */}
                <div className="mt-3 grid grid-cols-[auto_1fr] items-baseline gap-x-3 gap-y-1 sm:mt-0 sm:contents">
                  <span
                    aria-hidden
                    className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-5 sm:hidden"
                  >
                    Your team
                  </span>
                  <p role="cell" className="text-sm text-fg-4 sm:text-base">
                    {row.direct}
                  </p>
                  <span
                    aria-hidden
                    className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] sm:hidden"
                  >
                    Argos
                  </span>
                  <p
                    role="cell"
                    className="text-sm font-medium text-[var(--accent)] sm:text-base"
                  >
                    {row.argos}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </section>

        {/* 3.5 Billing, support and migration */}
        <section
          aria-labelledby="cloud-promises"
          className="relative mt-32 sm:mt-40"
        >
          <SectionSweep />
          <SectionEyebrow>How we operate</SectionEyebrow>

          <h2
            id="cloud-promises"
            className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl"
          >
            Support beyond deployment.
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-3 sm:text-lg">
            Agree on billing, support and migration plans that work for your
            engineering and finance teams.
          </p>

          <Reveal
            gap={60}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8"
          >
            {promises.map((p, i) => (
              <article
                key={p.title}
                className="group relative rounded-xl border border-fg-7 bg-bg-2 p-6 transition-[box-shadow] duration-200 hover:shadow-[0_0_32px_-6px_var(--accent)] sm:p-8"
              >
                <HoverTrace />
                <p className="relative font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                  0{i + 1}
                </p>
                <h3 className="relative mt-4 font-display text-xl font-semibold leading-[1.15] tracking-tight text-fg sm:text-2xl">
                  {p.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-fg-3 sm:text-base">
                  {p.body}
                </p>
              </article>
            ))}
          </Reveal>
        </section>

        {/* 4. Workload scope */}
        <section
          aria-labelledby="cloud-proof"
          className="relative mt-32 sm:mt-40"
        >
          <SectionSweep />
          <SectionEyebrow id="cloud-proof">Workloads we support</SectionEyebrow>

          <h2 className="mt-4 max-w-3xl font-display text-2xl font-semibold leading-[1.15] tracking-tight text-fg sm:text-4xl">
            Built for AI and fintech.
          </h2>

          <Reveal
            gap={60}
            className="mt-10 grid grid-cols-2 gap-3 sm:gap-6"
          >
            {workloads.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-fg-7 bg-bg-2 p-5 sm:p-6"
              >
                <p className="font-display text-2xl font-semibold tracking-tight text-[var(--accent)] sm:text-5xl">
                  {m.value}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-4 sm:text-xs">
                  {m.label}
                </p>
              </div>
            ))}
          </Reveal>
        </section>

      </main>

      {/* 6. Closing banner */}
      <section
        data-pillar="cloud"
        aria-label="Closing statement"
        className="relative mt-32 border-y border-fg-7 sm:mt-48"
      >
        <div className="mx-auto max-w-[1500px] px-6 py-24 sm:px-12 sm:py-32 lg:px-24">
          <Reveal className="block">
            <h2 className="max-w-[22ch] font-display text-4xl font-semibold leading-[0.95] tracking-tight text-fg sm:text-5xl lg:text-[64px]">
              Your cloud.{" "}
              <span className="text-[var(--accent)]">Our engineers.</span>
            </h2>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
