import { createContext } from "@idot-digital/function-generator";
import { z } from "zod";
import { MySql2Database } from "drizzle-orm/mysql2";

export const SecretsZod = z.object({});

// Add your contexts here and call the "setContext" function in the "index.ts" file.
// Functions created with the context can then access the context.
export const ctx = createContext<{
  secrets: z.infer<typeof SecretsZod>;
  mysql: MySql2Database<Record<string, string>>;
}>();
