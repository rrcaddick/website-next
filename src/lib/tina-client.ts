import { createClient } from "tinacms/dist/client";
import { queries } from "../../.tina/__generated__/types";

// In local dev (npm run tina:dev), set NEXT_PUBLIC_TINA_CONTENT_URL to the local Tina server.
// In production, set NEXT_PUBLIC_TINA_CONTENT_URL to the self-hosted Tina backend URL.
const url =
  process.env.NEXT_PUBLIC_TINA_CONTENT_URL ?? "http://localhost:4001/graphql";

export const tinaClient = createClient({
  url,
  token: process.env.TINA_TOKEN ?? "",
  queries,
});
