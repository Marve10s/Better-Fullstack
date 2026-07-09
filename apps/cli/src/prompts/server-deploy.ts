import type { Backend, Runtime, ServerDeploy, WebDeploy } from "../types";

import { DEFAULT_CONFIG } from "../constants";
import { exitCancelled } from "../utils/errors";
import { isCancel, navigableSelect } from "./navigable";

type DeploymentOption = {
  value: ServerDeploy;
  label: string;
  hint: string;
};

function getDeploymentDisplay(deployment: ServerDeploy): {
  label: string;
  hint: string;
} {
  if (deployment === "cloudflare") {
    return {
      label: "Cloudflare",
      hint: "Deploy to Cloudflare Workers using Alchemy",
    };
  }
  if (deployment === "vercel") {
    return {
      label: "Vercel",
      hint: "Deploy to Vercel's edge network",
    };
  }
  if (deployment === "netlify") {
    return {
      label: "Netlify",
      hint: "Deploy Hono APIs with Netlify Functions",
    };
  }
  return {
    label: deployment,
    hint: `Add ${deployment} deployment`,
  };
}

export async function getServerDeploymentChoice(
  deployment?: ServerDeploy,
  runtime?: Runtime,
  backend?: Backend,
  _webDeploy?: WebDeploy,
) {
  if (deployment !== undefined) return deployment;

  if (backend === "none" || backend === "convex") {
    return "none";
  }

  if (backend !== "hono") {
    return "none";
  }

  // Auto-select cloudflare for workers runtime since it's the only valid option
  if (runtime === "workers") {
    return "cloudflare";
  }

  const options = getServerDeploymentOptions(runtime);

  const response = await navigableSelect<ServerDeploy>({
    message: "Select server deployment",
    options,
    initialValue: DEFAULT_CONFIG.serverDeploy,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}

export function getServerDeploymentOptions(runtime?: Runtime): DeploymentOption[] {
  return [
    { value: "none", label: "None", hint: "Skip server deployment setup" },
    { value: "railway", label: "Railway", hint: "Deploy with Railway cloud development platform" },
    { value: "fly", label: "Fly.io", hint: "Deploy globally with Fly.io edge platform" },
    { value: "render", label: "Render", hint: "Deploy with Render's Blueprint and Docker builds" },
    ...(runtime === "node"
      ? [
          {
            value: "netlify" as const,
            label: "Netlify",
            hint: "Deploy Hono APIs with Netlify Functions",
          },
        ]
      : []),
    { value: "docker", label: "Docker", hint: "Container-based deployment with Dockerfile" },
    { value: "sst", label: "SST", hint: "Deploy to AWS with SST (Serverless Stack)" },
    { value: "vercel", label: "Vercel", hint: "Deploy to Vercel's edge network with zero config" },
  ];
}

export async function getServerDeploymentToAdd(
  runtime?: Runtime,
  existingDeployment?: ServerDeploy,
  backend?: Backend,
) {
  if (backend !== "hono") {
    return "none";
  }

  const options: DeploymentOption[] = [];

  if (runtime === "workers") {
    if (existingDeployment !== "cloudflare") {
      const { label, hint } = getDeploymentDisplay("cloudflare");
      options.push({
        value: "cloudflare",
        label,
        hint,
      });
    }
  } else if (runtime === "node" && existingDeployment !== "netlify") {
    const { label, hint } = getDeploymentDisplay("netlify");
    options.push({
      value: "netlify",
      label,
      hint,
    });
  }

  if (existingDeployment && existingDeployment !== "none") {
    return "none";
  }

  if (options.length === 0) {
    return "none";
  }

  const response = await navigableSelect<ServerDeploy>({
    message: "Select server deployment",
    options,
    initialValue: DEFAULT_CONFIG.serverDeploy,
  });

  if (isCancel(response)) return exitCancelled("Operation cancelled");

  return response;
}
