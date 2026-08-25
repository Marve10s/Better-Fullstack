import type { Analytics, Frontend } from "@/types";
import type { PromptSingleResolution } from "@/prompts/core/prompt-contract";

import { supportsAnalyticsFrontends } from "@/types";
import { exitCancelled } from "@/presentation/errors";
import { isCancel, navigableSelect } from "@/prompts/core/navigable";

const ANALYTICS_PROMPT_OPTIONS = [
  {
    value: "vercel-analytics" as const,
    label: "Vercel Analytics",
    hint: "First-party web analytics for Vercel deployments",
  },
  {
    value: "plausible" as const,
    label: "Plausible",
    hint: "Lightweight, privacy-focused analytics",
  },
  { value: "umami" as const, label: "Umami", hint: "Open-source analytics with self-hosting" },
  { value: "posthog" as const, label: "PostHog", hint: "Product analytics and session replay" },
  { value: "ga4" as const, label: "Google Analytics 4", hint: "Google web analytics" },
  { value: "none" as const, label: "None", hint: "Skip analytics setup" },
];

type AnalyticsPromptContext = {
  analytics?: Analytics;
  frontend?: Frontend[];
};

export function resolveAnalyticsPrompt(
  context: AnalyticsPromptContext = {},
): PromptSingleResolution<Analytics> {
  const webFrontends = (context.frontend ?? []).filter(
    (frontend) => frontend !== "none" && !frontend.startsWith("native-"),
  );
  if (webFrontends.length === 0) {
    return { shouldPrompt: false, mode: "single", options: [], autoValue: "none" };
  }

  const options = ANALYTICS_PROMPT_OPTIONS.filter(
    (option) =>
      option.value === "none" || supportsAnalyticsFrontends(option.value, webFrontends),
  );

  return context.analytics !== undefined
    ? {
        shouldPrompt: false,
        mode: "single",
        options,
        autoValue: context.analytics,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options,
        initialValue: "none",
      };
}

export async function getAnalyticsChoice(analytics?: Analytics, frontend?: Frontend[]) {
  const resolution = resolveAnalyticsPrompt({ analytics, frontend });
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";

  const response = await navigableSelect<Analytics>({
    message: "Select a web analytics provider",
    options: resolution.options,
    initialValue: resolution.initialValue as Analytics,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}
