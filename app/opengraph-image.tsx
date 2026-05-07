import { ImageResponse } from "next/og";

// Build-time generated 1200x630 PNG used as Open Graph + Twitter card image.
// Picked up automatically by Next.js for the root route.

export const runtime = "edge";
export const alt = "Argos Labs — All-in-One AI Execution Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#000000",
          color: "#fafafa",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "#7c85ff",
            fontSize: 28,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#7c85ff",
              marginRight: 18,
              boxShadow: "0 0 24px #7c85ff",
            }}
          />
          Argos Labs
        </div>

        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.025em",
            marginTop: 36,
            maxWidth: 980,
          }}
        >
          All-in-One AI Execution Platform
        </div>

        <div
          style={{
            color: "#b3b3b3",
            fontSize: 36,
            letterSpacing: "0.04em",
            marginTop: 36,
          }}
        >
          Agents  ·  Cloud  ·  Growth  ·  BlockChain
        </div>

        <div
          style={{
            color: "#919191",
            fontSize: 22,
            marginTop: 48,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          We help enterprises build with AI.
        </div>
      </div>
    ),
    size,
  );
}
