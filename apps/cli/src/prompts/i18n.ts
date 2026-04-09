import type { Frontend, I18n } from "../types";

import { exitCancelled } from "../utils/errors";
import { isCancel, navigableSelect } from "./navigable";

export async function getI18nChoice(i18n?: I18n, frontends?: Frontend[]) {
  if (i18n !== undefined) return i18n;

  const hasNext = frontends?.includes("next");

  const options = [
    {
      value: "i18next" as const,
      label: "i18next",
      hint: "Universal i18n framework for any frontend (22M+ weekly downloads)",
    },
    ...(hasNext
      ? [
          {
            value: "next-intl" as const,
            label: "next-intl",
            hint: "Next.js-specific i18n with App Router support",
          },
        ]
      : []),
    {
      value: "none" as const,
      label: "None",
      hint: "Skip internationalization setup",
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
