/* prettier-ignore */
module.exports = {
  development: {
    client: 'pg',
    connection: {
      port: 1334,
      host: '127.0.0.1',
      // NOTE(jim): README.md value.
      database: 'wwwdb',
      // NOTE(jim): README.md value.
      user: 'admin',
      // NOTE(jim): README.md value.
      password: 'oblivion'
    }
  },
  production: {
    client: "pg",
    connection: {
      // NOTE(jim): You'll need to setup a remote database when you deploy to production.
      port: process.env.PRODUCTION_DATABASE_PORT,
      host: process.env.PRODUCTION_DATABASE_HOST,
      database: process.env.PRODUCTION_DATABASE_NAME,
      user: process.env.PRODUCTION_DATABASE_USERNAME,
      password: process.env.PRODUCTION_DATABASE_PASSWORD,
      // NOTE(jim): SSL is true in production for remote databases.
      ssl: true,
    },
  }
};
