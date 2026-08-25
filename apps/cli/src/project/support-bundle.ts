import type {
  ProjectCheck,
  ProjectStatusFailure,
  ProjectStatusResult,
} from "@/project/project-status";

import { readBtsConfig } from "@/config/bts-config";
import { getCurrentLifecycleVersions } from "@/lifecycle/scaffold-manifest";
import { isRegisteredTelemetryStackPartSelection, legacyProjectConfigToStackParts } from "@/types";

type ProjectInspection = ProjectStatusResult | ProjectStatusFailure;

function diagnosticCode(check: ProjectCheck) {
  if (check.label === "bts.jsonc") return "project_config";
  if (check.label === "Lockfile") return "dependency_lock";
  if (check.label === "node_modules") return "dependency_install";
  if (check.label === "generated verification") return "generated_verification";
  if (check.targetId || check.label.startsWith("generated target ")) return "generated_target";
  if (/\.env(?:\.example)?$/u.test(check.label)) return "environment_contract";
  if (
    /Cargo\.toml|go\.mod|pyproject\.toml|mix\.exs|\.csproj|build\.gradle|pom\.xml/u.test(
      check.label,
    )
  ) {
    return "target_manifest";
  }
  return "project_prerequisite";
}

function redactedDiagnostics(checks: ProjectCheck[]) {
  const counts = new Map<string, { code: string; status: "warn" | "fail"; count: number }>();
  for (const check of checks) {
    if (check.status === "pass") continue;
    const code = diagnosticCode(check);
    const key = `${code}:${check.status}`;
    const current = counts.get(key);
    if (current) current.count += 1;
    else counts.set(key, { code, status: check.status, count: 1 });
  }
  return [...counts.values()].sort((left, right) =>
    `${left.code}:${left.status}`.localeCompare(`${right.code}:${right.status}`),
  );
}

async function selectedParts(projectDir: string) {
  const config = await readBtsConfig(projectDir);
  if (!config) return [];
  const parts =
    config.stackParts === undefined ? legacyProjectConfigToStackParts(config) : config.stackParts;
  return [
    ...new Set(
      parts
        .filter((part) => part.source !== "provided" && part.toolId !== "none")
        .map((part) => `${part.role}:${part.ecosystem}:${part.toolId}`)
        .filter(isRegisteredTelemetryStackPartSelection),
    ),
  ]
    .sort()
    .slice(0, 100);
}

export async function buildSupportBundle(projectDir: string, result: ProjectInspection) {
  const versions = getCurrentLifecycleVersions();
  if (!result.success) {
    return {
      schemaVersion: "1" as const,
      generatedAt: new Date().toISOString(),
      product: {
        ...versions,
        node: process.versions.node,
        bun: process.versions.bun ?? "unknown",
        platform: process.platform,
        arch: process.arch,
      },
      project: {
        detected: false,
        status: "unavailable" as const,
        diagnosticCode: "project_config_unavailable" as const,
      },
      redaction: {
        excludes: [
          "project names and paths",
          "filenames and raw errors",
          "source code and generated content",
          "prompts and prose",
          "environment values and secrets",
          "repository remotes and URLs",
          "Stack Part settings and owner labels",
        ],
      },
    };
  }

  return {
    schemaVersion: "1" as const,
    generatedAt: new Date().toISOString(),
    product: {
      ...versions,
      node: process.versions.node,
      bun: process.versions.bun ?? "unknown",
      platform: process.platform,
      arch: process.arch,
    },
    project: {
      detected: true,
      status: result.ok ? ("pass" as const) : ("fail" as const),
      ecosystem: result.ecosystem,
      selectedParts: await selectedParts(projectDir),
      summary: result.summary,
      verification: result.verification,
      lifecycle: {
        manifestState: result.prerequisites.manifest.state,
        manifestVersion: result.prerequisites.manifest.version,
        currentContractSupported: result.prerequisites.manifest.currentContractSupported,
        configVersion: result.prerequisites.config.version,
        currentConfigVersion: result.prerequisites.config.currentVersion,
        exactCurrentConfigVersion: result.prerequisites.config.exactCurrentVersion,
        generatorProvenance: result.prerequisites.wave1.generatorProvenance,
        recovery: result.prerequisites.wave1.recovery,
      },
      diagnostics: redactedDiagnostics(result.checks),
    },
    redaction: {
      excludes: [
        "project names and paths",
        "filenames and raw errors",
        "source code and generated content",
        "prompts and prose",
        "environment values and secrets",
        "repository remotes and URLs",
        "Stack Part settings and owner labels",
      ],
    },
  };
}
