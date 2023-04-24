const express = require("express");
const router = express.Router();
const premiumclients = require("../../public/js/homepage/premiumclients.js");

//Database
const theatresignupinfo = require("../../models/theatre/signup");

router.get("/", function (req, res) {
    if (req.cookies.isUserLogin) {
      res.render("homepage", { premiumclients: premiumclients });
    } else res.redirect("/login");
  });

router.get("/getsuggestion", async (req, res) => {
    let value = await theatresignupinfo.find({});
    res.json(value);
  });

module.exports = router;
