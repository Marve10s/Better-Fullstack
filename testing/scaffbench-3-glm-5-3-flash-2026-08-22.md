# ScaffBench 3: GLM 5.3 Flash at high effort

First run of the reset suite. The model ran under opencode's stealth alias "Ox
Alpha Free (Unlimited)" and has since been identified as Z.ai's GLM 5.3 Flash. It
is listed in the CLI as `opencode/x-preview-f-free`. The alias and the id are only
linked through the `name` field in the models.dev catalog, which is worth knowing
before anyone goes looking for an `ox-alpha` or `glm-5.3-flash` id on that
endpoint. The `opencode-go/ox-alpha-free` id is a different door onto the
subscription endpoint and needs a funded workspace.

Run on a dedicated Linux box (6 cores, 15 GiB), not a laptop. Protocol: harness
3.1.0, suite 3.0, prompt 2026-08-21-scaffbench-3.1, validation cache v8, resource
profile low-2w-v1, repeats 1, prompt path only.

## Headline

Pass@1 is 8 of 13, or 62%, with a 95% Wilson interval of 36 to 82. Index 69 under
the 75/25 formula the suite launched with; 58 under the graded, difficulty-weighted
index adopted on 2026-08-27 (see the Scoring section of
`docs/guidelines/scaffbench-benchmark.md`).
Cost was zero across every spec.

The gap between wiring and compiling is the story. Stack score averages 90%, so
the model picks and imports the right libraries almost every time. Then a third of
the projects fail to typecheck or build. Quality, the stricter tier that also wants
lint, format and test green, lands at 15%: two projects out of thirteen.

Generation averaged 27 minutes per spec, median 28, p95 49, at 30,300 output
tokens per spec.

## Stack score against Pass@1

```
spec                          stack  wired                       pass@1
dotnet-blazor-cqrs            24/24  ████████████████████  100%  pass
go-realtime-api               16/16  ████████████████████  100%  pass
ts-svelte-edge-orpc           13/13  ████████████████████  100%  pass
elixir-broadway-absinthe      20/20  ████████████████████  100%  pass
rust-leptos-axum              23/24  ███████████████████░   96%  pass
multi-ts-go-grpc              21/22  ███████████████████░   95%  pass
multi-dotnet-ops              17/18  ███████████████████░   94%  pass
java-spring-jooq-keycloak     26/28  ███████████████████░   93%  pass
react-native-expo             13/13  ████████████████████  100%  FAIL typecheck
frontier-effect-eventsourcing 14/14  ████████████████████  100%  FAIL build
frontier-polyglot-proto       10/10  ████████████████████  100%  FAIL buf prerequisite
python-ingestion-api          15/16  ███████████████████░   94%  FAIL typecheck
ai-search-workbench           26/27  ███████████████████░   96%  FAIL build (vite+ clash)
```

Three of the five failures scored a perfect stack. The model assembled everything
the spec asked for and still could not make it compile.

## Full results

| spec | pass@1 | stack | failed steps |
| --- | --- | --- | --- |
| java-spring-jooq-keycloak | pass | 26/28 | none |
| dotnet-blazor-cqrs | pass | 24/24 | none |
| go-realtime-api | pass | 16/16 | format |
| ts-svelte-edge-orpc | pass | 13/13 | lint, format, test |
| elixir-broadway-absinthe | pass | 20/20 | test |
| multi-ts-go-grpc | pass | 21/22 | lint, format, test |
| multi-dotnet-ops | pass | 17/18 | lint |
| rust-leptos-axum | pass | 23/24 | format |
| react-native-expo | fail | 13/13 | typecheck |
| python-ingestion-api | fail | 15/16 | typecheck |
| frontier-effect-eventsourcing | fail | 14/14 | build |
| ai-search-workbench | fail | 26/27 | build |
| frontier-polyglot-proto | fail | 10/10 | prerequisite: buf generate |

Failure tags across the run: test-failed 9, format-failed 8, lint-failed 7,
stack-mismatch 6, validation-failed 5, typecheck-failed 3, build-failed 1,
project-not-found 1.

## Both disputed failures are settled, and neither changes the score

Both needed settling before this `ranked` row went near the board. Neither
survives as an exclusion, so Pass@1 stands at 8 of 13, or 62%, with no asterisk.

