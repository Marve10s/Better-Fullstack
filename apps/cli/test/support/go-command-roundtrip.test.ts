import {
  createCliDefaultProjectConfigBase,
  DEFAULT_STACK_SELECTION,
  generateStackSelectionCommand,
  ProjectConfigSchema,
  type ProjectConfig,
} from "@better-fullstack/types";
import { ensureBuiltCliBinary } from "@testing/lib/cli-binary";
import { scaffoldWithCli, formatCliScaffoldFailure } from "@testing/lib/cli-scaffold";
import { beforeAll, expect, test } from "bun:test";
import { parse } from "jsonc-parser";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import { generateReproducibleCommand } from "@/lifecycle/generate-reproducible-command";

let cliPath = "";

beforeAll(async () => {
  cliPath = await ensureBuiltCliBinary(resolve(import.meta.dir, "../../../.."));
}, 120_000);

const selectedGoFields = {
  goWebFramework: "echo",
  goOrm: "sqlx",
  goApi: "grpc-go",
  goCli: "urfave-cli",
  goLogging: "logrus",
  goAuth: "jwt",
  goTesting: ["gomock", "testcontainers"],
  goRealtime: "centrifuge",
  goMessageQueue: "kafka-go",
  goCaching: "ristretto",
  goConfig: "koanf",
  goObservability: "prometheus",
  goValidation: "validator",
  goQuality: "golangci-lint",
  goMigrations: "goose",
  goTemplating: "templ",
  goProtoTooling: "buf",
  goDI: "fx",
} satisfies Partial<ProjectConfig>;

const disabledGoFields = {
  goWebFramework: "none",
  goOrm: "none",
  goApi: "none",
  goCli: "none",
  goLogging: "none",
  goAuth: "none",
  goTesting: ["none"],
  goRealtime: "none",
  goMessageQueue: "none",
  goCaching: "none",
  goConfig: "none",
  goObservability: "none",
  goValidation: "none",
  goQuality: "none",
  goMigrations: "none",
  goTemplating: "none",
  goProtoTooling: "none",
  goDI: "none",
} satisfies Partial<ProjectConfig>;

const cases = [
  { name: "selected", fields: selectedGoFields, expected: selectedGoFields },
  { name: "disabled", fields: disabledGoFields, expected: { ...disabledGoFields, goTesting: [] } },
];

async function scaffoldCommand(command: string, cwd: string) {
  const [projectName, ...flags] = command
    .replace(/^bun create better-fullstack@latest\s+/, "")
    .split(/\s+/);
  if (!projectName) throw new Error("Missing generated project name");
  const result = await scaffoldWithCli({
    cliPath,
    cwd,
    projectName,
    flags,
    env: { npm_config_user_agent: `bun/${Bun.version}` },
    timeoutMs: 60_000,
    expectedFiles: ["bts.jsonc"],
  });
  expect(result.ok, formatCliScaffoldFailure(result)).toBe(true);
  const persisted: unknown = parse(await readFile(join(result.projectDir, "bts.jsonc"), "utf8"));
  if (typeof persisted !== "object" || persisted === null || Array.isArray(persisted)) {
    throw new Error("Expected a persisted project config object");
  }
  return persisted;
}

for (const scenario of cases) {
  test(`round-trips all Go fields through builder and legacy replay with ${scenario.name} options`, async () => {
    const directory = await mkdtemp(join(tmpdir(), "bfs-go-command-roundtrip-"));
    try {
      const builder = generateStackSelectionCommand({
        ...DEFAULT_STACK_SELECTION,
        ...scenario.fields,
        ecosystem: "go",
        projectName: `go-${scenario.name}`,
        packageManager: "bun",
        database: scenario.name === "selected" ? "postgres" : "none",
        auth: "none",
        aiDocs: [],
        git: "false",
        install: "false",
      });
      const original = await scaffoldCommand(builder, directory);
      expect(original).toMatchObject(scenario.expected);
      const projectName = `go-${scenario.name}-replay`;
      const replayConfig = ProjectConfigSchema.parse({
        ...createCliDefaultProjectConfigBase("bun"),
        ...original,
        projectName,
        projectDir: join(directory, projectName),
        relativePath: projectName,
        stackParts: undefined,
        git: false,
        install: false,
      });
      const replay = await scaffoldCommand(generateReproducibleCommand(replayConfig), directory);
      expect(replay).toMatchObject(scenario.expected);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  }, 150_000);
}
