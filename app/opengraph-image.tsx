import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const alt = "187WEB — Access is the product. Inclusion is the system.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social/OG card — Access+/Include+ thesis (static export safe). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050608",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#39FF14" }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 9999,
              border: "4px solid #39FF14",
            }}
          />
          <span style={{ fontSize: 28, letterSpacing: 2, fontWeight: 600 }}>187WEB · LumenHelix Lab</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1.05,
              color: "#ECEDF7",
            }}
          >
            Access is the product.
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              letterSpacing: -1.5,
              lineHeight: 1.1,
              color: "#39FF14",
            }}
          >
            Inclusion is the system.
          </div>
          <div style={{ marginTop: 12, fontSize: 26, color: "#A8AAB8", maxWidth: 900 }}>
            187ACCESS+ · 187INCLUDE+ · /187++ — premier skills for disability access, ADHD/neurodivergent UX, and
            LGBTQ+ identity safety.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
