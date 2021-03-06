const connection = require("../config/connection-mysql");

class DB {
  // Keeping a reference to the connection on the class in case we need it later
  constructor(connection) {
    this.connection = connection;
  }

  // find count of reviews by rating scores for brewery
  findTotalsByScore(apiID) {
    return `SELECT r.apiID, AVG(r.review) AvgReview, count(r.review) ReviewCount
        from reviews r
        Where r.apiID = ?
        group by r.apiID;`;
  }

  // find top 5 by highest rating for top 5 of homepage
  findHighestFive() {
    return `SELECT r.apiID, AVG(r.review) AvgReview, count(r.review) ReviewCount
        from reviews r
        group by r.apiID
        order by AvgReview desc, ReviewCount desc
        limit 5;`;
  }

  // Search for existing review
  searchExistingReview() {
    return `Select r.apiID, r.userName, r.review FROM reviews r
    where r.apiID = ? and r.userName=?;`;
  }

  // Search for existing username
  searchUserName() {
    return "select u.userName from users u where u.userName = ?;";
  }
}
module.exports = new DB(connection);
