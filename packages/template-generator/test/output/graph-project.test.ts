import { cliInputToProjectConfigPartial } from "@better-fullstack/types";
import { makeConfig } from "@test/_fixtures/config-factory";
import { describe, expect, it } from "bun:test";

import type { VirtualNode } from "@/types";

import { generateVirtualProject } from "@/generator";
import { getGraphBackendConnections } from "@/graph/graph-backend";
import { getGraphProjectTasks } from "@/graph/graph-project";
import { EMBEDDED_TEMPLATES } from "@/templates.generated";

const files = (node: VirtualNode): { path: string; content: string }[] =>
  node.type === "file" ? [node] : node.children.flatMap(files);
const configFor = (part: string[]) =>
  makeConfig({ ...cliInputToProjectConfigPartial({ part }), addons: [], install: false });

async function generate(part: string[]) {
  const config = configFor(part);
  const result = await generateVirtualProject({ config, templates: EMBEDDED_TEMPLATES });
  expect(result.success, result.error).toBe(true);
  if (!result.tree) throw new Error(result.error);
  return new Map(files(result.tree.root).map((file) => [file.path, file.content]));
}

describe("multi-ecosystem project output", () => {
  it("generates a native-only project without a JavaScript root or install instructions", async () => {
    const output = await generate(["frontend:dotnet:blazor-webassembly", "backend:go:gin"]);
    expect(output.has("package.json")).toBe(false);
    expect(output.has("tsconfig.json")).toBe(false);
    expect(output.get("scripts/setup.sh")).toContain("dotnet restore");
    expect(output.get("scripts/setup.sh")).toContain("go mod tidy");
    expect(output.get("scripts/dev.sh")).toContain("dotnet watch run");
    expect(output.get("scripts/dev.sh")).toContain("go run cmd/server/main.go");
    expect(output.get("README.md")).not.toContain("bun install");
  });

  it("starts a JavaScript frontend and all named native backends together", async () => {
    const output = await generate([
      "frontend:typescript:react-vite",
      "backend:go:gin:api",
      "backend:python:fastapi:worker",
    ]);
    const root = JSON.parse(output.get("package.json") ?? "{}") as {
      scripts: Record<string, string>;
      devDependencies: Record<string, string>;
    };
    expect(root.scripts.dev).toContain("concurrently --kill-others");
    expect(root.scripts.dev).toContain("web");
    expect(root.scripts.dev).toContain("go run");
    expect(root.scripts.dev).toContain("uvicorn");
    expect(root.devDependencies.concurrently).toBeDefined();
  });

  it("prepares Flutter using its SDK and preserves mobile-first output", async () => {
    const output = await generate(["mobile:dart:flutter", "backend:go:gin"]);
    expect(output.has("package.json")).toBe(false);
    expect(output.get("scripts/setup.sh")).toContain("flutter pub get");
    expect(output.get("README.md")).toContain("flutter run");
    expect([...output.keys()].some((path) => path.endsWith("lib/main.dart"))).toBe(true);
  });

  it("runs each named Java backend with the wrapper it generates", async () => {
    const specs = [
      "backend:java:spring-boot:api",
      "api.buildTool:java:maven",
      "backend:java:quarkus:worker",
      "worker.buildTool:java:gradle",
    ];
    const output = await generate(specs);
    const connections = getGraphBackendConnections(configFor(specs));
    expect(output.has("services/api/mvnw")).toBe(true);
    expect(output.has("services/worker/gradlew")).toBe(true);
    expect(connections.find((connection) => connection.partId === "api")?.devCommand).toContain(
      "./mvnw spring-boot:run",
    );
    expect(connections.find((connection) => connection.partId === "worker")?.devCommand).toContain(
      "./gradlew quarkusDev",
    );
    expect(
      connections.find((connection) => connection.partId === "worker")?.checkCommand,
    ).toContain("./gradlew build");
    expect(connections.find((connection) => connection.partId === "worker")?.testCommand).toContain(
      "./gradlew test",
    );
  });

  it("uses the Python package manager owned by the selected service", () => {
    const tasks = getGraphProjectTasks(
      configFor(["backend:python:fastapi", "backend.packageManager:python:poetry"]),
    );
    expect(tasks[0]?.setup).toContain("poetry install");
    expect(tasks[0]?.dev).toContain("poetry run uvicorn");
  });
});

