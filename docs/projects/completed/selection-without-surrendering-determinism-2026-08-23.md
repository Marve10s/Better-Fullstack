# Selection without surrendering determinism

Completed locally on 2026-08-23.

## Outcome

Better Fullstack now uses one schema-backed starter-track catalog across the web builder, CLI, and
MCP server. Each track expands into the same editable Stack Graph and carries fail-closed evidence
for every selected part.

The seven canonical tracks cover SaaS, AI-agent, REST API, Java API, Rust backend, mobile, and
internal-tool outcomes. Runtime, deployment target, package manager, database, auth, workspace
shape, and minimum-evidence filters serialize through bounded URL keys and return only valid
graphs.

Compatibility failures now return a versioned explanation with a stable rule ID, the rejected
capability, compatible alternatives, and the owning Stack Part when one exists. The builder renders
that message, the CLI `compatibility` command returns the same object, and MCP includes it in
structured compatibility issues.

The deterministic recommender uses this catalog on every client. A controlled 28-case evaluation
reached 100 percent accuracy, repeated deterministically, and produced only schema-valid graphs with
evidence and review constraints. The release gate therefore keeps the model layer disabled. Its
report contains fixture IDs and aggregate results, not brief content.

Selection telemetry now measures covered eligible decisions instead of dividing all events by all
events. It aggregates create completion, starter-track use, compatibility recovery, builder
handoffs, abandoned plans, evidence levels, and fixed problem classes. Dedicated lifecycle activity
aggregates measure repeat existing-project use on distinct UTC dates. Prompt text, code, paths,
secrets, raw errors, URLs, and other content remain blocked at client and ingest boundaries.

## Verification

- Shared starter-track graph, evidence, filter, and recommendation tests.
- Builder preset parity and URL-state tests.
- CLI and MCP catalog and recommendation parity tests.
- Shared compatibility explanation tests across types, CLI, and MCP.
- Controlled deterministic recommendation evaluation in `test:recommendations`.
- Backend decision classification, lifecycle classification, privacy, and decision-room tests.
- Package type checks for types, CLI, backend, and the changed web surface.

## Production gate

The production telemetry maintenance-owner drill and observed 80 percent decision coverage remain
external release evidence. No repository test claims that deployed threshold has been met.
