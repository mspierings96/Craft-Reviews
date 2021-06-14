require('dotenv').config();
const mysql = require('mysql2');
// const { connect } = require('../routes');
// const { connection } = require('../db');

const connection = mysql.createConnection({
    host: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
    
});
connection.connect();


module.exports = connection;