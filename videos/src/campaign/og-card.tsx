import { Img } from "remotion";

import { BF_COLORS, FONT_MONO, GridBackground, Wordmark } from "../styles";

const DEFAULT_ACTIONS = ["inspect", "edit", "run", "download"] as const;

export type OgCardProps = {
  eyebrow: string;
  title: string;
  body: string;
  technologies: Array<{ name: string; icon: string }>;
  accent?: string;
  actions?: readonly string[];
};

export function OgCard({
  eyebrow,
  title,
  body,
  technologies,
  accent = BF_COLORS.purple,
  actions = DEFAULT_ACTIONS,
}: OgCardProps) {
  return (
    <GridBackground style={{ padding: 54 }}>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: `1px solid ${BF_COLORS.border}`,
          borderRadius: 22,
          padding: "48px 54px",
          background: "rgba(12,12,14,0.82)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Wordmark size={23} />
          <span
            style={{
              color: accent,
              fontFamily: FONT_MONO,
              fontSize: 12,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            ✦ {eyebrow}
          </span>
        </div>
        <h1
          style={{
            maxWidth: 970,
            margin: "54px 0 0",
            fontFamily: FONT_MONO,
            fontSize: 69,
            fontWeight: 780,
            lineHeight: 0.96,
            letterSpacing: "-0.06em",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            maxWidth: 860,
            margin: "24px 0 0",
            color: BF_COLORS.muted,
            fontSize: 23,
            lineHeight: 1.4,
          }}
        >
          {body}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: "auto" }}>
          {technologies.map((technology) => (
            <div
              key={technology.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "9px 13px",
                border: `1px solid ${BF_COLORS.border}`,
                borderRadius: 8,
                background: BF_COLORS.panel,
                color: BF_COLORS.foreground,
                fontFamily: FONT_MONO,
                fontSize: 13,
              }}
            >
              <Img src={technology.icon} style={{ width: 18, height: 18, objectFit: "contain" }} />
              {technology.name}
            </div>
          ))}
          <span
            style={{
              marginLeft: "auto",
              color: "rgba(242,238,238,0.4)",
              fontFamily: FONT_MONO,
              fontSize: 13,
            }}
          >
            {actions.join(" · ")}
          </span>
        </div>
      </div>
    </GridBackground>
  );
}
