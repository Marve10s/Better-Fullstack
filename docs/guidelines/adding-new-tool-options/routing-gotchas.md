# Adding New Tool Options — Routing Gotchas

Edge cases that affect ~40-50% of real configurations. Every new handler and processor must account for these.

> Companion to [README.md](README.md).

---

## 1. Convex Backend Kills 11 Features Silently

Convex is a managed backend that provides its own database, API, caching, and search. When `backend === "convex"`, **11 existing feature handlers silently return early**. Every new processor and template handler must do the same.

**Required guard at the top of every handler/processor:**

```typescript
if (config.backend === "convex") return;
```

**Features that skip for Convex:**

| Feature | File that skips | Why |
|---------|----------------|-----|
| API layer | `template-handlers/api.ts` | Convex provides its own API |
| Database | `template-handlers/database.ts` | Convex IS the database |
| Search | `template-handlers/search.ts` | Convex has built-in search |
| Email | `template-handlers/email.ts` | No server-side email |
| Logging | `template-handlers/logging.ts` | No custom logging |
| File storage | `template-handlers/file-storage.ts` | Convex has storage |
| Job queue | `template-handlers/job-queue.ts` | Convex has scheduling |
| Observability | `template-handlers/observability.ts` | No custom observability |
| Caching | `processors/caching-deps.ts` | Convex has built-in caching |
| Payments | `preflight-validation.ts` | No payment integration |
| Auth (partial) | `template-handlers/auth.ts` | Some auth flows differ |

**What happens if you forget:** Your templates will try to write files into a project structure that doesn't have `apps/server/`. The generated project will have orphaned files and broken imports.

---

## 2. Self-Backend Routes Server Code to `apps/web/`

When `backend === "self"` (fullstack framework), there is **no `apps/server/` directory**. All server-side code lives inside `apps/web/` because the fullstack framework handles both.

**Required pattern in every handler:**

```typescript
const serverDir = config.backend === "self" ? "apps/web" : "apps/server";
```

**Only 2 frameworks fully support self-backend:**

| Framework | Self-backend support | API support | Auth support |
|-----------|---------------------|-------------|-------------|
| Next.js | Full | tRPC, oRPC | All providers |
| TanStack Start | Full | tRPC, oRPC | better-auth only |
| Nuxt | Partial | oRPC only | Limited |
| SvelteKit | Partial | oRPC only | Limited |
| React Router | No | - | - |
| React Vite | No | - | - |
| TanStack Router | No | - | - |

**Auth providers have framework whitelists** — they are NOT all universal:

| Auth provider | Self-backend frameworks |
|--------------|------------------------|
| better-auth | All React frontends |
| NextAuth | Next.js only |
| StackAuth | Next.js only |
| Auth0 | Next.js only |
| Supabase Auth | Next.js only |
| Clerk | Not supported with self-backend |

**What happens if you forget:** Templates write files to `apps/server/` which doesn't exist. Or worse, server-only code ends up in `apps/web/` for a framework (like React Router) that can't serve it.

---

## 3. Redwood Uses Different Output Paths

Redwood projects use `web/` and `api/` at the **project root** instead of `apps/web/` and `apps/server/`.

**Required:** Always use the path utility functions instead of hardcoding paths:

```typescript
import { getServerPackagePath, getWebPackagePath } from "../utils/project-paths";

// These return the correct path for ALL frameworks, including Redwood:
const serverPath = getServerPackagePath(config.frontend, config.backend);
const webPath = getWebPackagePath(config.frontend, config.backend);
```

**Path mapping:**

| Framework | Web package.json | Server package.json |
|-----------|-----------------|---------------------|
| Most frameworks | `apps/web/package.json` | `apps/server/package.json` |
| Redwood (backend=none) | `web/package.json` | `api/package.json` |

**What happens if you hardcode `apps/server/package.json`:** Every Redwood project breaks — dependencies get added to a non-existent path.

---

## 4. Frontend Is an Array With 8+ Detection Patterns

`config.frontend` is an **array** (multiple frontends per monorepo). Template handlers use 8+ different patterns to detect which frameworks are present:

### Pattern 1: Broad React detection (most common)

```typescript
const hasReactWeb = config.frontend.some(f =>
  ["next", "tanstack-router", "react-router", "tanstack-start", "react-vite"].includes(f));
```

Use when routing to shared `web/react/` templates.

### Pattern 2: Find the specific React framework

```typescript
const reactFramework = config.frontend.find(f =>
  ["tanstack-router", "react-router", "react-vite", "tanstack-start", "next"].includes(f));
```

Use when routing to framework-specific templates like `frontend/react/{framework}/`.

### Pattern 3: Fullstack-only check

```typescript
if (reactFramework === "next" || reactFramework === "tanstack-start")
```

Use when the feature only works with fullstack frameworks (API routes, server actions).

### Pattern 4: react-vite normalization

```typescript
const templateDir = reactFramework === "react-vite"
  ? "react/tanstack-router"   // react-vite uses tanstack-router's templates!
  : `react/${reactFramework}`;
```

`react-vite` doesn't have its own template directory — it maps to `tanstack-router`. Missing this causes template-not-found errors.

### Pattern 5: Framework-specific imports inside shared templates

```handlebars
{{#if (includes frontend "next")}}
import { useRouter } from "next/navigation";
{{/if}}
{{#if (includes frontend "tanstack-router")}}
import { useNavigate } from "@tanstack/react-router";
{{/if}}
```

### Pattern 6: Non-React framework detection

