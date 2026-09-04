import { scaffoldWithCli, formatCliScaffoldFailure } from "@testing/lib/cli-scaffold";
import { DEFAULT_STACK } from "@web/lib/stack/stack-defaults";
import { generateStackCommand } from "@web/lib/stack/stack-utils";
import { expect, test } from "bun:test";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const cases = [
  {
    name: "native-web",
    parts: ["frontend:dotnet:blazor-webassembly", "backend:go:gin"],
    javascript: false,
    marker: "apps/web/Program.cs",
  },
  {
    name: "flutter",
    parts: ["mobile:dart:flutter", "backend:go:gin"],
    javascript: false,
    marker: "apps/native/lib/main.dart",
  },
  {
    name: "swift",
    parts: ["mobile:swift:swiftui", "backend:go:gin"],
    javascript: false,
    marker: "apps/native/project.yml",
  },
  {
    name: "kotlin",
    parts: ["mobile:kotlin:jetpack-compose", "backend:go:gin"],
    javascript: false,
    marker: "apps/native/gradlew",
  },
  {
    name: "react-native",
    parts: ["mobile:react-native:native-bare", "backend:go:gin"],
    javascript: true,
    marker: "apps/native/package.json",
  },
  {
    name: "named-services",
    parts: [
      "frontend:typescript:react-vite",
      "backend:go:gin:api",
      "backend:python:fastapi:worker",
      "worker.packageManager:python:poetry",
    ],
    javascript: true,
    marker: "services/worker/pyproject.toml",
  },
];

for (const scenario of cases) {
  test(`composer command scaffolds ${scenario.name} through the built CLI`, async () => {
    const directory = await mkdtemp(join(tmpdir(), "bfs-composer-cli-"));
    try {
      const command = generateStackCommand({
        ...DEFAULT_STACK,
        projectName: scenario.name,
        stackMode: "multi",
        stackPartSpecs: scenario.parts,
        aiDocs: [],
        git: "false",
        install: "false",
      });
      expect(command.includes("--package-manager")).toBe(scenario.javascript);
      const [projectName, ...flags] = command
        .replace(/^bun create better-fullstack@latest\s+/, "")
        .split(/\s+/);
      if (!projectName) throw new Error("Missing generated project name");
      const result = await scaffoldWithCli({
        cliPath: resolve(import.meta.dir, "../../dist/cli.mjs"),
        cwd: directory,
        projectName,
        flags,
        timeoutMs: 30_000,
        expectedFiles: ["bts.jsonc", "README.md", scenario.marker],
      });
      expect(result.ok, formatCliScaffoldFailure(result)).toBe(true);
      expect(result.stdout.includes("--package-manager")).toBe(scenario.javascript);
      expect(/Package Manager: (?:bun|npm|pnpm|yarn)\b/.test(result.stdout)).toBe(
        scenario.javascript,
      );
      const rootPackage = join(result.projectDir, "package.json");
      expect(existsSync(rootPackage)).toBe(scenario.javascript);
      const readme = await readFile(join(result.projectDir, "README.md"), "utf8");
      if (scenario.javascript) {
        expect(readme).toContain("bun run dev");
        const root = JSON.parse(await readFile(rootPackage, "utf8")) as {
          scripts: Record<string, string>;
        };
        expect(root.scripts.dev).toContain("go run");
        if (scenario.name === "named-services") {
          expect(root.scripts.dev).toContain("poetry run uvicorn");
          expect(root.scripts.dev).toContain("concurrently --kill-others");
        }
      } else {
        expect(readme).toContain("bash scripts/dev.sh");
        expect(readme).not.toContain("bun install");
        expect(await readFile(join(result.projectDir, "scripts/setup.sh"), "utf8")).toContain(
          "go mod tidy",
        );
      }
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 45_000);
}
