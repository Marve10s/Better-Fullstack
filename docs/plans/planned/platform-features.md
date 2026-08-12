# Platform Features

CLI-level and DX improvements that go beyond adding libraries. This file tracks the remaining
platform and DX work.

---

## Post-Scaffold Upgrade Engine

The `update` / `check` lifecycle now includes diff-aware template comparison, review-bound apply,
manifest-v2 generator/template provenance, automatic rollback, and explicit recovery points.
Manifest-v1 projects migrate deterministically but cannot prove their original lineage, so they
still require explicit acknowledgement. The remaining work is executable cross-version coverage,
a documented support window, and real upgrade evidence.

- [x] Record a scaffold baseline in `bts.lock.json`
- [x] Compare current generated output against current templates without overwriting user code
- [x] Produce a reviewable dry-run/JSON plan with drift, local edits, conflicts, merges, and manual files
- [x] Provide `update --check` as a CI-friendly template-drift gate
- [x] Bind apply to the exact reviewed plan and require a separate risk acknowledgment for
      migrated/adopted unverified lineage
- [x] Record explicit generator/template versions and upgrade history in manifest v2
- [ ] Generate executable cross-version fixtures and document the supported upgrade window
- [x] Add bounded transactional backups, automatic rollback, and one-command recovery output
- [ ] Add real-repository validation evidence

---

## Doctor / Health Command

Turn the existing verification and ScaffBench learnings into a local command users can run inside a
generated project.

- [x] Add `create-better-fullstack doctor` and the user-facing `create-better-fullstack check` alias
- [x] Validate `bts.jsonc`, dependency/package-manager consistency, required env vars, and generated scripts
- [x] Run deterministic checks for every executable Stack Graph target, with missing toolchains and
      incomplete checks reported as failures
- [x] Return structured JSON for agents and CI

---

## Lifecycle Surface Parity

- [x] Share project status, multi-target checks, and reviewed plan/apply contracts across CLI and MCP
- [x] Include `bts.jsonc` and an exact manifest baseline in browser-generated ZIPs
- [x] Prove real browser boot, edit, rerun, and rendered-output change in an unmocked WebContainer lane
- [x] Publish clean-SHA fresh generated-project install/build evidence for a curated polyglot matrix
- [x] Add manifest-v2 provenance and transactional recovery across CLI/JSON/MCP mutations
- [ ] Add executable prior-release upgrades

---

## Public Verified-Combination Status

Better Fullstack now has a generated markdown status artifact at `docs/verified-combinations.md`, a
public docs page at `/docs/reference/verified-combinations`, a Shields-compatible badge endpoint at
`/api/verified-combinations`, and source/owner/rerun links for each evidence surface.

- [x] Generate a status artifact from smoke/ScaffBench/release results
- [x] Publish a verified-combinations page
- [x] Add a verified-combinations badge endpoint
- [x] Make failures actionable by linking source artifacts, rerun commands, and owning template/test areas

---

## Priority Order (remaining)

1. **Upgrade reliability** — cross-version fixtures, recovery, real-repository evidence
2. **Lifecycle cohesion** — shared project-status vocabulary across CLI, JSON, MCP, and CI
3. **Evidence depth** — verified recipes and generated-project diagnostics
4. **Conditional registry expansion** — only after repeat-use demand is measured
