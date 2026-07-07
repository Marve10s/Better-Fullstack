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
  canonicalUrl,
} from "@/lib/seo";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages.js";

export const Route = createFileRoute("/mcp")({
  head: () => {
    const title = m.mcpSeoTitle();
    const description = m.mcpSeoDescription();

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: DEFAULT_ROBOTS },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonicalUrl("/mcp") },
        { property: "og:image", content: DEFAULT_OG_IMAGE_URL },
        { property: "og:image:alt", content: DEFAULT_OG_IMAGE_ALT },
        { property: "og:image:width", content: String(DEFAULT_OG_IMAGE_WIDTH) },
        { property: "og:image:height", content: String(DEFAULT_OG_IMAGE_HEIGHT) },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: DEFAULT_X_IMAGE_URL },
        { name: "twitter:image:alt", content: DEFAULT_OG_IMAGE_ALT },
      ],
      links: [{ rel: "canonical", href: canonicalUrl("/mcp") }],
    };
  },
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

type ToolId =
  | "guidance"
  | "schema"
  | "compatibility"
  | "plan"
  | "create"
  | "plan-addition"
  | "add-feature";

interface ToolInfo {
  id: ToolId;
  name: string;
  icon: LucideIcon;
}

const TOOLS: readonly ToolInfo[] = [
  {
    id: "guidance",
    name: "bfs_get_guidance",
    icon: Settings2,
  },
  {
    id: "schema",
    name: "bfs_get_schema",
    icon: Layers,
  },
  {
    id: "compatibility",
    name: "bfs_check_compatibility",
    icon: SearchCheck,
  },
  {
    id: "plan",
    name: "bfs_plan_project",
    icon: FileCode2,
  },
  {
    id: "create",
    name: "bfs_create_project",
    icon: Sparkles,
  },
  {
    id: "plan-addition",
    name: "bfs_plan_addition",
    icon: SearchCheck,
  },
  {
    id: "add-feature",
    name: "bfs_add_feature",
    icon: Wrench,
  },
] as const;

type ResourceId = "compatibility" | "options" | "getting-started";

const RESOURCES: ReadonlyArray<{ id: ResourceId; uri: string }> = [
  { id: "compatibility", uri: "docs://compatibility-rules" },
  { id: "options", uri: "docs://stack-options" },
  { id: "getting-started", uri: "docs://getting-started" },
] as const;

type WorkflowLineId = "guidance" | "schema" | "compatibility" | "plan" | "create" | "done";

const WORKFLOW_LINES: ReadonlyArray<{
  id: WorkflowLineId;
  kind: "call" | "done";
  name?: string;
}> = [
  { id: "guidance", kind: "call", name: "bfs_get_guidance" },
  { id: "schema", kind: "call", name: "bfs_get_schema" },
  { id: "compatibility", kind: "call", name: "bfs_check_compatibility" },
  { id: "plan", kind: "call", name: "bfs_plan_project" },
  { id: "create", kind: "call", name: "bfs_create_project" },
  { id: "done", kind: "done" },
] as const;

type TipId = "frontend-array" | "none-skip" | "ecosystem-first" | "dependencies";

const TIPS: readonly TipId[] = [
  "frontend-array",
  "none-skip",
  "ecosystem-first",
  "dependencies",
] as const;

