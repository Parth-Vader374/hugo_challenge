const express = require("express");
const helmet = require("helmet");
const routes = require("../server/routes/insuranceRoutes");

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        fontSrc: ["http://localhost:5000"],
      },
    },
  })
);

app.use(express.json());

app.use("/api", routes); // use the routes defined in the routes.js file

// error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
