import type { APIEvent } from "@solidjs/start/server";

import { handleWelcomeEmailJob } from "../../../jobs/qstash";

export function POST({ request }: APIEvent) {
  return handleWelcomeEmailJob(request);
}
