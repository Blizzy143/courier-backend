module.exports = (sequelize, Sequelize) => {
  const Ticket = sequelize.define("service_ticket", {
    pickup_time: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    bill_pickup: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    bill_delivery: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    est_delivery_time: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    est_blocks: { 
      type: Sequelize.STRING,
      allowNull: true,
    },
    quoted_price: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    assigned_time: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    pickup_time: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    delivery_time: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return Ticket;
};
