const router = require("express").Router();
const apiRoutes = require("./api");
// const htmlRoutes = require("./html-routes")
const rateRoutes = require("./api/rate-routes");

router.use("/api", rateRoutes);
router.use("/api", apiRoutes);
// router.use("/", htmlRoutes);

// router.use((req, res) => {
//   res.send("<h1>Wrong Route</h1>");
// });

module.exports = router;
