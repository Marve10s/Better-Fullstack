import { EMBEDDED_TEMPLATES, generateVirtualProject } from "@better-fullstack/template-generator";
import { parseStackPartSpecs, validateStackParts } from "@better-fullstack/types";
import { parseStackSelectionFromUrlRecord } from "@better-fullstack/types/stack-translation";
import { describe, expect, it } from "bun:test";

import { getInitialComposerSpecs } from "@/components/stack-builder/stack-builder";
import { getDisabledReason } from "@/components/stack-builder/utils";
import { stackStateToProjectConfig } from "@/lib/builder/preview-config";
import { DEFAULT_STACK, ECOSYSTEMS, TECH_OPTIONS } from "@/lib/stack/constant";
import { parseStackShareSlug } from "@/lib/stack/stack-share-paths";
import { generateStackCommand } from "@/lib/stack/stack-utils";

describe("PHP builder recipe", () => {
  it("preserves a standalone PHP service when enabling composer mode", () => {
    const stack = parseStackShareSlug("php");
    if (!stack) throw new Error("Missing PHP share selection");
    const specs = getInitialComposerSpecs(stack);
    const parts = parseStackPartSpecs(specs);
    expect(parts.filter((part) => part.role === "frontend")).toEqual([]);
    expect(parts.filter((part) => part.role === "backend").map((part) => part.ecosystem)).toEqual([
      "php",
    ]);
    expect(validateStackParts(parts).issues).toEqual([]);
  });

  it.each(["compact", "query"])(
    "generates a native service from the %s PHP entry",
    async (entry) => {
      const stack =
        entry === "compact"
          ? parseStackShareSlug("php")
          : parseStackSelectionFromUrlRecord({ eco: "php" });
      if (!stack) throw new Error("Missing PHP share selection");
      const config = stackStateToProjectConfig(stack);
      expect(config.database).toBe("none");
      expect(config.frontend).toEqual([]);
      expect(config.addons).toEqual([]);
      const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });
      expect(result.success).toBe(true);
      expect(result.tree?.root.children.some((node) => node.name === "composer.json")).toBe(true);
      expect(result.tree?.root.children.some((node) => node.name === "package.json")).toBe(false);
      expect(generateStackCommand(stack)).toContain("--database none");
      expect(generateStackCommand(stack)).not.toContain("--database sqlite");
    },
  );

  it("uses the shared Slim selection for preview and CLI", () => {
    const stack = {
      ...DEFAULT_STACK,
      ecosystem: "php" as const,
      phpWebFramework: "slim",
      database: "none",
      backend: "none",
      orm: "none",
      api: "none",
      auth: "none",
      webFrontend: ["none"],
      appPlatforms: [],
      codeQuality: [],
      documentation: [],
    };
    expect(ECOSYSTEMS.some((ecosystem) => ecosystem.id === "php")).toBe(true);
    expect(TECH_OPTIONS.phpWebFramework.some((option) => option.id === "slim")).toBe(true);
    expect(stackStateToProjectConfig(stack)).toMatchObject({
      ecosystem: "php",
      phpWebFramework: "slim",
      database: "none",
    });
    expect(generateStackCommand(stack)).toContain("--php-web-framework slim");
    expect(getDisabledReason(stack, "database", "sqlite")).toContain("does not generate database");
    for (const framework of ["laravel", "symfony"] as const) {
      const selected = { ...stack, phpWebFramework: framework };
      expect(TECH_OPTIONS.phpWebFramework.some((option) => option.id === framework)).toBe(true);
      expect(stackStateToProjectConfig(selected).phpWebFramework).toBe(framework);
      expect(generateStackCommand(selected)).toContain(`--php-web-framework ${framework}`);
    }
    const laravel = { ...stack, phpWebFramework: "laravel" };
    expect(getDisabledReason(laravel, "phpOrm", "eloquent")).toBeNull();
    expect(getDisabledReason(laravel, "phpOrm", "doctrine")).toContain("is generated for");
    expect(
      getDisabledReason({ ...stack, phpWebFramework: "symfony" }, "phpOrm", "cycle"),
    ).toContain("is generated for");
    expect(getDisabledReason(laravel, "phpAuth", "symfony-security")).toContain("is generated for");
    expect(getDisabledReason(laravel, "phpAuth", "lcobucci-jwt")).toBeNull();
    const withOrm = { ...laravel, phpOrm: "eloquent", phpAuth: "firebase-jwt" };
    expect(stackStateToProjectConfig(withOrm).phpOrm).toBe("eloquent");
    expect(generateStackCommand(withOrm)).toContain("--php-orm eloquent --php-auth firebase-jwt");
    expect(stackStateToProjectConfig(withOrm).phpAuth).toBe("firebase-jwt");
    expect(stackStateToProjectConfig(stack).phpTesting).toBe("phpunit");
    expect(generateStackCommand({ ...stack, phpTesting: "pest" })).toContain("--php-testing pest");
    expect(stackStateToProjectConfig(stack).phpValidation).toBe("none");
    expect(generateStackCommand({ ...stack, phpValidation: "respect-validation" })).toContain(
      "--php-validation respect-validation",
    );
    expect(generateStackCommand({ ...stack, phpCache: "symfony-cache" })).toContain(
      "--php-cache symfony-cache",
    );
    expect(generateStackCommand({ ...stack, phpJobQueue: "enqueue-fs" })).toContain(
      "--php-job-queue enqueue-fs",
    );
    expect(generateStackCommand({ ...stack, phpEmail: "phpmailer" })).toContain(
      "--php-email phpmailer",
    );
    expect(generateStackCommand({ ...stack, phpLogging: "monolog" })).toContain(
      "--php-logging monolog",
    );
    expect(generateStackCommand({ ...stack, phpHttpClient: "guzzle" })).toContain(
      "--php-http-client guzzle",
    );
  });
});
