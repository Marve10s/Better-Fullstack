export function scrollPosition(top: number, height: number, viewport: number) {
  const range = Math.max(0, height - viewport);
  return {
    scroll_px: Math.max(0, Math.round(top)),
    scroll_percent: range === 0 ? 100 : Math.round(Math.min(1, Math.max(0, top / range)) * 100),
    viewport_height: Math.max(0, Math.round(viewport)),
  };
}

/** Monotonic, foreground-only time. Reports are cumulative within one page view. */
export function createEngagementClock(now: number, visible: boolean) {
  const startedAt = now;
  let activeSince: number | undefined = visible ? now : undefined;
  let activeMs = 0;
  return {
    visibility(now: number, visible: boolean) {
      if (activeSince !== undefined) activeMs += Math.max(0, now - activeSince);
      activeSince = visible ? now : undefined;
    },
    snapshot(now: number) {
      return {
        active_ms: Math.round(
          activeMs + (activeSince === undefined ? 0 : Math.max(0, now - activeSince)),
        ),
        elapsed_ms: Math.round(Math.max(0, now - startedAt)),
      };
    },
  };
}
