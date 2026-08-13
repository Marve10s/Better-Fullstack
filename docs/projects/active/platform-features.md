# Platform Features

The baseline-aware update engine, check/doctor command, structured JSON, lifecycle surface parity,
and public verified-combinations surfaces are shipped. The remaining active work is upgrade
provenance and recovery.

## Upgrade Reliability

- [ ] Record explicit generator/template versions and upgrade history.
- [ ] Generate executable cross-version fixtures and document the supported upgrade window.
- [ ] Add manifest-v2 provenance and bind apply to a supported source/template lineage.
- [ ] Add transactional, recoverable patch/backup output.
- [ ] Validate prior-release upgrades against real repositories with local edits and conflicts.

## Current Safety Boundary

Manifest v1 records a baseline but does not prove generator/template lineage. Applying a v1 plan is
an explicitly acknowledged destructive action, not a cross-version safety guarantee. Do not present
current plan binding, multi-target checks, browser baselines, or clean-SHA generated-project
evidence as proof that prior-release upgrades are safe.

## Completion

Close this project when the supported upgrade window has executable fixtures, recovery output is
usable after a failed apply, and real-repository evidence covers clean drift, user edits,
conflicts, structured merges, and removed files.
