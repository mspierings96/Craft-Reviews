// Dependencies
// ==============================
const express = require('express');
const path =require("path");
const db = require("../models");
const {auth,requiresAuth} = require("express-openid-connect");
const got = require("got");

require("dotenv").config();



//Sets up the Express App
//===============================
const env = process.env.NODE_ENV || "development";
const app = express();
const port =
  env === "development" ? process.env.DEV_PORT : process.env.PROD_PORT;


/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(
  auth({
    issuerBaseURL:process.env.AUTH0_ISSUER_BASE_URL,
    baseURL:process.env.BASE_URL,
    clientID:process.env.AUTH0_CLIENT_ID,
    secret:process.env.SESSION_SECRET,
    authRequired:false,
    auth0Logout:true,
    clientSecret:process.env.CLIENT_SECRET,
    authorizationParams:{
      response_type:"code",
      audience:process.env.AUTH0_AUDIENCE,
    },
  })
);
app.use((req,res,next) => {
  res.locals.isAuthenticated = req.oidc.isAuthenticated();
  res.locals.activeRoute=req.originalUrl;
  next();
})
/**
 * Routes Definitions
 */

// > Home


app.get("/", (req, res) => {
  res.render("home");
});

// > Profile

app.get("/profile",requiresAuth(), (req, res) => {
  res.render("profile",{
    user:req.oidc.user,
  });
});

// > Authentication

app.get("/sign-up/:page/:section?",(req,res) => {
  const {page,section} = req.params;
  res.oidc.login({
    returnTo:section ? `${page}/${section}` : page,
      authorizationParams:{
      screen_hint:"signup",
    },
  });
});
app.get("/login/:page/:section?",(req,res) => {
  const {page,section} = req.params;
  res.oidc.login({
    returnTo:section ? `${page}/${section}` : page,
  });
});
app.get("/logout/:page/:section?",(req,res) => {
  const {page} = req.params;
  res.oidc.logout({
    returnTo:page,
  });
});
/**
 * Server Activation
 */

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
