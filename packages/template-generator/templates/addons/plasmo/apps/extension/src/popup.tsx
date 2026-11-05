import { useReducer } from "react";

import { isPageResponse, type PageResponse, type ReadPageRequest } from "./messages";
import "./popup.css";

type State = { status: "idle" | "loading" | "success" | "error"; title: string; detail: string };
type Action = { type: "start" } | { type: "response"; response: PageResponse } | { type: "error"; detail: string };

const initialState: State = { status: "idle", title: "Read the current page", detail: "Open https://example.com/ and read its title through the content script and background worker." };

function reducer(state: State, action: Action): State {
  if (action.type === "start") return { ...state, status: "loading", detail: "Waiting for the page and background worker..." };
  if (action.type === "error") return { status: "error", title: "Could not read this page", detail: action.detail };
  return action.response.ok
    ? { status: "success", title: action.response.title, detail: action.response.summary }
    : { status: "error", title: "Could not read this page", detail: action.response.error };
}

export default function Popup() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function readPage() {
    dispatch({ type: "start" });
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab?.id === undefined) {
        dispatch({ type: "error", detail: "No active browser tab is available." });
        return;
      }
      const request: ReadPageRequest = { type: "bfs:read-page" };
      const response: unknown = await chrome.tabs.sendMessage(tab.id, request, { frameId: 0 });
      if (!isPageResponse(response)) {
        dispatch({ type: "error", detail: "The content script returned an invalid response." });
        return;
      }
      dispatch({ type: "response", response });
    } catch {
      dispatch({ type: "error", detail: "No content script answered. Open https://example.com/, reload the page, and try again." });
    }
  }

  return (
    <main>
      <p className="eyebrow">Plasmo / Manifest V3</p>
      <h1>{state.title}</h1>
      <p role={state.status === "error" ? "alert" : "status"} aria-live="polite">{state.detail}</p>
      <button type="button" disabled={state.status === "loading"} onClick={() => void readPage()}>
        {state.status === "loading" ? "Reading..." : "Read page title"}
      </button>
      <p className="scope">Runs only on https://example.com/*</p>
    </main>
  );
}
