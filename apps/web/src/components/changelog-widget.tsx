import { useLocation } from "@tanstack/react-router";
import { ChevronDown, ChevronUp, ExternalLink, History, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { changelogReleases, latestChangelogRelease } from "@/lib/changelog";
import { cn } from "@/lib/utils";

const CHANGELOG_DISMISSED_STORAGE_KEY = "better-fullstack.changelog.dismissed-version";

function getRouteKey(pathname: string, search: unknown) {
  return `${pathname}${typeof search === "string" ? search : ""}`;
}

export function ChangelogWidget() {
  const location = useLocation();
  const routeKey = getRouteKey(location.pathname, location.searchStr);
  const initialRouteKey = useRef<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const releaseCountLabel = useMemo(() => `${changelogReleases.length} releases`, []);

  useEffect(() => {
    if (!latestChangelogRelease) return;

    initialRouteKey.current ??= routeKey;

    if (routeKey !== initialRouteKey.current) {
      setIsVisible(false);
      return;
    }

    try {
      const dismissedVersion = window.localStorage.getItem(CHANGELOG_DISMISSED_STORAGE_KEY);
      setIsVisible(dismissedVersion !== latestChangelogRelease.version);
    } catch {
      setIsVisible(true);
    }
  }, [routeKey]);

  const dismiss = useCallback(() => {
    if (!latestChangelogRelease) return;

    try {
      window.localStorage.setItem(CHANGELOG_DISMISSED_STORAGE_KEY, latestChangelogRelease.version);
    } catch {}
    setIsVisible(false);
  }, []);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((value) => !value);
  }, []);

  if (!isVisible || !latestChangelogRelease) return null;

  return (
    <aside
      className={cn(
        "fixed bottom-3 left-3 z-40 w-[calc(100vw-1.5rem)] max-w-[22rem] overflow-hidden border border-border bg-background/95 shadow-2xl shadow-black/10 backdrop-blur-md sm:bottom-4 sm:left-4",
        isExpanded ? "max-h-[min(72vh,34rem)]" : "max-h-32",
      )}
      aria-label="Changelog"
    >
      <div className="flex items-start gap-3 border-b border-border bg-muted/35 p-3">
        <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center border border-border bg-background">
          <History className="size-4" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="font-mono font-semibold text-sm">Changelog</p>
            <span className="border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
              {latestChangelogRelease.version}
            </span>
          </div>
          <p className="mt-1 text-muted-foreground text-xs">
            Latest release published {latestChangelogRelease.displayDate}.
          </p>
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
          Latest
          <ExternalLink className="size-3" aria-hidden="true" />
        </a>
      </div>

      {isExpanded ? (
        <ol className="max-h-[min(52vh,24rem)] overflow-y-auto border-t border-border">
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
      ) : null}
    </aside>
  );
}
