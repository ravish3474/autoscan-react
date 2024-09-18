const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/connection");

const Customer = sequelize.define(
  "customer",
  {
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    mobileNumber: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue:null
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Profile Image",
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "1",
    },
    is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "customer",
    timestamps: true,
  }
);

Customer.sync({ alter: true }).then(() => {
  console.log("Customer Model synced");
});

module.exports.Customer = Customer;
