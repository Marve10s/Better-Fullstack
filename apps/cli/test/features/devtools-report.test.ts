import { EMBEDDED_TEMPLATES, generateVirtualProject } from "@better-fullstack/template-generator";
import { writeTreeToFilesystem } from "@better-fullstack/template-generator/fs-writer";
import { createCliDefaultProjectConfigBase, type ProjectConfig } from "@better-fullstack/types";
import { afterAll, describe, expect, it } from "bun:test";
import fs from "fs-extra";
import { tmpdir } from "node:os";
import path from "node:path";

import { buildBtsConfigForPersistence, writeBtsConfig } from "@/config/bts-config";
import { buildDevtoolsReport } from "@/devtools/serve";
import { recordScaffoldManifest } from "@/lifecycle/scaffold-manifest";

const roots: string[] = [];

afterAll(async () => {
  await Promise.all(roots.splice(0).map((root) => fs.remove(root)));
});

async function scaffoldProject(projectDir: string) {
  const config = {
    ...createCliDefaultProjectConfigBase(),
    projectName: path.basename(projectDir),
    projectDir,
    relativePath: ".",
    git: false,
    install: false,
  } as ProjectConfig;
  const persisted = buildBtsConfigForPersistence(config);
  const normalized = { ...config, ...persisted, projectDir, relativePath: "." } as ProjectConfig;
  const generated = await generateVirtualProject({
    config: normalized,
    templates: EMBEDDED_TEMPLATES,
  });
  if (!generated.success || !generated.tree)
    throw new Error(generated.error ?? "generation failed");
  await writeTreeToFilesystem(generated.tree, projectDir);
  await writeBtsConfig(normalized, { version: persisted.version, createdAt: persisted.createdAt });
  await recordScaffoldManifest(projectDir);
}

describe("devtools static report", () => {
  it(
    "bakes the project reads into a self-contained directory",
    async () => {
      const root = await fs.mkdtemp(path.join(tmpdir(), "bfs-devtools-report-"));
      roots.push(root);
      const projectDir = path.join(root, "project");
      await scaffoldProject(projectDir);

      const outDir = await buildDevtoolsReport({ projectDir, outDir: path.join(root, "report") });

      const connection = await fs.readJson(path.join(outDir, "__connection.json"));
      expect(connection.backend).toBe("static");
      expect(await fs.pathExists(path.join(outDir, "index.html"))).toBe(true);

      // The dump must resolve the no-argument status read to the served project.
      const dumpDir = path.join(outDir, "__rpc-dump");
      const dumpFiles = await fs.readdir(dumpDir);
      expect(dumpFiles.length).toBeGreaterThan(0);
      const dumps = await Promise.all(
        dumpFiles.map((file) => fs.readFile(path.join(dumpDir, file), "utf8")),
      );
      const combined = dumps.join("\n");
      expect(combined).toContain("bfs:get_project_status");
      expect(combined).toContain(projectDir);
      // Mutations are never baked, and neither are plans: they carry review tokens.
      expect(combined).not.toContain("bfs:apply_project_update");
      expect(dumpFiles.filter((file) => file.includes("plan_"))).toEqual([]);

      // Rebuilding over a previous report is allowed.
      await buildDevtoolsReport({ projectDir, outDir });
    },
    { timeout: 120_000 },
  );

  it("refuses a report directory that holds anything but a previous report", async () => {
    const root = await fs.mkdtemp(path.join(tmpdir(), "bfs-devtools-report-"));
    roots.push(root);
    const kept = path.join(root, "keep.txt");
    await fs.writeFile(kept, "user data");

    await expect(buildDevtoolsReport({ projectDir: root, outDir: root })).rejects.toThrow(
      /not empty/,
    );
    expect(await fs.readFile(kept, "utf8")).toBe("user data");
  });
});
