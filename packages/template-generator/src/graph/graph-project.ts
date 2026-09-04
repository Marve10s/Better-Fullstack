import { hasJavaScriptWorkspaceRoot, type ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import { getGraphBackendConnections } from "@/graph/graph-backend";

export type GraphProjectTask = {
  id: string;
  path: string;
  label: string;
  setup: string | null;
  dev: string | null;
  interactive: boolean;
};

const quote = (value: string) => `'${value.replaceAll("'", "'\\''")}'`;

/** Commands are rooted at the project directory, including named service paths. */
export function getGraphProjectTasks(config: ProjectConfig): GraphProjectTask[] {
  const parts = (config.stackParts ?? []).filter(
    (part) => !part.ownerPartId && part.source !== "provided" && part.toolId !== "none",
  );
  const tasks: GraphProjectTask[] = [];
  if (hasJavaScriptWorkspaceRoot(parts)) {
    tasks.push({
      id: "workspace",
      path: ".",
      label: "JavaScript workspace",
      setup: `${config.packageManager} install`,
      dev: null,
      interactive: false,
    });
  }
  for (const backend of getGraphBackendConnections(config)) {
    tasks.push({
      id: backend.partId,
      path: backend.targetPath,
      label: backend.label,
      setup:
        backend.setupCommand ??
        (backend.ecosystem === "rust"
          ? `cd ${quote(backend.targetPath)} && cargo fetch`
          : backend.ecosystem === "java"
            ? backend.checkCommand
            : null),
      dev: backend.devCommand,
      interactive: false,
    });
  }
  for (const part of parts) {
    const path = part.targetPath ?? (part.role === "frontend" ? "apps/web" : "apps/mobile");
    const cd = `cd ${quote(path)} && `;
    const task = { id: part.id, path, label: part.toolId, interactive: part.role === "mobile" };
    if (part.role === "frontend" && part.ecosystem === "dotnet") {
      tasks.push({ ...task, setup: `${cd}dotnet restore`, dev: `${cd}dotnet watch run` });
    }
    if (part.role === "frontend" && part.ecosystem === "rust") {
      const rustBackend = parts.find(
        (candidate) => candidate.role === "backend" && candidate.ecosystem === "rust",
      );
      const workspace = rustBackend?.targetPath ?? path;
      const client =
        part.toolId === "dioxus"
          ? "dioxus-client"
          : part.toolId === "yew"
            ? "yew-client"
            : "client";
      tasks.push({
        ...task,
        path: `${workspace}/crates/${client}`,
        setup: `cd ${quote(workspace)} && cargo fetch`,
        dev: `cd ${quote(`${workspace}/crates/${client}`)} && ${part.toolId === "dioxus" ? "dx serve" : "trunk serve"}`,
      });
    }
    if (part.role === "mobile" && part.ecosystem === "dart") {
      tasks.push({
        ...task,
        setup: `${cd}flutter create --platforms=android,ios . && flutter pub get`,
        dev: `${cd}flutter run`,
      });
    }
    if (part.role === "mobile" && part.ecosystem === "swift") {
      tasks.push({
        ...task,
        setup: `${cd}xcodegen generate`,
        dev: `${cd}open BetterFullstackApp.xcodeproj`,
      });
    }
    if (part.role === "mobile" && part.ecosystem === "kotlin") {
      tasks.push({ ...task, setup: `${cd}./gradlew assembleDebug`, dev: null });
    }
  }
  return tasks.map((task) => ({
    ...task,
    setup: task.setup && task.path !== "." ? `(${task.setup})` : task.setup,
  }));
}

/** Native graphs use Bash (including Git Bash on Windows), never a synthetic npm workspace. */
export function processNativeGraphCommands(vfs: VirtualFileSystem, config: ProjectConfig) {
  if (hasJavaScriptWorkspaceRoot(config.stackParts)) return;
  const tasks = getGraphProjectTasks(config);
  const services = tasks.filter((task) => task.dev && !task.interactive);
  const setup = tasks.flatMap((task) => (task.setup ? [task.setup] : []));
  vfs.writeFile(
    "scripts/setup.sh",
    `#!/usr/bin/env bash\nset -e\ncd "$(dirname "$0")/.."\n${setup.join("\n")}\n`,
  );
  const commands = services
    .map((task) => task.dev)
    .filter((command): command is string => Boolean(command));
  vfs.writeFile(
    "scripts/dev.sh",
    `#!/usr/bin/env bash
set -m
cd "$(dirname "$0")/.." || exit 1
pids=()
cleanup() {
  trap '' INT TERM
  for pid in "\${pids[@]}"; do kill -TERM -- "-$pid" 2>/dev/null || true; done
  wait 2>/dev/null || true
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM
${commands.map((command) => `bash -c ${quote(command)} &\npids+=("$!")`).join("\n")}
${
  commands.length > 0
    ? `while true; do
  for pid in "\${pids[@]}"; do
    if ! kill -0 "$pid" 2>/dev/null; then
      wait "$pid"
      exit $?
    fi
  done
  sleep 0.2
done`
    : "printf '%s\\n' 'Open your mobile application in its native toolchain. See README.md for commands.'"
}
`,
  );
}
