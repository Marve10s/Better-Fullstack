import type { StatusReport } from "@/lib/types";

import { JsonView } from "@/components/json-view";
import { StatusLine } from "@/components/status-line";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useConnection } from "@/lib/devframe";
import { useOperation } from "@/lib/use-operation";

export function ChecksView() {
  const connection = useConnection();
  const { state, run } = useOperation<StatusReport>(connection, "check_project");
  const result = state.status === "done" ? state.data : null;

  return (
    <div className="flex flex-col gap-4" data-view="checks">
      <Card>
        <CardTitle>Verify generated targets</CardTitle>
        <CardDescription>
          Runs the same multi-target checks as the CLI. Build tools may fetch dependencies and write
          caches, locks, generated code, or build artifacts.
        </CardDescription>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => void run()}
            disabled={connection.isStatic || state.status === "loading"}
          >
            Run checks
          </Button>
          {connection.isStatic ? (
            <span className="text-xs text-muted-foreground">Not available in a static report.</span>
          ) : (
            <StatusLine state={state} idle="Nothing has run yet." />
          )}
        </div>
      </Card>

      {result ? (
        <Card>
          <div className="flex items-center gap-2">
            <CardTitle>{result.ok ? "All targets passed" : "Some targets failed"}</CardTitle>
            {result.verification ? (
              <Badge variant={result.verification.failedTargets === 0 ? "success" : "destructive"}>
                {result.verification.executedTargets}/{result.verification.expectedTargets} executed
                {result.verification.failedTargets
                  ? ` · ${result.verification.failedTargets} failed`
                  : ""}
              </Badge>
            ) : null}
          </div>
          {result.error ? <CardDescription>{result.error}</CardDescription> : null}
          <ul className="flex flex-col divide-y divide-border">
            {(result.targets ?? []).map((target) => (
              <li key={target.id} className="flex flex-col gap-1 py-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={target.status === "pass" ? "success" : "destructive"}
                    className="uppercase"
                  >
                    {target.status}
                  </Badge>
                  <span className="font-medium">{target.id}</span>
                  <span className="text-muted-foreground">
                    {target.role} · {target.toolId} · {target.toolchain}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">{target.reason}</p>
                {target.executedCommands.length ? (
                  <pre className="overflow-auto bg-muted/40 p-2 font-mono text-[11px]">
                    {target.executedCommands.join("\n")}
                  </pre>
                ) : null}
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      {result ? <JsonView value={result} /> : null}
    </div>
  );
}
