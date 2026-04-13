import type { Backend, Realtime } from "../types";

import { exitCancelled } from "../utils/errors";
import type { PromptSingleResolution } from "./prompt-contract";
import { isCancel, navigableSelect } from "./navigable";

const REALTIME_PROMPT_OPTIONS = [
  {
    value: "socket-io" as const,
    label: "Socket.IO",
    hint: "Real-time bidirectional communication with fallbacks",
  },
  {
    value: "partykit" as const,
    label: "PartyKit",
    hint: "Edge-native multiplayer infrastructure on Cloudflare",
  },
  {
    value: "ably" as const,
    label: "Ably",
    hint: "Real-time messaging platform with pub/sub and presence",
  },
  {
    value: "pusher" as const,
    label: "Pusher",
    hint: "Real-time communication APIs with channels and events",
  },
  {
    value: "liveblocks" as const,
    label: "Liveblocks",
    hint: "Collaboration infrastructure for multiplayer experiences",
  },
  {
    value: "yjs" as const,
    label: "Y.js",
    hint: "CRDT library for real-time collaboration with conflict-free sync",
  },
  {
    value: "none" as const,
    label: "None",
    hint: "Skip real-time/WebSocket integration",
  },
];

type RealtimePromptContext = {
  realtime?: Realtime;
  backend?: Backend;
};

export function resolveRealtimePrompt(
  context: RealtimePromptContext = {},
): PromptSingleResolution<Realtime> {
  if (context.backend === "none" || context.backend === "convex") {
    return {
      shouldPrompt: false,
      mode: "single",
      options: [],
      autoValue: "none",
    };
  }

  return context.realtime !== undefined
    ? {
        shouldPrompt: false,
        mode: "single",
        options: REALTIME_PROMPT_OPTIONS,
        autoValue: context.realtime,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options: REALTIME_PROMPT_OPTIONS,
        initialValue: "none",
      };
}

export async function getRealtimeChoice(realtime?: Realtime, backend?: Backend) {
  const resolution = resolveRealtimePrompt({ realtime, backend });
  if (!resolution.shouldPrompt) {
    return resolution.autoValue ?? "none";
  }

  const response = await navigableSelect<Realtime>({
    message: "Select real-time solution",
    options: resolution.options,
    initialValue: resolution.initialValue as Realtime,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
