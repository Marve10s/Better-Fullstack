import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Bot, Check, Copy, FileCode2, Layers, SearchCheck, Settings2, Sparkles, Wrench } from "lucide-react";
import { useState } from "react";

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

interface Agent {
  name: string;
  config: string;
  file: string;
}

const agents: Agent[] = [
  {
    name: "Claude Code",
    file: "Terminal",
    config: `claude mcp add --transport stdio better-fullstack -- npx create-better-fullstack mcp`,
  },
  {
    name: "Cursor",
    file: ".cursor/mcp.json",
    config: `{
  "mcpServers": {
    "better-fullstack": {
      "command": "npx",
      "args": ["-y", "create-better-fullstack", "mcp"]
    }
  }
}`,
  },
  {
    name: "VS Code",
    file: ".vscode/mcp.json",
    config: `{
  "servers": {
    "better-fullstack": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "create-better-fullstack", "mcp"]
    }
  }
}`,
  },
  {
    name: "Claude Desktop",
    file: "claude_desktop_config.json",
    config: `{
  "mcpServers": {
    "better-fullstack": {
      "command": "npx",
      "args": ["-y", "create-better-fullstack", "mcp"]
    }
  }
}`,
  },
  {
    name: "Windsurf",
    file: "~/.codeium/windsurf/mcp_config.json",
    config: `{
  "mcpServers": {
    "better-fullstack": {
      "command": "npx",
      "args": ["-y", "create-better-fullstack", "mcp"]
    }
  }
}`,
  },
  {
    name: "Zed",
    file: "settings.json",
    config: `{
  "context_servers": {
    "better-fullstack": {
      "command": {
        "path": "npx",
        "args": ["-y", "create-better-fullstack", "mcp"]
      }
    }
  }
}`,
  },
];

interface ToolInfo {
  name: string;
  description: string;
  icon: React.ReactNode;
}

const tools: ToolInfo[] = [
  { name: "bfs_get_guidance", description: "Workflow rules, field semantics, and critical constraints", icon: <Settings2 className="h-4 w-4" /> },
  { name: "bfs_get_schema", description: "Valid options for any category, filterable by ecosystem", icon: <Layers className="h-4 w-4" /> },
  { name: "bfs_check_compatibility", description: "Validate stack combinations with auto-adjustments", icon: <SearchCheck className="h-4 w-4" /> },
  { name: "bfs_plan_project", description: "Dry-run preview — generates file tree in memory", icon: <FileCode2 className="h-4 w-4" /> },
  { name: "bfs_create_project", description: "Scaffold a new project to disk", icon: <Sparkles className="h-4 w-4" /> },
  { name: "bfs_plan_addition", description: "Validate proposed addons for an existing project", icon: <SearchCheck className="h-4 w-4" /> },
  { name: "bfs_add_feature", description: "Add features to an existing project", icon: <Wrench className="h-4 w-4" /> },
];

function McpPage() {
  return (
    <main className="min-h-svh">
      <div className="mx-auto max-w-5xl border-x border-border">
        <HeroSection />
        <SetupSection />
        <ToolsSection />
        <WorkflowSection />
        <Footer />
      </div>
    </main>
  );
}

function HeroSection() {
  return (
    <div className="flex flex-col items-center px-4 pt-12 pb-8 sm:pt-16">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground sm:text-sm">
        <Bot className="h-3.5 w-3.5" />
        Model Context Protocol
      </div>

      <h1 className="mt-6 max-w-3xl text-center font-mono text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        MCP Server
      </h1>

      <p className="mt-4 max-w-xl text-center text-sm text-muted-foreground sm:mt-6 sm:text-lg">
        Let AI agents scaffold and modify fullstack projects programmatically. Works with Claude, Cursor, VS Code, and any MCP-compatible client.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
        <a
          href="https://modelcontextprotocol.io"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
        >
          What is MCP?
        </a>
        <Link
          to="/new"
          search={{ view: "command", file: "" }}
          className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2.5 text-xs font-medium text-background transition-colors hover:bg-foreground/90 sm:gap-2 sm:px-5 sm:text-sm"
        >
          Open Builder
          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Link>
      </div>
    </div>
  );
}

