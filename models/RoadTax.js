const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

const RoadTax = sequelize.define(
  "RoadTax",
  {
    State: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Type: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    Price_lower_limit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Price_upper_limit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CC_lower_limit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CC_upper_limit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Road_Tax_Petrol: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    Road_Tax_Diesel: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    Road_Tax_Electric: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    TCS: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    ParkingCharges: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Hypothecation_Charges: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Registration_Charges: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Road_Safety_Cess: {
      type: DataTypes.STRING(14),
      allowNull: false
    },
    Temp_reg_charges: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Fast_Tag: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    HSRP_Charges: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Other_charges: {
      type: DataTypes.STRING(68),
      allowNull: false
    },
    Comments: {
      type: DataTypes.STRING(108),
      allowNull: true
    }
  },
  {
    timestamps: true, 
    tableName: "road_tax"
  }
);


RoadTax.sync({ alter: true }).then(() => {
  console.log("RoadTax model synced");
});

module.exports = RoadTax;
