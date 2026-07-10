# ScaffBench validation-harness audit

I reviewed the current working tree and excluded the two supplied bugs. The namespaced `GATE` matching is correct; I found no suffix-classification defect there.

## Critical

### 1. Nested manifests are assumed to belong to the shallowest workspace without proving membership

**Location:** [scaffbench-v2-lib.ts:2931](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:2931), [scaffbench-v2-lib.ts:2971](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:2971), [scaffbench-v2-lib.ts:2993](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:2993)

**Scenario:** `dropNestedRoots` removes every nested manifest whenever a shallower manifest exists. It does not inspect Bun `workspaces`, Cargo workspace members, or uv workspace configuration. The Bun fallback descends only when the root has neither build nor typecheck; a root `"build": "echo ok"` suppresses validation of independent nested applications. Cargo and Python have no fallback at all.

**Direction:** False pass.

**Fix:** Parse actual workspace membership. Validate every nested manifest that is not demonstrably covered by the parent workspace’s build/check command.

### 2. .NET validates one selected `.csproj`, not the solution

**Location:** [scaffbench-v2-lib.ts:3445](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:3445), [scaffbench-v2-lib.ts:3537](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:3537)

**Scenario:** All `.csproj` directories are discovered, but only `apps/server` or `roots[0]` is restored and built. A solution containing an API, worker, shared library, and test project passes if the selected API builds, even when an unreferenced worker or another solution project does not compile. `.sln`/`.slnx` files are never considered.

**Direction:** False pass.

**Fix:** Prefer building the solution file. Without a solution, validate every independent project root and namespace its steps.

### 3. Python “typecheck” is only a syntax compilation

**Location:** [scaffbench-v2-lib.ts:3367](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:3367)

**Scenario:** The core Python check is `python -m compileall`. Bytecode compilation does not resolve imports or execute module initialization. A FastAPI app containing `from undeclared_package import Client`, an invalid Pydantic model declaration, or an import-time configuration error can pass install and compileall while failing immediately when imported or started.

**Direction:** False pass.

**Fix:** Run a configured typechecker when present and add an import/startup smoke test for the application entry point. Keep `compileall` as an additional syntax check, not the core typecheck.

### 4. Every validation timeout is classified as infrastructure

**Location:** [scaffbench-v2-lib.ts:4138](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:4138)

**Scenario:** Any timed-out step makes the entire run infra-inconclusive. A model-authored `"build": "vite build --watch"`, deadlocked application test, or hanging code generator is therefore removed from the denominator rather than scored as a failure. Conversely, a Docker-dependent advisory test timing out also erases a successfully measured core build.

**Direction:** Infra-misattribution in both directions.

**Fix:** Treat core command timeouts as model failures unless there is positive evidence of machine-level failure. Track quality-tier inconclusiveness separately so an advisory timeout does not invalidate an already measured core verdict.

### 5. Fast network and registry failures are model failures—and then get cached

**Location:** [scaffbench-v2-lib.ts:3108](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:3108), [scaffbench-v2-lib.ts:4138](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:4138)

**Scenario:** DNS failures, proxy/TLS errors, HTTP 429/5xx responses, registry outages, or corrupted shared Maven/Gradle caches commonly exit nonzero without timing out or failing to spawn. They are classified as model failures. `cacheableValidation` excludes only timeouts and spawn errors, so that transient failure is persisted and replayed for identical sources.

**Direction:** Infra-misattribution and persistent false fail.

**Fix:** Recognize narrowly defined transient infrastructure signatures and do not cache those results. Prefer caching deterministic green validations; cache deterministic failures only after classifying their cause.

### 6. Validation runs on a lossy archive, not the generated project

**Location:** [scaffbench-v2-lib.ts:2052](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:2052), [scaffbench-v2-lib.ts:2897](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:2897)

