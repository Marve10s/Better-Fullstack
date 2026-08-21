# ScaffBench validation footprint investigation (2026-08-21)

Author: gpt-5.6-sol (xhigh reasoning, read-only codex session 01a02404), commissioned to find lower-machine-footprint verification approaches. Claims below were spot-verified against the harness by the primary agent; see scaffbench-benchmark.md for the protocol this must respect.


ScaffBench is serial only at the project level. It does not constrain the parallelism inside Cargo, Go, Bun, uv, Gradle, Erlang, test runners, or model-authored build scripts. That explains why concurrency 1 can still saturate a 10-core Mac.

The best first move is a documented `low-v7` validation resource profile with two-worker tool caps, macOS background scheduling, longer timeouts, fail-fast execution, and reliable process-tree cleanup. This should cut peak CPU and memory without weakening Core or Full verdicts. A containerized or remote validation worker is the stronger long-term answer because the current host execution is not a security boundary.

No useful CPU, peak-RSS, or energy telemetry exists in the current results. The percentage estimates below refer to reductions in documented concurrency limits, not measured reductions on this laptop.

## What the harness does today

- [validatePendingResults()](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench/runner.ts:741) validates projects with `concurrency: 1`, then [validateProject()](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench/validation/index.ts:276) runs discovered ecosystems sequentially.
- Each ecosystem can still use every logical CPU. [commandStep()](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench/validation/index.ts:38) passes no resource limits.
- [runCommand()](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench/agents/command.ts:43) gives children the complete harness environment, collects their complete output in memory, and kills only the direct child on timeout.
- The current limits are 10 minutes per step and 45 minutes per project in [constants.ts](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench/constants.ts:74). Throttling without increasing these limits would create false timeout failures.
- [validateProjectCached()](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench/validation/cache.ts:31) hashes the archive before validation. Validation then mutates that archive through lockfiles and generated output. A forced revalidation may therefore hash a different tree and miss the cache.
- The cache lives under one output directory. It does not reuse an identical validation from another run directory.
- [collectToolchainVersions()](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench/summary.ts:530) starts eight version probes for every cache lookup. It omits Bun, Node, Java, Maven, Gradle, Elixir, Erlang, and Buf.
- Root discovery repeatedly walks the same source tree. Bun, Cargo, Python, Go, .NET, Java, and Elixir each perform one or more independent scans.
- The 13-spec cohort contains seven Bun projects, three Go validations, two Cargo validations, two .NET validations, and one each for Python, Java, and Elixir. Caps on Bun, Go, Cargo, and .NET cover most of the cohort.

## Recommended low-resource profile

The profile must be fixed for published rows and included in provenance and the validation cache key. Exploratory overrides are fine, but rows with different profiles should not be compared.

