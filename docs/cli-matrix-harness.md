# CLI Matrix Harness

Automated compatibility harness for Better-Fullstack project generation.

## Purpose

- Generates 10 diverse projects per cycle
- Uses production command path (`bun create better-fullstack@latest`) when run with `--prod`
- Verifies structure + install health
- Produces JSON + Markdown reports
- Cleans old temp folders before each cycle

## Usage

```bash
# local source mode (faster dev loop)
bun scripts/cli-matrix-harness.ts

# production package mode
bun scripts/cli-matrix-harness.ts --prod

# verbose logs
bun scripts/cli-matrix-harness.ts --verbose
```

## Outputs

Reports are written to `reports/`:

- `cli-matrix-<timestamp>.json`
- `cli-matrix-<timestamp>.md`

Temp projects are created in:

- `/tmp/bfs-matrix-runs/current`

They are deleted at the start of each new run.

## Notes

- This is a harness MVP for repeatability and regression detection.
- Extend `MATRIX` in `scripts/cli-matrix-harness.ts` to add scenarios.
