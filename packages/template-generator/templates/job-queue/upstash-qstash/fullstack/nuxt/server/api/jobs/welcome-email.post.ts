import { handleWelcomeEmailJob } from "../../../src/jobs/qstash";

export default defineEventHandler((event) => handleWelcomeEmailJob(toWebRequest(event)));
