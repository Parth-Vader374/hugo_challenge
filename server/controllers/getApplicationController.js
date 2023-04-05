const pool = require("../database/config");
const { v4: uuidv4 } = require("uuid");

const getApplicationController = async (req, res, next) => {
  const applicationId = req.params.id;

  try {
    console.log("calling db");
    const result = await pool.query(
      "SELECT * FROM personal_info INNER JOIN address ON personal_info.id = address.personal_info_id INNER JOIN vehicles ON personal_info.id = vehicles.personal_info_id WHERE vehicles.id = $1",
      [applicationId]
    );
    const application = result.rows[0];
    if (!application) {
      return res.status(404).send("Application not found");
    }
    res.json(application);
  } catch (error) {
    return next(error);
  }
};

module.exports = getApplicationController;
