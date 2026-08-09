# Legacy Analytics Tombstone

`apps/analytics` is retired legacy Convex source kept as an explicit `410 Gone` contract for old `/track` clients. It is not the production telemetry owner, and checked-in source alone does not prove the legacy deployment is quarantined.

- In this source, `POST /track` and `OPTIONS /track` return `410` without CORS headers and with `Cache-Control: private, no-store`.
- The endpoint performs no parsing, logging, database reads, or mutations.
- Historical data and the Convex app are intentionally retained; retirement is not authorization to delete either.
- Legacy data reads are internal Convex functions only.

Active ingestion, aggregates, and the owner dashboard belong to [`packages/backend`](../../packages/backend/README.md). Do not add features or new callers here. The owner must follow the backend runbook to export and verify the exact legacy deployment before deploying or claiming the tombstone is live.
