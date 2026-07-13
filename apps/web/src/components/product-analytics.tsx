import { useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";

import {
  captureProductEvent,
  captureProductPageView,
  getAnalyticsProperties,
  isProductAnalyticsEvent,
} from "@/lib/product-analytics";

export function ProductAnalytics() {
  const href = useRouterState({ select: (state) => state.location.href });

  useEffect(() => {
    void captureProductPageView();
  }, [href]);

  useEffect(() => {
    const captureTaggedClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const element = event.target.closest<HTMLElement>("[data-analytics-event]");
      const eventName = element?.dataset.analyticsEvent;
      if (!element || !eventName || !isProductAnalyticsEvent(eventName)) return;

      void captureProductEvent(eventName, getAnalyticsProperties(element));
    };

    document.addEventListener("click", captureTaggedClick);
    return () => document.removeEventListener("click", captureTaggedClick);
  }, []);

  return null;
}
