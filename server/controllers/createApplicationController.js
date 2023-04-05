const pool = require("../database/config");
const { v4: uuidv4 } = require("uuid");

const createApplicationController = async (req, res, next) => {
  const { firstName, lastName, address, vehicles } = req.body;

  console.log(req.body);

  try {
    const applicationId = uuidv4(); // generate a unique ID for the new application

    const client = await pool.connect(); // get a client from the pool

    try {
      await client.query("BEGIN"); // start a transaction

      // Insert personal_info
      const personalInfoResult = await client.query(
        "INSERT INTO personal_info (first_name, last_name) VALUES ($1, $2) RETURNING id",
        [firstName, lastName]
      );
      const personalInfoId = personalInfoResult.rows[0].id;

      // Insert address
      const addressResult = await client.query(
        "INSERT INTO address (personal_info_id, address) VALUES ($1, $2) RETURNING id",
        [personalInfoId, address]
      );
      const addressId = addressResult.rows[0].id;

      // Insert vehicles
      for (const vehicle of vehicles) {
        await client.query(
          "INSERT INTO vehicles (personal_info_id, make, model, year) VALUES ($1, $2, $3, $4)",
          [personalInfoId, vehicle.make, vehicle.model, vehicle.year]
        );
      }

      // Insert application
      const applicationResult = await client.query(
        "INSERT INTO applications (id, personal_info_id, address_id) VALUES ($1, $2, $3) RETURNING id",
        [applicationId, personalInfoId, addressId]
      );

      await client.query("COMMIT"); // commit the transaction

      const resumeRoute = `https://yourfrontendurl.com/application/${applicationResult.rows[0].id}`;
      res.status(201).json({ resumeRoute });
    } catch (error) {
      await client.query("ROLLBACK"); // rollback the transaction on error
      throw error;
    } finally {
      client.release(); // release the client back to the pool
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = createApplicationController;
