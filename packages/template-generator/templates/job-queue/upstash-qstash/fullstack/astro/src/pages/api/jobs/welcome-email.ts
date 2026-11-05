import type { APIRoute } from "astro";

import { handleWelcomeEmailJob } from "../../../jobs/qstash";

export const prerender = false;

export const POST: APIRoute = ({ request }) => handleWelcomeEmailJob(request);
