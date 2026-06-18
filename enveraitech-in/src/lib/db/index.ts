import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

let dbUrl = process.env.DATABASE_URL;
if (dbUrl.includes("[PASSWORD]") || dbUrl.includes("[PROJECT_REF]")) {
  console.warn("DATABASE_URL contains placeholder parameters. Swapping with a syntactically valid URL for build phase.");
  dbUrl = "postgresql://postgres:dummy_password@localhost:5432/postgres";
}

const client = postgres(dbUrl, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
  ssl: process.env.NODE_ENV === "production" ? "require" : false,
});

export const db = drizzle(client, { schema });
export type DB = typeof db;
