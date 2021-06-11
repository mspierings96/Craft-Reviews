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
require('dotenv').config();

const {auth, requiresAuth} =require('express-openid-connect');

//Sets up the Express App
//===============================
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static("public"));
app.use(
  auth({
    authRequired:false,
    auth0Logout:true,
      issuerBaseURL:process.env.AUTH0_ISSUER_BASE_URL,
      baseURL:process.env.BASE_URL,
      clientID:process.env.AUTH0_CLIENT_ID,
      secret:process.env.CLIENT_SECRET,

  })
);
app.get('/login',(req,res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});


app.get('/sign-up',(req,res) => {
  res.oidc.login({
    authorizationParams:{
      screen_hint:'sign-up',
    },
  });
});
app.use((req,res,next) => {
  res.locals.isAuthenticated = req.oidc.isAuthenticated();
  next();
});

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

  Axios.get(
    "https://api.openbrewerydb.org/breweries?per_page=50&by_state=wisconsin&by_city=" +
      req.params.query
  ).then(function (data) {
    console.log("brew data", data);
    var html = pug.renderFile("./pages/results.pug", {
      youAreUsingPug: true,
      pageTitle: "Results Page",
      searchResults: data.data,
    });

    res.send(html);
  });
});

app.get('/Profile',requiresAuth(),(req,res) => {
  
  var html = pug.renderFile("./pages/profile.pug",{
    youAreUsingPug:true,
    pageTitle:"Profile",
    user:req.oidc.user,
  })
  res.send(html)
});


app.listen(PORT, () => {
  console.log("Server listening on: " + PORT);
});
