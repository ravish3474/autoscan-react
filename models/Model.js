const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

const Model = sequelize.define(
  "model",
  {
    brand_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    model_name:
    {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null, 
    },
    car_img:
    {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null, 
    },
    model_year:
    {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null, 
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
      comment:"0=active,1=deactive"
    },
  },
  {
    timestamps: true,
    tableName: "model", 
  }
);

Model.sync({ alter: true }).then(() => {
  console.log("Model Model synced");
});

module.exports.Model = Model;
