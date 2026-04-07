# Adding New Tool Options — Template & Handler Guide

Deep reference for `processTemplatesFromPrefix()`, Handlebars conventions, and writing conditional templates across ecosystems.

> Companion to [README.md](README.md).

---

## 1. `processTemplatesFromPrefix()` — Full Reference

**Location:** `packages/template-generator/src/core/template-processor.ts`

### Signature

```typescript
function processTemplatesFromPrefix(
  vfs: VirtualFileSystem,        // Virtual file system to write output
  templates: TemplateData,        // Map<string, string> — all loaded template contents
  prefix: string,                 // e.g., "search/algolia/server/base"
  destPrefix: string,             // e.g., "apps/server"
  config: ProjectConfig,          // Full project config (passed to Handlebars as context)
  excludePrefixes: string[] = [], // Optional prefixes to skip within the match
): void
```

### How it works

1. **Prefix matching:** Iterates the `templates` Map and selects all keys that start with `prefix + "/"`.
2. **Exclude filtering:** Skips any template whose path starts with any of the `excludePrefixes`.
3. **Path rewriting:** Strips the `prefix` from the template path and prepends `destPrefix`.
   - Template key: `search/algolia/server/base/src/lib/search.ts.hbs`
   - With prefix `search/algolia/server/base` and destPrefix `apps/server`
   - Output path: `apps/server/src/lib/search.ts` (`.hbs` stripped)
4. **Filename transformation:** `_gitignore` becomes `.gitignore`, `_npmrc` becomes `.npmrc`, `.hbs` extension is removed.
5. **Handlebars processing:** If the file ends in `.hbs`, the content is compiled as a Handlebars template with the full `ProjectConfig` as context. Non-`.hbs` files are copied as-is.
6. **Empty file filtering:** If the processed output is an empty string (all content was behind unmatched conditionals), the file is **silently skipped** — not written to VFS.
7. **Binary file handling:** Files matching binary extensions (images, fonts, etc.) are stored with a `"[Binary file]"` placeholder and the original source path for later extraction.

### Key behaviors to remember

| Behavior | Detail |
|----------|--------|
| Prefix must match from start | `"search/algolia"` matches `"search/algolia/server/..."` but NOT `"cms/search/algolia/..."` |
| Trailing slash is auto-normalized | `"search/algolia/"` and `"search/algolia"` are equivalent |
| Nested paths are preserved | `server/base/src/lib/search.ts.hbs` keeps its full directory structure under destPrefix |
| Empty output = no file | A `.hbs` file that renders to whitespace-only is not written |
| `excludePrefixes` is path-prefix based | Use to carve out subdirectories: `excludePrefixes: ["search/algolia/server/base/src/experimental"]` |

### When to use `excludePrefixes`

Rarely. Most handlers just call `processTemplatesFromPrefix` multiple times with different prefixes to target different subdirectories. Use `excludePrefixes` only when you need to process most of a directory tree but skip a specific subtree.

---

## 2. Available Handlebars Helpers

**Registered in:** `packages/template-generator/src/core/template-processor.ts`

| Helper | Signature | Example |
|--------|-----------|---------|
| `eq` | `(a, b) => a === b` | `{{#if (eq backend "hono")}}` |
| `ne` | `(a, b) => a !== b` | `{{#if (ne auth "none")}}` |
| `not` | `(a) => !a` | `{{#if (not hasDatabase)}}` |
| `and` | `(...args) => all truthy` | `{{#if (and hasDb hasAuth)}}` |
| `or` | `(...args) => any truthy` | `{{#if (or isNext isTanstack)}}` |
| `includes` | `(arr, val) => arr.includes(val)` | `{{#if (includes frontend "next")}}` |
| `replace` | `(str, find, repl)` | `{{replace projectName "-" "_"}}` |

### Context variables

The full `ProjectConfig` object is passed as the Handlebars context. Common fields:

