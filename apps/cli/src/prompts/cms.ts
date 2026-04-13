import type { Backend, CMS } from "../types";

import { exitCancelled } from "../utils/errors";
import type { PromptSingleResolution } from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

const CMS_PROMPT_OPTIONS = [
  {
    value: "payload" as const,
    label: "Payload",
    hint: "TypeScript-first headless CMS with Next.js integration",
  },
  {
    value: "sanity" as const,
    label: "Sanity",
    hint: "Real-time collaborative CMS with schema-as-code",
  },
  {
    value: "strapi" as const,
    label: "Strapi",
    hint: "Open-source headless CMS with admin panel",
  },
  {
    value: "tinacms" as const,
    label: "TinaCMS",
    hint: "Git-backed headless CMS with visual editing",
  },
  {
    value: "none" as const,
    label: "None",
    hint: "Skip headless CMS setup",
  },
];

type CmsPromptContext = {
  cms?: CMS;
  backend?: Backend;
};

export function resolveCMSPrompt(
  context: CmsPromptContext = {},
): PromptSingleResolution<CMS> {
  if (context.backend === "none" || context.backend === "convex") {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  return context.cms !== undefined
    ? {
        shouldPrompt: false,
        mode: "single",
        options: CMS_PROMPT_OPTIONS,
        autoValue: context.cms,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options: CMS_PROMPT_OPTIONS,
        initialValue: "none",
      };
}

export async function getCMSChoice(cms?: CMS, backend?: Backend) {
  const resolution = resolveCMSPrompt({ cms, backend });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<CMS>({
    message: "Select headless CMS",
    options: resolution.options,
    initialValue: resolution.initialValue as CMS,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
