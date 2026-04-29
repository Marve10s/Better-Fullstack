# Documentation Follow-Ups

The first public `/docs` experience shipped in `v1.6.2`. This file tracks the remaining docs work after the initial site launch.

Canonical user-facing docs live in `apps/web/content/docs`. Planning docs under `docs/plans` should describe roadmap and implementation intent, not duplicate public docs content.

---

## Roadmap

- [ ] Add a public roadmap page to `/docs`
  - Source from a curated subset of `docs/plans/planned`
  - Link each roadmap item to the relevant plan, issue, or discussion
  - Keep completed roadmap entries linked to `docs/plans/completed`

## Compatibility Reference

- [ ] Add compatibility docs generated from shared compatibility metadata
- [ ] Explain common disabled-option reasons and auto-resolution behavior
- [ ] Link compatibility examples from ecosystem option reference pages

## CLI Reference

- [ ] Add full CLI command reference
- [ ] Include `create`, `add`, `history`, `mcp`, and builder-related command flows
- [ ] Generate flag/default data from CLI definitions or shared schemas where possible

## Stack Guides

- [ ] Add deeper frontend framework guides
- [ ] Add backend framework guides
- [ ] Add database + ORM pairing guide
- [ ] Add auth provider comparison

## Deployment Guides

- [ ] Add deployment walkthroughs for Cloudflare, Fly, Railway, Docker, SST, and Vercel
- [ ] Add environment-variable setup per provider
- [ ] Add database provisioning guides for Turso, Neon, Supabase, PlanetScale, and other supported providers

## AI / MCP

- [ ] Add MCP tools reference from `apps/cli/src/mcp.ts`
- [ ] Add agent setup examples for Claude Code, Cursor, VS Code, Zed, and related tools
- [ ] Explain skills addon and MCP addon output in generated projects