```
projectName, ecosystem, database, orm, backend, runtime,
frontend (array), auth, api, search, cms, payments, email,
caching, fileStorage, fileUpload, analytics, featureFlags,
logging, observability, testing, stateManagement, validation,
effect, forms, animation, addons (array), examples (array),
aiDocs, webDeploy, serverDeploy, packageManager, dbSetup,
cssFramework, uiLibrary, ...
```

For non-TS ecosystems:
```
rustWebFramework, rustFrontend, rustOrm, rustApi, rustCli, rustLibraries (array)
pythonWebFramework, pythonOrm, pythonValidation, pythonAi (array), pythonTaskQueue, pythonQuality
goWebFramework, goOrm, goApi, goCli, goLogging
```

---

## 3. Writing Conditional Templates

### Pattern A: Simple single conditional

Most templates use this — one feature gate:

```handlebars
{{#if (eq search "algolia")}}
import { algoliasearch } from "algoliasearch";

const client = algoliasearch(process.env.ALGOLIA_APP_ID!, process.env.ALGOLIA_API_KEY!);

export { client as searchClient };
{{/if}}
```

### Pattern B: Mutually exclusive branches

Common for imports that differ by backend/framework:

```handlebars
{{#if (eq backend "hono")}}
import { Hono } from "hono";
const app = new Hono();
{{/if}}
{{#if (eq backend "express")}}
import express from "express";
const app = express();
{{/if}}
{{#if (eq backend "fastify")}}
import Fastify from "fastify";
const app = Fastify();
{{/if}}
```

Note: Handlebars has no native `else if`. Use separate `{{#if}}` blocks for mutually exclusive enums — only one will match since the config value is a single string.

### Pattern C: Nested conditionals (backend x api x auth)

Real-world pattern from backend server templates:

```handlebars
{{#if (eq api "trpc")}}
import { appRouter } from "@{{projectName}}/api";
import { createContext } from "@{{projectName}}/api";
  {{#if (eq backend "hono")}}
import { trpcServer } from "@hono/trpc-server";

app.use("/api/trpc/*", trpcServer({ router: appRouter, createContext }));
  {{/if}}
  {{#if (eq backend "express")}}
import { createExpressMiddleware } from "@trpc/server/adapters/express";

app.use("/api/trpc", createExpressMiddleware({ router: appRouter, createContext }));
  {{/if}}
{{/if}}

{{#if (eq api "orpc")}}
import { appRouter } from "@{{projectName}}/api";
  {{#if (eq backend "hono")}}
import { RPCHandler } from "@orpc/server/hono";

const handler = new RPCHandler(appRouter);
app.use("/api/rpc/*", (c) => handler.handle(c));
  {{/if}}
{{/if}}

{{#if (eq auth "better-auth")}}
import { auth } from "@{{projectName}}/auth";
  {{#if (eq backend "hono")}}
app.on(["GET", "POST"], "/api/auth/**", (c) => auth.handler(c.req.raw));
  {{/if}}
  {{#if (eq backend "express")}}
import { toNodeHandler } from "better-auth/node";

app.all("/api/auth/*", toNodeHandler(auth));
  {{/if}}
{{/if}}
```

**Key pattern:** Outer conditional selects the feature (api, auth). Inner conditional adapts to the backend framework. This is the standard approach — there is no macro system to abstract it.

### Pattern D: Array field checks with `includes`

For multi-select fields like `frontend`, `addons`, `rustLibraries`, `pythonAi`:

```handlebars
{{#if (includes frontend "next")}}
/** @type {import('next').NextConfig} */
const nextConfig = {};
export default nextConfig;
{{/if}}

{{#if (includes pythonAi "langchain")}}
from app.langchain_client import chat, chat_stream
{{/if}}

{{#if (includes rustLibraries "serde")}}
serde = { version = "1", features = ["derive"] }
{{/if}}
```

### Pattern E: Compound conditions

