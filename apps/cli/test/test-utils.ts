import { expect } from "bun:test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { SMOKE_DIR } from "./setup";

import type {
  CreateInput,
  InitResult,
} from "../src/types";

import { create } from "../src/index";
import {
  AuthSchema,
  DatabaseSchema,
  DatabaseSetupSchema,
  ExamplesSchema,
  PackageManagerSchema,
  ServerDeploySchema,
  WebDeploySchema,
  createCliDefaultProjectConfigBase,
} from "../src/types";

// Default smoke directory path - keep in sync with setup preload.
const DEFAULT_SMOKE_DIR = SMOKE_DIR;
const SHARED_TEST_DEFAULTS = createCliDefaultProjectConfigBase("bun");

function createTestCoreDefaults(): Partial<CreateInput> {
  return {
    ecosystem: SHARED_TEST_DEFAULTS.ecosystem,
    frontend: [...SHARED_TEST_DEFAULTS.frontend],
    backend: SHARED_TEST_DEFAULTS.backend,
    runtime: SHARED_TEST_DEFAULTS.runtime,
    api: SHARED_TEST_DEFAULTS.api,
    database: SHARED_TEST_DEFAULTS.database,
    orm: SHARED_TEST_DEFAULTS.orm,
    auth: "none",
    payments: SHARED_TEST_DEFAULTS.payments,
    addons: ["none"],
    examples: ["none"],
    dbSetup: SHARED_TEST_DEFAULTS.dbSetup,
    webDeploy: SHARED_TEST_DEFAULTS.webDeploy,
    serverDeploy: SHARED_TEST_DEFAULTS.serverDeploy,
    cssFramework: SHARED_TEST_DEFAULTS.cssFramework,
    uiLibrary: "none",
    effect: SHARED_TEST_DEFAULTS.effect,
    email: SHARED_TEST_DEFAULTS.email,
    fileUpload: SHARED_TEST_DEFAULTS.fileUpload,
    stateManagement: SHARED_TEST_DEFAULTS.stateManagement,
    forms: SHARED_TEST_DEFAULTS.forms,
    testing: SHARED_TEST_DEFAULTS.testing,
    validation: SHARED_TEST_DEFAULTS.validation,
    realtime: SHARED_TEST_DEFAULTS.realtime,
    animation: SHARED_TEST_DEFAULTS.animation,
    logging: SHARED_TEST_DEFAULTS.logging,
    observability: SHARED_TEST_DEFAULTS.observability,
    caching: SHARED_TEST_DEFAULTS.caching,
    rateLimit: SHARED_TEST_DEFAULTS.rateLimit,
    i18n: SHARED_TEST_DEFAULTS.i18n,
    search: SHARED_TEST_DEFAULTS.search,
    vectorDb: SHARED_TEST_DEFAULTS.vectorDb,
    fileStorage: SHARED_TEST_DEFAULTS.fileStorage,
    cms: SHARED_TEST_DEFAULTS.cms,
    ai: SHARED_TEST_DEFAULTS.ai,
    jobQueue: SHARED_TEST_DEFAULTS.jobQueue,
    analytics: SHARED_TEST_DEFAULTS.analytics,
    featureFlags: SHARED_TEST_DEFAULTS.featureFlags,
    mobileNavigation: SHARED_TEST_DEFAULTS.mobileNavigation,
    mobileUI: SHARED_TEST_DEFAULTS.mobileUI,
    mobileStorage: SHARED_TEST_DEFAULTS.mobileStorage,
    mobileTesting: SHARED_TEST_DEFAULTS.mobileTesting,
    mobilePush: SHARED_TEST_DEFAULTS.mobilePush,
    mobileOTA: SHARED_TEST_DEFAULTS.mobileOTA,
    mobileDeepLinking: SHARED_TEST_DEFAULTS.mobileDeepLinking,
    aiDocs: [],
  };
}

const CORE_STACK_FLAGS = Object.keys(createTestCoreDefaults()) as Array<keyof CreateInput>;

export interface TestResult {
  success: boolean;
  result?: InitResult;
  error?: string;
  projectDir?: string;
  config: TestConfig;
}