it("runs every native setup command from the project root", async () => {
  const { mkdtemp, mkdir, writeFile, readFile, realpath, rm } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const directory = await realpath(await mkdtemp(join(tmpdir(), "bfs-graph-setup-")));
  try {
    const output = await generate(["frontend:dotnet:blazor-webassembly", "backend:go:gin"]);
    for (const path of ["bin", "apps/web", "apps/server", "scripts"])
      await mkdir(join(directory, path), { recursive: true });
    const script = output.get("scripts/setup.sh");
    if (!script) throw new Error("Missing native setup script");
    await writeFile(join(directory, "scripts/setup.sh"), script);
    for (const tool of ["go", "dotnet"]) {
      await writeFile(
        join(directory, "bin", tool),
        '#!/usr/bin/env bash\nprintf "%s\\n" "$PWD" >> "$GRAPH_SETUP_LOG"\n',
        { mode: 0o755 },
      );
    }
    const logPath = join(directory, "setup.log");
    const child = Bun.spawn(["bash", "scripts/setup.sh"], {
      cwd: directory,
      env: {
        ...process.env,
        PATH: `${join(directory, "bin")}:${process.env.PATH}`,
        GRAPH_SETUP_LOG: logPath,
      },
      stdout: "pipe",
      stderr: "pipe",
    });
    expect(await child.exited).toBe(0);
    expect((await readFile(logPath, "utf8")).trim().split("\n").sort()).toEqual(
      [join(directory, "apps/server"), join(directory, "apps/web")].sort(),
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

it("stops sibling native services and preserves the failing service exit status", async () => {
  const { mkdtemp, mkdir, writeFile, readFile, rm } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const directory = await mkdtemp(join(tmpdir(), "bfs-graph-startup-"));
  let child: ReturnType<typeof Bun.spawn> | undefined;
  try {
    const output = await generate(["frontend:dotnet:blazor-webassembly", "backend:go:gin"]);
    for (const path of ["bin", "apps/web", "apps/server", "scripts"])
      await mkdir(join(directory, path), { recursive: true });
    await writeFile(join(directory, "scripts/dev.sh"), output.get("scripts/dev.sh") ?? "");
    await writeFile(
      join(directory, "bin/go"),
      `#!/usr/bin/env bash
trap 'printf stopped > "$GRAPH_TEST_DIR/stopped"; exit 0' TERM
touch "$GRAPH_TEST_DIR/started"
while true; do sleep 0.05; done
`,
      { mode: 0o755 },
    );
    await writeFile(
      join(directory, "bin/dotnet"),
      `#!/usr/bin/env bash
for attempt in {1..40}; do
  if [[ -f "$GRAPH_TEST_DIR/started" ]]; then exit 7; fi
  sleep 0.05
done
exit 8
`,
      { mode: 0o755 },
    );
    child = Bun.spawn(["bash", "scripts/dev.sh"], {
      cwd: directory,
      env: {
        ...process.env,
        PATH: `${join(directory, "bin")}:${process.env.PATH}`,
        GRAPH_TEST_DIR: directory,
      },
      stdout: "ignore",
      stderr: "ignore",
    });
    const deadline = setTimeout(() => child?.kill("SIGTERM"), 4000);
    try {
      expect(await child.exited).toBe(7);
      expect(await readFile(join(directory, "stopped"), "utf8")).toBe("stopped");
    } finally {
      clearTimeout(deadline);
    }
  } finally {
    child?.kill();
    await rm(directory, { recursive: true, force: true });
  }
});

for (const platform of ["posix", "windows"] as const) {
  it(`executes pip setup and service commands with a ${platform} virtual environment`, async () => {
    const { mkdtemp, mkdir, writeFile, readFile, realpath, rm } = await import("node:fs/promises");
    const { tmpdir } = await import("node:os");
    const { join } = await import("node:path");
    const directory = await realpath(await mkdtemp(join(tmpdir(), "bfs-python-setup-")));
    try {
      const config = configFor([
        "backend:python:fastapi:api",
        "backend:python:fastapi:worker",
        "worker.packageManager:python:pip",
      ]);
      const connection = getGraphBackendConnections(config).find(
        (connection) => connection.partId === "worker",
      );
      if (!connection) throw new Error("Missing Python service");
      await mkdir(join(directory, "bin"));
      await mkdir(join(directory, connection.targetPath), { recursive: true });
      const venv = platform === "windows" ? "Scripts/python.exe" : "bin/python";
      const python = platform === "windows" ? "python" : "python3";
      const recorder =
        '#!/usr/bin/env bash\nprintf "%s|%s\\n" "$PWD" "$*" >> "$GRAPH_PYTHON_LOG"\n';
      await writeFile(join(directory, "recorder"), recorder, { mode: 0o755 });
      await writeFile(
        join(directory, "bin", python),
        `#!/usr/bin/env bash
[ "$*" = "-m venv .venv" ] || exit 2
mkdir -p .venv/${platform === "windows" ? "Scripts" : "bin"}
cp "$GRAPH_PYTHON_RECORDER" .venv/${venv}
`,
        { mode: 0o755 },
      );
      const logPath = join(directory, "python.log");
      for (const command of [
        connection.setupCommand,
        connection.devCommand,
        connection.checkCommand,
        connection.testCommand,
      ]) {
        if (!command) throw new Error("Missing Python command");
        const child = Bun.spawn(["bash", "-c", command], {
          cwd: directory,
          env: {
            ...process.env,
            OS: platform === "windows" ? "Windows_NT" : "",
            PORT: "8123",
            PATH: `${join(directory, "bin")}:${process.env.PATH}`,
            GRAPH_PYTHON_LOG: logPath,
            GRAPH_PYTHON_RECORDER: join(directory, "recorder"),
          },
          stdout: "pipe",
          stderr: "pipe",
        });
        const stderr = await new Response(child.stderr).text();
        expect(await child.exited, stderr).toBe(0);
      }
      const prefix = `${join(directory, connection.targetPath)}|`;
      expect((await readFile(logPath, "utf8")).trim().split("\n")).toEqual([
        `${prefix}-m pip install -e .[dev]`,
        `${prefix}-m uvicorn app.main:app --reload --host 0.0.0.0 --port 8001`,
        `${prefix}-m ruff check .`,
        `${prefix}-m pytest`,
      ]);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
}
