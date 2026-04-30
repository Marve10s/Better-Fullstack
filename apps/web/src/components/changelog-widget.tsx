import { useLocation } from "@tanstack/react-router";
import { ChevronDown, ChevronUp, ExternalLink, History, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { changelogReleases, latestChangelogRelease } from "@/lib/changelog";
import { cn } from "@/lib/utils";

const CHANGELOG_INTERACTION_STORAGE_PREFIX = "better-fullstack.changelog.interaction";

function getRouteKey(pathname: string, search: unknown) {
  return `${pathname}${typeof search === "string" ? search : ""}`;
}

function getInteractionStorageKey(routeKey: string) {
  return `${CHANGELOG_INTERACTION_STORAGE_PREFIX}:${latestChangelogRelease?.version ?? "unknown"}:${routeKey}`;
}

export function ChangelogWidget() {
  const location = useLocation();
  const routeKey = getRouteKey(location.pathname, location.searchStr);
  const currentRouteKey = useRef(routeKey);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const releaseCountLabel = useMemo(() => `${changelogReleases.length} releases`, []);

  useEffect(() => {
    if (!latestChangelogRelease) return;

    currentRouteKey.current = routeKey;
    setIsExpanded(false);

    try {
      setIsVisible(window.localStorage.getItem(getInteractionStorageKey(routeKey)) === null);
    } catch {
      setIsVisible(true);
    }
  }, [routeKey]);

  const markInteracted = useCallback((state: "opened" | "closed") => {
    try {
      window.localStorage.setItem(getInteractionStorageKey(currentRouteKey.current), state);
    } catch {}
  }, []);

  const dismiss = useCallback(() => {
    if (!latestChangelogRelease) return;

    markInteracted("closed");
    setIsVisible(false);
  }, [markInteracted]);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((value) => {
      const nextValue = !value;
      if (nextValue) {
        markInteracted("opened");
      }
      return nextValue;
    });
  }, [markInteracted]);

  if (!isVisible || !latestChangelogRelease) return null;

  const latestTitle = latestChangelogRelease.title ?? "Latest release";
  const latestSummary =
    latestChangelogRelease.summary ??
    `Latest release published ${latestChangelogRelease.displayDate}.`;

  return (
    <aside
      className={cn(
        "fixed bottom-3 left-3 z-40 w-[calc(100vw-1.5rem)] max-w-[24rem] overflow-hidden border border-border bg-background/95 shadow-2xl shadow-black/10 backdrop-blur-md sm:bottom-4 sm:left-4",
        isExpanded ? "max-h-[min(82vh,40rem)]" : "max-h-[13rem]",
      )}
      aria-label="Changelog"
    >
      <div className="border-b border-border bg-muted/35">
        {latestChangelogRelease.image ? (
          <a
            href={latestChangelogRelease.image.creditHref}
            target="_blank"
            rel="noreferrer"
            className="group relative block h-24 overflow-hidden border-border border-b"
            aria-label="Open changelog image credit"
          >
            <img
              src={latestChangelogRelease.image.src}
              alt={latestChangelogRelease.image.alt}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </a>
        ) : null}

        <div className="flex items-start gap-3 p-3">
          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center border border-border bg-background">
            <History className="size-4" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-mono font-semibold text-sm">Changelog</p>
              <span className="border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                {latestChangelogRelease.version}
              </span>
            </div>
            <p className="mt-1 font-medium text-sm">{latestTitle}</p>
            <p className="mt-1 line-clamp-2 text-muted-foreground text-xs">{latestSummary}</p>
          </div>
          <button
            type="button"
            onClick={dismiss}
            className="flex size-7 shrink-0 items-center justify-center border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-background hover:text-foreground"
            aria-label="Close changelog"
          >
            <X className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-3 py-2">
        <button
          type="button"
          onClick={toggleExpanded}
          className="inline-flex items-center gap-1.5 font-medium text-xs text-foreground transition-colors hover:text-muted-foreground"
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <ChevronDown className="size-3.5" aria-hidden="true" />
          ) : (
            <ChevronUp className="size-3.5" aria-hidden="true" />
          )}
          {releaseCountLabel}
        </button>
        <a
          href={latestChangelogRelease.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-medium text-muted-foreground text-xs transition-colors hover:text-foreground"
        >
          Release notes
          <ExternalLink className="size-3" aria-hidden="true" />
        </a>
      </div>

      {isExpanded ? (
        <div className="max-h-[min(56vh,27rem)] overflow-y-auto border-t border-border">
          {latestChangelogRelease.highlights ? (
            <div className="border-border border-b px-3 py-3">
              <p className="font-medium text-xs">Latest update</p>
              <ul className="mt-2 space-y-1.5 text-muted-foreground text-xs">
                {latestChangelogRelease.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span className="mt-1.5 size-1 shrink-0 bg-foreground/60" aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <ol>
            {changelogReleases.map((release) => (
              <li key={release.version}>
                <a
                  href={release.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-3 border-border border-b px-3 py-2.5 transition-colors hover:bg-muted/45"
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
        </div>
      ) : null}
    </aside>
  );
}
