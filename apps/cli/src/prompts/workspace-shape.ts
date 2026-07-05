import type { Backend, Frontend, WorkspaceShape } from "../types";

import { exitCancelled } from "../utils/errors";
import { canPromptInteractively } from "../utils/prompt-environment";
import { isCancel, navigableSelect } from "./navigable";

const SINGLE_APP_WEB_FRONTENDS = new Set<Frontend>(["next", "tanstack-start"]);

/**
 * The flat single-app layout only makes sense for a "thin self" app: backend
 * `self` with exactly one Next.js or TanStack Start web frontend. For anything
 * else we never prompt and resolve to `monorepo` (the compatibility engine and
 * generator also normalize non-qualifying stacks back to monorepo).
 */
function stackCanUseSingleApp(backend: Backend | undefined, frontend: Frontend[]): boolean {
  if (backend !== "self") return false;
  const webFrontends = frontend.filter((f) => f && f !== "none");
  if (webFrontends.length !== 1) return false;
  return SINGLE_APP_WEB_FRONTENDS.has(webFrontends[0] as Frontend);
}

export async function getWorkspaceShapeChoice(
  workspaceShape: WorkspaceShape | undefined,
  backend: Backend | undefined,
  frontend: Frontend[] | undefined,
): Promise<WorkspaceShape> {
  if (!stackCanUseSingleApp(backend, frontend ?? [])) return "monorepo";
  if (workspaceShape !== undefined) return workspaceShape;
  if (!canPromptInteractively()) return "monorepo";

  const response = await navigableSelect<WorkspaceShape>({
    message: "Choose workspace layout",
    options: [
      {
        value: "monorepo",
        label: "Monorepo",
        hint: "apps/* + packages/* workspaces (recommended)",
      },
      {
        value: "single-app",
        label: "Single app",
        hint: "Flat app at the repo root (no workspaces)",
      },
    ],
    initialValue: "monorepo",
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
