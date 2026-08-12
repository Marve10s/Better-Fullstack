# Preview Publishing Security

Use this runbook when changing `.github/workflows/pr-preview*.yaml` or the npm preview environment.

## Threat model and boundary

Pull request source, dependencies, build scripts, and uploaded artifacts are untrusted. A fork author may modify any of them and may try to exfiltrate credentials, poison caches, publish unexpected package identities, replace a labeled head after review, or inject text into a shell command.

The enforced boundary is:

1. `PR Preview Build` uses `pull_request`, read-only `contents`, no secrets, no cache, and a credential-free checkout. It may execute PR code and uploads four tarballs tied to its workflow run ID.
2. `PR Preview Publish` runs trusted default-branch workflow code through `workflow_run`. Its authorization job re-queries GitHub and requires a current, open, `preview`-labeled PR whose head SHA and repository match the completed run. Forks and untrusted author associations are rejected. Preview versions embed the full 40-character head SHA.
3. The protected environment releases the job only after approval; its first security step re-fetches the PR and rejects a changed head SHA, repository, state, `preview` label, or trusted author association before downloading artifacts.
4. `publish-preview` never checks out or executes repository or artifact code. It downloads only the triggering run's named artifact, rejects extra files, directories, and symlinks, verifies all four package names and the full-SHA base-derived preview version with `npm publish --dry-run --ignore-scripts`, and publishes with `--ignore-scripts`. If that exact version already exists, its registry `dist.integrity` and `dist.shasum` must match the downloaded tarball before the workflow may move the PR tag.
5. The npm secret, PR write token, and execution of the published preview live in separate jobs. The workflow requests no `id-token`. The smoke job is deliberately unprivileged.

Same-repository preview artifacts can contain arbitrary contributor code; publishing that code is the purpose of a preview. The protected environment approval is the human content-review gate. The design prevents that code from receiving the npm credential or a write/OIDC token.

## Required GitHub settings

Configure the `npm-preview` environment as follows:

- create a package-scoped `NPM_PREVIEW_TOKEN` only as an environment secret of that name; verify no repository or organization secret named `NPM_PREVIEW_TOKEN` exists, and never reuse or fall back to the release workflow's repository-level `NPM_TOKEN`;
- require one or more trusted maintainers as reviewers;
- disable administrator bypass;
- restrict deployment branches to the protected default branch (the `workflow_run` workflow runs from that branch).

For a repository with two or more trusted maintainers, enable **Prevent self-review** so the PR author cannot approve publication. This repository currently has one owner and one eligible reviewer, so `prevent_self_review` is deliberately disabled; enabling it would deadlock owner-authored previews. Enable it when a second trusted maintainer is available.

### Current activation state (2026-08-09)

The `npm-preview` environment exists with Marve10s as its required reviewer, administrator bypass disabled, and deployment restricted to protected branches. `NPM_PREVIEW_TOKEN` is not configured yet, so preview publication is intentionally inactive and fails closed. Adding that package-scoped environment secret is the remaining owner action; do not add the `preview` label until it is ready for an owner-controlled drill.

The existing repository-level `NPM_TOKEN` belongs to the release workflow and is not a preview fallback. Moving that credential into the separate `npm-publish` environment is a distinct release-hardening operation; never copy its value into `npm-preview`.

Use a granular npm access token with read/write access scoped only to the four preview packages. Enable npm's 2FA bypass for that token only if publishing on the owner account requires it, choose the shortest practical expiration, and rotate it before expiry. Do not add any other secrets to the build, smoke, or comment jobs.

## Validation

Run:

```bash
bun run test:workflow-security
```

The validator is also part of `bun run test:release`. It rejects a privileged-trigger job that checks out a PR head while holding a secret/write permission, cache restoration in such a job, secrets or write permissions in the untrusted build, checkout in the npm job, OIDC permission, missing same-repository/current-head/trusted-association reauthorization, loose artifact run binding or identity checks, shortened-SHA versions, write-all permissions, unchecked retagging, and publication without lifecycle scripts disabled.
