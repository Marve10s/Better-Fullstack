import { createFileRoute } from "@tanstack/react-router";

import { handleWelcomeEmailJob } from "../../../jobs/qstash";

export const Route = createFileRoute("/api/jobs/welcome-email")({
  server: {
    handlers: {
      POST: ({ request }) => handleWelcomeEmailJob(request),
    },
  },
});
