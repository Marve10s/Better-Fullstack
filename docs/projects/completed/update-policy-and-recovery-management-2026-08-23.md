# Update policy and recovery management, 2026-08-23

This note records three completed outcomes from roadmap Phase 1. It does not claim that Better
Fullstack has qualified a historical update window.

## Machine-readable support policy

- `packages/types/src/stack/update-support.ts` owns the versioned update-window policy and evaluator.
- The policy requires two consecutive published manifest-v2 releases before a historical window
  can become active.
- The current policy remains in qualification state with no supported historical range.
- Same-release reconciliation remains eligible. Historical, manifest-v1, unverified-lineage, and
  out-of-window projects receive a machine-readable manual-review reason.

## Shared eligibility report

- The shared project report evaluates the policy against exact source and target lifecycle
  versions.
- Human `status`, CLI JSON, and MCP status use that report instead of maintaining separate support
  claims.
- Contract tests cover same-release eligibility and an older provenance-only fixture that requires
  manual review.

## Recovery discovery and retention

- The `recovery` CLI supports list, show, verify, apply, and prune actions. Existing
  `update --recover` commands remain valid.
- MCP exposes the same discovery, verification, retention, and restore services with declared
  structured output schemas.
- Verification checks metadata shape, backup hashes, file modes, and the current post-operation
  state without writing.
- Prune is a preview unless explicitly applied. It never selects pending or invalid entries and
  protects the configured number of newest valid points.

## Remaining boundary

Published-binary fixture capture, cross-version merge testing, and the two qualification cohorts
remain active work. The public supported window must stay empty until that evidence exists.
