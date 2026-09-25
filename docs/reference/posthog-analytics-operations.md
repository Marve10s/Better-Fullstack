# Analytics operations and archives

PostHog is the destination for Better Fullstack analytics. The web server owns the public
`/api/analytics/ingest` endpoint. `apps/web/src/lib/telemetry` validates events and forwards them to
PostHog using its capture API. The repository has no Convex dependency, database schema, generated
client, or service deployment. PostHog owns reporting; offline archives preserve the historical data.

The former `packages/backend` workspace, its Convex service, and the retired `apps/analytics` app
are gone, including queries, backfills, the old forwarding bridge, and unused content endpoints.
The web app no longer contains the aggregate decision dashboard. Convex remains available as a backend choice in generated
user projects; that product capability is separate from Better Fullstack's analytics infrastructure.

## Recorded destination and cutover

The following configuration and production checks were recorded on 2026-09-15. Recheck live
connection, project, and dashboard settings before an operational change; this repository audit
does not verify the current hosted state.

The separate `posthog_betterfulstack` MCP connection uses OAuth for Better Fullstack's EU project
`275138`, then named **Default project**, in organization `01a0a4d2-d0db-0000-fe30-bad1bdb7dc29`.
GiftSong retains its separate plugin connection.

The private [Better Fullstack analytics dashboard](https://eu.posthog.com/project/275138/dashboard/954254)
contains all ten reports from `scripts/analytics/posthog-dashboard.json`. On 2026-09-15, each SQL
query and the saved dashboard executed successfully against the empty destination. This validates
query execution, not event delivery or reconciliation. Production cutover completed on 2026-09-15:
the web endpoint went live, CLI 2.6.7 shipped with the new endpoint, and the hosted Convex project
was deleted after a final verified export. Historical import into PostHog was not performed; the
verified archives below are the only source for events before that date.

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

## Preserved history

The hosted Better-Fullstack Convex project was deleted on 2026-09-15 after the final export was
reconciled against the archive (12,390 events, all 12,361 earlier IDs preserved). Raw exports and
archives live outside the repository in the owner's local backup folder and iCloud Drive.

There is no forwarding bridge. CLI versions built with the old Convex hostname stop reporting
analytics after that endpoint is retired. Their product commands still work because telemetry
failures are nonfatal. Reporting to PostHog requires a CLI release built with the new ingest URL. Old history remains available in the independent archive.

## Historical import

At the 2026-09-15 review, PostHog historical migration required a paid Product Analytics plan, so
import was left unapplied. Recheck [migration requirements](https://posthog.com/docs/migrate) and
the destination's plan before an import. Obtain authorization for any required billing change;
running the script does not authorize one. The importer requires timestamps at least 48 hours old.

The importer reads the sanitized `posthog-events.jsonl` and `manifest.json` from a local archive.
It needs no Convex account, CLI, schema or running deployment. It verifies the checksum and unique
event IDs, rechecks the privacy allowlist, and preserves timestamps and deterministic UUIDs. The
manifest must identify conversion version 2. Rebuild earlier conversions from the original ZIP
into a new directory; retain the earlier files for comparison. Archives up to 256 MiB are supported.

Set `BFS_ANALYTICS_ARCHIVE_DIRECTORY` to the archive directory. This read-only command verifies all
rows and prints monthly counts; it was verified against all 12,361 saved production events:

```sh
bun run scripts/analytics/import-archive.ts
```

Once destination requirements and upload authorization are satisfied, set `POSTHOG_PROJECT_TOKEN`,
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

The 2026-09-15 review recorded a one-year retention window for the no-card plan and seven years
for paid plans. Verify the actual project's current [event retention](https://posthog.com/docs/data/events-retention)
before choosing an export schedule. Saved dashboards do not preserve underlying rows. Keep an
independent archive and export new events before the applicable retention deadline.

Keep the original Convex ZIP, including its aggregate tables, intact. To create a separate sanitized
analytics archive without contacting Convex or PostHog, set `CONVEX_BACKUP_ZIP` to the production
snapshot, `CONVEX_SOURCE_DEPLOYMENT` to the original `team:project:prod` identifier, and
`BFS_ANALYTICS_ARCHIVE_DIRECTORY` to a new directory outside the repository. Then run:

```sh
bun run scripts/analytics/archive-convex.ts
```

The script reads only `analyticsEvents/documents.jsonl` and creates `posthog-events.jsonl` plus a
manifest with a checksum, monthly counts and the timestamp range. It preserves original event
timestamps and retains stable event UUIDs across repeated conversions and imports. It stages both
files in a temporary directory and publishes the complete directory with one rename. It refuses an
existing output directory or duplicate source IDs. Failed conversions clean up staging files; a hard
process interruption can leave a `.partial-*` sibling, which can be discarded after a successful retry.
No data is uploaded. The JSONL file remains readable with local
tools such as DuckDB independently of either service. Preserve a second copy on an existing backup
drive or backup service; a single laptop copy is vulnerable to disk loss.

The production backup verified on 2026-09-15 contains 12,361 unique analytics events spanning
2026-01-21 through 2026-09-15. ZIP integrity passed and its monthly counts matched the production
audit. Conversion version 2 restores envelope fields buried in old `stack` records, recovers library
dimensions from `options`, and counts universal database selections once. It preserves all 12,361
event IDs and timestamps. In this backup, it restores envelope fields on 377 events and corrects
library selections on 6,549 events. Use the new conversion for import; the original ZIP and first
archive remain intact. The final 12,390-event export described above supersedes this earlier
snapshot for complete pre-cutover history; retain both for comparison.

Recurring PostHog exports were not configured at cutover. Verify whether they now exist, and
export new events before their retention deadline with checked counts and timestamps. The historical
archive protects past events only; creating it does not automatically archive future PostHog events.

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
apply allowlists. The server limits each trusted request origin to 120 requests per minute and each
instance to 1,200.
On Vercel, an ephemeral HMAC of `x-vercel-forwarded-for` identifies the origin; raw addresses never
enter analytics or the limiter map. Other hosts share a conservative unknown-origin bucket until a
trusted adapter is supplied. Caller-selected machine IDs do not allocate buckets. These in-memory
limits reset with the instance; configure hosting ingress limits for protection across instances.

## Free allowance and baseline

The production audit on 2026-09-15 found 12,361 stored events and 4,459 recorded project creations.
August had 5,096 events; September through the audit had 3,035. CLI creation counts are incomplete
for recent releases because the previous release builder forced the telemetry default off.

At fewer than 10,000 monthly pageviews, one view plus up to seven engagement checkpoints per view
adds at most about 80,000 events to the observed product-event baseline. Normal visits generate
about two events. BFCache restores can add terminal checkpoints; real traffic remains the measure.
Even a 70,000-event stress baseline plus 80,000 page events is
below the one-million monthly analytics-event allowance recorded at the September 15 review.
Historical migration requirements are separate. This is a dated capacity estimate,
not a guarantee against bots, growth or changed pricing. Check the project's Billing page.

Sources: [PostHog pricing](https://posthog.com/pricing),
[capture API](https://posthog.com/docs/api/capture),
[historical migration](https://posthog.com/docs/migrate),
[SQL array breakdowns](https://posthog.com/tutorials/hogql-breakdowns).
