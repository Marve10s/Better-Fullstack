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
): string {
  const quoteArgument = platform === "win32" ? quotePowerShellArgument : quotePosixShellArgument;
  return (
    `npx --yes create-better-fullstack@${getLatestCLIVersion()} update ` +
    `${quoteArgument(projectDir)} --recover ${transactionId}`
  );
}
