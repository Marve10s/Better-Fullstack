import type { BenchmarkSpec } from "@scaffbench/types";

import { AiSearchWorkbenchSpec } from "@scaffbench/specs/ai-search-workbench";
import { DotnetBlazorCqrsSpec } from "@scaffbench/specs/dotnet-blazor-cqrs";
import { ElixirBroadwayAbsintheSpec } from "@scaffbench/specs/elixir-broadway-absinthe";
import { FrontierEffectEventsourcingSpec } from "@scaffbench/specs/frontier-effect-eventsourcing";
import { FrontierPolyglotProtoSpec } from "@scaffbench/specs/frontier-polyglot-proto";
import { GoRealtimeApiSpec } from "@scaffbench/specs/go-realtime-api";
import { JavaSpringJooqKeycloakSpec } from "@scaffbench/specs/java-spring-jooq-keycloak";
import { MultiDotnetOpsSpec } from "@scaffbench/specs/multi-dotnet-ops";
import { MultiTsGoGrpcSpec } from "@scaffbench/specs/multi-ts-go-grpc";
import { PythonIngestionApiSpec } from "@scaffbench/specs/python-ingestion-api";
import { ReactNativeExpoSpec } from "@scaffbench/specs/react-native-expo";
import { RustLeptosAxumSpec } from "@scaffbench/specs/rust-leptos-axum";
import { TsMinimalRestraintSpec } from "@scaffbench/specs/ts-minimal-restraint";
import { TsSvelteEdgeOrpcSpec } from "@scaffbench/specs/ts-svelte-edge-orpc";

export const SCAFFBENCH_2_SPECS: readonly BenchmarkSpec[] = [
  AiSearchWorkbenchSpec,
  RustLeptosAxumSpec,
  PythonIngestionApiSpec,
  GoRealtimeApiSpec,
  MultiDotnetOpsSpec,
  TsMinimalRestraintSpec,
  TsSvelteEdgeOrpcSpec,
  DotnetBlazorCqrsSpec,
  MultiTsGoGrpcSpec,
  JavaSpringJooqKeycloakSpec,
  ElixirBroadwayAbsintheSpec,
  ReactNativeExpoSpec,
  FrontierPolyglotProtoSpec,
  FrontierEffectEventsourcingSpec,
];
