import { z } from "zod";

export const UserData = z.object({
  username: z.string(),
  displayname: z.string(),
  permissions: z.array(z.string()),
  namespace: z.number(),
});
