import { describe, expect, test } from "bun:test";
import { readdir } from "node:fs/promises";

const INDEX_PATH = "docs/projects/README.md";
const LIFECYCLES = ["active", "backlog", "completed"] as const;

async function projectFiles(): Promise<string[]> {
  const entries = await Promise.all(
    LIFECYCLES.map(async (lifecycle) =>
      (await readdir(`docs/projects/${lifecycle}`))
        .filter((file) => file.endsWith(".md"))
        .map((file) => `${lifecycle}/${file}`),
    ),
  );
  return entries.flat().sort();
}

function indexedProjects(source: string): string[] {
  return [...source.matchAll(/^- `((?:active|backlog|completed)\/[^`]+\.md)`/gm)]
    .flatMap((match) => (match[1] ? [match[1]] : []))
    .sort();
}

function activeRows(source: string): Array<{ path: string; lane: string }> {
  return [
    ...source.matchAll(
      /^- `(active\/[^`]+\.md)` - \[([^\]]+)\]\(\.\.\/next-updates-roadmap\.md#[^)]+\):/gm,
    ),
  ].flatMap((match) => {
    const path = match[1];
    const lane = match[2];
    return path && lane ? [{ path, lane }] : [];
  });
}

describe("project lifecycle registry", () => {
  test("indexes every project exactly once", async () => {
    const [source, files] = await Promise.all([Bun.file(INDEX_PATH).text(), projectFiles()]);
    const indexed = indexedProjects(source);

    expect(indexed).toEqual(files);
    expect(new Set(indexed).size).toBe(indexed.length);
  });

  test("backlog contains unfinished work only", async () => {
    const backlog = await readdir("docs/projects/backlog");
    const completedRows = (
      await Promise.all(
        backlog
          .filter((file) => file.endsWith(".md"))
          .map(async (file) => {
            const path = `docs/projects/backlog/${file}`;
            const source = await Bun.file(path).text();
            return /^\s*-\s*\[[xX]\]/mu.test(source) ? [path] : [];
          }),
      )
    ).flat();

    expect(completedRows).toEqual([]);
  });

  test("every active project names and links its current roadmap lane", async () => {
    const [index, roadmap] = await Promise.all([
      Bun.file(INDEX_PATH).text(),
      Bun.file("docs/next-updates-roadmap.md").text(),
    ]);
    const active = activeRows(index);

    expect(active.map((row) => row.path).sort()).toEqual([
      "active/documentation-follow-ups.md",
      "active/platform-features.md",
      "active/single-source-of-truth-stack-graph.md",
    ]);
    for (const row of active) {
      expect(roadmap).toContain(`## ${row.lane}`);
    }
  });

  test("Operational Trust is the first stop-the-line roadmap lane", async () => {
    const roadmap = await Bun.file("docs/next-updates-roadmap.md").text();
    const operationalTrust = roadmap.indexOf("## Now — Operational Trust");
    const lifecycleReliability = roadmap.indexOf("## Now — Lifecycle Reliability");

    expect(operationalTrust).toBeGreaterThan(-1);
    expect(operationalTrust).toBeLessThan(lifecycleReliability);
    expect(roadmap).toContain("[project lifecycle](projects/README.md)");
    expect(roadmap).toContain("[backend runbook](../packages/backend/README.md)");
  });
});
