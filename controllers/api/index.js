const router = require("express").Router();
const breweryDB = require("./breweryDB");
const rateRoutes = require("./rate-routes");
const userRoutes = require('./user-routes.js');


router.use("/brewery", breweryDB);
router.use("/rate", rateRoutes);
router.use('/users', userRoutes);





module.exports = router;