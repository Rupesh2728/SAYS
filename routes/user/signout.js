const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    res.clearCookie("isUserLogin");
    res.redirect("/login");
  });

module.exports = router;