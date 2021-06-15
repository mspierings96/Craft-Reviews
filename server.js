// Dependencies
// ==============================
const express = require("express");
const connection = require("./config/connection-mysql");
const sequelize =require('./config/connection-sequelize');
const db = require("./db");
const routes = require("./routes");
const Axios = require("axios");
const path = require('path')
const pug = require("pug");
const session = require('express-session');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};





require("dotenv").config();


//Sets up the Express App
//===============================
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(session(sess));
// app.use(session(sess));
app.use(express.static("public"));
app.set('view engine','pug');
app.set('views','./pages');

app.use(routes);


app.get("/pug", (req, res) => {
  res.send("pug");
});


app.get("/", async (req, res) => {
  const data = await connection.promise().query(db.findHighestFive());
  const top5 = JSON.parse(JSON.stringify(data[0]));
  let brewery = [];
  let ratingArr = [];
  let reviewCount = [];

  for (i = 0; i < top5.length; i++) {
    const id = top5[i].apiID;
    const url = `https://api.openbrewerydb.org/breweries/${id}`;

    const results = await Axios.get(url);
    brewery.push(results.data);
    ratingArr.push(top5[i].AvgReview.slice(0, 3));
    reviewCount.push(top5[i].ReviewCount);
  }

  let html = pug.renderFile("./pages/index.pug", {
    youAreUsingPug: true,
    pageTitle: "Home Page",
    breweries: brewery,
    rating: ratingArr,
    reviewCount: reviewCount,
  });

  res.send(html);
});

app.get("/results/:query", async (req, res) => {
  // do the api call and then render pug page
  const url = `https://api.openbrewerydb.org/breweries?per_page=50&by_state=wisconsin&by_city=${req.params.query}`;

  let reviewArr = [];
  let reviewCountArr = [];
  let idArr = [];
  let html;

  const results = await Axios.get(url);

  for (i = 0; i < results.data.length; i++) {
    idArr.push(results.data[i].id);
  }

  for (i = 0; i < idArr.length; i++) {
    const apiID = idArr[i];

    const data = await connection
      .promise()
      .query(db.findTotalsByScore(apiID), apiID);
    const parsedData = JSON.parse(JSON.stringify(data[0]));

    if (parsedData[0] === undefined) {
      reviewArr.push("No Reviews!");
      reviewCountArr.push("0");
    } else {
      const finalReview = parsedData[0].AvgReview.slice(0, 3);
      reviewArr.push(`${finalReview}/5`);
      reviewCountArr.push(parsedData[0].ReviewCount);
    }
  }


  html = pug.renderFile("./pages/results.pug", {
    youAreUsingPug: true,
    pageTitle: "Results Page",
    breweryResults: results.data,
    avgRating: reviewArr,
    reviewCount: reviewCountArr,
  });
  res.send(html);
});

// app.get("/login", (req, res) => {
//   var html = pug.renderFile("./pages/profile.pug", {
//     youAreUsingPug: true,
//     pageTitle: "Login",
//   });
//   res.send(html);
// });
// app.get("/register", (req, res) => {
//   var html = pug.renderFile("./pages/includes/register.pug", {
//     youAreUsingPug: true,
//     pageTitle: "Register",
//   });
//   res.send(html);
// });


// app.listen(PORT, () => {
//   console.log("Server listening on: " + PORT);
// });
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

