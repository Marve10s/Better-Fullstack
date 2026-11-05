export const MAX_TITLE_LENGTH = 200;
export const MAX_MESSAGE_LENGTH = 240;

export type ReadPageRequest = { type: "bfs:read-page" };
export type FormatTitleRequest = { type: "bfs:format-title"; title: string };
export type PageResponse =
  | { type: "bfs:page-title"; ok: true; title: string; summary: string }
  | { type: "bfs:page-title"; ok: false; error: string };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isBoundedText(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= maxLength;
}

export function isReadPageRequest(value: unknown): value is ReadPageRequest {
  return isRecord(value) && value.type === "bfs:read-page";
}

export function isFormatTitleRequest(value: unknown): value is FormatTitleRequest {
  return isRecord(value) && value.type === "bfs:format-title" && isBoundedText(value.title, MAX_TITLE_LENGTH);
}

export function isPageResponse(value: unknown): value is PageResponse {
  if (!isRecord(value) || value.type !== "bfs:page-title") return false;
  return value.ok === true
    ? isBoundedText(value.title, MAX_TITLE_LENGTH) && isBoundedText(value.summary, MAX_MESSAGE_LENGTH)
    : value.ok === false && isBoundedText(value.error, MAX_MESSAGE_LENGTH);
}

export function errorResponse(error: string): PageResponse {
  return { type: "bfs:page-title", ok: false, error: error.slice(0, MAX_MESSAGE_LENGTH) || "Request failed." };
}

export function isExamplePageUrl(value: unknown): boolean {
  if (typeof value !== "string" || value.length > 4096) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "example.com";
  } catch {
    return false;
  }
}
