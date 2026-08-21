# ScaffBench 3: Ox Alpha Free at high effort

First run of the reset suite. Ox Alpha Free is opencode's free 1M-context stealth
reasoning model, listed in the CLI as `opencode/x-preview-f-free` and shown in the
model picker as "Ox Alpha Free (Unlimited)". The two names are only linked through
the `name` field in the models.dev catalog, which is worth knowing before anyone
goes looking for an `ox-alpha` id. The `opencode-go/ox-alpha-free` id is a
different door onto the subscription endpoint and needs a funded workspace.

Run on a dedicated Linux box (6 cores, 15 GiB), not a laptop. Protocol: harness
3.1.0, suite 3.0, prompt 2026-08-21-scaffbench-3.1, validation cache v8, resource
profile low-2w-v1, repeats 1, prompt path only.

## Headline

Pass@1 is 8 of 13, or 62%, with a 95% Wilson interval of 36 to 82. Index 69.
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
ai-search-workbench           0/27   ░░░░░░░░░░░░░░░░░░░░    0%  FAIL provider drop
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
| ai-search-workbench | fail | 0/27 | none reached |
| frontier-polyglot-proto | fail | 10/10 | prerequisite: buf generate |

Failure tags across the run: test-failed 9, format-failed 8, lint-failed 7,
stack-mismatch 6, validation-failed 5, typecheck-failed 3, build-failed 1,
project-not-found 1.

## Two failures the model did not cause

The harness marks this row `ranked`, so both of these need settling before it
goes anywhere near the board. Excluding them puts Pass@1 at 8 of 11, or 73%. That
is an 11 point swing.

### ai-search-workbench: the provider dropped the request

The session ran two steps that made four tool calls (bash, todowrite, bash,
websearch), emitted 588 output tokens, then returned a third step with
`reason: "unknown"` and zero tokens in and out. The process exited 0 after two
minutes with no project on disk. This is the opencode dead-request signature
already seen with Kimi K3, where a dropped request arrives as a zero-usage
unknown rather than an error.

`agents/opencode.ts:109` already guards for this, but the condition is
`stepReason === "unknown" && outputTokens === 0 && !sawTool && !sawAssistantText`.
It only catches sessions that die before doing anything. This one had already
worked, so it fell through and scored as a model failure. Any opencode run that
dies mid-flight will be mis-scored the same way, which is the more expensive
problem: it looks exactly like a real failure in published data.

### frontier-polyglot-proto: prerequisites run before install

The spec runs `buf generate` as a prerequisite. It failed with
`plugin protoc-gen-ts_proto: executable file not found in $PATH`, fail-fast
stopped the run, and install never executed. What I measured:

- The model declared `ts-proto` as a devDependency, so the plugin binary lands in
  `node_modules/.bin`.
- Bare `buf generate` fails even after `bun install`, because buf resolves
  `local:` plugins through `$PATH` only.
- With `node_modules/.bin` on `$PATH` it succeeds, exit 0, and writes `gen/ts`.

So `prerequisiteCommands` running before install makes any npm-based local codegen
plugin impossible to pass, whatever the model writes. Only exclusively-remote
plugins survive. The model is not blameless, since it shipped no package.json
scripts at all and nothing in the project would ever put `.bin` on `$PATH`, but a
model that did everything right still fails this step.

## Toolchains

bun 1.4.0, node 24.19.0, rustc 1.98.0, cargo 1.98.0, go 1.27.0, dotnet 10.0.400,
python 3.12.3, uv 0.12.5, java 21.0.12 (Temurin), maven 3.9.16, gradle 9.7.1,
elixir 1.20.3 on OTP 29, buf 1.72.0, protoc 35.1, psql 16.15.

## Not done yet

- gpt-5.6-luna at high effort is running now for comparison.
- ai-search-workbench needs a re-run to test whether the drop was transient. If it
  dies the same way twice, that is still not a model verdict.
- The publication gates from the pre-run audit are untouched: the three canonical
  runs are not re-recorded under cache v8, dotnet-blazor-cqrs has no canonical, and
  the weak-versus-strong calibration pass has not run. Nothing here belongs on the
  public board until those close.
- Only `low`, `high` and `max` are real efforts for this model. The provider
  rejects `medium` and `xhigh`, and opencode drops an unknown `--variant` silently
  instead of erroring, so a run labelled `medium` would quietly record the
  provider default.
