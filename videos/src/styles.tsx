import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill } from "remotion";

export const BF_COLORS = {
  background: "#0c0c0e",
  foreground: "#f2eeee",
  muted: "#b3b0b0",
  border: "#2a2a2a",
  panel: "#1a1a1a",
  purple: "#8839ef",
  lime: "#C6E853",
  cyan: "#18D5FF",
  pink: "#FF5C8A",
} as const;

export const FONT_SANS = "Geist Sans";
export const FONT_MONO = "Geist Mono";

export function GridBackground({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: BF_COLORS.background,
        backgroundImage:
          "linear-gradient(rgba(242,238,238,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(242,238,238,0.04) 1px,transparent 1px)",
        backgroundSize: "64px 64px",
        color: BF_COLORS.foreground,
        fontFamily: FONT_SANS,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
}

export function Wordmark({ size = 30 }: { size?: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        fontFamily: FONT_MONO,
        fontSize: size,
        fontWeight: 700,
        letterSpacing: "-0.02em",
      }}
    >
      <span style={{ color: BF_COLORS.foreground }}>better</span>
      <span style={{ color: BF_COLORS.muted }}>fullstack</span>
    </div>
  );
}
