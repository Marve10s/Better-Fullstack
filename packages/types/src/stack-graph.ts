import type {
  Ecosystem,
  ProjectConfig,
  StackPart,
  StackPartEcosystem,
  StackPartRole,
  StackPartSource,
} from "./types";

import {
  API_VALUES,
  AUTH_VALUES,
  BACKEND_VALUES,
  DATABASE_VALUES,
  ELIXIR_API_VALUES,
  ELIXIR_AUTH_VALUES,
  ELIXIR_CACHING_VALUES,
  ELIXIR_DEPLOY_VALUES,
  ELIXIR_EMAIL_VALUES,
  ELIXIR_JOBS_VALUES,
  ELIXIR_OBSERVABILITY_VALUES,
  ELIXIR_ORM_VALUES,
  ELIXIR_REALTIME_VALUES,
  ELIXIR_TESTING_VALUES,
  ELIXIR_VALIDATION_VALUES,
  ELIXIR_WEB_FRAMEWORK_VALUES,
  FRONTEND_VALUES,
  GO_API_VALUES,
  GO_AUTH_VALUES,
  GO_ORM_VALUES,
  GO_WEB_FRAMEWORK_VALUES,
  JAVA_AUTH_VALUES,
  JAVA_ORM_VALUES,
  JAVA_WEB_FRAMEWORK_VALUES,
  ORM_VALUES,
  PYTHON_API_VALUES,
  PYTHON_AUTH_VALUES,
  PYTHON_GRAPHQL_VALUES,
  PYTHON_ORM_VALUES,
  PYTHON_TASK_QUEUE_VALUES,
  PYTHON_VALIDATION_VALUES,
  PYTHON_WEB_FRAMEWORK_VALUES,
  RUST_API_VALUES,
  RUST_AUTH_VALUES,
  RUST_CACHING_VALUES,
  RUST_FRONTEND_VALUES,
  RUST_ORM_VALUES,
  RUST_WEB_FRAMEWORK_VALUES,
  StackPartRoleSchema,
} from "./schemas";

export type StackPrimaryRole = Extract<
  StackPartRole,
  "frontend" | "backend" | "mobile" | "database"
>;

export type ProvidedCapabilityDefinition = {
  role: StackPartRole;
  toolId: string;
  ecosystem?: StackPartEcosystem;
  overrideable?: boolean;
};

export type ToolDefinition = {
  toolId: string;
  label?: string;
  roles: readonly StackPartRole[];
  ecosystems: readonly StackPartEcosystem[];
  legacyCategory?: keyof ProjectConfig;
  selectable?: boolean;
  provides?: readonly ProvidedCapabilityDefinition[];
};

export type StackPartOptionContext = {
  role: StackPartRole;
  ecosystem?: StackPartEcosystem;
  ownerRole?: StackPrimaryRole;
  ownerToolId?: string;
  ownerEcosystem?: StackPartEcosystem;
  siblingToolIdsByRole?: Partial<Record<StackPartRole, string | undefined>>;
  primaryToolIdsByRole?: Partial<Record<StackPrimaryRole, string | undefined>>;
};

export type StackGraphIssue = {
  code: string;
  message: string;
  partId?: string;
  role?: StackPartRole;
  toolId?: string;
};

export type StackGraphValidationResult = {
  issues: StackGraphIssue[];
};

export type StackGraphDiagnostic = {
  code: string;
  message: string;
  path?: string;
};

const PRIMARY_ROLES = new Set<StackPartRole>(["frontend", "backend", "mobile", "database"]);
const NATIVE_FRONTENDS = new Set(["native-bare", "native-uniwind", "native-unistyles"]);
const WEB_FRONTENDS = FRONTEND_VALUES.filter(
  (value) => value !== "none" && !NATIVE_FRONTENDS.has(value),
);
const DJANGO_API_TOOLS = new Set(["django-rest-framework", "django-ninja"]);
const JAVA_SPRING_CAPABILITY_TOOLS = new Set(["spring-data-jpa", "spring-security"]);
const TYPESCRIPT_TRPC_INCOMPATIBLE_FRONTENDS = new Set([
  "nuxt",
  "svelte",
  "solid",
  "solid-start",
]);
const BETTER_AUTH_UNSUPPORTED_ORM_TOOLS = new Set(["typeorm", "mikroorm", "sequelize"]);
const ELIXIR_ECTO_REQUIRED_TOOLS = new Set(["absinthe", "phx-gen-auth"]);
const ELIXIR_ECTO_SQL_REQUIRED_TOOLS = new Set(["oban"]);
const ELIXIR_UNSUPPORTED_GRAPH_TOOLS = new Set([
  "ecto",
  "ueberauth",
  "guardian",
  "nimble-options",
  "nebulex",
  "opentelemetry",
  "prom_ex",
  "mox",
  "bypass",
  "wallaby",
  "fly",
  "gigalixir",
]);

