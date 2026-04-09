# Adding New Tool Options — Testing Guide

Complete reference for all test utilities, patterns, and which tests to update when adding a new option.

> Companion to [README.md](README.md).

---

## 1. Two Test APIs

The codebase uses two distinct APIs for testing generated projects:

### Integration tests (`runTRPCTest`)

Generates a real project on disk. Use for end-to-end validation including file content assertions.

```typescript
import { createCustomConfig, expectSuccess, runTRPCTest } from "./test-utils";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

test("opensearch with Hono backend", async () => {
  const result = await runTRPCTest(
    createCustomConfig({
      projectName: "opensearch-hono",
      frontend: ["tanstack-router"],
      backend: "hono",
      search: "opensearch",
    }),
  );
  expectSuccess(result);

  // File content assertions (disk-based)
  const projectDir = result.projectDir!;
  const helper = await readFile(join(projectDir, "apps/server/src/lib/search.ts"), "utf-8");
  const pkg = await readFile(join(projectDir, "apps/server/package.json"), "utf-8");
  const env = await readFile(join(projectDir, "apps/server/.env"), "utf-8");

  expect(helper).toContain("@opensearch-project/opensearch");
  expect(pkg).toContain('"@opensearch-project/opensearch"');
  expect(env).toContain("OPENSEARCH_NODE");
});
```

**When to use:** TypeScript ecosystem tests. Any test that needs to verify file contents, package.json dependencies, or .env variables.

### Virtual tree tests (`createVirtual`)

Generates a project in-memory (VirtualFileSystem). Use for Rust/Go/Python and structural assertions without disk I/O.

```typescript
import { createVirtual } from "../src/helpers/core/command-handlers";

// Helper functions (defined locally in test files, not centralized)
function findFile(node: VirtualNode, path: string): VirtualFile | undefined {
  if (node.type === "file") {
    const normalizedNodePath = node.path.replace(/^\/+/, "");
    const normalizedPath = path.replace(/^\/+/, "");
    return normalizedNodePath === normalizedPath ? node : undefined;
  }
  for (const child of node.children) {
    const found = findFile(child, path);
    if (found) return found;
  }
  return undefined;
}

function hasFile(node: VirtualNode, path: string): boolean {
  return findFile(node, path) !== undefined;
}

function getFileContent(node: VirtualNode, path: string): string | undefined {
  return findFile(node, path)?.content;
}

// Test
it("should include diesel crate when selected", async () => {
  const result = await createVirtual({
    projectName: "rust-diesel",
    ecosystem: "rust",
    rustWebFramework: "axum",
    rustOrm: "diesel",
    rustFrontend: "none",
    rustApi: "none",
    rustCli: "none",
    rustLibraries: [],
  });

  expect(result.success).toBe(true);
  const root = result.tree!.root;

  expect(hasFile(root, "Cargo.toml")).toBe(true);
  const content = getFileContent(root, "Cargo.toml");
  expect(content).toContain("diesel");
});
```

**When to use:** Rust/Go/Python tests. Faster than `runTRPCTest` (no disk I/O). Good for file structure assertions.

---

## 2. Test Utility Functions (`apps/cli/test/test-utils.ts`)

### Core utilities

```typescript
// Generate a full project on disk
runTRPCTest(config: TestConfig): Promise<TestResult>

// Assert success
expectSuccess(result: TestResult): void
// Logs error details on failure, then asserts result.success === true

// Assert failure
expectError(result: TestResult, expectedMessage?: string): void
// Asserts result.success === false, optionally checks error message

// Create config with minimal defaults
createBasicConfig(overrides?: Partial<TestConfig>): TestConfig
// Returns: { projectName: "test-app", yes: true, install: false, git: false, ...overrides }

// Create config with explicit fields (no --yes flag)
createCustomConfig(config: Partial<TestConfig>): TestConfig
// Returns: { projectName: "test-app", install: false, git: false, ...config }
```

### Auto-extracted schema values

`test-utils.ts` exports all enum values extracted from Zod schemas:

