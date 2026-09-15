# Analytics migration and operations

PostHog is the destination for Better Fullstack analytics. The web server owns the new public
`/api/analytics/ingest` endpoint. This package validates events and forwards them to PostHog using
its capture API. Convex remains a temporary forward-only endpoint for older CLI releases and an
archive of existing data. Deploying this source stops new Convex analytics database writes.

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

| Setting                      | Web production                          | Convex bridge                        | CLI release build                                               |
| ---------------------------- | --------------------------------------- | ------------------------------------ | --------------------------------------------------------------- |
| `POSTHOG_PROJECT_TOKEN`      | Required server-side project token      | Same destination token               | Never included                                                  |
| `POSTHOG_HOST`               | `https://eu.i.posthog.com`              | Same ingestion host                  | Not needed                                                      |
| `BFS_TELEMETRY_ENABLED`      | `1`                                     | `1`                                  | Not needed                                                      |
| `VITE_BFS_TELEMETRY_ENABLED` | `1` at build time                       | Not needed                           | Not needed                                                      |
| `BFS_TELEMETRY_INGEST_URL`   | Not needed                              | Not needed                           | Defaults to `https://better-fullstack.dev/api/analytics/ingest` |
| `BTS_TELEMETRY`              | Not needed                              | Not needed                           | Release workflow sets `1`; local builds default to `0`          |
| `TELEMETRY_DASHBOARD_SECRET` | Existing owner-only page authentication | Retain for archival aggregate access | Never included                                                  |
| `POSTHOG_DASHBOARD_URL`      | New private PostHog dashboard URL       | Not needed                           | Not needed                                                      |

Keep credentials in the hosting platform's secret manager. Preview ingest is disabled when
`VERCEL_ENV=preview`; keep both enable flags off in other test/preview environments. Runtime
`BTS_TELEMETRY_DISABLED=1` still overrides CLI build defaults and saved preferences. The release
builder disables telemetry execution without compiling that runtime override into the artifact.

The existing `/telemetry` page authenticates the owner before redirecting to PostHog. PostHog
requires its own login. No event bodies or PostHog management credentials are served by that route.

## Cutover order

1. Create a separate Better Fullstack organization and its first project in PostHog EU. Keep it on
   the no-card free plan. Verify the project identity before configuring any token or dashboard.
2. Create the private dashboard and its insights from
   [`scripts/analytics/posthog-dashboard.json`](../../scripts/analytics/posthog-dashboard.json).
   The dashboard already exists and its queries passed live validation; reuse it instead of creating
   a duplicate. Use UTC for reporting; SQL tiles have explicit time ranges.
3. Configure the web settings above and deploy the web change. Verify one consenting page view,
   a route exit, builder scroll, a ZIP download, and a CLI event. Check that disabling telemetry,
   Do Not Track and Global Privacy Control prevent browser capture.
4. Configure the same PostHog destination on the exact active Convex production deployment.
   Run its typechecked deploy dry-run, inspect the diff, then deploy the forwarding bridge.
   Do not deploy an unconfigured bridge: it returns 503 and does not fall back to database writes.
5. Wait for pre-deploy ingest requests to finish. Confirm the raw Convex event count has stopped
   growing, then record a UTC cutoff later than the last stored event. Import through that cutoff.
6. Publish the CLI release through the normal release workflow. Verify the published artifact's
   effective telemetry default and delivery to the web endpoint.
7. Compare PostHog monthly event totals and creation outcomes with Convex, excluding new live events.
   Keep the source data intact. Monitor capture failures and PostHog billing during cutover.

This repository change alone does not deploy either service, create a dashboard, or publish a CLI.
Do not remove the bridge until old CLI traffic has declined enough to accept losing that traffic.
Its forwarding calls still use Convex function/action allowance, but no analytics database I/O.
The old aggregate endpoint and internal backfill functions remain for archive verification; do not
schedule backfills or repeatedly poll the archive after cutover.

## Historical import

PostHog's current [migration documentation](https://posthog.com/docs/migrate) requires enrollment in
a paid Product Analytics plan for historical migrations, although the import itself has no standard
ingestion fee. The no-card free plan is not a verified import destination. Do not run `--apply`
until the owner accepts that plan requirement and the destination is configured. Do not enable billing
as part of running the script. All imported timestamps must be at least 48 hours old.

The import reads 100 events per page through Convex's authenticated, read-only CLI. Raw records stay
in memory and pass through the new sanitizer. It preserves timestamps and uses deterministic UUIDs
for PostHog deduplication. Missing historical identity stays unattributed. It never exports raw rows
to disk or deletes source data.

Set `CONVEX_SOURCE_DEPLOYMENT` to the reviewed `team:project:prod` selection and
`BFS_ANALYTICS_IMPORT_BEFORE` to the ISO UTC cutoff. The dry run prints counts only. This command
was verified against one page of the active production deployment:

```sh
bun run scripts/analytics/import-convex.ts --max-pages=1
```

For the full dry run, omit `--max-pages`. For import, also set the PostHog token and host above and
`BFS_ANALYTICS_IMPORT_CHECKPOINT` to a writable file outside the repository. The following write
command is prepared but has not been run against the new destination:

```sh
bun run scripts/analytics/import-convex.ts --apply
```

A checkpoint advances only after PostHog acknowledges the batch. Rerun with the same environment
to resume. A failed checkpoint write can resend a batch with the same UUIDs. Acceptance by the
capture endpoint is not proof the events appear in queries: reconcile after ingestion completes.
Changing the token, source or cutoff requires a separate checkpoint and deliberate reconciliation.

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
timestamps and derives the same event UUIDs as the live importer. It refuses an existing output
directory or duplicate source IDs. No data is uploaded. The JSONL file remains readable with local
tools such as DuckDB independently of either service. Preserve a second copy on an existing backup
drive or backup service; a single laptop copy is vulnerable to disk loss.

The production backup verified on 2026-09-15 contains 12,361 unique analytics events spanning
2026-01-21 through 2026-09-15. ZIP integrity passed and its monthly counts matched the production
audit. Reconcile this snapshot with events collected after its timestamp before retiring Convex.

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
