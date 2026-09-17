import { useEffect } from "react";

import type { ContextPart, ProjectContext } from "@/lib/types";

import { JsonView } from "@/components/json-view";
import { StatusLine } from "@/components/status-line";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useConnection } from "@/lib/devframe";
import { useOperation } from "@/lib/use-operation";

function levelVariant(level: string) {
  if (level === "runtime-verified") return "success";
  if (level === "build-verified" || level === "generated") return "secondary";
  return "warning";
}

function PartList({ title, parts }: { title: string; parts: ContextPart[] }) {
  return (
    <Card>
      <CardTitle>{title}</CardTitle>
      {parts.length === 0 ? (
        <CardDescription>None.</CardDescription>
      ) : (
        <ul className="flex flex-col divide-y divide-border">
          {parts.map((part) => (
            <li key={part.id} className="flex flex-col gap-1 py-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs">{part.spec}</span>
                {part.evidence ? (
                  <>
                    <Badge variant={levelVariant(part.evidence.level)}>{part.evidence.level}</Badge>
                    <Badge variant="outline">{part.evidence.maturity}</Badge>
                    <Badge variant="outline">{part.evidence.freshness}</Badge>
                  </>
                ) : (
                  <Badge variant="outline">no evidence record</Badge>
                )}
              </div>
              {part.evidence?.limitation ? (
                <p className="text-[11px] text-muted-foreground">{part.evidence.limitation}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

export function EvidenceView() {
  const connection = useConnection();
  const { state, run } = useOperation<ProjectContext>(connection, "get_project_context");

  useEffect(() => {
    void run();
  }, [run]);

  const context = state.status === "done" ? state.data : null;

  return (
    <div className="flex flex-col gap-4" data-view="evidence">
      <StatusLine state={state} idle="Loading project context." />
      {context ? (
        <>
          <Card>
            <CardTitle>Project</CardTitle>
            <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-xs">
              <dt className="text-muted-foreground">Ecosystem</dt>
              <dd>{context.project.ecosystem}</dd>
              <dt className="text-muted-foreground">Package manager</dt>
              <dd>{context.project.packageManager}</dd>
              <dt className="text-muted-foreground">Workspace</dt>
              <dd>{context.project.workspaceShape}</dd>
              <dt className="text-muted-foreground">Compatibility</dt>
              <dd>
                {context.compatibility.valid
                  ? "valid"
                  : `${context.compatibility.issues.length} issue(s)`}
              </dd>
            </dl>
            {context.compatibility.issues.length ? (
              <ul className="list-disc pl-4 text-xs text-warning">
                {context.compatibility.issues.map((issue) => (
                  <li key={issue.code + issue.message}>{issue.message}</li>
                ))}
              </ul>
            ) : null}
          </Card>
          <PartList title="Primary roles" parts={context.roles} />
          <PartList title="Capabilities" parts={context.capabilities} />
          {context.safeNextActions?.length ? (
            <Card>
              <CardTitle>Safe next actions</CardTitle>
              <ul className="flex flex-col gap-1 text-xs">
                {context.safeNextActions.map((action) => (
                  <li key={action.id} className="flex flex-col">
                    <code className="font-mono">{action.command}</code>
                    <span className="text-muted-foreground">{action.reason}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}
          <JsonView value={context} />
        </>
      ) : null}
    </div>
  );
}
