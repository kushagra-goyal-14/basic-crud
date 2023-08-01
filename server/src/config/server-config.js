const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3000,
  database: process.env.DBNAME || "crud_db",
  username: process.env.DBUSERNAME || "root",
  password: process.env.DBPASSWORD || "",
};
