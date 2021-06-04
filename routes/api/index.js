const router = require("express").Router();
const breweryDB = require("./breweryDB");

router.use("/brewery", breweryDB);

module.exports = router;