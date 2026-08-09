import {
  TbCircleCheck as CheckCircle2,
  TbAlertCircle as CircleAlert,
  TbClockHour3 as Clock3,
  TbExternalLink as ExternalLink,
} from "react-icons/tb";

import {
  type VerifiedCombinationActionLink,
  type VerifiedCombinationSummary,
  verifiedCombinationsSummary,
} from "@/lib/docs/verified-combinations-data";
import { cn } from "@/lib/utils";

function formatGeneratedAt(value: string): string {
  try {
    return new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "UTC",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function statusTone(pass: number, total: number, current: boolean): "pass" | "warn" {
  return current && total > 0 && pass === total ? "pass" : "warn";
}

const toneClasses = {
  pass: "border-emerald-500/30 bg-emerald-500/8 text-emerald-600 dark:text-emerald-400",
  warn: "border-amber-500/30 bg-amber-500/8 text-amber-600 dark:text-amber-400",
} as const;

export function VerifiedCombinationsSummary() {
  const summary: VerifiedCombinationSummary = verifiedCombinationsSummary;
  const releaseGuard = summary.releaseGuard;
  const publishedPackage = summary.publishedPackage;
  const allCurrent =
    summary.smoke.every((item) => item.current === true) &&
    summary.scaffbench.every((item) => item.current === true) &&
    releaseGuard?.current === true &&
    publishedPackage?.current === true;
  const releaseTone = allCurrent ? ("pass" as const) : ("warn" as const);

  return (
    <div className="my-8 space-y-4">
      <div className="rounded-lg border border-[var(--docs-border-subtle)] bg-[var(--docs-surface-elevated)]/70 p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="m-0 text-sm font-medium text-foreground">Current verified claim</p>
            <p className="m-0 mt-1 text-muted-foreground text-sm">
              Generated {formatGeneratedAt(summary.generatedAt)} UTC.
            </p>
          </div>
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
              releaseTone === "pass" ? toneClasses.pass : toneClasses.warn,
            )}
          >
            {releaseTone === "pass" ? (
              <CheckCircle2 className="size-3.5" />
            ) : (
              <CircleAlert className="size-3.5" />
            )}
            {allCurrent && releaseGuard?.overallSuccess
              ? "Release guard passing"
              : "Needs fresh release evidence"}
          </span>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {summary.smoke.map((item) => (
          <EvidenceCard
            key={item.label}
            label={item.label}
            detail="smoke combinations"
            pass={item.pass}
            total={item.total}
            actionLinks={item.actionLinks}
            rerunCommand={item.rerunCommand}
            failureHint={item.failureHint}
            current={item.current === true}
            sourcePaths={item.sources}
            reasons={item.reasons}
          />
        ))}
        {summary.scaffbench.map((item) => (
          <EvidenceCard
            key={item.label}
            label={item.label}
            detail={
              item.environmentQualified === false
                ? "validation runs, environment not qualified"
                : "validation runs"
            }
            pass={item.pass}
            total={item.total}
            actionLinks={item.actionLinks}
            rerunCommand={item.rerunCommand}
            failureHint={item.failureHint}
            current={item.current === true}
            sourcePaths={[item.source]}
            reasons={item.reasons}
          />
        ))}
        {releaseGuard ? (
          <EvidenceCard
            label="Release guard"
            detail="release gates"
            pass={releaseGuard.pass}
            total={releaseGuard.total}
            actionLinks={releaseGuard.actionLinks}
            rerunCommand={releaseGuard.rerunCommand}
            failureHint={releaseGuard.failureHint}
            current={releaseGuard.current === true}
            sourcePaths={[releaseGuard.source]}
            reasons={releaseGuard.reasons}
          />
        ) : (
          <MissingEvidenceCard
            label="Release guard"
            source="testing/.release-guard/summary.json"
            ownerArea="release guard"
            rerunCommand="bun run test:release:record"
          />
        )}
        {publishedPackage ? (
          <EvidenceCard
            label="Published package"
            detail={`package-manager installs${publishedPackage.packageSpec ? ` for ${publishedPackage.packageSpec}` : ""}`}
            pass={publishedPackage.pass}
            total={publishedPackage.total}
            actionLinks={publishedPackage.actionLinks}
            rerunCommand={publishedPackage.rerunCommand}
            failureHint={publishedPackage.failureHint}
            current={publishedPackage.current === true}
            sourcePaths={[publishedPackage.source]}
            reasons={publishedPackage.reasons}
          />
        ) : (
          <MissingEvidenceCard
            label="Published package"
            source="testing/.published-package/summary.json"
            ownerArea="published package"
            rerunCommand="bun run test:published-package --specifier $(jq -r .version apps/cli/package.json)"
          />
        )}
      </div>
    </div>
  );
}

