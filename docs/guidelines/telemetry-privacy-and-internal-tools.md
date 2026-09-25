# Telemetry Privacy and Internal Tools

Use this guide for CLI/browser telemetry, analytics ingest, owner dashboard access, and
any event or query that could expose user or operational data.

Active ingest validation and PostHog delivery live in `apps/web/src/lib/telemetry`, served by the web
server entry.
PostHog owns reporting; definitions live in `scripts/analytics/posthog-dashboard.json`. Both Convex
services and the old aggregate dashboard have been removed from the repository. Preserve historical
events in independent, checksum-verified archives. Import from those archives without a live database
connection; see `docs/reference/posthog-analytics-operations.md` for retention requirements.

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
- Accept only registered error names from `packages/types/src/telemetry/telemetry.ts`.
  Identifier-shaped strings are not sufficient.
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
- Keep ingest independent of reporting. The repository exposes no public event-query endpoint.
- Rate-limit and monitor abuse without logging forbidden payload bodies.
- Tests must send adversarial paths, secrets, free-form strings, nested settings, oversized arrays,
  invalid numbers, and unknown keys.

## Owner dashboard access

`apps/web/src/lib/telemetry/telemetry-data.server.ts` authenticates `/telemetry` and redirects to
PostHog. It does not query or render event data. PostHog requires its own account access.

- The server checks HTTP Basic username `owner` and `TELEMETRY_DASHBOARD_SECRET` using
  `telemetry-auth.server.ts`. Missing or shorter-than-32-character secrets fail closed.
- `POSTHOG_DASHBOARD_URL` must match the allowed EU/US PostHog project/dashboard URL form.
  Missing or invalid destinations return an unconfigured result.
- Keep responses private and uncached, vary on authorization, and exclude the route from indexing.
- Never expose credentials in client bundles, loader data, logs, analytics, or error text.
- Reporting definitions live in `scripts/analytics/posthog-dashboard.json`; deployment and archive
  procedures live in `docs/reference/posthog-analytics-operations.md`.

## Verification

Run focused privacy tests for sanitization and ingest, authorization tests for protected analytics,
and archive integrity/resumption tests. A rendered hidden route does not prove the backing data
is protected.
