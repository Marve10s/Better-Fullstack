# Active Convex Backend Owner Runbook

`packages/backend` is the only active Better Fullstack telemetry source. It owns `/api/analytics/ingest`, aggregate queries, and the private dashboard API. The checked-in `apps/analytics` source is quarantined as a no-mutation tombstone, but that does **not** prove the legacy deployment returns `410 Gone`; the final legacy-quarantine phase below establishes and verifies that deployed state.

Every production action in this runbook is owner-only. Agents and ordinary CI may validate source and tests, but must not select deployments, deploy, change environment variables, invoke production mutations, export production data, rotate settings, or copy secret values.

## Deployment and configuration inventory

Before changing anything, the owner records the current setting names and deployment identities without recording their values:

- Web production: `VITE_CONVEX_URL` names the active `.convex.cloud` deployment and `VITE_CONVEX_INGEST_URL` names that same deployment's `/api/analytics/ingest` `.convex.site` endpoint.
- Active Convex HTTP API: ingestion is `/api/analytics/ingest`; the aggregate-only owner endpoint is `/api/analytics/dashboard` on the same `.convex.site` host.
- Web production and active Convex production: the same `TELEMETRY_DASHBOARD_SECRET`, stored independently in each platform's secret manager.
- GitHub's approved release environment: `CONVEX_INGEST_URL`, pointing to the active `/api/analytics/ingest` endpoint. It is stored as a secret setting even though it is a URL.
- Preview environments: telemetry remains disabled.

No active setting may contain `/track`, point at the legacy project/deployment, or mix the active deployment's `.convex.cloud` and another deployment's `.convex.site` host. Never put endpoint or secret values in a shell command, repository file, issue, screenshot, or log.

## Reviewed active deployment preflight

1. From the Convex dashboard, identify the exact team, project, default production deployment, and current production revision. Confirm the local project selection belongs to that project. A `CONVEX_DEPLOYMENT` selected for development causes `convex deploy` to target that project's default production deployment; do not infer identity from the directory name.
2. From a clean, reviewed default-branch checkout, keep that dashboard identity visible, inspect the selected project's default-production function specification, and compare its function inventory with the reviewed target:

   ```bash
   cd packages/backend
   bunx convex function-spec --prod
   ```

   Stop if the dashboard target is ambiguous or the specification is neither the expected Better Fullstack analytics inventory nor an explicitly reviewed empty first-activation state.

3. Run repository type/lint checks and Convex's non-mutating deploy preview with typechecking:

   ```bash
   cd packages/backend
   bun run lint
   bunx convex deploy --dry-run --typecheck enable
   ```

4. Review the generated configuration and schema/index/function changes. Only then deploy deliberately:

   ```bash
   cd packages/backend
   bunx convex deploy --typecheck enable
   ```

5. Re-run `bunx convex function-spec --prod`, then use the dashboard identity and audit log to confirm the expected internal analytics functions and new revision are on the exact reviewed deployment.

## First activation and endpoint verification

For a new deployment, verify the dashboard endpoint returns `503` with `Cache-Control: private, no-store` while `TELEMETRY_DASHBOARD_SECRET` is absent. Do not remove a working deployment's secret merely to reproduce this case; source tests cover the fail-closed branch during later changes.

Then use the platform secret managers to configure a fresh random `TELEMETRY_DASHBOARD_SECRET` of at least 32 characters in active Convex and web production, and configure the three URL settings in the inventory above. Update/rotate the GitHub release environment's `CONVEX_INGEST_URL` setting rather than reusing a legacy endpoint.

Verify through an owner-local HTTP client without logging URLs, authorization headers, or bodies containing identifiers:

| Check                                                    | Required result                                                                                                                      |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Active dashboard GET without authorization               | `401`; `Cache-Control: private, no-store`, `Vary: Authorization`, no aggregate or raw data.                                          |
| Active dashboard GET with the matching bearer secret     | `200`; the same private/no-store and `Vary` headers; only `stats`, `daily`, `engagement`, and `insights` aggregates.                 |
| Active ingest POST with one schema-valid anonymous event | `200`; no project name, path, prompt, code, URL, environment, token, raw error, or other blocked content stored.                     |
| Web `/telemetry` without owner authentication            | Access denied; no dashboard payload or cacheable response.                                                                           |
| Web `/telemetry` with owner authentication               | Browser Basic Auth uses username `owner` and the web deployment secret as its password; aggregates load and remain private/no-store. |

