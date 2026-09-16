import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

import { createEngagementClock, scrollPosition } from "@/lib/analytics/page-engagement";
import { setTelemetryPageContext, trackProductEvent } from "@/lib/analytics/product-analytics";
import { telemetryPage } from "@/lib/analytics/telemetry-pages";

export function PageAnalytics() {
  const { page, pathname } = useRouterState({
    select: (state) => {
      const match = state.matches.at(-1);
      return {
        page:
          match?.status === "success"
            ? telemetryPage(state.location.pathname, match.routeId)
            : undefined,
        pathname: state.location.pathname,
      };
    },
  });
  useEffect(() => {
    if (!page) return;
    const id = crypto.randomUUID();
    const clock = createEngagementClock(performance.now(), document.visibilityState === "visible");
    const device =
      window.innerWidth < 768 ? "mobile" : window.innerWidth < 1024 ? "tablet" : "desktop";
    const base = { page_id: page, page_view_id: id, device };
    setTelemetryPageContext({ page_id: page, page_view_id: id });
    let maxScroll = 0;
    let surface = "document";
    let lastReport = "";
    let reports = 0;
    const position = () => {
      const builder = document.querySelector<HTMLElement>('[data-telemetry-scroll="builder"]');
      const scroller = builder ?? document.scrollingElement;
      const current = scrollPosition(
        scroller?.scrollTop ?? 0,
        scroller?.scrollHeight ?? 0,
        builder?.clientHeight ?? window.innerHeight,
      );
      const nextSurface = builder ? "builder" : "document";
      if (surface !== nextSurface) maxScroll = 0;
      surface = nextSurface;
      maxScroll = Math.max(maxScroll, current.scroll_percent);
      return {
        ...current,
        max_scroll_percent: maxScroll,
        scroll_surface: builder ? "builder" : "document",
      };
    };
    let lastPosition = position();
    const onScroll = () => {
      lastPosition = position();
    };
    // The builder is lazy loaded. Observe only until its scroll container mounts.
    const mountObserver = new MutationObserver(() => {
      if (document.querySelector('[data-telemetry-scroll="builder"]')) {
        onScroll();
        mountObserver.disconnect();
      }
    });
    if (["builder", "shared-builder", "shared-stack"].includes(page) && surface !== "builder")
      mountObserver.observe(document.body, { childList: true, subtree: true });
    const report = (end_reason: "navigation" | "hidden" | "pagehide") => {
      const timing = clock.snapshot(performance.now());
      const scroll = end_reason === "navigation" ? lastPosition : position();
      const signature = `${Math.floor(timing.active_ms / 1000)}:${scroll.scroll_px}`;
      // Visibility/pagehide often fire together. Bound tab-switch checkpoints,
      // but always leave room for the final navigation report.
      if (signature === lastReport || (reports >= 5 && end_reason === "hidden")) return;
      lastReport = signature;
      reports++;
      trackProductEvent("page-engagement", "succeeded", {
        ...base,
        ...timing,
        ...scroll,
        end_reason,
      });
    };
    const onVisibility = () => {
      const visible = document.visibilityState === "visible";
      clock.visibility(performance.now(), visible);
      if (!visible) report("hidden");
    };
    const onPageHide = () => {
      clock.visibility(performance.now(), false);
      report("pagehide");
    };
    const onPageShow = () => {
      clock.visibility(performance.now(), document.visibilityState === "visible");
    };
    trackProductEvent("page-viewed", "started", base);
    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("resize", onScroll);
    return () => {
      report("navigation");
      setTelemetryPageContext(undefined);
      mountObserver.disconnect();
      document.removeEventListener("scroll", onScroll, true);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("resize", onScroll);
    };
  }, [page, pathname]);
  return null;
}