```typescript
const hasSvelteWeb = config.frontend.includes("svelte");
const hasNuxtWeb = config.frontend.includes("nuxt");
const hasSolidWeb = config.frontend.some(f => ["solid", "solid-start"].includes(f));
const hasAngularWeb = config.frontend.includes("angular");
```

### Pattern 7: Astro with integration sub-framework

```typescript
const hasAstroWeb = config.frontend.includes("astro");
if (hasAstroWeb && config.astroIntegration === "react") {
  // Astro project with React integration
}
```

### Pattern 8: Native app detection

```typescript
const hasNative = config.frontend.some(f =>
  ["native-bare", "native-uniwind", "native-unistyles"].includes(f));
```

**The "react" catch-all is two-level routing:**

1. First, shared React code: `processTemplatesFromPrefix(vfs, templates, "frontend/react/web-base", "apps/web", config);`
2. Then, framework-specific code: `processTemplatesFromPrefix(vfs, templates, "frontend/react/${reactFramework}", "apps/web", config);`

An agent that creates templates only at one level will either miss shared code or miss framework-specific overrides.

---

## 5. Processor Execution Order Is Load-Bearing

`processDependencies()` in `processors/index.ts` calls 27+ processors in a **specific order**. Key ordering constraints:

```
processWorkspaceDeps       → 1  (workspace structure)
processEnvDeps             → 2  (env package)
processInfraDeps           → 3  (infra package)
processDatabaseDeps        → 4  (DB drivers + ORM adapters)  ← MUST be before auth
processBackendDeps         → 5  (backend framework)
processRuntimeDeps         → 6  (runtime adapters)
processApiDeps             → 7  (API layer)
processAuthDeps            → 8  (auth + ORM-specific adapters) ← depends on step 4
processPaymentsDeps        → 9  (payment providers)
... remaining processors   → 10-27
```

**Why order matters:** `processAuthDeps` (step 8) adds ORM-specific adapters like `@better-auth/drizzle-adapter`. It checks which ORM is configured. If it ran before `processDatabaseDeps` (step 4), the database drivers those adapters depend on wouldn't be installed yet.

**Rule for new processors:** Add at the **end** of the list unless your processor provides dependencies that other processors consume. If your tool needs to know what ORM/database is configured, it's safe at any position after step 4.

---

## 6. Auth + Payments Both Write to `packages/auth`

When `auth === "better-auth"` AND `payments !== "none"`, both systems write to the same package:

- **Auth templates** write to `packages/auth/src/` (server-side auth configuration)
- **Payment templates** also write to `packages/auth/` (payment webhook handlers, Better Auth plugins)
- **Auth plugins processor** then injects plugin code into `packages/auth/src/index.ts`

**Generation order in `generator.ts`:**
1. `processAuthTemplates()` — writes auth files
2. `processPaymentsTemplates()` — writes payment files (into `packages/auth/`)
3. `processAuthPlugins()` — injects plugin imports into existing auth files

**What happens if you get this wrong:** If a new payment provider writes a file that conflicts with an auth file at the same path, one will overwrite the other. Always check what files auth already places in `packages/auth/` before adding payment-related templates there.

---

## 7. Workers Runtime Changes Database URLs

When `runtime === "workers"` (Cloudflare Workers), database connection strings are different:

| Database | Standard runtime | Workers runtime |
|----------|-----------------|-----------------|
| SQLite | `file:../../local.db` | `http://127.0.0.1:8080` (D1 endpoint) |
| PostgreSQL | Standard connection string | Same (via Hyperdrive) |

Workers also skips `@t3-oss/env-core` (env validation package) because Workers has its own environment binding system.

**When this matters for new tools:** If your tool generates database connection code or env validation code, check for Workers runtime and adjust accordingly.

---

## 8. Catalog Deduplication Can Create Surprises

When using `pnpm` or `bun` package managers, the catalog system (`catalogs.ts`) deduplicates dependencies that appear in 2+ packages at the same version. Adding a new dependency that already exists elsewhere can retroactively trigger catalog creation.

**Example:** If `better-auth` is in `packages/auth` and `packages/db` at version `1.5.6`, and your new processor adds it to a third package at the same version, the catalog system will move all three to a shared `"catalog:"` reference. This is usually fine but can cause surprises if one package intentionally pinned a different version.

**Rule:** Always use `dependencyVersionMap` in `add-deps.ts` as the single source of truth for versions. Never hardcode a version in a processor.

---

## Quick Reference: Guards Every New Handler Needs

```typescript
export async function processNewFeatureTemplates(vfs, templates, config) {
  // Guard 1: Feature not selected
  if (!config.newFeature || config.newFeature === "none") return;

  // Guard 2: Convex backend (no standalone server)
  if (config.backend === "convex") return;

  // Guard 3: No backend at all
  if (config.backend === "none") return;

  // Guard 4: Correct output directory (self-backend routes to web)
  const serverDir = config.backend === "self" ? "apps/web" : "apps/server";

  // Guard 5: Use path utilities for package.json (handles Redwood)
  const serverPath = getServerPackagePath(config.frontend, config.backend);

  // Guard 6: Frontend detection (array, not string)
  const hasReactWeb = config.frontend.some(f =>
    ["next", "tanstack-router", "react-router", "tanstack-start", "react-vite"].includes(f));

  // Now safe to process templates
  processTemplatesFromPrefix(vfs, templates, `new-feature/${config.newFeature}/server/base`, serverDir, config);
}
```
