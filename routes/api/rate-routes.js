const express = require('express');
const router = express.Router();
const Users = require('../../models/users');
const connection = require('../../config/connection-mysql')

const db = require("../../db");
const Reviews = require('../../models/reviews');




// get top 5 highest rated breweries for home page
router.get("/top5", (req, res) => {
    connection.query(db.findHighestFive(),(err, results) => {
        
    })
});

// get ratings for individual brewery by brewery api id
router.get("/rating", (req, res) => {
    let apiID='5051'
    connection.query(db.findTotalsByScore(apiID), apiID,(err, results) => {
        
    })
});

// check for exisiting review by user for brewery
router.get("/Reviewed", (req, res) => {
    let apiID ='5051';
    let userName = 'user1';
    connection.query(db.searchExistingReview(apiID, userName), [apiID, userName], (err, results) => {
    })
})

// update existing review on brewery by user
router.put("/updaterating", (req, res) => {
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
    Reviews.create({
        apiID: req.body.apiID,
        review: req.body.review,
        userName: req.body.userName
    }).then(submittedReview => {res.json(submittedReview)})
});


module.exports = router;