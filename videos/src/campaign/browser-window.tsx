import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

import { BF_COLORS, FONT_MONO } from "../styles";

export type BrowserWindowMode = "run" | "edit" | "download";

const CODE = `export default function Page() {
  return (
    <main>
      <h1>Ship the product.</h1>
    </main>
  );
}`;

export function BrowserWindow({
  mode = "run",
  compact = false,
}: {
  mode?: BrowserWindowMode;
  compact?: boolean;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: Math.round(0.8 * fps),
  });
  const typedLength = Math.floor(
    interpolate(frame, [0.45 * fps, 2.3 * fps], [0, CODE.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const ready = frame >= 1.9 * fps;
  const downloadProgress = interpolate(frame, [1.2 * fps, 2.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: compact ? 760 : 1080,
        height: compact ? 460 : 620,
        overflow: "hidden",
        border: `1px solid ${BF_COLORS.border}`,
        borderRadius: 16,
        background: "#111113",
        boxShadow: "0 36px 90px rgba(0,0,0,0.42)",
        opacity: entrance,
        transform: `translateY(${interpolate(entrance, [0, 1], [34, 0])}px)`,
      }}
    >
      <div
        style={{
          height: 52,
          display: "flex",
          alignItems: "center",
          gap: 9,
          padding: "0 18px",
          borderBottom: `1px solid ${BF_COLORS.border}`,
          background: "#171719",
        }}
      >
        {[BF_COLORS.muted, BF_COLORS.border, BF_COLORS.purple].map((color) => (
          <span
            key={color}
            style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: color }}
          />
        ))}
        <div
          style={{
            margin: "0 auto",
            border: `1px solid ${BF_COLORS.border}`,
            borderRadius: 7,
            padding: "6px 84px",
            color: "rgba(242,238,238,0.38)",
            fontFamily: FONT_MONO,
            fontSize: 11,
          }}
        >
          better-fullstack.dev/new
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", height: "calc(100% - 52px)" }}>
        <div
          style={{
            padding: 18,
            borderRight: `1px solid ${BF_COLORS.border}`,
            color: "rgba(242,238,238,0.48)",
            fontFamily: FONT_MONO,
            fontSize: 12,
          }}
        >
          <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            project files
          </div>
          {["app", "components", "package.json", "vite.config.ts"].map((file, index) => (
            <div
              key={file}
              style={{
                marginTop: index === 0 ? 24 : 10,
                padding: "7px 8px",
                borderRadius: 5,
                background: index === 1 ? "rgba(242,238,238,0.07)" : "transparent",
                color: index === 1 ? BF_COLORS.foreground : undefined,
              }}
            >
              {index < 2 ? "⌄ " : "  "}
              {file}
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateRows: "1fr 126px", minWidth: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 0 }}>
            <div
              style={{
                padding: 22,
                borderRight: `1px solid ${BF_COLORS.border}`,
                fontFamily: FONT_MONO,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "rgba(242,238,238,0.36)",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                <span>app/page.tsx</span>
                <span>{mode === "edit" ? "editing" : "source"}</span>
              </div>
              <pre
                style={{
                  marginTop: 30,
                  whiteSpace: "pre-wrap",
                  color: "rgba(242,238,238,0.68)",
                  fontFamily: FONT_MONO,
                  fontSize: compact ? 14 : 16,
                  lineHeight: 1.75,
                }}
              >
                {mode === "edit" ? CODE.slice(0, typedLength) : CODE}
                {mode === "edit" && typedLength < CODE.length ? (
                  <span style={{ color: BF_COLORS.foreground }}>|</span>
                ) : null}
              </pre>
            </div>
            <div style={{ padding: 24, background: "#f6f5f1", color: "#1b1a17" }}>
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  padding: 28,
                  border: "1px solid #e1e0d8",
                  borderRadius: 8,
                  background: "#fff",
                }}
              >
                <span
                  style={{
                    fontFamily: FONT_MONO,
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#6c6a61",
                  }}
                >
                  live preview
                </span>
                <div style={{ marginTop: "auto" }}>
                  <div
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: compact ? 28 : 34,
                      fontWeight: 750,
                      letterSpacing: "-0.05em",
                    }}
                  >
                    Ship the product.
                  </div>
                  <div
                    style={{
                      width: "fit-content",
                      marginTop: 18,
                      padding: "10px 15px",
                      borderRadius: 6,
                      background: BF_COLORS.purple,
                      color: BF_COLORS.foreground,
                      fontFamily: FONT_MONO,
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {ready ? "It is running" : "Starting…"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: 16,
              borderTop: `1px solid ${BF_COLORS.border}`,
              background: BF_COLORS.background,
              fontFamily: FONT_MONO,
              fontSize: 11,
              color: "rgba(242,238,238,0.42)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
              <span style={{ color: BF_COLORS.purple }}>&gt;_</span>
              runtime output
              <span
                style={{
                  marginLeft: "auto",
                  color: ready ? BF_COLORS.foreground : BF_COLORS.muted,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                }}
              >
                {mode === "download"
                  ? `ZIP ${Math.round(downloadProgress * 100)}%`
                  : ready
                    ? "ready"
                    : "starting"}
              </span>
            </div>
            <div style={{ marginTop: 12, color: "rgba(242,238,238,0.28)" }}>
              {mode === "download"
                ? "$ creating project archive locally"
                : ready
                  ? "$ dev server ready at localhost:5173"
                  : "$ installing dependencies"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
