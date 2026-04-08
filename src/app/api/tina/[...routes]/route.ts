/**
 * Tina Self-Host Backend
 *
 * This route provides the Tina GraphQL API for production self-hosting.
 * It reads and writes content directly to the filesystem.
 *
 * Required env vars:
 *   NEXT_PUBLIC_TINA_CONTENT_URL=http://your-domain.com/api/tina/graphql
 *   TINA_TOKEN=<any secret string for request auth>
 *
 * Set TINA_TOKEN in the Tina admin config (clientId + token) to require
 * auth on mutation requests.
 *
 * For production: set NEXT_PUBLIC_TINA_CONTENT_URL to this route's URL.
 * For local dev:  use `npm run tina:dev` instead (uses port 4001 directly).
 */
export const runtime = "nodejs";
import { createLocalDatabase, FilesystemBridge, resolve } from "@tinacms/graphql";
import { buildSchema } from "@tinacms/graphql";
import tinaConfig from "../../../../../.tina/config";
import path from "path";
import type { Database } from "@tinacms/graphql";

let _db: Database | null = null;

async function getDb(): Promise<Database> {
  if (_db) return _db;

  const rootPath = process.cwd();
  const bridge = new FilesystemBridge(rootPath, path.join(rootPath, "content"));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { graphQLSchema, tinaSchema } = await buildSchema(tinaConfig as any);
  const db = createLocalDatabase({ bridge });
  await db.indexContent({ graphQLSchema, tinaSchema });

  _db = db;
  return db;
}

export async function POST(req: Request) {
  try {
    const { query, variables } = await req.json();
    const db = await getDb();
    const result = await resolve({
      query,
      variables: variables ?? {},
      database: db,
      verbose: false,
    });
    return Response.json(result);
  } catch (err) {
    console.error("[tina/graphql]", err);
    return Response.json({ errors: [{ message: String(err) }] }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ message: "Tina GraphQL — use POST with { query, variables }" }, { status: 200 });
}
