module.exports = (app) => {
  const Customer = require("../controllers/customer.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  // Create a new Customer
  router.post("/customers/", Customer.create);

  // Retrieve all Customers
  router.get("/customers/", Customer.findAll);

  // Retrieve a single Customer with id
  router.get("/customers/:id", Customer.findOne);

  // Update a Customer with id
  router.put("/customers/:id", [authenticateRoute], Customer.update);

  // Delete a Customer with id
  router.delete("/customers/:id", [authenticateRoute], Customer.delete);

  // Delete all Customer
  router.delete("/customers/", [authenticateRoute], Customer.deleteAll);

  app.use("/courierapi", router);
};
