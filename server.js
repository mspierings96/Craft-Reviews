// Dependencies
// ==============================
const express = require("express");
const db = require("./models");
const routes = require("./routes");
const path = require("path");
const sequelize = require("./config/connection-sequelize");
const mysql = require("mysql2");

const Axios = require("axios");

const pug = require("pug");
const connection = require("./config/connection-mysql");
const { default: axios } = require("axios");
const { dirname } = require("path");

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

  Axios.all([
    Axios.get("https://api.openbrewerydb.org/breweries?per_page=50&by_state=wisconsin&by_city=" + req.params.query),
    app.get("/routes/api/brewery")
  ])
  .then(Axios.spread((brewery, rating) => {
    console.log("Brew data", brewery);
    console.log("Rating data", rating);
    let html = pug.renderFile("./pages/results.pug", {
      youAreUsingPug: true,
      pageTitle: "Results Page",
      breweryResults: brewery.data,
      ratingResults: rating.data
    });

    res.send(html);
  }));
  // Axios.get(
  //   "https://api.openbrewerydb.org/breweries?per_page=50&by_state=wisconsin&by_city=" +
  //     req.params.query
  // ).then(function (data) {
  //   console.log("brew data", data);
  //   var html = pug.renderFile("./pages/results.pug", {
  //     youAreUsingPug: true,
  //     pageTitle: "Results Page",
  //     breweryResults: data.data,
  //   });

  //   res.send(html);
  // });
});


app.listen(PORT, () => {
  console.log("Server listening on: " + PORT);
});
