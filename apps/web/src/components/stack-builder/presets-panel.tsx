import {
  applyPresetOptions,
  getPreset,
  getStarterTrackCatalog,
  PACKAGE_MANAGER_COMMANDS,
  PRESET_CATEGORIES,
  PRESET_DEFINITIONS,
  type PresetDefinition,
  type PresetOptionChoice,
  type PresetOptionSelection,
  type StarterTrackCatalogEntry,
  type StarterTrackFilters,
} from "@better-fullstack/types";
import { type ReactNode, useMemo, useState } from "react";
import {
  TbCheck as Check,
  TbCopy as Copy,
  TbChevronDown as ChevronDown,
  TbPencil as Pencil,
  TbBolt as Zap,
} from "react-icons/tb";

import type { StackState } from "@/lib/stack/constant";

import { useCapabilityEvidenceInventory } from "@/components/stack-builder/capability-evidence-badge";
import { TechIcon } from "@/components/stack-builder/tech-icon";
import { getRelevantStackKeys } from "@/components/stack-builder/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getLocalizedPresetTemplate } from "@/lib/i18n/builder-copy";
import { cn } from "@/lib/platform/utils";
import { resolvePresetStack } from "@/lib/stack/preset-stack";
import { DEFAULT_STACK } from "@/lib/stack/stack-defaults";
import { ICON_REGISTRY } from "@/lib/stack/tech-icons";
import { m } from "@/paraglide/messages.js";

interface PresetsPanelProps {
  stack: StackState;
  ecosystem: string;
  onApplyPreset: (presetId: string, options?: PresetOptionSelection) => void;
  onCustomizePreset: (presetId: string, options?: PresetOptionSelection) => void;
  /** Read from the URL. The page has no control for them, but shared filtered links still narrow. */
  starterTrackFilters: StarterTrackFilters;
}

/** Stack keys worth showing on a card, per ecosystem. */
const HIGHLIGHT_KEYS = {
  typescript: ["backend", "database", "orm", "api", "auth", "uiLibrary"],
  "react-native": ["backend", "database", "orm", "api", "auth"],
  rust: ["rustWebFramework", "rustFrontend", "rustOrm", "rustApi", "rustCli"],
  python: ["pythonWebFramework", "pythonOrm", "pythonAi", "pythonApi", "pythonTaskQueue"],
  go: ["goWebFramework", "goOrm", "goApi", "goCli", "goLogging"],
} as const satisfies Record<string, readonly (keyof StackState)[]>;

function getPresetHighlights(presetStack: Partial<StackState>, ecosystem: string): string[] {
  const highlights: string[] = [];

  for (const fe of presetStack.webFrontend ?? []) {
    if (fe !== "none") highlights.push(fe);
  }
  for (const n of presetStack.nativeFrontend ?? []) {
    if (n !== "none") highlights.push(n);
  }
  const keys =
    ecosystem in HIGHLIGHT_KEYS ? HIGHLIGHT_KEYS[ecosystem as keyof typeof HIGHLIGHT_KEYS] : [];
  for (const key of keys) {
    const val = presetStack[key];
    if (typeof val === "string" && val !== "none") highlights.push(val);
  }

  // Icon-only cards: a framework and its built-in backend share a logo, so show it once.
  const seen = new Set<string>();
  return highlights.filter((tech) => {
    const config = ICON_REGISTRY[tech];
    const icon = config ? (config.type === "si" ? config.slug : config.src) : tech;
    if (seen.has(icon)) return false;
    seen.add(icon);
    return true;
  });
}

function isPresetActive(presetStack: Partial<StackState>, currentStack: StackState): boolean {
  // Compare against what applying the preset produces, not against its raw definition.
  const applied = resolvePresetStack({ ...DEFAULT_STACK, ...presetStack } as StackState);
  // Starter tracks carry every field, including other languages' defaults that the builder
  // rewrites for the active language. Only fields that mean something for this language count.
  const relevant = new Set<keyof StackState>([
    ...getRelevantStackKeys(applied.ecosystem),
    "javaLanguage",
    "stackMode",
    "stackPartSpecs",
  ]);

  for (const key of Object.keys(presetStack) as (keyof StackState)[]) {
    if (!relevant.has(key)) continue;
    const presetVal = applied[key];
    const currentVal = currentStack[key];

    if (Array.isArray(presetVal) && Array.isArray(currentVal)) {
      if (presetVal.length !== currentVal.length || presetVal.some((v, i) => v !== currentVal[i])) {
        return false;
      }
    } else if (presetVal !== currentVal) {
      return false;
    }
  }

  return true;
}