function SetupSection() {
  const [selectedAgent, setSelectedAgent] = useState(0);
  const [copied, setCopied] = useState(false);

  const agent = agents[selectedAgent];

  const copyConfig = () => {
    if (!agent) return;
    navigator.clipboard.writeText(agent.config).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return;
    }).catch(() => {});
  };

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <h2 className="font-mono text-lg font-bold sm:text-xl">Setup</h2>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Register the server with your AI agent. No hosting required — runs locally via stdio.
        </p>

        <div className="mt-6">
          {/* Agent tabs */}
          <div className="flex flex-wrap border-b border-border">
            {agents.map((a, i) => (
              <button
                key={a.name}
                type="button"
                onClick={() => { setSelectedAgent(i); setCopied(false); }}
                className={`border-b-2 px-3 py-2 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${
                  selectedAgent === i
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {a.name}
              </button>
            ))}
          </div>

          {/* Config display */}
          {agent && (
            <div className="mt-3 sm:mt-4">
              <div className="flex items-center justify-between rounded-t-lg border border-b-0 border-border bg-muted/30 px-3 py-2 sm:px-4">
                <span className="font-mono text-xs text-muted-foreground">{agent.file}</span>
                <button
                  type="button"
                  onClick={copyConfig}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Copy config"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto rounded-b-lg border border-border bg-muted/10 px-3 py-3 sm:px-4 sm:py-4">
                <code className="font-mono text-xs leading-relaxed sm:text-sm">{agent.config}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ToolsSection() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <h2 className="font-mono text-lg font-bold sm:text-xl">7 Tools</h2>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Discover, validate, preview, and create — all via structured tool calls.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="group rounded-lg border border-border p-4 transition-colors hover:border-primary/40"
            >
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground transition-colors group-hover:text-primary">
                  {tool.icon}
                </span>
                <code className="font-mono text-xs font-medium sm:text-sm">{tool.name}</code>
              </div>
              <p className="mt-2 text-xs text-muted-foreground sm:text-sm">{tool.description}</p>
            </div>
          ))}
        </div>

        {/* Resources */}
        <h3 className="mt-10 font-mono text-base font-bold sm:text-lg">3 Resources</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Read-only context agents can fetch for reference.
        </p>
        <div className="mt-4 space-y-2">
          {[
            { uri: "docs://compatibility-rules", desc: "Which stack combinations are valid" },
            { uri: "docs://stack-options", desc: "All technology options per category" },
            { uri: "docs://getting-started", desc: "Quick-start recipes per ecosystem" },
          ].map((r) => (
            <div key={r.uri} className="flex items-start gap-3 rounded-lg border border-border px-4 py-3">
              <code className="shrink-0 font-mono text-xs text-primary">{r.uri}</code>
              <span className="text-xs text-muted-foreground sm:text-sm">{r.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  const steps = [
    { step: "1", tool: "bfs_get_guidance", label: "Learn the rules" },
    { step: "2", tool: "bfs_get_schema", label: "Discover valid options" },
    { step: "3", tool: "bfs_check_compatibility", label: "Validate the stack" },
    { step: "4", tool: "bfs_plan_project", label: "Preview file tree" },
    { step: "5", tool: "bfs_create_project", label: "Scaffold to disk" },
  ];

  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <h2 className="font-mono text-lg font-bold sm:text-xl">How it works</h2>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Just describe what you want. The agent calls the right tools in order.
        </p>

        {/* Example prompt */}
        <div className="mt-6 rounded-lg border border-border bg-muted/10 px-4 py-4">
          <p className="text-xs text-muted-foreground sm:text-sm">You say:</p>
          <p className="mt-1 font-mono text-sm font-medium sm:text-base">
            &ldquo;Create a fullstack TypeScript app with Next.js, Hono, Drizzle, and PostgreSQL&rdquo;
          </p>
        </div>

        {/* Steps */}
        <div className="mt-6 space-y-0">
          {steps.map((s, i) => (
            <div key={s.step} className="flex items-stretch gap-4">
              {/* Timeline line + dot */}
              <div className="flex flex-col items-center">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-muted/30 font-mono text-xs font-bold">
                  {s.step}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-border" />
                )}
              </div>
              {/* Content */}
              <div className="pb-6">
                <code className="font-mono text-xs font-medium sm:text-sm">{s.tool}</code>
                <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="mt-6 rounded-lg border border-border bg-muted/10 px-4 py-4">
          <h3 className="font-mono text-sm font-bold">Tips</h3>
          <ul className="mt-3 space-y-2 text-xs text-muted-foreground sm:text-sm">
            <li className="flex gap-2">
              <span className="shrink-0 text-primary">—</span>
              <span><code className="font-mono">frontend</code> is an array — supports multiple frontends in one monorepo</span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-primary">—</span>
              <span><code className="font-mono">&quot;none&quot;</code> means skip, not &ldquo;use the default&rdquo;</span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-primary">—</span>
              <span>Set <code className="font-mono">ecosystem</code> first — it determines which fields are relevant</span>
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 text-primary">—</span>
              <span>Dependencies are never installed — the agent tells the user to run install manually</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            to="/new"
            search={{ view: "command", file: "" }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Open Builder
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="/docs/ai/mcp/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Full documentation →
          </a>
        </div>
      </div>
    </section>
  );
}
