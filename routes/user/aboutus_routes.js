const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    if (req.cookies.isUserLogin) res.render("aboutus");
    else res.redirect("/login");
  });

module.exports = router;