function EvidenceCard({
  label,
  detail,
  pass,
  total,
  actionLinks,
  rerunCommand,
  failureHint,
  current,
  sourcePaths,
  reasons,
}: {
  label: string;
  detail: string;
  pass: number;
  total: number;
  actionLinks: VerifiedCombinationActionLink[];
  rerunCommand: string;
  failureHint: string;
  current: boolean;
  sourcePaths: string[];
  reasons?: string[];
}) {
  const tone = statusTone(pass, total, current);
  const Icon = tone === "pass" ? CheckCircle2 : Clock3;
  const allPassing = tone === "pass";
  const displayedPass = current ? pass : 0;

  return (
    <div className="rounded-lg border border-[var(--docs-border-subtle)] bg-background/70 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="m-0 text-sm font-medium text-foreground">{label}</p>
          <p className="m-0 mt-1 text-muted-foreground text-xs">{detail}</p>
        </div>
        <Icon
          className={cn(
            "mt-0.5 size-4 shrink-0",
            tone === "pass"
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-amber-600 dark:text-amber-400",
          )}
        />
      </div>
      <p className="m-0 mt-4 font-semibold text-2xl text-foreground tabular-nums">
        {displayedPass}/{total}
      </p>
      <p className="m-0 mt-1 text-muted-foreground text-xs">rows with Pass evidence</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {actionLinks.map((link) => (
          <a
            key={`${label}:${link.label}`}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-md border border-[var(--docs-border-subtle)] px-2 py-1 text-muted-foreground text-xs transition-colors hover:border-[var(--docs-accent)] hover:text-foreground"
          >
            {link.label}
            <ExternalLink className="size-3" />
          </a>
        ))}
      </div>
      <p className="m-0 mt-3 break-all text-muted-foreground text-xs">
        Source: <code>{sourcePaths.join(", ")}</code>
      </p>
      <p className="m-0 mt-3 text-muted-foreground text-xs">
        Rerun: <code>{rerunCommand}</code>
      </p>
      {!allPassing && reasons && reasons.length > 0 ? (
        <p className="m-0 mt-2 text-amber-600 text-xs dark:text-amber-400">
          Evidence state: {reasons.map((reason) => reason.replaceAll("-", " ")).join(", ")}.
        </p>
      ) : null}
      {allPassing ? null : (
        <p className="m-0 mt-2 text-amber-600 text-xs dark:text-amber-400">{failureHint}</p>
      )}
    </div>
  );
}

function MissingEvidenceCard({
  label,
  source,
  ownerArea,
  rerunCommand,
}: {
  label: string;
  source: string;
  ownerArea: string;
  rerunCommand: string;
}) {
  return (
    <div className="rounded-lg border border-amber-500/30 bg-amber-500/8 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="m-0 text-sm font-medium text-foreground">{label}</p>
          <p className="m-0 mt-1 text-muted-foreground text-xs">missing evidence</p>
        </div>
        <CircleAlert className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400" />
      </div>
      <p className="m-0 mt-4 break-all text-muted-foreground text-xs">
        Source: <code>{source}</code>
      </p>
      <p className="m-0 mt-2 text-muted-foreground text-xs">Owner: {ownerArea}</p>
      <p className="m-0 mt-2 text-muted-foreground text-xs">
        Rerun: <code>{rerunCommand}</code>
      </p>
    </div>
  );
}