const ROLE_TARGET_PATHS: Record<StackPrimaryRole, string> = {
  frontend: "apps/web",
  backend: "apps/server",
  mobile: "apps/native",
  database: "packages/database",
};

function defineTools(
  values: readonly string[],
  role: StackPartRole,
  ecosystem: StackPartEcosystem,
  legacyCategory?: keyof ProjectConfig,
): ToolDefinition[] {
  return values
    .filter((toolId) => toolId !== "none")
    .map((toolId) => ({
      toolId,
      roles: [role],
      ecosystems: [ecosystem],
      legacyCategory,
    }));
}

export const STACK_TOOL_DEFINITIONS: readonly ToolDefinition[] = [
  ...defineTools(WEB_FRONTENDS, "frontend", "typescript", "frontend"),
  ...defineTools([...NATIVE_FRONTENDS], "mobile", "react-native", "frontend"),
  ...defineTools(
    BACKEND_VALUES.filter((value) => value !== "convex"),
    "backend",
    "typescript",
    "backend",
  ),
  ...defineTools(DATABASE_VALUES, "database", "universal", "database"),
  ...defineTools(DATABASE_VALUES, "database", "typescript", "database"),
  ...defineTools(ORM_VALUES, "orm", "typescript", "orm"),
  ...defineTools(API_VALUES, "api", "typescript", "api"),
  ...defineTools(AUTH_VALUES, "auth", "typescript", "auth"),
  ...defineTools(AUTH_VALUES, "auth", "react-native", "auth"),
  ...defineTools(RUST_WEB_FRAMEWORK_VALUES, "backend", "rust", "rustWebFramework"),
  ...defineTools(RUST_FRONTEND_VALUES, "frontend", "rust", "rustFrontend"),
  ...defineTools(RUST_ORM_VALUES, "orm", "rust", "rustOrm"),
  ...defineTools(RUST_API_VALUES, "api", "rust", "rustApi"),
  ...defineTools(RUST_AUTH_VALUES, "auth", "rust", "rustAuth"),
  ...defineTools(RUST_CACHING_VALUES, "caching", "rust", "rustCaching"),
  ...defineTools(PYTHON_WEB_FRAMEWORK_VALUES, "backend", "python", "pythonWebFramework"),
  ...defineTools(PYTHON_ORM_VALUES, "orm", "python", "pythonOrm"),
  ...defineTools(PYTHON_VALIDATION_VALUES, "validation", "python", "pythonValidation"),
  ...defineTools(PYTHON_API_VALUES, "api", "python", "pythonApi"),
  ...defineTools(PYTHON_AUTH_VALUES, "auth", "python", "pythonAuth"),
  ...defineTools(PYTHON_TASK_QUEUE_VALUES, "jobQueue", "python", "pythonTaskQueue"),
  ...defineTools(PYTHON_GRAPHQL_VALUES, "api", "python", "pythonGraphql"),
  ...defineTools(GO_WEB_FRAMEWORK_VALUES, "backend", "go", "goWebFramework"),
  ...defineTools(GO_ORM_VALUES, "orm", "go", "goOrm"),
  ...defineTools(GO_API_VALUES, "api", "go", "goApi"),
  ...defineTools(GO_AUTH_VALUES, "auth", "go", "goAuth"),
  ...defineTools(JAVA_WEB_FRAMEWORK_VALUES, "backend", "java", "javaWebFramework"),
  ...defineTools(JAVA_ORM_VALUES, "orm", "java", "javaOrm"),
  ...defineTools(JAVA_AUTH_VALUES, "auth", "java", "javaAuth"),
  ...defineTools(ELIXIR_WEB_FRAMEWORK_VALUES, "backend", "elixir", "elixirWebFramework"),
  ...defineTools(ELIXIR_ORM_VALUES, "orm", "elixir", "elixirOrm"),
  ...defineTools(ELIXIR_AUTH_VALUES, "auth", "elixir", "elixirAuth"),
  ...defineTools(ELIXIR_API_VALUES, "api", "elixir", "elixirApi"),
  ...defineTools(ELIXIR_REALTIME_VALUES, "api", "elixir", "elixirRealtime"),
  ...defineTools(ELIXIR_JOBS_VALUES, "jobQueue", "elixir", "elixirJobs"),
  ...defineTools(ELIXIR_VALIDATION_VALUES, "validation", "elixir", "elixirValidation"),
  ...defineTools(ELIXIR_EMAIL_VALUES, "email", "elixir", "elixirEmail"),
  ...defineTools(ELIXIR_CACHING_VALUES, "caching", "elixir", "elixirCaching"),
  ...defineTools(ELIXIR_OBSERVABILITY_VALUES, "observability", "elixir", "elixirObservability"),
  ...defineTools(ELIXIR_TESTING_VALUES, "testing", "elixir", "elixirTesting"),
  ...defineTools(ELIXIR_DEPLOY_VALUES, "deploy", "elixir", "elixirDeploy"),
  {
    toolId: "convex",
    roles: ["backend"],
    ecosystems: ["typescript"],
    legacyCategory: "backend",
    provides: [
      { role: "database", toolId: "convex", ecosystem: "typescript", overrideable: false },
      { role: "api", toolId: "convex", ecosystem: "typescript", overrideable: false },
    ],
  },
  {
    toolId: "convex",
    roles: ["database", "api"],
    ecosystems: ["typescript"],
    selectable: false,
  },
];

