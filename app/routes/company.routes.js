module.exports = (app) => {
  const Company = require("../controllers/company.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  // Create a new Company
  router.post("/companies/", Company.create);

  // Retrieve all Companys
  router.get("/companies/", Company.findAll);

  // Retrieve a single Company with id
  router.get("/companies/:id", Company.findOne);

  // Update a Company with id
  router.put("/companies/:id", [authenticateRoute], Company.update);

  // Delete a Company with id
  router.delete("/companies/:id", [authenticateRoute], Company.delete);

  // Delete all Company
  router.delete("/companies/", [authenticateRoute], Company.deleteAll);

  app.use("/courierapi", router);
};
