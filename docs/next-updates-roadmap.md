# Better Fullstack product roadmap

Canonical priority and remaining work, checked 2026-09-25. Execution follows the
[project lifecycle](projects/README.md); production measurement follows the
[analytics operations reference](reference/posthog-analytics-operations.md).

## Product direction

Better Fullstack supports **choose -> create -> understand -> change -> verify -> upgrade -> recover**.
Prioritize reliable lifecycle operations and evidence for existing recipes before catalog growth.
Humans, CI, and coding agents should use the same typed contracts.

## Current foundation

Graph authority, recoverable mutations, local builder import/comparison, persistent recipe
production, and deterministic starter selection are implemented. Current constraints live in
[graph authority](guidelines/stack-graph-and-config-authority.md),
[lifecycle contracts](reference/lifecycle-contract-v2.md), and
[recipe generation](reference/recipe-generation-contract.md).

The [v2.6.8 receipt](https://github.com/Marve10s/Better-Fullstack/releases/download/v2.6.8/verification-receipt.v1.json)
records eight passing runtime recipes at definition version 1, successful required CI, and exact
package identities for commit `67d73993c38effd0bfb65c7d8601c1b646fbb680`. It certifies that release
and its declared recipe scope, not every catalog option or the current checkout. New releases
and material producer changes require fresh evidence.

The [local evidence ledger](verified-combinations.md) does not replace published receipts.
The [capability inventory](reference/capability-evidence-inventory.md) defines proof and freshness.
Completed implementation plans live in Git history rather than a second documentation archive.

## Phase 0: make every claim reproducible

Release publication and receipt machinery are implemented. Remaining work concerns current
public documentation and production measurement.

| ID | Remaining outcome | Owner |
| --- | --- | --- |
| T0.2 | Record current PostHog delivery and measurement coverage. The old Convex activation drill is retired. | [Growth](projects/active/non-social-growth.md) |
| T6.5 | Define the eligible-decision denominator and measure coverage before claiming the original 80 percent target. | [Growth](projects/active/non-social-growth.md) |

Finish current-page compatibility references and review translations through
[documentation follow-ups](projects/active/documentation-follow-ups.md). Fallback tests do not
prove translation review. Keep evidence freshness and public-claim checks in every release.

## Phase 1: establish a real supported update window

Published qualification reports pass all eight build and exact-recovery cases for
[v2.6.5 -> v2.6.7](https://github.com/Marve10s/Better-Fullstack/releases/download/v2.6.7/cross-version-qualification.v1.json)
and [v2.6.7 -> v2.6.8](https://github.com/Marve10s/Better-Fullstack/releases/download/v2.6.8/cross-version-qualification.v1.json).
The [support policy](update-support-policy.md) still declares qualification and no supported sources.

| ID | Remaining outcome | Owner |
| --- | --- | --- |
| T1.2 | Activate only the reviewed source/target window and verify matching CLI, JSON, MCP, and builder eligibility. | [Supported window](projects/active/platform-features.md) |
| T1.7 | Reconcile published-binary reports with the separate adopted-repository recovery cohort for policy qualification. | [Supported window](projects/active/platform-features.md) |

Receipt availability alone does not change the policy or qualify untested source/target pairs.

## Growth and distribution

The [growth project](projects/active/non-social-growth.md) owns Search Console/PostHog baselines,
MCP Registry publication, directory submissions, and article deployment/indexing checks.
Registry ownership metadata is released; the public registry lookup returned no entry on
September 25. Released metadata and checked-in content do not prove acceptance, indexing, or growth.

## Conditional work

The [backlog](projects/README.md#backlog) retains integration and ecosystem-depth requests.
New adapters, libraries, broader single-app output, remote/private registry support, team policy,
and hosted update PRs require demonstrated demand and a maintained verification recipe.
A model recommendation layer requires measured failures of the deterministic baseline.

Each proposed task must identify the user failure, owning Stack Parts, real proof, recovery
boundary, affected clients, and verification maintainer. Follow the
[new-tool guide](guidelines/adding-new-tool-options/README.md) for additions.

Keep remote registry sources rejected until their trust and update contracts exist. Keep
application-data migration separate from file recovery. Preserve independent analytics archives.
Do not count dependency presence or generated source as runtime proof.

ScaffBench's runner was removed on September 11; frozen results are historical. Reintroducing it
would be a new product decision. Review this roadmap after each release and delete completed tasks.
