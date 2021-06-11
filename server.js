// Dependencies
// ==============================
const express = require("express");
const fetch = require("node-fetch");
const connection = require('./config/connection-mysql')
const db = require("./db");
const routes = require("./routes");
const Axios = require("axios");
const pug = require("pug");
const { compare } = require("bcrypt");
const { rawListeners } = require("./config/connection-mysql");

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

app.get("/results/:query", (req, res) => {
  // do the api call and then render pug page
  const url = `https://api.openbrewerydb.org/breweries?per_page=50&by_state=wisconsin&by_city=${req.params.query}`;
  
  Axios.get(url).then(function (results) {
    console.log(results.data[0].id);
    let apiID = 5051

    connection.query(db.findTotalsByScore(apiID), apiID,(err, results) => {
      const obj = results[0].AvgReview;
      console.log(obj);
    })

    let html = pug.renderFile("./pages/results.pug", {
      youAreUsingPug: true,
      pageTitle: "Results Page",
      breweryResults: results.data,
    });

    res.send(html);
  });
});


app.listen(PORT, () => {
  console.log("Server listening on: " + PORT);
});
