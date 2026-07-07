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

<img src="https://raw.githubusercontent.com/Marve10s/Better-Fullstack/main/.github/media/hero.gif" alt="Better Fullstack" width="100%" />

<br>

**Scaffold production-ready fullstack apps in seconds. Browse 450+ tools across seven ecosystems — the CLI wires everything together.**

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

- **450+ tools** — frontend, backend, database, auth, payments, AI, DevOps, and more
- **7 ecosystems** — TypeScript, React Native, Rust, Python, Go, Java, Elixir — with more coming
- **Visual builder** — configure your stack in the browser, get a ready-to-run CLI command
- **Wired for you** — no manual glue code; every picked integration is preconfigured and working out of the box

<br>

## ⚡ Quick Start

<table>
<tr>
<td width="50%">

### 🌐 Web Builder (Recommended)

Configure your stack visually — pick every option from a UI, preview your choices, and get a ready-to-run command.

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

<details>
<summary><strong>CLI Flags</strong></summary>
<br>

```bash
--yes              # Accept all defaults
--yolo             # Scaffold a random stack — good for exploring
--template <name>  # Use a preset (t3, mern, pern, uniwind)
--ecosystem <lang> # Start in typescript, react-native, rust, python, go, java, or elixir mode
--part <binding>   # Add a multi-ecosystem stack part, e.g. frontend:typescript:next
--version-channel  # Dependency channel: stable, latest, beta
--no-git           # Skip git initialization
--no-install       # Skip dependency installation
--verify           # Run generated project checks without starting dev servers
--verbose          # Show detailed output
```

</details>

<br>

### 💻 The CLI

`bun create better-fullstack@latest` walks you through a guided prompt flow, then scaffolds a runnable project with every integration pre-wired.

<img src="https://raw.githubusercontent.com/Marve10s/Better-Fullstack/main/.github/media/cli.gif" alt="CLI demo" width="100%" />

<br>

## 🤖 AI Agents

Install the Claude Code plugin bundle:

```bash
claude plugin marketplace add Marve10s/Better-Fullstack
claude plugin install better-fullstack@better-fullstack
```

- **Codex plugin catalog** — `.agents/plugins/marketplace.json`
- **Any MCP client** — `npx -y create-better-fullstack@latest mcp`
- **Docs** — [better-fullstack.dev/docs/ai/plugin](https://better-fullstack.dev/docs/ai/plugin)

<br>

Ask any agent to build your stack — the **skill** runs the scaffold workflow, and the **MCP** exposes `bfs_*` tools (check compatibility, plan, create) to any client.

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

[![Patreon](https://img.shields.io/badge/Patreon-Support-F96854?style=for-the-badge&logo=patreon&logoColor=white)](https://www.patreon.com/c/marve10s)

<br>

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

<br>

## License

MIT. Better Fullstack is now maintained as a standalone project, with original inspiration from [create-better-t-stack](https://github.com/AmanVarshney01/create-better-t-stack) by [Aman Varshney](https://github.com/AmanVarshney01).
