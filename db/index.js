const connection = require('../config/connection')

class DB {
    // Keeping a reference to the connection on the class in case we need it later
    constructor(connection){
        this.connection = connection;
    }


// find count of reviews by rating scores
findTotalsByScore() {
    return this.connection.promis().query(
        'Select COUNT(CASE WHEN r.review = 5 then 1 else NULL END) as "5-Star", COUNT(CASE WHEN r.review = 4 then 1 else NULL END) as "4-Star", COUNT(CASE WHEN r.review = 3 then 1 else NULL END) as "3-Star", COUNT(CASE WHEN r.review = 2 then 1 else NULL END) as "2-Star", COUNT(CASE WHEN r.review = 1 then 1 else NULL END) as "1-Star" From reviews r;'
    );
}

// find top 10 by highest rating
}