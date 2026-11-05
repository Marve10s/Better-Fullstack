import { describe, expect, it } from "bun:test";

import type { ProjectConfig } from "@/config/types";

import { getCapabilityInventory } from "@/capabilities/capability-inventory";
import { getCliFlagReference } from "@/catalog/cli-flags";
import { createCliDefaultProjectConfigBase } from "@/config/defaults";
import { EcosystemSchema, CreateInputSchema, ProjectConfigSchema } from "@/config/schemas";
import { analyzeStackCompatibility, getDisabledReason } from "@/stack/compatibility";
import {
  createRubyProjectConfigDefaults,
  getRubyRecipeIssue,
  RUBY_RECIPE_EXTENSION_REASON,
} from "@/stack/ruby-compatibility";
import {
  getStackPartOptions,
  legacyProjectConfigToStackParts,
  stackPartsToLegacyProjectConfigPartial,
  parseStackPartSpecs,
  validateStackParts,
  formatStackPartSpec,
} from "@/stack/stack-graph";
import {
  cliInputToProjectConfigPartial,
  getEcosystemDefaultStackSelection,
  createStackSelectionSearchParams,
  parseStackSelectionFromUrlRecord,
  stackSelectionToProjectConfig,
  generateStackSelectionCommand,
} from "@/stack/stack-translation";

const rubySelection = () => getEcosystemDefaultStackSelection("ruby");

