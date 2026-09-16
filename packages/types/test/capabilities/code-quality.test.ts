import { describe, expect, it } from "bun:test";

import {
  getCodeQualitySelectionIssue,
  updateCodeQualitySelection,
} from "@/capabilities/code-quality";
import { createStackPart, parseStackPartSpecs, validateStackParts } from "@/stack/stack-graph";

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
    ["eslint"],
    ["prettier"],
    ["biome", "oxlint"],
    ["eslint", "oxlint"],
    ["ultracite", "biome"],
    ["shadcn-lint"],
    ["eslint", "shadcn-lint"],
    ["biome", "shadcn-lint"],
    ["prettier", "shadcn-lint"],
    ["oxlint", "prettier", "shadcn-lint"],
  ])("rejects incompatible tools %j", (...tools: string[]) => {
    expect(getCodeQualitySelectionIssue(tools)).toBeDefined();
  });

  it.each(["eslint", "prettier"])("rejects incomplete graph profile %s", (toolId) => {
    const specs = ["frontend:typescript:react-vite", `codeQuality:universal:${toolId}`];
    expect(validateStackParts(parseStackPartSpecs(specs, "legacy")).issues).toEqual([]);
    expect(
      validateStackParts(parseStackPartSpecs(specs, "selected")).issues.some((issue) =>
        issue.message.includes("complete ESLint + Prettier"),
      ),
    ).toBe(true);
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
        ...(linter === "eslint" ? ["codeQuality:universal:prettier"] : []),
        "codeQuality:universal:shadcn-lint",
      ]);
      expect(validateStackParts(parts).issues).toEqual([]);
    },
  );

  it.each([false, true])(
    "checks React-owned CSS independently of part order (reversed: %s)",
    (reversed) => {
      for (const reactCss of ["tailwind", "unocss"]) {
        const react = createStackPart({
          role: "frontend",
          ecosystem: "typescript",
          toolId: "react-vite",
        });
        const svelte = createStackPart({
          role: "frontend",
          ecosystem: "typescript",
          toolId: "svelte",
        });
        const parts = [
          react,
          svelte,
          createStackPart({
            role: "css",
            ecosystem: "typescript",
            toolId: reactCss,
            ownerPartId: react.id,
          }),
          createStackPart({
            role: "css",
            ecosystem: "typescript",
            toolId: reactCss === "tailwind" ? "unocss" : "tailwind",
            ownerPartId: svelte.id,
          }),
          ...parseStackPartSpecs([
            "codeQuality:universal:oxlint",
            "codeQuality:universal:shadcn-lint",
          ]),
        ];
        if (reversed) parts.reverse();
        const designIssues = validateStackParts(parts).issues.filter(
          (issue) => issue.toolId === "shadcn-lint",
        );
        expect(designIssues.length > 0).toBe(reactCss !== "tailwind");
      }
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
