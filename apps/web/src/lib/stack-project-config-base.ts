import {
  stackSelectionToProjectConfig,
  type StackSelectionInput,
} from "@better-fullstack/types/stack-translation";

import { DEFAULT_STACK, type StackState } from "@/lib/stack-defaults";
import { normalizeStackStateSelections } from "@/lib/stack-option-normalization";

function normalizeInputStack(input: Partial<StackState>): StackState {
  return normalizeStackStateSelections({
    ...DEFAULT_STACK,
    ...input,
    webFrontend: input.webFrontend ?? DEFAULT_STACK.webFrontend,
    nativeFrontend: input.nativeFrontend ?? DEFAULT_STACK.nativeFrontend,
    codeQuality: input.codeQuality ?? DEFAULT_STACK.codeQuality,
    documentation: input.documentation ?? DEFAULT_STACK.documentation,
    appPlatforms: input.appPlatforms ?? DEFAULT_STACK.appPlatforms,
    examples: input.examples ?? DEFAULT_STACK.examples,
    aiDocs: input.aiDocs ?? DEFAULT_STACK.aiDocs,
    javaLibraries: input.javaLibraries ?? DEFAULT_STACK.javaLibraries,
    javaTestingLibraries: input.javaTestingLibraries ?? DEFAULT_STACK.javaTestingLibraries,
  });
}

export function stackStateToProjectConfigBase(input: Partial<StackState>) {
  const normalized = normalizeInputStack(input);
  return stackSelectionToProjectConfig(normalized as StackSelectionInput, {
    projectDir: "/virtual",
    relativePath: "./virtual",
    install: false,
  });
}
