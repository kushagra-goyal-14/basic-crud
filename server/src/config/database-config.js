const { Sequelize } = require("sequelize");
const { database, username, password } = require("./server-config.js");

const sequelize = new Sequelize(database, username, password, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

async function connect() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = { sequelize, connect };
