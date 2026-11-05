import { legacyProjectConfigToStackParts, validateStackParts } from "@better-fullstack/types";
import { generateVirtualProject } from "@better-fullstack/template-generator";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { loadTemplates } from "@/core/template-reader";
import { writeTreeToFilesystem } from "@/fs-writer";
import { makeConfig } from "@test/_fixtures/config-factory";

const deploy = process.argv[2];
if (deploy !== "docker" && deploy !== "fly" && deploy !== "gigalixir" && deploy !== "mix-release") {
  throw new Error("Choose docker, fly, gigalixir, or mix-release for the Elixir release proof");
}

const projectDir = await mkdtemp(join(tmpdir(), `bfs-elixir-release-${deploy}-`));
const config = makeConfig({
  projectName: "bfs-elixir-release-proof",
  projectDir,
  relativePath: ".",
  ecosystem: "elixir",
  frontend: ["none"],
  backend: "none",
  database: "none",
  orm: "none",
  api: "none",
  testing: "none",
  forms: "none",
  cssFramework: "none",
  elixirWebFramework: "none",
  elixirClustering: "libcluster",
  elixirDeploy: deploy,
  elixirObservability: "telemetry",
  elixirTesting: "ex_unit",
});

const { issues } = validateStackParts(legacyProjectConfigToStackParts(config));
if (issues.length > 0) throw new Error(issues.map((issue) => issue.message).join("\n"));

const generated = await generateVirtualProject({ config, templates: await loadTemplates() });
if (!generated.success || !generated.tree) throw new Error(generated.error ?? "Release generation failed");
await writeTreeToFilesystem(generated.tree, projectDir);
console.log(projectDir);
