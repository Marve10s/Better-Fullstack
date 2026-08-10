# Platform Features

CLI-level and DX improvements that go beyond adding libraries. This file tracks the remaining
platform and DX work.

---

## Post-Scaffold Upgrade Engine

The baseline `update` / `check` lifecycle is shipped: diff-aware template comparison against an
existing `bts.jsonc` stack, reviewable file changes, and CI drift checks. Manifest v1 does not prove
generator/template lineage, so applying its plan is an explicitly acknowledged destructive action;
it is not a cross-version safety guarantee. The remaining work is provenance, recovery, and real
upgrade evidence.

- [x] Record a scaffold baseline in `bts.lock.json`
- [x] Compare current generated output against current templates without overwriting user code
- [x] Produce a reviewable dry-run/JSON plan with drift, local edits, conflicts, merges, and manual files
- [x] Provide `update --check` as a CI-friendly template-drift gate
- [x] Bind apply to the exact reviewed plan and require a separate manifest-v1 risk acknowledgment
- [ ] Record explicit generator/template versions and upgrade history
- [ ] Generate executable cross-version fixtures and document the supported upgrade window
- [ ] Add recoverable patch/backup output and real-repository validation evidence

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
- [x] Include `bts.jsonc` and an exact manifest-v1 baseline in browser-generated ZIPs
- [x] Prove real browser boot, edit, rerun, and rendered-output change in an unmocked WebContainer lane
- [x] Publish clean-SHA fresh generated-project install/build evidence for a curated polyglot matrix
- [ ] Add manifest-v2 provenance, transactional recovery, and executable prior-release upgrades

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
