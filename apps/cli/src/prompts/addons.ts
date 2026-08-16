import { DEFAULT_CONFIG } from "../constants";
import {
  type Addons,
  AddonsSchema,
  type API,
  type Auth,
  type Backend,
  BackendSchema,
  type Frontend,
  FrontendSchema,
  getToolingCapability,
  getSelectedToolingOption,
  getToolingSelectionOptions,
  hasVitePlusWorkspaceRoot,
  legacyProjectConfigToStackParts,
  type ProjectConfig,
  type Runtime,
  TOOLING_CATEGORIES,
  type ToolingCategoryId,
} from "../types";
import { getCompatibleAddons, validateAddonCompatibility } from "../utils/compatibility-rules";
import { exitCancelled } from "../utils/errors";
import { isCancel, navigableMultiselect, navigableSelect } from "./navigable";

function validateCapability(
  toolId: Addons,
  frontends: Frontend[],
  auth?: Auth,
  backend?: Backend,
  runtime?: Runtime,
  api?: API,
  context: Partial<ProjectConfig> = { ecosystem: "typescript" },
) {
  return validateAddonCompatibility(
    toolId,
    frontends,
    auth,
    backend,
    runtime,
    context.ecosystem ?? "typescript",
    context.rustFrontend,
    context.javaWebFramework,
    context.database,
    api,
    context.pythonWebFramework,
    context.goWebFramework,
    context.rustWebFramework,
    context.rustApi,
    context.goApi,
    context.javaApi,
    hasVitePlusWorkspaceRoot(context.stackParts),
  );
}

export function getCompatibleAddonsForPrompt(
  allCapabilities: Addons[],
  frontends: Frontend[],
  existingCapabilities: Addons[] = [],
  auth?: Auth,
  backend?: Backend,
  runtime?: Runtime,
  api?: API,
  context: Partial<ProjectConfig> = { ecosystem: "typescript" },
) {
  return getCompatibleAddons(
    allCapabilities,
    frontends,
    existingCapabilities,
    auth,
    backend,
    runtime,
    api,
    context.ecosystem ?? "typescript",
    context,
  );
}

export function getAddonGroup(toolId: Addons) {
  return TOOLING_CATEGORIES.find((category) =>
    getToolingSelectionOptions(category.id).some((selection) => selection.toolIds.includes(toolId)),
  )?.label;
}

type CapabilityPromptContext = {
  frontends: Frontend[];
  existing: Addons[];
  auth?: Auth;
  backend?: Backend;
  runtime?: Runtime;
  api?: API;
  config: Partial<ProjectConfig>;
  additionsOnly: boolean;
};

function getCompatibleSelections(
  category: ToolingCategoryId,
  context: CapabilityPromptContext,
  selected: readonly Addons[],
) {
  return getToolingSelectionOptions(category).filter((selection) => {
    if (
      context.additionsOnly &&
      selection.toolIds.length > 0 &&
      selection.toolIds.every((toolId) => context.existing.includes(toolId as Addons))
    ) {
      return false;
    }
    if (
      selected.includes("vite-plus") &&
      (category === "workspaceRunner" || category === "codeQuality" || category === "gitHooks")
    ) {
      return selection.toolIds.length === 0;
    }
    return selection.toolIds.every((toolId) => {
      const parsed = AddonsSchema.safeParse(toolId);
      if (!parsed.success) return false;
      return validateCapability(
        parsed.data,
        context.frontends,
        context.auth,
        context.backend,
        context.runtime,
        context.api,
        context.config,
      ).isCompatible;
    });
  });
}

async function promptCapabilities(
  context: CapabilityPromptContext,
  categories = TOOLING_CATEGORIES,
  ownerLabel?: string,
) {
  const selected = [...context.existing];

  for (const category of categories) {
    const options = getCompatibleSelections(category.id, context, selected);
    if (options.length === 0) continue;

    if (category.selectionMode === "single") {
      const current = getSelectedToolingOption(category.id, selected);
      const response = await navigableSelect<string>({
        message: ownerLabel ? `${category.label} · ${ownerLabel}` : category.label,
        options: options.map((selection) => ({
          value: selection.id,
          label: selection.label,
          hint: selection.description,
        })),
        initialValue: context.additionsOnly ? undefined : current?.id,
      });
      if (isCancel(response)) return exitCancelled("Operation cancelled");

      const selectedOption = options.find((selection) => selection.id === response);
      if (!selectedOption) continue;
      const categoryToolIds = new Set(
        getToolingSelectionOptions(category.id).flatMap((selection) => selection.toolIds),
      );
      for (let index = selected.length - 1; index >= 0; index -= 1) {
        if (categoryToolIds.has(selected[index])) selected.splice(index, 1);
      }
      for (const toolId of selectedOption.toolIds) {
        const parsed = AddonsSchema.safeParse(toolId);
        if (parsed.success && !selected.includes(parsed.data)) selected.push(parsed.data);
      }
      continue;
    }

    const response = await navigableMultiselect<string>({
      message: ownerLabel ? `${category.label} · ${ownerLabel}` : category.label,
      options: options.map((selection) => ({
        value: selection.id,
        label: selection.label,
        hint: selection.description,
      })),
      initialValues: context.additionsOnly
        ? []
        : options
            .filter((selection) =>
              selection.toolIds.every((toolId) => selected.includes(toolId as Addons)),
            )
            .map((selection) => selection.id),
      required: false,
    });
    if (isCancel(response)) return exitCancelled("Operation cancelled");

    const categoryToolIds = new Set(options.flatMap((selection) => selection.toolIds));
    for (let index = selected.length - 1; index >= 0; index -= 1) {
      if (categoryToolIds.has(selected[index])) selected.splice(index, 1);
    }
    for (const selectionId of response) {
      const selection = options.find((option) => option.id === selectionId);
      for (const toolId of selection?.toolIds ?? []) {
        const parsed = AddonsSchema.safeParse(toolId);
        if (parsed.success && !selected.includes(parsed.data)) selected.push(parsed.data);
      }
    }
  }

  return selected;
}

