import type { RequestHandler } from "@sveltejs/kit";

import { handleWelcomeEmailJob } from "../../../../jobs/qstash";

export const POST: RequestHandler = ({ request }) => handleWelcomeEmailJob(request);
