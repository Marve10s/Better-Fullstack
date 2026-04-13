import type { API, AstroIntegration, Backend, Frontend } from "../types";

import { allowedApisForFrontends } from "../utils/compatibility-rules";
import { exitCancelled } from "../utils/errors";
import type { PromptOption, PromptSingleResolution } from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

const API_PROMPT_OPTION_MAP: Record<API, PromptOption<API>> = {
  trpc: {
    value: "trpc",
    label: "tRPC",
    hint: "End-to-end typesafe APIs made easy",
  },
  orpc: {
    value: "orpc",
    label: "oRPC",
    hint: "End-to-end type-safe APIs that adhere to OpenAPI standards",
  },
  "ts-rest": {
    value: "ts-rest",
    label: "ts-rest",
    hint: "RPC-like client, contract, and server implementation for REST APIs",
  },
  garph: {
    value: "garph",
    label: "Garph",
    hint: "Fullstack GraphQL framework with end-to-end type safety",
  },
  "graphql-yoga": {
    value: "graphql-yoga",
    label: "GraphQL Yoga",
    hint: "Batteries-included GraphQL server with Pothos schema builder",
  },
  none: {
    value: "none",
    label: "None",
    hint: "No API layer (e.g. for full-stack frameworks like Next.js with Route Handlers)",
  },
};

type ApiPromptContext = {
  api?: API;
  frontend?: Frontend[];
  backend?: Backend;
  astroIntegration?: AstroIntegration;
};

export function resolveApiPrompt(context: ApiPromptContext = {}): PromptSingleResolution<API> {
  if (context.backend === "convex" || context.backend === "none") {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  const allowedOptions = allowedApisForFrontends(
    context.frontend ?? [],
    context.astroIntegration,
  ) as API[];
  const options = allowedOptions.map((value) => API_PROMPT_OPTION_MAP[value]);

  if (context.api !== undefined) {
    return {
      shouldPrompt: false,
      mode: "single",
      options,
      autoValue: allowedOptions.includes(context.api) ? context.api : (allowedOptions[0] ?? "none"),
    };
  }

  return {
    shouldPrompt: true,
    mode: "single",
    options,
    initialValue: allowedOptions[0] ?? "none",
  };
}

export async function getApiChoice(
  api?: API | undefined,
  frontend?: Frontend[],
  backend?: Backend,
  astroIntegration?: AstroIntegration,
) {
  const resolution = resolveApiPrompt({
    api,
    frontend,
    backend,
    astroIntegration,
  });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const apiType = await navigableSelect<API>({
    message: "Select API type",
    options: resolution.options,
    initialValue: resolution.initialValue as API,
  });

  if (isCancel(apiType)) return exitCancelled("Operation cancelled");

  return apiType;
}
