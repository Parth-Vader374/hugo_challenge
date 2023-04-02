const express = require("express");
const insuranceController = require("../controllers/insuranceController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to my app!");
});

router.post("/application", insuranceController.createApplication);
router.get("/application/:id", insuranceController.getApplication);
router.put("/application/:id", insuranceController.updateApplication);
router.post(
  "/application/:id/validate",
  insuranceController.validateApplication
);

module.exports = router;
