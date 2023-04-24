const express = require("express");
const router = express.Router();
const md5 = require("md5");
//database
const userinfo = require("../../models/user/signup");

router.get("/", function (req, res) {
    const r = req.cookies.result;
    const r1 = req.cookies.result1;
    res.clearCookie("result");
    res.clearCookie("result1");
    res.render("Login", { login_sucess: r, login_sucess1: r1 });
  });

  
  router.post("/", function (req, res) {
    let email = req.body.mail;
    let password = md5(req.body.pass);
    let row;
  
    userinfo.find({ email: email, LoginPassword: password }).then((value) => {
      if (value.length == 0) {
        res.cookie("result", "Incorrect creditionals");
        res.redirect("/login");
      } else {
        res.clearCookie("result");
        console.log("User Login success");
        res.cookie("isUserLogin", true);
        res.cookie("UserReferenceNumber", value[0].UserReferenceNumber);
        if (email == "saysadmin@gmail.com") {
          res.redirect("/adminhome");
        }
        else
          res.redirect("/home");
      }
    });
  });

module.exports = router;