function sanitizePartId(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9:._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getRoleTargetPath(role: StackPartRole): string | undefined {
  return PRIMARY_ROLES.has(role) ? ROLE_TARGET_PATHS[role as StackPrimaryRole] : undefined;
}

export function createStackPart(input: {
  role: StackPartRole;
  toolId: string;
  ecosystem: StackPartEcosystem;
  ownerPartId?: string;
  source?: StackPartSource;
  providedByPartId?: string;
  id?: string;
  targetPath?: string;
  settings?: Record<string, unknown>;
}): StackPart {
  const roleKey = input.ownerPartId ? `${input.ownerPartId}.${input.role}` : input.role;
  return {
    id: input.id ?? sanitizePartId(`${roleKey}:${input.ecosystem}:${input.toolId}`),
    role: input.role,
    toolId: input.toolId,
    ecosystem: input.ecosystem,
    ownerPartId: input.ownerPartId,
    source: input.source ?? "selected",
    providedByPartId: input.providedByPartId,
    targetPath: input.targetPath ?? getRoleTargetPath(input.role),
    settings: input.settings,
  };
}

function isNoneTool(toolId: string | undefined) {
  return !toolId || toolId === "none";
}

function allowsCrossEcosystemOwner(
  part: Pick<StackPart, "role" | "ecosystem">,
  context: StackPartOptionContext,
) {
  if (part.ecosystem === "universal") return true;
  if (
    part.role === "auth" &&
    context.ownerRole === "mobile" &&
    part.ecosystem === "react-native"
  ) {
    return true;
  }
  return false;
}

function createStackGraphIssue(input: {
  code: string;
  message: string;
  partId?: string;
  role: StackPartRole;
  toolId: string;
}): StackGraphIssue {
  return {
    code: input.code,
    message: input.message,
    partId: input.partId,
    role: input.role,
    toolId: input.toolId,
  };
}

function getStackPartCompatibilityIssue(
  part: Pick<StackPart, "id" | "role" | "toolId" | "ecosystem">,
  context: StackPartOptionContext,
): StackGraphIssue | undefined {
  if (
    context.ownerEcosystem &&
    part.ecosystem !== context.ownerEcosystem &&
    !allowsCrossEcosystemOwner(part, context)
  ) {
    return createStackGraphIssue({
      code: "INCOMPATIBLE_OWNER_ECOSYSTEM",
      partId: part.id,
      role: part.role,
      toolId: part.toolId,
      message: `'${part.toolId}' uses the ${part.ecosystem} adapter but its owner uses ${context.ownerEcosystem}.`,
    });
  }

  if (part.ecosystem === "python" && part.role === "api" && DJANGO_API_TOOLS.has(part.toolId)) {
    if (context.ownerToolId !== "django") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_OWNER_TOOL",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: `'${part.toolId}' can only be selected for a Django backend.`,
      });
    }
  }

  if (
    part.ecosystem === "java" &&
    (part.role === "orm" || part.role === "auth") &&
    JAVA_SPRING_CAPABILITY_TOOLS.has(part.toolId)
  ) {
    if (context.ownerToolId !== "spring-boot") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_OWNER_TOOL",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: `'${part.toolId}' can only be selected for a Spring Boot backend.`,
      });
    }
  }

  if (part.ecosystem === "typescript" && part.role === "api" && part.toolId === "trpc") {
    const frontendTool = context.primaryToolIdsByRole?.frontend;
    if (frontendTool && TYPESCRIPT_TRPC_INCOMPATIBLE_FRONTENDS.has(frontendTool)) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: `'trpc' cannot be selected with the '${frontendTool}' frontend.`,
      });
    }
  }

  if (part.ecosystem === "typescript" && part.role === "auth" && part.toolId === "better-auth") {
    const databaseTool = context.primaryToolIdsByRole?.database;
    if (databaseTool === "redis") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "'better-auth' cannot use Redis as the primary database.",
      });
    }

    const ormTool = context.siblingToolIdsByRole?.orm;
    if (ormTool && BETTER_AUTH_UNSUPPORTED_ORM_TOOLS.has(ormTool)) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: `'better-auth' is not compatible with the '${ormTool}' ORM selection.`,
      });
    }
  }

  if (
    part.ecosystem === "elixir" &&
    ELIXIR_ECTO_REQUIRED_TOOLS.has(part.toolId) &&
    (part.role === "api" || part.role === "auth")
  ) {
    const ormTool = context.siblingToolIdsByRole?.orm;
    if (isNoneTool(ormTool)) {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: `'${part.toolId}' requires an Ecto database layer.`,
      });
    }
  }

  if (part.ecosystem === "elixir" && ELIXIR_ECTO_SQL_REQUIRED_TOOLS.has(part.toolId)) {
    const ormTool = context.siblingToolIdsByRole?.orm;
    if (ormTool !== "ecto-sql") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_GRAPH_SELECTION",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: `'${part.toolId}' requires the Ecto SQL database layer.`,
      });
    }
  }

  if (part.ecosystem === "elixir" && part.toolId === "live-view-streams") {
    if (context.ownerToolId !== "phoenix-live-view") {
      return createStackGraphIssue({
        code: "INCOMPATIBLE_OWNER_TOOL",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: "'live-view-streams' can only be selected for a Phoenix LiveView backend.",
      });
    }
  }

  if (part.ecosystem === "elixir" && ELIXIR_UNSUPPORTED_GRAPH_TOOLS.has(part.toolId)) {
    return createStackGraphIssue({
      code: "UNSUPPORTED_GRAPH_TOOL",
      partId: part.id,
      role: part.role,
      toolId: part.toolId,
      message: `'${part.toolId}' is not generated by the current Elixir scaffold.`,
    });
  }

  return undefined;
}

