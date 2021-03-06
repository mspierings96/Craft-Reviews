// const express = require("express");
const router = require("express").Router();
const rateRoutes = require("./rate-routes");
const userRoutes = require("./user-routes");

router.use("/rate", rateRoutes);
router.use("/user", userRoutes);

module.exports = router;