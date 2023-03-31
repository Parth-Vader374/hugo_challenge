let applications = [];

// Create a new application
exports.createApplication = (req, res) => {
  const application = req.body;
  // TODO: Save the application in a database
  applications.push(application);
  const resumeRoute = `${URL}${application.id}`;
  res.status(201).json({ resumeRoute });
};

// Get an application by id
exports.getApplication = (req, res) => {
  // TODO: Retrieve the application from the database
  const application = applications.find((app) => app.id === req.params.id);
  if (!application) {
    res.status(404).json({ message: "Application not found" });
  } else {
    res.json(application);
  }
  // res.json({ users: ["usersOne", "usersTwo", "userThree"] }); //Dummy data to test connection
};

// Update an existing application
exports.updateApplication = (req, res) => {
  // TODO: Update the application in the database
  const index = applications.findIndex((app) => app.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ message: "Application not found" });
  } else {
    applications[index] = { id: req.params.id, ...req.body };
    res.json(applications[index]);
  }
};

// Validate an application and return a price
exports.validateApplication = (req, res) => {
  // TODO: Validate the application and calculate the price
  const price = Math.random() * 1000;
  res.json({ price });
};
