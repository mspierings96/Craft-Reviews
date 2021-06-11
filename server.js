// Dependencies
// ==============================
const express = require("express");
const connection = require('./config/connection-mysql')
const db = require("./db");
const routes = require("./routes");
const Axios = require("axios");
const pug = require("pug");
const { compare } = require("bcrypt");

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
    const idArr = [];
    // console.log(results.data);
    for(i = 0; i < results.data.length; i++){
      idArr.push(results.data[i].id);
    }

    let reviewArr = [];

    let buildArr = new Promise((resolve, reject) => {
      for(i = 0; i < idArr.length; i++){
        // const apiID = idArr[i];
        const apiID = 5051;
        // console.log(apiID);
        connection.query(db.findTotalsByScore(apiID), apiID,(err, res) => {
          if(res[0] === undefined){
            reviewArr.push("Undefined");
          }
          else if(res[0] != undefined){
            // console.log("test", res[0].AvgReview)
            reviewArr.push(res[0].AvgReview);
            console.log("reviewArr", reviewArr)
          }
          else{
            resolve("Loop Comlete")
          }
        });
      }
    })
    buildArr.then((message) => {
      console.log("After Promise: ",reviewArr)
      // console.log("Brewery Results: ", results.data)
    })
    .catch((error) => {
      console.log("Failed")
    })

  });
});


app.listen(PORT, () => {
  console.log("Server listening on: " + PORT);
});