export function getStackToolDefinitions(context?: StackPartOptionContext): ToolDefinition[] {
  if (!context) return [...STACK_TOOL_DEFINITIONS];
  return STACK_TOOL_DEFINITIONS.filter((definition) => {
    if (!definition.roles.includes(context.role)) return false;
    if (context.ecosystem && !definition.ecosystems.includes(context.ecosystem)) return false;
    if (definition.selectable === false) return false;
    const ecosystem = context.ecosystem ?? definition.ecosystems[0];
    if (
      getStackPartCompatibilityIssue(
        {
          id: `${context.ownerRole ?? "root"}:${context.role}:${definition.toolId}`,
          role: context.role,
          toolId: definition.toolId,
          ecosystem,
        },
        context,
      )
    ) {
      return false;
    }
    return true;
  });
}

export function getStackPartOptions(context: StackPartOptionContext): string[] {
  return [...new Set(getStackToolDefinitions(context).map((definition) => definition.toolId))];
}

function findDefinition(part: Pick<StackPart, "role" | "toolId" | "ecosystem">) {
  return STACK_TOOL_DEFINITIONS.find(
    (definition) =>
      definition.toolId === part.toolId &&
      definition.roles.includes(part.role) &&
      definition.ecosystems.includes(part.ecosystem),
  );
}

function parseRolePath(rolePath: string): { role: StackPartRole; ownerRole?: StackPrimaryRole } {
  const segments = rolePath.split(".");
  const rawRole = segments.length === 1 ? segments[0] : segments[segments.length - 1];
  const rawOwnerRole = segments.length > 1 ? segments[0] : undefined;
  const role = StackPartRoleSchema.parse(rawRole);
  const ownerRole = rawOwnerRole ? StackPartRoleSchema.parse(rawOwnerRole) : undefined;

  if (ownerRole && !PRIMARY_ROLES.has(ownerRole)) {
    throw new Error(`Stack part owner role '${ownerRole}' must be a primary role.`);
  }

  return { role, ownerRole: ownerRole as StackPrimaryRole | undefined };
}

