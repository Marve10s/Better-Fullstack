import NumberFlow from "@number-flow/react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  FileCode2,
  Layers,
  SearchCheck,
  Settings2,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useCallback, useMemo, useRef, useState, type CSSProperties } from "react";

import Footer from "@/components/home/footer";
import {
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_URL,
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_ROBOTS,
  DEFAULT_X_IMAGE_URL,
  SITE_NAME,
  canonicalUrl,
} from "@/lib/seo";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const MCP_TITLE = `MCP Server — AI Agent Integration | ${SITE_NAME}`;
const MCP_DESCRIPTION =
  "Connect AI coding agents to Better Fullstack via MCP. Let Claude, Cursor, VS Code Copilot, and other agents scaffold fullstack projects programmatically.";

export const Route = createFileRoute("/mcp")({
  head: () => ({
    meta: [
      { title: MCP_TITLE },
      { name: "description", content: MCP_DESCRIPTION },
      { name: "robots", content: DEFAULT_ROBOTS },
      { property: "og:title", content: MCP_TITLE },
      { property: "og:description", content: MCP_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl("/mcp") },
      { property: "og:image", content: DEFAULT_OG_IMAGE_URL },
      { property: "og:image:alt", content: DEFAULT_OG_IMAGE_ALT },
      { property: "og:image:width", content: String(DEFAULT_OG_IMAGE_WIDTH) },
      { property: "og:image:height", content: String(DEFAULT_OG_IMAGE_HEIGHT) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: MCP_TITLE },
      { name: "twitter:description", content: MCP_DESCRIPTION },
      { name: "twitter:image", content: DEFAULT_X_IMAGE_URL },
      { name: "twitter:image:alt", content: DEFAULT_OG_IMAGE_ALT },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/mcp") }],
  }),
  component: McpPage,
});

const ACCENT_TEXT = "text-black dark:text-[#C6E853]";

interface Agent {
  id: string;
  name: string;
  file: string;
  config: string;
  shell: boolean;
  iconSlug?: string;
  /** simple-icons brands that are monochrome and need theme-aware color */
  mono?: boolean;
}

const AGENTS: readonly Agent[] = [
  {
    id: "claude-code",
    name: "Claude Code",
    file: "terminal",
    shell: true,
    iconSlug: "claudecode",
    config:
      "claude mcp add --transport stdio better-fullstack -- npx -y create-better-fullstack@latest mcp",
  },
  {
    id: "codex",
    name: "Codex",
    file: "terminal",
    shell: true,
    config: "codex mcp add better-fullstack -- npx -y create-better-fullstack@latest mcp",
  },
  {
    id: "gemini-cli",
    name: "Gemini CLI",
    file: "terminal",
    shell: true,
    iconSlug: "googlegemini",
    config: "gemini mcp add better-fullstack npx -y create-better-fullstack@latest mcp",
  },
  {
    id: "cursor",
    name: "Cursor",
    file: ".cursor/mcp.json",
    shell: false,
    iconSlug: "cursor",
    mono: true,
    config: `{
  "mcpServers": {
    "better-fullstack": {
      "command": "npx",
      "args": ["-y", "create-better-fullstack@latest", "mcp"]
    }
  }
}`,
  },
  {
    id: "vscode",
    name: "VS Code",
    file: ".vscode/mcp.json",
    shell: false,
    iconSlug: "githubcopilot",
    mono: true,
    config: `{
  "servers": {
    "better-fullstack": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "create-better-fullstack@latest", "mcp"]
    }
  }
}`,
  },
  {
    id: "claude-desktop",
    name: "Claude Desktop",
    file: "claude_desktop_config.json",
    shell: false,
    iconSlug: "claude",
    config: `{
  "mcpServers": {
    "better-fullstack": {
      "command": "npx",
      "args": ["-y", "create-better-fullstack@latest", "mcp"]
    }
  }
}`,
  },
  {
    id: "windsurf",
    name: "Windsurf",
    file: "~/.codeium/windsurf/mcp_config.json",
    shell: false,
    iconSlug: "windsurf",
    config: `{
  "mcpServers": {
    "better-fullstack": {
      "command": "npx",
      "args": ["-y", "create-better-fullstack@latest", "mcp"]
    }
  }
}`,
  },
  {
    id: "zed",
    name: "Zed",
    file: "settings.json",
    shell: false,
    iconSlug: "zedindustries",
    mono: true,
    config: `{
  "context_servers": {
    "better-fullstack": {
      "command": {
        "path": "npx",
        "args": ["-y", "create-better-fullstack@latest", "mcp"]
      }
    }
  }
}`,
  },
] as const;

interface ToolInfo {
  name: string;
  description: string;
  icon: LucideIcon;
}

const TOOLS: readonly ToolInfo[] = [
  {
    name: "bfs_get_guidance",
    description: "Workflow rules, field semantics, and critical constraints",
    icon: Settings2,
  },
  {
    name: "bfs_get_schema",
    description: "Valid options for any category, filterable by ecosystem",
    icon: Layers,
  },
  {
    name: "bfs_check_compatibility",
    description: "Validate stack combinations with auto-adjustments",
    icon: SearchCheck,
  },
  {
    name: "bfs_plan_project",
    description: "Dry-run preview — generates the file tree in memory",
    icon: FileCode2,
  },
  {
    name: "bfs_create_project",
    description: "Scaffold a new project to disk",
    icon: Sparkles,
  },
  {
    name: "bfs_plan_addition",
    description: "Validate proposed addons for an existing project",
    icon: SearchCheck,
  },
  {
    name: "bfs_add_feature",
    description: "Add features to an existing project",
    icon: Wrench,
  },
] as const;

const RESOURCES = [
  { uri: "docs://compatibility-rules", desc: "Which stack combinations are valid" },
  { uri: "docs://stack-options", desc: "All technology options per category" },
  { uri: "docs://getting-started", desc: "Quick-start recipes per ecosystem" },
] as const;

const WORKFLOW_LINES = [
  { kind: "call", name: "bfs_get_guidance", note: "workflow rules + field semantics" },
  { kind: "call", name: "bfs_get_schema", note: "valid options for the stack" },
  { kind: "call", name: "bfs_check_compatibility", note: "stack validated, 0 adjustments" },
  { kind: "call", name: "bfs_plan_project", note: "dry-run preview, 59 files" },
  { kind: "call", name: "bfs_create_project", note: "written to ./my-app" },
  { kind: "done", name: "scaffold complete", note: "run bun install to finish" },
] as const;

const TIPS = [
  "frontend is an array — multiple frontends in one monorepo",
  '"none" means skip, not "use the default"',
  "Set ecosystem first — it decides which fields matter",
  "Dependencies are never installed — your agent will tell you the install command",
] as const;

const STATS = [
  { value: 7, suffix: "", label: "structured tools", fraction: false },
  { value: 3, suffix: "", label: "readable resources", fraction: false },
  { value: 677, suffix: "", label: "configurable options", fraction: false },
  { value: 2.6, suffix: "×", label: "faster than prompt-only", fraction: true },
] as const;

const numberFlowTiming = { duration: 900, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" } as const;
const oneDecimalFormat = { minimumFractionDigits: 1, maximumFractionDigits: 1 } as const;

const fadeUpInitial = { opacity: 0, y: 12 } as const;
const fadeUpVisible = { opacity: 1, y: 0 } as const;
const viewportOnce = { once: true } as const;
const viewportOnceNear = { once: true, margin: "-10%" } as const;
const fadeUpTransition = { duration: 0.6 } as const;

const builderSearch = { view: "command", file: "" } as const;

const h1Style: CSSProperties = { fontSize: "clamp(2.5rem, 8vw, 5.5rem)", lineHeight: 0.94 };
const heroNumberStyle: CSSProperties = { fontSize: "clamp(4.5rem, 12vw, 9rem)" };
const h2Style: CSSProperties = { fontSize: "clamp(1.85rem, 5vw, 3.4rem)", lineHeight: 0.98 };

function McpPage() {
  return (
    <main className="min-h-svh">
      <div className="mx-auto max-w-[1480px] border-x border-border">
        <HeroSection />
        <SetupSection />
        <ToolsSection />
        <WorkflowSection />
        <CtaSection />
        <Footer />
      </div>
    </main>
  );
}

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="relative border-b border-border">
      <div className="px-4 py-20 sm:px-8 sm:py-28">
        <div className="grid grid-cols-12 items-end gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-7">
            <p className={cn("font-mono text-[11px] uppercase tracking-[0.22em]", ACCENT_TEXT)}>
              ✦ model context protocol
            </p>
            <h1
              className="mt-4 max-w-[14ch] text-balance font-mono font-bold tracking-[-0.04em]"
              style={h1Style}
            >
              Your agent. <span className="italic text-muted-foreground">Every stack.</span>
            </h1>
            <p className="mt-6 max-w-lg text-pretty text-sm text-muted-foreground sm:text-base">
              One local MCP server turns any coding agent into a fullstack scaffolder — schema
              lookup, compatibility checks, dry-run previews, and project creation through
              structured tool calls. No hosting, runs via stdio.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/new"
                search={builderSearch}
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all hover:gap-3"
              >
                Open the builder
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="https://modelcontextprotocol.io"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                what is mcp?
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          <motion.div
            initial={fadeUpInitial}
            whileInView={fadeUpVisible}
            viewport={viewportOnce}
            transition={fadeUpTransition}
            className="col-span-12 lg:col-span-5 lg:text-right"
          >
            <div
              className="font-mono font-black leading-none tracking-[-0.05em]"
              style={heroNumberStyle}
            >
              <NumberFlow value={inView ? 677 : 0} transformTiming={numberFlowTiming} />
              <span className={cn("text-[0.4em]", ACCENT_TEXT)}>✦</span>
            </div>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              configurable options exposed to your agent
            </p>
          </motion.div>
        </div>

        <div className="mt-14 grid grid-cols-2 border border-border bg-muted/20 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <StatCell key={stat.label} stat={stat} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCell({
  stat,
  index,
  inView,
}: {
  stat: (typeof STATS)[number];
  index: number;
  inView: boolean;
}) {
  const transition = useMemo(() => ({ duration: 0.5, delay: index * 0.08 }), [index]);

  return (
    <motion.div
      initial={fadeUpInitial}
      whileInView={fadeUpVisible}
      viewport={viewportOnceNear}
      transition={transition}
      className={cn(
        "border-border p-5 sm:p-6",
        index % 2 === 0 && "border-r",
        index < 2 && "border-b lg:border-b-0",
        index < 3 && "lg:border-r",
      )}
    >
      <div className="font-mono text-3xl font-black tabular-nums sm:text-4xl">
        <NumberFlow
          value={inView ? stat.value : 0}
          format={stat.fraction ? oneDecimalFormat : undefined}
          transformTiming={numberFlowTiming}
        />
        {stat.suffix ? <span className={ACCENT_TEXT}>{stat.suffix}</span> : null}
      </div>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {stat.label}
      </p>
    </motion.div>
  );
}

