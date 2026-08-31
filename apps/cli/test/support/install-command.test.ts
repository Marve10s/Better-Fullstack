import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import {
  chmod,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
  detectInstallAgents,
  runInstall,
  type InstallEnvironmentOverrides,
} from "@/commands/system/install-core";

let testDirectory: string;
let homeDirectory: string;
let binaryDirectory: string;
let skillSourceDirectory: string;

async function createExecutable(name: string) {
  const path = join(binaryDirectory, name);
  await writeFile(path, "#!/bin/sh\nexit 0\n");
  await chmod(path, 0o755);
  return path;
}

async function createSkillSources(root = skillSourceDirectory, marker = "") {
  for (const name of ["scaffold-project", "add-to-project"]) {
    const directory = join(root, name);
    await mkdir(directory, { recursive: true });
    await writeFile(
      join(directory, "SKILL.md"),
      `---\nname: ${name}\ndescription: Test skill\n---\n\n# ${name}\n${marker}`,
    );
  }
}

function environment(
  overrides: Partial<InstallEnvironmentOverrides> = {},
): InstallEnvironmentOverrides {
  return {
    homeDir: homeDirectory,
    path: binaryDirectory,
    platform: "linux",
    skillSourceDir: skillSourceDirectory,
    stdinIsTTY: false,
    now: () => new Date("2026-08-31T12:34:56.789Z"),
    runCommand: async () => {},
    ...overrides,
  };
}

async function snapshotDirectory(directory: string, root = directory): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const snapshot: string[] = [];
  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    const path = join(directory, entry.name);
    const relativePath = path.slice(root.length + 1);
    if (entry.isDirectory()) {
      snapshot.push(`directory:${relativePath}`);
      snapshot.push(...(await snapshotDirectory(path, root)));
    } else {
      snapshot.push(`file:${relativePath}:${await readFile(path, "utf8")}`);
    }
  }
  return snapshot;
}

beforeEach(async () => {
  testDirectory = await mkdtemp(join(tmpdir(), "better-fullstack-install-"));
  homeDirectory = join(testDirectory, "home");
  binaryDirectory = join(testDirectory, "bin");
  skillSourceDirectory = join(testDirectory, "skills");
  await mkdir(homeDirectory, { recursive: true });
  await mkdir(binaryDirectory, { recursive: true });
  await createSkillSources();
});

afterEach(async () => {
  await rm(testDirectory, { recursive: true, force: true });
});

