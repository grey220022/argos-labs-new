"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";

type Partner = {
  name: string;
  file: string;
  w: number;
  h: number;
  boost?: boolean; // 内嵌大量空白边距 / 比例近方形的 logo 用此放大一档
};

// First 7 are the priority logos shown by default on mobile.
// The rest fold behind a "Show more" toggle (<sm); on sm+ all are shown.
const partners: readonly Partner[] = [
  { name: "Microsoft", file: "microsoft.svg", w: 338, h: 72 },
  { name: "Google", file: "google.svg", w: 272, h: 92 },
  { name: "AWS", file: "aws.svg", w: 301, h: 180 },
  { name: "Circle", file: "circle.avif", w: 391, h: 100 },
  { name: "Tencent Cloud", file: "tencent-cloud.svg", w: 552, h: 486, boost: true },
  { name: "OVHcloud", file: "ovhcloud.svg", w: 308, h: 47 },
  { name: "Creao", file: "creao.png", w: 463, h: 169 },
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
  { name: "iExec", file: "iexec.svg", w: 111, h: 41 },
  { name: "Meria", file: "meria.svg", w: 189, h: 40 },
  { name: "Morningstar Ventures", file: "morningstar-ventures.svg", w: 173, h: 55 },
  { name: "Cypher Capital", file: "cypher-capital.svg", w: 331, h: 51 },
  { name: "Binance", file: "binance.svg", w: 632, h: 127 },
  { name: "Stellar", file: "stellar.svg", w: 631, h: 161 },
  { name: "Standx", file: "standx.png", w: 388, h: 506 },
  { name: "Debot", file: "debot.png", w: 992, h: 992 },
  { name: "GPTDAO", file: "gptdao.png", w: 512, h: 512, boost: true },
];

const PRIMARY_COUNT = 7;

export default function LogoWall() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="mt-24 sm:mt-32" aria-labelledby="trusted-by">
      <p
        id="trusted-by"
        className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-fg-4"
      >
        <span
          aria-hidden
          className="size-1.5 rounded-full bg-brand shadow-[0_0_10px_rgba(124,133,255,0.65)]"
        />
        Trusted by
      </p>
      <h2 className="mt-3 max-w-3xl font-display text-xl font-semibold leading-tight tracking-tight text-fg-2 sm:text-2xl">
        World-class partners across AI, infra, and on-chain rails.
      </h2>

      <Reveal
        gap={40}
        className="group/wall mt-8 flex flex-wrap items-center gap-x-10 gap-y-7 sm:gap-x-12 sm:gap-y-8"
      >
        {partners.map((p, i) => {
          const isOverflow = i >= PRIMARY_COUNT;
          // sm+ always shows; on <sm hide overflow when not expanded
          const visibilityClass = isOverflow
            ? expanded
              ? ""
              : "hidden sm:flex"
            : "";
          return (
            <div
              key={p.name}
              className={`group/logo relative ${visibilityClass}`}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-3 rounded-md bg-brand/0 blur-2xl transition-colors duration-[350ms] ease-[cubic-bezier(0,0,0.2,1)] group-hover/logo:bg-brand/25"
              />
              <Image
                src={`/images/${p.file}`}
                alt={p.name}
                width={p.w}
                height={p.h}
                className={`relative w-auto select-none brightness-0 invert opacity-60 transition duration-[350ms] ease-[cubic-bezier(0,0,0.2,1)] group-hover/wall:opacity-30 group-hover/logo:invert-0 group-hover/logo:brightness-100 group-hover/logo:scale-105 group-hover/logo:!opacity-100 ${
                  p.boost ? "h-11 sm:h-14" : "h-7 sm:h-8"
                }`}
                sizes="(max-width: 640px) 96px, 128px"
              />
            </div>
          );
        })}
      </Reveal>

      {/* Mobile-only "Show more / less" toggle */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mono-link mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-brand sm:hidden"
        aria-expanded={expanded}
      >
        {expanded ? (
          <>Show less <span aria-hidden>↑</span></>
        ) : (
          <>
            Show {partners.length - PRIMARY_COUNT}+ more partners{" "}
            <span aria-hidden>→</span>
          </>
        )}
      </button>
    </section>
  );
}
