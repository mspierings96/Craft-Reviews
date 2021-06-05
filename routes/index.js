const router = require("express").Router();
const apiRoutes = require("./api");
const htmlRoutes = require("./html-routes")

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.use("/api", apiRoutes);
router.use("/", htmlRoutes);

router.use((req, res) => {
    res.send("<h1>Wrong Route</h1>")
})

module.exports = router;