```typescript
export const AUTH_PROVIDERS = extractEnumValues(AuthSchema);
export const DATABASES = extractEnumValues(DatabaseSchema);
export const ORMS = extractEnumValues(ORMSchema);
export const BACKENDS = extractEnumValues(BackendSchema);
export const FRONTENDS = extractEnumValues(FrontendSchema);
export const SEARCH_ENGINES = extractEnumValues(SearchSchema);
// ... 20+ more for every category
```

Use these to write parametrized tests:

```typescript
const searchEngines = SEARCH_ENGINES.filter(s => s !== "none");
for (const engine of searchEngines) {
  test(`${engine} with Hono backend`, async () => {
    const result = await runTRPCTest(createCustomConfig({
      projectName: `search-${engine}`,
      frontend: ["tanstack-router"],
      backend: "hono",
      search: engine,
    }));
    expectSuccess(result);
  });
}
```

### `TestConfig` interface

```typescript
interface TestConfig {
  projectName?: string;
  ecosystem?: string;
  frontend?: string[];
  backend?: string;
  runtime?: string;
  database?: string;
  orm?: string;
  auth?: string;
  api?: string;
  search?: string;
  cms?: string;
  payments?: string;
  // ... all other ProjectConfig fields
  install?: boolean;     // Default: false
  git?: boolean;         // Default: false
  yes?: boolean;         // Default: true for createBasicConfig, undefined for createCustomConfig
  packageManager?: string;
  smokeDir?: string;     // Where to write generated project (default: testing/.smoke-output)
}
```

### `TestResult` interface

```typescript
interface TestResult {
  success: boolean;
  result?: any;           // Full generation result (when success)
  error?: string;         // Error message (when failure)
  projectDir?: string;    // Absolute path to generated project (when success)
  config: TestConfig;     // Original config
}
```

---

## 3. Which Tests to Update

### A. Auto-detection test (NO edits needed)

**File:** `apps/cli/test/cli-builder-sync.test.ts`

This test automatically enumerates all schema values and verifies they appear in the web builder, CLI prompts, and CLI flags. **You never edit this test.** If it fails after adding a new option, it means you missed a file elsewhere.

What it catches automatically:
- Schema value not in `TECH_OPTIONS` (constant.ts)
- Schema value not in CLI prompt options
- CLI flag missing for a category
- Label/alias mismatch between builder and metadata

**Run first after any change:**
```bash
bun test apps/cli/test/cli-builder-sync.test.ts
```

### Test placement map

Use the closest existing suite instead of inventing a new test file by default.

| Change type | Preferred test location |
|-------------|--------------------------|
| Schema/prompt/builder wiring parity | `apps/cli/test/cli-builder-sync.test.ts` |
| Hard CLI validation blocks | `apps/cli/test/basic-configurations.test.ts` |
| Preflight warnings | `apps/cli/test/preflight-validation.test.ts` |
| Auth capability / compatibility behavior | `apps/cli/test/auth-capabilities.test.ts` |
| Rust ecosystem generation / compatibility behavior | `apps/cli/test/rust-ecosystem.test.ts` |
| Python ecosystem generation behavior | `apps/cli/test/python-language.test.ts` |
| Go ecosystem generation / compatibility behavior | `apps/cli/test/go-language.test.ts` |
| Template output regression coverage | `apps/cli/test/template-snapshots.test.ts` |
| New option with no natural home in an existing suite | Create a dedicated test file only if the assertion does not fit cleanly anywhere above |

If a change affects multiple layers, use multiple suites. Do not overload snapshots with compatibility assertions or use `cli-builder-sync.test.ts` as a substitute for runtime/behavioral checks.

### B. Category test (MUST add test cases)

**File:** `apps/cli/test/<category>.test.ts`

Every new option needs at least:
1. One **basic generation test** — proves the option scaffolds without error
2. One **file content test** — proves templates output correct code and dependencies

**Pattern for existing category:**

