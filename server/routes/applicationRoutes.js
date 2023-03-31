const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");

// Create a new application
router.post("/", applicationController.createApplication);

// Get an application by id
router.get("/:id", applicationController.getApplication);

// Update an existing application
router.put("/:id", applicationController.updateApplication);

// Validate an application and return a price
router.post("/:id/validate", applicationController.validateApplication);

module.exports = router;
