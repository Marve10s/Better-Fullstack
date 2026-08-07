import { useCallback, useEffect, useState } from "react";

import {
  getBrowserTelemetryStatus,
  setBrowserTelemetryEnabled,
  subscribeBrowserTelemetry,
  type BrowserTelemetryStatus,
} from "@/lib/product-analytics";
import { cn } from "@/lib/utils";

const STATUS_COPY: Record<BrowserTelemetryStatus["reason"], string> = {
  enabled: "Browser analytics are enabled.",
  "local-opt-out": "Browser analytics are disabled for this browser.",
  "do-not-track": "Browser analytics are disabled because Do Not Track is enabled.",
  "global-privacy-control":
    "Browser analytics are disabled because Global Privacy Control is enabled.",
  unavailable: "Browser analytics preferences are unavailable in this environment.",
};

export function BrowserTelemetryControls() {
  const [status, setStatus] = useState<BrowserTelemetryStatus>({
    enabled: false,
    reason: "unavailable",
  });

  useEffect(() => {
    setStatus(getBrowserTelemetryStatus());
    return subscribeBrowserTelemetry(() => {
      setStatus(getBrowserTelemetryStatus());
    });
  }, []);

  const disable = useCallback(() => {
    setStatus(setBrowserTelemetryEnabled(false));
  }, []);

  const enable = useCallback(() => {
    setStatus(setBrowserTelemetryEnabled(true));
  }, []);

  return (
    <div className="my-6 rounded-lg border border-border bg-card/40 p-4">
      <p className="m-0 text-sm text-foreground" aria-live="polite">
        {STATUS_COPY[status.reason]}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={disable}
          disabled={status.reason === "unavailable" || status.reason === "local-opt-out"}
          className={cn(
            "rounded-md border px-3 py-1.5 text-sm transition-colors",
            "border-border bg-background hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50",
          )}
        >
          Disable browser analytics
        </button>
        <button
          type="button"
          onClick={enable}
          disabled={
            status.reason === "unavailable" ||
            status.reason === "do-not-track" ||
            status.reason === "global-privacy-control" ||
            status.enabled
          }
          className={cn(
            "rounded-md border px-3 py-1.5 text-sm transition-colors",
            "border-border bg-background hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50",
          )}
        >
          Enable browser analytics
        </button>
      </div>
    </div>
  );
}
