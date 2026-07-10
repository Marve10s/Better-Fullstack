import type { BenchmarkSpec } from "../types";

export const FrontierPolyglotProtoSpec: BenchmarkSpec = {
    id: "frontier-polyglot-proto",
    title: "Frontier: polyglot monorepo — shared protobuf across a Rust gRPC service, a Go gateway, and a TS client",
    lane: "core",
    family: "multi-ecosystem",
    // Beyond Better-Fullstack's option space (its graph allows one backend), so
    // this runs prompt-only — the agent builds it from scratch with no scaffolder.
    supportedByBetterFullstack: false,
    paths: ["prompt"],
    requirements: [
      "Create one monorepo with a single shared Protocol Buffers (proto3) service contract.",
      "Implement the core service in Rust using Tonic for gRPC.",
      "Implement an edge gateway in Go that speaks gRPC to the Rust service and exposes HTTP/JSON.",
      "Implement a TypeScript web client generated from the same proto contract.",
      "Wire codegen so all three consume the one .proto definition; provide build scripts per package.",
      "Do not install dependencies, do not initialize git, and do not start a dev server.",
    ],
    naturalPrompt:
      "Build a polyglot monorepo around a single service contract: a Rust gRPC core service, a Go gateway that bridges gRPC to HTTP/JSON, and a TypeScript client — all generated from one shared Protocol Buffers definition. Set up the codegen and per-package builds so the three stay in sync.",
    rightLibraryNotes: [
      "A single shared proto3 contract must drive all three languages.",
      "Rust uses Tonic for the gRPC service; Go uses grpc-go for the gateway.",
      "The TypeScript client must be generated from the same proto.",
    ],
    canonicalFlags: [],
    strictMarkers: [
      // Frontier markers are loose, single-token diagnostics (text arrays AND
      // together, so multi-token would over-constrain a from-scratch project).
      { id: "proto:proto3", text: ["proto3"] },
      { id: "rust:tonic", text: ["tonic"] },
      { id: "go:grpc", text: ["google.golang.org/grpc"] },
      { id: "ts:protobuf", text: ["protobuf"] },
    ],
    validationProfile: { packageManager: "bun", native: ["cargo", "go"] },
  };

