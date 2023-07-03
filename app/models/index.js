const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.company = require("./company.model.js")(sequelize, Sequelize);
db.customer = require("./customers.model.js")(sequelize, Sequelize);
db.service_ticket = require("./service_ticket.model.js")(sequelize, Sequelize);


// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);


// foreign key for company
db.company.hasMany(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.user.belongsTo(
  db.company,
  { as: "company" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);



// foreign key for customer
db.company.hasMany(
  db.customer,
  { as: "customer" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.customer.belongsTo(
  db.company,
  { as: "company" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);


// foreign key for service_ticket
db.service_ticket.belongsTo(
  db.customer,
  { as: "delivery_customer" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.service_ticket.belongsTo(
  db.customer,
  { as: "pickup_customer" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);


db.service_ticket.belongsTo(
  db.user,
  { as: "creator" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.service_ticket.belongsTo(
  db.user,
  { as: "assigned_to" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);


module.exports = db;
