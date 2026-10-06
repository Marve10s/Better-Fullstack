import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import { addPackageDependency, type AvailableDependencies } from "@/dependencies/add-deps";

type PackageJson = {
  scripts?: Record<string, string>;
  [key: string]: unknown;
};

export function processJobQueueDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const { jobQueue, backend } = config;

  // Skip if not selected or set to "none"
  if (!jobQueue || jobQueue === "none") return;

  // Skip if no backend to support job queues (convex has its own background jobs)
  if (backend === "none" || backend === "convex") return;

  // Add server-side job queue dependencies
  const serverPath = "apps/server/package.json";
  if (vfs.exists(serverPath)) {
    const deps = getJobQueueDeps(jobQueue);
    if (deps.length > 0) {
      addPackageDependency({
        vfs,
        packagePath: serverPath,
        dependencies: deps,
      });
    }
    addJobQueueScripts(vfs, serverPath, config);
  }
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

function addJobQueueScripts(vfs: VirtualFileSystem, serverPath: string, config: ProjectConfig) {
  const runner =
    config.runtime === "bun" ? "bun run" : config.runtime === "node" ? "tsx" : undefined;
  if (!runner) return;

  const scripts: Record<string, string> = {};
  if (config.jobQueue === "pg-boss" || config.jobQueue === "hatchet") {
    scripts["jobs:worker"] = `${runner} src/jobs/worker.ts`;
    // `build` emits the worker next to the server entry, so built images can run it.
    scripts["jobs:worker:start"] =
      config.runtime === "bun" ? "bun run dist/jobs/worker.mjs" : "node dist/jobs/worker.mjs";
    scripts["jobs:enqueue"] = `${runner} src/jobs/enqueue.ts`;
  } else if (config.jobQueue === "upstash-qstash") {
    scripts["jobs:enqueue"] = `${runner} src/jobs/enqueue.ts`;
  } else {
    return;
  }

  const pkgJson = vfs.readJson<PackageJson>(serverPath);
  if (!pkgJson) return;
  pkgJson.scripts = { ...pkgJson.scripts, ...scripts };
  vfs.writeJson(serverPath, pkgJson);
}
