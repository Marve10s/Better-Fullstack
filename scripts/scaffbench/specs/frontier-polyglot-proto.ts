import type { BenchmarkSpec } from "@scaffbench/types";

export const FrontierPolyglotProtoSpec: BenchmarkSpec = {
  id: "frontier-polyglot-proto",
  introducedAt: "2026-08-21",
  title:
    "Frontier: polyglot monorepo, shared protobuf across a Rust gRPC service, a Go gateway, and a TS client",
  lane: "core",
  family: "multi-ecosystem",
  supportedByBetterFullstack: false,
  paths: ["prompt"],
  requirements: [
    "Create one monorepo with a single shared Protocol Buffers (proto3) service contract.",
    "Implement the core service in Rust using Tonic for gRPC.",
    "Implement an edge gateway in Go that speaks gRPC to the Rust service and exposes HTTP/JSON.",
    "Implement a TypeScript web client generated from the same proto contract.",
    "Wire codegen so all three consume the one .proto definition; provide build scripts per package.",
  ],
  naturalPrompt:
    "Build a polyglot monorepo around a single service contract: a Rust gRPC core service, a Go gateway that bridges gRPC to HTTP/JSON, and a TypeScript client, all generated from one shared Protocol Buffers definition. Set up the codegen and per-package builds so the three stay in sync.",
  rightLibraryNotes: [
    "A single shared proto3 contract must drive all three languages.",
    "Rust uses Tonic for the gRPC service; Go uses grpc-go for the gateway.",
    "The TypeScript client must be generated from the same proto.",
  ],
  canonicalFlags: [],
  strictMarkers: [
    { id: "proto:proto3", text: ["proto3"] },
    { id: "proto:contract-file", files: ["*.proto"] },
    { id: "rust:tonic", text: ["tonic"] },
    { id: "go:grpc", text: ["google.golang.org/grpc"] },
    { id: "ts:protobuf", text: ["protobuf"] },
    { id: "codegen:from-proto", textAny: ["buf.gen", "protoc", "tonic_build", "protoc-gen"] },
    { id: "rust:proto-generated", textAny: ["prost", "tonic_build", "include_proto"] },
    {
      id: "go:proto-generated",
      textAny: ["google.golang.org/protobuf", "protoc-gen-go", ".pb.go"],
    },
    {
      id: "ts:proto-generated",
      textAny: [
        "ts-proto",
        "@bufbuild/protobuf",
        "@connectrpc/connect",
        "google-protobuf",
        "protobufjs",
        "_pb.ts",
        "_pb.js",
      ],
    },
    { id: "gateway:http-json", textAny: ["net/http", "grpc-gateway", "gin-gonic", "go-chi"] },
  ],
  prerequisiteCommands: [
    {
      command: ["buf", "generate"],
      whenConfigFound: ["buf.gen.yaml", "buf.gen.yml", "buf.gen.json"],
    },
  ],
  validationProfile: { packageManager: "bun", native: ["cargo", "go"] },
};
