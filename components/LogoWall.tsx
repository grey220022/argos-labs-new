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
  originalColors?: boolean; // Keep official background shapes from becoming white blocks.
};

// First 7 are the priority logos shown by default on mobile.
// The rest fold behind a "Show more" toggle at 700px and below.
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
  { name: "Alibaba Cloud", file: "alibabacloud-wordmark.svg", w: 120, h: 60, boost: true },
  { name: "MiniMax", file: "network/minimax.webp", w: 349, h: 128, boost: true },
  { name: "Z.ai", file: "network/zai.svg", w: 160, h: 160, boost: true, originalColors: true },
  { name: "Shanghai Jiao Tong University", file: "network/sjtu.svg", w: 75, h: 75, boost: true },
  { name: "Beihang University", file: "network/beihang.png", w: 316, h: 68 },
  { name: "Renmin University of China", file: "network/renmin.png", w: 240, h: 48 },
  { name: "Seoul National University", file: "network/snu.png", w: 156, h: 66, boost: true },
  { name: "MIT", file: "network/mit.svg", w: 867, h: 200 },
  { name: "ByteDance", file: "network/bytedance.svg", w: 256, h: 44 },
  { name: "TikTok", file: "network/tiktok.png", w: 10001, h: 4167, boost: true },
  { name: "OVHcloud", file: "ovhcloud.svg", w: 308, h: 47 },
];

const PRIMARY_COUNT = 7;

export default function LogoWall() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="network-board" aria-labelledby="trusted-by">
      <h2 id="trusted-by">Our network.</h2>
      <Reveal id="network-logos" className="partner-grid" gap={40}>
        {partners.map((p, i) => (
          <div key={p.name} className={`partner-tile ${i >= PRIMARY_COUNT && !expanded ? "partner-overflow" : ""}`}>
            <Image
              src={`/images/${p.file}`}
              alt={p.name}
              width={p.w}
              height={p.h}
              sizes="160px"
              className={p.boost ? "partner-boost" : undefined}
              style={p.originalColors ? { filter: "none" } : undefined}
            />
          </div>
        ))}
      </Reveal>
      <button type="button" onClick={() => setExpanded((v) => !v)} className="partner-toggle" aria-expanded={expanded} aria-controls="network-logos">
        {expanded ? "Show less ↑" : `Show ${partners.length - PRIMARY_COUNT} more →`}
      </button>
    </section>
  );
}
