import type { Code, Root } from "mdast";
import { visit } from "unist-util-visit";

type RemarkPlugin = () => (tree: Root) => void;

/**
 * Convert each ```npm code block into a `<PMTabs />` MDX JSX element with
 * auto-generated pnpm/bun/yarn variants alongside the original npm command.
 *
 * The transformation rules below cover the commands actually used in our
 * docs (create, install, run scripts, dlx-style invocations). Commands the
 * rules don't recognise pass through verbatim.
 *
 *   npm install <pkg>         → pnpm add <pkg>      bun add <pkg>      yarn add <pkg>
 *   npm install -D <pkg>      → pnpm add -D <pkg>   bun add -d <pkg>   yarn add -D <pkg>
 *   npm install (no pkg)      → pnpm install        bun install        yarn install
 *   npm uninstall <pkg>       → pnpm remove <pkg>   bun remove <pkg>   yarn remove <pkg>
 *   npm run <script>          → pnpm <script>       bun run <script>   yarn <script>
 *   npm create <starter> -- <args> → pnpm create <starter> <args>  bun create <starter> <args>  yarn create <starter> <args>
 *
 * The fence body may contain multiple lines (line continuations or chained
 * commands). We rewrite each line independently and re-join with newlines.
 */
const PMTABS_COMPONENT = "PMTabs";

export const remarkNpmTabs: RemarkPlugin = () => {
  return (tree) => {
    visit(tree, "code", (node: Code, index, parent) => {
      if (node.lang !== "npm") return;
      if (!parent || typeof index !== "number") return;

      const commands = expandNpmCommand(node.value);
      const replacement = buildPMTabsJsx(commands);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (parent.children as any[]).splice(index, 1, replacement);
    });
  };
};

type CommandSet = {
  npm: string;
  pnpm: string;
  bun: string;
  yarn: string;
};

function expandNpmCommand(npmSource: string): CommandSet {
  const lines = npmSource.split("\n");
  const transform = (managerLine: (line: string) => string) =>
    lines.map(managerLine).join("\n");

  return {
    npm: npmSource,
    pnpm: transform(toPnpm),
    bun: transform(toBun),
    yarn: transform(toYarn),
  };
}

const NPM_INSTALL_PKG = /^(\s*)npm\s+install\s+(-D|--save-dev|-S|--save)?\s*(.+)$/;
const NPM_UNINSTALL_PKG = /^(\s*)npm\s+uninstall\s+(.+)$/;
const NPM_RUN = /^(\s*)npm\s+run\s+(.+)$/;
const NPM_CREATE = /^(\s*)npm\s+create\s+(\S+)(?:\s+--\s+(.*))?(?:\s+(.*))?$/;
const NPM_BARE_INSTALL = /^(\s*)npm\s+install\s*(\\?)$/;

function toPnpm(line: string): string {
  if (NPM_BARE_INSTALL.test(line)) return line.replace(/^(\s*)npm\s+install/, "$1pnpm install");
  let m = line.match(NPM_INSTALL_PKG);
  if (m) {
    const flag = m[2] === "-D" || m[2] === "--save-dev" ? " -D" : "";
    return `${m[1]}pnpm add${flag} ${m[3]}`;
  }
  m = line.match(NPM_UNINSTALL_PKG);
  if (m) return `${m[1]}pnpm remove ${m[2]}`;
  m = line.match(NPM_RUN);
  if (m) return `${m[1]}pnpm ${m[2]}`;
  m = line.match(NPM_CREATE);
  if (m) {
    const args = [m[3], m[4]].filter(Boolean).join(" ");
    return `${m[1]}pnpm create ${m[2]}${args ? " " + args : ""}`;
  }
  // Fallback: replace bare "npm" with "pnpm" if it appears at the start.
  return line.replace(/^(\s*)npm(\s)/, "$1pnpm$2");
}

function toBun(line: string): string {
  if (NPM_BARE_INSTALL.test(line)) return line.replace(/^(\s*)npm\s+install/, "$1bun install");
  let m = line.match(NPM_INSTALL_PKG);
  if (m) {
    const flag = m[2] === "-D" || m[2] === "--save-dev" ? " -d" : "";
    return `${m[1]}bun add${flag} ${m[3]}`;
  }
  m = line.match(NPM_UNINSTALL_PKG);
  if (m) return `${m[1]}bun remove ${m[2]}`;
  m = line.match(NPM_RUN);
  if (m) return `${m[1]}bun run ${m[2]}`;
  m = line.match(NPM_CREATE);
  if (m) {
    const args = [m[3], m[4]].filter(Boolean).join(" ");
    return `${m[1]}bun create ${m[2]}${args ? " " + args : ""}`;
  }
  return line.replace(/^(\s*)npm(\s)/, "$1bun$2");
}

function toYarn(line: string): string {
  if (NPM_BARE_INSTALL.test(line)) return line.replace(/^(\s*)npm\s+install/, "$1yarn install");
  let m = line.match(NPM_INSTALL_PKG);
  if (m) {
    const flag = m[2] === "-D" || m[2] === "--save-dev" ? " -D" : "";
    return `${m[1]}yarn add${flag} ${m[3]}`;
  }
  m = line.match(NPM_UNINSTALL_PKG);
  if (m) return `${m[1]}yarn remove ${m[2]}`;
  m = line.match(NPM_RUN);
  if (m) return `${m[1]}yarn ${m[2]}`;
  m = line.match(NPM_CREATE);
  if (m) {
    const args = [m[3], m[4]].filter(Boolean).join(" ");
    return `${m[1]}yarn create ${m[2]}${args ? " " + args : ""}`;
  }
  return line.replace(/^(\s*)npm(\s)/, "$1yarn$2");
}

/**
 * Build an `mdxJsxFlowElement` node that renders as
 * `<PMTabs npm="..." pnpm="..." bun="..." yarn="..." />`.
 */
function buildPMTabsJsx(commands: CommandSet) {
  const attr = (name: keyof CommandSet) => ({
    type: "mdxJsxAttribute",
    name,
    value: commands[name],
  });

  return {
    type: "mdxJsxFlowElement",
    name: PMTABS_COMPONENT,
    attributes: [attr("npm"), attr("pnpm"), attr("bun"), attr("yarn")],
    children: [],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
}
