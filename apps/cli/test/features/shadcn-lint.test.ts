import { cliInputToProjectConfigPartial, SHADCN_LINT_FRONTENDS } from "@better-fullstack/types";
import { expectSuccess, runTRPCTest } from "@test/support/test-utils";
import { readVirtualFileContent } from "@test/support/virtual-tree-utils";
import { describe, expect, it } from "bun:test";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { validateConfigForProgrammaticUse } from "@/config/config-validation";
import { displayConfig } from "@/config/display-config";
import { create, createVirtual } from "@/index";
import { runWithContext } from "@/presentation/context";
import { getCompatibleSelections } from "@/prompts/developer/addons";

describe("shadcn/lint generation", () => {
  it.each(["oxlint", "eslint"] as const)(
    "preserves %s design rules through on-disk creation and addon setup",
    async (linter) => {
      const result = await runTRPCTest({
        projectName: `design-lint-disk-${linter}`,
        frontend: ["react-vite"],
        backend: "none",
        runtime: "none",
        api: "none",
        database: "none",
        orm: "none",
        auth: "none",
        cssFramework: "tailwind",
        uiLibrary: "shadcn-ui",
        shadcnBase: "radix",
        shadcnColorTheme: "neutral",
        shadcnFont: "geist",
        addons: [linter, ...(linter === "eslint" ? ["prettier" as const] : []), "shadcn-lint"],
        install: false,
        git: false,
      });
      expectSuccess(result);
      if (!result.projectDir) throw new Error("Creation did not return a project directory");
      const config = await readFile(
        join(result.projectDir, linter === "oxlint" ? ".oxlintrc.json" : "eslint.config.mjs"),
        "utf8",
      );
      expect(config).toContain("@shadcn/lint");
      expect(config).toContain("shadcn/no-restyle");
      expect(config).toContain("**/components/ui/**");
      const packageJson = await readFile(join(result.projectDir, "package.json"), "utf8");
      expect(packageJson).toContain('"@shadcn/lint": "0.1.0"');
      expect(packageJson).toContain(
        `"lint:design": "${linter === "oxlint" ? "oxlint" : "eslint ."}"`,
      );
      expect(await readFile(join(result.projectDir, "DESIGN.md"), "utf8")).toContain("Button");
      expect(await readFile(join(result.projectDir, "bts.jsonc"), "utf8")).toContain("shadcn-lint");
    },
    60_000,
  );

  it("rejects the incomplete ESLint profile through direct generation", async () => {
    const result = await createVirtual({
      frontend: ["react-vite"],
      backend: "none",
      api: "none",
      cssFramework: "tailwind",
      addons: ["eslint", "shadcn-lint"],
    });
    expect(result.success).toBe(false);
    expect(result.error).toContain("ESLint + Prettier");
  });

  it("replaces a template's base profile when applying a tooling overlay", async () => {
    const result = await create("design-template-overlay", {
      template: "t3",
      part: ["codeQuality:universal:oxlint", "codeQuality:universal:shadcn-lint"],
      dryRun: true,
      install: false,
      git: false,
      aiDocs: ["none"],
    });
    expect(result.success).toBe(true);
    expect(result.projectConfig.addons).toContain("oxlint");
    expect(result.projectConfig.addons).toContain("shadcn-lint");
    expect(result.projectConfig.addons).not.toContain("biome");
  });

  it("displays the base profile once alongside the supplemental check", () => {
    const summary = displayConfig({ addons: ["eslint", "prettier", "shadcn-lint"] });
    expect(summary.match(/ESLint \+ Prettier/g)).toHaveLength(1);
    expect(summary).toContain("shadcn/lint");
  });

  for (const linter of ["oxlint", "eslint"] as const) {
    it.each(SHADCN_LINT_FRONTENDS)(
      `${linter} config, dependency and command for %s`,
      async (frontend) => {
        const result = await createVirtual({
          projectName: "design-app",
          frontend: [frontend],
          backend: "none",
          api: "none",
          database: "none",
          orm: "none",
          auth: "none",
          cssFramework: "tailwind",
          uiLibrary: "shadcn-ui",
          addons: [linter, ...(linter === "eslint" ? ["prettier" as const] : []), "shadcn-lint"],
        });
        expect(result.success, result.error).toBe(true);
        if (!result.tree) throw new Error(result.error);
        const root = result.tree.root;
        const file = (path: string) => readVirtualFileContent(root, path);
        expect(file("package.json")).toContain('"@shadcn/lint": "0.1.0"');
        expect(file("package.json")).toContain('"lint:design"');
        const config = file(linter === "oxlint" ? ".oxlintrc.json" : "eslint.config.mjs");
        expect(config).toContain("@shadcn/lint");
        expect(config).toContain("shadcn/no-restyle");
        expect(config).toContain("**/components/ui/**");
        expect(file("DESIGN.md")).toContain("Button");
      },
    );
  }

  it.each(["backend:go:gin", "backend:rust:axum", "backend:python:fastapi"])(
    "retains the frontend checks with %s",
    async (backend) => {
      const graph = cliInputToProjectConfigPartial({
        part: [
          "frontend:typescript:react-vite",
          "frontend.css:typescript:tailwind",
          backend,
          "codeQuality:universal:oxlint",
          "codeQuality:universal:shadcn-lint",
        ],
      });
      const result = await createVirtual({ projectName: "mixed-design", ...graph });
      expect(result.success, result.error).toBe(true);
      if (!result.tree) throw new Error(result.error);
      expect(readVirtualFileContent(result.tree.root, ".oxlintrc.json")).toContain("@shadcn/lint");
      expect(readVirtualFileContent(result.tree.root, "package.json")).toContain('"lint:design"');
    },
  );

  it("rejects a non-Tailwind configuration through the programmatic API", () => {
    expect(() =>
      runWithContext({ silent: true }, () =>
        validateConfigForProgrammaticUse({
          ecosystem: "typescript",
          frontend: ["react-vite"],
          cssFramework: "none",
          addons: ["oxlint", "shadcn-lint"],
        }),
      ),
    ).toThrow("Tailwind CSS v4");
  });

  it("offers the supplemental check in mixed-ecosystem CLI prompts only with Tailwind", () => {
    const context = {
      frontends: ["react-vite" as const],
      existing: [],
      additionsOnly: false,
      config: { ecosystem: "go" as const, cssFramework: "tailwind" as const },
    };
    expect(
      getCompatibleSelections("codeQuality", context, []).some(
        (option) => option.id === "shadcn-lint",
      ),
    ).toBe(true);
    expect(
      getCompatibleSelections(
        "codeQuality",
        { ...context, config: { ...context.config, cssFramework: "none" } },
        [],
      ).some((option) => option.id === "shadcn-lint"),
    ).toBe(false);
  });
});
