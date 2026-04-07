# Adding New Tool Options — Worked Example

End-to-end walkthrough adding a hypothetical `"opensearch"` option to the existing **Search** category in the TypeScript ecosystem. Every file diff is shown.

> Companion to [README.md](README.md). Read that first for concepts — this file is pure execution.

---

## File 1 — Schema enum

**File:** `packages/types/src/schemas.ts`

Find the `SearchSchema` (near the other category schemas) and append the value:

```diff
 export const SearchSchema = z
-  .enum(["meilisearch", "typesense", "elasticsearch", "none"])
+  .enum(["meilisearch", "typesense", "elasticsearch", "opensearch", "none"])
   .describe("Search engine solution");
```

No other schema changes needed — `CreateInputSchema`, `ProjectConfigSchema`, and `BetterTStackConfigSchema` reference `SearchSchema` by variable, so they pick up the new value automatically. The `SEARCH_VALUES` export also auto-derives.

---

## File 2 — Option metadata (label override)

**File:** `packages/types/src/option-metadata.ts`

Find the `search` key inside `EXACT_LABEL_OVERRIDES` (it's in the large `Partial<Record<...>>` object, alphabetically ordered by category):

```diff
 search: {
   elasticsearch: "Elasticsearch",
+  opensearch: "OpenSearch",
 },
```

`humanizeOptionId("opensearch")` would produce `"Opensearch"` (wrong casing), so the override is needed.

---

## File 3 — Dependency versions

**File:** `packages/template-generator/src/utils/add-deps.ts`

Find `dependencyVersionMap` (starts around line 14, alphabetically ordered) and add:

```diff
+ "@opensearch-project/opensearch": "^3.2.0",
```

Place it alphabetically among the `@o*` packages.

---

## File 4 — Dependency processor

**File:** `packages/template-generator/src/processors/search-deps.ts`

Find the existing `processSearchDeps` function. Add a branch after the last search engine:

```diff
+ if (search === "opensearch") {
+   addPackageDependency({
+     vfs,
+     packagePath: serverPath,
+     dependencies: ["@opensearch-project/opensearch"],
+   });
+ }
```

---

## File 5 — Environment variables

**File:** `packages/template-generator/src/processors/env-vars.ts`

Find `buildServerVars()` (the large function, ~line 598). Locate the existing search engine env vars (look for `meilisearch` or `typesense` blocks):

```diff
+ if (search === "opensearch") {
+   vars.push(
+     { key: "OPENSEARCH_NODE", value: "http://localhost:9200", condition: true,
+       comment: "OpenSearch node URL" },
+     { key: "OPENSEARCH_USERNAME", value: "", condition: true,
+       comment: "OpenSearch username (optional for local dev)" },
+     { key: "OPENSEARCH_PASSWORD", value: "", condition: true,
+       comment: "OpenSearch password (optional for local dev)" },
+   );
+ }
```

These are server-only variables (no framework prefix needed).

---

## File 6 — Template files

Create the template directory:

```
packages/template-generator/templates/search/opensearch/
  server/
    base/
      src/lib/search.ts.hbs
```

**File:** `templates/search/opensearch/server/base/src/lib/search.ts.hbs`

```handlebars
import { Client } from "@opensearch-project/opensearch";

const client = new Client({
  node: process.env.OPENSEARCH_NODE || "http://localhost:9200",
{{#if (ne search "none")}}
  auth: process.env.OPENSEARCH_USERNAME
    ? {
        username: process.env.OPENSEARCH_USERNAME,
        password: process.env.OPENSEARCH_PASSWORD || "",
      }
    : undefined,
{{/if}}
});

export { client as searchClient };
```

Note: The `.hbs` extension is stripped during generation. The output file will be `src/lib/search.ts`.

---

## File 7 — Template handler

**File:** `packages/template-generator/src/template-handlers/search.ts`

The Search handler likely already dispatches by `config.search`. Find the function and add:

```diff
+ if (config.search === "opensearch") {
+   processTemplatesFromPrefix(vfs, templates, "search/opensearch/server/base", serverDir, config);
+ }
```

Where `serverDir` is computed earlier in the function as either `"apps/web"` (self backend) or `"apps/server"` (standalone backend).

---

## File 8 — CLI prompt

**File:** `apps/cli/src/prompts/search.ts`

Find the `options` array inside `getSearchChoice()` and add before the `"none"` entry:

```diff
+ { value: "opensearch" as const, label: "OpenSearch", hint: "AWS-backed open-source fork of Elasticsearch" },
  { value: "none" as const, label: "None", hint: "No search engine" },
```

---

## File 9 — Web builder constant

**File:** `apps/web/src/lib/constant.ts`

Find the `search` key inside the `TECH_OPTIONS` object (look for `// search` or the existing `meilisearch`/`typesense` entries). Add to the array:

```diff
+ {
+   id: "opensearch",
+   name: "OpenSearch",
+   description: "AWS-backed open-source search and analytics suite, fork of Elasticsearch",
+   icon: "https://cdn.simpleicons.org/opensearch/005EB8",
+   color: "from-blue-500 to-blue-700",
+ },
```

---

## File 10 — Icon registry

**File:** `apps/web/src/lib/tech-icons.ts`

Find the icon registry object (alphabetical) and add:

```diff
+ opensearch: { type: "si", slug: "opensearch", hex: "005EB8" },
```

---

## File 11 — Resource links

**File:** `apps/web/src/lib/tech-resource-links.ts`

Find the `BASE_LINKS` object (alphabetical) and add:

```diff
+ opensearch: {
+   docsUrl: "https://opensearch.org/docs/latest/",
+   githubUrl: "https://github.com/opensearch-project/OpenSearch",
+ },
```

---

## File 12 — Post-install instructions

**File:** `apps/cli/src/helpers/core/post-installation.ts`

Find the search section (look for existing `meilisearch` / `typesense` blocks):

```diff
+ if (config.search === "opensearch") {
+   steps.push({
+     title: "OpenSearch",
+     instructions: [
+       "Start OpenSearch locally: docker run -p 9200:9200 opensearchproject/opensearch:latest",
+       "Or use AWS OpenSearch Service: https://aws.amazon.com/opensearch-service/",
+       "Set OPENSEARCH_NODE in .env (default: http://localhost:9200)",
+     ],
+   });
+ }
```

---

## File 13 — MCP server schema

**File:** `apps/cli/src/mcp.ts`

Find the `SCHEMA_MAP` object (around line 142, maps field names to Zod schemas). The `search` key should already be there:

```typescript
search: SearchSchema,    // Already exists — no change needed for existing categories
```

For a **new category**, you'd add a new key-value pair here pointing to the new Zod schema.

---

## File 14 — bts.jsonc config writer

**File:** `apps/cli/src/utils/bts-config.ts`

Find the `writeBtsConfig()` function. The `search` field should already be mapped:

```typescript
search: projectConfig.search,    // Already exists — no change for existing categories
```

For a **new category**, add the mapping:

```diff
+ rateLimiting: projectConfig.rateLimiting,
```

---

## Files 15-16 — CLI index.ts wiring (4 spots)

**File:** `apps/cli/src/index.ts`

For **existing categories** (like search), all 4 spots already exist. For a **new category**, here's the exact pattern using search as the template:

**Spot 1 — Import (top of file, around line 82):**
```diff
  SearchSchema,
+ RateLimitingSchema,
  FileStorageSchema,
```

**Spot 2 — Router input schema (inside the `z.object()`, around line 186):**
```diff
  search: SearchSchema.optional().describe("Search engine solution"),
+ rateLimiting: RateLimitingSchema.optional().describe("Rate limiting library"),
  fileStorage: FileStorageSchema.optional().describe("File storage solution"),
```

**Spot 3 — Config construction (inside `createVirtual()`, around line 565):**
```diff
  search: options.search || "none",
+ rateLimiting: options.rateLimiting || "none",
  fileStorage: options.fileStorage || "none",
```

**Spot 4 — Interactive prompt call (inside the interactive flow, before config construction):**
```diff
+ const rateLimiting = await getRateLimitingChoice(options.rateLimiting);
```

And add the import at the top:
```diff
+ import { getRateLimitingChoice } from "./prompts/rate-limiting";
```

---

## File 17 — Stack defaults (new category only)

**File:** `apps/web/src/lib/stack-defaults.ts`

Find the `DEFAULT_STACK` object and add:

```diff
+ rateLimiting: "none",
```

---

## File 18 — Stack URL keys (new category only)

**File:** `apps/web/src/lib/stack-url-keys.ts`

```diff
+ rateLimiting: "rl",
```

---

## File 19 — Stack URL state (new category only)

**File:** `apps/web/src/lib/stack-url-state.ts`

Three spots:

**In `loadStackParams()`:**
```diff
+ rateLimiting: getString("rateLimiting", DEFAULT_STACK.rateLimiting),
```

**In `serializeStackParams()`:**
```diff
+ addParam("rateLimiting", stack.rateLimiting);
```

**In `searchToStack()`:**
```diff
+ rateLimiting: search.rl ?? DEFAULT_STACK.rateLimiting,
```

---

## File 20 — Stack utils (new category only)

**File:** `apps/web/src/lib/stack-utils.ts`

**In `TYPESCRIPT_CATEGORY_ORDER`:**
```diff
+ "rateLimiting",
```

**In `generateStackCommand()` flags array:**
```diff
+ `--rate-limiting ${stack.rateLimiting}`,
```

---

## Tests

**File:** `apps/cli/test/search.test.ts`

```typescript
describe("OpenSearch with different backends", () => {
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

  test("opensearch emits correct files", async () => {
    const result = await runTRPCTest(
      createCustomConfig({
        projectName: "opensearch-files",
        frontend: ["tanstack-router"],
        backend: "hono",
        search: "opensearch",
      }),
    );
    expectSuccess(result);

    const projectDir = result.projectDir!;
    const helper = await readFile(join(projectDir, "apps/server/src/lib/search.ts"), "utf-8");
    const pkg = await readFile(join(projectDir, "apps/server/package.json"), "utf-8");
    const env = await readFile(join(projectDir, "apps/server/.env"), "utf-8");

    expect(helper).toContain("@opensearch-project/opensearch");
    expect(pkg).toContain('"@opensearch-project/opensearch"');
    expect(env).toContain("OPENSEARCH_NODE");
  });
});
```

---

## Build & verify

```bash
# 1. Rebuild types (schema changed)
bun run --filter=@better-fullstack/types build

# 2. Regenerate templates (new .hbs files)
bun run --filter=@better-fullstack/template-generator generate-templates

# 3. Rebuild generator and CLI
bun run --filter=@better-fullstack/template-generator build
bun run --filter=create-better-fullstack build

# 4. Run auto-sync test (catches builder/schema mismatches)
bun test apps/cli/test/cli-builder-sync.test.ts

# 5. Run category test
bun test apps/cli/test/search.test.ts

# 6. Type check everything
bun run --cwd apps/cli check-types
bun run --cwd apps/web typecheck

# 7. Validate links
bun run --cwd apps/web validate:tech-links
```

---

## Summary — Files touched

| # | File | Change type |
|---|------|-------------|
| 1 | `packages/types/src/schemas.ts` | Edit (1 line) |
| 2 | `packages/types/src/option-metadata.ts` | Edit (1 line) |
| 3 | `packages/template-generator/src/utils/add-deps.ts` | Edit (1 line) |
| 4 | `packages/template-generator/src/processors/search-deps.ts` | Edit (~7 lines) |
| 5 | `packages/template-generator/src/processors/env-vars.ts` | Edit (~10 lines) |
| 6 | `packages/template-generator/templates/search/opensearch/` | Create (new dir + files) |
| 7 | `packages/template-generator/src/template-handlers/search.ts` | Edit (~3 lines) |
| 8 | `apps/cli/src/prompts/search.ts` | Edit (1 line) |
| 9 | `apps/web/src/lib/constant.ts` | Edit (~6 lines) |
| 10 | `apps/web/src/lib/tech-icons.ts` | Edit (1 line) |
| 11 | `apps/web/src/lib/tech-resource-links.ts` | Edit (~3 lines) |
| 12 | `apps/cli/src/helpers/core/post-installation.ts` | Edit (~8 lines) |
| 13 | `apps/cli/test/search.test.ts` | Edit (~25 lines) |

For an **existing category** like Search: **13 files**, ~67 lines changed.
For a **new category**: add ~7 more files (20 total), ~120 more lines.

---

## Non-TypeScript Worked Example: Adding "Fiber" to Go Web Frameworks

This is shorter because Go has fewer files to touch — no processors, no env-vars.ts, no separate handler changes for web frameworks.

### File 1 — Schema

**File:** `packages/types/src/schemas.ts`

Find `GoWebFrameworkSchema` (in the Go ecosystem schemas section):

```diff
 export const GoWebFrameworkSchema = z
-  .enum(["gin", "echo", "none"])
+  .enum(["gin", "echo", "fiber", "none"])
   .describe("Go web framework");
```

### File 2 — Option metadata

**File:** `packages/types/src/option-metadata.ts`

```diff
 goWebFramework: {
   gin: "Gin",
   echo: "Echo",
+  fiber: "Fiber",
 },
```

### File 3 — CLI prompt

**File:** `apps/cli/src/prompts/go-ecosystem.ts`

Find `getGoWebFrameworkChoice()` and add before the `"none"` option:

```diff
+ { value: "fiber" as const, label: "Fiber", hint: "Express.js-like API built on FastHTTP, 38k+ stars" },
  { value: "none" as const, label: "None", hint: "No web framework" },
```

### File 4 — Dependencies (go.mod.hbs)

**File:** `packages/template-generator/templates/go-base/go.mod.hbs`

Add a Fiber conditional block near the existing gin/echo blocks:

```diff
+{{#if (eq goWebFramework "fiber")}}
+	github.com/gofiber/fiber/v2 v2.52.0
+{{/if}}
```

### File 5 — Server template (main.go.hbs)

**File:** `packages/template-generator/templates/go-base/cmd/server/main.go.hbs`

This is a large shared file with gin/echo/none blocks. Add a Fiber block following the same structure. Look for the pattern:

```handlebars
{{#if (eq goWebFramework "gin")}}
import "github.com/gin-gonic/gin"
// ... gin setup
{{/if}}
{{#if (eq goWebFramework "echo")}}
import "github.com/labstack/echo/v4"
// ... echo setup
{{/if}}
```

Add:

```handlebars
{{#if (eq goWebFramework "fiber")}}
import "github.com/gofiber/fiber/v2"

func main() {
    app := fiber.New()
    // ... register routes, middleware, start server
    app.Listen(":3001")
}
{{/if}}
```

**Note:** The real template is ~300 lines per framework covering ORM integration, auth middleware, logging, and gRPC. Copy the structure from the gin or echo block and adapt to Fiber's API. This requires knowledge of Fiber's Go API — the guideline cannot provide this domain knowledge.

### File 6 — Handler template (handlers.go.hbs)

**File:** `packages/template-generator/templates/go-base/internal/handlers/handlers.go.hbs`

Same pattern — add `{{#if (eq goWebFramework "fiber")}}` blocks for each handler function, following the gin/echo patterns.

### File 7 — Web builder

**File:** `apps/web/src/lib/constant.ts`

Find the `goWebFramework` section in `TECH_OPTIONS`:

```diff
+ {
+   id: "fiber",
+   name: "Fiber",
+   description: "Express.js-like API built on FastHTTP, extremely fast",
+   icon: "https://cdn.simpleicons.org/gofiber/00ACD7",
+   color: "from-cyan-400 to-cyan-600",
+ },
```

### Files 8-9 — Icons and links

**File:** `apps/web/src/lib/tech-icons.ts`
```diff
+ fiber: { type: "si", slug: "gofiber", hex: "00ACD7" },
```

**File:** `apps/web/src/lib/tech-resource-links.ts`
```diff
+ fiber: { docsUrl: "https://docs.gofiber.io/", githubUrl: "https://github.com/gofiber/fiber" },
```

### File 10 — Test

**File:** `apps/cli/test/go-language.test.ts`

Use `createVirtual` (not `runTRPCTest`) for Go:

```typescript
it("should generate project with Fiber", async () => {
  const result = await createVirtual({
    projectName: "go-fiber",
    ecosystem: "go",
    goWebFramework: "fiber",
    goOrm: "none",
    goApi: "none",
    goCli: "none",
    goLogging: "none",
  });

  expect(result.success).toBe(true);
  const root = result.tree!.root;
  const goMod = getFileContent(root, "go.mod");
  expect(goMod).toContain("github.com/gofiber/fiber");
});
```

### Files NOT touched

- **No handler change** — `go-base.ts` does not need edits for web frameworks (they use template conditionals, not directory skipping)
- **No processor files** — Go manages deps in `go.mod.hbs`
- **No env-vars.ts** — Go manages env in `.env.example.hbs`
- **No add-deps.ts** — that's TypeScript-only

### Summary — Go option: 10 files, ~80 lines

| # | File | Change |
|---|------|--------|
| 1 | `packages/types/src/schemas.ts` | Add `"fiber"` to enum (1 line) |
| 2 | `packages/types/src/option-metadata.ts` | Add label override (1 line) |
| 3 | `apps/cli/src/prompts/go-ecosystem.ts` | Add prompt option (1 line) |
| 4 | `templates/go-base/go.mod.hbs` | Add dependency conditional (~3 lines) |
| 5 | `templates/go-base/cmd/server/main.go.hbs` | Add Fiber server block (~50+ lines of Go) |
| 6 | `templates/go-base/internal/handlers/handlers.go.hbs` | Add Fiber handler block (~50+ lines of Go) |
| 7 | `apps/web/src/lib/constant.ts` | Add TECH_OPTIONS entry (~6 lines) |
| 8 | `apps/web/src/lib/tech-icons.ts` | Add icon (1 line) |
| 9 | `apps/web/src/lib/tech-resource-links.ts` | Add links (~3 lines) |
| 10 | `apps/cli/test/go-language.test.ts` | Add test (~15 lines) |

---

## Template Content: A Note on Domain Knowledge

These guidelines cover **where** to put files, **how** to structure conditionals, and **what** infrastructure to wire. They intentionally do not cover **how to write idiomatic Go/Rust/Python code** inside templates — that requires domain expertise in the target framework.

When writing template content for non-TS ecosystems:
1. **Copy the structure** from an existing framework block (e.g., use the gin block as a template for Fiber)
2. **Adapt API calls** to the new framework (requires knowing the framework's API)
3. **Cover all ORM combinations** — each web framework block has inner conditionals for every ORM (gorm, sqlc, ent, none)
4. **Test every permutation** — use `createVirtual` to generate each framework × ORM combo and verify the output compiles
