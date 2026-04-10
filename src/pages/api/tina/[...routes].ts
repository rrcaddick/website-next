import type { NextApiRequest, NextApiResponse } from "next";

import { TinaNodeBackend, LocalBackendAuthProvider } from "@tinacms/datalayer";
import { TinaAuthJSOptions, AuthJsBackendAuthProvider } from "tinacms-authjs";

import databaseClient from "../../../../.tina/__generated__/databaseClient";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const authProvider = isLocal
  ? LocalBackendAuthProvider()
  : AuthJsBackendAuthProvider({
      authOptions: TinaAuthJSOptions({
        databaseClient: databaseClient,
        secret: process.env.NEXTAUTH_SECRET ?? "",
      }),
    });

const tinaHandler = TinaNodeBackend({
  authProvider,
  databaseClient,
});

// This wrapper fixes the NextAuth import issue in Next.js 15
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    return await tinaHandler(req, res);
  } catch (error) {
    console.error("Tina routes handler error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