**Scenario:** Before validation, every directory named `build`, `dist`, `bin`, or `obj` is removed at any depth. These names are not guaranteed to be artifacts. For example, a Go project whose commands live under `bin/server` can be archived with all Go source removed; `go build ./...` may then succeed with no matched packages. Conversely, a package intentionally consuming committed `dist` output can fail only because the harness deleted it.

**Direction:** False pass or false fail.

**Fix:** Exclude ecosystem-specific artifact paths only when they are known build outputs. Prefer validating the original isolated tree, then archive it afterward.

## High impact

### 7. The three-root cap silently ignores valid services

**Location:** [scaffbench-v2-lib.ts:2945](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:2945), [scaffbench-v2-lib.ts:2972](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:2972), [scaffbench-v2-lib.ts:3018](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:3018)

**Scenario:** Only the first three roots per Bun/Cargo/Python/Go ecosystem are validated. A four-service Go monorepo passes even if the lexically later fourth module does not compile. No skipped-root step or inconclusive marker is emitted.

**Direction:** False pass.

**Fix:** Remove the cap or batch all roots under the global validation budget. If a cap is necessary, emit a failing/inconclusive core step listing every unvalidated root.

### 8. `cargo check` never proves that the Rust application links

**Location:** [scaffbench-v2-lib.ts:3344](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:3344)

**Scenario:** `cargo check` type-checks and compiles metadata but does not link the final binaries. Missing native libraries, undefined extern symbols, and final-link configuration errors can pass `cargo check` while `cargo build` fails. It also lacks explicit `--workspace --all-targets`, leaving coverage to Cargo’s default-member behavior.

**Direction:** False pass.

**Fix:** Use `cargo build --workspace --all-targets` as the core build gate, optionally retaining `cargo check` as a faster diagnostic step.

### 9. React Native/Expo is never bundled or checked by Expo

**Location:** [scaffbench-v2-lib.ts:3173](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:3173), [scaffbench-v2-lib.ts:3243](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:3243)

**Scenario:** Expo projects receive Bun install plus a TypeScript check when available. The “doctor” command is Better-Fullstack’s doctor, not `expo-doctor`. An app with invalid Expo config, incompatible SDK/native-module versions, unresolved Metro assets, or a bundling-only error can pass core validation.

**Direction:** False pass.

**Fix:** Add an Expo profile that runs `expo-doctor` and a non-interactive production export/bundle command such as `expo export`.

### 10. `go mod tidy` promotes test-only problems into the core install gate

**Location:** [scaffbench-v2-lib.ts:3407](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:3407)

**Scenario:** `go mod tidy` loads the module’s package graph, including test and platform-tagged dependencies, and mutates `go.mod`/`go.sum`. A production application that builds successfully can fail core validation because a `_test.go` file references an unavailable module, even though tests are advisory. It can also repair dependency metadata before the actual build is measured.

**Direction:** False fail, with possible laundering of manifest defects.

**Fix:** Use a non-mutating dependency/download step before `go build ./...`. Run tidy as a separate read-only diff/quality check on a copy.

### 11. Nested missing toolchains are charged to the model, while broken local wrappers are excluded as infra

**Location:** [scaffbench-v2-lib.ts:2583](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:2583), [scaffbench-v2-lib.ts:3493](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:3493), [scaffbench-v2-lib.ts:4152](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:4152)

**Scenario:** If `bun run build` invokes an unavailable system `protoc`, Bun spawns successfully, so `spawnError` is false and exit 127 becomes a model failure. In the opposite direction, an existing model-created `mvnw` without its executable bit produces an `EACCES` spawn error and becomes infra-inconclusive even though the broken mode is part of the artifact.

**Direction:** Infra-misattribution in both directions.

**Fix:** Record spawn error codes and command ownership. Missing harness/system executables may be infra; missing executable bits or malformed project-local wrappers should be model failures. Preflight required external codegen tools explicitly.

### 12. Project disambiguation omits Java, .NET, and Elixir manifests

**Location:** [scaffbench-v2-lib.ts:2871](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:2871)

