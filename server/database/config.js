const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "insuranceApplication",
  password: "Miami!@#4",
  port: 5432,
});

module.exports = pool;
