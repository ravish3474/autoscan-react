const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');

const Dealers = sequelize.define(
  'dealers',
  {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    address: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: true,
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
      defaultValue: '1',
    },
    added_from: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '1',
    },
    is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'dealers',
    timestamps: false,
  }
);

Dealers.sync({ alter: true }).then(() => {
  console.log('Dealers Model synced');
});

module.exports.Dealers = Dealers;