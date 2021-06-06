// Dependencies
// ==============================
const express = require('express');
const routes = require("./routes");
const path = require("path")
const sequelize = require("./config/connection");
const mysql = require("mysql2");


//Sets up the Express App
//===============================
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'assets')));

app.use(routes);

app.listen(PORT, () => {
    console.log('Server listening on: '+PORT);
});