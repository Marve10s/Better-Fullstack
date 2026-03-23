import type { VersionChannel } from "../types";

import { exitCancelled } from "../utils/errors";
import { isCancel, navigableSelect } from "./navigable";

export async function getVersionChannelChoice(versionChannel?: VersionChannel) {
  if (versionChannel !== undefined) return versionChannel;

  const response = await navigableSelect<VersionChannel>({
    message: "Choose dependency version channel",
    options: [
      {
        value: "stable",
        label: "Stable",
        hint: "Use Better Fullstack's curated pinned versions",
      },
      {
        value: "latest",
        label: "Latest",
        hint: "Resolve current npm latest tags during scaffolding",
      },
      {
        value: "beta",
        label: "Beta",
        hint: "Prefer npm beta/next prerelease tags when available",
      },
    ],
    initialValue: "stable",
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
