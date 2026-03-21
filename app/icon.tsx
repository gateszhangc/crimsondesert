import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "16px",
          background:
            "radial-gradient(circle at top left, rgba(245, 192, 125, 0.95), transparent 36%), linear-gradient(180deg, #211418 0%, #0f1013 100%)",
          color: "#fff4e5",
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: "-0.08em",
        }}
      >
        CD
      </div>
    ),
    size,
  );
}
