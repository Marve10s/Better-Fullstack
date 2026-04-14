import { createYoga } from "graphql-yoga";
import { schema } from "./graphql/schema";
import type { PothosContext } from "./graphql/builder";

export { schema };
export type { PothosContext };

export function createGraphQLHandler(contextFactory: (request: Request) => PothosContext | Promise<PothosContext>) {
  return createYoga<Record<string, unknown>, PothosContext>({
    schema,
    context: ({ request }) => contextFactory(request),
  });
}
