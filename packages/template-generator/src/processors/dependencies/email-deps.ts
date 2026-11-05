import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import { addPackageDependency } from "@/dependencies/add-deps";
import { getServerDependencyTarget } from "@/platform/server-dependency-target";

export function processEmailDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const { email, frontend } = config;
  if (!email || email === "none") return;

  const targetPath = getServerDependencyTarget(vfs, config);
  if (!targetPath) return;

  // Add Resend SDK and React types for resend option
  if (email === "resend") {
    addPackageDependency({
      vfs,
      packagePath: targetPath,
      dependencies: ["resend"],
      devDependencies: ["@types/react"],
    });
  }

  // Add Nodemailer for nodemailer option
  if (email === "nodemailer") {
    addPackageDependency({
      vfs,
      packagePath: targetPath,
      dependencies: ["nodemailer"],
      devDependencies: ["@types/nodemailer"],
    });
  }

  // Add Postmark for postmark option
  if (email === "postmark") {
    addPackageDependency({
      vfs,
      packagePath: targetPath,
      dependencies: ["postmark"],
    });
  }

  // Add SendGrid for sendgrid option
  if (email === "sendgrid") {
    addPackageDependency({
      vfs,
      packagePath: targetPath,
      dependencies: ["@sendgrid/mail"],
    });
  }

  // Add AWS SES for aws-ses option
  if (email === "aws-ses") {
    addPackageDependency({
      vfs,
      packagePath: targetPath,
      dependencies: ["@aws-sdk/client-ses"],
    });
  }

  // Add Mailgun for mailgun option
  if (email === "mailgun") {
    addPackageDependency({
      vfs,
      packagePath: targetPath,
      dependencies: ["mailgun.js", "form-data"],
    });
  }

  // Add Plunk for plunk option
  if (email === "plunk") {
    addPackageDependency({
      vfs,
      packagePath: targetPath,
      dependencies: ["@plunk/node"],
    });
  }

  // Add React Email components for resend and react-email options (not nodemailer)
  const hasReactWeb = frontend.some((f) =>
    ["tanstack-router", "react-router", "react-vite", "tanstack-start", "next", "vinext", "redwood"].includes(f),
  );

  if (hasReactWeb && vfs.exists(targetPath) && (email === "resend" || email === "react-email")) {
    addPackageDependency({
      vfs,
      packagePath: targetPath,
      dependencies: ["@react-email/components", "react-email", "react"],
      devDependencies: ["@types/react"],
    });
  }
}
