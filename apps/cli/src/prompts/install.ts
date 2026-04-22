import { log } from "@clack/prompts";

import type { Ecosystem, JavaBuildTool } from "../types";

import { DEFAULT_CONFIG } from "../constants";
import { commandExists } from "../utils/command-exists";
import { exitCancelled } from "../utils/errors";
import { isCancel, navigableConfirm } from "./navigable";

export async function getinstallChoice(
  install?: boolean,
  ecosystem?: Ecosystem,
  javaBuildTool?: JavaBuildTool,
) {
  if (install !== undefined) return install;

  // For Rust: check cargo and show appropriate message
  if (ecosystem === "rust") {
    const cargoInstalled = await commandExists("cargo");
    if (!cargoInstalled) {
      log.warn("Cargo is not installed. Please install Rust from https://rustup.rs");
      return false;
    }

    const response = await navigableConfirm({
      message: "Run cargo build?",
      initialValue: DEFAULT_CONFIG.install,
    });

    if (isCancel(response)) return exitCancelled("Operation cancelled");

    return response;
  }

  // For Python: check uv and show appropriate message
  if (ecosystem === "python") {
    const uvInstalled = await commandExists("uv");
    if (!uvInstalled) {
      log.warn("uv is not installed. Please install uv from https://docs.astral.sh/uv/");
      return false;
    }

    const response = await navigableConfirm({
      message: "Run uv sync?",
      initialValue: DEFAULT_CONFIG.install,
    });

    if (isCancel(response)) return exitCancelled("Operation cancelled");

    return response;
  }

  // For Go: check go and show appropriate message
  if (ecosystem === "go") {
    const goInstalled = await commandExists("go");
    if (!goInstalled) {
      log.warn("Go is not installed. Please install Go from https://go.dev/dl/");
      return false;
    }

    const response = await navigableConfirm({
      message: "Run go mod tidy?",
      initialValue: DEFAULT_CONFIG.install,
    });

    if (isCancel(response)) return exitCancelled("Operation cancelled");

    return response;
  }

  // For Java: check java and show appropriate message
  if (ecosystem === "java") {
    const javaInstalled = await commandExists("java");
    if (!javaInstalled) {
      log.warn(
        "Java is not installed. Please install a JDK from https://adoptium.net/ or your preferred vendor.",
      );
      return false;
    }

    if (javaBuildTool === "none") {
      log.warn("No Java build tool selected. Skipping Java install verification.");
      return false;
    }

    const javaTestCommand = javaBuildTool === "gradle" ? "./gradlew test" : "./mvnw test";

    const response = await navigableConfirm({
      message: `Run ${javaTestCommand}?`,
      initialValue: DEFAULT_CONFIG.install,
    });

    if (isCancel(response)) return exitCancelled("Operation cancelled");

    return response;
  }

  // For TypeScript: existing behavior
  const response = await navigableConfirm({
    message: "Install dependencies?",
    initialValue: DEFAULT_CONFIG.install,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
