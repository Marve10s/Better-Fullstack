import type { StackState } from "@/lib/stack-defaults";

export type RunSupport =
  | { supported: true }
  | { supported: false; reason: "native-runtime" | "no-web-frontend" };

// Kept dependency-free so the builder toolbar can gate the Run tab without
// pulling the WebContainer runtime chunk into the main bundle.
export function getStackRunSupport(stack: StackState): RunSupport {
  if (stack.ecosystem !== "typescript" || stack.stackMode !== "solo") {
    return { supported: false, reason: "native-runtime" };
  }

  if (!stack.webFrontend.some((frontend) => frontend !== "none")) {
    return { supported: false, reason: "no-web-frontend" };
  }

  return { supported: true };
}