export function parseStackPartSpecs(
  specs: readonly string[],
  source: StackPartSource = "selected",
): StackPart[] {
  const unresolved = specs.map((spec) => {
    const [rolePath, ecosystem, toolId, customId] = spec.split(":");
    if (!rolePath || !ecosystem || !toolId || spec.split(":").length > 4) {
      throw new Error(
        `Invalid --part '${spec}'. Use role:ecosystem:tool or owner.role:ecosystem:tool.`,
      );
    }
    const { role, ownerRole } = parseRolePath(rolePath);
    return {
      role,
      ownerRole,
      ecosystem: ecosystem as StackPartEcosystem,
      toolId,
      customId,
    };
  });

  const primaryParts = unresolved
    .filter((part) => !part.ownerRole)
    .map((part) =>
      createStackPart({
        role: part.role,
        ecosystem: part.ecosystem,
        toolId: part.toolId,
        source,
        id: part.customId,
      }),
    );

  const primaryByRole = new Map(primaryParts.map((part) => [part.role, part]));
  const scopedParts = unresolved
    .filter(
      (part): part is typeof part & { ownerRole: StackPrimaryRole } =>
        part.ownerRole !== undefined,
    )
    .map((part) =>
      createStackPart({
        role: part.role,
        ecosystem: part.ecosystem,
        toolId: part.toolId,
        ownerPartId: primaryByRole.get(part.ownerRole)?.id,
        source,
        id: part.customId,
      }),
    );

  return materializeProvidedStackParts([...primaryParts, ...scopedParts]);
}

export function formatStackPartSpec(part: StackPart, parts: readonly StackPart[] = []): string {
  const owner = part.ownerPartId
    ? parts.find((candidate) => candidate.id === part.ownerPartId)
    : undefined;
  const rolePath = owner ? `${owner.role}.${part.role}` : part.role;
  return `${rolePath}:${part.ecosystem}:${part.toolId}`;
}

export function materializeProvidedStackParts(parts: readonly StackPart[]): StackPart[] {
  const next = [...parts];

  for (const part of parts) {
    const definition = findDefinition(part);
    for (const provided of definition?.provides ?? []) {
      next.push(
        createStackPart({
          role: provided.role,
          toolId: provided.toolId,
          ecosystem: provided.ecosystem ?? part.ecosystem,
          ownerPartId: part.id,
          source: "provided",
          providedByPartId: part.id,
        }),
      );
    }
  }

  return next;
}

function getPrimaryPart(parts: readonly StackPart[], role: StackPrimaryRole) {
  return parts.find((part) => part.role === role && !part.ownerPartId);
}

function addLegacyPart(
  parts: StackPart[],
  role: StackPartRole,
  ecosystem: StackPartEcosystem,
  toolId: string | undefined,
  source: StackPartSource,
  ownerPartId?: string,
) {
  if (!toolId || toolId === "none") return undefined;
  const part = createStackPart({ role, ecosystem, toolId, source, ownerPartId });
  parts.push(part);
  return part;
}

