const express = require('express');
const mysql = require('mysql2')
const router = express.Router();
const Users = require('../../models/users');
const connection = require('../../config/connection-mysql')

const db = require("../../db");
const Reviews = require('../../models/reviews');




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
    let apiID ='5051';
    let userName = 'user1';
    connection.query(db.searchExistingReview(apiID, userName), [apiID, userName], (err, results) => {
    console.log(results)
    })
})

// update existing review on brewery by user
router.put("/updaterating", (req, res) => {
    console.log('update rating called')
    Reviews.update(
        {
            review: req.body.review
        },
        {
            where: {
                userName: req.body.userName,
                apiID: req.body.apiID
            }
        }
    ).then(updateRating => {res.json(updateRating)}
    );
});


// create rating on brewery by user
router.post("/newrate", (req, res) => {
    console.log('post rate route called')
    console.log(req.params)
    Reviews.create({
        apiID: req.body.apiID,
        review: req.body.review,
        userName: req.body.userName
    }).then(submittedReview => {res.json(submittedReview)})
});

module.exports = router;