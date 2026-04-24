import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://better-fullstack.dev",
  base: "/docs",
  outDir: "../web/public/docs",
  integrations: [
    starlight({
      title: "Better Fullstack",
      description:
        "Documentation for Better Fullstack, the stack builder and CLI for TypeScript, Rust, Python, Go, and Java projects.",
      logo: {
        src: "./src/assets/logo.svg",
        alt: "Better Fullstack",
      },
      favicon: "/favicon/favicon.svg",
      editLink: {
        baseUrl: "https://github.com/Marve10s/Better-Fullstack/edit/main/apps/docs/",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/Marve10s/Better-Fullstack",
        },
      ],
      customCss: ["./src/styles/docs.css"],
      components: {
        Header: "./src/components/Header.astro",
        PageTitle: "./src/components/PageTitle.astro",
      },
      sidebar: [
        {
          label: "Start Here",
          items: [
            { label: "Get Started", slug: "index" },
            { label: "Installation", slug: "getting-started/installation" },
            { label: "First Project", slug: "getting-started/first-project" },
          ],
        },
        {
          label: "CLI",
          items: [
            { label: "Create", slug: "cli/create" },
            { label: "Add Features", slug: "cli/add" },
          ],
        },
        {
          label: "Ecosystems",
          autogenerate: { directory: "ecosystems" },
        },
        {
          label: "AI Agents",
          items: [
            { label: "Overview", slug: "ai/overview" },
            { label: "MCP", slug: "ai/mcp" },
          ],
        },
        {
          label: "Reference",
          items: [
            {
              label: "Options",
              items: [
                { label: "Overview", slug: "reference/options" },
                { label: "Core Stack", slug: "reference/options/stack" },
                { label: "Services & Integrations", slug: "reference/options/services" },
                { label: "UI, Forms & State", slug: "reference/options/ui" },
                { label: "Tooling, Deploy & Ops", slug: "reference/options/tooling" },
                { label: "Rust", slug: "reference/options/rust" },
                { label: "Python", slug: "reference/options/python" },
                { label: "Go", slug: "reference/options/go" },
                { label: "Java", slug: "reference/options/java" },
              ],
            },
            { label: "Generated llms.txt", slug: "reference/llms" },
          ],
        },
      ],
    }),
  ],
});
