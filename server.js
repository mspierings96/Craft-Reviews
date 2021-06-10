// Dependencies
// ==============================
const express = require("express");
const fetch = require("node-fetch");
const connection = require('./config/connection-mysql')
const db = require("./db");
const routes = require("./routes");
const Axios = require("axios");
const pug = require("pug");

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
  
  var apiID = [];

  fetch(url).then(
    function(response){
        if(response.status !== 200){
            console.log(`Looks like there was a problem. Status Code: ${response.status}`)
            return;
        }

        response.json().then(function(data){
            const idArr = getID(data);
            return apiID = idArr;
        })
    }
  )

  getID = (data) => {
      const arrLength = data.length;
      const newData = []
      for(i = 0; i < arrLength; i++) {
          newData.push(data[i].id)
      };
      return newData;
  };

  console.log(apiID);

  // for(i = 0; i < apiID.length; i++){
  //   connection.query(db.findTotalsByScore(apiID[i]), apiID[i],(err, results) => {
  //     console.log(results);
  //   })
  // }
  

  Axios.get(url).then(function (data) {
    // console.log(results);
    var html = pug.renderFile("./pages/results.pug", {
      youAreUsingPug: true,
      pageTitle: "Results Page",
      breweryResults: data.data,
    });

    res.send(html);
  });
});


app.listen(PORT, () => {
  console.log("Server listening on: " + PORT);
});
