import { getCapabilityInventory, type CapabilityInventoryRecord } from "@better-fullstack/types";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";

import type { PublicCapabilityEvidenceReport } from "@/lib/docs/release-verification";

const BASELINE_INVENTORY = getCapabilityInventory();

const CapabilityEvidenceContext =
  createContext<readonly CapabilityInventoryRecord[]>(BASELINE_INVENTORY);

export function useCapabilityEvidenceInventory() {
  return useContext(CapabilityEvidenceContext);
}

export function CapabilityEvidenceProvider({ children }: { children: ReactNode }) {
  const [inventory, setInventory] =
    useState<readonly CapabilityInventoryRecord[]>(BASELINE_INVENTORY);

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
      {children}
    </CapabilityEvidenceContext.Provider>
  );
}
