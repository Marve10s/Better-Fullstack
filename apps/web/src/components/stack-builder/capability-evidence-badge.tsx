import {
  getCapabilityInventory,
  type CapabilityInventoryRecord,
  type OptionCategory,
  type OptionCategoryEcosystem,
} from "@better-fullstack/types";
import { createContext, memo, type ReactNode, useContext, useEffect, useMemo, useState } from "react";

import type { PublicCapabilityEvidenceReport } from "@/lib/docs/release-verification";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/platform/utils";

const BASELINE_INVENTORY = getCapabilityInventory();

const CapabilityEvidenceContext =
  createContext<readonly CapabilityInventoryRecord[]>(BASELINE_INVENTORY);
const CapabilityEvidenceLookupContext = createContext(
  new Map(BASELINE_INVENTORY.map((record) => [evidenceKey(record), record])),
);

function evidenceKey(record: { ecosystem: string; category: string; optionId: string }) {
  return `${record.ecosystem}:${record.category}:${record.optionId}`;
}

export function useCapabilityEvidenceInventory() {
  return useContext(CapabilityEvidenceContext);
}

export function CapabilityEvidenceProvider({ children }: { children: ReactNode }) {
  const [inventory, setInventory] =
    useState<readonly CapabilityInventoryRecord[]>(BASELINE_INVENTORY);
  const lookup = useMemo(
    () => new Map(inventory.map((record) => [evidenceKey(record), record])),
    [inventory],
  );

  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/capability-evidence", {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) return null;
        return (await response.json()) as PublicCapabilityEvidenceReport;
      })
      .then((report) => {
        if (report?.inventory.length) setInventory(report.inventory);
        return undefined;
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  return (
    <CapabilityEvidenceContext.Provider value={inventory}>
      <CapabilityEvidenceLookupContext.Provider value={lookup}>
        {children}
      </CapabilityEvidenceLookupContext.Provider>
    </CapabilityEvidenceContext.Provider>
  );
}

function useCapabilityEvidence(
  ecosystem: OptionCategoryEcosystem,
  category: OptionCategory,
  optionId: string,
): CapabilityInventoryRecord | undefined {
  const lookup = useContext(CapabilityEvidenceLookupContext);
  return lookup.get(evidenceKey({ ecosystem, category, optionId }));
}

const EVIDENCE_LABELS = {
  generated: "Generated",
  "build-verified": "Build verified",
  "runtime-verified": "Runtime verified",
} as const;

export const CapabilityEvidenceBadge = memo(function CapabilityEvidenceBadge({
  ecosystem,
  category,
  optionId,
  className,
}: {
  ecosystem: OptionCategoryEcosystem;
  category: OptionCategory;
  optionId: string;
  className?: string;
}) {
  const evidence = useCapabilityEvidence(ecosystem, category, optionId);
  if (!evidence || evidence.evidenceLevel === "listed") return null;
  const warning =
    evidence.maturity !== "stable" || !["current", "unverified"].includes(evidence.freshness);

  return (
    <Tooltip>
      <TooltipTrigger
        render={<span />}
        tabIndex={0}
        onClick={(event) => event.stopPropagation()}
        className={cn(
          "mt-2 inline-flex cursor-help rounded-sm border px-1.5 py-0.5 font-mono text-[9px]",
          evidence.evidenceLevel === "runtime-verified" && !warning
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : warning
              ? "border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-400"
              : "border-border bg-muted/40 text-muted-foreground",
          className,
        )}
      >
        {EVIDENCE_LABELS[evidence.evidenceLevel]}
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p className="font-medium">
          {evidence.maturity} · {evidence.freshness}
        </p>
        <p className="mt-1 text-xs">{evidence.limitation}</p>
        <p className="mt-1 text-xs">Maintainer: {evidence.maintenanceOwner}</p>
        {evidence.lastVerifiedVersion ? (
          <p className="mt-1 text-xs">Verified in {evidence.lastVerifiedVersion}</p>
        ) : null}
      </TooltipContent>
    </Tooltip>
  );
});
