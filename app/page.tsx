import HeroIntro from "@/components/HeroIntro";
import LogoWall from "@/components/LogoWall";
import PillarGrid from "@/components/PillarGrid";

const pillars = [
  { id: "agents", name: "Agents" },
  { id: "cloud", name: "Cloud" },
  { id: "growth", name: "Growth" },
  { id: "chain", name: "BlockChain" },
] as const;

export default function Home() {
  return (
    <main className="relative mx-auto min-h-dvh max-w-[1500px] px-6 py-24 sm:px-12 lg:px-24">
      <HeroIntro />

      <p
        data-hero="brand"
        className="font-mono text-xs uppercase tracking-[0.2em] text-fg-3"
      >
        Argos Labs
      </p>

      <h1
        data-hero="h1"
        className="mt-8 max-w-5xl font-display text-4xl font-semibold leading-[0.95] tracking-tight text-fg sm:text-6xl lg:text-7xl"
      >
        All-in-One AI Execution Platform
      </h1>

      <nav
        data-hero="pillars"
        className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-lg sm:text-xl text-fg-2"
        aria-label="Pillars"
      >
        {pillars.map((p, i) => (
          <span key={p.id} className="contents">
            <span
              data-pillar={p.id}
              className="cursor-default text-fg-2 transition-colors duration-100 hover:text-[var(--accent)]"
            >
              {p.name}
            </span>
            {i < pillars.length - 1 && (
              <span aria-hidden className="text-fg-5">
                ·
              </span>
            )}
          </span>
        ))}
      </nav>

      <div data-hero="cta" className="mt-12 flex flex-wrap gap-3">
        <a
          href="mailto:contact@argoslabs.io"
          className="inline-flex h-12 items-center rounded-md bg-brand px-5 font-display font-medium text-bg shadow-[0_0_28px_-6px_var(--color-brand)] transition-transform duration-100 hover:scale-[1.02]"
        >
          Talk to Sales
        </a>
        <a
          href="#pillars"
          className="inline-flex h-12 items-center rounded-md border border-fg-6 px-5 font-display font-medium text-fg transition-colors duration-100 hover:border-fg-3"
        >
          Explore the platform
        </a>
      </div>

      <LogoWall />
      <PillarGrid />

      <div
        aria-hidden
        className="pointer-events-none fixed bottom-4 right-4 select-none font-mono text-[10px] tracking-[0.18em] text-fg-5"
      >
        build a3f2e9c · 14ms · 4 regions running
      </div>
    </main>
  );
}