Use `and` and `or` for complex gates:

```handlebars
{{#if (and (includes examples "ai") (or (eq runtime "bun") (eq runtime "node")))}}
import { streamText } from "ai";
{{/if}}

{{#if (and (eq auth "better-auth") (ne payments "none"))}}
import { stripePlugin } from "@better-auth/stripe";
{{/if}}

{{#if (or (eq backend "hono") (eq backend "elysia"))}}
// Bun-native backends
{{/if}}
```

### Pattern F: Preventing unused variables (noUnusedLocals)

Generated TypeScript runs through `tsc --noEmit`. Unused imports/variables cause errors. Use underscore prefix for intentionally unused params:

```handlebars
{{#if (eq auth "better-auth")}}
export function createContext({ context }: { context: Context }) {
  return { session: context.session };
}
{{else}}
export function createContext(_opts: { context: Context }) {
  return {};
}
{{/if}}
```

---

## 4. Ecosystem-Specific Handler Differences

### TypeScript (modular handlers)

Each category has its own handler file. The handler calls `processTemplatesFromPrefix()` to route template directories to output directories.

```typescript
// packages/template-generator/src/template-handlers/search.ts
export async function processSearchTemplates(
  vfs: VirtualFileSystem, templates: TemplateData, config: ProjectConfig,
): Promise<void> {
  if (!config.search || config.search === "none") return;
  if (config.backend === "convex") return;
  if (config.backend === "none") return;

  const serverDir = config.backend === "self" ? "apps/web" : "apps/server";

  // Route server-side templates
  processTemplatesFromPrefix(vfs, templates, `search/${config.search}/server/base`, serverDir, config);

  // Route frontend templates (framework-specific)
  const hasReactWeb = config.frontend.some(f =>
    ["next", "tanstack-router", "react-router", "tanstack-start", "react-vite"].includes(f));
  if (hasReactWeb) {
    processTemplatesFromPrefix(vfs, templates, `search/${config.search}/web/react`, "apps/web", config);
  }
}
```

**Pattern to follow when adding a new handler:**
1. Early return if feature is `"none"` or not applicable
2. Compute `serverDir` based on backend type (`"self"` uses `apps/web`, others use `apps/server`)
3. Process server templates first, then framework-specific web templates
4. Check `config.frontend` array for framework detection

### Rust handler (`rust-base.ts`)

Single monolithic handler. Uses **boolean flags + path-based skipping**:

```typescript
export async function processRustBaseTemplate(vfs, templates, config) {
  if (config.ecosystem !== "rust") return;

  // 1. Compute booleans from config
  const hasLeptos = config.rustFrontend === "leptos";
  const hasDioxus = config.rustFrontend === "dioxus";
  const hasTonic = config.rustApi === "tonic";
  const hasAsyncGraphql = config.rustApi === "async-graphql";
  const hasClap = config.rustCli === "clap";
  const hasRatatui = config.rustCli === "ratatui";

  // 2. Iterate ALL rust-base/ templates
  for (const [templatePath, content] of templates) {
    if (!templatePath.startsWith("rust-base/")) continue;

    // 3. Skip directories based on boolean flags
    if (!hasLeptos && templatePath.includes("crates/client/")) continue;
    if (!hasDioxus && templatePath.includes("crates/dioxus-client/")) continue;
    if (!hasTonic && templatePath.includes("crates/proto/")) continue;
    if (!hasTonic && templatePath.includes("crates/server/src/grpc.rs")) continue;
    if (!hasAsyncGraphql && templatePath.includes("crates/server/src/graphql.rs")) continue;
    if (!hasClap && templatePath.includes("crates/cli/")) continue;
    if (!hasRatatui && templatePath.includes("crates/tui/")) continue;

    // 4. Process template (Handlebars if .hbs, copy otherwise)
    const processedContent = templatePath.endsWith(".hbs")
      ? processTemplateString(content, config)
      : content;

    // 5. Write to VFS (NOTE: Rust does NOT skip empty files)
    const destPath = templatePath.replace("rust-base/", "");
    vfs.writeFile(transformFilename(destPath), processedContent);
  }
}
```

