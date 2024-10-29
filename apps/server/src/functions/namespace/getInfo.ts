import { ExpressGetServer } from "@idot-digital/function-generator";
import { app, DEFAULT_AUTH_LAYER } from "../../app.ts";
import { ctx } from "../../context.ts";
import { namespaces } from "../../db/schema.ts";
import { eq } from "drizzle-orm";

//# DATA TYPE
import * as z from "zod";
import { DATA_FROM_ZOD } from "@idot-digital/function-generator";
import { url } from "../../config.client.ts";
import { UserData } from "../../types.ts";

const FUNC_ZOD = {
  REQ: z.object({}).strict(),
  OPT: z.object({
    user: UserData,
  }),
  RES: z.object({
    code: z.literal(200),
    data: z.object({
      email: z.string(),
      phone: z.string(),
      address: z.string(),
      city: z.string(),
      postalcode: z.string(),
    }),
  }),
};

export type DATA = DATA_FROM_ZOD<typeof FUNC_ZOD>;

const CLIENT_SETTINGS = {
  path: "/namespace/getInfo",
  url,
};
//#

export const getInfo = ctx.createFunction(
  FUNC_ZOD,
  async (
    {},
    { user },
    { mysql },
  ): Promise<DATA["RES"]> => {
    const result = await mysql.select(
      {
        email: namespaces.email,
        phone: namespaces.phone,
        address: namespaces.address,
        city: namespaces.city,
        postalcode: namespaces.postalcode,
      },
    ).from(namespaces).where(
      eq(namespaces.id, user.namespace),
      gt,
    );

    if (result.length === 0) {
      throw new Error("Namespace not found, but user exists!");
    }

    return {
      code: 200,
      data: result[0]!,
    };
  },
).addLayer(DEFAULT_AUTH_LAYER)
  .addTransport(
    ExpressGetServer.create({
      app,
      path: CLIENT_SETTINGS.path,
    }),
  );
