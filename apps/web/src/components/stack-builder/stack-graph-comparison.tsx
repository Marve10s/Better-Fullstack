import {
  compareStackGraphs,
  getCapabilityInventory,
  legacyProjectConfigToStackParts,
  type StackPart,
  type StackPartComparisonSnapshot,
  type StackPartEvidenceSnapshot,
} from "@better-fullstack/types";
import { type ReactNode, useMemo } from "react";
import {
  TbArrowRight as ArrowRight,
  TbCircleCheck as CircleCheck,
  TbMinus as Minus,
  TbPlus as Plus,
  TbRefresh as Refresh,
  TbRoute as Route,
  TbShieldCheck as ShieldCheck,
} from "react-icons/tb";

import type { StackState } from "@/lib/stack-defaults";

import { stackStateToProjectConfig } from "@/lib/preview-config";
import { cn } from "@/lib/utils";

const INVENTORY = getCapabilityInventory();

function evidenceForPart(part: StackPart): StackPartEvidenceSnapshot | null {
  const exact = INVENTORY.find(
    (record) => record.ecosystem === part.ecosystem && record.optionId === part.toolId,
  );
  const record = exact ?? INVENTORY.find((candidate) => candidate.optionId === part.toolId);
  return record
    ? {
        level: record.evidenceLevel,
        maturity: record.maturity,
        freshness: record.freshness,
      }
    : null;
}

export function stackStateToStackParts(stack: StackState): StackPart[] {
  const config = stackStateToProjectConfig(stack);
  return config.stackParts ?? legacyProjectConfigToStackParts(config);
}

function Evidence({ value }: { value?: StackPartEvidenceSnapshot | null }) {
  if (!value) return <span className="text-muted-foreground/60">No evidence record</span>;
  return (
    <span className="font-mono text-[10px] text-muted-foreground">
      {value.level} · {value.maturity ?? "unknown maturity"} · {value.freshness ?? "unknown age"}
    </span>
  );
}

function Part({ part, muted = false }: { part: StackPartComparisonSnapshot; muted?: boolean }) {
  return (
    <div className={cn("min-w-0 space-y-1", muted && "opacity-65")}>
      <div className="break-all font-mono text-[11px] text-foreground">{part.spec}</div>
      {part.ownerSpec ? (
        <div className="text-[10px] text-muted-foreground">Owned by {part.ownerSpec}</div>
      ) : null}
      <Evidence value={part.evidence} />
    </div>
  );
}

function Section({
  icon,
  title,
  count,
  children,
}: {
  icon: ReactNode;
  title: string;
  count: number;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-border/50">
      <div className="flex items-center gap-2 border-b border-border/40 bg-muted/20 px-3 py-2">
        {icon}
        <h3 className="text-xs font-medium text-foreground">{title}</h3>
        <span className="ml-auto font-mono text-[10px] text-muted-foreground">{count}</span>
      </div>
      <div className="divide-y divide-border/35">{children}</div>
    </section>
  );
}

export function StackGraphComparison({
  before,
  after,
  beforeLabel = "Current",
  afterLabel = "Candidate",
  className,
}: {
  before: readonly StackPart[];
  after: readonly StackPart[];
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}) {
  const comparison = useMemo(
    () => compareStackGraphs(before, after, { evidenceForPart }),
    [after, before],
  );

  if (!comparison.hasChanges) {
    return (
      <div
        className={cn(
          "flex items-start gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-4",
          className,
        )}
      >
        <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
        <div>
          <p className="text-xs font-medium text-foreground">No Stack Graph changes</p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {comparison.unchanged} part{comparison.unchanged === 1 ? "" : "s"} and their evidence
            records match.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-xl border border-border/50 bg-muted/[0.08] px-3 py-2 text-[10px] uppercase tracking-wide text-muted-foreground">
        <span>{beforeLabel}</span>
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="text-right">{afterLabel}</span>
      </div>

      <Section
        title="Replacements"
        count={comparison.replacements.length}
        icon={<Refresh className="h-3.5 w-3.5 text-amber-500" />}
      >
        {comparison.replacements.length > 0 ? (
          comparison.replacements.map((replacement) => (
            <div
              key={`${replacement.before.id}:${replacement.after.id}`}
              className="grid grid-cols-[1fr_auto_1fr] items-start gap-3 p-3"
            >
              <Part part={replacement.before} muted />
              <ArrowRight className="mt-1 h-3.5 w-3.5 text-muted-foreground" />
              <Part part={replacement.after} />
            </div>
          ))
        ) : (
          <div className="p-3 text-[11px] text-muted-foreground">No replacements.</div>
        )}
      </Section>

      <div className="grid gap-3 sm:grid-cols-2">
        <Section
          title="Additions"
          count={comparison.additions.length}
          icon={<Plus className="h-3.5 w-3.5 text-emerald-500" />}
        >
          {comparison.additions.length > 0 ? (
            comparison.additions.map((part) => (
              <div key={part.id} className="p-3">
                <Part part={part} />
              </div>
            ))
          ) : (
            <div className="p-3 text-[11px] text-muted-foreground">No additions.</div>
          )}
        </Section>
        <Section
          title="Removals"
          count={comparison.removals.length}
          icon={<Minus className="h-3.5 w-3.5 text-rose-500" />}
        >
          {comparison.removals.length > 0 ? (
            comparison.removals.map((part) => (
              <div key={part.id} className="p-3">
                <Part part={part} muted />
              </div>
            ))
          ) : (
            <div className="p-3 text-[11px] text-muted-foreground">No removals.</div>
          )}
        </Section>
      </div>

      <Section
        title="Owning Stack Part changes"
        count={comparison.ownerChanges.length}
        icon={<Route className="h-3.5 w-3.5 text-sky-500" />}
      >
        {comparison.ownerChanges.length > 0 ? (
          comparison.ownerChanges.map((change) => (
            <div key={`${change.before.id}:${change.after.id}`} className="space-y-1 p-3">
              <div className="font-mono text-[11px] text-foreground">{change.after.spec}</div>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <span>{change.before.ownerSpec ?? change.beforeOwnerId ?? "unowned"}</span>
                <ArrowRight className="h-3 w-3 shrink-0" />
                <span>{change.after.ownerSpec ?? change.afterOwnerId ?? "unowned"}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-3 text-[11px] text-muted-foreground">No ownership changes.</div>
        )}
      </Section>

      <Section
        title="Evidence changes"
        count={comparison.evidenceChanges.length}
        icon={<ShieldCheck className="h-3.5 w-3.5 text-violet-500" />}
      >
        {comparison.evidenceChanges.length > 0 ? (
          comparison.evidenceChanges.map((change) => (
            <div key={`${change.before.id}:${change.after.id}`} className="space-y-1.5 p-3">
              <div className="font-mono text-[11px] text-foreground">{change.after.spec}</div>
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                <Evidence value={change.beforeEvidence} />
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
                <Evidence value={change.afterEvidence} />
              </div>
            </div>
          ))
        ) : (
          <div className="p-3 text-[11px] text-muted-foreground">
            No evidence-level, maturity, or freshness changes.
          </div>
        )}
      </Section>
    </div>
  );
}
