import type { Animation, Frontend } from "../types";

import { splitFrontends } from "../utils/compatibility-rules";
import { exitCancelled } from "../utils/errors";
import type { PromptSingleResolution } from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

type AnimationPromptContext = {
  animation?: Animation;
  frontends?: Frontend[];
};

export function resolveAnimationPrompt(
  context: AnimationPromptContext = {},
): PromptSingleResolution<Animation> {
  if (context.animation !== undefined) {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: context.animation,
    };
  }

  const { web } = splitFrontends(context.frontends);
  if (web.length === 0) {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  const isReact = web.some((f) =>
    ["tanstack-router", "react-router", "react-vite", "tanstack-start", "next", "vinext", "redwood"].includes(f),
  );
  const isFresh = web.includes("fresh");
  const options: Array<{ value: Animation; label: string; hint: string }> = [];

  if (isReact) {
    options.push(
      {
        value: "framer-motion" as const,
        label: "Framer Motion",
        hint: "Production-ready declarative animations for React",
      },
      {
        value: "react-spring" as const,
        label: "React Spring",
        hint: "Physics-based animations for fluid interactions",
      },
    );
  }

  options.push(
    {
      value: "gsap" as const,
      label: "GSAP",
      hint: "Professional-grade animation engine for the web",
    },
    {
      value: "auto-animate" as const,
      label: "Auto Animate",
      hint: "Zero-config, drop-in animation utility",
    },
  );

  if (!isFresh) {
    options.push({
      value: "lottie" as const,
      label: "Lottie",
      hint: "Render After Effects animations natively",
    });
  }

  options.push({
    value: "none" as const,
    label: "None",
    hint: "Skip animation library setup",
  });

  return {
    shouldPrompt: true,
    mode: "single",
    options,
    initialValue: "none",
  };
}

export async function getAnimationChoice(animation?: Animation, frontends?: Frontend[]) {
  const resolution = resolveAnimationPrompt({ animation, frontends });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<Animation>({
    message: "Select animation library",
    options: resolution.options,
    initialValue: resolution.initialValue as Animation,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
