import PillarSection from "./PillarSection";
import Reveal from "../Reveal";

const services = [
  {
    title: "Strategy & consulting",
    body: "Market research, positioning, GTM. Senior operators with shipped scars, not slide decks.",
  },
  {
    title: "Paid acquisition",
    body: "Performance marketing across Meta, Google, TikTok, X, and emerging channels. Data-first, creative-second.",
  },
  {
    title: "Hands-on execution",
    body: "Embedded growth team for 30 to 90 days. Land the experiment, ship the result, hand off the playbook.",
  },
  {
    title: "BD & partnerships",
    body: "Door-opening relationships across regions and verticals. Agreements signed, integrations live.",
  },
];

export default function GrowthSection() {
  return (
    <PillarSection
      pillar="growth"
      id="growth"
      eyebrow="Growth"
      heading="Global growth as a managed service."
      subheading="A four-pronged service line for companies expanding into new regions, channels, or verticals. Outcomes, not retainers."
    >
      <Reveal
        gap={70}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6"
      >
        {services.map((s) => (
          <div
            key={s.title}
            className="rounded-xl border border-fg-7 bg-bg-2 p-6 transition-colors duration-200 hover:border-[var(--accent)] sm:p-7"
          >
            <h3 className="font-display text-xl font-semibold tracking-tight text-fg sm:text-2xl">
              {s.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-fg-3 sm:text-base">
              {s.body}
            </p>
          </div>
        ))}
      </Reveal>

      <a
        data-cta
        href="mailto:contact@argoslabs.io?subject=Growth%20engagement"
        className="mt-12 inline-flex h-12 items-center rounded-md bg-[var(--accent)] px-5 font-display font-medium text-bg shadow-[0_0_28px_-6px_var(--accent)] transition-transform duration-100 hover:scale-[1.02]"
      >
        Get a quote
      </a>
    </PillarSection>
  );
}
