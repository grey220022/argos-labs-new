import Reveal from "./Reveal";

export default function ClosingBanner() {
  return (
    <section
      aria-label="Closing statement"
      className="relative mt-32 border-y border-fg-7 sm:mt-48"
    >
      <div className="mx-auto max-w-[1500px] px-6 py-24 sm:px-12 sm:py-32 lg:px-24">
        <Reveal className="block">
          <h2 className="max-w-[18ch] font-display text-4xl font-semibold leading-[0.95] tracking-tight text-fg sm:text-6xl lg:text-[80px]">
            We go beyond features — we build real-world impact.
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
