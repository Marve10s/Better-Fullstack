/**
 * Add dependencies to a package.json in the virtual filesystem
 */

import type { VirtualFileSystem } from "../core/virtual-fs";

type PackageJson = {
  name?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  [key: string]: unknown;
};

export const dependencyVersionMap = {
  typescript: "^6.0.2",

  "better-auth": "^1.5.6",
  "@better-auth/expo": "^1.5.6",
  "@better-auth/drizzle-adapter": "^1.5.6",
  "@better-auth/prisma-adapter": "^1.5.6",
  "@better-auth/mongo-adapter": "^1.5.6",

  "@clerk/nextjs": "^7.0.8",
  "@clerk/clerk-react": "^5.61.3",
  "@clerk/tanstack-react-start": "^1.0.8",
  "@clerk/clerk-expo": "^2.19.31",

  // Auth.js (NextAuth v5)
  "next-auth": "^4.24.13",
  "@auth/core": "^0.34.3",
  "@auth/drizzle-adapter": "^1.11.1",
  "@auth/prisma-adapter": "^2.11.1",

  // Stack Auth
  "@stackframe/stack": "^2.8.80",

  // Supabase Auth
  "@supabase/supabase-js": "^2.101.1",
  "@supabase/ssr": "^0.10.0",

  // Auth0
  "@auth0/nextjs-auth0": "^4.16.1",

  "drizzle-orm": "^0.45.2",
  "drizzle-kit": "^0.31.10",
  "@planetscale/database": "^1.20.1",

  "@libsql/client": "^0.17.2",
  libsql: "^0.5.29",

  "@neondatabase/serverless": "^1.0.2",
  pg: "^8.20.0",
  "@types/pg": "^8.20.0",
  "@types/ws": "^8.18.1",
  ws: "^8.20.0",

  mysql2: "^3.20.0",

  "@prisma/client": "^7.6.0",
  prisma: "^7.6.0",
  "@prisma/adapter-d1": "^7.6.0",
  "@prisma/adapter-neon": "^7.6.0",
  "@prisma/adapter-mariadb": "^7.6.0",
  "@prisma/adapter-libsql": "^7.6.0",
  "@prisma/adapter-better-sqlite3": "^7.6.0",
  "@prisma/adapter-pg": "^7.6.0",
  "@prisma/adapter-planetscale": "^7.6.0",

  mongoose: "^9.4.1",

  // TypeORM
  typeorm: "^0.3.28",
  "better-sqlite3": "^12.8.0",
  "@types/better-sqlite3": "^7.6.13",

  // Kysely
  kysely: "^0.28.15",

  // MikroORM
  "@mikro-orm/core": "^7.0.8",
  "@mikro-orm/sqlite": "^7.0.8",
  "@mikro-orm/postgresql": "^7.0.8",
  "@mikro-orm/mysql": "^7.0.8",
  "@mikro-orm/better-sqlite": "^6.6.12",

  // Sequelize
  sequelize: "^6.37.8",
  "sequelize-typescript": "^2.1.6",
  sqlite3: "^6.0.1",

  "vite-plugin-pwa": "^1.2.0",
  "@vite-pwa/assets-generator": "^1.0.2",

  "@tauri-apps/cli": "^2.10.1",

  "@biomejs/biome": "^2.4.10",

  oxlint: "^1.58.0",
  oxfmt: "^0.43.0",

  husky: "^9.1.7",
  lefthook: "^2.1.5",
  "lint-staged": "^16.4.0",

  tsx: "^4.21.0",
  "@types/node": "^25.5.2",

  "@types/bun": "^1.3.11",

  "@elysiajs/node": "^1.4.5",

  "@elysiajs/cors": "^1.4.1",
  "@elysiajs/trpc": "^1.1.0",
  elysia: "^1.4.28",

  "@hono/node-server": "^1.19.12",
  "@hono/trpc-server": "^0.4.2",
  hono: "^4.12.11",
  "@octokit/rest": "^22.0.1",
  "@vercel/sandbox": "^1.9.2",
  vercel: "^41.7.4",
  "@sveltejs/adapter-vercel": "^5.7.2",
  "bash-tool": "^1.3.15",

  cors: "^2.8.6",
  express: "^5.2.1",
  "@types/express": "^5.0.6",
  "@types/cors": "^2.8.19",

  fastify: "^5.8.4",
  "@fastify/cors": "^11.2.0",

  "@nestjs/core": "^11.1.18",
  "@nestjs/common": "^11.1.18",
  "@nestjs/platform-express": "^11.1.18",
  "reflect-metadata": "^0.2.2",
  rxjs: "^7.8.2",

  // Encore.ts
  "encore.dev": "^1.56.3",

  // AdonisJS
  "@adonisjs/core": "^7.3.0",
  "@adonisjs/cors": "^3.0.0",
  "@adonisjs/assembler": "^8.4.0",
  "@adonisjs/tsconfig": "^2.0.0",

  // Nitro
  nitropack: "^2.13.3",
  h3: "^2.0.0",

  // feTS
  fets: "^0.8.6",

  turbo: "^2.9.4",

  // Chat SDK (Vercel)
  chat: "^4.23.0",
  "@chat-adapter/slack": "^4.23.0",
  "@chat-adapter/discord": "^4.23.0",
  "@chat-adapter/github": "^4.23.0",
  "@chat-adapter/state-memory": "^4.23.0",
  "@chat-adapter/state-redis": "^4.23.0",

  ai: "^6.0.146",
  "@ai-sdk/anthropic": "^3.0.66",
  "@ai-sdk/google": "^3.0.58",
  "@ai-sdk/vue": "^3.0.146",
  "@ai-sdk/svelte": "^4.0.146",
  "@ai-sdk/react": "^3.0.148",
  "@ai-sdk/devtools": "^0.0.15",
  streamdown: "^2.5.0",
  shiki: "^4.0.2",

  // Mastra AI Framework
  mastra: "^1.3.20",
  "@mastra/core": "^1.22.0",

  // VoltAgent AI Framework
  "@voltagent/core": "^2.6.14",
  "@voltagent/server-hono": "^2.0.8",
  "@voltagent/libsql": "^2.1.2",
  "@voltagent/logger": "^2.0.2",

  // LangGraph.js AI Framework
  "@langchain/langgraph": "^1.2.7",
  "@langchain/core": "^1.1.39",
  "@langchain/google-genai": "^2.1.26",

  // OpenAI Agents SDK
  "@openai/agents": "^0.8.3",

  // Google ADK (Agent Development Kit)
  "@google/adk": "^0.6.1",

  // ModelFusion AI Library
  modelfusion: "^0.137.0",

  // LangChain (standalone)
  langchain: "^1.3.0",

  // LlamaIndex
  llamaindex: "^0.12.1",

  "@orpc/server": "^1.13.13",
  "@orpc/client": "^1.13.13",
  "@orpc/openapi": "^1.13.13",
  "@orpc/zod": "^1.13.13",
  "@orpc/tanstack-query": "^1.13.13",

  // ts-rest
  "@ts-rest/core": "^3.52.1",
  "@ts-rest/react-query": "^3.52.1",
  "@ts-rest/serverless": "^3.52.1",
  "@ts-rest/next": "^3.52.1",

  // Garph (GraphQL)
  garph: "^0.6.8",
  "graphql-yoga": "^5.21.0",
  graphql: "^16.13.2",
  "@garph/gqty": "^0.4.5",
  gqty: "^3.6.0",

  "@trpc/tanstack-react-query": "^11.16.0",
  "@trpc/server": "^11.16.0",
  "@trpc/client": "^11.16.0",

  next: "^16.2.2",

  convex: "^1.34.1",
  "@convex-dev/react-query": "^0.1.0",
  "@convex-dev/agent": "^0.6.1",
  "@convex-dev/polar": "^0.9.0",
  "convex-svelte": "^0.0.12",
  "convex-nuxt": "0.1.5",
  "convex-vue": "^0.1.5",
  "@convex-dev/better-auth": "^0.11.4",

  "@tanstack/svelte-query": "^6.1.13",
  "@tanstack/svelte-query-devtools": "^6.1.13",

  "@tanstack/vue-query-devtools": "^6.1.13",
  "@tanstack/vue-query": "^5.96.2",

  "@tanstack/react-query-devtools": "^5.96.2",
  "@tanstack/react-query": "^5.96.2",
  "@tanstack/react-router-ssr-query": "^1.166.10",
  "@tanstack/router-cli": "^1.166.25",

  "@tanstack/solid-query": "^5.96.2",
  "@tanstack/solid-query-devtools": "^5.96.2",
  "@tanstack/solid-router-devtools": "^1.166.11",

  "@tanstack/angular-query-experimental": "^5.96.2",

  // TanStack Table adapters
  "@tanstack/react-table": "^8.21.3",
  "@tanstack/vue-table": "^8.21.3",
  "@tanstack/svelte-table": "^8.21.3",
  "@tanstack/solid-table": "^8.21.3",
  "@tanstack/angular-table": "^8.21.4",

  // TanStack Virtual adapters
  "@tanstack/react-virtual": "^3.13.23",
  "@tanstack/vue-virtual": "^3.13.23",
  "@tanstack/svelte-virtual": "^3.13.23",
  "@tanstack/solid-virtual": "^3.13.23",
  "@tanstack/angular-virtual": "^4.0.11",

  // TanStack DB adapters (each adapter has its own versioning)
  "@tanstack/db": "^0.6.2",
  "@tanstack/react-db": "^0.1.80",
  "@tanstack/vue-db": "^0.0.113",
  "@tanstack/solid-db": "^0.2.16",
  "@tanstack/svelte-db": "^0.1.79",

  // TanStack Pacer
  "@tanstack/pacer": "^0.20.1",
  "@tanstack/react-pacer": "^0.21.1",
  "@tanstack/solid-pacer": "^0.20.1",

  // TanStack AI
  "@tanstack/ai": "^0.10.0",
  "@tanstack/ai-react": "^0.7.8",
  "@tanstack/ai-solid": "^0.6.12",

  wrangler: "^4.80.0",
  "@cloudflare/vite-plugin": "^1.31.0",
  "@opennextjs/cloudflare": "^1.18.0",
  "nitro-cloudflare-dev": "^0.2.2",
  "@sveltejs/adapter-cloudflare": "^7.2.8",
  "@sveltejs/adapter-node": "^5.5.4",
  "@cloudflare/workers-types": "^4.20260405.1",

  alchemy: "^0.90.1",

  // SST (Serverless Stack)
  sst: "^4.6.11",
  "aws-cdk-lib": "^2.248.0",
  constructs: "^10.6.0",
  "@opennextjs/aws": "^3.9.16",

  dotenv: "^17.4.1",
  tsdown: "^0.21.7",
  zod: "^4.3.6",
  "@t3-oss/env-core": "^0.13.11",
  "@t3-oss/env-nextjs": "^0.13.11",
  "@t3-oss/env-nuxt": "^0.13.11",
  srvx: "^0.11.15",

  "@polar-sh/better-auth": "^1.8.3",
  "@polar-sh/checkout": "^0.2.0",
  "@polar-sh/sdk": "^0.47.0",

  // Email
  resend: "^6.10.0",
  "@react-email/components": "^1.0.11",
  "react-email": "^5.2.10",
  react: "^19.2.4",
  "@types/react": "^19.2.14",
  nodemailer: "^8.0.4",
  "@types/nodemailer": "^8.0.0",
  postmark: "^4.0.7",
  "@sendgrid/mail": "^8.1.6",
  "@aws-sdk/client-ses": "^3.1024.0",
  "@aws-sdk/client-s3": "^3.1024.0",
  "@aws-sdk/s3-request-presigner": "^3.1024.0",
  "mailgun.js": "^12.7.1",
  "form-data": "^4.0.5",
  "@plunk/node": "^3.0.3",

  // Effect ecosystem (updated 2026-01-21)
  effect: "^3.21.0",
  "@effect/schema": "^0.75.5",
  "@effect/platform": "^0.96.0",
  "@effect/platform-node": "^0.106.0",
  "@effect/platform-bun": "^0.89.0",
  "@effect/platform-browser": "^0.76.0",
  "@effect/sql": "^0.51.0",
  "@effect/sql-sqlite-node": "^0.52.0",
  "@effect/sql-sqlite-bun": "^0.52.0",
  "@effect/sql-pg": "^0.52.1",
  "@effect/sql-mysql2": "^0.52.0",
  "@effect/sql-libsql": "^0.41.0",
  "@effect/sql-drizzle": "^0.50.0",
  "@effect/cli": "^0.75.0",
  "@effect/vitest": "^0.29.0",
  "@effect/opentelemetry": "^0.63.0",
  "@effect/rpc": "^0.75.0",
  "@effect/rpc-http": "^0.52.4",
  "@effect/cluster": "^0.58.0",
  "@effect/workflow": "^0.18.0",
  "@effect/ai": "^0.35.0",
  "@effect/ai-openai": "^0.39.0",
  "@effect/ai-anthropic": "^0.25.0",

  // CSS preprocessors
  sass: "^1.99.0",
  less: "^4.6.4",

  // UI libraries
  "@radix-ui/react-dialog": "^1.1.15",
  "@radix-ui/react-dropdown-menu": "^2.1.16",
  "@radix-ui/react-slot": "^1.2.4",
  "@radix-ui/react-label": "^2.1.8",
  "@radix-ui/react-checkbox": "^1.3.3",
  "@radix-ui/react-select": "^2.2.6",
  "@radix-ui/react-toast": "^1.2.15",
  "@radix-ui/react-popover": "^1.1.15",
  "@radix-ui/react-switch": "^1.2.6",
  "@radix-ui/react-tabs": "^1.1.13",

  "@headlessui/react": "^2.2.9",
  "@headlessui/vue": "^1.7.23",

  "@park-ui/panda-preset": "^0.43.1",

  "@chakra-ui/react": "^3.34.0",
  "@emotion/react": "^11.14.0",

  "@heroui/react": "^3.0.2",
  "framer-motion": "^12.38.0",

  // Mantine
  "@mantine/core": "^9.0.1",
  "@mantine/hooks": "^9.0.1",

  // Base UI
  "@base-ui-components/react": "^1.0.0-rc.0",

  // shadcn/ui core and unified packages
  shadcn: "^4.1.2",
  "radix-ui": "^1.4.3",
  "class-variance-authority": "^0.7.1",
  clsx: "^2.1.1",
  "tailwind-merge": "^3.5.0",
  "tw-animate-css": "^1.4.0",
  "lucide-react": "^1.7.0",
  "@tabler/icons-react": "^3.41.1",
  "@hugeicons/react": "^1.1.6",
  "@hugeicons/core-free-icons": "^4.1.1",
  "@phosphor-icons/react": "^2.1.10",
  "@remixicon/react": "^4.9.0",

  // Font packages (fontsource variable fonts)
  "@fontsource-variable/inter": "^5.2.8",
  "@fontsource-variable/figtree": "^5.2.10",
  "@fontsource-variable/noto-sans": "^5.2.10",
  "@fontsource-variable/nunito-sans": "^5.2.7",
  "@fontsource-variable/raleway": "^5.2.8",
  "@fontsource-variable/dm-sans": "^5.2.8",
  "@fontsource-variable/outfit": "^5.2.8",
  "@fontsource-variable/jetbrains-mono": "^5.2.8",
  "@fontsource/roboto": "^5.2.10",
  "@fontsource/public-sans": "^5.2.7",
  geist: "^1.7.0",

  // Ark UI (headless components for React/Vue/Solid/Svelte)
  "@ark-ui/react": "^5.35.0",
  "@ark-ui/vue": "^5.35.0",
  "@ark-ui/solid": "^5.35.0",
  "@ark-ui/svelte": "^5.20.0",

  // React Aria (Adobe's accessible components for React)
  "react-aria-components": "^1.16.0",

  daisyui: "^5.5.19",

  // Qwik
  "@builder.io/qwik": "^1.19.2",
  "@builder.io/qwik-city": "^1.19.2",
  "@builder.io/qwik-react": "^0.5.8",

  // Angular
  "@angular/core": "^21.2.7",
  "@angular/common": "^21.2.7",
  "@angular/compiler": "^21.2.7",
  "@angular/platform-browser": "^21.2.7",
  "@angular/platform-browser-dynamic": "^21.2.7",
  "@angular/router": "^21.2.7",
  "@angular/forms": "^21.2.7",
  "@angular/animations": "^21.2.7",
  "@angular-devkit/build-angular": "^21.2.6",
  "@angular/cli": "^21.2.6",
  "@angular/compiler-cli": "^21.2.7",

  // State management
  zustand: "^5.0.12",
  jotai: "^2.19.0",
  nanostores: "^1.2.0",
  "@nanostores/react": "^1.1.0",
  "@reduxjs/toolkit": "^2.11.2",
  "react-redux": "^9.2.0",
  mobx: "^6.15.0",
  "mobx-react-lite": "^4.1.1",
  xstate: "^5.30.0",
  "@xstate/react": "^6.1.0",
  valtio: "^2.3.1",
  "@tanstack/store": "^0.9.3",
  "@tanstack/react-store": "^0.9.3",
  "@legendapp/state": "^2.1.15",

  // Validation libraries
  valibot: "^1.3.1",
  arktype: "^2.2.0",
  "@sinclair/typebox": "^0.34.49",
  typia: "^12.0.2",
  runtypes: "^7.0.4",

  // Form libraries
  formik: "^2.4.9",
  yup: "^1.7.1",
  "final-form": "^5.0.0",
  "react-final-form": "^7.0.0",
  "@conform-to/react": "^1.18.0",
  "@conform-to/zod": "^1.18.0",
  "@modular-forms/solid": "^0.25.1",
  "@modular-forms/qwik": "^0.29.1",
  "@tanstack/react-form": "^1.28.6",
  "@tanstack/solid-form": "^1.28.6",

  // Real-time/WebSocket
  "socket.io": "^4.8.3",
  "socket.io-client": "^4.8.3",
  partykit: "^0.0.115",
  partysocket: "^1.1.16",
  ably: "^2.21.0",
  pusher: "^5.3.3",
  "pusher-js": "^8.5.0",
  "@liveblocks/client": "^3.17.0",
  "@liveblocks/react": "^3.17.0",
  "@liveblocks/node": "^3.17.0",
  yjs: "^13.6.30",
  "y-websocket": "^3.0.0",
  "y-protocols": "^1.0.7",
  "@y-sweet/sdk": "^0.9.1",
  "@y-sweet/react": "^0.9.1",

  // Job Queues / Background Workers
  bullmq: "^5.73.0",
  ioredis: "^5.10.1",
  "@trigger.dev/sdk": "^4.4.3",
  inngest: "^4.1.2",
  "@temporalio/client": "^1.15.0",
  "@temporalio/worker": "^1.15.0",
  "@temporalio/workflow": "^1.15.0",
  "@temporalio/activity": "^1.15.0",

  // Testing - Jest
  jest: "^30.3.0",
  "@types/jest": "^30.0.0",
  "ts-jest": "^29.4.9",
  "@jest/globals": "^30.3.0",
  "jest-environment-jsdom": "^30.3.0",

  // Testing - Cypress
  cypress: "^15.13.0",

  // Testing - Vitest
  vitest: "^4.1.2",
  "@vitest/ui": "^4.1.2",
  "@vitest/coverage-v8": "^4.1.2",
  jsdom: "^29.0.1",
  "happy-dom": "^20.8.9",

  // Testing - Playwright
  "@playwright/test": "^1.59.1",
  playwright: "^1.59.1",

  // Testing Library
  "@testing-library/dom": "^10.4.1",
  "@testing-library/react": "^16.3.2",
  "@testing-library/vue": "^8.1.0",
  "@testing-library/svelte": "^5.3.1",
  "@testing-library/jest-dom": "^6.9.1",
  "@testing-library/user-event": "^14.6.1",

  // MSW (Mock Service Worker)
  msw: "^2.12.14",

  // Storybook
  storybook: "^8.6.18",
  "@storybook/react": "^8.6.18",
  "@storybook/react-vite": "^8.6.18",
  "@storybook/vue3-vite": "^8.6.18",
  "@storybook/svelte-vite": "^8.6.18",
  "@storybook/nextjs": "^8.6.18",
  "@storybook/addon-essentials": "^8.6.18",
  "@storybook/addon-interactions": "^8.6.18",
  "@storybook/test": "^8.6.18",

  // Animation
  motion: "^12.38.0",
  gsap: "^3.14.2",
  "@react-spring/web": "^10.0.3",
  "@react-spring/native": "^10.0.3",
  "@formkit/auto-animate": "^0.9.0",
  "lottie-react": "^2.4.1",
  "lottie-react-native": "^7.3.6",

  // Payments - Stripe
  stripe: "^22.0.0",
  "@stripe/stripe-js": "^9.0.1",
  "@stripe/react-stripe-js": "^6.1.0",

  // Payments - Lemon Squeezy
  "@lemonsqueezy/lemonsqueezy.js": "^4.0.0",

  // Payments - Paddle
  "@paddle/paddle-node-sdk": "^3.6.1",
  "@paddle/paddle-js": "^1.6.2",

  // Payments - Dodo Payments
  dodopayments: "^2.26.0",
  "dodopayments-checkout": "^1.8.0",

  // File Upload - UploadThing
  uploadthing: "^7.7.4",
  "@uploadthing/react": "^7.3.3",
  "@uploadthing/svelte": "^7.3.3",
  "@uploadthing/vue": "^7.3.3",
  "@uploadthing/solid": "^7.3.3",
  "@uploadthing/nuxt": "^7.1.10",
  "@uploadthing/expo": "^7.2.6",

  // File Upload - FilePond
  filepond: "^4.32.12",
  "react-filepond": "^7.1.3",
  "svelte-filepond": "^0.2.2",
  "vue-filepond": "^7.0.4",
  "filepond-plugin-image-preview": "^4.6.12",
  "filepond-plugin-file-validate-type": "^1.2.9",
  "filepond-plugin-file-validate-size": "^2.2.8",

  // File Upload - Uppy
  "@uppy/core": "^5.2.0",
  "@uppy/dashboard": "^5.1.1",
  "@uppy/drag-drop": "^5.1.0",
  "@uppy/progress-bar": "^4.3.2",
  "@uppy/xhr-upload": "^5.2.0",
  "@uppy/tus": "^5.1.1",
  "@uppy/react": "^5.2.0",
  "@uppy/svelte": "^5.2.0",
  "@uppy/vue": "^3.2.0",
  "@uppy/angular": "^1.1.0",

  // RedwoodJS
  "@redwoodjs/core": "^8.9.0",
  "@redwoodjs/web": "^8.9.0",
  "@redwoodjs/api": "^8.9.0",
  "@redwoodjs/router": "^8.9.0",
  "@redwoodjs/forms": "^8.9.0",
  "@redwoodjs/graphql-server": "^8.9.0",
  "@redwoodjs/vite": "^8.9.0",
  "@redwoodjs/project-config": "^8.9.0",

  // Fresh (Deno-native framework - uses JSR/deno.json, not npm)
  // These are reference versions for Fresh ecosystem
  preact: "^10.29.1",
  "preact-render-to-string": "^6.6.7",

  // Logging
  pino: "^10.3.1",
  "pino-pretty": "^13.1.3",
  "pino-http": "^11.0.0",
  winston: "^3.19.0",

  // OpenTelemetry
  "@opentelemetry/api": "^1.9.1",
  "@opentelemetry/sdk-node": "^0.214.0",
  "@opentelemetry/auto-instrumentations-node": "^0.72.0",
  "@opentelemetry/exporter-trace-otlp-http": "^0.214.0",
  "@opentelemetry/exporter-metrics-otlp-http": "^0.214.0",
  "@opentelemetry/resources": "^2.6.1",
  "@opentelemetry/sdk-metrics": "^2.6.1",
  "@opentelemetry/semantic-conventions": "^1.40.0",

  // Sentry
  "@sentry/node": "^10.47.0",
  "@sentry/profiling-node": "^10.47.0",

  // Grafana (Prometheus metrics)
  "prom-client": "^15.1.3",

  // Headless CMS - Payload
  payload: "^3.81.0",
  "@payloadcms/next": "^3.81.0",
  "@payloadcms/richtext-lexical": "^3.81.0",
  "@payloadcms/db-postgres": "^3.81.0",
  "@payloadcms/db-mongodb": "^3.81.0",
  "@payloadcms/db-sqlite": "^3.81.0",
  "@payloadcms/plugin-seo": "^3.81.0",
  "@payloadcms/storage-s3": "^3.81.0",

  // Headless CMS - Sanity
  sanity: "^5.19.0",
  "next-sanity": "^12.2.1",
  "@sanity/image-url": "^2.1.1",
  "@sanity/vision": "^5.19.0",
  "@sanity/client": "^7.20.0",

  // Headless CMS - Strapi
  "@strapi/client": "^1.6.1",
  qs: "^6.15.0",

  // Headless CMS - TinaCMS
  tinacms: "^3.7.1",
  "@tinacms/cli": "^2.2.1",

  // Caching - Upstash Redis
  "@upstash/redis": "^1.37.0",

  // Search - Meilisearch
  meilisearch: "^0.57.0",

  // Search - Typesense
  typesense: "^3.0.5",

  // Search - Elasticsearch
  "@elastic/elasticsearch": "^9.3.4",

  // Search - Algolia
  algoliasearch: "^5.22.0",

  // EdgeDB
  edgedb: "^2.0.1",
  "@edgedb/generate": "^0.6.1",

  // Feature Flags - GrowthBook
  "@growthbook/growthbook": "^1.6.5",
  "@growthbook/growthbook-react": "^1.6.5",

  // Feature Flags + Analytics - PostHog
  "posthog-js": "^1.364.7",
  "posthog-node": "^5.28.11",

  // Analytics - Plausible
  "plausible-tracker": "^0.3.9",
} as const;

