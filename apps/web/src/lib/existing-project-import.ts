import {
  BetterTStackConfigSchema,
  createCliDefaultProjectConfigBase,
  evaluateUpdateSupport,
  formatStackPartSpec,
  getToolingCapability,
  legacyProjectConfigToStackParts,
  normalizeStackSelection,
  projectStackPartSettingsToProjectConfig,
  stackPartsToLegacyProjectConfigPartial,
  validateStackParts,
  type BetterTStackConfig,
  type StackPart,
  type UpdateSupportEligibility,
} from "@better-fullstack/types";
import * as JSONC from "jsonc-parser";

import { DEFAULT_STACK, type StackState } from "@/lib/stack-defaults";

export type ProjectImportDiagnostic = {
  severity: "info" | "warning" | "error";
  code: string;
  message: string;
};

export type ImportedProjectConfig = {
  success: true;
  config: BetterTStackConfig;
  stackParts: StackPart[];
  stack: StackState;
  diagnostics: ProjectImportDiagnostic[];
  updateSupport: UpdateSupportEligibility;
};

export type ProjectImportFailure = {
  success: false;
  diagnostics: ProjectImportDiagnostic[];
};

export type ProjectImportResult = ImportedProjectConfig | ProjectImportFailure;

type ImportOptions = {
  targetVersion: string;
  projectName?: string;
};

const NATIVE_FRONTENDS = new Set(["native-bare", "native-uniwind", "native-unistyles"]);
const CODE_QUALITY_CATEGORIES = new Set(["codeQuality", "gitHooks", "staticAnalysis"]);

export function resolveImportedProjectName(
  fileName: string,
  currentProjectName: string | null | undefined,
): string {
  const fileStem = fileName.replace(/\.jsonc?$/i, "").trim();
  if (fileStem && fileStem.toLowerCase() !== "bts") return fileStem;
  return currentProjectName?.trim() || "imported-project";
}

function parseDiagnostic(content: string, error: JSONC.ParseError): ProjectImportDiagnostic {
  const location = JSONC.getLocation(content, error.offset);
  const line = content.slice(0, error.offset).split(/\r?\n/).length;
  return {
    severity: "error",
    code: `JSONC_${JSONC.printParseErrorCode(error.error)}`,
    message: `Line ${line}, ${location.path.length > 0 ? location.path.join(".") : "root"}: ${JSONC.printParseErrorCode(error.error)}.`,
  };
}

function cloneDefaultStack(): StackState {
  return Object.fromEntries(
    Object.entries(DEFAULT_STACK).map(([key, value]) => [
      key,
      Array.isArray(value) ? [...value] : value,
    ]),
  ) as unknown as StackState;
}

function copyMatchingConfigFields(config: BetterTStackConfig, stack: StackState): void {
  const source = config as unknown as Record<string, unknown>;
  const target = stack as unknown as Record<string, unknown>;
  for (const [key, defaultValue] of Object.entries(DEFAULT_STACK)) {
    const value = source[key];
    if (value === undefined) continue;
    if (Array.isArray(defaultValue) && Array.isArray(value)) {
      target[key] = [...value];
      continue;
    }
    if (!Array.isArray(defaultValue) && typeof value === typeof defaultValue) {
      target[key] = value;
    }
  }
}

function projectConfigToStackState(
  config: BetterTStackConfig,
  parts: readonly StackPart[],
  projectName: string,
): StackState {
  const stack = cloneDefaultStack();
  copyMatchingConfigFields(config, stack);

  const frontends = config.frontend.filter((value) => value !== "none");
  const webFrontends = frontends.filter((value) => !NATIVE_FRONTENDS.has(value));
  const nativeFrontends = frontends.filter((value) => NATIVE_FRONTENDS.has(value));
  stack.webFrontend = webFrontends.length > 0 ? webFrontends : ["none"];
  stack.nativeFrontend = nativeFrontends.length > 0 ? nativeFrontends : ["none"];
  stack.aiSdk = config.ai;
  stack.backendLibraries = config.effect;
  stack.projectName = projectName;

  const codeQuality: string[] = [];
  const documentation: string[] = [];
  const appPlatforms: string[] = [];
  for (const toolId of config.addons) {
    const category = getToolingCapability(toolId)?.category;
    if (category === "documentation") documentation.push(toolId);
    else if (category && CODE_QUALITY_CATEGORIES.has(category)) codeQuality.push(toolId);
    else appPlatforms.push(toolId);
  }
  stack.codeQuality = [...new Set(codeQuality)];
  stack.documentation = [...new Set(documentation)];
  stack.appPlatforms = [...new Set(appPlatforms)];

  if (config.stackParts && config.stackParts.length > 0) {
    stack.stackMode = "multi";
    stack.stackPartSpecs = parts
      .filter((part) => part.source !== "provided" && part.toolId !== "none")
      .map((part) => formatStackPartSpec(part, parts));
  } else {
    stack.stackMode = "solo";
    stack.stackPartSpecs = [];
  }

  return normalizeStackSelection(stack);
}

