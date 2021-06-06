const express = require('express');
const mysql = require('mysql2')
const router = express.Router();

const db = require("../db");

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_User,
    password: process.env.DB_PW,
    database: process.env.DB_Name
});
connection.connect();



module.exports = router;