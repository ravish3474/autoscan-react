const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

const Inspection = sequelize.define(
  "Inspection",
  {
    brand_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    model_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    varient_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    current_location: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    pincode: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    car_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    manufacturing_year: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    kms_driven: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    ownership: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    registration_number: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    car_location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    inspection_address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    inspection_area: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    inspection_landmark: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    inspection_date: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    whatsapp_update: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "0=No,1=Yes",
    },
    user_fullname: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    phone: {
      type: DataTypes.INTEGER(30),
      allowNull: true,
      defaultValue: null,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "0=available,1=coming soon",
    },
    is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    tableName: "inspection",
  }
);

Inspection.sync({ alter: true }).then(() => {
  console.log("Inspection Model synced");
});

module.exports.Inspection = Inspection;
