
const express = require('express');
const mysql = require('mysql2')
const router = express.Router();
const Users = require('../models/users');
const connection = require('../config/connection-mysql')

const db = require("../db");



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

// check for existing username for create account
router.get("/usernamecheck", (req, res) => {
    let userName = 'user1'
    connection.query(db.searchUserName(userName), userName, (err, results)=> {
        console.log(results)
    })
})

// post new userName
router.get("/newuser", (req, res) => {
    console.log('post route called')
    Users.create({
        userName: "testUser",
        passwords: "testPass"
    }).then(submittedUser => {res.json(submittedUser)})
})

module.exports = router;