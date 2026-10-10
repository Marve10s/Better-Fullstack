import { useCallback, useEffect, useState } from "react";

import {
  getBrowserTelemetryStatus,
  setBrowserTelemetryEnabled,
  subscribeBrowserTelemetry,
  type BrowserTelemetryStatus,
} from "@/lib/analytics/product-analytics";
import { cn } from "@/lib/platform/utils";
import { m } from "@/paraglide/messages.js";

const STATUS_COPY: Record<BrowserTelemetryStatus["reason"], () => string> = {
  enabled: m.docsTelemetryEnabled,
  "local-opt-out": m.docsTelemetryLocalOptOut,
  "do-not-track": m.docsTelemetryDoNotTrack,
  "global-privacy-control": m.docsTelemetryGlobalPrivacyControl,
  unavailable: m.docsTelemetryUnavailable,
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
        {STATUS_COPY[status.reason]()}
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
          {m.docsTelemetryDisable()}
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
          {m.docsTelemetryEnable()}
        </button>
      </div>
    </div>
  );
}
