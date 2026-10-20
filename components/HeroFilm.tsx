"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function HeroFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      if (preference.matches) video.pause();
      else void video.play().catch(() => setPlaying(false));
    };
    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => preference.removeEventListener("change", syncPreference);
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => setPlaying(false));
    else video.pause();
  }

  return (
    <div className="hero-film">
      <Image src="/images/hero-poster.jpg" alt="Architectural study of a planted concrete workspace" fill sizes="(max-width: 700px) 100vw, 50vw" priority />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className={ready ? "film-ready" : undefined}
        onPlaying={() => { setReady(true); setPlaying(true); }}
        onPause={() => setPlaying(false)}
        onError={() => { setReady(false); setPlaying(false); }}
      >
        <source src="/videos/hero-loop.mp4" type="video/mp4" />
      </video>
      <button type="button" className="film-control" aria-pressed={!playing} onClick={togglePlayback}>
        {playing ? "Pause film" : "Play film"}
      </button>
    </div>
  );
}
