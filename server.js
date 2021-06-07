// Dependencies
// ==============================
const express = require("express");
const db = require("./models");
const routes = require("./routes");
const path = require("path");
const sequelize = require("./config/connection-sequelize");
const mysql = require("mysql2");

const pug = require("pug");
require('dotenv').config();

const {auth, requiresAuth} =require('express-openid-connect');

//Sets up the Express App
//===============================
const app = express();
const PORT = process.env.PORT || 3001;

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
app.get('/Profile',requiresAuth(),(req,res) => {
  res.send(JSON.stringify(req.oidc.user))
  var html = pug.renderFile("./pages/profile.pug",{
    youAreUsingPug:true,
    pageTitle:"Profile"
  })
  res.send(html);
});


app.listen(PORT, () => {
  console.log("Server listening on: " + PORT);
});
