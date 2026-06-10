"use client";

import { useEffect, useState } from "react";

import { GradientTracing } from "@/components/ui/gradient-tracing";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

type GradientTracingBackgroundProps = {
  className?: string;
};

const CYAN_PURPLE = ["#2EB9DF", "#2EB9DF", "#9E00FF"] as [string, string, string];
const LIME = ["#C6E853", "#C6E853", "#d2ee72"] as [string, string, string];

const LINES = [
  {
    className: "absolute right-0 top-[4%] h-[26%] w-[72%]",
    width: 1000,
    height: 250,
    path: "M0,150 Q250,0 500,150 T1000,150",
    gradientColors: LIME,
    duration: 2.8,
    delay: 0,
    strokeWidth: 2,
  },
  {
    className: "absolute right-0 top-[14%] h-[18%] w-[90%]",
    width: 1000,
    height: 120,
    path: "M0,60 Q500,0 1000,60",
    gradientColors: CYAN_PURPLE,
    duration: 3.1,
    delay: 0.35,
    strokeWidth: 1.75,
  },
  {
    className: "absolute right-0 top-[30%] h-[22%] w-[86%]",
    width: 1000,
    height: 200,
    path: "M0,140 Q320,20 640,110 T1000,40",
    gradientColors: CYAN_PURPLE,
    duration: 3.4,
    delay: 0.7,
    strokeWidth: 2,
  },
  {
    className: "absolute right-0 top-[46%] h-[24%] w-[68%]",
    width: 1000,
    height: 250,
    path: "M0,180 Q250,40 500,180 T1000,180",
    gradientColors: LIME,
    duration: 2.5,
    delay: 1,
    strokeWidth: 1.75,
  },
  {
    className: "absolute right-0 top-[58%] h-[16%] w-[94%]",
    width: 1000,
    height: 100,
    path: "M0,50 L1000,50",
    gradientColors: CYAN_PURPLE,
    duration: 2.2,
    delay: 0.15,
    strokeWidth: 1.5,
  },
  {
    className: "absolute right-0 top-[68%] h-[20%] w-[82%]",
    width: 1000,
    height: 180,
    path: "M0,80 Q400,160 720,72 T1000,128",
    gradientColors: CYAN_PURPLE,
    duration: 3.6,
    delay: 0.55,
    strokeWidth: 2,
  },
  {
    className: "absolute right-0 top-[78%] h-[22%] w-[64%]",
    width: 1000,
    height: 250,
    path: "M0,120 Q250,220 500,120 T1000,120",
    gradientColors: LIME,
    duration: 3,
    delay: 1.25,
    strokeWidth: 1.75,
  },
] as const;

export function GradientTracingBackground({ className }: GradientTracingBackgroundProps) {
  const { resolvedTheme } = useTheme();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPaused(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const baseColor = resolvedTheme === "dark" ? "#fafafa" : "#14532d";

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
      {LINES.map((line) => (
        <GradientTracing
          key={`${line.path}-${line.className}`}
          className={line.className}
          width={line.width}
          height={line.height}
          path={line.path}
          baseColor={baseColor}
          gradientColors={line.gradientColors}
          animationDuration={line.duration}
          strokeWidth={line.strokeWidth}
          delay={line.delay}
          paused={paused}
        />
      ))}
    </div>
  );
}
