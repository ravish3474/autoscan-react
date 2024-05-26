const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/connection");

const Brand = sequelize.define(
  "Brand",
  {
    brand_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    brand_img:
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
    tableName: "brand", 
  }
);

Brand.sync({ alter: true }).then(() => {
  console.log("Brand Model synced");
});

module.exports.Brand = Brand;
