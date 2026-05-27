import type { Backend, BackendUtils } from "../types";
import { exitCancelled } from "../utils/errors";
import type { PromptSingleResolution } from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

const BACKEND_UTILS_PROMPT_OPTIONS = [
  {
    value: "backend-utils" as const,
    label: "Backend Utils",
    hint: "Scaffold production server utilities (asyncHandler, ApiResponse, error middleware)",
  },
  {
    value: "none" as const,
    label: "None",
    hint: "Skip scaffolding backend utility files",
  },
];

type BackendUtilsPromptContext = {
  backendUtils?: BackendUtils;
  backend?: Backend;
};

export function resolveBackendUtilsPrompt(
  context: BackendUtilsPromptContext = {},
): PromptSingleResolution<BackendUtils> {
  const incompatibleBackends = ["none", "convex", "adonisjs", "nitro", "encore"];
  if (context.backend && incompatibleBackends.includes(context.backend)) {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  return context.backendUtils !== undefined
    ? {
        shouldPrompt: false,
        mode: "single",
        options: BACKEND_UTILS_PROMPT_OPTIONS,
        autoValue: context.backendUtils,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options: BACKEND_UTILS_PROMPT_OPTIONS,
        initialValue: "none",
      };
}

export async function getBackendUtilsChoice(backendUtils?: BackendUtils, backend?: Backend) {
  const resolution = resolveBackendUtilsPrompt({ backendUtils, backend });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<BackendUtils>({
    message: "Select backend utilities bundle",
    options: resolution.options,
    initialValue: resolution.initialValue as BackendUtils,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
