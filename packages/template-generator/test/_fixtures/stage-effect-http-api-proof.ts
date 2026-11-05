import { mkdtemp, readFile, rename, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { processTemplateString } from "@/core/template-processor";
import { dependencyVersionMap } from "@/dependencies/add-deps";
import { loadTemplates } from "@/core/template-reader";
import { writeTreeToFilesystem } from "@/fs-writer";
import { generateVirtualProject } from "@/generator";
import { makeConfig } from "@test/_fixtures/config-factory";

const runtime = process.argv[2] ?? "bun";
if (runtime !== "bun" && runtime !== "node") throw new Error("Choose bun or node");
const projectDir = await mkdtemp(join(tmpdir(), `bfs-effect-http-api-${runtime}-`));
const config = makeConfig({
  projectDir,
  relativePath: ".",
  frontend: ["none"],
  backend: "effect",
  runtime,
  api: "none",
  auth: "none",
  database: "none",
  orm: "none",
  effect: "none",
  serverDeploy: "none",
  testing: "none",
  forms: "none",
  cssFramework: "none",
});
const generated = await generateVirtualProject({ config, templates: await loadTemplates() });
if (!generated.success || !generated.tree) throw new Error(generated.error ?? "Effect HttpApi generation failed");
await writeTreeToFilesystem(generated.tree, projectDir);
const serverDir = join(projectDir, "apps/server");
await rename(join(serverDir, "src/http-api.ts"), join(serverDir, "src/http-api-base.ts"));
const extension = await readFile(new URL("./effect-http-api-extension.ts.hbs", import.meta.url), "utf8");
await writeFile(join(serverDir, "src/http-api.ts"), processTemplateString(extension, config));
const proof = await readFile(new URL("./effect-http-api-proof.ts.hbs", import.meta.url), "utf8");
await writeFile(join(serverDir, "effect-http-api-proof.ts"), processTemplateString(proof, config));
const packagePath = join(serverDir, "package.json");
const pkg = JSON.parse(await readFile(packagePath, "utf8")) as { scripts: Record<string, string> };
pkg.scripts["proof:effect-http-api"] = `${runtime === "bun" ? "bun run" : "tsx"} effect-http-api-proof.ts ${runtime}`;
await writeFile(packagePath, `${JSON.stringify(pkg, null, 2)}\n`);
const rootPath = join(projectDir, "package.json");
const root = JSON.parse(await readFile(rootPath, "utf8")) as { overrides?: Record<string, string> };
const proofPackages = ["effect", "@effect/platform", "@effect/platform-bun", "@effect/platform-node"] as const;
root.overrides = {
  ...root.overrides,
  ...Object.fromEntries(proofPackages.map((name) => [name, dependencyVersionMap[name].replace(/^[~^]/, "")])),
};
await writeFile(rootPath, `${JSON.stringify(root, null, 2)}\n`);
console.log(projectDir);
