import { ExternalLink, History, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { changelogReleases, latestChangelogRelease } from "@/lib/changelog";

const CHANGELOG_INTERACTION_STORAGE_PREFIX = "better-fullstack.changelog.interaction";

function getInteractionStorageKey() {
  return `${CHANGELOG_INTERACTION_STORAGE_PREFIX}:${latestChangelogRelease?.version ?? "unknown"}`;
}

export function ChangelogWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!latestChangelogRelease) return;

    try {
      setIsVisible(window.localStorage.getItem(getInteractionStorageKey()) === null);
    } catch {
      setIsVisible(true);
    }
  }, []);

  const markInteracted = useCallback((state: "opened" | "closed") => {
    try {
      window.localStorage.setItem(getInteractionStorageKey(), state);
    } catch {}
  }, []);

  const dismiss = useCallback(() => {
    if (!latestChangelogRelease) return;

    markInteracted("closed");
    setIsVisible(false);
  }, [markInteracted]);

  const openChangelog = useCallback(() => {
    if (!latestChangelogRelease) return;

    markInteracted("opened");
    setIsVisible(false);
    setIsModalOpen(true);
  }, [markInteracted]);

  if (!latestChangelogRelease) return null;

  const latestTitle = latestChangelogRelease.title ?? "Latest release";
  const latestSummary =
    latestChangelogRelease.summary ??
    `Latest release published ${latestChangelogRelease.displayDate}.`;

  return (
    <>
      {isVisible ? (
        <aside
          className="fixed bottom-3 left-3 z-40 w-[calc(100vw-1.5rem)] max-w-[24rem] overflow-hidden border border-border bg-background/95 shadow-2xl shadow-black/10 backdrop-blur-md sm:bottom-4 sm:left-4"
          aria-label="Changelog"
        >
          {latestChangelogRelease.image ? (
            <button
              type="button"
              onClick={openChangelog}
              className="group relative block h-24 w-full overflow-hidden border-border border-b"
              aria-label="Open changelog"
            >
              <img
                src={latestChangelogRelease.image.src}
                alt={latestChangelogRelease.image.alt}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </button>
          ) : null}

          <div className="flex items-start gap-3 bg-muted/35 p-3">
            <button
              type="button"
              onClick={openChangelog}
              className="mt-0.5 flex size-8 shrink-0 items-center justify-center border border-border bg-background transition-colors hover:bg-muted"
              aria-label="Open changelog"
            >
              <History className="size-4" aria-hidden="true" />
            </button>
            <button type="button" onClick={openChangelog} className="min-w-0 flex-1 text-left">
              <span className="flex flex-wrap items-center gap-2">
                <span className="font-mono font-semibold text-sm transition-colors hover:text-muted-foreground">
                  Changelog
                </span>
                <span className="border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {latestChangelogRelease.version}
                </span>
              </span>
              <span className="mt-1 block font-medium text-sm transition-colors hover:text-muted-foreground">
                {latestTitle}
              </span>
              <span className="mt-1 line-clamp-2 block text-muted-foreground text-xs">
                {latestSummary}
              </span>
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="flex size-7 shrink-0 items-center justify-center border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-background hover:text-foreground"
              aria-label="Close changelog"
            >
              <X className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        </aside>
      ) : null}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-h-[min(90vh,48rem)] gap-0 overflow-hidden p-0 sm:max-w-2xl">
          {latestChangelogRelease.image ? (
            <div className="h-40 overflow-hidden border-border border-b sm:h-52">
              <img
                src={latestChangelogRelease.image.src}
                alt={latestChangelogRelease.image.alt}
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}
          <div className="min-h-0 overflow-y-auto px-5 py-5 sm:px-6">
            <DialogHeader>
              <div className="flex flex-wrap items-center gap-2">
                <span className="border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {latestChangelogRelease.version}
                </span>
                <span className="text-muted-foreground text-xs">
                  {latestChangelogRelease.displayDate}
                </span>
              </div>
              <DialogTitle className="text-base">{latestTitle}</DialogTitle>
              <DialogDescription>{latestSummary}</DialogDescription>
            </DialogHeader>

            {latestChangelogRelease.highlights ? (
              <section className="mt-5 border-border border-y py-4">
                <h3 className="font-medium text-xs">Latest update</h3>
                <ul className="mt-3 space-y-2 text-muted-foreground text-xs">
                  {latestChangelogRelease.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2.5">
                      <span
                        className="mt-1.5 size-1 shrink-0 bg-foreground/60"
                        aria-hidden="true"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={latestChangelogRelease.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 font-medium text-xs transition-colors hover:text-muted-foreground"
                >
                  Full release notes
                  <ExternalLink className="size-3" aria-hidden="true" />
                </a>
              </section>
            ) : null}

            <section className="mt-5">
              <h3 className="font-medium text-xs">All releases</h3>
              <ol className="mt-3 max-h-[17rem] overflow-y-auto border border-border">
                {changelogReleases.map((release) => (
                  <li key={release.version}>
                    <a
                      href={release.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between gap-3 border-border border-b px-3 py-2.5 transition-colors last:border-b-0 hover:bg-muted/45"
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="font-mono font-semibold text-xs">{release.version}</span>
                        {release.isLatest ? (
                          <span className="border border-foreground/20 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                            Latest
                          </span>
                        ) : null}
                      </span>
                      <span className="shrink-0 text-muted-foreground text-xs">
                        {release.displayDate}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
