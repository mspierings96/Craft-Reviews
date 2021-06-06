// Dependencies
// ==============================
const express = require('express');
const path = require("path");



//Sets up the Express App
//===============================
const app = express();
require('dotenv').config();
const{auth} =require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    secret: process.env.SECRET
  };

  app.set("views",path.join(__dirname,"views"));
  app.set("view engine","pug")
  app.use(express.static(path.join(__dirname,"..","public")));
  app.use(auth(config));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('Server listening on: '+PORT);
});