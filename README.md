<!--
```text
██████╗ ███████╗████████╗████████╗███████╗██████╗
██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗
██████╔╝█████╗     ██║      ██║   █████╗  ██████╔╝
██╔══██╗██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗
██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║
╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝

███████╗██╗   ██╗██╗     ██╗     ███████╗████████╗ █████╗  ██████╗██╗  ██╗
██╔════╝██║   ██║██║     ██║     ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
█████╗  ██║   ██║██║     ██║     ███████╗   ██║   ███████║██║     █████╔╝
██╔══╝  ██║   ██║██║     ██║     ╚════██║   ██║   ██╔══██║██║     ██╔═██╗
██║     ╚██████╔╝███████╗███████╗███████║   ██║   ██║  ██║╚██████╗██║  ██╗
╚═╝      ╚═════╝ ╚══════╝╚══════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
```
-->

<div align="center">

<img src="https://raw.githubusercontent.com/Marve10s/Better-Fullstack/main/apps/web/public/og/better-fullstack-terminal-preview-1200x630.png" alt="Better Fullstack terminal-style preview showing CLI scaffolding output" width="100%" />

<br>

**Scaffold configured fullstack projects in TypeScript, React Native, Rust, Go, Python, Java, .NET, and Elixir. Pick the Stack Parts, then inspect the generated result and its evidence.**

<br>

[![Version](https://img.shields.io/npm/v/create-better-fullstack?style=for-the-badge&colorA=18181B&colorB=28CF8D)](https://www.npmjs.com/package/create-better-fullstack)
&nbsp;
[![Downloads](https://img.shields.io/npm/dm/create-better-fullstack?style=for-the-badge&colorA=18181B&colorB=28CF8D)](https://www.npmjs.com/package/create-better-fullstack)
&nbsp;
[![License](https://img.shields.io/github/license/Marve10s/Better-Fullstack?style=for-the-badge&colorA=18181B&colorB=28CF8D)](LICENSE)

</div>

<br>

## Why Better Fullstack?

Most scaffolding tools lock you into one framework and one opinion. Better Fullstack doesn't.

- **Broad stack catalog.** Frontend, backend, database, ORM, auth, API layer, payments, AI, DevOps, and more
- **Multi-ecosystem projects.** Compose web, mobile, and backend stacks across TypeScript, React Native, Rust, Go, Python, Java, .NET, and Elixir
- **Visual builder.** Configure your stack in the browser, get a ready-to-run CLI command
- **Lifecycle-aware.** Create, add, update, check, and generate from the recorded `bts.jsonc` project model
- **Compatibility-checked.** The planner rejects or adjusts invalid selections before files are generated

<br>

## ⚡ Quick Start

<table>
<tr>
<td width="50%">

### 🌐 Web Builder (Recommended)

Configure your stack visually, pick every option from a UI, preview your choices, and get a ready-to-run command.

### **[Open the App Builder →](https://better-fullstack.dev/new)**

</td>
<td width="50%">

### 💻 CLI

```bash
npm create better-fullstack@latest
```

```bash
bun create better-fullstack@latest
```

```bash
pnpm create better-fullstack@latest
```

```bash
npx create-better-fullstack@latest
```

```bash
yarn create better-fullstack@latest
```

</td>
</tr>
</table>

<br>

## 🤖 AI Agents

One command connects every supported coding agent and editor on your machine to the Better Fullstack MCP server and installs both skills:

```bash
npx create-better-fullstack@latest install
```

It detects Claude Code, Codex CLI, Gemini CLI, OpenCode, Cursor, Windsurf, and Zed, backs up every config file before touching it, and supports `--dry-run`, `--only mcp|skills`, `--agent`, `--json`, and `--uninstall`. See the [`install` reference](https://better-fullstack.dev/docs/cli/install).

Manual setups when the installer does not cover your agent:

- **Claude Code plugin**: `claude plugin marketplace add Marve10s/Better-Fullstack`, then `claude plugin install better-fullstack@better-fullstack`
- **Codex plugin catalog**, `.agents/plugins/marketplace.json`
- **Any MCP client**, `npx -y create-better-fullstack@latest mcp`
- **Docs**, [better-fullstack.dev/docs/ai/overview](https://better-fullstack.dev/docs/ai/overview)

<br>

Ask any agent to build your stack, the **skill** runs the scaffold workflow, and the **MCP** exposes `bfs_*` tools (check compatibility, plan, create) to any client.

<br>

## 🤝 Contributing

See the [Contributing Guide](.github/CONTRIBUTING.md). Open an issue before starting work on new features.

```bash
git clone https://github.com/Marve10s/Better-Fullstack.git && cd Better-Fullstack
bun install
bun dev:cli    # CLI development
bun dev:web    # Website development
```

<br>

## 💬 Community

[![X](https://img.shields.io/badge/X-@MARVELOUSBC-18181B?style=for-the-badge&logo=x&logoColor=white)](https://x.com/MARVELOUSBC)
&nbsp;
[![Telegram](https://img.shields.io/badge/Telegram-Chat-18181B?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/TheCr1nge)
&nbsp;
[![GitHub](https://img.shields.io/badge/GitHub-Marve10s-18181B?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Marve10s)

Got questions or feedback? Open a [GitHub issue](https://github.com/Marve10s/Better-Fullstack/issues) or reach out on socials.

<br>

## 💛 Sponsors

If Better Fullstack saves you time, consider supporting:

[![GitHub Sponsors](https://img.shields.io/badge/GitHub_Sponsors-Sponsor-EA4AAA?style=for-the-badge&logo=githubsponsors&logoColor=white)](https://github.com/sponsors/Marve10s)
&nbsp;
[![Patreon](https://img.shields.io/badge/Patreon-Support-F96854?style=for-the-badge&logo=patreon&logoColor=white)](https://www.patreon.com/c/marve10s)

<br>

<!--
Star History is hidden while GitHub restricts stargazer data to repo admins and
collaborators, which makes the chart render an error placard instead of a graph:
https://star-history.com/blog/github-stargazer-api-restriction
Restore this block once the API is public again.

## 📈 Star History

<div align="center">
  <a href="https://star-history.com/#Marve10s/Better-Fullstack&Date">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=Marve10s/Better-Fullstack&type=Date&theme=dark" />
      <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=Marve10s/Better-Fullstack&type=Date" />
      <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=Marve10s/Better-Fullstack&type=Date" width="600" />
    </picture>
  </a>
</div>
-->

## License

MIT. Better Fullstack was originally forked from [Better T Stack](https://github.com/AmanVarshney01/create-better-t-stack) by [Aman Varshney](https://github.com/AmanVarshney01) and is now independently maintained with its own direction.
