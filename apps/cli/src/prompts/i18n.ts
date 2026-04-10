import type { Frontend, I18n } from "../types";

import { exitCancelled } from "../utils/errors";
import { isCancel, navigableSelect } from "./navigable";

export async function getI18nChoice(i18n?: I18n, frontend?: Frontend[]) {
  if (i18n !== undefined) return i18n;

  const hasNext = frontend?.includes("next") ?? false;

  const options = [
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
