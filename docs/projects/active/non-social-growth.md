# Non-social growth

Started 2026-09-05. Ibrahim authorized the initial measurement and MCP distribution work.
The six-week sequence remains an experiment, with 4 to 6 hours per week as a provisional budget.
Product priorities still follow [the roadmap](../../next-updates-roadmap.md).

## First delivery

- [x] Inspect the live sitemap, sample landing-page HTML, and public distribution catalogs.
- [x] Validate the existing Claude plugin with Claude's validator and the repository validator.
- [x] Add the npm ownership field required by the MCP Registry.
- [x] Generate registry metadata from the CLI package version, including the required `mcp` argument.
- [x] Validate the generated metadata against the registry's published JSON schema.
- [ ] Record the Search Console and production analytics baseline.
- [x] Verify the published MCP server connection and guidance tool.
- [ ] Release the package with its MCP ownership field through the existing release process.
- [ ] Publish the registry entry and verify it through the registry API.
- [ ] Submit the existing plugin to the Claude community marketplace after an installation check.
- [ ] Check open and historical submissions before proposing an awesome-mcp-servers entry.

Preparing these files does not establish registry publication, directory acceptance, or user growth.

## Baseline evidence, 2026-09-05

The [live sitemap](https://better-fullstack.dev/sitemap.xml) returned 103 URLs: 30 stack pages,
40 guide URLs including indexes, 20 docs URLs, five blog URLs including the index, three comparison
URLs, and five other URLs. A sitemap inventory is not a Google indexing report.

Sampled stack pages returned HTTP 200, page-specific titles and H1s, self-referencing canonical
URLs, and indexing allowed in their robots metadata:

- [Hono, oRPC, and Drizzle](https://better-fullstack.dev/stack/tanstack-router-hono-orpc-drizzle)
- [FastAPI, PostgreSQL, and SQLAlchemy](https://better-fullstack.dev/stack/python-fastapi-postgres-sqlalchemy)
- [TanStack Start, PostgreSQL, Drizzle, and Better Auth](https://better-fullstack.dev/stack/tanstack-start-postgres-drizzle-better-auth)

The MCP Registry returned no BF entry for `better-fullstack`. A broader `fullstack` search
returned one unrelated server. The public Claude community and official marketplace catalogs
contained no `better-fullstack` or `Better Fullstack` match when inspected.

Public npm download totals provide a partial baseline:

| Period | Package downloads |
| --- | ---: |
| [2026-08-08 through 2026-09-04](https://api.npmjs.org/downloads/point/2026-08-08:2026-09-04/create-better-fullstack) | 1,770 |
| [2026-07-11 through 2026-08-07](https://api.npmjs.org/downloads/point/2026-07-11:2026-08-07/create-better-fullstack) | 1,974 |

These equal-length periods show 204 fewer downloads, about 10.3 percent. Package downloads include
repeat installs and automation; they do not establish unique users, project completions, or which
channel caused the change. Neither period includes the local verification performed on September 5.

The existing campaign normalizer accepts only `run-before-you-clone`. Before adding attribution,
inspect both browser handling and server validation. Use a fixed vocabulary for placements, preserve
opt-out behavior, and keep arbitrary URLs, prompts, and user content out of telemetry.
Follow [the telemetry guideline](../../guidelines/telemetry-privacy-and-internal-tools.md).

Search Console's detailed reports remain unread. After Ibrahim opened the exact property on
September 5, Zen displayed its Overview. Both attempts to open Performance failed with
`Computer Use server error -10005: noWindowsAvailable`. UI retries stopped after the second
failure. The Overview's visible click total had no verified comparison period and was excluded
from the baseline. No period-specific Google impressions, clicks, indexed-page totals,
conversion rates, or traffic-source rankings have been established. The target property is
`https://better-fullstack.dev/` in Search Console's account slot `/u/1/`.

When access works, record the latest complete 28 days and the preceding 28 days, with exact dates:

- Non-brand and brand search clicks and impressions, with query definitions recorded.
- Top landing pages and queries, including pages with impressions but few clicks.
- Indexing status for the selected guide and starter pages.
- Aggregate builder opens, command copies, ZIP downloads, browser-run readiness, and failures.
- Analytics coverage, known internal/test traffic, and any unavailable attribution.

Keep account exports in local ignored storage. Report command copies, downloads, and observed
creation completions separately. Do not imply a browser-to-CLI identity join or that a download
proves a working application.

## MCP publication preparation

The registry identity is `io.github.Marve10s/better-fullstack`.
Its authoritative npm ownership field is `mcpName` in `apps/cli/package.json`.

From the repository root, generate metadata into an ignored output directory:

```bash
mkdir -p private/growth
bun run scripts/release/generate-mcp-registry.ts > private/growth/server.json
```

The generation command was verified locally on 2026-09-05. It reads the package version instead
of introducing another version file for the release scripts to maintain. It produces an npm
package entry with stdio transport and the positional `mcp` argument. It does not publish.

At inspection, npm's `create-better-fullstack@2.6.3` had no `mcpName`. The newly added field cannot
retroactively change those published bytes. A new release carrying the field must precede registry
publication. After that release, regenerate the metadata and verify that the exact published
package name, version, and ownership field match the registry payload.

The generated JSON passed validation against the official 2025-12-11 schema with format checking
disabled; its fixed HTTPS URLs were inspected separately. Publisher v1.8.1 advertises `validate`
in its help but returned `Unknown command: validate` for `validate --help`. Schema validation is
not a successful publisher preflight or ownership check.

Publication then requires registry authentication for the namespace, the registry's publication
step, and a registry API lookup that returns the exact entry. Keep credentials out of documents
and shell output. Use the [official publishing workflow](https://modelcontextprotocol.io/registry/quickstart).

## Initial placement queue

| Destination | Material to prepare | Completion evidence |
| --- | --- | --- |
| Official MCP Registry | Version-derived metadata and a released package with ownership metadata | Exact server and version returned by registry API |
| Claude community marketplace | Existing plugin, validation result, installation instructions, and a short demonstration | Submission receipt; acceptance and installability tracked separately |
| awesome-mcp-servers | One factual Developer Tools entry, after checking previous submissions | Submission URL; merged listing tracked separately |

The Claude plugin passed `claude plugin validate ./plugin` and `bun run test:plugin-bundle` on
2026-09-05. These validate packaging, not an end-to-end installation or scaffold workflow.
The published `create-better-fullstack@2.6.3` server also completed MCP initialization, listed
37 tools, and returned guidance successfully through its configured `npx` stdio launch. Telemetry
was disabled for that check. The client and server were closed after the probe; no project was
generated. This establishes server launch and a read-only tool call, not scaffold correctness.
The [Claude community submission instructions](https://code.claude.com/docs/en/plugins#submit-your-plugin-to-the-community-marketplace)
provide a Console form for individual authors. Community submission does not request official
marketplace inclusion.

Suggested directory description, subject to each destination's length and format rules:

> Validate stack choices, preview generated files, and scaffold fullstack projects locally through MCP.

Use the existing project documentation for installation and permissions. The server runs locally
and includes tools that write files; describe those capabilities accurately.

Gemini packaging and a Railway template follow the initial queue. No new hosting service or
model API spending is part of the first delivery.

## GPT-6 Astra article

Ibrahim proposed using new model releases to attract relevant search traffic. OpenAI's
[GPT-6 Astra model page](https://developers.openai.com/api/docs/models/gpt-6-astra) and
[model guide](https://developers.openai.com/api/docs/guides/latest-model) name the model and
describe its coding and tool-use capabilities. On 2026-09-05, they also describe a staged rollout.
Do not infer universal account availability or an exact release date from the word "today" on a
changing documentation page.

Article title: **Build a fullstack starter with GPT-6 Astra and Better Fullstack**.

Proposed reader: a developer with access to Astra in a coding agent who wants a reproducible
starting project. Search phrases such as `GPT-6 Astra fullstack app` and `GPT-6 Astra MCP` are
editorial hypotheses, not measured search demand.

The article should explain the division of work: the coding agent interprets the request and
continues application development; BF validates the selected stack and generates the starting
files. BF's generator does not require a model API call. The agent's access and charges remain
separate from BF.

The [article source](../../../apps/web/content/blog/gpt-6-astra-fullstack-starter.mdx) is now in the
publication changes. It uses the CLI path and links to the current T3 builder preset. Deployment
and search indexing must be verified separately from repository publication. English content is
canonical with translations explicitly pending. The cover uses existing OpenAI and Better Fullstack
icons with manually placed text; its editable SVG and 1200-by-630 PNG are included.

Ibrahim requested an Unslop rewrite and no Better Fullstack version pin in the article. Public
commands now use `@latest`; the historical verification receipt retains the exact package tested.
The npm `latest` tag still resolved to that package when checked during this revision. The rewrite
leads with a developer's app idea, explains the generator's role, and adds a concrete private-notes
feature prompt as a suggested next task. It condenses verification detail without expanding the
claims. [Matt Shumer's original review](https://somethingbig.ai/astra-review) informed the discussion
of giving an agent useful tools and existing starting material.

The first AGY video-research attempt with Gemini 3.8 Flash High exited with
`Error: timeout waiting for response` after five minutes. On Ibrahim's request, a GPT-5.6 Sol
research subagent investigated the original video sources while the primary agent checked metadata.
Direct YouTube player data now verifies both originals:

- [GPT-6 Astra with Ben Davis](https://www.youtube.com/watch?v=B-jjnydci50), published by OpenAI,
  2:16. Its original description discusses DEF CON puzzles and parallel research branches for
  testing theories and staying on track. This establishes the topic, not independently verified
  puzzle results or verbatim statements from Ben.
- [It's Here.](https://www.youtube.com/watch?v=XFWpf0wLbh0), by Theo - t3.gg, 44:12. Its original
  description establishes his early access to Astra but supplies no detailed argument or chapter
  outline.

Caption tracks exist, but timed-text requests returned HTTP 200 with empty bodies. The transcript
API returned HTTP 400 `FAILED_PRECONDITION`. Original audio retrieval returned HTTP 403 and could
not provide complete audio for transcription. Retries stopped. Native metadata and the discovery
HTML remain in ignored local storage. The full video-content portion remains incomplete.

Ibrahim then authorized using quotes and topics from the videos. The article now includes short
excerpts from both original descriptions, explicitly labeled as description excerpts. It uses Theo's
early-access context and OpenAI's account of Ben's hypothesis-testing workflow to introduce a
practical debugging approach. It does not present the descriptions as spoken quotations, add
timestamps, or claim either creator tested or endorsed Better Fullstack.

A Codex desktop session using GPT-6 Astra ran the published `create-better-fullstack@2.6.3` T3
preset with Bun, `agents-md`, `--no-install`, and `--no-git`. The dry run reported 68 files in
28 directories. Generation, installation, four TypeScript tasks, and the Next.js production build
passed without manual source edits. Next.js itself updated the generated TypeScript configuration.
The [verification receipt](../../../testing/combos-2026-09-05.json) records commands, environment,
results, limits, and hashes. Raw logs and the resolved dependency lockfile remain in ignored local
storage under `private/growth-2026-09-05/astra-verification/`.

The run did not start a server, connect to PostgreSQL, apply a schema, test browser auth, or deploy.
The article states those limits and contains no model speed, cost-saving, or comparison claims.
It includes a reusable task prompt and separates the agent's model access from the local generator.
MCP installation and MCP-driven generation remain separate from this CLI walkthrough.

Validation: article MDX compilation, agent-document validation, and `git diff --check` passed.
All 20 content and browser/server loader assertions passed in the first run, but Bun 1.4.0 then
crashed after the assertions with `panic: range end index 1522 out of range for slice of length
1024`. The same tests were rerun using an ignored temporary Bun configuration with coverage
disabled, but that run also crashed after all assertions passed with the same error. A clean test
process exit was initially unverified. Before publication, the same 20 tests passed with a clean
exit on the latest main checkout, with its normal coverage configuration. No repository test
configuration was changed.

Ibrahim approved pushing this task to main. After deployment, verify the article's canonical page,
sitemap entry, internal links, preview image, and Search Console URL inspection result.
Future model articles need their own tested workflow and reader benefit; do not produce near-identical
pages by swapping model names.

## Next experiment

Use Search Console evidence to confirm or replace the provisional Hono topic. Improve the existing
Hono auth guide, its corresponding starter page, and the architecture decision article. Give each a
distinct purpose and verify their path into the builder.

Publish one maintained starter from a pinned BF release before considering a larger collection.
Check installation, database initialization, sign-up, sign-in, and an authenticated request. Add a
deployment button only after verifying its deployment. Update through reviewed release changes.

Record the date each placement goes live. Inspect referrals after a month of exposure and revisit
search performance at weeks 8 and 12. These are review windows, not promised ranking deadlines.
If traffic is too small, record insufficient evidence. If visitors arrive but cannot finish setup,
fix that path before extending distribution.