describe("bfs install", () => {
  it("detects agent binaries from an injected PATH and editor state from an injected home", async () => {
    const claudePath = await createExecutable("claude");
    await mkdir(join(homeDirectory, ".cursor"));

    const agents = await detectInstallAgents({
      homeDir: homeDirectory,
      path: binaryDirectory,
      platform: "linux",
    });

    expect(agents.find((agent) => agent.id === "claude")).toEqual({
      id: "claude",
      name: "Claude Code",
      detected: true,
      binaryPath: claudePath,
    });
    expect(agents.find((agent) => agent.id === "cursor")?.detected).toBe(true);
    expect(agents.find((agent) => agent.id === "codex")?.detected).toBe(false);
  });

  it("resolves bundled skills from the published dist layout without a repository fallback", async () => {
    const moduleDirectory = join(testDirectory, "published-package", "dist");
    await createSkillSources(join(moduleDirectory, "skills"), "Published bundle marker\n");

    const receipt = await runInstall(
      { only: "skills", agents: ["codex"] },
      environment({ moduleDir: moduleDirectory, skillSourceDir: undefined }),
    );

    expect(receipt.success).toBe(true);
    expect(
      await readFile(
        join(
          homeDirectory,
          ".agents",
          "skills",
          "better-fullstack-scaffold-project",
          "SKILL.md",
        ),
        "utf8",
      ),
    ).toContain("Published bundle marker");
  });

  it("merges JSON without reordering or rewriting unrelated keys", async () => {
    const configPath = join(homeDirectory, ".cursor", "mcp.json");
    const original =
      '{\n\t"alpha": { "token": "do-not-print" },\n\t"mcpServers": {\n\t\t"existing": { "command": "keep" }\n\t},\n\t"omega": [3, 2, 1]\n}\n';
    await mkdir(join(homeDirectory, ".cursor"), { recursive: true });
    await writeFile(configPath, original);

    const receipt = await runInstall({ only: "mcp", agents: ["cursor"] }, environment());
    const updated = await readFile(configPath, "utf8");

    expect(receipt.success).toBe(true);
    expect(updated.slice(0, updated.indexOf('"mcpServers"'))).toBe(
      original.slice(0, original.indexOf('"mcpServers"')),
    );
    expect(updated.slice(updated.indexOf('\t"omega"'))).toBe(
      original.slice(original.indexOf('\t"omega"')),
    );
    expect(updated).toContain('\t\t"existing": { "command": "keep" }');
    expect(JSON.parse(updated)).toMatchObject({
      alpha: { token: "do-not-print" },
      mcpServers: {
        existing: { command: "keep" },
        "better-fullstack": {
          command: "npx",
          args: ["-y", "create-better-fullstack@latest", "mcp"],
        },
      },
      omega: [3, 2, 1],
    });
  });

  it("preserves a commented Zed JSONC config across install and uninstall", async () => {
    const configPath = join(homeDirectory, ".config", "zed", "settings.json");
    const original = `{
  // Keep the user's theme.
  "theme": "One Dark",
  "context_servers": {
    /* Keep this existing server. */
    "existing": {
      "command": "keep",
      "args": [],
    },
  },
}
`;
    await mkdir(join(homeDirectory, ".config", "zed"), { recursive: true });
    await writeFile(configPath, original);

    const installReceipt = await runInstall({ only: "mcp", agents: ["zed"] }, environment());
    const installed = await readFile(configPath, "utf8");

    expect(installReceipt.targets.find((item) => item.id === "mcp:zed")?.status).toBe(
      "installed",
    );
    expect(installed).toContain("// Keep the user's theme.");
    expect(installed).toContain("/* Keep this existing server. */");
    expect(installed).toContain('"better-fullstack"');

    const secondReceipt = await runInstall({ only: "mcp", agents: ["zed"] }, environment());
    expect(secondReceipt.targets.find((item) => item.id === "mcp:zed")?.status).toBe(
      "unchanged",
    );
    expect(await readFile(configPath, "utf8")).toBe(installed);

    const uninstallReceipt = await runInstall(
      { only: "mcp", agents: ["zed"], uninstall: true },
      environment(),
    );
    expect(uninstallReceipt.targets.find((item) => item.id === "mcp:zed")?.status).toBe(
      "uninstalled",
    );
    expect(await readFile(configPath, "utf8")).toBe(original);
  });

  it("keeps using the owned Zed settings path when the preferred macOS path changes", async () => {
    const legacyPath = join(homeDirectory, ".config", "zed", "settings.json");
    const macPath = join(homeDirectory, ".zed", "settings.json");
    const legacyOriginal = '{\n  "theme": "legacy",\n  "context_servers": {}\n}\n';
    const macOriginal = '{\n  "theme": "new-location",\n  "context_servers": {}\n}\n';
    await mkdir(join(homeDirectory, ".config", "zed"), { recursive: true });
    await writeFile(legacyPath, legacyOriginal);
    const macEnvironment = environment({ platform: "darwin" });

    await runInstall({ only: "mcp", agents: ["zed"] }, macEnvironment);
    const installedLegacy = await readFile(legacyPath, "utf8");
    await mkdir(join(homeDirectory, ".zed"), { recursive: true });
    await writeFile(macPath, macOriginal);

    const second = await runInstall({ only: "mcp", agents: ["zed"] }, macEnvironment);
    expect(second.targets.find((target) => target.id === "mcp:zed")).toMatchObject({
      status: "unchanged",
      path: legacyPath,
    });
    expect(await readFile(legacyPath, "utf8")).toBe(installedLegacy);
    expect(await readFile(macPath, "utf8")).toBe(macOriginal);

    const uninstall = await runInstall(
      { only: "mcp", agents: ["zed"], uninstall: true },
      macEnvironment,
    );
    expect(uninstall.targets.find((target) => target.id === "mcp:zed")?.path).toBe(legacyPath);
    expect(await readFile(legacyPath, "utf8")).toBe(legacyOriginal);
    expect(await readFile(macPath, "utf8")).toBe(macOriginal);
  });

  it("creates a timestamped backup before changing an existing config", async () => {
    const configPath = join(homeDirectory, ".config", "opencode", "opencode.json");
    const original = '{\n  "theme": "system"\n}\n';
    await mkdir(join(homeDirectory, ".config", "opencode"), { recursive: true });
    await writeFile(configPath, original);

    const receipt = await runInstall({ only: "mcp", agents: ["opencode"] }, environment());
    const target = receipt.targets.find((item) => item.id === "mcp:opencode");

    expect(target?.backupPath).toBe(
      `${configPath}.better-fullstack-backup-2026-08-31T12-34-56.789Z`,
    );
    expect(await readFile(target?.backupPath ?? "", "utf8")).toBe(original);
  });

  it("keeps a created backup visible when CLI registration fails", async () => {
    await createExecutable("claude");
    const configPath = join(homeDirectory, ".claude.json");
    const original = '{\n  "projects": {}\n}\n';
    await writeFile(configPath, original);

    const receipt = await runInstall(
      { only: "mcp", agents: ["claude"] },
      environment({
        runCommand: async () => {
          throw new Error("registration failed");
        },
      }),
    );
    const target = receipt.targets.find((item) => item.id === "mcp:claude");

    expect(target).toMatchObject({
      status: "failed",
      backupPath: `${configPath}.better-fullstack-backup-2026-08-31T12-34-56.789Z`,
    });
    expect(target?.message).toContain("backup");
    expect(await readFile(target?.backupPath ?? "", "utf8")).toBe(original);
  });

  it("performs no writes or command execution in dry-run mode", async () => {
    const configPath = join(homeDirectory, ".cursor", "mcp.json");
    await mkdir(join(homeDirectory, ".cursor"), { recursive: true });
    await writeFile(configPath, '{\n  "mcpServers": {}\n}\n');
    const before = await snapshotDirectory(homeDirectory);
    let commandRuns = 0;

    const receipt = await runInstall(
      { agents: ["cursor"], dryRun: true },
      environment({
        runCommand: async () => {
          commandRuns += 1;
        },
      }),
    );

    expect(receipt.targets.some((target) => target.status === "planned")).toBe(true);
    expect(commandRuns).toBe(0);
    expect(await snapshotDirectory(homeDirectory)).toEqual(before);
  });

  it("aborts before changing targets when the ownership receipt path is not writable", async () => {
    await createExecutable("claude");
    const configPath = join(homeDirectory, ".claude.json");
    const original = '{\n  "mcpServers": {}\n}\n';
    await writeFile(configPath, original);
    const outsideStateDirectory = join(testDirectory, "outside-state");
    await mkdir(outsideStateDirectory);
    await mkdir(join(homeDirectory, ".config"));
    await symlink(
      outsideStateDirectory,
      join(homeDirectory, ".config", "better-fullstack"),
      "dir",
    );
    let commandRuns = 0;

    const receipt = await runInstall(
      { only: "mcp", agents: ["claude"] },
      environment({
        runCommand: async () => {
          commandRuns += 1;
        },
      }),
    );

    expect(receipt.success).toBe(false);
    expect(receipt.targets).toHaveLength(1);
    expect(receipt.targets[0]).toMatchObject({
      id: "state-preflight",
      status: "failed",
      changed: false,
    });
    expect(receipt.targets[0]?.message).toContain("No targets were changed");
    expect(commandRuns).toBe(0);
    expect(await readFile(configPath, "utf8")).toBe(original);
    expect(await readdir(outsideStateDirectory)).toEqual([]);
  });

  it("fails the overall receipt when ownership cannot be saved after a target changes", async () => {
    await createExecutable("claude");
    const configPath = join(homeDirectory, ".claude.json");
    const original = '{\n  "mcpServers": {}\n}\n';
    await writeFile(configPath, original);
    const stateDirectory = join(homeDirectory, ".config", "better-fullstack");
    const backupPath = `${configPath}.better-fullstack-backup-2026-08-31T12-34-56.789Z`;

    const receipt = await runInstall(
      { only: "mcp", agents: ["claude"] },
      environment({
        runCommand: async () => {
          await rm(stateDirectory, { recursive: true });
          await writeFile(stateDirectory, "block state writes");
        },
      }),
    );
    const stateFailure = receipt.targets.find((target) => target.id === "state-write");

    expect(receipt.success).toBe(false);
    expect(stateFailure).toMatchObject({ status: "failed", changed: false });
    expect(stateFailure?.message).toContain(backupPath);
    expect(await readFile(backupPath, "utf8")).toBe(original);
  });

  it("uses the documented user-scoped CLI commands", async () => {
    const binaries = await Promise.all([
      createExecutable("claude"),
      createExecutable("codex"),
      createExecutable("gemini"),
    ]);
    const commands: Array<{ command: string; args: string[] }> = [];

    const receipt = await runInstall(
      { only: "mcp", agents: ["claude", "codex", "gemini"] },
      environment({
        runCommand: async (command, args) => {
          commands.push({ command, args });
          if (args[1] !== "add") return;
          if (command === binaries[1]) {
            await mkdir(join(homeDirectory, ".codex"), { recursive: true });
            await writeFile(
              join(homeDirectory, ".codex", "config.toml"),
              '[mcp_servers.better-fullstack]\ncommand = "npx"\nargs = ["-y", "create-better-fullstack@latest", "mcp"]\n',
            );
            return;
          }
          const path =
            command === binaries[0]
              ? join(homeDirectory, ".claude.json")
              : join(homeDirectory, ".gemini", "settings.json");
          await mkdir(command === binaries[0] ? homeDirectory : join(homeDirectory, ".gemini"), {
            recursive: true,
          });
          await writeFile(
            path,
            `${JSON.stringify(
              {
                mcpServers: {
                  "better-fullstack": {
                    command: "npx",
                    args: ["-y", "create-better-fullstack@latest", "mcp"],
                  },
                },
              },
              null,
              2,
            )}\n`,
          );
        },
      }),
    );

    expect(receipt.success).toBe(true);
    expect(commands).toEqual([
      {
        command: binaries[0],
        args: [
          "mcp",
          "add",
          "--scope",
          "user",
          "better-fullstack",
          "--",
          "npx",
          "-y",
          "create-better-fullstack@latest",
          "mcp",
        ],
      },
      {
        command: binaries[1],
        args: [
          "mcp",
          "add",
          "better-fullstack",
          "--",
          "npx",
          "-y",
          "create-better-fullstack@latest",
          "mcp",
        ],
      },
      {
        command: binaries[2],
        args: [
          "mcp",
          "add",
          "--scope",
          "user",
          "better-fullstack",
          "npx",
          "-y",
          "create-better-fullstack@latest",
          "mcp",
        ],
      },
    ]);

    const uninstallReceipt = await runInstall(
      { only: "mcp", agents: ["claude", "codex", "gemini"], uninstall: true },
      environment({
        runCommand: async (command, args) => {
          commands.push({ command, args });
        },
      }),
    );

    expect(uninstallReceipt.success).toBe(true);
    expect(commands.slice(3)).toEqual([
      {
        command: binaries[0],
        args: ["mcp", "remove", "--scope", "user", "better-fullstack"],
      },
      {
        command: binaries[1],
        args: ["mcp", "remove", "better-fullstack"],
      },
      {
        command: binaries[2],
        args: ["mcp", "remove", "--scope", "user", "better-fullstack"],
      },
    ]);
  });

  it("re-adds command-backed MCP entries removed after installation", async () => {
    const [claudePath, codexPath, geminiPath] = await Promise.all([
      createExecutable("claude"),
      createExecutable("codex"),
      createExecutable("gemini"),
    ]);
    const configPaths = {
      claude: join(homeDirectory, ".claude.json"),
      codex: join(homeDirectory, ".codex", "config.toml"),
      gemini: join(homeDirectory, ".gemini", "settings.json"),
    };
    const commandRuns: string[] = [];
    const commandEnvironment = environment({
      runCommand: async (command, args) => {
        if (args[1] !== "add") return;
        commandRuns.push(command);
        if (command === codexPath) {
          await mkdir(join(homeDirectory, ".codex"), { recursive: true });
          await writeFile(
            configPaths.codex,
            '[mcp_servers.better-fullstack]\ncommand = "npx"\nargs = ["-y", "create-better-fullstack@latest", "mcp"]\n',
          );
          return;
        }
        const path = command === claudePath ? configPaths.claude : configPaths.gemini;
        await mkdir(command === claudePath ? homeDirectory : join(homeDirectory, ".gemini"), {
          recursive: true,
        });
        await writeFile(
          path,
          `${JSON.stringify(
            {
              mcpServers: {
                "better-fullstack": {
                  command: "npx",
                  args: ["-y", "create-better-fullstack@latest", "mcp"],
                },
              },
            },
            null,
            2,
          )}\n`,
        );
      },
    });

    await runInstall(
      { only: "mcp", agents: ["claude", "codex", "gemini"] },
      commandEnvironment,
    );
    await writeFile(configPaths.claude, '{\n  "mcpServers": {}\n}\n');
    await writeFile(configPaths.codex, 'model = "gpt-5"\n');
    await writeFile(configPaths.gemini, '{\n  "mcpServers": {}\n}\n');

    const second = await runInstall(
      { only: "mcp", agents: ["claude", "codex", "gemini"] },
      commandEnvironment,
    );

    expect(commandRuns).toEqual([
      claudePath,
      codexPath,
      geminiPath,
      claudePath,
      codexPath,
      geminiPath,
    ]);
    for (const id of ["claude", "codex", "gemini"]) {
      expect(second.targets.find((target) => target.id === `mcp:${id}`)).toMatchObject({
        status: "installed",
        changed: true,
      });
      expect(second.targets.find((target) => target.id === `mcp:${id}`)?.message).toContain(
        "re-added",
      );
    }

    const third = await runInstall(
      { only: "mcp", agents: ["claude", "codex", "gemini"] },
      commandEnvironment,
    );
    expect(commandRuns).toHaveLength(6);
    expect(third.targets.every((target) => target.status === "unchanged")).toBe(true);
  });

  it("leaves user-modified command-backed entries untouched", async () => {
    await createExecutable("claude");
    const configPath = join(homeDirectory, ".claude.json");
    const statePath = join(homeDirectory, ".config", "better-fullstack", "install-state.json");
    const commands: string[][] = [];
    const commandEnvironment = environment({
      runCommand: async (_command, args) => {
        commands.push(args);
        if (args[1] !== "add") return;
        await writeFile(
          configPath,
          `${JSON.stringify(
            {
              mcpServers: {
                "better-fullstack": {
                  command: "npx",
                  args: ["-y", "create-better-fullstack@latest", "mcp"],
                },
              },
            },
            null,
            2,
          )}\n`,
        );
      },
    });

    await runInstall({ only: "mcp", agents: ["claude"] }, commandEnvironment);
    const modified = `${JSON.stringify(
      {
        mcpServers: {
          "better-fullstack": {
            command: "custom-mcp",
            args: ["--user-owned"],
          },
        },
      },
      null,
      2,
    )}\n`;
    await writeFile(configPath, modified);

    const reinstall = await runInstall(
      { only: "mcp", agents: ["claude"] },
      commandEnvironment,
    );
    const uninstall = await runInstall(
      { only: "mcp", agents: ["claude"], uninstall: true },
      commandEnvironment,
    );

    expect(reinstall.success).toBe(false);
    expect(uninstall.success).toBe(false);
    expect(reinstall.targets[0]?.message).toContain("modified by the user");
    expect(uninstall.targets[0]?.message).toContain("modified by the user");
    expect(commands).toHaveLength(1);
    expect(await readFile(configPath, "utf8")).toBe(modified);
    expect(await readFile(statePath, "utf8")).toContain('"mcp:claude"');

    await writeFile(configPath, '{\n  "mcpServers": {}\n}\n');
    const missingUninstall = await runInstall(
      { only: "mcp", agents: ["claude"], uninstall: true },
      commandEnvironment,
    );
    expect(missingUninstall.targets.find((target) => target.id === "mcp:claude")).toMatchObject({
      status: "unchanged",
      changed: false,
      message: "entry was already absent; removed stale ownership",
    });
    expect(commands).toHaveLength(1);
    await expect(readFile(statePath, "utf8")).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("restores config bytes and removes only owned skill folders on uninstall", async () => {
    const configPath = join(homeDirectory, ".cursor", "mcp.json");
    const original =
      '{\n  "mcpServers": {\n    "existing": { "command": "keep" }\n  },\n  "other": true\n}\n';
    await mkdir(join(homeDirectory, ".cursor"), { recursive: true });
    await writeFile(configPath, original);

    const installReceipt = await runInstall({ agents: ["cursor"] }, environment());
    const ownedSkill = join(
      homeDirectory,
      ".agents",
      "skills",
      "better-fullstack-scaffold-project",
      "SKILL.md",
    );
    expect(installReceipt.success).toBe(true);
    expect(await readFile(ownedSkill, "utf8")).toContain("name: better-fullstack-scaffold-project");

    const uninstallReceipt = await runInstall(
      { agents: ["cursor"], uninstall: true },
      environment(),
    );

    expect(uninstallReceipt.success).toBe(true);
    expect(await readFile(configPath, "utf8")).toBe(original);
    await expect(readFile(ownedSkill, "utf8")).rejects.toMatchObject({ code: "ENOENT" });
    await expect(
      readFile(join(homeDirectory, ".config", "better-fullstack", "install-state.json"), "utf8"),
    ).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("upgrades unmodified managed skills and leaves user-edited skills alone", async () => {
    await runInstall({ only: "skills", agents: ["codex"] }, environment());
    const managedPath = join(
      homeDirectory,
      ".agents",
      "skills",
      "better-fullstack-scaffold-project",
      "SKILL.md",
    );
    const editedPath = join(
      homeDirectory,
      ".claude",
      "skills",
      "better-fullstack-scaffold-project",
      "SKILL.md",
    );
    const editedContent = `${await readFile(editedPath, "utf8")}User edit\n`;
    await writeFile(editedPath, editedContent);
    await createSkillSources(skillSourceDirectory, "New managed version\n");

    const receipt = await runInstall(
      { only: "skills", agents: ["codex"] },
      environment(),
    );
    const updated = receipt.targets.find(
      (target) => target.id === "skill:agents:scaffold-project",
    );
    const userEdited = receipt.targets.find(
      (target) => target.id === "skill:claude:scaffold-project",
    );

    expect(updated).toMatchObject({ status: "installed", changed: true });
    expect(updated?.message).toContain("updated");
    expect(await readFile(managedPath, "utf8")).toContain("New managed version");
    expect(userEdited).toMatchObject({ status: "failed", changed: false });
    expect(userEdited?.message).toContain("Skill files changed after install");
    expect(await readFile(editedPath, "utf8")).toBe(editedContent);
  });

  it("is idempotent after a successful install", async () => {
    await mkdir(join(homeDirectory, ".cursor"), { recursive: true });
    await writeFile(join(homeDirectory, ".cursor", "mcp.json"), '{\n  "mcpServers": {}\n}\n');
    await runInstall({ agents: ["cursor"] }, environment());
    const before = await snapshotDirectory(homeDirectory);

    const second = await runInstall({ agents: ["cursor"] }, environment());

    expect(second.summary.changed).toBe(0);
    expect(second.summary.failed).toBe(0);
    expect(second.targets.every((target) => target.status === "unchanged")).toBe(true);
    expect(await snapshotDirectory(homeDirectory)).toEqual(before);
  });

  it("returns the stable machine-readable receipt shape used by --json", async () => {
    const receipt = await runInstall(
      { only: "mcp", agents: ["cursor"], dryRun: true },
      environment(),
    );
    const encoded = JSON.parse(JSON.stringify(receipt)) as Record<string, unknown>;

    expect(Object.keys(encoded)).toEqual([
      "schemaVersion",
      "command",
      "action",
      "dryRun",
      "success",
      "selection",
      "targets",
      "summary",
      "tryPrompt",
    ]);
    expect(encoded).toMatchObject({
      schemaVersion: 1,
      command: "install",
      action: "install",
      dryRun: true,
      success: true,
      selection: { only: "mcp", agents: ["cursor"] },
      summary: { requested: 1, changed: 1, unchanged: 0, failed: 0 },
    });
    expect(receipt.targets.find((target) => target.id === "mcp:cursor")).toMatchObject({
      capability: "mcp",
      status: "planned",
      changed: true,
      detected: false,
    });
  });

  it("leaves invalid JSON untouched and reports the target failure", async () => {
    const configPath = join(homeDirectory, ".cursor", "mcp.json");
    const invalid = '{ "mcpServers": ';
    await mkdir(join(homeDirectory, ".cursor"), { recursive: true });
    await writeFile(configPath, invalid);

    const receipt = await runInstall({ only: "mcp", agents: ["cursor"] }, environment());

    expect(receipt.success).toBe(false);
    expect(receipt.summary.failed).toBe(1);
    expect(await readFile(configPath, "utf8")).toBe(invalid);
    expect((await readdir(join(homeDirectory, ".cursor"))).sort()).toEqual(["mcp.json"]);
  });
});
