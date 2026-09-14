import { generateVirtualProject, EMBEDDED_TEMPLATES } from "@better-fullstack/template-generator";
import { analyzeStackCompatibility, updateCodeQualitySelection } from "@better-fullstack/types";
import {
  createStackSelectionSearchParams,
  parseStackSelectionFromSearch,
  patchGraphScopedSelections,
  projectGraphScopedSelections,
} from "@better-fullstack/types/stack-translation";
import { describe, expect, it } from "bun:test";

import { getDisabledReason } from "@/components/stack-builder/utils";
import { stackStateToProjectConfig } from "@/lib/builder/preview-config";
import { DEFAULT_STACK } from "@/lib/stack/stack-defaults";
import { generateStackCommand } from "@/lib/stack/stack-utils";

describe("shadcn/lint builder", () => {
  it.each([
    ["eslint", ["eslint", "prettier"]],
    ["prettier", ["prettier", "eslint"]],
    ["eslint,biome", ["eslint", "prettier"]],
    ["biome,oxlint", ["biome"]],
    ["eslint,prettier,oxlint,shadcn-lint", ["eslint", "prettier", "shadcn-lint"]],
    ["oxlint,biome,shadcn-lint", ["oxlint", "shadcn-lint"]],
  ] as const)("normalizes shared Code Quality selections: %s", async (cq, expected) => {
    const restored = parseStackSelectionFromSearch({ cq, css: "tailwind" });
    const analysis = analyzeStackCompatibility(restored);
    expect(analysis.adjustedStack?.codeQuality).toEqual([...expected]);
    expect(analysis.changes.some((change) => change.category === "codeQuality")).toBe(true);
    const config = stackStateToProjectConfig(restored);
    expect(config.addons.filter((addon) => addon !== "turborepo")).toEqual([...expected]);
    const generated = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });
    expect(generated.success, generated.error).toBe(true);
  });

  it("removes the supplemental check after changing to an unsupported frontend", () => {
    const analysis = analyzeStackCompatibility({
      ...DEFAULT_STACK,
      webFrontend: ["svelte"],
      codeQuality: ["oxlint", "shadcn-lint"],
    });
    expect(analysis.adjustedStack?.codeQuality).toEqual(["oxlint"]);
    expect(analysis.changes.some((change) => change.message.includes("Removed shadcn/lint"))).toBe(
      true,
    );
  });
  it("requires a base linter and permits replacing it without a third selection", () => {
    const stack = {
      ...DEFAULT_STACK,
      webFrontend: ["react-vite"],
      cssFramework: "tailwind",
      codeQuality: [] as string[],
    };
    expect(getDisabledReason(stack, "codeQualityProfile", "shadcn-lint")).toContain(
      "ESLint + Prettier or Oxlint + Oxfmt",
    );
    stack.codeQuality = ["oxlint"];
    expect(getDisabledReason(stack, "codeQualityProfile", "shadcn-lint")).toBeNull();
    stack.codeQuality.push("shadcn-lint");
    expect(getDisabledReason(stack, "codeQualityProfile", "eslint-prettier")).toBeNull();
    expect(getDisabledReason(stack, "codeQualityProfile", "biome")).toBeNull();
    expect(
      getDisabledReason(
        { ...stack, cssFramework: "none", codeQuality: ["oxlint"] },
        "codeQualityProfile",
        "shadcn-lint",
      ),
    ).toContain("Tailwind");
  });

  it.each(["solo", "multi"] as const)(
    "retains the pairing through %s URL, CLI and preview generation",
    async (stackMode) => {
      const stack = {
        ...DEFAULT_STACK,
        stackMode,
        webFrontend: ["react-vite"],
        backend: "none",
        database: "none",
        orm: "none",
        api: "none",
        auth: "none",
        cssFramework: "tailwind",
        codeQuality: ["oxlint", "shadcn-lint"],
        stackPartSpecs:
          stackMode === "multi"
            ? [
                "frontend:typescript:react-vite",
                "frontend.css:typescript:tailwind",
                "backend:go:gin",
                "codeQuality:universal:oxlint",
                "codeQuality:universal:shadcn-lint",
              ]
            : [],
      };
      const search = createStackSelectionSearchParams(stack);
      const restored = parseStackSelectionFromSearch(Object.fromEntries(search));
      const command = generateStackCommand(restored);
      expect(command).toContain("codeQuality:universal:shadcn-lint");
      expect(command).toContain("codeQuality:universal:oxlint");
      const config = stackStateToProjectConfig(restored);
      expect(config.addons).toContain("shadcn-lint");
      const generated = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });
      expect(generated.success, generated.error).toBe(true);
      expect(JSON.stringify(generated.tree)).toContain("@shadcn/lint");

      if (stackMode === "multi") {
        const projected = projectGraphScopedSelections(restored);
        const update = patchGraphScopedSelections(projected, {
          codeQuality: updateCodeQualitySelection(projected.codeQuality, ["eslint", "prettier"]),
        });
        expect(update.stackPartSpecs).toContain("backend:go:gin");
        expect(update.stackPartSpecs).toContain("codeQuality:universal:shadcn-lint");
        expect(update.stackPartSpecs).toContain("codeQuality:universal:eslint");
        expect(update.stackPartSpecs).not.toContain("codeQuality:universal:oxlint");
      }
    },
  );
});
