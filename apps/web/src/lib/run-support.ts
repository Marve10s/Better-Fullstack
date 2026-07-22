import type { StackState } from "@/lib/stack-defaults";

export type RunSupport =
  | { supported: true }
  | {
      supported: false;
      reason: "native-runtime" | "no-web-frontend" | "unsupported-framework";
    };

// Kept dependency-free so the builder toolbar can gate the Run tab without
// pulling the WebContainer runtime chunk into the main bundle.
export function getStackRunSupport(stack: StackState): RunSupport {
  if (stack.ecosystem !== "typescript" || stack.stackMode !== "solo") {
    return { supported: false, reason: "native-runtime" };
  }

  if (!stack.webFrontend.some((frontend) => frontend !== "none")) {
    return { supported: false, reason: "no-web-frontend" };
  }

  // Redwood scaffolds use their own web/+api/ layout with no dev/dev:web
  // scripts in the root package.json, so the runner has nothing to start.
  if (stack.webFrontend.includes("redwood")) {
    return { supported: false, reason: "unsupported-framework" };
  }

  return { supported: true };
}
