// // const express = require("express");
// const router = require("express").Router();
// const breweryDB = require("./breweryDB");
// const rateRoutes = require("./rate-routes");
// const userRoutes = require("./user-routes");

// router.use("/brewery", breweryDB);
// router.use("/rate", rateRoutes);
// router.use("/user", userRoutes);

// module.exports = router;
const router = require('express').Router();

const userRoutes = require('./user-routes.js');

router.use('/users', userRoutes);

module.exports = router;