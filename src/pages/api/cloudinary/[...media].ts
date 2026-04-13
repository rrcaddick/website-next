import { createMediaHandler } from "next-tinacms-cloudinary/dist/handlers";
import { getServerSession } from "next-auth/next";
import { TinaAuthJSOptions } from "tinacms-authjs";
import databaseClient from "../../../../.tina/__generated__/databaseClient";

export const config = { api: { bodyParser: false } };

export default createMediaHandler({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,

  authorized: async (req, res) => {
    if (process.env.TINA_PUBLIC_IS_LOCAL === "true") return true;

    const session = await getServerSession(
      req,
      res,
      TinaAuthJSOptions({
        databaseClient,
        secret: process.env.NEXTAUTH_SECRET!,
      }),
    );

    return !!session?.user;
  },
});
