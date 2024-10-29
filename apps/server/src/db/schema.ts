import { sql } from "drizzle-orm";
import {
  boolean,
  int,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const namespaces = mysqlTable("namespaces", {
  id: int("id").primaryKey().autoincrement(),
  customer_name: varchar("customer_name", { length: 255 }).notNull(),
  enabled: boolean("enabled").notNull().default(true),
  created_at: timestamp("created_at")
    .notNull()
    .default(sql`current_timestamp`),
  disabled_at: timestamp("disabled_at"),
  reset_token: varchar("reset_token", { length: 255 }),
  sms_subscription_id: varchar("sms_subscription_id", { length: 255 }),
  emmasy_subscription_id: varchar("emmasy_subscription_id", { length: 255 }),
  address: varchar("address", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  postalcode: varchar("postalcode", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 255 }).notNull(),
});
