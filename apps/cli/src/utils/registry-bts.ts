import fs from "fs-extra";
import * as JSONC from "jsonc-parser";
import path from "node:path";

import type { CapabilityPackManifest } from "../types";

const BTS_CONFIG_FILE = "bts.jsonc";

/**
 * Additively records an installed capability pack in the project's bts.jsonc
 * under a dedicated `capabilityPacks` array (list of "name@version"), plus any
 * addon ids the pack declares under `capabilityPackAddons`.
 *
 * This is intentionally self-contained: it does NOT flow through
 * `updateBtsConfig` (whose typed signature is limited to addons/webDeploy/
 * serverDeploy and would rewrite the derived stack graph). It edits the two
 * dedicated keys in place with JSONC.modify so comments and formatting survive.
 */
export async function recordPackInBtsConfig(
  projectDir: string,
  manifest: CapabilityPackManifest,
): Promise<void> {
  const configPath = path.join(projectDir, BTS_CONFIG_FILE);
  if (!(await fs.pathExists(configPath))) return;

  let content = await fs.readFile(configPath, "utf-8");
  const errors: JSONC.ParseError[] = [];
  const parsed = JSONC.parse(content, errors, {
    allowTrailingComma: true,
    disallowComments: false,
  }) as { capabilityPacks?: string[]; capabilityPackAddons?: string[] } | undefined;
  if (errors.length > 0 || typeof parsed !== "object" || parsed === null) return;

  const packRef = `${manifest.name}@${manifest.version}`;
  const existingPacks = Array.isArray(parsed.capabilityPacks) ? parsed.capabilityPacks : [];
  const nextPacks = [
    ...existingPacks.filter((entry) => !entry.startsWith(`${manifest.name}@`)),
    packRef,
  ];

  const existingAddons = Array.isArray(parsed.capabilityPackAddons)
    ? parsed.capabilityPackAddons
    : [];
  const nextAddons = [...new Set([...existingAddons, ...(manifest.addons ?? [])])];

  const formattingOptions = { tabSize: 2, insertSpaces: true, eol: "\n" } as const;

  const packEdit = JSONC.modify(content, ["capabilityPacks"], nextPacks, { formattingOptions });
  content = JSONC.applyEdits(content, packEdit);

  if (nextAddons.length > 0) {
    const addonEdit = JSONC.modify(content, ["capabilityPackAddons"], nextAddons, {
      formattingOptions,
    });
    content = JSONC.applyEdits(content, addonEdit);
  }

  await fs.writeFile(configPath, content, "utf-8");
}