function SetupSection() {
  const [agentId, setAgentId] = useState<string>(AGENTS[0].id);
  const [copied, setCopied] = useState(false);
  const agent = AGENTS.find((a) => a.id === agentId) ?? AGENTS[0];

  const copyConfig = useCallback(() => {
    const config = AGENTS.find((a) => a.id === agentId)?.config ?? "";
    navigator.clipboard.writeText(config).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
        return;
      },
      () => {},
    );
  }, [agentId]);

  const selectAgent = useCallback((id: string) => {
    setAgentId(id);
    setCopied(false);
  }, []);

  return (
    <section className="border-b border-border bg-muted/20">
      <div className="px-4 py-20 sm:px-8 sm:py-24">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-4">
            <p className={cn("font-mono text-[11px] uppercase tracking-[0.22em]", ACCENT_TEXT)}>
              ✦ setup
            </p>
            <h2
              className="mt-4 max-w-[12ch] text-balance font-mono font-bold tracking-[-0.04em]"
              style={h2Style}
            >
              Pick your <span className="italic text-muted-foreground">agent.</span>
            </h2>
            <p className="mt-5 max-w-sm text-pretty text-sm text-muted-foreground sm:text-base">
              One paste and your agent has the full toolbox. Terminal command or config file —
              whatever your client prefers.
            </p>
            <a
              href="/docs/ai/mcp"
              className={cn(
                "group mt-5 inline-flex items-center gap-1.5 font-mono text-xs font-semibold transition-colors hover:text-foreground",
                ACCENT_TEXT,
              )}
            >
              full documentation
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="overflow-hidden rounded-md border border-border bg-card">
              <div className="flex flex-wrap border-b border-border">
                {AGENTS.map((a) => (
                  <AgentTabButton
                    key={a.id}
                    agent={a}
                    active={agentId === a.id}
                    onSelect={selectAgent}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/30 px-4 py-2 sm:px-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {agent.file}
                </span>
                <button
                  type="button"
                  onClick={copyConfig}
                  aria-label={`Copy ${agent.name} configuration`}
                  className={cn(
                    "flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors active:translate-y-[1px]",
                    copied
                      ? "text-lime-700 dark:text-[#C6E853]"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                </button>
              </div>

              <pre className="overflow-x-auto px-4 py-4 sm:px-5">
                <code className="font-mono text-xs leading-relaxed sm:text-sm">
                  {agent.shell ? (
                    <span className="text-lime-700 dark:text-[#C6E853]">$ </span>
                  ) : null}
                  {agent.config}
                </code>
              </pre>
            </div>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {agent.shell ? "run in your terminal" : `paste into ${agent.file}`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AgentTabButton({
  agent,
  active,
  onSelect,
}: {
  agent: Agent;
  active: boolean;
  onSelect: (id: string) => void;
}) {
  const handleClick = useCallback(() => {
    onSelect(agent.id);
  }, [onSelect, agent.id]);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      className={cn(
        "flex cursor-pointer items-center gap-1.5 border-r border-b border-border px-3 py-2 text-xs font-medium transition-colors sm:gap-2 sm:px-4 lg:border-b-0",
        active
          ? "bg-[#C6E853] text-[#0a0a0a]"
          : "bg-transparent text-muted-foreground hover:text-foreground",
      )}
    >
      <AgentIcon agent={agent} active={active} />
      {agent.name}
    </button>
  );
}

function AgentIcon({ agent, active }: { agent: Agent; active: boolean }) {
  const { resolvedTheme } = useTheme();

  if (!agent.iconSlug) {
    return <OpenAIMark className="size-3.5 sm:size-4" />;
  }

  // Active tabs sit on lime, so monochrome marks stay dark there.
  const monoColor = !active && resolvedTheme === "dark" ? "e5e5e5" : "171717";
  const src = agent.mono
    ? `https://cdn.simpleicons.org/${agent.iconSlug}/${monoColor}`
    : `https://cdn.simpleicons.org/${agent.iconSlug}`;

  return <img src={src} alt="" width={16} height={16} className="size-3.5 sm:size-4" />;
}

// OpenAI logomark (simple-icons no longer ships it on the CDN).
function OpenAIMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.073zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997z" />
    </svg>
  );
}

function ToolsSection() {
  return (
    <section className="border-b border-border">
      <div className="px-4 pt-20 sm:px-8 sm:pt-24">
        <p className={cn("font-mono text-[11px] uppercase tracking-[0.22em]", ACCENT_TEXT)}>
          ✦ the toolbox
        </p>
        <h2
          className="mt-4 max-w-[16ch] text-balance font-mono font-bold tracking-[-0.04em]"
          style={h2Style}
        >
          Seven tools. <span className="italic text-muted-foreground">One workflow.</span>
        </h2>
        <p className="mt-5 max-w-lg text-pretty text-sm text-muted-foreground sm:text-base">
          Discover, validate, preview, create. Structured calls instead of guessed CLI flags —
          the compatibility engine auto-adjusts invalid combinations before they reach disk.
        </p>
      </div>

      <ul className="mt-12">
        {TOOLS.map((tool, index) => (
          <ToolRow key={tool.name} tool={tool} index={index} />
        ))}
      </ul>

      <div className="border-t border-border bg-muted/20 px-4 py-8 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          ✦ plus three read-only resources
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {RESOURCES.map((resource) => (
            <div key={resource.uri}>
              <code className={cn("font-mono text-xs font-semibold", ACCENT_TEXT)}>
                {resource.uri}
              </code>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{resource.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolRow({ tool, index }: { tool: ToolInfo; index: number }) {
  const transition = useMemo(() => ({ duration: 0.45, delay: index * 0.05 }), [index]);
  const Icon = tool.icon;

  return (
    <motion.li
      initial={fadeUpInitial}
      whileInView={fadeUpVisible}
      viewport={viewportOnceNear}
      transition={transition}
      className="group grid grid-cols-12 items-center gap-x-4 border-t border-border px-4 py-5 transition-colors hover:bg-muted/30 sm:px-8"
    >
      <span className="col-span-2 font-mono text-[11px] tabular-nums text-muted-foreground sm:col-span-1">
        0{index + 1}
      </span>
      <span className="col-span-10 flex items-center gap-2.5 sm:col-span-5">
        <Icon className={cn("size-4 shrink-0 transition-colors", ACCENT_TEXT)} />
        <code className="font-mono text-sm font-semibold sm:text-base">{tool.name}</code>
      </span>
      <span className="col-span-10 col-start-3 mt-1 text-xs text-muted-foreground sm:col-span-6 sm:col-start-7 sm:mt-0 sm:text-sm">
        {tool.description}
      </span>
    </motion.li>
  );
}

function WorkflowSection() {
  return (
    <section className="border-b border-border bg-muted/20">
      <div className="px-4 py-20 sm:px-8 sm:py-24">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <p className={cn("font-mono text-[11px] uppercase tracking-[0.22em]", ACCENT_TEXT)}>
              ✦ how it works
            </p>
            <h2
              className="mt-4 max-w-[14ch] text-balance font-mono font-bold tracking-[-0.04em]"
              style={h2Style}
            >
              You describe. <span className="italic text-muted-foreground">It builds.</span>
            </h2>
            <p className="mt-5 max-w-sm text-pretty text-sm text-muted-foreground sm:text-base">
              No flags to memorize. The agent walks the tool chain on its own — guidance, schema,
              validation, preview, scaffold.
            </p>

            <ul className="mt-8 space-y-3">
              {TIPS.map((tip) => (
                <li key={tip} className="flex gap-2.5 text-xs text-muted-foreground sm:text-sm">
                  <span className={cn("shrink-0 font-mono", ACCENT_TEXT)}>—</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <TerminalCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function TerminalCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[#0a0a0a] text-[#fafafa] [color-scheme:dark]">
      <div className="flex items-center justify-between border-b border-[#1f1f1f] px-4 py-3 sm:px-5">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#7a7a7a]">
          your agent session
        </span>
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#2a2a2a]" />
          <span className="size-2.5 rounded-full bg-[#2a2a2a]" />
          <span className="size-2.5 rounded-full bg-[#C6E853]" />
        </span>
      </div>

      <div className="space-y-3 px-4 py-5 font-mono text-xs sm:px-5 sm:text-sm">
        <motion.p
          initial={fadeUpInitial}
          whileInView={fadeUpVisible}
          viewport={viewportOnceNear}
          transition={fadeUpTransition}
          className="leading-6 text-[#fafafa]"
        >
          <span className="text-[#7a7a7a]">you: </span>
          &ldquo;Create a fullstack TypeScript app with Next.js, Hono, Drizzle, and
          PostgreSQL.&rdquo;
        </motion.p>

        {WORKFLOW_LINES.map((line, index) => (
          <WorkflowLine key={line.name} line={line} index={index} />
        ))}
      </div>
    </div>
  );
}

function WorkflowLine({
  line,
  index,
}: {
  line: (typeof WORKFLOW_LINES)[number];
  index: number;
}) {
  const transition = useMemo(() => ({ duration: 0.4, delay: 0.3 + index * 0.18 }), [index]);

  return (
    <motion.p
      initial={fadeUpInitial}
      whileInView={fadeUpVisible}
      viewport={viewportOnceNear}
      transition={transition}
      className="flex flex-wrap items-baseline gap-x-3 leading-6"
    >
      <span className="text-[#C6E853]">{line.kind === "done" ? "✓" : "→"}</span>
      <span className={cn(line.kind === "done" ? "font-semibold text-[#C6E853]" : "text-[#fafafa]")}>
        {line.name}
      </span>
      <span className="text-[#7a7a7a]">{line.note}</span>
    </motion.p>
  );
}

function CtaSection() {
  return (
    <section className="px-4 py-20 text-center sm:px-8 sm:py-24">
      <p
        className={cn(
          "font-mono text-[11px] uppercase tracking-[0.22em]",
          ACCENT_TEXT,
        )}
      >
        ✦ benchmarked
      </p>
      <h2
        className="mx-auto mt-4 max-w-[18ch] text-balance font-mono font-bold tracking-[-0.04em]"
        style={h2Style}
      >
        2.6× faster than <span className="italic text-muted-foreground">prompt-only.</span>
      </h2>
      <p className="mx-auto mt-5 max-w-md text-pretty text-sm text-muted-foreground sm:text-base">
        36 benchmark runs across three frontier models — agents on the MCP path scaffolded faster,
        burned 4× fewer output tokens, and every project survived a real install and build check.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <a
          href="/#benchmark"
          className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all hover:gap-3"
        >
          See the benchmark
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
        <a
          href="/docs/ai/mcp"
          className="group inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          read the docs
          <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  );
}