```typescript
// apps/cli/test/search.test.ts
describe("OpenSearch", () => {
  test("opensearch with Hono backend", async () => {
    const result = await runTRPCTest(
      createCustomConfig({
        projectName: "opensearch-hono",
        frontend: ["tanstack-router"],
        backend: "hono",
        search: "opensearch",
      }),
    );
    expectSuccess(result);
  });

  test("opensearch with Express backend", async () => {
    const result = await runTRPCTest(
      createCustomConfig({
        projectName: "opensearch-express",
        frontend: ["tanstack-router"],
        backend: "express",
        runtime: "node",
        search: "opensearch",
      }),
    );
    expectSuccess(result);
  });

  test("opensearch generates correct dependencies and env vars", async () => {
    const result = await runTRPCTest(
      createCustomConfig({
        projectName: "opensearch-files",
        frontend: ["tanstack-router"],
        backend: "hono",
        search: "opensearch",
      }),
    );
    expectSuccess(result);

    const dir = result.projectDir!;
    const pkg = await readFile(join(dir, "apps/server/package.json"), "utf-8");
    const env = await readFile(join(dir, "apps/server/.env"), "utf-8");

    expect(pkg).toContain('"@opensearch-project/opensearch"');
    expect(env).toContain("OPENSEARCH_NODE");
  });
});
```

**Pattern for Rust/Go/Python option:**

```typescript
// apps/cli/test/rust-ecosystem.test.ts
describe("Rust Diesel ORM", () => {
  it("should generate project with diesel", async () => {
    const result = await createVirtual({
      projectName: "rust-diesel",
      ecosystem: "rust",
      rustWebFramework: "axum",
      rustOrm: "diesel",
      rustFrontend: "none",
      rustApi: "none",
      rustCli: "none",
      rustLibraries: [],
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;

    expect(hasFile(root, "Cargo.toml")).toBe(true);
    expect(hasFile(root, "crates/server/Cargo.toml")).toBe(true);

    const cargo = getFileContent(root, "Cargo.toml");
    expect(cargo).toContain("diesel");
  });
});
```

### C. Compatibility rule tests (MUST add when rules change)

If you change any of these files:
- `packages/types/src/compatibility.ts`
- `packages/template-generator/src/preflight-validation.ts`
- `apps/cli/src/utils/config-validation.ts`

then add or update tests in the corresponding suite:

- Disabled reasons / auto-adjustments: the nearest compatibility-focused suite such as `apps/cli/test/auth-capabilities.test.ts` or another domain-specific compatibility test
- Preflight warnings: `apps/cli/test/preflight-validation.test.ts`
- Hard CLI blocks: `apps/cli/test/basic-configurations.test.ts`

Do not stop at `cli-builder-sync.test.ts`. That test proves wiring, not behavioral correctness.

### D. Behavioral verification for generated code

For features that introduce new runtime behavior, add assertions that prove the generated code shape is correct, not just present.

This especially applies to:
- auth routes and middleware
- API client/server integrations
- deploy adapters and generated platform config
- framework-specific request/response handling

Examples of high-signal assertions:
- Generated route file contains the correct endpoint path and framework-specific decorator/helper
- Header/body/query extraction uses the framework's actual API rather than a placeholder function parameter
- Newly added dependencies are imported or referenced by generated code
- Generated config file contains the expected framework/output/rewrite values

Compile-only validation is not enough for these changes. A template can type-check and still be semantically wrong at runtime.

### E. Dependency-use sanity check

Whenever you add a new dependency in generator wiring:

1. Search the relevant templates for an actual import/reference to that package
2. Add a file-content assertion that proves the generated output uses it, or document clearly why the dependency is intentionally indirect

This catches dead starter dependencies such as "added to the manifest, never referenced by generated code".

### F. Snapshot test (SHOULD add combo)

**File:** `apps/cli/test/template-snapshots.test.ts`

Snapshot tests detect unexpected changes in generated file structure. Add one representative combo if the new option significantly changes the output:

```typescript
// In the appropriate section (TS, Rust, Go, or Python configs)
{
  name: "search-opensearch-hono",
  config: {
    frontend: ["tanstack-router"],
    backend: "hono",
    api: "trpc",
    database: "sqlite",
    orm: "drizzle",
    auth: "none",
    search: "opensearch",
  },
}
```

The minimum required fields for a TS snapshot config are: `frontend`, `backend`, `api`, `database`, `orm`, `auth`, plus whatever category you're testing. Look at existing entries in `template-snapshots.test.ts` for the full pattern.

