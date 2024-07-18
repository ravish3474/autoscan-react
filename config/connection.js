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
  let retries = 5; // Number of retries
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
      return;
    } catch (error) {
      console.error("Unable to connect to the database:", error);
      if (error.parent && error.parent.code === 'ER_LOCK_DEADLOCK') {
        console.log('Retry attempt:', retries);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust delay as needed
        retries--;
      } else {
        throw error;
      }
    }
  }
  console.error('Max retries reached. Unable to establish connection.');
};

module.exports = { sequelize, testDbConnection };