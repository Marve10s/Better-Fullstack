# External Upgrade Validation - 2026-08-12

The lifecycle update engine completed 20 successful plan/apply/recover cycles across 20 public,
non-fork Better Fullstack repositories discovered through GitHub code search for `bts.jsonc`.

Each repository was shallow-cloned into an isolated temporary directory. The validator adopted a
manifest-v2 baseline, produced a token-bound current-template plan, applied that exact plan with
the required unverified-lineage acknowledgement, recovered the emitted transaction, and compared
the full project byte-for-byte with its pre-apply state. `.git` and Better Fullstack's retained
recovery archive were excluded; symlink targets were included. No dependencies or repository code
were executed.

| Repository                               | Actionable files | Recovery |
| ---------------------------------------- | ---------------: | -------- |
| `mdhruvil/gitflare`                      |               50 | Exact    |
| `hehehai/tiny-svg`                       |               30 | Exact    |
| `uptimekit/uptimekit`                    |               71 | Exact    |
| `rogasper/labas-bahasa`                  |               47 | Exact    |
| `jeremyosih/gitinspect`                  |               41 | Exact    |
| `jingerpie/ocean-dataview`               |               42 | Exact    |
| `stakpak/paks`                           |               36 | Exact    |
| `IvyYang1999/opentrends`                 |               68 | Exact    |
| `AbdullahMukadam/formscn`                |               22 | Exact    |
| `shujanshaikh/glide`                     |                2 | Exact    |
| `OpeOginni/gitterm`                      |               48 | Exact    |
| `FranP-code/Open-Telegram-to-Notion-Bot` |               60 | Exact    |
| `damien-schneider/reflet`                |               47 | Exact    |
| `BeroLab/blaboard`                       |               41 | Exact    |
| `yeasin2002/express-ts-starter`          |               21 | Exact    |
| `Just-Moh-it/openedit`                   |               31 | Exact    |
| `slarity/gamekit-ui`                     |               25 | Exact    |
| `f-amine/vibe-stack`                     |               44 | Exact    |
| `ilrein/openwrite`                       |               48 | Exact    |
| `kuluruvineeth/openbeam`                 |               56 | Exact    |

The first qualification run exposed non-repeatable plans when an absent generated `.env` received
a fresh random secret on each render. The update planner now classifies absent secret files as
manual and never creates them during update. A regression test preserves stable review tokens for
that case.

Re-run the qualification with `bun run test:external-upgrades`. The repository list and fail-closed
20-success threshold live in `scripts/validation/validate-external-upgrades.ts`; the networked lane is kept out
of the ordinary release test because it depends on external repository availability.
