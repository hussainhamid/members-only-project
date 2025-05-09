require("dotenv").config();
const { Pool } = require("pg");

//local db
module.exports = new Pool({
  host: process.env.LOCALHOST_ENV,
  user: process.env.USER_ENV,
  database: process.env.DATABASE_ENV,
  password: process.env.PASS_ENV,
  port: process.env.DB_PORT_ENV,
});

//production db using railway public url

module.exports = new Pool({
  connectionString: process.env.PUBLIC_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
