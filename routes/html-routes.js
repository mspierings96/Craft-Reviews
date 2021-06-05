const express = require("express");
const router = require("express").Router();
const path = require("path");

router.get("/results", (req, res) => {
    res.sendFile(path.join(__dirname, "../results-page.html"));
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../home-page.html"));
});

module.exports = router;