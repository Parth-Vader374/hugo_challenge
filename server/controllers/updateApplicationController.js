const pool = require("../database/config");
const { v4: uuidv4 } = require("uuid");

const updateApplicationController = async (req, res, next) => {
  const applicationId = req.params.id;
  const { firstName, lastName, email } = req.body;

  try {
    const result = await pool.query(
      "UPDATE applications SET first_name = $1, last_name = $2, email = $3 WHERE id = $4 RETURNING *",
      [firstName, lastName, email, applicationId]
    );
    const updatedApplication = result.rows[0];
    if (!updatedApplication) {
      return res.status(404).send("Application not found");
    }
    res.json(updatedApplication);
  } catch (error) {
    return next(error);
  }
};

module.exports = updateApplicationController;
