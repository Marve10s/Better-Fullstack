import { useState } from "react";
import {
  TbCopy as Copy,
  TbArrowsDiff as Diff,
  TbDotsVertical as EllipsisVertical,
  TbFolderOpen as FolderOpen,
  TbPencil as Pencil,
  TbDeviceFloppy as Save,
  TbAdjustmentsHorizontal as SlidersHorizontal,
  TbTrash as Trash2,
} from "react-icons/tb";

import type { SavedStackEntry } from "@/lib/builder/saved-stacks";
import type { StackState } from "@/lib/stack/constant";

import {
  StackGraphComparison,
  stackStateToStackParts,
} from "@/components/stack-builder/stack-graph-comparison";
import { TechIcon } from "@/components/stack-builder/tech-icon";
import { getRelevantStackKeys } from "@/components/stack-builder/utils";
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
import { getLocalizedCategoryDisplayName } from "@/lib/i18n/builder-copy";
import { cn } from "@/lib/platform/utils";
import { m } from "@/paraglide/messages.js";

/** Subset of keys used for the card highlight badges. */
const HIGHLIGHT_KEYS_BY_ECOSYSTEM: Record<string, readonly (keyof StackState)[]> = {
  typescript: ["backend", "database", "orm", "api", "auth", "uiLibrary", "runtime"],
  "react-native": ["mobileNavigation", "mobileUI", "mobileStorage", "mobileLibraries"],
  rust: ["rustWebFramework", "rustFrontend", "rustOrm", "rustApi", "rustCli"],
  python: ["pythonWebFramework", "pythonOrm", "pythonAi", "pythonApi", "pythonTaskQueue"],
  go: ["goWebFramework", "goOrm", "goApi", "goCli"],
  java: [
    "javaWebFramework",
    "javaBuildTool",
    "javaOrm",
    "javaAuth",
    "javaLibraries",
    "javaTestingLibraries",
  ],
  dotnet: ["dotnetWebFramework", "dotnetOrm", "dotnetAuth", "dotnetApi", "dotnetLibraries"],
  elixir: [
    "elixirWebFramework",
    "elixirOrm",
    "elixirAuth",
    "elixirApi",
    "elixirRealtime",
    "elixirJobs",
  ],
};

interface SavedStacksPanelProps {
  entries: SavedStackEntry[];
  currentStack: StackState;
  onLoadEntry: (entryId: string) => void;
  onOverwriteEntry: (entryId: string) => void;
  onDeleteEntry: (entryId: string) => void;
  onRenameEntry: (entryId: string, name: string) => void;
  onDuplicateEntry: (entryId: string, name: string) => void;
}

