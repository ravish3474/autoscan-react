const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

const Cities = sequelize.define(
  "cities",
  {
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    city_alias: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "0=active,1=deactive",
    },
    is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    tableName: "cities",
  }
);

Cities.sync({ alter: true }).then(() => {
  console.log("Cities Model synced");
});

module.exports.Cities = Cities;