### ai-search-workbench: a dropped request, then a real failure

The first attempt ran two steps that made four tool calls (bash, todowrite, bash,
websearch), emitted 588 output tokens, then returned a third step with
`reason: "unknown"` and zero tokens in and out. The process exited 0 after two
minutes with no project on disk. That is the opencode dead-request signature
already seen with Kimi K3, where a dropped request arrives as a zero-usage
unknown rather than an error.

The re-run settled it. This time the model worked for 31 minutes, exited on
`stop`, emitted 46,337 output tokens and wired 26 of the 27 requested libraries.
Install passed and `build` failed:

```
$ vp run build
error: Failed to load task graph
* Task sb21-ai-search-workbench#dev conflicts with a package.json script
  of the same name. Remove the script from package.json or rename the task
```

The model put the project on Vite+ as the spec demands, wrote `"dev": "vp run dev"`
into the root package.json, and also defined a `dev` task in the Vite+ config.
Vite+ refuses to load a task graph when a task name collides with a script name,
so every `vp` command dies, which is why typecheck, lint, format and test never
ran. One naming collision took down the whole toolchain. That is a fair failure
and a good trap: the model knows the tool's surface and not its constraints.

The harness bug behind the first attempt is still real and still unfixed.
`agents/opencode.ts:109` guards for the dead-request signature, but the condition
is `stepReason === "unknown" && outputTokens === 0 && !sawTool && !sawAssistantText`.
It only catches sessions that die before doing anything. That one had already
worked, so it fell through and scored as a model failure. Any opencode run that
dies mid-flight is mis-scored the same way, which is the expensive case: it looks
exactly like a real failure in published data.

### frontier-polyglot-proto: a real failure, reached the long way

The spec runs `buf generate` as a prerequisite. It failed with
`plugin protoc-gen-ts_proto: executable file not found in $PATH`, fail-fast
stopped the run, and install never executed. That prerequisite ordering is a
harness bug in its own right:

- The model declared `ts-proto` as a devDependency, so the plugin binary lands in
  `node_modules/.bin`.
- Bare `buf generate` fails even after `bun install`, because buf resolves
  `local:` plugins through `$PATH` only.
- With `node_modules/.bin` on `$PATH` it succeeds, exit 0, and writes `gen/ts`.

So `prerequisiteCommands` running before install makes any npm-based local codegen
plugin impossible to pass, whatever the model writes. Only exclusively-remote
plugins survive. That will cost a better model a spec later, so it is worth fixing.

It did not cost this one a spec. Building each half by hand, after install and a
working `buf generate`, shows the project does not hold up:

| module | result |
| --- | --- |
| `gateway/go-gateway` | builds, exit 0 |
| `services/rust-core` (cargo) | builds, exit 0 |
| `clients/ts-client` (tsc) | typechecks, exit 0 |
| `gen/go` | fails |

`gen/go` is its own module. Its `go.mod` requires grpc and protobuf, but the model
never wrote a `go.sum`, so building it standalone fails with `missing go.sum entry`
for every generated import. The gateway gets away with it by pulling `gen/go`
through a `replace` directive and covering those dependencies in its own `go.sum`.
`validation/index.ts:501` calls `findManifestRoots(projectDir, ["go.mod"])` and
validates every Go root it finds, so the validator builds `gen/go` directly and it
fails. Fixing the prerequisite ordering would only move the failure one step later.

## Toolchains

bun 1.4.0, node 24.19.0, rustc 1.98.0, cargo 1.98.0, go 1.27.0, dotnet 10.0.400,
python 3.12.3, uv 0.12.5, java 21.0.12 (Temurin), maven 3.9.16, gradle 9.7.1,
elixir 1.20.3 on OTP 29, buf 1.72.0, protoc 35.1, psql 16.15.

## Not done yet

- gpt-5.6-luna at high effort is running now for comparison.
- The publication gates from the pre-run audit are untouched: the three canonical
  runs are not re-recorded under cache v8, dotnet-blazor-cqrs has no canonical, and
  the weak-versus-strong calibration pass has not run. Nothing here belongs on the
  public board until those close.
- Only `low`, `high` and `max` are real efforts for this model. The provider
  rejects `medium` and `xhigh`, and opencode drops an unknown `--variant` silently
  instead of erroring, so a run labelled `medium` would quietly record the
  provider default.
