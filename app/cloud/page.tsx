import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionEyebrow from "@/components/SectionEyebrow";
import Counter from "@/components/Counter";
import HoverTrace from "@/components/HoverTrace";
import CharStagger from "@/components/CharStagger";
import SectionSweep from "@/components/SectionSweep";
import RotatingPhrase from "@/components/RotatingPhrase";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Argos Cloud — Multi-Cloud Solutions for AI, Web3 and Fintech",
  description:
    "We architect, deploy, and operate GPU compute, LLM gateways, and blockchain RPC across every major cloud — with senior solutions architects on every account.",
};

type Provider = {
  name: string;
  file: string;
  w: number;
  h: number;
  boost?: boolean;
};

const providers: readonly Provider[] = [
  { name: "AWS", file: "aws.svg", w: 304, h: 182 },
  { name: "Google Cloud", file: "googlecloud-wordmark.svg", w: 120, h: 60 },
  { name: "Microsoft Azure", file: "azure-wordmark.svg", w: 120, h: 60 },
  { name: "Alibaba Cloud", file: "alibabacloud-wordmark.svg", w: 120, h: 60 },
  { name: "Tencent Cloud", file: "tencent-cloud.svg", w: 1053, h: 720, boost: true },
  { name: "Huawei Cloud", file: "huawei-wordmark.svg", w: 120, h: 60 },
  { name: "OVHcloud", file: "ovhcloud.svg", w: 298, h: 47 },
  { name: "Cloudflare", file: "cloudflare-wordmark.svg", w: 120, h: 60 },
  { name: "Solana", file: "solana.svg", w: 646, h: 96 },
];

const models = [
  "GPT-5",
  "Claude Opus 4.7",
  "Gemini 3.0 Pro",
  "Llama 4",
  "DeepSeek-V4",
] as const;

const reasons = [
  {
    title: "Engineered Cost Discipline",
    body: "Architects benchmark every workload — right-sizing GPU pools, spot orchestration, reserved capacity. The 30-35% savings are an engineering output, not a discount we negotiated.",
  },
  {
    title: "AI & Web3 Specialty",
    body: "We know the GPU spot market, the LLM token economy, and Solana / EVM RPC fleets — because we run them ourselves. Generic cloud teams read the white papers. We wrote the runbooks.",
  },
  {
    title: "One Team, Every Cloud",
    body: "Stop coordinating across vendors. We hold the architecture, the contracts, and the on-call rotation — across AWS, GCP, Azure, Alibaba, Tencent, and OVH — under one engineering MSA.",
  },
] as const;

const compare = [
  {
    label: "Pricing",
    direct: "Retail rack rate",
    argos: "Up to 35% lower, engineered",
  },
  {
    label: "Architecture",
    direct: "Your DevOps team owns it",
    argos: "Senior architect designs and reviews",
  },
  {
    label: "Contract",
    direct: "One MSA per provider",
    argos: "One engineering MSA, every cloud",
  },
  {
    label: "Billing",
    direct: "Multiple invoices, multiple currencies",
    argos: "Unified invoice, local currency",
  },
  {
    label: "Support",
    direct: "Tier-2 ticket queue",
    argos: "Senior architect on call",
  },
  {
    label: "Migration",
    direct: "Sales hands you off",
    argos: "Architect stays through cut-over",
  },
] as const;

const promises = [
  {
    title: "Flexible Billing",
    body: "Prepaid, postpaid, or hybrid. Settle on the cycle your finance team actually prefers — no quota games, no minimum commits.",
  },
  {
    title: "Every Payment Rail",
    body: "Credit card, wire, SEPA, SWIFT, and stablecoin. Multi-currency settlement in USD, EUR, SGD, or stablecoin — one bill across every cloud.",
  },
  {
    title: "24/7 Global Support",
    body: "Engineers across Paris, Hong Kong, and Singapore — every timezone covered. Slack, ticket, or hotline, whichever your team works in.",
  },
  {
    title: "Dedicated Solutions Architect",
    body: "Every account gets a senior architect on call. We design the hybrid topology, optimize the spend, and stay through migration — not just the sales call.",
  },
] as const;

