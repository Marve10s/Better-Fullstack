import { createFileRoute } from "@tanstack/solid-router";

import { handleWelcomeEmailJob } from "../../../jobs/qstash";

export const Route = createFileRoute("/api/jobs/welcome-email")({
  server: {
    handlers: {
      POST: ({ request }) => handleWelcomeEmailJob(request),
    },
  },
});
