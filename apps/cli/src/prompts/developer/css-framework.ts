import type { CSSFramework, Frontend, UILibrary } from "@/types";

import { getCompatibleCSSFrameworks } from "@/config/compatibility-rules";
import { exitCancelled } from "@/presentation/errors";
import type { PromptSingleResolution } from "@/prompts/core/prompt-contract";
import { isCancel, navigableSelect } from "@/prompts/core/navigable";

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
  "styled-components": {
    label: "styled-components",
    hint: "CSS-in-JS with tagged template literals for React",
  },
  none: {
    label: "None",
    hint: "Plain CSS without preprocessors",
  },
};

type CSSFrameworkPromptContext = {
  cssFramework?: CSSFramework;
  uiLibrary?: UILibrary;
  frontends?: Frontend[];
};

export function resolveCSSFrameworkPrompt(
  context: CSSFrameworkPromptContext = {},
): PromptSingleResolution<CSSFramework> {
  const compatibleFrameworks = getCompatibleCSSFrameworks(context.uiLibrary, context.frontends);

  if (context.cssFramework !== undefined) {
    return {
      shouldPrompt: false,
      mode: "single",
      options: compatibleFrameworks.map((fw) => ({
        value: fw,
        label: CSS_FRAMEWORK_OPTIONS[fw].label,
        hint: CSS_FRAMEWORK_OPTIONS[fw].hint,
      })),
      autoValue: context.cssFramework,
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
  frontends?: Frontend[],
): Promise<CSSFramework> {
  const resolution = resolveCSSFrameworkPrompt({ cssFramework, uiLibrary, frontends });
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
