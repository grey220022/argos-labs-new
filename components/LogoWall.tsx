import Image from "next/image";
import Reveal from "./Reveal";

const partners = [
  { name: "Station F", file: "stationf.png", w: 420, h: 76 },
  { name: "HEC Paris", file: "hec.png", w: 230, h: 103 },
  { name: "École Polytechnique", file: "polytechnique.png", w: 562, h: 165 },
  { name: "PSL", file: "PSL.png", w: 502, h: 151 },
  { name: "Arts et Métiers", file: "arts-et-metiers.png", w: 472, h: 117 },
  { name: "NYU", file: "nyu.png", w: 326, h: 112 },
  { name: "Ledger", file: "ledger.png", w: 336, h: 111 },
  { name: "Quantstamp", file: "quantstamp.png", w: 590, h: 110 },
  { name: "Alstom", file: "alstom.png", w: 328, h: 68 },
  { name: "Shift", file: "shift.png", w: 286, h: 73 },
];

export default function LogoWall() {
  return (
    <section className="mt-24 sm:mt-32" aria-labelledby="trusted-by">
      <p
        id="trusted-by"
        className="font-mono text-xs uppercase tracking-[0.22em] text-fg-4"
      >
        Trusted by
      </p>

      <Reveal
        gap={40}
        className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-7 sm:gap-x-12 sm:gap-y-8"
      >
        {partners.map((p) => (
          <div
            key={p.name}
            className="opacity-60 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0"
          >
            <Image
              src={`/images/${p.file}`}
              alt={p.name}
              width={p.w}
              height={p.h}
              className="h-7 w-auto select-none sm:h-8"
              sizes="(max-width: 640px) 96px, 128px"
            />
          </div>
        ))}
      </Reveal>
    </section>
  );
}
