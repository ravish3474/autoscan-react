const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

const CityPincode = sequelize.define(
  "CityPincode",
  {
    state: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    pincode: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
    tableName: "city_pincode",
  }
);

CityPincode.sync({ alter: true }).then(() => {
  console.log("CityPincode model synced");
});

module.exports = CityPincode;

