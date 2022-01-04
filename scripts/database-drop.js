import configs from "../knexfile";
import knex from "knex";

const name = `database-drop.js`;
const environment =
  process.env.NODE_ENV !== "production" ? "development" : "production";
const envConfig = configs[environment];
const db = knex(envConfig);

console.log(`RUNNING: ${name} NODE_ENV=${environment}`);

// --------------------------
// SCRIPTS
// --------------------------

const dropUserTable = db.schema.dropTable("users");
const dropOrganizationsTable = db.schema.dropTable("organizations");

// --------------------------
// RUN
// --------------------------

Promise.all([dropUserTable, dropOrganizationsTable]);

console.log(`FINISHED: ${name} NODE_ENV=${environment} (⌘ + C to quit)`);
