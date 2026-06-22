import {
  CATEGORY_ORDER,
  getCategoryOrderForEcosystem,
  getStackPartOptions,
  isMultiSelectCategory,
  parseStackPartSpecs,
  stackPartsToLegacyProjectConfigPartial,
  type OptionCategory,
  type StackPartEcosystem,
  type StackPartOptionContext,
  type StackPartRole,
} from "@better-fullstack/types";
import {
  usesVirtualNoneStackSelection as usesVirtualNoneSelection,
} from "@better-fullstack/types/stack-translation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bookmark,
  BookOpen,
  Check,
  ChevronDown,
  ClipboardCopy,
  EllipsisVertical,
  Eye,
  Github,
  Hammer,
  InfoIcon,
  Link,
  PanelLeft,
  Pencil,
  RefreshCw,
  Save,
  Settings,
  Shuffle,
  Terminal,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  Fragment,
  Suspense,
  lazy,
  startTransition,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

import type { Ecosystem } from "@/lib/types";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { clearBuilderMode, publishBuilderMode } from "@/lib/builder-mode-bridge";
import {
  DEFAULT_STACK,
  ECOSYSTEMS,
  PRESET_TEMPLATES,
  type StackState,
  TECH_OPTIONS,
} from "@/lib/constant";
import {
  getLocalizedCategoryDisplayName,
  getLocalizedTechOption,
} from "@/lib/i18n/builder-copy";
import {
  buildSavedStackEntry,
  loadSavedStacks,
  saveSavedStacks,
  type SavedStackEntry,
} from "@/lib/saved-stacks";
import { useStackState } from "@/lib/stack-url-state";
import {
  generateStackCommand,
  generateStackSharingUrl,
  getStackKeyForCategory,
} from "@/lib/stack-utils";
import { ICON_REGISTRY } from "@/lib/tech-icons";
import { getTechResourceLinks } from "@/lib/tech-resource-links";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages.js";

import { PresetsPanel } from "./presets-panel";
import { SavedStacksPanel } from "./saved-stacks-panel";
import { ShareButton } from "./share-button";
import { TechIcon } from "./tech-icon";
import {
  analyzeStackCompatibility,
  getCategoryDisplayName,
  getDisabledReason,
  getVisibleOptions,
  isOptionCompatible,
  validateProjectName,
} from "./utils";
import { YoloToggle } from "./yolo-toggle";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatProjectName(name: string): string {
  return name.replace(/\s+/g, "-");
}

type TechOption = (typeof TECH_OPTIONS)[keyof typeof TECH_OPTIONS][number];
type CompatibilityNotes = { notes: string[]; hasIssue: boolean };
type RenderOptionGroup = {
  key: string;
  heading: string | null;
  category: keyof typeof TECH_OPTIONS;
  options: TechOption[];
};
type GraphOptionContext = Omit<StackPartOptionContext, "role" | "ecosystem">;
type GraphFrontendEcosystem = Extract<StackPartEcosystem, "typescript" | "rust">;
type GraphBackendEcosystem = Extract<
  StackPartEcosystem,
  "typescript" | "rust" | "python" | "go" | "java" | "elixir" | "dotnet"
>;
type GraphSelection = {
  frontendEcosystem: GraphFrontendEcosystem;
  frontend: string;
  mobile: string;
  backendEcosystem: GraphBackendEcosystem;
  backend: string;
  database: string;
  backendOrm: string;
  backendApi: string;
  backendAuth: string;
};
type GraphFrontendConfig = {
  ecosystem: GraphFrontendEcosystem;
  label: string;
  frameworkCategory: keyof typeof TECH_OPTIONS;
};
type GraphBackendConfig = {
  ecosystem: GraphBackendEcosystem;
  label: string;
  frameworkCategory: keyof typeof TECH_OPTIONS;
  ormCategory: keyof typeof TECH_OPTIONS;
  apiCategory?: keyof typeof TECH_OPTIONS;
  authCategory?: keyof typeof TECH_OPTIONS;
};

type MultiStackStepId = "frontend" | "backend" | "database" | "mobile" | "finalize";

const GRAPH_FRONTEND_CONFIGS: GraphFrontendConfig[] = [
  {
    ecosystem: "typescript",
    label: "TypeScript",
    frameworkCategory: "webFrontend",
  },
  {
    ecosystem: "rust",
    label: "Rust",
    frameworkCategory: "rustFrontend",
  },
];

const APP_PLATFORM_OPTION_GROUPS = [
  {
    headingKey: "workspacePlatforms",
    ids: ["turborepo", "nx", "docker-compose", "github-actions", "pwa", "tauri", "wxt", "opentui"],
  },
  {
    headingKey: "aiAgents",
    ids: ["mcp", "skills"],
  },
  {
    headingKey: "integrations",
    ids: ["msw", "storybook", "backend-utils"],
  },
  {
    headingKey: "tanstack",
    ids: ["tanstack-query", "tanstack-table", "tanstack-virtual", "tanstack-db", "tanstack-pacer"],
  },
] as const;

const GRAPH_BACKEND_CONFIGS: GraphBackendConfig[] = [
  {
    ecosystem: "typescript",
    label: "TypeScript",
    frameworkCategory: "backend",
    ormCategory: "orm",
    apiCategory: "api",
    authCategory: "auth",
  },
  {
    ecosystem: "go",
    label: "Go",
    frameworkCategory: "goWebFramework",
    ormCategory: "goOrm",
    apiCategory: "goApi",
    authCategory: "goAuth",
  },
  {
    ecosystem: "rust",
    label: "Rust",
    frameworkCategory: "rustWebFramework",
    ormCategory: "rustOrm",
    apiCategory: "rustApi",
    authCategory: "rustAuth",
  },
  {
    ecosystem: "python",
    label: "Python",
    frameworkCategory: "pythonWebFramework",
    ormCategory: "pythonOrm",
    apiCategory: "pythonApi",
    authCategory: "pythonAuth",
  },
  {
    ecosystem: "java",
    label: "Java",
    frameworkCategory: "javaWebFramework",
    ormCategory: "javaOrm",
    authCategory: "javaAuth",
  },
  {
    ecosystem: "elixir",
    label: "Elixir",
    frameworkCategory: "elixirWebFramework",
    ormCategory: "elixirOrm",
    apiCategory: "elixirApi",
    authCategory: "elixirAuth",
  },
  {
    ecosystem: "dotnet",
    label: ".NET",
    frameworkCategory: "dotnetWebFramework",
    ormCategory: "dotnetOrm",
    apiCategory: "dotnetApi",
    authCategory: "dotnetAuth",
  },
];

const GRAPH_FRONTEND_CONFIG_BY_ECOSYSTEM = Object.fromEntries(
  GRAPH_FRONTEND_CONFIGS.map((config) => [config.ecosystem, config]),
) as Record<GraphFrontendEcosystem, GraphFrontendConfig>;

const GRAPH_BACKEND_CONFIG_BY_ECOSYSTEM = Object.fromEntries(
  GRAPH_BACKEND_CONFIGS.map((config) => [config.ecosystem, config]),
) as Record<GraphBackendEcosystem, GraphBackendConfig>;

function getAppPlatformGroupHeading(headingKey: (typeof APP_PLATFORM_OPTION_GROUPS)[number]["headingKey"]) {
  switch (headingKey) {
    case "workspacePlatforms":
      return m.builderGroupWorkspacePlatforms();
    case "aiAgents":
      return m.builderGroupAiAgents();
    case "integrations":
      return m.builderGroupIntegrations();
    case "tanstack":
      return "TanStack";
  }
}

function getMultiStepLabel(stepId: MultiStackStepId) {
  switch (stepId) {
    case "frontend":
      return getLocalizedCategoryDisplayName("webFrontend", "Frontend");
    case "backend":
      return getLocalizedCategoryDisplayName("backend", "Backend");
    case "database":
      return getLocalizedCategoryDisplayName("database", "Database");
    case "mobile":
      return m.builderStepMobile();
    case "finalize":
      return m.builderStepFinalize();
  }
}

const MULTI_STACK_STEPS: Array<{
  id: MultiStackStepId;
}> = [
  { id: "frontend" },
  { id: "backend" },
  { id: "database" },
  { id: "mobile" },
  { id: "finalize" },
];

const MULTI_FRONTEND_LIBRARY_GROUPS: Array<keyof typeof TECH_OPTIONS> = [
  "cssFramework",
  "uiLibrary",
  "stateManagement",
  "appPlatforms",
  "forms",
  "validation",
  "testing",
  "animation",
];

const MULTI_MOBILE_LIBRARY_GROUPS: Array<keyof typeof TECH_OPTIONS> = [
  "mobileNavigation",
  "mobileUI",
  "mobileStorage",
  "mobileTesting",
  "mobilePush",
  "mobileOTA",
  "mobileDeepLinking",
];

const GRAPH_BACKEND_ADVANCED_CATEGORY_ORDER_BY_ECOSYSTEM = {
  typescript: [
    "payments",
    "email",
    "fileUpload",
    "backendLibraries",
    "ai",
    "realtime",
    "jobQueue",
    "logging",
    "observability",
    "featureFlags",
    "caching",
    "rateLimit",
    "i18n",
    "cms",
    "search",
    "vectorDb",
    "fileStorage",
  ],
  rust: [
    "rustCli",
    "rustLibraries",
    "rustLogging",
    "rustErrorHandling",
    "rustCaching",
    "rustRealtime",
    "rustMessageQueue",
    "rustObservability",
    "rustTemplating",
  ],
  python: [
    "pythonValidation",
    "pythonAi",
    "pythonTaskQueue",
    "pythonGraphql",
    "pythonQuality",
    "pythonTesting",
    "pythonCaching",
    "pythonRealtime",
    "pythonObservability",
    "pythonCli",
  ],
  go: [
    "goCli",
    "goLogging",
    "goTesting",
    "goRealtime",
    "goMessageQueue",
    "goCaching",
    "goConfig",
    "goObservability",
  ],
  java: [
    "javaBuildTool",
    "javaApi",
    "javaLogging",
    "javaLibraries",
    "javaTestingLibraries",
  ],
  elixir: [
    "elixirRealtime",
    "elixirJobs",
    "elixirValidation",
    "elixirHttp",
    "elixirJson",
    "elixirEmail",
    "elixirCaching",
    "elixirObservability",
    "elixirTesting",
    "elixirQuality",
    "elixirDeploy",
    "elixirLibraries",
  ],
  dotnet: [
    "dotnetTesting",
    "dotnetJobQueue",
    "dotnetRealtime",
    "dotnetObservability",
    "dotnetValidation",
    "dotnetCaching",
    "dotnetDeploy",
  ],
} as const satisfies Record<GraphBackendEcosystem, readonly (keyof typeof TECH_OPTIONS)[]>;

const GRAPH_TYPESCRIPT_SHARED_BACKEND_CATEGORY_SET = new Set<keyof typeof TECH_OPTIONS>([
  "email",
  "observability",
  "caching",
  "rateLimit",
  "search",
]);

const GRAPH_COMMON_CATEGORY_ORDER: Array<keyof typeof TECH_OPTIONS> = [
  "codeQuality",
  "documentation",
  "packageManager",
  "aiDocs",
  "versionChannel",
  "git",
  "install",
];

function isGraphBackendEcosystem(
  ecosystem: StackPartEcosystem,
): ecosystem is GraphBackendEcosystem {
  return ecosystem in GRAPH_BACKEND_CONFIG_BY_ECOSYSTEM;
}

function isGraphFrontendEcosystem(
  ecosystem: StackPartEcosystem,
): ecosystem is GraphFrontendEcosystem {
  return ecosystem in GRAPH_FRONTEND_CONFIG_BY_ECOSYSTEM;
}

function getOptionName(category: keyof typeof TECH_OPTIONS, optionId: string) {
  if (optionId === "none") return m.builderNone();
  return TECH_OPTIONS[category]?.find((option) => option.id === optionId)?.name ?? optionId;
}

function getStackStringValue(
  stack: StackState,
  category: keyof typeof TECH_OPTIONS,
  fallback = "none",
) {
  const value = stack[getStackKeyForCategory(category)];

  if (Array.isArray(value)) {
    return getSelectedOptionId(value, fallback);
  }

  return typeof value === "string" ? value : fallback;
}

function getGraphToolOptions(
  category: keyof typeof TECH_OPTIONS,
  role: StackPartRole,
  ecosystem: StackPartEcosystem,
  context: GraphOptionContext = {},
): TechOption[] {
  const allowedIds = new Set(getStackPartOptions({ role, ecosystem, ...context }));
  return (TECH_OPTIONS[category] || []).filter(
    (option) => option.id === "none" || allowedIds.has(option.id),
  );
}

function getSelectedOptionId(values: readonly string[], fallback = "none") {
  return values.find((value) => value !== "none") ?? fallback;
}

function getDefaultGraphTool(
  category: keyof typeof TECH_OPTIONS,
  role: StackPartRole,
  ecosystem: StackPartEcosystem,
  fallback = "none",
  options: { allowNoneDefault?: boolean } = {},
  context: GraphOptionContext = {},
) {
  const toolOptions = getGraphToolOptions(category, role, ecosystem, context);
  const defaultOption = toolOptions.find((option) => option.default);

  if (defaultOption && (options.allowNoneDefault || defaultOption.id !== "none")) {
    return defaultOption.id;
  }

  return toolOptions.find((option) => option.id !== "none")?.id ?? fallback;
}

