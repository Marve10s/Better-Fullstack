/**
 * The focused ScaffBench typecheck follows dynamic route-check imports into
 * testing helpers. Their full workspace package is built in release lanes; this
 * dependency-light shim keeps the scripts-only check independent of build order.
 */
declare module "@better-fullstack/types" {
  export type CLIInput = Record<string, unknown>;
  export type Ecosystem =
    | "typescript"
    | "react-native"
    | "rust"
    | "python"
    | "go"
    | "java"
    | "elixir"
    | "dotnet";
  export type ProjectConfig = Record<string, any>;
  export function getLocalWebDevPort(frontend: unknown): number;
}
