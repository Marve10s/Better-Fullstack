import { Check, Pencil, Zap } from "lucide-react";

import type { StackState } from "@/lib/constant";
import { PRESET_CATEGORIES, PRESET_TEMPLATES } from "@/lib/constant";
import { DEFAULT_STACK } from "@/lib/stack-defaults";
import { TechIcon } from "@/components/stack-builder/tech-icon";
import { cn } from "@/lib/utils";

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

export function PresetsPanel({ stack, ecosystem, onApplyPreset, onCustomizePreset }: PresetsPanelProps) {
  const filteredCategories = PRESET_CATEGORIES.filter((c) => c.ecosystem === ecosystem);
  const filteredPresets = PRESET_TEMPLATES.filter((p) =>
    filteredCategories.some((c) => c.id === p.category),
  );

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-muted/20 px-3 py-1.5 sm:gap-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Zap className="h-3.5 w-3.5" />
          <span>{filteredPresets.length} presets</span>
        </div>
        <span className="ml-auto text-xs text-muted-foreground">Click to apply</span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        <div className="space-y-6">
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
                            title="Customize preset"
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
                          <h3 className="font-mono text-sm font-medium">{preset.name}</h3>
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            {preset.description}
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
