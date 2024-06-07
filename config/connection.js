const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise");

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "autoscan.chwweuwm8gml.ap-south-1.rds.amazonaws.com",
  // host: "localhost",
  port: "3306",
  username: "autoscan",
  password: "usedcarsautoscan",
  // username: "root",
  // password: "",
  database: "autoscan",
  logging: false,
});

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } 
  catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { sequelize, testDbConnection };