function formatSavedAt(value: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function getStackHighlights(stack: StackState) {
  const highlights: string[] = [];
  const ecosystem = stack.ecosystem || "typescript";

  if (ecosystem === "typescript") {
    for (const frontend of stack.webFrontend) {
      if (frontend !== "none") highlights.push(frontend);
    }
    for (const frontend of stack.nativeFrontend) {
      if (frontend !== "none") highlights.push(frontend);
    }
  }

  const scalarKeys =
    HIGHLIGHT_KEYS_BY_ECOSYSTEM[ecosystem] || HIGHLIGHT_KEYS_BY_ECOSYSTEM.typescript;
  for (const key of scalarKeys) {
    const value = stack[key];
    if (typeof value === "string" && value !== "none") {
      highlights.push(value);
    }
  }

  return [...new Set(highlights)].slice(0, 8);
}

function renderConfigValue(value: string | string[]) {
  if (Array.isArray(value)) {
    return (
      <div className="flex flex-wrap gap-1.5">
        {value.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] text-foreground"
          >
            <TechIcon techId={item} name={item} className="h-3 w-3" />
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 font-mono text-foreground">
      <TechIcon techId={value} name={value} className="h-3.5 w-3.5" />
      {value}
    </span>
  );
}

const QUIET_ACTION =
  "flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-3 text-muted-foreground text-xs transition-colors hover:bg-foreground/10 hover:text-foreground";

export function SavedStacksPanel({
  entries,
  currentStack,
  onLoadEntry,
  onOverwriteEntry,
  onDeleteEntry,
  onRenameEntry,
  onDuplicateEntry,
}: SavedStacksPanelProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [viewingEntryId, setViewingEntryId] = useState<string | null>(null);
  const [comparingEntryId, setComparingEntryId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const pendingDeleteEntry = pendingDeleteId
    ? entries.find((entry) => entry.id === pendingDeleteId) || null
    : null;
  const sortedEntries = [...entries].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const viewingEntry =
    viewingEntryId === null ? null : entries.find((entry) => entry.id === viewingEntryId) || null;
  const comparingEntry =
    comparingEntryId === null
      ? null
      : entries.find((entry) => entry.id === comparingEntryId) || null;
  const viewingConfigEntries = viewingEntry
    ? (() => {
        const eco = viewingEntry.stack.ecosystem || "typescript";
        const orderedKeys = getRelevantStackKeys(eco);
        const stack = viewingEntry.stack as Record<string, string | string[]>;
        return orderedKeys
          .filter((key) => {
            const value = stack[key];
            if (value === undefined) return false;
            if (Array.isArray(value)) return value.some((item) => item !== "none");
            return value !== "" && value !== "none";
          })
          .map((key) => [key, stack[key]] as [string, string | string[]]);
      })()
    : [];

  return (
    <>
      <Dialog
        open={pendingDeleteEntry !== null}
        onOpenChange={(open) => !open && setPendingDeleteId(null)}
      >
        <DialogContent className="sm:max-w-sm" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>{m.savedDeletePreset()}</DialogTitle>
            <DialogDescription>
              {m.savedDeleteDescription({ name: pendingDeleteEntry?.name ?? "" })}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" onClick={() => setPendingDeleteId(null)}>
              {m.builderCancel()}
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                if (pendingDeleteId) {
                  onDeleteEntry(pendingDeleteId);
                  setPendingDeleteId(null);
                }
              }}
            >
              {m.savedDelete()}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={viewingEntry !== null}
        onOpenChange={(open) => !open && setViewingEntryId(null)}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {viewingEntry && (
                <TechIcon
                  techId={viewingEntry.stack.ecosystem}
                  name={viewingEntry.stack.ecosystem}
                  className="h-4 w-4"
                />
              )}
              {viewingEntry?.name || m.savedPresetFallback()}
            </DialogTitle>
            <DialogDescription>{m.savedFullConfig()}</DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto rounded-xl border border-border/40 bg-muted/[0.03]">
            {viewingConfigEntries.map(([key, value], i) => (
              <div
                key={key}
                className={cn(
                  "grid grid-cols-[120px_1fr] gap-4 px-4 py-2.5 text-xs sm:grid-cols-[150px_1fr]",
                  i !== viewingConfigEntries.length - 1 && "border-b border-border/30",
                )}
              >
                <div className="flex items-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                  {getLocalizedCategoryDisplayName(key, key)}
                </div>
                <div className="flex items-center">{renderConfigValue(value)}</div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={comparingEntry !== null}
        onOpenChange={(open) => !open && setComparingEntryId(null)}
      >
        <DialogContent className="max-h-[90vh] overflow-hidden p-0 sm:max-w-4xl">
          <div className="border-b border-border/50 px-5 pt-5 pb-4">
            <DialogHeader>
              <DialogTitle>Compare saved Stack Graph</DialogTitle>
              <DialogDescription>
                Review additions, removals, replacements, ownership, and evidence before loading
                {comparingEntry ? ` “${comparingEntry.name}”` : " this saved stack"}.
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="min-h-0 overflow-y-auto px-5 py-4">
            {comparingEntry ? (
              <StackGraphComparison
                before={stackStateToStackParts(currentStack)}
                after={stackStateToStackParts(comparingEntry.stack)}
                beforeLabel="Current builder"
                afterLabel={comparingEntry.name}
              />
            ) : null}
          </div>
          <div className="flex justify-end gap-2 border-t border-border/50 px-5 py-4">
            <Button type="button" variant="outline" onClick={() => setComparingEntryId(null)}>
              Close
            </Button>
            <Button
              type="button"
              disabled={!comparingEntry}
              onClick={() => {
                if (!comparingEntry) return;
                onLoadEntry(comparingEntry.id);
                setComparingEntryId(null);
              }}
            >
              <FolderOpen className="h-3.5 w-3.5" />
              Load reviewed stack
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <div className="flex h-full flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-3 pt-2 pb-24 sm:px-4">
          {sortedEntries.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-foreground/15 p-8 text-center">
              <Save className="size-6 text-muted-foreground/60" aria-hidden />
              <div className="font-mono text-base font-bold tracking-[-0.02em]">
                {m.savedEmptyTitle()}
              </div>
              <p className="max-w-md text-muted-foreground text-sm leading-relaxed">
                {m.savedEmptyDescription()}
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {sortedEntries.map((entry) => {
                const highlights = getStackHighlights(entry.stack);
                const isEditing = editingId === entry.id;

                return (
                  <div
                    key={entry.id}
                    className="relative flex flex-col gap-4 rounded-xl border border-foreground/10 bg-foreground/[0.03] p-4 transition-colors hover:border-foreground/25 hover:bg-foreground/[0.06] sm:p-5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1 space-y-1">
                        {isEditing ? (
                          <div className="flex gap-2">
                            <Input
                              value={editingName}
                              onChange={(e) => setEditingName(e.target.value)}
                              className="h-8"
                            />
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                if (!editingName.trim()) return;
                                onRenameEntry(entry.id, editingName);
                                setEditingId(null);
                                setEditingName("");
                              }}
                            >
                              {m.builderSavePreset()}
                            </Button>
                          </div>
                        ) : (
                          <h3 className="truncate text-sm font-normal tracking-tight text-foreground">
                            {entry.name}
                          </h3>
                        )}
                        <div className="flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground/60">
                          <span className="inline-flex items-center gap-1 font-mono uppercase text-muted-foreground/70">
                            <TechIcon
                              techId={entry.stack.ecosystem}
                              name={entry.stack.ecosystem}
                              className="h-3 w-3"
                            />
                            {entry.stack.ecosystem}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground/40">
                              {m.savedProject()}
                            </span>
                            <span className="text-[10px] text-muted-foreground/60">
                              {entry.stack.projectName || "my-app"}
                            </span>
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground/40">
                              {m.savedUpdated()}
                            </span>
                            <span className="text-[10px] text-muted-foreground/60">
                              {formatSavedAt(entry.updatedAt)}
                            </span>
                          </span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <button
                              type="button"
                              aria-label={`Open actions for ${entry.name}`}
                              className="flex h-6 w-6 items-center justify-center rounded-sm text-muted-foreground/40 transition-all duration-200 hover:text-foreground"
                            />
                          }
                        >
                          <EllipsisVertical className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" sideOffset={6} className="w-40">
                          <DropdownMenuItem onClick={() => setComparingEntryId(entry.id)}>
                            <Diff className="h-3.5 w-3.5" />
                            Compare with current
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingId(entry.id);
                              setEditingName(entry.name);
                            }}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            {m.savedRename()}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onDuplicateEntry(entry.id, `${entry.name} Copy`)}
                          >
                            <Copy className="h-3.5 w-3.5" />
                            {m.savedDuplicate()}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => setPendingDeleteId(entry.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            {m.savedDelete()}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      {highlights.map((tech) => (
                        <span key={tech} title={tech} className="flex items-center">
                          <TechIcon techId={tech} name={tech} className="size-5" />
                        </span>
                      ))}
                    </div>

                    {/* Load is the point of a saved stack, so it is the one filled action. */}
                    <div className="mt-auto flex flex-wrap items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onLoadEntry(entry.id)}
                        className="flex h-8 cursor-pointer items-center gap-1.5 rounded-full bg-foreground px-3.5 font-medium text-background text-xs transition-opacity hover:opacity-85"
                      >
                        <FolderOpen className="size-3.5" />
                        {m.savedLoad()}
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewingEntryId(entry.id)}
                        className={QUIET_ACTION}
                      >
                        <SlidersHorizontal className="size-3.5" />
                        {m.savedViewFullStack()}
                      </button>
                      <button
                        type="button"
                        onClick={() => onOverwriteEntry(entry.id)}
                        className={QUIET_ACTION}
                      >
                        <Save className="size-3.5" />
                        {m.savedUpdate()}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
