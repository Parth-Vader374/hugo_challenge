const express = require("express");
const bodyParser = require("body-parser");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Routes
app.use("/api/application", applicationRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
