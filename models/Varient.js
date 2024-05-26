const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

const Varient = sequelize.define(
  "varient",
  {
    brand_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    model_id:
    {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    varient_name:
    {
        type: DataTypes.STRING(255),
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
      comment:"0=active,1=deactive"
    }
  },
  {
    timestamps: true,
    tableName: "varient", 
  }
);

Varient.sync({ alter: true }).then(() => {
  console.log("Varient Model synced");
});

module.exports.Varient = Varient;