function getStarterTrackName(track: Pick<StarterTrackCatalogEntry, "id">) {
  switch (track.id) {
    case "saas-app":
      return m.presetTrackSaasName();
    case "ai-agent-app":
      return m.presetTrackAiAgentName();
    case "rest-api":
      return m.presetTrackRestApiName();
    case "java-api":
      return m.presetTrackJavaApiName();
    case "rust-backend":
      return m.presetTrackRustBackendName();
    case "mobile-app":
      return m.presetTrackMobileAppName();
    case "internal-tool":
      return m.presetTrackInternalToolName();
  }
}

const FEATURED_CATEGORY = "future";

interface PresetCardProps {
  preset: PresetDefinition;
  stack: StackState;
  ecosystem: string;
  title?: string;
  onApplyPreset: (presetId: string) => void;
  onCustomizePreset: (presetId: string) => void;
  starterTrack?: StarterTrackCatalogEntry;
}

function PresetCard({
  preset,
  stack,
  ecosystem,
  title,
  onApplyPreset,
  onCustomizePreset,
  starterTrack,
}: PresetCardProps) {
  const localizedPreset = getLocalizedPresetTemplate(preset);
  const active = isPresetActive(preset.stack, stack);
  const highlights = getPresetHighlights(preset.stack, ecosystem);
  const verified =
    starterTrack?.evidence.level === "runtime-verified" &&
    starterTrack.evidence.freshness === "current";

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-xl border transition-colors",
        active
          ? "border-ink bg-ink/[0.05] dark:border-brand/80 dark:bg-brand/[0.08]"
          : "border-foreground/10 bg-foreground/[0.03] hover:border-foreground/25 hover:bg-foreground/[0.06]",
      )}
    >
      <button
        type="button"
        onClick={() => onApplyPreset(preset.id)}
        className="flex flex-1 cursor-pointer flex-col gap-4 rounded-xl p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand sm:p-5"
      >
        <span className="space-y-1.5 pr-8">
          <span
            className={cn(
              "flex items-center gap-2 font-mono text-base font-bold tracking-[-0.02em]",
              active ? "text-ink dark:text-brand" : "text-foreground",
            )}
          >
            {title ?? localizedPreset.name}
            {active && <Check className="size-4 shrink-0" aria-hidden />}
          </span>
          <span className="block text-muted-foreground text-sm leading-snug">
            {localizedPreset.description}
          </span>
        </span>

        <span className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2">
          {highlights.map((tech) => (
            <span key={tech} title={tech} className="flex items-center">
              <TechIcon techId={tech} name={tech} className="size-5" />
            </span>
          ))}
          {starterTrack && (
            <span
              title={starterTrack.evidence.limitations.join(" ")}
              className="ml-auto flex items-center gap-1.5 text-[11px] text-muted-foreground"
            >
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  verified ? "bg-emerald-500" : "bg-foreground/30",
                )}
              />
              {starterTrack.evidence.level.replace("-", " ")}
            </span>
          )}
        </span>
      </button>

      <button
        type="button"
        aria-label={m.presetCustomize()}
        title={m.presetCustomize()}
        onClick={() => onCustomizePreset(preset.id)}
        className="absolute top-3 right-3 flex size-8 cursor-pointer items-center justify-center rounded-full text-muted-foreground opacity-0 transition-opacity hover:bg-foreground/10 hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
      >
        <Pencil className="size-4" />
      </button>
    </div>
  );
}

const FUTURE_STACK_LIBRARIES = ["tanstack-query", "orpc", "drizzle", "better-auth"];

function getFutureStackFrameworkCopy(choice: PresetOptionChoice) {
  return choice.id === "tanstack-start"
    ? { icon: "tanstack-start-solid", description: m.presetFutureStackTanStackStart() }
    : { icon: "solid-start", description: m.presetFutureStackSolidStart() };
}

