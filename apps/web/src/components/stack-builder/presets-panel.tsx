import {
  getStarterTrackCatalog,
  type StarterTrackCatalogEntry,
  type StarterTrackFilters,
} from "@better-fullstack/types";
import { type ReactNode, useMemo } from "react";
import { TbCheck as Check, TbPencil as Pencil, TbBolt as Zap } from "react-icons/tb";

import type { StackState } from "@/lib/stack/constant";

import { useCapabilityEvidenceInventory } from "@/components/stack-builder/capability-evidence-badge";
import { TechIcon } from "@/components/stack-builder/tech-icon";
import { getRelevantStackKeys } from "@/components/stack-builder/utils";
import { getLocalizedPresetTemplate } from "@/lib/i18n/builder-copy";
import { cn } from "@/lib/platform/utils";
import { PRESET_CATEGORIES, PRESET_TEMPLATES } from "@/lib/stack/constant";
import { resolvePresetStack } from "@/lib/stack/preset-stack";
import { DEFAULT_STACK } from "@/lib/stack/stack-defaults";
import { ICON_REGISTRY } from "@/lib/stack/tech-icons";
import { m } from "@/paraglide/messages.js";

interface PresetsPanelProps {
  stack: StackState;
  ecosystem: string;
  onApplyPreset: (presetId: string) => void;
  onCustomizePreset: (presetId: string) => void;
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

type PresetTemplate = (typeof PRESET_TEMPLATES)[number];

interface PresetCardProps {
  preset: PresetTemplate;
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
  const filteredCategories = PRESET_CATEGORIES.filter((c) => c.ecosystem === ecosystem);
  const filteredPresets = PRESET_TEMPLATES.filter((p) =>
    filteredCategories.some((c) => c.id === p.category),
  );
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
        {starterTracks.length > 0 && (
          <section>
            <GroupHeading
              icon={<Zap className="size-4 text-ink dark:text-brand" />}
              name={m.presetStarterTracks()}
              count={starterTracks.length}
            />
            <div className={grid}>
              {starterTracks.map((track) => {
                const preset = PRESET_TEMPLATES.find((p) => p.id === track.presetId);
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
