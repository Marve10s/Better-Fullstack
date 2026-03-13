import { Zap, Check } from "lucide-react";

import type { StackState } from "@/lib/constant";
import { PRESET_TEMPLATES } from "@/lib/constant";
import { DEFAULT_STACK } from "@/lib/stack-defaults";
import { TechIcon } from "@/components/stack-builder/tech-icon";
import { cn } from "@/lib/utils";

interface PresetsPanelProps {
  stack: StackState;
  onApplyPreset: (presetId: string) => void;
}

/** Derive a short list of "highlight" tech labels from a preset's stack config. */
function getPresetHighlights(presetStack: Partial<StackState>): string[] {
  const highlights: string[] = [];

  // Web frontend
  const frontends = presetStack.webFrontend ?? [];
  for (const fe of frontends) {
    if (fe !== "none") highlights.push(fe);
  }

  // Native frontend
  const native = presetStack.nativeFrontend ?? [];
  for (const n of native) {
    if (n !== "none") highlights.push(n);
  }

  // Backend
  if (presetStack.backend && presetStack.backend !== "none") {
    highlights.push(presetStack.backend);
  }

  // Database
  if (presetStack.database && presetStack.database !== "none") {
    highlights.push(presetStack.database);
  }

  // ORM
  if (presetStack.orm && presetStack.orm !== "none") {
    highlights.push(presetStack.orm);
  }

  // API
  if (presetStack.api && presetStack.api !== "none") {
    highlights.push(presetStack.api);
  }

  // Auth
  if (presetStack.auth && presetStack.auth !== "none") {
    highlights.push(presetStack.auth);
  }

  // UI Library
  if (presetStack.uiLibrary && presetStack.uiLibrary !== "none") {
    highlights.push(presetStack.uiLibrary);
  }

  return highlights;
}

/** Check if a preset matches the current stack state. */
function isPresetActive(presetStack: Partial<StackState>, currentStack: StackState): boolean {
  const fullPresetStack = { ...DEFAULT_STACK, ...presetStack };
  for (const key of Object.keys(presetStack) as (keyof StackState)[]) {
    const presetVal = fullPresetStack[key];
    const currentVal = currentStack[key];

    if (Array.isArray(presetVal) && Array.isArray(currentVal)) {
      if (
        presetVal.length !== currentVal.length ||
        !presetVal.every((v, i) => v === currentVal[i])
      ) {
        return false;
      }
    } else if (presetVal !== currentVal) {
      return false;
    }
  }
  return true;
}

export function PresetsPanel({ stack, onApplyPreset }: PresetsPanelProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-muted/20 px-3 py-1.5 sm:gap-4">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Zap className="h-3.5 w-3.5" />
          <span>{PRESET_TEMPLATES.length} presets</span>
        </div>
        <span className="ml-auto text-xs text-muted-foreground">Click to apply</span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRESET_TEMPLATES.map((preset) => {
            const active = isPresetActive(preset.stack, stack);
            const highlights = getPresetHighlights(preset.stack);

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onApplyPreset(preset.id)}
                className={cn(
                  "group relative flex flex-col gap-3 rounded-lg border p-4 text-left transition-all",
                  active
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-border bg-fd-background hover:border-muted-foreground/30 hover:bg-muted/50",
                )}
              >
                {/* Active indicator */}
                {active && (
                  <div className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </div>
                )}

                {/* Name + description */}
                <div className="space-y-1 pr-6">
                  <h3 className="font-mono text-sm font-medium">{preset.name}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {preset.description}
                  </p>
                </div>

                {/* Tech badges */}
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
      </div>
    </div>
  );
}
