import type { ProjectConfig } from "@better-fullstack/types/types";

import { ProjectConfigSchema } from "@better-fullstack/types/schemas";
import {
  createCrystalStackSelection,
  normalizeStackSelection as normalizeStackStateSelections,
  stackSelectionToProjectConfig,
  type StackSelectionInput,
} from "@better-fullstack/types/stack-translation";

import { DEFAULT_STACK, type StackState } from "@/lib/stack/stack-defaults";

function normalizeInputStack(input: Partial<StackState>): StackState {
  const defaults = input.ecosystem === "crystal" ? createCrystalStackSelection() : DEFAULT_STACK;
  return normalizeStackStateSelections({
    ...defaults,
    ...input,
    webFrontend: input.webFrontend ?? defaults.webFrontend,
    nativeFrontend: input.nativeFrontend ?? defaults.nativeFrontend,
    codeQuality: input.codeQuality ?? defaults.codeQuality,
    documentation: input.documentation ?? defaults.documentation,
    appPlatforms: input.appPlatforms ?? defaults.appPlatforms,
    examples: input.examples ?? defaults.examples,
    aiDocs: input.aiDocs ?? defaults.aiDocs,
    javaLibraries: input.javaLibraries ?? defaults.javaLibraries,
    javaTestingLibraries: input.javaTestingLibraries ?? defaults.javaTestingLibraries,
    mobileLibraries: input.mobileLibraries ?? defaults.mobileLibraries,
    kotlinMobileLibraries:
      input.kotlinMobileLibraries ?? defaults.kotlinMobileLibraries,
    dotnetLibraries: input.dotnetLibraries ?? defaults.dotnetLibraries,
  });
}

export function stackStateToProjectConfig(input: Partial<StackState>): ProjectConfig {
  const normalized = normalizeInputStack(input);
  return ProjectConfigSchema.parse(
    stackSelectionToProjectConfig(normalized as StackSelectionInput, {
      projectDir: "/virtual",
      relativePath: "./virtual",
      install: false,
    }),
  );
}