**Critical difference from Go/Python: Rust does NOT skip empty files.** If a `.hbs` file renders to empty string, it's still written. This means Rust templates must be self-contained — don't rely on empty-file filtering.

**To add a new conditional feature to Rust:**

```diff
+ const hasNewFeature = config.rustNewField === "some-value";
  // ...
+ if (!hasNewFeature && templatePath.includes("crates/new-feature/")) continue;
```

### Go handler (`go-base.ts`)

Same pattern as Rust but with **empty file skipping enabled**:

```typescript
export async function processGoBaseTemplate(vfs, templates, config) {
  if (config.ecosystem !== "go") return;

  const hasGrpc = config.goApi === "grpc-go";
  const hasCobra = config.goCli === "cobra";
  const hasBubbletea = config.goCli === "bubbletea";

  for (const [templatePath, content] of templates) {
    if (!templatePath.startsWith("go-base/")) continue;

    if (!hasGrpc && templatePath.includes("proto/")) continue;
    if (!hasCobra && templatePath.includes("cmd/cli/")) continue;
    if (!hasBubbletea && templatePath.includes("cmd/tui/")) continue;

    const processedContent = templatePath.endsWith(".hbs")
      ? processTemplateString(content, config)
      : content;

    // Go DOES skip empty files
    if (processedContent.trim() === "") continue;

    const destPath = templatePath.replace("go-base/", "");
    vfs.writeFile(transformFilename(destPath), processedContent);
  }
}
```

**To add a new conditional feature to Go:**

```diff
+ const hasNewFeature = config.goNewField === "some-value";
  // ...
+ if (!hasNewFeature && templatePath.includes("internal/new-feature/")) continue;
```

### Python handler (`python-base.ts`)

Simplest of all — **no handler-level conditionals**. All logic lives in templates:

```typescript
export async function processPythonBaseTemplate(vfs, templates, config) {
  if (config.ecosystem !== "python") return;

  for (const [templatePath, content] of templates) {
    if (!templatePath.startsWith("python-base/")) continue;

    const processedContent = templatePath.endsWith(".hbs")
      ? processTemplateString(content, config)
      : content;

    // Python DOES skip empty files
    if (processedContent.trim() === "") continue;

    const destPath = templatePath.replace("python-base/", "");
    vfs.writeFile(transformFilename(destPath), processedContent);
  }
}
```

**To add a new feature to Python:** No handler changes needed. Just add Handlebars conditionals in the template files:

```handlebars
{{!-- In pyproject.toml.hbs --}}
{{#if (eq pythonNewField "some-value")}}
    "some-package>=1.0",
{{/if}}
```

### Summary of handler differences

| Behavior | Rust | Go | Python | TypeScript |
|----------|------|-----|--------|------------|
| Handler type | Monolithic | Monolithic | Monolithic | Modular (per category) |
| Conditional inclusion | Handler-level path skips | Handler-level path skips | Template-only conditionals | `processTemplatesFromPrefix` calls |
| Empty file skipping | NO | YES | YES | YES (via `processTemplatesFromPrefix`) |
| Adding new feature requires handler edit | Yes (add boolean + skip) | Yes (add boolean + skip) | No | Yes (add handler call in generator.ts) |
| Dependency management | Cargo.toml.hbs | go.mod.hbs | pyproject.toml.hbs | Programmatic (add-deps.ts + processors) |

---

## 5. Template Directory Conventions

### TypeScript category templates

