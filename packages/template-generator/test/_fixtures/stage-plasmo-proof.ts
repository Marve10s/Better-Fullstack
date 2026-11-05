import { access, copyFile, mkdir, mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { cliInputToProjectConfigPartial } from "@better-fullstack/types";

import { loadTemplates } from "@/core/template-reader";
import { writeSelectedFiles } from "@/fs-writer";
import { generateVirtualProject } from "@/generator";
import { makeConfig } from "@test/_fixtures/config-factory";

const mode = process.argv[2] ?? "flat";
if (mode !== "flat" && mode !== "mixed") throw new Error("Choose flat or mixed for the Plasmo proof");
const projectDir = await mkdtemp(join(tmpdir(), `bfs-plasmo-${mode}-`));
const selected = mode === "mixed" ? cliInputToProjectConfigPartial({ part: [
  "frontend:typescript:react-vite:site",
  "backend:go:gin:api",
  "appPlatform:typescript:plasmo",
] }) : {};
const config = makeConfig({
  projectName: "plasmo-proof",
  projectDir,
  relativePath: ".",
  ecosystem: "typescript",
  frontend: ["react-vite"],
  backend: "none",
  runtime: "none",
  api: "none",
  database: "none",
  orm: "none",
  auth: "none",
  forms: "none",
  testing: "none",
  cssFramework: "none",
  uiLibrary: "none",
  workspaceShape: "monorepo",
  addons: ["plasmo"],
  ...selected,
});
const generated = await generateVirtualProject({ config, templates: await loadTemplates() });
if (!generated.success || !generated.tree) throw new Error(generated.error ?? "Plasmo proof generation failed");
const iconPath = "apps/extension/assets/icon.png";
await writeSelectedFiles(generated.tree, projectDir, (filePath) => filePath !== iconPath);
await mkdir(join(projectDir, "apps/extension/assets"), { recursive: true });
await copyFile(fileURLToPath(new URL("../../templates/addons/plasmo/apps/extension/assets/icon.png", import.meta.url)), join(projectDir, iconPath));
await access(join(projectDir, "apps/extension/package.json"));
await access(join(projectDir, iconPath));
console.log(projectDir);