Inspect the single raw `analyticsEvents` test row in the Convex dashboard to verify the privacy filter, but never export or paste that row into a ticket. Confirm the dashboard HTTP response exposes aggregates only, not `analyticsEvents`, machine IDs, or recent raw rows.

After updating the release setting, publish through the normal reviewed release workflow. Observe normal traffic for a release window: `stats.totalEvents` and `stats.lastEventTime` should advance on the active deployment, error rates should remain normal, and no caller should target `/track`. Activation is complete at this point; legacy `410` verification is a later, separately gated operation.

## Aggregate reconciliation / one-shot backfill

`analytics:backfillStats` is an internal mutation that is destructive only to derived state. It retains `analyticsEvents`, but deletes and rebuilds the aggregate, daily, machine, and machine-activity tables from every retained event.

Before running it:

- confirm a reviewed reducer/schema change requires reconciliation;
- capture the authenticated dashboard's pre-run `stats.totalEvents` and `stats.lastEventTime`, plus the current daily-date and unique-machine totals;
- inspect the production `analyticsEvents` row count and deployment usage in the Convex dashboard;
- stop if the collection is large or near mutation read/write limits;
- account for reads across all retained events and writes proportional to events, unique machines, machine-days, and calendar days;
- use a paginated, resumable migration for high volume instead of retrying this one-shot mutation;
- ensure no other reconciliation is running.

For a reviewed, safely small deployment, the owner may run exactly once:

```bash
cd packages/backend
bunx convex run analytics:backfillStats --prod
```

Capture only the returned `totalProcessed`, `dailyDates`, and `uniqueMachines`. Require `totalProcessed` to equal the pre-run raw-event/aggregate total, and require post-run `stats.totalEvents` and `stats.lastEventTime` to equal their pre-run values. Compare daily-date and unique-machine totals with the returned counts, then observe live traffic and confirm both total and last-event time resume advancing. Never put this mutation in deploy hooks or recurring CI, repeat it after a limit failure, or delete `analyticsEvents`.

## Legacy export and exact deployment quarantine

Do this only after active traffic is healthy and callers no longer use `/track`.

1. In the Convex dashboard, select and record the exact legacy team, project, production deployment, and revision. Prove it is not the active deployment.
2. Export the legacy deployment through Convex's owner UI/CLI to encrypted owner-controlled storage. Record the export timestamp, table counts, and checksum without committing the archive. Verify the archive can be opened before proceeding.
3. From `apps/analytics`, run `bunx convex function-spec --prod` while keeping the dashboard's exact legacy identity visible; compare the returned function inventory with that target. Stop on any mismatch.
4. Review `bunx convex deploy --dry-run --typecheck enable`, then deploy the tombstone source with `bunx convex deploy --typecheck enable` only to that exact legacy production deployment.
5. Verify both `POST /track` and `OPTIONS /track` return `410`, `Cache-Control: private, no-store`, and no `Access-Control-Allow-*` headers. Confirm event table counts do not change during the probes.

Retain the legacy deployment and export. Quarantine is not authorization to delete the app, tables, or historical data.

## Rotation, rollback, and incident boundary

- Rotate the dashboard secret by installing a new value in active Convex and web production, verifying authenticated access, then revoking the old value. Update the release environment URL setting separately whenever the active endpoint changes.
- Disable client delivery by removing the approved release environment's active ingest URL or shipping a telemetry-disabled client; never redirect to `apps/analytics`.
- Preserve raw events, exports, and both Convex deployments during investigation.
- A failed or limit-exceeded backfill requires diagnosis and a paginated migration plan, not repeated production retries.

See the [Operational Trust roadmap lane](../../docs/next-updates-roadmap.md#now--operational-trust) for the stop-the-line exit criteria.
