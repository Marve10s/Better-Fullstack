<a href="https://better-fullstack.dev"><img src=".github/media/readme/hero.svg" width="100%" alt="Better Fullstack. A terminal shows the CLI banner and one --part flag per stack part. A rotating ASCII stack prints one layer for each part: a database, a backend, a frontend and a mobile app from different languages, written as one project."></a>

<p align="center">
Scaffold fullstack projects from a catalog of Stack Parts.<br>
Use the CLI, the Stack Builder in your browser, or an MCP server for AI agents.
</p>

<p align="center"><a href="https://better-fullstack.dev">Website</a> &nbsp;·&nbsp; <a href="https://better-fullstack.dev/docs">Docs</a> &nbsp;·&nbsp; <a href="https://better-fullstack.dev/new">Stack Builder</a> &nbsp;·&nbsp; <a href="https://better-fullstack.dev/docs/ai/mcp">MCP</a> &nbsp;·&nbsp; <a href="https://better-fullstack.dev/changelog">Changelog</a> &nbsp;·&nbsp; <a href="https://www.npmjs.com/package/create-better-fullstack">npm</a></p>

<p align="center">
<a href="https://www.npmjs.com/package/create-better-fullstack"><img src="https://img.shields.io/npm/v/create-better-fullstack?style=flat-square&labelColor=0c0c0c&color=0c0c0c" alt="npm version"></a>
&nbsp;
<a href="https://www.npmjs.com/package/create-better-fullstack"><img src="https://img.shields.io/npm/dm/create-better-fullstack?style=flat-square&labelColor=0c0c0c&color=0c0c0c" alt="Monthly downloads"></a>
</p>

## Quick start

Run one command to scaffold a new project:

```bash
bun create better-fullstack@latest
```

```bash
npm create better-fullstack@latest
```

```bash
pnpm create better-fullstack@latest
```

```bash
yarn create better-fullstack@latest
```

After creating a project, use the CLI's `add`, `update`, `check`, and `gen` commands to maintain it. See the [lifecycle guide](https://better-fullstack.dev/docs/getting-started/lifecycle).

The Stack Builder runs in your browser and hands you the command to copy, or a ZIP download: **[Open the Stack Builder →](https://better-fullstack.dev/new)**

## What it covers

Multi-Ecosystem mode composes frontend, backend, database, and mobile parts from different languages into one project, like a TypeScript frontend with a Go backend.

<a href="https://better-fullstack.dev/docs/ecosystems"><img src=".github/media/readme/ecosystems.svg" width="100%" alt="Ecosystems: TypeScript, React Native, Rust, Python, Go, Java, Kotlin, Elixir, .NET, PHP, Ruby and Crystal. PHP, Ruby and Crystal are experimental."></a>

<p><a href="https://better-fullstack.dev/new"><img src=".github/media/readme/tile-builder.svg" width="33.33%" alt="Stack Builder. Pick parts in the browser, then copy the command or download a ZIP."></a><a href="https://better-fullstack.dev/docs/builder"><img src=".github/media/readme/tile-browser.svg" width="33.33%" alt="Runs in the browser. Preview the file tree, then edit and run TypeScript web stacks in a tab."></a><a href="https://better-fullstack.dev/docs/ai/mcp"><img src=".github/media/readme/tile-mcp.svg" width="33.33%" alt="MCP server. Agents plan, check and create projects through tool calls instead of flags."></a><a href="https://better-fullstack.dev/docs/choosing-a-stack"><img src=".github/media/readme/tile-compatibility.svg" width="33.33%" alt="Compatibility engine. Invalid combinations are rejected or adjusted before any file is written."></a><a href="https://better-fullstack.dev/docs/getting-started/lifecycle"><img src=".github/media/readme/tile-lifecycle.svg" width="33.33%" alt="add, update, check. bts.jsonc records the stack, so later commands can extend and repair it."></a><a href="https://better-fullstack.dev/docs/verification"><img src=".github/media/readme/tile-receipts.svg" width="33.33%" alt="Release receipts. Eight ecosystem recipes are generated, built and started for every release."></a></p>

## AI agents

Install the MCP server and both Better Fullstack skills for every coding agent on your machine:

```bash
npx create-better-fullstack@latest install
```

Or add the MCP server to one agent:

```bash
claude mcp add --scope user better-fullstack -- npx -y create-better-fullstack@latest mcp
```

```bash
codex mcp add better-fullstack -- npx -y create-better-fullstack@latest mcp
```

Agents can also read [`llms.txt`](llms.txt). The [MCP docs](https://better-fullstack.dev/docs/ai/mcp) cover other clients.

## Contributors

Everyone with a pull request merged into Better Fullstack.

<!-- contributors:start -->
<p><a href="https://github.com/Alisha-21-cloud"><img src="https://github.com/Alisha-21-cloud.png?size=128" width="64" height="64" alt="Alisha-21-cloud" title="Alisha-21-cloud"></a><a href="https://github.com/taltas"><img src="https://github.com/taltas.png?size=128" width="64" height="64" alt="taltas" title="taltas"></a><a href="https://github.com/dinwwwh"><img src="https://github.com/dinwwwh.png?size=128" width="64" height="64" alt="dinwwwh" title="dinwwwh"></a><a href="https://github.com/Kavin-Bakyaraj"><img src="https://github.com/Kavin-Bakyaraj.png?size=128" width="64" height="64" alt="Kavin-Bakyaraj" title="Kavin-Bakyaraj"></a><a href="https://github.com/Divith123"><img src="https://github.com/Divith123.png?size=128" width="64" height="64" alt="Divith123" title="Divith123"></a></p>
<!-- contributors:end -->

Want to join them? Read the [Contributing Guide](.github/CONTRIBUTING.md).

## Community

[![X](https://img.shields.io/badge/X-@IbrahimElkamali-0c0c0c?style=flat-square&logo=x&logoColor=white)](https://x.com/IbrahimElkamali)
&nbsp;
[![Telegram](https://img.shields.io/badge/Telegram-chat-0c0c0c?style=flat-square&logo=telegram&logoColor=white)](https://t.me/TheCr1nge)
&nbsp;
[![GitHub](https://img.shields.io/badge/GitHub-Marve10s-0c0c0c?style=flat-square&logo=github&logoColor=white)](https://github.com/Marve10s)

Found a bug? Open a [GitHub issue](https://github.com/Marve10s/Better-Fullstack/issues).

If Better Fullstack saves you time, consider sponsoring:

<a href="https://github.com/sponsors/Marve10s"><img src="https://img.shields.io/badge/GitHub_Sponsors-Sponsor-EA4AAA?style=for-the-badge&logo=githubsponsors&logoColor=white" height="40" alt="Sponsor on GitHub"></a>
&nbsp;&nbsp;
<a href="https://www.patreon.com/c/marve10s"><img src="https://img.shields.io/badge/Patreon-Support-F96854?style=for-the-badge&logo=patreon&logoColor=white" height="40" alt="Support on Patreon"></a>

<!--
Star History is hidden while GitHub restricts stargazer data to repo admins and
collaborators, which makes the chart render an error placard instead of a graph:
https://star-history.com/blog/github-stargazer-api-restriction
Restore this block once the API is public again.

## Star history

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
