import type { PlasmoCSConfig } from "plasmo";

import { errorResponse, isPageResponse, isReadPageRequest, MAX_TITLE_LENGTH, type FormatTitleRequest } from "./messages";

export const config: PlasmoCSConfig = {
  matches: ["https://example.com/*"],
  all_frames: false,
  run_at: "document_idle",
};

chrome.runtime.onMessage.addListener((message: unknown, sender, sendResponse) => {
  if (sender.id !== chrome.runtime.id || !isReadPageRequest(message)) return false;
  const title = (document.title.trim() || "Untitled page").slice(0, MAX_TITLE_LENGTH);
  const request: FormatTitleRequest = { type: "bfs:format-title", title };
  chrome.runtime.sendMessage(request, (response: unknown) => {
    if (chrome.runtime.lastError) {
      sendResponse(errorResponse("The background worker could not answer. Reload the extension and try again."));
      return;
    }
    sendResponse(isPageResponse(response) ? response : errorResponse("The background worker returned an invalid response."));
  });
  return true;
});
