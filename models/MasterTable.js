const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

const MasterTable = sequelize.define(
  "MasterTable",
  {
   
    brand_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    model_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    varient_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    body_style: {
      type: DataTypes.STRING(13),
      allowNull: false
    },
    transmission: {
      type: DataTypes.STRING(23),
      allowNull: true
    },
    fuel_type: {
      type: DataTypes.STRING(34),
      allowNull: true
    },
    seating_capacity: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    exshowroom_price: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    exshowroom_prices: {
      type: DataTypes.STRING(12),
      allowNull: true
    }
  },
  {
    timestamps: true,
    tableName: "master_table"
  }
);

MasterTable.sync({ alter: true }).then(() => {
  console.log("MasterTable model synced");
});

module.exports = MasterTable;
