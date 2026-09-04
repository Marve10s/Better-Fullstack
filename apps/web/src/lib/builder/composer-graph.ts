import {
  formatStackPartSpec,
  hasJavaScriptWorkspaceRoot,
  toolingRequiresJavaScriptWorkspace,
  parseStackPartSpecs,
  type StackPart,
} from "@better-fullstack/types";

const applicationRoles = new Set(["frontend", "backend", "mobile"]);

export function getComposerParts(specs: readonly string[]) {
  return parseStackPartSpecs([...specs], "selected").filter(
    (part) => part.source !== "provided" && part.toolId !== "none",
  );
}

export function hasComposerApplication(specs: readonly string[]) {
  return getComposerParts(specs).some(
    (part) => !part.ownerPartId && applicationRoles.has(part.role),
  );
}

export function composerUsesJavaScript(specs: readonly string[]) {
  return hasJavaScriptWorkspaceRoot(getComposerParts(specs));
}

/** Apply the editor's changed selections without replacing imported services or their capabilities. */
export function reconcileComposerSpecs(
  currentSpecs: readonly string[],
  previousSelection: readonly string[],
  nextSelection: readonly string[],
) {
  let parts = getComposerParts(currentSpecs);
  const previous = getComposerParts(previousSelection);
  const next = getComposerParts(nextSelection);
  const roles = new Set(
    [...previous, ...next].filter((part) => !part.ownerPartId).map((part) => part.role),
  );

  const removeTree = (id: string) => {
    const removed = new Set([id]);
    for (let changed = true; changed; ) {
      changed = false;
      for (const part of parts) {
        if (part.ownerPartId && removed.has(part.ownerPartId) && !removed.has(part.id)) {
          removed.add(part.id);
          changed = true;
        }
      }
    }
    parts = parts.filter((part) => !removed.has(part.id));
  };

  for (const role of roles) {
    const before = previous.find((part) => part.role === role && !part.ownerPartId);
    const after = next.find((part) => part.role === role && !part.ownerPartId);
    const current = parts.find((part) => part.role === role && !part.ownerPartId);
    const sameApplication =
      before?.toolId === after?.toolId && before?.ecosystem === after?.ecosystem;
    let owner: StackPart | undefined = current;
    if (!sameApplication) {
      if (current) removeTree(current.id);
      const currentCanonicalId = current
        ? getComposerParts([`${current.role}:${current.ecosystem}:${current.toolId}`])[0]?.id
        : undefined;
      owner = after
        ? { ...after, id: current && current.id !== currentCanonicalId ? current.id : after.id }
        : undefined;
      if (owner) parts.push(owner);
    }
    if (!after || !owner) continue;

    const beforeChildren = previous.filter((part) => part.ownerPartId === before?.id);
    const afterChildren = next.filter((part) => part.ownerPartId === after.id);
    const childRoles = new Set([...beforeChildren, ...afterChildren].map((part) => part.role));
    for (const childRole of childRoles) {
      const oldChildren = beforeChildren.filter((part) => part.role === childRole);
      const newChildren = afterChildren.filter((part) => part.role === childRole);
      if (
        sameApplication &&
        oldChildren.map((part) => part.toolId).join() ===
          newChildren.map((part) => part.toolId).join()
      )
        continue;
      for (const child of parts.filter(
        (part) => part.ownerPartId === owner.id && part.role === childRole,
      ))
        removeTree(child.id);
      parts.push(
        ...newChildren.map((part) => ({
          ...part,
          id: `${owner.id}-${part.role}-${part.toolId}`,
          ownerPartId: owner.id,
        })),
      );
    }
  }

  if (!hasJavaScriptWorkspaceRoot(parts)) {
    for (const part of parts.filter((part) => toolingRequiresJavaScriptWorkspace(part.toolId)))
      removeTree(part.id);
  }
  return parts.map((part) => formatStackPartSpec(part, parts));
}
