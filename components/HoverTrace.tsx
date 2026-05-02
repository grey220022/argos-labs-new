// Hover-trace overlay: an SVG stroke that draws around the parent's perimeter
// on group-hover. Drop inside any positioned element marked `group relative`.
// Falls back to a static visible stroke when prefers-reduced-motion is on.
//
// rx defaults to 11.5 to match Tailwind's `rounded-xl` (12px) minus stroke
// half-width. Override via the `rx` prop for other border-radius values.

type Props = {
  /** Border-radius (px) for the trace rect. Default 11.5 matches rounded-xl. */
  rx?: number;
};

export default function HoverTrace({ rx = 11.5 }: Props) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
    >
      <rect
        x="0.75"
        y="0.75"
        width="calc(100% - 1.5px)"
        height="calc(100% - 1.5px)"
        rx={rx}
        ry={rx}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={1.5}
        pathLength={1}
        strokeDasharray={1}
        vectorEffect="non-scaling-stroke"
        className="[stroke-dashoffset:1] motion-safe:transition-[stroke-dashoffset] motion-safe:duration-[750ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[stroke-dashoffset:0] motion-reduce:[stroke-dashoffset:0]"
      />
    </svg>
  );
}
