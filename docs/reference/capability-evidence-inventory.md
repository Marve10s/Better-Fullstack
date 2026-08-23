# Capability evidence inventory

The capability inventory gives each public option an evidence level, maturity, freshness state,
maintenance owner, last verified release, limitation, and closing recipe. The executable authority
lives in `packages/types/src/capability-inventory.ts`.

## Evidence levels

The shared levels are `listed`, `generated`, `build-verified`, and `runtime-verified`. Each level
includes the requirements of the levels before it. `docs/guidelines/capability-evidence-levels.md`
defines what each level proves.

An option without a golden runtime recipe remains `listed`. The inventory marks such options
experimental unless they are schema controls such as the package manager or version channel. A
passing receipt promotes only the options named in that recipe's `coveredOptions` list. It does not
promote every option that happened to exist in the generated project.

## Golden runtime recipes

The release proof runs eight recipes. `testing/lib/generated-project-proof-matrix.ts` derives the
matrix from the same definitions used by the CLI, MCP server, and web evidence endpoint.

| Recipe       | Generation input                           | Live assertion                                                                                                                      | Known limit                                            |
| ------------ | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| TypeScript   | `react-hono` test preset                   | Pushes the Drizzle schema, starts Hono, calls GraphQL health, then creates a Better Auth email user.                                | It does not run a browser UI.                          |
| React Native | Explicit React Native and Hono Stack Parts | Builds and type-checks the native app, starts the generated Hono backend, and calls its root endpoint.                              | It does not launch a simulator or device.              |
| Rust         | `rust-axum-seaorm` test preset             | Builds the Clap CLI, runs `info`, starts Axum through the CLI, calls the SeaORM health endpoint, then runs the CLI `check` command. | It uses local SQLite instead of a network database.    |
| Python       | `python-fastapi-sqlalchemy` test preset    | Starts FastAPI through Uvicorn and calls the health endpoint.                                                                       | It does not cover external Python services.            |
| Go           | `go-gin-gorm` test preset                  | Runs a real buffered gRPC client and server call, starts Gin, and calls the GORM health endpoint.                                   | It uses local SQLite instead of a network database.    |
| Java         | `java-spring-maven` test preset            | Starts Spring Boot and calls the Actuator health endpoint.                                                                          | It uses the generated local H2 configuration.          |
| Elixir       | `elixir-phoenix-api` test preset           | Creates and migrates the Ecto SQLite database, starts Phoenix, and calls its health endpoint.                                       | It covers the API path, not LiveView browser behavior. |
| .NET         | `dotnet-minimal-efcore` test preset        | Starts the built ASP.NET Minimal API and calls the health-check endpoint.                                                           | It uses the generated local SQLite database.           |

The proof writes `generated-project-proof.json` and `capability-runtime-receipt.json` under
`testing/.smoke-output/generated-project-proof/`. A release receipt embeds the capability receipt
only when all eight recipes pass from a clean, full-SHA checkout.

## Freshness and producer changes

Evidence fails closed under these conditions:

- A missing receipt leaves every option at `listed` and `unverified`.
- A malformed receipt, catalog mismatch, or producer fingerprint mismatch reports
  `producer-mismatch`.
- A receipt older than 30 days reports `stale`.
- A failed recipe reports `failed` for its covered options.
- A public deployment at a different Git SHA reports `revision-mismatch` and publishes no current
  runtime claim.
- A quarantine entry lowers the option to `listed` and either marks it experimental or hides it.

The producer fingerprint includes the lockfile, option schemas, generator source, templates, proof
runner, recipe matrix, and test presets. The public web report also requires the receipt SHA to
match the deployed SHA. A template or dependency change therefore needs a new proof receipt.

## User-facing access

The same inventory appears in these places:

- `bunx create-better-fullstack evidence --json` returns the complete report. The command accepts
  `--receipt`, `--ecosystem`, `--category`, and `--option` filters.
- The MCP tool `bfs_get_capability_evidence` returns the report without writing files.
- The builder displays evidence and freshness beside solo and multi-stack choices.
- Generated stack pages display evidence for every selected part.
- `/api/capability-evidence` returns a fail-closed public report from the current release receipt.

## Audits and maintenance cost

Run the source audit before promoting an option:

```bash
bun run scripts/capability-evidence-audit.ts --markdown
```

The audit reports TODO branches, placeholders, manual setup, and dependency-only candidates. A
match starts a review. It does not prove that an option is broken.

Each capability receipt records flaky runs, repair minutes, dependency changes, and whether its
verification maintainer is present. Compare one or more receipts with:

```bash
bun run scripts/capability-maintenance-report.ts --markdown path/to/receipt.json
```

The report recommends `keep`, `watch`, or `quarantine` for each recipe. A current failed run or
missing maintainer coverage recommends quarantine. Flaky runs, at least 120 repair minutes, or at
least 10 dependency changes recommend watch.

## Quarantine restoration

`CAPABILITY_QUARANTINE` retains the option identity, owner, reason, visibility, and restoration
recipe. Restoring an option requires a passing current receipt at the recipe definition version.
Removing the quarantine entry without that receipt must not restore a runtime badge.
