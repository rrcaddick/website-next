import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";
import { GitHubProvider } from "tinacms-gitprovider-github";
import { RedisLevel } from "upstash-redis-level";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

export default isLocal
  ? createLocalDatabase({ tinaDirectory: ".tina" })
  : createDatabase({
      tinaDirectory: ".tina",
      gitProvider: new GitHubProvider({
        owner: process.env.GITHUB_OWNER!,
        repo: process.env.GITHUB_REPO!,
        token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN!,
        branch: process.env.GITHUB_BRANCH || "main",
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      databaseAdapter: new RedisLevel({
        redis: {
          url: process.env.KV_REST_API_URL!,
          token: process.env.KV_REST_API_TOKEN!,
        },
        namespace: process.env.GITHUB_BRANCH || "main",
      }) as any,
    });