function getFutureStackEffectLabel(choice: PresetOptionChoice) {
  return choice.id === "server"
    ? m.presetFutureStackEffectServer()
    : m.presetFutureStackEffectApp();
}

function getFutureStackCommand(
  preset: PresetDefinition,
  options: PresetOptionSelection,
  packageManager: string,
) {
  const prefix =
    PACKAGE_MANAGER_COMMANDS[packageManager as keyof typeof PACKAGE_MANAGER_COMMANDS] ??
    PACKAGE_MANAGER_COMMANDS.bun;
  const flags = (preset.options ?? []).flatMap((option) => {
    const choice = options[option.id];
    return choice && choice !== option.choices[0].id ? [`--${option.id} ${choice}`] : [];
  });
  return [prefix, "preset", preset.id, "my-app", ...flags].join(" ");
}

interface FutureStackCardProps {
  preset: PresetDefinition;
  framework: PresetOptionChoice;
  stack: StackState;
  onApplyPreset: PresetsPanelProps["onApplyPreset"];
  onCustomizePreset: PresetsPanelProps["onCustomizePreset"];
}

function FutureStackCard({
  preset,
  framework,
  stack,
  onApplyPreset,
  onCustomizePreset,
}: FutureStackCardProps) {
  const effectOption = preset.options?.find((option) => option.id === "effect");
  const [effect, setEffect] = useState(effectOption?.choices[0].id);
  const [copied, setCopied] = useState(false);
  const options: PresetOptionSelection = { framework: framework.id, effect };
  const active = isPresetActive(applyPresetOptions(preset, options), stack);
  const copy = getFutureStackFrameworkCopy(framework);
  const command = getFutureStackCommand(preset, options, stack.packageManager);
  const selectedEffect = effectOption?.choices.find((choice) => choice.id === effect);

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-4 rounded-xl border p-4 transition-colors sm:p-5",
        active
          ? "border-ink bg-ink/[0.05] dark:border-brand/80 dark:bg-brand/[0.08]"
          : "border-ink/25 bg-foreground/[0.03] hover:border-ink/50 dark:border-brand/30 dark:hover:border-brand/60",
      )}
    >
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-foreground/10 bg-background/70">
          <TechIcon techId={copy.icon} name={framework.name} className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {preset.name}
          </p>
          <h3 className="flex items-center gap-2 font-mono text-base font-bold tracking-[-0.02em]">
            {framework.name}
            {active && <Check className="size-4 text-ink dark:text-brand" aria-hidden />}
          </h3>
          <p className="mt-1 text-sm leading-snug text-muted-foreground">{copy.description}</p>
        </div>
        <button
          type="button"
          aria-label={m.presetCustomize()}
          title={m.presetCustomize()}
          onClick={() => onCustomizePreset(preset.id, options)}
          className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
        >
          <Pencil className="size-4" />
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          {FUTURE_STACK_LIBRARIES.map((tech) => (
            <span key={tech} title={tech} className="flex items-center">
              <TechIcon techId={tech} name={tech} className="size-4" />
            </span>
          ))}
        </div>
        {effectOption && selectedEffect && (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  type="button"
                  aria-label={m.presetFutureStackEffectLabel()}
                  className="flex h-7 cursor-pointer items-center gap-1.5 rounded-full border border-foreground/15 px-2.5 text-xs transition-colors hover:bg-foreground/10"
                />
              }
            >
              <TechIcon techId="effect" name="Effect" className="size-3.5" />
              <span className="text-muted-foreground">Effect</span>
              {getFutureStackEffectLabel(selectedEffect)}
              <ChevronDown className="size-3 opacity-70" aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 bg-fd-background">
              {effectOption.choices.map((choice) => (
                <DropdownMenuItem key={choice.id} onClick={() => setEffect(choice.id)}>
                  <span className="flex-1 text-xs">{getFutureStackEffectLabel(choice)}</span>
                  {effect === choice.id && <Check className="size-3.5" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={() => onApplyPreset(preset.id, options)}
          className="cursor-pointer rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-background transition-opacity hover:opacity-90 dark:bg-brand dark:text-black"
        >
          {m.presetFutureStackUse()}
        </button>
        <button
          type="button"
          onClick={copyCommand}
          title={command}
          aria-label={m.presetFutureStackCopyCommand()}
          className="flex w-full min-w-0 cursor-pointer items-center gap-2 rounded-full border border-foreground/10 bg-background/60 px-3 py-1.5 text-left font-mono text-[11px] text-muted-foreground hover:text-foreground sm:flex-1"
        >
          <span className="truncate">{command}</span>
          {copied ? (
            <Check className="size-3.5 shrink-0 text-ink dark:text-brand" />
          ) : (
            <Copy className="size-3.5 shrink-0" />
          )}
        </button>
      </div>
    </div>
  );
}

function FutureStackSection({
  preset,
  stack,
  onApplyPreset,
  onCustomizePreset,
}: Omit<FutureStackCardProps, "framework">) {
  const frameworks = preset.options?.find((option) => option.id === "framework")?.choices ?? [];

  return (
    <section className="grid gap-3 lg:grid-cols-2">
      {frameworks.map((framework) => (
        <FutureStackCard
          key={framework.id}
          preset={preset}
          framework={framework}
          stack={stack}
          onApplyPreset={onApplyPreset}
          onCustomizePreset={onCustomizePreset}
        />
      ))}
    </section>
  );
}

function GroupHeading({ icon, name, count }: { icon: ReactNode; name: string; count: number }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      {icon}
      <h2 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        {name}
      </h2>
      <span className="font-mono text-[11px] text-muted-foreground/60">{count}</span>
    </div>
  );
}

export function PresetsPanel({
  stack,
  ecosystem,
  onApplyPreset,
  onCustomizePreset,
  starterTrackFilters,
}: PresetsPanelProps) {
  const evidenceInventory = useCapabilityEvidenceInventory();
  const filteredCategories = PRESET_CATEGORIES.filter(
    (c) => c.ecosystem === ecosystem && c.id !== FEATURED_CATEGORY,
  );
  const filteredPresets = PRESET_DEFINITIONS.filter((p) =>
    filteredCategories.some((c) => c.id === p.category),
  );
  const futureStack = ecosystem === "typescript" ? getPreset("future-stack") : undefined;
  const starterTracks = useMemo(
    () =>
      getStarterTrackCatalog({
        inventory: evidenceInventory,
        filters: starterTrackFilters,
      }).tracks.filter((track) => track.ecosystem === ecosystem),
    [ecosystem, evidenceInventory, starterTrackFilters],
  );
  const grid = "grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4";

  return (
    <div className="h-full overflow-y-auto px-3 pt-2 pb-24 sm:px-4">
      <div className="space-y-8">
        {futureStack && (
          <FutureStackSection
            preset={futureStack}
            stack={stack}
            onApplyPreset={onApplyPreset}
            onCustomizePreset={onCustomizePreset}
          />
        )}

        {starterTracks.length > 0 && (
          <section>
            <GroupHeading
              icon={<Zap className="size-4 text-ink dark:text-brand" />}
              name={m.presetStarterTracks()}
              count={starterTracks.length}
            />
            <div className={grid}>
              {starterTracks.map((track) => {
                const preset = PRESET_DEFINITIONS.find((p) => p.id === track.presetId);
                if (!preset) return null;

                return (
                  <PresetCard
                    key={track.id}
                    preset={preset}
                    stack={stack}
                    ecosystem={ecosystem}
                    title={getStarterTrackName(track)}
                    starterTrack={track}
                    onApplyPreset={onApplyPreset}
                    onCustomizePreset={onCustomizePreset}
                  />
                );
              })}
            </div>
          </section>
        )}

        {filteredCategories.map((category) => {
          const categoryPresets = filteredPresets.filter((p) => p.category === category.id);
          if (categoryPresets.length === 0) return null;

          return (
            <section key={category.id}>
              <GroupHeading
                icon={<TechIcon techId={category.icon} name={category.name} className="size-4" />}
                name={category.name}
                count={categoryPresets.length}
              />
              <div className={grid}>
                {categoryPresets.map((preset) => (
                  <PresetCard
                    key={preset.id}
                    preset={preset}
                    stack={stack}
                    ecosystem={ecosystem}
                    onApplyPreset={onApplyPreset}
                    onCustomizePreset={onCustomizePreset}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
