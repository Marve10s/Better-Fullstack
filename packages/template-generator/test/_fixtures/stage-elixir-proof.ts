import { copyFile, mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { legacyProjectConfigToStackParts, validateStackParts, type ProjectConfig } from "@better-fullstack/types";

import { loadTemplates } from "@/core/template-reader";
import { writeTreeToFilesystem } from "@/fs-writer";
import { generateVirtualProject } from "@/generator";
import { makeConfig } from "@test/_fixtures/config-factory";

const recipes = {
  "phoenix-processing": {
    elixirWebFramework: "phoenix",
    elixirApi: "rest",
    elixirJson: "jason",
    elixirHttpServer: "bandit",
    elixirLibraries: ["nx", "broadway"],
  },
  "library-processing": {
    elixirWebFramework: "none",
    elixirCaching: "cachex",
    elixirLibraries: ["nx", "broadway", "floki"],
  },
  "grpc-exchange": {
    elixirWebFramework: "phoenix",
    elixirApi: "grpc",
    elixirJson: "jason",
    elixirHttpServer: "bandit",
  },
} satisfies Record<string, Partial<ProjectConfig>>;

const recipe = process.argv[2];
if (recipe !== "phoenix-processing" && recipe !== "library-processing" && recipe !== "grpc-exchange") {
  throw new Error("Choose phoenix-processing, library-processing, or grpc-exchange for the Elixir proof");
}

const projectDir = await mkdtemp(join(tmpdir(), `bfs-elixir-${recipe}-`));
const config = makeConfig({
  projectName: "bfs-elixir-proof",
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
  elixirTesting: "ex_unit",
  elixirObservability: "telemetry",
  ...recipes[recipe],
});

const { issues } = validateStackParts(legacyProjectConfigToStackParts(config));
if (issues.length > 0) throw new Error(issues.map((issue) => issue.message).join("\n"));

const generated = await generateVirtualProject({ config, templates: await loadTemplates() });
if (!generated.success || !generated.tree) {
  throw new Error(generated.error ?? "Elixir proof generation failed");
}

await writeTreeToFilesystem(generated.tree, projectDir);
for (const fixture of recipe === "grpc-exchange" ? [] : ["numerics_proof_test.exs", "pipeline_proof_test.exs"]) {
  await copyFile(
    fileURLToPath(new URL(`./${fixture}`, import.meta.url)),
    join(projectDir, "test", fixture),
  );
}
if (recipe === "library-processing") {
  await copyFile(
    fileURLToPath(new URL("./library_processing_proof_test.exs", import.meta.url)),
    join(projectDir, "test/library_processing_proof_test.exs"),
  );
}

console.log(projectDir);
