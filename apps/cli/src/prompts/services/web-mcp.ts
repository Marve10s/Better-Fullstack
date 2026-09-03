import type { PromptSingleResolution } from "@/prompts/core/prompt-contract";
import type { Frontend, WebMcp } from "@/types";

import { exitCancelled } from "@/presentation/errors";
import { isCancel, navigableSelect } from "@/prompts/core/navigable";

type WebMcpPromptContext = {
  webMcp?: WebMcp;
  frontends?: Frontend[];
};

export function resolveWebMcpPrompt(
  context: WebMcpPromptContext = {},
): PromptSingleResolution<WebMcp> {
  if (context.webMcp !== undefined) {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: context.webMcp,
    };
  }

  const hasWebFrontend = (context.frontends ?? []).some(
    (frontend) => frontend !== "none" && !frontend.startsWith("native-"),
  );
  if (!hasWebFrontend) {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  return {
    shouldPrompt: true,
    mode: "single",
    options: [
      {
        value: "enabled",
        label: "Enabled (Experimental)",
        hint: "Register browser-native tools for in-browser AI agents",
      },
      { value: "none", label: "None", hint: "Skip WebMCP setup" },
    ],
    initialValue: "none",
  };
}

export async function getWebMcpChoice(webMcp?: WebMcp, frontends?: Frontend[]) {
  const resolution = resolveWebMcpPrompt({ webMcp, frontends });
  if (!resolution.shouldPrompt) return resolution.autoValue ?? "none";

  const response = await navigableSelect<WebMcp>({
    message: "Enable experimental WebMCP tools?",
    options: resolution.options,
    initialValue: resolution.initialValue as WebMcp,
  });
  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}
