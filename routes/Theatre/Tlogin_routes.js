const express = require("express");
const router = express.Router();
const md5 = require("md5");

//Database
const theatresignupinfo = require("../../models/theatre/signup");


router.post("/", function (req, res) {
    let email = req.body.mail;
    let License_Number = req.body.License;
    let password = md5(req.body.pass);
  
 
  
    theatresignupinfo
      .find({
        temail: email,
        licensenum: License_Number,
        LoginPassword: password,
      })
      .then((value) => {
        // console.log(value);
  
        if (value.length == 0) {
          res.cookie("result1", "Incorrect creditionals");
          res.redirect("/login");
        } else {
          console.log("TLogin success");
          res.cookie("currtheatrereffnum", value[0].tReferenceNumber);
          let k =
            value[0].city.charAt(0).toUpperCase() +
            value[0].city.slice(1).toLowerCase();
          res.cookie("currtheatrecity", k);
          res.clearCookie("result1");
          res.cookie("isTlogin", true);
          res.redirect("/tdashboard");
        }
      });
  });

  
module.exports = router;