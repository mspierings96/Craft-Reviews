const express = require("express");
const router = express.Router();
const Users = require("../../models/users");
const connection = require("../../config/connection-mysql");

const db = require("../../db");
const Reviews = require("../../models/reviews");

// get top 5 highest rated breweries for home page
router.get("/top5", (req, res) => {
  connection.query(db.findHighestFive(), (err, results) => {});
});

// get ratings for individual brewery by brewery api id
router.get("/rating", (req, res) => {
  let apiID = "5051";
  connection.query(db.findTotalsByScore(apiID), apiID, (err, results) => {});
});

//checks if existing rating for brewery by user if rating then update if not then create rating
router.post("/setRating", (req, res) => {
  let userName = req?.oidc?.user?.nickname || "NoUser";
  if (req.body.apiID && req.body.review) {
    Reviews.findAll({
      where: {
        userName: userName,
        apiID: req.body.apiID,
      },
    }).then((checkRating) => {
      if (checkRating[0] === undefined) {
        Reviews.create({
          apiID: req.body.apiID,
          review: req.body.review,
          userName: userName,
        }).then((submittedReview) => {
          res.json(submittedReview);
        });
      } else {
        Reviews.update(
          {
            review: req.body.review,
          },
          {
            where: {
              userName: userName,
              apiID: req.body.apiID,
            },
          }
        ).then((updateRating) => {
          res.json(updateRating);
        });
      }
    });
  }
});

module.exports = router;
