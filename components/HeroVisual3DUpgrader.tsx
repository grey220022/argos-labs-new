"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function HeroVisual3DUpgrader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    try {
      const probe = document.createElement("canvas");
      const ctx =
        probe.getContext("webgl2") ||
        probe.getContext("webgl") ||
        probe.getContext("experimental-webgl");
      if (!ctx) return;
    } catch {
      return;
    }

    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <div className="absolute inset-0">
      <HeroCanvas />
    </div>
  );
}