function getSoloBackendSelection(stack: StackState): GraphSelection {
  const currentEcosystem = isGraphBackendEcosystem(stack.ecosystem)
    ? stack.ecosystem
    : "typescript";
  const backendConfig = GRAPH_BACKEND_CONFIG_BY_ECOSYSTEM[currentEcosystem];
  const backendValue = stack[getStackKeyForCategory(backendConfig.frameworkCategory)];
  const ormValue = stack[getStackKeyForCategory(backendConfig.ormCategory)];
  const apiValue = backendConfig.apiCategory
    ? stack[getStackKeyForCategory(backendConfig.apiCategory)]
    : "none";
  const authValue = backendConfig.authCategory
    ? stack[getStackKeyForCategory(backendConfig.authCategory)]
    : "none";
  const frontendEcosystem =
    stack.ecosystem === "rust" && stack.rustFrontend !== "none" ? "rust" : "typescript";

  return {
    frontendEcosystem,
    frontend:
      frontendEcosystem === "rust"
        ? stack.rustFrontend
        : getSelectedOptionId(stack.webFrontend, "tanstack-router"),
    mobile: getSelectedOptionId(stack.nativeFrontend),
    backendEcosystem: currentEcosystem,
    backend:
      typeof backendValue === "string" && backendValue !== "none"
        ? backendValue
        : getDefaultGraphTool(backendConfig.frameworkCategory, "backend", currentEcosystem, "none"),
    database: stack.database !== "none" ? stack.database : "none",
    backendOrm: typeof ormValue === "string" ? ormValue : "none",
    backendApi: typeof apiValue === "string" ? apiValue : "none",
    backendAuth: typeof authValue === "string" ? authValue : "none",
  };
}

function getGraphSelection(stack: StackState): GraphSelection {
  if (stack.stackPartSpecs.length === 0) {
    return getSoloBackendSelection(stack);
  }

  try {
    const parts = parseStackPartSpecs(stack.stackPartSpecs, "selected");
    const selectedParts = parts.filter((part) => part.source !== "provided");
    const frontend = selectedParts.find(
      (part) =>
        part.role === "frontend" && !part.ownerPartId && isGraphFrontendEcosystem(part.ecosystem),
    );
    const frontendEcosystem =
      frontend && isGraphFrontendEcosystem(frontend.ecosystem) ? frontend.ecosystem : "typescript";
    const mobile = selectedParts.find((part) => part.role === "mobile" && !part.ownerPartId);
    const backend = selectedParts.find((part) => part.role === "backend" && !part.ownerPartId);
    const backendEcosystem =
      backend && isGraphBackendEcosystem(backend.ecosystem) ? backend.ecosystem : "typescript";
    const database = selectedParts.find((part) => part.role === "database" && !part.ownerPartId);
    const backendOrm = backend
      ? selectedParts.find((part) => part.role === "orm" && part.ownerPartId === backend.id)
      : undefined;
    const backendApi = backend
      ? selectedParts.find((part) => part.role === "api" && part.ownerPartId === backend.id)
      : undefined;
    const backendAuth = backend
      ? selectedParts.find((part) => part.role === "auth" && part.ownerPartId === backend.id)
      : undefined;

    return {
      frontendEcosystem,
      frontend: frontend?.toolId ?? "none",
      mobile: mobile?.toolId ?? "none",
      backendEcosystem,
      backend: backend?.toolId ?? "none",
      database: database?.toolId ?? "none",
      backendOrm: backendOrm?.toolId ?? "none",
      backendApi: backendApi?.toolId ?? "none",
      backendAuth: backendAuth?.toolId ?? "none",
    };
  } catch {
    return getSoloBackendSelection(stack);
  }
}

function graphSelectionToSpecs(selection: GraphSelection): string[] {
  const specs: string[] = [];
  if (selection.frontend !== "none") {
    specs.push(`frontend:${selection.frontendEcosystem}:${selection.frontend}`);
  }
  if (selection.mobile !== "none") {
    specs.push(`mobile:react-native:${selection.mobile}`);
  }
  if (selection.backend !== "none") {
    specs.push(`backend:${selection.backendEcosystem}:${selection.backend}`);
  }
  if (selection.backend !== "none" && selection.backendOrm !== "none") {
    specs.push(`backend.orm:${selection.backendEcosystem}:${selection.backendOrm}`);
  }
  if (selection.backend !== "none" && selection.backendApi !== "none") {
    specs.push(`backend.api:${selection.backendEcosystem}:${selection.backendApi}`);
  }
  if (selection.backend !== "none" && selection.backendAuth !== "none") {
    specs.push(`backend.auth:${selection.backendEcosystem}:${selection.backendAuth}`);
  }
  if (selection.database !== "none") {
    specs.push(`database:universal:${selection.database}`);
  }
  return specs;
}

function getGraphBackendAdvancedCategoryOrder(
  ecosystem: GraphBackendEcosystem,
): readonly (keyof typeof TECH_OPTIONS)[] {
  return GRAPH_BACKEND_ADVANCED_CATEGORY_ORDER_BY_ECOSYSTEM[ecosystem];
}

function shouldResetGraphBackendAdvancedCategory(
  ecosystem: GraphBackendEcosystem,
  category: keyof typeof TECH_OPTIONS,
) {
  return (
    ecosystem !== "typescript" || !GRAPH_TYPESCRIPT_SHARED_BACKEND_CATEGORY_SET.has(category)
  );
}

function getGraphBackendAdvancedResetPatch(
  selectedBackendEcosystem: GraphBackendEcosystem | undefined,
): Partial<StackState> {
  const patch: Partial<StackState> = {};

  for (const { ecosystem } of GRAPH_BACKEND_CONFIGS) {
    if (ecosystem === selectedBackendEcosystem) continue;

    for (const category of getGraphBackendAdvancedCategoryOrder(ecosystem)) {
      if (!shouldResetGraphBackendAdvancedCategory(ecosystem, category)) continue;

      const stackKey = getStackKeyForCategory(category);
      patch[stackKey] = DEFAULT_STACK[stackKey] as never;
    }
  }

  return patch;
}

function stackPatchFromGraphSpecs(specs: string[]): Partial<StackState> {
  const patch: Partial<StackState> = {
    stackMode: "multi",
    stackPartSpecs: specs,
  };

  try {
    const parts = parseStackPartSpecs(specs, "selected");
    const lowered = stackPartsToLegacyProjectConfigPartial(parts);
    const selectedParts = parts.filter((part) => part.source !== "provided");
    const frontend = selectedParts.find((part) => part.role === "frontend" && !part.ownerPartId);
    const mobile = selectedParts.find((part) => part.role === "mobile" && !part.ownerPartId);
    const backend = selectedParts.find((part) => part.role === "backend" && !part.ownerPartId);
    const database = selectedParts.find((part) => part.role === "database" && !part.ownerPartId);

    patch.ecosystem = (lowered.ecosystem ?? "typescript") as Ecosystem;
    patch.webFrontend = ["none"];
    patch.rustFrontend = "none";
    if (frontend?.ecosystem === "typescript") {
      patch.webFrontend = [frontend.toolId];
    }
    if (frontend?.ecosystem === "rust") {
      patch.rustFrontend = frontend.toolId;
    }
    patch.nativeFrontend = [mobile?.toolId ?? "none"];
    patch.database = database?.toolId ?? "none";

    for (const config of GRAPH_BACKEND_CONFIGS) {
      for (const category of [
        config.frameworkCategory,
        config.ormCategory,
        config.apiCategory,
        config.authCategory,
      ]) {
        if (!category) continue;
        (patch as Record<string, string>)[getStackKeyForCategory(category)] = "none";
      }
    }

    if (backend && isGraphBackendEcosystem(backend.ecosystem)) {
      const backendConfig = GRAPH_BACKEND_CONFIG_BY_ECOSYSTEM[backend.ecosystem];
      (patch as Record<string, unknown>)[getStackKeyForCategory(backendConfig.frameworkCategory)] =
        backend.toolId;
      const backendOrm = selectedParts.find(
        (part) => part.role === "orm" && part.ownerPartId === backend.id,
      );
      if (backendOrm) {
        (patch as Record<string, unknown>)[getStackKeyForCategory(backendConfig.ormCategory)] =
          backendOrm.toolId;
      }
      const backendApi = selectedParts.find(
        (part) => part.role === "api" && part.ownerPartId === backend.id,
      );
      if (backendApi && backendConfig.apiCategory) {
        (patch as Record<string, unknown>)[getStackKeyForCategory(backendConfig.apiCategory)] =
          backendApi.toolId;
      }
      const backendAuth = selectedParts.find(
        (part) => part.role === "auth" && part.ownerPartId === backend.id,
      );
      if (backendAuth && backendConfig.authCategory) {
        (patch as Record<string, unknown>)[getStackKeyForCategory(backendConfig.authCategory)] =
          backendAuth.toolId;
      }
    }

    Object.assign(
      patch,
      getGraphBackendAdvancedResetPatch(
        backend && isGraphBackendEcosystem(backend.ecosystem) ? backend.ecosystem : undefined,
      ),
    );
  } catch {
    return patch;
  }

  return patch;
}

function getCategoryOptionGroups(
  categoryKey: string,
  options: readonly TechOption[],
): Array<{ heading: string | null; options: TechOption[] }> {
  if (categoryKey !== "appPlatforms") {
    return [{ heading: null, options: [...options] }];
  }

  const assignedIds = new Set<string>();
  const groupedOptions: Array<{ heading: string | null; options: TechOption[] }> =
    APP_PLATFORM_OPTION_GROUPS.map((group) => {
      const groupIds = new Set<string>(group.ids);
      const groupOptions = options.filter((option) => groupIds.has(option.id));
      for (const option of groupOptions) {
        assignedIds.add(option.id);
      }

      return {
        heading: getAppPlatformGroupHeading(group.headingKey),
        options: groupOptions,
      };
    }).filter((group) => group.options.length > 0);

  const ungroupedOptions = options.filter((option) => !assignedIds.has(option.id));
  if (ungroupedOptions.length > 0) {
    groupedOptions.push({ heading: m.builderGroupOther(), options: ungroupedOptions });
  }

  return groupedOptions;
}

function mergeCompatibilityNotes(
  ...noteGroups: Array<CompatibilityNotes | undefined>
): CompatibilityNotes | undefined {
  const notes = [...new Set(noteGroups.flatMap((group) => group?.notes ?? []))];
  const hasIssue = noteGroups.some((group) => group?.hasIssue);

  if (!hasIssue && notes.length === 0) {
    return undefined;
  }

  return { notes, hasIssue };
}

function getCategoryRenderGroups(
  stack: StackState,
  categoryKey: keyof typeof TECH_OPTIONS,
): RenderOptionGroup[] {
  const categoryOptions = getVisibleOptions(stack, categoryKey, TECH_OPTIONS[categoryKey] || []);

  if (stack.ecosystem === "go" && categoryKey === "goAuth") {
    const authOptions = getVisibleOptions(stack, "auth", TECH_OPTIONS.auth);

    return [
      {
        key: "go-auth-libraries",
        heading: m.builderLibraries(),
        category: "goAuth" as const,
        options: [...categoryOptions],
      },
      {
        key: "go-auth-integrated",
        heading: m.builderIntegratedAuth(),
        category: "auth" as const,
        options: [...authOptions],
      },
    ].filter((group) => group.options.length > 0);
  }

  return getCategoryOptionGroups(categoryKey, categoryOptions).map((group, index) => ({
    key: `${categoryKey}-${group.heading ?? index}`,
    heading: group.heading,
    category: categoryKey,
    options: group.options,
  }));
}

