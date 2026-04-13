import type { Testing } from "../types";

import { exitCancelled } from "../utils/errors";
import {
  createStaticSinglePromptResolution,
  type PromptOption,
} from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

const TESTING_PROMPT_OPTIONS: PromptOption<Testing>[] = [
  {
    value: "vitest",
    label: "Vitest",
    hint: "Blazing fast Vite-native unit test framework",
  },
  {
    value: "vitest-playwright",
    label: "Vitest + Playwright",
    hint: "Both unit and E2E testing for complete coverage",
  },
  {
    value: "playwright",
    label: "Playwright",
    hint: "End-to-end testing framework by Microsoft",
  },
  {
    value: "jest",
    label: "Jest",
    hint: "Classic testing framework with wide ecosystem",
  },
  {
    value: "cypress",
    label: "Cypress",
    hint: "E2E testing with time travel debugging",
  },
  {
    value: "none",
    label: "None",
    hint: "Skip testing framework setup",
  },
];

export function resolveTestingPrompt(testing?: Testing) {
  return createStaticSinglePromptResolution(TESTING_PROMPT_OPTIONS, "vitest", testing);
}

export async function getTestingChoice(testing?: Testing) {
  const resolution = resolveTestingPrompt(testing);
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<Testing>({
    message: "Select testing framework",
    options: resolution.options,
    initialValue: resolution.initialValue as Testing,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
