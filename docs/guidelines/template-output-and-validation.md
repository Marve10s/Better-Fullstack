# Template Output And Validation

Open this file when working on template generation, generated project output, release verification, or CLI tests that validate generated projects.

## Conditional template logic

- `bts.jsonc` does not persist shadcn sub-options such as `shadcnColorTheme` and `shadcnFont`. Validate those through generated files like `components.json`, CSS, and dependency output instead.
- `shadcn-ui` is intentionally incompatible with `svelte` and `solid-start`. For those frontends, use `daisyui`, `ark-ui`, `park-ui` (solid-start only), or `none`.
- For SvelteKit and SolidStart with Tailwind + DaisyUI, plugin activation lives in `apps/web/src/app.css` via `@plugin "daisyui";`, not `tailwind.config.ts`.
- Fets server templates must only emit `toNativeRequest` when auth or API routes need it. Emitting it unconditionally causes unused-variable failures during type checks.
- Go server templates must keep host and port declarations conditional on selected framework/API paths. Declaring `addr` unconditionally breaks `go build` when `goWebFramework=none`.
- TRPC server context templates need a `fets` backend branch when `auth=better-auth`; otherwise `ctx.session` collapses to `null` and protected procedures fail to type-check.
- Root workspace `check-types` commands should use `--if-present` because some generated apps do not define that script.
- Redwood path helpers are backend-aware: `web/api` applies only when `frontend=redwood` and `backend=none`; external-backend setups use `apps/web` and `apps/server`.
- Redwood matrix constraints to remember: API must be `none`, and compatible UI libraries are currently `daisyui` or `none`.
- In scripted runs with `--ui-library shadcn-ui`, pass explicit shadcn sub-options or the CLI can stop at the shadcn prompt and leave an empty project directory while returning exit code 0.
- `apps/cli/test/cli-builder-sync.test.ts` depends on root-safe path resolution and should fail hard when parsing prompt/schema data instead of silently skipping checks.
- The old CLI/builder sync lane once excluded `analytics=umami`, which masked builder drift. If any schema values are excluded from parity tests, document the product reason and revisit quickly.
- `cli-builder-sync.test.ts` also used to treat `pythonAi=none` as an intentional prompt exclusion. That masked a real regression where the CLI Python AI multiselect lost its explicit "None" option. If a Python prompt supports an explicit "none" path, keep it covered by prompt/schema sync tests.
- React Vite auth support must update dependency processors and template handlers together; dependency-only support creates scaffolds without matching auth files.
- Compatibility rules can expose an API option before `packages/template-generator/src/template-handlers/api.ts` can emit the matching client/server files. Keep compatibility, handler branches, and `templates/api/<option>/...` coverage in sync.
- Fresh now scaffolds as a Deno + Vite app. Local dev runs on `http://localhost:5173`, so user-facing docs and hints should rely on the shared local-port helper rather than duplicating frontend checks.
- Fresh 2 JSR subpaths resolve from the bare `"fresh": "jsr:@fresh/core@..."` import map entry. Do not add a `"fresh/"` prefix mapping in `packages/template-generator/templates/frontend/fresh/deno.json.hbs`.
- AdonisJS generated apps typecheck workspace packages under NodeNext-style import rules. Shared package templates should emit `.js` on relative imports and avoid undeclared cross-package helpers.
- Better Auth generated workspaces pin Kysely through package-manager overrides in `packages/template-generator/src/post-process/package-configs.ts`; revisit the `tanstack-fullstack` and `t3` smoke presets before changing that override.
- `bun run test:release` should stay self-sufficient from a clean checkout. If it starts depending on prebuilt `packages/types` or `packages/template-generator` artifacts again, release confidence drifts silently.
- Root `.gitignore` should use `/test/`, not `test/`, for the Claude scratch folder. The bare pattern also ignores new files under nested tracked dirs like `apps/cli/test/`.
