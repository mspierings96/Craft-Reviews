
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

// check for existing username for create account
router.get("/usernamecheck", (req, res) => {
    let userName = 'user1'
    connection.query(db.searchUserName(userName), userName, (err, results)=> {
        console.log(results)
    })
})

module.exports = router;