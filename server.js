// Dependencies
// ==============================
const express = require("express");
const pug = require("pug");

//Sets up the Express App
//===============================
const app = express();
const PORT = process.env.PORT || 3001;
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
