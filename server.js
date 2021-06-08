// Dependencies
// ==============================
const express = require("express");
const db = require("./models");
const routes = require("./routes");
const path = require("path");
const sequelize = require("./config/connection-sequelize");
const mysql = require("mysql2");

const pug = require("pug");
const connection = require("./config/connection-mysql");

//Sets up the Express App
//===============================
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.use(routes)

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

app.get("/results", (req, res) => {
  var html = pug.renderFile("./pages/results.pug", {
    youAreUsingPug: true,
    pageTitle: "Results Page",
  });

  res.send(html);
});


app.listen(PORT, () => {
  console.log("Server listening on: " + PORT);
});
