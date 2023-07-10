const db = require("../models");
const Ticket = db.service_ticket;

// Create and Save a new Ticket
exports.create = async (req, res) => {

        // Create a Ticket
        const ticket = {
          pickup_time: req.body.pickup_time,
          bill_pickup: req.body.bill_pickup,
          bill_delivery: req.body.bill_delivery,
          est_delivery_time: req.body.est_delivery_time,
          est_blocks: req.body.est_blocks,
          quoted_price: req.body.quoted_price,
          assigned_time: req.body.assigned_time,
          pickup_time: req.body.pickup_time,
          delivery_time: req.body.delivery_time,

          deliveryCustomerId: req.body.deliveryCustomerId,
          pickupCustomerId: req.body.pickupCustomerId,
          creatorId: req.body.creatorId,
          assignedToId: req.body.assignedToId, 
        };

        // Save Ticket in the database
        await Ticket.create(ticket)
          .then(async (data) => {
              res.send(data);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Ticket.",
            });
          });
};

// Retrieve all Tickets from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Ticket.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tickets.",
      });
    });
};

// Find a single Ticket with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Ticket.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Ticket with id = ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Ticket with id = " + id,
      });
    });
};


// Update a Ticket by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Ticket.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Ticket was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Ticket with id = ${id}. Maybe Ticket was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Ticket with id =" + id,
      });
    });
};

// Delete a Ticket with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Ticket.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "Ticket was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Ticket with id = ${id}. Maybe Ticket was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete Ticket with id = " + id,
      });
    });
};

// Delete all People from the database.
exports.deleteAll = (req, res) => {
  Ticket.destroy({
    where: {},
    truncate: false,
  })
    .then((number) => {
      res.send({ message: `${number} People were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all people.",
      });
    });
};
