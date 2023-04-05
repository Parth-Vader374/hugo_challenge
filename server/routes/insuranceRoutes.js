const express = require("express");
const createApplicationController = require("../controllers/createApplicationController");
const getApplicationController = require("../controllers/getApplicationController");
const updateApplicationController = require("../controllers/updateApplicationController");
const validateApplicationController = require("../controllers/validateApplicationController");

const router = express.Router();

//Dummy router to test connection
router.get("/", (req, res) => {
  res.send("Welcome to my app!");
});

router.post("/application", createApplicationController);
router.get("/application/:id", getApplicationController);
router.put("/application/:id", updateApplicationController);
router.post("/application/:id/validate", validateApplicationController);

module.exports = router;
