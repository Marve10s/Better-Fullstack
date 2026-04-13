import { ProjectConfigSchema } from "@better-fullstack/types/schemas";
import type { ProjectConfig } from "@better-fullstack/types/types";

import type { StackState } from "@/lib/stack-defaults";
import { stackStateToProjectConfigBase } from "@/lib/stack-project-config-base";

export function stackStateToProjectConfig(input: Partial<StackState>): ProjectConfig {
  return ProjectConfigSchema.parse(stackStateToProjectConfigBase(input));
}
