// Dependencies
// ==============================
const path = require('path');
const express = require('express');
// const db = require("./models");
const routes = require('./controllers');
const sequelize = require('./config/connection');
const session =require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// const Axios = require("axios");

const sess = {
  secret:'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized:true,
  store: new SequelizeStore({
      db:sequelize
  })
};


//Sets up the Express App
//===============================
const app = express();
const PORT = process.env.PORT || 3001;
app.set('view engine','pug')

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))



app.use(routes);


// app.get("/results/:query", (req, res) => {
//   // do the api call and then render pug page

//   Axios.get(
//     "https://api.openbrewerydb.org/breweries?per_page=50&by_state=wisconsin&by_city=" +
//       req.params.query
//   ).then(function (data) {
//     console.log("brew data", data);
//     var html = pug.renderFile("./pages/results.pug", {
//       youAreUsingPug: true,
//       pageTitle: "Results Page",
//       searchResults: data.data,
//     });

//     res.send(html);
//   });
// });

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});