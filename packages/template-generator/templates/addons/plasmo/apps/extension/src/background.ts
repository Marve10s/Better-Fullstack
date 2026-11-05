import { errorResponse, isExamplePageUrl, isFormatTitleRequest, MAX_MESSAGE_LENGTH, type PageResponse } from "./messages";

chrome.runtime.onMessage.addListener((message: unknown, sender, sendResponse) => {
  if (sender.id !== chrome.runtime.id || !sender.tab || !isExamplePageUrl(sender.url)) return false;
  if (!isFormatTitleRequest(message)) {
    sendResponse(errorResponse("The content script sent an invalid title request."));
    return false;
  }
  void Promise.resolve().then(() => {
    const response: PageResponse = {
      type: "bfs:page-title",
      ok: true,
      title: message.title,
      summary: `Background worker received: ${message.title}`.slice(0, MAX_MESSAGE_LENGTH),
    };
    sendResponse(response);
  });
  return true;
});
