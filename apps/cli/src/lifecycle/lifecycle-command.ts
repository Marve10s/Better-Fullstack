import { getLatestCLIVersion } from "@/platform/get-latest-cli-version";

export function quotePosixShellArgument(value: string): string {
  return `'${value.replaceAll("'", `'"'"'`)}'`;
}

export function quotePowerShellArgument(value: string): string {
  return `'${value.replaceAll("'", "''")}'`;
}

export function getPackageExecPrefix(packageManager: string | undefined): string {
  if (packageManager === "bun") return "bunx";
  if (packageManager === "pnpm") return "pnpm dlx";
  if (packageManager === "yarn") return "yarn dlx";
  return "npx --yes";
}

export function getProjectRecoveryCommand(
  projectDir: string,
  transactionId: string,
  platform: NodeJS.Platform,
  packageManager: "bun" | "npm" | "pnpm" | "yarn" | undefined,
): string {
  const quoteArgument = platform === "win32" ? quotePowerShellArgument : quotePosixShellArgument;
  return (
    `${getPackageExecPrefix(packageManager)} create-better-fullstack@${getLatestCLIVersion()} update ` +
    `${quoteArgument(projectDir)} --recover ${transactionId}`
  );
}
