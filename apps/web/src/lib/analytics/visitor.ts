const VISITOR_STORAGE_KEY = "better-fullstack.has-visited";
const FIRST_VISIT_SESSION_KEY = "better-fullstack.first-visit-session";

type VisitorStorage = Pick<Storage, "getItem" | "setItem">;

/**
 * Records the visit and reports whether this is a returning visitor, so
 * announcement surfaces stay out of the way during someone's first session.
 */
export function registerVisit(
  persistentStorage: VisitorStorage | null,
  sessionStorage: VisitorStorage | null,
): boolean {
  try {
    const isFirstVisitSession = sessionStorage?.getItem(FIRST_VISIT_SESSION_KEY) === "true";
    const hasVisited = persistentStorage?.getItem(VISITOR_STORAGE_KEY) === "true";

    if (!hasVisited) {
      persistentStorage?.setItem(VISITOR_STORAGE_KEY, "true");
      sessionStorage?.setItem(FIRST_VISIT_SESSION_KEY, "true");
      return false;
    }

    return !isFirstVisitSession;
  } catch {
    return false;
  }
}
