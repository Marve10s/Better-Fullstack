import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import { addPackageDependency } from "@/dependencies/add-deps";
import { getServerDependencyTarget } from "@/platform/server-dependency-target";

export function processObservabilityDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const { observability } = config;
  if (!observability || observability === "none") return;

  const targetPath = getServerDependencyTarget(vfs, config);
  if (!targetPath) return;

  // Add OpenTelemetry packages
  if (observability === "opentelemetry" || observability === "signoz") {
    addPackageDependency({
      vfs,
      packagePath: targetPath,
      dependencies: [
        "@opentelemetry/api",
        "@opentelemetry/sdk-node",
        "@opentelemetry/auto-instrumentations-node",
        "@opentelemetry/exporter-trace-otlp-http",
        "@opentelemetry/exporter-metrics-otlp-http",
        "@opentelemetry/resources",
        "@opentelemetry/sdk-metrics",
        "@opentelemetry/semantic-conventions",
      ],
    });
  }

  // Add Sentry packages
  if (observability === "sentry") {
    addPackageDependency({
      vfs,
      packagePath: targetPath,
      dependencies: ["@sentry/node", "@sentry/profiling-node"],
    });
  }

  // Add Grafana packages (Prometheus metrics for Grafana dashboards)
  if (observability === "grafana") {
    addPackageDependency({
      vfs,
      packagePath: targetPath,
      dependencies: ["prom-client"],
    });
  }

  if (observability === "datadog") {
    addPackageDependency({
      vfs,
      packagePath: targetPath,
      dependencies: ["dd-trace"],
    });
  }

  if (observability === "axiom") {
    addPackageDependency({
      vfs,
      packagePath: targetPath,
      dependencies: ["@axiomhq/js"],
    });
  }

  if (observability === "betterstack") {
    addPackageDependency({
      vfs,
      packagePath: targetPath,
      dependencies: ["@logtail/node"],
    });
  }
}
