const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    if (req.cookies.isUserLogin) res.render("movienewspage");
    else res.redirect("/login");
  });

module.exports = router; 