const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

const Makeoffer = sequelize.define(
  "make_offer",
  {
    car_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    bid_price: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    orginal_price: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    car_addedby_user_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    car_addedby_dealer_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    bidding_user_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "0=active,1=success,2=rejected,3=closed",
    },
    is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    tableName: "make_offer",
  }
);

Makeoffer.sync({ alter: true }).then(() => {
  console.log("Makeoffer Model synced");
});

module.exports.Makeoffer = Makeoffer;
