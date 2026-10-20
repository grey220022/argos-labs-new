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
  { name: "Tencent Cloud", file: "tencent-cloud.svg", w: 719, h: 564, boost: true },
  { name: "Creao", file: "creao.png", w: 463, h: 169 },
  { name: "Station F", file: "stationf.png", w: 420, h: 76 },
  { name: "HEC Paris", file: "hec.png", w: 230, h: 103 },
  { name: "École Polytechnique", file: "polytechnique.png", w: 562, h: 165 },
  { name: "PSL", file: "PSL.png", w: 502, h: 151 },
  { name: "Arts et Métiers", file: "arts-et-metiers.png", w: 472, h: 117 },
  { name: "NYU", file: "nyu.png", w: 326, h: 112 },
  { name: "Alstom", file: "alstom.png", w: 328, h: 68 },
  { name: "Shift", file: "shift.png", w: 286, h: 73 },
  { name: "GPTDAO", file: "gptdao.png", w: 512, h: 512, boost: true },
];

const PRIMARY_COUNT = 7;

export default function LogoWall() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="network-board" aria-labelledby="trusted-by">
      <h2 id="trusted-by">Our network.</h2>
      <Reveal className="partner-grid" gap={60}>
        {partners.map((p, i) => (
          <div key={p.name} className={`partner-tile ${i >= PRIMARY_COUNT && !expanded ? "partner-overflow" : ""}`}>
            <Image src={`/images/${p.file}`} alt={p.name} width={p.w} height={p.h} sizes="160px" className={p.boost ? "partner-boost" : undefined} />
          </div>
        ))}
      </Reveal>
      <button type="button" onClick={() => setExpanded((v) => !v)} className="partner-toggle" aria-expanded={expanded}>
        {expanded ? "Show less ↑" : `Show ${partners.length - PRIMARY_COUNT} more partners →`}
      </button>
    </section>
  );
}