After adding, update snapshots:
```bash
bun test apps/cli/test/template-snapshots.test.ts -u
```

### G. Template validation test (SHOULD include in combos)

**File:** `apps/cli/test/template-validation.test.ts`

This test runs many combinations and validates TypeScript syntax of generated files. If your option should work with multiple backends/frontends, ensure it appears in the combo arrays:

```typescript
// Existing pattern — combos are defined as arrays of configs
const SEARCH_CONFIGS = SEARCH_VALUES.filter(s => s !== "none").map(search => ({
  name: `search-${search}`,
  frontend: ["tanstack-router"],
  backend: "hono",
  search,
}));
```

Your new option will be auto-included if you added it to the schema (since `SEARCH_VALUES` derives from the enum).

### H. Preflight validation test (IF constrained)

**File:** `apps/cli/test/preflight-validation.test.ts`

Only needed if your option has compatibility constraints:

```typescript
test("opensearch warns with no backend", () => {
  const rules = validatePreflightConfig({
    search: "opensearch",
    backend: "none",
    frontend: ["tanstack-router"],
  });
  expect(rules.map(r => r.id)).toContain("search-no-server");
});
```

### I. Smoke test presets (OPTIONAL)

**File:** `testing/lib/presets.ts`

Add a preset if the option represents a major new combination worth testing in CI:

```typescript
"opensearch-hono": {
  ecosystem: "typescript",
  overrides: {
    search: "opensearch",
    frontend: ["tanstack-router"],
    backend: "hono",
    runtime: "bun",
    database: "sqlite",
    orm: "drizzle",
  },
},
```

Presets run in the weekly `template-matrix.yaml` CI workflow.

---

## 4. Test File Locations by Ecosystem

| Ecosystem | Test file | API used |
|-----------|-----------|----------|
| TypeScript (search, CMS, auth, etc.) | `apps/cli/test/<category>.test.ts` | `runTRPCTest` |
| Rust | `apps/cli/test/rust-ecosystem.test.ts` | `createVirtual` |
| Go | `apps/cli/test/go-language.test.ts` | `createVirtual` |
| Python | `apps/cli/test/python-language.test.ts` | `createVirtual` |
| Schema sync | `apps/cli/test/cli-builder-sync.test.ts` | N/A (schema inspection) |
| Snapshots | `apps/cli/test/template-snapshots.test.ts` | `createVirtual` |
| Validation | `apps/cli/test/template-validation.test.ts` | `runTRPCTest` |
| Preflight | `apps/cli/test/preflight-validation.test.ts` | Direct function calls |
| Smoke | `testing/smoke-test.ts` | CLI invocation |

---

## 5. Running Tests

```bash
# Single category test
bun test apps/cli/test/search.test.ts

# Schema sync (catches most omissions automatically)
bun test apps/cli/test/cli-builder-sync.test.ts

# Update snapshots after structural changes
bun test apps/cli/test/template-snapshots.test.ts -u

# Full test suite
bun test apps/cli/test/

# Full release validation (includes all of the above)
bun run test:release

# Web link/icon validation
bun run --cwd apps/web validate:tech-links
```

---

## 6. What Breaks If You Forget

| Missed file | Test that catches it | Error you'll see |
|-------------|---------------------|------------------|
| Schema enum value | Type errors at build time | `Type '"opensearch"' is not assignable to...` |
| constant.ts entry | `cli-builder-sync.test.ts` | `Options in CLI but NOT in Builder: opensearch` |
| Prompt option | `cli-builder-sync.test.ts` | `Prompt missing values: opensearch` |
| tech-icons.ts | `validate:tech-links` | `Missing icon for: opensearch` |
| tech-resource-links.ts | `validate:tech-links` | `Missing links for: opensearch` |
| add-deps.ts version | Generator runtime error | `Unknown dependency: @opensearch-project/opensearch` |
| Category test | Nothing (silent gap) | Broken generation discovered later |
| Snapshot test | Nothing (silent gap) | File structure regression undetected |

The first 5 are caught automatically. The last 2 require manual discipline — always add at least one test.
