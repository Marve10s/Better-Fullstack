import {
  getGraphBackendConnections,
  getGraphProjectTasks,
} from "@better-fullstack/template-generator/graph-project";
import { hasJavaScriptWorkspaceRoot } from "@better-fullstack/types";

import type { StackState } from "@/lib/stack/stack-defaults";

import { Button } from "@/components/ui/button";
import { stackStateToProjectConfig } from "@/lib/builder/preview-config";
import * as m from "@/paraglide/messages";

type EditableRole = "frontend" | "mobile" | "backend" | "database";
const isEditableRole = (role: string): role is EditableRole =>
  ["frontend", "mobile", "backend", "database"].includes(role);

export function ComposerProjectReview({
  stack,
  onEdit,
}: {
  stack: StackState;
  onEdit: (role: EditableRole) => void;
}) {
  let config;
  try {
    config = stackStateToProjectConfig(stack);
  } catch (error) {
    return (
      <p role="alert" className="text-sm text-destructive">
        {error instanceof Error ? error.message : String(error)}
      </p>
    );
  }
  const parts = (config.stackParts ?? []).filter(
    (part) => part.source !== "provided" && part.toolId !== "none",
  );
  const roots = parts.filter((part) => !part.ownerPartId);
  const tasks = getGraphProjectTasks(config);
  const connections = getGraphBackendConnections(config);
  const hasJavaScript = hasJavaScriptWorkspaceRoot(parts);
  return (
    <div data-testid="multi-project-review" className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          {m.builderComposerReviewTitle({ name: config.projectName })}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{m.builderComposerReviewDescription()}</p>
      </div>
      <div className="divide-y divide-border rounded-xl border border-border">
        {roots.map((part) => (
          <div key={part.id} className="flex items-start justify-between gap-4 p-4">
            <div className="min-w-0 space-y-2">
              <div className="text-sm font-medium">
                {part.toolId}{" "}
                <span className="font-normal text-muted-foreground">{part.ecosystem}</span>
              </div>
              <p className="break-all font-mono text-[11px] text-muted-foreground">
                {part.targetPath ?? "."}
              </p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {parts
                  .filter((child) => child.ownerPartId === part.id)
                  .map((child) => child.toolId)
                  .join(" · ")}
              </p>
            </div>
            {isEditableRole(part.role) &&
              roots.find((root) => root.role === part.role)?.id === part.id && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (isEditableRole(part.role)) onEdit(part.role);
                  }}
                >
                  {m.builderComposerEdit()}
                </Button>
              )}
          </div>
        ))}
      </div>
      {connections.length > 0 && (
        <div className="space-y-3 rounded-xl border border-border p-5">
          <h3 className="text-sm font-medium">{m.builderComposerConnections()}</h3>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {m.builderComposerConnectionsDescription()}
          </p>
          {connections.map((connection) => (
            <div key={connection.partId} className="flex flex-wrap justify-between gap-2 text-xs">
              <span>{connection.label}</span>
              <code className="break-all text-muted-foreground">{connection.healthUrl}</code>
            </div>
          ))}
        </div>
      )}
      <div className="rounded-xl bg-muted/40 p-5 text-sm leading-relaxed text-muted-foreground">
        <h3 className="font-medium text-foreground">{m.builderComposerToolchains()}</h3>
        <p className="mt-2">{m.builderComposerToolchainsDescription()}</p>
        <p className="mt-2">
          {hasJavaScript ? m.builderComposerJsSettings() : m.builderComposerNativeSettings()}
        </p>
      </div>
      <div className="space-y-3">
        <h3 className="text-sm font-medium">{m.builderComposerSetupCommands()}</h3>
        <pre className="overflow-x-auto rounded-lg border border-border bg-muted/20 p-4 text-xs leading-6">
          <code>{tasks.flatMap((task) => (task.setup ? [task.setup] : [])).join("\n")}</code>
        </pre>
        <h3 className="text-sm font-medium">{m.builderComposerRunCommands()}</h3>
        <pre className="overflow-x-auto rounded-lg border border-border bg-muted/20 p-4 text-xs leading-6">
          <code>{hasJavaScript ? `${config.packageManager} run dev` : "bash scripts/dev.sh"}</code>
        </pre>
        <p className="text-xs text-muted-foreground">{m.builderComposerNativeRun()}</p>
      </div>
    </div>
  );
}
