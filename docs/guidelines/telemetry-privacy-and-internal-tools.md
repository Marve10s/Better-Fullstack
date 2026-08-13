# Telemetry Privacy and Internal Tools

Use this guide for CLI telemetry, analytics ingest, aggregate dashboards, decision-room access, and
any event or query that could expose user or operational data.

Active ingest, aggregates, and owner dashboards belong to `packages/backend`. `apps/analytics` is
the retired legacy tombstone and historical-data boundary; do not add new events or callers there.

## Independent Boundaries

Telemetry has two mandatory defenses:

1. the client sends only an allowlisted, normalized product vocabulary;
2. server ingest validates, bounds, and rejects unsafe payloads again.

Never weaken server validation because the current client sanitizes. Older, modified, or hostile
clients can call ingest directly.

## Allowed Event Shape

Prefer:

- event type and command identifier;
- selected role/ecosystem/tool identifiers;
- known source, mode, and status enums;
- booleans;
- bounded counts and durations;
- normalized setup-step identifiers;
- CLI/runtime/platform versions;
- random anonymous install ID.

Drop rather than transform uncertain free-form data.

## Forbidden User Content

Never collect:

- project names or directories;
- absolute or relative paths;
- filenames;
- prompts, briefs, prose, source code, or generated content;
- environment values, secrets, keys, tokens, or connection strings;
- repository remotes or URLs;
- email/contact values;
- raw logs, stack traces, or exception messages;
- Stack Part settings or target paths;
- arbitrary object keys supplied by callers.

An identifier sanitizer is not enough for a field whose semantic meaning is user content.

## Graph Telemetry

- Emit selected Stack Parts as `role:ecosystem:toolId`.
- Exclude Provided Capabilities and `none`.
- Bound part and array counts.
- Derive role/ecosystem sets from sanitized parts.
- Never emit IDs containing owner names, paths, or user-assigned service labels.
- Treat part settings as forbidden content.

## Outcomes and Errors

- Use known statuses: started, succeeded, failed, cancelled.
- Keep success unknown for started/cancelled when appropriate.
- Send normalized error names only when they fit the identifier grammar.
- Map known setup failures to stable identifiers.
- Drop raw failure text.
- Bound numeric values and reject non-finite/negative inputs.

## Preference and Delivery

- Runtime disable override has precedence over persisted preference and build default.
- The CLI must expose status, enable, and disable controls.
- The notice must accurately describe collected and excluded data.
- Telemetry runs in a bounded background queue.
- Network failure, timeout, absent ingest URL, or disabled telemetry must never fail the product
  command.
- Do not block command exit indefinitely to improve analytics delivery.

## Ingest

- Validate content type, payload size, event type, key allowlist, value types, array lengths, and
  identifier lengths.
- Strip or reject unknown keys before storage.
- Keep raw ingest separate from public aggregate queries.
- Rate-limit and monitor abuse without logging forbidden payload bodies.
- Tests must send adversarial paths, secrets, free-form strings, nested settings, oversized arrays,
  invalid numbers, and unknown keys.

## Aggregate Analytics

- Public/product dashboards consume aggregates, not raw user event bodies.
- Small cohorts must not reveal a single user’s stack choices.
- Query filters must be bounded and enumerated.
- Cache keys must not contain secrets or raw query text.
- A UI restriction is not authorization; enforce access in server queries.

## Internal Decision Tools

- Fail closed when required owner identity or shared secret is missing.
- Use a cryptographically strong secret; repository guidance requires at least 32 characters.
- Compare authorization on the server for every protected loader/action/query.
- Never expose the shared secret to client bundles, page data, logs, analytics, or error text.
- Owner username checks and shared-secret checks solve different problems; keep both when both are
  part of the access model.
- Do not add a permissive development fallback that can reach production.

## Verification

Run focused privacy tests for sanitization and ingest, authorization tests for protected analytics,
and dashboard tests against aggregate fixtures. A rendered hidden route does not prove the backing
data is protected.
