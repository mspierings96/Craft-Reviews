// Dependencies
// ==============================
const express = require('express');



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

  app.use(auth(config));

  app.get('/',(req,res) => {
      res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  })

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('Server listening on: '+PORT);
});