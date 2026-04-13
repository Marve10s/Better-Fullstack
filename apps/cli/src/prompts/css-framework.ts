import type { CSSFramework, UILibrary } from "../types";

import { getCompatibleCSSFrameworks } from "../utils/compatibility-rules";
import { exitCancelled } from "../utils/errors";
import type { PromptSingleResolution } from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

const CSS_FRAMEWORK_OPTIONS: Record<CSSFramework, { label: string; hint: string }> = {
  tailwind: {
    label: "Tailwind CSS",
    hint: "Utility-first CSS framework",
  },
  scss: {
    label: "SCSS/Sass",
    hint: "CSS preprocessor with advanced features",
  },
  less: {
    label: "Less",
    hint: "Backwards-compatible CSS extension",
  },
  "postcss-only": {
    label: "PostCSS Only",
    hint: "Minimal setup with just PostCSS",
  },
  none: {
    label: "None",
    hint: "Plain CSS without preprocessors",
  },
};

type CSSFrameworkPromptContext = {
  cssFramework?: CSSFramework;
  uiLibrary?: UILibrary;
};

export function resolveCSSFrameworkPrompt(
  context: CSSFrameworkPromptContext = {},
): PromptSingleResolution<CSSFramework> {
  const compatibleFrameworks = getCompatibleCSSFrameworks(context.uiLibrary);

  if (context.cssFramework !== undefined) {
    return {
      shouldPrompt: false,
      mode: "single",
      options: compatibleFrameworks.map((fw) => ({
        value: fw,
        label: CSS_FRAMEWORK_OPTIONS[fw].label,
        hint: CSS_FRAMEWORK_OPTIONS[fw].hint,
      })),
      autoValue: compatibleFrameworks.includes(context.cssFramework)
        ? context.cssFramework
        : compatibleFrameworks[0],
    };
  }

  return {
    shouldPrompt: true,
    mode: "single",
    options: compatibleFrameworks.map((fw) => ({
      value: fw,
      label: CSS_FRAMEWORK_OPTIONS[fw].label,
      hint: CSS_FRAMEWORK_OPTIONS[fw].hint,
    })),
    initialValue: compatibleFrameworks.includes("tailwind")
      ? "tailwind"
      : compatibleFrameworks[0],
  };
}

export async function getCSSFrameworkChoice(
  cssFramework?: CSSFramework,
  uiLibrary?: UILibrary,
): Promise<CSSFramework> {
  const resolution = resolveCSSFrameworkPrompt({ cssFramework, uiLibrary });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const selected = await navigableSelect<CSSFramework>({
    message: "Select CSS framework",
    options: resolution.options,
    initialValue: resolution.initialValue as CSSFramework,
  });

  if (isCancel(selected)) return exitCancelled("Operation cancelled");

  return selected;
}
