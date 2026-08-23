import { useEffect, useState } from "react";

import type { PublicVerificationReport } from "@/lib/docs/release-verification";

import { cn } from "@/lib/utils";

type VerificationApiResponse = {
  verification?: PublicVerificationReport;
};

function formattedDate(value: string | undefined): string {
  if (!value) return "Not available";
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return "Not available";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(timestamp);
}

export function VerificationStatus() {
  const [report, setReport] = useState<PublicVerificationReport | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/verified-combinations", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((value: VerificationApiResponse | null) => setReport(value?.verification ?? null))
      .catch(() => setReport(null));
    return () => controller.abort();
  }, []);

  if (!report) {
    return (
      <div aria-live="polite" className="rounded-lg border border-border bg-muted/30 p-5">
        <p className="m-0 font-medium">Release evidence unavailable</p>
        <p className="mb-0 text-muted-foreground text-sm">
          No receipt has been loaded, so this page makes no build-verification claim.
        </p>
      </div>
    );
  }

  const verified = report.status === "verified";
  return (
    <div aria-live="polite" className="not-prose space-y-5">
      <section className="rounded-lg border border-border bg-card p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="m-0 font-semibold text-lg">
              {verified ? "Build verification is current" : "Build verification is not current"}
            </p>
            <p className="mt-1 mb-0 max-w-2xl text-muted-foreground text-sm leading-6">
              {report.reason}
            </p>
          </div>
          <span
            className={cn(
              "rounded-md border px-2.5 py-1 font-medium text-xs",
              verified
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300",
            )}
          >
            {report.evidenceLevel ?? "No current evidence"}
          </span>
        </div>

        <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-muted-foreground">Release</dt>
            <dd className="mt-1 font-medium">{report.version ?? "Not verified"}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Commit</dt>
            <dd className="mt-1 font-mono text-xs">
              {report.commit ? report.commit.slice(0, 12) : "Not verified"}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Receipt created</dt>
            <dd className="mt-1 font-medium">{formattedDate(report.createdAt)} UTC</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Receipt valid until</dt>
            <dd className="mt-1 font-medium">{formattedDate(report.validUntil)} UTC</dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-wrap gap-4 text-sm">
          <a href={report.receiptUrl} rel="noreferrer" target="_blank">
            Open release receipt
          </a>
          {report.requiredCiUrl ? (
            <a href={report.requiredCiUrl} rel="noreferrer" target="_blank">
              Open required CI run
            </a>
          ) : null}
        </div>
      </section>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 font-medium">Recipe</th>
              <th className="px-4 py-3 font-medium">Result</th>
              <th className="px-4 py-3 font-medium">Ecosystems</th>
              <th className="px-4 py-3 font-medium">Required stages</th>
              <th className="px-4 py-3 font-medium">Runtime boundary</th>
            </tr>
          </thead>
          <tbody>
            {report.cases.map((entry) => (
              <tr className="border-border border-t" key={entry.id}>
                <td className="px-4 py-3 font-mono text-xs">{entry.id}</td>
                <td className="px-4 py-3">{entry.result}</td>
                <td className="px-4 py-3">{entry.ecosystems.join(", ") || "Not run"}</td>
                <td className="px-4 py-3">{entry.requiredStages.join(", ") || "Not run"}</td>
                <td className="px-4 py-3">
                  {entry.runtimeLimitation ?? "No runtime assertion recorded"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-muted-foreground text-sm">
        Runtime verification applies only to the recorded boundaries and limitations above. It does
        not prove behavior outside those assertions. ScaffBench measures model performance and does
        not raise this product evidence level.
      </p>
    </div>
  );
}
