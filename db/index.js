const connection = require('../config/connection-mysql')

class DB {
    // Keeping a reference to the connection on the class in case we need it later
    constructor(connection) {
      this.connection = connection;
    }


// find count of reviews by rating scores for brewery
findTotalsByScore(apiID) {
    return (
        `Select r.apiID, COUNT(CASE WHEN r.review = 5 then 1 else NULL END) as "5-Star", 
        COUNT(CASE WHEN r.review = 4 then 1 else NULL END) as "4-Star", 
        COUNT(CASE WHEN r.review = 3 then 1 else NULL END) as "3-Star", 
        COUNT(CASE WHEN r.review = 2 then 1 else NULL END) as "2-Star", 
        COUNT(CASE WHEN r.review = 1 then 1 else NULL END) as "1-Star" 
        From reviews r
        WHERE r.apiID=?
        Group by r.apiID;`
    );
}

// find top 5 by highest rating for top 5 of homepage
findHighestFive() {
    return (
        `Select a.apiID, a.Ranking, sum(a.ScoreCount) as ScoreCounts 
        from (
        Select apiID, '5Star' Ranking, 5Star ScoreCount
        from (
        Select r.apiID,
        (Case When r.review = 5 then 1 else null end) as 5Star,
        (Case When r.review = 4 then 2 else null end) as 4Star,
        (Case When r.review = 3 then 3 else null end) as 3Star,
        (Case When r.review = 2 then 4 else null end) as 2Star,
        (Case When r.review = 1 then 5 else null end) as 1Star
        from reviews r) as u
        union all
        select apiID, '4Star' Ranking, 4Star ScoreCount
        from (
        Select r.apiID,
        (Case When r.review = 5 then 1 else null end) as 5Star,
        (Case When r.review = 4 then 2 else null end) as 4Star,
        (Case When r.review = 3 then 3 else null end) as 3Star,
        (Case When r.review = 2 then 4 else null end) as 2Star,
        (Case When r.review = 1 then 5 else null end) as 1Star
        from reviews r) as u
        union all
        select apiID, '3Star' Ranking, 3Star ScoreCount
        from (
        Select r.apiID,
        (Case When r.review = 5 then 1 else null end) as 5Star,
        (Case When r.review = 4 then 2 else null end) as 4Star,
        (Case When r.review = 3 then 3 else null end) as 3Star,
        (Case When r.review = 2 then 4 else null end) as 2Star,
        (Case When r.review = 1 then 5 else null end) as 1Star
        from reviews r) as u
        union all
        select apiID, '2Star' Ranking, 2Star ScoreCount
        from (
        Select r.apiID,
        (Case When r.review = 5 then 1 else null end) as 5Star,
        (Case When r.review = 4 then 2 else null end) as 4Star,
        (Case When r.review = 3 then 3 else null end) as 3Star,
        (Case When r.review = 2 then 4 else null end) as 2Star,
        (Case When r.review = 1 then 5 else null end) as 1Star
        from reviews r) as u
        union all
        select apiID, '1Star' Ranking, 1Star ScoreCount
        from (
        Select r.apiID,
        (Case When r.review = 5 then 1 else null end) as 5Star,
        (Case When r.review = 4 then 2 else null end) as 4Star,
        (Case When r.review = 3 then 3 else null end) as 3Star,
        (Case When r.review = 2 then 4 else null end) as 2Star,
        (Case When r.review = 1 then 5 else null end) as 1Star
        from reviews r) as u
        order by Ranking desc
        ) as a
        where a.ScoreCount is not null
        group by a.apiID
        limit 5
        ;`
    );
}

// Search for existing review
searchExistingReview(){
    return (
    `Select r.apiID, r.userName, r.review FROM reviews r
    where r.apiID = ? and r.userName=?;`
    );
}

// Search for existing username
searchUserName(){
    return (
        'select u.userName from users u where u.userName = ?;'
    );
}
}
module.exports = new DB(connection);