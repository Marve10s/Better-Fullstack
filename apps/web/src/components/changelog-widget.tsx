import { History, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { ChangelogModal } from "@/components/changelog-modal";
import { latestChangelogRelease } from "@/lib/changelog";

const CHANGELOG_INTERACTION_STORAGE_PREFIX = "better-fullstack.changelog.interaction";
const HAS_VISITED_KEY = "better-fullstack.has-visited";

function getInteractionStorageKey() {
  return `${CHANGELOG_INTERACTION_STORAGE_PREFIX}:${latestChangelogRelease?.version ?? "unknown"}`;
}

export function ChangelogWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!latestChangelogRelease) return;

    try {
      const hasVisited = window.localStorage.getItem(HAS_VISITED_KEY);
      if (!hasVisited) {
        window.localStorage.setItem(HAS_VISITED_KEY, "true");
        setIsVisible(false);
        return;
      }

      setIsVisible(window.localStorage.getItem(getInteractionStorageKey()) === null);
    } catch {
      setIsVisible(false);
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
              className="group relative block h-24 w-full cursor-pointer overflow-hidden border-border border-b"
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
              className="mt-0.5 flex size-8 shrink-0 cursor-pointer items-center justify-center border border-border bg-background transition-colors hover:bg-muted"
              aria-label="Open changelog"
            >
              <History className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={openChangelog}
              className="min-w-0 flex-1 cursor-pointer text-left"
            >
              <span className="flex flex-wrap items-center gap-2">
                <span className="font-mono font-semibold text-sm transition-colors hover:text-muted-foreground">
                  Changelog
                </span>
                <span className="border border-border px-1.5 py-0.5 font-mono font-medium text-[10px] text-foreground">
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
              className="flex size-7 shrink-0 cursor-pointer items-center justify-center border border-transparent text-muted-foreground transition-colors hover:border-border hover:bg-background hover:text-foreground"
              aria-label="Close changelog"
            >
              <X className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        </aside>
      ) : null}

      <ChangelogModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}
