import {
  type BotProtection,
  type Frontend,
  isBotIdWebFrontend,
  isTurnstileWebFrontend,
} from "../types";
import type { PromptSingleResolution } from "./prompt-contract";

import { exitCancelled } from "../utils/errors";
import { isCancel, navigableSelect } from "./navigable";

const TURNSTILE_OPTION = {
  value: "turnstile" as const,
  label: "Cloudflare Turnstile",
  hint: "Privacy-friendly challenge with server-side verification",
};

const NONE_OPTION = {
  value: "none" as const,
  label: "None",
  hint: "Skip bot protection setup",
};

type BotProtectionPromptContext = {
  botProtection?: BotProtection;
  frontends?: Frontend[];
};

export function resolveBotProtectionPrompt(
  context: BotProtectionPromptContext = {},
): PromptSingleResolution<BotProtection> {
  const frontends = (context.frontends ?? []).filter((frontend) => frontend !== "none");
  const hasWebFrontend = frontends.some((frontend) => !frontend.startsWith("native-"));
  const supportsBotId =
    hasWebFrontend && frontends.every((frontend) => isBotIdWebFrontend(frontend));
  const supportsTurnstile =
    hasWebFrontend && frontends.every((frontend) => isTurnstileWebFrontend(frontend));
  const options = [
    ...(supportsBotId
      ? [
          {
            value: "botid" as const,
            label: "Vercel BotID",
            hint: "Invisible Vercel-native bot detection",
          },
        ]
      : []),
    ...(supportsTurnstile ? [TURNSTILE_OPTION] : []),
    NONE_OPTION,
  ];

  if (!hasWebFrontend) {
    return { shouldPrompt: false, mode: "single", options: [], autoValue: "none" };
  }

  return context.botProtection !== undefined
    ? {
        shouldPrompt: false,
        mode: "single",
        options,
        autoValue: context.botProtection,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options,
        initialValue: "none",
      };
}

export async function getBotProtectionChoice(
  botProtection?: BotProtection,
  frontends?: Frontend[],
) {
  const resolution = resolveBotProtectionPrompt({ botProtection, frontends });
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";

  const response = await navigableSelect<BotProtection>({
    message: "Select bot protection provider",
    options: resolution.options,
    initialValue: resolution.initialValue as BotProtection,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}
