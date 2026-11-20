export const MIN_BUN_VERSION = "1.3.14";
export const MIN_NODE_VERSION = "26.4.0";
export const MIN_COLUMNS = 60;
export const MIN_ROWS = 16;

const SUPPORTED_TARGETS = new Set([
  "darwin-arm64",
  "darwin-x64",
  "linux-arm64",
  "linux-x64",
  "win32-arm64",
  "win32-x64",
]);

export type TuiSupportInput = {
  bunVersion?: string;
  nodeVersion: string;
  nodeFfiAvailable: boolean;
  platform: string;
  arch: string;
  stdinIsTTY: boolean;
  stdoutIsTTY: boolean;
  columns?: number;
  rows?: number;
  ci?: string;
  term?: string;
};

export type TuiSupport = { supported: true } | { supported: false; reason: string };

function parseVersion(version: string): number[] {
  return version
    .replace(/^v/, "")
    .split(/[.-]/)
    .slice(0, 3)
    .map((part) => Number.parseInt(part, 10) || 0);
}

export function isVersionAtLeast(version: string, minimum: string): boolean {
  const actual = parseVersion(version);
  const required = parseVersion(minimum);
  for (let index = 0; index < 3; index++) {
    const difference = (actual[index] ?? 0) - (required[index] ?? 0);
    if (difference !== 0) return difference > 0;
  }
  return true;
}

function isCi(value: string | undefined): boolean {
  const normalized = value?.trim().toLowerCase();
  return Boolean(normalized) && normalized !== "0" && normalized !== "false";
}

export function getTuiSupport(input: TuiSupportInput): TuiSupport {
  if (!input.stdinIsTTY || !input.stdoutIsTTY || isCi(input.ci)) {
    return { supported: false, reason: "the full-screen TUI needs an interactive terminal" };
  }
  if (input.term === "dumb") {
    return { supported: false, reason: "this terminal (TERM=dumb) cannot draw a full-screen UI" };
  }
  const target = `${input.platform}-${input.arch}`;
  if (!SUPPORTED_TARGETS.has(target)) {
    return { supported: false, reason: `OpenTUI has no native build for ${target}` };
  }
  if (input.bunVersion !== undefined) {
    if (!isVersionAtLeast(input.bunVersion, MIN_BUN_VERSION)) {
      return {
        supported: false,
        reason: `the TUI needs Bun ${MIN_BUN_VERSION} or newer (you have ${input.bunVersion})`,
      };
    }
  } else if (!isVersionAtLeast(input.nodeVersion, MIN_NODE_VERSION)) {
    return {
      supported: false,
      reason: `the TUI needs Node.js ${MIN_NODE_VERSION} or newer, or Bun ${MIN_BUN_VERSION} (you have Node.js ${input.nodeVersion.replace(/^v/, "")})`,
    };
  } else if (!input.nodeFfiAvailable) {
    return {
      supported: false,
      reason: "Node.js FFI is off; rerun with NODE_OPTIONS=--experimental-ffi",
    };
  }
  const columns = input.columns ?? 0;
  const rows = input.rows ?? 0;
  if (columns < MIN_COLUMNS || rows < MIN_ROWS) {
    return {
      supported: false,
      reason: `the terminal is ${columns}x${rows}; the TUI needs at least ${MIN_COLUMNS}x${MIN_ROWS}`,
    };
  }
  return { supported: true };
}

function hasNodeFfi(): boolean {
  if (process.versions.bun) return true;
  try {
    return typeof process.getBuiltinModule?.("node:ffi") === "object";
  } catch {
    return false;
  }
}

export function getCurrentTuiSupport(): TuiSupport {
  return getTuiSupport({
    bunVersion: process.versions.bun,
    nodeVersion: process.versions.node,
    nodeFfiAvailable: hasNodeFfi(),
    platform: process.platform,
    arch: process.arch,
    stdinIsTTY: process.stdin.isTTY === true,
    stdoutIsTTY: process.stdout.isTTY === true,
    columns: process.stdout.columns,
    rows: process.stdout.rows,
    ci: process.env.CI,
    term: process.env.TERM,
  });
}
