# Adding New Tool/Library Options

Step-by-step guide covering every file that must be touched when adding a new tool or library option to any ecosystem. Organized by area and then by ecosystem-specific differences.

### Sub-guides

For deeper dives, see the companion files:

- **[Worked Example](worked-example.md)** — Complete end-to-end walkthrough adding `"opensearch"` to Search, with every file diff shown. Also shows every spot for a new category.
- **[Templates & Handlers](templates-and-handlers.md)** — `processTemplatesFromPrefix()` full reference, Handlebars helpers, conditional template patterns, and ecosystem-specific handler differences (Rust vs Go vs Python vs TypeScript).
- **[Testing](testing.md)** — Both test APIs (`runTRPCTest` vs `createVirtual`), utility functions, assertion patterns, and which tests auto-detect missing files.
- **[Routing Gotchas](routing-gotchas.md)** — Edge cases in backend routing, frontend detection, cross-feature interactions, and processor ordering that break real configurations.
- **[Compatibility Rules](compatibility-rules.md)** — When and how to add disabled reasons, auto-adjustments, hard blocks, and preflight warnings. Includes backend/frontend matrices for deploy targets and research checklist.

---

## Table of Contents

1. [Quick-Reference Checklist](#1-quick-reference-checklist)
2. [Scenario A: New Option in an Existing Category](#2-scenario-a-new-option-in-an-existing-category)
3. [Scenario B: Creating an Entirely New Category](#3-scenario-b-creating-an-entirely-new-category)
4. [Scenario C: Adding an Entirely New Language Ecosystem](#scenario-c-adding-an-entirely-new-language-ecosystem)
5. [Area-by-Area File Reference](#5-area-by-area-file-reference)
6. [Ecosystem-Specific Rules](#6-ecosystem-specific-rules)
7. [Test Updates Required](#7-test-updates-required)
8. [Build, Verification & Pre-Push Checklist](#8-build-verification--pre-push-checklist)
9. [Naming Conventions](#9-naming-conventions)
10. [AI Agent Pre-Merge Checklist](#10-ai-agent-pre-merge-checklist)
11. [Common Mistakes](#11-common-mistakes)

---

## 1. Quick-Reference Checklist

### Adding an option to an existing TypeScript category

| # | File | What to Add |
|---|------|-------------|
| 1 | `packages/types/src/schemas.ts` | New value in the Zod enum (e.g., `SearchSchema`) |
| 2 | `packages/types/src/option-metadata.ts` | Label override in `EXACT_LABEL_OVERRIDES` (if auto-humanize is wrong) |
| 3 | `packages/template-generator/src/utils/add-deps.ts` | Package version(s) in `dependencyVersionMap` |
| 4 | `packages/template-generator/src/processors/<cat>-deps.ts` | Dependency installation branch |
| 5 | `packages/template-generator/src/processors/env-vars.ts` | Environment variable entries |
| 6 | `packages/template-generator/templates/<cat>/<id>/` | `.hbs` template files |
| 7 | `packages/template-generator/src/template-handlers/<cat>.ts` | `processTemplatesFromPrefix()` call — **only if handler doesn't already use dynamic routing** (see note below) |
| 8 | `apps/cli/src/prompts/<cat>.ts` | Interactive prompt choice |
| 9 | `apps/web/src/lib/constant.ts` | `TECH_OPTIONS[category]` entry |
| 10 | `apps/web/src/lib/tech-icons.ts` | Icon registry entry |
| 11 | `apps/web/src/lib/tech-resource-links.ts` | Docs / GitHub URLs |
| 12 | `apps/cli/src/helpers/core/post-installation.ts` | Setup instructions (only if other options in the same category have them — be consistent) |
| 13 | `packages/types/src/compatibility.ts` | Disable rules (only if constrained) |
| 14 | `apps/cli/test/<cat>.test.ts` | At least one generation test |
| 15 | `apps/cli/test/template-snapshots.test.ts` | Representative snapshot combo |

**Note on handler edits (item 7):** Some handlers use **dynamic path routing** like `search/${config.search}/server/base` — they auto-discover new template directories without code changes. Before adding handler code, open the handler file and check if it already dispatches dynamically. If so, skip this step.

### Files also needed for NEW categories (in addition to above)

| # | File | What to Add |
|---|------|-------------|
| **CLI wiring** | | |
| 16 | `apps/cli/src/index.ts` | 4 spots: import, router input schema, prompt call, config mapping |
| 17 | `apps/cli/src/prompts/config-prompts.ts` | Import prompt function, add to `PromptGroupResults` type, add to navigable group, add to return mapping |
| 18 | `apps/cli/src/mcp.ts` | **6 spots:** import schema, add to `SCHEMA_MAP`, add to ecosystem categories, add to `buildProjectConfig()`, add to `buildCompatibilityInput()`, add to `bfs_plan_project`/`bfs_create_project` tool parameters |
| 19 | `apps/cli/src/utils/bts-config.ts` | Field mapping in both write and read paths of `writeBtsConfig()` |
| 20 | `apps/cli/src/constants.ts` | Ecosystem-aware default value — use a meaningful default when the category has a clear winner (e.g., Rust logging defaults to `"tracing"`, not `"none"`; use `"none"` only when no default makes sense) |
| 21 | `apps/cli/src/helpers/core/command-handlers.ts` | Add field with `"none"` default to error fallback config |
| 22 | `apps/cli/src/utils/generate-reproducible-command.ts` | Add `--<flag-name>` to reproduced command output |
| 23 | `apps/cli/src/utils/config-processing.ts` | Add type import + `processFlags()` branch for the new field |
| **Tests** | | |
| 24 | `apps/cli/test/generate-reproducible-command.test.ts` | Add field to `makeConfig()` defaults + update expected command strings |
| 25 | `apps/cli/test/add-history-commands.test.ts` | Add `--<flag> none` to CLI args and expected command in Python/Go/Rust history tests |
| **Compatibility** | | |
| 23 | `packages/types/src/compatibility.ts` | Add field to `CompatibilityInput` type + `getCategoryDisplayName()` |
| **Web builder** | | |
| 24 | `apps/web/src/lib/preview-config.ts` | Add field to `stackToConfig()` mapping (maps StackState → ProjectConfig for web preview) |
| 25 | `apps/web/src/lib/stack-defaults.ts` | Add field to `StackState` type and `DEFAULT_STACK` |
| 25 | `apps/web/src/lib/stack-url-keys.ts` | Short URL key (e.g., `rateLimiting: "rl"`) |
| 26 | `apps/web/src/lib/stack-url-state.ts` | 3 spots: `loadStackParams()`, `serializeStackParams()`, `searchToStack()` |
| 27 | `apps/web/src/lib/stack-utils.ts` | `TYPESCRIPT_CATEGORY_ORDER` + `generateStackCommand()` flags |
| **Smoke test wiring** | | |
| 28 | `testing/lib/generate-combos/options.ts` | Import `*_VALUES`, add `sampleScalar()` in `make*Draft()`, add default in base config |
| 29 | `testing/lib/presets.ts` | Add field to `makeBaseConfig()` so existing presets don't break |

See the [Worked Example](worked-example.md) for exact code at each spot.

### Adding an option to an existing Rust/Go/Python category

| # | File | What to Add |
|---|------|-------------|
| 1 | `packages/types/src/schemas.ts` | New value in the ecosystem Zod enum |
| 2 | `packages/types/src/option-metadata.ts` | Label override (if needed) |
| 3 | `packages/template-generator/templates/<eco>-base/` | Template conditionals in shared `.hbs` files + dependency entries in `Cargo.toml.hbs` / `go.mod.hbs` / `pyproject.toml.hbs` |
| 4 | `packages/template-generator/src/template-handlers/<eco>-base.ts` | **Only if feature gets its own directory** — web frameworks/ORMs use template conditionals (no handler change) |
| 5 | `apps/cli/src/prompts/<eco>-ecosystem.ts` | Interactive prompt choice |
| 6 | `apps/web/src/lib/constant.ts` | `TECH_OPTIONS` + `EXACT_LABEL_OVERRIDES` entry |
| 7 | `apps/web/src/lib/tech-icons.ts` | Icon entry |
| 8 | `apps/web/src/lib/tech-resource-links.ts` | Docs / GitHub URLs |
| 9 | `packages/template-generator/src/processors/readme-generator.ts` | Framework name/description for generated README |
| 10 | `packages/template-generator/src/processors/ai-docs-generator.ts` | Dev server command for generated CLAUDE.md (only when the new option changes the dev server invocation — e.g., Python FastAPI vs Flask, but NOT Go gin vs fiber which use the same `go run` command) |
| 11 | `apps/cli/src/helpers/core/post-installation.ts` | Framework run command and display name (check if other options have post-install) |
| 12 | `apps/cli/test/<eco>-language.test.ts` or `<eco>-ecosystem.test.ts` | Generation test |
| 13 | `apps/cli/test/template-snapshots.test.ts` | Snapshot combo |

**Go-specific gotchas when adding a web framework:**
- Existing `.hbs` files may have outer guards like `{{#if (or (eq goWebFramework "gin") (eq goWebFramework "echo"))}}` — **widen these** to include your new framework.
- Fiber's middleware packages (`logger`, `recover`, `cors`) collide with Go keywords and existing variable names — use **import aliases** like `fiberlogger`, `fiberrecover`, `fibercors`.
- Auth adapter patterns differ per framework: gin uses `gin.WrapH()`, echo uses `echo.WrapHandler()`, Fiber needs `github.com/gofiber/adaptor/v2` with `adaptor.HTTPHandler()` — this adds an extra dependency in `go.mod.hbs`.

---

## 2. Scenario A: New Option in an Existing Category

Use this when the category already exists (e.g., adding `algolia` to Search, adding `fiber` to Go Web Frameworks).

### Step 1 — Schema (always first)

**File:** `packages/types/src/schemas.ts`

Add the new value to the existing Zod enum:

```typescript
// TypeScript example — adding "algolia" to SearchSchema
export const SearchSchema = z
  .enum(["meilisearch", "typesense", "elasticsearch", "algolia", "none"])
  .describe("Search engine");

// Go example — adding "fiber" to GoWebFrameworkSchema
export const GoWebFrameworkSchema = z
  .enum(["gin", "echo", "fiber", "none"])
  .describe("Go web framework");
```

The `*_VALUES` exports auto-derive from the enum — no separate update needed:

```typescript
export const SEARCH_VALUES = SearchSchema.options;          // auto-updated
export const GO_WEB_FRAMEWORK_VALUES = GoWebFrameworkSchema.options; // auto-updated
```

**Also verify** the value appears in all three config schemas in the same file:
- `CreateInputSchema` (CLI input)
- `ProjectConfigSchema` (generator config)
- `BetterTStackConfigSchema` (bts.jsonc output)

### Step 2 — Option metadata

**File:** `packages/types/src/option-metadata.ts`

Add a label override only if the auto-humanize function produces the wrong display name:

```typescript
const EXACT_LABEL_OVERRIDES: Partial<Record<OptionCategory, Partial<Record<string, string>>>> = {
  search: {
    elasticsearch: "Elasticsearch",
    algolia: "Algolia",       // humanize("algolia") = "Algolia" — fine, but explicit is safer
  },
  goWebFramework: {
    fiber: "Fiber",
  },
};
```

Add CLI value overrides in `CLI_VALUE_OVERRIDES` only if the schema ID differs from the CLI flag value. Add aliases in `OPTION_ALIASES` only if backward compatibility requires it.

### Step 3 — Dependencies (TypeScript only)

For TypeScript tools, dependencies are managed programmatically via three files.

**File:** `packages/template-generator/src/utils/add-deps.ts`

Add every npm package and its pinned version to the central version map:

```typescript
export const dependencyVersionMap = {
  // ...existing entries
  "algoliasearch": "^5.20.0",
  "@algolia/client-search": "^5.20.0",
};
```

Missing versions cause a **build-time error** — the generator refuses to add unknown packages.

**File:** `packages/template-generator/src/processors/<cat>-deps.ts`

Add a branch in the category's dependency processor:

```typescript
// In search-deps.ts
export function processSearchDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const { search, frontend, backend } = config;
  if (!search || search === "none") return;

  const serverPath = getServerPackagePath(frontend, backend);

  if (search === "algolia") {
    addPackageDependency({
      vfs,
      packagePath: serverPath,
      dependencies: ["algoliasearch"],
    });
  }
  // ...existing branches for meilisearch, typesense, etc.
}
```

**Pattern rules:**
- Early return if `=== "none"` or feature not selected
- Use `getServerPackagePath()` / `getWebPackagePath()` from `utils/project-paths.ts`
- Use `addPackageDependency()` — never write package.json directly
- Separate `dependencies` (runtime) from `devDependencies` (types, CLI tools)

**File:** `packages/template-generator/src/processors/env-vars.ts`

Add environment variables in the matching `build*Vars()` function:

```typescript
// In buildServerVars()
if (search === "algolia") {
  vars.push(
    { key: "ALGOLIA_APP_ID", value: "", condition: true,
      comment: "Algolia App ID — https://dashboard.algolia.com/account/api-keys" },
    { key: "ALGOLIA_API_KEY", value: "", condition: true,
      comment: "Algolia Admin API Key" },
  );
}
```

**Env var naming rules by framework:**
| Framework | Client prefix | Example |
|-----------|--------------|---------|
| Next.js | `NEXT_PUBLIC_` | `NEXT_PUBLIC_ALGOLIA_APP_ID` |
| Nuxt | `NUXT_PUBLIC_` | `NUXT_PUBLIC_ALGOLIA_APP_ID` |
| SvelteKit | `PUBLIC_` | `PUBLIC_ALGOLIA_APP_ID` |
| Vite-based | `VITE_` | `VITE_ALGOLIA_APP_ID` |
| Server-only | (no prefix) | `ALGOLIA_API_KEY` |

### Step 3 alt — Dependencies (Rust/Go/Python)

Non-TypeScript ecosystems manage dependencies inside Handlebars templates, not via processor files.

**Rust** — edit `packages/template-generator/templates/rust-base/Cargo.toml.hbs`:
```toml
[workspace.dependencies]
{{#if (eq rustOrm "diesel")}}
diesel = { version = "2.2", features = ["postgres"] }
{{/if}}
```

**Go** — edit `packages/template-generator/templates/go-base/go.mod.hbs`:
```
require (
{{#if (eq goWebFramework "fiber")}}
    github.com/gofiber/fiber/v2 v2.52.0
{{/if}}
)
```

**Python** — edit `packages/template-generator/templates/python-base/pyproject.toml.hbs`:
```toml
dependencies = [
{{#if (eq pythonWebFramework "flask")}}
    "flask>=3.0",
{{/if}}
]
```

### Step 4 — Templates

**TypeScript** — create directory under the category:

```
packages/template-generator/templates/<category>/<option-id>/
  server/
    base/
      src/lib/<option-id>.ts.hbs      # Server-side integration
  web/
    react/
      src/components/Search.tsx.hbs    # React component (covers Next, TanStack, etc.)
    svelte/
      src/routes/search/+page.svelte.hbs
    solid/
      src/routes/search.tsx.hbs
    nuxt/
      app/pages/search.vue.hbs
```

**Template naming rules:**
- Directory name matches schema ID exactly (`algolia`, not `Algolia`)
- Use `.hbs` extension — removed after processing
- Use `_gitignore` for `.gitignore`, `_npmrc` for `.npmrc`
- Available Handlebars helpers: `eq`, `ne`, `not`, `and`, `or`, `includes`, `replace`

**Rust/Go/Python** — add files inside the existing `<eco>-base/` directory:

```
templates/rust-base/crates/server/src/search.rs.hbs     # Conditional on rustSearch
templates/go-base/internal/search/search.go.hbs          # Conditional on goSearch
templates/python-base/src/app/search.py.hbs              # Conditional on pythonSearch
```

### Step 5 — Template handler

**TypeScript** — update `packages/template-generator/src/template-handlers/<cat>.ts`:

```typescript
// In search.ts — add template prefix processing
if (config.search === "algolia") {
  processTemplatesFromPrefix(vfs, templates, "search/algolia/server/base", serverDir, config);
  if (hasReactWeb) {
    processTemplatesFromPrefix(vfs, templates, "search/algolia/web/react", webDir, config);
  }
}
```

**Rust/Go/Python** — the handler change depends on whether your feature gets its own **directory** or shares **existing files**:

**Option A — Feature gets its own directory** (e.g., a new CLI framework that lives in `cmd/my-cli/`):
Update `packages/template-generator/src/template-handlers/<eco>-base.ts` to add a directory skip:

```typescript
// In go-base.ts — add boolean + add skip
const hasNewCli = config.goCli === "my-cli";
// ...later in the loop...
if (!hasNewCli && templatePath.includes("cmd/my-cli/")) continue;
```

**Option B — Feature shares existing files** (e.g., a new web framework or ORM):
**No handler changes needed.** Web frameworks and ORMs share the same template files (`main.go.hbs`, `handlers.go.hbs`, `Cargo.toml.hbs`) and use Handlebars conditionals inside them:

```handlebars
{{!-- In main.go.hbs — add a new framework branch --}}
{{#if (eq goWebFramework "fiber")}}
import "github.com/gofiber/fiber/v2"

func main() {
    app := fiber.New()
    // ...
}
{{/if}}
```

**Rule of thumb:** Directory skipping is for **optional modules** (gRPC proto, CLI tools, TUI apps, Rust frontend crates). Web frameworks, ORMs, and similar core choices are handled via **template-level conditionals in shared files**.

### Step 6 — CLI prompt

**TypeScript** — edit `apps/cli/src/prompts/<cat>.ts`:

```typescript
// In search.ts
const options = [
  { value: "algolia" as const, label: "Algolia", hint: "Managed search-as-a-service with instant search and analytics" },
  // ...existing options
  { value: "none" as const, label: "None", hint: "No search engine" },
];
```

**Rust/Go/Python** — edit `apps/cli/src/prompts/<eco>-ecosystem.ts`:

```typescript
// In go-ecosystem.ts, inside getGoWebFrameworkChoice()
const options = [
  { value: "gin" as const, label: "Gin", hint: "..." },
  { value: "echo" as const, label: "Echo", hint: "..." },
  { value: "fiber" as const, label: "Fiber", hint: "Express.js-like API built on FastHTTP" },
  { value: "none" as const, label: "None", hint: "No web framework" },
];
```

**Rules:**
- Always use `as const` for value typing
- Always include a `"none"` option
- Prompt functions return early if value already provided (non-interactive mode)
- Use `navigableSelect` for single-choice, `navigableMultiselect` for multi-choice

### Step 7 — Web builder

**File:** `apps/web/src/lib/constant.ts`

Add entry to the `TECH_OPTIONS` object under the matching category key:

```typescript
search: [
  // ...existing entries
  {
    id: "algolia",
    name: "Algolia",
    description: "Managed search-as-a-service with instant search, faceting, and analytics",
    icon: "https://cdn.simpleicons.org/algolia/003DFF",
    color: "from-blue-400 to-blue-600",
  },
],
```

**File:** `apps/web/src/lib/tech-icons.ts`

```typescript
algolia: { type: "si", slug: "algolia", hex: "003DFF" },
// OR for local SVG:
algolia: { type: "local", src: "/icon/algolia.svg", needsInvert: "dark" },
```

If using a local icon, place the SVG at `apps/web/public/icon/algolia.svg`.

**File:** `apps/web/src/lib/tech-resource-links.ts`

```typescript
algolia: {
  docsUrl: "https://www.algolia.com/doc/",
  githubUrl: "https://github.com/algolia/algoliasearch-client-javascript",
},
```

### Step 8 — Post-install instructions (if needed)

**File:** `apps/cli/src/helpers/core/post-installation.ts`

Add setup guidance if the tool requires user action after scaffolding:

```typescript
if (config.search === "algolia") {
  steps.push({
    title: "Algolia",
    instructions: [
      "Create an account at https://dashboard.algolia.com",
      "Copy your App ID and Admin API Key",
      "Set ALGOLIA_APP_ID and ALGOLIA_API_KEY in .env",
    ],
  });
}
```

### Step 9 — Compatibility rules (if constrained)

**File:** `packages/types/src/compatibility.ts`

Only needed if the option has framework restrictions:

```typescript
// Example: Algolia requires a server backend
if (search === "algolia" && backend === "none") {
  return "Algolia requires a server backend";
}
```

---

## 3. Scenario B: Creating an Entirely New Category

Everything from Scenario A, plus these additional files:

### Additional schema work

**File:** `packages/types/src/schemas.ts`

Create the new Zod schema and add it to all three config schemas:

```typescript
// 1. Define the schema
export const RateLimitingSchema = z
  .enum(["upstash-ratelimit", "arcjet", "none"])
  .describe("Rate limiting library");

// 2. Export values
export const RATE_LIMITING_VALUES = RateLimitingSchema.options;

// 3. Add to CreateInputSchema
export const CreateInputSchema = z.object({
  // ...existing
  rateLimiting: RateLimitingSchema.optional(),
});

// 4. Add to ProjectConfigSchema
export const ProjectConfigSchema = z.object({
  // ...existing
  rateLimiting: RateLimitingSchema,
});

// 5. Add to BetterTStackConfigSchema
export const BetterTStackConfigSchema = z.object({
  // ...existing
  rateLimiting: RateLimitingSchema.optional(),
});
```

**File:** `packages/types/src/types.ts`

Export the inferred type:

```typescript
export type RateLimiting = z.infer<typeof RateLimitingSchema>;
```

### New processor file

**File:** `packages/template-generator/src/processors/rate-limiting-deps.ts` (create)

```typescript
import type { ProjectConfig } from "@better-fullstack/types";
import type { VirtualFileSystem } from "../core/virtual-fs";
import { addPackageDependency } from "../utils/add-deps";
import { getServerPackagePath } from "../utils/project-paths";

export function processRateLimitingDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const { rateLimiting, frontend, backend } = config;
  if (!rateLimiting || rateLimiting === "none") return;
  if (backend === "none") return;

  const serverPath = getServerPackagePath(frontend, backend);
  if (!vfs.exists(serverPath)) return;

  if (rateLimiting === "upstash-ratelimit") {
    addPackageDependency({
      vfs, packagePath: serverPath,
      dependencies: ["@upstash/ratelimit", "@upstash/redis"],
    });
  }
  if (rateLimiting === "arcjet") {
    addPackageDependency({
      vfs, packagePath: serverPath,
      dependencies: ["@arcjet/node"],
    });
  }
}
```

**File:** `packages/template-generator/src/processors/index.ts`

Import and wire into the pipeline:

```typescript
import { processRateLimitingDeps } from "./rate-limiting-deps";

export function processDependencies(vfs: VirtualFileSystem, config: ProjectConfig): void {
  // ...existing processors
  processRateLimitingDeps(vfs, config);    // Add at the end or in logical order
}
```

### New template handler

**File:** `packages/template-generator/src/template-handlers/rate-limiting.ts` (create)

```typescript
import type { ProjectConfig } from "@better-fullstack/types";
import type { VirtualFileSystem } from "../core/virtual-fs";
import type { TemplateData } from "../core/template-loader";
import { processTemplatesFromPrefix } from "../core/template-processor";

export async function processRateLimitingTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  if (!config.rateLimiting || config.rateLimiting === "none") return;
  if (config.backend === "none") return;

  const targetDir = config.backend === "self" ? "apps/web" : "apps/server";

  processTemplatesFromPrefix(
    vfs, templates,
    `rate-limiting/${config.rateLimiting}/server/base`,
    targetDir, config,
  );
}
```

**File:** `packages/template-generator/src/template-handlers/index.ts`

Re-export the handler:

```typescript
export { processRateLimitingTemplates } from "./rate-limiting";
```

**File:** `packages/template-generator/src/generator.ts`

Call the handler in the TypeScript generation flow:

```typescript
// Inside the else branch (TypeScript ecosystem)
await processRateLimitingTemplates(vfs, templates, config);
```

### New CLI prompt file

**File:** `apps/cli/src/prompts/rate-limiting.ts` (create)

```typescript
import { isCancel } from "@clack/prompts";
import type { RateLimiting } from "@better-fullstack/types";
import { navigableSelect } from "../ui/navigable-select";
import { exitCancelled } from "../utils/exit";

export async function getRateLimitingChoice(rateLimiting?: RateLimiting): Promise<RateLimiting> {
  if (rateLimiting !== undefined) return rateLimiting;

  const options = [
    { value: "upstash-ratelimit" as const, label: "Upstash Ratelimit", hint: "Serverless Redis-based rate limiting" },
    { value: "arcjet" as const, label: "Arcjet", hint: "Security-focused: rate limiting + bot detection" },
    { value: "none" as const, label: "None", hint: "No rate limiting" },
  ];

  const response = await navigableSelect<RateLimiting>({
    message: "Select rate limiting library",
    options,
    initialValue: "none",
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");
  return response;
}
```

Wire it into `apps/cli/src/index.ts` — **4 spots** (use existing `search` entries as a landmark):

```typescript
// Spot 1 — Import (top of file, near other schema imports)
import { RateLimitingSchema } from "@better-fullstack/types";
import { getRateLimitingChoice } from "./prompts/rate-limiting";

// Spot 2 — Router input schema (inside the z.object(), after search)
rateLimiting: RateLimitingSchema.optional().describe("Rate limiting library"),

// Spot 3 — Interactive prompt call (before config construction)
const rateLimiting = await getRateLimitingChoice(options.rateLimiting);

// Spot 4 — Config construction (inside createVirtual(), after search)
rateLimiting: options.rateLimiting || "none",
```

### MCP server schema

**File:** `apps/cli/src/mcp.ts`

Add to `SCHEMA_MAP` (hardcoded record mapping field names to Zod schemas):

```typescript
rateLimiting: RateLimitingSchema,
```

Also add to the `bfs_plan_project` and `bfs_create_project` tool parameter definitions in the same file.

### bts.jsonc config writer

**File:** `apps/cli/src/utils/bts-config.ts`

Add the field mapping inside `writeBtsConfig()`:

```typescript
rateLimiting: projectConfig.rateLimiting,
```

### Additional web builder files for new categories

**File:** `apps/web/src/lib/stack-defaults.ts`

Add default value in `DEFAULT_STACK`:

```typescript
rateLimiting: "none",
```

**File:** `apps/web/src/lib/constant.ts`

Add category to `ECOSYSTEM_CATEGORIES`:

```typescript
const ECOSYSTEM_CATEGORIES: Record<string, OptionCategory[]> = {
  typescript: [
    // ...existing
    "rateLimiting",    // Add in logical order
  ],
};
```

**File:** `apps/web/src/lib/stack-url-keys.ts`

Add URL key mapping:

```typescript
rateLimiting: "rl",    // Short key for URL encoding
```

**File:** `apps/web/src/lib/stack-url-state.ts`

Three spots (use existing `search` entries as landmarks):

```typescript
// In loadStackParams()
rateLimiting: getString("rateLimiting", DEFAULT_STACK.rateLimiting),

// In serializeStackParams()
addParam("rateLimiting", stack.rateLimiting);

// In searchToStack()
rateLimiting: search.rl ?? DEFAULT_STACK.rateLimiting,
```

**File:** `apps/web/src/lib/stack-utils.ts`

Two spots:

```typescript
// In TYPESCRIPT_CATEGORY_ORDER array
"rateLimiting",

// In generateStackCommand() flags array
`--rate-limiting ${stack.rateLimiting}`,
```

### New category within an existing non-TS ecosystem (e.g., `GoAuthSchema`)

1. Create the schema in `schemas.ts` (same pattern as Scenario B above)
2. Add prompt function to `apps/cli/src/prompts/<eco>-ecosystem.ts`
3. Add template files to `templates/<eco>-base/`
4. Update conditional logic in `template-handlers/<eco>-base.ts` (only if the feature needs its own directory)
5. Update `<eco>-base/*.hbs` dependency files (Cargo.toml / go.mod / pyproject.toml)
6. Add web builder entries (constant.ts, icons, links)
7. Wire into `apps/cli/src/index.ts` (4 spots — same as TS new category)
8. Wire into `apps/cli/src/mcp.ts` and `apps/cli/src/utils/bts-config.ts`

---

## Scenario C: Adding an Entirely New Language Ecosystem

Use this when adding a language that doesn't exist yet (e.g., Java, Elixir, C#). This is the largest task — expect 40-50 files.

### Checklist

| # | File | What to Add |
|---|------|-------------|
| **Schema layer** | | |
| 1 | `packages/types/src/schemas.ts` | Add `"java"` to `EcosystemSchema`. Create `JavaWebFrameworkSchema`, `JavaOrmSchema`, etc. Add all to `CreateInputSchema`, `ProjectConfigSchema`, `BetterTStackConfigSchema`. Export `*_VALUES`. |
| 2 | `packages/types/src/types.ts` | Export inferred types (`JavaWebFramework`, `JavaOrm`, etc.) |
| 3 | `packages/types/src/option-metadata.ts` | Add `CATEGORY_VALUE_IDS` entries and label overrides for all Java categories |
| **Template generator** | | |
| 4 | `packages/template-generator/templates/java-base/` | Create entire template directory: manifest file (`pom.xml.hbs` or `build.gradle.kts.hbs`), source directories, config files |
| 5 | `packages/template-generator/src/template-handlers/java-base.ts` | Create monolithic handler (follow Go pattern: boolean+skip+empty-file-skip) |
| 6 | `packages/template-generator/src/template-handlers/index.ts` | Re-export the new handler |
| 7 | `packages/template-generator/src/generator.ts` | Add `else if (config.ecosystem === "java")` branch calling `processJavaBaseTemplate()`. Note: `processReadme()` and `processAiDocs()` run after and are shared across all ecosystems — no change needed there. |
| **CLI** | | |
| 8 | `apps/cli/src/prompts/java-ecosystem.ts` | Create prompt file with `getJavaWebFrameworkChoice()`, `getJavaOrmChoice()`, etc. |
| 9 | `apps/cli/src/prompts/config-prompts.ts` | Import Java prompt functions, add to `PromptGroupResults`, add to navigable group, add to return mapping |
| 10 | `apps/cli/src/index.ts` | Register all Java-prefixed Commander flags (`--java-web-framework`, `--java-orm`, etc.), add schema imports, add prompt calls (gated by `ecosystem === "java"`), add config mapping |
| 11 | `apps/cli/src/mcp.ts` | **6 spots per category:** import schema, add to `SCHEMA_MAP`, add to ecosystem categories, add to `buildProjectConfig()`, add to `buildCompatibilityInput()`, add to tool parameters |
| 12 | `apps/cli/src/utils/bts-config.ts` | Add all Java field mappings to both write and read paths |
| 13 | `apps/cli/src/constants.ts` | Add ecosystem-aware defaults for all Java categories |
| 14 | `apps/cli/src/helpers/core/command-handlers.ts` | Add all Java fields with `"none"` defaults to error fallback config |
| 15 | `apps/cli/src/utils/generate-reproducible-command.ts` | Add all Java flags to reproduced command output |
| 16 | `apps/cli/src/helpers/core/post-installation.ts` | Add Java-specific setup instructions (Maven/Gradle, JDK version, etc.) |
| 17 | `packages/template-generator/src/processors/readme-generator.ts` | Add Java framework descriptions and commands for generated README |
| 18 | `packages/template-generator/src/processors/ai-docs-generator.ts` | Add Java dev server commands for generated CLAUDE.md |
| **Compatibility** | | |
| 19 | `packages/types/src/compatibility.ts` | Add all Java fields to `CompatibilityInput` type + `getCategoryDisplayName()` |
| **Web builder** | | |
| 20 | `apps/web/src/lib/constant.ts` | Add `"java"` to ecosystem options. Add all Java `TECH_OPTIONS` categories. Add `java: [...]` to `ECOSYSTEM_CATEGORIES`. Add label overrides. |
| 21 | `apps/web/src/lib/tech-icons.ts` | Add icons for all Java tools |
| 22 | `apps/web/src/lib/tech-resource-links.ts` | Add docs/GitHub URLs for all Java tools |
| 23 | `apps/web/src/lib/preview-config.ts` | Add all `java*` fields to `stackToConfig()` mapping |
| 24 | `apps/web/src/lib/stack-defaults.ts` | Add all `java*` fields to `StackState` type and `DEFAULT_STACK` with `"none"` defaults |
| 24 | `apps/web/src/lib/stack-url-keys.ts` | Add short URL keys for all Java categories (`javaWebFramework: "jwf"`, etc.) |
| 25 | `apps/web/src/lib/stack-url-state.ts` | Add all Java fields to `loadStackParams()`, `serializeStackParams()`, `searchToStack()` |
| 26 | `apps/web/src/lib/stack-utils.ts` | Add `JAVA_CATEGORY_ORDER` array, add `generateJavaCommand()` function, register in ecosystem dispatch |
| **Tests** | | |
| 27 | `apps/cli/test/java-ecosystem.test.ts` | Create test file using `createVirtual` API (same pattern as `rust-ecosystem.test.ts`) |
| 28 | `apps/cli/test/template-snapshots.test.ts` | Add Java snapshot configs |
| 29 | `apps/cli/test/cli-builder-sync.test.ts` | No edit needed — auto-detects from schema |

### Design decisions for the new handler

Choose one of three handler patterns based on project structure:

| Pattern | When to use | Empty file skip? |
|---------|-------------|------------------|
| **Rust-style** (boolean+skip, no empty-file-skip) | When the ecosystem has many conditional modules that must always produce a file | No |
| **Go-style** (boolean+skip, with empty-file-skip) | When some templates are entirely conditional and should auto-drop | Yes (recommended default) |
| **Python-style** (template-only conditionals) | When the project has minimal conditional directories — all logic in `.hbs` files | Yes |

For most new ecosystems, the **Go-style pattern** is the safest default.

### What the guidelines cannot cover

The hardest part of adding a new ecosystem is writing the **template content** — the actual Java/Elixir/C# code inside `.hbs` files. This requires:
- Domain expertise in the target language and frameworks
- Understanding of the language's build system (Maven, Gradle, Mix, MSBuild)
- Knowledge of the language's project structure conventions
- Idiomatic patterns for routing, ORM setup, auth, etc.

Study the existing `rust-base/`, `go-base/`, and `python-base/` templates as structural references, then write language-specific code using framework documentation.

---

## 4. Area-by-Area File Reference

### Types & Schemas

| File | Purpose | When to edit |
|------|---------|--------------|
| `packages/types/src/schemas.ts` | Zod enums, config schemas, value exports | Always |
| `packages/types/src/types.ts` | TypeScript type aliases (inferred from Zod) | New category only |
| `packages/types/src/option-metadata.ts` | Labels, aliases, CLI value overrides | When auto-humanize is wrong or aliases exist |
| `packages/types/src/compatibility.ts` | `getDisabledReason()`, `analyzeStackCompatibility()` | When option has framework constraints |
| `packages/types/src/capabilities.ts` | Capability definitions (auth, addons) | When option uses capability-based selection |

### Template Generator

| File | Purpose | When to edit |
|------|---------|--------------|
| `packages/template-generator/src/utils/add-deps.ts` | Central version map for all npm packages | Every new TS dependency |
| `packages/template-generator/src/processors/<cat>-deps.ts` | Dependency injection per category | Every new TS option |
| `packages/template-generator/src/processors/env-vars.ts` | `.env` file generation | When tool needs env vars |
| `packages/template-generator/src/processors/index.ts` | Processor pipeline orchestration | New category only |
| `packages/template-generator/src/template-handlers/<cat>.ts` | Template file routing | When templates exist |
| `packages/template-generator/src/template-handlers/index.ts` | Handler re-exports | New category only |
| `packages/template-generator/src/generator.ts` | Main generation pipeline | New category only |
| `packages/template-generator/src/post-process/package-configs.ts` | Script & pkg.json mutations | When tool needs custom scripts |
| `packages/template-generator/src/post-process/catalogs.ts` | pnpm/bun catalog dedup | Rarely (auto-handled) |
| `packages/template-generator/templates/<cat>/<id>/` | Handlebars template files | Every new TS option with templates |
| `packages/template-generator/templates/<eco>-base/` | Non-TS ecosystem templates | Every new Rust/Go/Python option |

### CLI

| File | Purpose | When to edit |
|------|---------|--------------|
| `apps/cli/src/index.ts` | Commander flags, schema wiring, prompt calls, config mapping (4 spots) | New category only; existing categories already wired |
| `apps/cli/src/prompts/<cat>.ts` | Interactive prompt for TS categories | Every new TS option |
| `apps/cli/src/prompts/<eco>-ecosystem.ts` | Interactive prompt for Rust/Go/Python | Every new non-TS option |
| `apps/cli/src/prompts/config-prompts.ts` | Prompt group wiring (imports, `PromptGroupResults`, return mapping) | New category only |
| `apps/cli/src/helpers/core/post-installation.ts` | Post-scaffold setup instructions + framework display name | When user action needed, or when other options in same category have post-install |
| `apps/cli/src/mcp.ts` | **5 spots:** import, `SCHEMA_MAP`, ecosystem categories, config builder, tool parameters | New category only |
| `apps/cli/src/utils/bts-config.ts` | `writeBtsConfig()` field mapping (write + read paths) | New category only |
| `apps/cli/src/constants.ts` | Ecosystem-aware default values | New category only |
| `apps/cli/src/helpers/core/command-handlers.ts` | Error fallback config (`"none"` for new fields) | New category only |
| `apps/cli/src/utils/generate-reproducible-command.ts` | `--flag-name` in reproduced command output | New category only |

### Template Generator (non-TS specific)

| File | Purpose | When to edit |
|------|---------|--------------|
| `packages/template-generator/src/processors/readme-generator.ts` | Framework name/description in generated README | Every non-TS option that changes framework/tool name |
| `packages/template-generator/src/processors/ai-docs-generator.ts` | Dev server command in generated CLAUDE.md | Every non-TS option that changes run commands |

### Web Builder

| File | Purpose | When to edit |
|------|---------|--------------|
| `apps/web/src/lib/constant.ts` | `TECH_OPTIONS`, `ECOSYSTEM_CATEGORIES`, label overrides | Always |
| `apps/web/src/lib/tech-icons.ts` | Icon registry (SimpleIcons CDN or local SVG) | Always |
| `apps/web/src/lib/tech-resource-links.ts` | Docs URL, GitHub URL | Always |
| `apps/web/public/icon/<id>.svg` | Local SVG icon file | When not using SimpleIcons |
| `apps/web/src/lib/stack-defaults.ts` | `DEFAULT_STACK` default value | New category only |
| `apps/web/src/lib/stack-url-keys.ts` | URL param short keys | New category only |
| `apps/web/src/lib/stack-url-state.ts` | URL state serialization (3 spots: load, serialize, search) | New category only |
| `apps/web/src/lib/stack-utils.ts` | Category ordering + command generation flags | New category only |

---

## 5. Ecosystem-Specific Rules

### TypeScript

- **Dependency management:** Programmatic via `add-deps.ts` version map + processor files. Never hardcode versions in templates.
- **Monorepo structure:** Dependencies target specific workspace packages (`apps/web`, `apps/server`, `packages/db`, etc.). Use `getServerPackagePath()` / `getWebPackagePath()` to resolve paths.
- **Template organization:** `templates/<category>/<option>/server/base/` for server code, `templates/<category>/<option>/web/<framework>/` for frontend code with framework-specific variants (react, svelte, solid, nuxt).
- **Env var prefixes:** Framework-dependent (`NEXT_PUBLIC_`, `VITE_`, `PUBLIC_`, `NUXT_PUBLIC_`). Handle all variants in `env-vars.ts`.
- **Post-processing:** After templates, `processPackageConfigs()` adds scripts, `processDependencies()` adds packages, `processEnvVariables()` writes `.env` files. These are TypeScript-only.
- **Conditional rendering:** Use Handlebars helpers in `.hbs` files: `{{#if (eq backend "hono")}}`, `{{#if (includes frontend "next")}}`.

### Rust

- **Dependency management:** Inline in `Cargo.toml.hbs` using Handlebars conditionals. No processor files.
- **Project structure:** Cargo workspace with `crates/` subdirectories. Each feature gets its own crate.
- **Template handler:** `template-handlers/rust-base.ts` uses **boolean flags + path-based skipping**. Computes flags like `hasLeptos`, `hasTonic` then skips directories: `if (!hasLeptos && path.includes("crates/client/")) continue;`
- **Conditional features:** 6 conditional crate directories (client, dioxus-client, proto, cli, tui, graphql).
- **Empty file behavior: Does NOT skip empty files** — if a `.hbs` file renders to empty, it's still written. This means Rust templates must be self-contained and should not rely on empty-file filtering.
- **Env vars:** Defined in `templates/rust-base/.env.example` (not programmatic).
- **Schemas use prefix:** `RustWebFrameworkSchema`, `RustOrmSchema`, etc.
- **Array fields:** `rustLibraries` is an array — use `{{#if (includes rustLibraries "serde")}}` not `eq`.
- **Adding a new optional module** (e.g., a new Rust frontend crate): Add a boolean (`const hasX = config.rustX === "value"`), add a directory skip (`if (!hasX && path.includes("crates/x/")) continue`), and create templates in `templates/rust-base/crates/x/`.
- **Adding a new option to an existing category** (e.g., a new web framework or ORM): **No handler changes.** Add Handlebars conditionals (`{{#if (eq rustWebFramework "rocket")}}`) inside existing shared template files like `main.rs.hbs` and `Cargo.toml.hbs`. Web frameworks and ORMs share files — they are NOT directory-gated.

### Go

- **Dependency management:** Inline in `go.mod.hbs` using Handlebars conditionals. No processor files.
- **Project structure:** Standard Go layout (`cmd/`, `internal/`, `proto/`). No workspace system.
- **Template handler:** `template-handlers/go-base.ts` uses boolean+skip for 3 **optional module** directories only (proto, cmd/cli, cmd/tui). Web frameworks and ORMs are NOT directory-gated.
- **Empty file behavior: Skips empty files** — if a `.hbs` file renders to empty after conditional processing, the file is silently dropped.
- **Env vars:** Defined in `templates/go-base/.env.example.hbs`.
- **Schemas use prefix:** `GoWebFrameworkSchema`, `GoOrmSchema`, etc.
- **Adding a new optional module** (e.g., a new CLI framework): Add boolean + directory skip in `go-base.ts`, create templates in a new directory.
- **Adding a new option to an existing category** (e.g., a new web framework): **No handler changes.** Add `{{#if (eq goWebFramework "fiber")}}` conditionals inside `main.go.hbs`, `handlers.go.hbs`, and `go.mod.hbs`. Existing gin/echo blocks show the exact pattern to replicate.

### Python

- **Dependency management:** Inline in `pyproject.toml.hbs` using Handlebars conditionals. No processor files.
- **Project structure:** Modern `src/` layout with `pyproject.toml`. Alembic for migrations.
- **Template handler:** `template-handlers/python-base.ts` has **NO handler-level conditionals** — all conditional logic lives entirely in the `.hbs` template files. This is the simplest handler.
- **Empty file behavior: Skips empty files** — same as Go.
- **Env vars:** Defined in `templates/python-base/.env.example`.
- **Schemas use prefix:** `PythonWebFrameworkSchema`, `PythonOrmSchema`, etc.
- **Array fields:** `pythonAi` is an array — use `includes`, not `eq`.
- **Adding a new feature:** No handler changes needed. Add conditionals directly in `.hbs` template files. If a file should only exist for certain options, wrap its entire content in a conditional — it'll be auto-dropped when empty.

### Key architectural difference

TypeScript uses a **modular pipeline** (20+ processors, 20+ template handlers, programmatic deps). Rust/Go/Python each use a **single monolithic template handler** with conditional paths and template-based dependency management.

| Behavior | Rust | Go | Python | TypeScript |
|----------|------|-----|--------|------------|
| Handler type | Monolithic | Monolithic | Monolithic | Modular (per category) |
| Optional modules (new dirs) | Handler-level path skips | Handler-level path skips | Template-only conditionals | `processTemplatesFromPrefix()` calls |
| Core options (frameworks, ORMs) | Template conditionals in shared files | Template conditionals in shared files | Template conditionals in shared files | Separate template directories per option |
| Empty file skipping | **NO** | YES | YES | YES |
| Adding new optional module | Handler edit (boolean + skip) | Handler edit (boolean + skip) | **No** (wrap in conditional) | New handler + generator.ts call |
| Adding option to existing category | **No** (template conditionals only) | **No** (template conditionals only) | **No** (template conditionals only) | Handler edit (new prefix call) |
| Dependency file | `Cargo.toml.hbs` | `go.mod.hbs` | `pyproject.toml.hbs` | Programmatic (add-deps.ts + processors) |

See [Templates & Handlers guide](templates-and-handlers.md) for full handler code, `processTemplatesFromPrefix()` reference, and Handlebars conditional patterns.

See [Routing Gotchas](routing-gotchas.md) for edge cases that affect ~40-50% of real configurations: Convex backend skips, self-backend routing, frontend array detection patterns, and processor ordering.

---

## 6. Test Updates Required

### Auto-detection tests (catch missing files automatically)

**File:** `apps/cli/test/cli-builder-sync.test.ts`

This test **auto-discovers** all schema values and verifies they exist in the web builder. It catches:
- New option added to schema but missing from `constant.ts`
- New option in builder but missing from schema
- Prompt file missing the option
- CLI flag missing for the category

**You don't need to edit this test** — it will fail automatically if you miss a file. Run it to verify:

```bash
bun test apps/cli/test/cli-builder-sync.test.ts
```

### Manual test additions

**File:** `apps/cli/test/<cat>.test.ts` (TypeScript) or `apps/cli/test/<eco>-language.test.ts` (non-TS)

Add at least one generation test. Use `runTRPCTest` for TypeScript, `createVirtual` for Rust/Go/Python:

```typescript
// TypeScript — integration test (disk-based)
import { createCustomConfig, expectSuccess, runTRPCTest } from "./test-utils";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

test("algolia with Hono backend", async () => {
  const result = await runTRPCTest(
    createCustomConfig({
      projectName: "algolia-hono",
      frontend: ["tanstack-router"],
      backend: "hono",
      search: "algolia",
    }),
  );
  expectSuccess(result);

  const pkg = await readFile(join(result.projectDir!, "apps/server/package.json"), "utf-8");
  expect(pkg).toContain('"algoliasearch"');
});
```

```typescript
// Rust/Go/Python — virtual tree test (in-memory)
import { createVirtual } from "../src/helpers/core/command-handlers";

it("should include diesel when selected", async () => {
  const result = await createVirtual({
    projectName: "rust-diesel",
    ecosystem: "rust",
    rustWebFramework: "axum",
    rustOrm: "diesel",
    rustFrontend: "none", rustApi: "none", rustCli: "none", rustLibraries: [],
  });
  expect(result.success).toBe(true);

  // Virtual tree assertions (no disk I/O)
  const root = result.tree!.root;
  const cargo = getFileContent(root, "Cargo.toml"); // helper defined in test file
  expect(cargo).toContain("diesel");
});
```

See [Testing guide](testing.md) for full test utility reference, both APIs, and assertion patterns.

**File:** `apps/cli/test/template-snapshots.test.ts`

Add a representative combo to snapshot configs:

```typescript
// TypeScript snapshots (lines 13-183)
{
  name: "search-algolia-hono",
  config: {
    frontend: ["tanstack-router"],
    backend: "hono",
    api: "trpc",
    database: "sqlite",
    orm: "drizzle",
    auth: "none",
    search: "algolia",
  },
}

// Rust snapshots (lines 253-290)
{
  name: "rust-axum-diesel",
  config: {
    ecosystem: "rust",
    rustWebFramework: "axum",
    rustOrm: "diesel",
  },
}
```

**File:** `apps/cli/test/template-validation.test.ts`

Add the new option to combo arrays so it's tested with multiple frontends/backends:

```typescript
const SEARCH_CONFIGS: TSConfig[] = SEARCH_VALUES.filter(s => s !== "none").map(search => ({
  name: `search-${search}`,
  frontend: ["tanstack-router"],
  backend: "hono",
  search,
  // ...
}));
```

**File:** `apps/cli/test/preflight-validation.test.ts`

If the option has compatibility constraints:

```typescript
test("algolia warns with no backend", () => {
  const rules = validatePreflightConfig({ search: "algolia", backend: "none" });
  expect(rules.map(r => r.id)).toContain("search-no-server");
});
```

### Random combo generator (REQUIRED for new categories)

The smoke test randomly generates project combos by sampling from schema value arrays. **New options in existing categories are auto-discovered** (the generator imports `*_VALUES` from the schema). But **new categories** must be wired into the generator manually.

**File:** `testing/lib/generate-combos/options.ts`

For a new category (e.g., `rustLogging`):

1. Import the values constant:
```typescript
import { RUST_LOGGING_VALUES } from "@better-fullstack/types";
```

2. Add sampling in the ecosystem's `make*Draft()` function:
```typescript
rustLogging: sampleScalar(RUST_LOGGING_VALUES, 0.15),
```
The second argument is the "none" probability (0.15 = 15% chance of "none").

3. Add default in the base config (same file):
```typescript
rustLogging: "tracing",
```

**File:** `testing/lib/presets.ts`

Add the field to `makeBaseConfig()` so existing presets don't break:
```typescript
rustLogging: "tracing",
```

**Why this matters:** Without wiring into the combo generator, the new tool is never randomly tested. The schema value exists, the CLI accepts it, but no smoke test ever exercises it. Bugs in template conditionals go undetected until a user hits them.

### How auto-discovery works for existing categories

When you add a new option to an **existing** category (e.g., `"algolia"` to `SearchSchema`), the combo generator automatically picks it up because:
- It imports `SEARCH_VALUES` from `@better-fullstack/types`
- `SEARCH_VALUES` derives from the Zod enum
- `sampleScalar(SEARCH_VALUES, 0.9)` randomly selects from all values including the new one

No code changes needed in the generator for existing-category additions.

### CI validation

Tests run automatically on every PR via:
- `.github/workflows/test.yaml` — runs `bun run test:release`, `bun run validate:tech-links`
- `.github/workflows/template-matrix.yaml` — runs smoke tests for curated presets (weekly/manual)

No manual CI edits needed unless adding a new preset to the weekly matrix.

---

## 8. Build, Verification & Pre-Push Checklist

Run these after making changes. Order matters. **Every step must pass before committing.**

### Step 1 — Rebuild (always run the full chain)

```bash
# Rebuild types first (schemas changed), then downstream
bun run --filter=@better-fullstack/types build
bun run --filter=@better-fullstack/template-generator generate-templates
bun run --filter=@better-fullstack/template-generator build
bun run --filter=create-better-fullstack build
```

### Step 2 — Auto-sync test (catches missing builder/prompt/schema entries)

```bash
bun test apps/cli/test/cli-builder-sync.test.ts
```

If this fails, you missed a file. Check the error message — it tells you exactly which option is missing from which file.

### Step 3 — Type check both apps

```bash
bun run --cwd apps/cli check-types
bun run --cwd apps/web typecheck
```

If web typecheck fails with "Property 'X' is missing," you forgot to add your new field to `preview-config.ts` or `stack-defaults.ts`.

### Step 4 — Category-specific tests

```bash
# For TypeScript categories:
bun test apps/cli/test/<cat>.test.ts

# For Rust/Go/Python:
bun test apps/cli/test/<eco>-language.test.ts
# or
bun test apps/cli/test/<eco>-ecosystem.test.ts
```

### Step 5 — Snapshot update (CRITICAL — this is what breaks CI most often)

```bash
# Generate/update snapshots
bun test apps/cli/test/template-snapshots.test.ts -u

# Verify they pass cleanly now
bun test apps/cli/test/template-snapshots.test.ts
```

**You MUST commit the updated `.snap` file.** This is the #1 CI failure cause:
- Adding a snapshot config in `template-snapshots.test.ts` without running `-u` = missing `.snap` entry
- Changing templates that affect existing snapshots without running `-u` = stale `.snap` content
- The `.snap` file lives at `apps/cli/test/__snapshots__/template-snapshots.test.ts.snap`

### Step 6 — Release guard (mirrors CI exactly)

```bash
bun run test:release
```

This runs the same checks as CI's "Release Guard" job: snapshot verification, CLI/builder parity, and preview-config validation.

### Step 7 — Web validation

```bash
bun run --cwd apps/web lint
bun run --cwd apps/web validate:tech-links
```

Catches missing icon entries and broken docs/GitHub links.

### Pre-commit checklist

Before running `git add` and `git commit`, verify:

- [ ] All 7 steps above pass
- [ ] The `.snap` file is staged (`git add apps/cli/test/__snapshots__/`)
- [ ] No placeholder `// ...other required fields` in test configs
- [ ] Template `.hbs` files have trailing newlines
- [ ] New Handlebars `{{#if}}` and `{{/if}}` are balanced (count them in large files)

### What CI runs (so you know what will fail remotely)

| CI Job | What it checks | Local equivalent |
|--------|---------------|------------------|
| **Lint** | `turbo lint` across all packages | `bun run --cwd apps/cli check-types && bun run --cwd apps/web typecheck` |
| **Test** | `bun run test:coverage` (all 2500+ tests) | `bun test apps/cli/test/` |
| **Release Guard** | Snapshot verification + CLI/builder parity | `bun run test:release` |
| **Build Check** | Full build of all packages | Step 1 above |
| **Smoke Test** | Curated preset generation | `bun run test:smoke -- --preset <name>` |
| **CodeQL** | Security analysis | (runs remotely only) |

---

## 8. Naming Conventions

| Element | Convention | Examples |
|---------|-----------|----------|
| Schema ID (Zod enum value) | lowercase kebab-case | `"algolia"`, `"upstash-ratelimit"`, `"better-auth"` |
| Schema name | PascalCase + `Schema` suffix | `SearchSchema`, `GoWebFrameworkSchema` |
| Values export | SCREAMING_SNAKE + `_VALUES` | `SEARCH_VALUES`, `GO_WEB_FRAMEWORK_VALUES` |
| Type alias | PascalCase | `Search`, `GoWebFramework` |
| Template directory | matches schema ID exactly | `templates/search/algolia/` |
| Processor file | `<category>-deps.ts` | `search-deps.ts`, `rate-limiting-deps.ts` |
| Handler file | `<category>.ts` | `search.ts`, `rate-limiting.ts` |
| Prompt file (TS) | `<category>.ts` | `search.ts`, `rate-limiting.ts` |
| Prompt file (non-TS) | `<ecosystem>-ecosystem.ts` | `rust-ecosystem.ts`, `go-ecosystem.ts` |
| Prompt function | `get<Category>Choice` | `getSearchChoice`, `getGoWebFrameworkChoice` |
| Test file | `<category>.test.ts` | `search.test.ts`, `go-language.test.ts` |
| Icon (SimpleIcons) | `{ type: "si", slug, hex }` | `{ type: "si", slug: "algolia", hex: "003DFF" }` |
| Icon (local SVG) | `{ type: "local", src }` | `{ type: "local", src: "/icon/algolia.svg" }` |
| Dependency map key | exact npm package name | `"algoliasearch"`, `"@arcjet/node"` |
| CLI flag | `--<kebab-case>` | `--search`, `--rate-limiting` |
| Env var (server) | `SCREAMING_SNAKE` | `ALGOLIA_API_KEY` |
| Env var (client) | framework prefix + name | `NEXT_PUBLIC_ALGOLIA_APP_ID` |

---

## 10. AI Agent Pre-Merge Checklist

Use this section as the final review gate before you consider a tool-option PR "done". This is intentionally optimized for AI agents, not humans doing broad product review.

- Schema parity: every new option/category added to `schemas.ts` is wired through the actual config shapes that consume it.
- Builder parity: `cli-builder-sync.test.ts` would pass because the option exists in CLI prompts, web builder constants, labels, and flags.
- Compatibility parity: every newly allowed combo is backed by handler routing and real template directories; compatibility files never advertise unsupported paths.
- Dependency parity: every newly added dependency is either used by generated output or explicitly justified as indirect support.
- Runtime parity: new generated behavior has at least one semantic assertion, not just snapshot or compile coverage.
- Constraint parity: any new disabled reason, auto-adjustment, hard block, or preflight warning has a matching test in the appropriate suite.
- Deploy parity: any claimed deploy target support is backed by templates, dependency/setup wiring, and at least one scaffolded combo.
- Non-TS parity: README/AI-doc generators and post-install instructions reflect the new framework/tool when those outputs change.
- Smoke parity: new categories are wired into combo generation and presets so they do not disappear from random coverage.
- Drift check: docs and examples do not point at deleted or non-existent files/tests.

If any one of those checks fails, the PR is not finished. The usual failure mode in this repo is not "feature absent", it is "feature selectable but only partially generated".

## 11. Common Mistakes

These are the most frequently missed files based on git history analysis and real validation runs across all 4 ecosystems:

| Mistake | Consequence | How to catch |
|---------|-------------|--------------|
| Missing schema enum value | CLI rejects the flag, type errors | `bun run --cwd apps/cli check-types` |
| Missing `constant.ts` entry | Option not visible in web builder | `cli-builder-sync.test.ts` auto-fails |
| Missing `tech-icons.ts` entry | Broken icon in builder UI | `validate:tech-links` script |
| Missing `tech-resource-links.ts` entry | Broken docs/GitHub links | `validate:tech-links` script |
| Missing `add-deps.ts` version | Build-time error during generation | Generator throws on unknown package |
| Missing prompt option | Not offered in interactive mode | `cli-builder-sync.test.ts` prompt coverage |
| Wrong env var prefix | Client can't read env var at runtime | Manual testing per framework |
| Forgot `generate-templates` after `.hbs` edit | Templates not included in build | Stale output, test failures |
| Forgot to rebuild `packages/types` | Downstream packages use stale types | Type errors in CLI/web |
| Missing test combo | Broken generation discovered in production | Smoke test or user report |
| Compatibility updated without matching handler/template coverage | Builder allows a combo the generator cannot actually emit | Compare `compatibility.ts` changes against handler branches and template directories; add a scaffold combo for every newly allowed frontend/backend family |
| Template dir name doesn't match schema ID | Handler can't find templates | Empty generated output |
| New dependency added but never referenced in generated code | Dead dependency, misleading starter, unnecessary install weight | Search templates for imports/usages and add a file-content assertion |
| Runtime feature only checked by compile/snapshot tests | Semantically wrong generated code ships despite passing CI | Add behavioral file assertions for routes, headers, body parsing, rewrites, and framework-specific helpers |
| Forgot trailing newline in `.hbs` file | Linting warnings | Previous audit fixed 52 files — keep the habit |
| **New cat:** missing `config-prompts.ts` wiring | Prompt never called in interactive mode | Type error on missing `PromptGroupResults` field |
| **New cat:** missing `mcp.ts` updates (5 spots) | MCP server can't scaffold with new option | Manual MCP testing |
| **New cat:** missing `constants.ts` default | Wrong default used when option not specified | Behavioral bug in non-interactive mode |
| **New cat:** missing `command-handlers.ts` fallback | Type error on error path | `check-types` fails |
| **New cat:** missing `generate-reproducible-command.test.ts` update | Reproducible command test has stale assertion (missing new flag) | `bun test apps/cli/test/generate-reproducible-command.test.ts` |
| **Non-TS:** missing `readme-generator.ts` branch | Generated README references wrong framework | Manual inspection of generated project |
| **Non-TS:** missing `ai-docs-generator.ts` branch | Generated CLAUDE.md has wrong dev command | Manual inspection of generated project |
| **Go:** forgot to widen `.hbs` outer guards | New framework option generates empty handlers file | `createVirtual` test with content assertion |
| Editing handler when template conditionals suffice | Unnecessary code; may break empty-file-skip logic | Review handler before editing |
| **New cat:** missing `generate-combos/options.ts` wiring | New category never randomly tested by smoke tests — bugs go undetected | Import `*_VALUES`, add `sampleScalar()` in `make*Draft()`, add default |
| **#1 CI killer:** Snapshot file not committed | Added snapshot config in test but didn't run `-u` or didn't `git add` the `.snap` file — Release Guard fails | Run `bun test apps/cli/test/template-snapshots.test.ts -u` then `git add apps/cli/test/__snapshots__/` |
| **Go/Rust:** Unbalanced `{{#if}}`/`{{/if}}` in large `.hbs` files | New framework block inserted inside another block's unclosed conditional — breaks ALL generation for that ecosystem | Count `{{#if` and `{{/if}}` in the file after editing; they must match. Search for the previous framework's closing `{{/if}}` before inserting. |
| **New cat:** missing `config-processing.ts` branch | CLI silently ignores the `--flag` value, always prompts interactively | `bun run --cwd apps/cli check-types` (type error on missing property) |
| **New cat:** missing `add-history-commands.test.ts` update | History command test has stale expected output (missing new flag) | Now caught by `test:release` |
| **New cat:** missing `generate-reproducible-command.test.ts` update | Reproducible command test has stale assertion | Now caught by `test:release` |
| **Cross-PR:** Duplicate keys in `tech-resource-links.ts` or `tech-icons.ts` | Rebase brings in entries from another merged PR, your branch adds the same key | `bun run --cwd apps/web lint` (oxlint catches duplicate object keys) |

### The golden rule

**Always run `cli-builder-sync.test.ts` after changes.** It auto-discovers every schema value and verifies it exists in the builder, prompts, and CLI flags. If it passes, you've covered the most common omissions.

```bash
bun test apps/cli/test/cli-builder-sync.test.ts
```

### The second golden rule

**Never widen compatibility beyond emitted template coverage.** If a new combo is selectable, the handler branches, template directories, dependency wiring, and tests must already exist for it.
