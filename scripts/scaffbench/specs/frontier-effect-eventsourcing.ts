import type { BenchmarkSpec } from "@scaffbench/types";

export const FrontierEffectEventsourcingSpec: BenchmarkSpec = {
  id: "frontier-effect-eventsourcing",
  introducedAt: "2026-08-21",
  title:
    "Frontier: TypeScript Effect service with event-sourcing/CQRS and tRPC-over-WebSocket subscriptions",
  lane: "core",
  difficulty: 3,
  family: "typescript",
  supportedByBetterFullstack: false,
  paths: ["prompt"],
  requirements: [
    "Create a TypeScript backend for a bank-ledger service built on the Effect ecosystem (effect runtime, services, layers).",
    "Implement event-sourcing with CQRS: an append-only event store, write-side command handlers (open account, deposit, withdraw with overdraft rejection), and read-side balance projections.",
    "Projections must be rebuildable by replaying the event store from zero, and applying an event twice must not corrupt a projection.",
    "Expose the API via tRPC, including a subscription over WebSockets that streams balance updates from the read model.",
    "Include an outbox pattern for reliable event publication.",
    "Provide build and type-check scripts.",
  ],
  naturalPrompt:
    "Build a TypeScript bank-ledger backend on the Effect ecosystem that uses event sourcing with CQRS, an append-only event store, command handlers for open/deposit/withdraw with overdraft rejection on the write side, replayable idempotent balance projections on the read side, and an outbox for reliable publishing. Expose it through tRPC, including a WebSocket subscription that streams balance updates.",
  rightLibraryNotes: [
    "The service layer must be built on Effect.",
    "Use event-sourcing + CQRS (event store, projections, outbox), not plain CRUD.",
    "Projections must be replayable and idempotent.",
    "Expose tRPC with a WebSocket subscription for the read model.",
  ],
  canonicalFlags: [],
  strictMarkers: [
    { id: "runtime:effect", deps: ["effect"] },
    { id: "api:trpc", deps: ["@trpc/server"] },
    { id: "ws:subscription", text: ["subscription"] },
    { id: "pattern:event-sourcing", text: ["projection"] },
    { id: "store:event-store", textAny: ["eventStore", "EventStore", "event_store"] },
    { id: "store:append-only", textAny: ["append"] },
    { id: "cqrs:commands", textAny: ["command", "Command"] },
    { id: "command:open-account", textAny: ["openAccount", "OpenAccount", "open_account"] },
    { id: "command:deposit", textAny: ["deposit", "Deposit"] },
    { id: "command:withdraw", textAny: ["withdraw", "Withdraw"] },
    {
      id: "ledger:overdraft",
      textAny: ["overdraft", "Overdraft", "insufficient", "Insufficient"],
    },
    { id: "projection:replay", textAny: ["replay", "Replay", "rebuild", "Rebuild"] },
    { id: "projection:idempotent", textAny: ["idempot", "Idempot"] },
    { id: "pattern:outbox", textAny: ["outbox", "Outbox"] },
  ],
  validationProfile: { packageManager: "bun" },
};
