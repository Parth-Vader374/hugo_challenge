const pool = require("../database/config");
const { v4: uuidv4 } = require("uuid");

const createApplicationController = async (req, res, next) => {
  const { name, dob, address, vehicles } = req.body;

  console.log(req.body);

  try {
    const applicationId = uuidv4(); // generate a unique ID for the new application

    const client = await pool.connect(); // get a client from the pool

    try {
      await client.query("BEGIN"); // start a transaction

      // Insert personal_info
      const personalInfoResult = await client.query(
        "INSERT INTO personal_info (name, date_of_birth) VALUES ($1, $2) RETURNING id",
        [name, dob]
      );
      const personalInfoId = personalInfoResult.rows[0].id;

      // Insert address
      const addressResult = await client.query(
        "INSERT INTO address (personal_info_id, street, city, state, zipcode) VALUES ($1, $2, $3, $4, $5) RETURNING id",
        [
          personalInfoId,
          address.street,
          address.city,
          address.state,
          address.zipCode,
        ]
      );
      const addressId = addressResult.rows[0].id;

      // Insert vehicles
      for (const vehicle of vehicles) {
        await client.query(
          "INSERT INTO vehicles (personal_info_id, make, model, year, vin) VALUES ($1, $2, $3, $4, $5)",
          [
            personalInfoId,
            vehicle.make,
            vehicle.model,
            vehicle.year,
            vehicle.VIN,
          ]
        );
      }

      // Get the ID of the last inserted row in the vehicles table
      const vehicleResult = await client.query(
        "SELECT id FROM vehicles ORDER BY id DESC LIMIT 1"
      );
      const vehicleId = vehicleResult.rows[0].id;

      // Insert a new row in the applications table for each vehicle and return the inserted row
      const applicationResult = await client.query(
        "INSERT INTO applications (id, personal_info_id, address_id, vehicle_id) VALUES ($1, $2, $3, $4) RETURNING id",
        [applicationId, personalInfoId, addressId, vehicleId]
      );

      await client.query("COMMIT"); // commit the transaction

      const resumeRoute = `http://localhost:3000/application/${applicationResult.rows[0].id}`;
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
