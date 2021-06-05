const connection = require('../config/connection')

class DB {
    // Keeping a reference to the connection on the class in case we need it later
    constructor(connection){
        this.connection = connection;
    }


// find count of reviews by rating scores for brewery
findTotalsByScore() {
    return this.connection.promise().query(
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

// find top 5 by highest rating for top 5 of homepage
findHighestFive() {
    return this.connection.promise().query(
        'select  r.apiID, COUNT(CASE WHEN r.review = 5 then 1 else NULL END) as 5Star from reviews r group by r.apiID order by 5Star desc LIMIT 5;'
    );
}

}