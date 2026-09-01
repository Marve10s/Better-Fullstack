import redwood from "@redwoodjs/vite";
import dns from "node:dns";
import { defineConfig, type UserConfig } from "vite";

dns.setDefaultResultOrder("verbatim");

const viteConfig: UserConfig = {
  plugins: [redwood()],
};

export default defineConfig(viteConfig);
