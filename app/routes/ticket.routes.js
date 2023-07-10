module.exports = (app) => {
  const Ticket = require("../controllers/ticket.controller.js");
  const { authenticateRoute } = require("../authentication/authentication.js");
  var router = require("express").Router();

  // Create a new Ticket
  router.post("/tickets/", Ticket.create);

  // Retrieve all Tickets
  router.get("/tickets/", Ticket.findAll);

  // Retrieve a single Ticket with id
  router.get("/tickets/:id", Ticket.findOne);

  // Update a Ticket with id
  router.put("/tickets/:id", [authenticateRoute], Ticket.update);

  // Delete a Ticket with id
  router.delete("/tickets/:id", [authenticateRoute], Ticket.delete);

  // Delete all Ticket
  router.delete("/tickets/", [authenticateRoute], Ticket.deleteAll);

  app.use("/courierapi", router);
};
