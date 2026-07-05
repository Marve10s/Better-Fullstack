# Documentation Follow-Ups

This file tracks the remaining docs work after the initial public `/docs` launch.

Canonical user-facing docs live in `apps/web/content/docs`. Planning docs under `docs/plans` should describe roadmap and implementation intent, not duplicate public docs content.

---

## Compatibility Reference

- [ ] Link compatibility examples from ecosystem option reference pages

## CLI Reference

- [x] Generate flag/default data from CLI definitions or shared schemas where possible — `packages/types/src/cli-flags.ts` is the shared schema source; `apps/web/scripts/generate-cli-flags-data.ts` (wired into `prebuild` via `docs:cli-flags`) emits `apps/web/src/lib/docs/cli-flags-data.ts`, rendered by `<CliFlagTable>` in `content/docs/cli/create.mdx`

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
- [ ] Add stack-update / upgrade-engine docs when the CLI-facing flow is promoted beyond MCP tools
- [ ] Keep localized option tables synced with generated schema output; several translated pages have historically drifted faster than the canonical English docs