**Scenario:** When the expected project-name directory is absent and multiple candidate directories exist, disambiguation recognizes package.json, Cargo, Go, Python, and `bts.jsonc` only. A real Java `pom.xml`, Gradle, `.csproj`, or `mix.exs` project plus one stray directory resolves to `null` and is scored project-not-found.

**Direction:** False fail.

**Fix:** Make candidate detection ecosystem-aware and include `pom.xml`, Gradle manifests, `mix.exs`, solution/project suffixes, and other profiles supported by the validator.

### 13. Required cross-language code generation is not itself a gate

**Location:** [scaffbench-v2-lib.ts:3173](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:3173), [scaffbench-v2-lib.ts:3407](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:3407)

**Scenario:** The frontier protobuf spec explicitly requires working shared codegen. Bun runs only `build`, Go runs `go build`, and no generic root `generate`, Makefile, Buf, or Taskfile lifecycle is exercised. Checked-in stale/manual stubs can let all component builds pass while `make generate` or `buf generate` is broken.

**Direction:** False pass.

**Fix:** Add spec/profile-declared prerequisite commands and run codegen from a clean generated-output state before component builds.

### 14. Cache identity ignores executable modes, symlinks, platform, and toolchain versions

**Location:** [scaffbench-v2-lib.ts:3112](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:3112), [scaffbench-v2-lib.ts:3128](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:3128)

**Scenario:** The source hash contains paths and bytes only. It omits executable bits and skips symlinks because only `Dirent.isFile()` entries are collected. Thus executable and non-executable `mvnw` trees collide. The cache key also lacks OS/architecture and Bun, Go, Rust, Python, .NET, Java, and Elixir toolchain versions, so a result can survive an environment change that changes the real verdict.

**Direction:** False pass or false fail through stale/colliding cache hits.

**Fix:** Hash file type, mode, and symlink target. Add a validator-plan digest plus platform and relevant toolchain fingerprints to the cache key.

## Scoring-consumer correctness

### 15. “Full pass” is true when no quality gate ran

**Location:** [scaffbench-v2-lib.ts:4115](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench-v2-lib.ts:4115), [build-scaffbench-data.ts:85](/Users/ibrahime/Documents/Better-Fullstack/scripts/build-scaffbench-data.ts:85)

**Scenario:** `qualityPassed` applies `every()` to an empty advisory-step list. The consumer’s `fullPass` similarly requires only that all existing applicable steps pass; core steps make the list nonempty. With `qualityGate: false`, a native project can therefore receive Full pass without lint, format, or tests having run. TypeScript is inconsistently stricter because a shipped lint script runs even when the quality option is disabled.

**Direction:** False pass in the Full tier and cross-ecosystem skew.

**Fix:** Persist whether quality validation was requested and whether expected gates were attempted. Report Full as unavailable when the gate was disabled, or require explicit advisory coverage before Full can be true.

### 16. Multiple efforts or trials collapse to one arbitrary result in leaderboard consumers

**Location:** [build-scaffbench-data.ts:113](/Users/ibrahime/Documents/Better-Fullstack/scripts/build-scaffbench-data.ts:113), [splice-scaffbench-2-1.ts:86](/Users/ibrahime/Documents/Better-Fullstack/scripts/splice-scaffbench-2-1.ts:86)

**Scenario:** `resByCell` is keyed only by `path|specId`, omitting effort and trial. Later results overwrite earlier ones. Meanwhile `scoredRuns`, wired score, cost, and other fields come from the aggregate. A multi-effort or repeated run can therefore publish the last result’s core/full verdict alongside another effort’s identity and an aggregate from several trials; array order can flip the cell.

**Direction:** False pass or false fail in published leaderboard data.

**Fix:** Key results by model, effort, path, spec, and trial. For repeated runs, derive the displayed verdict from the aggregate’s pass counts or explicitly assert `repeats === 1` for Pass@1 exports.
