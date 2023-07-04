const db = require("../models");
const User = db.user;
const Session = db.session;

const { encrypt, getSalt, hashPassword } = require("../authentication/crypto");

// Create and Save a new User
exports.create = async (req, res) => {
  // Validate request
  if (req.body.firstName === undefined) {
    const error = new Error("Name cannot be empty for user!");
    error.statusCode = 400;
    res.status(400).send({
      message:
        error.message || "Some error occurred while creating the User.",
    });
  }

  else if (req.body.lastName === undefined) {
    const error = new Error("Name cannot be empty for user!");
    error.statusCode = 400;
    res.status(400).send({
      message:
        error.message || "Some error occurred while creating the User.",
    });
  }
  else if (req.body.user_role === undefined) {
    const error = new Error("User role cannot be empty for user!");
    error.statusCode = 400;
    res.status(400).send({
      message:
        error.message || "Some error occurred while creating the User.",
    });
  }
  else if (req.body.email === undefined) {
    error.statusCode = 400;
    res.status(400).send({
      message:
        error.message || "Some error occurred while creating the User.",
    });
  } else if (req.body.password === undefined) {
    const error = new Error("Password cannot be empty for user!");
    error.statusCode = 400;
    res.status(400).send({
      message:
        error.message || "Some error occurred while creating the User.",
    });
  } else if (req.body.number === undefined) {
    const error = new Error("Mobile number cannot be empty for user!");
    error.statusCode = 400;
    res.status(400).send({
      message:
        error.message || "Some error occurred while creating the User.",
    });
  }


  let salt = await getSalt();
  let hash = await hashPassword(req.body.password, salt);

  // Create a User
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    number: req.body.number,
    email: req.body.email,
    password: hash,
    salt: salt,
    user_role: req.body.user_role ? req.body.user_role : "user",
  };

  // Save User in the database
  await User.create(user)
    .then(async (data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err.code);
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(409).send({
          message: "Email already exists",
        });
        return;
      }
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User.",
      });
    });

};

exports.createClerk = async (req, res) => {
  // Validate request
  if (req.body.firstName === undefined) {
    const error = new Error("Name cannot be empty for user!");
    error.statusCode = 400;
    res.status(400).send({
      message:
        error.message || "Some error occurred while creating the User.",
    });
  }

  else if (req.body.lastName === undefined) {
    const error = new Error("Name cannot be empty for user!");
    error.statusCode = 400;
    res.status(400).send({
      message:
        error.message || "Some error occurred while creating the User.",
    });
  }
  else if (req.body.user_role === undefined) {
    const error = new Error("User role cannot be empty for user!");
    error.statusCode = 400;
    res.status(400).send({
      message:
        error.message || "Some error occurred while creating the User.",
    });
  }
  else if (req.body.email === undefined) {
    error.statusCode = 400;
    res.status(400).send({
      message:
        error.message || "Some error occurred while creating the User.",
    });
  } else if (req.body.password === undefined) {
    const error = new Error("Password cannot be empty for user!");
    error.statusCode = 400;
    res.status(400).send({
      message:
        error.message || "Some error occurred while creating the User.",
    });
  } else if (req.body.number === undefined) {
    const error = new Error("Mobile number cannot be empty for user!");
    error.statusCode = 400;
    res.status(400).send({
      message:
        error.message || "Some error occurred while creating the User.",
    });
  }


  let salt = await getSalt();
  let hash = await hashPassword(req.body.password, salt);

  // Create a User
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    number: req.body.number,
    email: req.body.email,
    password: hash,
    salt: salt,
    user_role: "clerk",
  };

  // Save User in the database
  await User.create(user)
    .then(async (data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err.code);
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(409).send({
          message: "Email already exists",
        });
        return;
      }
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User.",
      });
    });

};

exports.getAllClerks = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` }, user_role: "clerk" } : { user_role: "clerk" };
  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};


// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id = ${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving User with id = " + id,
      });
    });
};

// Find a single User with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  User.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find User with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving User with email=" + email,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id = ${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating User with id =" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((number) => {
      if (number == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id = ${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete User with id = " + id,
      });
    });
};

// Delete all People from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
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
