import { useCallback, useState } from "react";
import { TbCheck as Check, TbChevronDown as ChevronDown, TbCopy as Copy } from "react-icons/tb";

import { OpenAIMark } from "@/components/home/provider-marks";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/lib/content/theme";
import { cn } from "@/lib/platform/utils";
import { m } from "@/paraglide/messages.js";

export interface AgentTab {
  id: string;
  label: string;
  iconSlug?: string;
  /** Local asset for brands simple-icons does not ship. */
  iconSrc?: string;
  mono?: boolean;
  openaiMark?: boolean;
  command: string;
  /** Config file the snippet is pasted into; omitted for shell commands. */
  target?: string;
  shell: boolean;
}

const STDIO_SNIPPET =
  '"better-fullstack": { "command": "npx", "args": ["-y", "create-better-fullstack@latest", "mcp"] }';
const LOCAL_SNIPPET =
  '"better-fullstack": { "type": "local", "command": ["npx", "-y", "create-better-fullstack@latest", "mcp"], "enabled": true }';

export const AGENT_TABS: readonly AgentTab[] = [
  {
    id: "claude-code",
    label: "Claude Code",
    iconSlug: "claudecode",
    command:
      "claude mcp add --scope user better-fullstack -- npx -y create-better-fullstack@latest mcp",
    shell: true,
  },
  {
    id: "codex",
    label: "Codex",
    openaiMark: true,
    command: "codex mcp add better-fullstack -- npx -y create-better-fullstack@latest mcp",
    shell: true,
  },
  {
    id: "gemini-cli",
    label: "Gemini CLI",
    iconSlug: "googlegemini",
    command:
      "gemini mcp add --scope user better-fullstack npx -y create-better-fullstack@latest mcp",
    shell: true,
  },
  {
    id: "cursor",
    label: "Cursor",
    iconSlug: "cursor",
    mono: true,
    command: STDIO_SNIPPET,
    target: "~/.cursor/mcp.json (mcpServers)",
    shell: false,
  },
  {
    id: "vscode",
    label: "VS Code",
    iconSlug: "githubcopilot",
    mono: true,
    command:
      'code --add-mcp \'{"name":"better-fullstack","command":"npx","args":["-y","create-better-fullstack@latest","mcp"]}\'',
    shell: true,
  },
  {
    id: "antigravity",
    label: "Antigravity",
    iconSrc: "/icon/antigravity.png",
    command: STDIO_SNIPPET,
    target: "~/.gemini/config/mcp_config.json (mcpServers)",
    shell: false,
  },
  {
    id: "opencode",
    label: "OpenCode",
    iconSlug: "opencode",
    mono: true,
    command: LOCAL_SNIPPET,
    target: "~/.config/opencode/opencode.json (mcp)",
    shell: false,
  },
  {
    id: "kilo-code",
    label: "Kilo Code",
    iconSrc: "/icon/kilo-code.svg",
    command: LOCAL_SNIPPET,
    target: ".kilo/kilo.jsonc (mcp)",
    shell: false,
  },
  {
    id: "kimi-code",
    label: "Kimi Code",
    iconSlug: "kimi",
    mono: true,
    command: "kimi mcp add better-fullstack -- npx -y create-better-fullstack@latest mcp",
    shell: true,
  },
  {
    id: "command-code",
    label: "Command Code",
    iconSrc: "/icon/command-code.png",
    command: "cmd mcp add better-fullstack -- npx -y create-better-fullstack@latest mcp",
    shell: true,
  },
  {
    id: "claude-desktop",
    label: "Claude Desktop",
    iconSlug: "claude",
    command: STDIO_SNIPPET,
    target: "claude_desktop_config.json (mcpServers)",
    shell: false,
  },
  {
    id: "windsurf",
    label: "Windsurf",
    iconSlug: "windsurf",
    mono: true,
    command: STDIO_SNIPPET,
    target: "~/.codeium/windsurf/mcp_config.json (mcpServers)",
    shell: false,
  },
  {
    id: "zed",
    label: "Zed",
    iconSlug: "zedindustries",
    mono: true,
    command:
      '"better-fullstack": { "command": "npx", "args": ["-y", "create-better-fullstack@latest", "mcp"] }',
    target: "~/.zed/settings.json (context_servers)",
    shell: false,
  },
] as const;

const MAIN_TAB_IDS = ["claude-code", "codex", "cursor", "antigravity"] as const;
const MAIN_TABS = AGENT_TABS.filter((tab) =>
  MAIN_TAB_IDS.includes(tab.id as (typeof MAIN_TAB_IDS)[number]),
);
const MORE_TABS = AGENT_TABS.filter(
  (tab) => !MAIN_TAB_IDS.includes(tab.id as (typeof MAIN_TAB_IDS)[number]),
);

