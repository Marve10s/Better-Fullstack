# Non-social growth

Started 2026-09-05; planning state audited 2026-09-25. The proposed six-week experiment uses
4 to 6 hours per week as a provisional budget. Product priority follows the
[roadmap](../../next-updates-roadmap.md#growth-and-distribution).

Metadata preparation and the Astra article have shipped. This queue tracks unfinished outcomes.
Earlier account access or push authorization is historical.

## Measurement baseline

- [ ] Record Search Console's latest complete 28 days and preceding 28 days, with exact dates,
      brand/non-brand query definitions, landing pages, impressions, clicks, and indexing status.
- [ ] Record the PostHog baseline for builder opens, handoffs, ZIP downloads, CLI create outcomes,
      repeat lifecycle use, known internal traffic, and missing attribution.
- [ ] Define and measure eligible-decision coverage before claiming the roadmap's 80 percent target.

The September 5 sitemap and npm download counts are dated observations, not an indexing or
conversion baseline. Search Console detail was not successfully read. The
[analytics operations reference](../../reference/posthog-analytics-operations.md) records the
September 15 PostHog cutover and preserved archives; no Convex activation work remains.

Keep account exports in ignored local storage. Command copies, downloads, and successful creation
are separate outcomes. CLI and browser anonymous identities are separate. Follow the
[telemetry guideline](../../guidelines/telemetry-privacy-and-internal-tools.md).

## Distribution

The released [v2.6.8 npm metadata](https://registry.npmjs.org/create-better-fullstack/2.6.8) contains
`mcpName: io.github.Marve10s/better-fullstack`. The release prerequisite is complete.
The [registry lookup](https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.Marve10s%2Fbetter-fullstack)
returned no entry on September 25.

- [ ] Regenerate metadata for the chosen published version, publish the MCP Registry entry, and
      verify that exact server/version through the registry API.
- [ ] Complete a current end-to-end plugin installation check, then submit to the Claude community
      marketplace. Track submission, acceptance, and installability separately.
- [ ] Check open and historical awesome-mcp-servers submissions before submitting one factual entry.

`bun run scripts/release/generate-mcp-registry.ts` derives metadata from `apps/cli/package.json`.
Use an ignored output directory. The previous schema check and plugin validation are preparation
history, not a current publisher ownership check or end-to-end installation result.

No submission receipt is recorded for the two directories. Check their actual state before making
any submission. This planning file does not authorize external messages or submissions.

## Article deployment and indexing

The [Astra article source](../../../apps/web/content/blog/gpt-6-astra-fullstack-starter.mdx), assets,
and [dated build receipt](../../../testing/combos-2026-09-05.json) are checked in.

- [ ] Verify its deployed canonical page, sitemap entry, internal links, and preview image.
- [ ] Record Search Console URL inspection and indexing status when account access is authorized.

The receipt proves generation, installation, type checks, and a Next.js production build for its
named package and environment. It does not prove database setup, browser authentication, or
production deployment. New model articles need their own tested workflow and reader benefit.

## Conditional next experiment

Use measured search results to confirm or replace the provisional Hono topic. Improve the existing
auth guide, starter page, and architecture article only when each has a distinct reader task.

Before expanding a maintained starter collection, pin one BF release and prove installation,
database initialization, sign-up, sign-in, and an authenticated request. Verify deployment before
adding a deployment button. Gemini packaging and a Railway template remain conditional follow-ups.

Record each placement's live date. Review referrals after a month, and search at weeks 8 and 12.
Record insufficient evidence when traffic is too small. Fix setup failures before expanding distribution.
