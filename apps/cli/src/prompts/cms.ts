import type { Backend, CMS, Frontend } from "../types";
import type { PromptSingleResolution } from "./prompt-contract";

import { isWebFrontend } from "../utils/compatibility-rules";
import { exitCancelled } from "../utils/errors";
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
    value: "directus" as const,
    label: "Directus",
    hint: "Open data platform and headless CMS for SQL databases",
  },
  {
    value: "keystatic" as const,
    label: "Keystatic",
    hint: "Git-backed CMS for Markdown, JSON, and YAML content",
  },
  {
    value: "contentful" as const,
    label: "Contentful",
    hint: "Hosted headless CMS with a typed JavaScript delivery client",
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
  frontends?: Frontend[];
};

export function resolveCMSPrompt(context: CmsPromptContext = {}): PromptSingleResolution<CMS> {
  const hasStandaloneViteFrontend = context.frontends?.some((frontend) =>
    ["vanilla-vite", "vue"].includes(frontend),
  );
  const compatibleOptions = hasStandaloneViteFrontend
    ? CMS_PROMPT_OPTIONS.filter((option) => ["contentful", "none"].includes(option.value))
    : CMS_PROMPT_OPTIONS;

  if (context.backend === "none" || context.backend === "convex") {
    const options = compatibleOptions.filter((option) =>
      ["contentful", "none"].includes(option.value),
    );
    const hasWebFrontend =
      context.frontends?.some((frontend) => frontend !== "none" && isWebFrontend(frontend)) ??
      false;

    if (hasWebFrontend && (context.cms === undefined || context.cms === "contentful")) {
      return context.cms === "contentful"
        ? {
            shouldPrompt: false,
            mode: "single",
            options,
            autoValue: "contentful",
          }
        : {
            shouldPrompt: true,
            mode: "single",
            options,
            initialValue: "none",
          };
    }

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
        options: compatibleOptions,
        autoValue: compatibleOptions.some((option) => option.value === context.cms)
          ? context.cms
          : "none",
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options: compatibleOptions,
        initialValue: "none",
      };
}

export async function getCMSChoice(cms?: CMS, backend?: Backend, frontends?: Frontend[]) {
  const resolution = resolveCMSPrompt({ cms, backend, frontends });
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
