if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

import configs from "@root/knexfile";
import knex from "knex";

const environment =
  process.env.NODE_ENV !== "production" ? "development" : "production";
const envConfig = configs[environment];
const db = knex(envConfig);

export default db;
