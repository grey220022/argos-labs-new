import HeroIntro from "@/components/HeroIntro";
import HeroVisual from "@/components/HeroVisual";
import LogoWall from "@/components/LogoWall";
import PillarGrid from "@/components/PillarGrid";
import PillarNav from "@/components/PillarNav";
import AgentsSection from "@/components/pillars/AgentsSection";
import CloudSection from "@/components/pillars/CloudSection";
import GrowthSection from "@/components/pillars/GrowthSection";
import BlockChainSection from "@/components/pillars/BlockChainSection";
import ClosingBanner from "@/components/ClosingBanner";
import Footer from "@/components/Footer";

const pillars = [
  { id: "agents", name: "Agents" },
  { id: "cloud", name: "Cloud" },
  { id: "growth", name: "Growth" },
  { id: "chain", name: "BlockChain" },
] as const;

export default function Home() {
  return (
    <>
      <main className="relative mx-auto max-w-[1500px] px-6 py-16 sm:px-12 sm:py-24 lg:px-24">
      <HeroIntro />

      {/* Hero with full-bleed video background.
          - Negative margins escape main's px-* so video reaches viewport edges
          - inner padding restored so the grid layout is unchanged
          - isolate creates a stacking context, video/overlay sit at -z-10
          - motion-reduce:hidden swaps to a static dark surface for reduced-motion users */}
      <div className="relative isolate -mx-6 px-6 sm:-mx-12 sm:px-12 lg:-mx-24 lg:px-24">
        <video
          aria-hidden
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-45 motion-reduce:hidden"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260422_112520_ee819691-f2e8-4c54-bb77-3fb72c84eaa5.mp4"
            type="video/mp4"
          />
        </video>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-bg/85 via-bg/55 to-bg/30"
        />

      <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,520px)] lg:items-center lg:gap-16">
        <div>
          <p
            data-hero="brand"
            className="font-mono text-xl uppercase tracking-[0.28em] text-fg sm:text-2xl lg:text-[28px]"
          >
            Argos Labs
          </p>

          <h1
            data-hero="h1"
            className="mt-8 font-display text-4xl font-semibold leading-[0.95] tracking-tight text-fg sm:text-5xl lg:text-[64px]"
          >
            All-in-One AI Execution Platform
          </h1>

          <p
            data-hero="lead"
            className="mt-6 max-w-2xl text-base leading-relaxed text-fg-3 sm:text-lg"
          >
            We help enterprises build with AI — agents, infra, growth, on-chain.
          </p>

          <PillarNav pillars={pillars} />

          <div data-hero="cta" className="mt-12 flex flex-wrap gap-3">
            <a
              data-cta
              href="mailto:contact@argoslabs.io"
              className="inline-flex h-12 items-center rounded-md bg-brand px-5 font-display font-medium text-bg shadow-[0_0_28px_-6px_var(--color-brand)] transition-transform duration-100 hover:scale-[1.02]"
            >
              Talk to Sales
            </a>
            <a
              data-cta
              href="#pillars"
              className="cta-rotating-border inline-flex h-12 items-center rounded-md px-5 font-display font-medium text-fg transition-colors duration-100 hover:text-[var(--accent)]"
            >
              Explore the platform
            </a>
          </div>
        </div>

        <div className="mx-auto mt-12 w-full max-w-[320px] sm:max-w-[420px] lg:mt-0 lg:max-w-[520px]">
          <HeroVisual />
        </div>
      </div>
      </div>

      <LogoWall />
      <PillarGrid />

      <AgentsSection />
      <CloudSection />
      <GrowthSection />
      <BlockChainSection />

      </main>

      <ClosingBanner />
      <Footer />
    </>
  );
}
