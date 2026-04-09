import type { NextApiRequest, NextApiResponse } from "next";
import { TinaNodeBackend } from "@tinacms/datalayer";
import databaseClient from "../../../../.tina/__generated__/databaseClient";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let authProvider;

  if (isLocal) {
    const { LocalBackendAuthProvider } = await import("@tinacms/datalayer");
    authProvider = LocalBackendAuthProvider();
  } else {
    const { AuthJsBackendAuthProvider, TinaAuthJSOptions } = await import("tinacms-authjs");

    authProvider = AuthJsBackendAuthProvider({
      authOptions: TinaAuthJSOptions({
        databaseClient,
        secret: process.env.NEXTAUTH_SECRET!,
      }),
    });
  }

  return TinaNodeBackend({
    authProvider,
    databaseClient,
  })(req, res);
}
