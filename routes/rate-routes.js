
const express = require('express');
const mysql = require('mysql2')
const router = express.Router();

//const connection = require('../config/connection')

const db = require("../db");

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_User,
    password: process.env.DB_PW,
    database: process.env.DB_Name
});
connection.connect();

// get top 5 highest rated breweries for home page
router.get("/top5", (req, res) => {
    connection.query(db.findHighestFive(),(err, results) => {
        console.log(results)
    })
});

// get ratings for individual brewery by brewery api id
router.get("/rating", (req, res) => {
    let apiID='5051'
    connection.query(db.findTotalsByScore(apiID), apiID,(err, results) => {
        console.log(results)
    })
});

// check for exisiting review by user for brewery
router.get("/Reviewed", (req, res) => {
    let apiID ='5051'
    let userName = 'user1'
    connection.query(db.searchExistingReview(apiID, userName), [apiID, userName], (err, results) => {
    console.log(results)
    })
})


module.exports = router;