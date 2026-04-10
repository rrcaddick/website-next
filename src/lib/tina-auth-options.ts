import { TinaAuthJSOptions } from "tinacms-authjs";
import databaseClient from "../../.tina/__generated__/databaseClient";

export const tinaAuthOptions = TinaAuthJSOptions({
  databaseClient,
  secret: process.env.NEXTAUTH_SECRET!,
});
