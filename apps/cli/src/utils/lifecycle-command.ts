import { getLatestCLIVersion } from "./get-latest-cli-version";

export function quotePosixShellArgument(value: string): string {
  return `'${value.replaceAll("'", `'"'"'`)}'`;
}

export function quotePowerShellArgument(value: string): string {
  return `'${value.replaceAll("'", "''")}'`;
}

export function getProjectRecoveryCommand(
  projectDir: string,
  transactionId: string,
  platform: NodeJS.Platform = process.platform,
  packageManager: "bun" | "npm" | "pnpm" | "yarn" = "bun",
): string {
  const quoteArgument = platform === "win32" ? quotePowerShellArgument : quotePosixShellArgument;
  const runner =
    packageManager === "pnpm"
      ? "pnpm dlx"
      : packageManager === "yarn"
        ? "yarn dlx"
        : packageManager === "npm"
          ? "npx --yes"
          : "bunx";
  return (
    `${runner} create-better-fullstack@${getLatestCLIVersion()} update ` +
    `${quoteArgument(projectDir)} --recover ${transactionId}`
  );
}
