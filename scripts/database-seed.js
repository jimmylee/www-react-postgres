import configs from "../knexfile";
import knex from "knex";

const name = `database-seed.js`;
const environment =
  process.env.NODE_ENV !== "production" ? "development" : "production";
const envConfig = configs[environment];
const db = knex(envConfig);

console.log(`RUNNING: ${name} NODE_ENV=${environment}`);

// --------------------------
// SCRIPTS
// --------------------------

const createEthereumAddressTable = db.schema.createTable("ethereum", function(
  table
) {
  table
    .string("address")
    .primary()
    .unique()
    .notNullable();

  table
    .timestamp("created_at")
    .notNullable()
    .defaultTo(db.raw("now()"));

  table
    .timestamp("updated_at")
    .notNullable()
    .defaultTo(db.raw("now()"));

  table.jsonb("data").nullable();
});

const createSolanaAddressTable = db.schema.createTable("solana", function(
  table
) {
  table
    .string("address")
    .primary()
    .unique()
    .notNullable();

  table
    .timestamp("created_at")
    .notNullable()
    .defaultTo(db.raw("now()"));

  table
    .timestamp("updated_at")
    .notNullable()
    .defaultTo(db.raw("now()"));

  table.jsonb("data").nullable();
});

const createUserTable = db.schema.createTable("users", function(table) {
  table
    .uuid("id")
    .primary()
    .unique()
    .notNullable()
    .defaultTo(db.raw("uuid_generate_v4()"));

  table
    .timestamp("created_at")
    .notNullable()
    .defaultTo(db.raw("now()"));

  table
    .timestamp("updated_at")
    .notNullable()
    .defaultTo(db.raw("now()"));

  table
    .string("email")
    .unique()
    .notNullable();

  table.string("password").nullable();
  table.string("salt").nullable();
  table.jsonb("data").nullable();
});

const createOrganizationsTable = db.schema.createTable(
  "organizations",
  function(table) {
    table
      .uuid("id")
      .primary()
      .unique()
      .notNullable()
      .defaultTo(db.raw("uuid_generate_v4()"));

    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(db.raw("now()"));

    table
      .timestamp("updated_at")
      .notNullable()
      .defaultTo(db.raw("now()"));

    table
      .string("domain")
      .unique()
      .notNullable();

    table.jsonb("data").nullable();
  }
);

// --------------------------
// RUN
// --------------------------

Promise.all([
  createEthereumAddressTable,
  createSolanaAddressTable,
  createUserTable,
  createOrganizationsTable,
]);

console.log(`FINISHED: ${name} NODE_ENV=${environment} (⌘ + C to quit)`);