export interface TestConfig extends CreateInput {
  projectName?: string;
  expectError?: boolean;
  expectedErrorMessage?: string;
  /** Custom smoke directory path (defaults to apps/cli/.smoke) */
  smokeDir?: string;
}

/**
 * Run test using the programmatic create() API instead of the router.
 * The create() API runs in silent mode and returns JSON instead of calling process.exit().
 */
export async function runTRPCTest(config: TestConfig): Promise<TestResult> {
  // Use custom smoke directory if provided, otherwise use default
  const smokeDir = config.smokeDir ?? DEFAULT_SMOKE_DIR;

  // Ensure smoke directory exists (may be called before global setup in some cases)
  try {
    await mkdir(smokeDir, { recursive: true });
  } catch {
    // Directory may already exist
  }

  const projectName = config.projectName || "default-app";
  const projectPath = join(smokeDir, projectName);

  const hasSpecificCoreConfig = CORE_STACK_FLAGS.some((flag) => config[flag] !== undefined);

  // Only use --yes if no core stack flags are provided and not explicitly disabled
  const willUseYesFlag = config.yes !== undefined ? config.yes : !hasSpecificCoreConfig;

  // Provide defaults for missing core stack options to avoid prompts
  // But don't provide core stack defaults when yes: true is explicitly set
  const coreStackDefaults = willUseYesFlag
    ? {}
    : createTestCoreDefaults();

  // Build options object - let the CLI handle all validation
  // Remove test-specific properties before passing to create()
  const {
    projectName: _,
    expectError: __,
    expectedErrorMessage: ___,
    smokeDir: ____,
    ...restConfig
  } = config;

  const options: Partial<CreateInput> = {
    install: config.install ?? false,
    // Git is expensive and not required for most integration checks.
    git: config.git ?? false,
    packageManager: config.packageManager ?? "bun",
    directoryConflict: "overwrite",
    disableAnalytics: true,
    yes: willUseYesFlag,
    // Always provide ecosystem to avoid prompting (it's required for all tests)
    ecosystem: config.ecosystem ?? "typescript",
    ...coreStackDefaults,
    ...restConfig,
  };

  // Use the programmatic create() API which runs in silent mode
  // and returns JSON errors instead of calling process.exit()
  const result = await create(projectPath, options);

  return {
    success: result.success,
    result: result.success ? result : undefined,
    error: result.success ? undefined : result.error,
    projectDir: result.success ? result.projectDirectory : undefined,
    config,
  };
}

export function expectSuccess(result: TestResult) {
  if (!result.success) {
    console.error("Test failed:");
    console.error("Error:", result.error);
    if (result.result) {
      console.error("Result:", result.result);
    }
  }
  expect(result.success).toBe(true);
  expect(result.result).toBeDefined();
}

export function expectError(result: TestResult, expectedMessage?: string) {
  expect(result.success).toBe(false);
  if (expectedMessage) {
    expect(result.error).toContain(expectedMessage);
  }
}

// Helper function to create properly typed test configs
export function createTestConfig(
  config: Partial<TestConfig> & { projectName: string },
): TestConfig {
  return config as TestConfig;
}

/**
 * Extract enum values from a Zod enum schema
 */
export function extractEnumValues<T extends string>(schema: {
  options: readonly T[];
}): readonly T[] {
  return schema.options;
}

// Test data generators inferred from Zod schemas
export const PACKAGE_MANAGERS = extractEnumValues(PackageManagerSchema);
export const DATABASES = extractEnumValues(DatabaseSchema);
export const EXAMPLES = extractEnumValues(ExamplesSchema);
export const AUTH_PROVIDERS = extractEnumValues(AuthSchema);
export const WEB_DEPLOYS = extractEnumValues(WebDeploySchema);
export const SERVER_DEPLOYS = extractEnumValues(ServerDeploySchema);
export const DB_SETUPS = extractEnumValues(DatabaseSetupSchema);

// Convenience functions for common test patterns
export function createBasicConfig(overrides: Partial<TestConfig> = {}): TestConfig {
  return {
    projectName: "test-app",
    yes: true, // Use defaults
    install: false,
    git: false,
    ...overrides,
  };
}

export function createCustomConfig(config: Partial<TestConfig>): TestConfig {
  return {
    projectName: "test-app",
    install: false,
    git: false,
    ...config,
  };
}