const STATS = [
  { id: "tools", value: 7, suffix: "", fraction: false },
  { id: "resources", value: 3, suffix: "", fraction: false },
  { id: "options", value: 677, suffix: "", fraction: false },
  { id: "speed", value: 2.6, suffix: "×", fraction: true },
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
const h2Style: CSSProperties = { fontSize: "clamp(1.85rem, 5vw, 3.4rem)", lineHeight: 0.98 };

function getToolDescription(id: ToolId) {
  switch (id) {
    case "guidance":
      return m.mcpToolGuidanceDescription();
    case "schema":
      return m.mcpToolSchemaDescription();
    case "compatibility":
      return m.mcpToolCompatibilityDescription();
    case "plan":
      return m.mcpToolPlanDescription();
    case "create":
      return m.mcpToolCreateDescription();
    case "plan-addition":
      return m.mcpToolPlanAdditionDescription();
    case "add-feature":
      return m.mcpToolAddFeatureDescription();
  }
}

function getResourceDescription(id: ResourceId) {
  switch (id) {
    case "compatibility":
      return m.mcpResourceCompatibilityDescription();
    case "options":
      return m.mcpResourceOptionsDescription();
    case "getting-started":
      return m.mcpResourceGettingStartedDescription();
  }
}

function getWorkflowName(line: (typeof WORKFLOW_LINES)[number]) {
  return line.kind === "done" ? m.mcpWorkflowDoneName() : (line.name ?? "");
}

function getWorkflowNote(id: WorkflowLineId) {
  switch (id) {
    case "guidance":
      return m.mcpWorkflowGuidanceNote();
    case "schema":
      return m.mcpWorkflowSchemaNote();
    case "compatibility":
      return m.mcpWorkflowCompatibilityNote();
    case "plan":
      return m.mcpWorkflowPlanNote();
    case "create":
      return m.mcpWorkflowCreateNote();
    case "done":
      return m.mcpWorkflowDoneNote();
  }
}

function getTipText(id: TipId) {
  switch (id) {
    case "frontend-array":
      return m.mcpTipFrontendArray();
    case "none-skip":
      return m.mcpTipNoneMeansSkip();
    case "ecosystem-first":
      return m.mcpTipSetEcosystemFirst();
    case "dependencies":
      return m.mcpTipDependenciesNeverInstalled();
  }
}

function getStatLabel(id: (typeof STATS)[number]["id"]) {
  switch (id) {
    case "tools":
      return m.mcpStatStructuredTools();
    case "resources":
      return m.mcpStatReadableResources();
    case "options":
      return m.mcpStatConfigurableOptions();
    case "speed":
      return m.mcpStatFasterPromptOnly();
  }
}

function McpPage() {
  return (
    <main className="min-h-svh">
      <div className="mx-auto max-w-[1480px] border-x border-border">
        <HeroSection />
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
              ✦ {m.mcpHeroEyebrow()}
            </p>
            <h1
              className="mt-4 max-w-[14ch] text-balance font-mono font-bold tracking-[-0.04em]"
              style={h1Style}
            >
              {m.mcpHeroTitleA()}{" "}
              <span className="italic text-muted-foreground">{m.mcpHeroTitleB()}</span>
            </h1>
            <p className="mt-6 max-w-lg text-pretty text-sm text-muted-foreground sm:text-base">
              {m.mcpHeroDescription()}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/new"
                search={builderSearch}
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all hover:gap-3"
              >
                {m.mcpOpenBuilder()}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="https://modelcontextprotocol.io"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                {m.mcpReadProtocol()}
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          <motion.div
            initial={fadeUpInitial}
            whileInView={fadeUpVisible}
            viewport={viewportOnce}
            transition={fadeUpTransition}
            className="col-span-12 lg:col-span-5"
          >
            <p className={cn("font-mono text-[11px] uppercase tracking-[0.22em]", ACCENT_TEXT)}>
              ✦ {m.mcpInstallFor()}
            </p>
            <AgentInstallCard />
          </motion.div>
        </div>

        <div className="mt-14 grid grid-cols-2 border border-border bg-muted/20 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <StatCell key={stat.id} stat={stat} index={index} inView={inView} />
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
        {getStatLabel(stat.id)}
      </p>
    </motion.div>
  );
}

function AgentInstallCard() {
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
    <div className="mt-3">
      <div className="overflow-hidden rounded-md border border-border bg-card">
        <div className="flex flex-wrap border-b border-border">
          {AGENTS.map((a) => (
            <AgentTabButton key={a.id} agent={a} active={agentId === a.id} onSelect={selectAgent} />
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/30 px-4 py-2">
          <span className="truncate font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {agent.file}
          </span>
          <button
            type="button"
            onClick={copyConfig}
            aria-label={m.mcpCopyAgentConfiguration({ agent: agent.name })}
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

        <pre className="overflow-x-auto px-4 py-4">
          <code className="font-mono text-xs leading-relaxed">
            {agent.shell ? <span className="text-lime-700 dark:text-[#C6E853]">$ </span> : null}
            {agent.config}
          </code>
        </pre>
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {agent.shell ? m.mcpRunTerminal() : m.mcpPasteInto({ file: agent.file })}
        </p>
        <a
          href="/docs/ai/mcp"
          className={cn(
            "group inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors hover:text-foreground",
            ACCENT_TEXT,
          )}
        >
          {m.mcpDocs()}
          <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
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
          ✦ {m.mcpToolsEyebrow()}
        </p>
        <h2
          className="mt-4 max-w-[16ch] text-balance font-mono font-bold tracking-[-0.04em]"
          style={h2Style}
        >
          {m.mcpToolsTitleA()}{" "}
          <span className="italic text-muted-foreground">{m.mcpToolsTitleB()}</span>
        </h2>
        <p className="mt-5 max-w-lg text-pretty text-sm text-muted-foreground sm:text-base">
          {m.mcpToolsDescription()}
        </p>
      </div>

      <ul className="mt-12">
        {TOOLS.map((tool, index) => (
          <ToolRow key={tool.name} tool={tool} index={index} />
        ))}
      </ul>

      <div className="border-t border-border bg-muted/20 px-4 py-8 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          ✦ {m.mcpResources()}
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {RESOURCES.map((resource) => (
            <div key={resource.uri}>
              <code className={cn("font-mono text-xs font-semibold", ACCENT_TEXT)}>
                {resource.uri}
              </code>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {getResourceDescription(resource.id)}
              </p>
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
        {getToolDescription(tool.id)}
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
              ✦ {m.mcpWorkflowEyebrow()}
            </p>
            <h2
              className="mt-4 max-w-[14ch] text-balance font-mono font-bold tracking-[-0.04em]"
              style={h2Style}
            >
              {m.mcpWorkflowTitleA()}{" "}
              <span className="italic text-muted-foreground">{m.mcpWorkflowTitleB()}</span>
            </h2>
            <p className="mt-5 max-w-sm text-pretty text-sm text-muted-foreground sm:text-base">
              {m.mcpWorkflowDescription()}
            </p>

            <ul className="mt-8 space-y-3">
              {TIPS.map((tip) => (
                <li key={tip} className="flex gap-2.5 text-xs text-muted-foreground sm:text-sm">
                  <span className={cn("shrink-0 font-mono", ACCENT_TEXT)}>—</span>
                  <span>{getTipText(tip)}</span>
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
          {m.mcpTerminalHeader()}
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
          <span className="text-[#7a7a7a]">{m.mcpTerminalYou()} </span>
          &ldquo;{m.mcpTerminalExample()}&rdquo;
        </motion.p>

        {WORKFLOW_LINES.map((line, index) => (
          <WorkflowLine key={line.id} line={line} index={index} />
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
        {getWorkflowName(line)}
      </span>
      <span className="text-[#7a7a7a]">{getWorkflowNote(line.id)}</span>
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
        ✦ {m.mcpFinalEyebrow()}
      </p>
      <h2
        className="mx-auto mt-4 max-w-[18ch] text-balance font-mono font-bold tracking-[-0.04em]"
        style={h2Style}
      >
        {m.mcpFinalTitle()}{" "}
        <span className="italic text-muted-foreground">{m.mcpFinalTitleEmphasis()}</span>
      </h2>
      <p className="mx-auto mt-5 max-w-md text-pretty text-sm text-muted-foreground sm:text-base">
        {m.mcpFinalDescription()}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <a
          href="/benchmark"
          className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all hover:gap-3"
        >
          {m.mcpViewBenchmark()}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
        <a
          href="/docs/ai/mcp"
          className="group inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          {m.mcpReadDocs()}
          <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  );
}
