"use client";

import { useState } from "react";
import Image from "next/image";

export default function HeroFilm() {
  const [playing, setPlaying] = useState(true);
  return (
    <div className="hero-film">
      <Image src="/images/hero-poster.jpg" alt="Architectural study of a planted concrete workspace" fill sizes="(max-width: 700px) 100vw, 50vw" priority />
      {playing && <video autoPlay muted loop playsInline preload="metadata" aria-hidden="true" poster="/images/hero-poster.jpg"><source src="/videos/hero-mobile.mp4" type="video/mp4" /></video>}
      <button type="button" className="film-control" aria-pressed={!playing} onClick={() => setPlaying((value) => !value)}>{playing ? "Pause film" : "Play film"}</button>
    </div>
  );
}
