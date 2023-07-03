module.exports = (sequelize, Sequelize) => {
  const Ticket = sequelize.define("service_ticket", {
    pickup_time: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bill_pickup: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bill_delivery: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    package_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    est_delivery_time: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    est_blocks: { 
      type: Sequelize.STRING,
      allowNull: false,
    },
    quoted_price: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    assigned_time: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pickup_time: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    delivery_time: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Ticket;
};
