import Image from "next/image";
import Reveal from "./Reveal";

type Partner = {
  name: string;
  file: string;
  w: number;
  h: number;
  boost?: boolean; // 内嵌大量空白边距 / 比例近方形的 logo 用此放大一档
};

const partners: readonly Partner[] = [
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
  { name: "Solana", file: "solana.svg", w: 646, h: 96 },
  { name: "Circle", file: "circle.avif", w: 391, h: 100 },
  { name: "iExec", file: "iexec.svg", w: 111, h: 41 },
  { name: "Meria", file: "meria.svg", w: 189, h: 40 },
  { name: "Morningstar Ventures", file: "morningstar-ventures.svg", w: 173, h: 55 },
  { name: "Cypher Capital", file: "cypher-capital.svg", w: 331, h: 51 },
  { name: "Binance", file: "binance.svg", w: 632, h: 127 },
  { name: "Stellar", file: "stellar.svg", w: 631, h: 161 },
  { name: "Standx", file: "standx.png", w: 388, h: 506 },
  { name: "Creao", file: "creao.png", w: 463, h: 169 },
  { name: "Debot", file: "debot.png", w: 992, h: 992 },
  { name: "Tencent Cloud", file: "tencent-cloud.svg", w: 1053, h: 720, boost: true },
  { name: "AWS", file: "aws.svg", w: 304, h: 182 },
  { name: "OVHcloud", file: "ovhcloud.svg", w: 298, h: 47 },
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
            className="brightness-0 invert opacity-60 transition duration-200 hover:opacity-100 hover:brightness-100 hover:invert-0"
          >
            <Image
              src={`/images/${p.file}`}
              alt={p.name}
              width={p.w}
              height={p.h}
              className={`w-auto select-none ${
                p.boost ? "h-11 sm:h-14" : "h-7 sm:h-8"
              }`}
              sizes="(max-width: 640px) 96px, 128px"
            />
          </div>
        ))}
      </Reveal>
    </section>
  );
}
