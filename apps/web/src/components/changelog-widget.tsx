import { lazy, Suspense, useCallback, useEffect, useState } from "react";

import { registerVisit } from "@/lib/analytics/visitor";
import { latestChangelogRelease } from "@/lib/content/changelog";
import {
  type ChangelogInteractionState,
  markChangelogReleaseInteracted,
  shouldShowChangelogRelease,
} from "@/lib/content/changelog-visibility";
import { getLocalizedChangelogRelease } from "@/lib/i18n/changelog-copy";
import { getLocaleDateTag } from "@/lib/i18n/locales";
import { m } from "@/paraglide/messages.js";
import { getLocale } from "@/paraglide/runtime.js";

const ChangelogModal = lazy(async () => {
  const { ChangelogModal } = await import("@/components/changelog-modal");
  return { default: ChangelogModal };
});

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
  const [hasOpenedModal, setHasOpenedModal] = useState(false);

  useEffect(() => {
    if (!latestChangelogRelease) return;

    try {
      // Deliberately NOT gated on the builder-share modal. That key is only
      // written when the share modal is dismissed, which requires completing a
      // run or a ZIP download - so anyone who just opens /new or /stack and
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
    setHasOpenedModal(true);
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
        <div className="animate-fadeIn fixed bottom-3 left-3 z-40 w-[calc(100vw-1.5rem)] max-w-[22rem] sm:bottom-4 sm:left-4">
          {/* Stacked edges hint at the rest of the changelog without rendering it. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-4 -top-2 h-4 rounded-t-2xl border border-edge border-b-0 bg-surface-raised opacity-60"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-2 -top-1 h-3 rounded-t-2xl border border-edge border-b-0 bg-surface-raised opacity-80"
          />

          <section
            className="group relative overflow-hidden rounded-2xl border border-edge bg-surface shadow-2xl shadow-black/10"
            aria-label={m.changelogAria()}
          >
            <button
              type="button"
              onClick={openChangelog}
              className="block w-full cursor-pointer p-5 pb-4 text-left"
              aria-label={m.changelogOpen()}
            >
              <span className="block text-balance font-semibold text-ink text-xl leading-tight tracking-[-0.02em]">
                {latestTitle}
              </span>
              {/* No `block` here: it would override the -webkit-box display
                  line-clamp needs, and the summary would never clamp. */}
              <span className="mt-2 line-clamp-3 text-soft text-sm leading-snug">
                {latestSummary}
              </span>

              {latestRelease.image ? (
                <span className="mt-4 block overflow-hidden rounded-xl border border-edge">
                  <img
                    src={latestRelease.image.src}
                    alt={latestRelease.image.alt}
                    width={1200}
                    height={630}
                    className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </span>
              ) : null}
            </button>

            {/* Collapsed to zero height until hover or keyboard focus, so the
                card grows from the bottom instead of the actions popping in. */}
            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-focus-within:grid-rows-[1fr] group-hover:grid-rows-[1fr] motion-reduce:transition-none">
              <div className="overflow-hidden">
                <div className="flex items-center justify-between gap-3 px-5 pt-1 pb-5">
                  <button
                    type="button"
                    onClick={openChangelog}
                    className="cursor-pointer text-base text-soft transition-colors hover:text-ink"
                  >
                    {m.changelogReadMore()}
                  </button>
                  <button
                    type="button"
                    onClick={dismiss}
                    className="cursor-pointer text-base text-soft transition-colors hover:text-ink"
                  >
                    {m.changelogDismiss()}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {hasOpenedModal && (
        <Suspense fallback={null}>
          <ChangelogModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        </Suspense>
      )}
    </>
  );
}
