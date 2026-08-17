# Python Ecosystem Expansion

> **Completed 2026-08-12.**

The remaining scoped expansion—Python search—shipped with Meilisearch and Elasticsearch.

## Evidence

- `packages/types/src/schemas.ts` accepts both search selections.
- `packages/template-generator/src/processors/search-deps.ts` adds their clients.
- `testing/lib/presets.ts` includes `python-elasticsearch` in the broad generated-project lane.

Generic template-depth and provider-doc maintenance are standing quality expectations, not an
unfinished bounded project.
