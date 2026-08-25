import { isSilent } from "@/presentation/context";

export type PromptEnvironment = {
  silent?: boolean;
  stdinIsTTY?: boolean;
  stdoutIsTTY?: boolean;
  ci?: string | undefined;
};

function hasOwnProperty<ObjectType extends object>(
  value: ObjectType,
  property: PropertyKey,
): property is keyof ObjectType {
  return Object.prototype.hasOwnProperty.call(value, property);
}

function resolveCiValue(environment?: PromptEnvironment): string | undefined {
  if (environment && hasOwnProperty(environment, "ci")) {
    return environment.ci;
  }

  return process.env.CI;
}

export function isCiEnvironment(value: string | undefined): boolean {
  if (!value) {
    return false;
  }

  const normalizedValue = value.trim().toLowerCase();
  return normalizedValue !== "" && normalizedValue !== "0" && normalizedValue !== "false";
}

export function canPromptInteractively(environment: PromptEnvironment = {}): boolean {
  const silent = environment.silent ?? isSilent();
  const stdinIsTTY = environment.stdinIsTTY ?? (process.stdin.isTTY === true);
  const stdoutIsTTY = environment.stdoutIsTTY ?? (process.stdout.isTTY === true);
  const ci = resolveCiValue(environment);

  return !silent && stdinIsTTY && stdoutIsTTY && !isCiEnvironment(ci);
}
