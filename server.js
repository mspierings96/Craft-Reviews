// Dependencies
// ==============================
const express = require('express');
const db = require("./models");



//Sets up the Express App
//===============================
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const apiRoutes = require("./routes/rate-routes.js");

app.use('/api', apiRoutes);


app.listen(PORT, () => {
    console.log(`listening on: ${PORT}`)
});
