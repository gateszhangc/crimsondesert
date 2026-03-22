import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = siteConfig.name;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at 22% 18%, rgba(245, 192, 125, 0.32), transparent 24%), radial-gradient(circle at 82% 22%, rgba(158, 51, 37, 0.28), transparent 22%), linear-gradient(180deg, #171116 0%, #0d1014 100%)",
          color: "#fff6eb",
          padding: "56px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "28px",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "34px",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "860px" }}>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)",
                padding: "10px 18px",
                fontSize: 20,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "#e6c190",
              }}
            >
              Independent companion
            </div>
            <div
              style={{
                fontSize: 92,
                lineHeight: 0.9,
                letterSpacing: "-0.06em",
                fontWeight: 700,
              }}
            >
              Crimson Desert
            </div>
            <div
              style={{
                fontSize: 34,
                lineHeight: 1.4,
                color: "rgba(255,246,235,0.78)",
                maxWidth: "760px",
              }}
            >
              A kingdom in ruin. A mercenary on the march.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 26,
              color: "rgba(255,246,235,0.74)",
            }}
          >
            <div>{siteConfig.domain}</div>
            <div>Updated March 21, 2026</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
