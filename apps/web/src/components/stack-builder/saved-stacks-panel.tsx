import {
  Copy,
  EllipsisVertical,
  FolderOpen,
  Pencil,
  Save,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { useState } from "react";

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
import type { StackState } from "@/lib/constant";
import type { SavedStackEntry } from "@/lib/saved-stacks";
import { TechIcon } from "@/components/stack-builder/tech-icon";
import { cn } from "@/lib/utils";

/** Ordered stack keys meaningful for each ecosystem. Order determines display in View Full Stack. */
const RELEVANT_KEYS_BY_ECOSYSTEM: Record<string, readonly string[]> = {
  typescript: [
    "ecosystem", "projectName",
    "webFrontend", "nativeFrontend", "astroIntegration",
    "cssFramework", "uiLibrary",
    "shadcnBase", "shadcnStyle", "shadcnIconLibrary", "shadcnColorTheme", "shadcnBaseColor", "shadcnFont", "shadcnRadius",
    "backend", "backendLibraries", "runtime", "api",
    "database", "orm", "dbSetup",
    "webDeploy", "serverDeploy",
    "auth", "payments", "email", "fileUpload",
    "logging", "observability", "featureFlags", "analytics",
    "aiSdk", "stateManagement", "forms", "validation", "testing",
    "realtime", "jobQueue", "caching", "search", "fileStorage",
    "animation", "cms",
    "codeQuality", "documentation", "appPlatforms", "packageManager", "examples",
    "aiDocs", "versionChannel", "git", "install", "yolo",
  ],
  rust: [
    "ecosystem", "projectName",
    "rustWebFramework", "rustFrontend", "rustOrm", "rustApi", "rustCli", "rustLibraries",
    "aiDocs", "git", "install", "yolo",
  ],
  python: [
    "ecosystem", "projectName",
    "pythonWebFramework", "pythonOrm", "pythonValidation", "pythonAi", "pythonTaskQueue", "pythonQuality",
    "aiDocs", "git", "install", "yolo",
  ],
  go: [
    "ecosystem", "projectName",
    "goWebFramework", "goOrm", "goApi", "goCli", "goLogging",
    "auth", "aiDocs", "git", "install", "yolo",
  ],
};

/** Subset of keys used for the card highlight badges. */
const HIGHLIGHT_KEYS_BY_ECOSYSTEM: Record<string, readonly (keyof StackState)[]> = {
  typescript: ["backend", "database", "orm", "api", "auth", "uiLibrary", "runtime"],
  rust: ["rustWebFramework", "rustFrontend", "rustOrm", "rustApi", "rustCli"],
  python: ["pythonWebFramework", "pythonOrm", "pythonAi", "pythonTaskQueue"],
  go: ["goWebFramework", "goOrm", "goApi", "goCli"],
};

interface SavedStacksPanelProps {
  entries: SavedStackEntry[];
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

  const scalarKeys = HIGHLIGHT_KEYS_BY_ECOSYSTEM[ecosystem] || HIGHLIGHT_KEYS_BY_ECOSYSTEM.typescript;
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

export function SavedStacksPanel({
  entries,
  onLoadEntry,
  onOverwriteEntry,
  onDeleteEntry,
  onRenameEntry,
  onDuplicateEntry,
}: SavedStacksPanelProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [viewingEntryId, setViewingEntryId] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const pendingDeleteEntry = pendingDeleteId
    ? entries.find((entry) => entry.id === pendingDeleteId) || null
    : null;
  const sortedEntries = [...entries].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const viewingEntry =
    viewingEntryId === null ? null : entries.find((entry) => entry.id === viewingEntryId) || null;
  const viewingConfigEntries = viewingEntry
    ? (() => {
        const eco = viewingEntry.stack.ecosystem || "typescript";
        const orderedKeys = RELEVANT_KEYS_BY_ECOSYSTEM[eco] || RELEVANT_KEYS_BY_ECOSYSTEM.typescript;
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
      <Dialog open={pendingDeleteEntry !== null} onOpenChange={(open) => !open && setPendingDeleteId(null)}>
        <DialogContent className="sm:max-w-sm" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Delete Preset</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{pendingDeleteEntry?.name}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" onClick={() => setPendingDeleteId(null)}>
              Cancel
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
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={viewingEntry !== null} onOpenChange={(open) => !open && setViewingEntryId(null)}>
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
              {viewingEntry?.name || "Saved preset"}
            </DialogTitle>
            <DialogDescription>
              Full saved configuration for this preset.
            </DialogDescription>
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
                  {key}
                </div>
                <div className="flex items-center">{renderConfigValue(value)}</div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      <div className="flex h-full flex-col overflow-hidden">
        <div className="border-b border-border bg-muted/20 px-3 py-3">
          <div className="space-y-1">
            <div className="font-mono text-xs text-foreground">Saved Projects & Presets</div>
            <p className="text-xs text-muted-foreground">
              Use the save icon in the builder bar to create local presets, then load or update them
              here.
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          {sortedEntries.length === 0 ? (
            <div className="flex h-full min-h-64 items-center justify-center p-6 text-center">
              <div className="space-y-2">
                <div className="text-sm font-light tracking-tight text-muted-foreground/60">
                  No saved presets yet
                </div>
                <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
                  Save the current builder configuration to create a reusable preset for yourself.
                  These entries stay in local storage on this browser.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {sortedEntries.map((entry) => {
                const highlights = getStackHighlights(entry.stack);
                const isEditing = editingId === entry.id;

                return (
                  <div
                    key={entry.id}
                    className="relative flex flex-col gap-3 rounded-lg border border-border/60 bg-transparent p-4 transition-colors duration-300 hover:bg-muted/[0.04]"
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
                              Save
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
                              Project
                            </span>
                            <span className="text-[10px] text-muted-foreground/60">
                              {entry.stack.projectName || "my-app"}
                            </span>
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground/40">
                              Updated
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
                              className="flex h-6 w-6 items-center justify-center rounded-sm text-muted-foreground/40 transition-all duration-200 hover:text-foreground"
                            />
                          }
                        >
                          <EllipsisVertical className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" sideOffset={6} className="w-40">
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingId(entry.id);
                              setEditingName(entry.name);
                            }}
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onDuplicateEntry(entry.id, `${entry.name} Copy`)}
                          >
                            <Copy className="h-3.5 w-3.5" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => setPendingDeleteId(entry.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {highlights.map((tech, i) => (
                        <span
                          key={tech}
                          className={cn(
                            "inline-flex items-center gap-1 px-0 py-0 font-mono text-[10px] text-muted-foreground/50",
                            i < highlights.length - 1 && "after:content-['/'] after:ml-1.5 after:text-border/60",
                          )}
                        >
                          <TechIcon techId={tech} name={tech} className="h-3 w-3" />
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-md border-border/50 bg-muted/20 text-muted-foreground hover:bg-muted/40 hover:text-foreground transition-colors duration-200"
                        onClick={() => onLoadEntry(entry.id)}
                      >
                        <FolderOpen className="h-3.5 w-3.5" />
                        Load
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-md border-border/50 bg-muted/20 text-muted-foreground hover:bg-muted/40 hover:text-foreground transition-colors duration-200"
                        onClick={() => setViewingEntryId(entry.id)}
                      >
                        <SlidersHorizontal className="h-3.5 w-3.5" />
                        View Full Stack
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-md border-border/50 bg-muted/20 text-muted-foreground hover:bg-muted/40 hover:text-foreground transition-colors duration-200"
                        onClick={() => onOverwriteEntry(entry.id)}
                      >
                        <Save className="h-3.5 w-3.5" />
                        Update
                      </Button>
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
