require("dotenv").config();
const mysql = require("mysql2");
// const { connect } = require('../routes');
// const { connection } = require('../db');

<<<<<<< HEAD
const connection = mysql.createConnection(
  process.env.JAWSDB_URL || {
    host: "qao3ibsa7hhgecbv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
  }
);
=======
const connection = mysql.createConnection({
    host: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
    
});
>>>>>>> 87913f8db5823316ee45fb7214156dd3b1423834
connection.connect();

module.exports = connection;
