"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { motion, type Transition } from "motion/react";
import { type ComponentProps, type ReactNode } from "react";

import { LiquidChrome } from "@/components/ui/liquid-chrome";
import { cn } from "@/lib/utils";

const MULTI_CHROME_BASE: [number, number, number] = [
  0.0392156862745098, 0.0392156862745098, 0.0392156862745098,
];

export const CREATION_MODE_INDICATOR_TRANSITION: Transition = {
  type: "spring",
  bounce: 0.18,
  duration: 0.45,
};

export const CREATION_MODE_INDICATOR_ID = "creation-mode-indicator";

const chromeButtonVariants = cva(
  "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden text-white transition-[transform,background-color] duration-300 ease-in-out active:scale-95",
  {
    variants: {
      size: {
        default: "rounded-full px-6 py-4 text-sm font-medium",
        sm: "rounded-[6px] px-3.5 py-1.5 text-xs font-medium",
        toggle: "rounded-full px-4 py-1.5 text-xs font-medium sm:px-5 sm:py-2",
      },
      border: {
        solid: "border-2 border-neutral-900 bg-neutral-950 shadow-lg",
        none: "border-0 bg-transparent shadow-none",
      },
      tone: {
        default: "",
        toggleIdle: "bg-neutral-950/80",
        toggleActive: "bg-transparent",
      },
    },
    defaultVariants: {
      size: "default",
      border: "solid",
      tone: "default",
    },
  },
);

type ChromeButtonProps = ComponentProps<"button"> &
  VariantProps<typeof chromeButtonVariants> & {
    children: ReactNode;
    chromeOpacity?: "idle" | "active";
    showActiveIndicator?: boolean;
  };

export function ChromeButton({
  children,
  className,
  size,
  border,
  tone,
  chromeOpacity = "active",
  showActiveIndicator = false,
  type = "button",
  ...props
}: ChromeButtonProps) {
  return (
    <button
      type={type}
      className={cn(chromeButtonVariants({ size, border, tone }), className)}
      {...props}
    >
      {showActiveIndicator && (
        <motion.span
          layoutId={CREATION_MODE_INDICATOR_ID}
          className="absolute inset-0 z-0 rounded-full bg-neutral-950"
          transition={CREATION_MODE_INDICATOR_TRANSITION}
        />
      )}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[1] size-full transition-opacity duration-500 ease-in-out",
          chromeOpacity === "active"
            ? "opacity-80 group-hover:opacity-100"
            : "opacity-45 group-hover:opacity-60",
        )}
      >
        <LiquidChrome baseColor={MULTI_CHROME_BASE} speed={2} amplitude={0.1} interactive={false} />
      </div>
      <span className="relative z-10 mix-blend-difference">{children}</span>
    </button>
  );
}
