const pool = require("../database/config");
const { v4: uuidv4 } = require("uuid");

const createApplication = async (req, res, next) => {
  const { firstName, lastName, email } = req.body;

  try {
    const applicationId = uuidv4(); // generate a unique ID for the new application
    const result = await pool.query(
      "INSERT INTO applications (id, first_name, last_name, email) VALUES ($1, $2, $3, $4) RETURNING id",
      [applicationId, firstName, lastName, email]
    );
    const resumeRoute = `https://yourfrontendurl.com/application/${result.rows[0].id}`;
    res.status(201).json({ resumeRoute });
  } catch (error) {
    return next(error);
  }
};

const getApplication = async (req, res, next) => {
  const applicationId = req.params.id;

  const getCurrentInsuranceApplicationQuery = {
    text: "SELECT * FROM personal_info INNER JOIN address ON personal_info.id = address.personal_info_id INNER JOIN vehicles ON personal_info.id = vehicles.personal_info_id WHERE vehicles.id = $1",
    values: [1],
  };

  try {
    console.log("calling db");
    const result = await pool.query(getCurrentInsuranceApplicationQuery, [
      applicationId,
    ]);
    const application = result.rows[0];
    if (!application) {
      return res.status(404).send("Application not found");
    }
    res.json(application);
  } catch (error) {
    return next(error);
  }
};

const updateApplication = async (req, res, next) => {
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

const validateApplication = async (req, res, next) => {
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

module.exports = {
  createApplication,
  getApplication,
  updateApplication,
  validateApplication,
};
