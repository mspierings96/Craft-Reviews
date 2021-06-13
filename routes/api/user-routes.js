
const express = require('express');

const router = express.Router();
const Users = require('../../models/users');
const connection = require('../../config/connection-mysql')

const db = require("../../db");
const { sum } = require('../../models/users');

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

router.get("/username", (req, res) => {
    Users.findAll({
        where: {userName: req.body.userName}
    }).then(checkUser => {
        if(checkUser[0]===undefined){
            Users.create({
                userName: req.body.userName,
                passwords: req.body.passwords
            }).then(submittedUser => (res.json(submittedUser)))
        } else {
            res.status(404).json({message: "User already exists"});
            return;
        }
    })
})


module.exports = router;