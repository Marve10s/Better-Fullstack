import { useEffect, useState } from "react";

import type { PublicVerificationReport } from "@/lib/docs/release-verification";

import { getLocaleDateTag } from "@/lib/i18n/locales";
import { cn } from "@/lib/platform/utils";
import { m } from "@/paraglide/messages.js";
import { getLocale } from "@/paraglide/runtime.js";

type VerificationApiResponse = {
  verification?: PublicVerificationReport;
};

function formattedDate(value: string | undefined): string {
  if (!value) return m.docsVerificationNotAvailable();
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return m.docsVerificationNotAvailable();
  return new Intl.DateTimeFormat(getLocaleDateTag(getLocale()), {
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
        <p className="m-0 font-medium">{m.docsVerificationUnavailableTitle()}</p>
        <p className="mb-0 text-muted-foreground text-sm">{m.docsVerificationUnavailableBody()}</p>
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
              {verified ? m.docsVerificationCurrent() : m.docsVerificationNotCurrent()}
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
            {report.evidenceLevel ?? m.docsVerificationNoEvidence()}
          </span>
        </div>

        <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-muted-foreground">{m.docsVerificationRelease()}</dt>
            <dd className="mt-1 font-medium">
              {report.version ?? m.docsVerificationNotVerified()}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{m.docsVerificationCommit()}</dt>
            <dd className="mt-1 font-mono text-xs">
              {report.commit ? report.commit.slice(0, 12) : m.docsVerificationNotVerified()}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{m.docsVerificationReceiptCreated()}</dt>
            <dd className="mt-1 font-medium">{formattedDate(report.createdAt)} UTC</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">{m.docsVerificationReceiptValidUntil()}</dt>
            <dd className="mt-1 font-medium">{formattedDate(report.validUntil)} UTC</dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-wrap gap-4 text-sm">
          <a href={report.receiptUrl} rel="noreferrer" target="_blank">
            {m.docsVerificationOpenReceipt()}
          </a>
          {report.requiredCiUrl ? (
            <a href={report.requiredCiUrl} rel="noreferrer" target="_blank">
              {m.docsVerificationOpenCi()}
            </a>
          ) : null}
        </div>
      </section>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 font-medium">{m.docsVerificationRecipe()}</th>
              <th className="px-4 py-3 font-medium">{m.docsVerificationResult()}</th>
              <th className="px-4 py-3 font-medium">{m.docsVerificationEcosystems()}</th>
              <th className="px-4 py-3 font-medium">{m.docsVerificationStages()}</th>
              <th className="px-4 py-3 font-medium">{m.docsVerificationBoundary()}</th>
            </tr>
          </thead>
          <tbody>
            {report.cases.map((entry) => (
              <tr className="border-border border-t" key={entry.id}>
                <td className="px-4 py-3 font-mono text-xs">{entry.id}</td>
                <td className="px-4 py-3">{entry.result}</td>
                <td className="px-4 py-3">
                  {entry.ecosystems.join(", ") || m.docsVerificationNotRun()}
                </td>
                <td className="px-4 py-3">
                  {entry.requiredStages.join(", ") || m.docsVerificationNotRun()}
                </td>
                <td className="px-4 py-3">
                  {entry.runtimeLimitation ?? m.docsVerificationNoAssertion()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-muted-foreground text-sm">{m.docsVerificationLimits()}</p>
    </div>
  );
}
