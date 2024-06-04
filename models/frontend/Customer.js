const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/connection");

const Customer = sequelize.define(
  "customer",
  {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Profile Image",
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    resetToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    passwordUpdationDate: {
      type: DataTypes.DATE,
      allowNull: true,
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
