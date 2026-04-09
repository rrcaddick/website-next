import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:3000/api/tina/gql', token: '', queries,  });
export default client;
  