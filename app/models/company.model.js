module.exports = (sequelize, Sequelize) => {
  const Company = sequelize.define("company", {
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price_per_block: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    time_per_block: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ontime_bonus: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "active",
    },
  });

  return Company;
};
