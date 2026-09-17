import { useEffect } from "react";

import type { StatusReport } from "@/lib/types";

import { JsonView } from "@/components/json-view";
import { StatusLine } from "@/components/status-line";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useConnection } from "@/lib/devframe";
import { useOperation } from "@/lib/use-operation";

function statusVariant(status: "pass" | "warn" | "fail") {
  return status === "pass" ? "success" : status === "warn" ? "warning" : "destructive";
}

export function OverviewView() {
  const connection = useConnection();
  const { state, run } = useOperation<StatusReport>(connection, "get_project_status");

  useEffect(() => {
    void run();
  }, [run]);

  const report = state.status === "done" ? state.data : null;

  return (
    <div className="flex flex-col gap-4" data-view="overview">
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => void run()}
          disabled={state.status === "loading"}
        >
          Refresh status
        </Button>
        <StatusLine state={state} idle="Loading the project report." />
      </div>

      {report && !report.success ? (
        <Card>
          <CardTitle>No Better Fullstack project here</CardTitle>
          <CardDescription>{report.error}</CardDescription>
          <p className="font-mono text-[11px] text-muted-foreground">{report.projectDir}</p>
        </Card>
      ) : null}

      {report?.success ? (
        <>
          <Card>
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle data-testid="health">{report.ok ? "Ready" : "Needs attention"}</CardTitle>
              <Badge variant={report.ok ? "success" : "warning"}>
                {report.summary?.fail ?? 0} failed · {report.summary?.warn ?? 0} warnings
              </Badge>
              {report.ecosystem ? <Badge variant="outline">{report.ecosystem}</Badge> : null}
            </div>
            <CardDescription className="font-mono text-[11px]">{report.projectDir}</CardDescription>
            {report.graphSummary ? <p className="text-xs">{report.graphSummary}</p> : null}
            {report.stackPartSpecs?.length ? (
              <ul className="flex flex-wrap gap-1">
                {report.stackPartSpecs.map((spec) => (
                  <li key={spec}>
                    <Badge variant="secondary" className="font-mono">
                      {spec}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : null}
          </Card>

          {report.prerequisites ? (
            <Card>
              <CardTitle>Lifecycle</CardTitle>
              <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-xs">
                <dt className="text-muted-foreground">Baseline</dt>
                <dd>
                  {report.prerequisites.manifest.state}
                  {report.prerequisites.manifest.version
                    ? ` (manifest v${report.prerequisites.manifest.version})`
                    : ""}
                </dd>
                <dt className="text-muted-foreground">Provenance</dt>
                <dd>{report.prerequisites.wave1.generatorProvenance}</dd>
                <dt className="text-muted-foreground">Recovery</dt>
                <dd>{report.prerequisites.wave1.recovery}</dd>
                {report.updateSupport ? (
                  <>
                    <dt className="text-muted-foreground">Update window</dt>
                    <dd>
                      {report.updateSupport.eligibility}
                      <span className="text-muted-foreground">
                        {" "}
                        · {report.updateSupport.reason}
                      </span>
                    </dd>
                  </>
                ) : null}
              </dl>
              {report.prerequisites.wave1.blockers.length ? (
                <ul className="list-disc pl-4 text-xs text-warning">
                  {report.prerequisites.wave1.blockers.map((blocker) => (
                    <li key={blocker}>{blocker}</li>
                  ))}
                </ul>
              ) : null}
            </Card>
          ) : null}

          {report.checks?.length ? (
            <Card>
              <CardTitle>Checks</CardTitle>
              <ul className="flex flex-col divide-y divide-border">
                {report.checks.map((check) => (
                  <li
                    key={`${check.label}-${check.detail ?? ""}`}
                    className="flex items-start gap-2 py-1.5"
                  >
                    <Badge variant={statusVariant(check.status)} className="mt-0.5 w-12 uppercase">
                      {check.status}
                    </Badge>
                    <div className="flex flex-col">
                      <span>{check.label}</span>
                      {check.detail ? (
                        <span className="text-[11px] text-muted-foreground">{check.detail}</span>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}

          {report.upgrade ? (
            <Card>
              <CardTitle>Template drift</CardTitle>
              {report.upgrade.available && report.upgrade.summary ? (
                <dl className="grid grid-cols-3 gap-2 text-xs sm:grid-cols-4">
                  {Object.entries(report.upgrade.summary).map(([key, value]) => (
                    <div key={key} className="border border-border p-2">
                      <dt className="text-muted-foreground">{key}</dt>
                      <dd className="text-sm font-semibold">{value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <CardDescription>
                  {report.upgrade.error ?? "Drift could not be computed."}
                </CardDescription>
              )}
              {report.upgrade.blockers.length ? (
                <ul className="list-disc pl-4 text-xs text-warning">
                  {report.upgrade.blockers.map((blocker) => (
                    <li key={blocker}>{blocker}</li>
                  ))}
                </ul>
              ) : null}
            </Card>
          ) : null}
        </>
      ) : null}

      {report ? <JsonView value={report} /> : null}
    </div>
  );
}