describe("Ruby recipe contracts", () => {
  it.each([
    ["codeQuality", "gitleaks"],
    ["documentation", "starlight"],
    ["appPlatforms", "turborepo"],
  ] as const)("rejects %s tooling through the same Ruby addon policy", (category, tool) => {
    expect(getDisabledReason(rubySelection(), category, tool)).toBe(RUBY_RECIPE_EXTENSION_REASON);
    expect(getDisabledReason(rubySelection(), category, "none")).toBeNull();
  });

  it.each([
    { mobileNavigation: "expo-router" },
    { mobileUI: "tamagui" },
    { mobileStorage: "mmkv" },
    { mobileTesting: "maestro" },
    { mobilePush: "expo-notifications" },
    { mobileOTA: "expo-updates" },
    { mobileDeepLinking: "expo-linking" },
    { mobileLibraries: ["expo-camera"] },
  ] satisfies Partial<ProjectConfig>[])(
    "rejects unsupported flat mobile selections %j",
    (mobile) => {
      expect(getRubyRecipeIssue({ ecosystem: "ruby", ...mobile })).toBe(
        RUBY_RECIPE_EXTENSION_REASON,
      );
    },
  );

  it("keeps disabled mobile defaults valid and preserves mobile owners in mixed graphs", () => {
    expect(createRubyProjectConfigDefaults().mobileLibraries).toEqual([]);
    expect(
      getRubyRecipeIssue({
        ...createRubyProjectConfigDefaults(),
        ecosystem: "ruby",
        mobileLibraries: ["none"],
      }),
    ).toBeNull();
    const parts = parseStackPartSpecs([
      "backend:ruby:sinatra",
      "mobile:react-native:native-bare",
      "mobile.push:react-native:expo-notifications",
      "mobile.libraries:react-native:expo-camera",
    ]);
    expect(getRubyRecipeIssue({ stackParts: parts })).toBeNull();
    expect(validateStackParts(parts).issues).toEqual([]);
  });

  it.each(["latest", "beta"] as const)(
    "preserves the %s channel in Ruby command replay",
    (versionChannel) => {
      expect(generateStackSelectionCommand({ ...rubySelection(), versionChannel })).toContain(
        `--version-channel ${versionChannel}`,
      );
    },
  );

  it("rejects tooling beside a disabled JavaScript frontend", () => {
    const parts = parseStackPartSpecs([
      "backend:ruby:sinatra",
      "frontend:typescript:none",
      "codeQuality:universal:biome",
    ]);
    expect(getRubyRecipeIssue({ stackParts: parts })).toBe(RUBY_RECIPE_EXTENSION_REASON);
  });

  it("continues reading pre-Ruby project configs", () => {
    const { rubyWebFramework: _rubyWebFramework, ...legacy } = createCliDefaultProjectConfigBase();
    const parsed = ProjectConfigSchema.parse({ ...legacy, projectDir: "/virtual" });
    expect(parsed.ecosystem).toBe("typescript");
    expect(parsed.backend).toBe("hono");
  });

  it("accepts the same field through create, CLI flags, and persisted graph projection", () => {
    expect(EcosystemSchema.parse("ruby")).toBe("ruby");
    const input = CreateInputSchema.parse({ ecosystem: "ruby", rubyWebFramework: "sinatra" });
    const config = cliInputToProjectConfigPartial(input);
    expect(getRubyRecipeIssue(config)).toBeNull();
    const parts = legacyProjectConfigToStackParts(config);
    expect(parts.filter((part) => part.role === "backend").map((part) => part.toolId)).toEqual([
      "sinatra",
    ]);
    expect(stackPartsToLegacyProjectConfigPartial(parts).rubyWebFramework).toBe("sinatra");
    const flags = getCliFlagReference().flatMap((group) => group.flags);
    expect(flags.find((flag) => flag.flag === "--ruby-web-framework")?.values).toEqual([
      "sinatra",
      "rails",
      "roda",
      "grape",
      "none",
    ]);
  });

  it("keeps a minimal Ruby share URL native and replays its explicit command", () => {
    const selection = parseStackSelectionFromUrlRecord({ eco: "ruby" });
    expect(selection.rubyWebFramework).toBe("sinatra");
    expect(selection.backend).toBe("none");
    expect(selection.webFrontend).toEqual([]);
    const config = stackSelectionToProjectConfig(selection, {
      projectDir: "/virtual",
      relativePath: "ruby-service",
      install: false,
    });
    expect(getRubyRecipeIssue(config)).toBeNull();
    const params = createStackSelectionSearchParams(selection);
    expect(parseStackSelectionFromUrlRecord(Object.fromEntries(params))).toEqual(selection);
    const command = generateStackSelectionCommand(selection);
    expect(command).toContain("--ecosystem ruby");
    expect(command).toContain("--ruby-web-framework sinatra");
    expect(command).toContain("--addons none");
  });

  it("preserves named Ruby services and TypeScript capabilities through graph replay", () => {
    const parts = parseStackPartSpecs([
      "frontend:typescript:react-vite",
      "frontend.css:typescript:tailwind",
      "backend:ruby:sinatra:public-api",
      "backend:ruby:sinatra:internal-api",
      "backend:go:gin:go-api",
      "go-api.orm:go:gorm",
      "database:universal:sqlite",
    ]);
    expect(validateStackParts(parts).issues).toEqual([]);
    expect(getRubyRecipeIssue({ stackParts: parts })).toBeNull();
    const replay = parseStackPartSpecs(
      parts
        .filter((part) => part.source !== "provided")
        .map((part) => formatStackPartSpec(part, parts)),
    );
    expect(replay.map((part) => [part.id, part.ownerPartId, part.toolId])).toEqual(
      parts.map((part) => [part.id, part.ownerPartId, part.toolId]),
    );
    const lowered = stackPartsToLegacyProjectConfigPartial(parts);
    expect(lowered.rubyWebFramework).toBe("sinatra");
    expect(lowered.goOrm).toBe("gorm");
    expect(lowered.cssFramework).toBe("tailwind");
  });

  it("rejects unsupported Ruby extensions through flat and graph boundaries with a shared reason", () => {
    expect(
      getRubyRecipeIssue({
        ...createRubyProjectConfigDefaults(),
        ecosystem: "ruby",
        database: "sqlite",
      }),
    ).toBe(RUBY_RECIPE_EXTENSION_REASON);
    expect(getDisabledReason(rubySelection(), "database", "sqlite")).toBe(
      RUBY_RECIPE_EXTENSION_REASON,
    );
    const invalidSelection = { ...rubySelection(), database: "sqlite" };
    expect(() =>
      stackSelectionToProjectConfig(invalidSelection, {
        projectDir: "/virtual",
        relativePath: "ruby-service",
      }),
    ).toThrow(RUBY_RECIPE_EXTENSION_REASON);
    expect(() => generateStackSelectionCommand(invalidSelection)).toThrow(
      RUBY_RECIPE_EXTENSION_REASON,
    );
    expect(getDisabledReason(rubySelection(), "auth", "better-auth")).toBe(
      RUBY_RECIPE_EXTENSION_REASON,
    );
    expect(
      getRubyRecipeIssue({
        stackParts: parseStackPartSpecs([
          "backend:ruby:sinatra",
          "continuousIntegration:universal:github-actions",
        ]),
      }),
    ).toBe(RUBY_RECIPE_EXTENSION_REASON);
    const parts = parseStackPartSpecs(["backend:ruby:sinatra", "backend.orm:typescript:drizzle"]);
    expect(getRubyRecipeIssue({ stackParts: parts })).toBe(RUBY_RECIPE_EXTENSION_REASON);
    expect(
      validateStackParts(parts).issues.some(
        (issue) => issue.message === RUBY_RECIPE_EXTENSION_REASON,
      ),
    ).toBe(true);
  });

  it("accepts Ruby ORMs only inside the Ruby service and round-trips them through URLs", () => {
    const parts = parseStackPartSpecs(["backend:ruby:rails", "backend.orm:ruby:active-record"]);
    expect(getRubyRecipeIssue({ stackParts: parts })).toBeNull();
    expect(validateStackParts(parts).issues).toEqual([]);
    expect(stackPartsToLegacyProjectConfigPartial(parts).rubyOrm).toBe("active-record");
    expect(getDisabledReason(rubySelection(), "rubyOrm", "sequel")).toBeNull();
    expect(
      getDisabledReason(getEcosystemDefaultStackSelection("typescript"), "rubyOrm", "sequel"),
    ).toBe("Ruby options only apply when the Ruby ecosystem is selected");
    const selection = { ...rubySelection(), rubyOrm: "rom" };
    const restored = parseStackSelectionFromUrlRecord(
      Object.fromEntries(createStackSelectionSearchParams(selection)),
    );
    expect(restored.rubyOrm).toBe("rom");
    expect(generateStackSelectionCommand(restored)).toContain("--ruby-orm rom");
    expect(
      stackSelectionToProjectConfig(restored, {
        projectDir: "/virtual",
        relativePath: "ruby-service",
      }).rubyOrm,
    ).toBe("rom");
    expect(
      getRubyRecipeIssue({
        stackParts: parseStackPartSpecs(["backend:go:gin", "backend.orm:ruby:sequel"]),
      }),
    ).toBe(RUBY_RECIPE_EXTENSION_REASON);
  });

  it("accepts Ruby auth only inside the Ruby service", () => {
    const parts = parseStackPartSpecs(["backend:ruby:roda", "backend.auth:ruby:rodauth"]);
    expect(getRubyRecipeIssue({ stackParts: parts })).toBeNull();
    expect(validateStackParts(parts).issues).toEqual([]);
    expect(stackPartsToLegacyProjectConfigPartial(parts).rubyAuth).toBe("rodauth");
    expect(
      getDisabledReason(getEcosystemDefaultStackSelection("typescript"), "rubyAuth", "jwt"),
    ).toBe("Ruby options only apply when the Ruby ecosystem is selected");
    expect(getDisabledReason(rubySelection(), "auth", "better-auth")).toBe(
      RUBY_RECIPE_EXTENSION_REASON,
    );
    const restored = parseStackSelectionFromUrlRecord(
      Object.fromEntries(createStackSelectionSearchParams({ ...rubySelection(), rubyAuth: "jwt" })),
    );
    expect(generateStackSelectionCommand(restored)).toContain("--ruby-auth jwt");
  });

  it("projects the Ruby test runner as a Ruby-owned testing part", () => {
    expect(createRubyProjectConfigDefaults().rubyTesting).toBe("minitest");
    const parts = parseStackPartSpecs(["backend:ruby:rails", "backend.testing:ruby:rspec"]);
    expect(getRubyRecipeIssue({ stackParts: parts })).toBeNull();
    expect(validateStackParts(parts).issues).toEqual([]);
    expect(stackPartsToLegacyProjectConfigPartial(parts).rubyTesting).toBe("rspec");
    expect(
      getDisabledReason(getEcosystemDefaultStackSelection("typescript"), "rubyTesting", "rspec"),
    ).toBe("Ruby options only apply when the Ruby ecosystem is selected");
    expect(
      getRubyRecipeIssue({
        stackParts: parseStackPartSpecs(["backend:ruby:rails", "backend.testing:typescript:vitest"]),
      }),
    ).toBe(RUBY_RECIPE_EXTENSION_REASON);
    const restored = parseStackSelectionFromUrlRecord(
      Object.fromEntries(
        createStackSelectionSearchParams({ ...rubySelection(), rubyTesting: "test-unit" }),
      ),
    );
    expect(generateStackSelectionCommand(restored)).toContain("--ruby-testing test-unit");
  });

  it.each([
    ["rubyValidation", "validation", "json-schemer", "none"],
    ["rubyCache", "caching", "redis", "none"],
    ["rubyJobQueue", "jobQueue", "sidekiq", "none"],
    ["rubyEmail", "email", "resend", "none"],
    ["rubyLogging", "logging", "semantic-logger", "logger"],
    ["rubyHttpClient", "httpClient", "httpx", "none"],
  ] as const)(
    "projects %s as a Ruby-owned %s part",
    (category, role, tool, fallback) => {
      expect(createRubyProjectConfigDefaults()[category]).toBe(fallback);
      const parts = parseStackPartSpecs(["backend:ruby:roda", `backend.${role}:ruby:${tool}`]);
      expect(getRubyRecipeIssue({ stackParts: parts })).toBeNull();
      expect(validateStackParts(parts).issues).toEqual([]);
      expect(stackPartsToLegacyProjectConfigPartial(parts)[category]).toBe(tool);
      expect(
        getDisabledReason(getEcosystemDefaultStackSelection("typescript"), category, tool),
      ).toBe("Ruby options only apply when the Ruby ecosystem is selected");
      const restored = parseStackSelectionFromUrlRecord(
        Object.fromEntries(createStackSelectionSearchParams({ ...rubySelection(), [category]: tool })),
      );
      expect(restored[category]).toBe(tool);
      const flag = category.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
      expect(generateStackSelectionCommand(restored)).toContain(`--${flag} ${tool}`);
    },
  );

  it("allows Solid Queue only on Rails with Active Record", () => {
    const rails = { ...rubySelection(), rubyWebFramework: "rails", rubyOrm: "active-record" };
    expect(getDisabledReason(rails, "rubyJobQueue", "solid-queue")).toBeNull();
    expect(getDisabledReason({ ...rails, rubyWebFramework: "sinatra" }, "rubyJobQueue", "solid-queue")).toBe(
      "Solid Queue requires Ruby Rails.",
    );
    expect(getDisabledReason({ ...rails, rubyOrm: "sequel" }, "rubyJobQueue", "solid-queue")).toBe(
      "Solid Queue requires the Active Record ORM.",
    );
    const adjusted = analyzeStackCompatibility({
      ...rails,
      rubyWebFramework: "roda",
      rubyJobQueue: "solid-queue",
    });
    expect(adjusted.adjustedStack?.rubyJobQueue).toBe("none");
    expect(
      getRubyRecipeIssue({
        ...createRubyProjectConfigDefaults(),
        ecosystem: "ruby",
        rubyWebFramework: "rails",
        rubyOrm: "sequel",
        rubyJobQueue: "solid-queue",
      }),
    ).toBe("Solid Queue requires the Active Record ORM.");
    expect(
      getRubyRecipeIssue({
        stackParts: parseStackPartSpecs(["backend:ruby:grape", "backend.jobQueue:ruby:solid-queue"]),
      }),
    ).toBe("Solid Queue requires Ruby Rails.");
    expect(
      getRubyRecipeIssue({
        stackParts: parseStackPartSpecs([
          "backend:ruby:rails",
          "backend.orm:ruby:active-record",
          "backend.jobQueue:ruby:solid-queue",
        ]),
      }),
    ).toBeNull();
  });

  it.each([
    ["rubyLogging", "lograge", "Lograge requires Ruby Rails."],
    ["rubyJobQueue", "resque", "Resque requires Ruby Sinatra, Rails or Roda."],
  ] as const)("rejects %s %s on Grape", (category, tool, reason) => {
    const grape = { ...rubySelection(), rubyWebFramework: "grape" };
    expect(getDisabledReason(grape, category, tool)).toBe(reason);
    expect(getDisabledReason({ ...grape, rubyWebFramework: "rails" }, category, tool)).toBeNull();
    expect(
      getRubyRecipeIssue({ ...createRubyProjectConfigDefaults(), ecosystem: "ruby", rubyWebFramework: "grape", [category]: tool }),
    ).toBe(reason);
  });

  it("allows Action Mailer only on Rails", () => {
    expect(
      getDisabledReason({ ...rubySelection(), rubyWebFramework: "rails" }, "rubyEmail", "action-mailer"),
    ).toBeNull();
    expect(getDisabledReason(rubySelection(), "rubyEmail", "action-mailer")).toBe(
      "Action Mailer requires Ruby Rails.",
    );
    expect(
      getRubyRecipeIssue({
        stackParts: parseStackPartSpecs(["backend:ruby:roda", "backend.email:ruby:action-mailer"]),
      }),
    ).toBe("Action Mailer requires Ruby Rails.");
  });

  it("applies Ruby framework and ORM rules to graph validation and owned options", () => {
    const issues = (specs: string[]) =>
      validateStackParts(parseStackPartSpecs(specs)).issues.map((issue) => issue.message);
    expect(issues(["backend:ruby:sinatra", "backend.jobQueue:ruby:solid-queue"])).toContain(
      "Solid Queue requires Ruby Rails.",
    );
    expect(
      issues(["backend:ruby:rails", "backend.orm:ruby:sequel", "backend.jobQueue:ruby:solid-queue"]),
    ).toContain("Solid Queue requires the Active Record ORM.");
    expect(issues(["backend:ruby:grape", "backend.jobQueue:ruby:resque"])).toContain(
      "Resque requires Ruby Sinatra, Rails or Roda.",
    );
    expect(
      issues([
        "backend:ruby:rails",
        "backend.orm:ruby:active-record",
        "backend.jobQueue:ruby:solid-queue",
      ]),
    ).toEqual([]);
    const parts = parseStackPartSpecs(["backend:ruby:sinatra"]);
    expect(
      getStackPartOptions({
        role: "jobQueue",
        ecosystem: "ruby",
        ownerRole: "backend",
        ownerToolId: "sinatra",
        ownerEcosystem: "ruby",
        parts,
      }),
    ).not.toContain("solid-queue");
    expect(() =>
      stackSelectionToProjectConfig(
        {
          ...rubySelection(),
          stackMode: "multi",
          stackPartSpecs: ["frontend:typescript:react-vite", "backend:ruby:sinatra"],
          rubyJobQueue: "solid-queue",
        },
        { projectDir: "/virtual", relativePath: "ruby-service" },
      ),
    ).toThrow("Solid Queue requires Ruby Rails.");
  });

  it("rejects selected databases when Ruby is the only backend, in either picker order", () => {
    const ruby = parseStackPartSpecs(["backend:ruby:sinatra:api"]);
    const database = parseStackPartSpecs(["database:universal:sqlite"]);
    expect(
      getStackPartOptions({ role: "database", ecosystem: "universal", parts: ruby }),
    ).not.toContain("sqlite");
    expect(
      getStackPartOptions({ role: "backend", ecosystem: "ruby", parts: database }),
    ).not.toContain("sinatra");
    for (const specs of [
      ["backend:ruby:sinatra", "database:universal:sqlite"],
      ["database:universal:sqlite", "backend:ruby:sinatra"],
      ["frontend:typescript:react-vite", "backend:ruby:sinatra", "database:universal:sqlite"],
      ["backend:ruby:sinatra:api", "backend:ruby:sinatra:admin", "database:universal:postgres"],
    ]) {
      const parts = parseStackPartSpecs(specs);
      expect(getRubyRecipeIssue({ stackParts: parts })).toBe(RUBY_RECIPE_EXTENSION_REASON);
      expect(
        validateStackParts(parts).issues.some(
          (issue) => issue.message === RUBY_RECIPE_EXTENSION_REASON,
        ),
      ).toBe(true);
    }
  });

  it("requires a database-capable backend alongside Ruby and PHP", () => {
    for (const backends of [
      ["backend:ruby:sinatra:ruby-api", "backend:php:slim:php-api"],
      ["backend:php:slim:php-api", "backend:ruby:sinatra:ruby-api"],
    ]) {
      const parts = parseStackPartSpecs(backends);
      expect(
        getStackPartOptions({ role: "database", ecosystem: "universal", parts }),
      ).not.toContain("sqlite");
      const unsupported = parseStackPartSpecs([...backends, "database:universal:sqlite"]);
      expect(getRubyRecipeIssue({ stackParts: unsupported })).toBe(RUBY_RECIPE_EXTENSION_REASON);
      expect(validateStackParts(unsupported).issues.length).toBeGreaterThan(0);
      const supported = parseStackPartSpecs([
        ...backends,
        "backend:go:gin:data-api",
        "data-api.orm:go:gorm",
        "database:universal:sqlite",
      ]);
      expect(getRubyRecipeIssue({ stackParts: supported })).toBeNull();
      expect(validateStackParts(supported).issues).toEqual([]);
      expect(
        getStackPartOptions({ role: "database", ecosystem: "universal", parts: supported }),
      ).toContain("sqlite");
    }
  });

  it("rejects Ruby graph overlays during builder replay before generic tooling filtering", () => {
    const selection = {
      ...rubySelection(),
      stackMode: "multi" as const,
      stackPartSpecs: ["backend:ruby:sinatra", "codeQuality:universal:biome"],
    };
    expect(() =>
      stackSelectionToProjectConfig(selection, {
        projectDir: "/virtual",
        relativePath: "ruby-service",
      }),
    ).toThrow(RUBY_RECIPE_EXTENSION_REASON);
    expect(() => generateStackSelectionCommand(selection)).toThrow(RUBY_RECIPE_EXTENSION_REASON);
  });

  it("retains database choices for unrelated Go and TypeScript backends", () => {
    for (const [backend, orm] of [
      ["go:gin", "go:gorm"],
      ["typescript:hono", "typescript:drizzle"],
    ]) {
      const parts = parseStackPartSpecs([
        "backend:ruby:sinatra:ruby-api",
        `backend:${backend}:data-api`,
        `data-api.orm:${orm}`,
        "database:universal:sqlite",
      ]);
      expect(getRubyRecipeIssue({ stackParts: parts })).toBeNull();
      expect(validateStackParts(parts).issues).toEqual([]);
      expect(getStackPartOptions({ role: "database", ecosystem: "universal", parts })).toContain(
        "sqlite",
      );
      expect(stackPartsToLegacyProjectConfigPartial(parts).database).toBe("sqlite");
      expect(parts.find((part) => part.role === "orm")?.ownerPartId).toBe("data-api");
    }
    const standaloneGo = parseStackPartSpecs([
      "backend:go:gin",
      "backend.orm:go:gorm",
      "database:universal:sqlite",
    ]);
    expect(getRubyRecipeIssue({ stackParts: standaloneGo })).toBeNull();
    expect(validateStackParts(standaloneGo).issues).toEqual([]);
  });

  it("does not raise evidence from source availability", () => {
    const records = getCapabilityInventory().filter(
      (record) => record.ecosystem === "ruby" && record.optionId === "sinatra",
    );
    expect(records).toHaveLength(1);
    expect(records[0]?.evidenceLevel).toBe("listed");
    expect(records[0]?.maturity).toBe("experimental");
  });
});
