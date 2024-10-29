import { app } from "./app.ts";
import { ctx, SecretsZod } from "./context.ts";
import { checkConfig } from "@idot-digital/function-generator";

import { drizzle } from "drizzle-orm/mysql2";
import createMySQLPool from "./db/mysql.ts";
import process from "node:process";

const secrets = checkConfig(SecretsZod);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

const mysql = await createMySQLPool(process.env["MYSQL_URL"]!, 5);

ctx.addContext({
  secrets,
  mysql: drizzle(mysql),
});