export type AvailableDependencies = keyof typeof dependencyVersionMap;

export type AddDepsOptions = {
  vfs: VirtualFileSystem;
  packagePath: string;
  dependencies?: AvailableDependencies[];
  devDependencies?: AvailableDependencies[];
  customDependencies?: Record<string, string>;
  customDevDependencies?: Record<string, string>;
};

/**
 * Add dependencies to a package.json file in the VFS
 */
export function addPackageDependency(options: AddDepsOptions): void {
  const {
    vfs,
    packagePath,
    dependencies = [],
    devDependencies = [],
    customDependencies = {},
    customDevDependencies = {},
  } = options;

  const pkgJson = vfs.readJson<PackageJson>(packagePath);
  if (!pkgJson) return;

  // Initialize if not present
  pkgJson.dependencies = pkgJson.dependencies || {};
  pkgJson.devDependencies = pkgJson.devDependencies || {};

  // Add regular dependencies
  for (const dep of dependencies) {
    if (!pkgJson.dependencies[dep]) {
      const version = dependencyVersionMap[dep as AvailableDependencies];
      if (!version) {
        throw new Error(
          `Missing version for dependency: ${dep}. Add it to dependencyVersionMap in add-deps.ts`,
        );
      }
      pkgJson.dependencies[dep] = version;
    }
  }

  // Add dev dependencies
  for (const dep of devDependencies) {
    if (!pkgJson.devDependencies[dep]) {
      const version = dependencyVersionMap[dep as AvailableDependencies];
      if (!version) {
        throw new Error(
          `Missing version for devDependency: ${dep}. Add it to dependencyVersionMap in add-deps.ts`,
        );
      }
      pkgJson.devDependencies[dep] = version;
    }
  }

  // Add custom dependencies (with specific versions)
  for (const [dep, version] of Object.entries(customDependencies)) {
    pkgJson.dependencies[dep] = version;
  }

  // Add custom dev dependencies (with specific versions)
  for (const [dep, version] of Object.entries(customDevDependencies)) {
    pkgJson.devDependencies[dep] = version;
  }

  vfs.writeJson(packagePath, pkgJson);
}
