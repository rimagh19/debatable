// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

//--------
require('dotenv').config();

const {DB_NAME,
      DB_USERNAME,
      DB_PASSWORD,
      DB_HOST,
      DB_PORT} = process.env;

//--------
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: DB_NAME,
      user: DB_USERNAME,
      password: DB_PASSWORD,
      host: DB_HOST,
      port: DB_PORT
    },
  },
  migrations: {
    tableName: 'knex_migrations'
  },

};