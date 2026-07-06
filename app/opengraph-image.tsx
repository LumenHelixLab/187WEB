import { ImageResponse } from "next/og";

export const runtime = "nodejs";
// Pre-render at build time so the card works under `output: export` (GitHub Pages).
export const dynamic = "force-static";
export const alt = "187WEBdesign — Make killer websites.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Dynamic social/OG card (checklist: "social/OG preview image set"). */
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
          background: "#FAFAF7",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#5B6170" }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 9999,
              border: "5px solid #2440E6",
            }}
          />
          <span style={{ fontSize: 30, letterSpacing: -0.5 }}>187WEBdesign</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 104,
              fontWeight: 700,
              letterSpacing: -4,
              lineHeight: 1.05,
            }}
          >
            <span style={{ color: "#11131A" }}>Make&nbsp;</span>
            <span style={{ color: "#2440E6" }}>killer&nbsp;</span>
            <span style={{ color: "#11131A" }}>websites.</span>
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 32, color: "#5B6170" }}>
            A full-stack starter that ships the design skill — and proves it.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
