import type { StackState } from "@/lib/stack/constant";

/** True for a multi-mode stack whose parts ("role:ecosystem:tool") all share one language. */
function isSingleLanguageGraph(stack: Pick<StackState, "stackMode" | "stackPartSpecs">): boolean {
  if (stack.stackMode !== "multi") return false;
  const languages = new Set(
    stack.stackPartSpecs
      .map((spec) => spec.split(":")[1])
      .filter((language) => language !== undefined && language !== "universal"),
  );
  return languages.size <= 1;
}

/**
 * The stack a preset turns into when applied. Starter tracks are defined as a graph of Stack
 * Parts, so they arrive in multi mode even when every part is one language. Those belong in the
 * solo builder; their flat fields already carry the same picks.
 */
export function resolvePresetStack(presetStack: StackState): StackState {
  return isSingleLanguageGraph(presetStack)
    ? { ...presetStack, stackMode: "solo", stackPartSpecs: [] }
    : presetStack;
}
