require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection(
  process.env.JAWSDB_URL || {
    host: "qao3ibsa7hhgecbv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
  }
);
connection.connect();

module.exports = connection;
