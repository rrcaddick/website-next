// Database client for server-side build-time data fetching.
// Reads directly from the local filesystem (dev) or GitHub/Redis (production).
export { default as databaseClient } from "../../.tina/__generated__/databaseClient";

// The Tina admin HTTP client for live editing is handled via contentApiUrlOverride
// in .tina/config.ts — no separate HTTP client is needed here.
