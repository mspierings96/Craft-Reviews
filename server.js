// Dependencies
// ==============================
const express = require('express');
const db = require("./models");
const routes = require("./routes");
const path = require("path")
const sequelize = require("./config/connection-sequelize");
const mysql = require("mysql2");


//Sets up the Express App
//===============================
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.listen(PORT, () => {
    console.log(`listening on: ${PORT}`)
});