export function AgentCommandTabs({ className }: { className?: string }) {
  const [agentId, setAgentId] = useState<string>(AGENT_TABS[0].id);
  const [copied, setCopied] = useState(false);
  const agent = AGENT_TABS.find((tab) => tab.id === agentId) ?? AGENT_TABS[0];

  const copy = useCallback(() => {
    const command = AGENT_TABS.find((tab) => tab.id === agentId)?.command ?? "";
    navigator.clipboard.writeText(command).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
        return;
      },
      () => {},
    );
  }, [agentId]);

  return (
    <div className={className}>
      <div className="overflow-hidden rounded-md border border-border bg-card">
        <div className="flex flex-wrap border-b border-border">
          {MAIN_TABS.map((tab) => (
            <AgentTabButton
              key={tab.id}
              tab={tab}
              active={agentId === tab.id}
              onSelect={setAgentId}
            />
          ))}
          <MoreAgentsTab activeId={agentId} onSelect={setAgentId} />
        </div>
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4">
          <code className="truncate font-mono text-xs sm:text-sm">
            {agent.shell ? <span className="text-ink dark:text-brand">$ </span> : null}
            {agent.command}
          </code>
          <button
            type="button"
            onClick={copy}
            aria-label={m.llmCopyAgentSetupCommand({ agent: agent.label })}
            className={cn(
              "flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors active:translate-y-[1px]",
              copied ? "text-ink dark:text-brand" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          </button>
        </div>
      </div>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {agent.target ? m.llmPasteInto({ target: agent.target }) : m.llmRunInTerminal()}
      </p>
    </div>
  );
}

function MoreAgentsTab({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const selected = MORE_TABS.find((tab) => tab.id === activeId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex cursor-pointer items-center gap-1.5 border-r border-border px-3 py-2 text-xs font-medium transition-colors last:border-r-0 sm:gap-2 sm:px-4",
          selected
            ? "bg-[#C6E853] text-[#0a0a0a]"
            : "bg-transparent text-muted-foreground hover:text-foreground",
        )}
      >
        {selected ? <AgentTabIcon tab={selected} active /> : null}
        {selected ? selected.label : m.llmOtherClients()}
        <ChevronDown className="size-3.5" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto min-w-52">
        {MORE_TABS.map((tab) => (
          <MoreAgentItem key={tab.id} tab={tab} onSelect={onSelect} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function MoreAgentItem({ tab, onSelect }: { tab: AgentTab; onSelect: (id: string) => void }) {
  const handleClick = useCallback(() => {
    onSelect(tab.id);
  }, [onSelect, tab.id]);

  return (
    <DropdownMenuItem onClick={handleClick}>
      <AgentTabIcon tab={tab} active={false} />
      {tab.label}
    </DropdownMenuItem>
  );
}

function AgentTabButton({
  tab,
  active,
  onSelect,
}: {
  tab: AgentTab;
  active: boolean;
  onSelect: (id: string) => void;
}) {
  const handleClick = useCallback(() => {
    onSelect(tab.id);
  }, [onSelect, tab.id]);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      className={cn(
        "flex cursor-pointer items-center gap-1.5 border-r border-border px-3 py-2 text-xs font-medium transition-colors last:border-r-0 sm:gap-2 sm:px-4",
        active
          ? "bg-[#C6E853] text-[#0a0a0a]"
          : "bg-transparent text-muted-foreground hover:text-foreground",
      )}
    >
      <AgentTabIcon tab={tab} active={active} />
      {tab.label}
    </button>
  );
}

function AgentTabIcon({ tab, active }: { tab: AgentTab; active: boolean }) {
  const { resolvedTheme } = useTheme();

  if (tab.openaiMark) {
    return <OpenAIMark className="size-3.5 sm:size-4" />;
  }

  if (tab.iconSrc) {
    return <img src={tab.iconSrc} alt="" width={16} height={16} className="size-3.5 sm:size-4" />;
  }

  if (!tab.iconSlug) {
    return null;
  }

  const monoColor = !active && resolvedTheme === "dark" ? "e5e5e5" : "171717";
  const src = tab.mono
    ? `https://cdn.simpleicons.org/${tab.iconSlug}/${monoColor}`
    : `https://cdn.simpleicons.org/${tab.iconSlug}`;

  return <img src={src} alt="" width={16} height={16} className="size-3.5 sm:size-4" />;
}
