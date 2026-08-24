import { useMemo, useState } from "react";
import { TbCheck as Check, TbCopy as Copy, TbFileImport as FileImport } from "react-icons/tb";
import { toast } from "sonner";

import type { ProjectImportResult } from "@/lib/existing-project-import";
import type { StackState } from "@/lib/stack-defaults";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  parseImportedBtsConfigText,
  resolveImportedProjectName,
} from "@/lib/existing-project-import";
import { generateStackCommand } from "@/lib/stack-utils";
import { cn } from "@/lib/utils";

import { StackGraphComparison, stackStateToStackParts } from "./stack-graph-comparison";

const MAX_CONFIG_BYTES = 1024 * 1024;

export function ExistingProjectImportDialog({
  open,
  onOpenChange,
  currentStack,
  onLoadImported,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentStack: StackState;
  onLoadImported: (stack: StackState) => void;
}) {
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState<ProjectImportResult | null>(null);
  const [reading, setReading] = useState(false);
  const [copied, setCopied] = useState(false);
  const currentParts = useMemo(() => stackStateToStackParts(currentStack), [currentStack]);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setFileName(file.name);
    setCopied(false);
    if (file.size > MAX_CONFIG_BYTES) {
      setResult({
        success: false,
        diagnostics: [
          {
            severity: "error",
            code: "CONFIG_TOO_LARGE",
            message: "bts.jsonc must be 1 MB or smaller for local browser inspection.",
          },
        ],
      });
      return;
    }
    setReading(true);
    try {
      const content = await file.text();
      setResult(
        parseImportedBtsConfigText(content, {
          targetVersion: __BFS_CLI_VERSION__,
          projectName: resolveImportedProjectName(file.name, currentStack.projectName),
        }),
      );
    } catch (error) {
      setResult({
        success: false,
        diagnostics: [
          {
            severity: "error",
            code: "LOCAL_READ_FAILED",
            message:
              error instanceof Error ? error.message : "The browser could not read this file.",
          },
        ],
      });
    } finally {
      setReading(false);
    }
  };

  const copyCommand = async () => {
    if (!result?.success) return;
    try {
      await navigator.clipboard.writeText(generateStackCommand(result.stack));
      setCopied(true);
      toast.success("Imported stack command copied");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Could not copy the imported stack command");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-hidden p-0 sm:max-w-4xl">
        <div className="border-b border-border/50 px-5 pt-5 pb-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileImport className="h-4 w-4" />
              Import an existing bts.jsonc
            </DialogTitle>
            <DialogDescription>
              Inspect the file in this browser tab, compare its Stack Graph with the current builder
              state, then choose an explicit next action. The file is not uploaded and the browser
              never writes to the project.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="min-h-0 space-y-4 overflow-y-auto px-5 py-4">
          <label htmlFor="existing-project-config" className="block space-y-2">
            <span className="text-xs font-medium text-foreground">Choose bts.jsonc</span>
            <Input
              id="existing-project-config"
              type="file"
              accept=".json,.jsonc,application/json"
              disabled={reading}
              onChange={(event) => void handleFile(event.currentTarget.files?.[0])}
            />
            <span className="block text-[10px] text-muted-foreground">
              Local read only. Maximum size: 1 MB.
            </span>
          </label>

          {reading ? (
            <div className="rounded-xl border border-border/50 p-4 text-xs text-muted-foreground">
              Reading {fileName} in this tab…
            </div>
          ) : null}

          {result ? (
            <div className="space-y-4">
              <section className="rounded-xl border border-border/50">
                <div className="border-b border-border/40 bg-muted/20 px-3 py-2 text-xs font-medium">
                  Import diagnostics
                </div>
                <div className="divide-y divide-border/35">
                  {result.diagnostics.map((diagnostic) => (
                    <div
                      key={`${diagnostic.code}:${diagnostic.message}`}
                      className="grid grid-cols-[auto_1fr] gap-3 px-3 py-2.5"
                    >
                      <span
                        className={cn(
                          "mt-0.5 font-mono text-[9px] uppercase",
                          diagnostic.severity === "error"
                            ? "text-rose-500"
                            : diagnostic.severity === "warning"
                              ? "text-amber-500"
                              : "text-sky-500",
                        )}
                      >
                        {diagnostic.severity}
                      </span>
                      <div>
                        <div className="font-mono text-[10px] text-muted-foreground">
                          {diagnostic.code}
                        </div>
                        <p className="mt-0.5 text-[11px] text-foreground/85">
                          {diagnostic.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {result.success ? (
                <>
                  <section className="grid gap-3 rounded-xl border border-border/50 p-3 sm:grid-cols-3">
                    <div>
                      <div className="text-[9px] uppercase tracking-wide text-muted-foreground">
                        Source version
                      </div>
                      <div className="mt-1 font-mono text-xs text-foreground">
                        {result.config.version}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wide text-muted-foreground">
                        Stack parts
                      </div>
                      <div className="mt-1 font-mono text-xs text-foreground">
                        {result.stackParts.length}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wide text-muted-foreground">
                        Update eligibility
                      </div>
                      <div className="mt-1 font-mono text-xs text-foreground">
                        {result.updateSupport.eligibility}
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <div className="font-mono text-[10px] text-muted-foreground">
                        {result.updateSupport.reasonCode}
                      </div>
                      <p className="mt-1 text-[11px] text-foreground/85">
                        {result.updateSupport.reason}
                      </p>
                      {result.updateSupport.requiresManualReview ? (
                        <p className="mt-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                          Manual review is required. A local bts.jsonc does not prove manifest-v2
                          lineage.
                        </p>
                      ) : null}
                    </div>
                  </section>

                  <StackGraphComparison
                    before={currentParts}
                    after={result.stackParts}
                    beforeLabel="Current builder"
                    afterLabel={fileName || "Imported config"}
                  />
                </>
              ) : null}
            </div>
          ) : null}
        </div>

        <DialogFooter className="border-t border-border/50 px-5 py-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button type="button" variant="outline" disabled={!result?.success} onClick={copyCommand}>
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Command copied" : "Copy CLI command"}
          </Button>
          <Button
            type="button"
            disabled={!result?.success}
            onClick={() => {
              if (!result?.success) return;
              onLoadImported(result.stack);
              onOpenChange(false);
              toast.success("Imported Stack Graph loaded in the builder");
            }}
          >
            <FileImport className="h-3.5 w-3.5" />
            Load in builder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
