require('dotenv').config();
const mysql = require('mysql2');
// const { connect } = require('../routes');
// const { connection } = require('../db');

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_User,
    password: process.env.DB_PW,
    database: process.env.DB_Name
});
connection.connect();


module.exports = connection;