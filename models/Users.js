const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');

const Users = sequelize.define(
  'users',
  {
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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
      comment: 'Profile Image',
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
      defaultValue: '1',
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    last_ip: {
      type: DataTypes.STRING(255),
      defaultValue: null,
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
    tableName: 'users',
    timestamps: false,
  }
);

Users.sync({ alter: true }).then(() => {
  console.log('Users Model synced');
});

module.exports.Users = Users;