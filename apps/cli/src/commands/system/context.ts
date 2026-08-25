import { log } from "@clack/prompts";
import path from "node:path";
import pc from "picocolors";

import { getProjectContext, type ProjectContextDocument } from "@/project/project-context";

export type ContextCommandInput = { dir?: string; json?: boolean };

export async function contextCommand(input: ContextCommandInput): Promise<ProjectContextDocument> {
  const document = await getProjectContext(path.resolve(input.dir || process.cwd()));
  if (input.json) {
    console.log(JSON.stringify(document, null, 2));
    return document;
  }
  log.info(
    pc.cyan(`${document.roles.length} owning roles, ${document.capabilities.length} capabilities`),
  );
  for (const role of document.roles) log.message(`  ${role.spec}`);
  if (!document.compatibility.valid) {
    for (const issue of document.compatibility.issues) log.warn(pc.yellow(issue.message));
  }
  log.info(`Recipes: ${document.recipes.length}`);
  log.info(`Update support: ${document.updateSupport.eligibility}`);
  return document;
}
