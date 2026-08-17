import { httpRouter } from "convex/server";

import { options, trackProjectCreation } from "./ingest";

const http = httpRouter();

// Retired legacy POST tombstone
http.route({
  path: "/track",
  method: "POST",
  handler: trackProjectCreation,
});

// Retired legacy OPTIONS tombstone; intentionally no CORS
http.route({
  path: "/track",
  method: "OPTIONS",
  handler: options,
});

export default http;
