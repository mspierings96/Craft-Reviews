const router = require("express").Router();
const fetch = require("node-fetch");
// const searchTerm = require("../../public/script")

router.get("/", (req, res) => {
  console.log("Result routes work");
});

router.get("/:id", (req, res) => {
  console.log("ID routes work");
});

module.exports = router;
