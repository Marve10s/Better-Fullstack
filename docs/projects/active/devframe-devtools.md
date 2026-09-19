# Devframe devtools surface

> Active. Phases 0 through 4 are implemented on `feat/devframe-devtools`. Phase 5 stays deferred
> until telemetry shows demand; move this document to `completed/` when that decision is recorded.

## Outcome

Better Fullstack gets a devtool built on [Devframe](https://devfra.me): one definition that serves a
project panel over RPC, an HTTP MCP route inside the running devtool, a standalone command, and
a static report. Every lifecycle operation is declared once in an operations table and
projected onto the stdio MCP server, the CLI router, and the devtool. This is the "understand" step
of the roadmap promise and the same-contract goal of roadmap T0.10.

## Decisions

- Devframe is a base for a Better Fullstack devtool, not a scaffold addon. Generated projects get
  Vite DevTools or Nuxt DevTools, which are built on Devframe, when a devtools addon is wanted.
- The stdio MCP server stays Better Fullstack owned. Devframe emits only `title`, `readOnlyHint`,
  and `destructiveHint`, and sets `isError` only on thrown errors. The stdio server keeps
  `idempotentHint`, `openWorldHint`, and payload-driven `isError`. Both are generated from the
  operations table and a parity test proves identical names and schemas.
- Agent tools on the devtool use `ctx.agent.registerTool` with explicit JSON schemas. The RPC
  `agent` flag would advertise positional `arg0` inputs, which breaks the flat `{ projectDir }`
  contract agents already use.
- The definition lives in `apps/cli/src/devtools/` because its handlers wrap CLI-owned services and
  packages must not import apps. The panel UI becomes a separate browser-only package later.
- `cac` is not used. The CLI router calls `createDevServer` directly.
- Devframe's workspace storage scope is never used, so nothing lands in a user's repository.

## Verified in the phase 0 spike

- Wire names survive: `bfs:get_project_status` sanitizes to `bfs_get_project_status`.
- Output schemas match byte for byte when converted with the same target, direction, and `$ref`
  reuse as the MCP SDK (`apps/cli/src/devtools/definition.ts`).
- The route rejects requests without an `Origin` header and non-loopback peers by design;
  `devframe connect` presents a loopback origin. Direct HTTP MCP clients must send one.
- The built CLI runs `devtools` under Node 24, writes the instance registry entry, and removes it on
  SIGINT. Node 20 and 22 were not available locally and remain unverified.
- Adding `devframe` bumped the hoisted `h3` to a release candidate Devframe requires. No workspace
  package imports `h3` directly; Nitro keeps its own nested copy.

## Caveats

- Devframe 1.0.0 shipped on 2026-09-16 after six breaking 0.x releases. Every `@devframes/*`
  package peer-depends on the exact `devframe` version, so the group moves together. The two
  packages are pinned and listed in `bunfig.toml` `minimumReleaseAgeExcludes` like `@shadcn/lint`.
- The Next framework kit is marked experimental upstream. It is not used until the deferred mount
  phase.
- Sharing a host's Node HTTP server for WebSocket is Node only. Bun hosts fall back to SSE or a
  side-car port. This matters only for the deferred mount-into-generated-projects phase.

## Phases

| Phase               | Outcome                                                                                     | Exit gate                                                                |
| ------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| 0. Spike            | `devtools` command serving status and check over RPC and HTTP MCP, parity test              | Done on the branch                                                       |
| 1. Operations table | Every structured MCP tool and the matching CLI command read from `apps/cli/src/operations/` | Existing MCP protocol test unchanged, parity test covers every operation |
| 2. Devtool surface  | Panel UI package, `clientAssets` wired, OTP auth on, Playwright proof                       | Panel loads the project report and runs a plan                           |
| 3. Panel depth      | Preview and apply through review tokens, history, recovery points, evidence                 | Same safeguards as CLI and MCP                                           |
| 4. Static build     | `devtools --report <dir>` bakes status and evidence into a static page                      | Feeds the roadmap T0.7 verification page                                 |
| 5. Deferred         | Optional addon mounting the panel into generated projects via Vite, Next, or Nuxt hubs      | Only after telemetry shows demand                                        |

## How it is wired

- `apps/cli/src/operations/` declares every operation once. `apps/cli/src/mcp.ts` registers the
  stdio tools from the table; `apps/cli/src/devtools/definition.ts` registers the same table as
  Devframe RPC for the panel and as agent tools for the HTTP MCP route.
- `packages/devtools-ui` is the panel, a Vite and React SPA that mirrors the web app's tokens. Its
  build is copied into the CLI package's `dist/devtools-ui` by tsdown, and the definition resolves
  that directory or the workspace build when running from source.
- Read operations that accept a project directory are marked `snapshot` in build mode, so
  `devtools --report <dir>` bakes their results and the panel renders them without a server.
- The panel reads the served project only after the browser is trusted; RPC is gated before that.

## Verification lane

- `bun test apps/cli/test/mcp` covers the parity test, the discovery test through `devframe
connect`, the annotation test, and the stdio protocol.
- `bun test apps/cli/test/features/devtools-report.test.ts` covers the static build.
- `bun run --cwd apps/cli test:e2e:devtools` builds the panel and runs the Playwright proof.
- `bun run test:release` before filing, since MCP contracts are release sensitive.
