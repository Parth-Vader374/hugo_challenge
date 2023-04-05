const pool = require("../database/config");
const { v4: uuidv4 } = require("uuid");

const validateApplicationController = async (req, res, next) => {
  const applicationId = req.params.id;

  try {
    const result = await pool.query(
      "SELECT * FROM applications WHERE id = $1",
      [applicationId]
    );
    const application = result.rows[0];
    if (!application) {
      return res.status(404).send("Application not found");
    }
    const price = Math.floor(Math.random() * 10000); // replace with actual
    res.json({ price });
  } catch (error) {
    return next(error);
  }
};

module.exports = validateApplicationController;
