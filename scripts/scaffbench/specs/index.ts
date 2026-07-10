import { AiSearchWorkbenchSpec } from "@/specs/ai-search-workbench";
import { RustLeptosAxumSpec } from "@/specs/rust-leptos-axum";
import { PythonIngestionApiSpec } from "@/specs/python-ingestion-api";
import { GoRealtimeApiSpec } from "@/specs/go-realtime-api";
import { MultiDotnetOpsSpec } from "@/specs/multi-dotnet-ops";
import { TsMinimalRestraintSpec } from "@/specs/ts-minimal-restraint";
import { TsSvelteEdgeOrpcSpec } from "@/specs/ts-svelte-edge-orpc";
import { DotnetBlazorCqrsSpec } from "@/specs/dotnet-blazor-cqrs";
import { MultiTsGoGrpcSpec } from "@/specs/multi-ts-go-grpc";
import { JavaSpringJooqKeycloakSpec } from "@/specs/java-spring-jooq-keycloak";
import { ElixirBroadwayAbsintheSpec } from "@/specs/elixir-broadway-absinthe";
import { ReactNativeExpoSpec } from "@/specs/react-native-expo";
import { FrontierPolyglotProtoSpec } from "@/specs/frontier-polyglot-proto";
import { FrontierEffectEventsourcingSpec } from "@/specs/frontier-effect-eventsourcing";

import type { BenchmarkSpec } from "@/types";

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

