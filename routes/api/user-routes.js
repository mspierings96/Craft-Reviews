
const express = require('express');

const router = express.Router();
const Users = require('../../models/users');
const connection = require('../../config/connection-mysql')

const db = require("../../db");

// check for existing username for create account
router.get("/usernamecheck", (req, res) => {
    let userName = 'user1'
    connection.query(db.searchUserName(userName), userName, (err, results)=> {
    })
})

// post new userName
router.post("/newuser", (req, res) => {
    Users.create({
        userName: req.body.userName,
        passwords: req.body.passwords
    }).then(submittedUser => {res.json(submittedUser)})
})



module.exports = router;