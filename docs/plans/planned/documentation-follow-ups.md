# Documentation Follow-Ups

This file tracks the remaining docs work after the initial public `/docs` launch.

Canonical user-facing docs live in `apps/web/content/docs`. Planning docs under `docs/plans` should describe roadmap and implementation intent, not duplicate public docs content.

---

## Compatibility Reference

- [ ] Link compatibility examples from ecosystem option reference pages

## CLI Reference

- [x] Generate flag/default data from CLI definitions or shared schemas where possible — `packages/types/src/cli-flags.ts` is the shared schema source; `apps/web/scripts/generate-cli-flags-data.ts` (wired into `prebuild` via `docs:cli-flags`) emits `apps/web/src/lib/docs/cli-flags-data.ts`, rendered by `<CliFlagTable>` in `content/docs/cli/create.mdx`
- [x] Document every registered user command, including update, gen, registry, recommend, telemetry,
      aliases, utilities, and the maintainer-only update-deps distinction
- [x] Mark experimental/local-only command boundaries from the implementation rather than roadmap prose

## Web Builder Workflows

- [x] Document Preview, Edit & Run support/limitations, disposable edits, and WebContainer behavior
- [x] Document ZIP generation/download, shared URL import, saved stacks, and the CLI handoff

## Information Architecture

- [x] Reorganize the sidebar around the project lifecycle: start, build, evolve, choose, automate,
      and reference
- [x] Add task-oriented recipes for the default TypeScript stack, self-backend Next.js, Python,
      .NET, multi-ecosystem products, and the browser ZIP workflow
- [x] Add an explicit create → verify → evolve → regenerate lifecycle guide and clarify when to use
      `add` versus `update`

## Ecosystems and Languages

- [x] Cover all eight solo ecosystem surfaces
- [x] Cover multi-ecosystem ownership, named backend services, Blazor/Rust frontends, and
      Kotlin/Compose, SwiftUI, and Flutter mobile parts

## Stack Guides

- [x] Add deeper frontend framework guides — `content/docs/stack-guides/frontend-frameworks.mdx`
- [x] Add backend framework guides — `content/docs/stack-guides/backend-frameworks.mdx`
- [x] Add database + ORM pairing guide — `content/docs/stack-guides/database-orm-pairing.mdx`
- [x] Add auth provider comparison — `content/docs/stack-guides/auth-providers.mdx`

## Section Guides

- [x] Add environment-variable setup per provider — `content/docs/provider-setup/environment-variables.mdx`
- [x] Add database provisioning guides for Turso, Neon, Supabase, PlanetScale, and other supported providers — `content/docs/provider-setup/database-provisioning.mdx`

## Next Documentation Updates

- [x] Publish generated-project CI and verified-combinations coverage in the public docs/site, sourcing from `docs/verified-combinations.md`
- [x] Add baseline-aware `update` engine docs, including plan/apply/check/adoption and merge boundaries
- [x] Publish local Markdown variants for every docs/guide page, a scoped docs agent index,
      `llms-full.txt`, and a semantic Markdown sitemap
- [x] Expose CLI-version and review-date freshness markers, with a public versioning policy
- [x] Add contract tests that keep MCP tools, CLI commands, schema-derived option inventories,
      sidebar metadata, agent indexes, and roadmap checkboxes aligned with implementation
- [ ] Keep localized option tables synced with generated schema output; several translated pages have historically drifted faster than the canonical English docs
      Canonical English now falls back automatically while `translationStatus: pending`; the remaining
      work is to review and refresh each localized body before removing that marker.
