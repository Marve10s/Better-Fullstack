/* oxlint-disable react-perf/jsx-no-new-object-as-prop -- Remotion styles are frame-derived. */
import type { CSSProperties } from "react";

import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

import type { SearchMediaItem, SearchMediaSpec } from "@/search-media/specs";

import { BF_COLORS, FONT_MONO, FONT_SANS, GridBackground, Wordmark } from "@/styles";

type SearchMediaProps = {
  spec: SearchMediaSpec;
  animated: boolean;
};

const resolveIcon = (src: string) => (src.startsWith("/") ? staticFile(src.slice(1)) : src);

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

function getEntrance(animated: boolean, frame: number, fps: number, delay: number) {
  if (!animated) return { opacity: 1, y: 0, scale: 1 };

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
    durationInFrames: Math.round(0.7 * fps),
  });

  return {
    opacity: interpolate(progress, [0, 0.35], [0, 1], clamp),
    y: interpolate(progress, [0, 1], [18, 0], clamp),
    scale: interpolate(progress, [0, 1], [0.96, 1], clamp),
  };
}

function TechIcon({ item, size = 34 }: { item: SearchMediaItem; size?: number }) {
  return (
    <div
      style={{
        width: size + 16,
        height: size + 16,
        borderRadius: 10,
        border: `1px solid ${BF_COLORS.border}`,
        background: BF_COLORS.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      <Img
        src={resolveIcon(item.icon)}
        style={{ width: size, height: size, objectFit: "contain" }}
      />
    </div>
  );
}

function FlowLayout({ items, animated }: { items: SearchMediaItem[]; animated: boolean }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const connectorProgress = animated
    ? interpolate(frame, [0.4 * fps, 1.5 * fps], [0, 1], clamp)
    : 1;

  return (
    <div
      style={{
        position: "relative",
        width: 390,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 31,
          top: 42,
          bottom: 42,
          width: 1,
          background: BF_COLORS.purple,
          transformOrigin: "top",
          transform: `scaleY(${connectorProgress})`,
          opacity: 0.65,
        }}
      />
      {items.map((item, index) => {
        const entrance = getEntrance(animated, frame, fps, 12 + index * 10);
        return (
          <div
            key={item.name}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "15px 17px",
              borderRadius: 12,
              border: `1px solid ${index === 0 ? "rgba(136,57,239,0.65)" : BF_COLORS.border}`,
              background: "rgba(26,26,26,0.94)",
              opacity: entrance.opacity,
              transform: `translateY(${entrance.y}px) scale(${entrance.scale})`,
            }}
          >
            <TechIcon item={item} />
            <div>
              <div style={{ fontFamily: FONT_MONO, fontSize: 18, fontWeight: 650 }}>
                {item.name}
              </div>
              <div style={{ marginTop: 3, color: BF_COLORS.muted, fontSize: 14 }}>
                {item.detail}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DecisionLayout({ items, animated }: { items: SearchMediaItem[]; animated: boolean }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lineProgress = animated ? interpolate(frame, [0.55 * fps, 1.25 * fps], [0, 1], clamp) : 1;

  return (
    <div
      style={{
        width: 420,
        height: 310,
        position: "relative",
        display: "flex",
        gap: 14,
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 78,
          right: 78,
          top: "50%",
          height: 1,
          background: BF_COLORS.purple,
          transformOrigin: "center",
          transform: `scaleX(${lineProgress})`,
          opacity: 0.7,
        }}
      />
      {items.map((item, index) => {
        const entrance = getEntrance(animated, frame, fps, 13 + index * 12);
        return (
          <div
            key={item.name}
            style={{
              position: "relative",
              flex: 1,
              height: 230,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRadius: 14,
              border: `1px solid ${index === 0 ? BF_COLORS.border : "rgba(136,57,239,0.65)"}`,
              background: "rgba(26,26,26,0.96)",
              opacity: entrance.opacity,
              transform: `translateY(${entrance.y}px) scale(${entrance.scale})`,
            }}
          >
            <TechIcon item={item} size={42} />
            <div>
              <div
                style={{ fontFamily: FONT_MONO, fontSize: 18, fontWeight: 650, lineHeight: 1.15 }}
              >
                {item.name}
              </div>
              <div style={{ marginTop: 8, color: BF_COLORS.muted, fontSize: 14, lineHeight: 1.35 }}>
                {item.detail}
              </div>
            </div>
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 34,
          height: 34,
          borderRadius: 999,
          transform: "translate(-50%, -50%)",
          background: BF_COLORS.background,
          border: `1px solid ${BF_COLORS.purple}`,
          color: BF_COLORS.purple,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT_MONO,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.08em",
        }}
      >
        OR
      </div>
    </div>
  );
}

function MatrixLayout({ items, animated }: { items: SearchMediaItem[]; animated: boolean }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ width: 420 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {items.map((item, index) => {
          const entrance = getEntrance(animated, frame, fps, 10 + index * 8);
          return (
            <div
              key={item.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 14,
                borderRadius: 11,
                border: `1px solid ${BF_COLORS.border}`,
                background: "rgba(26,26,26,0.94)",
                opacity: entrance.opacity,
                transform: `translateY(${entrance.y}px) scale(${entrance.scale})`,
              }}
            >
              <TechIcon item={item} size={29} />
              <div>
                <div style={{ fontFamily: FONT_MONO, fontSize: 15, fontWeight: 650 }}>
                  {item.name}
                </div>
                <div style={{ marginTop: 2, color: BF_COLORS.muted, fontSize: 12 }}>
                  {item.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ProcessLine animated={animated} />
    </div>
  );
}

function ProcessLine({ animated }: { animated: boolean }) {
  const steps = ["choose", "generate", "inspect", "keep"];
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = animated ? interpolate(frame, [1.1 * fps, 2.25 * fps], [0, 1], clamp) : 1;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        marginTop: 30,
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 6,
          left: 8,
          right: 8,
          height: 1,
          background: BF_COLORS.border,
        }}
      >
        <div
          style={{ width: `${progress * 100}%`, height: "100%", background: BF_COLORS.purple }}
        />
      </div>
      {steps.map((step, index) => (
        <div key={step} style={{ position: "relative", textAlign: "center" }}>
          <div
            style={{
              width: 13,
              height: 13,
              margin: "0 auto 9px",
              borderRadius: 999,
              background:
                progress >= index / (steps.length - 1) ? BF_COLORS.purple : BF_COLORS.panel,
              border: `1px solid ${progress >= index / (steps.length - 1) ? BF_COLORS.purple : BF_COLORS.border}`,
            }}
          />
          <span style={{ fontFamily: FONT_MONO, color: BF_COLORS.muted, fontSize: 11 }}>
            {step}
          </span>
        </div>
      ))}
    </div>
  );
}

function Visual({ spec, animated }: SearchMediaProps) {
  if (spec.layout === "decision") return <DecisionLayout items={spec.items} animated={animated} />;
  if (spec.layout === "matrix") return <MatrixLayout items={spec.items} animated={animated} />;
  return <FlowLayout items={spec.items} animated={animated} />;
}

export function SearchMedia({ spec, animated }: SearchMediaProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleEntrance = getEntrance(animated, frame, fps, 3);
  const copyEntrance = getEntrance(animated, frame, fps, 10);
  const commandEntrance = getEntrance(animated, frame, fps, 28);

  const commandStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 13,
    marginTop: "auto",
    padding: "13px 18px",
    border: `1px solid ${BF_COLORS.border}`,
    borderRadius: 8,
    background: BF_COLORS.panel,
    color: BF_COLORS.foreground,
    fontFamily: FONT_MONO,
    fontSize: 15,
    opacity: commandEntrance.opacity,
    transform: `translateY(${commandEntrance.y}px)`,
  };

  return (
    <GridBackground style={{ padding: 44 }}>
      <div
        style={{
          height: "100%",
          border: `1px solid ${BF_COLORS.border}`,
          borderRadius: 20,
          background: "rgba(12,12,14,0.88)",
          padding: "36px 42px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Wordmark size={21} />
          <div
            style={{
              color: BF_COLORS.purple,
              fontFamily: FONT_MONO,
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            {spec.eyebrow}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1.25fr 0.9fr",
            alignItems: "center",
            gap: 48,
          }}
        >
          <div
            style={{
              alignSelf: "stretch",
              paddingTop: 56,
              paddingBottom: 4,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h1
              style={{
                maxWidth: 640,
                margin: 0,
                fontFamily: FONT_MONO,
                fontSize: spec.layout === "decision" ? 54 : 58,
                fontWeight: 760,
                lineHeight: 0.98,
                letterSpacing: "-0.055em",
                opacity: titleEntrance.opacity,
                transform: `translateY(${titleEntrance.y}px)`,
              }}
            >
              {spec.title}
            </h1>
            <p
              style={{
                maxWidth: 595,
                margin: "24px 0 0",
                color: BF_COLORS.muted,
                fontFamily: FONT_SANS,
                fontSize: 20,
                lineHeight: 1.42,
                opacity: copyEntrance.opacity,
                transform: `translateY(${copyEntrance.y}px)`,
              }}
            >
              {spec.summary}
            </p>
            <div style={commandStyle}>
              <span style={{ color: BF_COLORS.purple }}>$</span>
              bun create better-fullstack@latest
            </div>
          </div>
          <Visual spec={spec} animated={animated} />
        </div>
      </div>
    </GridBackground>
  );
}

export function SearchMediaVideo({ spec }: { spec: SearchMediaSpec }) {
  return <SearchMedia spec={spec} animated />;
}

export function SearchMediaStill({ spec }: { spec: SearchMediaSpec }) {
  return <SearchMedia spec={spec} animated={false} />;
}
