import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import { addPackageDependency, type AvailableDependencies } from "@/dependencies/add-deps";

type PackageJson = {
  scripts?: Record<string, string>;
  engines?: Record<string, string>;
  [key: string]: unknown;
};

export function processJobQueueDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const { jobQueue, backend } = config;

  // Skip if not selected or set to "none"
  if (!jobQueue || jobQueue === "none") return;

  // Skip if no backend to support job queues (convex has its own background jobs)
  if (backend === "none" || backend === "convex") return;

  const packagePath = backend === "self" ? "apps/web/package.json" : "apps/server/package.json";
  if (!vfs.exists(packagePath)) return;

  const deps = getJobQueueDeps(jobQueue);
  if (deps.length > 0) {
    addPackageDependency({ vfs, packagePath, dependencies: deps });
  }
  addJobQueueScripts(vfs, packagePath, config);
  addJobQueueEngines(vfs, packagePath, config);
}

const PG_BOSS_MIN_NODE = ">=22.12.0";

function addJobQueueEngines(vfs: VirtualFileSystem, serverPath: string, config: ProjectConfig) {
  if (config.jobQueue !== "pg-boss") return;
  if (config.runtime !== "node" && config.backend !== "self") return;

  const pkgJson = vfs.readJson<PackageJson>(serverPath);
  if (!pkgJson) return;
  vfs.writeJson(serverPath, {
    ...pkgJson,
    engines: { ...pkgJson.engines, node: PG_BOSS_MIN_NODE },
  });
}

function getJobQueueDeps(jobQueue: ProjectConfig["jobQueue"]): AvailableDependencies[] {
  const deps: AvailableDependencies[] = [];

  switch (jobQueue) {
    case "bullmq":
      deps.push("bullmq");
      break;
    case "trigger-dev":
      deps.push("@trigger.dev/sdk");
      break;
    case "inngest":
      deps.push("inngest");
      break;
    case "temporal":
      deps.push("@temporalio/client");
      deps.push("@temporalio/worker");
      deps.push("@temporalio/workflow");
      deps.push("@temporalio/activity");
      break;
    case "pg-boss":
      deps.push("pg-boss");
      break;
    case "upstash-qstash":
      deps.push("@upstash/qstash");
      break;
    case "hatchet":
      // zod is a required peer of the Hatchet SDK.
      deps.push("@hatchet-dev/typescript-sdk", "zod");
      break;
  }

  return deps;
}

function getScriptRunner(config: ProjectConfig): string | undefined {
  if (config.backend === "self") return config.packageManager === "bun" ? "bun run" : "tsx";
  if (config.runtime === "bun") return "bun run";
  if (config.runtime === "node") return "tsx";
  return undefined;
}

function addJobQueueScripts(vfs: VirtualFileSystem, packagePath: string, config: ProjectConfig) {
  const runner = getScriptRunner(config);
  if (!runner) return;

  const scripts: Record<string, string> = {};
  if (config.jobQueue === "pg-boss" || config.jobQueue === "hatchet") {
    scripts["jobs:worker"] = `${runner} src/jobs/worker.ts`;
    if (config.backend !== "self") {
      // `build` emits the worker next to the server entry, so built images can run it.
      scripts["jobs:worker:start"] =
        config.runtime === "bun" ? "bun run dist/jobs/worker.mjs" : "node dist/jobs/worker.mjs";
    }
    scripts["jobs:enqueue"] = `${runner} src/jobs/enqueue.ts`;
  } else if (config.jobQueue === "upstash-qstash") {
    scripts["jobs:enqueue"] = `${runner} src/jobs/enqueue.ts`;
  } else {
    return;
  }

  if (config.backend === "self" && runner === "tsx") {
    addPackageDependency({ vfs, packagePath, dependencies: ["tsx"] });
  }
  const pkgJson = vfs.readJson<PackageJson>(packagePath);
  if (!pkgJson) return;
  pkgJson.scripts = { ...pkgJson.scripts, ...scripts };
  vfs.writeJson(packagePath, pkgJson);
}
