import type { Backend, Realtime } from "@/types";

import { exitCancelled } from "@/presentation/errors";
import type { PromptSingleResolution } from "@/prompts/core/prompt-contract";
import { isCancel, navigableSelect } from "@/prompts/core/navigable";

const REALTIME_PROMPT_OPTIONS = [
  {
    value: "socket-io" as const,
    label: "Socket.IO",
    hint: "Real-time bidirectional communication with fallbacks",
  },
  {
    value: "ws" as const,
    label: "ws",
    hint: "Lightweight standards-based WebSocket server and client",
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

  const options =
    context.backend === "express"
      ? REALTIME_PROMPT_OPTIONS
      : REALTIME_PROMPT_OPTIONS.filter((option) => option.value !== "ws");

  return context.realtime !== undefined
    ? {
        shouldPrompt: false,
        mode: "single",
        options,
        autoValue: context.realtime,
      }
    : {
        shouldPrompt: true,
        mode: "single",
        options,
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
