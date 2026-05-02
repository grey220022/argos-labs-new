export default function PressKit() {
  return (
    <div className="flex flex-col gap-3 sm:items-end">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-fg-4">
        Press Kit
      </p>
      <a
        href="/press/argos-labs-logo-kit.zip"
        download
        className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-fg-2 transition-colors duration-100 hover:text-brand"
      >
        Logo Kit
        <span
          aria-hidden
          className="font-mono text-[10px] tracking-[0.18em] text-fg-5 transition-colors duration-100 group-hover:text-brand/70"
        >
          .zip
        </span>
        <span
          aria-hidden
          className="text-fg-5 transition-[transform,color] duration-200 ease-[cubic-bezier(0,0,0.2,1)] group-hover:translate-y-0.5 group-hover:text-brand"
        >
          ↓
        </span>
      </a>
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-5 sm:text-right">
        SVG · Dark + Light
      </p>
    </div>
  );
}
