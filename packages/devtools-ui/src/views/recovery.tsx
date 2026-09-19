import { useEffect, useState } from "react";

import type { RecipeHistory, RecoveryManagement, RecoveryPoint, RecoveryResult } from "@/lib/types";

import { JsonView } from "@/components/json-view";
import { StatusLine } from "@/components/status-line";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { type Connection, callOperation, errorText, useConnection } from "@/lib/devframe";
import { useOperation } from "@/lib/use-operation";

function PointRow({
  point,
  connection,
  onChanged,
}: {
  point: RecoveryPoint;
  connection: Connection;
  onChanged: () => void;
}) {
  const [note, setNote] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [confirming, setConfirming] = useState(false);

  async function verify() {
    setBusy(true);
    try {
      const result = await callOperation<RecoveryManagement>(
        connection,
        "verify_project_recovery_point",
        { transactionId: point.id },
      );
      const verification = result.verification;
      setNote(
        verification
          ? verification.valid
            ? `Valid${verification.recoverable ? ", restorable" : ", not restorable"}`
            : verification.errors.join("; ")
          : (result.error ?? "No verification returned."),
      );
    } catch (error) {
      setNote(errorText(error));
    } finally {
      setBusy(false);
    }
  }

  async function restore() {
    // Two clicks: the first arms the destructive action, the second runs it.
    if (!confirming) {
      setConfirming(true);
      setNote("Restoring rewrites every file this transaction recorded. Click again to confirm.");
      return;
    }
    setConfirming(false);
    setBusy(true);
    try {
      const result = await callOperation<RecoveryResult>(
        connection,
        "recover_project_transaction",
        {
          transactionId: point.id,
        },
      );
      setNote(result.success ? "Restored. Rerun checks." : (result.error ?? "Restore failed."));
      onChanged();
    } catch (error) {
      setNote(errorText(error));
    } finally {
      setBusy(false);
    }
  }

  return (
    <li className="flex flex-col gap-1 py-2">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={point.valid ? (point.recoverable ? "success" : "warning") : "destructive"}>
          {point.valid ? (point.recoverable ? "restorable" : "valid") : "invalid"}
        </Badge>
        <span className="font-medium">{point.operation ?? "unknown"}</span>
        <span className="text-muted-foreground">{point.status}</span>
        <span className="text-muted-foreground">
          {point.createdAt ? new Date(point.createdAt).toLocaleString() : ""}
          {point.fileCount !== undefined ? ` · ${point.fileCount} files` : ""}
        </span>
      </div>
      <p className="font-mono text-[11px] text-muted-foreground">{point.id}</p>
      {point.errors.length ? (
        <p className="text-[11px] text-destructive">{point.errors.join("; ")}</p>
      ) : null}
      {!connection.isStatic ? (
        <div className="flex items-center gap-2">
          <Button size="xs" variant="outline" disabled={busy} onClick={() => void verify()}>
            Verify
          </Button>
          <Button
            size="xs"
            variant="destructive"
            disabled={busy || !point.recoverable}
            onClick={() => void restore()}
          >
            {confirming ? "Confirm restore" : "Restore"}
          </Button>
          {note ? <span className="text-[11px] text-muted-foreground">{note}</span> : null}
        </div>
      ) : null}
    </li>
  );
}

