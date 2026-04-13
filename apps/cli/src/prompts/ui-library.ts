import type { AstroIntegration, Frontend, UILibrary } from "../types";

import { DEFAULT_UI_LIBRARY_BY_FRONTEND } from "../constants";
import { getCompatibleUILibraries, splitFrontends } from "../utils/compatibility-rules";
import { exitCancelled } from "../utils/errors";
import type { PromptSingleResolution } from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

const UI_LIBRARY_OPTIONS: Record<UILibrary, { label: string; hint: string }> = {
  "shadcn-ui": {
    label: "shadcn/ui",
    hint: "Beautifully designed components built with Radix UI and Tailwind CSS",
  },
  daisyui: {
    label: "daisyUI",
    hint: "Tailwind CSS component library with semantic class names",
  },
  "radix-ui": {
    label: "Radix UI",
    hint: "Unstyled, accessible UI primitives for React",
  },
  "headless-ui": {
    label: "Headless UI",
    hint: "Unstyled, accessible UI components from Tailwind Labs",
  },
  "park-ui": {
    label: "Park UI",
    hint: "Beautifully designed components built on Ark UI",
  },
  "chakra-ui": {
    label: "Chakra UI",
    hint: "Simple, modular and accessible component library",
  },
  nextui: {
    label: "NextUI",
    hint: "Beautiful, fast and modern React UI library",
  },
  mantine: {
    label: "Mantine",
    hint: "Full-featured React component library with 120+ components",
  },
  "base-ui": {
    label: "Base UI",
    hint: "Unstyled, accessible components from MUI team (Radix successor)",
  },
  "ark-ui": {
    label: "Ark UI",
    hint: "Headless, accessible UI components for React, Vue, Solid, and Svelte",
  },
  "react-aria": {
    label: "React Aria",
    hint: "Adobe's accessible, unstyled UI components for React",
  },
  none: {
    label: "None",
    hint: "No UI component library",
  },
};

type UILibraryPromptContext = {
  uiLibrary?: UILibrary;
  frontends?: Frontend[];
  astroIntegration?: AstroIntegration;
};

export function resolveUILibraryPrompt(
  context: UILibraryPromptContext = {},
): PromptSingleResolution<UILibrary> {
  const { web } = splitFrontends(context.frontends);
  if (web.length === 0) {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  const compatibleLibraries = getCompatibleUILibraries(
    context.frontends,
    context.astroIntegration,
  );

  if (context.uiLibrary !== undefined) {
    return {
      shouldPrompt: false,
      mode: "single",
      options: compatibleLibraries.map((lib) => ({
        value: lib,
        label: UI_LIBRARY_OPTIONS[lib].label,
        hint: UI_LIBRARY_OPTIONS[lib].hint,
      })),
      autoValue: compatibleLibraries.includes(context.uiLibrary)
        ? context.uiLibrary
        : compatibleLibraries[0],
    };
  }

  const webFrontend = web[0];
  const defaultLib = DEFAULT_UI_LIBRARY_BY_FRONTEND[webFrontend];

  return {
    shouldPrompt: true,
    mode: "single",
    options: compatibleLibraries.map((lib) => ({
      value: lib,
      label: UI_LIBRARY_OPTIONS[lib].label,
      hint: UI_LIBRARY_OPTIONS[lib].hint,
    })),
    initialValue: compatibleLibraries.includes(defaultLib)
      ? defaultLib
      : compatibleLibraries[0],
  };
}

export async function getUILibraryChoice(
  uiLibrary?: UILibrary,
  frontends?: Frontend[],
  astroIntegration?: AstroIntegration,
): Promise<UILibrary> {
  const resolution = resolveUILibraryPrompt({ uiLibrary, frontends, astroIntegration });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const selected = await navigableSelect<UILibrary>({
    message: "Select UI component library",
    options: resolution.options,
    initialValue: resolution.initialValue as UILibrary,
  });

  if (isCancel(selected)) return exitCancelled("Operation cancelled");

  return selected;
}