function normalizeAuthoritativeGraph(
  config: BetterTStackConfig,
  diagnostics: ProjectImportDiagnostic[],
): { config: BetterTStackConfig; parts: StackPart[] } | null {
  const parts = config.stackParts ?? legacyProjectConfigToStackParts(config);
  const validation = validateStackParts(parts);
  if (validation.issues.length > 0) {
    diagnostics.push(
      ...validation.issues.map((issue) => ({
        severity: "error" as const,
        code: issue.code,
        message: issue.message,
      })),
    );
    return null;
  }

  if (!config.stackParts) {
    diagnostics.push({
      severity: "warning",
      code: "LEGACY_GRAPH_INFERRED",
      message:
        "This config predates the authoritative Stack Graph. The browser inferred ownership from its flat fields, so review the comparison before copying a command.",
    });
    return { config, parts };
  }

  const projection = stackPartsToLegacyProjectConfigPartial(parts);
  const settings = projectStackPartSettingsToProjectConfig(parts, { includeDefaults: true });
  const projectedKeys = new Set([...Object.keys(projection), ...Object.keys(settings)]);
  projectedKeys.delete("stackParts");
  const staleKeys = [...projectedKeys]
    .filter(
      (key) =>
        JSON.stringify((config as unknown as Record<string, unknown>)[key]) !==
        JSON.stringify(
          (settings as unknown as Record<string, unknown>)[key] ??
            (projection as unknown as Record<string, unknown>)[key],
        ),
    )
    .sort();
  const hasCachedGraphViews =
    config.graphSummary !== undefined || config.effectiveStack !== undefined;
  const canonical = BetterTStackConfigSchema.safeParse({
    ...config,
    ...projection,
    ...settings,
    stackParts: parts,
    graphSummary: undefined,
    effectiveStack: undefined,
  });
  if (!canonical.success) {
    diagnostics.push(
      ...canonical.error.issues.map((issue) => ({
        severity: "error" as const,
        code: "GRAPH_PROJECTION_INVALID",
        message: `${issue.path.join(".") || "config"}: ${issue.message}`,
      })),
    );
    return null;
  }
  if (staleKeys.length > 0 || hasCachedGraphViews) {
    diagnostics.push({
      severity: "warning",
      code: "GRAPH_CACHE_IGNORED",
      message: `The authoritative stackParts graph replaced cached projections${staleKeys.length > 0 ? ` for: ${staleKeys.join(", ")}` : ""}.`,
    });
  }
  return { config: canonical.data, parts };
}

export function parseImportedBtsConfigText(
  content: string,
  options: ImportOptions,
): ProjectImportResult {
  const parseErrors: JSONC.ParseError[] = [];
  const raw = JSONC.parse(content, parseErrors, {
    allowTrailingComma: true,
    disallowComments: false,
  });
  if (parseErrors.length > 0) {
    return {
      success: false,
      diagnostics: parseErrors.map((error) => parseDiagnostic(content, error)),
    };
  }
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return {
      success: false,
      diagnostics: [
        {
          severity: "error",
          code: "CONFIG_OBJECT_REQUIRED",
          message: "bts.jsonc must contain one object at its root.",
        },
      ],
    };
  }

  const rawObject = raw as Record<string, unknown>;
  const candidate = BetterTStackConfigSchema.safeParse({
    ...createCliDefaultProjectConfigBase(),
    version: rawObject.version,
    createdAt: rawObject.createdAt,
    ...rawObject,
  });
  if (!candidate.success) {
    return {
      success: false,
      diagnostics: candidate.error.issues.map((issue) => ({
        severity: "error",
        code: "CONFIG_SCHEMA_INVALID",
        message: `${issue.path.join(".") || "config"}: ${issue.message}`,
      })),
    };
  }

  const diagnostics: ProjectImportDiagnostic[] = [
    {
      severity: "info",
      code: "LOCAL_BROWSER_READ",
      message: "The file was parsed in this browser tab. Better Fullstack did not upload it.",
    },
  ];
  const normalized = normalizeAuthoritativeGraph(candidate.data, diagnostics);
  if (!normalized) return { success: false, diagnostics };

  diagnostics.push({
    severity: "info",
    code: "STACK_GRAPH_VALID",
    message: `Validated ${normalized.parts.length} Stack Graph part${normalized.parts.length === 1 ? "" : "s"} with no ownership errors.`,
  });
  const projectName = options.projectName?.trim() || "imported-project";
  return {
    success: true,
    config: normalized.config,
    stackParts: normalized.parts,
    stack: projectConfigToStackState(normalized.config, normalized.parts, projectName),
    diagnostics,
    updateSupport: evaluateUpdateSupport({
      sourceVersion: normalized.config.version,
      targetVersion: options.targetVersion,
      manifestVersion: null,
      provenanceVerified: false,
    }),
  };
}
