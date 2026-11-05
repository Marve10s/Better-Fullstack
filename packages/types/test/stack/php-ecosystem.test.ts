import { describe, expect, it } from "bun:test";

import { createCliDefaultProjectConfigBase } from "@/config/defaults";
import { CreateInputSchema, EcosystemSchema } from "@/config/schemas";
import { getPhpRecipeIssue, PHP_RECIPE_REASONS } from "@/stack/php-compatibility";
import {
  legacyProjectConfigToStackParts,
  getStackPartOptions,
  parseStackPartSpecs,
  stackPartsToLegacyProjectConfigPartial,
  validateStackParts,
} from "@/stack/stack-graph";
import {
  DEFAULT_STACK_SELECTION,
  cliInputToProjectConfigPartial,
  createStackSelectionSearchParams,
  generateStackSelectionCommand,
  getEcosystemDefaultStackSelection,
  parseStackSelectionFromUrlRecord,
} from "@/stack/stack-translation";

const native = {
  ...createCliDefaultProjectConfigBase(),
  ecosystem: "php" as const,
  phpWebFramework: "slim" as const,
  database: "none" as const,
  backend: "none" as const,
  orm: "none" as const,
  api: "none" as const,
  auth: "none" as const,
  frontend: [],
  addons: [],
};

describe("PHP graph and transport contract", () => {
  it.each(["stable", "latest", "beta"])(
    "preserves the %s PHP version channel in commands",
    (versionChannel) => {
      const command = generateStackSelectionCommand({
        ...getEcosystemDefaultStackSelection("php"),
        versionChannel,
      });
      if (versionChannel === "stable") expect(command).not.toContain("--version-channel");
      else expect(command).toContain(`--version-channel ${versionChannel}`);
    },
  );

  it("offers databases only when another backend can own their integration", () => {
    const parts = parseStackPartSpecs(["backend:php:slim"]);
    const context = {
      role: "database" as const,
      ecosystem: "universal" as const,
      primaryToolIdsByRole: { backend: "slim" },
      primaryEcosystemsByRole: { backend: "php" as const },
    };
    expect(getStackPartOptions({ ...context, parts })).not.toContain("sqlite");
    expect(
      getStackPartOptions({
        ...context,
        parts: parseStackPartSpecs(["backend:php:slim", "backend:go:gin"]),
      }),
    ).toContain("sqlite");
  });

  it("uses native defaults while preserving explicit PHP URL overrides", () => {
    const defaults = getEcosystemDefaultStackSelection("php");
    const params = createStackSelectionSearchParams(defaults);
    expect(params.get("eco")).toBe("php");
    expect(parseStackSelectionFromUrlRecord(Object.fromEntries(params))).toEqual(defaults);
    const unsupported = { ...defaults, database: "sqlite" };
    const explicit = createStackSelectionSearchParams(unsupported);
    expect(explicit.get("db")).toBe("sqlite");
    expect(parseStackSelectionFromUrlRecord(Object.fromEntries(explicit)).database).toBe("sqlite");
  });

  it("accepts each generated PHP framework in the shared create schema", () => {
    expect(EcosystemSchema.parse("php")).toBe("php");
    for (const framework of ["slim", "laravel", "symfony"]) {
      expect(
        CreateInputSchema.parse({ ecosystem: "php", phpWebFramework: framework }).phpWebFramework,
      ).toBe(framework);
    }
    expect(
      CreateInputSchema.safeParse({ ecosystem: "php", phpWebFramework: "mezzio" }).success,
    ).toBe(false);
  });

  it("lifts and lowers Slim with owned native capabilities", () => {
    const parts = legacyProjectConfigToStackParts(native);
    const backend = parts.find((part) => part.role === "backend");
    expect(backend?.ecosystem).toBe("php");
    expect(
      parts
        .filter((part) => part.source === "provided")
        .map((part) => [part.role, part.toolId, part.ownerPartId]),
    ).toEqual(
      expect.arrayContaining([
        ["api", "rest", backend?.id],
        ["packageManager", "composer", backend?.id],
      ]),
    );
    expect(parts).toContainEqual(
      expect.objectContaining({
        role: "testing",
        toolId: "phpunit",
        ownerPartId: backend?.id,
      }),
    );
    expect(validateStackParts(parts).issues).toEqual([]);
    expect(stackPartsToLegacyProjectConfigPartial(parts)).toMatchObject({
      ecosystem: "php",
      phpWebFramework: "slim",
      phpTesting: "phpunit",
      database: "none",
    });
  });

  it("projects the selected PHP test runner and omits it for none", () => {
    for (const runner of ["pest", "codeception"] as const) {
      const parts = legacyProjectConfigToStackParts({ ...native, phpTesting: runner });
      expect(parts.filter((part) => part.role === "testing").map((part) => part.toolId)).toEqual([
        runner,
      ]);
      expect(validateStackParts(parts).issues).toEqual([]);
      expect(stackPartsToLegacyProjectConfigPartial(parts)).toMatchObject({ phpTesting: runner });
    }
    const parts = legacyProjectConfigToStackParts({ ...native, phpTesting: "none" });
    expect(parts.some((part) => part.role === "testing")).toBe(false);
    expect(stackPartsToLegacyProjectConfigPartial(parts).phpTesting ?? "none").toBe("none");
  });

  it("preserves named repeated services and unrelated frontend settings", () => {
    const config = cliInputToProjectConfigPartial({
      part: [
        "frontend:typescript:react-vite",
        "frontend.css:typescript:tailwind",
        "frontend.ui:typescript:shadcn-ui",
        "backend:php:slim:catalog",
        "backend:php:slim:billing",
      ],
      shadcnStyle: "luma",
    });
    const parts = config.stackParts ?? [];
    expect(validateStackParts(parts).issues).toEqual([]);
    expect(parts.filter((part) => part.role === "backend").map((part) => part.targetPath)).toEqual([
      "services/catalog",
      "services/billing",
    ]);
    expect(parts.find((part) => part.role === "ui")?.settings?.shadcnStyle).toBe("luma");
    const owners = new Set(parts.filter((part) => part.role === "backend").map((part) => part.id));
    expect(
      parts
        .filter((part) => part.source === "provided")
        .every((part) => owners.has(part.ownerPartId ?? "")),
    ).toBe(true);
    expect(new Set(parts.map((part) => part.id)).size).toBe(parts.length);
  });

  it("rejects unimplemented data and backend integrations with shared reasons", () => {
    expect(getPhpRecipeIssue({ ...native, database: "sqlite" })).toBe(PHP_RECIPE_REASONS.database);
    expect(getPhpRecipeIssue({ ...native, phpWebFramework: "none" })).toBe(
      PHP_RECIPE_REASONS.framework,
    );
    expect(getPhpRecipeIssue({ ...native, email: "resend" })).toBe(PHP_RECIPE_REASONS.capability);
    expect(getPhpRecipeIssue({ ...native, logging: "pino" })).toBe(PHP_RECIPE_REASONS.capability);
    expect(getPhpRecipeIssue({ ...native, ai: "mastra" })).toBe(PHP_RECIPE_REASONS.capability);
    expect(getPhpRecipeIssue({ ...native, addons: ["docker"] })).toBe(
      PHP_RECIPE_REASONS.capability,
    );
    const parts = parseStackPartSpecs(["backend:php:slim", "database:universal:sqlite"]);
    expect(
      validateStackParts(parts).issues.some(
        (issue) => issue.message === PHP_RECIPE_REASONS.database,
      ),
    ).toBe(true);
  });

  it("round-trips PHP URL and replay selections", () => {
    const selection = {
      ...DEFAULT_STACK_SELECTION,
      ecosystem: "php" as const,
      phpWebFramework: "slim",
      database: "none",
      git: "false",
      install: "false",
    };
    const params = createStackSelectionSearchParams(selection, { includeDefaults: true });
    expect(params.get("phwf")).toBe("slim");
    expect(parseStackSelectionFromUrlRecord(Object.fromEntries(params.entries()))).toEqual(
      selection,
    );
    const command = generateStackSelectionCommand(selection);
    expect(command).toContain(
      "--ecosystem php --php-web-framework slim --php-orm none --php-auth none --php-testing phpunit --php-validation none --php-cache none --php-job-queue none --php-email none --php-logging none --php-http-client none --database none",
    );
    expect(command).toContain("--no-install");
    const withOrm = { ...selection, phpWebFramework: "symfony", phpOrm: "doctrine" };
    const ormParams = createStackSelectionSearchParams(withOrm, { includeDefaults: true });
    expect(ormParams.get("phorm")).toBe("doctrine");
    expect(parseStackSelectionFromUrlRecord(Object.fromEntries(ormParams.entries()))).toEqual(
      withOrm,
    );
    expect(generateStackSelectionCommand(withOrm)).toContain("--php-orm doctrine");
  });

  it("projects a PHP ORM as an owned part and rejects framework mismatches", () => {
    const config = cliInputToProjectConfigPartial({
      ecosystem: "php",
      phpWebFramework: "laravel",
      phpOrm: "eloquent",
    });
    const parts = legacyProjectConfigToStackParts({ ...native, ...config });
    const backend = parts.find((part) => part.role === "backend");
    expect(parts).toContainEqual(
      expect.objectContaining({
        role: "orm",
        ecosystem: "php",
        toolId: "eloquent",
        ownerPartId: backend?.id,
      }),
    );
    expect(validateStackParts(parts).issues).toEqual([]);
    expect(stackPartsToLegacyProjectConfigPartial(parts)).toMatchObject({ phpOrm: "eloquent" });
    for (const [framework, orm] of [
      ["laravel", "doctrine"],
      ["laravel", "cycle"],
      ["symfony", "eloquent"],
      ["symfony", "cycle"],
    ] as const) {
      const issue = getPhpRecipeIssue({ ...native, phpWebFramework: framework, phpOrm: orm });
      expect(issue).toContain("is generated for");
      const mismatched = parseStackPartSpecs([
        `backend:php:${framework}`,
        `backend.orm:php:${orm}`,
      ]);
      expect(validateStackParts(mismatched).issues.map((entry) => entry.message)).toContain(issue);
    }
    for (const orm of ["eloquent", "doctrine", "cycle"] as const) {
      expect(getPhpRecipeIssue({ ...native, phpOrm: orm })).toBeUndefined();
    }
  });

  it("projects PHP auth as an owned part and keeps Symfony Security on Symfony", () => {
    const parts = legacyProjectConfigToStackParts({
      ...native,
      phpWebFramework: "symfony",
      phpAuth: "symfony-security",
    });
    expect(parts).toContainEqual(
      expect.objectContaining({ role: "auth", ecosystem: "php", toolId: "symfony-security" }),
    );
    expect(validateStackParts(parts).issues).toEqual([]);
    expect(stackPartsToLegacyProjectConfigPartial(parts)).toMatchObject({
      phpAuth: "symfony-security",
    });
    for (const framework of ["slim", "laravel"] as const) {
      const issue = getPhpRecipeIssue({
        ...native,
        phpWebFramework: framework,
        phpAuth: "symfony-security",
      });
      expect(issue).toContain("Symfony Security is generated for Symfony");
      const mismatched = parseStackPartSpecs([
        `backend:php:${framework}`,
        "backend.auth:php:symfony-security",
      ]);
      expect(validateStackParts(mismatched).issues.map((entry) => entry.message)).toContain(issue);
    }
    for (const framework of ["slim", "laravel", "symfony"] as const) {
      for (const auth of ["firebase-jwt", "lcobucci-jwt"] as const) {
        expect(
          getPhpRecipeIssue({ ...native, phpWebFramework: framework, phpAuth: auth }),
        ).toBeUndefined();
      }
    }
  });

  it("projects PHP validation as an owned part and keeps Laravel Validation on Laravel", () => {
    const parts = legacyProjectConfigToStackParts({
      ...native,
      phpWebFramework: "laravel",
      phpValidation: "laravel-validation",
    });
    expect(parts).toContainEqual(
      expect.objectContaining({
        role: "validation",
        ecosystem: "php",
        toolId: "laravel-validation",
      }),
    );
    expect(validateStackParts(parts).issues).toEqual([]);
    expect(stackPartsToLegacyProjectConfigPartial(parts)).toMatchObject({
      phpValidation: "laravel-validation",
    });
    for (const framework of ["slim", "symfony"] as const) {
      const issue = getPhpRecipeIssue({
        ...native,
        phpWebFramework: framework,
        phpValidation: "laravel-validation",
      });
      expect(issue).toContain("Laravel Validation is generated for Laravel");
      const mismatched = parseStackPartSpecs([
        `backend:php:${framework}`,
        "backend.validation:php:laravel-validation",
      ]);
      expect(validateStackParts(mismatched).issues.map((entry) => entry.message)).toContain(issue);
    }
    for (const framework of ["slim", "laravel", "symfony"] as const) {
      for (const validation of ["symfony-validator", "respect-validation"] as const) {
        expect(
          getPhpRecipeIssue({ ...native, phpWebFramework: framework, phpValidation: validation }),
        ).toBeUndefined();
      }
    }
    const selection = parseStackSelectionFromUrlRecord({
      eco: "php",
      phwf: "symfony",
      phval: "respect-validation",
    });
    expect(selection.phpValidation).toBe("respect-validation");
    expect(createStackSelectionSearchParams(selection).get("phval")).toBe("respect-validation");
    expect(generateStackSelectionCommand(selection)).toContain(
      "--php-validation respect-validation",
    );
  });

  it("projects a PHP cache as an owned part and keeps Laravel Cache on Laravel", () => {
    const parts = legacyProjectConfigToStackParts({ ...native, phpCache: "predis" });
    expect(parts).toContainEqual(
      expect.objectContaining({ role: "caching", ecosystem: "php", toolId: "predis" }),
    );
    expect(validateStackParts(parts).issues).toEqual([]);
    expect(stackPartsToLegacyProjectConfigPartial(parts)).toMatchObject({ phpCache: "predis" });
    const issue = getPhpRecipeIssue({ ...native, phpCache: "laravel-cache" });
    expect(issue).toContain("Laravel Cache is generated for Laravel");
    const mismatched = parseStackPartSpecs([
      "backend:php:slim",
      "backend.caching:php:laravel-cache",
    ]);
    expect(validateStackParts(mismatched).issues.map((entry) => entry.message)).toContain(issue);
    expect(
      getPhpRecipeIssue({ ...native, phpWebFramework: "laravel", phpCache: "laravel-cache" }),
    ).toBeUndefined();
    const selection = parseStackSelectionFromUrlRecord({ eco: "php", phcache: "laminas-cache" });
    expect(selection.phpCache).toBe("laminas-cache");
    expect(generateStackSelectionCommand(selection)).toContain("--php-cache laminas-cache");
  });

  it("projects PHP background jobs as an owned part and keeps Laravel Queue on Laravel", () => {
    const parts = legacyProjectConfigToStackParts({ ...native, phpJobQueue: "enqueue-fs" });
    expect(parts).toContainEqual(
      expect.objectContaining({ role: "jobQueue", ecosystem: "php", toolId: "enqueue-fs" }),
    );
    expect(validateStackParts(parts).issues).toEqual([]);
    expect(stackPartsToLegacyProjectConfigPartial(parts)).toMatchObject({
      phpJobQueue: "enqueue-fs",
    });
    const issue = getPhpRecipeIssue({ ...native, phpJobQueue: "laravel-queue" });
    expect(issue).toContain("Laravel Queue is generated for Laravel");
    const mismatched = parseStackPartSpecs([
      "backend:php:symfony",
      "backend.jobQueue:php:laravel-queue",
    ]);
    expect(validateStackParts(mismatched).issues.map((entry) => entry.message)).toContain(
      "Laravel Queue is generated for Laravel, not Symfony.",
    );
    const selection = parseStackSelectionFromUrlRecord({ eco: "php", phjobs: "symfony-messenger" });
    expect(selection.phpJobQueue).toBe("symfony-messenger");
    expect(generateStackSelectionCommand(selection)).toContain("--php-job-queue symfony-messenger");
  });

  it("projects PHP email as an owned part and keeps Laravel Mail on Laravel", () => {
    const parts = legacyProjectConfigToStackParts({ ...native, phpEmail: "phpmailer" });
    expect(parts).toContainEqual(
      expect.objectContaining({ role: "email", ecosystem: "php", toolId: "phpmailer" }),
    );
    expect(validateStackParts(parts).issues).toEqual([]);
    expect(stackPartsToLegacyProjectConfigPartial(parts)).toMatchObject({ phpEmail: "phpmailer" });
    const issue = getPhpRecipeIssue({ ...native, phpEmail: "laravel-mail" });
    expect(issue).toContain("Laravel Mail is generated for Laravel");
    const mismatched = parseStackPartSpecs(["backend:php:slim", "backend.email:php:laravel-mail"]);
    expect(validateStackParts(mismatched).issues.map((entry) => entry.message)).toContain(issue);
    const selection = parseStackSelectionFromUrlRecord({ eco: "php", phmail: "symfony-mailer" });
    expect(selection.phpEmail).toBe("symfony-mailer");
    expect(generateStackSelectionCommand(selection)).toContain("--php-email symfony-mailer");
  });

  it("keeps each PHP logging option on the framework that owns logging", () => {
    for (const [framework, logging] of [
      ["slim", "monolog"],
      ["laravel", "laravel-log"],
      ["symfony", "symfony-monolog"],
    ] as const) {
      const parts = legacyProjectConfigToStackParts({
        ...native,
        phpWebFramework: framework,
        phpLogging: logging,
      });
      expect(parts).toContainEqual(
        expect.objectContaining({ role: "logging", ecosystem: "php", toolId: logging }),
      );
      expect(validateStackParts(parts).issues).toEqual([]);
      expect(stackPartsToLegacyProjectConfigPartial(parts)).toMatchObject({ phpLogging: logging });
    }
    const issue = getPhpRecipeIssue({
      ...native,
      phpWebFramework: "symfony",
      phpLogging: "monolog",
    });
    expect(issue).toContain("Monolog is generated for Slim");
    const mismatched = parseStackPartSpecs(["backend:php:symfony", "backend.logging:php:monolog"]);
    expect(validateStackParts(mismatched).issues.map((entry) => entry.message)).toContain(issue);
    const selection = parseStackSelectionFromUrlRecord({ eco: "php", phlog: "monolog" });
    expect(selection.phpLogging).toBe("monolog");
    expect(generateStackSelectionCommand(selection)).toContain("--php-logging monolog");
  });

  it("projects a PHP HTTP client as an owned part on every framework", () => {
    for (const framework of ["slim", "laravel", "symfony"] as const) {
      const parts = legacyProjectConfigToStackParts({
        ...native,
        phpWebFramework: framework,
        phpHttpClient: "symfony-http-client",
      });
      expect(parts).toContainEqual(
        expect.objectContaining({
          role: "httpClient",
          ecosystem: "php",
          toolId: "symfony-http-client",
        }),
      );
      expect(validateStackParts(parts).issues).toEqual([]);
      expect(stackPartsToLegacyProjectConfigPartial(parts)).toMatchObject({
        phpHttpClient: "symfony-http-client",
      });
    }
    const selection = parseStackSelectionFromUrlRecord({ eco: "php", phhttp: "guzzle" });
    expect(selection.phpHttpClient).toBe("guzzle");
    expect(generateStackSelectionCommand(selection)).toContain("--php-http-client guzzle");
  });
});
