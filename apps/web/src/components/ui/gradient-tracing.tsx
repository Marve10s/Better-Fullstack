"use client";

import { motion } from "motion/react";
import { useId } from "react";

import { cn } from "@/lib/utils";

export interface GradientTracingProps {
  width?: number;
  height?: number;
  className?: string;
  baseColor?: string;
  gradientColors?: [string, string, string];
  animationDuration?: number;
  strokeWidth?: number;
  path?: string;
  delay?: number;
  paused?: boolean;
}

export function GradientTracing({
  width,
  height,
  className,
  baseColor = "black",
  gradientColors = ["#2EB9DF", "#2EB9DF", "#9E00FF"],
  animationDuration = 2,
  strokeWidth = 2,
  path,
  delay = 0,
  paused = false,
}: GradientTracingProps) {
  const gradientId = `pulse-${useId().replace(/:/g, "")}`;
  const resolvedWidth = width ?? 300;
  const resolvedHeight = height ?? 100;
  const resolvedPath = path ?? `M0,${resolvedHeight / 2} L${resolvedWidth},${resolvedHeight / 2}`;

  const gradientStops = (
    <>
      <stop stopColor={gradientColors[0]} stopOpacity="0" />
      <stop stopColor={gradientColors[1]} />
      <stop offset="1" stopColor={gradientColors[2]} stopOpacity="0" />
    </>
  );

  return (
    <div className={cn(className)} style={width && height ? { width, height } : undefined}>
      <svg
        className="size-full"
        viewBox={`0 0 ${resolvedWidth} ${resolvedHeight}`}
        fill="none"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d={resolvedPath}
          stroke={baseColor}
          strokeOpacity="0.2"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={resolvedPath}
          stroke={`url(#${gradientId})`}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
        />
        <defs>
          {paused ? (
            <linearGradient
              id={gradientId}
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2={resolvedWidth}
            >
              {gradientStops}
            </linearGradient>
          ) : (
            <motion.linearGradient
              animate={{
                x1: [0, resolvedWidth * 2],
                x2: [0, resolvedWidth],
              }}
              transition={{
                duration: animationDuration,
                repeat: Infinity,
                ease: "linear",
                delay,
              }}
              id={gradientId}
              gradientUnits="userSpaceOnUse"
            >
              {gradientStops}
            </motion.linearGradient>
          )}
        </defs>
      </svg>
    </div>
  );
}
