const pool = require("./config");

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log("Connected to database");
    const result = await client.query("SELECT NOW()");
    console.log(
      "Current date and time from the database: ",
      result.rows[0].now
    );
    client.release();
  } catch (error) {
    console.error("Error connecting to database", error);
  }
}

testConnection();
