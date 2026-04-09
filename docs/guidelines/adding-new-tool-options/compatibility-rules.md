# Adding New Tool Options — Compatibility Rules

How to validate that a new tool works with all existing options, add compatibility rules where needed, and test them.

> Companion to [README.md](README.md).

---

## 1. When Compatibility Rules Are Needed

Not every new tool needs compatibility rules. Use this decision tree:

**Does the tool work with ALL backends?**
- If no → add a disabled reason for incompatible backends (e.g., Vercel serverDeploy can't host NestJS/AdonisJS)

**Does the tool work with ALL frontends?**
- If no → add a disabled reason for incompatible frontends

**Does the tool require a specific runtime, database, or ORM?**
- If yes → add a disabled reason or auto-adjustment

**Does the tool silently produce broken output for certain combos?**
- If yes → add a preflight warning (non-blocking) or hard block

**Rule of thumb:** If a user can select the option but the generated project won't work, you need a compatibility rule.

### Compatibility-template parity rule

Before you widen compatibility, prove the generator can actually emit working files for every newly allowed combo.

For every backend/frontend/runtime combination you mark as supported, verify all of these exist together:

1. A compatibility decision that allows the combo (`getDisabledReason()`, `allowedApisForFrontends()`, etc.)
2. Template handler routing that reaches the correct template subtree
3. Real template files for that subtree
4. Dependency/env wiring for the emitted files
5. At least one test or scaffold combo that exercises the newly allowed path

Do not treat compatibility files as aspirational product design. They are part of the executable contract of the generator.

Examples:
- If `allowedApisForFrontends()` allows `graphql-yoga` for Nuxt/Svelte/Solid, `template-handlers/api.ts` must route those frontends to `templates/api/graphql-yoga/...` paths that actually exist.
- If `webDeploy === "vercel"` is enabled for a frontend, `templates/deploy/vercel/...` must contain the matching config and dependency support for that frontend.

### Claimed support policy

In this repo, "supported" has a strict meaning for AI agents:

- The combo is selectable in CLI/web builder
- Compatibility logic allows it
- The generator emits the required files for it
- Dependency/setup wiring exists for it
- At least one test or scaffold combo exercises it

If any of those are missing, do not present the combo as supported. Keep it disabled, warned, or out of the compatibility matrix until the generator contract is complete.

---

## 2. Four Types of Rules (Severity Order)

### Type 1: Disabled Reason (Web UI grays out the option)

**File:** `packages/types/src/compatibility.ts` → `getDisabledReason()`

The web builder calls this for every option in every category. Returns `null` (enabled) or a string message (disabled with tooltip).

```typescript
// In the giant switch statement inside getDisabledReason():
case "serverDeploy":
  if (optionId === "vercel") {
    // Vercel serverless can't host persistent-process backends
    if (["nestjs", "adonisjs", "encore"].includes(currentStack.backend)) {
      return "Vercel serverless functions are incompatible with " +
        getCategoryDisplayName("backend") + " (persistent process)";
    }
  }
  break;
```

**When to use:** Option is architecturally incompatible with the current selection. User should not be able to select it.

### Type 2: Auto-Adjustment (Cascade fix)

**File:** `packages/types/src/compatibility.ts` → `analyzeStackCompatibility()`

Automatically changes conflicting selections. The user sees a note explaining what was adjusted.

```typescript
// In analyzeStackCompatibility():
if (nextStack.backend === "convex") {
  nextStack.serverDeploy = "none";
  changes.push({ category: "serverDeploy", message: "Server deploy set to 'None' (Convex handles deployment)" });
}
```

**When to use:** There's an obvious correct fix. Don't make the user figure it out.

### Type 3: Hard Block (CLI exits with error)

**File:** `apps/cli/src/utils/compatibility-rules.ts` + `apps/cli/src/utils/config-validation.ts`

Immediate error when the user passes incompatible flags.

```typescript
// In compatibility-rules.ts:
export function validateVercelServerDeployCompatibility(backend: string, serverDeploy: string) {
  if (serverDeploy === "vercel" && ["nestjs", "adonisjs", "encore"].includes(backend)) {
    incompatibilityError({
      message: "Vercel serverless functions cannot host persistent-process backends",
      provided: { backend, serverDeploy },
      suggestions: ["Use --server-deploy fly or --server-deploy railway for NestJS/AdonisJS", "Use --server-deploy none"],
    });
  }
}

// Then register in config-validation.ts → validateFullConfig():
validateVercelServerDeployCompatibility(config.backend, config.serverDeploy);
```

**When to use:** The combo would definitely break. No reasonable auto-fix exists.

### Type 4: Preflight Warning (Non-blocking)

**File:** `packages/template-generator/src/preflight-validation.ts`

Warning shown after config is finalized but before generation. User can proceed.

```typescript
// In PREFLIGHT_RULES array:
{
  id: "vercel-server-persistent-backend",
  featureKey: "serverDeploy",
  displayName: "Server Deployment",
  willSkip: (c) => c.serverDeploy === "vercel" && ["nestjs", "adonisjs"].includes(c.backend),
  reason: "Vercel uses serverless functions which may not support persistent-process backends like NestJS/AdonisJS.",
  suggestions: ["Use Fly.io or Railway for persistent backends", "Switch to a serverless-compatible backend like Hono"],
},
```

**When to use:** The combo might work in some cases, or there's a workaround. Inform, don't block.

---

## 3. How to Research Compatibility

Before adding a tool, check what it's compatible with:

### For deploy targets (Vercel, Render, Netlify, etc.):

1. **Check the platform's docs** for supported frameworks:
   - Vercel: https://vercel.com/docs/frameworks
   - Render: https://docs.render.com
   - Fly.io: https://fly.io/docs
   
2. **Check if it's serverless or persistent:**
   - Serverless (Vercel, Cloudflare Workers) → can't host NestJS, AdonisJS, Express with WebSockets
   - Persistent (Fly.io, Railway, Render, Docker) → can host anything

3. **Check framework adapters:**
   - SvelteKit needs `@sveltejs/adapter-vercel` for Vercel
   - Nuxt auto-detects Vercel (no adapter needed)
   - Astro needs `@astrojs/vercel` for Vercel

4. **Test every frontend × backend combo** the handler supports (see deploy handler's `templateMap`)

### For libraries/tools:

1. **Check npm/crates.io/PyPI** for peer dependencies
2. **Check if it's frontend-only, backend-only, or both**
3. **Check framework-specific requirements** (e.g., `next-intl` only works with Next.js)
4. **Check ORM/database requirements** (e.g., some auth libs need specific ORMs)

### For non-TS ecosystems:

1. **Check if the tool works with all frameworks** in that ecosystem (e.g., does a Go auth lib work with both gin and echo and fiber and chi?)
2. **Check Cargo.toml/go.mod/pyproject.toml** for version conflicts

---

## 4. Where to Add Each Rule Type

| Rule type | File | Function | Test file |
|-----------|------|----------|-----------|
| Disabled reason | `packages/types/src/compatibility.ts` | `getDisabledReason()` | The nearest compatibility-focused suite, for example `apps/cli/test/auth-capabilities.test.ts` or `apps/cli/test/go-language.test.ts`; create a dedicated compatibility test file if no existing suite fits cleanly |
| Auto-adjustment | `packages/types/src/compatibility.ts` | `analyzeStackCompatibility()` | The nearest compatibility-focused suite, for example `apps/cli/test/auth-capabilities.test.ts` or `apps/cli/test/go-language.test.ts`; create a dedicated compatibility test file if no existing suite fits cleanly |
| Hard block | `apps/cli/src/utils/compatibility-rules.ts` + `config-validation.ts` | New validator function + register in `validateFullConfig()` | `apps/cli/test/basic-configurations.test.ts` |
| Preflight warning | `packages/template-generator/src/preflight-validation.ts` | Add to `PREFLIGHT_RULES` array | `apps/cli/test/preflight-validation.test.ts` |

---

## 5. Testing Compatibility Rules

### Disabled reasons (unit test)

There is no single canonical `compatibility-engine.test.ts` file in this repo today. Put the assertion in the closest existing compatibility-focused suite, or create a dedicated one when the change does not belong naturally in an existing domain-specific file.

```typescript
// In a compatibility-focused test file
test("vercel server deploy disabled for nestjs backend", () => {
  const reason = getDisabledReason(
    { ...baseStack, backend: "nestjs" },
    "serverDeploy",
    "vercel"
  );
  expect(reason).not.toBeNull();
  expect(reason).toContain("serverless");
});

test("vercel server deploy enabled for hono backend", () => {
  const reason = getDisabledReason(
    { ...baseStack, backend: "hono" },
    "serverDeploy",
    "vercel"
  );
  expect(reason).toBeNull();
});
```

### Preflight warnings (unit test)

```typescript
// In apps/cli/test/preflight-validation.test.ts
test("warns about vercel + nestjs", () => {
  const result = validatePreflightConfig(config({
    serverDeploy: "vercel",
    backend: "nestjs",
  }));
  expect(result.warnings.map(w => w.ruleId)).toContain("vercel-server-persistent-backend");
});
```

### Hard blocks (integration test)

```typescript
// In apps/cli/test/basic-configurations.test.ts
test("should fail with vercel + nestjs", async () => {
  const result = await runTRPCTest({
    serverDeploy: "vercel",
    backend: "nestjs",
    runtime: "node",
  });
  expectError(result, "serverless");
});
```

---

## 6. Checklist: Adding Compatibility for a New Deploy Target

When adding a deploy target like Vercel, check every combo:

### Backend compatibility matrix

| Backend | Serverless (Vercel/CF) | Persistent (Fly/Railway/Docker) | Self (fullstack) |
|---------|----------------------|--------------------------------|-------------------|
| hono | ✅ | ✅ | N/A |
| express | ✅ (with adapter) | ✅ | N/A |
| fastify | ✅ (with adapter) | ✅ | N/A |
| elysia | ⚠️ (Bun-only) | ✅ | N/A |
| fets | ✅ | ✅ | N/A |
| nestjs | ❌ (persistent process) | ✅ | N/A |
| adonisjs | ❌ (persistent process) | ✅ | N/A |
| nitro | ✅ | ✅ | N/A |
| encore | ❌ (own infra) | ❌ (own infra) | N/A |
| convex | ❌ (own deploy) | ❌ (own deploy) | N/A |
| self | N/A | N/A | Uses webDeploy |
| none | N/A | N/A | N/A |

### Frontend compatibility matrix

| Frontend | Vercel | Notes |
|----------|--------|-------|
| next | ✅ Native | Zero-config, auto-detected |
| tanstack-router | ✅ | Vite SPA, needs buildCommand/outputDirectory |
| tanstack-start | ✅ | SSR, needs outputDirectory |
| react-router | ✅ | Vite SPA |
| react-vite | ✅ | Maps to tanstack-router template |
| svelte | ✅ | Needs `@sveltejs/adapter-vercel` |
| nuxt | ✅ Native | Auto-detected |
| solid | ✅ | Vite SPA |
| solid-start | ✅ | SSR |
| astro | ✅ | Needs `@astrojs/vercel` (NOT in current templateMap — gap) |
| angular | ✅ | Needs custom build config (NOT in current templateMap — gap) |
| qwik | ⚠️ | Experimental Vercel adapter |
| redwood | ❌ | Has own deploy system |
| fresh | ❌ | Deno-only, not Vercel-compatible |
| native-* | N/A | Mobile apps, no web deploy |

### Rules to implement

For each ❌ or ⚠️ in the matrix above:
1. Add `getDisabledReason()` entry → grays out in web builder
2. Add `validateFullConfig()` entry → blocks in CLI
3. Add preflight warning if ⚠️ (works but may have issues)
4. Add tests for each rule
5. Confirm template parity: every supported frontend/backend pair has matching `templates/deploy/<target>/...` coverage and handler routing

### Deploy-target parity check

When a deploy target claims support for a frontend, verify all four layers stay aligned:

1. `packages/types/src/compatibility.ts`
2. `packages/template-generator/templates/deploy/<target>/...`
3. Any dependency/setup logic such as `processors/deploy-deps.ts`
4. At least one scaffold test for the claimed combo

If one of those layers is missing, keep the option disabled or warned. Do not merge a "support" claim based only on docs research.

---

## 7. Common Patterns

### "Feature requires a backend"

Many features (search, file-storage, job-queue, email, logging, observability) need a standalone server. The pattern:

```typescript
// Disabled reason:
if (["none", "convex"].includes(currentStack.backend) ||
    currentStack.backend.startsWith("self")) {
  return "This feature requires a standalone server backend";
}

// Preflight warning (softer):
{
  id: "feature-no-server",
  willSkip: (c) => c.feature !== "none" && needsStandaloneServer(c.backend),
  reason: "Feature requires a standalone server backend",
  suggestions: ["Add a backend like Hono", "Remove the feature"],
}
```

### "Deploy target incompatible with backend type"

```typescript
// Serverless targets (Vercel, Cloudflare):
if (optionId === "vercel" && isPersistentBackend(currentStack.backend)) {
  return "Vercel serverless can't host persistent-process backends";
}

// All non-none deploys:
if (optionId !== "none" && !hasDeployableBackend(currentStack.backend)) {
  return "Server deployment not needed for this backend";
}
```

### "Tool only works with specific frameworks"

```typescript
// next-intl only for Next.js:
if (optionId === "next-intl" && !currentStack.webFrontend.includes("next")) {
  return "next-intl requires Next.js";
}
```

---

## 8. The Yolo Escape Hatch

All compatibility checks respect the `--yolo` flag:

```typescript
if (stack.yolo === "true") return null; // Skip all disabled reasons
```

This lets power users bypass everything. Never remove this — it's the safety valve for edge cases the rules don't cover.
