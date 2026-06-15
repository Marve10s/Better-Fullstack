import { ExternalLink } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { changelogReleases, latestChangelogRelease } from "@/lib/changelog";
import { getLocalizedChangelogRelease } from "@/lib/i18n/changelog-copy";
import { getLocaleDateTag } from "@/lib/i18n/locales";
import { m } from "@/paraglide/messages.js";
import { getLocale } from "@/paraglide/runtime.js";

type ChangelogModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function formatReleaseDate(publishedAt: string, fallback: string): string {
  const parsed = new Date(publishedAt);
  if (Number.isNaN(parsed.getTime())) return fallback;
  return parsed.toLocaleDateString(getLocaleDateTag(getLocale()), {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function ChangelogModal({ open, onOpenChange }: ChangelogModalProps) {
  if (!latestChangelogRelease) return null;

  const latestRelease = getLocalizedChangelogRelease(latestChangelogRelease);
  const latestDate = formatReleaseDate(
    latestRelease.publishedAt,
    latestRelease.displayDate,
  );
  const latestTitle = latestRelease.title ?? m.changelogLatestRelease();
  const latestSummary =
    latestRelease.summary ??
    m.changelogLatestPublished({ date: latestDate });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[min(90vh,48rem)] gap-0 overflow-hidden p-0 sm:max-w-2xl">
        {latestRelease.image ? (
          <div className="h-40 overflow-hidden border-border border-b sm:h-52">
            <img
              src={latestRelease.image.src}
              alt={latestRelease.image.alt}
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}
        <div className="min-h-0 overflow-y-auto px-5 py-5 sm:px-6">
          <DialogHeader>
            <div className="flex flex-wrap items-center gap-2">
              <span className="border border-border px-1.5 py-0.5 font-mono font-medium text-[10px] text-foreground">
                {latestRelease.version}
              </span>
              <span className="text-muted-foreground text-xs">
                {latestDate}
              </span>
            </div>
            <DialogTitle className="text-base">{latestTitle}</DialogTitle>
            <DialogDescription>{latestSummary}</DialogDescription>
          </DialogHeader>

          {latestRelease.highlights ? (
            <section className="mt-5 border-border border-y py-4">
              <h3 className="font-medium text-xs">{m.changelogLatestUpdate()}</h3>
              <ul className="mt-3 space-y-2 text-muted-foreground text-xs">
                {latestRelease.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2.5">
                    <span className="mt-1.5 size-1 shrink-0 bg-foreground/60" aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <a
                href={latestRelease.href}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex cursor-pointer items-center gap-1.5 font-medium text-xs transition-colors hover:text-muted-foreground"
              >
                {m.changelogFullReleaseNotes()}
                <ExternalLink className="size-3" aria-hidden="true" />
              </a>
            </section>
          ) : null}

          <section className="mt-5">
            <h3 className="font-medium text-xs">{m.changelogAllReleases()}</h3>
            <ol className="mt-3 max-h-[17rem] overflow-y-auto border border-border">
              {changelogReleases.map((release) => (
                <li key={release.version}>
                  <a
                    href={release.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex cursor-pointer items-center justify-between gap-3 border-border border-b px-3 py-2.5 transition-colors last:border-b-0 hover:bg-muted/45"
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <span className="font-mono font-semibold text-xs">{release.version}</span>
                      {release.isLatest ? (
                        <span className="border border-foreground/20 px-1.5 py-0.5 font-medium text-[10px] text-foreground">
                          {m.changelogLatest()}
                        </span>
                      ) : null}
                    </span>
                    <span className="shrink-0 text-muted-foreground text-xs">
                      {formatReleaseDate(release.publishedAt, release.displayDate)}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
