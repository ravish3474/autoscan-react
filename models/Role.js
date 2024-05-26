const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

const Role = sequelize.define(
  "role",
  {
    name: {
      type: DataTypes.STRING(255), // Adjusted length to match MySQL VARCHAR(255)
      allowNull: false,
    },
  
    is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    added_from: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    timestamps: true,
    tableName: "role", // Set table name explicitly to match MySQL table name
  }
);

Role.sync({ alter: true }).then(() => {
  console.log("Role Model synced");
});

module.exports.Role = Role;