function TechResourceButtons({ category, techId }: { category: string; techId: string }) {
  const { docsUrl, githubUrl } = getTechResourceLinks(category, techId);

  if (!docsUrl && !githubUrl) return null;

  const linkClass =
    "inline-flex h-6 w-6 items-center justify-center rounded-md border border-border/60 bg-background/85 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground";

  return (
    <div className="flex items-center gap-1">
      {docsUrl && (
        <Tooltip>
          <TooltipTrigger
            render={
              <a
                href={docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={m.builderOpenDocumentation()}
                className={linkClass}
                onClick={(e) => e.stopPropagation()}
              />
            }
          >
            <BookOpen className="h-3.5 w-3.5" />
          </TooltipTrigger>
          <TooltipContent>{m.builderDocs()}</TooltipContent>
        </Tooltip>
      )}
      {githubUrl && (
        <Tooltip>
          <TooltipTrigger
            render={
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={m.builderOpenGithubRepository()}
                className={linkClass}
                onClick={(e) => e.stopPropagation()}
              />
            }
          >
            <Github className="h-3.5 w-3.5" />
          </TooltipTrigger>
          <TooltipContent>GitHub</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

function DisabledReasonInline({ reason, compact = false }: { reason: string; compact?: boolean }) {
  return (
    <div
      className={cn(
        "mt-2 rounded-md border border-destructive/20 bg-destructive/5 px-2 py-1 text-destructive/90",
        compact ? "text-[9px] leading-tight" : "text-[10px] leading-snug",
      )}
    >
      <span className="font-medium">{m.builderUnavailable()}</span>{" "}
      <span className={compact ? "line-clamp-1" : "line-clamp-2"}>{reason}</span>
    </div>
  );
}

function CategoryHint({ categoryKey }: { categoryKey: string }) {
  if (categoryKey !== "appPlatforms") return null;

  return (
    <div className="mb-3 rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-muted-foreground">
      <span className="font-medium text-foreground">{m.builderGroupedAddons()}</span>{" "}
      {m.builderGroupedAddonsDescription()}
    </div>
  );
}

function getSelectionCountForValue(
  category: keyof typeof TECH_OPTIONS,
  value: StackState[keyof StackState],
): number {
  if (Array.isArray(value)) {
    return value.filter((entry) => entry !== "none").length;
  }

  if (typeof value === "string" && value !== "none" && value !== "false") {
    if ((category === "git" || category === "install" || category === "auth") && value === "true")
      return 0;
    return 1;
  }

  return 0;
}

function getSelectedCount(category: keyof typeof TECH_OPTIONS, stack: StackState): number {
  if (stack.ecosystem === "go" && category === "goAuth") {
    return (
      getSelectionCountForValue("goAuth", stack.goAuth) +
      getSelectionCountForValue("auth", stack.auth)
    );
  }

  const catKey = getStackKeyForCategory(category);
  return getSelectionCountForValue(category, stack[catKey]);
}

function isSelectedCheck(stack: StackState, categoryKey: string, techId: string): boolean {
  const category = categoryKey as keyof typeof TECH_OPTIONS;
  const stackKey = getStackKeyForCategory(category);
  const currentValue = stack[stackKey];
  if (isMultiSelectCategory(categoryKey as OptionCategory)) {
    const selectedValues = Array.isArray(currentValue) ? currentValue : [];

    if (techId === "none" && usesVirtualNoneSelection(stackKey)) {
      return selectedValues.length === 0 || selectedValues.includes("none");
    }

    return selectedValues.includes(techId);
  }
  return currentValue === techId;
}

function getStackOptionUpdate(
  currentStack: StackState,
  category: keyof typeof TECH_OPTIONS,
  techId: string,
): Partial<StackState> {
  const catKey = getStackKeyForCategory(category);
  const update: Partial<StackState> = {};
  const currentValue = currentStack[catKey];

  if (isMultiSelectCategory(category as OptionCategory)) {
    const currentArray = Array.isArray(currentValue) ? [...currentValue] : [];
    let nextArray = [...currentArray];
    const isSelected = currentArray.includes(techId);
    const isVirtualNoneCategory = usesVirtualNoneSelection(catKey);

    if (catKey === "webFrontend") {
      if (techId === "none") {
        nextArray = ["none"];
      } else if (isSelected) {
        if (currentArray.length > 1) {
          nextArray = nextArray.filter((id) => id !== techId);
        } else {
          nextArray = ["none"];
        }
      } else {
        nextArray = [techId];
      }
    } else if (catKey === "nativeFrontend") {
      if (techId === "none") {
        nextArray = ["none"];
      } else if (isSelected) {
        nextArray = ["none"];
      } else {
        nextArray = [techId];
      }
    } else {
      if (isVirtualNoneCategory && techId === "none") {
        nextArray = [];
      } else if (isSelected) {
        nextArray = nextArray.filter((id) => id !== techId);
      } else {
        nextArray.push(techId);
      }

      if (nextArray.length > 1) {
        nextArray = nextArray.filter((id) => id !== "none");
      }
      if (
        nextArray.length === 0 &&
        (catKey === "codeQuality" ||
          catKey === "documentation" ||
          catKey === "appPlatforms" ||
          catKey === "examples" ||
          isVirtualNoneCategory)
      ) {
        // These categories can be empty.
      } else if (nextArray.length === 0) {
        nextArray = ["none"];
      }
    }

    const uniqueNext = [...new Set(nextArray)].sort();
    const uniqueCurrent = [...new Set(currentArray)].sort();

    if (JSON.stringify(uniqueNext) !== JSON.stringify(uniqueCurrent)) {
      (update as Record<string, unknown>)[catKey] = uniqueNext;
    }
  } else if (currentValue !== techId) {
    (update as Record<string, string>)[catKey] = techId;
  } else if ((category === "git" || category === "install") && techId === "false") {
    (update as Record<string, string>)[catKey] = "true";
  } else if ((category === "git" || category === "install") && techId === "true") {
    (update as Record<string, string>)[catKey] = "false";
  }

  return update;
}

// ─── Collapsible section config ──────────────────────────────────────────────

const INITIALLY_COLLAPSED_SET = new Set([
  "payments",
  "email",
  "fileUpload",
  "logging",
  "observability",
  "featureFlags",
  "analytics",
  "ai",
  "stateManagement",
  "forms",
  "validation",
  "testing",
  "realtime",
  "jobQueue",
  "caching",
  "rateLimit",
  "search",
  "vectorDb",
  "fileStorage",
  "animation",
  "cms",
  "documentation",
  "appPlatforms",
]);

const SHADCN_SUB_CATEGORIES = new Set([
  "shadcnBase",
  "shadcnStyle",
  "shadcnIconLibrary",
  "shadcnColorTheme",
  "shadcnBaseColor",
  "shadcnFont",
  "shadcnRadius",
]);

const PreviewPanel = lazy(async () => {
  const module = await import("./preview-panel");
  return { default: module.PreviewPanel };
});

function GraphOptionButton({
  option,
  selected,
  testId,
  disabledReason,
  onSelect,
}: {
  option: TechOption;
  selected: boolean;
  testId: string;
  disabledReason?: string | null;
  onSelect: () => void;
}) {
  const isDisabled = Boolean(disabledReason);
  const localizedOption = getLocalizedTechOption(option);

  return (
    <button
      type="button"
      data-testid={testId}
      aria-pressed={selected}
      aria-disabled={isDisabled}
      disabled={isDisabled}
      title={disabledReason || undefined}
      onClick={isDisabled ? undefined : onSelect}
      className={cn(
        "group relative cursor-pointer rounded-lg border p-3 text-left transition-all sm:p-4",
        selected
          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
          : isDisabled
            ? "cursor-not-allowed border-destructive/30 bg-destructive/5 opacity-50 hover:opacity-75"
            : "border-border bg-fd-background hover:border-primary/40 hover:bg-gradient-to-br hover:from-primary/6 hover:to-transparent hover:shadow-[0_0_10px_0px_hsl(var(--primary)/0.10)]",
      )}
    >
      <div className="flex items-start gap-3">
        {(option.icon !== "" || ICON_REGISTRY[option.id]) && (
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
              selected ? "bg-primary/10" : "bg-muted/50 group-hover:bg-muted",
            )}
          >
            <TechIcon
              techId={option.id}
              icon={option.icon}
              name={option.name}
              className="h-5 w-5"
            />
          </div>
        )}
        <div className="min-w-0 flex-1 pt-0.5">
          <span
            className={cn(
              "block font-semibold text-sm",
              selected ? "text-primary" : "text-foreground",
            )}
          >
            {localizedOption.name}
          </span>
          <p className="mt-0.5 line-clamp-2 text-muted-foreground text-xs leading-relaxed">
            {localizedOption.description}
          </p>
          {disabledReason && <DisabledReasonInline reason={disabledReason} />}
        </div>
      </div>
    </button>
  );
}

function GraphOptionGroup({
  label,
  options,
  selectedId,
  selectedCount,
  isOptionSelected,
  testIdPrefix,
  defaultCollapsed = false,
  getDisabledReasonForOption,
  onSelect,
}: {
  label: string;
  options: TechOption[];
  selectedId: string;
  selectedCount?: number;
  isOptionSelected?: (optionId: string) => boolean;
  testIdPrefix: string;
  defaultCollapsed?: boolean;
  getDisabledReasonForOption?: (optionId: string) => string | null;
  onSelect: (id: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const selectionCount = selectedCount ?? (Boolean(selectedId) && selectedId !== "none" ? 1 : 0);

  return (
    <section className="min-w-0">
      <button
        type="button"
        onClick={() => setCollapsed((prev) => !prev)}
        data-testid={`${testIdPrefix}-toggle`}
        aria-expanded={!collapsed}
        className="mb-3 flex w-full cursor-pointer items-center gap-2 border-b border-border pb-2 text-left transition-opacity hover:opacity-80"
      >
        <Terminal className="h-4 w-4 shrink-0 text-muted-foreground sm:h-5 sm:w-5" />
        <h2 className="flex-1 font-mono text-foreground text-sm sm:text-base">{label}</h2>
        {collapsed && selectionCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 font-mono text-[10px] font-semibold text-primary-foreground">
            {selectionCount}
          </span>
        )}
        <motion.div animate={{ rotate: collapsed ? 0 : 180 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 2xl:grid-cols-4">
              {options.map((option) => {
                const disabledReason = getDisabledReasonForOption?.(option.id) ?? null;
                const selected = isOptionSelected
                  ? isOptionSelected(option.id)
                  : selectedId === option.id;

                return (
                  <GraphOptionButton
                    key={option.id}
                    option={option}
                    selected={selected}
                    testId={`${testIdPrefix}-${option.id}`}
                    disabledReason={disabledReason}
                    onSelect={() => onSelect(option.id)}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function CreationModeComposer({
  stack,
  onChange,
  activeStep,
  onActiveStepChange,
}: {
  stack: StackState;
  onChange: (updates: Partial<StackState> | ((prev: StackState) => Partial<StackState>)) => void;
  activeStep: MultiStackStepId;
  onActiveStepChange: (stepId: MultiStackStepId) => void;
}) {
  const graphSelection = getGraphSelection(stack);
  const frontendConfig = GRAPH_FRONTEND_CONFIG_BY_ECOSYSTEM[graphSelection.frontendEcosystem];
  const backendConfig = GRAPH_BACKEND_CONFIG_BY_ECOSYSTEM[graphSelection.backendEcosystem];
  const primaryToolIdsByRole: GraphOptionContext["primaryToolIdsByRole"] = {
    frontend: graphSelection.frontend !== "none" ? graphSelection.frontend : undefined,
    backend: graphSelection.backend !== "none" ? graphSelection.backend : undefined,
    mobile: graphSelection.mobile !== "none" ? graphSelection.mobile : undefined,
    database: graphSelection.database !== "none" ? graphSelection.database : undefined,
  };
  const backendCapabilityContext: GraphOptionContext = {
    ownerRole: "backend",
    ownerToolId: graphSelection.backend !== "none" ? graphSelection.backend : undefined,
    ownerEcosystem: graphSelection.backendEcosystem,
    siblingToolIdsByRole: {
      orm: graphSelection.backendOrm,
      api: graphSelection.backendApi,
      auth: graphSelection.backendAuth,
    },
    primaryToolIdsByRole,
  };
  const frontendOptions = getGraphToolOptions(
    frontendConfig.frameworkCategory,
    "frontend",
    graphSelection.frontendEcosystem,
  );
  const mobileOptions = getGraphToolOptions("nativeFrontend", "mobile", "react-native");
  const backendOptions = getGraphToolOptions(
    backendConfig.frameworkCategory,
    "backend",
    graphSelection.backendEcosystem,
  );
  const databaseOptions = getGraphToolOptions("database", "database", "universal");
  const backendOrmOptions = getGraphToolOptions(
    backendConfig.ormCategory,
    "orm",
    graphSelection.backendEcosystem,
    backendCapabilityContext,
  );
  const backendApiOptions = backendConfig.apiCategory
    ? getGraphToolOptions(
        backendConfig.apiCategory,
        "api",
        graphSelection.backendEcosystem,
        backendCapabilityContext,
      )
    : [];
  const backendAuthOptions = backendConfig.authCategory
    ? getGraphToolOptions(
        backendConfig.authCategory,
        "auth",
        graphSelection.backendEcosystem,
        backendCapabilityContext,
      )
    : [];
  const backendAdvancedCategories =
    graphSelection.backend === "none"
      ? []
      : getGraphBackendAdvancedCategoryOrder(graphSelection.backendEcosystem);
  const backendCompatibilityStack: StackState = {
    ...stack,
    ecosystem: graphSelection.backendEcosystem as Ecosystem,
  };

  const applyGraphSelection = (nextSelection: GraphSelection) => {
    const specs = graphSelectionToSpecs(nextSelection);
    onChange((current) => ({
      ...stackPatchFromGraphSpecs(specs),
      projectName: current.projectName,
    }));
  };

  const updateGraphSelection = (updates: Partial<GraphSelection>) => {
    applyGraphSelection({ ...graphSelection, ...updates });
  };

  const updateStackOption = (category: keyof typeof TECH_OPTIONS, optionId: string) => {
    onChange((current) => getStackOptionUpdate(current, category, optionId));
  };

  const getPrimaryToolIdsForSelection = (
    selection: GraphSelection,
  ): GraphOptionContext["primaryToolIdsByRole"] => ({
    frontend: selection.frontend !== "none" ? selection.frontend : undefined,
    backend: selection.backend !== "none" ? selection.backend : undefined,
    mobile: selection.mobile !== "none" ? selection.mobile : undefined,
    database: selection.database !== "none" ? selection.database : undefined,
  });

  const getBackendContextForSelection = (selection: GraphSelection): GraphOptionContext => ({
    ownerRole: "backend",
    ownerToolId: selection.backend !== "none" ? selection.backend : undefined,
    ownerEcosystem: selection.backendEcosystem,
    siblingToolIdsByRole: {
      orm: selection.backendOrm,
      api: selection.backendApi,
      auth: selection.backendAuth,
    },
    primaryToolIdsByRole: getPrimaryToolIdsForSelection(selection),
  });

  const getDefaultBackendCapability = (
    config: GraphBackendConfig,
    role: Extract<StackPartRole, "api" | "auth">,
    selection: GraphSelection,
  ) => {
    const category = role === "api" ? config.apiCategory : config.authCategory;
    if (!category) return "none";

    return getDefaultGraphTool(
      category,
      role,
      config.ecosystem,
      "none",
      {
        allowNoneDefault: true,
      },
      getBackendContextForSelection(selection),
    );
  };

  const reconcileBackendCapabilities = (
    selection: GraphSelection,
    config: GraphBackendConfig,
  ): Pick<GraphSelection, "backendOrm" | "backendApi" | "backendAuth"> => {
    if (selection.backend === "none") {
      return { backendOrm: "none", backendApi: "none", backendAuth: "none" };
    }

    const ormOptions = getGraphToolOptions(
      config.ormCategory,
      "orm",
      config.ecosystem,
      getBackendContextForSelection(selection),
    );
    const backendOrm = ormOptions.some((option) => option.id === selection.backendOrm)
      ? selection.backendOrm
      : getDefaultGraphTool(
          config.ormCategory,
          "orm",
          config.ecosystem,
          "none",
          {},
          getBackendContextForSelection(selection),
        );

    const withOrm = { ...selection, backendOrm };
    const backendApi = config.apiCategory
      ? (() => {
          const apiOptions = getGraphToolOptions(
            config.apiCategory,
            "api",
            config.ecosystem,
            getBackendContextForSelection(withOrm),
          );
          return apiOptions.some((option) => option.id === selection.backendApi)
            ? selection.backendApi
            : getDefaultBackendCapability(config, "api", withOrm);
        })()
      : "none";

    const withApi = { ...withOrm, backendApi };
    const backendAuth = config.authCategory
      ? (() => {
          const authOptions = getGraphToolOptions(
            config.authCategory,
            "auth",
            config.ecosystem,
            getBackendContextForSelection(withApi),
          );
          return authOptions.some((option) => option.id === selection.backendAuth)
            ? selection.backendAuth
            : getDefaultBackendCapability(config, "auth", withApi);
        })()
      : "none";

    return { backendOrm, backendApi, backendAuth };
  };

  const getStepSelection = (
    stepId: MultiStackStepId,
  ): { scopeLabel: string; toolId: string; toolName: string } | null => {
    switch (stepId) {
      case "frontend":
        return graphSelection.frontend === "none"
          ? null
          : {
              scopeLabel: frontendConfig.label,
              toolId: graphSelection.frontend,
              toolName: getOptionName(frontendConfig.frameworkCategory, graphSelection.frontend),
            };
      case "backend":
        return graphSelection.backend === "none"
          ? null
          : {
              scopeLabel: backendConfig.label,
              toolId: graphSelection.backend,
              toolName: getOptionName(backendConfig.frameworkCategory, graphSelection.backend),
            };
      case "database":
        return graphSelection.database === "none"
          ? null
          : {
              scopeLabel: m.builderUniversal(),
              toolId: graphSelection.database,
              toolName: getOptionName("database", graphSelection.database),
            };
      case "mobile":
        return graphSelection.mobile === "none"
          ? null
          : {
              scopeLabel: "React Native",
              toolId: graphSelection.mobile,
              toolName: getOptionName("nativeFrontend", graphSelection.mobile),
            };
      case "finalize":
        return null;
    }
  };

  const renderLanguageButton = ({
    selected,
    testId,
    label,
    onClick,
    iconTechId,
    icon,
  }: {
    selected: boolean;
    testId: string;
    label: string;
    onClick: () => void;
    iconTechId?: string;
    icon?: string;
  }) => {
    const hasIcon = Boolean(icon) || (iconTechId ? Boolean(ICON_REGISTRY[iconTechId]) : false);
    const ecosystemMeta = iconTechId ? ECOSYSTEMS.find((eco) => eco.id === iconTechId) : undefined;

    return (
      <button
        type="button"
        data-testid={testId}
        aria-pressed={selected}
        onClick={onClick}
        className={cn(
          "group relative flex cursor-pointer items-center justify-center gap-2 px-3 py-3 transition-all sm:gap-2.5 sm:px-4 sm:py-3.5",
          selected
            ? "bg-muted/40 text-foreground"
            : "text-muted-foreground hover:bg-muted/30 hover:text-foreground",
        )}
      >
        {selected && (
          <motion.div
            layoutId={`multi-language-indicator-${testId}`}
            className={cn(
              "absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r",
              ecosystemMeta?.color ?? "from-primary to-primary/60",
            )}
            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
          />
        )}
        {hasIcon && (
          <TechIcon
            techId={iconTechId}
            icon={icon}
            name={label}
            className={cn(
              "relative h-4.5 w-4.5 shrink-0 transition-all sm:h-5 sm:w-5",
              selected ? "scale-110" : "opacity-50 group-hover:opacity-75",
            )}
          />
        )}
        <span
          className={cn(
            "relative hidden font-mono text-[11px] uppercase tracking-wide transition-all min-[480px]:inline sm:text-xs",
            selected && "font-bold",
          )}
        >
          {label}
        </span>
      </button>
    );
  };

  const renderLanguagePicker = ({
    gridClassName,
    children,
    optionCount,
  }: {
    gridClassName?: string;
    children: ReactNode;
    optionCount: number;
  }) => {
    if (optionCount <= 1) return null;

    return (
      <div className="-mx-4 -mt-4 mb-5 overflow-hidden rounded-t-xl border-b border-border/60 sm:-mx-5 sm:-mt-5">
        <div className={cn("grid bg-fd-background", gridClassName)}>{children}</div>
      </div>
    );
  };

  const renderStackOptionGroup = ({
    label,
    category,
    testIdPrefix,
    defaultCollapsed,
    compatibilityStack = stack,
  }: {
    label: string;
    category: keyof typeof TECH_OPTIONS;
    testIdPrefix: string;
    defaultCollapsed?: boolean;
    compatibilityStack?: StackState;
  }) => (
    <GraphOptionGroup
      label={label}
      options={getVisibleOptions(compatibilityStack, category, TECH_OPTIONS[category] || [])}
      selectedId={getStackStringValue(stack, category)}
      selectedCount={getSelectedCount(category, stack)}
      isOptionSelected={(optionId) => isSelectedCheck(stack, category, optionId)}
      testIdPrefix={testIdPrefix}
      defaultCollapsed={defaultCollapsed}
      getDisabledReasonForOption={(optionId) =>
        isOptionCompatible(compatibilityStack, category, optionId)
          ? null
          : (getDisabledReason(compatibilityStack, category, optionId) ??
            m.builderNotCompatibleCurrentStack())
      }
      onSelect={(optionId) => {
        if (!isOptionCompatible(compatibilityStack, category, optionId)) return;
        updateStackOption(category, optionId);
      }}
    />
  );

  const renderActiveStep = () => {
    switch (activeStep) {
      case "frontend":
        return (
          <div className="space-y-5">
            {renderLanguagePicker({
              optionCount: GRAPH_FRONTEND_CONFIGS.length,
              gridClassName: "grid-cols-2",
              children: GRAPH_FRONTEND_CONFIGS.map((config) =>
                renderLanguageButton({
                  selected: graphSelection.frontendEcosystem === config.ecosystem,
                  testId: `multi-frontend-language-${config.ecosystem}`,
                  label: config.label,
                  iconTechId: config.ecosystem,
                  onClick: () => {
                    const frontend = getDefaultGraphTool(
                      config.frameworkCategory,
                      "frontend",
                      config.ecosystem,
                      "none",
                    );
                    updateGraphSelection({
                      frontendEcosystem: config.ecosystem,
                      frontend,
                      ...reconcileBackendCapabilities(
                        { ...graphSelection, frontendEcosystem: config.ecosystem, frontend },
                        backendConfig,
                      ),
                    });
                  },
                }),
              ),
            })}

            <GraphOptionGroup
              label={m.builderFrontendGroup({ ecosystem: frontendConfig.label })}
              options={frontendOptions}
              selectedId={graphSelection.frontend}
              testIdPrefix="multi-frontend-tool"
              onSelect={(frontend) =>
                updateGraphSelection({
                  frontend,
                  ...reconcileBackendCapabilities({ ...graphSelection, frontend }, backendConfig),
                })
              }
            />

            {graphSelection.frontendEcosystem === "typescript" &&
              graphSelection.frontend !== "none" &&
              MULTI_FRONTEND_LIBRARY_GROUPS.map((category) => (
                <div key={category}>
                  {renderStackOptionGroup({
                    label: getLocalizedCategoryDisplayName(category, getCategoryDisplayName(category)),
                    category,
                    testIdPrefix: `multi-frontend-${category}`,
                  })}
                </div>
              ))}
          </div>
        );
      case "backend":
        return (
          <div className="space-y-5">
            {renderLanguagePicker({
              optionCount: GRAPH_BACKEND_CONFIGS.length,
              gridClassName: "grid-cols-3 lg:grid-cols-6",
              children: GRAPH_BACKEND_CONFIGS.map((config) =>
                renderLanguageButton({
                  selected: graphSelection.backendEcosystem === config.ecosystem,
                  testId: `multi-backend-language-${config.ecosystem}`,
                  label: config.label,
                  iconTechId: config.ecosystem,
                  onClick: () => {
                    const backend = getDefaultGraphTool(
                      config.frameworkCategory,
                      "backend",
                      config.ecosystem,
                      "none",
                    );
                    const nextSelection: GraphSelection = {
                      ...graphSelection,
                      backendEcosystem: config.ecosystem,
                      backend,
                      backendOrm: "none",
                      backendApi: "none",
                      backendAuth: "none",
                    };
                    updateGraphSelection({
                      backendEcosystem: config.ecosystem,
                      backend,
                      ...reconcileBackendCapabilities(nextSelection, config),
                    });
                  },
                }),
              ),
            })}

            <GraphOptionGroup
              label={m.builderBackendGroup({ ecosystem: backendConfig.label })}
              options={backendOptions}
              selectedId={graphSelection.backend}
              testIdPrefix="multi-backend-tool"
              onSelect={(backend) => {
                const nextSelection: GraphSelection = {
                  ...graphSelection,
                  backend,
                  backendOrm: backend === "none" ? "none" : graphSelection.backendOrm,
                  backendApi: backend === "none" ? "none" : graphSelection.backendApi,
                  backendAuth: backend === "none" ? "none" : graphSelection.backendAuth,
                };
                updateGraphSelection({
                  backend,
                  ...reconcileBackendCapabilities(nextSelection, backendConfig),
                });
              }}
            />

            {graphSelection.backend !== "none" && backendOrmOptions.length > 0 && (
              <GraphOptionGroup
                label={m.builderOrmGroup({ ecosystem: backendConfig.label })}
                options={backendOrmOptions}
                selectedId={graphSelection.backendOrm}
                testIdPrefix="multi-backend-orm"
                onSelect={(backendOrm) => {
                  const nextSelection: GraphSelection = { ...graphSelection, backendOrm };
                  updateGraphSelection(reconcileBackendCapabilities(nextSelection, backendConfig));
                }}
              />
            )}

            {graphSelection.backend !== "none" && backendApiOptions.length > 0 && (
              <GraphOptionGroup
                label={m.builderApiGroup({ ecosystem: backendConfig.label })}
                options={backendApiOptions}
                selectedId={graphSelection.backendApi}
                testIdPrefix="multi-backend-api"
                onSelect={(backendApi) => {
                  const nextSelection: GraphSelection = { ...graphSelection, backendApi };
                  updateGraphSelection(reconcileBackendCapabilities(nextSelection, backendConfig));
                }}
              />
            )}

            {graphSelection.backend !== "none" && backendAuthOptions.length > 0 && (
              <GraphOptionGroup
                label={m.builderAuthGroup({ ecosystem: backendConfig.label })}
                options={backendAuthOptions}
                selectedId={graphSelection.backendAuth}
                testIdPrefix="multi-backend-auth"
                onSelect={(backendAuth) => updateGraphSelection({ backendAuth })}
              />
            )}

            {backendAdvancedCategories.map((category) => (
              <div key={category}>
                {renderStackOptionGroup({
                  label: getCategoryDisplayName(category),
                  category,
                  testIdPrefix: `multi-backend-${category}`,
                  defaultCollapsed: true,
                  compatibilityStack: backendCompatibilityStack,
                })}
              </div>
            ))}
          </div>
        );
      case "database":
        return (
          <div className="space-y-5">
            {renderLanguagePicker({
              optionCount: 1,
              children: renderLanguageButton({
                selected: true,
                testId: "multi-database-language-universal",
                label: m.builderUniversal(),
                onClick: () => undefined,
              }),
            })}

            <GraphOptionGroup
              label={m.builderStandaloneDatabase()}
              options={databaseOptions}
              selectedId={graphSelection.database}
              testIdPrefix="multi-database-tool"
              onSelect={(database) =>
                updateGraphSelection({
                  database,
                  ...reconcileBackendCapabilities({ ...graphSelection, database }, backendConfig),
                })
              }
            />
          </div>
        );
      case "mobile":
        return (
          <div className="space-y-5">
            {renderLanguagePicker({
              optionCount: 1,
              children: renderLanguageButton({
                selected: true,
                testId: "multi-mobile-language-react-native",
                label: "React Native",
                icon: "https://cdn.simpleicons.org/react/61DAFB",
                onClick: () => undefined,
              }),
            })}

            <GraphOptionGroup
              label={m.builderMobileApp()}
              options={mobileOptions}
              selectedId={graphSelection.mobile}
              testIdPrefix="multi-mobile-tool"
              onSelect={(mobile) => updateGraphSelection({ mobile })}
            />

            {graphSelection.mobile !== "none" &&
              MULTI_MOBILE_LIBRARY_GROUPS.map((category) => (
                <div key={category}>
                  {renderStackOptionGroup({
                    label: getLocalizedCategoryDisplayName(category, getCategoryDisplayName(category)),
                    category,
                    testIdPrefix: `multi-mobile-${category}`,
                  })}
                </div>
              ))}
          </div>
        );
      case "finalize":
        return null;
    }
  };

  if (stack.stackMode !== "multi") {
    return null;
  }

  return (
    <section
      data-testid="stack-graph-composer"
      className="mb-6 rounded-2xl border border-border/60 bg-muted/20 p-4 shadow-sm sm:mb-8 sm:p-5"
    >
      <div className="space-y-5">
        <div className="flex items-start overflow-x-auto px-10 pb-12">
          {MULTI_STACK_STEPS.map((step, index) => {
            const selected = activeStep === step.id;
            const isFinalize = step.id === "finalize";
            const isLast = index === MULTI_STACK_STEPS.length - 1;
            const selection = isFinalize ? null : getStepSelection(step.id);
            const subLabel = isFinalize ? m.builderSetup() : (selection?.toolName ?? m.builderNone());
            const stepNumber = String(index + 1).padStart(2, "0");

            return (
              <Fragment key={step.id}>
                <button
                  type="button"
                  data-testid={`multi-step-${step.id}`}
                  aria-pressed={selected}
                  onClick={() => onActiveStepChange(step.id)}
                  className="group relative flex w-12 shrink-0 cursor-pointer flex-col items-center text-center"
                >
                  <span
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full border font-mono text-sm font-semibold transition-all",
                      selected
                        ? "border-2 border-[#C6E853] text-[#C6E853]"
                        : "border-border/60 bg-muted/40 text-muted-foreground group-hover:border-[#C6E853]/40 group-hover:text-foreground",
                    )}
                  >
                    {stepNumber}
                  </span>
                  <span className="absolute top-14 left-1/2 flex w-28 -translate-x-1/2 flex-col">
                    <span
                      className={cn(
                        "truncate text-[13px] transition-colors",
                        selected
                          ? "font-semibold text-foreground"
                          : "font-medium text-muted-foreground group-hover:text-foreground",
                      )}
                    >
                      {getMultiStepLabel(step.id)}
                    </span>
                    <span className="truncate text-[11px] text-muted-foreground/70">
                      {subLabel}
                    </span>
                  </span>
                </button>

                {!isLast && (
                  <div aria-hidden="true" className="mt-6 h-px min-w-8 flex-1 bg-border/60" />
                )}
              </Fragment>
            );
          })}
        </div>

        {activeStep !== "finalize" && (
          <div className="space-y-6 rounded-xl border border-border/60 bg-background p-4 sm:p-5">
            {renderActiveStep()}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

const StackBuilder = ({ initialStack }: { initialStack?: StackState }) => {
  const [stack, setStack, viewMode, setViewMode, selectedFile, setSelectedFile] =
    useStackState(initialStack);

  const [command, setCommand] = useState("");
  const [copied, setCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [savedStacks, setSavedStacks] = useState<SavedStackEntry[]>(() => loadSavedStacks());
  const [, setLastChanges] = useState<Array<{ category: string; message: string }>>([]);
  const [isSaveInputVisible, setIsSaveInputVisible] = useState(false);
  const [savePresetName, setSavePresetName] = useState("");
  const [pendingUpdateEntryId, setPendingUpdateEntryId] = useState<string | null>(null);
  const [multiActiveStep, setMultiActiveStep] = useState<MultiStackStepId>("frontend");
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(() => {
    const initial = new Set(INITIALLY_COLLAPSED_SET);
    for (const cat of INITIALLY_COLLAPSED_SET) {
      const catKey = cat as keyof StackState;
      if (JSON.stringify(stack[catKey]) !== JSON.stringify(DEFAULT_STACK[catKey])) {
        initial.delete(cat);
      }
    }
    return initial;
  });

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const lastAppliedStackString = useRef<string>("");
  const lastAppliedEcosystemRef = useRef<Ecosystem>(stack.ecosystem);
  const suppressCompatibilityToastRef = useRef(false);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const compatibilityAnalysis = analyzeStackCompatibility(stack);
  const adjustedStack = useMemo<StackState | null>(() => {
    if (!compatibilityAnalysis.adjustedStack) return null;
    return { ...stack, ...compatibilityAnalysis.adjustedStack };
  }, [stack, compatibilityAnalysis.adjustedStack]);
  const projectNameError = validateProjectName(stack.projectName || "");

  // ─── Derived state ──────────────────────────────────────────────────────

  const categoryOrder = useMemo(() => {
    return getCategoryOrderForEcosystem(stack.ecosystem);
  }, [stack.ecosystem]);
  const graphSelection = useMemo(() => getGraphSelection(stack), [stack]);

  const displayedCategoryOrder = useMemo(() => {
    if (stack.stackMode !== "multi") return categoryOrder;
    return GRAPH_COMMON_CATEGORY_ORDER;
  }, [categoryOrder, stack.stackMode]);
  const multiActiveStepIndex = Math.max(
    0,
    MULTI_STACK_STEPS.findIndex((step) => step.id === multiActiveStep),
  );
  const isMultiMode = stack.stackMode === "multi";
  const isFinalMultiStep = multiActiveStepIndex >= MULTI_STACK_STEPS.length - 1;
  const isMultiCreationInProgress = isMultiMode && viewMode === "command";

  // ─── URL generation ──────────────────────────────────────────────────────

  const getStackUrl = (): string => {
    const stackToUse = adjustedStack || stack;
    const projectName = stackToUse.projectName || "my-app";
    const formattedProjectName = formatProjectName(projectName);
    return generateStackSharingUrl({ ...stackToUse, projectName: formattedProjectName });
  };

  const getPersistableStack = (): StackState => {
    const stackToUse = adjustedStack || stack;
    const projectName = stackToUse.projectName || "my-app";

    return {
      ...stackToUse,
      projectName: formatProjectName(projectName),
    };
  };

  // ─── Side effects ──────────────────────────────────────────────────────

  useEffect(() => {
    if (stack.ecosystem !== lastAppliedEcosystemRef.current) {
      suppressCompatibilityToastRef.current = true;
    }
  }, [stack.ecosystem]);

  useEffect(() => {
    if (adjustedStack) {
      const adjustedStackString = JSON.stringify(adjustedStack);

      if (lastAppliedStackString.current !== adjustedStackString) {
        startTransition(() => {
          if (!suppressCompatibilityToastRef.current && compatibilityAnalysis.changes.length > 0) {
            if (compatibilityAnalysis.changes.length === 1) {
              toast.info(compatibilityAnalysis.changes[0].message, { duration: 4000 });
            } else if (compatibilityAnalysis.changes.length > 1) {
              const message = `${compatibilityAnalysis.changes.length} compatibility adjustments made:\n${compatibilityAnalysis.changes.map((c) => `\u2022 ${c.message}`).join("\n")}`;
              toast.info(message, { duration: 5000 });
            }
          }
          suppressCompatibilityToastRef.current = false;
          setLastChanges(compatibilityAnalysis.changes);
          if (adjustedStack) {
            setStack(adjustedStack);
          }
          lastAppliedStackString.current = adjustedStackString;
          lastAppliedEcosystemRef.current = adjustedStack.ecosystem;
        });
      }
    }
  }, [adjustedStack, compatibilityAnalysis.changes, setStack]);

  useEffect(() => {
    const stackToUse = adjustedStack || stack;
    const projectName = stackToUse.projectName || "my-app";
    const formattedProjectName = formatProjectName(projectName);
    const cmd = generateStackCommand({ ...stackToUse, projectName: formattedProjectName });
    setCommand(cmd);
  }, [stack, adjustedStack]);

  useEffect(() => {
    if (!isMultiMode) {
      setMultiActiveStep("frontend");
    }
  }, [isMultiMode]);

  useEffect(() => {
    if (isMultiMode && (viewMode === "presets" || viewMode === "saved")) {
      setViewMode("command");
    }
  }, [isMultiMode, setViewMode, viewMode]);

  // ─── Handlers ───────────────────────────────────────────────────────────

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCompatibilityStackForCategory = (category: keyof typeof TECH_OPTIONS): StackState => {
    if (stack.stackMode !== "multi" || multiActiveStep !== "finalize") return stack;
    if (graphSelection.backend === "none") return stack;

    const backendCategories = getGraphBackendAdvancedCategoryOrder(graphSelection.backendEcosystem);
    const stackWithGraphBackend = {
      ...stack,
      backend: stack.backend === "none" ? ("hono" as StackState["backend"]) : stack.backend,
    };

    if (!backendCategories.includes(category)) return stackWithGraphBackend;

    return {
      ...stackWithGraphBackend,
      ecosystem: graphSelection.backendEcosystem as Ecosystem,
    };
  };

  const handleTechSelect = (category: keyof typeof TECH_OPTIONS, techId: string) => {
    if (!isOptionCompatible(getCompatibilityStackForCategory(category), category, techId)) return;

    startTransition(() => {
      setStack((currentStack: StackState) => {
        const update = getStackOptionUpdate(currentStack, category, techId);
        return Object.keys(update).length > 0 ? update : {};
      });
    });
  };

  const handleMultiActiveStepChange = (stepId: MultiStackStepId) => {
    setMultiActiveStep(stepId);
  };

  const handleMultiPreviousStep = () => {
    const previousStep = MULTI_STACK_STEPS[multiActiveStepIndex - 1];
    if (previousStep) {
      handleMultiActiveStepChange(previousStep.id);
    }
  };

  const handleMultiNextStep = () => {
    const nextStep = MULTI_STACK_STEPS[multiActiveStepIndex + 1];
    if (nextStep) {
      handleMultiActiveStepChange(nextStep.id);
    }
  };

  const enableMultiMode = () => {
    const specs = graphSelectionToSpecs(getGraphSelection(stack));
    setStack((current) => ({
      ...stackPatchFromGraphSpecs(specs),
      projectName: current.projectName,
    }));
  };

  const disableMultiMode = () => {
    setStack({ stackMode: "solo", stackPartSpecs: [] });
  };

  // Publish the creation mode to the global Navbar (which renders the
  // Solo / Multi-Ecosystem toggle in the header) and clear it on unmount.
  // Handlers are read through refs so the toggle always acts on the latest
  // stack, while we only re-publish when the mode itself changes.
  const enableMultiModeRef = useRef(enableMultiMode);
  const disableMultiModeRef = useRef(disableMultiMode);
  enableMultiModeRef.current = enableMultiMode;
  disableMultiModeRef.current = disableMultiMode;

  useEffect(() => {
    publishBuilderMode(stack.stackMode === "multi" ? "multi" : "solo", (mode) => {
      if (mode === "multi") {
        enableMultiModeRef.current();
      } else {
        disableMultiModeRef.current();
      }
    });
    return () => clearBuilderMode();
  }, [stack.stackMode]);

  const resetStack = () => {
    startTransition(() => {
      setStack(DEFAULT_STACK);
    });
  };

  const getRandomStack = () => {
    const randomStack: Partial<StackState> = {};
    for (const category of CATEGORY_ORDER) {
      const options = getVisibleOptions(
        stack,
        category as keyof typeof TECH_OPTIONS,
        TECH_OPTIONS[category as keyof typeof TECH_OPTIONS] || [],
      );
      if (options.length === 0) continue;
      const catKey = getStackKeyForCategory(category as keyof typeof TECH_OPTIONS);
      if (isMultiSelectCategory(category as OptionCategory)) {
        if (catKey === "webFrontend" || catKey === "nativeFrontend") {
          const randomIndex = Math.floor(Math.random() * options.length);
          const selectedOption = options[randomIndex].id;
          randomStack[catKey as "webFrontend" | "nativeFrontend"] = [selectedOption];
        } else {
          const numToPick = Math.floor(Math.random() * Math.min(options.length, 4));
          if (numToPick === 0) {
            (randomStack as Record<string, string[]>)[catKey] = [];
          } else {
            const shuffledOptions = [...options]
              .filter((opt) => opt.id !== "none")
              .sort(() => 0.5 - Math.random())
              .slice(0, numToPick);
            (randomStack as Record<string, string[]>)[catKey] = shuffledOptions.map(
              (opt) => opt.id,
            );
          }
        }
      } else {
        const randomIndex = Math.floor(Math.random() * options.length);
        (randomStack[catKey] as string) = options[randomIndex].id;
      }
    }
    startTransition(() => {
      setStack({
        ...(randomStack as StackState),
        projectName: stack.projectName || "my-app",
        stackMode: "solo",
        stackPartSpecs: [],
      });
    });
  };

  const applyPreset = (presetId: string) => {
    const preset = PRESET_TEMPLATES.find((template) => template.id === presetId);
    if (preset) {
      const fullStack = { ...DEFAULT_STACK, ...preset.stack } as StackState;
      startTransition(() => {
        setStack(fullStack);
      });
      toast.success(`Applied preset: ${preset.name}`);
    }
  };

  const persistSavedEntries = (entries: SavedStackEntry[]) => {
    setSavedStacks(entries);
    saveSavedStacks(entries);
  };

  const saveCurrentStack = (name: string) => {
    const nextEntry = buildSavedStackEntry(name, getPersistableStack());
    persistSavedEntries([nextEntry, ...savedStacks]);
    setIsSaveInputVisible(false);
    setSavePresetName("");
    toast.success(m.savedPresetSaved({ name: nextEntry.name }));
  };

  const loadSavedStack = (entryId: string) => {
    const entry = savedStacks.find((item) => item.id === entryId);
    if (!entry) return;

    startTransition(() => {
      setStack(entry.stack);
      setViewMode("command");
    });
    toast.success(m.savedPresetLoaded({ name: entry.name }));
  };

  const overwriteSavedStack = (entryId: string) => {
    setPendingUpdateEntryId(entryId);
  };

  const confirmOverwriteSavedStack = () => {
    const entryId = pendingUpdateEntryId;
    if (!entryId) return;

    const currentStack = getPersistableStack();
    const nextEntries = savedStacks.map((entry) =>
      entry.id === entryId
        ? {
            ...entry,
            stack: currentStack,
            updatedAt: new Date().toISOString(),
          }
        : entry,
    );

    persistSavedEntries(nextEntries);
    setPendingUpdateEntryId(null);
    const entryName = savedStacks.find((entry) => entry.id === entryId)?.name || "preset";
    toast.success(m.savedPresetUpdated({ name: entryName }));
  };

  const renameSavedStack = (entryId: string, name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      toast.error(m.savedPresetNameRequired());
      return;
    }

    const nextEntries = savedStacks.map((entry) =>
      entry.id === entryId
        ? {
            ...entry,
            name: trimmedName,
            updatedAt: new Date().toISOString(),
          }
        : entry,
    );

    persistSavedEntries(nextEntries);
    toast.success(m.savedPresetRenamed());
  };

  const duplicateSavedStack = (entryId: string, name: string) => {
    const sourceEntry = savedStacks.find((entry) => entry.id === entryId);
    if (!sourceEntry) return;

    const nextEntry = buildSavedStackEntry(name, sourceEntry.stack);
    persistSavedEntries([nextEntry, ...savedStacks]);
    toast.success(`Duplicated preset: ${sourceEntry.name}`);
  };

  const deleteSavedStack = (entryId: string) => {
    const entry = savedStacks.find((item) => item.id === entryId);
    if (!entry) return;

    persistSavedEntries(savedStacks.filter((item) => item.id !== entryId));
    toast.success(`Deleted preset: ${entry.name}`);
  };

  const pendingUpdateEntry =
    pendingUpdateEntryId === null
      ? null
      : savedStacks.find((entry) => entry.id === pendingUpdateEntryId) || null;

  const toggleSection = (categoryKey: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(categoryKey)) {
        next.delete(categoryKey);
      } else {
        next.add(categoryKey);
      }
      return next;
    });
  };

  // Sections shown in the navigation drawer — mirrors the rendered category sections.
  const navSections = useMemo(
    () =>
      displayedCategoryOrder
        .filter((categoryKey) => {
          if (categoryKey === "astroIntegration") return false;
          if (SHADCN_SUB_CATEGORIES.has(categoryKey)) return false;
          if (stack.ecosystem === "go" && categoryKey === "auth") return false;
          return (
            getCategoryRenderGroups(stack, categoryKey as keyof typeof TECH_OPTIONS).length > 0
          );
        })
        .map((categoryKey) => ({ key: categoryKey, name: getCategoryDisplayName(categoryKey) })),
    [displayedCategoryOrder, stack],
  );

  const goToSection = (categoryKey: string) => {
    // Expand the section if collapsed, then scroll it into view.
    setCollapsedSections((prev) => {
      if (!prev.has(categoryKey)) return prev;
      const next = new Set(prev);
      next.delete(categoryKey);
      return next;
    });
    setSidebarOpen(false);
    requestAnimationFrame(() => {
      sectionRefs.current[categoryKey]?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <TooltipProvider>
      <Dialog
        open={pendingUpdateEntry !== null}
        onOpenChange={(open) => {
          if (!open) {
            setPendingUpdateEntryId(null);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{m.builderUpdateSavedPreset()}</DialogTitle>
            <DialogDescription>
              {pendingUpdateEntry
                ? m.builderUpdatePresetDescriptionNamed({ name: pendingUpdateEntry.name })
                : m.builderUpdatePresetDescription()}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" onClick={() => setPendingUpdateEntryId(null)}>
              {m.builderCancel()}
            </Button>
            <Button type="button" onClick={confirmOverwriteSavedStack}>
              {m.builderUpdatePreset()}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <div className="relative flex h-full w-full flex-col overflow-hidden border-border text-foreground">
        {/* Single scroller: header + toolbar + content scroll together (header is not pinned) */}
        <div
          ref={scrollContainerRef}
          onScroll={(e) => {
            const next = e.currentTarget.scrollTop > 120;
            setShowScrollTop((prev) => (prev === next ? prev : next));
          }}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto"
        >
          {stack.stackMode !== "multi" && (
            <div className="relative shrink-0 border-b border-border/60 bg-fd-background">
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7">
                {ECOSYSTEMS.map((eco) => {
                  const isActive = stack.ecosystem === eco.id;
                  return (
                    <button
                      key={eco.id}
                      type="button"
                      data-testid={`ecosystem-${eco.id}`}
                      onClick={() => {
                        startTransition(() => {
                          setStack({
                            ecosystem: eco.id as Ecosystem,
                            stackMode: "solo",
                            stackPartSpecs: [],
                          });
                        });
                      }}
                      className={cn(
                        "group relative flex cursor-pointer items-center justify-center gap-2 px-3 py-3 transition-all sm:gap-2.5 sm:px-4 sm:py-3.5",
                        isActive
                          ? "bg-muted/40 text-foreground"
                          : "text-muted-foreground hover:bg-muted/30 hover:text-foreground",
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="ecosystem-indicator"
                          className={cn(
                            "absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r",
                            eco.color,
                          )}
                          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                        />
                      )}

                      <TechIcon
                        techId={eco.id}
                        icon={eco.icon}
                        name={eco.name}
                        className={cn(
                          "relative h-4.5 w-4.5 transition-all sm:h-5 sm:w-5",
                          isActive ? "scale-110" : "opacity-50 group-hover:opacity-75",
                        )}
                      />
                      <span
                        className={cn(
                          "relative hidden font-mono text-[11px] uppercase tracking-wide transition-all min-[480px]:inline sm:text-xs",
                          isActive ? "font-bold" : "",
                        )}
                      >
                        {eco.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div
            className={cn("flex", viewMode === "command" ? "" : "min-h-0 flex-1 overflow-hidden")}
          >
            {/* ─── Main Content Area ──────────────────────────────────────────── */}
            <main
              className={cn(
                "flex min-w-0 flex-1 flex-col",
                viewMode === "command" ? "" : "overflow-hidden",
              )}
            >
              <div className="flex shrink-0 items-center gap-1 border-border border-b bg-fd-background px-2 py-2 sm:gap-2 sm:px-4">
                {/* ─── Project name field ─────────────────────────────────────── */}
                <label
                  htmlFor="project-name"
                  className={cn(
                    "group relative inline-flex h-9 w-40 min-w-0 cursor-text items-center gap-2 rounded-none border bg-background/40 px-3 transition-colors hover:bg-card focus-within:bg-card sm:w-60",
                    projectNameError
                      ? "border-destructive focus-within:border-destructive focus-within:shadow-[0_0_0_4px_rgba(239,68,68,0.12)]"
                      : "border-border focus-within:border-foreground focus-within:shadow-[0_0_0_4px_rgba(24,24,27,0.05)] dark:focus-within:shadow-[0_0_0_4px_rgba(255,255,255,0.06)]",
                  )}
                >
                  <span className="pointer-events-none absolute -top-[7px] left-3 bg-fd-background px-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {m.builderProjectName()}
                  </span>
                  <input
                    id="project-name"
                    value={stack.projectName || ""}
                    onChange={(e) => setStack({ projectName: e.target.value })}
                    placeholder="my-app"
                    aria-label={m.builderProjectName()}
                    aria-invalid={projectNameError ? true : undefined}
                    title={
                      projectNameError ||
                      ((stack.projectName || "my-app").includes(" ")
                        ? m.builderWillSaveAs({
                            name: (stack.projectName || "my-app").replace(/\s+/g, "-"),
                          })
                        : undefined)
                    }
                    className={cn(
                      "min-w-0 flex-1 border-none bg-transparent p-0 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/50",
                      projectNameError && "text-destructive",
                    )}
                  />
                  <Pencil className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50 transition-colors group-focus-within:text-foreground" />
                </label>

                <div className="mx-1 h-6 w-px shrink-0 bg-border sm:mx-2" aria-hidden="true" />

                <button
                  type="button"
                  onClick={() => setViewMode("command")}
                  data-testid="tab-builder"
                  aria-pressed={viewMode === "command"}
                  data-state={viewMode === "command" ? "active" : "inactive"}
                  className={cn(
                    "flex cursor-pointer items-center gap-1 rounded-md px-1.5 py-1.5 font-mono text-[10px] uppercase tracking-wide transition-colors sm:px-2.5 sm:text-[11px]",
                    viewMode === "command"
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Hammer className="h-3 w-3" />
                  <span className="hidden min-[480px]:inline">{m.builderTabBuilder()}</span>
                </button>
                {!isMultiMode && (
                  <button
                    type="button"
                    onClick={() => setViewMode("presets")}
                    data-testid="tab-presets"
                    aria-pressed={viewMode === "presets"}
                    data-state={viewMode === "presets" ? "active" : "inactive"}
                    className={cn(
                      "flex cursor-pointer items-center gap-1 rounded-md px-1.5 py-1.5 font-mono text-[10px] uppercase tracking-wide transition-colors sm:px-2.5 sm:text-[11px]",
                      viewMode === "presets"
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <Zap className="h-3 w-3" />
                    <span className="hidden min-[480px]:inline">{m.builderTabPresets()}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setViewMode("preview")}
                  data-testid="tab-preview"
                  aria-pressed={viewMode === "preview"}
                  data-state={viewMode === "preview" ? "active" : "inactive"}
                  className={cn(
                    "flex cursor-pointer items-center gap-1 rounded-md px-1.5 py-1.5 font-mono text-[10px] uppercase tracking-wide transition-colors sm:px-2.5 sm:text-[11px]",
                    viewMode === "preview"
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Eye className="h-3 w-3" />
                  <span className="hidden min-[480px]:inline">{m.builderTabPreview()}</span>
                </button>
                {!isMultiMode && (
                  <button
                    type="button"
                    onClick={() => setViewMode("saved")}
                    data-testid="tab-saved"
                    aria-pressed={viewMode === "saved"}
                    data-state={viewMode === "saved" ? "active" : "inactive"}
                    className={cn(
                      "flex cursor-pointer items-center gap-1 rounded-md px-1.5 py-1.5 font-mono text-[10px] uppercase tracking-wide transition-colors sm:px-2.5 sm:text-[11px]",
                      viewMode === "saved"
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <Bookmark className="h-3 w-3" />
                    <span className="hidden min-[480px]:inline">{m.builderTabSaved()}</span>
                  </button>
                )}

                <div className="ml-auto flex items-center gap-1">
                  {/* Desktop action buttons */}
                  <AnimatePresence initial={false}>
                    {!isMultiMode && isSaveInputVisible && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 220, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="hidden overflow-hidden sm:block"
                      >
                        <div className="flex items-center gap-1 pr-1">
                          <Input
                            value={savePresetName}
                            onChange={(e) => setSavePresetName(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                saveCurrentStack(
                                  savePresetName || stack.projectName || m.savedPresetFallback(),
                                );
                              }
                              if (e.key === "Escape") {
                                setIsSaveInputVisible(false);
                                setSavePresetName("");
                              }
                            }}
                            placeholder={stack.projectName || m.savedPresetFallback()}
                            className="h-8 min-w-0"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              saveCurrentStack(
                                savePresetName || stack.projectName || m.savedPresetFallback(),
                              )
                            }
                            className="cursor-pointer rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            title={m.builderSavePreset()}
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="hidden items-center gap-1 sm:flex">
                    {!isMultiMode && (
                      <>
                        <Tooltip>
                          <TooltipTrigger
                            render={
                              <button
                                type="button"
                                onClick={() => {
                                  const nextVisible = !isSaveInputVisible;
                                  setIsSaveInputVisible(nextVisible);
                                  setSavePresetName(nextVisible ? stack.projectName || "" : "");
                                }}
                                title={m.builderSaveCurrentPreset()}
                                aria-label={m.builderSaveCurrentPreset()}
                                className={cn(
                                  "cursor-pointer rounded-md p-1.5 transition-colors",
                                  isSaveInputVisible
                                    ? "bg-primary/15 text-primary"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                )}
                              />
                            }
                          >
                            <Save className="h-3.5 w-3.5" />
                          </TooltipTrigger>
                          <TooltipContent>{m.builderSaveCurrentStackTooltip()}</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger
                            render={
                              <button
                                type="button"
                                onClick={resetStack}
                                title={m.builderResetDefaults()}
                                aria-label={m.builderResetDefaults()}
                                data-testid="btn-reset"
                                className="cursor-pointer rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                              />
                            }
                          >
                            <RefreshCw className="h-3.5 w-3.5" />
                          </TooltipTrigger>
                          <TooltipContent>{m.builderResetTooltip()}</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger
                            render={
                              <button
                                type="button"
                                onClick={getRandomStack}
                                title={m.builderRandomTitle()}
                                aria-label={m.builderRandomTitle()}
                                data-testid="btn-random"
                                className="cursor-pointer rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                              />
                            }
                          >
                            <Shuffle className="h-3.5 w-3.5" />
                          </TooltipTrigger>
                          <TooltipContent>{m.builderRandomTooltip()}</TooltipContent>
                        </Tooltip>
                      </>
                    )}
                    <ShareButton stackUrl={getStackUrl()} />
                    {!isMultiMode && (
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <button
                              type="button"
                              aria-label={m.builderSettings()}
                              title={m.builderSettings()}
                              className="cursor-pointer rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            />
                          }
                        >
                          <Settings className="h-3.5 w-3.5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-64 bg-fd-background">
                          <YoloToggle stack={stack} onToggle={(yolo) => setStack({ yolo })} />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>

                  {/* Mobile three-dot menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <button
                          type="button"
                          aria-label={m.builderMoreActions()}
                          title={m.builderMoreActions()}
                          className="flex items-center justify-center cursor-pointer rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:hidden"
                        />
                      }
                    >
                      <EllipsisVertical className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      sideOffset={8}
                      className="w-48 bg-fd-background"
                    >
                      {!isMultiMode && (
                        <>
                          <DropdownMenuItem
                            onClick={() => {
                              saveCurrentStack(stack.projectName || m.savedPresetFallback());
                            }}
                          >
                            <Save className="h-3.5 w-3.5" />
                            {m.builderSavePreset()}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={resetStack}>
                            <RefreshCw className="h-3.5 w-3.5" />
                            {m.builderResetDefaults()}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={getRandomStack}>
                            <Shuffle className="h-3.5 w-3.5" />
                            {m.builderRandomTitle()}
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuItem
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(getStackUrl());
                            toast.success(m.builderShareLinkCopied());
                          } catch {
                            toast.error(m.builderShareLinkFailed());
                          }
                        }}
                      >
                        <Link className="h-3.5 w-3.5" />
                        {m.builderCopyShareLink()}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {viewMode === "command" ? (
                <div className="p-3 pb-24 sm:p-4 sm:pb-28">
                  <CreationModeComposer
                    stack={stack}
                    onChange={setStack}
                    activeStep={multiActiveStep}
                    onActiveStepChange={handleMultiActiveStepChange}
                  />

                  {/* Category sections - all options for each category.
                      In multi mode these general settings are the final "Finalize" step. */}
                  {(stack.stackMode !== "multi" || multiActiveStep === "finalize") &&
                    displayedCategoryOrder.map((categoryKey) => {
                      // Skip astroIntegration - rendered conditionally after webFrontend
                      if (categoryKey === "astroIntegration") return null;

                      // Skip shadcn sub-categories - rendered conditionally after uiLibrary
                      if (SHADCN_SUB_CATEGORIES.has(categoryKey)) return null;

                      if (stack.ecosystem === "go" && categoryKey === "auth") return null;

                      const categoryOptionGroups = getCategoryRenderGroups(
                        stack,
                        categoryKey as keyof typeof TECH_OPTIONS,
                      );
                      const categoryDisplayName = getLocalizedCategoryDisplayName(
                        categoryKey,
                        getCategoryDisplayName(categoryKey),
                      );
                      const sectionCompatibilityNotes =
                        stack.ecosystem === "go" && categoryKey === "goAuth"
                          ? mergeCompatibilityNotes(
                              compatibilityAnalysis.notes.goAuth,
                              compatibilityAnalysis.notes.auth,
                            )
                          : compatibilityAnalysis.notes[categoryKey];

                      if (categoryOptionGroups.length === 0) return null;

                      const isSectionCollapsed = collapsedSections.has(categoryKey);
                      const sectionSelectedCount = getSelectedCount(
                        categoryKey as keyof typeof TECH_OPTIONS,
                        stack,
                      );

                      return (
                        <div key={categoryKey}>
                          <section
                            ref={(el) => {
                              sectionRefs.current[categoryKey] = el;
                            }}
                            id={`section-${categoryKey}`}
                            data-testid={`category-${categoryKey}`}
                            className="mb-6 scroll-mt-4 sm:mb-8"
                          >
                            <button
                              type="button"
                              onClick={() => toggleSection(categoryKey)}
                              data-testid={`category-toggle-${categoryKey}`}
                              className="mb-3 flex w-full cursor-pointer items-center gap-2 border-b border-border pb-2 text-left transition-opacity hover:opacity-80"
                            >
                              <Terminal className="h-4 w-4 shrink-0 text-muted-foreground sm:h-5 sm:w-5" />
                              <h2 className="flex-1 font-mono text-foreground text-sm sm:text-base">
                                {categoryDisplayName}
                              </h2>
                              {sectionCompatibilityNotes?.hasIssue && (
                                <InfoIcon className="h-4 w-4 shrink-0 text-amber-500" />
                              )}
                              {isSectionCollapsed && sectionSelectedCount > 0 && (
                                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 font-mono text-[10px] font-semibold text-primary-foreground">
                                  {sectionSelectedCount}
                                </span>
                              )}
                              <motion.div
                                animate={{ rotate: isSectionCollapsed ? 0 : 180 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                              </motion.div>
                            </button>
                            <AnimatePresence initial={false}>
                              {!isSectionCollapsed && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: "easeInOut" }}
                                  className="overflow-hidden"
                                >
                                  <CategoryHint categoryKey={categoryKey} />
                                  <div className="space-y-4">
                                    {categoryOptionGroups.map((group) => (
                                      <div key={group.key}>
                                        {group.heading && (
                                          <h3 className="mb-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                                            {group.heading}
                                          </h3>
                                        )}
                                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 2xl:grid-cols-4">
                                          {group.options.map((tech) => {
                                            const compatibilityStack =
                                              getCompatibilityStackForCategory(group.category);
                                            const isSelected = isSelectedCheck(
                                              stack,
                                              group.category,
                                              tech.id,
                                            );
                                            const isDisabled = !isOptionCompatible(
                                              compatibilityStack,
                                              group.category,
                                              tech.id,
                                            );
                                            const disabledReason = isDisabled
                                              ? getDisabledReason(
                                                  compatibilityStack,
                                                  group.category,
                                                  tech.id,
                                                )
                                              : null;

                                            return (
                                              <motion.div
                                                key={tech.id}
                                                data-testid={`option-${group.category}-${tech.id}`}
                                                className={cn(
                                                  "group relative cursor-pointer rounded-lg border p-3 transition-all sm:p-4",
                                                  isSelected
                                                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                                                    : isDisabled
                                                      ? "border-destructive/30 bg-destructive/5 opacity-50 hover:opacity-75"
                                                      : "border-border bg-fd-background hover:border-primary/40 hover:bg-gradient-to-br hover:from-primary/6 hover:to-transparent hover:shadow-[0_0_10px_0px_hsl(var(--primary)/0.10)]",
                                                )}
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleTechSelect(group.category, tech.id);
                                                }}
                                                title={disabledReason || undefined}
                                              >
                                                <div className="absolute top-2 right-2 flex items-center gap-1">
                                                  <TechResourceButtons
                                                    category={group.category}
                                                    techId={tech.id}
                                                  />
                                                  {tech.default && !isSelected && (
                                                    <span className="rounded-full bg-muted px-2 py-0.5 font-medium text-[10px] text-muted-foreground">
                                                      {m.builderDefault()}
                                                    </span>
                                                  )}
                                                  {tech.legacy && (
                                                    <Tooltip>
                                                      <TooltipTrigger
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="cursor-default"
                                                      >
                                                        <span className="rounded-sm border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 font-mono text-[9px] text-amber-500 dark:text-amber-400">
                                                          {m.builderLegacy()}
                                                        </span>
                                                      </TooltipTrigger>
                                                      <TooltipContent>
                                                        {m.builderLegacyTooltip()}
                                                      </TooltipContent>
                                                    </Tooltip>
                                                  )}
                                                </div>
                                                <div className="flex items-start gap-3">
                                                  {(tech.icon !== "" || ICON_REGISTRY[tech.id]) && (
                                                    <div className="flex shrink-0 flex-col items-center gap-1">
                                                      <div
                                                        className={cn(
                                                          "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                                                          isSelected
                                                            ? "bg-primary/10"
                                                            : "bg-muted/50 group-hover:bg-muted",
                                                        )}
                                                      >
                                                        <TechIcon
                                                          techId={tech.id}
                                                          icon={tech.icon}
                                                          name={tech.name}
                                                          className="h-5 w-5"
                                                        />
                                                      </div>
                                                    </div>
                                                  )}
                                                  <div className="min-w-0 flex-1 pt-0.5">
                                                    <span
                                                      className={cn(
                                                        "block font-semibold text-sm",
                                                        isSelected
                                                          ? "text-primary"
                                                          : "text-foreground",
                                                      )}
                                                    >
                                                      {tech.name}
                                                    </span>
                                                    <p className="mt-0.5 line-clamp-2 text-muted-foreground text-xs leading-relaxed">
                                                      {getLocalizedTechOption(tech).description}
                                                    </p>
                                                    {isDisabled && disabledReason && (
                                                      <DisabledReasonInline
                                                        reason={disabledReason}
                                                      />
                                                    )}
                                                  </div>
                                                </div>
                                              </motion.div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </section>

                          {/* shadcn/ui Configuration - shown only when shadcn-ui is selected */}
                          {categoryKey === "uiLibrary" && (
                            <AnimatePresence>
                              {stack.uiLibrary === "shadcn-ui" && (
                                <motion.section
                                  ref={(el) => {
                                    sectionRefs.current.shadcnBase = el;
                                  }}
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  data-testid="category-shadcnBase"
                                  className="mb-6 scroll-mt-4 sm:mb-8 overflow-hidden"
                                >
                                  <button
                                    type="button"
                                    onClick={() => toggleSection("shadcnBase")}
                                    data-testid="category-toggle-shadcnBase"
                                    className="mb-3 flex w-full items-center gap-2 border-b border-border pb-2 text-left transition-opacity hover:opacity-80"
                                  >
                                    <Terminal className="h-4 w-4 shrink-0 text-muted-foreground sm:h-5 sm:w-5" />
                                    <h2 className="flex-1 font-mono text-foreground text-sm sm:text-base">
                                      {m.builderShadcnConfiguration()}
                                    </h2>
                                    <motion.div
                                      animate={{
                                        rotate: collapsedSections.has("shadcnBase") ? 0 : 180,
                                      }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                    </motion.div>
                                  </button>
                                  <AnimatePresence initial={false}>
                                    {!collapsedSections.has("shadcnBase") && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                      >
                                        <div className="space-y-4">
                                          {(
                                            [
                                              {
                                                key: "shadcnBase" as const,
                                                label: getLocalizedCategoryDisplayName(
                                                  "shadcnBase",
                                                  "Base Library",
                                                ),
                                              },
                                              {
                                                key: "shadcnStyle" as const,
                                                label: getLocalizedCategoryDisplayName(
                                                  "shadcnStyle",
                                                  "Visual Style",
                                                ),
                                              },
                                              {
                                                key: "shadcnIconLibrary" as const,
                                                label: getLocalizedCategoryDisplayName(
                                                  "shadcnIconLibrary",
                                                  "Icon Library",
                                                ),
                                              },
                                              {
                                                key: "shadcnColorTheme" as const,
                                                label: getLocalizedCategoryDisplayName(
                                                  "shadcnColorTheme",
                                                  "Color Theme",
                                                ),
                                              },
                                              {
                                                key: "shadcnBaseColor" as const,
                                                label: getLocalizedCategoryDisplayName(
                                                  "shadcnBaseColor",
                                                  "Base Color",
                                                ),
                                              },
                                              {
                                                key: "shadcnFont" as const,
                                                label: getLocalizedCategoryDisplayName(
                                                  "shadcnFont",
                                                  "Font",
                                                ),
                                              },
                                              {
                                                key: "shadcnRadius" as const,
                                                label: getLocalizedCategoryDisplayName(
                                                  "shadcnRadius",
                                                  "Border Radius",
                                                ),
                                              },
                                            ] as const
                                          ).map(({ key, label }) => (
                                            <div key={key}>
                                              <h3 className="mb-2 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                                                {label}
                                              </h3>
                                              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 2xl:grid-cols-5">
                                                {(TECH_OPTIONS[key] || []).map((tech) => {
                                                  const isSelected =
                                                    stack[key as keyof StackState] === tech.id;
                                                  return (
                                                    <motion.div
                                                      key={tech.id}
                                                      data-testid={`option-${key}-${tech.id}`}
                                                      className={cn(
                                                        "group relative cursor-pointer rounded-lg border p-2.5 transition-all sm:p-3",
                                                        isSelected
                                                          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                                                          : "border-border bg-fd-background hover:border-primary/40 hover:bg-gradient-to-br hover:from-primary/6 hover:to-transparent hover:shadow-[0_0_10px_0px_hsl(var(--primary)/0.10)]",
                                                      )}
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleTechSelect(key, tech.id);
                                                      }}
                                                    >
                                                      <div className="absolute top-1.5 right-1.5 flex items-center gap-1">
                                                        <TechResourceButtons
                                                          category={key}
                                                          techId={tech.id}
                                                        />
                                                        {tech.default && !isSelected && (
                                                          <span className="rounded-full bg-muted px-1.5 py-0.5 font-medium text-[9px] text-muted-foreground">
                                                            {m.builderDefault()}
                                                          </span>
                                                        )}
                                                      </div>
                                                      <div className="flex items-start gap-2.5">
                                                        {key === "shadcnColorTheme" ||
                                                        key === "shadcnBaseColor" ? (
                                                          <div className="flex shrink-0 flex-col items-center gap-1">
                                                            <div
                                                              className={cn(
                                                                "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
                                                                isSelected
                                                                  ? "bg-primary/10"
                                                                  : "bg-muted/50 group-hover:bg-muted",
                                                              )}
                                                            >
                                                              <div
                                                                className={cn(
                                                                  "h-4 w-4 rounded-full bg-gradient-to-br",
                                                                  tech.color,
                                                                )}
                                                              />
                                                            </div>
                                                          </div>
                                                        ) : (
                                                          (tech.icon !== "" ||
                                                            ICON_REGISTRY[tech.id]) && (
                                                            <div className="flex shrink-0 flex-col items-center gap-1">
                                                              <div
                                                                className={cn(
                                                                  "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
                                                                  isSelected
                                                                    ? "bg-primary/10"
                                                                    : "bg-muted/50 group-hover:bg-muted",
                                                                )}
                                                              >
                                                                <TechIcon
                                                                  techId={tech.id}
                                                                  icon={tech.icon}
                                                                  name={tech.name}
                                                                  className="h-4 w-4"
                                                                />
                                                              </div>
                                                            </div>
                                                          )
                                                        )}
                                                        <div className="min-w-0 flex-1">
                                                          <span
                                                            className={cn(
                                                              "block font-semibold text-xs sm:text-sm",
                                                              isSelected
                                                                ? "text-primary"
                                                                : "text-foreground",
                                                            )}
                                                          >
                                                            {tech.name}
                                                          </span>
                                                          <p className="mt-0.5 line-clamp-1 text-muted-foreground text-[10px] sm:text-xs leading-relaxed">
                                                            {getLocalizedTechOption(tech).description}
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </motion.div>
                                                  );
                                                })}
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </motion.section>
                              )}
                            </AnimatePresence>
                          )}

                          {/* Astro Integration - shown only when Astro is selected, right after webFrontend */}
                          {categoryKey === "webFrontend" && (
                            <AnimatePresence>
                              {stack.webFrontend.includes("astro") && (
                                <motion.section
                                  ref={(el) => {
                                    sectionRefs.current.astroIntegration = el;
                                  }}
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  data-testid="category-astroIntegration"
                                  className="mb-6 scroll-mt-4 sm:mb-8 overflow-hidden"
                                >
                                  <div className="mb-3 flex items-center gap-2 border-border border-b pb-2">
                                    <Terminal className="h-4 w-4 shrink-0 text-muted-foreground sm:h-5 sm:w-5" />
                                    <h2 className="font-mono text-foreground text-sm sm:text-base">
                                      {m.builderAstroIntegration()}
                                    </h2>
                                  </div>
                                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 2xl:grid-cols-4">
                                    {(TECH_OPTIONS.astroIntegration || []).map((tech) => {
                                      const isSelected = stack.astroIntegration === tech.id;
                                      const isDisabled = !isOptionCompatible(
                                        stack,
                                        "astroIntegration",
                                        tech.id,
                                      );
                                      const disabledReason = isDisabled
                                        ? getDisabledReason(stack, "astroIntegration", tech.id)
                                        : null;

                                      return (
                                        <motion.div
                                          key={tech.id}
                                          data-testid={`option-astroIntegration-${tech.id}`}
                                          className={cn(
                                            "group relative cursor-pointer rounded-lg border p-3 transition-all sm:p-4",
                                            isSelected
                                              ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                                              : isDisabled
                                                ? "border-destructive/30 bg-destructive/5 opacity-50 hover:opacity-75"
                                                : "border-border bg-fd-background hover:border-primary/40 hover:bg-gradient-to-br hover:from-primary/6 hover:to-transparent hover:shadow-[0_0_10px_0px_hsl(var(--primary)/0.10)]",
                                          )}
                                          whileHover={{ scale: 1.01 }}
                                          whileTap={{ scale: 0.99 }}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleTechSelect("astroIntegration", tech.id);
                                          }}
                                          title={disabledReason || undefined}
                                        >
                                          {tech.default && !isSelected && (
                                            <span className="absolute top-2 right-2 rounded-full bg-muted px-2 py-0.5 font-medium text-[10px] text-muted-foreground">
                                              {m.builderDefault()}
                                            </span>
                                          )}
                                          {tech.legacy && (
                                            <Tooltip>
                                              <TooltipTrigger
                                                onClick={(e) => e.stopPropagation()}
                                                className="absolute top-2 right-2 cursor-default"
                                              >
                                                <span className="rounded-sm border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 font-mono text-[9px] text-amber-500 dark:text-amber-400">
                                                  {m.builderLegacy()}
                                                </span>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                {m.builderLegacyTooltip()}
                                              </TooltipContent>
                                            </Tooltip>
                                          )}
                                          <div className="flex items-start gap-3">
                                            {(tech.icon !== "" || ICON_REGISTRY[tech.id]) && (
                                              <div className="flex shrink-0 flex-col items-center gap-1">
                                                <div
                                                  className={cn(
                                                    "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                                                    isSelected
                                                      ? "bg-primary/10"
                                                      : "bg-muted/50 group-hover:bg-muted",
                                                  )}
                                                >
                                                  <TechIcon
                                                    techId={tech.id}
                                                    icon={tech.icon}
                                                    name={tech.name}
                                                    className="h-5 w-5"
                                                  />
                                                </div>
                                              </div>
                                            )}
                                            <div className="min-w-0 flex-1 pt-0.5">
                                              <span
                                                className={cn(
                                                  "block font-semibold text-sm",
                                                  isSelected ? "text-primary" : "text-foreground",
                                                )}
                                              >
                                                {tech.name}
                                              </span>
                                              <p className="mt-0.5 line-clamp-2 text-muted-foreground text-xs leading-relaxed">
                                                {getLocalizedTechOption(tech).description}
                                              </p>
                                              {isDisabled && disabledReason && (
                                                <DisabledReasonInline reason={disabledReason} />
                                              )}
                                            </div>
                                          </div>
                                        </motion.div>
                                      );
                                    })}
                                  </div>
                                </motion.section>
                              )}
                            </AnimatePresence>
                          )}
                        </div>
                      );
                    })}

                  <div className="h-10" />
                </div>
              ) : viewMode === "preview" ? (
                <div className="min-h-0 flex-1 overflow-hidden">
                  <Suspense
                    fallback={
                      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                        {m.builderLoadingPreview()}
                      </div>
                    }
                  >
                    <PreviewPanel
                      stack={adjustedStack || stack}
                      selectedFilePath={selectedFile || null}
                      onSelectFile={setSelectedFile}
                    />
                  </Suspense>
                </div>
              ) : viewMode === "presets" ? (
                <div className="min-h-0 flex-1 overflow-hidden">
                  <PresetsPanel
                    stack={adjustedStack || stack}
                    ecosystem={stack.ecosystem}
                    onApplyPreset={applyPreset}
                    onCustomizePreset={(presetId) => {
                      applyPreset(presetId);
                      setViewMode("command");
                    }}
                  />
                </div>
              ) : (
                <div className="min-h-0 flex-1 overflow-hidden">
                  <SavedStacksPanel
                    entries={savedStacks}
                    onLoadEntry={loadSavedStack}
                    onOverwriteEntry={overwriteSavedStack}
                    onDeleteEntry={deleteSavedStack}
                    onRenameEntry={renameSavedStack}
                    onDuplicateEntry={duplicateSavedStack}
                  />
                </div>
              )}
            </main>
          </div>
        </div>

        {/* ─── Floating command bar ─────────────────────────────────────────── */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 bg-gradient-to-t from-background via-background/85 to-transparent px-4 pt-6 pb-4 sm:px-6 sm:pb-5">
          <div className="pointer-events-auto mx-auto flex w-full max-w-5xl items-center">
            {viewMode === "command" && (
              <button
                type="button"
                onClick={() => setSidebarOpen((open) => !open)}
                aria-label={m.builderToggleSectionNavigation()}
                aria-pressed={sidebarOpen}
                title={m.builderSectionNavigation()}
                className="mr-2.5 flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-[14px] border border-transparent bg-[#18181B] text-[#FAFAF7] shadow-[0_1px_0_rgba(24,24,27,0.05),0_6px_18px_rgba(24,24,27,0.06)] transition-colors hover:bg-[#26262b] dark:border-white/10 dark:bg-[#1a1a1a] dark:hover:bg-[#242429]"
              >
                <PanelLeft className="h-4 w-4" />
              </button>
            )}
            <div
              className={cn(
                "flex h-12 min-w-0 flex-1 items-center rounded-[14px] border border-transparent bg-[#18181B] font-mono text-[12.5px] text-[#FAFAF7] shadow-[0_1px_0_rgba(24,24,27,0.05),0_6px_18px_rgba(24,24,27,0.06)] dark:border-white/10 dark:bg-[#1a1a1a]",
                isMultiCreationInProgress ? "gap-2 pr-1.5 pl-2" : "gap-2.5 pr-1.5 pl-4",
              )}
            >
              {isMultiCreationInProgress && (
                <>
                  {multiActiveStepIndex > 0 && (
                    <button
                      type="button"
                      data-testid="multi-step-back"
                      aria-label={m.builderPreviousStep()}
                      onClick={handleMultiPreviousStep}
                      className="flex h-9 shrink-0 cursor-pointer items-center gap-1 rounded-[9px] px-2.5 text-[11.5px] font-medium text-[#FAFAF7] transition-colors hover:bg-white/10"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span className="hidden min-[420px]:inline">{m.builderBack()}</span>
                    </button>
                  )}
                  {!isFinalMultiStep && (
                    <span className="shrink-0 text-[11.5px] font-semibold text-[#C6E853] select-none">
                      {multiActiveStepIndex + 1}/{MULTI_STACK_STEPS.length}
                    </span>
                  )}
                  <span className="mx-0.5 h-5 w-px shrink-0 bg-white/10" aria-hidden="true" />
                </>
              )}
              <span className="shrink-0 font-medium text-[#C6E853] select-none">$</span>
              <code
                data-testid="command-output"
                className={cn(
                  "no-scrollbar min-w-0 flex-1 overflow-x-auto whitespace-nowrap",
                  isMultiCreationInProgress && !isFinalMultiStep
                    ? "text-[11px] text-[rgba(250,250,247,0.5)]"
                    : "text-[12.5px] text-[rgba(250,250,247,0.88)]",
                )}
              >
                {command}
              </code>
              {isMultiCreationInProgress && !isFinalMultiStep ? (
                <>
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    aria-label={copied ? m.builderCommandCopied() : m.builderCopyCommand()}
                    title={m.builderCopyPartialCommand()}
                    className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-[9px] text-[rgba(250,250,247,0.7)] transition-colors hover:bg-white/10 hover:text-[#FAFAF7]"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <ClipboardCopy className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <button
                    type="button"
                    data-testid="multi-step-next"
                    onClick={handleMultiNextStep}
                    className="border-beam flex h-10 w-32 shrink-0 cursor-pointer items-center justify-center rounded-[11px] bg-[linear-gradient(90deg,#C6E853,#2f7df4,#C6E853)] bg-[length:200%_100%] p-px text-[11.5px] font-semibold text-[#2A3303] shadow-[0_0_24px_rgba(198,232,83,0.22)] transition-transform hover:scale-[1.02] min-[420px]:w-40 sm:w-48"
                  >
                    <span className="flex h-full w-full items-center justify-center gap-2 rounded-[10px] bg-[#C6E853] px-4 transition-colors hover:bg-[#d2ee72]">
                      <span className="hidden min-[420px]:inline">{m.builderNextStep()}</span>
                      <span className="min-[420px]:hidden">{m.builderNext()}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={copyToClipboard}
                  aria-label={copied ? m.builderCommandCopied() : m.builderCopyCommand()}
                  className={cn(
                    "inline-flex h-10 w-32 shrink-0 cursor-pointer items-center justify-center rounded-[11px] p-px text-[11.5px] font-semibold text-[#2A3303] transition-transform hover:scale-[1.02] min-[420px]:w-40 sm:w-48",
                    // The animated gradient border + glow is a multi-ecosystem
                    // affordance; solo keeps a plain solid lime copy button.
                    isMultiMode
                      ? "border-beam bg-[linear-gradient(90deg,#C6E853,#2f7df4,#C6E853)] bg-[length:200%_100%] shadow-[0_0_24px_rgba(198,232,83,0.22)]"
                      : "bg-[#C6E853] hover:bg-[#d2ee72]",
                  )}
                >
                  <span className="flex h-full w-full items-center justify-center gap-2 rounded-[10px] bg-[#C6E853] px-4 transition-colors hover:bg-[#d2ee72]">
                    {copied ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <ClipboardCopy className="h-3.5 w-3.5" />
                    )}
                    <span>{copied ? m.navCopied() : m.navCopy()}</span>
                  </span>
                </button>
              )}
            </div>
            {viewMode === "command" && (
              <button
                type="button"
                onClick={scrollToTop}
                aria-label={m.builderScrollToTop()}
                title={m.builderScrollToTop()}
                tabIndex={showScrollTop ? 0 : -1}
                aria-hidden={!showScrollTop}
                className={cn(
                  "ml-2.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-transparent bg-[#18181B] text-[#FAFAF7] shadow-[0_1px_0_rgba(24,24,27,0.05),0_6px_18px_rgba(24,24,27,0.06)] transition-all duration-200 ease-out dark:border-white/10 dark:bg-[#1a1a1a]",
                  showScrollTop
                    ? "scale-100 cursor-pointer opacity-100 hover:bg-[#26262b] dark:hover:bg-[#242429]"
                    : "pointer-events-none scale-90 opacity-0",
                )}
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* ─── Section navigation drawer (toggled, builder view only) ──────── */}
        {viewMode === "command" && (
          <>
            <button
              type="button"
              aria-label={m.builderCloseSectionNavigation()}
              tabIndex={sidebarOpen ? 0 : -1}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "absolute inset-0 z-50 bg-black/30 transition-opacity duration-200",
                sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            />
            <aside
              aria-label={m.builderSectionNavigation()}
              inert={!sidebarOpen}
              className={cn(
                "absolute inset-y-0 left-0 z-50 flex w-64 max-w-[80%] flex-col border-border border-r bg-fd-background shadow-xl transition-transform duration-200 ease-out",
                sidebarOpen ? "translate-x-0" : "-translate-x-full",
              )}
            >
              <div className="flex shrink-0 items-center justify-between border-border border-b px-4 py-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {m.builderSections()}
                </span>
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  aria-label={m.builderCloseSectionNavigation()}
                  className="cursor-pointer rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="no-scrollbar min-h-0 flex-1 overflow-y-auto py-1.5">
                {navSections.map((section) => {
                  const count = getSelectedCount(section.key as keyof typeof TECH_OPTIONS, stack);
                  return (
                    <button
                      key={section.key}
                      type="button"
                      onClick={() => goToSection(section.key)}
                      className="flex w-full cursor-pointer items-center justify-between gap-2 px-4 py-2 text-left font-mono text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <span className="truncate">{section.name}</span>
                      {count > 0 && (
                        <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 font-mono font-semibold text-[10px] text-primary-foreground">
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </aside>
          </>
        )}
      </div>
    </TooltipProvider>
  );
};

export default StackBuilder;
