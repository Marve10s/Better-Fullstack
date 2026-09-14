import { describe, expect, it } from "bun:test";

import {
  getCodeQualitySelectionIssue,
  updateCodeQualitySelection,
} from "@/capabilities/code-quality";
import { parseStackPartSpecs, validateStackParts } from "@/stack/stack-graph";

describe("Code Quality pairing", () => {
  it("preserves legacy profiles while rejecting newly selected combinations", () => {
    const specs = [
      "frontend:typescript:react-vite",
      "codeQuality:universal:biome",
      "codeQuality:universal:ultracite",
    ];
    expect(validateStackParts(parseStackPartSpecs(specs, "legacy")).issues).toEqual([]);
    expect(
      validateStackParts(parseStackPartSpecs(specs, "selected")).issues.length,
    ).toBeGreaterThan(0);
  });
  it.each([
    ["biome", "oxlint"],
    ["eslint", "oxlint"],
    ["ultracite", "biome"],
    ["shadcn-lint"],
    ["biome", "shadcn-lint"],
    ["prettier", "shadcn-lint"],
    ["oxlint", "prettier", "shadcn-lint"],
  ])("rejects incompatible tools %j", (...tools: string[]) => {
    expect(getCodeQualitySelectionIssue(tools)).toBeDefined();
  });

  it("keeps one base profile while toggling the supplemental check", () => {
    let tools = updateCodeQualitySelection(["knip", "oxlint"], ["shadcn-lint"]);
    expect(tools).toEqual(["knip", "oxlint", "shadcn-lint"]);
    tools = updateCodeQualitySelection(tools, ["eslint", "prettier"]);
    expect(tools).toEqual(["knip", "eslint", "prettier", "shadcn-lint"]);
    expect(getCodeQualitySelectionIssue(tools)).toBeUndefined();
    expect(updateCodeQualitySelection(tools, ["shadcn-lint"])).toEqual([
      "knip",
      "eslint",
      "prettier",
    ]);
    expect(updateCodeQualitySelection(tools, ["biome"])).toEqual(["knip", "biome"]);
    expect(updateCodeQualitySelection(tools, [])).toEqual(["knip"]);
  });

  it.each(["oxlint", "eslint"])(
    "validates %s with a Go backend and its own quality tool",
    (linter) => {
      const parts = parseStackPartSpecs([
        "frontend:typescript:react-vite",
        "frontend.css:typescript:tailwind",
        "backend:go:gin",
        "backend.codeQuality:go:golangci-lint",
        `codeQuality:universal:${linter}`,
        "codeQuality:universal:shadcn-lint",
      ]);
      expect(validateStackParts(parts).issues).toEqual([]);
    },
  );

  it.each([
    ["frontend:typescript:svelte", "frontend.css:typescript:tailwind"],
    ["frontend:typescript:next", "frontend.css:typescript:unocss"],
    ["backend:go:gin"],
  ])("rejects unsupported frontend/CSS %j", (...application: string[]) => {
    const parts = parseStackPartSpecs([
      ...application,
      "codeQuality:universal:oxlint",
      "codeQuality:universal:shadcn-lint",
    ]);
    expect(validateStackParts(parts).issues.some((issue) => issue.toolId === "shadcn-lint")).toBe(
      true,
    );
  });
});