export function legacyProjectConfigToStackParts(
  config: Partial<ProjectConfig>,
  source: StackPartSource = "legacy",
): StackPart[] {
  const parts: StackPart[] = [];
  const frontends = config.frontend ?? [];
  const webFrontends = frontends.filter(
    (frontend) => frontend !== "none" && !NATIVE_FRONTENDS.has(frontend),
  );
  const nativeFrontends = frontends.filter((frontend) => NATIVE_FRONTENDS.has(frontend));

  if (webFrontends.length > 1) {
    throw new Error("Multiple primary web frontends are not supported in the stack graph.");
  }
  if (nativeFrontends.length > 1) {
    throw new Error("Multiple primary mobile frontends are not supported in the stack graph.");
  }

  const webFrontend = webFrontends[0];
  const nativeFrontend = nativeFrontends[0];
  const frontendPart = addLegacyPart(parts, "frontend", "typescript", webFrontend, source);
  addLegacyPart(parts, "mobile", "react-native", nativeFrontend, source);

  let backendPart: StackPart | undefined;
  if (
    (config.ecosystem === undefined || config.ecosystem === "typescript") &&
    config.backend &&
    config.backend !== "none"
  ) {
    backendPart = addLegacyPart(parts, "backend", "typescript", config.backend, source);
  }

  if (
    config.ecosystem === "rust" &&
    config.rustWebFramework &&
    config.rustWebFramework !== "none"
  ) {
    backendPart = addLegacyPart(parts, "backend", "rust", config.rustWebFramework, source);
  }
  if (config.ecosystem === "rust" && config.rustFrontend && config.rustFrontend !== "none") {
    addLegacyPart(parts, "frontend", "rust", config.rustFrontend, source);
  }
  if (
    config.ecosystem === "python" &&
    config.pythonWebFramework &&
    config.pythonWebFramework !== "none"
  ) {
    backendPart = addLegacyPart(parts, "backend", "python", config.pythonWebFramework, source);
  }
  if (config.ecosystem === "go" && config.goWebFramework && config.goWebFramework !== "none") {
    backendPart = addLegacyPart(parts, "backend", "go", config.goWebFramework, source);
  }
  if (
    config.ecosystem === "java" &&
    config.javaWebFramework &&
    config.javaWebFramework !== "none"
  ) {
    backendPart = addLegacyPart(parts, "backend", "java", config.javaWebFramework, source);
  }
  if (
    config.ecosystem === "elixir" &&
    config.elixirWebFramework &&
    config.elixirWebFramework !== "none"
  ) {
    backendPart = addLegacyPart(parts, "backend", "elixir", config.elixirWebFramework, source);
  }

  const databasePart = addLegacyPart(parts, "database", "universal", config.database, source);
  const capabilityOwner = backendPart?.id ?? frontendPart?.id ?? databasePart?.id;

  // The generic `orm`/`api`/`auth` fields only describe TypeScript and React Native
  // stacks. For other ecosystems these are inert TS defaults and the ecosystem-specific
  // blocks below own the real bindings — mapping the generic fields there would emit
  // invalid or duplicate capability parts (e.g. `auth:go:better-auth` alongside `goAuth`).
  if (
    config.ecosystem === undefined ||
    config.ecosystem === "typescript" ||
    config.ecosystem === "react-native"
  ) {
    addLegacyPart(parts, "orm", "typescript", config.orm, source, capabilityOwner);
    addLegacyPart(parts, "api", "typescript", config.api, source, capabilityOwner);
    addLegacyPart(
      parts,
      "auth",
      config.ecosystem ?? "typescript",
      config.auth,
      source,
      capabilityOwner,
    );
  }
  if (config.ecosystem === "rust") {
    addLegacyPart(parts, "orm", "rust", config.rustOrm, source, backendPart?.id);
    addLegacyPart(parts, "api", "rust", config.rustApi, source, backendPart?.id);
    addLegacyPart(parts, "auth", "rust", config.rustAuth, source, backendPart?.id);
  }
  if (config.ecosystem === "python") {
    addLegacyPart(parts, "orm", "python", config.pythonOrm, source, backendPart?.id);
    addLegacyPart(parts, "api", "python", config.pythonApi, source, backendPart?.id);
    addLegacyPart(parts, "auth", "python", config.pythonAuth, source, backendPart?.id);
  }
  if (config.ecosystem === "go") {
    addLegacyPart(parts, "orm", "go", config.goOrm, source, backendPart?.id);
    addLegacyPart(parts, "api", "go", config.goApi, source, backendPart?.id);
    addLegacyPart(parts, "auth", "go", config.goAuth, source, backendPart?.id);
  }
  if (config.ecosystem === "java") {
    addLegacyPart(parts, "orm", "java", config.javaOrm, source, backendPart?.id);
    addLegacyPart(parts, "auth", "java", config.javaAuth, source, backendPart?.id);
  }
  if (config.ecosystem === "elixir") {
    addLegacyPart(parts, "orm", "elixir", config.elixirOrm, source, backendPart?.id);
    addLegacyPart(parts, "api", "elixir", config.elixirApi, source, backendPart?.id);
    addLegacyPart(parts, "auth", "elixir", config.elixirAuth, source, backendPart?.id);
  }

  return materializeProvidedStackParts(parts);
}

function ecosystemForLegacy(parts: readonly StackPart[]): Ecosystem {
  const frontend = getPrimaryPart(parts, "frontend");
  if (frontend?.ecosystem && frontend.ecosystem !== "universal") return frontend.ecosystem;
  const mobile = getPrimaryPart(parts, "mobile");
  if (mobile) return "react-native";
  const backend = getPrimaryPart(parts, "backend");
  if (backend?.ecosystem && backend.ecosystem !== "universal") return backend.ecosystem;
  return "typescript";
}

