const { Pool } = require("pg");

const pool = new Pool({
  user: "your_user",
  host: "your_host",
  database: "your_DB",
  password: "your_pwd",
  port: 5432,
});

module.exports = pool;
