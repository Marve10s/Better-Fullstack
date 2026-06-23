import { intro, log } from "@clack/prompts";
import pc from "picocolors";

import { hasTelemetryEnvOverride, isTelemetryEnabled } from "../utils/analytics";
import { renderTitle } from "../utils/render-title";
import { getPersistedTelemetryPreference, setTelemetryPreference } from "../utils/telemetry-settings";

export type TelemetryAction = "status" | "enable" | "disable";

export type TelemetryCommandInput = {
  action: TelemetryAction;
  json: boolean;
};

const COLLECTED = [
  "Selected stack options (frontend, backend, database, ORM, auth, API, etc.)",
  "CLI version, Node.js version, and OS platform",
];

const NOT_COLLECTED = [
  "Project names, directory paths, or file contents",
  "Personal or otherwise identifying information",
];

type TelemetrySource = "env" | "preference" | "default";

function resolveSource(persisted: boolean | undefined): TelemetrySource {
  if (hasTelemetryEnvOverride()) return "env";
  if (persisted !== undefined) return "preference";
  return "default";
}

function describeSource(source: TelemetrySource): string {
  switch (source) {
    case "env":
      return "environment variable (BTS_TELEMETRY_DISABLED)";
    case "preference":
      return "saved preference (create-better-fullstack telemetry enable/disable)";
    default:
      return "default";
  }
}

export async function telemetryHandler(input: TelemetryCommandInput): Promise<void> {
  if (input.action === "enable") {
    await setTelemetryPreference(true);
    log.success(pc.green("Telemetry enabled. Thanks for helping improve Better Fullstack."));
    return;
  }

  if (input.action === "disable") {
    await setTelemetryPreference(false);
    log.success(pc.green("Telemetry disabled. No anonymous usage data will be sent."));
    return;
  }

  // status
  const enabled = await isTelemetryEnabled();
  const persisted = await getPersistedTelemetryPreference();
  const source = resolveSource(persisted);

  if (input.json) {
    console.log(
      JSON.stringify(
        {
          enabled,
          source,
          persisted: persisted ?? null,
          envOverride: hasTelemetryEnvOverride(),
        },
        null,
        2,
      ),
    );
    return;
  }

  renderTitle();
  intro(pc.magenta("Telemetry"));

  log.message(
    `${pc.bold("Status:")} ${enabled ? pc.green("enabled") : pc.yellow("disabled")} ${pc.dim(
      `(${describeSource(source)})`,
    )}`,
  );

  log.message("");
  log.message(pc.bold("What is sent when enabled:"));
  for (const item of COLLECTED) {
    log.message(`  ${pc.green("+")} ${item}`);
  }

  log.message(pc.bold("What is never sent:"));
  for (const item of NOT_COLLECTED) {
    log.message(`  ${pc.red("-")} ${item}`);
  }

  log.message("");
  log.message(
    pc.dim(
      `Change anytime: ${pc.cyan("create-better-fullstack telemetry enable")} / ` +
        `${pc.cyan("create-better-fullstack telemetry disable")} ` +
        `(or set ${pc.cyan("BTS_TELEMETRY_DISABLED=1")}).`,
    ),
  );
}