function Prune({ connection, onChanged }: { connection: Connection; onChanged: () => void }) {
  const preview = useOperation<RecoveryManagement>(connection, "prune_project_recovery_points");
  const previewed = preview.state.status === "done" ? preview.state.data : null;
  const [applied, setApplied] = useState<string | null>(null);

  async function applyPrune() {
    const token = previewed?.prune?.reviewToken;
    if (!token) return;
    setApplied(null);
    try {
      const result = await callOperation<RecoveryManagement>(
        connection,
        "prune_project_recovery_points",
        {
          apply: true,
          reviewToken: token,
        },
      );
      setApplied(
        result.success
          ? `Pruned ${result.prune?.pruned.length ?? 0} points.`
          : (result.error ?? "Prune failed."),
      );
      onChanged();
    } catch (error) {
      setApplied(errorText(error));
    }
  }

  return (
    <div className="flex flex-col gap-2 border-t border-border pt-3">
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled={connection.isStatic}
          onClick={() => void preview.run({ apply: false })}
        >
          Preview prune
        </Button>
        {connection.isStatic ? (
          <span className="text-xs text-muted-foreground">Not available in a static report.</span>
        ) : (
          <StatusLine
            state={preview.state}
            idle="Keeps the newest five valid points and anything younger than 30 days."
          />
        )}
      </div>
      {previewed?.prune ? (
        <div className="flex flex-col gap-2 text-xs">
          <p>
            {previewed.prune.candidates.length} candidate(s), {previewed.prune.retained.length}{" "}
            retained.
          </p>
          {previewed.prune.candidates.length &&
          previewed.prune.reviewToken &&
          !connection.isStatic ? (
            <Button
              size="sm"
              variant="destructive"
              className="w-fit"
              onClick={() => void applyPrune()}
            >
              Prune reviewed points
            </Button>
          ) : null}
          {applied ? <p className="text-muted-foreground">{applied}</p> : null}
        </div>
      ) : null}
    </div>
  );
}

export function RecoveryView() {
  const connection = useConnection();
  const points = useOperation<RecoveryManagement>(connection, "list_project_recovery_points");
  const history = useOperation<RecipeHistory>(connection, "get_recipe_history");
  const { run: loadPoints } = points;
  const { run: loadHistory } = history;

  useEffect(() => {
    void loadPoints();
    void loadHistory();
  }, [loadPoints, loadHistory]);

  const listed = points.state.status === "done" ? points.state.data : null;
  const recipes = history.state.status === "done" ? history.state.data : null;

  return (
    <div className="flex flex-col gap-4" data-view="recovery">
      <Card>
        <div className="flex items-center gap-2">
          <CardTitle>Recovery points</CardTitle>
          <Button size="xs" variant="ghost" onClick={() => void points.run()}>
            Refresh
          </Button>
        </div>
        <CardDescription>
          Every lifecycle apply records a transaction that can be verified and restored once.
        </CardDescription>
        <StatusLine state={points.state} idle="Loading recovery points." />
        {listed?.error ? <p className="text-xs text-destructive">{listed.error}</p> : null}
        {listed?.points?.length ? (
          <ul className="flex flex-col divide-y divide-border">
            {listed.points.map((point) => (
              <PointRow
                key={point.id}
                point={point}
                connection={connection}
                onChanged={() => void points.run()}
              />
            ))}
          </ul>
        ) : listed?.success ? (
          <p className="text-xs text-muted-foreground">No recovery points recorded yet.</p>
        ) : null}
        <Prune connection={connection} onChanged={() => void points.run()} />
      </Card>

      <Card>
        <CardTitle>Recipe history</CardTitle>
        <CardDescription>
          Generated recipes correlated with the transactions that wrote them.
        </CardDescription>
        <StatusLine state={history.state} idle="Loading recipe history." />
        {recipes?.recipes.length ? (
          <ul className="flex flex-col divide-y divide-border">
            {recipes.recipes.map((recipe) => (
              <li key={recipe.recipeId} className="flex flex-col gap-1 py-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{recipe.name}</span>
                  <Badge variant="outline">{recipe.adapterId}</Badge>
                  {recipe.persistent ? <Badge variant="secondary">persistent</Badge> : null}
                </div>
                <p className="font-mono text-[11px] text-muted-foreground">
                  {recipe.recoveryPoints.map((point) => point.id).join(", ") || "no transactions"}
                </p>
              </li>
            ))}
          </ul>
        ) : recipes ? (
          <p className="text-xs text-muted-foreground">
            No recipes have been generated in this project.
          </p>
        ) : null}
      </Card>

      {listed ? <JsonView value={listed} /> : null}
    </div>
  );
}
