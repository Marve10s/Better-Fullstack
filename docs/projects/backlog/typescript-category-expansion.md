# TypeScript — Expand Existing Categories

PostHog analytics, standalone Redis caching, Supabase Storage, and the direct Anthropic SDK are
shipped. Only unfinished additions or category decisions remain below.

## Caching

- [ ] Add Memcached if demand justifies a pure-cache alternative to Redis.
- [ ] Add Dragonfly if demand justifies a Redis-compatible runtime option.

## Database Setup

- [ ] Deepen generated provider setup with credentials, branch/database creation hints, and safe MCP
      stack-update defaults.

## AI

- [ ] Add Instructor for validated structured-output extraction.
- [ ] Deepen PostHog’s generated analytics and feature-flag examples instead of adding another
      schema value.

## UI

- [ ] Decide how the existing `nextui` identifier migrates or aliases to HeroUI before adding a
      second public value for the same library lineage.

## Data Fetching

- [ ] Decide whether data fetching remains addon-shaped or becomes a dedicated Capability Role.

## API

- [ ] Add Effect HTTP when Effect-heavy demand justifies a generated API layer.

## Priority

1. Generated-project and provider-setup depth.
2. PostHog depth across both roles.
3. Demand-gated caching additions.
4. Effect HTTP.
5. HeroUI identity decision.
6. Data-fetching role decision.
