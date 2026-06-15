import { BookOpen, Check, Pencil, Terminal, Zap } from "lucide-react";

import type { StackState } from "@/lib/constant";
import { PRESET_CATEGORIES, PRESET_TEMPLATES } from "@/lib/constant";
import { getLocalizedPresetTemplate } from "@/lib/i18n/builder-copy";
import { DEFAULT_STACK } from "@/lib/stack-defaults";
import { TechIcon } from "@/components/stack-builder/tech-icon";
import { getStarterTracksForEcosystem, type StarterTrack } from "@/lib/starter-tracks";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages.js";

interface PresetsPanelProps {
  stack: StackState;
  ecosystem: string;
  onApplyPreset: (presetId: string) => void;
  onCustomizePreset: (presetId: string) => void;
}

const HIGHLIGHT_SCALAR_KEYS = [
  "backend",
  "database",
  "orm",
  "api",
  "auth",
  "uiLibrary",
  // Rust
  "rustWebFramework",
  "rustFrontend",
  "rustOrm",
  "rustApi",
  "rustCli",
  // Python
  "pythonWebFramework",
  "pythonOrm",
  "pythonAi",
  "pythonApi",
  "pythonTaskQueue",
  // Go
  "goWebFramework",
  "goOrm",
  "goApi",
  "goCli",
  "goLogging",
] as const satisfies readonly (keyof StackState)[];

function getPresetHighlights(presetStack: Partial<StackState>): string[] {
  const highlights: string[] = [];

  for (const fe of presetStack.webFrontend ?? []) {
    if (fe !== "none") highlights.push(fe);
  }
  for (const n of presetStack.nativeFrontend ?? []) {
    if (n !== "none") highlights.push(n);
  }
  for (const key of HIGHLIGHT_SCALAR_KEYS) {
    const val = presetStack[key];
    if (typeof val === "string" && val !== "none") highlights.push(val);
  }

  return highlights;
}

function isPresetActive(
  presetStack: Partial<StackState>,
  currentStack: StackState,
): boolean {
  const merged = { ...DEFAULT_STACK, ...presetStack };

  for (const key of Object.keys(presetStack) as (keyof StackState)[]) {
    const presetVal = merged[key];
    const currentVal = currentStack[key];

    if (Array.isArray(presetVal) && Array.isArray(currentVal)) {
      if (
        presetVal.length !== currentVal.length ||
        presetVal.some((v, i) => v !== currentVal[i])
      ) {
        return false;
      }
    } else if (presetVal !== currentVal) {
      return false;
    }
  }

  return true;
}

