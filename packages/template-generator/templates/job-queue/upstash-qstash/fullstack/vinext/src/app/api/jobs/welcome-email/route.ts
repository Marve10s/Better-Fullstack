import { handleWelcomeEmailJob } from "../../../../jobs/qstash";

export function POST(request: Request) {
  return handleWelcomeEmailJob(request);
}
