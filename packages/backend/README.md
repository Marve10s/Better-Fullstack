# Analytics migration and operations

PostHog is the destination for Better Fullstack analytics. The web server owns the new public
`/api/analytics/ingest` endpoint. This package validates events and forwards them to PostHog using
its capture API. This package has no Convex dependency, database schema, generated client, or
service deployment. PostHog owns reporting; offline archives preserve the historical data.

The cleanup removes both `packages/backend/convex` and the retired `apps/analytics` app, including
queries, backfills, the old forwarding bridge, and unused content endpoints. The web app no longer
contains the aggregate decision dashboard. Convex remains available as a backend choice in generated
user projects; that product capability is separate from Better Fullstack's analytics infrastructure.

## Destination status

The separate `posthog_betterfulstack` MCP connection uses OAuth for Better Fullstack's EU project
`275138`, currently named **Default project**, in organization `01a0a4d2-d0db-0000-fe30-bad1bdb7dc29`.
GiftSong retains its separate plugin connection.

The private [Better Fullstack analytics dashboard](https://eu.posthog.com/project/275138/dashboard/954254)
contains all ten reports from `scripts/analytics/posthog-dashboard.json`. On 2026-09-15, each SQL
query and the saved dashboard executed successfully against the empty destination. This validates
query execution, not event delivery or reconciliation. Production cutover, historical import and
CLI publication remain pending.

## Deployment settings

| Setting                      | Web production                          | CLI release build                                               |
| ---------------------------- | --------------------------------------- | --------------------------------------------------------------- |
| `POSTHOG_PROJECT_TOKEN`      | Required server-side project token      | Never included                                                  |
| `POSTHOG_HOST`               | `https://eu.i.posthog.com`              | Not needed                                                      |
| `BFS_TELEMETRY_ENABLED`      | `1`                                     | Not needed                                                      |
| `VITE_BFS_TELEMETRY_ENABLED` | `1` at build time                       | Not needed                                                      |
| `BFS_TELEMETRY_INGEST_URL`   | Not needed                              | Defaults to `https://better-fullstack.dev/api/analytics/ingest` |
| `BTS_TELEMETRY`              | Not needed                              | Release workflow sets `1`; local builds default to `0`          |
| `TELEMETRY_DASHBOARD_SECRET` | Existing owner-only page authentication | Never included                                                  |
| `POSTHOG_DASHBOARD_URL`      | Private PostHog dashboard URL           | Not needed                                                      |

Keep credentials in the hosting platform's secret manager. Preview ingest is disabled when
`VERCEL_ENV=preview`; keep both enable flags off in other test/preview environments. Runtime
`BTS_TELEMETRY_DISABLED=1` still overrides CLI build defaults and saved preferences. The release
builder disables telemetry execution without compiling that runtime override into the artifact.

The existing `/telemetry` page authenticates the owner before redirecting to PostHog. PostHog
requires its own login. No event bodies or PostHog management credentials are served by that route.

## Cutover order

1. Reuse the configured Better Fullstack EU project and private dashboard. Verify the project
   identity before setting the token. Keep GiftSong's connection separate.
2. Configure and deploy the web settings above. Verify one consenting page view, route exit,
   builder scroll, ZIP download and CLI event. Check that disabling telemetry, Do Not Track and
   Global Privacy Control prevent browser capture.
3. Publish the new CLI through the normal release workflow and verify its effective telemetry
   default and delivery to the web endpoint.
4. Before shutting down either hosted Convex deployment, export a fresh full backup with files.
   The verified production source is `igrimanigroman:better-fullstack:prod`. Identify the separate
   legacy deployment explicitly and export it too if it contains additional history. Do not assume
   the production backup covers that older service. Keep environment backups separate and private.
5. Stop old ingest at the hosting service, wait for in-flight requests to finish, then take and
   verify the final snapshot. Retain the pre-stop snapshot too. Record the last event timestamp,
   unique row counts, monthly totals and ZIP checksum, and build the independent archive below.
6. Reconcile the final archive with the September 15 snapshot and events collected since it. Copy
   the raw ZIP and sanitized archive to independent backup storage before deleting any hosted data.
   Shut down the old deployments after preservation is verified. Remove obsolete Convex deployment
   credentials from hosting and CI settings after confirming they have no remaining consumers.
7. Monitor the PostHog event counts, capture failures and free-plan usage after cutover.

Removing source does not shut down a hosted Convex deployment. No hosted data has been deleted and
production cutover remains pending. Do not deploy an empty Convex directory to perform this cleanup.

There is no forwarding bridge in the final architecture. Already-published CLI versions have the
old Convex hostname compiled in; once it is retired, those versions stop reporting analytics.
Their product commands still work because telemetry failures are nonfatal. Their users need the
new CLI release to report to PostHog. Old history remains available in the independent archive.

## Historical import

PostHog's current [migration documentation](https://posthog.com/docs/migrate) requires enrollment in
a paid Product Analytics plan for historical migrations, although the import itself has no standard
ingestion fee. The no-card free plan is not a verified import destination. Do not run `--apply`
until the owner accepts that plan requirement and the destination is configured. Do not enable billing
as part of running the script. All imported timestamps must be at least 48 hours old.

The importer reads the sanitized `posthog-events.jsonl` and `manifest.json` from a local archive.
It needs no Convex account, CLI, schema or running deployment. It verifies the checksum and unique
event IDs, rechecks the privacy allowlist, and preserves timestamps and deterministic UUIDs. The
existing archive format remains compatible. Archives up to 256 MiB are supported by this importer.

Set `BFS_ANALYTICS_ARCHIVE_DIRECTORY` to the archive directory. This read-only command verifies all
rows and prints monthly counts; it was verified against all 12,361 saved production events:

```sh
bun run scripts/analytics/import-archive.ts
```

After accepting the historical migration plan requirement, set `POSTHOG_PROJECT_TOKEN`,
`POSTHOG_HOST` and `BFS_ANALYTICS_IMPORT_CHECKPOINT` to a new checkpoint file outside the repository.
This upload command has not been run against the destination:

```sh
bun run scripts/analytics/import-archive.ts --apply
```

Batches contain at most 100 events. Progress advances only after PostHog acknowledges a batch.
Rerun with the same archive and destination to resume. A failed checkpoint write may resend a batch
with identical UUIDs. Changed archives or destinations require a separate checkpoint. Every event
must be at least 48 hours old before upload. Capture acknowledgement is not proof that events are
queryable; reconcile monthly totals after ingestion completes. The importer never edits the archive.

## Backup and long-term access

PostHog's no-card free plan has a rolling one-year event retention window. Paid plans provide seven
years. Older events can fall outside query results; saved dashboards do not preserve those rows.
See [event retention](https://posthog.com/docs/data/events-retention). Keep an independent archive
for multi-year reporting and export new events before they age out of that window.

Keep the original Convex ZIP, including its aggregate tables, intact. To create a separate sanitized
analytics archive without contacting Convex or PostHog, set `CONVEX_BACKUP_ZIP` to the production
snapshot, `CONVEX_SOURCE_DEPLOYMENT` to the original `team:project:prod` identifier, and
`BFS_ANALYTICS_ARCHIVE_DIRECTORY` to a new directory outside the repository. Then run:

```sh
bun run scripts/analytics/archive-convex.ts
```

The script reads only `analyticsEvents/documents.jsonl` and creates `posthog-events.jsonl` plus a
manifest with a checksum, monthly counts and the timestamp range. It preserves original event
timestamps and retains stable event UUIDs across repeated conversions and imports. It refuses an existing output
directory or duplicate source IDs. No data is uploaded. The JSONL file remains readable with local
tools such as DuckDB independently of either service. Preserve a second copy on an existing backup
drive or backup service; a single laptop copy is vulnerable to disk loss.

The production backup verified on 2026-09-15 contains 12,361 unique analytics events spanning
2026-01-21 through 2026-09-15. ZIP integrity passed and its monthly counts matched the production
audit. The archive importer also reproduced all 12,361 saved events without changing any event
properties. Reconcile this snapshot with events collected after its timestamp before retiring Convex.

Future PostHog exports are not configured yet. Before the oldest new event reaches one year, export
it to independent storage and verify counts and timestamps. The historical archive protects past
events only; creating it does not automatically archive future PostHog events.

## What the reports mean

- `project_created` records CLI/MCP generation; success, failure and unknown historical outcomes
  remain separate. `setup_outcome` distinguishes installed, incomplete, skipped and generation-only
  results. A downloaded browser ZIP is counted separately. Command copies and previews are intent.
- Stack dimensions contain canonical catalog selections. `library_selections` uses graph choices
  when present and derives recognized choices from legacy fields otherwise. It does not collect
  generated manifests, arbitrary dependencies, package lockfiles or installed versions.
- `page_viewed` and `page_engagement` are custom events. They feed the supplied insights, not
  PostHog's automatic `$pageview` Web Analytics dashboard. Published page IDs replace raw URLs.
- `page_view_id` connects a page visit to later builder actions. Engagement checkpoints are
  cumulative: take maxima per view before averaging. Never add checkpoints together.
- `active_ms` measures foreground time, including idle time. Scroll depth measures the document or
  the builder's main scroll container. A tab becoming hidden is a checkpoint, not proven abandonment.
  Browser shutdown, blockers and failed keepalive requests can leave missing checkpoints. Reports
  show coverage and exclude recent activity before estimating visits without a handoff.
- Repeat use measures anonymous devices, not people. CLI and browser IDs are deliberately separate.
  A failed run or abandoned page can suggest friction; neither proves the user was annoyed.

No replay, autocapture, surveys, DOM text, URLs or raw errors are collected. Both client and server
apply allowlists. The server has a bounded per-instance rate limit; configure hosting ingress limits
as well because client IDs can be rotated and serverless instances do not share memory.

## Free allowance and baseline

The production audit on 2026-09-15 found 12,361 stored events and 4,459 recorded project creations.
August had 5,096 events; September through the audit had 3,035. CLI creation counts are incomplete
for recent releases because the previous release builder forced the telemetry default off.

At fewer than 10,000 monthly pageviews, one view plus up to seven engagement checkpoints per view
adds at most about 80,000 events to the observed product-event baseline. Normal visits generate
about two events. BFCache restores can add terminal checkpoints; real traffic remains the measure.
Even a 70,000-event stress baseline plus 80,000 page events is
well below the current one-million monthly analytics-event allowance. Historical migration has the
separate paid-plan prerequisite described above. This is a capacity estimate,
not a guarantee against bots, growth or changed pricing. Check the project's Billing page.

Sources: [PostHog pricing](https://posthog.com/pricing),
[capture API](https://posthog.com/docs/api/capture),
[historical migration](https://posthog.com/docs/migrate),
[SQL array breakdowns](https://posthog.com/tutorials/hogql-breakdowns).
