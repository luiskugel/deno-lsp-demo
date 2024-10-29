import Express from "express";
import { AuthServer } from "@idot-digital/function-generator";
import { UserData } from "./types.ts";
import process from "node:process";

export const app: Express.Application = Express();

app.use(Express.json());

export const DEFAULT_AUTH_LAYER = AuthServer.create({
  publicKey: process.env["JWT_PUBLIC_KEY"]!,
  userZod: UserData,
  algorithms: ["RS512"],
});
