# Go Ecosystem Expansion

Current state includes the original Go surface plus `stdlib`, Bun ORM, and Meilisearch/Bleve search.
Only unfinished follow-ups remain below.

Goal: bring Go to feature parity with TypeScript's depth across all backend categories.

---

## Web Frameworks

- [x] Add `stdlib` (net/http) with Go 1.22 routing and generated handlers.

### Files to touch

- `packages/types/src/schemas.ts` — add values to `GoWebFrameworkSchema`
- `packages/types/src/option-metadata.ts` — add labels
- `apps/cli/src/prompts/go-ecosystem.ts` — add prompt options
- `apps/web/src/lib/constant.ts` — add builder entries
- `packages/template-generator/templates/go-base/cmd/server/` — add framework-specific main.go and handler patterns

---

## ORMs / Database

- [x] Add `bun` with database setup and framework handler coverage.

### Files to touch

- `packages/types/src/schemas.ts` — add to `GoOrmSchema`
- `packages/template-generator/templates/go-base/internal/database/` — add Ent schema definitions and Bun setup

---

## Search (new category)

- [x] Add `meilisearch` with the official Go SDK.
- [x] Add `bleve` with generated embedded search helpers.

### Implementation

- New schema: `GoSearchSchema = z.enum(["meilisearch", "bleve", "none"])`
- Generate search client in `internal/search/`

---

## Priority Order

1. **Generated-project quality checks** — run `go test` / `go build` coverage for richer option combinations.
2. **Template depth pass** — make sure existing categories include meaningful usage, not just deps.
