import {
  getGraphBackendConnections,
  getGraphProjectTasks,
} from "@better-fullstack/template-generator/graph-project";
import { hasJavaScriptWorkspaceRoot } from "@better-fullstack/types";
import { TbPencil as Pencil } from "react-icons/tb";

import type { StackState } from "@/lib/stack/stack-defaults";

import { TechIcon } from "@/components/ui/tech-icon";
import { stackStateToProjectConfig } from "@/lib/builder/preview-config";
import { cn } from "@/lib/platform/utils";
import { ECOSYSTEMS, TECH_OPTIONS } from "@/lib/stack/constant";
import * as m from "@/paraglide/messages";

type EditableRole = "frontend" | "mobile" | "backend" | "database";
const isEditableRole = (role: string): role is EditableRole =>
  ["frontend", "mobile", "backend", "database"].includes(role);

const ALL_TECH_OPTIONS = Object.values(TECH_OPTIONS).flat();
const findTechOption = (toolId: string) => ALL_TECH_OPTIONS.find((option) => option.id === toolId);
const toolName = (toolId: string) => findTechOption(toolId)?.name ?? toolId;
const ecosystemName = (ecosystem: string) =>
  ECOSYSTEMS.find((eco) => eco.id === ecosystem)?.name ?? ecosystem;
const roleLabel = (role: string) => role.replace(/([A-Z])/g, " $1");

function ToolChip({ toolId, className }: { toolId: string; className?: string }) {
  const option = findTechOption(toolId);
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 rounded-md bg-muted/60 px-2 py-1 text-[11px] text-foreground/90",
        className,
      )}
    >
      <TechIcon
        techId={toolId}
        icon={option?.icon}
        name={option?.name ?? toolId}
        className="h-3.5 w-3.5 shrink-0"
      />
      <span className="truncate">{option?.name ?? toolId}</span>
    </span>
  );
}

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
  const hasMobile = roots.some((part) => part.role === "mobile");
  const needsXcode = roots.some((part) => part.ecosystem === "swift");
  const languages = [
    ...new Set(roots.map((part) => part.ecosystem).filter((eco) => eco !== "universal")),
  ];
  const commands = [
    ...tasks.flatMap((task) =>
      task.setup ? [{ kind: m.builderComposerSetup(), command: task.setup }] : [],
    ),
    {
      kind: m.builderComposerDev(),
      command: hasJavaScript ? `${config.packageManager} run dev` : "bash scripts/dev.sh",
    },
  ];

  return (
    <div data-testid="multi-project-review" className="space-y-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
          {m.builderComposerReviewTitle({ name: config.projectName })}
        </h2>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground">
          {hasJavaScript ? (
            <>
              <TechIcon techId="typescript" name="TypeScript" className="h-3.5 w-3.5" />
              {config.packageManager} · {m.builderComposerJsWorkspace()}
            </>
          ) : (
            m.builderComposerNativeToolchains()
          )}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {roots.map((part) => {
          const children = parts.filter((child) => child.ownerPartId === part.id);
          const editable =
            isEditableRole(part.role) &&
            roots.find((root) => root.role === part.role)?.id === part.id;
          const option = findTechOption(part.toolId);
          return (
            <div
              key={part.id}
              className="group relative flex flex-col gap-3 rounded-xl border border-border bg-background p-4"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted/60">
                  <TechIcon
                    techId={part.toolId}
                    icon={option?.icon}
                    name={option?.name ?? part.toolId}
                    className="h-5 w-5"
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold">{toolName(part.toolId)}</span>
                    <span className="shrink-0 rounded-full border border-border/70 px-1.5 py-px font-mono text-[9px] uppercase tracking-wide text-muted-foreground">
                      {ecosystemName(part.ecosystem)}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
                    <span className="uppercase tracking-wide">{roleLabel(part.role)}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{part.targetPath ?? "."}</span>
                  </div>
                </div>
                {editable && (
                  <button
                    type="button"
                    aria-label={m.builderComposerEdit()}
                    title={m.builderComposerEdit()}
                    onClick={() => {
                      if (isEditableRole(part.role)) onEdit(part.role);
                    }}
                    className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
              {children.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {children.map((child) => (
                    <ToolChip key={child.id} toolId={child.toolId} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {connections.length > 0 && (
        <div className="rounded-xl border border-border">
          <div className="border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {m.builderComposerConnections()}
          </div>
          <div className="divide-y divide-border/70">
            {connections.map((connection) => (
              <div
                key={connection.partId}
                className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs"
              >
                <span className="font-medium">{connection.label}</span>
                <code className="break-all font-mono text-[11px] text-muted-foreground">
                  {connection.healthUrl}
                </code>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span>{m.builderComposerSdks()}</span>
        {languages.map((eco) => (
          <span
            key={eco}
            className="inline-flex items-center gap-1.5 rounded-md border border-border/70 px-2 py-1 text-[11px] text-foreground/90"
          >
            <TechIcon techId={eco} name={ecosystemName(eco)} className="h-3.5 w-3.5" />
            {ecosystemName(eco)}
          </span>
        ))}
        {needsXcode && <span className="basis-full">{m.builderComposerXcode()}</span>}
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-muted/20">
        <div className="border-b border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          {m.builderComposerCommands()}
        </div>
        <pre className="overflow-x-auto p-4 font-mono text-xs leading-6">
          {commands.map((entry, index) => (
            <div key={`${entry.kind}-${index}`} className="flex gap-3">
              <span className="w-12 shrink-0 select-none text-[10px] uppercase tracking-wide text-muted-foreground/70">
                {entry.kind}
              </span>
              <span className="select-none text-muted-foreground">$</span>
              <code>{entry.command}</code>
            </div>
          ))}
        </pre>
        {hasMobile && (
          <p className="border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
            {m.builderComposerNativeRun()}
          </p>
        )}
      </div>
    </div>
  );
}