export async function getAppPlatformsChoice(_legacyAddons?: Addons[], _frontends?: Frontend[]) {
  return [] as Addons[];
}

export async function getAddonsChoice(
  legacyAddons?: Addons[],
  frontends: Frontend[] = [],
  auth?: Auth,
  backend?: Backend,
  runtime?: Runtime,
  api?: API,
  config: Partial<ProjectConfig> = { ecosystem: "typescript" },
) {
  if (legacyAddons !== undefined) return legacyAddons;
  return promptCapabilities({
    frontends,
    existing: [...DEFAULT_CONFIG.addons],
    auth,
    backend,
    runtime,
    api,
    config,
    additionsOnly: false,
  });
}

export async function getAddonsToAdd(
  frontend: Frontend[],
  existingAddons: Addons[] = [],
  auth?: Auth,
  backend?: Backend,
  runtime?: Runtime,
  api?: API,
  config: Partial<ProjectConfig> = { ecosystem: "typescript" },
) {
  const selected = await promptCapabilities({
    frontends: frontend,
    existing: existingAddons,
    auth,
    backend,
    runtime,
    api,
    config,
    additionsOnly: true,
  });
  return selected.filter((toolId) => !existingAddons.includes(toolId));
}

export async function getCapabilityPartSpecsToAdd(config: Partial<ProjectConfig>) {
  const parts = (
    config.stackParts?.length ? config.stackParts : legacyProjectConfigToStackParts(config)
  ).filter((part) => part.source !== "provided");
  const rootCategories = TOOLING_CATEGORIES.filter((category) => !category.ownerRole);
  const rootExisting = parts.flatMap((part) => {
    const capability = getToolingCapability(part.toolId);
    return capability && capability.role === part.role && !part.ownerPartId
      ? [part.toolId as Addons]
      : [];
  });
  const typeScriptFrontends = parts
    .filter(
      (part) => part.role === "frontend" && part.ecosystem === "typescript" && !part.ownerPartId,
    )
    .flatMap((part) => {
      const frontend = FrontendSchema.safeParse(part.toolId);
      return frontend.success ? [{ part, frontend: frontend.data }] : [];
    });
  const typeScriptBackends = parts
    .filter(
      (part) => part.role === "backend" && part.ecosystem === "typescript" && !part.ownerPartId,
    )
    .flatMap((part) => {
      const backend = BackendSchema.safeParse(part.toolId);
      return backend.success ? [{ part, backend: backend.data }] : [];
    });
  const rootSelected = await promptCapabilities(
    {
      frontends: typeScriptFrontends.map(({ frontend }) => frontend),
      existing: rootExisting,
      auth: config.auth,
      backend: typeScriptBackends[0]?.backend ?? config.backend,
      runtime: config.runtime,
      api: config.api,
      config,
      additionsOnly: true,
    },
    rootCategories,
  );
  const specs: string[] = rootSelected
    .filter((toolId) => !rootExisting.includes(toolId))
    .flatMap((toolId) => {
      const capability = getToolingCapability(toolId);
      return capability ? [`${capability.role}:${capability.ecosystem}:${toolId}`] : [];
    });

  const ownerGroups = [
    ...typeScriptFrontends.map(({ part, frontend }) => ({
      part,
      ownerRole: "frontend" as const,
      frontends: [frontend],
      backend: config.backend,
    })),
    ...typeScriptBackends.map(({ part, backend }) => ({
      part,
      ownerRole: "backend" as const,
      frontends: typeScriptFrontends.map(({ frontend }) => frontend),
      backend,
    })),
  ];
  for (const owner of ownerGroups) {
    const categories = TOOLING_CATEGORIES.filter(
      (category) => category.ownerRole === owner.ownerRole,
    );
    const existing = parts.flatMap((part) => {
      const capability = getToolingCapability(part.toolId);
      return capability && capability.role === part.role && part.ownerPartId === owner.part.id
        ? [part.toolId as Addons]
        : [];
    });
    const selected = await promptCapabilities(
      {
        frontends: owner.frontends,
        existing,
        auth: config.auth,
        backend: owner.backend,
        runtime: config.runtime,
        api: config.api,
        config,
        additionsOnly: true,
      },
      categories,
      owner.part.toolId,
    );
    const sameRoleOwners = parts.filter(
      (part) => part.role === owner.ownerRole && !part.ownerPartId,
    );
    const ownerSelector = sameRoleOwners.length > 1 ? owner.part.id : owner.ownerRole;
    for (const toolId of selected.filter((toolId) => !existing.includes(toolId))) {
      const capability = getToolingCapability(toolId);
      if (capability) {
        specs.push(`${ownerSelector}.${capability.role}:${capability.ecosystem}:${toolId}`);
      }
    }
  }

  return specs;
}
