# Better Fullstack Product Roadmap

> **Canonical roadmap — updated 2026-08-09.** This document is derived from the current CLI,
> Stack Graph, templates, web builder, MCP server, tests, and Convex analytics. Older feature plans
> are implementation history or depth backlogs; when they disagree with this file, this file wins.

## Product Direction

Better Fullstack is the deterministic lifecycle layer for full-stack projects and coding agents:

**create → add → update → check → generate**

The goal is no longer the largest theoretical option count. Success means a project can be planned,
scaffolded, evolved, verified, and reproduced without losing user work.

## Shipped Foundation

- Eight first-class ecosystem surfaces: TypeScript, React Native, Rust, Python, Go, Java, Elixir,
  and .NET, plus universal database parts.
- Multi-ecosystem Stack Graph composition with TypeScript web frontends, backend services across
  supported languages, React Native mobile apps, shared databases, and owned capabilities.
- Visual builder with command generation, file preview, local browser Edit & Run for supported
  web stacks, shareable URL state, saved stacks, and generated ZIP downloads.
- CLI lifecycle commands: `create`, `add`, `update`, `check`/`doctor`, `gen`, `registry`,
  `recommend`, `history`, and `mcp`.
- Preview-first stack updates and a three-way scaffold update engine backed by `bts.lock.json`.
- MCP tools, installable agent plugin, generated AI instructions and skills.
- Verified-combination evidence, release guards, published-package smoke tests, and ScaffBench.

## Now — Operational Trust

Operational claims must fail closed, and production telemetry must have one explicit owner.

1. Keep the retired `apps/analytics` source as a no-mutation `410 Gone` contract; after export and exact-deployment verification, quarantine the legacy deployment while preserving its app and historical data.
2. Treat `packages/backend` as the sole active telemetry owner. Production activation and aggregate reconciliation are owner-only operations governed by the [backend runbook](../packages/backend/README.md).
3. Publish green verification claims only from complete, current, clean-SHA evidence. Missing, stale, malformed, partial, dirty, or version-mismatched evidence must remain non-green.
4. Keep untrusted PR execution separated from npm credentials, repository write tokens, and OIDC; protected environments are approval boundaries, not documentation-only controls.
5. Keep active plans, demand-gated candidates, and historical documents explicit in the [planning registry](plans/README.md).

### Exit gate

One documented owner activation drill, one safely bounded reconciliation drill or dry-run review, no public legacy analytics data functions, and repository tests that prevent ownership, planning-state, evidence, and preview-security regressions.

## Now — Lifecycle Reliability

1. **Make `update` a trustworthy public beta.**
   - Add explicit generator/template version history to the scaffold manifest.
   - Maintain cross-version fixtures from previous releases.
   - Provide a recoverable patch/backup workflow and a documented CI `update --check` path.
   - Validate real user-edited repositories and publish the boundaries of automatic merging.
2. **Unify project status.**
   - Present create/add/update/check outcomes with the same vocabulary in CLI, JSON, and MCP.
   - Finish remaining Stack Graph authority cleanup so every mutation shares one project model.
3. **Measure the lifecycle without collecting user content.**
   - Track anonymous command/action outcomes, durations, compatibility/manual-review counts,
     ecosystem/capability identifiers, repeat use, web run/edit/ZIP outcomes, and CI use.
   - Never collect names, paths, prompts, code, env values, secrets, URLs, or raw errors.
4. **Keep public docs aligned with executable behavior.**
   - Command and ecosystem references must derive accepted values from shared schema data where
     possible. Release review must include docs and navigation checks.

### Exit gate

Twenty successful upgrades across at least five external repositories, with no lost user changes,
plus cross-version fixtures covering the supported upgrade window.

## Next — Lifecycle Depth

- Expand deterministic `gen` beyond its current TypeScript tRPC/oRPC resource generator only after
  usage shows which ecosystems and resources matter.
- Add a project-status/upgrade report that agents and CI can consume without parsing prose.
- Deepen verified recipes and generated-project checks instead of advertising theoretical
  combinations.
- Improve repeat-use workflows: safe capability removal/replacement, upgrade history, and clearer
  recovery instructions.

## Conditional Bet — Registry

`registry` is experimental today: it installs local-path or `file://` capability packs and does not
fetch remote registries. Invest in remote/private registries only after lifecycle telemetry and user
requests demonstrate repeat existing-project use. A production registry needs HTTPS/GitHub sources,
enforced compatibility, preview/diff, trust provenance, namespacing, updates, and uninstall.

## Experimental Surfaces

- `recommend` is a deterministic keyword/preset helper. It does not send the brief to telemetry and
  is not a general AI architect.
- `gen` currently supports TypeScript projects using tRPC or oRPC.
- `registry` is local-only and compatibility metadata is advisory.

These commands stay documented and usable, but they do not define the headline roadmap until usage
and reliability gates justify expanding them.

## Intake Policy

New ecosystems, libraries, and providers are not the default roadmap. Accept catalog work when it:

- fills a verified end-to-end recipe;
- has repeated user demand;
- closes a strategic compatibility gap or security issue; or
- has a sponsor and a clear maintenance owner.

## Product Metrics

- successful create/add/update/check/gen operations;
- update plan-to-apply conversion and safe auto-apply rate;
- conflict/manual-review and diagnostic failure rates;
- anonymous 7/30-day repeat use;
- browser run-ready, edit-rerun, and ZIP success rates;
- verified recipe pass rate and evidence freshness.

The internal `/telemetry` decision room is not a public product surface. The web server fetches the
authenticated, aggregate-only `/api/analytics/dashboard` endpoint, which performs internal Convex
queries and never returns raw events. Access fails closed unless web and Convex share the owner
secret. Deployment and rotation mechanics live in the [backend owner runbook](../packages/backend/README.md).

Theoretical combination count is not a roadmap metric.
