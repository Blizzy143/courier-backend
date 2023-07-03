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
  });

  return Company;
};
