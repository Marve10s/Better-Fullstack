import { describe, expect, it } from "bun:test";

import { getVisibleOptions } from "@/components/stack-builder/utils";
import { DEFAULT_STACK, TECH_OPTIONS, type StackState } from "@/lib/stack/constant";
import { OPTION_DISPLAY_ORDER } from "@/lib/stack/option-order";

const uiLibraryIds = (stack: Partial<StackState>) =>
  getVisibleOptions({ ...DEFAULT_STACK, ...stack }, "uiLibrary", TECH_OPTIONS.uiLibrary).map(
    (option) => option.id,
  );

describe("UI library options", () => {
  it("hides shadcn-svelte without a Svelte frontend", () => {
    expect(uiLibraryIds({ webFrontend: ["tanstack-router"] })).not.toContain("shadcn-svelte");
  });

  it("shows shadcn-svelte for SvelteKit", () => {
    expect(uiLibraryIds({ webFrontend: ["svelte"] })).toContain("shadcn-svelte");
  });

  it("shows shadcn-svelte for Astro with the Svelte integration", () => {
    expect(uiLibraryIds({ webFrontend: ["astro"], astroIntegration: "svelte" })).toContain(
      "shadcn-svelte",
    );
  });
});

describe("option display order", () => {
  it("only ranks options that exist in their category", () => {
    for (const [category, order] of Object.entries(OPTION_DISPLAY_ORDER)) {
      const ids = new Set(
        (TECH_OPTIONS[category as keyof typeof TECH_OPTIONS] ?? []).map((option) => option.id),
      );
      expect(order.filter((id) => !ids.has(id))).toEqual([]);
    }
  });

  it("shows the default first, then the most popular, and the opt-out last", () => {
    const ids = getVisibleOptions(DEFAULT_STACK, "webFrontend", TECH_OPTIONS.webFrontend).map(
      (option) => option.id,
    );
    expect(ids.slice(0, 3)).toEqual(["tanstack-router", "react-vite", "next"]);
    expect(ids.at(-1)).toBe("none");
  });

  it("keeps a None default last", () => {
    const ids = getVisibleOptions(DEFAULT_STACK, "payments", TECH_OPTIONS.payments).map(
      (option) => option.id,
    );
    expect(ids[0]).toBe("stripe");
    expect(ids.at(-1)).toBe("none");
  });
});
