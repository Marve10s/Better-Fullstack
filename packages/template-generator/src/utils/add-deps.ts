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
  typescript: "^6.0.3",

  // Keep Better Auth pinned until the Kysely adapter supports Kysely 0.29+
  // and the 1.6.13 adapter packages are no longer quarantined by Yarn.
  "better-auth": "^1.6.22",
  "@better-auth/expo": "^1.6.22",
  // Runtime imports of @better-auth/expo's client — must exist in the
  // native app even when the corresponding mobile options are "none".
  "expo-linking": "^56.0.14",
  "expo-constants": "^56.0.18",
  "expo-web-browser": "^56.0.5",
  "expo-network": "^56.0.5",
  "@better-auth/drizzle-adapter": "^1.6.22",
  "@better-auth/prisma-adapter": "^1.6.22",
  "@better-auth/mongo-adapter": "^1.6.22",

  "@clerk/nextjs": "^7.5.17",
  "@clerk/clerk-react": "^5.61.3",
  "@clerk/tanstack-react-start": "^1.4.17",
  "@clerk/clerk-expo": "^2.19.31",

  // Auth.js (NextAuth v5)
  "next-auth": "^4.24.14",
  "@auth/core": "^0.34.3",
  "@auth/drizzle-adapter": "^1.11.2",
  "@auth/prisma-adapter": "^2.11.2",

  // Stack Auth
  "@stackframe/stack": "^2.8.108",

  // Supabase Auth
  "@supabase/supabase-js": "^2.110.3",
  "@supabase/ssr": "^0.12.1",

  // Auth0 v4 handles auth routes through middleware and the Auth0Client.
  "@auth0/nextjs-auth0": "^4.23.0",
  "@workos-inc/authkit-nextjs": "^4.2.0",
  "@kinde-oss/kinde-auth-nextjs": "^2.13.0",

  "drizzle-orm": "^0.45.2",
  "drizzle-kit": "^0.31.10",
  "@planetscale/database": "^1.20.1",

  "@libsql/client": "^0.17.4",
  libsql: "^0.5.29",

  "@neondatabase/serverless": "^1.1.0",
  pg: "^8.22.0",
  "@types/pg": "^8.20.0",
  "@types/ws": "^8.18.1",
  ws: "^8.21.0",

  mysql2: "^3.22.6",

  "@prisma/client": "^7.8.0",
  prisma: "^7.8.0",
  "@prisma/adapter-d1": "^7.8.0",
  "@prisma/adapter-neon": "^7.8.0",
  "@prisma/adapter-mariadb": "^7.8.0",
  "@prisma/adapter-libsql": "^7.8.0",
  "@prisma/adapter-better-sqlite3": "^7.8.0",
  "@prisma/adapter-pg": "^7.8.0",
  "@prisma/adapter-planetscale": "^7.8.0",

  mongoose: "^9.7.4",

  // TypeORM
  typeorm: "^1.1.0",
  "better-sqlite3": "^12.11.1",
  "@types/better-sqlite3": "^7.6.13",

  // Kysely
  kysely: "^0.29.3",

  // MikroORM
  "@mikro-orm/core": "^7.1.6",
  "@mikro-orm/sqlite": "^7.1.6",
  "@mikro-orm/postgresql": "^7.1.6",
  "@mikro-orm/mysql": "^7.1.6",
  "@mikro-orm/better-sqlite": "^6.6.14",

  // Sequelize
  sequelize: "^6.37.8",
  "sequelize-typescript": "^2.1.6",
  sqlite3: "^6.0.1",

  "vite-plugin-pwa": "^1.3.0",
  "@vite-pwa/assets-generator": "^1.0.2",

  "@tauri-apps/cli": "^2.11.4",
  "@tauri-apps/api": "^2.11.1",

  "@biomejs/biome": "^2.5.3",
  ultracite: "^7.9.3",

  oxlint: "^1.73.0",
  oxfmt: "^0.56.0",

  husky: "^9.1.7",
  lefthook: "^2.1.10",
  "lint-staged": "^17.0.8",

  tsx: "^4.23.1",
  "@types/node": "^26.1.1",

  "@types/bun": "^1.3.14",

  "@elysiajs/node": "^1.4.5",

  "@elysiajs/cors": "^1.4.2",
  "@elysiajs/openapi": "^1.4.15",
  "@elysiajs/trpc": "^1.1.0",
  elysia: "^1.4.29",

  "@hono/node-server": "^2.0.8",
  "@hono/trpc-server": "^0.4.2",
  "@hono/zod-openapi": "^1.4.0",
  hono: "^4.12.27",
  "@netlify/functions": "^5.3.0",
  "@octokit/rest": "^22.0.1",
  "@vercel/sandbox": "^2.6.0",
  vercel: "^54.18.2",
  "@sveltejs/adapter-vercel": "^6.3.4",
  "bash-tool": "^1.3.17",

  cors: "^2.8.6",
  express: "^5.2.1",
  "@types/express": "^5.0.6",
  "@types/cors": "^2.8.19",

  fastify: "^5.10.0",
  "@fastify/cors": "^11.3.0",
  "@fastify/swagger": "^9.8.0",
  "fastify-type-provider-zod": "^7.0.0",

  "@nestjs/core": "^11.1.28",
  "@nestjs/common": "^11.1.28",
  "@nestjs/platform-express": "^11.1.28",
  "reflect-metadata": "^0.2.2",
  rxjs: "^7.8.2",

  // Encore.ts
  "encore.dev": "^1.57.9",

  // AdonisJS
  "@adonisjs/core": "^7.3.5",
  "@adonisjs/cors": "^3.0.0",
  "@adonisjs/assembler": "^8.4.0",
  "@adonisjs/tsconfig": "^2.0.0",

  // Nitro
  nitropack: "^2.13.4",
  h3: "^2.0.0",

  // feTS
  fets: "^0.8.7",

  turbo: "^2.10.0",
  nx: "^23.1.0",

  // Chat SDK (Vercel)
  chat: "^4.34.0",
  "@chat-adapter/slack": "^4.34.0",
  "@chat-adapter/discord": "^4.34.0",
  "@chat-adapter/github": "^4.34.0",
  "@chat-adapter/state-memory": "^4.34.0",
  "@chat-adapter/state-redis": "^4.34.0",

  ai: "^7.0.23",
  "@ai-sdk/anthropic": "^4.0.12",
  "@ai-sdk/google": "^4.0.12",
  "@ai-sdk/vue": "^4.0.23",
  "@ai-sdk/svelte": "^5.0.23",
  "@ai-sdk/react": "^4.0.24",
  "@ai-sdk/devtools": "^1.0.4",
  streamdown: "^2.5.0",
  shiki: "^4.3.1",

  // Mastra AI Framework
  mastra: "^1.18.2",
  "@mastra/core": "^1.50.1",

  // VoltAgent AI Framework
  "@voltagent/core": "^2.9.0",
  "@voltagent/server-hono": "^2.0.14",
  "@voltagent/libsql": "^2.1.2",
  "@voltagent/logger": "^2.0.2",

  // LangGraph.js AI Framework
  "@langchain/langgraph": "^1.4.7",
  "@langchain/core": "^1.2.2",
  "@langchain/google-genai": "^2.2.0",

  // OpenAI Agents SDK
  "@openai/agents": "^0.12.0",
  openai: "^6.46.0",
  "@anthropic-ai/sdk": "^0.110.0",

  // Google ADK (Agent Development Kit)
  "@google/adk": "^1.3.0",

  // ModelFusion AI Library
  modelfusion: "^0.137.0",

  // LangChain (standalone)
  langchain: "^1.5.3",

  // LlamaIndex
  llamaindex: "^0.12.1",

  // AI CLI
  "ai-cli": "^0.3.1",

  "@orpc/server": "^1.14.8",
  "@orpc/client": "^1.14.8",
  "@orpc/openapi": "^1.14.8",
  "@orpc/zod": "^1.14.8",
  "@orpc/tanstack-query": "^1.14.8",

  // ts-rest
  "@ts-rest/core": "^3.52.1",
  "@ts-rest/react-query": "^3.52.1",
  "@ts-rest/serverless": "^3.52.1",
  "@ts-rest/next": "^3.52.1",

  // Garph (GraphQL)
  garph: "^0.6.8",
  "graphql-yoga": "^5.21.2",
  // graphql 16.x: garph (^16.6.0), graphql-yoga (^15||^16), and
  // @apollo/server@5 (^16.11.0) all cap at v16 — v17 violates their peers
  // and forces a 2nd graphql copy into packages/api (breaks garph's
  // cross-package GraphQLSchema typing). Keep on 16.x until they support 17.
  graphql: "^16.11.0",
  "@garph/gqty": "^0.4.5",
  gqty: "^3.6.0",

  // GraphQL Yoga + Pothos
  "@pothos/core": "^4.13.1",

  // Apollo Server
  "@apollo/server": "^5.5.1",

  // OpenAPI
  "@asteasolutions/zod-to-openapi": "^8.5.0",
  "@scalar/express-api-reference": "^0.10.9",
  "@scalar/fastify-api-reference": "^1.62.5",
  "@scalar/hono-api-reference": "^0.11.9",

  "@trpc/tanstack-react-query": "^11.18.0",
  "@trpc/server": "^11.18.0",
  "@trpc/client": "^11.18.0",

  next: "^16.2.10",

  convex: "^1.42.1",
  "@convex-dev/react-query": "^0.1.0",
  "@convex-dev/agent": "^0.6.4",
  "@convex-dev/polar": "^0.9.2",
  "convex-svelte": "^0.14.0",
  "convex-nuxt": "0.1.5",
  "convex-vue": "^0.1.5",
  "@convex-dev/better-auth": "^0.12.5",

  "@tanstack/svelte-query": "^6.1.36",
  "@tanstack/svelte-query-devtools": "^6.1.36",

  "@tanstack/vue-query-devtools": "^6.1.36",
  "@tanstack/vue-query": "^5.101.2",

  "@tanstack/react-query-devtools": "^5.101.2",
  "@tanstack/react-query": "^5.101.2",
  "@tanstack/react-router-ssr-query": "^1.167.1",
  "@tanstack/router-cli": "^1.167.18",

  "@tanstack/solid-query": "^5.101.2",
  "@tanstack/solid-query-devtools": "^5.101.2",
  "@tanstack/solid-router-devtools": "^1.167.0",

  "@tanstack/angular-query-experimental": "^5.101.2",

  // TanStack Table adapters
  "@tanstack/react-table": "^8.21.3",
  "@tanstack/vue-table": "^8.21.3",
  "@tanstack/svelte-table": "^8.21.3",
  "@tanstack/solid-table": "^8.21.3",
  "@tanstack/angular-table": "^8.21.4",

  // TanStack Virtual adapters
  "@tanstack/react-virtual": "^3.14.6",
  "@tanstack/vue-virtual": "^3.13.32",
  "@tanstack/svelte-virtual": "^3.13.32",
  "@tanstack/solid-virtual": "^3.13.33",
  "@tanstack/angular-virtual": "^5.0.8",

  // TanStack DB adapters (each adapter has its own versioning)
  "@tanstack/db": "^0.6.14",
  "@tanstack/react-db": "^0.1.92",
  "@tanstack/vue-db": "^0.0.123",
  "@tanstack/solid-db": "^0.2.28",
  "@tanstack/svelte-db": "^0.1.91",

  // TanStack Pacer
  "@tanstack/pacer": "^0.21.1",
  "@tanstack/react-pacer": "^0.22.1",
  "@tanstack/solid-pacer": "^0.21.1",

  // TanStack AI
  "@tanstack/ai": "^0.38.0",
  "@tanstack/ai-react": "^0.16.4",
  "@tanstack/ai-solid": "^0.14.3",

  wrangler: "^4.110.0",
  "@cloudflare/vite-plugin": "^1.44.0",
  "@opennextjs/cloudflare": "^1.20.1",
  "nitro-cloudflare-dev": "^0.2.2",
  "@sveltejs/adapter-cloudflare": "^7.2.9",
  "@sveltejs/adapter-node": "^5.5.7",
  "@cloudflare/workers-types": "^4.20260629.1",

  alchemy: "^0.93.12",

  // SST (Serverless Stack)
  sst: "^4.17.1",
  "aws-cdk-lib": "^2.261.0",
  constructs: "^10.6.0",
  "@opennextjs/aws": "^4.0.3",

  dotenv: "^17.4.2",
  tsdown: "^0.22.3",
  zod: "^4.4.3",
  "@t3-oss/env-core": "^0.13.11",
  "@t3-oss/env-nextjs": "^0.13.11",
  "@t3-oss/env-nuxt": "^0.13.11",
  srvx: "^0.11.22",

  "@polar-sh/better-auth": "^1.8.4",
  "@polar-sh/checkout": "^0.3.0",
  "@polar-sh/sdk": "^0.48.1",

  // Email
  resend: "^6.17.2",
  "@react-email/components": "^1.0.12",
  "react-email": "^6.8.1",
  react: "^19.2.7",
  "react-dom": "^19.2.7",
  "@types/react": "^19.2.17",
  "@wxt-dev/module-react": "^1.2.2",
  wxt: "^0.20.27",
  "@opentui/core": "^0.4.3",
  nodemailer: "^9.0.3",
  "@types/react-dom": "^19.2.3",
  "@types/nodemailer": "^8.0.1",
  postmark: "^4.0.7",
  "@sendgrid/mail": "^8.1.6",
  "@aws-sdk/client-ses": "^3.1086.0",
  "@aws-sdk/client-s3": "^3.1086.0",
  "@aws-sdk/s3-request-presigner": "^3.1086.0",
  "mailgun.js": "^13.3.0",
  "form-data": "^4.0.6",
  "@plunk/node": "^3.0.3",

  // Effect ecosystem (updated 2026-01-21)
  effect: "^3.22.0",
  "@effect/platform": "^0.96.2",
  "@effect/platform-node": "^0.107.0",
  "@effect/platform-bun": "^0.90.0",
  "@effect/platform-browser": "^0.76.0",
  "@effect/sql": "^0.51.1",
  "@effect/sql-sqlite-node": "^0.52.0",
  "@effect/sql-sqlite-bun": "^0.52.0",
  "@effect/sql-pg": "^0.52.1",
  "@effect/sql-mysql2": "^0.52.0",
  "@effect/sql-libsql": "^0.41.0",
  "@effect/sql-drizzle": "^0.50.0",
  "@effect/cli": "^0.75.2",
  "@effect/vitest": "^0.29.0",
  "@effect/opentelemetry": "^0.63.0",
  "@effect/rpc": "^0.75.1",
  "@effect/rpc-http": "^0.52.4",
  "@effect/cluster": "^0.59.0",
  "@effect/workflow": "^0.18.2",
  "@effect/ai": "^0.36.0",
  "@effect/ai-openai": "^0.40.1",
  "@effect/ai-anthropic": "^0.26.0",

  // CSS preprocessors
  sass: "^1.101.0",
  less: "^4.6.7",
  "styled-components": "^6.4.3",

  // TypeScript ecosystem expansion addons
  eslint: "^10.6.0",
  "@eslint/js": "^10.0.1",
  "typescript-eslint": "^8.63.0",
  globals: "^17.7.0",
  prettier: "^3.9.5",
  axios: "^1.18.1",
  firebase: "^12.16.0",
  "@graphql-codegen/cli": "^7.2.0",
  "@graphql-codegen/client-preset": "^6.1.0",
  "openapi-typescript": "^7.13.0",
  "@apollo/client": "^4.2.6",
  electron: "^43.1.0",
  "electron-builder": "^26.15.3",
  concurrently: "^9.2.1",
  "cross-env": "^7.0.3",
  "wait-on": "^9.0.4",
  "@capacitor/core": "^8.4.1",
  "@capacitor/cli": "^8.4.1",
  "@capacitor/ios": "^8.4.1",
  "@capacitor/android": "^8.4.1",
  passport: "^0.7.0",
  "passport-github2": "^0.1.12",
  "express-session": "^1.19.0",
  "@types/passport": "^1.0.17",
  "@types/passport-github2": "^1.2.9",
  "@types/express-session": "^1.19.0",
  mocha: "^11.7.6",
  "@types/mocha": "^10.0.10",
  contentful: "^11.12.7",
  "@paypal/paypal-js": "^10.0.3",
  "@paypal/react-paypal-js": "^10.1.2",
  "@paypal/paypal-server-sdk": "^2.4.0",

  // UI libraries
  "@radix-ui/react-dialog": "^1.1.19",
  "@radix-ui/react-dropdown-menu": "^2.1.20",
  "@radix-ui/react-slot": "^1.3.0",
  "@radix-ui/react-label": "^2.1.11",
  "@radix-ui/react-checkbox": "^1.3.7",
  "@radix-ui/react-select": "^2.3.3",
  "@radix-ui/react-toast": "^1.2.19",
  "@radix-ui/react-popover": "^1.1.19",
  "@radix-ui/react-switch": "^1.3.3",
  "@radix-ui/react-tabs": "^1.1.17",

  "@headlessui/react": "^2.2.10",
  "@headlessui/vue": "^1.7.23",

  "@park-ui/panda-preset": "^0.43.1",

  "@chakra-ui/react": "^3.36.0",
  "@emotion/react": "^11.14.0",
  "@emotion/styled": "^11.14.1",

  "@heroui/react": "^3.2.2",
  "framer-motion": "^12.42.2",

  // Mantine
  "@mantine/core": "^9.4.1",
  "@mantine/hooks": "^9.4.1",

  // MUI / Ant Design
  "@mui/material": "^9.2.0",
  antd: "^6.5.1",

  // Base UI
  "@base-ui-components/react": "^1.0.0-rc.0",

  // shadcn/ui core and unified packages
  shadcn: "^4.13.0",
  "radix-ui": "^1.6.2",
  "class-variance-authority": "^0.7.1",
  clsx: "^2.1.1",
  "tailwind-merge": "^3.6.0",
  "tw-animate-css": "^1.4.0",
  // Keep on 1.21 until Yarn hardened mode stops quarantining 1.22.
  "lucide-react": "^1.21.0",
  "lucide-solid": "^1.21.0",
  "@tabler/icons-react": "^3.44.0",
  "@hugeicons/react": "^1.1.9",
  "@hugeicons/core-free-icons": "^4.2.2",
  "@phosphor-icons/react": "^2.1.10",
  "@remixicon/react": "^4.9.0",
  "@heroicons/react": "^2.2.0",
  "react-icons": "^5.7.0",

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
  geist: "^1.7.2",

  // Ark UI (headless components for React/Vue/Solid/Svelte)
  "@ark-ui/react": "^5.37.2",
  "@ark-ui/vue": "^5.37.2",
  "@ark-ui/solid": "^5.37.1",
  "@ark-ui/svelte": "^5.22.1",

  // React Aria (Adobe's accessible components for React)
  "react-aria-components": "^1.19.0",

  daisyui: "^5.6.18",
  "shadcn-svelte": "^1.4.1",
  "bits-ui": "^2.18.1",
  "lucide-svelte": "^1.0.1",

  // Qwik
  "@builder.io/qwik": "^1.20.0",
  "@builder.io/qwik-city": "^1.20.0",
  "@builder.io/qwik-react": "^0.5.8",

  // Angular
  "@angular/core": "^22.0.6",
  "@angular/common": "^22.0.6",
  "@angular/compiler": "^22.0.6",
  "@angular/platform-browser": "^22.0.6",
  "@angular/platform-browser-dynamic": "^22.0.6",
  "@angular/router": "^22.0.6",
  "@angular/forms": "^22.0.6",
  "@angular/animations": "^22.0.6",
  "@angular-devkit/build-angular": "^22.0.6",
  "@angular/cli": "^22.0.6",
  "@angular/compiler-cli": "^22.0.6",

  // State management
  zustand: "^5.0.14",
  jotai: "^2.20.1",
  nanostores: "^1.4.0",
  "@nanostores/react": "^1.1.0",
  "@reduxjs/toolkit": "^2.12.0",
  "react-redux": "^9.3.0",
  mobx: "^6.16.1",
  "mobx-react-lite": "^4.1.1",
  xstate: "^5.32.4",
  "@xstate/react": "^6.1.0",
  valtio: "^2.3.2",
  "@tanstack/store": "^0.11.0",
  "@tanstack/react-store": "^0.11.0",
  "@legendapp/state": "^2.1.15",

  // Validation libraries
  valibot: "^1.4.2",
  arktype: "^2.2.3",
  "@sinclair/typebox": "^0.34.52",
  typia: "^12.1.1",
  runtypes: "^7.0.4",

  // Form libraries
  formik: "^2.4.9",
  yup: "^1.7.1",
  "final-form": "^5.0.1",
  "react-final-form": "^7.0.1",
  "@conform-to/react": "^1.19.4",
  "@conform-to/zod": "^1.19.4",
  "@modular-forms/solid": "^0.25.1",
  "@modular-forms/qwik": "^0.29.1",
  "@tanstack/react-form": "^1.33.0",
  "@tanstack/solid-form": "^1.33.0",
  "@tanstack/svelte-form": "^1.33.0",
  postcss: "^8.5.15",

  // Real-time/WebSocket
  "socket.io": "^4.8.3",
  "socket.io-client": "^4.8.3",
  partykit: "^0.0.115",
  partysocket: "^1.3.0",
  ably: "^2.24.0",
  pusher: "^5.3.4",
  "pusher-js": "^8.5.0",
  "@liveblocks/client": "^3.22.0",
  "@liveblocks/react": "^3.22.0",
  "@liveblocks/node": "^3.22.0",
  yjs: "^13.6.31",
  "y-websocket": "^3.0.0",
  "y-protocols": "^1.0.7",
  "@y-sweet/sdk": "^0.9.1",
  "@y-sweet/react": "^0.9.1",

  // Job Queues / Background Workers
  bullmq: "^5.80.2",
  ioredis: "^5.11.1",
  "@trigger.dev/sdk": "^4.5.3",
  inngest: "^4.12.1",
  "@temporalio/client": "^1.20.2",
  "@temporalio/worker": "^1.20.2",
  "@temporalio/workflow": "^1.20.2",
  "@temporalio/activity": "^1.20.2",

  // Testing - Jest
  jest: "^30.4.2",
  "@types/jest": "^30.0.0",
  "ts-jest": "^29.4.11",
  "@jest/globals": "^30.4.1",
  "jest-environment-jsdom": "^30.4.1",

  // Testing - Cypress
  cypress: "^15.18.1",

  // Testing - Vitest
  // Keep the Vitest family on the latest Yarn-allowed patch. 4.1.9 is
  // quarantined for @vitest/coverage-v8 in Yarn's package metadata.
  vitest: "4.1.8",
  "@vitest/ui": "4.1.8",
  "@vitest/coverage-v8": "4.1.8",
  jsdom: "^29.1.1",
  "happy-dom": "^20.10.6",

  // Testing - Playwright
  "@playwright/test": "^1.61.1",
  playwright: "^1.61.1",

  // Testing Library
  "@testing-library/dom": "^10.4.1",
  "@testing-library/react": "^16.3.2",
  "@testing-library/vue": "^8.1.0",
  "@testing-library/svelte": "^5.4.2",
  "@testing-library/jest-dom": "^6.9.1",
  "@testing-library/user-event": "^14.6.1",

  // MSW (Mock Service Worker)
  msw: "^2.15.0",

  // Storybook
  storybook: "^8.6.18",
  "@storybook/react": "^8.6.18",
  "@storybook/react-vite": "^8.6.18",
  "@storybook/vue3": "^10.5.0",
  "@storybook/vue3-vite": "^8.6.18",
  "@storybook/svelte": "^10.5.0",
  "@storybook/svelte-vite": "^8.6.18",
  "@storybook/nextjs": "^8.6.18",
  "@storybook/addon-essentials": "^8.6.18",
  "@storybook/addon-interactions": "^8.6.18",
  "@storybook/test": "^8.6.18",

  // Animation
  motion: "^12.42.2",
  gsap: "^3.15.0",
  "@react-spring/web": "^10.1.2",
  "@react-spring/native": "^10.1.2",
  "@formkit/auto-animate": "^0.9.0",
  "lottie-react": "^2.4.1",
  "lottie-react-native": "^7.3.8",

  // Payments - Stripe
  stripe: "^22.3.1",
  "@stripe/stripe-js": "^9.9.0",
  "@stripe/react-stripe-js": "^6.7.0",

  // Payments - Lemon Squeezy
  "@lemonsqueezy/lemonsqueezy.js": "^4.0.0",

  // Payments - Paddle
  "@paddle/paddle-node-sdk": "^3.8.0",
  "@paddle/paddle-js": "^1.6.4",

  // Payments - Dodo Payments
  dodopayments: "^2.42.2",
  "dodopayments-checkout": "^1.9.5",

  // Payments - RevenueCat
  "react-native-purchases": "^9.10.5",
  "convex-revenuecat": "^0.3.2",

  // Payments - Creem
  creem: "^1.5.3",
  "@creem_io/better-auth": "^1.1.3",

  // Payments - Autumn
  "autumn-js": "^1.2.40",

  // Payments - Commet
  "@commet/node": "^7.6.0",

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
  "vue-filepond": "^8.0.0",
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
  preact: "^10.29.7",
  "preact-render-to-string": "^6.7.0",

  // Logging
  pino: "^10.3.1",
  "pino-pretty": "^13.1.3",
  "pino-http": "^11.0.0",
  winston: "^3.19.0",
  evlog: "^2.20.0",

  // OpenTelemetry
  "@opentelemetry/api": "^1.9.1",
  "@opentelemetry/sdk-node": "0.220.0",
  "@opentelemetry/auto-instrumentations-node": "0.78.0",
  "@opentelemetry/exporter-trace-otlp-http": "0.220.0",
  "@opentelemetry/exporter-metrics-otlp-http": "0.220.0",
  "@opentelemetry/resources": "2.9.0",
  "@opentelemetry/sdk-metrics": "2.9.0",
  "@opentelemetry/semantic-conventions": "^1.43.0",

  // Sentry
  "@sentry/node": "^10.65.0",
  "@sentry/profiling-node": "^10.65.0",

  // Grafana (Prometheus metrics)
  "prom-client": "^15.1.3",

  // Enterprise observability
  "dd-trace": "^5.110.0",
  "@axiomhq/js": "^1.8.0",
  "@logtail/node": "^0.5.8",

  // Headless CMS - Payload
  payload: "^3.86.0",
  "@payloadcms/next": "^3.86.0",
  "@payloadcms/richtext-lexical": "^3.86.0",
  "@payloadcms/db-postgres": "^3.86.0",
  "@payloadcms/db-mongodb": "^3.86.0",
  "@payloadcms/db-sqlite": "^3.86.0",
  "@payloadcms/plugin-seo": "^3.86.0",
  "@payloadcms/storage-s3": "^3.86.0",

  // Headless CMS - Sanity
  sanity: "^6.4.0",
  "next-sanity": "^13.1.1",
  "@sanity/image-url": "^2.1.1",
  "@sanity/vision": "^6.4.0",
  "@sanity/client": "^7.23.1",

  // Headless CMS - Strapi
  "@strapi/client": "^1.6.2",
  qs: "^6.15.3",
  "@types/qs": "^6.15.1",

  // Headless CMS - Directus
  "@directus/sdk": "^22.0.0",

  // Headless CMS - TinaCMS
  tinacms: "^3.10.1",
  "@tinacms/cli": "^2.5.5",

  // Headless CMS - Keystatic
  "@keystatic/core": "^0.5.51",
  "@keystatic/next": "^5.0.4",
  "@markdoc/markdoc": "^0.5.7",
  "@astrojs/react": "^6.0.1",
  "@astrojs/markdoc": "^2.0.3",
  "@astrojs/node": "^11.0.2",

  // File Storage - Cloudinary
  cloudinary: "^2.10.0",

  // React data fetching
  swr: "^2.4.2",

  // Caching - Upstash Redis
  "@upstash/redis": "^1.38.0",

  // Rate limiting
  "@arcjet/next": "^1.8.0",
  "@arcjet/node": "^1.8.0",
  "@upstash/ratelimit": "^2.0.8",

  // i18n - i18next
  i18next: "^26.3.6",
  "react-i18next": "^17.0.9",
  "i18next-browser-languagedetector": "^8.2.1",
  "i18next-http-backend": "^4.0.0",

  // i18n - Paraglide
  "@inlang/paraglide-js": "^2.21.0",

  // i18n - next-intl
  "next-intl": "^4.13.2",

  // i18n - Intlayer
  intlayer: "^8.12.4",
  "react-intlayer": "^8.12.4",
  "next-intlayer": "^8.12.4",
  "vite-intlayer": "^8.12.4",

  // Search - Meilisearch
  meilisearch: "^0.58.0",

  // Search - Typesense
  typesense: "^3.0.6",

  // Search - Elasticsearch
  "@elastic/elasticsearch": "^9.4.2",

  // Search - OpenSearch
  "@opensearch-project/opensearch": "^3.6.0",

  // Search - Algolia
  algoliasearch: "^5.55.2",

  // Vector DB - pgvector (Postgres driver)
  postgres: "^3.4.9",

  // Vector DB - Qdrant
  "@qdrant/js-client-rest": "^1.18.0",

  // Vector DB - Chroma
  chromadb: "^3.5.0",

  // Vector DB - Pinecone
  "@pinecone-database/pinecone": "^8.0.0",

  // EdgeDB
  edgedb: "^2.0.1",
  "@edgedb/generate": "^0.6.1",

  // Feature Flags - GrowthBook
  "@growthbook/growthbook": "^1.6.5",
  "@growthbook/growthbook-react": "^1.6.5",

  // Feature Flags + Analytics - PostHog
  "posthog-js": "^1.399.4",
  "posthog-node": "^5.41.0",

  // Feature Flags - LaunchDarkly
  "@launchdarkly/js-client-sdk": "^4.9.1",
  "@launchdarkly/node-server-sdk": "^9.12.1",

  // Feature Flags - Flagsmith
  "@flagsmith/flagsmith": "^12.1.0",
  "flagsmith-nodejs": "^8.1.2",

  // Feature Flags - Unleash
  "@unleash/proxy-client-react": "^6.0.0",
  "unleash-proxy-client": "^3.8.0",
  "unleash-client": "^6.11.1",

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
