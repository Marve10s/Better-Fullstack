import { useCallback, useEffect, useState } from "react";
import { TbX as X } from "react-icons/tb";

import { ChangelogModal } from "@/components/changelog-modal";
import { latestChangelogRelease } from "@/lib/changelog";
import {
  type ChangelogInteractionState,
  markChangelogReleaseInteracted,
  shouldShowChangelogRelease,
} from "@/lib/changelog-visibility";
import { getLocalizedChangelogRelease } from "@/lib/i18n/changelog-copy";
import { getLocaleDateTag } from "@/lib/i18n/locales";
import { registerVisit } from "@/lib/visitor";
import { m } from "@/paraglide/messages.js";
import { getLocale } from "@/paraglide/runtime.js";

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

export function ChangelogWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!latestChangelogRelease) return;

    try {
      // Deliberately NOT gated on the builder-share modal. That key is only
      // written when the share modal is dismissed, which requires completing a
      // run or a ZIP download — so anyone who just opens /new or /stack and
      // browses would never write it and would never see a release note again.
      // The share modal is a focused dialog and sits above this widget anyway.
      const isReturningVisitor = registerVisit(window.localStorage, window.sessionStorage);
      setIsVisible(
        isReturningVisitor &&
          shouldShowChangelogRelease(window.localStorage, latestChangelogRelease.version),
      );
    } catch {
      setIsVisible(false);
    }
  }, []);

  const markInteracted = useCallback((state: ChangelogInteractionState) => {
    try {
      markChangelogReleaseInteracted(window.localStorage, latestChangelogRelease?.version, state);
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

  const latestRelease = getLocalizedChangelogRelease(latestChangelogRelease);
  const latestDate = formatReleaseDate(latestRelease.publishedAt, latestRelease.displayDate);
  const latestTitle = latestRelease.title ?? m.changelogLatestRelease();
  const latestSummary = latestRelease.summary ?? m.changelogLatestPublished({ date: latestDate });

  return (
    <>
      {isVisible ? (
        <aside
          className="animate-fadeIn fixed bottom-3 left-3 z-40 w-[calc(100vw-1.5rem)] max-w-[22rem] overflow-hidden rounded-2xl border border-edge bg-surface shadow-2xl shadow-black/10 sm:bottom-4 sm:left-4"
          aria-label={m.changelogAria()}
        >
          {latestRelease.image ? (
            <button
              type="button"
              onClick={openChangelog}
              className="group relative block h-24 w-full cursor-pointer overflow-hidden border-edge border-b"
              aria-label={m.changelogOpen()}
            >
              <img
                src={latestRelease.image.src}
                alt={latestRelease.image.alt}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </button>
          ) : null}

          <div className="flex items-start gap-3 p-3">
            <button
              type="button"
              onClick={openChangelog}
              className="group min-w-0 flex-1 cursor-pointer text-left"
            >
              <span className="flex flex-wrap items-center gap-2">
                <span className="font-mono font-semibold text-ink text-sm">
                  {m.footerChangelog()}
                </span>
                <span className="rounded-md border border-edge px-1.5 py-0.5 font-mono font-medium text-[10px] text-ink">
                  {latestRelease.version}
                </span>
              </span>
              <span className="mt-1 block font-medium text-ink text-sm transition-colors group-hover:text-muted-foreground">
                {latestTitle}
              </span>
              <span className="mt-1 line-clamp-2 block text-muted-foreground text-xs">
                {latestSummary}
              </span>
            </button>
            <button
              type="button"
              onClick={dismiss}
              className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-transparent text-muted-foreground transition-colors hover:border-edge hover:bg-surface-raised hover:text-ink"
              aria-label={m.changelogClose()}
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
