// Dependencies
// ==============================
const express = require("express");
const connection = require('./config/connection-mysql')
const db = require("./db");
const routes = require("./routes");
const Axios = require("axios");
const pug = require("pug");
const { parse } = require("path");

//Sets up the Express App
//===============================
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(routes);

app.get("/pug", (req, res) => {
  res.send("pug");
});

app.get("/", (req, res) => {
  var html = pug.renderFile("./pages/index.pug", {
    youAreUsingPug: true,
    pageTitle: "Home Page",
  });

  res.send(html);
});

app.get("/results/:query", async (req, res) => {
  // do the api call and then render pug page
  const url = `https://api.openbrewerydb.org/breweries?per_page=50&by_state=wisconsin&by_city=${req.params.query}`;

  let reviewArr = [];
  let idArr = [];
  let html;

  const results = await Axios.get(url);

  for(i = 0; i < results.data.length; i++){
    idArr.push(results.data[i].id);
  }
  
  for(i = 0; i < idArr.length; i++){
    const apiID = idArr[i];

    const data = await connection.promise().query(db.findTotalsByScore(apiID), apiID)
    const parsedData = JSON.parse(JSON.stringify(data[0]));

    if(parsedData[0] === undefined){
      reviewArr.push("No Reviews!")
    } else {
      reviewArr.push(parsedData[0].AvgReview)
    }
  };

  console.log("ln 60 reviewArr", reviewArr);

  html = pug.renderFile("./pages/results.pug", {
    youAreUsingPug: true,
    pageTitle: "Results Page",
    breweryResults: results.data,
    avgRating: reviewArr
  });
  
  res.send(html);
});


app.listen(PORT, () => {
  console.log("Server listening on: " + PORT);
});
