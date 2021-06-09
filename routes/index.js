const router = require("express").Router();
const apiRoutes = require("./api");
const rateRoutes = require("./api/rate-routes");

router.use("/api", rateRoutes);
router.use("/api", apiRoutes);


module.exports = router;
