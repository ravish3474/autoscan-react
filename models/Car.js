const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

const Car = sequelize.define(
  "Car",
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
      type: DataTypes.STRING(20),
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
    registration_state: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    registration_number: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    front_view: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    front_left: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    front_right: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    left_view: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    right_view: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    rear_view: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    rear_left: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    rear_right: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    odometer: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    engine: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    chessis: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    interior: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    other_img: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    engine_transmission: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    dimension: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    weight: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    capacity: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    suspensions: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    breaks: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    streering_tires: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
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
    tableName: "car",
  }
);

Car.sync({ alter: true }).then(() => {
  console.log("Car Model synced");
});

module.exports.Car = Car;
