import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

import { BrowserWindow, type BrowserWindowMode } from "@/campaign/browser-window";
import { BF_COLORS, FONT_MONO, GridBackground, Wordmark } from "@/styles";

export const CAMPAIGN_FPS = 30;
export const CAMPAIGN_SCENES = [81, 126, 75] as const;
export const CAMPAIGN_TRANSITION = 12;
export const CAMPAIGN_DURATION =
  CAMPAIGN_SCENES.reduce((total, scene) => total + scene, 0) -
  CAMPAIGN_TRANSITION * (CAMPAIGN_SCENES.length - 1);

function HookScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 28 });

  return (
    <GridBackground
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: 100,
        textAlign: "center",
      }}
    >
      <div
        style={{
          opacity: reveal,
          transform: `translateY(${interpolate(reveal, [0, 1], [24, 0])}px)`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Wordmark size={28} />
        </div>
        <h1
          style={{
            maxWidth: 1280,
            margin: "42px auto 0",
            fontFamily: FONT_MONO,
            fontSize: 84,
            lineHeight: 0.98,
            letterSpacing: "-0.065em",
          }}
        >
          Don&apos;t trust a starter
          <br />
          <span style={{ color: BF_COLORS.foreground }}>you can&apos;t run.</span>
        </h1>
      </div>
    </GridBackground>
  );
}

function ProductScene() {
  return (
    <GridBackground
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: 70,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 64 }}>
        <div style={{ width: 460 }}>
          <div
            style={{
              color: BF_COLORS.purple,
              fontFamily: FONT_MONO,
              fontSize: 14,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Run · edit · download
          </div>
          <div
            style={{
              marginTop: 25,
              fontFamily: FONT_MONO,
              fontSize: 58,
              fontWeight: 750,
              lineHeight: 1.02,
              letterSpacing: "-0.055em",
            }}
          >
            A real project.
            <br />
            In your browser.
          </div>
          <div style={{ marginTop: 28, color: BF_COLORS.muted, fontSize: 24, lineHeight: 1.45 }}>
            No signup. No upload. Take the ZIP when you&apos;re ready.
          </div>
        </div>
        <BrowserWindow compact />
      </div>
    </GridBackground>
  );
}

function CtaScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 24,
  });

  return (
    <GridBackground
      style={{
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div style={{ opacity: entrance }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Wordmark size={32} />
        </div>
        <div
          style={{
            marginTop: 38,
            fontFamily: FONT_MONO,
            fontSize: 74,
            fontWeight: 750,
            letterSpacing: "-0.06em",
          }}
        >
          Run before you clone.
        </div>
        <div
          style={{
            margin: "42px auto 0",
            width: "fit-content",
            padding: "14px 32px",
            border: `1px solid ${BF_COLORS.border}`,
            borderRadius: 8,
            background: BF_COLORS.panel,
            color: BF_COLORS.foreground,
            fontFamily: FONT_MONO,
            fontSize: 22,
          }}
        >
          better-fullstack.dev/run-before-you-clone
        </div>
      </div>
    </GridBackground>
  );
}

export function RunBeforeYouCloneVideo() {
  const timing = linearTiming({ durationInFrames: CAMPAIGN_TRANSITION });

  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={CAMPAIGN_SCENES[0]} premountFor={CAMPAIGN_FPS}>
        <HookScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={timing} />
      <TransitionSeries.Sequence durationInFrames={CAMPAIGN_SCENES[1]} premountFor={CAMPAIGN_FPS}>
        <ProductScene />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={timing} />
      <TransitionSeries.Sequence durationInFrames={CAMPAIGN_SCENES[2]} premountFor={CAMPAIGN_FPS}>
        <CtaScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
}

export function FeatureClip({ mode }: { mode: BrowserWindowMode }) {
  const labels: Record<BrowserWindowMode, { title: string; color: string }> = {
    run: { title: "Run the real project.", color: BF_COLORS.foreground },
    edit: { title: "Edit. Save. Rerun.", color: BF_COLORS.foreground },
    download: { title: "Take the ZIP.", color: BF_COLORS.foreground },
  };
  const label = labels[mode];

  return (
    <GridBackground style={{ alignItems: "center", justifyContent: "center", padding: 74 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 58 }}>
        <div style={{ width: 390 }}>
          <Wordmark size={24} />
          <div
            style={{
              marginTop: 42,
              color: label.color,
              fontFamily: FONT_MONO,
              fontSize: 58,
              fontWeight: 750,
              lineHeight: 1,
              letterSpacing: "-0.055em",
            }}
          >
            {label.title}
          </div>
          <div style={{ marginTop: 24, color: BF_COLORS.muted, fontSize: 22 }}>
            better-fullstack.dev
          </div>
        </div>
        <BrowserWindow mode={mode} compact />
      </div>
    </GridBackground>
  );
}
