import { useState } from "react";

import type { ConfigRepair, UpdatePlan } from "@/lib/types";

import { JsonView } from "@/components/json-view";
import { StatusLine } from "@/components/status-line";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useConnection } from "@/lib/devframe";
import { useOperation } from "@/lib/use-operation";

function FileList({ title, paths }: { title: string; paths: string[] }) {
  if (paths.length === 0) return null;
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
        {title} ({paths.length})
      </span>
      <ul className="max-h-40 overflow-auto font-mono text-[11px]">
        {paths.map((path) => (
          <li key={path}>{path}</li>
        ))}
      </ul>
    </div>
  );
}

function TemplateUpdate() {
  const connection = useConnection();
  const plan = useOperation<UpdatePlan>(connection, "plan_project_update");
  const apply = useOperation<UpdatePlan>(connection, "apply_project_update");
  const [acknowledge, setAcknowledge] = useState(false);
  const planned = plan.state.status === "done" ? plan.state.data : null;
  const applied = apply.state.status === "done" ? apply.state.data : null;
  const canApply = Boolean(
    planned?.success && planned.reviewToken && planned.applyAllowed !== false,
  );

  return (
    <Card data-section="template-update">
      <CardTitle>Template update</CardTitle>
      <CardDescription>
        Classifies drift between the recorded baseline and the current templates. Apply writes only
        reviewed files inside a recoverable transaction.
      </CardDescription>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          onClick={() => void plan.run()}
          disabled={plan.state.status === "loading"}
          data-action="plan-update"
        >
          Plan update
        </Button>
        <StatusLine state={plan.state} idle="Plan before applying." />
      </div>

      {planned ? (
        <div className="flex flex-col gap-3" data-testid="update-plan">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={planned.success ? "success" : "destructive"}>
              {planned.success ? "Plan ready" : "Plan blocked"}
            </Badge>
            {planned.guarantee ? <Badge variant="outline">{planned.guarantee}</Badge> : null}
            {planned.reviewToken ? <Badge variant="outline">review token issued</Badge> : null}
          </div>
          {planned.error ? <p className="text-xs text-destructive">{planned.error}</p> : null}
          {planned.blockers?.length ? (
            <ul className="list-disc pl-4 text-xs text-warning">
              {planned.blockers.map((blocker) => (
                <li key={blocker}>{blocker}</li>
              ))}
            </ul>
          ) : null}
          {planned.plan ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <FileList title="Actionable" paths={planned.plan.actionable} />
              <FileList title="Template drift" paths={planned.plan.drift} />
              <FileList title="New files" paths={planned.plan.newFiles} />
              <FileList title="Merged" paths={planned.plan.merged} />
              <FileList title="User edited" paths={planned.plan.userEdited} />
              <FileList title="Conflicts" paths={planned.plan.conflicts} />
              <FileList
                title="Manual review"
                paths={planned.plan.manual.map((file) => file.path)}
              />
              <FileList title="Removed by template" paths={planned.plan.removed} />
            </div>
          ) : null}

          {canApply && !connection.isStatic ? (
            <div className="flex flex-col gap-2 border-t border-border pt-3">
              {planned.requiresUnprovenManifestV1Acknowledgement ? (
                <label className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={acknowledge}
                    onChange={(event) => setAcknowledge(event.target.checked)}
                  />
                  I understand this project's lineage is unverified and still want to apply.
                </label>
              ) : null}
              <div className="flex items-center gap-2">
                <Button
                  variant="destructive"
                  disabled={
                    apply.state.status === "loading" ||
                    (planned.requiresUnprovenManifestV1Acknowledgement && !acknowledge)
                  }
                  onClick={() =>
                    void apply.run({
                      reviewToken: planned.reviewToken,
                      acknowledgeUnprovenManifestV1: acknowledge,
                    })
                  }
                >
                  Apply reviewed update
                </Button>
                <StatusLine state={apply.state} idle="Applies exactly the files listed above." />
              </div>
            </div>
          ) : null}
          {applied ? (
            <div className="flex flex-col gap-1 border-t border-border pt-3 text-xs">
              <Badge variant={applied.success ? "success" : "destructive"} className="w-fit">
                {applied.success ? "Applied" : "Apply failed"}
              </Badge>
              {applied.error ? <p className="text-destructive">{applied.error}</p> : null}
              {applied.recoveryId ? (
                <p className="text-muted-foreground">
                  Recovery point <span className="font-mono">{applied.recoveryId}</span>
                </p>
              ) : null}
            </div>
          ) : null}
          <JsonView value={applied ?? planned} />
        </div>
      ) : null}
    </Card>
  );
}

function ConfigRepairSection() {
  const connection = useConnection();
  const plan = useOperation<ConfigRepair>(connection, "plan_doctor_fix");
  const apply = useOperation<ConfigRepair>(connection, "apply_doctor_fix");
  const planned = plan.state.status === "done" ? plan.state.data : null;
  const applied = apply.state.status === "done" ? apply.state.data : null;

  return (
    <Card data-section="config-repair">
      <CardTitle>Config repair</CardTitle>
      <CardDescription>
        Repairs Stack Graph and compatibility-cache drift inside bts.jsonc, the same as `doctor
        --fix`.
      </CardDescription>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          onClick={() => void plan.run()}
          disabled={plan.state.status === "loading"}
        >
          Plan repair
        </Button>
        <StatusLine state={plan.state} idle="Plan before applying." />
      </div>
      {planned ? (
        <div className="flex flex-col gap-2 text-xs">
          {planned.error ? <p className="text-destructive">{planned.error}</p> : null}
          {planned.success && !planned.changed ? (
            <p className="text-muted-foreground">bts.jsonc already matches the canonical graph.</p>
          ) : null}
          {planned.changes?.length ? (
            <ul className="flex flex-col divide-y divide-border">
              {planned.changes.map((change) => (
                <li key={`${change.action}-${change.path}`} className="flex gap-2 py-1">
                  <Badge variant="outline" className="uppercase">
                    {change.action}
                  </Badge>
                  <span className="font-mono">{change.path}</span>
                  <span className="text-muted-foreground">{change.reason}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {planned.reviewToken && !connection.isStatic ? (
            <div className="flex items-center gap-2">
              <Button
                variant="destructive"
                size="sm"
                disabled={apply.state.status === "loading"}
                onClick={() => void apply.run({ reviewToken: planned.reviewToken })}
              >
                Apply repair
              </Button>
              <StatusLine state={apply.state} idle="Writes bts.jsonc in a recovery transaction." />
            </div>
          ) : null}
          {applied ? (
            <Badge variant={applied.success ? "success" : "destructive"} className="w-fit">
              {applied.success
                ? `Applied${applied.recoveryId ? ` · ${applied.recoveryId}` : ""}`
                : applied.error}
            </Badge>
          ) : null}
          <JsonView value={applied ?? planned} />
        </div>
      ) : null}
    </Card>
  );
}

export function UpdateView() {
  return (
    <div className="flex flex-col gap-4" data-view="update">
      <TemplateUpdate />
      <ConfigRepairSection />
    </div>
  );
}