export function stackPartsToLegacyProjectConfigPartial(
  parts: readonly StackPart[],
): Partial<ProjectConfig> {
  const config: Partial<ProjectConfig> = {
    stackParts: [...parts],
    ecosystem: ecosystemForLegacy(parts),
    frontend: [],
    backend: "none",
    database: "none",
    orm: "none",
    api: "none",
    auth: "none",
  };

  for (const part of parts) {
    if (part.source === "provided") continue;
    if (!part.ownerPartId) {
      if (part.role === "frontend" && part.ecosystem === "typescript") {
        config.frontend = [
          ...(config.frontend ?? []),
          part.toolId as ProjectConfig["frontend"][number],
        ];
      } else if (part.role === "frontend" && part.ecosystem === "rust") {
        config.rustFrontend = part.toolId as ProjectConfig["rustFrontend"];
      } else if (part.role === "mobile") {
        config.frontend = [
          ...(config.frontend ?? []),
          part.toolId as ProjectConfig["frontend"][number],
        ];
      } else if (part.role === "backend") {
        if (part.ecosystem === "typescript")
          config.backend = part.toolId as ProjectConfig["backend"];
        if (part.ecosystem === "rust")
          config.rustWebFramework = part.toolId as ProjectConfig["rustWebFramework"];
        if (part.ecosystem === "python")
          config.pythonWebFramework = part.toolId as ProjectConfig["pythonWebFramework"];
        if (part.ecosystem === "go")
          config.goWebFramework = part.toolId as ProjectConfig["goWebFramework"];
        if (part.ecosystem === "java")
          config.javaWebFramework = part.toolId as ProjectConfig["javaWebFramework"];
        if (part.ecosystem === "elixir")
          config.elixirWebFramework = part.toolId as ProjectConfig["elixirWebFramework"];
      } else if (part.role === "database") {
        config.database = part.toolId as ProjectConfig["database"];
      }
      continue;
    }

    const definition = findDefinition(part);
    if (definition?.legacyCategory) {
      (config as Record<string, unknown>)[definition.legacyCategory] = part.toolId;
      continue;
    }

    if (part.role === "orm") {
      if (part.ecosystem === "typescript") config.orm = part.toolId as ProjectConfig["orm"];
      if (part.ecosystem === "rust") config.rustOrm = part.toolId as ProjectConfig["rustOrm"];
      if (part.ecosystem === "python") config.pythonOrm = part.toolId as ProjectConfig["pythonOrm"];
      if (part.ecosystem === "go") config.goOrm = part.toolId as ProjectConfig["goOrm"];
      if (part.ecosystem === "java") config.javaOrm = part.toolId as ProjectConfig["javaOrm"];
      if (part.ecosystem === "elixir") config.elixirOrm = part.toolId as ProjectConfig["elixirOrm"];
    }
    if (part.role === "api") {
      if (part.ecosystem === "typescript") config.api = part.toolId as ProjectConfig["api"];
      if (part.ecosystem === "rust") config.rustApi = part.toolId as ProjectConfig["rustApi"];
      if (part.ecosystem === "python") config.pythonApi = part.toolId as ProjectConfig["pythonApi"];
      if (part.ecosystem === "go") config.goApi = part.toolId as ProjectConfig["goApi"];
      if (part.ecosystem === "elixir") config.elixirApi = part.toolId as ProjectConfig["elixirApi"];
    }
    if (part.role === "auth") {
      if (part.ecosystem === "typescript" || part.ecosystem === "react-native") {
        config.auth = part.toolId as ProjectConfig["auth"];
      }
      if (part.ecosystem === "rust") config.rustAuth = part.toolId as ProjectConfig["rustAuth"];
      if (part.ecosystem === "python")
        config.pythonAuth = part.toolId as ProjectConfig["pythonAuth"];
      if (part.ecosystem === "go") config.goAuth = part.toolId as ProjectConfig["goAuth"];
      if (part.ecosystem === "java") config.javaAuth = part.toolId as ProjectConfig["javaAuth"];
      if (part.ecosystem === "elixir")
        config.elixirAuth = part.toolId as ProjectConfig["elixirAuth"];
    }
  }

  return config;
}

export function compareLegacyConfigToStackParts(
  config: Partial<ProjectConfig>,
  stackParts: readonly StackPart[],
): StackGraphDiagnostic[] {
  const derived = stackPartsToLegacyProjectConfigPartial(stackParts);
  const diagnostics: StackGraphDiagnostic[] = [];
  for (const key of [
    "ecosystem",
    "frontend",
    "backend",
    "database",
    "orm",
    "api",
    "auth",
    "rustWebFramework",
    "pythonWebFramework",
    "goWebFramework",
    "javaWebFramework",
    "elixirWebFramework",
  ] as const) {
    const current = config[key];
    const next = derived[key];
    if (current === undefined || next === undefined) continue;
    if (JSON.stringify(current) !== JSON.stringify(next)) {
      diagnostics.push({
        code: "LEGACY_CONFIG_MISMATCH",
        path: key,
        message: `Legacy field '${key}' differs from stackParts and will be derived from the graph.`,
      });
    }
  }
  return diagnostics;
}

