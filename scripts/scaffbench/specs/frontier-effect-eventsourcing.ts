import type { BenchmarkSpec } from "../types";

export const FrontierEffectEventsourcingSpec: BenchmarkSpec = {
    id: "frontier-effect-eventsourcing",
    title: "Frontier: TypeScript Effect service with event-sourcing/CQRS and tRPC-over-WebSocket subscriptions",
    lane: "core",
    family: "typescript",
    // BFS offers Effect and tRPC as options but cannot scaffold this architecture,
    // so it runs prompt-only — a pure test of the model's engineering.
    supportedByBetterFullstack: false,
    paths: ["prompt"],
    requirements: [
      "Create a TypeScript backend built on the Effect ecosystem (effect runtime, services, layers).",
      "Implement event-sourcing with CQRS: an append-only event store, write-side command handlers, and read-side projections.",
      "Expose the API via tRPC, including a subscription over WebSockets for the read model.",
      "Include an outbox pattern for reliable event publication.",
      "Provide build and type-check scripts.",
      "Do not install dependencies, do not initialize git, and do not start a dev server.",
    ],
    naturalPrompt:
      "Build a TypeScript backend on the Effect ecosystem that uses event sourcing with CQRS — an append-only event store, command handlers on the write side, projections on the read side, and an outbox for reliable publishing. Expose it through tRPC, including a WebSocket subscription that streams read-model updates.",
    rightLibraryNotes: [
      "The service layer must be built on Effect.",
      "Use event-sourcing + CQRS (event store, projections, outbox), not plain CRUD.",
      "Expose tRPC with a WebSocket subscription for the read model.",
    ],
    canonicalFlags: [],
    strictMarkers: [
      // Loose single-token diagnostics (text arrays AND together).
      { id: "runtime:effect", deps: ["effect"] },
      { id: "api:trpc", deps: ["@trpc/server"] },
      { id: "ws:subscription", text: ["subscription"] },
      { id: "pattern:event-sourcing", text: ["projection"] },
    ],
    validationProfile: { packageManager: "bun" },
  };

