# Community-Requested Integrations

Unresolved requests that do not yet warrant individual project files. Validate demand and current
library status before promotion; issue age alone is not product priority.

## UI

- [ ] Decide whether Gluestack needs a separate web/universal path or whether the shipped
      mobile-oriented surface is sufficient.
- [ ] Decide whether to rename or alias the internal `nextui` identifier to HeroUI without breaking
      existing URLs and generated configs.

## API

- [ ] Add an Effect HTTP API Capability Role when Effect is selected. Use `@effect/platform` and
      provide meaningful typed error/handler generation rather than dependency-only wiring.

## Database

- [ ] Add a raw-SQL path that generates connection pools, typed query helpers, and migrations. The
      existing `none` ORM value only skips ORM generation and does not satisfy this request.
- [ ] Evaluate InstantDB as a managed realtime/offline database across React and React Native.

## AI

- [ ] Deepen Mastra generation if its current surface remains dependency-light.

## Developer Tools

- [ ] Add TanStack DevTools as a development-only addon with framework-aware placement.
- [ ] Support importing validated shadcn customization URLs without allowing remote config to bypass
      compatibility or file-generation rules.

## Browser Extensions

- [ ] Add Plasmo if demand justifies a second extension framework beside WXT.

## Priority

1. Raw SQL with real generated usage.
2. InstantDB.
3. Plasmo.
4. Effect HTTP.
5. Mastra depth.
6. Remaining demand-gated items.
