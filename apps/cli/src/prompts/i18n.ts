import type { Frontend, I18n } from "../types";

import { exitCancelled } from "../utils/errors";
import { isCancel, navigableSelect } from "./navigable";

const PARAGLIDE_FRONTENDS = new Set<Frontend>([
  "next",
  "nuxt",
  "vinext",
  "tanstack-router",
  "tanstack-start",
  "react-router",
  "react-vite",
  "svelte",
  "solid",
  "solid-start",
  "astro",
]);

export async function getI18nChoice(i18n?: I18n, frontend?: Frontend[]) {
  if (i18n !== undefined) return i18n;

  const hasNext = frontend?.includes("next") ?? false;
  const hasParaglideFrontend = frontend?.some((f) => PARAGLIDE_FRONTENDS.has(f)) ?? false;
  const hasIntlayerFrontend =
    frontend?.some((f) =>
      ["next", "vinext", "tanstack-router", "tanstack-start", "react-router", "react-vite"].includes(
        f,
      ),
    ) ?? false;

  const options = [
    ...(hasParaglideFrontend
      ? [
          {
            value: "paraglide" as const,
            label: "Paraglide",
            hint: "Type-safe, compiler-based i18n for modern web frontends",
          },
        ]
      : []),
    {
      value: "i18next" as const,
      label: "i18next",
      hint: "Full-featured i18n framework, works with all frontends",
    },
    ...(hasNext
      ? [
          {
            value: "next-intl" as const,
            label: "next-intl",
            hint: "Lightweight i18n for Next.js with App Router support",
          },
        ]
      : []),
    ...(hasIntlayerFrontend
      ? [
          {
            value: "intlayer" as const,
            label: "Intlayer",
            hint: "Component-level, type-safe i18n for React, Next.js, and Vite",
          },
        ]
      : []),
    {
      value: "none" as const,
      label: "None",
      hint: "No internationalization setup",
    },
  ];

  const response = await navigableSelect<I18n>({
    message: "Select internationalization (i18n) library",
    options,
    initialValue: "none",
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
