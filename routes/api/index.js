const express = require("express");
const router = require("express").Router();
const breweryDB = require("./breweryDB");
const rateRoutes = require("./rate-routes");

router.use("/brewery", breweryDB);
router.use("/rate", rateRoutes);

module.exports = router;