```
templates/<category>/<option-id>/
  server/
    base/                          # Framework-agnostic server code
      src/lib/<feature>.ts.hbs
  web/
    react/                         # Covers: next, tanstack-router, react-router, tanstack-start, react-vite
      src/components/Feature.tsx.hbs
    svelte/                        # SvelteKit
      src/routes/feature/+page.svelte.hbs
    solid/                         # SolidStart
      src/routes/feature.tsx.hbs
    nuxt/                          # Nuxt
      app/pages/feature.vue.hbs
    angular/                       # Angular
      src/app/feature/feature.component.ts.hbs
```

### Non-TS ecosystem templates

```
templates/rust-base/
  Cargo.toml.hbs                  # Root workspace manifest
  crates/server/                  # Always included
  crates/client/                  # Conditional on rustFrontend === "leptos"
  crates/proto/                   # Conditional on rustApi === "tonic"
  crates/cli/                     # Conditional on rustCli === "clap"
  crates/tui/                     # Conditional on rustCli === "ratatui"

templates/go-base/
  go.mod.hbs                      # Module manifest
  cmd/server/                     # Always included
  cmd/cli/                        # Conditional on goCli === "cobra"
  cmd/tui/                        # Conditional on goCli === "bubbletea"
  internal/                       # Always included
  proto/                          # Conditional on goApi === "grpc-go"

templates/python-base/
  pyproject.toml.hbs              # Project manifest
  src/                            # Always included (conditionals in templates)
  migrations/                     # Always included
  tests/                          # Always included
```

---

## 6. Dependency File Patterns by Ecosystem

### Rust — `Cargo.toml.hbs`

```handlebars
[workspace.dependencies]
# Always included
tokio = { version = "1", features = ["full"] }

# Conditional on web framework
{{#if (eq rustWebFramework "axum")}}
axum = "0.8"
tower = "0.5"
tower-http = { version = "0.6", features = ["cors", "trace"] }
{{/if}}
{{#if (eq rustWebFramework "actix-web")}}
actix-web = "4"
actix-cors = "0.7"
{{/if}}

# Conditional on API + web framework combo
{{#if (eq rustApi "async-graphql")}}
async-graphql = "7"
  {{#if (eq rustWebFramework "axum")}}
async-graphql-axum = "7"
  {{/if}}
  {{#if (eq rustWebFramework "actix-web")}}
async-graphql-actix-web = "7"
  {{/if}}
{{/if}}

# Multi-select field (array) using includes
{{#if (includes rustLibraries "serde")}}
serde = { version = "1", features = ["derive"] }
serde_json = "1"
{{/if}}
{{#if (includes rustLibraries "validator")}}
validator = { version = "0.19", features = ["derive"] }
{{/if}}
```

### Go — `go.mod.hbs`

```handlebars
module {{replace projectName "-" "_"}}

go 1.23

require (
{{#if (eq goWebFramework "gin")}}
	github.com/gin-gonic/gin v1.12.0
{{/if}}
{{#if (eq goWebFramework "echo")}}
	github.com/labstack/echo/v4 v4.15.1
{{/if}}
{{#if (eq goOrm "gorm")}}
	gorm.io/gorm v1.26.1
{{/if}}
{{#if (eq goOrm "sqlc")}}
	github.com/sqlc-dev/sqlc v1.29.0
{{/if}}
)
```

### Python — `pyproject.toml.hbs`

```handlebars
[project]
name = "{{projectName}}"
version = "0.1.0"
requires-python = ">=3.13"
dependencies = [
{{#if (eq pythonWebFramework "fastapi")}}
    "fastapi>=0.135.3",
    "uvicorn[standard]>=0.43.0",
{{/if}}
{{#if (eq pythonWebFramework "django")}}
    "django>=5.2",
{{/if}}
{{#if (includes pythonAi "langchain")}}
    "langchain>=0.3.0",
    "langchain-openai>=0.2.0",
{{/if}}
{{#if (eq pythonQuality "ruff")}}
]

[tool.ruff]
line-length = 120
{{else}}
]
{{/if}}
```

Note: Python `pythonAi` is an **array field** — use `includes`, not `eq`.