const proof = [
  { value: "100+", label: "AI · Web3 · fintech teams" },
  { value: "99.99%", label: "platform uptime" },
  { value: "12", label: "clouds connected" },
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
            <span className="block">for AI, Web3, and</span>
            <span className="block text-[var(--accent)]">
              <RotatingPhrase
                phrases={["Fintech", "Agents", "Models", "GPUs"]}
              />
              .
            </span>
          </h1>
          <CharStagger selector="[data-cloud-h1]" />

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-fg-3 sm:text-lg">
            <strong className="font-semibold text-fg">GPU compute</strong>,{" "}
            <strong className="font-semibold text-fg">LLM gateways</strong>,{" "}
            <strong className="font-semibold text-fg">blockchain RPC</strong>{" "}
            — engineered across every major cloud.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              data-cta
              href="mailto:contact@argoslabs.io?subject=Argos%20Cloud%20trial"
              className="inline-flex h-12 items-center rounded-md bg-[var(--accent)] px-5 font-display font-medium text-bg shadow-[0_0_28px_-6px_var(--accent)] transition-transform duration-100 hover:scale-[1.02]"
            >
              Start Free Trial
            </a>
            <a
              data-cta
              href="mailto:contact@argoslabs.io?subject=Talk%20to%20an%20architect"
              className="cta-rotating-border inline-flex h-12 items-center rounded-md px-5 font-display font-medium text-fg transition-colors duration-100 hover:text-[var(--accent)]"
            >
              Talk to an Architect
            </a>
          </div>
        </section>

        {/* 2. Provider wall */}
        <section
          aria-labelledby="cloud-providers"
          className="relative mt-32 sm:mt-40"
        >
          <SectionSweep />
          <SectionEyebrow id="cloud-providers">Every Cloud, Argos Cloud</SectionEyebrow>

          {/* Marquee logo wall — track is rendered twice for seamless loop.
              Pauses on hover (desktop). On mobile, scrolls at the same
              cadence; logos are slightly smaller so the cycle feels right. */}
          <div className="marquee-mask group/wall mt-12 overflow-hidden">
            <div className="marquee-track flex w-max items-center gap-10 sm:gap-14 lg:gap-16">
              {[...providers, ...providers].map((p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  aria-hidden={i >= providers.length}
                  className={`group/logo relative flex shrink-0 items-center justify-center ${
                    p.boost ? "h-9 w-28 sm:h-12 sm:w-36" : "h-6 w-24 sm:h-8 sm:w-32"
                  }`}
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
                    className="relative max-h-full max-w-full select-none object-contain brightness-0 invert opacity-60 transition duration-[350ms] ease-[cubic-bezier(0,0,0.2,1)] group-hover/wall:opacity-40 group-hover/logo:invert-0 group-hover/logo:brightness-100 group-hover/logo:scale-105 group-hover/logo:!opacity-100"
                    sizes="(max-width: 640px) 96px, 140px"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2.5 LLM gateway — every model, one endpoint */}
        <section
          aria-labelledby="cloud-models"
          className="relative mt-32 sm:mt-40"
        >
          <SectionSweep />
          <SectionEyebrow>Model Gateway</SectionEyebrow>

          <h2
            id="cloud-models"
            className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl"
          >
            Every model, one endpoint.
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-3 sm:text-lg">
            Frontier models from OpenAI, Anthropic, Google, Meta, and DeepSeek —
            through one endpoint. We optimize token consumption with smart
            routing, semantic caching, and request batching, and ship
            custom-tuned variants when off-the-shelf isn&apos;t a fit.
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
                Wide Coverage
              </p>
              <p className="mt-3 text-sm leading-relaxed text-fg-3 sm:text-base">
                Frontier models from every major lab — plus 30+ open-weight,
                regional, and specialty models — accessed through one endpoint
                with one set of credentials.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                Consumption Optimization
              </p>
              <p className="mt-3 text-sm leading-relaxed text-fg-3 sm:text-base">
                Smart routing, semantic cache, and request batching cut token
                spend 20-40% before requests reach a provider. Volume rates
                pooled across all your projects.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                Custom Variants
              </p>
              <p className="mt-3 text-sm leading-relaxed text-fg-3 sm:text-base">
                Fine-tune, distill, or co-build domain-specific models when
                off-the-shelf isn&apos;t a fit. Hosted on your dedicated capacity,
                billed through the same gateway.
              </p>
              <a
                href="mailto:contact@argoslabs.io?subject=Custom%20model%20variant"
                className="mono-link group/dcv mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]"
              >
                Discuss a custom variant
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
          <SectionEyebrow>Why Argos Cloud</SectionEyebrow>

          <h2
            id="cloud-why"
            className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl lg:text-[60px]"
          >
            Engineering, not procurement.
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-3 sm:text-lg">
            You can stand up multi-cloud yourself. Or you can have a senior
            engineering team architect, deploy, and operate it — and pass the
            cost discipline through to your bill.
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
            aria-label="Going direct vs. with Argos Cloud"
          >
            {/* Header — only visible on >=sm where the grid layout makes sense */}
            <div
              role="row"
              className="hidden border-b border-fg-7 bg-bg-2 px-5 py-4 sm:grid sm:grid-cols-[1fr_1fr_1.4fr] sm:items-center sm:gap-x-8 sm:px-8"
            >
              <p role="columnheader" className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-4 sm:text-xs">
                Dimension
              </p>
              <p role="columnheader" className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-4 sm:text-xs">
                Going direct
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
                    Direct
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

        {/* 3.5 Service promises — payment, support, architects */}
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
            Beyond infrastructure — built around your team.
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-3 sm:text-lg">
            Pay how you want, in any currency. Reach a real engineer in any
            timezone. Get a senior architect through every migration. The
            platform is the product — but service is what you remember.
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

        {/* 4. Customer proof */}
        <section
          aria-labelledby="cloud-proof"
          className="relative mt-32 sm:mt-40"
        >
          <SectionSweep />
          <SectionEyebrow id="cloud-proof">Trusted by builders</SectionEyebrow>

          <h2 className="mt-4 max-w-3xl font-display text-2xl font-semibold leading-[1.15] tracking-tight text-fg sm:text-4xl">
            100+ AI labs, Web3 teams, and fintechs ship on Argos Cloud.
          </h2>

          <Reveal
            gap={60}
            className="mt-10 grid grid-cols-3 gap-3 sm:gap-6"
          >
            {proof.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-fg-7 bg-bg-2 p-5 sm:p-6"
              >
                <p className="font-display text-2xl font-semibold tracking-tight text-[var(--accent)] sm:text-5xl">
                  <Counter value={m.value} />
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
              We don&apos;t manufacture clouds — we{" "}
              <span className="text-[var(--accent)]">engineer them</span>{" "}
              around your stack.
            </h2>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