| Tool | Proposed settings | Expected peak effect | Fidelity notes |
|---|---|---:|---|
| Universal macOS policy | Run validation children under `taskpolicy -b -d throttle -c background` | Lower CPU priority and throttled disk and new network I/O | `taskpolicy` policies are inherited by children. It lowers interference but is not a CPU quota. [Darwin taskpolicy manual](https://keith.github.io/xcode-man-pages/taskpolicy.8.html) |
| Bun install | `--concurrent-scripts=2 --network-concurrency=8`; `--no-save` when no lock; `--frozen-lockfile` when a lock exists | Lifecycle concurrency falls from the installed Bun default of 5 to 2. Network requests fall from 48 to 8 | Do not use `--ignore-scripts`; it changes install semantics. Bun already uses a global cache and copy-on-write cloning on macOS. [Bun install documentation](https://bun.sh/docs/pm/cli/install) |
| Node builds | Universal background policy first; cap known task runners only when the command can be identified safely | Depends on framework | `UV_THREADPOOL_SIZE` does not cap worker threads created by bundlers. A generic Node CPU cap is not reliable. Avoid a low `--max-old-space-size` until RSS data exists. |
| Cargo | `CARGO_BUILD_JOBS=2`, plus `-j 2` on check, clippy, and test | Compiler-process ceiling falls from 10 to 2, an 80% concurrency reduction | Cargo documents logical CPUs as the default. Keep `target/` project-local. [Cargo configuration](https://doc.rust-lang.org/cargo/reference/config.html) |
| Go | `GOMAXPROCS=2`; `-p=2` on build, vet, and test; `-parallel=2` on test | Package-build concurrency falls from 10 to 2. Parallel tests also fall to 2 | `-p` controls simultaneous build programs, while `GOMAXPROCS` also constrains Go runtime work. [Go command reference](https://pkg.go.dev/cmd/go) |
| .NET | `-m:1 -lowPriority -nr:false -p:BuildInParallel=false`; tests with `-p:TestTfmsInParallel=false` | One MSBuild project process, low priority, no lingering worker nodes | MSBuild already defaults to one process unless `-m` is supplied, so the main gains are explicitness, priority, and process cleanup. [MSBuild switches](https://learn.microsoft.com/en-us/visualstudio/msbuild/msbuild-command-line-reference?view=visualstudio) |
| Gradle | `--max-workers=2 --no-parallel --priority=low --no-daemon --no-watch-fs` | Worker ceiling falls from 10 to 2. No daemon holds memory after validation | Gradle defaults to processor count and leaves daemons alive by default. [Gradle CLI](https://docs.gradle.org/current/userguide/command_line_interface.html) |
| Maven | Keep single-threaded build; set artifact download threads to 2; pilot `JAVA_TOOL_OPTIONS=-XX:ActiveProcessorCount=2` | Small CPU change, lower download and JVM thread bursts | Maven is already single-threaded without `-T`. Do not impose a small JVM heap before measuring legitimate builds. [Maven configuration guide](https://maven.apache.org/guides/mini/guide-configuring-maven.html) |
| uv | `UV_CONCURRENT_BUILDS=2`, `UV_CONCURRENT_INSTALLS=2`, `UV_CONCURRENT_DOWNLOADS=8`; use `uv run --no-sync` after the first successful sync | Builds and installs fall from 10 workers to 2. Downloads fall from 50 to 8 | uv normally checks and syncs the environment on every `uv run`. `--no-sync` is equivalent after a successful `uv sync`. [uv settings](https://docs.astral.sh/uv/reference/settings/), [uv locking and syncing](https://docs.astral.sh/uv/concepts/projects/sync/) |
| Elixir and Erlang | `ERL_FLAGS="+S 2:2 +SDcpu 1:1 +SDio 1"` | Normal BEAM schedulers fall from about 10 to 2 | Confirm flags against the installed OTP version during preflight. [Erlang runtime flags](https://www.erlang.org/docs/25/man/erl.html) |

Start with two workers. One worker minimizes footprint further but can make framework builds disproportionately slow and increase timeout risk.

## Quick wins

### 1. Add the fixed resource profile

What changes:

- Add a `ValidationResourceProfile` in [types.ts](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench/types.ts:295).
- Put the published profile and revised timeouts in [constants.ts](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench/constants.ts:74).
- Make [commandStep()](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench/validation/index.ts:38) merge the profile with step-specific environment variables.
- Apply the ecosystem settings in `validateBunProject`, `validateCargoProject`, `validatePythonProject`, `validateGoProject`, `validateDotnetProject`, `validateJavaProject`, and `validateElixirProject`.
- Record `resourceProfileId`, worker limit, QoS policy, timeout policy, and cache mode in `ProjectValidation`, summary metadata, and [validationCacheKey()](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench/validation/cache.ts:105).
- Double the first pilot limits to about 20 minutes per step and 90 minutes per project. Adjust from measured data before publishing.

Expected saving:

- Up to 80% fewer concurrent Cargo, Go, Gradle, uv, and Erlang workers on this 10-core machine.
- 60% fewer Bun lifecycle-script jobs with a 5-to-2 cap.
- Lower disk and network interference from the Darwin background policy.
- Node framework builds remain the largest uncapped case.

Verdict and comparability risk:

- Low if timeouts rise with the caps.
- Medium if memory limits are added without measurements.
- Every row must use the same profile. A profile change requires a cache-version bump.

Effort: 2 to 4 engineering days, including focused tests and documentation.

### 2. Stop after the verdict is already determined

The validators currently continue after a failed Bun build or typecheck, and quality gates continue after a failure or disqualifying skip. That spends CPU on commands that cannot change either tier.

What changes:

- Build a complete validation plan before execution in [validateProject()](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench/validation/index.ts:276).
- Once any definitive Core step fails, stop all later expensive steps. Core and Full are already false.
- Once Core passes and one applicable quality gate fails or skips, stop later quality commands. Full is already false.
- Put format checks before lint and tests where possible. Tests stay last.
- Detect missing Bun linter or formatter before running any quality command. Record all applicable skips, then stop.
- Add `status: "not-run"` with a reason such as `earlier-core-failure`. Update [validationPassed()](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench/scoring.ts:461) and `qualityPassed()` so a planned but unexecuted applicable gate can never become a pass.

Expected saving:

- High on weak-model runs and Full failures.
- A failed Bun build can avoid typecheck, lint, format, tests, and later native compiles.
- A format failure can avoid lint and tests.
- Savings approach all remaining validation work after the first failure. Green projects receive little benefit.

Verdict and comparability risk:

- Low for boolean verdicts if the plan records every applicable gate before execution.
- Diagnostic coverage decreases. Repair remains safe because it already selects the first Core failure and revalidates after the source changes.
- Do not omit planned steps silently.

Effort: 2 to 3 days.

### 3. Kill process groups and bound output memory

The current timeout sends signals to the direct child. Watchers and grandchildren may survive. The repository already has a detached process-group implementation in [generated-project-proof.ts](/Users/ibrahime/Documents/Better-Fullstack/testing/generated-project-proof.ts:48).

What changes:

- Give validation commands their own process group in [runCommand()](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench/agents/command.ts:43), or introduce a validation-only executor.
- On step timeout, project deadline, interruption, or harness exit, send `SIGTERM` to the group, wait briefly, then send `SIGKILL`.
- Ensure the project-deadline finalizer kills the active group before returning `unvalidated:deadline`.
- Replace unbounded `Stream.runFold` output accumulation with bounded tails plus a streamed `validate.log`.
- Set an output ceiling, such as 16 MiB per stream. Exceeding it should terminate the group and produce explicit model-owned failure evidence.

Expected saving:

- Little change on normal runs.
- Bounded harness RAM regardless of command output.
- Runaway watcher CPU, RAM, and disk use ends at the timeout instead of continuing indefinitely.
- This directly fixes the known watcher-shaped process problem.

Verdict and comparability risk:

- Low. Timeout semantics already count Core hangs as model failures.
- The output limit becomes part of the protocol and cache identity.
- Generation commands still need full JSON output, so bounded capture should apply only to validation.

Effort: 2 to 4 days in TypeScript. A Rust supervisor is not needed for the first version.

### 4. Validate an immutable copy

The archive is both the evidence artifact and the mutable validation workspace. Bun, Cargo, uv, Mix, code generation, and framework builds can create lockfiles and output directories. The source hash therefore does not remain stable.

[archiveProjectSource()](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench/validation/index.ts:112) also removes every directory named `build`, `dist`, `bin`, or `obj` at any depth. A model may legitimately place source in one of those directories.

What changes:

- Preserve a faithful source archive.
- Create an APFS copy-on-write validation directory per project. Recursively clone files with `COPYFILE_FICLONE`, preserve modes and symlinks, and delete the clone after validation.
- Hash the pristine archive once.
- Run all prerequisites and validators against the clone.
- Use `bun install --no-save` when no Bun lock exists and frozen install when one exists.
- Replace [runGoTidyAdvisory()](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench/validation/index.ts:1120) with `go mod tidy -diff`. The installed Go tool documents this as non-mutating and nonzero when changes are required.

Expected saving:

- Reliable cache hits after forced revalidation.
- No persistent `node_modules`, `.venv`, `target`, `.output`, `_build`, or lockfile growth in archived evidence.
- `go mod tidy -diff` removes a recursive copy.
- The copy-on-write clone adds small metadata cost on the first validation but copies data only when a command changes it.

Verdict and comparability risk:

- Low. This improves artifact fidelity.
- Some builds inspect absolute paths, but validation already runs from an archived path rather than the generation path.
- Broad archive exclusions should be removed only after archive-size and file-count guards exist.

Effort: 2 to 4 days.

### 5. Remove repeated work with exact equivalence

What changes:

- Python: after `uv sync --all-extras`, use `uv run --no-sync` for compile, typecheck, Ruff, and pytest in [validatePythonProject()](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench/validation/index.ts:602).
- Go: use `go mod tidy -diff`.
- Cargo Full validation: run `cargo clippy --workspace --all-targets -- -D warnings` first. If it passes, that command can satisfy both `cargoCheck` and `lint`. If it fails, run `cargo check --workspace --all-targets` to determine Core independently.
- .NET, Maven, and Gradle can use the same optimistic-superset pattern. A passing test command includes compilation and can satisfy build plus test. If it fails or times out, run the build-only command to establish Core.
- TypeScript: reuse a build result as typecheck only when the build command explicitly and unconditionally invokes the same typecheck command. Do not infer equivalence from framework names.

Expected saving:

- `uv run --no-sync` avoids up to five repeated environment scans.
- Passing Cargo Full projects avoid one compiler pass.
- Passing Java and .NET projects avoid one build-tool startup and configuration phase. Their existing incremental output already limits duplicate compilation, so this gain is moderate.
- Failure cases perform the same number of heavy commands as today.

Verdict and comparability risk:

- Low for uv and `go mod tidy -diff`.
- Medium for superset-command reuse. Each equivalence needs a test proving that a green superset establishes both gates and that a failed advisory command still triggers the independent Core command.
- Record one physical command with multiple gate claims instead of fabricating two executions.

Effort: 1 day for uv and Go. Another 3 to 5 days for proven superset planning.

### 6. Improve validation caching

What changes:

- Memoize host toolchain probes once per harness run instead of starting eight probes for each project.
- Probe only toolchains relevant to the discovered plan.
- Add Bun, Node, Java, Maven, Gradle, Elixir, Erlang, and Buf.
- Resolve project-sensitive versions from the project directory. This matters for `global.json`, wrappers, and local tool selection.
- Move deterministic validation results to a shared content-addressed cache outside an individual output directory.
- Include the resource profile, sandbox image digest, offline mode, command-plan digest, platform, architecture, and toolchain fingerprints.
- Never cache timeouts, process-limit kills, output-limit kills, transient network failures, or memory-pressure failures.

Expected saving:

- A true cache hit avoids all installation and compilation.
- Memoization reduces as many as 104 small toolchain subprocesses across a 13-project run to one relevant set.
- Cross-run hits will be uncommon for independent model output, but common during repeated revalidation of canonical or unchanged archives.

Verdict and comparability risk:

- Low if the key is complete.
- A shared cache with an incomplete identity can create false passes across toolchain changes.
- Do not add root-level step caching yet. Untrusted build scripts can read files outside their manifest root, so a safe per-root input closure is difficult to prove.

Effort: 2 to 4 days.

### 7. Scan the source tree once and enforce generous artifact budgets

What changes:

- Replace repeated [walk()](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench/validation/shared.ts:38) calls with one immutable manifest inventory.
- Use that inventory for Bun, Cargo, Python, Go, .NET, Java, and Elixir root planning.
- Reuse it during hashing where possible.
- Add documented limits for source files, source bytes, manifest roots, individual file size, and output bytes.
- An exceeded model-output limit should create explicit failure evidence. A harness inability to inspect an otherwise in-limit tree remains infrastructure.

Expected saving:

- Several full filesystem walks become one.
- Small normal-case improvement.
- Large protection against a generated tree containing millions of files or a huge sparse file.

Verdict and comparability risk:

- Low with generous limits and explicit failure records.
- The limits become benchmark rules and must appear in protocol provenance.

Effort: 2 to 3 days.

### 8. Use the existing two-phase mode operationally

This needs no code.

- Generate with `--generate-only`.
- Run the same command and output directory later with `--validate-existing`, keeping the original model, effort, spec, path, and quality arguments.
- Wrap only the validation phase with `taskpolicy`.
- Run it overnight or while the laptop is otherwise idle.
- Add a fixed 15 to 30 second cooldown between projects. This lowers average power and thermal accumulation, though it does not lower peak use during a command.
- Do not rely only on the current [validationPriority()](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench/runner.ts:805). It places Rust and .NET at the hot end of the queue.

Expected saving:

- Lower interference with interactive use.
- A fixed cooldown reduces sustained temperature and the chance that later trials run under thermal throttling.
- Total compute and energy change little.

Verdict and comparability risk:

- Very low. The validation commands remain unchanged.
- Fixed cooldowns are easier to document than adaptive thermal pauses.
- Adaptive waits based on load or temperature are useful operationally, but the harness should record when and why it waited.

Effort: none for two-phase operation. Less than one day for fixed cooldown and logging.

## Package cache strategy

Most package managers already share download caches across projects. Simply assigning cache directories will not produce the gains of a new cache on a machine whose normal caches are warm.

- Bun already uses `~/.bun/install/cache` and macOS clonefile installation. [Bun documentation](https://bun.sh/docs/pm/cli/install)
- Cargo uses `$CARGO_HOME` as a download and source cache. [Cargo Home](https://doc.rust-lang.org/cargo/guide/cargo-home.html)
- Go shares its module cache across projects and authenticates cached modules against `go.sum`. [Go module cache](https://go.dev/ref/mod)
- uv uses an aggressive, append-only cache and copy-on-write installation on macOS. [uv cache documentation](https://docs.astral.sh/uv/concepts/cache/)
- NuGet checks its global package folder before network sources. [NuGet cache documentation](https://learn.microsoft.com/en-us/nuget/consume-packages/managing-the-global-packages-and-cache-folders)
- Maven’s local repository defaults to `~/.m2/repository`. [Maven settings](https://maven.apache.org/settings.html)

The useful change is isolation and repeatability:

1. Give ScaffBench dedicated, versioned dependency caches.
2. Record cache mode and cache generation in provenance.
3. Keep build outputs project-local. Do not share Cargo `target`, Gradle build outputs, Turbo task outputs, `.venv`, or `node_modules` across untrusted trials.
4. Do not expose writable shared caches to model-authored code in a future sandbox. Use a read-only warmed snapshot plus a disposable per-project overlay.

A pull-through mirror is a larger project. It helps cold cohorts and registry outages, but it is less important than worker caps because current package managers already avoid most repeated downloads.

## Security finding

The current validator executes arbitrary code on the personal host account:

- Bun root lifecycle scripts and build scripts.
- Cargo `build.rs`.
- Python build backends and the import smoke test.
- Maven and Gradle plugins, including model-created wrapper scripts.
- `mix.exs`.
- Generated test suites and the `buf generate` prerequisite.

[runCommand()](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench/agents/command.ts:103) also passes the complete harness environment. Removing tokens from the environment helps, but a process running under the same macOS user can still read files through absolute paths.

Immediate interim controls:

- Use a validation-specific environment allowlist.
- Remove agent credentials, cloud tokens, SSH agent variables, package publication tokens, and Git credential variables.
- Set `GIT_TERMINAL_PROMPT=0` and disable interactive package-manager prompts.
- Use a dedicated temporary `HOME`.
- Prefer a dedicated macOS account if host validation continues.

These steps reduce accidental exposure but do not create isolation.

## Larger projects

### A. Containerized validation worker

Build a pinned ARM64 Linux image with Bun, Rust, Go, .NET, Java, Elixir, uv, and Buf. Run one disposable container per project with about two CPUs, a measured memory limit, a PID limit, a read-only source mount, and a writable copy-on-write workspace.

Expected saving:

- A real CPU quota prevents saturation.
- A memory limit and PID limit contain runaways.
- Killing the container kills the complete process tree.
- Dedicated cache snapshots remove repeated downloads.
- Docker supports hard memory limits and CPU quotas such as `--cpus=2`. [Docker resource constraints](https://docs.docker.com/engine/containers/resource_constraints/)

Risk:

- Docker Desktop or another Linux VM has its own idle RAM and CPU cost.
- Linux verdicts are not macOS verdicts.
- All published 3.0 rows must use the same image digest.
- Writable shared caches would create a cross-trial poisoning channel.

Effort: 2 to 4 weeks, including the image, cache overlays, provenance, and canonical calibration.

This is the best same-machine security and hard-cap option, but it is not the smallest implementation.

### B. Dedicated remote validation worker

Run the same pinned image on a small two-core remote machine. Upload source archives and download signed validation results.

Expected saving:

- Nearly zero MacBook validation footprint.
- Stable CPU and memory allocation.
- No personal-account exposure.

Risk:

- Network transfer and runner cost.
- Requires result authentication, archive retention, and reliable toolchain image publication.
- Results are comparable only within the remote environment.

Effort: 2 to 4 weeks. This is the cleanest long-term answer if the benchmark will run regularly.

### C. Prefetch and offline cache snapshots

After generation:

1. Parse manifests and lockfiles with trusted code.
2. Fetch dependencies into a new cohort cache.
3. Seal the cache snapshot.
4. Run validation offline with the snapshot read-only and a disposable overlay.

Expected saving:

- Almost no registry traffic during compile and test phases.
- Registry failures become prefetch infrastructure failures instead of contaminating model verdicts.
- Identical dependency versions are fetched once per cohort.

Risk:

- Projects without lockfiles may resolve different versions across dates.
- Some install phases need to execute build backends or download secondary binaries.
- A missing offline artifact must be infrastructure-inconclusive, not a model failure.
- A mirror without an immutable snapshot can reduce comparability rather than improve it.

Effort: 2 to 4 weeks across all ecosystems.

### D. Native supervisor

A Rust supervisor could create process groups, set Darwin policies, stream bounded logs, sample aggregate RSS, enforce PID and output limits, and kill escaped descendants.

Expected saving:

- Stronger runaway control and lower harness overhead than repeated shell wrappers.
- Better peak-RSS and CPU accounting.

Risk:

- macOS has no cgroup-style aggregate CPU quota. A host supervisor can lower priority and kill over-limit trees, but it cannot match container isolation.
- `taskpolicy -m` and per-process memory limits are not reliable substitutes for an aggregate group limit without careful testing.

Effort: 1 to 2 weeks. Build it only if the TypeScript process-group executor proves unreliable.

## Fidelity fixes worth pairing with this work

| Finding | Change and location | Resource effect | Verdict risk | Effort |
|---|---|---|---|---:|
| Install-only Bun root can pass | In [validateProject()](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench/validation/index.ts:348), add an `unvalidated:bun` Core failure when a root has no build, no typecheck, and no covered member that provides one | Negligible | Correctly changes false passes | 0.5 day |
| Java and Elixir select one build root | Replace [findBuildRoot()](/Users/ibrahime/Documents/Better-Fullstack/scripts/scaffbench/validation/index.ts:751) with membership-aware multi-root planning | More work on multi-root output; fail-fast offsets it | Improves coverage but can lower scores | 2 to 3 days |
| Cargo Full gates lack consistent workspace coverage | Add `--workspace --all-targets` to clippy and appropriate workspace coverage to test | More work, not less | Improves Full honesty | 0.5 day |
| Rust Core uses `cargo check`, not linking | Keep `cargo check` for the low-footprint compile gate unless the protocol explicitly requires final linking. If linking becomes required, use `cargo build --workspace --all-targets` and accept the cost | A build is materially heavier | High comparability impact | Protocol decision |
| Python installs all optional extras | Decide whether Core means default plus dev dependencies or every optional extra. If optional extras are not applicable, replace `--all-extras` with locked default sync | Can be a large saving for projects with heavy optional dependencies | Medium to high because verdicts change | 1 day plus documentation |
| Cache archive is lossy | Preserve all authored source and validate a copy instead of deleting every `bin`, `build`, or `dist` directory | Small archive growth | Improves fidelity | Covered by immutable-copy work |

## Protocol changes required

Before publishing any result under the optimized validator:

- Bump `VALIDATION_CACHE_VERSION` from v6.
- Bump the harness patch version.
- Update the protocol table and validator notes in [scaffbench-benchmark.md](/Users/ibrahime/Documents/Better-Fullstack/docs/guidelines/scaffbench-benchmark.md:1).
- Update the protocol guard in [build-scaffbench-3-data.ts](/Users/ibrahime/Documents/Better-Fullstack/scripts/build-scaffbench-3-data.ts:1).
- Add `resourceProfileId`, command-plan digest, sandbox identity, cache mode, and limits to persisted provenance.
- Keep Core and Full independent. A failed advisory command must still permit a Core verdict. A skip must still disqualify Full.
- Increase deadlines with reduced parallelism.
- Re-run canonical recording and weak-versus-strong calibration under the final resource profile. Old validations cannot be mixed with new-profile validations.

## Recommended adoption order

1. Immediately use `--generate-only` and a separate `--validate-existing` phase under `taskpolicy`, preferably overnight.
2. Add step telemetry, including peak RSS, CPU time, child count, output bytes, and cooldown time. Pilot one Bun project, the Rust project, and the polyglot project.
3. Fix process-group termination and bounded output capture.
4. Add the fixed two-worker `low-v7` profile, background QoS, longer timeouts, and full provenance.
5. Add planned fail-fast execution with cheap quality gates first.
6. Validate an APFS copy-on-write clone, preserve the archive, use `bun install --no-save`, and replace copied Go tidy with `go mod tidy -diff`.
7. Add `uv run --no-sync`, toolchain-probe memoization, complete cache identity, and a shared result cache.
8. Add the single manifest inventory and artifact budgets.
9. Pilot superset-command reuse for Cargo, .NET, Maven, and Gradle. Adopt each only after equivalence tests.
10. Before the first public 3.0 run, move untrusted validation to a dedicated account at minimum. Prefer a pinned container or remote worker if ScaffBench will become a recurring benchmark.

I would not start with local mirrors, shared compiler-output directories, or a custom Rust supervisor. Worker caps, fail-fast execution, immutable validation copies, and correct process cleanup offer more benefit for less code and less verdict risk.

No files were modified, and no tests or builds were run.