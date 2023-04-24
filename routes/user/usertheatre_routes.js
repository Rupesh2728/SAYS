
const express = require("express");
const router = express.Router();

//Database
const userTinfo = require("../../models/theatre/abouttheatre");
const theatresignupinfo = require("../../models/theatre/signup");

router.get("/", async function (req, res) {
    let obj1 = {};
    let obj2 = {};
  
    if (req.cookies.isUserLogin) {
      let treff = req.query.treff;
  
      let value = await userTinfo.findOne({ tReferenceNumber: treff });
      let value2 = await theatresignupinfo.findOne({ tReferenceNumber: treff });
      res.render("usertheatreprofile", { Tdetails: value, nearbyplaces: value2 });
    } else {
      res.redirect("/login");
    }
  });

  module.exports = router;