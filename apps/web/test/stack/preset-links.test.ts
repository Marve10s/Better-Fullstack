import { describe, expect, it } from "bun:test";

import { buildPresetStack } from "@/lib/stack/preset-stack";
import { getInitialBuilderState } from "@/lib/stack/stack-url-state";

describe("preset links", () => {
  it("opens a retired preset id as the preset that replaced it", () => {
    const retired = getInitialBuilderState({ preset: "solidstart-fullstack" }).stack;
    expect(retired).toEqual(buildPresetStack("future-stack")!);
    expect(retired.webFrontend).toEqual(["solid-start"]);
  });

  it("applies Future Stack option choices", () => {
    const stack = buildPresetStack("future-stack", {
      framework: "tanstack-start",
      effect: "server",
    });
    expect(stack?.webFrontend).toEqual(["tanstack-start-solid"]);
    expect(stack?.backend).toBe("effect");
    expect(stack?.backendLibraries).toBe("effect-full");
  });

  it("keeps a non-TypeScript preset in its own ecosystem", () => {
    expect(buildPresetStack("go-gin")?.ecosystem).toBe("go");
  });
});