export function validateStackParts(parts: readonly StackPart[]): StackGraphValidationResult {
  const issues: StackGraphIssue[] = [];
  const partsById = new Map(parts.map((part) => [part.id, part]));
  const primaryToolIdsByRole: Partial<Record<StackPrimaryRole, string>> = {};

  for (const role of PRIMARY_ROLES) {
    const primaryPart = getPrimaryPart(parts, role as StackPrimaryRole);
    if (primaryPart) primaryToolIdsByRole[role as StackPrimaryRole] = primaryPart.toolId;
  }

  for (const role of PRIMARY_ROLES) {
    const matching = parts.filter((part) => part.role === role && !part.ownerPartId);
    if (matching.length > 1) {
      issues.push({
        code: "DUPLICATE_PRIMARY_ROLE",
        role,
        message: `Only one primary '${role}' stack part is supported in v1.`,
      });
    }
  }

  for (const part of parts) {
    const definition = findDefinition(part);
    if (!definition) {
      issues.push({
        code: "UNSUPPORTED_ROLE_BINDING",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: `'${part.toolId}' is not a valid ${part.ecosystem} tool for role '${part.role}'.`,
      });
    }

    if (!PRIMARY_ROLES.has(part.role) && !part.ownerPartId) {
      issues.push({
        code: "MISSING_OWNER_PART",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: `Capability stack part '${part.id}' must reference an owning primary part.`,
      });
    }

    if (part.ownerPartId && !partsById.has(part.ownerPartId)) {
      issues.push({
        code: "MISSING_OWNER_PART",
        partId: part.id,
        role: part.role,
        toolId: part.toolId,
        message: `Stack part '${part.id}' references missing owner '${part.ownerPartId}'.`,
      });
    }

    const owner = part.ownerPartId ? partsById.get(part.ownerPartId) : undefined;
    if (definition && (PRIMARY_ROLES.has(part.role) || owner)) {
      const siblingToolIdsByRole: Partial<Record<StackPartRole, string>> = {};
      for (const sibling of parts) {
        if (sibling.ownerPartId !== part.ownerPartId || sibling.source === "provided") continue;
        siblingToolIdsByRole[sibling.role] = sibling.toolId;
      }

      const compatibilityIssue = getStackPartCompatibilityIssue(part, {
        role: part.role,
        ecosystem: part.ecosystem,
        ownerRole:
          owner && PRIMARY_ROLES.has(owner.role) ? (owner.role as StackPrimaryRole) : undefined,
        ownerToolId: owner?.toolId,
        ownerEcosystem: owner?.ecosystem,
        siblingToolIdsByRole,
        primaryToolIdsByRole,
      });

      if (compatibilityIssue) {
        issues.push(compatibilityIssue);
      }
    }
  }

  const byScope = new Map<string, StackPart[]>();
  for (const part of parts) {
    const key = `${part.ownerPartId ?? "root"}:${part.role}`;
    byScope.set(key, [...(byScope.get(key) ?? []), part]);
  }

  for (const scopedParts of byScope.values()) {
    const selectedParts = scopedParts.filter((part) => part.source !== "provided");
    if (selectedParts.length > 1) {
      const [first] = selectedParts;
      issues.push({
        code: "DUPLICATE_ROLE_SCOPE",
        partId: first?.id,
        role: first?.role,
        toolId: first?.toolId,
        message: `Only one selected '${first?.role}' stack part is supported per owner scope.`,
      });
    }

    const selected = scopedParts.find((part) => part.source !== "provided");
    const provided = scopedParts.find((part) => part.source === "provided");
    if (!selected || !provided || selected.toolId === provided.toolId) continue;

    const provider = provided.providedByPartId
      ? partsById.get(provided.providedByPartId)
      : undefined;
    const providerDefinition = provider ? findDefinition(provider) : undefined;
    const providedDefinition = providerDefinition?.provides?.find(
      (capability) => capability.role === provided.role && capability.toolId === provided.toolId,
    );

    if (!providedDefinition?.overrideable) {
      issues.push({
        code: "PROVIDED_CAPABILITY_CONFLICT",
        partId: selected.id,
        role: selected.role,
        toolId: selected.toolId,
        message: `'${selected.toolId}' conflicts with '${provided.toolId}' provided by '${provider?.toolId ?? "another part"}'.`,
      });
    }
  }

  return { issues };
}