function getStarterTrackName(track: StarterTrack) {
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

function getStarterTrackIntent(track: StarterTrack) {
  switch (track.id) {
    case "saas-app":
      return m.presetTrackSaasIntent();
    case "ai-agent-app":
      return m.presetTrackAiAgentIntent();
    case "rest-api":
      return m.presetTrackRestApiIntent();
    case "java-api":
      return m.presetTrackJavaApiIntent();
    case "rust-backend":
      return m.presetTrackRustBackendIntent();
    case "mobile-app":
      return m.presetTrackMobileAppIntent();
    case "internal-tool":
      return m.presetTrackInternalToolIntent();
  }
}

function getStarterTrackDescription(track: StarterTrack) {
  switch (track.id) {
    case "saas-app":
      return m.presetTrackSaasDescription();
    case "ai-agent-app":
      return m.presetTrackAiAgentDescription();
    case "rest-api":
      return m.presetTrackRestApiDescription();
    case "java-api":
      return m.presetTrackJavaApiDescription();
    case "rust-backend":
      return m.presetTrackRustBackendDescription();
    case "mobile-app":
      return m.presetTrackMobileAppDescription();
    case "internal-tool":
      return m.presetTrackInternalToolDescription();
  }
}

export function PresetsPanel({ stack, ecosystem, onApplyPreset, onCustomizePreset }: PresetsPanelProps) {
  const filteredCategories = PRESET_CATEGORIES.filter((c) => c.ecosystem === ecosystem);
  const filteredPresets = PRESET_TEMPLATES.filter((p) =>
    filteredCategories.some((c) => c.id === p.category),
  );
  const starterTracks = getStarterTracksForEcosystem(ecosystem);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-muted/20 px-3 py-1.5 sm:gap-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Zap className="h-3.5 w-3.5" />
          <span>{m.presetCount({ count: filteredPresets.length })}</span>
        </div>
        <span className="ml-auto text-xs text-muted-foreground">{m.presetClickToApply()}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        <div className="space-y-6">
          {starterTracks.length > 0 && (
            <section>
              <div className="mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <h2 className="font-mono text-sm font-medium">{m.presetStarterTracks()}</h2>
                <span className="text-xs text-muted-foreground">
                  {starterTracks.length}
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {starterTracks.map((track) => {
                  const preset = PRESET_TEMPLATES.find((p) => p.id === track.presetId);
                  const active = preset ? isPresetActive(preset.stack, stack) : false;
                  const trackName = getStarterTrackName(track);

                  return (
                    <article
                      key={track.id}
                      className={cn(
                        "group flex min-h-[230px] flex-col rounded-md border p-4 transition-all",
                        active
                          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                          : "border-border bg-fd-background hover:border-muted-foreground/30 hover:bg-muted/50",
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background">
                          <TechIcon techId={track.icon} name={trackName} className="h-4 w-4" />
                        </div>
                        <span className="rounded-md border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                          {getStarterTrackIntent(track)}
                        </span>
                      </div>

                      <div className="mt-4">
                        <h3 className="font-mono text-sm font-medium">{trackName}</h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                          {getStarterTrackDescription(track)}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {track.highlights.slice(0, 4).map((highlight) => (
                          <span
                            key={highlight}
                            className="rounded-md border border-border bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center gap-2 pt-4">
                        <button
                          type="button"
                          onClick={() => onApplyPreset(track.presetId)}
                          className="inline-flex h-8 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md bg-primary px-3 text-xs font-semibold text-primary-foreground transition-all group-hover:gap-2"
                        >
                          <Terminal className="h-3.5 w-3.5" />
                          {m.presetApply()}
                        </button>
                        <a
                          href={track.guideHref}
                          className="inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-border px-3 text-xs font-medium transition-colors hover:border-muted-foreground/40 hover:bg-muted"
                        >
                          <BookOpen className="h-3.5 w-3.5" />
                          {m.presetGuide()}
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          {filteredCategories.map((category) => {
            const categoryPresets = filteredPresets.filter(
              (p) => p.category === category.id,
            );
            if (categoryPresets.length === 0) return null;

            return (
              <section key={category.id}>
                <div className="mb-3 flex items-center gap-2">
                  <TechIcon
                    techId={category.icon}
                    name={category.name}
                    className="h-4 w-4"
                  />
                  <h2 className="font-mono text-sm font-medium">{category.name}</h2>
                  <span className="text-xs text-muted-foreground">
                    {categoryPresets.length}
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryPresets.map((preset) => {
                    const localizedPreset = getLocalizedPresetTemplate(preset);
                    const active = isPresetActive(preset.stack, stack);
                    const highlights = getPresetHighlights(preset.stack);

                    return (
                      <button
                        type="button"
                        key={preset.id}
                        tabIndex={0}
                        onClick={() => onApplyPreset(preset.id)}
                        className={cn(
                          "group relative flex cursor-pointer flex-col gap-3 rounded-lg border p-4 text-left transition-all",
                          active
                            ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                            : "border-border bg-fd-background hover:border-muted-foreground/30 hover:bg-muted/50",
                        )}
                      >
                        <div className="absolute top-3 right-3 flex items-center gap-1">
                          {/* oxlint-disable-next-line jsx-a11y/prefer-tag-over-role */}
                          <span
                            role="button" // eslint-disable-line
                            tabIndex={0}
                            title={m.presetCustomize()}
                            onClick={(e) => {
                              e.stopPropagation();
                              onCustomizePreset(preset.id);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.stopPropagation();
                                e.preventDefault();
                                onCustomizePreset(preset.id);
                              }
                            }}
                            className={cn(
                              "flex h-5 w-5 cursor-pointer items-center justify-center rounded-full transition-colors",
                              active
                                ? "text-primary hover:bg-primary/20"
                                : "text-muted-foreground/40 hover:text-muted-foreground hover:bg-muted",
                            )}
                          >
                            <Pencil className="h-2.5 w-2.5" />
                          </span>
                          {active && (
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                              <Check className="h-3 w-3" />
                            </div>
                          )}
                        </div>

                        <div className="space-y-1 pr-6">
                          <h3 className="font-mono text-sm font-medium">{localizedPreset.name}</h3>
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            {localizedPreset.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {highlights.map((tech) => (
                            <span
                              key={tech}
                              className={cn(
                                "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 font-mono text-[10px]",
                                active
                                  ? "border-primary/20 bg-primary/10 text-primary"
                                  : "border-border bg-muted/50 text-muted-foreground group-hover:border-muted-foreground/20",
                              )}
                            >
                              <TechIcon techId={tech} name={tech} className="h-3 w-3" />
                              {tech}
                            </span>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
