import { describe, expect, test } from "bun:test";
import { readdir } from "node:fs/promises";

const REGISTRY_PATH = "docs/plans/README.md";
const VALID_STATES = new Set(["Active", "Candidate", "Historical"]);

async function planFiles(): Promise<string[]> {
  const entries = await Promise.all(
    ["planned", "completed"].map(async (directory) =>
      (await readdir(`docs/plans/${directory}`))
        .filter((file) => file.endsWith(".md"))
        .map((file) => `${directory}/${file}`),
    ),
  );
  return entries.flat().sort();
}

function registryRows(source: string): Array<{ state: string; path: string; purpose: string }> {
  return [
    ...source.matchAll(
      /^\|\s*(Active|Candidate|Historical)\s*\|\s*`([^`]+)`\s*\|\s*([^|\n]+?)\s*\|$/gm,
    ),
  ].flatMap((match) => {
    const state = match[1];
    const path = match[2];
    const purpose = match[3];
    return state && path && purpose ? [{ state, path, purpose }] : [];
  });
}

describe("planning registry", () => {
  test("covers every plan exactly once with an explicit state", async () => {
    const [source, files] = await Promise.all([Bun.file(REGISTRY_PATH).text(), planFiles()]);
    const rows = registryRows(source);
    const registered = rows.map((row) => row.path).sort();

    expect(registered).toEqual(files);
    expect(new Set(registered).size).toBe(registered.length);
    expect(rows.every((row) => VALID_STATES.has(row.state))).toBe(true);
  });

  test("completed records cannot be advertised as active or candidate", async () => {
    const rows = registryRows(await Bun.file(REGISTRY_PATH).text());
    const invalid = rows.filter(
      (row) => row.path.startsWith("completed/") && row.state !== "Historical",
    );

    expect(invalid).toEqual([]);
  });

  test("every active plan names and links its current roadmap lane", async () => {
    const [registry, roadmap] = await Promise.all([
      Bun.file(REGISTRY_PATH).text(),
      Bun.file("docs/next-updates-roadmap.md").text(),
    ]);
    const active = registryRows(registry).filter((row) => row.state === "Active");

    expect(active.map((row) => row.path).sort()).toEqual([
      "planned/documentation-follow-ups.md",
      "planned/platform-features.md",
      "planned/single-source-of-truth-stack-graph.md",
    ]);
    for (const row of active) {
      const lane = row.purpose.match(/^\[([^\]]+)\]\(\.\.\/next-updates-roadmap\.md#[^)]+\)\s+—/);
      expect(lane, `${row.path} must link a named roadmap lane`).not.toBeNull();
      expect(roadmap).toContain(`## ${lane?.[1]}`);
    }
  });

  test("Operational Trust is the first stop-the-line roadmap lane", async () => {
    const roadmap = await Bun.file("docs/next-updates-roadmap.md").text();
    const operationalTrust = roadmap.indexOf("## Now — Operational Trust");
    const lifecycleReliability = roadmap.indexOf("## Now — Lifecycle Reliability");

    expect(operationalTrust).toBeGreaterThan(-1);
    expect(operationalTrust).toBeLessThan(lifecycleReliability);
    expect(roadmap).toContain("[planning registry](plans/README.md)");
    expect(roadmap).toContain("[backend runbook](../packages/backend/README.md)");
  });
});
